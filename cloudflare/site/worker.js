/* ============================================================
   DezoMax — dezomax.uz sayti Cloudflare'ning o'zida (Workers static assets, bepul tarif).
   Sayt fayllari har push'da GitHub Actions orqali yuklanadi (.github/workflows/cf-site.yml).
   Bu Worker faqat yo'naltiradi:
     - www.dezomax.uz / http → https://dezomax.uz
     - papka manzili (/, /kino/) → index.html  (html_handling: "none" — «.html» manzillardan olib tashlanmaydi,
       canonical va qidiruvdagi manzillar o'zgarmasin)
     - /_n/news-uz.json → sport yangiliklari (Sports.uz RSS, tools/fetch-news-uz.js)
   Qolgan hamma narsa — env.ASSETS (Cloudflare'dagi sayt fayllari).
   ============================================================ */

const HOST = 'dezomax.uz';
const DATA_FILES = {
  '/_n/news-uz.json': 'https://raw.githubusercontent.com/AbdulazizJuraev/dezomax/news-data/news-uz.json'
};
const SEO_SHARDS = 128;

const escapeAttr = value => String(value || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function movieRequestId(url) {
  if (url.pathname === '/movie.html') {
    const id = url.searchParams.get('id') || '';
    return /^\d{1,12}$/.test(id) ? String(Number(id)) : '';
  }
  const match = url.pathname.match(/^\/film\/[a-z0-9-]+-(\d{1,12})\.html$/i);
  return match ? String(Number(match[1])) : '';
}

async function getMovieMetadata(requestUrl, assets, id) {
  const shard = String(Number(id) % SEO_SHARDS).padStart(3, '0');
  const url = new URL(`/_seo/${shard}.json`, requestUrl);
  const response = await assets.fetch(new Request(url));
  if (!response.ok) return null;
  const index = await response.json();
  return index[id] || null;
}

async function movieNotFound(request, env, url) {
  const pageUrl = new URL('/404.html', url);
  const page = await env.ASSETS.fetch(new Request(pageUrl, { headers: request.headers }));
  if (!page.ok) return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  const headers = new Headers(page.headers);
  for (const key of ['content-length', 'content-encoding', 'etag', 'last-modified', 'content-md5']) headers.delete(key);
  headers.set('content-type', 'text/html; charset=utf-8');
  return new Response(request.method === 'HEAD' ? null : await page.text(), { status: 404, headers });
}

async function serveMoviePage(request, env, url, id, metadata) {
  const shellUrl = new URL('/movie.html', url);
  shellUrl.search = '';
  shellUrl.hash = '';
  const shell = await env.ASSETS.fetch(new Request(shellUrl, { headers: request.headers }));
  if (!shell.ok) return shell;
  let html = await shell.text();
  const title = escapeAttr(metadata.title);
  const description = escapeAttr(metadata.description);
  const canonical = escapeAttr(metadata.canonical);
  const image = escapeAttr(metadata.shareImage);
  if (url.pathname.startsWith('/film/')) {
    html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="/">');
  }
  html = html
    .replace(/<!-- Har bir kino[\s\S]*?<\/script>/, '')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, '')
    .replace(/<meta\s+property="og:(?:title|description|url|image|type)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');
  const movieSchema = {
    '@type': metadata.type, '@id': `${metadata.canonical}#title`, name: metadata.name, url: metadata.canonical,
    description: metadata.description
  };
  if (metadata.alternateName) movieSchema.alternateName = metadata.alternateName;
  if (metadata.poster) movieSchema.image = metadata.poster;
  if (metadata.year) movieSchema.datePublished = String(metadata.year);
  if (metadata.genres.length) movieSchema.genre = metadata.genres;
  if (/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/.test(metadata.language)) movieSchema.inLanguage = metadata.language;
  if (metadata.duration) movieSchema.duration = `PT${metadata.duration}M`;
  if (metadata.director.length) movieSchema.director = metadata.director.map(name => ({ '@type': 'Person', name }));
  if (metadata.cast.length) movieSchema.actor = metadata.cast.map(name => ({ '@type': 'Person', name }));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://dezomax.uz/#organization', name: 'DezoMax', url: 'https://dezomax.uz/', logo: 'https://dezomax.uz/images/logo/dezomax-name.webp' },
      { '@type': 'WebSite', '@id': 'https://dezomax.uz/#website', name: 'DezoMax', url: 'https://dezomax.uz/', publisher: { '@id': 'https://dezomax.uz/#organization' }, inLanguage: 'uz' },
      movieSchema,
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://dezomax.uz/' },
        { '@type': 'ListItem', position: 2, name: 'Kinolar', item: 'https://dezomax.uz/kino/index.html' },
        { '@type': 'ListItem', position: 3, name: metadata.name, item: metadata.canonical }
      ] }
    ]
  };
  const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c');
  const tags = `
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${metadata.type === 'TVSeries' ? 'video.tv_show' : metadata.type === 'VideoObject' ? 'video.other' : 'video.movie'}">
<meta property="og:site_name" content="DezoMax">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="${metadata.poster ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<script>window.DZX_ID=${Number(id)}</script>
<script type="application/ld+json">${jsonLd}</script>`;
  html = html.replace('</head>', `${tags}\n</head>`);
  const headers = new Headers(shell.headers);
  for (const key of ['content-length', 'content-encoding', 'etag', 'last-modified', 'content-md5']) headers.delete(key);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, max-age=300');
  return new Response(request.method === 'HEAD' ? null : html, { status: shell.status, headers });
}

