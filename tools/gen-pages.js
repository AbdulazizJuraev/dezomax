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

// Kinostudiyalarning rasmiy treylerlari (tools/fetch-studio-trailers.js, admin → «Kanallar»): to'liq kino emas —
// faqat treyler sahifasi («Elio treyler», «Элио трейлер» qidiruvlari uchun) + studio/<key>.html ro'yxati
const commonSrc = fs.readFileSync(path.join(root, 'js', 'common.js'), 'utf8');
const sAt = commonSrc.indexOf('const STUDIOS');
const sctx = {}; vm.createContext(sctx);
vm.runInContext(commonSrc.slice(sAt, commonSrc.indexOf('];', sAt) + 2).replace(/^const /, 'var '), sctx);
const STUDIOS = sctx.STUDIOS || [];
const studioOf = m => m.ch && m.franchise !== 'marvel' && STUDIOS.find(s => s.key === m.franchise);
const trailers = MOVIES.filter(m => m && m.id != null && m.title && !m.video && OFFICIAL.test(String(m.trailer || '').trim()) && studioOf(m) && !inGroup.has(m.id));
for (const m of trailers) { m._trailer = true; list.push(m); }
const STUDIO_DIR = path.join(root, 'studio');

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
const TYPE = { film: 'Film', serial: 'Serial', multfilm: 'Multfilm', tahlil: 'Tahlil' };

function similar(m) {
  return list
    .filter(x => x !== m && !x._trailer === !m._trailer && (x.franchise === 'tahlil') === (m.franchise === 'tahlil'))   // treylerlar — treylerlar bilan, filmlar — filmlar bilan
    .map(x => ({ x, s: (x.genres || []).filter(g => (m.genres || []).includes(g)).length + (m.franchise && x.franchise === m.franchise ? 3 : 0) + (x.audio === m.audio ? 1 : 0) }))
    .filter(o => o.s > 0)
    .sort((a, b) => b.s - a.s || (b.x.year || 0) - (a.x.year || 0))
    .slice(0, 12)
    .map(o => o.x);
}

const template = fs.readFileSync(path.join(root, 'movie.html'), 'utf8');

// odamlar bir xil narsani turlicha yozib qidiradi: «o‘zbek tilida», «uzbek tilida», «узбек тилида»
const UZ_VARIANTS = ['o‘zbek tilida', 'uzbek tilida', 'ozbek tilida', 'o‘zbekcha', 'узбек тилида', 'на узбекском'];
const crumbs = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
});

function page({ id, title, desc, url, image, type, ld, body, keywords }) {
  const kw = [...new Set((keywords || []).map(k => String(k || '').trim()).filter(Boolean))].join(', ');
  let html = template
    .replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="../">')
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`)
    .replace(/<meta name="description" content="[^"]*">/, m => m + (kw ? `\n<meta name="keywords" content="${esc(kw)}">` : ''))
    // \r?\n — movie.html CRLF bilan saqlangan; avval faqat \n qidirilgani uchun almashmay qolib, 1000+ sahifa
    // «canonical = movie.html» deb ketgan edi (qidiruv tizimlari ularni bitta sahifaning nusxasi deb hisoblagan)
    .replace(/<!-- Har bir kino[\s\S]*?<\/script>\r?\n/, `<link rel="canonical" href="${url}">\n<meta property="og:url" content="${url}">\n`
      + (image ? `<meta property="og:image" content="${esc(image)}">\n<meta name="twitter:image" content="${esc(image)}">\n` : ''))
    .replace(/<meta name="twitter:card" content="summary">/, image ? '<meta name="twitter:card" content="summary_large_image">' : '$&')
    .replace('</head>', `${id ? `<script>window.DZX_ID=${id}</script>\n` : ''}<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`)
    .replace('<main id="page"></main>', `<main id="page">${body}</main>`);
  if (!html.includes(`<link rel="canonical" href="${url}">`)) throw new Error(`canonical qo'yilmadi: ${url}`);
  if (!id) html = html.replace(/<script src="js\/(?:ytplayer|vplayer|social|offline|movie)\.js[^"]*"><\/script>\r?\n/g, '').replace('</body>', '<script>initLayout();</script>\n</body>');
  return html;
}

