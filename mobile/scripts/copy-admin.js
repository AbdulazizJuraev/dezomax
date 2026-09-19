/* ============================================================
   "DezoMax Admin" ilovasi: android/app/src/admin/assets/public va capacitor.config.json
   Bu papkadagi fayllar asosiy ilova fayllari ustidan yoziladi (flavor assets).
   6.0 dan boshlab admin ilovasi admin panelini internetdan ochadi
   (server.url = .../admin.html) — admin o'zgarishlari APK'siz yetib boradi.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ASSETS = path.resolve(__dirname, '..', 'android', 'app', 'src', 'admin', 'assets');
const OUT = path.join(ASSETS, 'public');
const ADMIN_URL = 'https://abdulazizjuraev.github.io/dezomax/admin.html';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// internet bo'lmaganda: «Qayta urinish» admin sahifasiga qaytaradi
const offline = fs.readFileSync(path.join(__dirname, '..', 'native', 'offline.html'), 'utf8')
  .replace('<script>', `<script>window.DZX_START = '${ADMIN_URL}';`);
fs.writeFileSync(path.join(OUT, 'offline.html'), offline);
fs.writeFileSync(path.join(OUT, 'index.html'), offline);

// cap sync yozgan sozlama asosida — faqat ochiladigan manzil boshqa
const mainCfg = path.resolve(__dirname, '..', 'android', 'app', 'src', 'main', 'assets', 'capacitor.config.json');
const cfg = JSON.parse(fs.readFileSync(mainCfg, 'utf8'));
cfg.appName = 'DezoMax Admin';
cfg.server = { ...(cfg.server || {}), url: ADMIN_URL };
fs.writeFileSync(path.join(ASSETS, 'capacitor.config.json'), JSON.stringify(cfg, null, 2));

console.log('admin ilova: server.url =', ADMIN_URL);
