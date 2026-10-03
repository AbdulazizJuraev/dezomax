/* ============================================================
   Qidiruv tizimlari uchun tayyor kino sahifalari: kino/<slug>.html
   ------------------------------------------------------------
   movie.html?id=N sahifasi bo'sh HTML + JavaScript — Yandex uni ko'pincha
   o'qimaydi va barcha kinolar bir xil "DezoMax" sahifasi bo'lib qoladi.
   Bu skript har bir film uchun sarlavha, tavsif, poster, schema.org va
   o'xshash kinolar havolalari HTML'ning o'zida turgan sahifa yasaydi.
   Sahifa ochilgach movie.js odatdagidek pleyerni chizadi.

   Faqat rasmiy manbadagi filmlar (YouTube kanallari, ochiq litsenziya) —
   qidiruvga biz targ'ib qiladigan sahifalar.

   tools/gen-sitemap.js chaqiradi (u esa — bump-version.js).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz/';
const DIR = path.join(root, 'kino');

const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-custom.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const MOVIES = ctx.MOVIES || [];
const GENRES = ctx.GENRES || [];

const OFFICIAL = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|upload\.wikimedia\.org)\//i;
const inGroup = new Set();
for (const m of MOVIES) if (Array.isArray(m.parts) && m.parts.length > 1) for (const id of m.parts) if (id !== m.id) inGroup.add(id);

const list = MOVIES.filter(m => m && m.id != null && m.title && OFFICIAL.test(String(m.video || '').trim()) && !inGroup.has(m.id));

// slug → fayl nomi (takrorlansa — id qo'shiladi)
const used = new Map();
for (const m of list) {
  const s = String(m.slug || m.id).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || String(m.id);
  used.set(s, (used.get(s) || 0) + 1);
  m._page = s;
}
for (const m of list) if (used.get(m._page) > 1) m._page += '-' + m.id;

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const noEmoji = s => String(s || '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}]/gu, '').replace(/[ \t]{2,}/g, ' ').trim();
const genre = id => (GENRES.find(g => g.id === id) || {}).uz || id;
const abs = p => p ? new URL(p, SITE).href : '';
const TYPE = { film: 'Film', serial: 'Serial', multfilm: 'Multfilm' };

function similar(m) {
  return list
    .filter(x => x !== m)
    .map(x => ({ x, s: (x.genres || []).filter(g => (m.genres || []).includes(g)).length + (m.franchise && x.franchise === m.franchise ? 3 : 0) + (x.audio === m.audio ? 1 : 0) }))
    .filter(o => o.s > 0)
    .sort((a, b) => b.s - a.s || (b.x.year || 0) - (a.x.year || 0))
    .slice(0, 12)
    .map(o => o.x);
}

const template = fs.readFileSync(path.join(root, 'movie.html'), 'utf8');

function page({ id, title, desc, url, image, type, ld, body }) {
  let html = template
    .replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="../">')
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`)
    .replace(/<!-- Har bir kino[\s\S]*?<\/script>\n/, `<link rel="canonical" href="${url}">\n<meta property="og:url" content="${url}">\n`
      + (image ? `<meta property="og:image" content="${esc(image)}">\n<meta name="twitter:image" content="${esc(image)}">\n` : ''))
    .replace('</head>', `${id ? `<script>window.DZX_ID=${id}</script>\n` : ''}<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`)
    .replace('<main id="page"></main>', `<main id="page">${body}</main>`);
  if (!id) html = html.replace(/<script src="js\/(?:ytplayer|vplayer|social|offline|movie)\.js[^"]*"><\/script>\n/g, '').replace('</body>', '<script>initLayout();</script>\n</body>');
  return html;
}

function moviePage(m) {
  const name = noEmoji(m.title.uz || m.title.ru);
  const ru = m.title.ru && m.title.ru !== name ? noEmoji(m.title.ru) : '';
  const year = m.year ? ` (${m.year})` : '';
  const text = noEmoji((m.desc && (m.desc.uz || m.desc.ru)) || '');
  const uzb = m.audio === 'uz' || /O‘zbekiston/.test((m.country && m.country.uz) || '');
  const lang = uzb ? 'o‘zbek tilida ' : '';
  const title = `${name}${year} — ${lang}onlayn ko‘rish | DezoMax`;
  const desc = `${name}${year} ${TYPE[m.type] ? TYPE[m.type].toLowerCase() : 'film'}ini ${lang}bepul onlayn ko‘ring. ${text}`.replace(/\s+/g, ' ').slice(0, 280);
  const url = `${SITE}kino/${m._page}.html`;
  const image = abs(m.poster);
  const genres = (m.genres || []).map(genre);
  const facts = [
    ['Turi', TYPE[m.type]],
    ['Yili', m.year],
    ['Janr', genres.join(', ')],
    ['Davlat', m.country && m.country.uz],
    ['Davomiyligi', m.duration && m.type !== 'serial' ? `${m.duration} daqiqa` : ''],
    ['Rejissyor', m.director],
    ['Rollarda', (m.cast || []).join(', ')],
    ['Til', uzb ? 'O‘zbek tilida' : ''],
    ['Manba', m.source && m.source.name]
  ].filter(f => f[1]);
  const sim = similar(m);
  const ld = {
    '@context': 'https://schema.org',
    '@type': m.type === 'serial' ? 'TVSeries' : 'Movie',
    name,
    ...(ru || (m.tags || []).length ? { alternateName: [ru, ...(m.tags || [])].filter(Boolean) } : {}),
    url,
    ...(text ? { description: text } : {}),
    ...(image ? { image } : {}),
    ...(m.year ? { datePublished: String(m.year) } : {}),
    ...(genres.length ? { genre: genres } : {}),
    ...(m.director ? { director: String(m.director).split(/,\s*/).map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...((m.cast || []).length ? { actor: m.cast.map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...(m.duration && m.type !== 'serial' ? { duration: `PT${m.duration}M` } : {}),
    ...(uzb ? { inLanguage: 'uz' } : {}),
    ...(m.source && m.source.name ? { productionCompany: { '@type': 'Organization', name: m.source.name } } : {})
  };
  const body = `
<div class="wrap seo-pre">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › <a href="kino/index.html">Filmlar</a></nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster" src="${esc(m.poster)}" alt="${esc(name)} — poster" width="220" height="330">` : ''}
    <div>
      <h1>${esc(name)}${year}</h1>
      ${ru ? `<p class="seo-alt">${esc(ru)}</p>` : ''}
      <p>${esc(text)}</p>
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      <a class="btn btn-primary" href="kino/${m._page}.html?play=1">Onlayn ko‘rish</a>
    </div>
  </div>
  ${sim.length ? `<h2>O‘xshash kinolar</h2>
  <ul class="seo-list">${sim.map(x => `<li><a href="kino/${x._page}.html">${esc(noEmoji(x.title.uz))}${x.year ? ` (${x.year})` : ''}</a></li>`).join('')}</ul>` : ''}
