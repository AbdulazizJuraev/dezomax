/* ============================================================
   DezoMax — RuTube'dan avtomatik kino va multfilm importi
   ------------------------------------------------------------
   Har kuni GitHub Actions'da ishlaydi (.github/workflows/rutube-import.yml), lokal: node tools/rutube-import.js
   Manbalar: data/rutube-sources.json
     rights: owner  — studiyaning o'z rasmiy kanali (Mosfilm, Soyuzmultfilm ...): tekshiruvdan o'tgan video
                      saytga AVTOMATIK chiqadi (js/data-rutube.js)
     rights: review — huquqi aniq emas: video admin → «RuTube» navbatiga tushadi (data/rutube-queue.json), saytga chiqmaydi
   Har bir video RuTube API orqali tekshiriladi: bor, o'chirilmagan, boshqa saytga joylash (embed) ruxsati bor,
   bepul, 18+ emas, O'zbekistonda ochiq, kanal rasmiy (is_official) yoki video litsenziyali (is_licensed).
   Soxta ma'lumot yo'q: nom, tavsif, rasm, yil, rejissyor — faqat RuTube qaytargani; video — faqat RuTube ID'si.
   Takrorlar: shu RuTube ID saytda bo'lsa — o'tkaziladi; shu nom+yildagi film saytda bo'lsa — yangi kino yaratilmaydi,
   unga ruscha video sifatida biriktiriladi (js/lang-videos.js). Bitta film kanalda ikki marta bo'lsa — 4K/uzunrog'i.
   Ishlamay qolganlar: har safar eng eski tekshirilganlari qayta tekshiriladi, 2 marta ketma-ket ishlamasa — saytdan olinadi.
   Hisobot: data/rutube-report.json (admin → «RuTube» da ko'rinadi)
   Parametrlar: --max-new=400 (bir ishda tekshiriladigan yangi videolar), --recheck=250, --dry (faylga yozmaydi)
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { detectGenres } = require('../js/genre-detect.js');

const root = path.join(__dirname, '..');
const P = f => path.join(root, f);
const arg = (k, d) => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a ? Number(a.split('=')[1]) : d; };
const DRY = process.argv.includes('--dry');
const MAX_NEW = arg('max-new', 400), RECHECK = arg('recheck', 250), MAX_PAGES = arg('max-pages', 200);
const today = new Date().toISOString().slice(0, 10);

/* ---------- RuTube API ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (DezoMax importer; +https://dezomax.uz)', referer: 'https://dezomax.uz/' } });
      if (r.status === 429 || r.status >= 500) { await sleep(2000 * (i + 1)); continue; }
      return await r.json();
    } catch { await sleep(1500 * (i + 1)); }
  }
  throw new Error('RuTube javob bermadi: ' + url);
}
async function listChannel(id) {
  const out = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const j = await api(`https://rutube.ru/api/video/person/${id}/?page=${page}`);
    const res = (j && j.results) || [];
    out.push(...res);
    if (!res.length || !j.has_next) break;
    await sleep(250);
  }
  return out;
}
async function check(id) {
  const [v, o] = await Promise.all([
    api(`https://rutube.ru/api/video/${id}/`),
    api(`https://rutube.ru/api/play/options/${id}/?no_404=true&referer=${encodeURIComponent('https://dezomax.uz/')}`)
  ]);
  const allowed = v.restrictions?.country?.allowed || [], restricted = v.restrictions?.country?.restricted || [];
  const c = {
    exists: !!(v && v.id) && !v.detail, deleted: !!v.is_deleted, hidden: !!v.is_hidden, paid: !!v.is_paid, adult: !!v.is_adult,
    uz: !restricted.includes('UZ') && (!allowed.length || allowed.includes('UZ')),
    embed: !!(o && !o.detail && o.has_video !== false && (!o.acl_access || o.acl_access.allowed !== false)),
    official: !!v.is_official, licensed: !!(v.is_licensed || o.is_licensed)
  };
  c.ok = c.exists && !c.deleted && !c.hidden && !c.paid && !c.adult && c.uz && c.embed;
  c.why = !c.exists || c.deleted ? 'video yo‘q' : c.hidden ? 'yopiq' : !c.embed ? 'joylash taqiqlangan' : c.paid ? 'pullik' : c.adult ? '18+' : !c.uz ? 'O‘zbekistonda yopiq' : '';
  return { c, v };
}
async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } }));
}

/* ---------- Matndan ma'lumot (faqat RuTube bergan matn) ---------- */
const GENRE_WORDS = [[/мелодрам/i, 'romance'], [/комеди/i, 'comedy'], [/(?<!мело|трагико)драм/i, 'drama'], [/трагикомеди/i, 'comedy'], [/боевик/i, 'action'], [/триллер/i, 'thriller'],
  [/ужас/i, 'horror'], [/фантастик/i, 'scifi'], [/фэнтези|сказк/i, 'fantasy'], [/детектив/i, 'detective'], [/криминал/i, 'crime'], [/мульт|анимац/i, 'animation'],
  [/приключен/i, 'adventure'], [/военн|войн/i, 'war'], [/семейн|детск/i, 'family'], [/истори/i, 'history'], [/биограф/i, 'biography'], [/мюзикл|музыкальн/i, 'comedy']];
