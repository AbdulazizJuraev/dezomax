/* ============================================================
   Kinostudiyalarning rasmiy treylerlari: js/data-channels.js ga yozadi
   ------------------------------------------------------------
   Har bir studiya (js/common.js → STUDIOS) uchun uning rasmiy (✓ tasdiqlangan)
   YouTube kanalining so'nggi yuklamalaridan «Official Trailer»lar olinadi —
   har film uchun eng yangisi. Faqat TREYLER: to'liq kino qo'shilmaydi, video
   yuklab olinmaydi, sayt YouTube pleyeri orqali ko'rsatadi.
   Wikidata'dan: ruscha nomi, yili, rejissyor, aktyorlar, janrlar — sahifa tavsifi
   va «Boshqa nomlari» (teglar) uchun: odamlar Google/Yandex'da «Элио трейлер»,
   «Elio treyler» deb qidiradi.

   Ishlatish:  node tools/fetch-studio-trailers.js            (Marvel'dan boshqa hammasi)
               node tools/fetch-studio-trailers.js pixar dc   (faqat shular)
   Keyin:      node tools/bump-version.js  (sahifalar, sitemap)
   Admin → Kanallar → «Yangilash» ham shu kanallarni yangilaydi (qo'shimcha ma'lumotlar saqlanadi).
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const CH_PATH = path.join(root, 'js', 'data-channels.js');

// STUDIOS — js/common.js dan (bitta manba)
const commonSrc = fs.readFileSync(path.join(root, 'js', 'common.js'), 'utf8');
const studiosSrc = commonSrc.slice(commonSrc.indexOf('const STUDIOS'), commonSrc.indexOf('];', commonSrc.indexOf('const STUDIOS')) + 2);
const sctx = {}; vm.createContext(sctx);
vm.runInContext(studiosSrc.replace(/^const /, 'var '), sctx);
const STUDIOS = sctx.STUDIOS;

// studiya bo'yicha: qisqa prefiks, turi, janr (Wikidata'da topilmasa), tavsifdagi so'z
const META = {
  dc:         { prefix: 'dc', what: { uz: 'DC Studios filmi', ru: 'фильм DC Studios' }, genres: ['action', 'adventure', 'fantasy'] },
  pixar:      { prefix: 'px', type: 'multfilm', what: { uz: 'Pixar multfilmi', ru: 'мультфильм Pixar' }, genres: ['animation', 'family', 'adventure'] },
  disney:     { prefix: 'ds', what: { uz: 'Disney filmi', ru: 'фильм Disney' }, genres: ['family', 'adventure', 'fantasy'] },
  warner:     { prefix: 'wb', what: { uz: 'Warner Bros. filmi', ru: 'фильм Warner Bros.' }, genres: [] },
  universal:  { prefix: 'un', what: { uz: 'Universal Pictures filmi', ru: 'фильм Universal Pictures' }, genres: [] },
  sony:       { prefix: 'sp', what: { uz: 'Sony Pictures filmi', ru: 'фильм Sony Pictures' }, genres: [] },
  lucasfilm:  { prefix: 'sw', what: { uz: 'Lucasfilm (Star Wars)', ru: 'Lucasfilm (Звёздные войны)' }, genres: ['scifi', 'adventure', 'action'] },
  // DreamWorks'ning AQSh treylerlari Universal Pictures kanalida — faqat ishlab chiqaruvchisi DreamWorks bo'lganlari
  dreamworks: { prefix: 'dw', type: 'multfilm', company: /dreamworks animation/i, pages: 25, what: { uz: 'DreamWorks multfilmi', ru: 'мультфильм DreamWorks' }, genres: ['animation', 'family', 'comedy'] },
  paramount:  { prefix: 'pm', what: { uz: 'Paramount Pictures filmi', ru: 'фильм Paramount Pictures' }, genres: [] },
};

// ── YouTube (DEZO CLOUD src/routes/youtube.js bilan bir xil o'qish) ──
const YT_HEAD = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  Cookie: 'SOCS=CAI; CONSENT=YES+1',
};
function pageJson(html, name) {
  const i = html.indexOf(name + ' = ');
  if (i < 0) return null;
  const s = i + name.length + 3;
  for (const end of [';</script>', ';var ']) {
    const e = html.indexOf(end, s);
    if (e > 0) { try { return JSON.parse(html.slice(s, e)); } catch { /* keyingisi */ } }
  }
  return null;
}
const innertube = html => ({
  key: html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1],
  ver: html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1],
});
async function youtubei(kind, cfg, body) {
  const r = await fetch(`https://www.youtube.com/youtubei/v1/${kind}?key=${cfg.key}`, {
    method: 'POST',
    headers: { ...YT_HEAD, 'Content-Type': 'application/json' },
    body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion: cfg.ver, hl: 'en' } }, ...body }),
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error('YouTube ' + r.status);
  return r.json();
}
async function ytPage(url) {
  const html = await (await fetch(url, { headers: YT_HEAD, signal: AbortSignal.timeout(20000) })).text();
  return { html, data: pageJson(html, 'ytInitialData'), cfg: innertube(html) };
}
const tokenOf = d => JSON.stringify(d || {}).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1] || null;
function lockups(d) {
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.lockupViewModel) {
      const l = o.lockupViewModel;
      out.push({ id: l.contentId, title: l.metadata?.lockupMetadataViewModel?.title?.content || '' });
      return;
    }
    if (o.playlistVideoRenderer) {
      const r = o.playlistVideoRenderer;
      out.push({ id: r.videoId, title: r.title?.runs?.[0]?.text || r.title?.simpleText || '' });
      return;
    }
    for (const k in o) walk(o[k]);
  })(d);
  return out;
}
async function allItems(url, maxPages) {
  const p = await ytPage(url);
  const items = lockups(p.data);
  let tok = tokenOf(p.data), n = 0;
  while (tok && n++ < maxPages && p.cfg.key) {
    const j = await youtubei('browse', p.cfg, { continuation: tok });
    const add = lockups(j);
    if (!add.length) break;
    items.push(...add);
    tok = tokenOf(j);
  }
  const seen = new Set();
  return items.filter(x => x.id && !seen.has(x.id) && seen.add(x.id));
}
async function channelInfo(url) {
  const p = await ytPage(url);
  const md = p.data?.metadata?.channelMetadataRenderer;
  if (!md?.externalId) throw new Error('Kanal topilmadi: ' + url);
  const head = JSON.stringify(p.data?.header || {});
  return {
    id: md.externalId,
    name: md.title,
    url: md.vanityChannelUrl ? md.vanityChannelUrl.replace(/^http:/, 'https:') : `https://www.youtube.com/channel/${md.externalId}`,
    verified: /CHECK_CIRCLE|BADGE_STYLE_TYPE_VERIFIED|AUDIO_BADGE/.test(head),
  };
}

