/* Avtomatik sinov: node server/test.js
   Haqiqiy kalit ishlatilmaydi — sinov uchun uydirma kalit. Google tekshiruvi soxta (faqat sinovda). */
'use strict';
const http = require('node:http');
const assert = require('node:assert/strict');
const { createApp, md5 } = require('./server.js');

const sent = [];   // botdan yuborilgan xabarlar (sinovda haqiqiy Telegram chaqirilmaydi)
const cfg = { serviceId: '1', merchantId: '2', secretKey: 'TEST_SECRET_NOT_REAL', googleClientId: 'x', origins: ['http://localhost:5577'],
  returnUrl: 'https://example.test/back', tgBotToken: 'TEST_BOT_TOKEN', tgBotName: 'DezoTestBot', tgWebhookSecret: 'shh' };
const app = createApp(cfg, { tgSend: async (chatId, text) => { sent.push({ chatId, text }); }, verifyGoogle: async t => { if (!t.startsWith('ok:')) throw new Error('bad'); return { sub: t.slice(3), email: t.slice(3) + '@x.test', name: 'T' }; } });
const server = http.createServer(app.handler);

let base;
const call = async (method, path, { body, token, form, origin } = {}) => {
  const headers = {};
  if (token) headers.authorization = 'Bearer ' + token;
  if (origin) headers.origin = origin;
  let data;
  if (form) { headers['content-type'] = 'application/x-www-form-urlencoded'; data = new URLSearchParams(form).toString(); }
  else if (body) { headers['content-type'] = 'application/json'; data = JSON.stringify(body); }
  const r = await fetch(base + path, { method, headers, body: data });
  return { status: r.status, json: await r.json().catch(() => null), headers: r.headers };
};

