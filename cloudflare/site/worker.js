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

    if (url.pathname.endsWith('/')) {
      url.pathname += 'index.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return env.ASSETS.fetch(request);
  }
};
