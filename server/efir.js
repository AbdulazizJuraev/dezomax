/* ============================================================
   DezoMax — o'z jonli efirimiz (TEST), 2026-11-18
   Brauzer (efir-test.html) kamera/ekranni MediaRecorder bilan WebSocket orqali yuboradi →
   ffmpeg → HLS (/var/lib/dezomax-efir/hls) → tomoshabinlar hls.js bilan ko'radi.
   Hammasi 443 (nginx) orqali — yangi port ochilmaydi.
   - Efir qilish: faqat adminlar (ADMIN_UIDS, /etc/dezomax-pay.env). Kirish tokeni to'lov serverining
     /api/me orqali tekshiriladi (to'lov serveri o'zgartirilmagan).
   - Bitta efir (test): yangi efir boshlansa — eskisi to'xtaydi.
   Tashqi kutubxonasiz (Node 22): WebSocket shu faylda yozilgan.
   ============================================================ */
'use strict';
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = Number(process.env.EFIR_PORT || 3600);
const PAY = process.env.EFIR_PAY || 'http://127.0.0.1:8787';
const DIR = process.env.EFIR_DIR || '/var/lib/dezomax-efir/hls';
const ADMINS = new Set((process.env.ADMIN_UIDS || '').split(',').map(s => s.trim()).filter(Boolean));
const OBS_DIR = process.env.EFIR_OBS_DIR || '/var/lib/dezomax-efir-obs';      // nginx-rtmp HLS (OBS)
const KEY_FILE = path.join(path.dirname(DIR), 'obs-key.json');                 // OBS efir kaliti (faqat serverda)
const RTMP_URL = process.env.EFIR_RTMP_URL || 'rtmp://2.29.52.42/live';
const ORIGINS = /^https:\/\/(dezomax\.uz|www\.dezomax\.uz|[\w-]+\.github\.io)$|^http:\/\/localhost(:\d+)?$/;

fs.mkdirSync(DIR, { recursive: true });

const S = { live: false, src: '', title: '', nextTitle: '', started: 0, uid: '', bytes: 0, ff: null, sock: null, quality: '' };
const readKey = () => { try { return JSON.parse(fs.readFileSync(KEY_FILE, 'utf8')); } catch { return null; } };
function newKey(uid) {
  const k = { key: 'dzx_' + crypto.randomBytes(18).toString('base64url'), uid, at: Date.now() };
  fs.writeFileSync(KEY_FILE, JSON.stringify(k), { mode: 0o600 });
  return k;
}
const sameKey = (a, b) => typeof a === 'string' && typeof b === 'string' && a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
// nginx-rtmp chaqiruvlari faqat server ichidan (tashqi nginx /efir/ orqali kelganlarda X-Real-IP bo'ladi)
const local = req => !req.headers['x-real-ip'] && /^(::ffff:)?127\.0\.0\.1$|^::1$/.test(req.socket.remoteAddress || '');
function readBody(req, max = 16384) {
  return new Promise((ok, no) => { let b = ''; req.on('data', c => { b += c; if (b.length > max) { req.destroy(); no(new Error('big')); } }); req.on('end', () => ok(b)); req.on('error', no); });
}
async function adminOf(req) {
  const m = /^Bearer\s+(\S+)$/.exec(req.headers.authorization || '');
  const uid = m ? await whoIs(m[1], String(req.headers['x-real-ip'] || '')) : null;
  return uid && ADMINS.has(uid) ? uid : null;
}
const viewers = new Map();     // ip -> oxirgi so'rov vaqti (m3u8)
const viewerCount = () => { const t = Date.now() - 15000; let n = 0; for (const [k, v] of viewers) { if (v > t) n++; else viewers.delete(k); } return n; };

function clearDir() { for (const f of fs.readdirSync(DIR)) fs.rmSync(path.join(DIR, f), { force: true }); }

