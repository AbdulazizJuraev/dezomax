/* ============================================================
   Internetsiz rejim ro'yxati — data/offline-manifest.json
   Ilova (js/offline-pack.js) shu ro'yxat bo'yicha hamma sahifa, kod va doimiy rasmlarni telefonga saqlaydi.
   Kino posterlari bu yerda emas — ularni sahifa MOVIES dan o'zi hisoblaydi (admin qo'shgan yangi kinolar ham kirsin).
   bump-version.js chaqiradi.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP_PAGES = /^(admin|404|yandex_.*)\.html$/;
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html') && !SKIP_PAGES.test(f));
if (fs.existsSync(path.join(root, 'kino', 'index.html'))) pages.push('kino/index.html');

// sahifalardagi js/css havolalari aynan shu ko'rinishda (?v= bilan) — service worker shu manzil bilan qidiradi
const shell = new Set();
let v = '';
for (const p of pages) {
  const html = fs.readFileSync(path.join(root, p), 'utf8');
  for (const m of html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+\.(?:js|css)(?:\?[^"]*)?)"/g)) {
    if (/[?&]t=/.test(m[1]) || /admin|data-lib(?!-gate)/.test(m[1])) continue;
    shell.add(m[1]);
    if (!v && /js\/common\.js\?v=(\d+)/.test(m[1])) v = RegExp.$1;
  }
}
// keyin (sahifa ichidan) yuklanadigan skriptlar
for (const s of [`js/app-native.js?v=${v}`, `js/tvmode.js?v=${v}`, 'js/hls.min.js', 'js/jsqr.js']) shell.add(s);

// doimiy rasmlar: sport to'plari, TV kanal logolari, Marvel sahifasi, sayt logolari
const images = [];
for (const dir of ['images/sport', 'images/tv', 'images/marvel', 'images/logo']) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full)) {
    if (/\.(png|jpe?g|webp|svg|gif)$/i.test(f)) images.push(dir + '/' + encodeURI(f));
  }
}

const out = { v, pages, shell: [...shell], data: ['js/data-custom.js', 'js/site-config.js'], images };
fs.writeFileSync(path.join(root, 'data', 'offline-manifest.json'), JSON.stringify(out));
console.log(`offline-manifest: ${pages.length} sahifa, ${shell.size} kod fayli, ${images.length} rasm`);
