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
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1];   // sinov: aniq bir kino (ID)
const pick = ONLY ? (ctx.MOVIES || []).filter(m => String(m.id) === ONLY && PAGES[m.id])
  : [...uz.slice(0, nUz), ...other.slice(0, COUNT - Math.min(nUz, uz.length))].slice(0, COUNT);

/* ---------- Post ko'rinishi (2026-11-28): bezakli matn + maxsus rasm (tools/tg-card.py) ----------
   Premium (custom) emoji yo'q: bot uchun Fragment username kerak. Oddiy emoji va HTML (qalin, kursiv, iqtibos). */
const FRESH = m => m.addedAt && Date.now() - m.addedAt < 7 * 86400000;
const HOOKS = {
  comedy: 'Kulgi va yaxshi kayfiyat kafolatlangan!', romance: 'Sevgi va sadoqat haqida ta’sirli hikoya!',
  action: 'Boshidan oxirigacha hayajon va jang sahnalari!', thriller: 'Sirli voqealar va kutilmagan burilishlar!',
  crime: 'Jinoyat olamidagi keskin voqealar!', detective: 'Sirni oxirigacha topa olasizmi?',
  horror: 'Yuraksizlar uchun emas!', scifi: 'Fantastik olamga sayohat!', fantasy: 'Sehrli olamga sayohat!',
  family: 'Butun oila bilan tomosha qilish uchun!', animation: 'Butun oila bilan tomosha qilish uchun!',
  adventure: 'Unutilmas sarguzashtlar sizni kutmoqda!', war: 'Jasorat va qahramonlik haqida!',
  history: 'Tarixning muhim sahifalari ekranda!', biography: 'Haqiqiy hayot hikoyasi!', drama: 'Hayotiy voqealar va kuchli his-tuyg‘ular!'
};
// kanal nomi qo'shimchasi olib tashlanadi: «Baxt hikoyasi & Sevimli TV!» → «Baxt hikoyasi»
const cleanTitle = m => String(m.title?.uz || m.title?.ru || '').replace(/#\S+/g, '')
  .replace(/\s*(?:&|\||-|—)\s*[^&|—-]*\bTV\b!?\s*$/i, '').replace(/\s{2,}/g, ' ').trim();
const langOf = m => isUz(m) ? 'uz' : m.lang === 'ru' || m.audio === 'ru' ? 'ru' : '';
const kindOf = m => m.type === 'serial' ? 'serial' : m.type === 'multfilm' ? 'multfilm' : 'film';
const partsOf = m => (Array.isArray(m.parts) && m.parts.length > 1 ? m.parts.length : 0)
  || +((String(m.desc?.uz || '').match(/(\d+)\s*qism/) || [])[1] || 0);
const genericDesc = d => /to.liq versiyasi|rasmiy .*kanal|kanalidagi o.zbek/i.test(d);
const durText = min => !min ? '' : min >= 60 ? `${Math.floor(min / 60)} soat${min % 60 ? ` ${min % 60} daqiqa` : ''}` : `${min} daqiqa`;
const genreList = m => (m.genres || []).slice(0, 2).map(g => GENRES[g] || g);

function cardInfo(m) {
  const k = kindOf(m), lang = langOf(m);
  const badge = FRESH(m) ? `YANGI ${k.toUpperCase()}` : 'TAVSIYA';
  const kindLabel = lang === 'uz' ? `O‘zbek ${k}i` : typeName[m.type] || 'Film';
  const sub = [kindLabel, ...genreList(m), m.year, lang === 'uz' ? 'O‘zbek tilida' : lang === 'ru' ? 'Rus tilida' : '']
    .filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).join('  ·  ');
  return { badge, title: cleanTitle(m), sub };
}