/* ===== Ob-havo va valyuta kursi (2026-11-24) — ob-havo.html, valyuta.html, bosh sahifadagi «Kunlik» blok =====
   /_w/wx?lat=&lon=      — MET Norway (api.met.no, CC BY 4.0, tijoriy foydalanish mumkin) prognozi, ixcham: hozir, 24 soat, 10 kun (30 daq kesh)
   /_w/wx-all?ll=lat,lon;lat,lon… — bir nechta shahar uchun hozirgi harorat va bugungi max (viloyatlar ro'yxati)
   /_w/fx                — O'zbekiston Markaziy banki (cbu.uz) bugungi kurslari (1 soat kesh)
   /_w/fx-hist?c=USD&r=7|30|365 — kurs tarixi (grafik), cbu.uz arxividan */
const WX_UA = 'DezoMax/1.0 https://dezomax.uz';
const jsonRes = (obj, maxAge, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': status === 200 ? `public, max-age=${maxAge}` : 'no-store' } });
const uzDate = iso => new Date(Date.parse(iso) + 5 * 3600e3).toISOString();   // O'zbekiston — UTC+5
async function wxRaw(lat, lon) {
  const r = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, { headers: { 'user-agent': WX_UA }, cf: { cacheEverything: true, cacheTtl: 1800 } });
  if (!r.ok) throw new Error('met ' + r.status);
  return (await r.json()).properties.timeseries;
}
function wxCompact(ts) {
  const sym = x => ((x.data.next_1_hours || x.data.next_6_hours || x.data.next_12_hours || {}).summary || {}).symbol_code || '';
  const d0 = ts[0].data, det = d0.instant.details;
  const now = { at: ts[0].time, t: det.air_temperature, h: det.relative_humidity, w: det.wind_speed, wd: det.wind_from_direction, p: det.air_pressure_at_sea_level, s: sym(ts[0]),
    r6: (d0.next_6_hours && d0.next_6_hours.details && d0.next_6_hours.details.precipitation_amount) || 0 };
  const hours = ts.slice(0, 25).map(x => [uzDate(x.time).slice(11, 16), Math.round(x.data.instant.details.air_temperature), sym(x)]);
  const days = {};
  for (const x of ts) {
    const l = uzDate(x.time), d = l.slice(0, 10), h = +l.slice(11, 13), t = x.data.instant.details.air_temperature;
    const o = days[d] || (days[d] = { mn: 99, mx: -99, s: '', sh: 99, r: 0 });
    o.mn = Math.min(o.mn, t); o.mx = Math.max(o.mx, t);
    const s6 = x.data.next_6_hours;
    if (s6 && Math.abs(h - 12) < o.sh) { o.sh = Math.abs(h - 12); o.s = s6.summary.symbol_code; }
    if (s6 && s6.details && h % 6 === 0) o.r += s6.details.precipitation_amount || 0;
  }
  const dl = Object.entries(days).slice(0, 10).map(([d, o]) => [d, Math.round(o.mn), Math.round(o.mx), o.s || now.s, Math.round(o.r * 10) / 10]);
  return { now, hours, days: dl };
}
const llOk = (a, b) => { const lat = +a, lon = +b; return isFinite(lat) && isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? [lat.toFixed(2), lon.toFixed(2)] : null; };
async function wxApi(url) {
  try {
    if (url.pathname === '/_w/wx') {
      const ll = llOk(url.searchParams.get('lat'), url.searchParams.get('lon'));
      if (!ll) return jsonRes({ error: 'lat/lon' }, 0, 400);
      return jsonRes({ at: Date.now(), ...wxCompact(await wxRaw(...ll)) }, 900);
    }
    if (url.pathname === '/_w/wx-all') {
      const list = (url.searchParams.get('ll') || '').split(';').slice(0, 16).map(p => llOk(...p.split(','))).filter(Boolean);
      const out = await Promise.all(list.map(async ll => {
        try { const c = wxCompact(await wxRaw(...ll)); return { t: Math.round(c.now.t), s: c.now.s, mx: c.days[0] ? c.days[0][2] : null, mn: c.days[0] ? c.days[0][1] : null }; } catch (e) { return null; }
      }));
      return jsonRes({ at: Date.now(), list: out }, 900);
    }
    if (url.pathname === '/_w/fx') {
      const r = await fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/', { cf: { cacheEverything: true, cacheTtl: 3600 } });
      if (!r.ok) return jsonRes({ error: 'cbu' }, 0, 502);
      const j = await r.json();
      return jsonRes({ at: Date.now(), date: j[0] && j[0].Date, list: j.map(x => ({ c: x.Ccy, n: x.CcyNm_UZ, nr: x.CcyNm_RU, nom: +x.Nominal, r: +x.Rate, d: +x.Diff })) }, 1800);
    }
    if (url.pathname === '/_w/fx-hist') {
      const c = (url.searchParams.get('c') || 'USD').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
      const range = { 7: [7, 1], 30: [15, 2], 365: [26, 14] }[url.searchParams.get('r') || '30'] || [15, 2];
      const today = new Date(Date.now() + 5 * 3600e3);
      const dates = Array.from({ length: range[0] }, (_, i) => new Date(today - (range[0] - 1 - i) * range[1] * 86400e3).toISOString().slice(0, 10));
      const pts = await Promise.all(dates.map(async (d, i) => {
        try {
          const r = await fetch(`https://cbu.uz/uz/arkhiv-kursov-valyut/json/${c}/${d}/`, { cf: { cacheEverything: true, cacheTtl: i === dates.length - 1 ? 3600 : 86400 * 7 } });
          const j = r.ok ? await r.json() : null;
          return j && j[0] ? [d, +j[0].Rate / (+j[0].Nominal || 1)] : null;
        } catch (e) { return null; }
      }));
      return jsonRes({ at: Date.now(), c, pts: pts.filter(Boolean) }, 3600);
    }
  } catch (e) { return jsonRes({ error: String(e.message || e) }, 0, 502); }
  return null;
}