async function whoIs(token, ip) {
  if (!/^[\w-]{20,}$/.test(token || '')) return null;
  try {
    const r = await fetch(PAY + '/api/me', { headers: { Authorization: 'Bearer ' + token, ...(ip ? { 'X-Real-IP': ip, 'X-Forwarded-For': ip } : {}) } });
    if (!r.ok) return null;
    const j = await r.json();
    return j && j.uid ? j.uid : null;
  } catch { return null; }
}

function cors(req, h = {}) {
  const o = req.headers.origin || '';
  if (ORIGINS.test(o)) { h['Access-Control-Allow-Origin'] = o; h['Vary'] = 'Origin'; h['Access-Control-Allow-Headers'] = 'Authorization'; }
  return h;
}
function send(req, res, code, obj) {
  res.writeHead(code, cors(req, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }));
  res.end(JSON.stringify(obj));
}
const status = () => ({ live: S.live, src: S.src, title: S.title, started: S.started, viewers: viewerCount(), quality: S.quality,
  playlist: S.live ? (S.src === 'obs' ? '/efir/obs/main.m3u8' : '/efir/hls/index.m3u8') : '' });

/* ---------- HTTP ---------- */
const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;
  if (req.method === 'OPTIONS') { res.writeHead(204, cors(req, { 'Access-Control-Allow-Methods': 'GET, POST', 'Access-Control-Allow-Headers': 'Authorization, Content-Type' })); return res.end(); }

  /* --- OBS (nginx-rtmp): kalit tekshiruvi va efir tugashi — faqat server ichidan --- */
  if (p === '/efir/obs/auth' && req.method === 'POST') {
    if (!local(req)) return send(req, res, 403, { error: 'no' });
    const f = new URLSearchParams(await readBody(req).catch(() => ''));
    const k = readKey();
    if (!k || !sameKey(f.get('name') || '', k.key)) { console.log('[obs] noto‘g‘ri kalit', f.get('addr')); res.writeHead(403); return res.end(); }
    if (S.live && S.src === 'web') stopLive('OBS efiri boshlandi');
    Object.assign(S, { live: true, src: 'obs', title: S.nextTitle || 'DezoMax efiri', started: Date.now(), uid: k.uid, quality: 'OBS' });
    console.log('[obs] efir boshlandi', f.get('addr'));
    res.writeHead(302, { Location: 'main' }); return res.end();          // oqim nomi «main» — kalit tomoshabinlarga ko'rinmaydi
  }
  if (p === '/efir/obs/done' && req.method === 'POST') {
    if (!local(req)) return send(req, res, 403, { error: 'no' });
    if (S.src === 'obs') { Object.assign(S, { live: false, src: '', title: '', started: 0, uid: '', quality: '' }); console.log('[obs] efir tugadi'); }
    res.writeHead(200); return res.end();
  }
  /* --- OBS sozlamalari (faqat adminlar): server manzili + kalit, yangi kalit, efir nomi --- */
  if (p === '/efir/obs' && req.method === 'GET') {
    const uid = await adminOf(req);
    if (!uid) return send(req, res, 403, { error: 'Faqat adminlar uchun' });
    const k = readKey() || newKey(uid);
    return send(req, res, 200, { server: RTMP_URL, key: k.key });
  }
  if (p === '/efir/obs/key' && req.method === 'POST') {
    const uid = await adminOf(req);
    if (!uid) return send(req, res, 403, { error: 'Faqat adminlar uchun' });
    return send(req, res, 200, { server: RTMP_URL, key: newKey(uid).key });
  }
  if (p === '/efir/meta' && req.method === 'POST') {
    const uid = await adminOf(req);
    if (!uid) return send(req, res, 403, { error: 'Faqat adminlar uchun' });
    let b = {}; try { b = JSON.parse(await readBody(req)); } catch {}
    S.nextTitle = String(b.title || '').slice(0, 120);
    if (S.live && S.nextTitle) S.title = S.nextTitle;
    return send(req, res, 200, { ok: true });
  }
  if (p === '/efir/status') return send(req, res, 200, status());
  if (p === '/efir/check') {
    const m = /^Bearer\s+(\S+)$/.exec(req.headers.authorization || '');
    const uid = m ? await whoIs(m[1], String(req.headers['x-real-ip'] || '')) : null;
    return send(req, res, 200, { login: !!uid, admin: !!uid && ADMINS.has(uid) });
  }
  // HLS: ro'yxat (m3u8) va bo'laklar (ts). Tomoshabinlar soni m3u8 so'rovlaridan
  const hm = /^\/efir\/(hls|obs)\/([\w.-]+\.(m3u8|ts))$/.exec(p);
  if (hm) {
    hm.splice(1, 1, hm[1] === 'obs' ? OBS_DIR : DIR);
    const f = path.join(hm[1], hm[2]);
    if (!fs.existsSync(f)) return send(req, res, 404, { error: 'efir yo‘q' });
    const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress || '');
    if (hm[3] === 'm3u8') viewers.set(ip, Date.now());
    res.writeHead(200, cors(req, {
      'Content-Type': hm[3] === 'm3u8' ? 'application/vnd.apple.mpegurl' : 'video/mp2t',
      'Cache-Control': hm[3] === 'm3u8' ? 'no-cache' : 'public, max-age=60'
    }));
    return fs.createReadStream(f).on('error', () => res.end()).pipe(res);
  }
  send(req, res, 404, { error: 'topilmadi' });
});

