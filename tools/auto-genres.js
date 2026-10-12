/* Rasmiy YouTube kanallaridan kelgan kinolar (js/data-channels.js) — janri faqat «drama» yoki bo'sh bo'lsa,
   nomi va tavsifidan avtomatik aniqlanadi (js/genre-detect.js). Telegram/DezoCloud kinolariga tegilmaydi.
   node tools/auto-genres.js          — yozadi
   node tools/auto-genres.js --dry    — faqat ko'rsatadi */
const fs = require('fs');
const path = require('path');
const { detectGenres } = require('../js/genre-detect.js');

const F = path.join(__dirname, '..', 'js', 'data-channels.js');
const dry = process.argv.includes('--dry');
let changed = 0;
const out = fs.readFileSync(F, 'utf8').split('\n').map(line => {
  if (!line.startsWith('{"id"')) return line;
  const comma = /,\s*$/.test(line);
  const m = JSON.parse(line.replace(/,\s*$/, ''));
  const cur = m.genres || [];
  if (m.type === 'tahlil' || (cur.length && cur.join() !== 'drama')) return line;
  const g = detectGenres(m);
  if (g.join() === cur.join()) return line;
  changed++;
  if (dry) console.log(`${g.join(', ')}  ←  ${m.title.uz}`);
  m.genres = g;
  return JSON.stringify(m) + (comma ? ',' : '');
});
if (!dry) fs.writeFileSync(F, out.join('\n'));
console.log(`janri aniqlandi: ${changed} ta${dry ? ' (yozilmadi)' : ''}`);
