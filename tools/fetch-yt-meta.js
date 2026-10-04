/* ============================================================
   Ruxsat berilgan YouTube kontenti → js/data-channels.js
   ------------------------------------------------------------
   1) Playlist kanallari (CHANNELS → kind: 'playlist'): kanal egasi ruxsat bergan playlist videolari.
      Hozir: FarZidGuy — «Kino Tahlil» (2026-10-04 egasi ruxsat berdi). Bo'lim: franchise/type 'tahlil'.
   2) Rasmiy o'zbek kanallari (UzbekFilmsHD, Uzbekcinema): kino/serial ma'lumotlari kanal egasining
      o'zi video ostiga yozgan tavsifdan — mazmun, yil, janr, rejissyor, ssenariy, rollarda (meta: 1).
   Videolar yuklab olinmaydi — sayt YouTube pleyeri orqali ko'rsatadi (ko'rishlar kanal egasida).
   O'qish — server/server.js dagi ytPlaylist / ytMeta (admin ham shu serverdan foydalanadi).

   Ishlatish:  node tools/fetch-yt-meta.js            (hammasi)
               node tools/fetch-yt-meta.js playlists  (faqat playlistlar)
               node tools/fetch-yt-meta.js meta       (faqat ma'lumot to'ldirish)
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { ytPlaylist, ytMeta, ytShorts } = require('../server/server.js');

const root = path.join(__dirname, '..');
const CH_PATH = path.join(root, 'js', 'data-channels.js');

// ruxsat berilgan playlistlar (egasining roziligi bilan)
const PLAYLISTS = [
  { key: 'farzidguy', id: 'UC40y8Eqvoans8S-n8bBqoOw', name: 'FarZidGuy', url: 'https://www.youtube.com/@FarZidGuy',
    playlist: 'UU40y8Eqvoans8S-n8bBqoOw', shorts: true, franchise: 'tahlil', type: 'tahlil', prefix: 'fz',
    permission: 'Kanal egasi videolari va shortslarini saytda ko‘rsatishga ruxsat bergan (2026-10-04)' },
];
const META_CHANNELS = ['rizanova', 'uzbekkinoofficial'];

const stableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const slug = s => s.toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'video';
const minutes = len => { const p = String(len).split(':').map(Number); if (!p.length || p.some(isNaN)) return 0; const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); return Math.max(1, Math.round(s / 60)); };
const seconds = len => { const p = String(len).split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); };
const uzQuotes = s => s.replace(/([oOgG])['‘’`ʻ]/g, '$1‘').replace(/['`ʻ]/g, '’');

/* «TEMIR ODAM 2 (2010) | TO'LIQ TAHLIL | YASHIRIN BELGILAR» → «Temir odam 2 (2010) — To‘liq tahlil — Yashirin belgilar» */
function videoTitle(raw) {
  const parts = String(raw).replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').split(/\s*\|\s*/).map(p => p.replace(/\s{2,}/g, ' ').trim())
    .filter(p => p && !/^o['‘’`ʻ]?zbek tilida$/i.test(p));      // «O‘zbek tilida» — sayt o'zi o'zbekcha
  const fix = p => {
    const letters = p.replace(/[^\p{L}]/gu, '');
    if (letters && letters === letters.toUpperCase()) p = p.toLowerCase();
    p = p.replace(/(^|[.!?:]\s+|\s[-–—]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
    return uzQuotes(p);
  };
  return parts.map(fix).join(' — ');
}

/* Faqat kinoga oid shortslar (2026-10-04 foydalanuvchi so'rovi): nomi yoki heshteglarida kino/film/qahramon bo'lsa.
   Memlar, «Diqqat savol», belgisiz «To'liq video kanalda» — qo'shilmaydi. js/admin.js da ham xuddi shu ro'yxat. */
const MOVIE_RX = /marvel|qasoskor|avenger|transformer|avtobot|autobot|deseptikon|decepticon|optimus|praym|prime|megatron|bumblebee|bambilbi|drift|lockdown|shockwave|starscream|wheeljack|devastator|crosshairs|kogman|cogman|sentinal|sentinel|iron ?hide|wrekker|\bdc\b|#dc|supermen|superman|betmen|batman|flash|wonder ?woman|temir odam|iron ?man|#thor|\btor\b|torga|loki|wanda|vijin|vision|altron|ultron|kang\b|odin|tanos|thanos|selestial|celestial|ikaris|cheksizlik tosh|kuch tosh|yulduzlar lordi|spider|o.rgimchak|wednesday|uenzdey|deyneris|daenerys|taxtlar|\bfilm|kino|premyera|oskar|oscar|aktyor|multfilm|makvin|mcqueen|jekson bo.ron|mortal kombat|call of duty|dedpul|deadpool|momaqaldiroq|thunderbolt|tay ?lung|kung ?fu|afsonaviy uchlik|adolat liga|justice league|qizil.?jodugar|venom|joker|star ?wars|yulduzlar jang|harry ?pot|garri ?pot|bolg.a|mjolnir/i;

/* Shorts nomi: heshteglar va emojilarsiz, KATTA HARFLAR — oddiy («ENG KUCHLI BOLG'A #marvel» → «Eng kuchli bolg‘a») */
function shortTitle(raw) {
  let t = String(raw).replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
  // «To'liq video YouTube kanalda #qasoskorlar» — nomi hech narsa demaydi: heshtegdan mavzu olinadi («Qasoskorlar»)
  if (/^to.?.?liq video/i.test(t)) {
    const tag = (String(raw).match(/#[\p{L}\p{N}_]+/gu) || []).map(h => h.slice(1)).find(h => !/^(farzidguy|shorts?|mem|meme|battle|kimkuchli)$/i.test(h));
    if (tag) t = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  }
  const letters = t.replace(/[^\p{L}]/gu, '');
  if (letters && letters === letters.toUpperCase()) t = t.toLowerCase();
  t = t.replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/[\s|\-–—:]+$/, '');   // oxiridagi «|», «-»
  return uzQuotes(t || String(raw).trim());
}

async function pool(list, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < list.length) { const k = i++; await fn(list[k], k); } }));
}

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
  const want = process.argv[2] || 'all';
  const text = fs.readFileSync(CH_PATH, 'utf8');
  const part = (a, b) => JSON.parse(text.slice(text.indexOf(a) + a.length, text.indexOf(b)));
  let channels = part('/*CHANNELS*/', '/*ENDCHANNELS*/');
  const items = part('/*CHDATA*/', '/*ENDCHDATA*/');
  const before = items.length;
  const byId = new Map(items.map((m, i) => [m.id, i]));

  /* 1) playlistlar — kanal yuklamalari (UU…) kanaldagi tartibda: uzunlari → bo'lim, ≤ 3 daqiqa → Shorts (js/data-shorts.js) */
  const shortsAll = [];
  if (want === 'all' || want === 'playlists') for (const pl of PLAYLISTS) {
    const r = await ytPlaylist(pl.playlist);
    if (r.error) { console.warn(pl.name, r.error); continue; }
    const base = Date.now();
    // haqiqiy shortslar — kanalning «Shorts» bo'limidan (qisqa oddiy videolar shorts emas)
    const sh = pl.shorts ? await ytShorts(pl.id) : { items: [] };
    if (sh.error) { console.warn(pl.name, 'shorts:', sh.error); continue; }
    const shortIds = new Set(sh.items.map(x => x.id)), lenOf = new Map(r.items.map(v => [v.id, v.len]));
    const longs = [], shorts = sh.items.filter(v => MOVIE_RX.test(v.title)).map(v => ({ v: { ...v, len: lenOf.get(v.id) || '' } }));
    r.items.forEach((v, k) => { if (v.len && !shortIds.has(v.id)) longs.push({ v, k }); });
    // avval bo'limga tushib qolgan shortslar olib tashlanadi
    for (let i = items.length - 1; i >= 0; i--) if (items[i].ch === pl.key && shortIds.has(String(items[i].video).split('v=')[1])) items.splice(i, 1);
    byId.clear(); items.forEach((m, i) => byId.set(m.id, i));
    console.log(`${pl.name}: ${r.items.length} ta yuklama — ${longs.length} ta video, ${shorts.length} ta shorts`);
    await pool(longs, 6, async ({ v, k }) => {
      const id = stableId(`${pl.prefix}:${v.id}`);
      const old = byId.has(id) ? items[byId.get(id)] : null;
      const t = videoTitle(v.title);
      // eski videolarda HD muqova yo'q (404 + kulrang rasm) — hqdefault har doim bor
      const hd = old ? /hq720/.test(old.poster) : await fetch(`https://i.ytimg.com/vi/${v.id}/hq720.jpg`, { method: 'HEAD' }).then(x => x.status !== 404).catch(() => true);
      let meta = {};
      if (!old && process.env.META) { try { meta = await ytMeta(v.id); } catch {} }   // YouTube tez cheklaydi — faqat META=1 bilan
      const summary = meta.summary && meta.summary.length > 30 ? uzQuotes(meta.summary) : '';
      const it = {
        id, slug: `${pl.prefix}-${slug(t)}`, type: pl.type, franchise: pl.franchise, audio: 'uz',
        title: { uz: t, ru: t }, genres: [], ...(meta.year ? { year: meta.year } : {}),
        country: { uz: 'O‘zbekiston', ru: 'Узбекистан' }, cast: [],
        desc: { uz: summary || `«${t}» — ${pl.name} kanalidagi video, o‘zbek tilida.`, ru: `«${t}» — видео на узбекском языке с канала ${pl.name}.` },
        colors: ['#1a2a4a', '#070a12'],
        poster: `https://i.ytimg.com/vi/${v.id}/${hd ? 'hq720' : 'hqdefault'}.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${v.id}/${hd ? 'maxresdefault' : 'sddefault'}.jpg`,
        trailer: '', video: `https://www.youtube.com/watch?v=${v.id}`, duration: minutes(v.len) || meta.duration || 0,
        source: { name: pl.name, url: pl.url }, featured: false,
        ...(old ? { desc: old.desc, ...(old.year ? { year: old.year } : {}) } : {}),
        addedAt: base - k * 1000,             // tartib — kanaldagidek (yangisi birinchi)
        meta: 1, ch: pl.key,
      };
      if (old) items[byId.get(id)] = it; else { items.push(it); byId.set(id, items.length - 1); }
    });
    for (const { v } of shorts) shortsAll.push({ id: v.id, t: shortTitle(v.title), ch: pl.key, n: pl.name, u: pl.url, s: v.len ? seconds(v.len) : 0 });
    const entry = { key: pl.key, id: pl.id, name: pl.name, url: pl.url, kind: 'playlist', playlist: pl.playlist, shorts: !!pl.shorts,
      franchise: pl.franchise, type: pl.type, prefix: pl.prefix, permission: pl.permission, updatedAt: Date.now(),
      count: items.filter(m => m.ch === pl.key).length };
    channels = channels.some(c => c.key === pl.key) ? channels.map(c => c.key === pl.key ? { ...c, ...entry } : c) : [...channels, entry];
  }
  if (shortsAll.length) {
    fs.writeFileSync(path.join(root, 'js', 'data-shorts.js'),
      `/* DezoMax Shorts — ruxsat berilgan kanallarning qisqa videolari (tools/fetch-yt-meta.js, admin → «Kanallar» yozadi).\n   YouTube pleyeri orqali ko'rsatiladi (shorts.html). id — YouTube video ID, t — nomi, s — soniya. */\nvar SHORTS = /*SHORTS*/[\n${shortsAll.map(x => JSON.stringify(x)).join(',\n')}\n]/*ENDSHORTS*/;\n`);
    console.log(`js/data-shorts.js — ${shortsAll.length} ta shorts`);
  }

  /* 2) rasmiy o'zbek kanallari — tavsifdan ma'lumot */
  if (want === 'all' || want === 'meta') {
    const todo = items.filter(m => META_CHANNELS.includes(m.ch) && !m.meta);
    console.log(`Ma'lumot to'ldirish: ${todo.length} ta kino/serial`);
    let ok = 0;
    await pool(todo, 2, async m => {
      const vid = (m.eps && m.eps[0] && m.eps[0][0]) || (String(m.video).match(/[?&]v=([\w-]{11})/) || [])[1];
      if (!vid) return;
      let meta;
      try { meta = await ytMeta(vid); } catch { return; }
      if (!meta || meta.error) return;
      const i = byId.get(m.id), it = { ...items[i] };
      const generic = !it.desc || /kanalidagi|kanalidan/.test(it.desc.uz || '');
      if (meta.summary && meta.summary.length > 40 && generic) it.desc = { uz: uzQuotes(meta.summary), ru: it.desc?.ru || it.desc?.uz || '' };
      if (!it.year && meta.year) it.year = meta.year;
      if (meta.genres.length && (!it.genres || !it.genres.length || (it.genres.length === 1 && it.genres[0] === 'drama'))) it.genres = meta.genres;
      if (meta.cast.length && !(it.cast || []).length) it.cast = meta.cast.map(uzQuotes);
      if (meta.director && !it.director) it.director = uzQuotes(meta.director);
      if (meta.writer && !it.writer) it.writer = uzQuotes(meta.writer);
      it.meta = 1;
      items[i] = it; ok++;
      if (ok % 50 === 0) process.stdout.write(`${ok}…`);
    });
    console.log(`\n${ok} ta to'ldirildi`);
  }

  fs.writeFileSync(CH_PATH, buildChannelsFile(channels, items));
  console.log(`js/data-channels.js: ${before} → ${items.length} ta yozuv`);
})();
