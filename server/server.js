/* ============================================================
   DezoMax — to'lov serveri (Click Shop API) + balans
   ------------------------------------------------------------
   Nodejs 22+, tashqi kutubxonasiz (faqat node:sqlite). Statik IP'li serverda ishlaydi.
   Maxfiy kalitlar FAQAT muhit o'zgaruvchilarida (server/.env.example) — kodda va GitHub'da YO'Q.

   Yo'llar:
     POST /api/login    {idToken}           Google token → sessiya tokeni, balans
     GET  /api/me                           balans + to'lovlar tarixi            (Bearer token)
     POST /api/order    {amount}            Click to'lov havolasi                (Bearer token)
     POST /api/spend    {amount, plan,days} balansdan yechish (tarif sotib olish) (Bearer token)
     POST /click/prepare, /click/complete   Click chaqiradi (Shop API, imzo MD5)
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
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT NOT NULL REFERENCES users(uid), at INTEGER NOT NULL,
      amount INTEGER NOT NULL, kind TEXT NOT NULL, method TEXT, ref TEXT, plan TEXT, days INTEGER);
    CREATE INDEX IF NOT EXISTS payments_uid ON payments(uid, at DESC);
  `);
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
    session: db.prepare('SELECT uid FROM sessions WHERE token_hash = ? AND expires_at > ?'),
    dropOld: db.prepare('DELETE FROM sessions WHERE expires_at <= ?'),
    addOrder: db.prepare('INSERT INTO orders (uid, amount, created_at) VALUES (?, ?, ?)'),
    order: db.prepare('SELECT * FROM orders WHERE id = ?'),
    setPrepared: db.prepare("UPDATE orders SET status = 'prepared', click_trans_id = ?, click_paydoc_id = ? WHERE id = ?"),
    setPaid: db.prepare("UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ?"),
    setCancelled: db.prepare("UPDATE orders SET status = 'cancelled' WHERE id = ?"),
    credit: db.prepare('UPDATE users SET balance = balance + ? WHERE uid = ?'),
    debit: db.prepare('UPDATE users SET balance = balance - ? WHERE uid = ? AND balance >= ?'),
    addPayment: db.prepare('INSERT INTO payments (uid, at, amount, kind, method, ref, plan, days) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'),
    payments: db.prepare('SELECT id, at, amount, kind, method, plan, days FROM payments WHERE uid = ? ORDER BY at DESC, id DESC LIMIT 100')
  };

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

  /* --- Sessiya --- */
  const authUser = req => {
    const m = /^Bearer\s+([\w-]{20,})$/.exec(req.headers.authorization || '');
    if (!m) return null;
    const s = q.session.get(sha256(m[1]), now());
    return s ? q.user.get(s.uid) : null;
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

      if (path === '/api/login' && req.method === 'POST') {
        if (limited(req, 'login', 20)) return send(res, 429, { error: 'Ko‘p urinish, keyinroq qayta urining' });
        const b = await readBody(req);
        let g; try { g = await verifyGoogle(String(b.idToken || '')); } catch (er) { return send(res, 401, { error: 'Google tasdiqlashi o‘tmadi' }); }
        const uid = 'google_' + g.sub;
        q.upsertUser.run(uid, g.email, g.name, now());
        q.dropOld.run(now());
        const token = crypto.randomBytes(32).toString('base64url');
        q.addSession.run(sha256(token), uid, now() + SESSION_MS);
        return send(res, 200, { token, uid, balance: q.user.get(uid).balance });
      }

      const user = authUser(req);
      if (path.startsWith('/api/')) {
        if (!user) return send(res, 401, { error: 'Qayta kiring' });

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
  const need = ['CLICK_SERVICE_ID', 'CLICK_MERCHANT_ID', 'CLICK_SECRET_KEY', 'GOOGLE_CLIENT_ID'];
  const miss = need.filter(k => !process.env[k]);
  if (miss.length) { console.error('Muhit o‘zgaruvchilari yetishmayapti: ' + miss.join(', ') + ' (server/.env.example ga qarang)'); process.exit(1); }
  const cfg = {
    serviceId: process.env.CLICK_SERVICE_ID, merchantId: process.env.CLICK_MERCHANT_ID,
    secretKey: process.env.CLICK_SECRET_KEY, googleClientId: process.env.GOOGLE_CLIENT_ID,
    dbFile: process.env.DB_FILE || 'dezomax-pay.db',
    origins: (process.env.ALLOWED_ORIGINS || 'https://abdulazizjuraev.github.io').split(',').map(s => s.trim()).filter(Boolean),
    returnUrl: process.env.RETURN_URL || 'https://abdulazizjuraev.github.io/dezomax/account.html#balance'
  };
  const app = createApp(cfg);
  const port = Number(process.env.PORT) || 8787;
  http.createServer(app.handler).listen(port, process.env.HOST || '127.0.0.1', () => console.log('DezoMax to‘lov serveri: port ' + port));
}