const S = cfg.secretKey;
const prep = (o, amount, extra = {}) => {
  const p = { click_trans_id: '111', service_id: '1', click_paydoc_id: '9', merchant_trans_id: String(o), amount, action: '0', error: '0', error_note: '', sign_time: '2026-09-19 12:00:00', ...extra };
  p.sign_string = extra.sign_string || md5(`${p.click_trans_id}${p.service_id}${S}${p.merchant_trans_id}${p.amount}${p.action}${p.sign_time}`);
  return p;
};
const comp = (o, prepId, amount, extra = {}) => {
  const p = { click_trans_id: '111', service_id: '1', click_paydoc_id: '9', merchant_trans_id: String(o), merchant_prepare_id: String(prepId), amount, action: '1', error: '0', error_note: '', sign_time: '2026-09-19 12:01:00', ...extra };
  p.sign_string = extra.sign_string || md5(`${p.click_trans_id}${p.service_id}${S}${p.merchant_trans_id}${p.merchant_prepare_id}${p.amount}${p.action}${p.sign_time}`);
  return p;
};

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
  let n = 0; const ok = (name) => console.log('  ✓', name, ++n);

  // --- kirish ---
  assert.equal((await call('POST', '/api/login', { body: { idToken: 'bad' } })).status, 401); ok('soxta Google token rad etildi');
  assert.equal((await call('GET', '/api/me')).status, 401); ok('tokensiz /api/me rad etildi');
  const login = (await call('POST', '/api/login', { body: { idToken: 'ok:u1' } })).json;
  assert.ok(login.token && login.balance === 0); ok('kirish, balans 0');
  const tk = login.token;

  // --- buyurtma ---
  assert.equal((await call('POST', '/api/order', { token: tk, body: { amount: 10 } })).status, 400); ok('kichik summa rad etildi');
  assert.equal((await call('POST', '/api/order', { token: tk, body: { amount: 99999999 } })).status, 400); ok('juda katta summa rad etildi');
  const order = (await call('POST', '/api/order', { token: tk, body: { amount: 29000 } })).json;
  const u = new URL(order.url);
  assert.equal(u.hostname, 'my.click.uz'); assert.equal(u.searchParams.get('transaction_param'), String(order.orderId));
  assert.equal(u.searchParams.get('service_id'), '1'); assert.equal(u.searchParams.get('amount'), '29000'); ok('Click havolasi to‘g‘ri');
  assert.ok(!order.url.includes(S)); ok('havolada maxfiy kalit yo‘q');
  const id = order.orderId;

  // --- Click Prepare ---
  const bad = await call('POST', '/click/prepare', { form: prep(id, '29000.00', { sign_string: 'x'.repeat(32) }) });
  assert.equal(bad.json.error, -1); ok('noto‘g‘ri imzo → -1');
  assert.equal((await call('POST', '/click/prepare', { form: prep(id, '1000.00') })).json.error, -2); ok('noto‘g‘ri summa → -2');
  assert.equal((await call('POST', '/click/prepare', { form: prep(999, '29000.00') })).json.error, -5); ok('yo‘q buyurtma → -5');
  assert.equal((await call('POST', '/click/prepare', { form: prep(id, '29000.00', { action: '5' }) })).json.error, -3); ok('noto‘g‘ri action → -3');
  const p1 = (await call('POST', '/click/prepare', { form: prep(id, '29000.00') })).json;
  assert.equal(p1.error, 0); assert.equal(p1.merchant_prepare_id, id); ok('Prepare muvaffaqiyatli');
  assert.equal((await call('POST', '/click/prepare', { form: prep(id, '29000.00') })).json.error, 0); ok('Prepare takrori xavfsiz');
  assert.equal((await call('GET', '/api/me', { token: tk })).json.balance, 0); ok('Prepare balansni o‘zgartirmadi');

  // --- Click Complete ---
  assert.equal((await call('POST', '/click/complete', { form: comp(id, id, '29000.00', { sign_string: 'y'.repeat(32) }) })).json.error, -1); ok('Complete: noto‘g‘ri imzo → -1');
  assert.equal((await call('POST', '/click/complete', { form: comp(id, 77, '29000.00') })).json.error, -6); ok('Complete: noto‘g‘ri prepare_id → -6');
  assert.equal((await call('POST', '/click/complete', { form: comp(id, id, '5000.00') })).json.error, -2); ok('Complete: noto‘g‘ri summa → -2');
  const c1 = (await call('POST', '/click/complete', { form: comp(id, id, '29000.00') })).json;
  assert.equal(c1.error, 0); assert.equal(c1.merchant_confirm_id, id); ok('Complete muvaffaqiyatli');
  assert.equal((await call('POST', '/click/complete', { form: comp(id, id, '29000.00') })).json.error, -4); ok('Complete takrori → -4 (pul ikki marta qo‘shilmaydi)');
  assert.equal((await call('POST', '/click/prepare', { form: prep(id, '29000.00') })).json.error, -4); ok('to‘langan buyurtmaga Prepare → -4');
  const me = (await call('GET', '/api/me', { token: tk })).json;
  assert.equal(me.balance, 29000); assert.equal(me.payments.length, 1); assert.equal(me.payments[0].kind, 'topup'); ok('balans 29 000, to‘lov tarixda');

  // --- Click bekor qilsa ---
  const o2 = (await call('POST', '/api/order', { token: tk, body: { amount: 10000 } })).json.orderId;
  await call('POST', '/click/prepare', { form: prep(o2, '10000.00', { click_trans_id: '222' }) });
  const cc = (await call('POST', '/click/complete', { form: comp(o2, o2, '10000.00', { click_trans_id: '222', error: '-5017' }) })).json;
  assert.equal(cc.error, -9); assert.equal((await call('GET', '/api/me', { token: tk })).json.balance, 29000); ok('Click bekor qilsa → -9, pul qo‘shilmadi');

  // --- sarflash ---
  assert.equal((await call('POST', '/api/spend', { token: tk, body: { amount: 49000, kind: 'plan', plan: 'premium', days: 30 } })).status, 402); ok('yetarli bo‘lmasa sarflash rad etildi');
  const sp = (await call('POST', '/api/spend', { token: tk, body: { amount: 29000, kind: 'plan', plan: 'standard', days: 30 } })).json;
  assert.equal(sp.balance, 0); ok('sarflash: balans 0');
  assert.equal((await call('POST', '/api/spend', { token: tk, body: { amount: 1 } })).status, 402); ok('manfiy balansga tushmaydi');
  const hist = (await call('GET', '/api/me', { token: tk })).json.payments;
  assert.equal(hist.length, 2); assert.equal(hist[0].amount, -29000); ok('tarixda sarf ko‘rinadi');

  // --- boshqa foydalanuvchi ---
  const t2 = (await call('POST', '/api/login', { body: { idToken: 'ok:u2' } })).json.token;
  assert.equal((await call('GET', '/api/me', { token: t2 })).json.balance, 0); ok('boshqa foydalanuvchi balansini ko‘rmaydi');

  // --- CORS ---
  const c = await call('GET', '/health', { origin: 'http://localhost:5577' });
  assert.equal(c.headers.get('access-control-allow-origin'), 'http://localhost:5577'); ok('CORS: ruxsat etilgan manzil');
  const c2 = await call('GET', '/health', { origin: 'https://evil.test' });
  assert.equal(c2.headers.get('access-control-allow-origin'), null); ok('CORS: begona manzil rad etildi');

  // --- Telegram orqali tasdiqlash ---
  const st = (await call('POST', '/api/tg/start')).json;
  assert.ok(st.ticket && st.link === 'https://t.me/DezoTestBot?start=' + st.ticket); ok('Telegram: chipta va bot havolasi');
  assert.equal((await call('POST', '/tg/webhook', { body: { message: { chat: { id: 55 }, text: '/start ' + st.ticket } } })).status, 401); ok('webhook: maxfiy kalitsiz rad etildi');

  const hook = body => fetch(base + '/tg/webhook', { method: 'POST', headers: { 'content-type': 'application/json', 'x-telegram-bot-api-secret-token': 'shh' }, body: JSON.stringify(body) }).then(r => r.json());
  await hook({ message: { chat: { id: 55 }, from: { first_name: 'Ali' }, text: '/start ' + st.ticket } });
  const code = (sent.at(-1).text.match(/(\d{6})/) || [])[1];
  assert.ok(code && code.length === 6); ok('bot 6 xonali kod yubordi');
  assert.equal((await call('POST', '/api/tg/verify', { body: { ticket: st.ticket, code: code === '000000' ? '111111' : '000000' } })).status, 400); ok('notogri kod rad etildi');
  const v = (await call('POST', '/api/tg/verify', { body: { ticket: st.ticket, code } })).json;
  assert.ok(v.token && v.uid === 'tg_55' && v.balance === 0); ok('togri kod -> sessiya ochildi');
  assert.equal((await call('POST', '/api/tg/verify', { body: { ticket: st.ticket, code } })).status, 400); ok('kod ikkinchi marta ishlamaydi');
  assert.equal((await call('GET', '/api/me', { token: v.token })).json.uid, 'tg_55'); ok('Telegram sessiyasi bilan /api/me ishlaydi');
  const st2 = (await call('POST', '/api/tg/start')).json;
  await hook({ message: { chat: { id: 77 }, from: { first_name: 'B' }, text: '/start ' + st2.ticket } });
  const code2 = (sent.at(-1).text.match(/(\d{6})/) || [])[1];
  for (let i = 0; i < 5; i++) await call('POST', '/api/tg/verify', { body: { ticket: st2.ticket, code: code2 === '999999' ? '888888' : '999999' } });
  assert.equal((await call('POST', '/api/tg/verify', { body: { ticket: st2.ticket, code: code2 } })).status, 400); ok('5 marta xato -> chipta bloklandi');
  assert.ok(!sent.some(m => /TEST_BOT_TOKEN/.test(m.text))); ok('bot xabarida token yoq');

  console.log('\nHAMMASI O‘TDI —', n, 'ta tekshiruv');
  server.close();
})().catch(er => { console.error('\nSINOV YIQILDI:', er.message); console.error(er.stack.split('\n').slice(1, 4).join('\n')); server.close(); process.exit(1); });
