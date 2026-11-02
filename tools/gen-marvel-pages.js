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
// ruscha nusxa: ru/marvel/ (tools/ru-lib.js) — sahifalar ikki marta yasaladi: L = 'uz', keyin L = 'ru'
const { toRu, withHreflang } = require('./ru-lib.js');
let L = 'uz';
const T = (uz, ru) => (L === 'ru' ? ru : uz);

const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/marvel-films.js', 'js/marvel-data.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const INFO = ctx.MARVEL_INFO || {};
const seen = new Set();
// faqat rasmiy manbadagi (YouTube / Wikimedia) video yoki treyleri borlar — gen-pages.js dagi OFFICIAL bilan bir xil
const OFFICIAL = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|upload\.wikimedia\.org)\//i;
const films = (ctx.MARVEL_FILMS || []).filter(m => m && OFFICIAL.test(String(m.video || m.trailer || '').trim()) && !seen.has(m.id) && seen.add(m.id))
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
const mln = n => n >= 1e9 ? `${(n / 1e9).toFixed(2).replace(/\.?0+$/, '')} ${T('mlrd', 'млрд')} $` : `${Math.round(n / 1e6)} ${T('mln', 'млн')} $`;
const MON_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MON = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const dateUz = d => { const [y, mo, day] = d.split('-').map(Number); return L === 'ru' ? `${day} ${MON_RU[mo - 1]} ${y} г.` : `${y}-yil ${day}-${MON[mo - 1]}`; };
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
  const rel = url.slice(SITE.length);
  return L === 'ru' ? toRu(html, rel) : withHreflang(html, rel);
}

