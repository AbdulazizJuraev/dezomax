/* ============================================================
   Ilova ikonkasi va ochilish ekrani — images/logo/"dastur usti uchun.png" dan.
   Ishlatish: node scripts/make-icons.js && npx capacitor-assets generate --android
   ============================================================ */
const path = require('path');
const sharp = require(require.resolve('sharp', { paths: [path.dirname(require.resolve('@capacitor/assets/package.json'))] }));

const SRC = path.join(__dirname, '..', '..', 'images', 'logo', 'dastur usti uchun.png');
const OUT = path.join(__dirname, '..', 'assets');

// Ikonka fonidagi gradient ranglari (surat yuqorisi va pastidan olingan)
const TOP = '#1d2734', BOTTOM = '#101b28';
const gradBg = size => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${TOP}"/><stop offset="1" stop-color="${BOTTOM}"/></linearGradient></defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/></svg>`);

/* "D" belgisini to'q fondan ajratib olamiz: oq va ko'k piksellar qoladi, to'q fon shaffof bo'ladi */
async function extractMark() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const a = Math.max(0, Math.min(1, (max - 70) / 90));        // 70 dan past — fon, 160 dan yuqori — belgi
    data[i + 3] = Math.round(data[i + 3] * a);
  }
  return sharp(data, { raw: info }).png().trim().toBuffer();
}

(async () => {
  const mark = await extractMark();

  // To'liq ikonka (eski Android): suratning o'zi, burchaklari shaffof
  await sharp(SRC).resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(path.join(OUT, 'icon-only.png'));

  // Adaptive ikonka: fon — gradient, old qatlam — belgi (xavfsiz zona ichida)
  await sharp(gradBg(1024)).png().toFile(path.join(OUT, 'icon-background.png'));
  const fgMark = await sharp(mark).resize(470, 470, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: fgMark, gravity: 'center' }]).png().toFile(path.join(OUT, 'icon-foreground.png'));

  // Ochilish ekrani: sayt foni, markazda ikonka
  const splashIcon = await sharp(SRC).resize(560, 560, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  for (const name of ['splash.png', 'splash-dark.png']) {
    await sharp({ create: { width: 2732, height: 2732, channels: 4, background: '#07080c' } })
      .composite([{ input: splashIcon, gravity: 'center' }]).png().toFile(path.join(OUT, name));
  }
  console.log('assets/ tayyor');
})();