/* ===== YouTube videolari sahifalari (2026-11-23, tools/gen-video-seo.js) =====
   /video/<nom>-<ID> → qiziqarli.html, /shorts/<ID> → shorts.html — sarlavha, tavsif, rasm, VideoObject; sahifa JS'i shu videoni ochadi */
const VID_SHARDS = 64;
const vidShard = id => { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return String(h % VID_SHARDS).padStart(2, '0'); };
function videoRoute(url) {
  const m = url.pathname.match(/^\/(video|shorts)\/([^/]+?)\/?$/);
  if (!m) return null;
  const seg = decodeURIComponent(m[2]), id = seg.slice(-11);
  if (!/^[\w-]{11}$/.test(id) || (seg.length > 11 && seg[seg.length - 12] !== '-')) return null;
  return { kind: m[1], id, slug: seg.length > 11 ? seg.slice(0, -12) : '' };
}
/* Arxivda hali yo'q (YouTube'ga endigina yuklangan) video — YouTube oEmbed'dan nomi va kanali olinadi; kanal ruxsat
   berilganlar ro'yxatida bo'lsagina sahifa ochiladi (Qiziqarli: js/fun-data.js, Shorts: js/data-shorts.js + js/shorts.js).
   Shu bilan saytga qo'shiladigan har yangi video avtomatik o'z manziliga ega bo'ladi (2026-11-23). */
