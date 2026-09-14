/* ============================================================
   Sayt fayllarini ilova ichiga (mobile/www) nusxalash.
   Sayt manbasi — loyiha ildizi; mobile/ papkasi o'zi nusxalanmaydi.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.resolve(__dirname, '..', 'www');

// Ilovaga kerak bo'lmaganlar
const SKIP = new Set(['mobile', 'tools', '.git', '.github', '.claude', 'node_modules', 'README.md', '.gitignore', '404.html']);

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

let patched = 0;
for (const f of fs.readdirSync(OUT).filter(x => x.endsWith('.html'))) {
  const p = path.join(OUT, f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('app-native.js')) continue;
  // Ilova butun ekranni egallaydi: sahifa status bar va chetlar ostigacha chiziladi,
  // kontent esa CSS'dagi safe-area chekinishlari bilan suriladi
  html = html.replace(/<meta name="viewport" content="([^"]*)">/, (m, c) =>
    c.includes('viewport-fit') ? m : `<meta name="viewport" content="${c}, viewport-fit=cover">`);
  fs.writeFileSync(p, html.replace('</body>', '<script src="js/app-native.js"></script>\n</body>'));
  patched++;
}

console.log(`www/ tayyor: ${count} ta fayl, ${patched} ta sahifaga app-native.js ulandi`);