function caption(m) {
  const k = kindOf(m), lang = langOf(m), title = cleanTitle(m), n = partsOf(m);
  const hook = (m.genres || []).map(g => HOOKS[g]).find(Boolean)
    || (k === 'serial' ? 'Qiziqarli voqealar sizni kutmoqda!' : k === 'multfilm' ? 'Butun oila bilan tomosha qilish uchun!' : 'Kechki tomosha uchun ajoyib tanlov!');
  const head = FRESH(m) ? `🔥 <b>YANGI ${k.toUpperCase()}!</b>` : '⭐ <b>TAVSIYA QILAMIZ!</b>';
  const done = k === 'serial' ? (n ? `✅ <b>${n} ta qismi DezoMax’ga joylandi!</b>` : '✅ <b>Barcha qismlari DezoMax’da!</b>')
    : k === 'multfilm' ? '✅ <b>Multfilm DezoMax’ga joylandi!</b>' : '✅ <b>Filmning to‘liq versiyasi DezoMax’ga joylandi!</b>';
  let d = String(m.desc?.uz || (lang === 'ru' ? m.desc?.ru : '') || '').replace(/\s+/g, ' ').trim();
  if (genericDesc(d)) d = '';
  if (d.length > 300) d = d.slice(0, 297).replace(/\s+\S*$/, '') + '…';
  const info = [
    d ? `🎞 ${esc(d)}` : '',
    m.director ? `🎬 Rejissyor: ${esc(Array.isArray(m.director) ? m.director.join(', ') : m.director)}` : '',
    (m.cast || []).length ? `👥 Rollarda: ${esc(m.cast.slice(0, 3).join(', '))}` : '',
    [m.year ? `📅 ${m.year}` : '', genreList(m).length ? `🎭 ${esc(genreList(m).join(', '))}` : ''].filter(Boolean).join(' · '),
    [durText(m.duration) ? `⏱ ${durText(m.duration)}` : '', lang === 'uz' ? '🇺🇿 O‘zbek tilida' : lang === 'ru' ? '🇷🇺 Rus tilida' : ''].filter(Boolean).join(' · ')
  ].filter(Boolean);
  return `${head}\n\n🎬 <b>«${esc(title)}»</b>\n<i>${esc(hook)}</i>\n\n${done}\n\n` +
    (info.length ? `<blockquote>${info.join('\n')}</blockquote>\n\n` : '') +
    `▶️ <b>Hoziroq DezoMax’da bepul tomosha qiling!</b>\n\n` +
    `📲 Ilovamiz: <a href="${SITE}downloads.html">Android</a> | 🌐 <a href="${SITE}">dezomax.uz</a>\n📣 Kanalimiz: ${esc(CHANNEL)}`;
}

/* Maxsus rasm: python tools/tg-card.py — bo'lmasa (xato, Python yo'q) oddiy poster havolasi */
function makeCard(m) {
  const { execFileSync } = require('child_process');
  const out = path.join(require('os').tmpdir(), `dzx-tg-${m.id}.jpg`);
  const { badge, title, sub } = cardInfo(m);
  const src = m.vposter || m.hposter || m.poster;
  for (const py of process.platform === 'win32' ? ['python', 'py'] : ['python3', 'python']) {
    try { execFileSync(py, [path.join(__dirname, 'tg-card.py'), src, out, badge, title, sub], { stdio: ['ignore', 'ignore', 'pipe'], timeout: 60000 }); return out; }
    catch (e) { if (e.code !== 'ENOENT') { console.log(`  rasm yasalmadi: ${String(e.stderr || e.message).trim().slice(0, 200)}`); return null; } }
  }
  return null;
}

async function send(m) {
  const url = `${SITE}kino/${PAGES[m.id]}.html`;
  const body = {
    chat_id: CHANNEL, photo: abs(m.hposter || m.poster), caption: caption(m), parse_mode: 'HTML',
    reply_markup: { inline_keyboard: [[{ text: '▶️ Ko‘rish', url }, { text: '📲 Ilovani yuklash', url: `${SITE}downloads.html` }]] }
  };
  const card = makeCard(m);
  if (DRY) { console.log('— (sinov) —\n' + body.caption + '\n' + url + (card ? `\nrasm: ${card}` : '\nrasm: oddiy poster') + '\n'); return true; }
  const call = (method, b) => fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
  let r;
  if (card) {   // maxsus rasm fayl sifatida yuklanadi
    const fd = new FormData();
    fd.append('chat_id', CHANNEL); fd.append('caption', body.caption); fd.append('parse_mode', 'HTML');
    fd.append('reply_markup', JSON.stringify(body.reply_markup));
    fd.append('photo', new Blob([fs.readFileSync(card)], { type: 'image/jpeg' }), 'dezomax.jpg');
    r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, { method: 'POST', body: fd });
    if (!(await r.clone().json().catch(() => ({}))).ok) r = await call('sendPhoto', body);   // bo'lmasa — oddiy poster
  } else r = await call('sendPhoto', body);
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
