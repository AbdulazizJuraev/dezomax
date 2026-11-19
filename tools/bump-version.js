/* ============================================================
   Kesh versiyasini yangilash
   ------------------------------------------------------------
   GitHub Pages css/js fayllarni brauzerda 10 daqiqagacha keshlaydi.
   Yangi HTML eski JS bilan ishga tushib qolmasligi uchun barcha
   mahalliy css/js havolalariga ?v=<vaqt> qo'shiladi.

   Ishlatish (commit dan oldin):
     node tools/bump-version.js
   ============================================================ */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const version = new Date().toISOString().replace(/\D/g, '').slice(0, 12);   // YYYYMMDDhhmm

const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let changed = 0;

for (const f of files) {
  const p = path.join(root, f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before
    // <script src="js/...js">  va  <link href="css/...css">
    .replace(/((?:src|href)="(?:\/dezomax\/)?(?:js|css)\/[^"?]+\.(?:js|css))(?:\?v=[^"]*)?"/g, `$1?v=${version}"`);
  if (after !== before) { fs.writeFileSync(p, after); changed++; }
}

// admin.js — versiya kodning o'zidan (hash): ochiq admin «yangi versiya» deb o'zi yangilanadi,
// har sayt deployida emas, faqat admin.js haqiqatan o'zgarganda
{
  const hash = parseInt(require('crypto').createHash('sha1').update(fs.readFileSync(path.join(root, 'js', 'admin.js'))).digest('hex').slice(0, 10), 16);
  const p = path.join(root, 'admin.html');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/(js\/admin\.js)\?v=[^"]*"/, `$1?v=${hash}"`));
}

// Katta ma'lumot fayllari (2026-11-19) — versiya fayl mazmunidan (hash): o'zgarmagan bo'lsa brauzer keshdan oladi.
// Avval har deployda ~6 MB (gzip) qaytadan yuklanardi — admin sekin internetda 40+ soniya ochilardi.
// Bu fayllar CI'da qayta yaratilmaydi (data-site/data-home yaratiladi — ular vaqt versiyasida qoladi).
{
  const sha = (...names) => {
    const h = require('crypto').createHash('sha1');
    for (const n of names) { const fp = path.join(root, 'js', n); if (fs.existsSync(fp)) h.update(fs.readFileSync(fp)); }
    return h.digest('hex').slice(0, 10);
  };
  const HASHED = {
    'data.js': ['data.js'], 'data-custom.js': ['data-custom.js'], 'data-channels.js': ['data-channels.js'],
    'data-rutube.js': ['data-rutube.js'], 'marvel-films.js': ['marvel-films.js'], 'marvel-data.js': ['marvel-data.js'],
    // gate o'z ?v= sini data-lib.js ga uzatadi (data-lib.js esa data-lib2.js ga) — uchalasi bitta hashda
    'data-lib-gate.js': ['data-lib-gate.js', 'data-lib.js', 'data-lib2.js'],
  };
  const ver = Object.fromEntries(Object.entries(HASHED).map(([k, v]) => [k, sha(...v)]));
  const re = /((?:src|href)="(?:\/dezomax\/)?js\/(data\.js|data-custom\.js|data-channels\.js|data-rutube\.js|marvel-films\.js|marvel-data\.js|data-lib-gate\.js))\?v=[^"]*"/g;
  for (const f of files) {
    const p = path.join(root, f);
    const before = fs.readFileSync(p, 'utf8');
    const after = before.replace(re, (_, a, n) => `${a}?v=${ver[n]}"`);
    if (after !== before) fs.writeFileSync(p, after);
  }
}

console.log(`versiya ${version} — ${changed} ta HTML fayl yangilandi`);

// Qidiruv tizimlari uchun kinolar ro'yxati ham yangilansin
// sayt uchun yengil kinolar fayli (js/data-site.js, js/data-desc.js) — data-custom.js dan
require('./gen-site-data.js');
// bosh sahifa uchun yengil ro'yxat (js/data-home.js — index.html)
require('./gen-home-data.js');

require('./gen-sitemap.js');

// Ilova vidjeti uchun yangi kinolar (data/widget.json)
require('./gen-widget.js');

// Poster kichik nusxalari (images/w/*.webp, js/thumbs.js) — yangi posterlar uchun
require('./make-thumbs.js');

// Internetsiz rejim ro'yxati (data/offline-manifest.json — js/offline-pack.js)
require('./gen-offline-manifest.js');
