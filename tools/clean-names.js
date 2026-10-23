/* Kino nomlarini avtomatik tozalaydi (js/data-custom.js):
   1) «Film nomi:», «# Kino Nomi:», «✓• Drama nomi:» kabi qo'shimchalar olib tashlanadi;
   2) nomi noma'lum bo'lsa («#PREMYERA», «Video», «Drama nomi») — tavsifdagi «🎬 Nomi: Jon Uik 1» qatoridan olinadi.
   Telegram'dan avto-yuklash (DezoCloud serveri) yozgan yangi kinolar ham — .github/workflows/data-guard.yml har yozuvdan keyin chaqiradi.
   Faqat nom o'zgaradi (har bir kino qatori alohida — fayl tuzilishi, boshqa maydonlar tegilmaydi). Qoida: js/site-data-build.js stripNamePrefix */
const fs = require('fs');
const path = require('path');
global.window = global;
require('../js/site-data-build.js');
const strip = global.stripNamePrefix;

const GENERIC = /^(?:premyera|premiera|super premyera|video|kino|film|serial|yangi|yangi kino|treyler|trailer|drama|dorama|multfilm|multik|anime|nomi|drama nomi|admin|super|top|hd)$/i;
const key = t => String(t || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const unknown = t => { const k = key(strip(t)); return k.length < 2 || GENERIC.test(k); };
const NAME_LINE = /(?:^|[^\p{L}])(?:\p{L}+\s+){0,2}?(?:nomi|название)\s*[:\-–—]\s*([^\n]{2,90})/iu;
const fromDesc = m => {
  const d = [m.desc && m.desc.uz, m.desc && m.desc.ru].filter(Boolean).join('\n');
  const line = (d.match(NAME_LINE) || [])[1];
  if (!line) return '';
  const t = strip(line).replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{200B}]/gu, '').replace(/\s{2,}/g, ' ').trim();
  return t && !unknown(t) ? t : '';
};

const file = path.join(__dirname, '..', 'js', 'data-custom.js');
const lines = fs.readFileSync(file, 'utf8').split('\n');
let n = 0, named = 0;
for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  if (!ln.startsWith('{"id":') || !/nomi|название|premyera|premiera|video|drama|#/i.test(ln)) continue;
  const comma = /,\r?$/.test(ln) ? ',' : '';
  const cr = /\r$/.test(ln) ? '\r' : '';
  let m;
  try { m = JSON.parse(ln.replace(/,?\r?$/, '')); } catch { continue; }
  if (!m.title || typeof m.title.uz !== 'string') continue;
  const uz = m.title.uz, ru = m.title.ru;
  let nu = /nomi\s*[:\-–—]/i.test(uz) ? strip(uz) : uz;
  if (unknown(nu)) { const d = fromDesc(m); if (d) { nu = d; named++; } }
  const nr = ru == null ? ru : ru === uz ? nu : (/nomi\s*[:\-–—]/i.test(ru) ? strip(ru) : ru);
  if (nu === uz && nr === ru) continue;
  m.title = ru == null ? { ...m.title, uz: nu } : { ...m.title, uz: nu, ru: nr };
  lines[i] = JSON.stringify(m) + comma + cr;
  n++;
}
if (n) fs.writeFileSync(file, lines.join('\n'));
console.log(`nomlar tozalandi: ${n} ta (tavsifdan nomi topilgani: ${named})`);
