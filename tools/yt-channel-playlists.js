/* ============================================================
   Kanal videolarini PLAYLIST bo'yicha joylash (js/data-channels.js)
   ------------------------------------------------------------
   tools/yt-channel-all.js har videoni alohida yozuv qilib qo'shadi. Bu skript kanalning playlistlariga qarab:
     serials — har playlist bitta serial (eps: [[youtubeId, daqiqa], ...]); videolar takrorlanmaydi:
               playlistlar kichigidan kattasiga olinadi, kattasida yangi videolar 30% dan kam bo'lsa — o'tkaziladi;
               kanalning hamma videosi yotgan «yangiliklar» playlisti olinmaydi.
               Serialga kirgan alohida yozuvlar olib tashlanadi (o'sha video endi serial qismi).
     genres  — janr playlistlari (Боевики, Ужасы…) → filmlarning janri.
   Faqat kanalning O'ZI yuklagan videolar olinadi (playlistga boshqa kanallardan qo'shilganlari — yo'q).
   Playlistlar ro'yxati — kanalning /playlists sahifasidan, videolar — pay.dezomax.uz/api/yt/playlist.

   Ishlatish:  node tools/yt-channel-playlists.js transformersrussian kinomurashki [--dry]
   Keyin:      node tools/bump-version.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const CH_PATH = path.join(root, 'js', 'data-channels.js');
const LIST_API = 'https://pay.dezomax.uz/api/yt/playlist?list=';
const DRY = process.argv.includes('--dry');

const PLAN = {
  transformersrussian: {
    // bitta multfilm — bitta karta: mavsumlar va to'plamlar uning ichida bo'lim (eps[i][2]), qismlar yoyilib yotmaydi
    mode: 'shows', genres: ['animation', 'adventure'],
    shows: [
      { title: 'Трансформеры: Боты-спасатели', match: /боты.?спасател|rescue bots/i,
        sections: [[/Боты Спасатели: Season (\d+)/i, m => +m[1]], [/Сборники.*Ботов Спасателей/i, 'sb']] },
      { title: 'Трансформеры Прайм', match: /трансформеры\s+прайм|transformers prime/i,
        sections: [[/^Мультфильм Трансформеры Прайм$/i, 'ep'], [/Сборники.*Прайм/i, 'sb']] },
      { title: 'Трансформеры: Роботы под прикрытием', match: /под прикрытием|robots in disguise/i,
        sections: [[/Роботы под прикрытием/i, 'ep']] },
    ],
  },
  kinomurashki: {
    mode: 'genres',
    map: { Комедии: 'comedy', Криминал: 'crime', Вестерны: 'adventure', Драмы: 'drama', Ужасы: 'horror', Фантастика: 'scifi', Детективы: 'detective', Триллеры: 'thriller', Боевики: 'action' },
  },
};

const ytStableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const secs_ = l => { const p = String(l || '').split(':').map(Number); return p.some(isNaN) ? 0 : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); };
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const slugOf = s => String(s).toLowerCase().replace(/[а-яё]/g, c => TR[c] ?? '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'serial';
const vidOf = m => String(m.video || m.trailer || '').match(/[?&]v=([\w-]{11})/)?.[1];
const part = (t, a, b) => JSON.parse(t.slice(t.indexOf(a) + a.length, t.indexOf(b)));
const sleep = ms => new Promise(r => setTimeout(r, ms));
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

// kanalning /playlists sahifasi (birinchi sahifa): [{ id, title }]
async function channelPlaylists(url) {
  const html = await (await fetch(url.replace(/\/+$/, '') + '/playlists?hl=ru', { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'ru' }, signal: AbortSignal.timeout(20000) })).text();
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!m) return [];
  const out = new Map();
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    const l = o.lockupViewModel;
    if (l && l.contentType === 'LOCKUP_CONTENT_TYPE_PLAYLIST') { out.set(l.contentId, { id: l.contentId, title: l.metadata?.lockupMetadataViewModel?.title?.content || '' }); return; }
    for (const k in o) walk(o[k]);
  })(JSON.parse(m[1]));
  return [...out.values()];
}
async function playlistItems(id) {
  for (let i = 0; i < 3; i++) {
    try { const j = await (await fetch(LIST_API + id, { signal: AbortSignal.timeout(60000) })).json(); if (j.items && j.items.length) return j.items; } catch {}
    await sleep(1500);
  }
  return [];
}
// «3/12» (mavsum/qism) yoki «12 серия» bo'lsa — shu tartibda; aks holda playlist tartibi
function ordered(vids) {
  const key = v => { const a = v.title.match(/(\d+)\s*\/\s*(\d+)/); if (a) return +a[1] * 1000 + +a[2]; const b = v.title.match(/(\d+)\s*(?:серия|эпизод)/i); return b ? +b[1] : null; };
  const ks = vids.map(key);
  if (ks.filter(k => k != null).length >= vids.length * .8) return vids.map((v, i) => [v, ks[i] ?? 1e9 + i]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  return vids;
}
const cleanName = t => t.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\([^)]*[A-Za-z][^)]*\)/g, '').replace(/^\s*(мультик(и)?|мультфильм(ы)?)\s+/i, '').replace(/\s*-\s*все серии/i, '').replace(/\s{2,}/g, ' ').trim();

(async () => {
  const keys = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const src = fs.readFileSync(CH_PATH, 'utf8');
  const channels = part(src, '/*CHANNELS*/', '/*ENDCHANNELS*/');
  let items = part(src, '/*CHDATA*/', '/*ENDCHDATA*/');
  for (const key of keys) {
    const ch = channels.find(c => c.key === key), plan = PLAN[key];
    if (!ch || !plan) { console.log(`✗ ${key}: kanal yoki reja yo‘q`); continue; }
    const prefix = ch.prefix || key.slice(0, 6);
    const uploads = new Map(((await (await fetch(LIST_API + 'UU' + ch.id.slice(2), { signal: AbortSignal.timeout(120000) })).json()).items || []).map(v => [v.id, v]));
    const pls = await channelPlaylists(ch.url);
    const data = [];
    for (const p of pls) { const v = (await playlistItems(p.id)).filter(x => uploads.has(x.id) && secs_(x.len) > 60); data.push({ ...p, vids: v }); }
    console.log(`${ch.name}: ${pls.length} ta playlist, ${uploads.size} ta yuklama`);

    if (plan.mode === 'genres') {
      const gOf = new Map();
      for (const p of data) {
        const g = Object.entries(plan.map).find(([w]) => p.title.toLowerCase().startsWith(w.toLowerCase()))?.[1];
        if (!g) continue;
        p.vids.forEach(v => { const s = gOf.get(v.id) || new Set(); s.add(g); gOf.set(v.id, s); });
        console.log(`  ${p.title}: ${p.vids.length} ta film → ${g}`);
      }
      let n = 0;
      items = items.map(m => { if (m.ch !== key) return m; const s = gOf.get(vidOf(m)); if (!s) return m; n++; return { ...m, genres: [...s].slice(0, 3) }; });
      console.log(`✓ ${ch.name}: ${n} ta filmga playlist janri qo‘yildi`);
      continue;
    }

    if (plan.mode === 'shows') {
      const used = new Set(), made = [];
      const SEC_ORDER = s => typeof s === 'number' ? s : { ep: 100, sb: 200, etc: 300 }[s] ?? 400;
      for (const show of plan.shows) {
        const secs = [];
        for (const [rx, sec] of show.sections) for (const p of data) {
          const m = p.title.match(rx); if (!m) continue;
          const key = typeof sec === 'function' ? sec(m) : sec;
          const vids = p.vids.filter(v => !used.has(v.id));
          vids.forEach(v => used.add(v.id));
          if (vids.length) secs.push({ key, vids: ordered(vids) });
        }
        // playlistga kirmagan, lekin nomidan shu multfilmniki — «Boshqa qismlar»
        const etc = secs.length ? [...uploads.values()].filter(v => !used.has(v.id) && show.match.test(v.title) && secs_(v.len) > 60) : [];
        etc.forEach(v => used.add(v.id));
        if (etc.length) secs.push({ key: 'etc', vids: etc.reverse() });
        if (!secs.length) continue;
        secs.sort((a, b) => SEC_ORDER(a.key) - SEC_ORDER(b.key));
        const single = secs.length === 1;
        const eps = secs.flatMap(x => x.vids.map(v => single ? [v.id, Math.max(1, Math.round(secs_(v.len) / 60))] : [v.id, Math.max(1, Math.round(secs_(v.len) / 60)), x.key]));
        const first = eps[0][0], nm = show.title;
        const nSeasons = secs.filter(x => typeof x.key === 'number').length;
        made.push({
          id: ytStableId(`${prefix}:show:${nm}`), slug: `${prefix}-${slugOf(nm)}`, type: 'serial', audio: ch.audio || 'ru',
          title: { uz: nm, ru: nm }, genres: plan.genres || [], cast: [], ...(nSeasons > 1 ? { seasons: nSeasons } : {}),
          desc: { uz: `«${nm}» — ${ch.name} rasmiy YouTube kanalidan, ${eps.length} qism${nSeasons > 1 ? `, ${nSeasons} mavsum` : ''}, rus tilida.`, ru: `«${nm}» — с официального YouTube-канала ${ch.name}, серий: ${eps.length}${nSeasons > 1 ? `, сезонов: ${nSeasons}` : ''}.` },
          colors: ['#1a2a4a', '#070a12'],
          poster: `https://i.ytimg.com/vi/${first}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${first}/maxresdefault.jpg`,
          trailer: '', video: `https://www.youtube.com/watch?v=${first}`, source: { name: ch.name, url: ch.url }, featured: false,
          eps, show: 1, addedAt: Date.now(), ch: key,
        });
        console.log(`  + ${nm}: ${eps.length} qism — ${secs.map(x => `${x.key}:${x.vids.length}`).join(', ')}`);
      }
      const before = items.filter(m => m.ch === key).length;
      // alohida yozuvlar va avvalgi playlist-seriallar (playlist/show belgili) — yangi kartalar bilan almashtiriladi
      items = items.filter(m => !(m.ch === key && (m.playlist || m.show || (!m.eps && used.has(vidOf(m)))))).concat(made);
      const after = items.filter(m => m.ch === key);
      console.log(`✓ ${ch.name}: ${before} ta yozuv → ${made.length} ta karta + ${after.length - made.length} ta alohida video (jami ${after.reduce((s, m) => s + (m.eps ? m.eps.length : 1), 0)} video)`);
      Object.assign(ch, { count: after.length });
      continue;
    }

    // serials
    const used = new Set(), made = [];
    const cand = data.filter(p => p.vids.length >= 2 && !(plan.skip && plan.skip.test(p.title)) && p.vids.length < uploads.size * .8).sort((a, b) => a.vids.length - b.vids.length);
    for (const p of cand) {
      const fresh = p.vids.filter(v => !used.has(v.id));
      if (fresh.length < 2 || fresh.length < p.vids.length * .3) { console.log(`  – ${p.title}: o‘tkazildi (${fresh.length}/${p.vids.length} yangi)`); continue; }
      fresh.forEach(v => used.add(v.id));
      const nm = plan.names.map(([rx, f]) => { const m = p.title.match(rx); return m && f(m); }).find(Boolean) || cleanName(p.title);
      const eps = ordered(fresh), first = eps[0].id;
      made.push({
        id: ytStableId(`${prefix}:${p.id}`), slug: `${prefix}-${slugOf(nm)}`, type: 'serial', audio: ch.audio || 'ru',
        title: { uz: nm, ru: nm }, genres: plan.genres || [], cast: [],
        desc: { uz: `«${nm}» — ${ch.name} rasmiy YouTube kanalidagi playlist, ${eps.length} qism, rus tilida.`, ru: `«${nm}» — плейлист с официального YouTube-канала ${ch.name}, серий: ${eps.length}.` },
        colors: ['#1a2a4a', '#070a12'],
        poster: `https://i.ytimg.com/vi/${first}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${first}/maxresdefault.jpg`,
        trailer: '', video: `https://www.youtube.com/watch?v=${first}`, source: { name: ch.name, url: ch.url }, featured: false,
        eps: eps.map(v => [v.id, Math.max(1, Math.round(secs_(v.len) / 60))]), playlist: p.id, addedAt: Date.now(), ch: key,
      });
      console.log(`  + ${nm}: ${eps.length} qism`);
    }
    const ids = new Set(made.map(m => m.id));
    const before = items.filter(m => m.ch === key).length;
    // serial qismiga aylangan alohida yozuvlar olib tashlanadi; eski serial yozuvlari yangisi bilan almashtiriladi
    items = items.filter(m => !(m.ch === key && ((!m.eps && used.has(vidOf(m))) || ids.has(m.id)))).concat(made);
    const after = items.filter(m => m.ch === key);
    const nVid = after.reduce((s, m) => s + (m.eps ? m.eps.length : 1), 0);
    console.log(`✓ ${ch.name}: ${before} ta yozuv → ${made.length} ta serial + ${after.length - made.length} ta alohida video (jami ${nVid} video)`);
    Object.assign(ch, { count: after.length });
  }
  if (DRY) { console.log('--dry: yozilmadi'); return; }
  fs.writeFileSync(CH_PATH, buildChannelsFile(channels, items));
  console.log('Yozildi.');
})().catch(e => { console.error(e); process.exit(1); });