const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h' };
const videoSlug = t => String(t || '').toLowerCase().replace(/[а-яёўқғҳ]/g, c => CYR[c] ?? '')
  .replace(/[‘’'`ʻʼ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/, '');
let allowCache = null, allowAt = 0;
async function allowedChannels(env, url) {
  if (allowCache && Date.now() - allowAt < 600000) return allowCache;
  const text = async p => { try { const r = await env.ASSETS.fetch(new Request(new URL(p, url))); return r.ok ? await r.text() : ''; } catch (e) { return ''; } };
  const [fun, sh1, sh2] = await Promise.all([text('/js/fun-data.js'), text('/js/data-shorts.js'), text('/js/shorts.js')]);
  const video = {}, shorts = new Set();
  // fun-data.js: bo'lim kaliti, so'ng uning kanallari (id … url: '…/@handle')
  let key = '';
  for (const m of fun.matchAll(/key: '(\w+)'|id: '(UC[\w-]{22})'[^}]*?url: 'https:\/\/www\.youtube\.com\/@([\w.-]+)'/g)) {
    if (m[1]) key = m[1]; else video[m[3].toLowerCase()] = { k: key, c: m[2] };
  }
  for (const m of (sh1 + sh2).matchAll(/youtube\.com\/@([\w.-]+)/g)) shorts.add(m[1].toLowerCase());
  allowAt = Date.now();
  return (allowCache = { video, shorts });
}
async function liveVideoEntry(env, url, r) {
  try {
    const o = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent('https://www.youtube.com/watch?v=' + r.id)}&format=json`, { cf: { cacheEverything: true, cacheTtl: 86400 } });
    if (!o.ok) return null;
    const j = await o.json();
    const handle = (String(j.author_url || '').match(/youtube\.com\/@([\w.-]+)/) || [])[1];
    if (!handle || !j.title) return null;
    const allow = await allowedChannels(env, url), h = handle.toLowerCase();
    if (r.kind === 'video' && allow.video[h]) return { t: j.title, n: j.author_name || '', k: allow.video[h].k, c: allow.video[h].c, d: '', v: 0, y: 'lf', s: videoSlug(j.title) };
    if (r.kind === 'shorts' && allow.shorts.has(h)) return { t: j.title, n: j.author_name || '', k: '', c: '', d: '', v: 0, y: 'S', s: videoSlug(j.title) };
  } catch (e) {}
  return null;
}

async function serveVideoPage(request, env, url, r) {
  const res = await env.ASSETS.fetch(new Request(new URL(`/_vid/${vidShard(r.id)}.json`, url)));
  const e = (res.ok ? (await res.json())[r.id] : null) || await liveVideoEntry(env, url, r);
  if (!e) return movieNotFound(request, env, url);
  const isShort = e.y === 'S';
  const canonical = isShort ? `https://dezomax.uz/shorts/${r.id}` : `https://dezomax.uz/video/${e.s ? e.s + '-' : ''}${r.id}`;
  if (new URL(canonical).pathname !== url.pathname) return Response.redirect(canonical + url.search, 301);
  const shell = await env.ASSETS.fetch(new Request(new URL(isShort ? '/shorts.html' : '/qiziqarli.html', url), { headers: request.headers }));
  if (!shell.ok) return shell;
  let html = await shell.text();
  const kindUz = isShort || e.y === 'sh' ? 'shortsi' : e.y === 'lv' ? 'jonli efiri' : 'videosi';
  const desc = `${e.t} — ${e.n ? e.n + ' kanali' : 'YouTube'} ${kindUz}. DezoMax'da bepul tomosha qiling.`;
  const title = `${e.t} — ${e.n || 'Shorts'} | DezoMax`;
  const thumb = `https://i.ytimg.com/vi/${r.id}/hqdefault.jpg`;
  const video = { '@type': 'VideoObject', '@id': canonical + '#video', name: e.t, description: desc, url: canonical,
    thumbnailUrl: [thumb, `https://i.ytimg.com/vi/${r.id}/mqdefault.jpg`], embedUrl: `https://www.youtube.com/embed/${r.id}`,
    publisher: { '@id': 'https://dezomax.uz/#organization' }, inLanguage: 'uz', isFamilyFriendly: true };
  if (/^\d{4}-\d\d-\d\d$/.test(e.d)) video.uploadDate = e.d + 'T12:00:00+05:00';
  if (e.v) video.interactionStatistic = { '@type': 'InteractionCounter', interactionType: { '@type': 'WatchAction' }, userInteractionCount: e.v };
  if (e.n) video.author = { '@type': 'Person', name: e.n };
  const crumbs = [{ name: 'Bosh sahifa', item: 'https://dezomax.uz/' },
    isShort ? { name: 'Shorts', item: 'https://dezomax.uz/shorts.html' } : { name: 'Qiziqarli', item: 'https://dezomax.uz/qiziqarli.html' },
    { name: e.t, item: canonical }];
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': 'https://dezomax.uz/#organization', name: 'DezoMax', url: 'https://dezomax.uz/', logo: 'https://dezomax.uz/images/logo/dezomax-name.webp' },
    video,
    { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })) }
  ] };
  // sahifa JS'i «#» li manzil bilan ishlaydi — shu videoga mos «#» qo'yiladi (manzil yo'li o'zgarmaydi)
  const hash = isShort ? r.id : `${e.k}&c=${e.c}&v=${r.id}`;
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, '')
    .replace(/<meta\s+property="og:(?:title|description|url|image|type)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="alternate"\s+hreflang[^>]*>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<meta charset="UTF-8">/i, `<meta charset="UTF-8">\n<base href="/">\n<script>if(!location.hash)history.replaceState(null,'',location.pathname+location.search+'#'+${JSON.stringify(hash)});window.DZX_VIDEO=${JSON.stringify({ id: r.id, k: e.k, c: e.c })}</script>`);
  const tags = `
<meta name="description" content="${escapeAttr(desc)}">
<link rel="canonical" href="${escapeAttr(canonical)}">
<meta property="og:type" content="video.other">
<meta property="og:site_name" content="DezoMax">
<meta property="og:title" content="${escapeAttr(e.t)}">
<meta property="og:description" content="${escapeAttr(desc)}">
<meta property="og:url" content="${escapeAttr(canonical)}">
<meta property="og:image" content="${thumb}">
<meta property="og:video" content="https://www.youtube.com/embed/${r.id}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(e.t)}">
<meta name="twitter:description" content="${escapeAttr(desc)}">
<meta name="twitter:image" content="${thumb}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  html = html.replace('</head>', `${tags}\n</head>`);
  const headers = new Headers(shell.headers);
  for (const key of ['content-length', 'content-encoding', 'etag', 'last-modified', 'content-md5']) headers.delete(key);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, max-age=300');
  return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers });
}

const xmlText = s => String(s || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
async function ytFeed(url) {
  const head = { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' };
  const ids = [...new Set((url.searchParams.get('ch') || '').split(','))].filter(c => /^UC[\w-]{22}$/.test(c)).slice(0, 8);
  if (!ids.length) return new Response('{"error":"ch kerak"}', { status: 400, headers: head });
  // t: lf — uzun videolar (standart), sh — Shorts, lv — jonli efirlar, home — uzun + jonli (kanal «Bosh sahifa»si). 2026-11-23
  const t = url.searchParams.get('t') || 'lf';
  const PRE = { lf: ['UULF'], sh: ['UUSH'], lv: ['UULV'], home: ['UULF', 'UULV'] }[t];
  if (!PRE) return new Response('{"error":"t noto\'g\'ri"}', { status: 400, headers: head });
  const lists = await Promise.all(ids.flatMap(ch => PRE.map(pre => [ch, pre])).map(async ([ch, pre]) => {
    try {
      const r = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${pre}${ch.slice(2)}`, { cf: { cacheEverything: true, cacheTtl: 1800 } });
      if (!r.ok) return [];
      const xml = await r.text();
      return xml.split('<entry>').slice(1).map(e => ({
        id: (e.match(/<yt:videoId>([\w-]{11})</) || [])[1],
        t: xmlText((e.match(/<title>([^<]*)</) || [])[1]),
        ch,
        cn: xmlText((e.match(/<name>([^<]*)</) || [])[1]),
        d: (e.match(/<published>([^<]+)</) || [])[1] || '',
        v: +((e.match(/<media:statistics views="(\d+)"/) || [])[1] || 0)
      })).filter(x => x.id);
    } catch (e) { return []; }
  }));
  const seen = new Set();
  const items = lists.flat().filter(x => !seen.has(x.id) && seen.add(x.id)).sort((a, b) => (a.d < b.d ? 1 : -1));
  return new Response(JSON.stringify({ at: Date.now(), items }), {
    status: items.length ? 200 : 502,
    headers: { ...head, 'cache-control': items.length ? 'public, max-age=900' : 'no-store' }
  });
}