</div>`;
  return page({ id: m.id, title, desc, url, image, type: 'video.movie', ld, body });
}

function indexPage() {
  const url = `${SITE}kino/index.html`;
  const sorted = [...list].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const title = 'O‘zbek kinolari va filmlar onlayn — barcha filmlar ro‘yxati | DezoMax';
  const desc = `DezoMax’dagi ${list.length} ta film: o‘zbek kinolari, komediya, drama va konsertlar — bepul onlayn ko‘ring.`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Filmlar ro‘yxati', url,
    itemListElement: sorted.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}kino/${m._page}.html`, name: noEmoji(m.title.uz) }))
  };
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › Filmlar</nav>
  <h1>O‘zbek kinolari va filmlar onlayn</h1>
  <p>${esc(desc)}</p>
  <ul class="seo-grid">${sorted.map((m, i) => `
    <li><a href="kino/${m._page}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(noEmoji(m.title.uz))}"${i >= 12 ? ' loading="lazy"' : ''} decoding="async" width="160" height="240">` : ''}<span>${esc(noEmoji(m.title.uz))}</span>${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
</div>`;
  return page({ id: 0, title, desc, url, image: '', type: 'website', ld, body });
}

fs.mkdirSync(DIR, { recursive: true });
const keep = new Set(['index.html']);
for (const m of list) {
  fs.writeFileSync(path.join(DIR, m._page + '.html'), moviePage(m));
  keep.add(m._page + '.html');
}
fs.writeFileSync(path.join(DIR, 'index.html'), indexPage());
// endi ro'yxatda yo'q kinolarning eski sahifalari o'chiriladi
for (const f of fs.readdirSync(DIR)) if (f.endsWith('.html') && !keep.has(f)) fs.unlinkSync(path.join(DIR, f));

// saytdagi havolalar uchun: id → sahifa (js/seo-pages.js)
const map = Object.fromEntries(list.map(m => [m.id, m._page]));
fs.writeFileSync(path.join(root, 'js', 'seo-pages.js'),
  `/* tools/gen-pages.js yaratadi — qo'lda o'zgartirmang. Kino id → kino/<sahifa>.html */\nvar SEO_PAGES = ${JSON.stringify(map)};\n`);

console.log(`kino/ — ${list.length} ta film sahifasi`);
module.exports = { pages: map };