// Mosfilm: «Деловые люди (1962) — Леонид Гайдай | комедия | Мосфильм 4K»; eski: «Бриллиантовая рука (комедия, реж. Леонид Гайдай, 1968 г.)»
function parseTitle(raw) {
  let t = String(raw || '').replace(/\s+/g, ' ').trim();
  const year = +(t.match(/\b(19[1-9]\d|20[0-3]\d)\b/) || [])[1] || null;
  const dir = (t.match(/реж\.\s*([^,()|]+?)(?:,|\)|$)/i) || t.match(/\)\s*[—–-]\s*([^|]+?)\s*\|/) || [])[1];
  const genres = [...new Set(GENRE_WORDS.filter(([re]) => re.test(t)).map(([, g]) => g))];
  t = t.split(/\s+[|]\s+/)[0]
    .replace(/\s*\((?:[^()]*?(?:\b(?:19|20)\d\d\b|реж\.|4К|4K|HD|фильм|комеди|драм|мульт|серия|сезон)[^()]*)\)/gi, '')
    .replace(/\s*[—–]\s*[^—–]*$/, m => (/\d{4}|реж|киностуди|мосфильм|союзмульт/i.test(m) || dir ? '' : m))
    .replace(/\s*(?:4K|4К|HD|FullHD)\s*$/i, '')
    .replace(/^[«"]\s*(.+?)\s*[»"]$/, '$1')
    .replace(/^(?:х\/ф|к\/ф|м\/ф|мультфильм|фильм)\s+/i, '')
    .trim();
  return { title: t, year, director: dir ? dir.trim() : '', genres };
}
function parseDesc(d) {
  const text = String(d || '').replace(/\r/g, '');
  const dir = (text.match(/Режисс[её]р(?:ы)?\s*:\s*([^\n]+)/i) || [])[1] || '';
  const cast = ((text.match(/В (?:главных )?ролях\s*:\s*([^\n]+)/i) || [])[1] || '').split(/,\s*/).map(s => s.trim()).filter(s => s && s.length < 40).slice(0, 8);
  const year = +(text.match(/\b(19[1-9]\d|20[0-3]\d)\s*(?:г\.|год)/) || [])[1] || null;
  // birinchi mazmunli xatboshi (havolalar, obuna chaqiriqlari va jamoa ro'yxati emas)
  const para = text.split(/\n\s*\n/).map(s => s.trim()).find(s => s.length > 40 && !/https?:\/\/|подпис|смотрите наши|режисс[её]р\s*:|сценари|композитор|в ролях/i.test(s)) || '';
  return { desc: para.slice(0, 700), director: dir.split(/,\s*/)[0].trim(), cast, year };
}
/* Qism: «Чемпионы – 24 серия – Глеболизация», «Енотки - 103 серия - Редко и часто - Союзмультфильм»,
   «Председатель. Серия 2», «Время выбрало нас, 1 серия» → { show, n, title } */
