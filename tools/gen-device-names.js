/* ============================================================
   Telefon model kodi → savdo nomi: data/device-names.json
   ------------------------------------------------------------
   Android ilovaga telefon nomini emas, ichki kodini beradi (Samsung S22+ → «SM-S906B»,
   Redmi Note 11 → «2201117TG»). Akkaunt → Qurilmalar ro'yxatida chiroyli nom ko'rinsin deb
   Google Play'ning ochiq qurilmalar ro'yxatidan (supported_devices.csv) kichik jadval yasaymiz.
   Samsung kodlari mintaqa harfisiz saqlanadi (SM-S906B/E/U → SM-S906).

   Ishga tushirish (yangi telefonlar chiqqanda, yiliga bir-ikki marta):  node tools/gen-device-names.js
   ============================================================ */

const fs = require('fs');
const path = require('path');

const SRC = 'https://storage.googleapis.com/play_public/supported_devices.csv';
const OUT = path.join(__dirname, '..', 'data', 'device-names.json');
// O'zbekistonda uchraydigan brendlar (qolganlari jadvalni keraksiz kattalashtiradi)
const KEEP = /^(Samsung|Xiaomi|Redmi|POCO|Huawei|Honor|Tecno|Infinix|Itel|realme|Oppo|Vivo|OnePlus|Google|Motorola|Nokia|HMD Global|Sony|Nothing|Meizu|Lenovo|Asus|ZTE|Artel|Blackview|Ulefone|Doogee|Umidigi|Cubot|Oukitel)$/i;

function parseCsv(text) {
  return text.split(/\r?\n/).slice(1).map(line => {
    const out = []; let cur = '', q = false;
    for (const c of line) {
      if (c === '"') { q = !q; continue; }
      if (c === ',' && !q) { out.push(cur); cur = ''; continue; }
      cur += c;
    }
    out.push(cur);
    return out;
  }).filter(r => r.length >= 4);
}

(async () => {
  const r = await fetch(SRC);
  if (!r.ok) throw new Error('CSV yuklanmadi: ' + r.status);
  const text = Buffer.from(await r.arrayBuffer()).toString('utf16le').replace(/^﻿/, '');
  const map = {};
  for (const [brandRaw, nameRaw, , modelRaw] of parseCsv(text)) {
    if (!KEEP.test(brandRaw) || !nameRaw || !modelRaw) continue;
    const name = nameRaw.replace(/\s+/g, ' ').trim();
    let key = modelRaw.trim();
    if (name.toLowerCase() === key.toLowerCase()) continue;
    const brand = brandRaw === 'HMD Global' ? 'Nokia' : brandRaw;
    const full = name.toLowerCase().startsWith(brand.toLowerCase()) ? name : `${brand} ${name}`;
    if (brand === 'Samsung') { const m = /^(SM-[A-Z]\d{3,4})/i.exec(key); if (m) key = m[1].toUpperCase(); }
    if (!map[key]) map[key] = full;
  }
  fs.writeFileSync(OUT, JSON.stringify(map));
  console.log(`data/device-names.json — ${Object.keys(map).length} ta model`);
})().catch(e => { console.error(e.message); process.exit(1); });
