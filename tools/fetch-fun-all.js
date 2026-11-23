/* ============================================================
   DezoMax — «Qiziqarli»dagi bitta kanalli bo'lim (FEZOT) uchun kanalning BARCHA videolari:
   uzun videolar (UULF…), Shorts (UUSH…), jonli efirlar (UULV…) — YouTube pleylist sahifasidan, sahifama-sahifa.
   Natija: data/fun-<key>.json  { at, lf: [[id, nom, ko'rishlar, sana]], sh: [...], lv: [...] }
   Saytda js/fun.js shu faylni RSS'dagi eng yangi 15 ta bilan qo'shib ko'rsatadi (yangi videolar o'zi qo'shilib boradi).
   Ishga tushirish: node tools/fetch-fun-all.js            (js/fun-data.js'dagi `all` maydoni bor kanallar)
   Faqat egasi ruxsat bergan kanallar uchun (FEZOT — 2026-11-23). YouTube ko'p so'rovda «bot emasman» so'raydi — sekin ishlaydi.
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const HEAD = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function pageJson(html, name) {
  const i = html.indexOf(name + ' = ');
  if (i < 0) return null;
  const s = html.indexOf('{', i);
  let d = 0, q = false, e = false;
  for (let k = s; k < html.length; k++) {
    const c = html[k];
    if (q) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') q = false; continue; }
    if (c === '"') q = true; else if (c === '{') d++; else if (c === '}' && !--d) return JSON.parse(html.slice(s, k + 1));
  }
  return null;
}
const UNIT = { second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 2592e6, year: 31536e6 };
function meta(o) {
  const s = JSON.stringify(o);
  const vm_ = s.match(/"([\d.,]+)\s*([KMB]?)\s*views?"/i) || s.match(/([\d.,]+)\s*([KMB]?) views?/i);
  let v = 0;
  if (vm_) v = Math.round(parseFloat(vm_[1].replace(/,/g, '')) * ({ K: 1e3, M: 1e6, B: 1e9 }[vm_[2].toUpperCase()] || 1));
  const am = s.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s+ago/i);
  const d = am ? new Date(Date.now() - +am[1] * UNIT[am[2].toLowerCase()]).toISOString().slice(0, 10) : '';
  return { v, d };
}
function take(d) {
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.playlistVideoRenderer) {
      const r = o.playlistVideoRenderer, m = meta(r.videoInfo || {});
      out.push([r.videoId, r.title?.runs?.[0]?.text || r.title?.simpleText || '', m.v, m.d]);
      return;
    }
    if (o.lockupViewModel && o.lockupViewModel.contentId) {
      const l = o.lockupViewModel, m = meta(l.metadata || {});
      out.push([l.contentId, l.metadata?.lockupMetadataViewModel?.title?.content || '', m.v, m.d]);
      return;
    }
    for (const k in o) walk(o[k]);
  })(d);
  return out;
}
async function playlist(list) {
  const html = await (await fetch(`https://www.youtube.com/playlist?list=${list}&hl=en`, { headers: HEAD })).text();
  const key = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1], ver = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const data = pageJson(html, 'ytInitialData');
  if (!data) { console.log('  ', list, '— sahifa topilmadi'); return []; }
  const items = take(data);
  let tok = JSON.stringify(data).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1], n = 0;
  while (tok && key && n++ < 200) {
    await sleep(500);
    const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${key}&prettyPrint=false`, {
      method: 'POST', headers: { ...HEAD, 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion: ver, hl: 'en' } }, continuation: tok })
    });
    if (!r.ok) { console.log('   to\'xtadi:', r.status); break; }
    const j = await r.json(), add = take(j);
    if (!add.length) break;
    items.push(...add);
    tok = JSON.stringify(j).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1];
    process.stdout.write(`\r   ${list}: ${items.length}`);
  }
  process.stdout.write('\n');
  const seen = new Set();
  return items.filter(x => x[0] && !/^\[(private|deleted)/i.test(x[1]) && !seen.has(x[0]) && seen.add(x[0]));
}

(async () => {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/fun-data.js'), 'utf8') + ';this.FUN_SECTIONS = FUN_SECTIONS;', ctx);
  for (const s of ctx.FUN_SECTIONS) for (const c of s.ch.filter(c => c.all)) {
    console.log(`${c.name} (${c.id}) → ${c.all}`);
    const tail = c.id.slice(2), res = { at: Date.now() };
    for (const [k, pre] of [['lf', 'UULF'], ['sh', 'UUSH'], ['lv', 'UULV']]) res[k] = await playlist(pre + tail);
    if (!res.lf.length && !res.sh.length) { console.log('   bo\'sh — fayl yozilmadi'); continue; }
    fs.writeFileSync(path.join(ROOT, c.all), JSON.stringify(res));
    console.log(`   videolar ${res.lf.length}, shorts ${res.sh.length}, jonli ${res.lv.length} — ${(fs.statSync(path.join(ROOT, c.all)).size / 1024).toFixed(0)} KB`);
  }
})();
