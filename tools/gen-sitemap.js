/* ============================================================
   sitemap.xml ni yaratish: asosiy sahifalar + har bir kino sahifasi
   (movie.html?id=N). Qidiruv tizimlari (Google, Yandex) barcha kinolarni
   shu ro'yxat orqali topadi. tools/bump-version.js har safar chaqiradi.

   Ishlatish:  node tools/gen-sitemap.js
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz/';

// data.js va data-custom.js ni brauzerdagidek ketma-ket bajaramiz (MOVIES massivi)
const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/data.js', 'js/data-custom.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const byId = new Map();
for (const m of ctx.MOVIES || []) if (m && m.id != null) byId.set(m.id, m);

const today = new Date().toISOString().slice(0, 10);
const day = ts => ts ? new Date(ts).toISOString().slice(0, 10) : today;

const pages = [
  ['', 'daily', '1.0'],
  ['catalog.html', 'daily', '0.9'],
  ['sport.html', 'daily', '0.7'],
  ['tv.html', 'weekly', '0.7'],
  ['plans.html', 'monthly', '0.5'],
  ['downloads.html', 'monthly', '0.3'],
  ['privacy.html', 'yearly', '0.2'],
  ['delete-account.html', 'yearly', '0.2']
].map(([p, freq, pr]) => ({ loc: SITE + p, lastmod: today, freq, pr }));

const movies = [...byId.values()]
  .sort((a, b) => a.id - b.id)
  // to'liq filmi borlar muhimroq, faqat treylerlilar — pastroq
  .map(m => ({ loc: `${SITE}movie.html?id=${m.id}`, lastmod: day(m.updatedAt || m.addedAt), freq: 'weekly', pr: m.video ? '0.8' : '0.5' }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...movies].map(u => `  <url>
    <loc>${u.loc.replace(/&/g, '&amp;')}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pr}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`sitemap.xml — ${pages.length} sahifa + ${movies.length} kino`);
