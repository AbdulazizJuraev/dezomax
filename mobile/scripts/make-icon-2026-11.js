/* Ilova belgisi (2026-11-20): assets/icon-2026-11.png (qora fon, yashil «D» + play, o'ngga nurlar) — to'liq kvadrat rasm.
   Adaptiv belgi: fon qatlami = rasmning o'zi, old qatlam = bo'sh (rasm chetigacha to'liq, maska burchaklarni o'zi kesadi).
   Ishlatish: node scripts/make-icon-2026-11.js */
const path = require('path');
const sharp = require(require.resolve('sharp', { paths: [path.dirname(require.resolve('@capacitor/assets/package.json'))] }));
const SRC = path.join(__dirname, '..', 'assets', 'icon-2026-11.png');
const RES = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');
const D = { ldpi: [36, 36], mdpi: [48, 108], hdpi: [72, 162], xhdpi: [96, 216], xxhdpi: [144, 324], xxxhdpi: [192, 432] };
(async () => {
  for (const [d, [leg, ad]] of Object.entries(D)) {
    const dir = path.join(RES, 'mipmap-' + d);
    await sharp(SRC).flatten({ background: '#000' }).resize(leg, leg).png().toFile(path.join(dir, 'dezomax_launcher.png'));
    const circle = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${leg}" height="${leg}"><circle cx="${leg / 2}" cy="${leg / 2}" r="${leg / 2}"/></svg>`);
    await sharp(SRC).flatten({ background: '#000' }).resize(leg, leg).composite([{ input: circle, blend: 'dest-in' }]).png().toFile(path.join(dir, 'dezomax_launcher_round.png'));
    await sharp(SRC).flatten({ background: '#000' }).resize(ad, ad).png().toFile(path.join(dir, 'dezomax_launcher_background.png'));
    await sharp({ create: { width: ad, height: ad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).png().toFile(path.join(dir, 'dezomax_launcher_foreground.png'));
  }
  console.log('belgi tayyor');
})();
