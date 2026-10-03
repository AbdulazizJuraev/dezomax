/* ============================================================
   Ilova ikonkalari — images/app/ ichidagi tayyor rasmlardan.
     DezoMax        : "DezoMax Yangi Logo qizil.png"     -> src/main/res
     DezoMax Admin  : "DezoMax Admin panel qizil.png"    -> src/admin/res (main ni bosib ketadi)
   Ishlatish: node scripts/make-icons-red.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const sharp = require(path.resolve(__dirname, '..', 'node_modules', 'sharp'));

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT, '..', 'images', 'app');
const RES = name => path.join(ROOT, 'android', 'app', 'src', name, 'res');

const VARIANTS = [
  { file: 'DezoMax Yangi Logo qizil.png',  res: RES('main'), fadeRight: true },
  { file: 'DezoMax Admin panel qizil.png', res: RES('admin') },
];

// zichlik -> [eski ikonka (dp 48), adaptive qatlam (dp 108)] piksel o'lchamlari
const DENS = { mdpi: [48, 108], hdpi: [72, 162], xhdpi: [96, 216], xxhdpi: [144, 324], xxxhdpi: [192, 432] };

/* «D» dan chiqqan qizil nur rasmning o'ng chetigacha boradi — telefonda belgidan chiqib ketgandek ko'rinardi.
   O'ng tomonda nur (va undagi logotiplar) asta-sekin qora fonga singib ketadi: 84% dan 96% gacha so'nadi,
   oxirgi qismi — toza qora (qora to'rtburchakning cheti). Asl rasm o'zgarmaydi. */
async function fadeRight(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, x0 = W * 0.84, x1 = W * 0.965;
  for (let y = 0; y < H; y++) for (let x = Math.floor(x0); x < W; x++) {
    const i = (y * W + x) * 4;
    if (!data[i + 3]) continue;
    const t = Math.min(1, (x - x0) / (x1 - x0));
    const f = 1 - t * t * (3 - 2 * t);                 // silliq o'tish (smoothstep)
    data[i] = Math.round(data[i] * f); data[i + 1] = Math.round(data[i + 1] * f); data[i + 2] = Math.round(data[i + 2] * f);
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

/* Rasmning ichki (shaffof bo'lmagan) qismidan o'rtacha fon rangini olamiz */
async function bgColor(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  let r = 0, g = 0, b = 0, n = 0;
  // faqat chap chetdan (markaz balandligida): o‘ng tomonda qizil lentalar bor
  for (const x of [Math.round(W * 0.05), Math.round(W * 0.08)]) {
    for (let y = Math.round(H * 0.35); y < Math.round(H * 0.65); y++) {
      const i = (y * W + x) * 4;
      if (data[i + 3] > 250) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
    }
  }
  if (!n) return { r: 10, g: 10, b: 12 };
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
}

(async () => {
  for (const v of VARIANTS) {
    let src = fs.readFileSync(path.join(SRC_DIR, v.file));
    if (v.fadeRight) src = await fadeRight(src);
    const bg = await bgColor(src);
    console.log(v.file, '-> fon rangi', `rgb(${bg.r},${bg.g},${bg.b})`);

    for (const [dens, [legacy, layer]] of Object.entries(DENS)) {
      const dir = path.join(v.res, 'mipmap-' + dens);
      fs.mkdirSync(dir, { recursive: true });

      // 1) eski ikonka: rasmning o'zi (burchaklari shaffof)
      await sharp(src).resize(legacy, legacy, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png().toFile(path.join(dir, 'ic_launcher.png'));

      // 2) yumaloq ikonka: fon rangidagi doira, ichida rasm
      const inner = Math.round(legacy * 0.84);
      const innerBuf = await sharp(src).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
      const circle = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${legacy}" height="${legacy}"><circle cx="${legacy / 2}" cy="${legacy / 2}" r="${legacy / 2}" fill="rgb(${bg.r},${bg.g},${bg.b})"/></svg>`);
      await sharp(circle).composite([{ input: innerBuf, gravity: 'center' }]).png().toFile(path.join(dir, 'ic_launcher_round.png'));

      // 3) adaptive: fon — tekis rang, old qatlam — rasm (xavfsiz zona ichida ~84%)
      await sharp({ create: { width: layer, height: layer, channels: 4, background: { ...bg, alpha: 1 } } })
        .png().toFile(path.join(dir, 'ic_launcher_background.png'));
      const fgSize = Math.round(layer * 0.84);
      const fgBuf = await sharp(src).resize(fgSize, fgSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
      await sharp({ create: { width: layer, height: layer, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
        .composite([{ input: fgBuf, gravity: 'center' }]).png().toFile(path.join(dir, 'ic_launcher_foreground.png'));
    }
  }
  console.log('ikonkalar tayyor');
})().catch(e => { console.error(e); process.exit(1); });
