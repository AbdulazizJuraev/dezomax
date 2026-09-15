/* ============================================================
   "DezoMax Admin" ilovasi uchun sahifa: android/app/src/admin/assets/public
   Bu papkadagi fayllar asosiy ilova fayllari ustidan yoziladi (flavor assets),
   shuning uchun admin ilovasi ochilganda index.html = admin sahifa.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.resolve(__dirname, '..', 'android', 'app', 'src', 'admin', 'assets', 'public');
const LIVE_CUSTOM = 'https://abdulazizjuraev.github.io/dezomax/js/data-custom.js';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'js'), { recursive: true });

let html = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
html = html
  // eng so'nggi kinolar ro'yxati jonli saytdan
  .replace('src="js/data-custom.js?t=', `src="${LIVE_CUSTOM}?t=`)
  // ilovada sayt menyulari kerak emas
  .replace('<body class="page-admin">', '<body class="page-admin is-admin-app">')
  .replace('</body>', '<script src="js/app-native.js"></script>\n</body>');

fs.writeFileSync(path.join(OUT, 'index.html'), html);
fs.copyFileSync(path.join(ROOT, 'js', 'admin.js'), path.join(OUT, 'js', 'admin.js'));

console.log('admin ilova sahifasi tayyor:', path.relative(ROOT, OUT));
