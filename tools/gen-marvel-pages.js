/* ============================================================
   Marvel filmlari uchun qidiruv tizimlariga tayyor sahifalar: marvel/<nom>.html
   ------------------------------------------------------------
   marvel.html?id=N JavaScript bilan chiziladi — Yandex uni ko'pincha o'qimaydi.
   Bu skript har bir film uchun sarlavha, tavsif, boshqa nomlari (o'zbekcha/ruscha/
   inglizcha), premyera, rejissyor, aktyorlar, byudjet, kassa va rasmiy treyler
   (schema.org Movie + VideoObject) HTML'ning o'zida turgan sahifa yasaydi.
   marvel.html ro'yxatini ham HTML'ga yozadi (havolalar). Sahifa ochilgach js/marvel.js chizadi.

   tools/gen-sitemap.js chaqiradi (u esa — bump-version.js).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz/';
const DIR = path.join(root, 'marvel');

const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-custom.js', 'js/marvel-data.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const INFO = ctx.MARVEL_INFO || {};
const seen = new Set();
const films = (ctx.MOVIES || []).filter(m => m && m.franchise === 'marvel' && m.type !== 'serial' && !seen.has(m.id) && seen.add(m.id))
  .map(m => {
    // admin'da kiritilgani (m.mx) Wikidata ustidan; admin treyleri «rasmiy» deb yozilmaydi
    const wd = INFO[m.id] || {}, info = { ...wd, ...(m.mx || {}) };
    if (m.mx && m.mx.yt && m.mx.yt !== wd.yt && !m.mx.ytCh) delete info.ytCh;
    return { m, info };
  });

// js/marvel.js dagi mxSlug bilan bir xil
const slugOf = (m, info) => String(info.en || m.slug || m.id).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const abs = p => p ? new URL(p, SITE).href : '';
const mln = n => n >= 1e9 ? `${(n / 1e9).toFixed(2).replace(/\.?0+$/, '')} mlrd $` : `${Math.round(n / 1e6)} mln $`;
const MON = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const dateUz = d => { const [y, mo, day] = d.split('-').map(Number); return `${y}-yil ${day}-${MON[mo - 1]}`; };
const ytOf = url => (String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1] || '';

let template = fs.readFileSync(path.join(root, 'marvel.html'), 'utf8');
template = template.replace(/<main id="marvel" class="mx-page">[\s\S]*?<\/main>/, '<main id="marvel" class="mx-page"></main>');

function page({ id, title, desc, url, image, type, ld, body }) {
  let html = template
    .replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="../">')
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">` + (image ? `\n<meta property="og:image" content="${esc(image)}">` : ''))
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`)
    .replace('</head>', `<script>window.MX_ID=${id}</script>\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`)
    .replace('<main id="marvel" class="mx-page"></main>', `<main id="marvel" class="mx-page">${body}</main>`);
  return html;
}

function filmPage({ m, info }) {
  const uz = m.title.uz, ru = m.title.ru !== uz ? m.title.ru : '', en = info.en && info.en !== uz ? info.en : '';
  const year = (info.date || '').slice(0, 4) || m.year || '';
  const aka = [...new Set([ru, en, ...(m.tags || [])])].filter(x => x && x.length > 2 && x.toLowerCase() !== uz.toLowerCase() && !/^(marvel|dc|tez orada|скоро)$/i.test(x));
  const cast = [...new Set([...(m.cast || []), ...(info.cast || [])])].slice(0, 12);
  const director = (info.director && info.director.length ? info.director : [m.director]).filter(Boolean).join(', ');
  const yt = info.yt || ytOf(m.trailer);
  const official = !!(info.yt && info.ytCh);
  const slug = slugOf(m, info);
  const url = `${SITE}marvel/${slug}.html`;
  const image = abs(m.poster);
  const title = `${uz}${en ? ` (${en})` : ''}${year ? ` ${year}` : ''} — treyler, aktyorlar, byudjet | Marvel | DezoMax`;
  const money = [info.budget ? `byudjeti ${mln(info.budget)}` : '', info.gross ? `kassasi ${mln(info.gross)}` : ''].filter(Boolean).join(', ');
  const desc = `${uz}${year ? ` (${year})` : ''} — Marvel filmi: ${official ? 'rasmiy ' : ''}treyler, aktyorlar${cast.length ? ` (${cast.slice(0, 3).join(', ')})` : ''}${money ? `, ${money}` : ''}. ${m.desc && m.desc.uz ? m.desc.uz : ''}`.replace(/\s+/g, ' ').trim().slice(0, 300);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Movie', name: uz, url,
    ...(aka.length ? { alternateName: aka } : {}),
    ...(m.desc && m.desc.uz ? { description: m.desc.uz } : {}),
    ...(image ? { image } : {}),
    ...(info.date ? { datePublished: info.date } : year ? { datePublished: String(year) } : {}),
    ...(info.runtime ? { duration: `PT${info.runtime}M` } : {}),
    ...(director ? { director: director.split(/,\s*/).map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...(cast.length ? { actor: cast.map(n => ({ '@type': 'Person', name: n })) } : {}),
    productionCompany: { '@type': 'Organization', name: 'Marvel Studios' },
    ...(yt ? { trailer: { '@type': 'VideoObject', name: `${en || uz} — ${official ? 'official trailer' : 'trailer'}`, description: `${uz} treyleri`,
      thumbnailUrl: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, embedUrl: `https://www.youtube.com/embed/${yt}`, ...(info.date ? { uploadDate: info.date } : {}) } } : {})
  };
  const facts = [
    ['Premyera', info.date ? dateUz(info.date) : year],
    ['Davomiyligi', info.runtime ? `${info.runtime} daqiqa` : ''],
    ['Rejissyor', director],
    ['Byudjet', info.budget ? mln(info.budget) : ''],
    ['Kassa (butun dunyo)', info.gross ? mln(info.gross) : '']
  ].filter(f => f[1]);
  const body = `
<div class="wrap seo-pre">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › <a href="marvel.html">Marvel</a></nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster" src="${esc(m.poster)}" alt="${esc(uz)} — poster" width="220" height="330">` : ''}
    <div>
      <h1>${esc(uz)}${year ? ` (${year})` : ''}</h1>
      ${aka.length ? `<p class="seo-alt">${esc(aka.join(' · '))}</p>` : ''}
      ${m.desc && m.desc.uz ? `<p>${esc(m.desc.uz)}</p>` : ''}
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      ${cast.length ? `<h2>Aktyorlar</h2><ul class="seo-list">${cast.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
      ${yt ? `<p><a class="btn btn-primary" href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">${official ? 'Rasmiy treyler' : 'Treyler'} (YouTube)</a></p>` : ''}
    </div>
  </div>
</div>`;
  return { slug, html: page({ id: m.id, title, desc, url, image, type: 'video.movie', ld, body }) };
}

fs.mkdirSync(DIR, { recursive: true });
const keep = new Set(), pages = {};
for (const f of films) {
  const { slug, html } = filmPage(f);
  fs.writeFileSync(path.join(DIR, slug + '.html'), html);
  keep.add(slug + '.html');
  pages[f.m.id] = slug;
}
for (const f of fs.readdirSync(DIR)) if (f.endsWith('.html') && !keep.has(f)) fs.unlinkSync(path.join(DIR, f));

// marvel.html — ro'yxat HTML'ning o'zida (qidiruv robotlari barcha film sahifalarini topsin)
const sorted = [...films].sort((a, b) => String(b.info.date || b.m.year).localeCompare(String(a.info.date || a.m.year)));
const list = `
<div class="wrap seo-pre seo-index">
  <h1>Marvel filmlari — treylerlar, aktyorlar, byudjet va kassa</h1>
  <p>Marvel Studios filmlari o‘zbek tilida: rasmiy treylerlar, aktyorlar, premyera sanasi, byudjet va kassa daromadi.</p>
  <ul class="seo-grid">${sorted.map(({ m, info }) => `
    <li><a href="marvel/${pages[m.id]}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(m.title.uz)}" loading="lazy" width="160" height="240">` : ''}<span>${esc(m.title.uz)}</span><small>${esc((info.date || '').slice(0, 4) || m.year || '')}</small></a></li>`).join('')}
  </ul>
</div>`;
const mp = path.join(root, 'marvel.html');
fs.writeFileSync(mp, fs.readFileSync(mp, 'utf8').replace(/<main id="marvel" class="mx-page">[\s\S]*?<\/main>/, `<main id="marvel" class="mx-page">${list}</main>`));

console.log(`marvel/ — ${films.length} ta film sahifasi`);
module.exports = { pages };
