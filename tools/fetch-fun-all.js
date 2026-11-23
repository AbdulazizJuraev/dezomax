/* ============================================================
   DezoMax — «Qiziqarli»dagi kanal sahifasi (FEZOT va keyingilar) uchun kanalning BARCHA videolari:
   uzun videolar (UULF… pleylisti), jonli efirlar (UULV…), Shorts (kanalning /shorts bo'limi).
   Natija: data/fun-<key>.json  { at, lf: [[id, nom, ko'rishlar, sana]], sh: [...], lv: [...] }
   Har ro'yxat ikki marta o'qiladi: inglizcha (ko'rishlar soni va sana shu tilda ajratiladi) va o'zbekcha —
   YouTube sarlavhalarni so'ralgan tilga avtomatik tarjima qiladi, asl (o'zbekcha) sarlavha o'zbekcha sahifadan olinadi.
   Saytda js/fun.js shu faylni RSS'dagi eng yangi 15 ta bilan qo'shib ko'rsatadi (yangi videolar o'zi qo'shilib boradi).
   Ishga tushirish: node tools/fetch-fun-all.js [fezotlive]   (`all` maydoni bor kanallar; argument — faqat shu kanal)
   Faqat egasi ruxsat bergan kanallar uchun (FEZOT — 2026-11-23). YouTube ko'p so'rovda «bot emasman» so'raydi — sekin ishlaydi.
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36';
const HEAD = { en: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' }, uz: { 'User-Agent': UA, 'Accept-Language': 'uz-UZ,uz;q=0.9' } };
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
  const s = JSON.stringify(o).replace(/\\u00a0| | /g, ' ');
  const m = s.match(/([\d.,]+)\s*([KMB]?)\s*views?/i);
  const v = m ? Math.round(parseFloat(m[1].replace(/,/g, '')) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2].toUpperCase()] || 1)) : 0;
  const a = s.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s+ago/i);
  const d = a ? new Date(Date.now() - +a[1] * UNIT[a[2].toLowerCase()]).toISOString().slice(0, 10) : '';
  return { v, d };
}
function take(d) {
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.playlistVideoRenderer) {
      const r = o.playlistVideoRenderer, m = meta(r.videoInfo || r);
      out.push([r.videoId, r.title?.runs?.[0]?.text || r.title?.simpleText || '', m.v, m.d]);
      return;
    }
    if (o.lockupViewModel && o.lockupViewModel.contentId) {
      const l = o.lockupViewModel, m = meta(l.metadata || {});
      out.push([l.contentId, l.metadata?.lockupMetadataViewModel?.title?.content || '', m.v, m.d]);
      return;
    }
    if (o.shortsLockupViewModel) {
      const s = o.shortsLockupViewModel, id = JSON.stringify(s).match(/"videoId":"([\w-]{11})"/)?.[1], m = meta(s.overlayMetadata || {});
      if (id) out.push([id, s.overlayMetadata?.primaryText?.content || '', m.v, '']);
      return;
    }
    if (o.reelItemRenderer) { out.push([o.reelItemRenderer.videoId, o.reelItemRenderer.headline?.simpleText || '', meta(o.reelItemRenderer).v, '']); return; }
    for (const k in o) walk(o[k]);
  })(d);
  return out;
}
// url — pleylist yoki kanalning /shorts sahifasi; lang — en | uz
async function collect(url, lang, label) {
  const head = HEAD[lang];
  const html = await (await fetch(url + (url.includes('?') ? '&' : '?') + 'hl=' + lang, { headers: head })).text();
  const key = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1], ver = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const data = pageJson(html, 'ytInitialData');
  if (!data) { console.log('  ', label, lang, '— sahifa topilmadi'); return []; }
  const items = take(data);
  let tok = JSON.stringify(data).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1], n = 0;
  while (tok && key && n++ < 200) {
    await sleep(500);
    const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${key}&prettyPrint=false`, {
      method: 'POST', headers: { ...head, 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion: ver, hl: lang } }, continuation: tok })
    });
    if (!r.ok) { console.log('   to\'xtadi:', r.status); break; }
    const j = await r.json(), add = take(j);
    if (!add.length) break;
    items.push(...add);
    tok = JSON.stringify(j).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1];
    process.stdout.write(`\r   ${label} (${lang}): ${items.length}   `);
  }
  process.stdout.write(`\r   ${label} (${lang}): ${items.length}   \n`);
  const seen = new Set();
  return items.filter(x => x[0] && !/^\[(private|deleted)/i.test(x[1]) && !seen.has(x[0]) && seen.add(x[0]));
}
// inglizchadan — ko'rishlar va sana, o'zbekchadan — asl sarlavha
async function both(url, label) {
  const en = await collect(url, 'en', label);
  const uz = new Map((await collect(url, 'uz', label)).map(x => [x[0], x[1]]));
  return en.map(([id, t, v, d]) => [id, uz.get(id) || t, v, d]);
}

(async () => {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/fun-data.js'), 'utf8') + ';this.FUN_SECTIONS = FUN_SECTIONS;', ctx);
  // node tools/fetch-fun-all.js fezotlive — faqat shu kanal (fayl nomi yoki kanal nomi bo'yicha); argumentsiz — hammasi
  const only = (process.argv[2] || '').toLowerCase();
  const want = c => !only || c.all.toLowerCase().includes(only) || c.name.toLowerCase().replace(/\s+/g, '') === only;
  for (const s of ctx.FUN_SECTIONS) for (const c of s.ch.filter(c => c.all && want(c))) {
    console.log(`${c.name} (${c.id}) → ${c.all}`);
    const tail = c.id.slice(2), res = { at: Date.now() };
    res.lf = await both(`https://www.youtube.com/playlist?list=UULF${tail}`, 'videolar');
    res.lv = await both(`https://www.youtube.com/playlist?list=UULV${tail}`, 'jonli');
    res.sh = await both(`https://www.youtube.com/channel/${c.id}/shorts`, 'shorts');
    if (!res.lf.length && !res.sh.length) { console.log('   bo\'sh — fayl yozilmadi'); continue; }
    fs.writeFileSync(path.join(ROOT, c.all), JSON.stringify(res));
    console.log(`   videolar ${res.lf.length}, shorts ${res.sh.length}, jonli ${res.lv.length} — ${(fs.statSync(path.join(ROOT, c.all)).size / 1024).toFixed(0)} KB`);
  }
})();