// ── treyler nomidan film nomi ──
const SKIP = /teaser|tv spot|clip|featurette|reaction|recap|special look|sneak|game|comic|lego|behind|first look|\bspot\b|audio desc|\basl\b|hindi|tamil|telugu|español|spanish|latino|dublado|deutsch|french|fran[cç]ais|italiano|japanese|korean|portugu|\bdub\b|dubbed|subtitulado|in theaters|reacts?\b|anniversary|re-?release|vr\b|imax.*look/i;
function filmName(raw) {
  let t = String(raw)
    .replace(/^(?:disney\s*(?:and|&)\s*pixar['’]s|disney\s*(?:and|&)\s*pixar|walt disney (?:studios|pictures)['’]?s?|disney['’]s|pixar['’]s|dreamworks(?: animation)?['’]?s?|warner bros\.? pictures(?: presents)?:?|universal pictures['’]?s?|sony pictures['’]?s?|paramount pictures['’]?s?|lucasfilm['’]s|dc studios['’]?s?|marvel studios['’]?s?|illumination['’]s|from director [^,]+,)\s*/i, '')
    .split(/\s[|–—-]\s|\s+official\b|\s+\|/i)[0].replace(/\s+:/g, ':')
    .replace(/["“”]/g, '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]/gu, '')
    .replace(/\s*[-:–]?\s*(?:season|volume)\s*\d+\s*$/i, '').replace(/\s*\((?:HD|4K|20\d\d)\)\s*$/i, '').replace(/[\s.,:-]+$/, '').trim();
  // KATTA HARFLAR → Bosh Harflar (raqamli/qisqa so'zlar o'zgarmaydi)
  if (t === t.toUpperCase() && /[A-Z]{3}/.test(t)) {
    t = t.toLowerCase().replace(/(^|[\s(:\-/])(\p{L})/gu, (m, a, b) => a + b.toUpperCase())
      .replace(/\b(Ii|Iii|Iv|Vi|Vii)\b/g, s => s.toUpperCase());
  }
  return t;
}

// ── Wikidata: ruscha nom, yil, rejissyor, aktyorlar, janr ──
const WD = 'https://www.wikidata.org/w/api.php';
const WD_HEAD = { 'User-Agent': 'DezoMax/1.0 (https://dezomax.uz; studio trailers)' };
async function wd(params) {
  const u = WD + '?' + new URLSearchParams({ format: 'json', ...params });
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, { headers: WD_HEAD, signal: AbortSignal.timeout(20000) });
      if (r.ok) return r.json();
    } catch { /* qayta */ }
    await new Promise(r => setTimeout(r, 1500));
  }
  return {};
}
const FILM_TYPES = new Set(['Q11424', 'Q202866', 'Q24869', 'Q229390', 'Q24856', 'Q1261214', 'Q17517379', 'Q506240', 'Q1257444', 'Q18011172']);   // Q18011172 — film loyihasi (hali chiqmagan)
const TV_TYPES = new Set(['Q5398426', 'Q1259759', 'Q581714', 'Q117467246', 'Q63952888', 'Q15416', 'Q526877']);
const GENRE_QID = {
  Q188473: 'action', Q1535153: 'action', Q130232: 'drama', Q157443: 'comedy', Q471839: 'scifi', Q2484376: 'thriller',
  Q959790: 'crime', Q157394: 'fantasy', Q200092: 'horror', Q581714: 'animation', Q202866: 'animation', Q319221: 'adventure',
  Q1054574: 'romance', Q645928: 'biography', Q369747: 'war', Q1361932: 'family', Q20442589: 'family', Q17013749: 'history',
  Q622548: 'action', Q1200678: 'romance', Q860626: 'comedy', Q1342372: 'animation',
};
const claims = (e, p) => (e.claims?.[p] || []).map(c => c.mainsnak?.datavalue?.value).filter(Boolean);
const qids = (e, p) => claims(e, p).map(v => v.id).filter(Boolean);
const yearOfClaims = e => {
  const ys = [...claims(e, 'P577'), ...claims(e, 'P580')].map(v => +String(v.time || '').slice(1, 5)).filter(Boolean);
  return ys.length ? Math.min(...ys) : 0;
};
// aktyorlar: o'yinchi filmda P161, multfilmda — ovoz beruvchilar P725
const castOf = e => [...new Set([...qids(e, 'P161'), ...qids(e, 'P725')])];
const label = (e, l) => e?.labels?.[l]?.value || '';