function filmPage({ m, info }) {
  const uz = L === 'ru' ? (m.title.ru || m.title.uz) : m.title.uz, ru = L === 'ru' ? (m.title.uz !== uz ? m.title.uz : '') : m.title.ru !== uz ? m.title.ru : '', en = info.en && info.en !== uz ? info.en : '';
  const year = (info.date || '').slice(0, 4) || m.year || '';
  const aka = [...new Set([ru, en, ...(m.tags || [])])].filter(x => x && x.length > 2 && x.toLowerCase() !== uz.toLowerCase() && !/^(marvel|dc|tez orada|скоро)$/i.test(x));
  const cast = [...new Set([...(m.cast || []), ...(info.cast || [])])].slice(0, 12);
  const director = (info.director && info.director.length ? info.director : [m.director]).filter(Boolean).join(', ');
  const yt = info.yt || ytOf(m.trailer);
  const official = !!(info.yt && info.ytCh);
  const slug = slugOf(m, info);
  const url = `${SITE}marvel/${slug}.html`;
  const image = abs(m.poster);
  const dtext = (m.desc && m.desc[L]) || '';
  const title = `${uz}${en ? ` (${en})` : ''}${year ? ` ${year}` : ''} — ${T('treyler, aktyorlar, byudjet', 'трейлер, актёры, бюджет')} | Marvel | DezoMax`;
  const money = [info.budget ? `${T('byudjeti', 'бюджет')} ${mln(info.budget)}` : '', info.gross ? `${T('kassasi', 'сборы')} ${mln(info.gross)}` : ''].filter(Boolean).join(', ');
  const about = T(`«${uz}»${year ? ` (${year})` : ''} — Marvel Studios filmi${director ? `, rejissyor — ${director}` : ''}${cast.length ? `. Asosiy rollarda: ${cast.slice(0, 4).join(', ')}` : ''}${info.runtime ? `. Davomiyligi — ${info.runtime} daqiqa` : ''}${money ? `; ${money}` : ''}. Bu sahifada filmning ${official ? 'rasmiy ' : ''}treyleri, premyera sanasi va asosiy ma’lumotlari jamlangan. Filmning to‘liq versiyasi DezoMax’da joylanmaydi.`,
    `«${uz}»${year ? ` (${year})` : ''} — фильм Marvel Studios${director ? `, режиссёр — ${director}` : ''}${cast.length ? `. В главных ролях: ${cast.slice(0, 4).join(', ')}` : ''}${info.runtime ? `. Продолжительность — ${info.runtime} мин.` : ''}${money ? `; ${money}` : ''}. На этой странице собраны ${official ? 'официальный ' : ''}трейлер, дата премьеры и основные сведения о фильме. Полная версия фильма на DezoMax не размещается.`);
  const desc = T(`${uz}${year ? ` (${year})` : ''} — Marvel filmi: ${official ? 'rasmiy ' : ''}treyler, aktyorlar${cast.length ? ` (${cast.slice(0, 3).join(', ')})` : ''}${money ? `, ${money}` : ''}. ${dtext}`,
    `${uz}${year ? ` (${year})` : ''} — фильм Marvel: ${official ? 'официальный ' : ''}трейлер, актёры${cast.length ? ` (${cast.slice(0, 3).join(', ')})` : ''}${money ? `, ${money}` : ''}. ${dtext || about}`).replace(/\s+/g, ' ').trim().slice(0, 300);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Movie', name: uz, url,
    ...(aka.length ? { alternateName: aka } : {}),
    ...(dtext ? { description: dtext } : {}),
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
    [T('Premyera', 'Премьера'), info.date ? dateUz(info.date) : year],
    [T('Davomiyligi', 'Продолжительность'), info.runtime ? `${info.runtime} ${T('daqiqa', 'мин.')}` : ''],
    [T('Rejissyor', 'Режиссёр'), director],
    [T('Byudjet', 'Бюджет'), info.budget ? mln(info.budget) : ''],
    [T('Kassa (butun dunyo)', 'Сборы (в мире)'), info.gross ? mln(info.gross) : '']
  ].filter(f => f[1]);
  const body = `
<div class="wrap seo-pre">
  <nav class="seo-crumbs"><a href="index.html">${T('Bosh sahifa', 'Главная')}</a> › <a href="marvel.html">Marvel</a></nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster" src="${esc(m.poster)}" alt="${esc(uz)} — ${T('poster', 'постер')}" width="220" height="330">` : ''}
    <div>
      <h1>${esc(uz)}${year ? ` (${year})` : ''}</h1>
      ${aka.length ? `<p class="seo-alt">${esc(aka.join(' · '))}</p>` : ''}
      ${dtext ? `<p>${esc(dtext)}</p>` : ''}
      <p class="seo-about">${esc(about)}</p>
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      ${cast.length ? `<h2>${T('Aktyorlar', 'Актёры')}</h2><ul class="seo-list">${cast.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
      ${yt ? `<p><a class="btn btn-primary" href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">${official ? T('Rasmiy treyler', 'Официальный трейлер') : T('Treyler', 'Трейлер')} (YouTube)</a></p>` : ''}
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
// ruscha nusxa — ru/marvel/
L = 'ru';
const RU_DIR = path.join(root, 'ru', 'marvel');
fs.mkdirSync(RU_DIR, { recursive: true });
for (const f of films) fs.writeFileSync(path.join(RU_DIR, slugOf(f.m, f.info) + '.html'), filmPage(f).html);
for (const f of fs.readdirSync(RU_DIR)) if (f.endsWith('.html') && !keep.has(f)) fs.unlinkSync(path.join(RU_DIR, f));
L = 'uz';

// marvel.html — ro'yxat HTML'ning o'zida (qidiruv robotlari barcha film sahifalarini topsin)
const sorted = [...films].sort((a, b) => String(b.info.date || b.m.year).localeCompare(String(a.info.date || a.m.year)));
const list = `
<div class="wrap seo-pre seo-index">
  <h1 data-ru="Фильмы Marvel — трейлеры, актёры, бюджет и сборы">Marvel filmlari — treylerlar, aktyorlar, byudjet va kassa</h1>
  <p data-ru="Фильмы Marvel Studios: официальные трейлеры, актёры, даты премьер, бюджет и кассовые сборы. Откройте фильм, чтобы посмотреть трейлер и узнать подробности.">Marvel Studios filmlari o‘zbek tilida: rasmiy treylerlar, aktyorlar, premyera sanasi, byudjet va kassa daromadi.</p>
  <ul class="seo-grid">${sorted.map(({ m, info }) => `
    <li><a href="marvel/${pages[m.id]}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(m.title.uz)}" loading="lazy" width="160" height="240">` : ''}<span data-ru="${esc(m.title.ru || m.title.uz)}">${esc(m.title.uz)}</span><small>${esc((info.date || '').slice(0, 4) || m.year || '')}</small></a></li>`).join('')}
  </ul>
</div>`;
const mp = path.join(root, 'marvel.html');
fs.writeFileSync(mp, fs.readFileSync(mp, 'utf8').replace(/<main id="marvel" class="mx-page">[\s\S]*?<\/main>/, `<main id="marvel" class="mx-page">${list}</main>`));

console.log(`marvel/ — ${films.length} ta film sahifasi`);
module.exports = { pages };
