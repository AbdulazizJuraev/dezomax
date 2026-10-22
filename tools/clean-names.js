/* Kino nomlaridan «Film nomi:», «# Kino Nomi:», «✓• Drama nomi:» kabi qo'shimchalarni avtomatik olib tashlaydi (js/data-custom.js).
   Telegram'dan avto-yuklash (DezoCloud serveri) yozgan yangi kinolar ham — .github/workflows/data-guard.yml har yozuvdan keyin chaqiradi.
   Faqat nom o'zgaradi (matn ichida almashtiriladi — fayl tuzilishi, boshqa maydonlar tegilmaydi). Qoida: js/site-data-build.js stripNamePrefix */
const fs = require('fs');
const path = require('path');
global.window = global;
require('../js/site-data-build.js');
const strip = global.stripNamePrefix;

const file = path.join(__dirname, '..', 'js', 'data-custom.js');
let src = fs.readFileSync(file, 'utf8');
let n = 0;
src = src.replace(/"title":\{"uz":("(?:[^"\\]|\\.)*")(,"ru":("(?:[^"\\]|\\.)*"))?\}/g, (all, uzJ, ruPart, ruJ) => {
  const uz = JSON.parse(uzJ), ru = ruJ ? JSON.parse(ruJ) : null;
  if (!/nomi\s*[:\-–—]/i.test(uz) && !(ru && /nomi\s*[:\-–—]/i.test(ru))) return all;
  const nu = strip(uz), nr = ru == null ? null : (ru === uz ? nu : strip(ru));
  if (nu === uz && nr === ru) return all;
  n++;
  return `"title":{"uz":${JSON.stringify(nu)}${ru == null ? '' : `,"ru":${JSON.stringify(nr)}`}}`;
});
if (n) fs.writeFileSync(file, src);
console.log(`nomlar tozalandi: ${n} ta`);
