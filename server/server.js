/* ============================================================
   DezoMax — to'lov serveri (Click Shop API) + balans
   ------------------------------------------------------------
   Nodejs 22+, tashqi kutubxonasiz (faqat node:sqlite). Statik IP'li serverda ishlaydi.
   Maxfiy kalitlar FAQAT muhit o'zgaruvchilarida (server/.env.example) — kodda va GitHub'da YO'Q.

   Yo'llar:
     POST /api/login    {idToken}           Google token → sessiya tokeni, balans
     POST /api/tg/start                     Telegram bot havolasi + chipta (ticket)
     POST /api/tg/verify {ticket, code}     botdagi 6 xonali kod → sessiya tokeni
     POST /tg/webhook                       Telegram botdan xabar (kod yuboriladi)
     GET  /api/me                           balans + to'lovlar tarixi            (Bearer token)
     POST /api/order    {amount}            Click to'lov havolasi                (Bearer token)
     POST /api/spend    {amount, plan,days} balansdan yechish (tarif sotib olish) (Bearer token)
     POST /click/prepare, /click/complete   Click chaqiradi (Shop API, imzo MD5)
     GET  /social?movie=ID                  ko'rishlar, like/dislike soni + izohlar (ochiq; token bo'lsa — o'z bahosi)
     POST /view {movie}                     ko'rishni sanash (bir IP — 6 soatda bir marta)
     POST /api/react   {movie, value}       1 — like, -1 — dislike, 0 — bekor qilish   (Bearer token)
     POST /api/comment {movie, text}        izoh yozish                                 (Bearer token)
     POST /api/comment/delete {id}          o'z izohini (admin — istalganini) o'chirish (Bearer token)
     POST /api/device {device}              shu qurilmani akkauntga yozish + qurilmalar ro'yxati (Bearer token)
     GET  /api/devices                      akkauntga kirgan barcha qurilmalar                  (Bearer token)
     POST /api/devices/remove {id}          boshqa qurilmani akkauntdan chiqarish               (Bearer token)
     GET  /health
   ============================================================ */

'use strict';
const http = require('node:http');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const md5 = s => crypto.createHash('md5').update(s).digest('hex');
const sha256 = s => crypto.createHash('sha256').update(s).digest('hex');

