/* Bosh sahifa uchun yengil kinolar ro'yxati: js/data-home.js (sekin internet uchun).
   index.html data-channels/data-rutube/data-site (~1.3 MB) o'rniga faqat shuni yuklaydi — bosh sahifa qatorlari,
   slayder, studiyalar va salomlashuv oynasiga kerakli kinolar. Kerakli kino topilmasa (davom ettirish, Top 10,
   bolalar rejimi, admin tanlagan kino) js/home5.js to'liq ro'yxatni o'zi yuklaydi (dzxLoadFull).
   Tanlov js/home5.js ROW_SOURCES bilan mos — u yerda qator qo'shilsa, bu yerga ham qo'shing.
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
  // data-site.js — kichik qism; qolgan kinolar bo'laklardan (js/data-site-<k>.json)
  if (f === 'data-site.js') require('../js/site-data-build.js').loadSiteShards(ctx, root);
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
// kino studiyalari paneli (js/home5.js kinoStudioHTML): Marvel/DC — franshiza, qolganlari — taniqli multfilm nomlari; chiqqan yili bo'yicha
const W = s => new RegExp(`(?<!\\p{L})(?:${s})(?!\\p{L})`, 'iu');
// har bir studiya: bitta qator — bitta kino (uning o'zbekcha/ruscha/inglizcha nomlari). Bir kino turli tilda bir necha marta
// qo'shilgan bo'lsa (Cinderella / Zolushka) — bitta karta qoladi; davomlari (Kung-fu Panda 2, 3…) yili bo'yicha ajraladi
const STUDIO_FILMS = {
  disney: ['pinocchio|пиноккио', 'dambo|дамбо|dumbo', 'бемби|bambi', 'золушка|zolushka|cinderella', 'питер пэн|peter pan', 'uyqudagi malika|спящая красавица|sleeping beauty',
    'робин гуд|robin hood|robin gud', 'tulki va it|лис и пёс|лис и пес|fox and the hound', 'горбун из нотр-дама|hunchback of notre dame', 'геркулес|hercules|gerkules',
    'мулан|mulan', 'тарзан|tarzan', 'imperatorning sarguzashtlari|похождения императора|emperor[’\']?s new groove', 'холодное сердце|muzyurak|frozen',
    'зверополис|zootopiya|zootopia', 'ральф|ralf|wreck-it ralph', 'rapunzel|рапунцель|tangled', 'энканто|enkanto|encanto', 'моана|moana'],
  pixar: ['история игрушек|o[ʻ‘\'`]?yinchoqlar tarixi|toy story', 'рататуй|ratatuy|ratatouille', 'суперсемейка|super oila|incredibles', 'бао|bao', 'элио|elio',
    '(?<!аэро)тачки|cars', 'в поисках немо|finding nemo', 'головоломка|inside out', 'тайна коко|coco', 'валл-и|wall-e', 'корпорация монстров|monsters inc'],
  dreamworks: ['шрек|шрэк|shrek', 'мадагаскар|madagaskar|madagascar', 'кунг-?фу панда|kung-?fu panda', 'etik kiygan mushuk|кот в сапогах|puss in boots', 'турбо|turbo',
    'как приручить дракона|how to train your dragon', 'тролли|trolls', 'босс-молокосос|boss baby', 'мегамозг|megamind', 'семейка крудс|croods'],
  illumination: ['гадкий я|despicable me', 'minionlar|миньоны|minions', 'лоракс|loraks|lorax', 'kuyla|зверопой', 'uy hayvonlarining sirli hayoti|тайная жизнь домашних животных|secret life of pets', 'гринч|grinch'],
  bluesky: ['muzlik davri|ледниковый период|ice age', 'рио|rio', 'хортон|horton', 'эпик|epic', 'фердинанд|ferdinand']
};
const isAnim = m => m.type === 'multfilm' || (m.genres || []).includes('animation');
const names = m => [m.title && m.title.uz, m.title && m.title.ru, m.title && m.title.en, m.orig, m.original_title].filter(Boolean).join(' | ');
const STUDIOS = {};
const score = m => (hasFilm(m) ? 4 : 0) + (m.poster && !/ytimg/.test(m.poster) ? 2 : 0) + (m.rating ? 1 : 0);
const bestOf = (list, keyOf) => {   // bitta kino bir necha marta qo'shilgan bo'lsa — videosi va tik posteri borini
  const by = new Map();
  for (const m of list) { const k = keyOf(m); if (!by.has(k) || score(m) > score(by.get(k))) by.set(k, m); }
  return [...by.values()].sort((a, b) => yr(a) - yr(b) || a.id - b.id);
};
const okStudio = m => yr(m) && yr(m) <= new Date().getFullYear() + 1 && img(m) && !extra(m) && (hasFilm(m) || m.trailer);
const frKey = m => (m.tmdb && m.tmdb.id ? 't' + m.tmdb.id : base(m).replace(/^[^\p{L}\d]+/u, '').replace(/\s*\(.*$/, '')) + '|' + yr(m);
STUDIOS.marvel = bestOf(fr('marvel').filter(okStudio), frKey);
STUDIOS.dc = bestOf(fr('dc').filter(okStudio), frKey);
const taken = new Set();   // bitta kino faqat bitta studiyada
for (const [k, films] of Object.entries(STUDIO_FILMS)) {
  const rx = films.map(W);
  const hit = [];
  for (const m of M) {
    if (taken.has(m.id) || !isAnim(m) || !okStudio(m)) continue;
    const i = rx.findIndex(r => r.test(names(m)));
    if (i >= 0) hit.push({ m, i });
  }
  const keyOf = m => hit.find(h => h.m === m).i + '|' + yr(m);
  STUDIOS[k] = bestOf(hit.map(h => h.m), keyOf);
  hit.forEach(h => taken.add(h.m.id));
}
for (const k of Object.keys(STUDIOS)) { STUDIOS[k] = STUDIOS[k].map(m => m.id); STUDIOS[k].forEach(id => pick.add(id)); }

// tanlangan seriallarning qismlari ham (kino kartasidagi «N qism»)
for (const m of ALL) if (pick.has(m.id) && Array.isArray(m.parts)) m.parts.forEach(id => pick.add(id));

// janr plitkalari (js/home5.js genresHTML): to'liq ro'yxatdagi soni — yengil ro'yxatda kam chiqmasin
const watchable = M.filter(m => !extra(m) && (hasFilm(m) || m.trailer || (Array.isArray(m.eps) && m.eps.length)));
const GENRE_N = {};
for (const g of ['comedy', 'action', 'drama', 'scifi', 'history', 'thriller', 'animation'])
  GENRE_N[g] = watchable.filter(m => g === 'animation' ? (m.type === 'multfilm' || (m.genres || []).includes('animation')) : (m.genres || []).includes(g)).length;

// bosh sahifa bloklari (js/home5.js): kino / serial / multfilm / o'zbek kinolari soni
const TYPE_N = { film: watchable.filter(m => m.type === 'film').length, serial: watchable.filter(m => m.type === 'serial').length,
  multfilm: watchable.filter(m => m.type === 'multfilm').length, uzbek: watchable.filter(m => m.franchise === 'uzbek').length, all: watchable.length };

const out = ALL.filter(m => pick.has(m.id));
// admin tanlagan, lekin o'chirilgan/yashirilgan kinolar — ular uchun to'liq ro'yxat yuklanmasin
const gone = [...pick].filter(id => !ids.has(id));
const hidden = ctx.HIDDEN_MOVIES || [];
const src = `/* DezoMax — bosh sahifa uchun yengil kinolar ro'yxati (tools/gen-home-data.js yasaydi, qo'lda o'zgartirmang).
   ${out.length} / ${ALL.length} ta kino; to'liq ro'yxat kerak bo'lsa js/home5.js dzxLoadFull() yuklaydi. */
window.DZX_HOME_PART = true;
window.DZX_TOTAL = ${ALL.length};
window.DZX_GENRE_N = ${JSON.stringify(GENRE_N)};
window.DZX_TYPE_N = ${JSON.stringify(TYPE_N)};
window.DZX_GONE = ${JSON.stringify(gone)};
window.DZX_STUDIOS = ${JSON.stringify(STUDIOS)};
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
