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
const { ytPlaylist, ytMeta } = require('../server/server.js');

const root = path.join(__dirname, '..');
const CH_PATH = path.join(root, 'js', 'data-channels.js');

// ruxsat berilgan playlistlar (egasining roziligi bilan)
const PLAYLISTS = [
  { key: 'farzidguy', id: 'UC40y8Eqvoans8S-n8bBqoOw', name: 'FarZidGuy', url: 'https://www.youtube.com/@FarZidGuy',
    playlist: 'PLEBV6zj8ajJi1bQXV4NyUSdDKUeXv9RnF', franchise: 'tahlil', type: 'tahlil', prefix: 'fz',
    permission: 'Kanal egasi «Kino Tahlil» videolarini saytda ko‘rsatishga ruxsat bergan (2026-10-04)' },
];
const META_CHANNELS = ['rizanova', 'uzbekkinoofficial'];

const stableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const slug = s => s.toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'video';
const minutes = len => { const p = String(len).split(':').map(Number); if (!p.length || p.some(isNaN)) return 0; const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); return Math.max(1, Math.round(s / 60)); };
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

  /* 1) playlistlar */
  if (want === 'all' || want === 'playlists') for (const pl of PLAYLISTS) {
    const r = await ytPlaylist(pl.playlist);
    if (r.error) { console.warn(pl.name, r.error); continue; }
    console.log(`${pl.name}: ${r.items.length} ta video — ma'lumot o'qilmoqda…`);
    const now = Date.now();
    await pool(r.items, 4, async (v, k) => {
      const id = stableId(`${pl.prefix}:${v.id}`);
      if (byId.has(id) && items[byId.get(id)].meta) return;               // allaqachon bor
      let meta = {};
      try { meta = await ytMeta(v.id); } catch {}
      const t = videoTitle(v.title);
      const summary = meta.summary && meta.summary.length > 30 ? uzQuotes(meta.summary) : '';
      const it = {
        id, slug: `${pl.prefix}-${slug(t)}`, type: pl.type, franchise: pl.franchise, audio: 'uz',
        title: { uz: t, ru: t }, genres: [], ...(meta.year ? { year: meta.year } : {}),
        country: { uz: 'O‘zbekiston', ru: 'Узбекистан' }, cast: [],
        desc: { uz: summary || `«${t}» — ${pl.name} kanalidagi kino tahlili, o‘zbek tilida.`, ru: `«${t}» — разбор фильма на узбекском языке с канала ${pl.name}.` },
        colors: ['#1a2a4a', '#070a12'],
        poster: `https://i.ytimg.com/vi/${v.id}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
        trailer: '', video: `https://www.youtube.com/watch?v=${v.id}`, duration: minutes(v.len) || meta.duration || 0,
        source: { name: pl.name, url: pl.url }, featured: false,
        addedAt: meta.published ? Date.parse(meta.published) : now - k * 60000,   // tartib — playlistdagidek (yangisi oldin)
        meta: 1, ch: pl.key,
      };
      if (byId.has(id)) items[byId.get(id)] = it; else { items.push(it); byId.set(id, items.length - 1); }
    });
    const entry = { key: pl.key, id: pl.id, name: pl.name, url: pl.url, kind: 'playlist', playlist: pl.playlist, franchise: pl.franchise,
      type: pl.type, prefix: pl.prefix, permission: pl.permission, updatedAt: Date.now(), count: items.filter(m => m.ch === pl.key).length };
    channels = channels.some(c => c.key === pl.key) ? channels.map(c => c.key === pl.key ? { ...c, ...entry } : c) : [...channels, entry];
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
