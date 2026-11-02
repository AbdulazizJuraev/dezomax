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
// ruscha nusxa: ru/kino/, ru/toplam/ (tools/ru-lib.js) — sahifalar ikki marta yasaladi: L = 'uz', keyin L = 'ru'
const { toRu, withHreflang, hasRu } = require('./ru-lib.js');
let L = 'uz';
const T = (uz, ru) => (L === 'ru' ? ru : uz);
const at = rel => SITE + (L === 'ru' ? 'ru/' : '') + rel;   // shu tildagi sahifa manzili (schema.org)

const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
vm.createContext(ctx);
for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-rutube.js', 'js/data-custom.js']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var ');
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { console.warn(`${f}: ${e.message}`); }
}
const MOVIES = ctx.MOVIES || [];
const GENRES = ctx.GENRES || [];

const OFFICIAL = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|upload\.wikimedia\.org|rutube\.ru)\//i;
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
const genre = id => { const g = GENRES.find(x => x.id === id) || {}; return g[L] || g.uz || id; };
const nm = m => noEmoji(L === 'ru' ? (m.title.ru || m.title.uz) : m.title.uz);
const abs = p => p ? new URL(p, SITE).href : '';
const TYPE_UZB = { film: 'Film', serial: 'Serial', multfilm: 'Multfilm', tahlil: 'Tahlil' };
const TYPE_RU = { film: 'Фильм', serial: 'Сериал', multfilm: 'Мультфильм', tahlil: 'Разбор' };
const TYPE = new Proxy({}, { get: (o, k) => (L === 'ru' ? TYPE_RU : TYPE_UZB)[k] });

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
  const rel = url.slice(SITE.length).replace(/^ru\//, '');
  url = SITE + rel;   // canonical — o'zbekcha manzil; ruscha nusxada toRu() almashtiradi
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
  return L === 'ru' ? toRu(html, rel) : hasRu(rel) ? withHreflang(html, rel) : html;
}

/* Film haqida to'liq gapli matn (qidiruv tizimlari va AdSense sahifani «kontent kam» demasin) — ma'lumotlardan */
function aboutText(m, { name, genres, uzb, tahlil, author, trailer, studio }) {
  const y = m.year, d = m.duration && m.type !== 'serial' ? m.duration : 0;
  const cast = (m.cast || []).slice(0, 4).join(', '), dir = m.director, src = m.source && m.source.name;
  const kindUz = { serial: 'serial', multfilm: 'multfilm' }[m.type] || 'film';
  const kindRu = { serial: 'сериал', multfilm: 'мультфильм' }[m.type] || 'фильм';
  const g = genres.join(', ').toLowerCase();
  if (L === 'ru') {
    if (tahlil) return `«${name}» — видеоразбор${author ? ` от автора ${author}` : ''} на узбекском языке: обзор сюжета, героев и идей фильма. На DezoMax его можно смотреть бесплатно, без регистрации — на компьютере, телефоне и телевизоре.`;
    if (trailer) return `«${name}»${y ? ` (${y})` : ''} — ${kindRu}${studio ? ` студии ${studio}` : ''}${g ? ` в жанре «${g}»` : ''}. На этой странице — официальный трейлер${src ? ` с YouTube-канала ${src}` : ''}${dir ? `, режиссёр — ${dir}` : ''}${cast ? `, в ролях: ${cast}` : ''}. Полная версия фильма на DezoMax не размещается.`;
    return [`«${name}» — ${kindRu}${y ? ` ${y} года` : ''}${g ? ` в жанре «${g}»` : ''}${uzb ? ' на узбекском языке' : ''}.`,
      dir ? `Режиссёр — ${dir}.` : '', cast ? `В главных ролях: ${cast}.` : '', d ? `Продолжительность — ${d} мин.` : '',
      `Смотрите ${kindRu} на DezoMax бесплатно и без регистрации${src ? ` — видео размещено на официальном канале «${src}»` : ''}: на компьютере, телефоне и телевизоре.`].filter(Boolean).join(' ');
  }
  if (tahlil) return `«${name}» — ${author ? `${author} muallifligidagi ` : ''}o‘zbek tilidagi kino tahlil videosi: film syujeti, qahramonlari va g‘oyalari haqida. DezoMax’da uni bepul va ro‘yxatdan o‘tmasdan — kompyuterda, telefonda va televizorda ko‘rish mumkin.`;
  if (trailer) return `«${name}»${y ? ` (${y})` : ''} — ${studio ? `${studio} studiyasining ` : ''}${g ? `«${g}» janridagi ` : ''}${kindUz}i. Bu sahifada — rasmiy treyler${src ? ` (${src} YouTube kanali)` : ''}${dir ? `, rejissyor — ${dir}` : ''}${cast ? `, rollarda: ${cast}` : ''}. Filmning to‘liq versiyasi DezoMax’da joylanmaydi.`;
  return [`«${name}» — ${y ? `${y}-yilda suratga olingan ` : ''}${g ? `«${g}» janridagi ` : ''}${uzb ? 'o‘zbek tilidagi ' : ''}${kindUz}.`,
    dir ? `Rejissyor — ${dir}.` : '', cast ? `Asosiy rollarda: ${cast}.` : '', d ? `Davomiyligi — ${d} daqiqa.` : '',
    `Uni DezoMax’da bepul va ro‘yxatdan o‘tmasdan ko‘ring${src ? ` — video «${src}» rasmiy kanalida joylangan` : ''}: kompyuterda, telefonda va televizorda.`].filter(Boolean).join(' ');
}