/* /_yt/live?ch=UC…,UC… → hozir jonli efirda bo'lgan kanallar (2026-11-23, Qiziqarli: «JONLI» belgisi va efir videosi).
   Kanalning youtube.com/channel/<id>/live sahifasi: jonli bo'lsa canonical — watch?v=<efir id> va "isLive":true.
   Har kanal 2 daqiqa Cloudflare keshida. Javob: { at, live: { UC…: { id, t } } } */
async function ytLive(url) {
  const head = { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' };
  const ids = [...new Set((url.searchParams.get('ch') || '').split(','))].filter(c => /^UC[\w-]{22}$/.test(c)).slice(0, 8);
  if (!ids.length) return new Response('{"error":"ch kerak"}', { status: 400, headers: head });
  const live = {};
  await Promise.all(ids.map(async ch => {
    try {
      const r = await fetch(`https://www.youtube.com/channel/${ch}/live`, {
        headers: { 'accept-language': 'en-US,en;q=0.8', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36' },
        cf: { cacheEverything: true, cacheTtl: 120 }
      });
      if (!r.ok) return;
      const html = await r.text();
      const id = (html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/) || [])[1];
      if (!id || !/"isLive":true/.test(html) || /"isUpcoming":true/.test(html)) return;
      live[ch] = { id, t: xmlText((html.match(/<meta name="title" content="([^"]*)"/) || [])[1] || '') };
    } catch (e) {}
  }));
  return new Response(JSON.stringify({ at: Date.now(), live }), { headers: { ...head, 'cache-control': 'public, max-age=120' } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'www.' + HOST || (url.hostname === HOST && url.protocol !== 'https:')) {
      url.hostname = HOST; url.protocol = 'https:'; url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // Legacy query URLs permanently redirect to the one canonical movie URL.
    // Clean /film/<slug>-<id>.html routes are served from the metadata shard and movie shell.
    const isMovieGet = request.method === 'GET' || request.method === 'HEAD';
    const isMoviePath = url.pathname === '/movie.html' || url.pathname.startsWith('/film/');
    const seoId = isMovieGet ? movieRequestId(url) : '';
    if (isMovieGet && url.pathname === '/movie.html' && !seoId) return movieNotFound(request, env, url);
    if (seoId) {
      try {
        const metadata = await getMovieMetadata(url, env.ASSETS, seoId);
        if (metadata) {
          // part/play/t kabi parametrlar saqlanadi (serial qismi, «ko'rish», davom ettirish); faqat id tushib qoladi
          const target = new URL(metadata.canonicalPath, url);
          for (const [k, v] of url.searchParams) if (k !== 'id') target.searchParams.append(k, v);
          if (url.pathname === '/movie.html') {
            return Response.redirect(target.toString(), 301);
          }
          if (url.pathname.startsWith('/film/') && url.pathname !== metadata.canonicalPath) {
            return Response.redirect(target.toString(), 301);
          }
          return serveMoviePage(request, env, url, seoId, metadata);
        }
      } catch (e) {
        if (isMoviePath) return movieNotFound(request, env, url);
      }
    }
    if (isMovieGet && isMoviePath) return movieNotFound(request, env, url);

    // /_yt/feed?ch=UC…,UC… → «Siz uchun Qiziqarli» (js/fun-data.js): kanallarning oxirgi uzun videolari (YouTube RSS,
    // UULF… pleylisti — shortslarsiz). Faqat kanal id'lari qabul qilinadi; har kanal 30 daqiqa Cloudflare keshida. 2026-11-21
    if (url.pathname === '/_yt/feed') return ytFeed(url);
    if (url.pathname === '/_yt/live') return ytLive(url);
    if (url.pathname.startsWith('/_w/')) { const wr = await wxApi(url); if (wr) return wr; }
    // /video/<nom>-<ID>, /shorts/<ID> — YouTube videolarining Google uchun sahifalari (tools/gen-video-seo.js)
    const vr = (request.method === 'GET' || request.method === 'HEAD') && videoRoute(url);
    if (vr) return serveVideoPage(request, env, url, vr);

    const data = DATA_FILES[url.pathname];
    if (data) {
      let r;
      try { r = await fetch(data, { cf: { cacheEverything: true, cacheTtl: 300 } }); } catch (e) { r = null; }
      return new Response(r && r.ok ? r.body : '{}', {
        status: r && r.ok ? 200 : 502,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300', 'access-control-allow-origin': '*' }
      });
    }

    // /_e/… → ESPN API (site.api.espn.com/apis/…) Cloudflare'ning yaqin serverida 45 soniya keshlanadi:
    // O'zbekistondagi foydalanuvchiga AQShdagi ESPN o'rniga yaqin server javob beradi (sport sahifasi tezroq ochiladi)
    if (url.pathname.startsWith('/_e/')) {
      const target = 'https://site.api.espn.com/apis/' + url.pathname.slice(4) + url.search;
      let r;
      try { r = await fetch(target, { cf: { cacheEverything: true, cacheTtl: 45 } }); } catch (e) { r = null; }
      return new Response(r && r.ok ? r.body : '{}', {
        status: r ? r.status : 502,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=30', 'access-control-allow-origin': '*' }
      });
    }

    // /_rt/… → RuTube'ning ochiq API'si (admin → «RuTube» qidiruvi; brauzer to'g'ridan-to'g'ri ololmaydi — CORS).
    // Faqat 3 ta manzil: qidiruv, video ma'lumoti, pleyer ruxsati (embed mumkinmi). Boshqa hech narsa o'tkazilmaydi.
    if (url.pathname.startsWith('/_rt/')) {
      const p = url.pathname.slice(5);
      let target = null, m;
      if (p === 'search') {
        const q = (url.searchParams.get('query') || '').slice(0, 120).trim();
        const page = Math.min(20, Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1));
        if (q) target = `https://rutube.ru/api/search/video/?query=${encodeURIComponent(q)}&page=${page}`;
      } else if ((m = p.match(/^video\/([0-9a-f]{32})$/))) {
        target = `https://rutube.ru/api/video/${m[1]}/`;
      } else if ((m = p.match(/^options\/([0-9a-f]{32})$/))) {
        target = `https://rutube.ru/api/play/options/${m[1]}/?no_404=true&referer=${encodeURIComponent('https://dezomax.uz/')}`;
      }
      const head = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300', 'access-control-allow-origin': '*' };
      if (!target) return new Response('{"error":"bad request"}', { status: 400, headers: head });
      let r;
      try {
        r = await fetch(target, { headers: { 'user-agent': 'Mozilla/5.0 (DezoMax admin)', referer: 'https://dezomax.uz/' }, cf: { cacheEverything: true, cacheTtl: 300 } });
      } catch (e) { r = null; }
      if (!r) return new Response('{"error":"rutube unreachable"}', { status: 502, headers: head });
      // RuTube yo'q/yopiq videoga 244/404 bilan «detail» qaytaradi — holatini o'zgartirmay uzatamiz
      return new Response(r.body, { status: r.status === 244 ? 200 : r.status, headers: head });
    }

    if (url.pathname.endsWith('/')) {
      url.pathname += 'index.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return env.ASSETS.fetch(request);
  }
};
