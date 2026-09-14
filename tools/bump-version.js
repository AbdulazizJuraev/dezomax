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

console.log(`versiya ${version} — ${changed} ta HTML fayl yangilandi`);
