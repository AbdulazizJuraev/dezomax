/* ============================================================
   Kanalning HAMMA videolari → js/data-channels.js (admin «Kanallar» dagi kanal uchun)
   ------------------------------------------------------------
   DezoCloud «series» sinxronlashi faqat lotincha nomli playlistlarni oladi — ruscha kanallar va
   studiyalarning kliplari 0 bo'lib qolardi. Bu skript kanalning barcha yuklamalarini (UU… playlist,
   pay.dezomax.uz/api/yt/playlist) oladi:
     - har video — alohida yozuv (id = ytStableId(prefix:videoId), admin syncPlaylist bilan bir xil);
     - joylash taqiqlangan videolar (YouTube oEmbed 401/404) olinmaydi;
     - shortslar (≤60 s yoki #shorts) — kino emas: studiya kanalida js/data-shorts.js ga, boshqalarda tashlanadi;
     - kanal yozuvi kind:'playlist' ga o'tadi — admin «Yangilash» keyin yangi videolarni shu tartibda qo'shadi.
   Video yuklab olinmaydi — sayt YouTube pleyeri orqali ko'rsatadi.

   Ishlatish:  node tools/yt-channel-all.js universalpictures mrmomentinc ptactionofficial transformersrussian kinomurashki [--dry]
   Keyin:      node tools/bump-version.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { detectGenres } = require('../js/genre-detect.js');

const root = path.join(__dirname, '..');
const CH_PATH = path.join(root, 'js', 'data-channels.js');
const SHORTS_PATH = path.join(root, 'js', 'data-shorts.js');
const LIST_API = 'https://pay.dezomax.uz/api/yt/playlist?list=';
const DRY = process.argv.includes('--dry');

// kanal → qanday yozuv bo'ladi
const PLAN = {
  universalpictures: { type: 'film', franchise: 'universal', audio: 'en', asTrailer: true, shorts: true, country: { uz: 'AQSh', ru: 'США' } },
  mrmomentinc: { type: 'tahlil', franchise: 'tahlil', audio: 'ru' },
  ptactionofficial: { type: 'film', audio: 'ru' },
  kinomurashki: { type: 'film', audio: 'ru' },
  transformersrussian: { type: 'multfilm', audio: 'ru' },
};

const ytStableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const secs = l => { const p = String(l || '').split(':').map(Number); return p.some(isNaN) ? 0 : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); };
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const slugOf = s => String(s).toLowerCase().replace(/[а-яё]/g, c => TR[c] ?? '').replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'video';
const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;
const sentence = p => {
  // asosan KATTA harflar bilan yozilgan sarlavha («НЕВЕРОЯТНЫЙ ВАН ДАММ в боевике») — oddiy jumlaga
  const letters = p.replace(/[^\p{L}]/gu, ''), caps = letters.replace(/[^\p{Lu}]/gu, '').length;
  if (letters && caps / letters.length > .5) p = p.toLowerCase();
  return p.replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
};
// «🔥 ФИЛЬМ ПРО … 🚨 | Триллер 2026» → nom «Фильм про …», qo'shimcha «Триллер 2026»
function splitTitle(raw) {
  const parts = String(raw).replace(EMOJI, '').replace(/#[\p{L}\p{N}_]+/gu, '').split(/\s*\|\s*/).map(p => p.replace(/\s{2,}/g, ' ').replace(/^[\s\-–—:]+|[\s\-–—:]+$/g, '').trim()).filter(Boolean);
  return { name: sentence(parts[0] || String(raw).trim()), rest: parts.slice(1).join(' · ') };
}
async function pool(list, n, fn) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < list.length) { const k = i++; await fn(list[k], k); } })); }
async function embeddable(id) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`, { signal: AbortSignal.timeout(15000) });
      if (r.status === 200) return true;
      if (r.status === 401 || r.status === 403 || r.status === 404) return false;
    } catch {}
    await new Promise(r => setTimeout(r, 1500));
  }
  return true;   // tarmoq xatosi — videoni tashlab yubormaymiz (sayt pleyeri o'zi tekshiradi)
}
const part = (t, a, b) => JSON.parse(t.slice(t.indexOf(a) + a.length, t.indexOf(b)));
function buildChannelsFile(channels, items) {
  return `/* DezoMax — rasmiy YouTube kanallaridan seriallar va filmlar (admin → «Kanallar» yozadi, qo'lda o'zgartirmang).
   Videolar YouTube pleyeri orqali ko'rsatiladi — yuklab olinmaydi. Qismlar ixcham: eps [[youtubeId, daqiqa], ...]. */