function moviePage(m) {
  const name = noEmoji(m.title.uz || m.title.ru);
  const ru = m.title.ru && m.title.ru !== name ? noEmoji(m.title.ru) : '';
  const year = m.year ? ` (${m.year})` : '';
  const text = noEmoji((m.desc && (m.desc.uz || m.desc.ru)) || '');
  const uzb = m.audio === 'uz' || /O‘zbekiston/.test((m.country && m.country.uz) || '');
  const lang = uzb ? 'o‘zbek tilida ' : '';
  const tahlil = m.franchise === 'tahlil';
  const author = (m.source && m.source.name) || '';
  // tahlil videolari — kino emas: «onlayn ko‘rish» o'rniga muallif va «kino tahlil»; yil — yuklangan yil, sarlavhada keraksiz
  const title = tahlil
    ? `${name} — kino tahlil o‘zbek tilida${author ? ` | ${author}` : ''} | DezoMax`
    : `${name}${year} — ${lang}onlayn ko‘rish${ru ? ` | ${ru} смотреть онлайн` : ''} | DezoMax`;
  const kind = TYPE[m.type] ? TYPE[m.type].toLowerCase() : 'film';
  const desc = (tahlil
    ? `${name} — ${author ? author + ' ' : ''}o‘zbek tilida kino tahlil videosi, bepul ko‘ring. ${text}`
    : `${name}${year}${ru ? ` (${ru})` : ''} ${kind}ini ${lang}bepul onlayn ko‘ring${uzb ? ' — на узбекском языке' : ''}. ${text}`)
    .replace(/\s+/g, ' ').slice(0, 280);
  const url = `${SITE}kino/${m._page}.html`;
  const image = abs(m.poster);
  const genres = (m.genres || []).map(genre);
  const yt = (String(m.video).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  const keywords = tahlil
    ? [name, /tahlil/i.test(name) ? '' : `${name} tahlil`, 'kino tahlil', 'kino tahlil o‘zbek tilida', 'film tahlili', author, ...(m.tags || [])]
    : [name, ru, ...(m.tags || []),
       ...(uzb ? UZ_VARIANTS.map(v => `${name} ${v}`) : []),
       `${name} onlayn ko‘rish`, `${name} kino`, ru && `${ru} смотреть онлайн`,
       m.year && `${name} ${m.year}`, ...genres.map(g => `${g.toLowerCase()} kino`), uzb && 'o‘zbek kinolari', uzb && 'uzbek kino'];
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
  // VideoObject — Google qidiruvida video belgisi/kichik rasm bilan chiqishi uchun (video — rasmiy YouTube'da)
  const video = yt ? {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: tahlil ? name : `${name}${year} — ${lang}onlayn`,
    description: (text || desc).slice(0, 500),
    thumbnailUrl: [`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, ...(image ? [image] : [])],
    ...(m.year ? { uploadDate: String(m.year) } : {}),
    ...(m.duration && m.type !== 'serial' ? { duration: `PT${m.duration}M` } : {}),
    embedUrl: `https://www.youtube.com/embed/${yt}`,
    contentUrl: `https://www.youtube.com/watch?v=${yt}`,
    ...(uzb || tahlil ? { inLanguage: 'uz' } : {}),
    ...(author ? { author: { '@type': 'Organization', name: author } } : {})
  } : null;
  const trail = crumbs([['Bosh sahifa', SITE], [tahlil ? 'Kino tahlil' : 'Filmlar', `${SITE}kino/index.html`], [name, url]]);
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
  return page({ id: m.id, title, desc, url, image, type: 'video.movie', ld: [tahlil && video ? null : ld, video, trail].filter(Boolean), body, keywords });
}

function indexPage() {
  const url = `${SITE}kino/index.html`;
  const films = list.filter(m => !m._trailer && m.franchise !== 'tahlil');   // ro'yxat — kinolar (tahlil videolari o'z sahifasida)
  const sorted = [...films].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const title = 'O‘zbek kinolari va filmlar onlayn — barcha filmlar ro‘yxati | DezoMax';
  const desc = `DezoMax’dagi ${films.length} ta film: o‘zbek kinolari, komediya, drama va konsertlar — bepul onlayn ko‘ring.`;
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

/* Studiya treyleri: «Elio (2025) — rasmiy treyler | Элио трейлер» */
function trailerPage(m) {
  const st = studioOf(m);
  const name = noEmoji(m.title.uz || m.title.ru);
  const ru = m.title.ru && m.title.ru !== name ? noEmoji(m.title.ru) : '';
  const aka = [...new Set([ru, ...(m.tags || [])])].filter(x => x && x.toLowerCase() !== name.toLowerCase());
  const year = m.year ? ` (${m.year})` : '';
  const kind = TYPE[m.type] ? TYPE[m.type].toLowerCase() : 'film';
  const text = noEmoji((m.desc && m.desc.uz) || '');
  const title = `${name}${year} — rasmiy treyler${ru ? ` | ${ru} — трейлер` : ''} | DezoMax`;
  const desc = `${name}${year} ${kind}ining rasmiy treylerini ko‘ring${ru ? ` (${ru} — официальный трейлер)` : ''}. ${text}`.replace(/\s+/g, ' ').slice(0, 280);
  const url = `${SITE}kino/${m._page}.html`;
  const image = abs(m.poster);
  const yt = (String(m.trailer).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  const genres = (m.genres || []).map(genre);
  const facts = [
    ['Turi', TYPE[m.type]],
    ['Yili', m.year],
    ['Janr', genres.join(', ')],
    ['Studiya', st.name],
    ['Rejissyor', m.director],
    ['Rollarda', (m.cast || []).join(', ')],
    ['Boshqa nomlari', aka.join(', ')],
    ['Treyler', m.source && m.source.name ? `${m.source.name} — rasmiy YouTube kanali` : '']
  ].filter(f => f[1]);
  const sim = similar(m);
  const ld = {
    '@context': 'https://schema.org',
    '@type': m.type === 'serial' ? 'TVSeries' : 'Movie',
    name, url,
    ...(aka.length ? { alternateName: aka } : {}),
    ...(text ? { description: text } : {}),
    ...(image ? { image } : {}),
    ...(m.year ? { datePublished: String(m.year) } : {}),
    ...(genres.length ? { genre: genres } : {}),
    ...(m.director ? { director: String(m.director).split(/,\s*/).map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...((m.cast || []).length ? { actor: m.cast.map(n => ({ '@type': 'Person', name: n })) } : {}),
    productionCompany: { '@type': 'Organization', name: st.name },
    ...(yt ? { trailer: { '@type': 'VideoObject', name: `${name} — rasmiy treyler`, description: desc, thumbnailUrl: image, embedUrl: `https://www.youtube.com/embed/${yt}`, contentUrl: `https://www.youtube.com/watch?v=${yt}` } } : {})
  };
  const body = `
<div class="wrap seo-pre">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › <a href="studio/${st.key}.html">${esc(st.name)}</a> › Treyler</nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster seo-poster-wide" src="${esc(m.poster)}" alt="${esc(name)} — rasmiy treyler" width="400" height="225">` : ''}
    <div>
      <h1>${esc(name)}${year} — rasmiy treyler</h1>
      ${ru ? `<p class="seo-alt">${esc(ru)} — официальный трейлер</p>` : ''}
      <p>${esc(text)}</p>
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      <a class="btn btn-primary" href="kino/${m._page}.html?play=1">Treylerni ko‘rish</a>
    </div>
  </div>
  ${sim.length ? `<h2>Boshqa treylerlar</h2>
  <ul class="seo-list">${sim.map(x => `<li><a href="kino/${x._page}.html">${esc(noEmoji(x.title.uz))}${x.year ? ` (${x.year})` : ''} — treyler</a></li>`).join('')}</ul>` : ''}
</div>`;
  const keywords = [`${name} treyler`, `${name} trailer`, ru && `${ru} трейлер`, ...aka.map(a => `${a} трейлер`),
    `${name} ${m.year || ''} treyler`, `${name} rasmiy treyler`, `${name} kino`, st.name];
  const trail = crumbs([['Bosh sahifa', SITE], [st.name, `${SITE}studio/${st.key}.html`], [name, url]]);
  return page({ id: m.id, title, desc, url, image, type: 'video.movie', ld: [ld, trail], body, keywords });
}

/* studio/<key>.html — studiyaning barcha rasmiy treylerlari ro'yxati («Pixar treylerlari») */
function studioPage(st, items) {
  const url = `${SITE}studio/${st.key}.html`;
  const sorted = [...items].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const title = `${st.name} — yangi filmlar treylerlari ${new Date().getFullYear()} | DezoMax`;
  const desc = `${st.name}: ${items.length} ta film va serialning rasmiy treylerlari — ${sorted.slice(0, 5).map(m => noEmoji(m.title.uz)).join(', ')} va boshqalar. Официальные трейлеры ${st.name}.`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: `${st.name} — rasmiy treylerlar`, url,
    itemListElement: sorted.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}kino/${m._page}.html`, name: `${noEmoji(m.title.uz)} — treyler` }))
  };
  const others = STUDIOS.filter(s => s.key !== st.key && studioPages[s.key]);
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › Kinostudiyalar › ${esc(st.name)}</nav>
  <h1>${esc(st.name)} — rasmiy treylerlar</h1>
  <p>${esc(desc)}</p>
  <p><a class="btn btn-primary" href="catalog.html?studio=${st.key}">Saytda ochish</a></p>
  <ul class="seo-grid seo-grid-wide">${sorted.map((m, i) => `
    <li><a href="kino/${m._page}.html"><img src="${esc(m.poster)}" alt="${esc(noEmoji(m.title.uz))} — treyler"${i >= 8 ? ' loading="lazy"' : ''} decoding="async" width="320" height="180"><span>${esc(noEmoji(m.title.uz))}</span>${m.title.ru && m.title.ru !== m.title.uz ? `<small>${esc(m.title.ru)}</small>` : ''}${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
  ${others.length ? `<h2>Boshqa kinostudiyalar</h2>
  <ul class="seo-list">${others.map(s => `<li><a href="studio/${s.key}.html">${esc(s.name)} — treylerlar</a></li>`).join('')}</ul>` : ''}
</div>`;
  return page({ id: 0, title, desc, url, image: sorted[0] ? abs(sorted[0].poster) : '', type: 'website', ld, body });
}

const studioPages = {};
for (const st of STUDIOS) if (trailers.some(m => m.franchise === st.key)) studioPages[st.key] = st.key;

fs.mkdirSync(DIR, { recursive: true });
const keep = new Set(['index.html']);
for (const m of list) {
  fs.writeFileSync(path.join(DIR, m._page + '.html'), m._trailer ? trailerPage(m) : moviePage(m));
  keep.add(m._page + '.html');
}
fs.writeFileSync(path.join(DIR, 'index.html'), indexPage());
// endi ro'yxatda yo'q kinolarning eski sahifalari o'chiriladi
for (const f of fs.readdirSync(DIR)) if (f.endsWith('.html') && !keep.has(f)) fs.unlinkSync(path.join(DIR, f));

// saytdagi havolalar uchun: id → sahifa (js/seo-pages.js)
const map = Object.fromEntries(list.map(m => [m.id, m._page]));
fs.writeFileSync(path.join(root, 'js', 'seo-pages.js'),
  `/* tools/gen-pages.js yaratadi — qo'lda o'zgartirmang. Kino id → kino/<sahifa>.html */\nvar SEO_PAGES = ${JSON.stringify(map)};\n`);

// studio/<key>.html — treylerlari bor studiyalar
fs.mkdirSync(STUDIO_DIR, { recursive: true });
for (const st of STUDIOS) if (studioPages[st.key]) fs.writeFileSync(path.join(STUDIO_DIR, st.key + '.html'), studioPage(st, trailers.filter(m => m.franchise === st.key)));
for (const f of fs.readdirSync(STUDIO_DIR)) if (f.endsWith('.html') && !studioPages[f.replace(/\.html$/, '')]) fs.unlinkSync(path.join(STUDIO_DIR, f));

console.log(`kino/ — ${list.length - trailers.length} ta film, ${trailers.length} ta treyler sahifasi; studio/ — ${Object.keys(studioPages).length} ta`);
module.exports = { pages: map, studios: Object.keys(studioPages) };
