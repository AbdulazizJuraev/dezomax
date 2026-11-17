/* ============================================================
   sitemap.xml ni yaratish: asosiy sahifalar + har bir kino sahifasi
   SEO-friendly kino URLlari va mavjud kino sahifalari. Qidiruv tizimlari (Google, Yandex) barcha kinolarni
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
for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-rutube.js', 'js/data-custom.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const byId = new Map();
for (const m of ctx.MOVIES || []) if (m && m.id != null) byId.set(m.id, m);
// guruh qismlari (admin → «Guruhlar») alohida sahifa emas — guruh kartasiga yo'naltiriladi
for (const m of [...byId.values()]) {
  if (Array.isArray(m.parts) && m.parts.length > 1) for (const id of m.parts) if (id !== m.id) byId.delete(id);
}

// qidiruv uchun tayyor sahifalari bor filmlar — kino/<slug>.html (tools/gen-pages.js)
const GEN = require('./gen-pages.js');
const SEO = GEN.pages;
const MARVEL = require('./gen-marvel-pages.js').pages;
// ruscha nusxa — ru/… (tools/gen-ru.js; kino/, toplam/, marvel/ ning ruschasini generatorlarning o'zi yasaydi)
require('./gen-ru.js');
const { hasRu } = require('./ru-lib.js');

const today = new Date().toISOString().slice(0, 10);
const day = ts => ts ? new Date(ts).toISOString().slice(0, 10) : today;

const pages = [
  ['', 'daily', '1.0'],
  ['catalog.html', 'daily', '0.9'],
  ['kino/index.html', 'daily', '0.9'],
  ['marvel.html', 'weekly', '0.8'],
  ['sport.html', 'daily', '0.7'],
  ['tv.html', 'weekly', '0.7'],
  ['plans.html', 'monthly', '0.5'],
  ['about.html', 'monthly', '0.4'],
  ['contacts.html', 'monthly', '0.4'],
  ['privacy.html', 'yearly', '0.3'],
  ['delete-account.html', 'yearly', '0.2']
].map(([p, freq, pr]) => ({ loc: SITE + p, lastmod: today, freq, pr }));

const { moviePath } = require('./movie-seo.js');

const movies = [...byId.values()]
  .sort((a, b) => a.id - b.id)
  // to'liq filmi borlar muhimroq, faqat treylerlilar — pastroq
  .map(m => ({ loc: new URL(moviePath(m, SEO).slice(1), SITE).href, lastmod: day(m.updatedAt || m.addedAt), freq: 'weekly', pr: m.video ? '0.9' : '0.5' }));

// Marvel filmlari — marvel/<nom>.html (tools/gen-marvel-pages.js)
const marvel = Object.values(MARVEL).map(slug => ({ loc: `${SITE}marvel/${slug}.html`, lastmod: today, freq: 'monthly', pr: '0.7' }));

// kinostudiyalar — studio/<key>.html (rasmiy treylerlar ro'yxati)
const studios = (GEN.studios || []).map(k => ({ loc: `${SITE}studio/${k}.html`, lastmod: today, freq: 'weekly', pr: '0.8' }));

// mavzu to'plamlari — toplam/<key>.html (o'zbek seriallari, multfilmlar, konsertlar, premyeralar…)
const collections = (GEN.collections || []).map(k => ({ loc: `${SITE}toplam/${k}.html`, lastmod: today, freq: 'daily', pr: '0.9' }));
// teg sahifalari — teg/<key>.html (janr, yil, davlat, aktyor, rejissyor…)
const tagUrls = [`${SITE}teg/index.html`, ...(GEN.tags || []).map(k => `${SITE}teg/${k}.html`)].map(loc => ({ loc, lastmod: today, freq: 'weekly', pr: '0.6' }));

// ruscha manzillar: o'zbekchasining ruscha nusxasi bor bo'lsa — dezomax.uz/ru/…
const ruUrls = [...pages, ...collections, ...marvel, ...movies]
  .filter(u => hasRu(u.loc.slice(SITE.length) || 'index.html') && !/\?/.test(u.loc))
  .map(u => ({ ...u, loc: SITE + 'ru/' + u.loc.slice(SITE.length) }));

// Google bitta sitemap faylida ko'pi bilan 50 000 manzil qabul qiladi — ko'p bo'lsa sitemap.xml indeks bo'ladi,
// manzillar esa sitemap-1.xml, sitemap-2.xml … fayllariga bo'linadi
const all = [...pages, ...collections, ...tagUrls, ...studios, ...marvel, ...movies, ...ruUrls];
const urlset = list => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list.map(u => `  <url>
    <loc>${u.loc.replace(/&/g, '&amp;')}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pr}</priority>
  </url>`).join('\n')}
</urlset>
`;
const PER_FILE = 40000;
for (const f of fs.readdirSync(root)) if (/^sitemap-\d+\.xml$/.test(f)) fs.unlinkSync(path.join(root, f));
if (all.length <= PER_FILE) fs.writeFileSync(path.join(root, 'sitemap.xml'), urlset(all));
else {
  const parts = [];
  for (let i = 0; i < all.length; i += PER_FILE) {
    const name = `sitemap-${parts.length + 1}.xml`;
    fs.writeFileSync(path.join(root, name), urlset(all.slice(i, i + PER_FILE)));
    parts.push(name);
  }
  fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${parts.map(name => `  <sitemap>
    <loc>${SITE}${name}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`);
}

console.log(`sitemap.xml (${Math.ceil(all.length / PER_FILE)} fayl) — ${pages.length} sahifa + ${movies.length} kino + ${ruUrls.length} ruscha`);
