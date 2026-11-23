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