/* ---------- WebSocket (RFC 6455, minimal) ---------- */
function wsFrame(op, payload) {
  const len = payload.length;
  const head = len < 126 ? Buffer.from([0x80 | op, len])
    : len < 65536 ? Buffer.from([0x80 | op, 126, len >> 8, len & 255])
    : (() => { const b = Buffer.alloc(10); b[0] = 0x80 | op; b[1] = 127; b.writeBigUInt64BE(BigInt(len), 2); return b; })();
  return Buffer.concat([head, payload]);
}
const wsText = (sock, obj) => { try { sock.write(wsFrame(1, Buffer.from(JSON.stringify(obj)))); } catch {} };

function stopLive(reason) {
  if (S.ff) { try { S.ff.stdin.end(); } catch {} const ff = S.ff; setTimeout(() => { try { ff.kill('SIGKILL'); } catch {} }, 4000); }
  if (S.sock) { wsText(S.sock, { type: 'stopped', reason }); try { S.sock.end(wsFrame(8, Buffer.alloc(0))); } catch {} }
  S.live = false; S.src = ''; S.ff = null; S.sock = null; S.title = ''; S.started = 0; S.uid = ''; S.quality = '';
  setTimeout(() => { if (!S.live) clearDir(); }, 30000);
}

function startFfmpeg(mime, quality) {
  clearDir();
  const copy = /avc1|h264/i.test(mime);              // Chrome H.264 — qayta kodlanmaydi (server yengil)
  const h = { '480': 480, '720': 720, '1080': 1080 }[quality] || 720;
  const br = { 480: '1200k', 720: '2800k', 1080: '5000k' }[h];
  const v = copy ? ['-c:v', 'copy']
    : ['-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency', '-vf', `scale=-2:'min(${h},ih)'`, '-r', '30', '-g', '60', '-keyint_min', '60', '-sc_threshold', '0',
       '-b:v', br, '-maxrate', br, '-bufsize', String(parseInt(br) * 2) + 'k', '-pix_fmt', 'yuv420p'];
  const args = ['-hide_banner', '-loglevel', 'warning', '-fflags', '+genpts+nobuffer', '-i', 'pipe:0',
    ...v, '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-ac', '2',
    '-f', 'hls', '-hls_time', '2', '-hls_list_size', '8', '-hls_flags', 'delete_segments+independent_segments+omit_endlist',
    '-hls_segment_filename', path.join(DIR, 's%05d.ts'), path.join(DIR, 'index.m3u8')];
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'ignore', 'pipe'] });
  ff.stderr.on('data', d => { const t = String(d).trim(); if (t) console.log('[ffmpeg]', t.slice(0, 300)); });
  ff.stdin.on('error', () => {});
  ff.on('exit', code => { console.log('[ffmpeg] exit', code); if (S.ff === ff) stopLive('ffmpeg'); });
  return { ff, copy };
}