function moviePage(m) {
  const name = L === 'ru' ? noEmoji(m.title.ru || m.title.uz) : noEmoji(m.title.uz || m.title.ru);
  const ru = L === 'ru' ? (m.title.uz && noEmoji(m.title.uz) !== name ? noEmoji(m.title.uz) : '') : m.title.ru && m.title.ru !== name ? noEmoji(m.title.ru) : '';
  const year = m.year ? ` (${m.year})` : '';
  const text = noEmoji((m.desc && (L === 'ru' ? m.desc.ru : m.desc.uz || m.desc.ru)) || '');
  const uzb = m.audio === 'uz' || /O‘zbekiston/.test((m.country && m.country.uz) || '');
  const lang = uzb ? 'o‘zbek tilida ' : '';
  const tahlil = m.franchise === 'tahlil';
  const author = (m.source && m.source.name) || '';
  // tahlil videolari — kino emas: «onlayn ko‘rish» o'rniga muallif va «kino tahlil»; yil — yuklangan yil, sarlavhada keraksiz
  const title = L === 'ru' ? (tahlil
    ? `${name} — разбор фильма на узбекском${author ? ` | ${author}` : ''} | DezoMax`
    : `${name}${year} — смотреть онлайн${uzb ? ' на узбекском' : ''} бесплатно | DezoMax`) : tahlil
    ? `${name} — kino tahlil o‘zbek tilida${author ? ` | ${author}` : ''} | DezoMax`
    : `${name}${year} — ${lang}onlayn ko‘rish${ru ? ` | ${ru} смотреть онлайн` : ''} | DezoMax`;
  const kind = TYPE[m.type] ? TYPE[m.type].toLowerCase() : 'film';
  const genres = (m.genres || []).map(genre);
  const about = aboutText(m, { name, genres, uzb, tahlil, author });
  const desc = (L === 'ru' ? (tahlil
    ? `${name} — видеоразбор фильма на узбекском языке${author ? ` от ${author}` : ''}, смотрите бесплатно. ${text || about}`
    : `Смотрите ${{ serial: 'сериал', multfilm: 'мультфильм' }[m.type] || 'фильм'} «${name}»${year} онлайн бесплатно${uzb ? ' на узбекском языке' : ''} на DezoMax. ${text || about}`) : tahlil
    ? `${name} — ${author ? author + ' ' : ''}o‘zbek tilida kino tahlil videosi, bepul ko‘ring. ${text}`
    : `${name}${year}${ru ? ` (${ru})` : ''} ${kind}ini ${lang}bepul onlayn ko‘ring${uzb ? ' — на узбекском языке' : ''}. ${text}`)
    .replace(/\s+/g, ' ').slice(0, 280);
  const url = at(`kino/${m._page}.html`);
  const image = abs(m.poster);
  const yt = (String(m.video).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  const keywords = L === 'ru' ? [name, ru, `${name} смотреть онлайн`, `${name} бесплатно`, m.year && `${name} ${m.year}`, uzb && `${name} на узбекском`,
       ...genres.map(g => `${g.toLowerCase()} смотреть онлайн`), ...(m.tags || [])] : tahlil
    ? [name, /tahlil/i.test(name) ? '' : `${name} tahlil`, 'kino tahlil', 'kino tahlil o‘zbek tilida', 'film tahlili', author, ...(m.tags || [])]
    : [name, ru, ...(m.tags || []),
       ...(uzb ? UZ_VARIANTS.map(v => `${name} ${v}`) : []),
       `${name} onlayn ko‘rish`, `${name} kino`, ru && `${ru} смотреть онлайн`,
       m.year && `${name} ${m.year}`, ...genres.map(g => `${g.toLowerCase()} kino`), uzb && 'o‘zbek kinolari', uzb && 'uzbek kino'];
  const facts = [
    [T('Turi', 'Тип'), TYPE[m.type]],
    [T('Yili', 'Год'), m.year],
    [T('Janr', 'Жанр'), genres.join(', ')],
    [T('Davlat', 'Страна'), m.country && (m.country[L] || m.country.uz)],
    [T('Davomiyligi', 'Продолжительность'), m.duration && m.type !== 'serial' ? `${m.duration} ${T('daqiqa', 'мин.')}` : ''],
    [T('Rejissyor', 'Режиссёр'), m.director],
    [T('Rollarda', 'В ролях'), (m.cast || []).join(', ')],
    [T('Til', 'Язык'), uzb ? T('O‘zbek tilida', 'Узбекский') : ''],
    [T('Manba', 'Источник'), m.source && m.source.name]
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
    name: tahlil ? name : `${name}${year} — ${T(`${lang}onlayn`, 'онлайн')}`,
    description: (text || desc).slice(0, 500),
    thumbnailUrl: [`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, ...(image ? [image] : [])],
    ...(m.year ? { uploadDate: String(m.year) } : {}),
    ...(m.duration && m.type !== 'serial' ? { duration: `PT${m.duration}M` } : {}),
    embedUrl: `https://www.youtube.com/embed/${yt}`,
    contentUrl: `https://www.youtube.com/watch?v=${yt}`,
    ...(uzb || tahlil ? { inLanguage: 'uz' } : {}),
    ...(author ? { author: { '@type': 'Organization', name: author } } : {})
  } : null;
  const trail = crumbs([[T('Bosh sahifa', 'Главная'), at('')], [tahlil ? T('Kino tahlil', 'Разборы фильмов') : T('Filmlar', 'Фильмы'), at('kino/index.html')], [name, url]]);
  const body = `
<div class="wrap seo-pre">
  <nav class="seo-crumbs"><a href="index.html">${T('Bosh sahifa', 'Главная')}</a> › <a href="kino/index.html">${T('Filmlar', 'Фильмы')}</a></nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster" src="${esc(m.poster)}" alt="${esc(name)} — ${T('poster', 'постер')}" width="220" height="330">` : ''}
    <div>
      <h1>${esc(name)}${year}</h1>
      ${ru ? `<p class="seo-alt">${esc(ru)}</p>` : ''}
      ${text ? `<p>${esc(text)}</p>` : ''}
      <p class="seo-about">${esc(about)}</p>
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      <a class="btn btn-primary" href="kino/${m._page}.html?play=1">${T('Onlayn ko‘rish', 'Смотреть онлайн')}</a>
    </div>
  </div>
  ${sim.length ? `<h2>${T('O‘xshash kinolar', 'Похожие фильмы')}</h2>
  <ul class="seo-list">${sim.map(x => `<li><a href="kino/${x._page}.html">${esc(nm(x))}${x.year ? ` (${x.year})` : ''}</a></li>`).join('')}</ul>` : ''}
</div>`;
  return page({ id: m.id, title, desc, url, image, type: 'video.movie', ld: [tahlil && video ? null : ld, video, trail].filter(Boolean), body, keywords });
}

function indexPage() {
  const url = at('kino/index.html');
  const films = list.filter(m => !m._trailer && m.franchise !== 'tahlil');   // ro'yxat — kinolar (tahlil videolari o'z sahifasida)
  const sorted = [...films].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const title = T('O‘zbek kinolari va filmlar onlayn — barcha filmlar ro‘yxati | DezoMax', 'Узбекские фильмы и кино онлайн — полный список фильмов | DezoMax');
  const desc = T(`DezoMax’dagi ${films.length} ta film: o‘zbek kinolari, komediya, drama va konsertlar — bepul onlayn ko‘ring.`,
    `${films.length} фильмов на DezoMax: узбекское кино, комедии, драмы и концерты — смотрите онлайн бесплатно.`);
  const intro = T(`Bu sahifada DezoMax’dagi barcha filmlar yangilaridan boshlab ro‘yxat qilingan. Har bir film rasmiy manbadan — mualliflik huquqi egasining YouTube yoki RuTube kanalidan — olingan, shuning uchun ularni bepul va ro‘yxatdan o‘tmasdan ko‘rish mumkin. Filmni bosing: uning sahifasida qisqacha mazmuni, yili, janri, rejissyori va aktyorlari, shuningdek o‘xshash filmlar ro‘yxati bor.`,
    `На этой странице собраны все фильмы DezoMax — от новых к старым. Каждый фильм взят из официального источника — YouTube- или RuTube-канала правообладателя, поэтому смотреть его можно бесплатно и без регистрации. Откройте фильм: на его странице есть краткое описание, год, жанр, режиссёр и актёры, а также список похожих фильмов.`);
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: T('Filmlar ro‘yxati', 'Список фильмов'), url,
    itemListElement: sorted.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: at(`kino/${m._page}.html`), name: nm(m) }))
  };
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">${T('Bosh sahifa', 'Главная')}</a> › ${T('Filmlar', 'Фильмы')}</nav>
  <h1>${T('O‘zbek kinolari va filmlar onlayn', 'Узбекские фильмы и кино онлайн')}</h1>
  <p>${esc(desc)}</p>
  <p class="seo-about">${esc(intro)}</p>
  ${collections.length ? `<ul class="seo-list seo-chips">${collections.map(c => `<li><a href="toplam/${c.key}.html">${esc(T(c.name, c.ru.name))} (${c.items.length})</a></li>`).join('')}</ul>` : ''}
  ${L === 'ru' ? '' : '<p><a href="teg/index.html">Barcha teglar: janr, yil, davlat, aktyor va rejissyor bo‘yicha →</a></p>'}
  <ul class="seo-grid">${sorted.map((m, i) => `
    <li><a href="kino/${m._page}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(nm(m))}"${i >= 12 ? ' loading="lazy"' : ''} decoding="async" width="160" height="240">` : ''}<span>${esc(nm(m))}</span>${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
</div>`;
  return page({ id: 0, title, desc, url, image: '', type: 'website', ld, body });
}

/* Studiya treyleri: «Elio (2025) — rasmiy treyler | Элио трейлер» */
function trailerPage(m) {
  const st = studioOf(m);
  const name = L === 'ru' ? noEmoji(m.title.ru || m.title.uz) : noEmoji(m.title.uz || m.title.ru);
  const ru = L === 'ru' ? '' : m.title.ru && m.title.ru !== name ? noEmoji(m.title.ru) : '';
  const aka = [...new Set([ru, ...(m.tags || [])])].filter(x => x && x.toLowerCase() !== name.toLowerCase());
  const year = m.year ? ` (${m.year})` : '';
  const kind = TYPE[m.type] ? TYPE[m.type].toLowerCase() : 'film';
  const text = noEmoji((m.desc && m.desc[L]) || '');
  const title = L === 'ru' ? `${name}${year} — официальный трейлер | DezoMax` : `${name}${year} — rasmiy treyler${ru ? ` | ${ru} — трейлер` : ''} | DezoMax`;
  const genresT = (m.genres || []).map(genre);
  const about = aboutText(m, { name, genres: genresT, trailer: true, studio: st.name });
  const desc = (L === 'ru' ? `Официальный трейлер: ${name}${year}. ${text || about}` : `${name}${year} ${kind}ining rasmiy treylerini ko‘ring${ru ? ` (${ru} — официальный трейлер)` : ''}. ${text || about}`).replace(/\s+/g, ' ').slice(0, 280);
  const url = at(`kino/${m._page}.html`);
  const image = abs(m.poster);
  const yt = (String(m.trailer).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  const genres = (m.genres || []).map(genre);
  const facts = [
    [T('Turi', 'Тип'), TYPE[m.type]],
    [T('Yili', 'Год'), m.year],
    [T('Janr', 'Жанр'), genres.join(', ')],
    [T('Studiya', 'Студия'), st.name],
    [T('Rejissyor', 'Режиссёр'), m.director],
    [T('Rollarda', 'В ролях'), (m.cast || []).join(', ')],
    [T('Boshqa nomlari', 'Другие названия'), aka.join(', ')],
    [T('Treyler', 'Трейлер'), m.source && m.source.name ? `${m.source.name} — ${T('rasmiy YouTube kanali', 'официальный YouTube-канал')}` : '']
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
  <nav class="seo-crumbs"><a href="index.html">${T('Bosh sahifa', 'Главная')}</a> › <a href="studio/${st.key}.html">${esc(st.name)}</a> › ${T('Treyler', 'Трейлер')}</nav>
  <div class="seo-head">
    ${image ? `<img class="seo-poster seo-poster-wide" src="${esc(m.poster)}" alt="${esc(name)} — ${T('rasmiy treyler', 'официальный трейлер')}" width="400" height="225">` : ''}
    <div>
      <h1>${esc(name)}${year} — ${T('rasmiy treyler', 'официальный трейлер')}</h1>
      ${ru ? `<p class="seo-alt">${esc(ru)} — официальный трейлер</p>` : ''}
      ${text ? `<p>${esc(text)}</p>` : ''}
      <p class="seo-about">${esc(about)}</p>
      <dl>${facts.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      <a class="btn btn-primary" href="kino/${m._page}.html?play=1">${T('Treylerni ko‘rish', 'Смотреть трейлер')}</a>
    </div>
  </div>
  ${sim.length ? `<h2>${T('Boshqa treylerlar', 'Другие трейлеры')}</h2>
  <ul class="seo-list">${sim.map(x => `<li><a href="kino/${x._page}.html">${esc(nm(x))}${x.year ? ` (${x.year})` : ''} — ${T('treyler', 'трейлер')}</a></li>`).join('')}</ul>` : ''}
</div>`;
  const keywords = [`${name} treyler`, `${name} trailer`, ru && `${ru} трейлер`, ...aka.map(a => `${a} трейлер`),
    `${name} ${m.year || ''} treyler`, `${name} rasmiy treyler`, `${name} kino`, st.name];
  const trail = crumbs([[T('Bosh sahifa', 'Главная'), at('')], [st.name, `${SITE}studio/${st.key}.html`], [name, url]]);
  return page({ id: m.id, title, desc, url, image, type: 'video.movie', ld: [ld, trail], body, keywords });
}

/* studio/<key>.html — studiyaning barcha rasmiy treylerlari ro'yxati («Pixar treylerlari») */
function studioPage(st, items) {
  const url = `${SITE}studio/${st.key}.html`;
  const sorted = [...items].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const title = `${st.name} — yangi filmlar treylerlari ${new Date().getFullYear()} | DezoMax`;
  const desc = `${st.name}: ${items.length} ta film va serialning rasmiy treylerlari — ${sorted.slice(0, 5).map(m => nm(m)).join(', ')} va boshqalar. Официальные трейлеры ${st.name}.`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: `${st.name} — rasmiy treylerlar`, url,
    itemListElement: sorted.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}kino/${m._page}.html`, name: `${nm(m)} — treyler` }))
  };
  const others = STUDIOS.filter(s => s.key !== st.key && studioPages[s.key]);
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › Kinostudiyalar › ${esc(st.name)}</nav>
  <h1>${esc(st.name)} — rasmiy treylerlar</h1>
  <p>${esc(desc)}</p>
  <p><a class="btn btn-primary" href="catalog.html?studio=${st.key}">Saytda ochish</a></p>
  <ul class="seo-grid seo-grid-wide">${sorted.map((m, i) => `
    <li><a href="kino/${m._page}.html"><img src="${esc(m.poster)}" alt="${esc(nm(m))} — treyler"${i >= 8 ? ' loading="lazy"' : ''} decoding="async" width="320" height="180"><span>${esc(nm(m))}</span>${m.title.ru && m.title.ru !== m.title.uz ? `<small>${esc(m.title.ru)}</small>` : ''}${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
  ${others.length ? `<h2>Boshqa kinostudiyalar</h2>
  <ul class="seo-list">${others.map(s => `<li><a href="studio/${s.key}.html">${esc(s.name)} — treylerlar</a></li>`).join('')}</ul>` : ''}
</div>`;
  return page({ id: 0, title, desc, url, image: sorted[0] ? abs(sorted[0].poster) : '', type: 'website', ld, body });
}

const studioPages = {};
for (const st of STUDIOS) if (trailers.some(m => m.franchise === st.key)) studioPages[st.key] = st.key;

/* toplam/<key>.html — mavzu bo'yicha to'plamlar: odamlar ko'p qidiradigan so'rovlar uchun («o'zbek seriallari»,
   «o'zbek tilida multfilmlar», «Avaz Oxun konsert», «2026 premyeralar treyler»). Faqat yuqoridagi rasmiy
   manbadagi kinolar (list) — boshqa saytlardan olinganlar kirmaydi. Kamida 3 ta kino bo'lsa sahifa yaratiladi. */
const YEAR = new Date().getFullYear();
const isUz = m => m.franchise === 'uzbek' || m.audio === 'uz';
const COLLECTIONS = [
  { key: 'ozbek-filmlari',
    ru: { h1: 'Узбекские фильмы — смотреть онлайн бесплатно', name: 'Узбекские фильмы', lead: 'Лучшие узбекские фильмы: комедии, драмы, семейное и приключенческое кино — с официальных каналов, в полной версии.' }, h1: 'O‘zbek filmlari — onlayn bepul', name: 'O‘zbek filmlari',
    lead: 'Eng sara o‘zbek kinolari: komediya, drama, oilaviy va jangari filmlar — rasmiy kanallardan, to‘liq versiyada.',
    kw: ['o‘zbek filmlari', 'o‘zbek kinolari', 'uzbek kino', 'ozbek kino', 'o‘zbek kino onlayn', 'yangi o‘zbek kinolari', 'узбекские фильмы', 'узбек кино'],
    pick: m => !m._trailer && isUz(m) && m.type === 'film' && m.franchise !== 'konsert' },
  { key: 'ozbek-komediya',
    ru: { h1: 'Узбекские комедии', name: 'Узбекские комедии', lead: 'Смешные узбекские фильмы — комедии для просмотра всей семьёй.' }, h1: 'O‘zbek komediya filmlari', name: 'O‘zbek komediyalari',
    lead: 'Kulgili o‘zbek filmlari — butun oila bilan ko‘rish uchun komediyalar.',
    kw: ['o‘zbek komediya', 'o‘zbek komediya filmlari', 'kulgili o‘zbek kinolari', 'uzbek komediya kino', 'узбекские комедии'],
    pick: m => !m._trailer && isUz(m) && m.type === 'film' && (m.genres || []).includes('comedy') },
  { key: 'ozbek-seriallari',
    ru: { h1: 'Узбекские сериалы — все серии', name: 'Узбекские сериалы', lead: 'Новые узбекские сериалы со всеми сериями — с официальных каналов, бесплатно онлайн.' }, h1: 'O‘zbek seriallari — barcha qismlari', name: 'O‘zbek seriallari', wide: true,
    lead: 'Yangi o‘zbek seriallari barcha qismlari bilan — rasmiy kanallardan, bepul onlayn.',
    kw: ['o‘zbek seriallari', 'o‘zbek serial', 'uzbek serial', 'ozbek seriallar', 'yangi o‘zbek seriallari', 'узбекские сериалы'],
    pick: m => !m._trailer && isUz(m) && m.type === 'serial' },
  { key: 'multfilmlar',
    ru: { h1: 'Мультфильмы на узбекском языке', name: 'Мультфильмы', lead: 'Мультфильмы для детей на узбекском языке — с официальных каналов, со всеми сериями.' }, h1: 'O‘zbek tilidagi multfilmlar', name: 'Multfilmlar', wide: true,
    lead: 'Bolalar uchun o‘zbek tilidagi multfilmlar — rasmiy kanallardan, barcha qismlari bilan.',
    kw: ['multfilmlar', 'o‘zbek tilida multfilmlar', 'uzbek multfilm', 'bolalar uchun multfilm', 'multfilm o‘zbekcha', 'мультфильмы на узбекском'],
    pick: m => !m._trailer && m.type === 'multfilm' && isUz(m) },
  { key: 'konsertlar',
    ru: { h1: 'Концерты — Аваз Охун, команда «Миллион»', name: 'Концерты', lead: 'Популярные юмористические концерты — с официальных каналов, полные записи.' }, h1: 'Konsertlar — Avaz Oxun, Million jamoasi', name: 'Konsertlar',
    lead: 'Mashhur hajviy konsertlar — rasmiy kanallardan, to‘liq yozuvlar.',
    kw: ['konsert', 'Avaz Oxun konsert', 'Million jamoasi konsert', 'o‘zbek konsertlari', 'hajviy konsert', 'концерт'],
    pick: m => !m._trailer && m.franchise === 'konsert' },
  { key: `premyeralar-${YEAR}`,
    ru: { h1: `Премьеры ${YEAR} — официальные трейлеры`, name: `Премьеры ${YEAR}`, lead: `Официальные трейлеры фильмов и сериалов ${YEAR} года: Marvel, DC, Disney, Pixar, Warner Bros., Universal и другие.` }, h1: `${YEAR} premyeralari — rasmiy treylerlar`, name: `${YEAR} premyeralari`, wide: true,
    lead: `${YEAR}-yilda chiqadigan va chiqqan filmlar hamda seriallarning rasmiy treylerlari: Marvel, DC, Disney, Pixar, Warner Bros., Universal va boshqalar.`,
    kw: [`${YEAR} premyeralar`, `yangi kinolar ${YEAR}`, `${YEAR} filmlar treyler`, 'yangi filmlar treylerlari', 'rasmiy treyler', `премьеры ${YEAR}`, `трейлеры ${YEAR}`],
    pick: m => m._trailer && (m.year || 0) >= YEAR }
];

function collectionPage(c, items, all) {
  const url = at(`toplam/${c.key}.html`);
  if (L === 'ru') c = { ...c, ...c.ru };
  const sorted = [...items].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const names = sorted.slice(0, 5).map(m => nm(m)).join(', ');
  const title = `${c.h1} | DezoMax`;
  const desc = `${c.lead} ${T(`${items.length} ta: ${names} va boshqalar.`, `Всего ${items.length}: ${names} и другие.`)}`.replace(/\s+/g, ' ').slice(0, 300);
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: c.name, url,
    itemListElement: sorted.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: at(`kino/${m._page}.html`), name: nm(m) }))
  };
  const trail = crumbs([[T('Bosh sahifa', 'Главная'), at('')], [T('To‘plamlar', 'Подборки'), at('kino/index.html')], [c.name, url]]);
  const others = all.filter(x => x.key !== c.key).map(x => (L === 'ru' ? { ...x, ...x.ru } : x));
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">${T('Bosh sahifa', 'Главная')}</a> › <a href="kino/index.html">${T('Filmlar', 'Фильмы')}</a> › ${esc(c.name)}</nav>
  <h1>${esc(c.h1)}</h1>
  <p>${esc(c.lead)} ${T(`Hammasi bo‘lib ${items.length} ta.`, `Всего — ${items.length}.`)}</p>
  <p class="seo-about">${T('Bu to‘plamdagi barcha videolar mualliflik huquqi egalarining rasmiy YouTube yoki RuTube kanallaridan olingan. DezoMax ularni bitta joyga yig‘adi: qidirish, saralash va ko‘rish bepul, ro‘yxatdan o‘tish shart emas. Kartani bosing — film sahifasida qisqacha mazmuni, aktyorlari va o‘xshash filmlar bor.', 'Все видео этой подборки взяты с официальных YouTube- и RuTube-каналов правообладателей. DezoMax собирает их в одном месте: искать, выбирать и смотреть можно бесплатно и без регистрации. Нажмите на карточку — на странице фильма есть описание, актёры и похожие фильмы.')}</p>
  <ul class="seo-grid${c.wide ? ' seo-grid-wide' : ''}">${sorted.map((m, i) => `
    <li><a href="kino/${m._page}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(nm(m))}${c.wide ? ' — treyler' : ''}"${i >= 12 ? ' loading="lazy"' : ''} decoding="async" width="${c.wide ? 320 : 160}" height="${c.wide ? 180 : 240}">` : ''}<span>${esc(nm(m))}</span>${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
  ${others.length ? `<h2>${T('Boshqa to‘plamlar', 'Другие подборки')}</h2>
  <ul class="seo-list">${others.map(x => `<li><a href="toplam/${x.key}.html">${esc(x.name)}</a></li>`).join('')}</ul>` : ''}
</div>`;
  return page({ id: 0, title, desc, url, image: sorted[0] ? abs(sorted[0].poster) : '', type: 'website', ld: [ld, trail], body, keywords: c.kw });
}
const collections = COLLECTIONS.map(c => ({ ...c, items: list.filter(c.pick) })).filter(c => c.items.length >= 3);

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

// toplam/<key>.html — mavzu to'plamlari
const COLL_DIR = path.join(root, 'toplam');
fs.mkdirSync(COLL_DIR, { recursive: true });
for (const c of collections) fs.writeFileSync(path.join(COLL_DIR, c.key + '.html'), collectionPage(c, c.items, collections));
for (const f of fs.readdirSync(COLL_DIR)) if (f.endsWith('.html') && !collections.some(c => c.key + '.html' === f)) fs.unlinkSync(path.join(COLL_DIR, f));
// ruscha nusxa: ru/kino/, ru/toplam/ (AdSense o'zbek tilini qo'llamaydi — rus tilini qo'llaydi)
L = 'ru';
const RU_KINO = path.join(root, 'ru', 'kino'), RU_COLL = path.join(root, 'ru', 'toplam');
fs.mkdirSync(RU_KINO, { recursive: true }); fs.mkdirSync(RU_COLL, { recursive: true });
for (const m of list) fs.writeFileSync(path.join(RU_KINO, m._page + '.html'), m._trailer ? trailerPage(m) : moviePage(m));
fs.writeFileSync(path.join(RU_KINO, 'index.html'), indexPage());
for (const f of fs.readdirSync(RU_KINO)) if (f.endsWith('.html') && !keep.has(f)) fs.unlinkSync(path.join(RU_KINO, f));
for (const c of collections) fs.writeFileSync(path.join(RU_COLL, c.key + '.html'), collectionPage(c, c.items, collections));
for (const f of fs.readdirSync(RU_COLL)) if (f.endsWith('.html') && !collections.some(c => c.key + '.html' === f)) fs.unlinkSync(path.join(RU_COLL, f));
L = 'uz';

/* ---------- Teg sahifalari: teg/<key>.html ----------
   Saytdagi haqiqiy ma'lumotdan: janr, yil, o'n yillik, davlat, til, rejissyor, aktyor, studiya/kanal va ularning birikmalari.
   Faqat kamida 3 ta kinosi bor teglar (bo'sh/yupqa sahifa yo'q). Har sahifada — shu tegdagi kinolar ro'yxati (kino/<sahifa>.html). */
const TAG_DIR = path.join(root, 'teg');
const TAG_LAT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h' };
const tslug = s => String(s || '').toLowerCase().replace(/[а-яёўқғҳ]/g, c => TAG_LAT[c] ?? c).replace(/[‘’'`ʻʼ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
const TYPE_UZ = { film: 'filmlar', serial: 'seriallar', multfilm: 'multfilmlar' };
const capf = s => s.charAt(0).toUpperCase() + s.slice(1);
const tagMap = new Map();
const addTag = (group, rawKey, name, m) => {
  const key = tslug(rawKey);
  if (!key || !name) return;
  let t = tagMap.get(key);
  if (!t) tagMap.set(key, t = { key, group, name: capf(noEmoji(name).trim()), items: [] });
  if (!t.items.includes(m)) t.items.push(m);
};
for (const m of list) {
  if (m._trailer) continue;
  const ty = TYPE_UZ[m.type] || 'filmlar';
  const dec = m.year ? Math.floor(m.year / 10) * 10 : 0;
  const country = String(m.country?.uz || '').trim();
  const hasCountry = country && country !== '—' && country.length < 30;
  const lang = m.audio === 'uz' || m.lang === 'uz' ? 'o‘zbek tilida' : m.lang === 'ru' ? 'rus tilida' : '';
  addTag('Tur', `tur-${m.type}`, `Barcha ${ty}`, m);
  for (const g of (m.genres || []).slice(0, 3)) {
    const gn = genre(g);
    addTag('Janr', `janr-${g}`, `${gn} kinolar`, m);
    addTag('Janr', `${g}-${m.type}`, `${gn} ${ty}`, m);
    if (dec) addTag('Janr va yillar', `${g}-${dec}`, `${dec}-yillar: ${gn.toLowerCase()} kinolar`, m);
    if (m.year >= 2000) addTag('Janr va yillar', `${g}-${m.year}`, `${m.year}-yil: ${gn.toLowerCase()} kinolar`, m);
    if (hasCountry) addTag('Janr va davlat', `${g}-${country}`, `${country}: ${gn.toLowerCase()} kinolar`, m);
    if (lang) addTag('Janr va til', `${g}-${lang}-${m.type}`, `${gn} ${ty} ${lang}`, m);
  }
  if (m.year) {
    addTag('Yil', `yil-${m.year}`, `${m.year}-yil kinolari`, m);
    addTag('Yil', `${m.year}-${m.type}`, `${m.year}-yil ${ty}`, m);
    addTag('Yil', `${dec}-yillar`, `${dec}-yillar kinolari`, m);
    addTag('Yil', `${dec}-yillar-${m.type}`, `${dec}-yillar ${ty}`, m);
  }
  if (hasCountry) {
    addTag('Davlat', `davlat-${country}`, `${country} kinolari`, m);
    addTag('Davlat', `${country}-${m.type}`, `${country} ${ty}`, m);
    if (dec) addTag('Davlat', `${country}-${dec}`, `${country}: ${dec}-yillar kinolari`, m);
  }
  if (lang) {
    addTag('Til', `til-${lang}`, `${capf(lang)} kinolar`, m);
    addTag('Til', `${lang}-${m.type}`, `${capf(lang)} ${ty}`, m);
    if (dec) addTag('Til', `${lang}-${dec}`, `${capf(lang)}: ${dec}-yillar kinolari`, m);
  }
  for (const d of String(m.director || '').split(/\s*,\s*/).filter(x => x && x.length < 40).slice(0, 2)) addTag('Rejissyor', `rejissyor-${d}`, `${d} filmlari`, m);
  for (const a of (m.cast || []).filter(x => x && x.length < 40).slice(0, 10)) addTag('Aktyor', `aktyor-${a}`, `${a} ishtirokidagi kinolar`, m);
  // janr juftliklari: «Komediya va melodrama»
  const gsort = [...new Set(m.genres || [])].sort();
  for (let i = 0; i < gsort.length; i++) for (let j = i + 1; j < gsort.length; j++) {
    addTag('Janrlar birikmasi', `${gsort[i]}-va-${gsort[j]}`, `${genre(gsort[i])} va ${genre(gsort[j]).toLowerCase()} kinolar`, m);
    if (dec) addTag('Janrlar birikmasi', `${gsort[i]}-va-${gsort[j]}-${dec}`, `${dec}-yillar: ${genre(gsort[i]).toLowerCase()} va ${genre(gsort[j]).toLowerCase()}`, m);
  }
  // davomiylik bo'yicha (faqat filmlar)
  if (m.type === 'film' && m.duration) {
    const band = m.duration < 80 ? ['qisqa', '80 daqiqagacha qisqa filmlar'] : m.duration <= 120 ? ['orta', '1,5–2 soatlik filmlar'] : ['uzun', '2 soatdan uzun filmlar'];
    addTag('Davomiyligi', `davomiylik-${band[0]}`, band[1], m);
    for (const g of (m.genres || []).slice(0, 2)) addTag('Davomiyligi', `${g}-${band[0]}`, `${band[1]}: ${genre(g).toLowerCase()}`, m);
  }
  if (m.source?.name) addTag('Studiya va kanal', `studiya-${m.source.name}`, `${m.source.name}: kinolar`, m);
}
const TAGS = [...tagMap.values()].filter(t => t.items.length >= (t.group === 'Aktyor' || t.group === 'Rejissyor' ? 2 : 3)).sort((a, b) => b.items.length - a.items.length);
const TAG_GROUPS = ['Tur', 'Janr', 'Janrlar birikmasi', 'Yil', 'Davlat', 'Til', 'Davomiyligi', 'Janr va yillar', 'Janr va davlat', 'Janr va til', 'Studiya va kanal', 'Rejissyor', 'Aktyor'];

function tagPage(t) {
  const url = `${SITE}teg/${t.key}.html`;
  const sorted = [...t.items].sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.title.uz).localeCompare(String(b.title.uz)));
  const shown = sorted.slice(0, 120);
  const names = sorted.slice(0, 5).map(m => nm(m)).join(', ');
  const lead = `${t.name}: DezoMax’da onlayn ko‘rish mumkin bo‘lgan ${t.items.length} ta kino — rasmiy manbalardan.`;
  const desc = `${lead} ${names} va boshqalar.`.replace(/\s+/g, ' ').slice(0, 300);
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: t.name, url,
    itemListElement: shown.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}kino/${m._page}.html`, name: nm(m) })) };
  const trail = crumbs([['Bosh sahifa', SITE], ['Teglar', `${SITE}teg/index.html`], [t.name, url]]);
  const related = TAGS.filter(x => x.group === t.group && x.key !== t.key).slice(0, 24);
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › <a href="teg/index.html">Teglar</a> › ${esc(t.name)}</nav>
  <h1>${esc(t.name)}</h1>
  <p>${esc(lead)}</p>
  <ul class="seo-grid">${shown.map((m, i) => `
    <li><a href="kino/${m._page}.html">${m.poster ? `<img src="${esc(m.poster)}" alt="${esc(nm(m))}"${i >= 12 ? ' loading="lazy"' : ''} decoding="async" width="160" height="240">` : ''}<span>${esc(nm(m))}</span>${m.year ? `<small>${m.year}</small>` : ''}</a></li>`).join('')}
  </ul>
  ${related.length ? `<h2>O‘xshash teglar</h2>
  <ul class="seo-list seo-chips">${related.map(x => `<li><a href="teg/${x.key}.html">${esc(x.name)} (${x.items.length})</a></li>`).join('')}</ul>` : ''}
  <p><a href="teg/index.html">Barcha teglar →</a></p>
</div>`;
  return page({ id: 0, title: `${t.name} — onlayn ko‘rish | DezoMax`, desc, url, image: sorted[0] ? abs(sorted[0].poster) : '', type: 'website', ld: [ld, trail], body,
    keywords: [t.name, `${t.name} onlayn`, `${t.name} bepul ko‘rish`, `${t.name} o‘zbek tilida`] });
}
function tagIndexPage() {
  const url = `${SITE}teg/index.html`;
  const body = `
<div class="wrap seo-pre seo-index">
  <nav class="seo-crumbs"><a href="index.html">Bosh sahifa</a> › Teglar</nav>
  <h1>Teglar — janr, yil, davlat, aktyor va rejissyor bo‘yicha kinolar</h1>
  <p>DezoMax’dagi kinolar ${TAGS.length} ta teg bo‘yicha.</p>
  ${TAG_GROUPS.map(g => { const gs = TAGS.filter(t => t.group === g); return gs.length ? `<h2>${esc(g)}</h2>
  <ul class="seo-list seo-chips">${gs.map(t => `<li><a href="teg/${t.key}.html">${esc(t.name)} (${t.items.length})</a></li>`).join('')}</ul>` : ''; }).join('')}
</div>`;
  return page({ id: 0, title: 'Teglar — kinolar janr, yil, davlat va aktyor bo‘yicha | DezoMax', desc: `DezoMax kinolari ${TAGS.length} ta teg bo‘yicha: janrlar, yillar, davlatlar, aktyorlar, rejissyorlar.`,
    url, image: '', type: 'website', ld: [crumbs([['Bosh sahifa', SITE], ['Teglar', url]])], body, keywords: ['kino teglar', 'kinolar janr bo‘yicha', 'kinolar yil bo‘yicha'] });
}
fs.mkdirSync(TAG_DIR, { recursive: true });
const tagKeep = new Set(['index.html']);
for (const t of TAGS) { fs.writeFileSync(path.join(TAG_DIR, t.key + '.html'), tagPage(t)); tagKeep.add(t.key + '.html'); }
fs.writeFileSync(path.join(TAG_DIR, 'index.html'), tagIndexPage());
for (const f of fs.readdirSync(TAG_DIR)) if (f.endsWith('.html') && !tagKeep.has(f)) fs.unlinkSync(path.join(TAG_DIR, f));
console.log(`teg/ — ${TAGS.length} ta teg sahifasi`);

console.log(`kino/ — ${list.length - trailers.length} ta film, ${trailers.length} ta treyler sahifasi; studio/ — ${Object.keys(studioPages).length} ta; toplam/ — ${collections.map(c => `${c.key} (${c.items.length})`).join(', ')}`);
module.exports = { pages: map, studios: Object.keys(studioPages), collections: collections.map(c => c.key), tags: TAGS.map(t => t.key) };