/* ---------- Baza ---------- */
function openDb(file) {
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS users (
      uid TEXT PRIMARY KEY, email TEXT, name TEXT, balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0), created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, uid TEXT NOT NULL REFERENCES users(uid), expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT NOT NULL REFERENCES users(uid), amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',            -- new | prepared | paid | cancelled
      click_trans_id TEXT, click_paydoc_id TEXT, created_at INTEGER NOT NULL, paid_at INTEGER);
    CREATE TABLE IF NOT EXISTS tg_tickets (
      ticket TEXT PRIMARY KEY, code_hash TEXT, tg_id TEXT, tg_name TEXT,
      created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, tries INTEGER NOT NULL DEFAULT 0, used INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT NOT NULL REFERENCES users(uid), at INTEGER NOT NULL,
      amount INTEGER NOT NULL, kind TEXT NOT NULL, method TEXT, ref TEXT, plan TEXT, days INTEGER);
    CREATE INDEX IF NOT EXISTS payments_uid ON payments(uid, at DESC);
    CREATE TABLE IF NOT EXISTS reactions (
      movie_id INTEGER NOT NULL, uid TEXT NOT NULL REFERENCES users(uid), value INTEGER NOT NULL CHECK (value IN (-1, 1)),
      at INTEGER NOT NULL, PRIMARY KEY (movie_id, uid));
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER NOT NULL, uid TEXT NOT NULL REFERENCES users(uid),
      name TEXT, text TEXT NOT NULL, at INTEGER NOT NULL, hidden INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS comments_movie ON comments(movie_id, hidden, at DESC);
    CREATE TABLE IF NOT EXISTS views (movie_id INTEGER PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0);
    -- kunlik ko'rishlar (TOP 10: kunlik / haftalik / oylik); day — 1970-yildan beri kun (UTC+5, Toshkent)
    CREATE TABLE IF NOT EXISTS views_daily (movie_id INTEGER NOT NULL, day INTEGER NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (movie_id, day));
    CREATE INDEX IF NOT EXISTS views_daily_day ON views_daily(day);
  `);
  // qurilmalar: har bir sessiya — bitta qurilma (eski bazalarga ustunlar qo'shiladi)
  for (const col of ['device_id TEXT', 'device TEXT', 'created_at INTEGER', 'last_seen INTEGER', 'ip TEXT']) {
    try { db.exec(`ALTER TABLE sessions ADD COLUMN ${col}`); } catch { /* ustun allaqachon bor */ }
  }
  return db;
}

/* ---------- Google ID token tekshiruvi (haqiqiy) ---------- */
function googleVerifier(clientId) {
  return async idToken => {
    const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken));
    if (!r.ok) throw new Error('google token yaroqsiz');
    const p = await r.json();
    if (p.aud !== clientId) throw new Error('aud mos emas');
    if (!/^(https:\/\/)?accounts\.google\.com$/.test(p.iss)) throw new Error('iss mos emas');
    if (Number(p.exp) * 1000 < Date.now()) throw new Error('token eskirgan');
    if (String(p.email_verified) !== 'true') throw new Error('email tasdiqlanmagan');
    return { sub: p.sub, email: p.email, name: p.name || '' };
  };
}

/* ---------- Ilova ---------- */
function createApp(cfg, deps = {}) {
  const db = deps.db || openDb(cfg.dbFile || ':memory:');
  const verifyGoogle = deps.verifyGoogle || googleVerifier(cfg.googleClientId);
  const now = deps.now || (() => Date.now());
  const MIN = cfg.minAmount || 1000, MAX = cfg.maxAmount || 5000000;
  const SESSION_MS = 60 * 86400000;

  const q = {
    user: db.prepare('SELECT * FROM users WHERE uid = ?'),
    upsertUser: db.prepare(`INSERT INTO users (uid, email, name, balance, created_at) VALUES (?, ?, ?, 0, ?)
                            ON CONFLICT(uid) DO UPDATE SET email = excluded.email, name = excluded.name`),
    addSession: db.prepare('INSERT INTO sessions (token_hash, uid, expires_at) VALUES (?, ?, ?)'),
    session: db.prepare('SELECT uid, last_seen, ip FROM sessions WHERE token_hash = ? AND expires_at > ?'),
    setDevice: db.prepare('UPDATE sessions SET device_id = ?, device = ?, created_at = COALESCE(created_at, ?), last_seen = ? WHERE token_hash = ?'),
    seen: db.prepare('UPDATE sessions SET last_seen = ?, ip = ? WHERE token_hash = ?'),
    devices: db.prepare('SELECT token_hash, device_id, device, created_at, last_seen, ip FROM sessions WHERE uid = ? AND expires_at > ? ORDER BY last_seen DESC'),
    dropDevice: db.prepare('DELETE FROM sessions WHERE uid = ? AND (device_id = ? OR substr(token_hash, 1, 12) = ?) AND token_hash <> ?'),
    dropOld: db.prepare('DELETE FROM sessions WHERE expires_at <= ?'),
    addOrder: db.prepare('INSERT INTO orders (uid, amount, created_at) VALUES (?, ?, ?)'),
    order: db.prepare('SELECT * FROM orders WHERE id = ?'),
    setPrepared: db.prepare("UPDATE orders SET status = 'prepared', click_trans_id = ?, click_paydoc_id = ? WHERE id = ?"),
    setPaid: db.prepare("UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ?"),
    setCancelled: db.prepare("UPDATE orders SET status = 'cancelled' WHERE id = ?"),
    credit: db.prepare('UPDATE users SET balance = balance + ? WHERE uid = ?'),
    debit: db.prepare('UPDATE users SET balance = balance - ? WHERE uid = ? AND balance >= ?'),
    addPayment: db.prepare('INSERT INTO payments (uid, at, amount, kind, method, ref, plan, days) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'),
    payments: db.prepare('SELECT id, at, amount, kind, method, plan, days FROM payments WHERE uid = ? ORDER BY at DESC, id DESC LIMIT 100'),
    addTicket: db.prepare('INSERT INTO tg_tickets (ticket, created_at, expires_at) VALUES (?, ?, ?)'),
    ticket: db.prepare('SELECT * FROM tg_tickets WHERE ticket = ?'),
    setTicketCode: db.prepare('UPDATE tg_tickets SET code_hash = ?, tg_id = ?, tg_name = ?, expires_at = ? WHERE ticket = ?'),
    ticketTry: db.prepare('UPDATE tg_tickets SET tries = tries + 1 WHERE ticket = ?'),
    ticketUsed: db.prepare("UPDATE tg_tickets SET used = 1 WHERE ticket = ?"),
    dropTickets: db.prepare('DELETE FROM tg_tickets WHERE expires_at <= ?'),
    reactCounts: db.prepare('SELECT SUM(value = 1) AS likes, SUM(value = -1) AS dislikes FROM reactions WHERE movie_id = ?'),
    myReaction: db.prepare('SELECT value FROM reactions WHERE movie_id = ? AND uid = ?'),
    setReaction: db.prepare(`INSERT INTO reactions (movie_id, uid, value, at) VALUES (?, ?, ?, ?)
                             ON CONFLICT(movie_id, uid) DO UPDATE SET value = excluded.value, at = excluded.at`),
    delReaction: db.prepare('DELETE FROM reactions WHERE movie_id = ? AND uid = ?'),
    comments: db.prepare('SELECT id, uid, name, text, at FROM comments WHERE movie_id = ? AND hidden = 0 ORDER BY at DESC, id DESC LIMIT 200'),
    commentCount: db.prepare('SELECT COUNT(*) AS n FROM comments WHERE movie_id = ? AND hidden = 0'),
    addComment: db.prepare('INSERT INTO comments (movie_id, uid, name, text, at) VALUES (?, ?, ?, ?, ?)'),
    comment: db.prepare('SELECT * FROM comments WHERE id = ?'),
    hideComment: db.prepare('UPDATE comments SET hidden = 1 WHERE id = ?'),
    recentByUser: db.prepare('SELECT COUNT(*) AS n FROM comments WHERE uid = ? AND at > ?'),
    views: db.prepare('SELECT n FROM views WHERE movie_id = ?'),
    addView: db.prepare('INSERT INTO views (movie_id, n) VALUES (?, 1) ON CONFLICT(movie_id) DO UPDATE SET n = n + 1'),
    addViewDay: db.prepare('INSERT INTO views_daily (movie_id, day, n) VALUES (?, ?, 1) ON CONFLICT(movie_id, day) DO UPDATE SET n = n + 1'),
    topSince: db.prepare('SELECT movie_id, SUM(n) AS n FROM views_daily WHERE day >= ? GROUP BY movie_id ORDER BY n DESC, movie_id LIMIT ?'),
    topAll: db.prepare('SELECT movie_id, n FROM views ORDER BY n DESC, movie_id LIMIT ?')
  };

  /* --- Like/dislike va izohlar --- */
  const admins = new Set(cfg.adminUids || []);
  const movieIdOf = v => { const n = Number(v); return Number.isInteger(n) && n > 0 && n < 1e12 ? n : 0; };
  function socialOf(movie, user) {
    const c = q.reactCounts.get(movie) || {};
    return {
      views: q.views.get(movie)?.n || 0,
      likes: Number(c.likes) || 0,
      dislikes: Number(c.dislikes) || 0,
      mine: user ? (q.myReaction.get(movie, user.uid)?.value || 0) : 0,
      total: q.commentCount.get(movie).n,
      comments: q.comments.all(movie).map(r => ({
        id: r.id, name: r.name || 'Tomoshabin', text: r.text, at: r.at,
        mine: !!user && r.uid === user.uid, canDelete: !!user && (r.uid === user.uid || admins.has(user.uid))
      })),
      admin: !!user && admins.has(user.uid)
    };
  }
  // ko'rishlar: bir IP bir kinoni 6 soat ichida faqat bir marta sanaydi (xotirada, server qayta ishga tushsa tozalanadi)
  const seen = new Map();
  const VIEW_MS = 6 * 3600000;
  function addView(req, movie) {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const k = ip + '|' + movie, t = now();
    if ((seen.get(k) || 0) > t - VIEW_MS) return false;
    if (seen.size > 100000) for (const [kk, tt] of seen) { if (tt <= t - VIEW_MS) seen.delete(kk); }
    if (seen.size > 100000) seen.clear();
    seen.set(k, t);
    q.addView.run(movie);
    q.addViewDay.run(movie, dayOf(t));
    return true;
  }
  // Toshkent vaqti bo'yicha kun raqami (yarim tunda yangi kun boshlanadi)
  const dayOf = t => Math.floor((t + 5 * 3600000) / 86400000);
  // TOP: so'nggi 1 / 7 / 30 kun yoki hamma vaqt; natija 1 daqiqa keshlanadi
  const topCache = new Map();
  function topOf(days, limit) {
    const key = days + ':' + limit, c = topCache.get(key), t = now();
    if (c && c.at > t - 60000) return c.items;
    const rows = days ? q.topSince.all(dayOf(t) - days + 1, limit) : q.topAll.all(limit);
    const items = rows.map(r => ({ movie: Number(r.movie_id), views: Number(r.n) }));
    topCache.set(key, { at: t, items });
    return items;
  }
  // izoh matni: boshqaruv va ko'rinmas belgilarsiz, 2 tadan ortiq bo'sh qatorsiz, 1000 belgigacha
  const cleanText = t => String(t || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F​-‏‪-‮]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim().slice(0, 1000);

  const tx = fn => { db.exec('BEGIN IMMEDIATE'); try { const r = fn(); db.exec('COMMIT'); return r; } catch (e) { db.exec('ROLLBACK'); throw e; } };

  /* --- Click (Shop API) --- */
  const fail = (p, code, note, extra = {}) => ({ click_trans_id: p.click_trans_id, merchant_trans_id: p.merchant_trans_id, ...extra, error: code, error_note: note });
  const ERR = { sign: [-1, 'SIGN CHECK FAILED!'], amount: [-2, 'Incorrect parameter amount'], action: [-3, 'Action not found'],
                paid: [-4, 'Already paid'], noUser: [-5, 'User does not exist'], noTx: [-6, 'Transaction does not exist'],
                req: [-8, 'Error in request from click'], cancelled: [-9, 'Transaction cancelled'] };
  const e = (p, k, extra) => fail(p, ERR[k][0], ERR[k][1], extra);
  const timingSafe = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  const sameAmount = (clickAmount, so) => Math.round(Number(clickAmount) * 100) === so * 100;

  function clickPrepare(p) {
    for (const k of ['click_trans_id', 'service_id', 'merchant_trans_id', 'amount', 'action', 'sign_time', 'sign_string']) {
      if (p[k] === undefined || p[k] === '') return e(p, 'req');
    }
    if (String(p.service_id) !== String(cfg.serviceId)) return e(p, 'req');
    const sign = md5(`${p.click_trans_id}${p.service_id}${cfg.secretKey}${p.merchant_trans_id}${p.amount}${p.action}${p.sign_time}`);
    if (!timingSafe(sign, String(p.sign_string))) return e(p, 'sign');
    if (Number(p.action) !== 0) return e(p, 'action');
    const order = /^\d+$/.test(String(p.merchant_trans_id)) ? q.order.get(Number(p.merchant_trans_id)) : null;
    if (!order) return e(p, 'noUser');
    if (!sameAmount(p.amount, order.amount)) return e(p, 'amount');
    if (order.status === 'paid') return e(p, 'paid');
    if (order.status === 'cancelled') return e(p, 'cancelled');
    q.setPrepared.run(String(p.click_trans_id), String(p.click_paydoc_id || ''), order.id);
    return { click_trans_id: p.click_trans_id, merchant_trans_id: p.merchant_trans_id, merchant_prepare_id: order.id, error: 0, error_note: 'Success' };
  }

  function clickComplete(p) {
    for (const k of ['click_trans_id', 'service_id', 'merchant_trans_id', 'merchant_prepare_id', 'amount', 'action', 'sign_time', 'sign_string']) {
      if (p[k] === undefined || p[k] === '') return e(p, 'req');
    }
    if (String(p.service_id) !== String(cfg.serviceId)) return e(p, 'req');
    const sign = md5(`${p.click_trans_id}${p.service_id}${cfg.secretKey}${p.merchant_trans_id}${p.merchant_prepare_id}${p.amount}${p.action}${p.sign_time}`);
    if (!timingSafe(sign, String(p.sign_string))) return e(p, 'sign');
    if (Number(p.action) !== 1) return e(p, 'action');
    const order = /^\d+$/.test(String(p.merchant_trans_id)) ? q.order.get(Number(p.merchant_trans_id)) : null;
    if (!order) return e(p, 'noUser');
    if (String(order.id) !== String(p.merchant_prepare_id) || order.click_trans_id !== String(p.click_trans_id)) return e(p, 'noTx');
    if (!sameAmount(p.amount, order.amount)) return e(p, 'amount');
    if (order.status === 'paid') return e(p, 'paid');
    if (order.status === 'cancelled') return e(p, 'cancelled');
    if (order.status !== 'prepared') return e(p, 'noTx');
    if (Number(p.error) < 0) { q.setCancelled.run(order.id); return e(p, 'cancelled'); }   // Click to'lovni bekor qildi
    tx(() => {
      q.setPaid.run(now(), order.id);
      q.credit.run(order.amount, order.uid);
      q.addPayment.run(order.uid, now(), order.amount, 'topup', 'Click', String(order.id), null, null);
    });
    return { click_trans_id: p.click_trans_id, merchant_trans_id: p.merchant_trans_id, merchant_confirm_id: order.id, error: 0, error_note: 'Success' };
  }

  /* --- Telegram orqali tasdiqlash ---
     1) sayt /api/tg/start → chipta (ticket) va t.me havolasi
     2) foydalanuvchi botni ochadi → Telegram /tg/webhook ga "/start <ticket>" yuboradi
     3) server 6 xonali kod yaratib, botdan foydalanuvchiga yuboradi (kod bazada faqat xesh holida)
     4) sayt /api/tg/verify {ticket, code} → sessiya tokeni */
  const TICKET_MS = 10 * 60000;             // chipta 10 daqiqa yashaydi
  const tgOn = () => !!(cfg.tgBotToken && cfg.tgBotName);
  const tgSend = deps.tgSend || (async (chatId, text) => {
    await fetch(`https://api.telegram.org/bot${cfg.tgBotToken}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
  });

  function tgStart() {
    q.dropTickets.run(now());
    const ticket = crypto.randomBytes(16).toString('base64url');
    q.addTicket.run(ticket, now(), now() + TICKET_MS);
    return { ticket, link: `https://t.me/${cfg.tgBotName}?start=${ticket}` };
  }

  async function tgWebhook(update) {
    const msg = update && (update.message || update.edited_message);
    const text = msg && msg.text ? String(msg.text).trim() : '';
    const chat = msg && msg.chat ? msg.chat : null;
    if (!chat) return { ok: true };
    const m = /^\/start\s+([\w-]{10,64})$/.exec(text);
    if (!m) {
      await tgSend(chat.id, 'DezoMax: tasdiqlash uchun saytdagi «Telegram orqali tasdiqlash» tugmasini bosing.');
      return { ok: true };
    }
    const tkt = q.ticket.get(m[1]);
    if (!tkt || tkt.used || tkt.expires_at <= now()) {
      await tgSend(chat.id, 'Havola eskirgan. Saytda tugmani qayta bosing.');
      return { ok: true };
    }
    const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
    const name = [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(' ').slice(0, 60);
    q.setTicketCode.run(sha256(code), String(chat.id), name, now() + TICKET_MS, tkt.ticket);
    await tgSend(chat.id, `DezoMax tasdiqlash kodi: <b>${code}</b>\n\nKodni saytdagi oynaga yozing. Kod 10 daqiqa amal qiladi.\nAgar buni siz so'ramagan bo'lsangiz — kodni hech kimga bermang.`);
    return { ok: true };
  }

  function tgVerify(ticket, code) {
    const tkt = q.ticket.get(String(ticket || ''));
    if (!tkt || tkt.used || !tkt.code_hash || tkt.expires_at <= now()) return { error: 'Kod eskirgan, qaytadan urining' };
    if (tkt.tries >= 5) return { error: 'Juda ko\'p urinish. Botni qayta oching.' };
    q.ticketTry.run(tkt.ticket);
    if (!timingSafe(sha256(String(code || '')), tkt.code_hash)) return { error: 'Kod noto\'g\'ri' };
    q.ticketUsed.run(tkt.ticket);
    const uid = 'tg_' + tkt.tg_id;
    q.upsertUser.run(uid, '', tkt.tg_name || '', now());
    const token = crypto.randomBytes(32).toString('base64url');
    q.addSession.run(sha256(token), uid, now() + SESSION_MS);
    return { token, uid, name: tkt.tg_name || '', balance: q.user.get(uid).balance };
  }

  /* --- Sessiya --- */
  const ipOf = req => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim().replace(/^::ffff:/, '').slice(0, 45);
  const authUser = req => {
    const m = /^Bearer\s+([\w-]{20,})$/.exec(req.headers.authorization || '');
    if (!m) return null;
    const th = sha256(m[1]);
    const s = q.session.get(th, now());
    if (!s) return null;
    const ip = ipOf(req);
    if (!s.last_seen || now() - s.last_seen > 300000 || (ip && ip !== s.ip)) q.seen.run(now(), ip || s.ip || null, th);
    const u = q.user.get(s.uid);
    return u ? Object.assign(u, { th }) : null;
  };

  /* --- Qurilmalar (akkauntga kirgan joylar) --- */
  const deviceOf = d => {
    if (!d || typeof d !== 'object' || !/^d[a-z0-9]{4,40}$/.test(String(d.id || ''))) return null;
    const clean = v => String(v || '').replace(/[^\w .\-]/g, '').trim().slice(0, 30);
    return { id: String(d.id), os: clean(d.os), app: clean(d.app), model: clean(d.model), type: ['desktop', 'tablet'].includes(d.type) ? d.type : 'phone' };
  };
  // bir qurilmadagi bir nechta sessiya — bitta qator (eng yangisi)
  const devicesOf = user => {
    const seen = new Set(), out = [];
    for (const r of q.devices.all(user.uid, now())) {
      const key = r.device_id || 's' + r.token_hash.slice(0, 12);
      if (seen.has(key)) continue;
      seen.add(key);
      let d = {}; try { d = JSON.parse(r.device || '{}'); } catch {}
      out.push({ id: key, os: d.os || '', app: d.app || '', model: d.model || '', type: d.type || 'phone', current: r.token_hash === user.th, addedAt: r.created_at || null, lastSeen: r.last_seen || null, ip: r.ip || '' });
    }
    return out.sort((a, b) => b.current - a.current || (b.lastSeen || 0) - (a.lastSeen || 0));
  };

  /* --- Oddiy tezlik cheklovi (IP bo'yicha, daqiqada) --- */
  const hits = new Map();
  const limited = (req, key, max) => {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const k = key + '|' + ip, t = Math.floor(now() / 60000), h = hits.get(k);
    if (!h || h.t !== t) { hits.set(k, { t, n: 1 }); if (hits.size > 5000) hits.clear(); return false; }
    return ++h.n > max;
  };

  const origins = new Set(cfg.origins || []);
  const cors = (req, res) => {
    const o = req.headers.origin;
    if (o && origins.has(o)) {
      res.setHeader('Access-Control-Allow-Origin', o);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Max-Age', '86400');
    }
  };
  const send = (res, code, obj) => { res.statusCode = code; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(obj)); };

  const readBody = req => new Promise((resolve, reject) => {
    let n = 0; const chunks = [];
    req.on('data', c => { n += c.length; if (n > 16384) { reject(new Error('body katta')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      try {
        if (/json/.test(req.headers['content-type'] || '')) resolve(raw ? JSON.parse(raw) : {});
        else resolve(Object.fromEntries(new URLSearchParams(raw)));
      } catch (er) { reject(er); }
    });
    req.on('error', reject);
  });

  const handler = async (req, res) => {
    const url = new URL(req.url, 'http://x');
    const path = url.pathname;
    cors(req, res);
    if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
    try {
      if (path === '/health') return send(res, 200, { ok: true });

      if (path === '/click/prepare' || path === '/click/complete') {
        if (req.method !== 'POST') return send(res, 405, { error: 'POST kerak' });
        let p = {};
        try { p = await readBody(req); } catch { return send(res, 200, e({}, 'req')); }
        const out = path.endsWith('prepare') ? clickPrepare(p) : clickComplete(p);
        // maxfiy kalit va imzo yozilmaydi
        console.log(JSON.stringify({ t: new Date().toISOString(), click: path.slice(7), trans: p.click_trans_id, order: p.merchant_trans_id, amount: p.amount, error: out.error }));
        return send(res, 200, out);
      }

      if (path === '/tg/webhook' && req.method === 'POST') {
        // Telegram faqat maxfiy yo'l bilan chaqiradi (setWebhook'da secret_token beriladi)
        if (cfg.tgWebhookSecret && req.headers['x-telegram-bot-api-secret-token'] !== cfg.tgWebhookSecret) return send(res, 401, { ok: false });
        if (!tgOn()) return send(res, 200, { ok: true });
        let u = {};
        try { u = await readBody(req); } catch { return send(res, 200, { ok: true }); }
        return send(res, 200, await tgWebhook(u));
      }
      if (path === '/api/tg/start' && req.method === 'POST') {
        if (!tgOn()) return send(res, 503, { error: 'Telegram ulanmagan' });
        if (limited(req, 'tgstart', 20)) return send(res, 429, { error: 'Ko\'p urinish' });
        return send(res, 200, tgStart());
      }
      if (path === '/api/tg/verify' && req.method === 'POST') {
        if (!tgOn()) return send(res, 503, { error: 'Telegram ulanmagan' });
        if (limited(req, 'tgverify', 30)) return send(res, 429, { error: 'Ko\'p urinish' });
        const b = await readBody(req);
        const r = tgVerify(b.ticket, b.code);
        return send(res, r.error ? 400 : 200, r);
      }

      if (path === '/api/login' && req.method === 'POST') {
        if (limited(req, 'login', 20)) return send(res, 429, { error: 'Ko‘p urinish, keyinroq qayta urining' });
        const b = await readBody(req);
        let g; try { g = await verifyGoogle(String(b.idToken || '')); } catch (er) { return send(res, 401, { error: 'Google tasdiqlashi o‘tmadi' }); }
        const uid = 'google_' + g.sub;
        q.upsertUser.run(uid, g.email, g.name, now());
        q.dropOld.run(now());
        const token = crypto.randomBytes(32).toString('base64url'), th = sha256(token);
        q.addSession.run(th, uid, now() + SESSION_MS);
        const dev = deviceOf(b.device);
        q.setDevice.run(dev ? dev.id : null, dev ? JSON.stringify(dev) : null, now(), now(), th);
        if (dev) q.dropDevice.run(uid, dev.id, '-', th);
        q.seen.run(now(), ipOf(req) || null, th);
        return send(res, 200, { token, uid, balance: q.user.get(uid).balance });
      }

      const user = authUser(req);
      if (path === '/social' && req.method === 'GET') {
        if (limited(req, 'social', 120)) return send(res, 429, { error: 'Ko‘p so‘rov' });
        const movie = movieIdOf(url.searchParams.get('movie'));
        if (!movie) return send(res, 400, { error: 'movie kerak' });
        return send(res, 200, socialOf(movie, user));
      }
      if (path === '/top' && req.method === 'GET') {
        if (limited(req, 'top', 60)) return send(res, 429, { error: 'Ko‘p so‘rov' });
        const d = url.searchParams.get('days');
        const days = d === 'all' ? 0 : [1, 7, 30].includes(Number(d)) ? Number(d) : 1;
        const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit')) || 30));
        return send(res, 200, { days: days || 'all', items: topOf(days, limit) });
      }
      if (path === '/view' && req.method === 'POST') {
        if (limited(req, 'view', 60)) return send(res, 429, { error: 'Ko‘p so‘rov' });
        const b = await readBody(req).catch(() => ({}));
        const movie = movieIdOf(b.movie);
        if (!movie) return send(res, 400, { error: 'movie kerak' });
        addView(req, movie);
        return send(res, 200, { views: q.views.get(movie)?.n || 0 });
      }
      if (path.startsWith('/api/')) {
        if (!user) return send(res, 401, { error: 'Qayta kiring' });

        if (path === '/api/react' && req.method === 'POST') {
          if (limited(req, 'react', 60)) return send(res, 429, { error: 'Ko‘p urinish' });
          const b = await readBody(req);
          const movie = movieIdOf(b.movie), v = Number(b.value);
          if (!movie || ![1, -1, 0].includes(v)) return send(res, 400, { error: 'Noto‘g‘ri so‘rov' });
          if (v === 0) q.delReaction.run(movie, user.uid); else q.setReaction.run(movie, user.uid, v, now());
          const c = q.reactCounts.get(movie) || {};
          return send(res, 200, { likes: Number(c.likes) || 0, dislikes: Number(c.dislikes) || 0, mine: v });
        }
        if (path === '/api/comment' && req.method === 'POST') {
          if (limited(req, 'comment', 6)) return send(res, 429, { error: 'Juda tez yozyapsiz — biroz kuting' });
          const b = await readBody(req);
          const movie = movieIdOf(b.movie), text = cleanText(b.text);
          if (!movie) return send(res, 400, { error: 'Noto‘g‘ri so‘rov' });
          if (text.length < 2) return send(res, 400, { error: 'Izoh juda qisqa' });
          if (q.recentByUser.get(user.uid, now() - 3600000).n >= 30) return send(res, 429, { error: 'Bir soatda 30 tadan ortiq izoh yozib bo‘lmaydi' });
          const name = String(user.name || '').trim().slice(0, 60) || 'Tomoshabin';
          const id = Number(q.addComment.run(movie, user.uid, name, text, now()).lastInsertRowid);
          return send(res, 200, { id, name, text, at: now(), mine: true, canDelete: true });
        }
        if (path === '/api/comment/delete' && req.method === 'POST') {
          const b = await readBody(req);
          const c = q.comment.get(Number(b.id) || 0);
          if (!c || c.hidden) return send(res, 404, { error: 'Izoh topilmadi' });
          if (c.uid !== user.uid && !admins.has(user.uid)) return send(res, 403, { error: 'Faqat o‘z izohingizni o‘chira olasiz' });
          q.hideComment.run(c.id);
          return send(res, 200, { ok: true });
        }

        if (path === '/api/device' && req.method === 'POST') {
          const b = await readBody(req).catch(() => ({}));
          const dev = deviceOf(b.device);
          if (dev) {
            q.setDevice.run(dev.id, JSON.stringify(dev), now(), now(), user.th);
            q.dropDevice.run(user.uid, dev.id, '-', user.th);   // shu qurilmaning eski sessiyalari
          }
          return send(res, 200, { devices: devicesOf(user) });
        }
        if (path === '/api/devices' && req.method === 'GET') {
          return send(res, 200, { devices: devicesOf(user) });
        }
        if (path === '/api/devices/remove' && req.method === 'POST') {
          const b = await readBody(req).catch(() => ({}));
          const id = String(b.id || '');
          if (!/^[\w-]{4,41}$/.test(id)) return send(res, 400, { error: 'Noto‘g‘ri so‘rov' });
          const cur = devicesOf(user).find(d => d.current);
          if (cur && cur.id === id) return send(res, 400, { error: 'Bu qurilmadan «Chiqish» tugmasi bilan chiqing' });
          q.dropDevice.run(user.uid, id, /^s[0-9a-f]{12}$/.test(id) ? id.slice(1) : '-', user.th);
          return send(res, 200, { devices: devicesOf(user) });
        }

        if (path === '/api/me' && req.method === 'GET') {
          return send(res, 200, { uid: user.uid, balance: user.balance, payments: q.payments.all(user.uid) });
        }
        if (path === '/api/order' && req.method === 'POST') {
          if (limited(req, 'order', 30)) return send(res, 429, { error: 'Ko‘p urinish' });
          const b = await readBody(req);
          const amount = Math.floor(Number(b.amount));
          if (!(amount >= MIN && amount <= MAX)) return send(res, 400, { error: `Summa ${MIN} dan ${MAX} so‘mgacha bo‘lishi kerak` });
          const id = Number(q.addOrder.run(user.uid, amount, now()).lastInsertRowid);
          const link = new URL('https://my.click.uz/services/pay');
          link.searchParams.set('service_id', cfg.serviceId);
          link.searchParams.set('merchant_id', cfg.merchantId);
          link.searchParams.set('amount', String(amount));
          link.searchParams.set('transaction_param', String(id));
          if (cfg.returnUrl) link.searchParams.set('return_url', cfg.returnUrl);
          return send(res, 200, { orderId: id, url: link.toString() });
        }
        if (path === '/api/spend' && req.method === 'POST') {
          const b = await readBody(req);
          const amount = Math.floor(Number(b.amount));
          if (!(amount > 0 && amount <= MAX)) return send(res, 400, { error: 'Summa noto‘g‘ri' });
          const kind = b.kind === 'plan' ? 'plan' : 'other';
          const ok = tx(() => {
            if (q.debit.run(amount, user.uid, amount).changes !== 1) return false;
            q.addPayment.run(user.uid, now(), -amount, kind, null, null, b.plan ? String(b.plan).slice(0, 20) : null, Number(b.days) || null);
            return true;
          });
          if (!ok) return send(res, 402, { error: 'Balansda mablag‘ yetarli emas', balance: q.user.get(user.uid).balance });
          return send(res, 200, { balance: q.user.get(user.uid).balance });
        }
      }
      return send(res, 404, { error: 'Topilmadi' });
    } catch (er) {
      console.error(er);
      return send(res, 500, { error: 'Server xatosi' });
    }
  };
  return { handler, db, clickPrepare, clickComplete };
}

module.exports = { createApp, openDb, googleVerifier, md5 };

/* ---------- Ishga tushirish ---------- */
if (require.main === module) {
  const need = ['CLICK_SERVICE_ID', 'CLICK_MERCHANT_ID', 'CLICK_SECRET_KEY', 'GOOGLE_CLIENT_ID'];   // TG_* ixtiyoriy
  const miss = need.filter(k => !process.env[k]);
  if (miss.length) { console.error('Muhit o‘zgaruvchilari yetishmayapti: ' + miss.join(', ') + ' (server/.env.example ga qarang)'); process.exit(1); }
  const cfg = {
    serviceId: process.env.CLICK_SERVICE_ID, merchantId: process.env.CLICK_MERCHANT_ID,
    secretKey: process.env.CLICK_SECRET_KEY, googleClientId: process.env.GOOGLE_CLIENT_ID,
    dbFile: process.env.DB_FILE || 'dezomax-pay.db',
    origins: (process.env.ALLOWED_ORIGINS || 'https://abdulazizjuraev.github.io').split(',').map(s => s.trim()).filter(Boolean),
    returnUrl: process.env.RETURN_URL || 'https://abdulazizjuraev.github.io/dezomax/account.html#balance',
    tgBotToken: process.env.TG_BOT_TOKEN || '',          // @BotFather bergan token — faqat shu yerda
    tgBotName: process.env.TG_BOT_NAME || '',            // bot foydalanuvchi nomi (@siz)
    tgWebhookSecret: process.env.TG_WEBHOOK_SECRET || '',
    adminUids: (process.env.ADMIN_UIDS || '').split(',').map(s => s.trim()).filter(Boolean)   // izohlarni o'chira oladiganlar
  };
  const app = createApp(cfg);
  const port = Number(process.env.PORT) || 8787;
  http.createServer(app.handler).listen(port, process.env.HOST || '127.0.0.1', () => console.log('DezoMax to‘lov serveri: port ' + port));
}
