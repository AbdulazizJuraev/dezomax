/* Bosh sahifa uchun yengil kinolar ro'yxati: js/data-home.js (sekin internet uchun).
   index.html data-channels/data-rutube/data-site (~1.3 MB) o'rniga faqat shuni yuklaydi — bosh sahifa qatorlari,
   slayder, studiyalar va salomlashuv oynasiga kerakli kinolar. Kerakli kino topilmasa (davom ettirish, Top 10,
   bolalar rejimi, admin tanlagan kino) js/v4.js to'liq ro'yxatni o'zi yuklaydi (dzxLoadFull).
   Tanlov js/v4.js ROW_SOURCES bilan mos — u yerda qator qo'shilsa, bu yerga ham qo'shing.
   tools/bump-version.js va .github/workflows/cf-site.yml (yuklashdan oldin) chaqiradi. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['data.js', 'data-channels.js', 'data-rutube.js', 'data-site.js', 'site-config.js']) {
  const p = path.join(root, 'js', f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: f });
}
const ALL = ctx.MOVIES;
if (!Array.isArray(ALL) || ALL.length < 100) throw new Error('kinolar ro‘yxati o‘qilmadi');
const CFG = ctx.SITE_CONFIG || {};

// js/common.js: qismlar (PART_OF) ro'yxatlarda ko'rinmaydi
const ids = new Set(ALL.map(m => m.id));
const partOf = new Set();
for (const m of ALL) if (Array.isArray(m.parts) && m.parts.length > 1 && !partOf.has(m.id)) m.parts.forEach(id => { if (id !== m.id && ids.has(id)) partOf.add(id); });
const M = ALL.filter(m => !partOf.has(m.id));

const yr = m => m.year || 0, rt = m => m.rating || 0, at = m => m.addedAt || 0;
const hasFilm = m => !!(m.video && String(m.video).trim());
const extra = m => m.franchise === 'tahlil';
const img = m => m.poster || m.cover || m.hposter;
const fr = k => M.filter(m => m.franchise === k);
const SOURCES = [
  fr('uzbek').sort((a, b) => yr(b) - yr(a)),
  fr('tahlil').sort((a, b) => at(b) - at(a)),
  fr('konsert').sort((a, b) => yr(b) - yr(a)),
  M.filter(rt).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)),
  M.filter(m => m.addedAt && hasFilm(m) && !extra(m)).sort((a, b) => at(b) - at(a)),
  fr('dorama'), fr('anime'), fr('hind'),
  M.filter(m => m.franchise === 'klassika' && m.type !== 'multfilm').sort((a, b) => at(b) - at(a) || yr(b) - yr(a)),
  fr('hollywood').sort((a, b) => at(b) - at(a)),
  fr('marvel').sort((a, b) => yr(a) - yr(b)),
  fr('dc').sort((a, b) => yr(a) - yr(b)),
  M.filter(m => rt(m) && !extra(m)).sort((a, b) => rt(b) - rt(a)),
  M.filter(m => m.type === 'serial'),
  M.filter(m => m.type === 'multfilm' && hasFilm(m)),
  // bolalar slayderi (common.js kidsHero), Telegram filmlari (heroCompose), salomlashuv posterlari (welcome.js)
  M.filter(m => m.type === 'multfilm' && /youtube\.com|youtu\.be/.test(m.video || '')),
  M.filter(m => (m.ch === 'rizanova' || m.ch === 'uzbekkinoofficial') && m.type === 'film' && m.meta).sort((a, b) => yr(b) - yr(a) || at(b) - at(a)),
  M.filter(m => m.poster && m.poster.startsWith('images/') && !m.poster.includes('/uz/') && m.franchise !== 'konsert')
];
// qatorda 18 ta karta (bitta serialning qismlari bitta hisoblanadi) — zaxira bilan 40 ta
const base = m => String((m.title && m.title.uz) || '').toLowerCase().replace(/[\s.,:–—-]*\d+\s*-?\s*(qism|seriya|серия|bolim|bo‘lim)(\s.*)?$/i, '').trim();
const pick = new Set();
for (const list of SOURCES) {
  const seen = new Set();
  for (const m of list) {
    if (seen.size >= 40) break;
    if (!img(m)) continue;
    seen.add(base(m)); pick.add(m.id);
  }
}
M.filter(m => m.featured).forEach(m => pick.add(m.id));
// studiyalar: har bir kanal franshizasidan bittadan (v4.js studioReady)
const chFr = new Set();
for (const m of M) if (m.ch && m.franchise && !chFr.has(m.franchise)) { chFr.add(m.franchise); pick.add(m.id); }
// admin tanlagan slayder va qatorlar
const hero = CFG.hero || {};
[...(hero.ids || []), ...(hero.kidsIds || [])].forEach(id => pick.add(id));
(CFG.rows || []).forEach(r => (r.ids || []).forEach(id => pick.add(id)));
// tanlangan seriallarning qismlari ham (kino kartasidagi «N qism»)
for (const m of ALL) if (pick.has(m.id) && Array.isArray(m.parts)) m.parts.forEach(id => pick.add(id));

const out = ALL.filter(m => pick.has(m.id));
// admin tanlagan, lekin o'chirilgan/yashirilgan kinolar — ular uchun to'liq ro'yxat yuklanmasin
const gone = [...pick].filter(id => !ids.has(id));
const hidden = ctx.HIDDEN_MOVIES || [];
const src = `/* DezoMax — bosh sahifa uchun yengil kinolar ro'yxati (tools/gen-home-data.js yasaydi, qo'lda o'zgartirmang).
   ${out.length} / ${ALL.length} ta kino; to'liq ro'yxat kerak bo'lsa js/v4.js dzxLoadFull() yuklaydi. */
window.DZX_HOME_PART = true;
window.DZX_TOTAL = ${ALL.length};
window.DZX_GONE = ${JSON.stringify(gone)};
var HIDDEN_MOVIES = ${JSON.stringify(hidden)};
(function () {
  if (typeof MOVIES === 'undefined') return;
  window.DZX_BASE = MOVIES.slice();
  var S = [
${out.map(m => JSON.stringify(m)).join(',\n')}
  ];
  MOVIES.splice.apply(MOVIES, [0, MOVIES.length].concat(S));
  window.BASE_MOVIES = MOVIES.slice();
})();
`;
fs.writeFileSync(path.join(root, 'js', 'data-home.js'), src);
console.log(`data-home.js: ${out.length}/${ALL.length} kino, ${Math.round(Buffer.byteLength(src) / 1024)} KB`);
