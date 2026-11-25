/* ============================================================
   YouTube videolari uchun Google'ga tushunarli manzillar (2026-11-23)
   ------------------------------------------------------------
   Qiziqarli (data/fun-<kanal>.json) va Shorts (js/data-shorts.js) videolari ilgari faqat «#» li manzilda edi
   (qiziqarli.html#gameplay&c=…&v=ID, shorts.html#ID) — Google «#» dan keyingi qismni o'qimaydi, hammasi bitta sahifa edi.
   Endi har videoning o'z manzili bor:
     https://dezomax.uz/video/<nom>-<YouTubeID>   — Qiziqarli videolari (qiziqarli.html qobig'i)
     https://dezomax.uz/shorts/<YouTubeID>        — Shorts (shorts.html qobig'i)
   Worker (cloudflare/site/worker.js, serveVideoPage) sahifaga sarlavha, tavsif, rasm va VideoObject (schema.org) qo'yadi.

   Yaratadi:
     _vid/NN.json         — 64 bo'lak: { id: { t, n, k, c, d, v, y, s } } (Worker shu yerdan o'qiydi)
     sitemap-videos.xml   — Google video sitemap (robots.txt da ko'rsatilgan)
   tools/bump-version.js chaqiradi. Qo'lda: node tools/gen-video-seo.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz';
const SHARDS = 64;

// slug — js/fun.js dagi videoSlug bilan bir xil bo'lishi kerak
const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h' };
function videoSlug(t) {
  return String(t || '').toLowerCase().replace(/[а-яёўқғҳ]/g, c => CYR[c] ?? '')
    .replace(/[‘’'`ʻʼ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/, '');
}
const shardOf = id => { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return String(h % SHARDS).padStart(2, '0'); };

// bo'lim va kanallar
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/fun-data.js'), 'utf8').replace(/^const /m, 'var '), ctx);
const index = {};
for (const sec of ctx.FUN_SECTIONS || []) for (const c of sec.ch || []) {
  if (!c.all || !fs.existsSync(path.join(root, c.all))) continue;
  const j = JSON.parse(fs.readFileSync(path.join(root, c.all), 'utf8'));
  for (const y of ['lf', 'lv', 'sh']) for (const [id, t, v, d] of j[y] || []) {
    if (!/^[\w-]{11}$/.test(id) || index[id]) continue;
    index[id] = { t, n: c.name, k: sec.key, c: c.id, d: d || '', v: v || 0, y, s: videoSlug(t) };
  }
}
// Shorts sahifasi
{
  const src = fs.readFileSync(path.join(root, 'js/data-shorts.js'), 'utf8');
  const sctx = {};
  vm.createContext(sctx);
  try { vm.runInContext(src.replace(/^(const|let) /gm, 'var '), sctx); } catch (e) { console.warn('data-shorts.js:', e.message); }
  for (const x of sctx.SHORTS || []) {
    if (!x || !/^[\w-]{11}$/.test(x.id) || index[x.id]) continue;
    index[x.id] = { t: x.t, n: x.n || '', k: '', c: '', d: '', v: 0, y: 'S', s: videoSlug(x.t) };
  }
}

// bo'laklar
const dir = path.join(root, '_vid');
fs.mkdirSync(dir, { recursive: true });
const shards = {};
for (const [id, e] of Object.entries(index)) (shards[shardOf(id)] = shards[shardOf(id)] || {})[id] = e;
for (const f of fs.readdirSync(dir)) if (/^\d\d\.json$/.test(f)) fs.unlinkSync(path.join(dir, f));
for (const [k, v] of Object.entries(shards)) fs.writeFileSync(path.join(dir, k + '.json'), JSON.stringify(v));

// admin panel statistikasi → data/video-stats.json (js/admin.js → «Kinolar va videolar», 14 kunlik grafik) — 2026-11-25
{
  const st = { at: new Date().toISOString().slice(0, 10), total: 0, video: 0, live: 0, short: 0, days: {} };
  const from = new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10);
  for (const e of Object.values(index)) {
    st.total++;
    if (e.y === 'lv') st.live++; else if (e.y === 'sh' || e.y === 'S') st.short++; else st.video++;
    if (/^\d{4}-\d\d-\d\d$/.test(e.d) && e.d >= from) st.days[e.d] = (st.days[e.d] || 0) + 1;
  }
  fs.writeFileSync(path.join(root, 'data', 'video-stats.json'), JSON.stringify(st));
}

// video sitemap
const x = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const urlOf = (id, e) => e.y === 'S' ? `${SITE}/shorts/${id}` : `${SITE}/video/${e.s ? e.s + '-' : ''}${id}`;
const descOf = e => `${e.t} — ${e.n ? e.n + ' kanali' : 'YouTube'} ${e.y === 'S' || e.y === 'sh' ? 'shortsi' : e.y === 'lv' ? 'jonli efiri' : 'videosi'}. DezoMax'da bepul tomosha qiling.`;
const rows = Object.entries(index).map(([id, e]) => `<url><loc>${x(urlOf(id, e))}</loc><video:video>` +
  `<video:thumbnail_loc>https://i.ytimg.com/vi/${id}/hqdefault.jpg</video:thumbnail_loc><video:title>${x(e.t)}</video:title>` +
  `<video:description>${x(descOf(e))}</video:description><video:player_loc>https://www.youtube.com/embed/${id}</video:player_loc>` +
  (/^\d{4}-\d\d-\d\d$/.test(e.d) ? `<video:publication_date>${e.d}</video:publication_date>` : '') +
  `<video:family_friendly>yes</video:family_friendly></video:video></url>`);
fs.writeFileSync(path.join(root, 'sitemap-videos.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${rows.join('\n')}
</urlset>
`);
// robots.txt da ko'rsatish
const rb = path.join(root, 'robots.txt');
let robots = fs.readFileSync(rb, 'utf8');
if (!robots.includes('sitemap-videos.xml')) fs.writeFileSync(rb, robots.replace(/(Sitemap: https:\/\/dezomax\.uz\/sitemap\.xml)/, '$1\nSitemap: https://dezomax.uz/sitemap-videos.xml'));
console.log(`gen-video-seo: ${rows.length} video manzili (_vid/ ${Object.keys(shards).length} bo'lak, sitemap-videos.xml)`);