server.on('upgrade', (req, sock) => {
  if (new URL(req.url, 'http://x').pathname !== '/efir/ingest' || !req.headers['sec-websocket-key'] || !ORIGINS.test(req.headers.origin || '')) return sock.destroy();
  const accept = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.setNoDelay(true);

  let buf = Buffer.alloc(0), authed = false, mine = false, stats = null;
  const authTimer = setTimeout(() => { if (!authed) sock.destroy(); }, 8000);
  const close = () => {
    clearTimeout(authTimer); clearInterval(stats);
    if (mine && S.sock === sock) stopLive('uzildi');
  };
  sock.on('close', close); sock.on('error', close);

  async function onText(t) {
    let m; try { m = JSON.parse(t); } catch { return; }
    if (m.type === 'hello' && !authed) {
      const uid = await whoIs(String(m.token || ''), String(req.headers['x-real-ip'] || ''));
      if (!uid || !ADMINS.has(uid)) { wsText(sock, { type: 'error', error: uid ? 'Efir faqat adminlar uchun' : 'Avval akkauntga kiring' }); return sock.end(wsFrame(8, Buffer.alloc(0))); }
      if (S.live && S.src === 'obs') { wsText(sock, { type: 'error', error: 'Hozir OBS orqali efir ketmoqda — avval uni to‘xtating' }); return sock.end(wsFrame(8, Buffer.alloc(0))); }
      authed = true; clearTimeout(authTimer);
      if (S.live) stopLive('yangi efir boshlandi');
      const { ff, copy } = startFfmpeg(String(m.mime || ''), String(m.quality || '720'));
      Object.assign(S, { live: true, src: 'web', title: String(m.title || 'DezoMax efiri').slice(0, 120), started: Date.now(), uid, bytes: 0, ff, sock, quality: String(m.quality || '720') });
      mine = true;
      wsText(sock, { type: 'ready', copy });
      let last = 0;
      stats = setInterval(() => { wsText(sock, { type: 'stats', kbps: Math.round((S.bytes - last) * 8 / 5000), viewers: viewerCount(), hls: fs.existsSync(path.join(DIR, 'index.m3u8')) }); last = S.bytes; }, 5000);
    } else if (m.type === 'title' && mine) S.title = String(m.title || '').slice(0, 120);
  }

  sock.on('data', chunk => {
    buf = Buffer.concat([buf, chunk]);
    for (;;) {
      if (buf.length < 2) return;
      const op = buf[0] & 15, masked = buf[1] & 128;
      let len = buf[1] & 127, off = 2;
      if (len === 126) { if (buf.length < 4) return; len = buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (buf.length < 10) return; len = Number(buf.readBigUInt64BE(2)); off = 10; }
      if (len > 16 * 1024 * 1024) return sock.destroy();
      const need = off + (masked ? 4 : 0) + len;
      if (buf.length < need) return;
      let data = buf.subarray(off + (masked ? 4 : 0), need);
      if (masked) { const k = buf.subarray(off, off + 4); data = Buffer.from(data); for (let i = 0; i < data.length; i++) data[i] ^= k[i & 3]; }
      buf = buf.subarray(need);
      if (op === 8) { try { sock.end(wsFrame(8, Buffer.alloc(0))); } catch {} return; }
      if (op === 9) { try { sock.write(wsFrame(10, data)); } catch {} continue; }
      if (op === 1) { onText(data.toString()); continue; }
      if ((op === 2 || op === 0) && mine && S.ff && S.sock === sock) {
        S.bytes += data.length;
        if (!S.ff.stdin.write(data)) { sock.pause(); S.ff.stdin.once('drain', () => sock.resume()); }
      }
    }
  });
});

server.listen(PORT, '127.0.0.1', () => console.log('DezoMax efir (test): port ' + PORT + ', adminlar: ' + ADMINS.size));
