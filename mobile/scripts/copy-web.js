/* ============================================================
   Ilova ichiga (mobile/www) faqat kerakli fayllar.
   6.0 dan boshlab ilova saytni to'g'ridan-to'g'ri internetdan ochadi
   (capacitor.config.json → server.url = https://abdulazizjuraev.github.io/dezomax/):
   saytdagi har qanday o'zgarish ilovada APK'ni qayta yig'masdan ko'rinadi.
   Ilova ichida qoladi:
     • offline.html — internet bo'lmaganda chiqadigan sahifa (server.errorPath)
     • runners/notify.js — fondagi bildirishnoma tekshiruvchisi (BackgroundRunner o'z fayllarini ilova ichidan o'qiydi)
     • images/app — belgi
   Ilovaga xos JS (orqaga tugmasi va h.k.) endi saytda: js/app-native.js (js/common.js ilova ichida yuklaydi).
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.resolve(__dirname, '..', 'www');
const NATIVE = path.join(__dirname, '..', 'native');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'runners'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'images', 'app'), { recursive: true });

fs.copyFileSync(path.join(NATIVE, 'offline.html'), path.join(OUT, 'offline.html'));
// Capacitor webDir'da index.html bo'lishini talab qiladi — internet bo'lmasa ham shu sahifa
fs.copyFileSync(path.join(NATIVE, 'offline.html'), path.join(OUT, 'index.html'));
fs.copyFileSync(path.join(NATIVE, 'notify-runner.js'), path.join(OUT, 'runners', 'notify.js'));
for (const f of fs.readdirSync(path.join(ROOT, 'images', 'app'))) {
  fs.copyFileSync(path.join(ROOT, 'images', 'app', f), path.join(OUT, 'images', 'app', f));
}

console.log('www/ tayyor: offline.html, runners/notify.js, images/app (sayt internetdan ochiladi)');