async function wikidataFor(name, tv) {
  // matn qidiruvi + «film/serial» sharti (oddiy nom qidiruvida «Elio» kabi ismlar filmni bosib ketadi)
  const types = [...FILM_TYPES, ...TV_TYPES].map(q => 'P31=' + q).join('|');
  const s = await wd({ action: 'query', list: 'search', srsearch: name.replace(/["]/g, '') + ' haswbstatement:' + types, srlimit: '10', srnamespace: '0' });
  const ids = (s.query?.search || []).map(x => x.title);
  if (!ids.length) return null;
  const g = await wd({ action: 'wbgetentities', ids: ids.join('|'), props: 'labels|claims', languages: 'en|ru|uz' });
  const now = new Date().getFullYear();
  const norm = x => String(x).toLowerCase().replace(/[^a-z0-9]+/g, '');
  const isFilm = e => qids(e, 'P31').some(t => FILM_TYPES.has(t));
  const isTv = e => qids(e, 'P31').some(t => TV_TYPES.has(t));
  let cands = ids.map(id => g.entities?.[id]).filter(e => e && (isFilm(e) || isTv(e)))
    .map(e => ({ e, year: yearOfClaims(e), exact: norm(label(e, 'en')) === norm(name) }))
    .filter(c => c.exact && (!c.year || c.year <= now + 3));
  // treyler nomida «Season/Series» bo'lsa — serial, aks holda film afzal («Soul» filmi, serial emas)
  const pref = cands.filter(c => tv ? isTv(c.e) : isFilm(c.e));
  if (pref.length) cands = pref;
  if (!cands.length) return null;
  cands.sort((a, b) => (b.year || 9999) - (a.year || 9999));   // eng yangisi (yili hali yo'q — kelajakdagi)
  const e = cands[0].e;
  const people = [...qids(e, 'P57').slice(0, 2), ...castOf(e).slice(0, 6), ...qids(e, 'P272').slice(0, 6)];
  const names = people.length ? (await wd({ action: 'wbgetentities', ids: people.join('|'), props: 'labels', languages: 'en' })).entities || {} : {};
  const genres = [...new Set(qids(e, 'P136').map(q => GENRE_QID[q]).filter(Boolean))];
  if (qids(e, 'P31').some(t => t === 'Q202866' || t === 'Q581714')) genres.unshift('animation');
  return {
    qid: e.id,
    ru: label(e, 'ru'), uz: /[А-Яа-я()]/.test(label(e, 'uz')) ? '' : label(e, 'uz'),   // «Superman (2025 film)» kabi izohli nom olinmaydi
    year: cands[0].year || 0,
    director: qids(e, 'P57').slice(0, 2).map(q => label(names[q], 'en')).filter(Boolean).join(', '),
    cast: castOf(e).slice(0, 6).map(q => label(names[q], 'en')).filter(Boolean),
    genres: [...new Set(genres)].slice(0, 3),
    animated: qids(e, 'P31').some(t => t === 'Q202866' || t === 'Q581714'),
    tv: qids(e, 'P31').some(t => TV_TYPES.has(t)),
    companies: qids(e, 'P272').slice(0, 6).map(q => label(names[q], 'en')).filter(Boolean),
  };
}

// ── yordamchilar (DEZO CLOUD bilan bir xil ID — «Yangilash» ham shu yozuvni yangilaydi) ──
const stableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'kino';
const COLORS = { dc: ['#0a2a5a', '#04060c'], pixar: ['#0b3a6a', '#05101c'], disney: ['#0f2a5c', '#060a16'], warner: ['#0b2550', '#05080f'],
  universal: ['#1a2a4a', '#070a12'], sony: ['#1c1c24', '#08080b'], lucasfilm: ['#2a2410', '#0a0904'], dreamworks: ['#0a3050', '#050b12'], paramount: ['#0a2a6a', '#050914'] };

const TAKEN = new Set();   // Wikidata QID va nomlar — studiyalar orasida takrorlanmasin

async function studioTrailers(st) {
  const meta = META[st.key];
  const ch = await channelInfo(st.channel);
  if (!ch.verified) throw new Error(`${ch.name}: kanal tasdiqlanmagan (✓ yo‘q) — o‘tkazib yuborildi`);
  const vids = await allItems('https://www.youtube.com/playlist?list=UU' + ch.id.slice(2), meta.pages || 6);
  const byFilm = new Map();
  for (const v of vids) {
    if (!/official\s+(?:final\s+|main\s+|new\s+)?trailer|\|\s*trailer\b|-\s*trailer\b|official\s+teaser\s+trailer/i.test(v.title) || SKIP.test(v.title)) continue;
    const name = filmName(v.title);
    if (!name || name.length < 2 || /^(official|trailer|teaser)/i.test(name)) continue;
    const k = slug(name);
    if (byFilm.has(k)) continue;              // yuklamalar yangidan eskiga — birinchisi eng yangi treyler
    byFilm.set(k, { name, yt: v.id, tv: /season\s*\d|\bseries\b|television|disney\+ original series/i.test(v.title) });
  }
  const films = [...byFilm.values()].slice(0, 40);
  console.log(`${st.name}: ${vids.length} ta video → ${films.length} ta treyler`);
  const out = [];
  for (const f of films) {
    const w = await wikidataFor(f.name, f.tv).catch(() => null);
    // Wikidata'da film/serial sifatida topilmasa (kanal anonsi, qisqa ko'rsatuv, yig'ma video) — olinmaydi
    if (!w) { process.stdout.write(process.env.DEBUG ? `[x ${f.name}]` : 'x'); continue; }
    if (meta.company && !w.companies.some(c => meta.company.test(c))) continue;
    // bir film bir nechta kanalda (Disney — Pixar, Warner — DC, Universal — DreamWorks): birinchi studiyada qoladi
    if (TAKEN.has(w.qid) || TAKEN.has(slug(f.name))) { process.stdout.write('='); continue; }
    TAKEN.add(w.qid); TAKEN.add(slug(f.name));
    const tv = f.tv || !!w?.tv;
    const type = tv ? 'serial' : (w.animated || meta.type) ? 'multfilm' : 'film';
    const ru = w?.ru && w.ru.toLowerCase() !== f.name.toLowerCase() ? w.ru : '';
    const year = w?.year || 0;
    const genres = w?.genres?.length ? w.genres : meta.genres;
    const what = tv ? { uz: `${st.name} seriali`, ru: `сериал ${st.name}` } : meta.what;
    const people = [w?.director ? `Rejissyor: ${w.director}.` : '', w?.cast?.length ? `Rollarda: ${w.cast.slice(0, 4).join(', ')}.` : ''].filter(Boolean).join(' ');
    const peopleRu = [w?.director ? `Режиссёр: ${w.director}.` : '', w?.cast?.length ? `В ролях: ${w.cast.slice(0, 4).join(', ')}.` : ''].filter(Boolean).join(' ');
    const y = year ? ` (${year})` : '';
    out.push({
      id: stableId(`${st.key}:${f.yt}`), slug: `${meta.prefix}-${slug(f.name)}`, type, franchise: st.key,
      title: { uz: f.name, ru: ru || f.name },   // asosiy nom — rasmiy (inglizcha); Wikidata'dagi o'zbekchasi — tegda
      genres: genres.length ? genres : ['adventure'],
      ...(year ? { year } : {}),
      country: { uz: 'AQSh', ru: 'США' },
      ...(w?.director ? { director: w.director } : {}),
      cast: w?.cast || [],
      desc: {
        uz: `«${f.name}»${y} — ${what.uz}. ${people} Rasmiy treyler — ${ch.name} YouTube kanalidan.`.replace(/\s{2,}/g, ' '),
        ru: `«${ru || f.name}»${y} — ${what.ru}. ${peopleRu} Официальный трейлер с YouTube-канала ${ch.name}.`.replace(/\s{2,}/g, ' '),
      },
      // odamlar qidiradigan boshqa nomlar: inglizcha, ruscha
      tags: [...new Set([f.name, ru, w?.uz].filter(Boolean))],
      colors: COLORS[st.key] || ['#1a2a4a', '#070a12'],
      poster: `https://i.ytimg.com/vi/${f.yt}/maxresdefault.jpg`, cover: `https://i.ytimg.com/vi/${f.yt}/maxresdefault.jpg`, wide: true,
      trailer: `https://www.youtube.com/watch?v=${f.yt}`, video: '',
      source: { name: ch.name, url: ch.url }, featured: false,
      ...(w?.qid ? { wd: w.qid } : {}),
      ch: st.key,
    });
    process.stdout.write('.');
  }
  process.stdout.write('\n');
  return { ch, items: out };
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
  const want = process.argv.slice(2);
  const ORDER = ['dc', 'pixar', 'lucasfilm', 'dreamworks', 'disney', 'warner', 'universal', 'sony', 'paramount'];
  const list = ORDER.map(k => STUDIOS.find(s => s.key === k)).filter(s => s && META[s.key] && (!want.length || want.includes(s.key)));
  const text = fs.readFileSync(CH_PATH, 'utf8');
  const part = (a, b) => JSON.parse(text.slice(text.indexOf(a) + a.length, text.indexOf(b)));
  let channels = part('/*CHANNELS*/', '/*ENDCHANNELS*/');
  let items = part('/*CHDATA*/', '/*ENDCHDATA*/');
  const before = items.length;
  // boshqa kanallardagi treylerlar (Marvel) va boshqa studiyalarda allaqachon borlari qayta olinmaydi
  for (const m of items) if (!want.length ? !META[m.ch] : (m.ch && !want.includes(m.ch))) {
    if (m.wd) TAKEN.add(m.wd);
    if (m.trailer && !m.video) [m.title?.uz, m.title?.ru, m.mx?.en].filter(Boolean).forEach(x => TAKEN.add(slug(x)));
  }
  for (const st of list) {
    let res;
    try { res = await studioTrailers(st); } catch (e) { console.warn(`${st.name}: ${e.message}`); continue; }
    if (!res.items.length) continue;
    // kanal kaliti = studiya kaliti (catalog.html?studio= m.ch bilan ishlaydi)
    const old = channels.find(c => c.key === st.key || (c.id === res.ch.id && c.franchise === st.key));
    const entry = { key: st.key, id: res.ch.id, name: res.ch.name, url: res.ch.url, kind: 'trailers', franchise: st.key, prefix: META[st.key].prefix, updatedAt: Date.now(), count: 0 };
    channels = old ? channels.map(c => c === old ? { ...old, ...entry, key: old.key } : c) : [...channels, entry];
    const key = old ? old.key : st.key;
    // shu kanaldagi eskilari: yangi ro'yxatda bo'lmasa ham qoladi (hech narsa o'chirilmaydi)
    const byId = new Map(items.map((m, i) => [m.id, i]));
    for (const m of res.items) {
      const it = { ...m, ch: key };
      if (byId.has(m.id)) items[byId.get(m.id)] = it;
      else { items.push(it); byId.set(m.id, items.length - 1); }
    }
    channels = channels.map(c => c.key === key ? { ...c, count: items.filter(m => m.ch === key).length } : c);
  }
  fs.writeFileSync(CH_PATH, buildChannelsFile(channels, items));
  console.log(`js/data-channels.js: ${before} → ${items.length} ta yozuv`);
})();
