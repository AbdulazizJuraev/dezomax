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
  // kino kutubxonasi (va uning oxiridagi 2-kutubxona yuklagichi) ham jonli saytdan
  .replace(/src="js\/data-lib\.js\?v=([^"]*)"/, `src="${LIVE_CUSTOM.replace('data-custom.js', 'data-lib.js')}?v=$1"`)
  // admin paneli kodi jonli saytdan (10 daqiqalik kesh) — admin tuzatishlari APK'ni qayta yig'masdan yetib boradi.
  // Internet bo'lmasa yoki yuklanmasa — ilova ichidagi nusxa ishlaydi.
  .replace(/<script src="js\/admin\.js\?v=[^"]*"><\/script>/,
    `<script>document.write('<script src="${LIVE_CUSTOM.replace('data-custom.js', 'admin.js')}?t=' + Math.floor(Date.now() / 600000) + '" onerror="var s=document.createElement(\\'script\\');s.src=\\'js/admin.js\\';document.body.appendChild(s)"><\\/script>')</script>`)
  // ilovada sayt menyulari kerak emas
  .replace('<body class="page-admin">', '<body class="page-admin is-admin-app">')
  .replace('</body>', '<script src="js/app-native.js"></script>\n</body>');

fs.writeFileSync(path.join(OUT, 'index.html'), html);
fs.copyFileSync(path.join(ROOT, 'js', 'admin.js'), path.join(OUT, 'js', 'admin.js'));

console.log('admin ilova sahifasi tayyor:', path.relative(ROOT, OUT));
