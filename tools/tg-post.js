/* ============================================================
   DezoMax — Telegram kanalga avtomatik post (@dezomaxuz)
   ------------------------------------------------------------
   GitHub Actions kuniga 3 marta ishga tushiradi (.github/workflows/tg-post.yml).
   Token faqat GitHub secret'da: TG_BOT_TOKEN (kodda/faylda hech qachon yo'q). Bot kanalda admin bo'lishi kerak.
   Har ishda N ta kino: avval yangi qo'shilganlar, ular tugasa — saytdagi boshqa kinolar (kanal bo'sh qolmasin).
   Faqat o'z sahifasi bor (kino/<sahifa>.html — rasmiy manbadagi) va posterli kinolar. Bir kino ikki marta post qilinmaydi.
   Holat: data/tg-posted.json. Lokal sinov: node tools/tg-post.js --dry
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz/';
const CHANNEL = process.env.TG_CHANNEL || '@dezomaxuz';
const TOKEN = process.env.TG_BOT_TOKEN || '';
const DRY = process.argv.includes('--dry') || !TOKEN;
const COUNT = Number((process.argv.find(a => a.startsWith('--count=')) || '').split('=')[1]) || 3;
const STATE = path.join(root, 'data', 'tg-posted.json');

const ctx = { window: {}, localStorage: { getItem: () => null }, location: { pathname: '/', search: '' }, console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['data.js', 'data-channels.js', 'data-rutube.js', 'data-custom.js', 'seo-pages.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'js', f), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: f });
}
const PAGES = ctx.SEO_PAGES || {};
const GENRES = Object.fromEntries((ctx.GENRES || []).map(g => [g.id, g.uz]));
const state = (() => { try { return JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch { return { posted: {} }; } })();

const esc = s => String(s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const abs = p => /^https?:\/\//.test(p) ? p : SITE + String(p).replace(/^\//, '');
const typeName = { film: 'Film', serial: 'Serial', multfilm: 'Multfilm' };

const pool = (ctx.MOVIES || []).filter(m => m && PAGES[m.id] && m.poster && !state.posted[m.id] && m.type !== 'tahlil');
// kanal o'zbek auditoriyasi uchun: har ishda ~2/3 — o'zbek tilidagi kinolar, qolgani — boshqa filmlar (multserial qismlari emas).
// Har guruhda avval yangi qo'shilganlar (7 kun), keyin — aralash (har kuni har xil)
const isUz = m => m.audio === 'uz' || m.lang === 'uz' || m.franchise === 'uzbek';
const order = list => {
  const fresh = list.filter(m => m.addedAt && Date.now() - m.addedAt < 7 * 86400000).sort((a, b) => b.addedAt - a.addedAt);
  return [...fresh, ...list.filter(m => !fresh.includes(m)).sort(() => Math.random() - 0.5)];
};
const uz = order(pool.filter(isUz));
const other = order(pool.filter(m => !isUz(m) && m.type !== 'multfilm' && !/\d+\s*(?:серия|seriya|-qism)/i.test(m.title?.uz || '')));
const nUz = Math.ceil(COUNT * 2 / 3);
const pick = [...uz.slice(0, nUz), ...other.slice(0, COUNT - Math.min(nUz, uz.length))].slice(0, COUNT);

function caption(m) {
  const title = m.title?.uz || m.title?.ru;
  const meta = [typeName[m.type] || 'Film', m.year, (m.genres || []).slice(0, 2).map(g => GENRES[g] || g).join(', '),
    m.lang === 'ru' ? 'rus tilida' : (m.audio === 'uz' || m.lang === 'uz') ? 'o‘zbek tilida' : ''].filter(Boolean).join(' · ');
  const d = String(m.desc?.uz || m.desc?.ru || '').replace(/\s+/g, ' ').trim();
  const desc = d.length > 280 ? d.slice(0, 277).replace(/\s+\S*$/, '') + '…' : d;
  return `🎬 <b>${esc(title)}</b>\n${esc(meta)}${desc ? `\n\n${esc(desc)}` : ''}\n\n▶️ DezoMax’da bepul ko‘ring`;
}

async function send(m) {
  const url = `${SITE}kino/${PAGES[m.id]}.html`;
  const body = {
    chat_id: CHANNEL, photo: abs(m.hposter || m.poster), caption: caption(m), parse_mode: 'HTML',
    reply_markup: { inline_keyboard: [[{ text: '▶️ Ko‘rish', url }]] }
  };
  if (DRY) { console.log('— (sinov) —\n' + body.caption + '\n' + url + '\n'); return true; }
  const call = (method, b) => fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
  let r = await call('sendPhoto', body);
  let j = await r.json().catch(() => ({}));
  // Telegram posterni yuklay olmasa (masalan RuTube rasm serveri) — rasmsiz: matn + sahifa havolasi (oldindan ko'rinishi bilan)
  if (!j.ok && /HTTP URL content|wrong file|IMAGE_PROCESS|photo/i.test(j.description || '')) {
    r = await call('sendMessage', { chat_id: CHANNEL, text: `${body.caption}\n\n${url}`, parse_mode: 'HTML', reply_markup: body.reply_markup });
    j = await r.json().catch(() => ({}));
  }
  if (!j.ok) {
    console.log(`✗ ${m.title?.uz}: ${j.description || r.status}`);
    // diagnostika (bir marta): token qaysi botniki, kanal topiladimi — token chiqarilmaydi
    if (!send.diag) {
      send.diag = true;
      const me = await fetch(`https://api.telegram.org/bot${TOKEN}/getMe`).then(x => x.json()).catch(() => ({}));
      const ch = await fetch(`https://api.telegram.org/bot${TOKEN}/getChat?chat_id=${encodeURIComponent(CHANNEL)}`).then(x => x.json()).catch(() => ({}));
      console.log(`  diagnostika: token — @${me.result?.username || '?'} (${me.result?.first_name || ''}); kanal ${CHANNEL}: ${ch.ok ? `${ch.result.title} (${ch.result.type})` : ch.description}`);
    }
    return false;
  }
  console.log(`✓ ${m.title?.uz}`);
  return true;
}

(async () => {
  if (!TOKEN) console.log('TG_BOT_TOKEN yo‘q — sinov rejimi (hech narsa yuborilmaydi)');
  let ok = 0;
  for (const m of pick) {
    if (await send(m)) { ok++; if (!DRY) state.posted[m.id] = new Date().toISOString().slice(0, 10); }
    await new Promise(r => setTimeout(r, 1500));
  }
  if (!DRY) fs.writeFileSync(STATE, JSON.stringify(state) + '\n');
  console.log(`${ok}/${pick.length} ta post · navbatda yana ${pool.length - pick.length} ta kino`);
  if (!DRY && pick.length && !ok) process.exit(1);
})();
