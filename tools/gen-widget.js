/* ============================================================
   Ilova vidjeti uchun yangi kinolar ro'yxati: data/widget.json
   ------------------------------------------------------------
   Android «Yangi kinolar» vidjeti (mobile/.../widget) shu faylni har ~1 soatda o'qiydi.
   Saytda ko'rinadigan, to'liq videosi bor kinolar — eng oxirgi qo'shilganlari birinchi.
   tools/bump-version.js chaqiradi.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://abdulazizjuraev.github.io/dezomax/';

const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-custom.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const hidden = new Set(ctx.HIDDEN_MOVIES || []);
const all = (ctx.MOVIES || []).filter(m => m && m.id != null && !hidden.has(m.id));
const byId = new Map(all.map(m => [m.id, m]));
// guruh qismlari (admin → «Guruhlar») — bitta serial kartasi bo'lib chiqadi
const parentOf = new Map();
for (const m of all) if (Array.isArray(m.parts) && m.parts.length > 1) for (const id of m.parts) if (id !== m.id) parentOf.set(id, m.id);
const clean = s => String(s || '').replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '').replace(/^[#\s.,:-]+/, '').replace(/\s{2,}/g, ' ').trim();
const seen = new Set(), seenTitle = new Set();
const list = all
  .filter(m => String(m.video || '').trim() && m.franchise !== 'konsert')
  .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0) || (b.year || 0) - (a.year || 0) || b.id - a.id)
  .map(m => byId.get(parentOf.get(m.id)) || m)
  .filter(m => m.poster && m.title && !seen.has(m.id) && seen.add(m.id))
  // nomsiz («Video 1660») va yilsiz yozuvlar chiqmaydi; «Taxtlar o‘yini» va «Taxtlar o‘yini (Game of thrones)» — bitta
  .filter(m => m.year && !/^(video|kino|film)\s*\d*$/i.test(clean(m.title.uz)))
  .filter(m => { const k = clean(m.title.uz || m.title.ru).replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase(); return k && !seenTitle.has(k) && seenTitle.add(k); })
  .slice(0, 6)
  .map(m => ({
    id: m.id,
    title: clean(m.title.uz || m.title.ru).slice(0, 40),
    poster: new URL(m.poster, SITE).href,
    wide: !!m.wide,
    sub: [m.year, { film: 'Film', serial: 'Serial', multfilm: 'Multfilm' }[m.type] || 'Film', m.audio === 'uz' ? 'O‘zbekcha' : ''].filter(Boolean).join(' · '),
    path: `movie.html?id=${m.id}`,
  }));

fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(path.join(root, 'data', 'widget.json'), JSON.stringify({ at: Date.now(), items: list }) + '\n');
console.log(`data/widget.json — ${list.length} ta yangi kino`);
