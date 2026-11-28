/* DezoMax — saytga yuklanadigan JS va CSS'ni siqish (minify), 2026-11-28.
   Manba kod (js/, css/) o'qiladigan holda qoladi; faqat yig'ilgan _site/ papkasidagi nusxalar siqiladi.
   .github/workflows/cf-site.yml → «Sayt fayllarini yig'ish»dan keyin: node tools/minify-site.js _site

   - Bo'sh joy, izohlar olib tashlanadi, ichki o'zgaruvchilar qisqartiriladi.
   - Yuqori darajadagi nomlar (funksiyalar, const) O'ZGARMAYDI: fayllar bir-birining funksiyalarini chaqiradi
     (oddiy <script>, modul emas) — esbuild format berilmasa ularni qayta nomlamaydi.
   - Sintaksis pasaytirilmaydi (target berilmagan) — kod xuddi hozirgi brauzerlarda ishlaganidek ishlaydi.
   - Siqilgan har bir JS `node --check` dan o'tadi; xato bo'lsa — asl nusxa qoladi va jarayon xato bilan tugaydi. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const esbuild = require('esbuild');

const dir = path.resolve(process.argv[2] || '_site');
const SKIP = /(\.min\.js|^jsqr\.js|^data-[\w-]*\.js)$/;   // tayyor siqilgan kutubxonalar va katta ma'lumot fayllari

const files = [];
for (const sub of ['js', 'css']) {
  const d = path.join(dir, sub);
  if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (/\.(js|css)$/.test(f) && !SKIP.test(f)) files.push(path.join(d, f));
}
if (fs.existsSync(path.join(dir, 'sw.js'))) files.push(path.join(dir, 'sw.js'));

let before = 0, after = 0, failed = 0;
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const loader = file.endsWith('.css') ? 'css' : 'js';
  let code;
  try {
    code = esbuild.transformSync(src, { loader, minify: true, charset: 'utf8', legalComments: 'inline' }).code;
  } catch (e) { console.error(`✗ ${path.relative(dir, file)}: ${e.message.split('\n')[0]}`); failed++; continue; }
  if (loader === 'js') {
    const tmp = file + '.check.js';
    fs.writeFileSync(tmp, code);
    try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); }
    catch (e) { console.error(`✗ ${path.relative(dir, file)}: siqilgan kod tekshiruvdan o'tmadi`); failed++; fs.unlinkSync(tmp); continue; }
    fs.unlinkSync(tmp);
  }
  if (code.length >= src.length) continue;
  fs.writeFileSync(file, code);
  before += Buffer.byteLength(src); after += Buffer.byteLength(code);
}
console.log(`minify: ${files.length} ta fayl, ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
if (failed) process.exit(1);
