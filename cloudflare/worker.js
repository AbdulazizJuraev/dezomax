/* ============================================================
   DezoMax — Cloudflare Worker (dezomax.uz)
   Cloudflare → Workers & Pages → rapid-frost-79f2 → Edit code ga shu faylni to'liq qo'ying.
   Routes: dezomax.uz/*  va  www.dezomax.uz/*  (DNS: @ va www yozuvlari Proxied bo'lishi shart)

   Sayt GitHub Pages'da (abdulazizjuraev.github.io/dezomax) turadi, Worker uni dezomax.uz
   nomi ostida ko'rsatadi. GitHub Pages'da "Custom domain" YOQILMAYDI (repo'da CNAME fayli
   bo'lmasligi kerak) — aks holda github.io manzili dezomax.uz'ga yo'naltiriladi va Android
   ilova (server.url = github.io) buziladi.
   ============================================================ */

const HOST = 'dezomax.uz';
const ORIGIN = 'https://abdulazizjuraev.github.io';
const BASE = '/dezomax';
// Saytning o'z ma'lumot fayllari (dezomax.uz/_n/...) — tashqi xizmatlardan, brauzerda manzili ko'rinmasin
const DATA_FILES = {
  '/_n/news-uz.json': 'https://raw.githubusercontent.com/AbdulazizJuraev/dezomax/news-data/news-uz.json'
};
// hosting (GitHub Pages / Fastly) javob sarlavhalari — tashrifchiga ko'rsatilmaydi
const DROP_HEADERS = /^(x-github-|x-served-by|x-cache|x-timer|x-fastly-|x-proxy-cache|x-origin-cache|via$|server$)/i;
const PASS_HEADERS = ['accept', 'accept-encoding', 'accept-language', 'range', 'if-none-match', 'if-modified-since', 'user-agent'];

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // www.dezomax.uz va http:// → https://dezomax.uz (bitta asosiy manzil)
    if (url.hostname !== HOST || url.protocol !== 'https:') {
      url.hostname = HOST;
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // ma'lumot fayllari (sport yangiliklari): 5 daqiqa kesh, ilova (boshqa manzil) ham o'qiy oladi
    if (DATA_FILES[url.pathname]) {
      let d;
      try { d = await fetch(DATA_FILES[url.pathname], { cf: { cacheEverything: true, cacheTtl: 300 } }); } catch (e) { return new Response('{}', { status: 502 }); }
      return new Response(d.ok ? d.body : '{}', {
        status: d.ok ? 200 : 502,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300', 'access-control-allow-origin': '*' }
      });
    }

    const upstream = ORIGIN + BASE + url.pathname + url.search;
    const headers = new Headers();
    for (const h of PASS_HEADERS) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }

    let resp;
    try {
      resp = await fetch(upstream, {
        method: request.method === 'HEAD' ? 'HEAD' : 'GET',
        headers,
        redirect: 'manual',
        // GitHub bir lahza sekinlashsa ham sayt tez ochilsin: 2 daqiqalik kesh
        cf: { cacheEverything: true, cacheTtlByStatus: { '200-299': 120, '404': 60, '500-599': 0 } }
      });
    } catch (e) {
      return errorPage(502);
    }

    const out = new Headers();
    for (const [k, v] of resp.headers) if (!DROP_HEADERS.test(k)) out.set(k, v);
    const loc = out.get('location');
    if (loc) {
      const l = new URL(loc, upstream);
      if (l.hostname === HOST) {
        // GitHub Pages'da custom domain qayta yoqilgan — cheksiz aylanishning oldini olamiz
        return errorPage(508);
      }
      // GitHub'ning o'z yo'naltirishlari (masalan /images → /images/) dezomax.uz'da qolsin
      if (l.hostname === 'abdulazizjuraev.github.io' && l.pathname.startsWith(BASE)) {
        l.hostname = HOST;
        l.pathname = l.pathname.slice(BASE.length) || '/';
        out.set('location', l.toString());
      }
    }
    if (resp.status >= 500) return errorPage(502);

    return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: out });
  }
};

function errorPage(status) {
  const html = `<!DOCTYPE html><html lang="uz"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>DezoMax</title>
<style>html,body{margin:0;height:100%;background:#07080c;color:#e8ecf3;font-family:system-ui,sans-serif}
.b{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;box-sizing:border-box}
p{color:#9aa4b5;max-width:320px;line-height:1.5}a{color:#0a93dc;font-weight:700}</style></head>
<body><div class="b"><h1>DezoMax</h1><p>Sayt bir lahzaga ochilmadi. Birozdan keyin qayta urinib ko'ring.</p>
<p><a href="" onclick="location.reload();return false">Qayta urinish</a></p></div></body></html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