var CHANNELS = /*CHANNELS*/${JSON.stringify(channels)}/*ENDCHANNELS*/;
var CHANNEL_MOVIES = /*CHDATA*/[
${items.map(m => JSON.stringify(m)).join(',\n')}
]/*ENDCHDATA*/;
if (typeof MOVIES !== 'undefined') for (var i = 0; i < CHANNEL_MOVIES.length; i++) MOVIES.push(CHANNEL_MOVIES[i]);
`;
}

(async () => {
  const keys = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const src = fs.readFileSync(CH_PATH, 'utf8');
  let channels = part(src, '/*CHANNELS*/', '/*ENDCHANNELS*/'), items = part(src, '/*CHDATA*/', '/*ENDCHDATA*/');
  const shSrc = fs.readFileSync(SHORTS_PATH, 'utf8');
  let shorts = part(shSrc, '/*SHORTS*/', '/*ENDSHORTS*/');
  const haveIds = new Set(items.map(m => m.id)), haveShort = new Set(shorts.map(s => s.id));
  const now = Date.now();
  for (const key of keys) {
    const ch = channels.find(c => c.key === key), plan = PLAN[key];
    if (!ch || !plan) { console.log(`✗ ${key}: kanal yoki reja yo‘q`); continue; }
    const playlist = 'UU' + ch.id.slice(2), prefix = ch.prefix || key.slice(0, 6);
    const list = (await (await fetch(LIST_API + playlist, { signal: AbortSignal.timeout(120000) })).json()).items || [];
    const isShort = v => secs(v.len) <= 60 || /#shorts?\b/i.test(v.title);
    const vids = list.filter(v => v.id && v.len && !isShort(v) && !/^\[(private|deleted)/i.test(v.title));
    const shs = list.filter(v => v.id && v.len && isShort(v));
    const fresh = vids.map((v, k) => ({ v, k, id: ytStableId(`${prefix}:${v.id}`) })).filter(x => !haveIds.has(x.id));
    const ok = new Map();
    let done = 0;
    await pool(fresh, 6, async x => { ok.set(x.v.id, await embeddable(x.v.id)); if (++done % 50 === 0) process.stdout.write(`\r  ${key}: ${done}/${fresh.length} tekshirildi`); });
    process.stdout.write('\n');
    const add = [];
    // bir xil nom («Трансформеры: Роботы под прикрытием | Финальная битва») — farqlash uchun keyingi qism qo'shiladi
    const nameCount = new Map();
    vids.forEach(v => { const n = splitTitle(v.title).name.toLowerCase(); nameCount.set(n, (nameCount.get(n) || 0) + 1); });
    for (const { v, k, id } of fresh) {
      if (!ok.get(v.id)) continue;
      let { name, rest } = splitTitle(v.title);
      if (nameCount.get(name.toLowerCase()) > 1 && rest) { const [first, ...more] = rest.split(' · '); name = `${name} — ${first}`; rest = more.join(' · '); }
      const url = `https://www.youtube.com/watch?v=${v.id}`;
      const m = {
        id, slug: `${prefix}-${slugOf(name)}`, type: plan.type, ...(plan.franchise ? { franchise: plan.franchise } : {}), audio: plan.audio,
        title: { uz: name, ru: name }, genres: [], ...(plan.country ? { country: plan.country } : {}), cast: [],
        desc: plan.asTrailer
          ? { uz: `«${name}»${rest ? ` — ${rest}` : ''}. ${ch.name} rasmiy YouTube kanalidan (ingliz tilida).`, ru: `«${name}»${rest ? ` — ${rest}` : ''}. Видео с официального YouTube-канала ${ch.name}.` }
          : { uz: `«${name}»${rest ? ` (${rest})` : ''} — ${ch.name} YouTube kanalidan, rus tilida.`, ru: `«${name}»${rest ? ` (${rest})` : ''} — видео с YouTube-канала ${ch.name}.` },
        colors: ['#1a2a4a', '#070a12'],
        poster: `https://i.ytimg.com/vi/${v.id}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
        trailer: plan.asTrailer ? url : '', video: plan.asTrailer ? '' : url, duration: Math.max(1, Math.round(secs(v.len) / 60)),
        source: { name: ch.name, url: ch.url }, featured: false, addedAt: now - k * 60000, ch: key,
      };
      // janr faqat nomda aniq ko'rinsa (detectGenres topolmasa «drama» qaytaradi — u olinmaydi)
      const g = (detectGenres({ title: `${name} ${rest}`, desc: '' }) || []).filter(x => x !== 'drama' || /драм|drama/i.test(`${name} ${rest}`));
      if (g.length) m.genres = g.slice(0, 3);
      if (plan.type === 'multfilm' && !m.genres.includes('animation')) m.genres.unshift('animation');
      add.push(m);
    }
    add.forEach(m => haveIds.add(m.id));
    items = items.concat(add);
    let shAdd = 0;
    if (plan.shorts) for (const v of shs) {
      if (haveShort.has(v.id) || !(await embeddable(v.id))) continue;
      const t = splitTitle(v.title);
      shorts.push({ id: v.id, t: t.name, ch: key, n: ch.name, u: ch.url, s: secs(v.len) }); haveShort.add(v.id); shAdd++;
    }
    const { agreement, ...base } = ch;
    channels = channels.map(c => c.key === key ? { ...base, ...(agreement ? { agreement } : {}), kind: 'playlist', playlist, prefix, type: plan.type,
      franchise: plan.franchise || '', audio: plan.audio, ...(plan.asTrailer ? { asTrailer: true } : {}), ...(plan.shorts ? { shortsAll: true } : {}),
      updatedAt: now, count: items.filter(m => m.ch === key).length } : c);
    console.log(`✓ ${ch.name}: ${list.length} ta yuklama → +${add.length} yozuv (${fresh.length - add.length} tasini joylash taqiqlangan), +${shAdd} shorts`);
  }
  if (DRY) { console.log('--dry: yozilmadi'); return; }
  fs.writeFileSync(CH_PATH, buildChannelsFile(channels, items));
  fs.writeFileSync(SHORTS_PATH, shSrc.slice(0, shSrc.indexOf('/*SHORTS*/') + 10) + `[\n${shorts.map(x => JSON.stringify(x)).join(',\n')}\n]` + shSrc.slice(shSrc.indexOf('/*ENDSHORTS*/')));
  console.log(`Yozildi: ${items.length} ta kanal yozuvi, ${shorts.length} ta shorts`);
})().catch(e => { console.error(e); process.exit(1); });