function parseEpisode(raw) {
  const t = String(raw || '').split(/\s+\|\s+/)[0].replace(/^[^\p{L}\p{N}«"]+/u, '').replace(/\s*[–—-]\s*Союзмультфильм\s*$/i, '').replace(/\s*\([^()]*\)\s*$/, '').trim();
  // «Чемпионы – 24 серия – …», «Ну, Погоди! – 96 выпуск – …», «Оранжевая корова - 207 серия. …»
  let m = t.match(/^(.+?)\s*[–—-]\s*(\d{1,4})\s*(?:серия|выпуск)(?![а-яё])\s*(?:[.–—-]\s*(.+))?$/i);
  if (m) return { show: m[1].trim(), n: +m[2], title: t };
  // «Простоквашино. Серия 183. Космический рекорд», «Председатель. Серия 2»
  m = t.match(/^(.+?)[.,]\s*(?:серия|выпуск)\s*(\d{1,4})(?![\d])\s*(?:[.,–—-]\s*(.*))?$/i);
  if (m) return { show: m[1].trim(), n: +m[2], title: t };
  // «Время выбрало нас, 1 серия»
  m = t.match(/^(.+?)[.,]?\s+(\d{1,3})(?:-я)?\s*серия\s*$/i);
  if (m) return { show: m[1].trim(), n: +m[2], title: t };
  // «Ну, погоди! Сборник серий 27-36», «Умка. Сборник серий 67-76»
  m = t.match(/^(.+?)[.,]?\s*Сборник\s+(?:серий|выпусков)\s*(\d{1,4})/i);
  if (m) return { show: m[1].trim(), n: +m[2] - 0.5, title: t };
  return null;
}
const LAT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', і: 'i', ў: 'o' };
const lat = s => String(s || '').toLowerCase().replace(/[а-яёіў]/g, c => LAT[c] ?? c);
const key = s => lat(String(s || '').replace(/\(.*?\)/g, '')).replace(/[‘’'`ʻʼ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const slugOf = s => lat(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'kino';
const COUNTRY = {
  ru: y => (y && y < 1992 ? { uz: 'SSSR', ru: 'СССР' } : { uz: 'Rossiya', ru: 'Россия' }),
  by: y => (y && y < 1992 ? { uz: 'SSSR', ru: 'СССР' } : { uz: 'Belarus', ru: 'Беларусь' }),
  am: y => (y && y < 1992 ? { uz: 'SSSR', ru: 'СССР' } : { uz: 'Armaniston', ru: 'Армения' })
};
const SKIP_TITLE = /#shorts?\b|отрывок|фрагмент|трейлер|тизер|анонс|фильм о фильме|как снимали|за кадром|тифлокоммент|сурдоперев|backstage|making of/i;
const durSec = v => { const d = v.duration || 0; return d > 100000 ? d / 1000 : d; };

/* ---------- Saytdagi ma'lumot ---------- */
function loadSite() {
  const ctx = { window: {}, localStorage: { getItem: () => null }, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-custom.js', 'js/lang-videos.js']) {
    if (fs.existsSync(P(f))) vm.runInContext(fs.readFileSync(P(f), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: f });
  }
  return ctx;
}
function readRutubeFile() {
  if (!fs.existsSync(P('js/data-rutube.js'))) return [];
  const t = fs.readFileSync(P('js/data-rutube.js'), 'utf8');
  const m = t.match(/\/\*RTDATA\*\/([\s\S]*?)\/\*ENDRTDATA\*\//);
  if (!m) throw new Error('js/data-rutube.js o‘qilmadi — import to‘xtatildi');
  const items = JSON.parse(m[1]);
  // tavsiflar alohida faylda (js/data-rutube-desc.js), nomning ruschasi o'zbekchasi bilan bir xil bo'lsa yozilmaydi
  let desc = {};
  try { desc = JSON.parse((fs.readFileSync(P('js/data-rutube-desc.js'), 'utf8').match(/\/\*RTDESC\*\/([\s\S]*?)\/\*ENDRTDESC\*\//) || [])[1] || '{}'); } catch {}
  for (const x of items) {
    if (x.title && !x.title.ru) x.title.ru = x.title.uz;
    if (desc[x.id]) x.desc = { uz: desc[x.id] };   // to'liq tavsif (asosiy faylda — qisqartirilgani)
  }
  return items;
}
/* Ixcham yozuv (fayl har sahifada yuklanadi): tavsif bitta tilda (descOf o'zbekchada yo'q bo'lsa shuni oladi),
   aktyorlar — 4 ta, keraksiz/bo'sh maydonlar yo'q */
function slim(m) {
  const d = String(m.desc?.uz || m.desc?.ru || '');
  const o = { ...m, desc: { uz: d.length > 360 ? d.slice(0, 357).replace(/\s+\S*$/, '') + '…' : d } };
  delete o.cover; delete o.colors;
  if (!o.trailer) delete o.trailer;
  o.cast = (o.cast || []).slice(0, 4);
  if (!o.cast.length) delete o.cast;
  if (o.rt) {
    o.rt = { ...o.rt };
    for (const k of ['ep', 'season', 'show']) if (!o.rt[k]) delete o.rt[k];
    if (!o.rt.serial) delete o.rt.serial;
  }
  return o;
}
function writeRutubeFile(items) {
  const desc = {};
  const body = items.map(m => {
    const o = slim(m);
    const d = o.desc && o.desc.uz;
    if (d) desc[o.id] = d;
    // karusel tavsifi uchun qisqa holda qoladi, to'liq tavsif — kino sahifasida (js/data-rutube-desc.js)
    if (d) o.desc = { uz: d.length > 160 ? d.slice(0, 157).replace(/\s+\S*$/, '') + '…' : d }; else delete o.desc;
    if (o.title && o.title.ru === o.title.uz) o.title = { uz: o.title.uz };
    return JSON.stringify(o);
  }).join(',\n');
  fs.writeFileSync(P('js/data-rutube.js'),
`/* DezoMax — RuTube'dagi rasmiy studiya kanallaridan filmlar va multfilmlar (tools/rutube-import.js yozadi, qo'lda o'zgartirmang).
   Video RuTube'ning rasmiy embed pleyerida ko'rsatiladi (js/rutube.js) — yuklab olinmaydi. Manbalar: data/rutube-sources.json */
var RUTUBE_MOVIES = /*RTDATA*/[
${body}
]/*ENDRTDATA*/;
if (typeof MOVIES !== 'undefined') for (var i = 0; i < RUTUBE_MOVIES.length; i++) { var _r = RUTUBE_MOVIES[i]; if (!_r.title.ru) _r.title.ru = _r.title.uz; MOVIES.push(_r); }
`);
  fs.writeFileSync(P('js/data-rutube-desc.js'),
`/* RuTube filmlarining to'liq tavsifi — faqat kino sahifasida yuklanadi (tools/rutube-import.js yozadi) */
var RUTUBE_DESC = /*RTDESC*/${JSON.stringify(desc)}/*ENDRTDESC*/;
if (typeof MOVIES !== 'undefined') for (var _j = 0; _j < MOVIES.length; _j++) { var _t = RUTUBE_DESC[MOVIES[_j].id]; if (_t) MOVIES[_j].desc = { uz: _t }; }
`);
}
const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(P(f), 'utf8')); } catch { return d; } };

async function main() {
  const t0 = Date.now();
  const cfg = readJSON('data/rutube-sources.json', { sources: [] });
  const site = loadSite();
  const siteMovies = site.MOVIES || [];
  let items = readRutubeFile();
  const state = readJSON('data/rutube-state.json', { seen: {}, fails: {} });
  state.seen = state.seen || {}; state.fails = state.fails || {};
  const queue = readJSON('data/rutube-queue.json', { items: [] });
  const lv = { ...(site.LANG_VIDEOS || {}) };
  let lvChanged = false;

  // takrorlarni aniqlash uchun indekslar
  const rtOf = u => (String(u || '').match(/rutube\.ru\/(?:video(?:\/private)?|play\/embed|shorts)\/([0-9a-f]{32})/i) || [])[1];
  const usedRt = new Set(items.map(m => m.rt && m.rt.id));
  for (const m of siteMovies) for (const u of [m.video, m.trailer, ...Object.values(m.langs || {})]) { const r = rtOf(u); if (r) usedRt.add(r); }
  for (const langs of Object.values(lv)) for (const v of Object.values(langs || {})) if (v && v.rt) usedRt.add(v.rt);
  for (const q of queue.items || []) usedRt.add(q.id);
  const byTitle = new Map();   // nom kaliti → saytdagi (RuTube'dan bo'lmagan) filmlar
  for (const m of siteMovies) {
    if (!m || m.type === 'tahlil') continue;
    for (const t of new Set([m.title?.uz, m.title?.ru, ...(m.tags || [])].map(key).filter(k => k.length > 2))) (byTitle.get(t) || byTitle.set(t, []).get(t)).push(m);
  }
  const rtTitle = new Map(items.map(m => [`${key(m.title.ru)}|${m.year || ''}`, m]));
  const usedIds = new Set([...siteMovies.map(m => m.id), ...items.map(m => m.id)]);
  const usedSlugs = new Set([...siteMovies.map(m => m.slug), ...items.map(m => m.slug)]);

  const report = { at: new Date().toISOString(), sources: [], totals: { found: 0, candidates: 0, checked: 0, working: 0, notWorking: 0, published: 0, attached: 0, queued: 0, duplicates: 0, recheckOk: 0, recheckFail: 0, removedBroken: 0 }, notes: [] };
  const T = report.totals;
  const skip = (src, why) => { src.skipped[why] = (src.skipped[why] || 0) + 1; };

  /* 1) Kanallarni o'qish */
  const cands = [];
  for (const s of cfg.sources) {
    const src = { id: s.id, name: s.name, rights: s.rights, kind: s.kind, listed: 0, candidates: 0, published: 0, attached: 0, queued: 0, skipped: {} };
    report.sources.push(src);
    let vids = [];
    try { vids = await listChannel(s.id); } catch (e) { report.notes.push(`${s.name}: ro‘yxat olinmadi — ${e.message}`); continue; }
    src.listed = vids.length; T.found += vids.length;
    const best = new Map();   // kanal ichida bir film ikki marta (4K va oddiy) — bittasi
    for (const v of vids) {
      if (!v || !/^[0-9a-f]{32}$/.test(v.id || '')) continue;
      if (state.seen[v.id] || usedRt.has(v.id)) { skip(src, 'avval ko‘rilgan / saytda bor'); continue; }
      const d = durSec(v);
      if (SKIP_TITLE.test(v.title)) { skip(src, 'parcha/treyler/maxsus versiya'); state.seen[v.id] = 'skip:clip'; continue; }
      if (s.kind === 'film' ? d < 40 * 60 : d < 4 * 60) { skip(src, s.kind === 'film' ? '40 daqiqadan qisqa' : '4 daqiqadan qisqa'); state.seen[v.id] = 'skip:short'; continue; }
      if (v.is_paid || v.is_adult || v.is_hidden || v.is_deleted) { skip(src, 'pullik/18+/yopiq'); state.seen[v.id] = 'skip:flags'; continue; }
      const pt = parseTitle(v.title);
      const k = `${key(pt.title)}|${pt.year || ''}`;
      const prev = best.get(k);
      if (prev) {
        T.duplicates++; skip(src, 'kanalda takror');
        const better = /4K|4К/.test(v.title) && !/4K|4К/.test(prev.v.title) || durSec(v) > durSec(prev.v) + 60;
        if (!better) { state.seen[v.id] = 'skip:dup'; continue; }
        state.seen[prev.v.id] = 'skip:dup';
      }
      best.set(k, { v, s, src, pt });
    }
    src._list = [...best.values()];
    src.candidates = src._list.length;
  }
  // kanallar navbatma-navbat (bir ishda hamma manbadan — faqat Mosfilm bilan to'lib qolmasin)
  for (let i = 0; report.sources.some(s => s._list && s._list.length > i); i++) {
    for (const s of report.sources) if (s._list && s._list[i]) cands.push(s._list[i]);
  }
  report.sources.forEach(s => delete s._list);
  T.candidates = cands.length;

  /* 2) Tekshirish va qo'shish (bir ishda MAX_NEW ta; qolgani keyingi ishga) */
  const batch = cands.slice(0, MAX_NEW);
  if (cands.length > MAX_NEW) report.notes.push(`${cands.length - MAX_NEW} ta video keyingi ishga qoldi (bir ishda ${MAX_NEW} ta tekshiriladi)`);
  const serials = new Map();
  const results = [];
  await pool(batch, 5, async c => {
    try { results.push({ ...c, ...(await check(c.v.id)) }); } catch (e) { skip(c.src, 'tekshirib bo‘lmadi'); }
  });
  for (const r of results) {
    T.checked++;
    const { v, s, src, pt, c } = r;
    if (!c.ok) { T.notWorking++; skip(src, `ishlamaydi: ${c.why}`); state.seen[v.id] = `skip:${c.why}`; continue; }
    T.working++;
    const full = r.v;   // tekshiruvdagi to'liq ma'lumot
    const det = { ...v, ...(full && full.id ? full : {}) };
    const pd = parseDesc(det.description);
    const year = pt.year || pd.year || null;
    const titleKey = key(pt.title);

    if (s.rights !== 'owner' || !(c.official || c.licensed)) {
      // huquqi noma'lum — faqat navbatga (admin tasdiqlaydi)
      queue.items = queue.items || [];
      queue.items.unshift({
        id: v.id, status: 'pending', addedAt: today, auto: true, title: pt.title, rawTitle: v.title, year, desc: pd.desc, lang: 'ru',
        genres: pt.genres.length ? pt.genres : (s.kind === 'multfilm' ? ['animation'] : []), poster: det.thumbnail_url || '',
        duration: Math.round(durSec(det)), author: { name: det.author?.name || s.name, url: `https://rutube.ru/channel/${s.id}/` },
        category: det.category?.name || '', video: `https://rutube.ru/video/${v.id}/`, check: { ...c, at: today }
      });
      T.queued++; src.queued++; state.seen[v.id] = 'queued'; usedRt.add(v.id);
      continue;
    }

    // saytda shu nom va yildagi film bor — yangi kino emas, ruscha video sifatida biriktiriladi
    const same = (byTitle.get(titleKey) || []).filter(m => year && m.year && Math.abs(m.year - year) <= 1);
    if (same.length) {
      const m = same[0], k = `movie:${m.id}`;
      if (!(lv[k] && lv[k].ru)) {
        lv[k] = { ...(lv[k] || {}), ru: { rt: v.id, ok: true, at: today, auto: s.name } };
        lvChanged = true; T.attached++; src.attached++; state.seen[v.id] = `attached:${m.id}`;
      } else { T.duplicates++; skip(src, 'saytda bor'); state.seen[v.id] = 'skip:exists'; }
      usedRt.add(v.id);
      continue;
    }
    if (rtTitle.has(`${titleKey}|${year || ''}`)) { T.duplicates++; skip(src, 'saytda bor'); state.seen[v.id] = 'skip:exists'; continue; }

    let id = 93000000 + (parseInt(v.id.slice(0, 8), 16) % 6900000);
    while (usedIds.has(id)) id++;
    usedIds.add(id);
    let slug = `rt-${slugOf(pt.title)}${year ? '-' + year : ''}`;
    while (usedSlugs.has(slug)) slug += '-2';
    usedSlugs.add(slug);
    const type = s.kind === 'multfilm' ? 'multfilm' : 'film';
    let genres = pt.genres.slice(0, 3);
    if (type === 'multfilm' && !genres.includes('animation')) genres.unshift('animation');
    const m = {
      id, slug, type, lang: 'ru', franchise: 'klassika',
      title: { uz: pt.title, ru: pt.title },
      genres, ...(year ? { year } : {}), duration: Math.max(1, Math.round(durSec(det) / 60)),
      country: (COUNTRY[s.country] || COUNTRY.ru)(year),
      ...(pt.director || pd.director ? { director: pt.director || pd.director } : {}),
      cast: pd.cast, desc: { uz: pd.desc, ru: pd.desc },
      poster: det.thumbnail_url || '', hposter: det.thumbnail_url || '',
      trailer: '', video: `https://rutube.ru/video/${v.id}/`,
      source: { name: s.name, url: `https://rutube.ru/channel/${s.id}/`, official: true },
      rt: { id: v.id, checked: today, ep: det.episode || 0, season: det.season || 0, serial: !!det.is_serial, raw: v.title },
      addedAt: Date.now()
    };
    if (!m.genres.length) m.genres = detectGenres({ ...m, genres: [] }).slice(0, 3);
    items.push(m);
    rtTitle.set(`${titleKey}|${year || ''}`, m);
    T.published++; src.published++; state.seen[v.id] = 'published'; usedRt.add(v.id);
  }

  /* 3) Seriallar va multseriallar: bir shou qismlari bitta yozuvga (asosiy — eng kichik qism, parts — tartib bilan).
     Har ishda butun ro'yxat qayta guruhlanadi — keyin chiqqan yangi qismlar ham o'z serialiga qo'shiladi. */
  // qismning asl nomi: yangi qo'shilgani — rt.raw (RuTube nomi), avvalgi serial boshi — rt.epTitle, qolgani — o'z nomi
  const groups = new Map();
  for (const m of items) {
    if (!m.rt) continue;
    const own = m.rt.epTitle || m.title.ru;
    const ep = parseEpisode(m.rt.raw || own);
    delete m.parts; delete m.rt.group; delete m.rt.showTitle; delete m.rt.epTitle;
    if (!ep) continue;
    if (m.rt.raw) m.title = { uz: ep.title, ru: ep.title };
    else if (own !== m.title.ru) m.title = { uz: own, ru: own };
    const ch = (String(m.source?.url || '').match(/channel\/(\d+)/) || [])[1] || '';
    const g = `${ch}:${key(ep.show)}`;
    (groups.get(g) || groups.set(g, []).get(g)).push({ m, ep });
  }
  for (const eps of groups.values()) {
    if (eps.length < 2) continue;
    eps.sort((a, b) => (a.m.rt.season || 0) - (b.m.rt.season || 0) || (a.m.rt.ep || a.ep.n) - (b.m.rt.ep || b.ep.n));
    const head = eps[0].m;
    head.parts = eps.map(e => e.m.id);
    head.rt.epTitle = head.title.ru;           // keyingi ishda qayta guruhlash uchun asl qism nomi
    head.title = { uz: eps[0].ep.show, ru: eps[0].ep.show };
    if (eps.some(e => e.m.rt.serial)) for (const e of eps) if (e.m.type === 'film') e.m.type = 'serial';
  }
  for (const m of items) if (m.rt) delete m.rt.raw;

  /* 4) Saytdagilarni qayta tekshirish: eng eski tekshirilganlari; 2 marta ketma-ket ishlamasa — saytdan olinadi */
  const old = items.slice().sort((a, b) => String(a.rt?.checked || '').localeCompare(String(b.rt?.checked || ''))).filter(m => m.rt && m.rt.checked !== today).slice(0, RECHECK);
  const broken = new Set();
  await pool(old, 5, async m => {
    let ok = false;
    try { ok = (await check(m.rt.id)).c.ok; } catch { return; }   // tarmoq xatosi — bu safar hisoblanmaydi
    if (ok) { m.rt.checked = today; delete state.fails[m.rt.id]; T.recheckOk++; return; }
    T.recheckFail++;
    state.fails[m.rt.id] = (state.fails[m.rt.id] || 0) + 1;
    if (state.fails[m.rt.id] >= 2) broken.add(m.id);
  });
  if (broken.size) {
    for (const m of items) if (broken.has(m.id)) state.seen[m.rt.id] = 'broken';
    items = items.filter(m => !broken.has(m.id));
    for (const m of items) if (Array.isArray(m.parts)) m.parts = m.parts.filter(id => !broken.has(id));
    T.removedBroken = broken.size;
  }

  /* 5) Hisobot va yozish */
  report.catalog = { total: items.length, film: items.filter(m => m.type === 'film').length, multfilm: items.filter(m => m.type === 'multfilm').length, serial: items.filter(m => m.type === 'serial').length };
  report.seconds = Math.round((Date.now() - t0) / 1000);
  if (!DRY) {
    writeRutubeFile(items);
    state.updated = report.at;
    fs.writeFileSync(P('data/rutube-state.json'), JSON.stringify(state) + '\n');
    queue.updated = report.at;
    fs.writeFileSync(P('data/rutube-queue.json'), JSON.stringify(queue, null, 1) + '\n');
    fs.writeFileSync(P('data/rutube-report.json'), JSON.stringify(report, null, 1) + '\n');
    if (lvChanged) {
      const keys = Object.keys(lv).filter(k => lv[k] && Object.keys(lv[k]).length).sort();
      const body = keys.map(k => `${JSON.stringify(k)}:${JSON.stringify(lv[k])}`).join(',\n');
      const head = fs.readFileSync(P('js/lang-videos.js'), 'utf8').split('var LANG_VIDEOS')[0];
      fs.writeFileSync(P('js/lang-videos.js'), `${head}var LANG_VIDEOS = /*LV*/{${body ? `\n${body}\n` : ''}}/*ENDLV*/;\n`);
    }
  }

  // ekranga (va GitHub Actions xulosasiga)
  const lines = [
    `RuTube import — ${report.at}${DRY ? ' (sinov, faylga yozilmadi)' : ''}`,
    `Kanallarda topildi: ${T.found} ta video · nomzod (yangi, to‘liq film/multfilm): ${T.candidates}`,
    `Tekshirildi: ${T.checked} · ishlaydi: ${T.working} · ishlamaydi: ${T.notWorking}`,
    `Saytga qo‘shildi: ${T.published} · mavjud filmga ruscha video: ${T.attached} · navbatga (huquqi noma’lum): ${T.queued} · takror: ${T.duplicates}`,
    `Qayta tekshiruv: ${T.recheckOk} ishlaydi, ${T.recheckFail} ishlamadi, ${T.removedBroken} ta saytdan olindi`,
    `Saytdagi RuTube katalogi: ${report.catalog.total} (film ${report.catalog.film}, multfilm ${report.catalog.multfilm}, serial qismlari ${report.catalog.serial})`,
    ...report.sources.map(s => `  • ${s.name} [${s.rights}]: ${s.listed} video, ${s.candidates} nomzod, +${s.published} sayt, +${s.attached} biriktirildi, +${s.queued} navbat${Object.keys(s.skipped).length ? ' · o‘tkazildi: ' + Object.entries(s.skipped).map(([k, n]) => `${k} ${n}`).join(', ') : ''}`),
    ...report.notes.map(n => '  ! ' + n),
    `Vaqt: ${report.seconds} s`
  ];
  if (process.argv.includes('--sample')) for (const m of items.slice(-30)) console.log(`  [${m.type}] ${m.title.ru} | ${m.year || '?'} | ${m.genres.join(',')} | ${m.duration} daq | rej: ${m.director || '-'} | ${(m.desc.ru || '').slice(0, 50)}`);
  console.log(lines.join('\n'));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '```\n' + lines.join('\n') + '\n```\n');
}

// tools/yt-studio-import.js ham shu fayl bilan ishlaydi
module.exports = { readRutubeFile, writeRutubeFile, loadSite, readJSON, key, slugOf };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
