/* ============================================================
   Poster kichik nusxalari: images/w/<nom>.webp (eni 400 px) + js/thumbs.js ro'yxati
   ------------------------------------------------------------
   Kartalarda poster ~140–250 px ko'rinadi, original fayllar esa o'rtacha 127 KB (jami 18 MB) —
   bosh sahifa ochilganda 6 MB rasm yuklanardi. WebP nusxa ~20–30 KB.
   Kartalar (js/common.js posterHTML) ro'yxatda bo'lsa nusxani, bo'lmasa originalni ishlatadi.
   Faqat yangi yoki o'zgargan rasmlar qayta ishlanadi. tools/bump-version.js chaqiradi.
   sharp — mobile/node_modules dan (bo'lmasa o'tkazib yuboriladi).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
let sharp;
for (const p of ['sharp', path.join(root, 'mobile', 'node_modules', 'sharp')]) { try { sharp = require(p); break; } catch {} }

module.exports = (async () => {
  if (!sharp) { console.log('make-thumbs: sharp topilmadi — o‘tkazib yuborildi'); return; }
  const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
  vm.createContext(ctx);
  for (const f of ['js/data.js', 'js/data-channels.js', 'js/data-custom.js']) {
    try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var '), ctx); } catch {}
  }
  const srcs = new Set();
  for (const m of ctx.MOVIES || []) {
    const p = String(m.poster || '').split('?')[0];
    if (/^images\/(?!w\/).+\.(jpe?g|png|webp)$/i.test(p)) srcs.add(p);
  }
  const outDir = path.join(root, 'images', 'w');
  fs.mkdirSync(outDir, { recursive: true });
  const done = [];
  let made = 0, saved = 0;
  for (const p of srcs) {
    const src = path.join(root, p);
    if (!fs.existsSync(src)) continue;
    const name = p.slice('images/'.length).replace(/\.[^.]+$/, '').replace(/[\/\\]/g, '__') + '.webp';
    const out = path.join(outDir, name);
    const st = fs.statSync(src);
    if (st.size < 45 * 1024) continue;                      // kichik rasm — o'zi yetarli
    if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < st.mtimeMs) {
      await sharp(src).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
      made++;
    }
    saved += st.size - fs.statSync(out).size;
    done.push([p, 'images/w/' + name]);
  }
  // katta nusxa (eni 1280) — slayder va seriallar banneri fonlari: muqovalar, o'zbek filmlarining keng rasmlari, serial posterlari
  const bigSrc = new Set();
  for (const m of ctx.MOVIES || []) {
    for (const v of [m.cover, (String(m.poster || '').startsWith('images/uz/') || m.type === 'serial') && m.poster]) {
      const q = String(v || '').split('?')[0];
      if (/^(images|marvel)\/(?!w\/).+\.(jpe?g|png|webp)$/i.test(q)) bigSrc.add(q);
    }
  }
  const bigDir = path.join(outDir, 'l');
  fs.mkdirSync(bigDir, { recursive: true });
  const big = [];
  for (const p of bigSrc) {
    const src = path.join(root, p);
    if (!fs.existsSync(src) || fs.statSync(src).size < 90 * 1024) continue;
    const out = path.join(bigDir, p.replace(/\.[^.]+$/, '').replace(/[\/\\]/g, '__') + '.webp');
    if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs) {
      await sharp(src).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 70 }).toFile(out);
      made++;
    }
    saved += fs.statSync(src).size - fs.statSync(out).size;
    big.push([p, 'images/w/l/' + path.basename(out)]);
  }
  fs.writeFileSync(path.join(root, 'js', 'thumbs.js'),
    `/* tools/make-thumbs.js yaratadi — qo'lda o'zgartirmang. Rasm → yengil WebP nusxa: THUMBS — kartalar (400 px), THUMBS_BIG — fonlar (1280 px) */\nvar THUMBS = ${JSON.stringify(Object.fromEntries(done))};\nvar THUMBS_BIG = ${JSON.stringify(Object.fromEntries(big))};\n`);
  console.log(`make-thumbs: ${done.length} ta kichik, ${big.length} ta katta nusxa (${made} ta yangi), ${Math.round(saved / 1048576)} MB tejaldi`);
})();
