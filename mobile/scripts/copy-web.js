/* ============================================================
   Sayt fayllarini ilova ichiga (mobile/www) nusxalash.
   Sayt manbasi — loyiha ildizi; mobile/ papkasi o'zi nusxalanmaydi.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.resolve(__dirname, '..', 'www');

// Ilovaga kerak bo'lmaganlar
const SKIP = new Set(['mobile', 'tools', '.git', '.github', '.claude', 'node_modules', 'README.md', '.gitignore', '404.html',
  'admin.html', 'admin.js',     // admin sahifa ilovaga kerak emas
  'data-lib2.js']);             // 20 000+ kinolik kutubxona ilovada jonli saytdan olinadi (js/data-lib.js oxiridagi yuklagich)

// Admin orqali qo'shilgan kinolar ilovada jonli saytdan olinadi — APK'ni qayta yig'ish shart emas
const LIVE_CUSTOM = 'https://abdulazizjuraev.github.io/dezomax/js/data-custom.js';

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  let n = 0;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(e.name) || e.name.startsWith('.')) continue;
    // hujjatlar (pdf, docx...) va ish fayllari ilovaga tushmasin
    if (e.isFile() && /\.(pdf|docx?|xlsx?|pptx?|zip|rar|psd|ai|cdr|txt)$/i.test(e.name)) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) n += copyDir(s, d);
    else { fs.copyFileSync(s, d); n++; }
  }
  return n;
}

fs.rmSync(OUT, { recursive: true, force: true });
const count = copyDir(ROOT, OUT);

// Ilovada qo'shimcha skript: orqaga tugmasi, status bar, gorizontal video
const native = path.join(__dirname, '..', 'native', 'app-native.js');
fs.copyFileSync(native, path.join(OUT, 'js', 'app-native.js'));
// fondagi bildirishnoma tekshiruvchisi (capacitor.config.json → BackgroundRunner.src)
fs.mkdirSync(path.join(OUT, 'runners'), { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', 'native', 'notify-runner.js'), path.join(OUT, 'runners', 'notify.js'));

let patched = 0;
for (const f of fs.readdirSync(OUT).filter(x => x.endsWith('.html'))) {
  const p = path.join(OUT, f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('app-native.js')) continue;
  html = html.replace(`src="js/data-custom.js?t=`, `src="${LIVE_CUSTOM}?t=`);
  // kino kutubxonasi ham jonli saytdan — yangi kinolar uchun APK'ni qayta yig'ish shart emas
  html = html.replace(/src="js\/data-lib\.js\?v=([^"]*)"/, `src="${LIVE_CUSTOM.replace('data-custom.js', 'data-lib.js')}?v=$1"`);
  // bosh sahifa sozlamalari (slayder, qatorlar) ham jonli saytdan
  html = html.replace(`src="js/site-config.js?t=`, `src="${LIVE_CUSTOM.replace('data-custom.js', 'site-config.js')}?t=`);
  // viewport-fit=cover QO'SHILMAYDI: ba'zi telefonlarning WebView'i pastki chekinishni
  // sahifaga bermaydi va navbar tizim paneli ostida qolib ketardi. Chekinishlarni
  // MainActivity.java o'zi boshqaradi: pastda joy qoldiradi, tepadagi balandlikni --app-sat bilan beradi.
  fs.writeFileSync(p, html.replace('</body>', '<script src="js/app-native.js"></script>\n</body>'));
  patched++;
}

console.log(`www/ tayyor: ${count} ta fayl, ${patched} ta sahifaga app-native.js ulandi`);

/* APK hajmi kichik bo'lsin (Telegram/Claude orqali yuborish chegarasi ~30 MB): ilova ichidagi rasmlar siqiladi.
   Kartochkalar telefonda ~140–200px — 640px eni yetarli; keng (16:9) muqovalar 960px. Saytdagi asl rasmlarga tegilmaydi. */
(async () => {
  let sharp;
  try { sharp = require('sharp'); } catch { console.log('sharp topilmadi — rasmlar siqilmadi'); return; }
  sharp.cache(false);
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
  let before = 0, after = 0;
  for (const f of walk(path.join(OUT, 'images')).filter(p => /\.(jpe?g|png|webp)$/i.test(p))) {
    const size = fs.statSync(f).size;
    if (size < 60 * 1024 || /[\\/]logo[\\/]/.test(f)) continue;   // logotiplar (shaffof PNG) o'z holicha
    const wide = /[\\/]uz[\\/]/.test(f);
    try {
      // Windows'da sharp faylni ochiq ushlab qolmasin — xotiradagi nusxadan o'qiymiz
      const buf = await sharp(fs.readFileSync(f)).rotate()
        .resize({ width: wide ? 960 : 640, withoutEnlargement: true })
        .flatten({ background: '#07080c' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toBuffer();
      if (buf.length < size) { fs.writeFileSync(f, buf); before += size; after += buf.length; }
    } catch (e) { console.log('siqib bo‘lmadi:', path.relative(OUT, f), e.message); }
  }
  console.log(`rasmlar siqildi: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);
})();
