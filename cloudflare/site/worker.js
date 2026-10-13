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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'www.' + HOST || (url.hostname === HOST && url.protocol !== 'https:')) {
      url.hostname = HOST; url.protocol = 'https:'; url.port = '';
      return Response.redirect(url.toString(), 301);
    }

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
