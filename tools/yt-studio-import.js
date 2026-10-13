/* ============================================================
   DezoMax — YouTube'dagi rasmiy studiya/distribyutor kanallaridan avtomatik film importi
   (Bollivud: Rajshri, Shemaroo, Goldmines, Ultra; Gollivud/Amerika: FilmRise, Popcornflix)
   ------------------------------------------------------------
   Har kuni GitHub Actions'da (.github/workflows/rutube-import.yml), lokal: node tools/yt-studio-import.js [--watch]
   Manbalar: data/yt-sources.json — faqat o'z kutubxonasining huquq egasi yoki litsenziyali distribyutor kanallari.
   Natija: js/data-rutube.js (RuTube filmlari bilan bitta katalog fayli), hisobot: data/yt-report.json

   Ro'yxat: pay.dezomax.uz/api/yt/playlist (kanal yuklamalari; server/server.js ytPlaylist).
   Tekshiruv (har video):
     1) YouTube oEmbed — rasmiy, kalitsiz: 200 = ochiq va boshqa saytga joylash mumkin, 401 = joylash taqiqlangan, 404 = yo'q
     2) --watch (lokal, O'zbekistondagi kompyuterdan): video sahifasi — o'ynaydimi, O'zbekistonda ochiqmi, tavsif
     3) YT_API_KEY bo'lsa (GitHub secret): YouTube Data API — embeddable, regionRestriction (UZ), tavsif
   Soxta ma'lumot yo'q: nom — YouTube sarlavhasidan (ishonchli ajratib bo'lmasa — film QO'SHILMAYDI), rasm — YouTube'ning o'z rasmi.
   Takror: shu video ID yoki shu nom+yil saytda bo'lsa — qo'shilmaydi. Ishlamay qolgani — 2 marta ketma-ket bo'lsa olinadi.
   Parametrlar: --max-new=600 --recheck=300 --watch --dry --sample
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { detectGenres } = require('../js/genre-detect.js');
const { readRutubeFile, writeRutubeFile, loadSite, readJSON, key, slugOf } = require('./rutube-import.js');

const root = path.join(__dirname, '..');
const P = f => path.join(root, f);
const arg = (k, d) => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a ? Number(a.split('=')[1]) : d; };
const DRY = process.argv.includes('--dry'), WATCH = process.argv.includes('--watch');
const MAX_NEW = arg('max-new', 600), RECHECK = arg('recheck', 300);
const API_KEY = process.env.YT_API_KEY || '';
const LIST_API = 'https://pay.dezomax.uz/api/yt/playlist?list=';
const today = new Date().toISOString().slice(0, 10);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sec = l => { const p = String(l || '').split(':').map(Number); return p.some(isNaN) ? 0 : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); };
async function pool(items, n, fn) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } })); }

/* ---------- Sarlavhadan film nomi ---------- */
const DEV = /[ऀ-ॿ]/;
const MARK = /\(?\s*(?:free\s+)?full\s+(?:[a-z]+\s+){0,3}?(?:movie|film)\b\s*(?:\(\s*(?:hd|4k|full hd)\s*\))?\s*\)?|\bnew\s+released\b|\b(?:full\s+)?hindi\s+dubbed\b(?:\s+(?:full\s+)?(?:movie|film))?|\b(?:full\s+)?hindi\s+(?:full\s+)?(?:movie|film)\b|\bmovie\s+in\s+hindi\b/i;
const MARK_DEV = /फुल\s*मूवी|डब्ड\s*मूवी|फुल\s*फिल्म/;   // hindcha «full movie», «dubbed movie»
const BAIT = /superhit|blockbuster|ultimate|must watch|compilation|scenes|best\b|latest|unseen|official|trailer|\bsong|jukebox|teaser|promo|scene|hit movie|movies\b|episode|ep\s*\d|full dose|\bft\.|reaction|review/i;
// faqat umumiy so'zlardan iborat «nom» (South, Award Winning, Hindi Action) — film nomi emas
const GENERIC = /^(?:(?:south|north|indian|hindi|tamil|telugu|bollywood|hollywood|award|winning|new|old|classic|action|comedy|romantic|romance|drama|thriller|horror|family|crime|movie|film|full|hd|4k|dubbed|blockbuster|hit|mega|super|latest|best|top|\d+s?)\s*)+$/i;
const latinOk = s => !!s && !DEV.test(s) && s.length >= 2 && s.length <= 50 && !s.includes(',') && s.split(/\s+/).length <= 7 && !BAIT.test(s) && !GENERIC.test(s.trim()) && /[A-Za-z]/.test(s);
const tidy = s => String(s || '').replace(/^[A-Z0-9 ,'’!?-]{6,}!\s*/, '').replace(/\(\s*(?:hd|4k|full hd|smp)\s*\)/ig, '').replace(/\b(?:free|in hd|hd|4k|in hindi)\s*$/i, '').replace(/[\s(:|–—-]+$/, '').replace(/^[\s:|–—-]+/, '').trim();
// oxiridagi umumiy so'zlar: «Rathnam South New Movie» → «Rathnam»; qolgani bo'sh yoki «… Ki» bo'lsa — nom emas
const TAIL = /(?:\s+(?:south|north|indian|hindi|bollywood|new|latest|movie|movies|picture|film|films|dubbed|action|comedy|horror|cult|thriller|romantic|superhit|hit|blockbuster|full|hd|4k))+\s*$/i;
// nom o'rnida aktyor/rejissyor ismi («Rajanikant», «Nagesh Kukunoor») — import paytida barcha aktyorlardan to'ldiriladi
const PEOPLE = new Set(['rajanikant', 'rajinikanth', 'amitabh bachchan', 'akshay kumar', 'mithun', 'mithun chakraborty', 'govinda', 'shah rukh khan', 'salman khan', 'nagesh kukunoor', 'anurag kashyap', 'dharmendra', 'jeetendra', 'sunny deol', 'ajay devgn', 'sanjay dutt', 'nana patekar', 'rajesh khanna', 'dev anand', 'vijay', 'allu arjun', 'prabhas', 'mahesh babu', 'jr ntr']);
function finalTitle(t) {
  let s = String(t || '').replace(/\s*\((?:4k|hd|ultra hd|4k ultra hd|full hd|uhd)[^)]*\)/ig, '').replace(TAIL, '').replace(/(?:\s+classic)+\s*$/i, '')
    .replace(/^[A-Z][a-z]+'s\s+(?=[A-Z]{3,})/, '').trim();   // «Vishal's RATHNAM» → «RATHNAM»
  if (s === s.toUpperCase() && /[A-Z]{3}/.test(s)) s = s.toLowerCase().replace(/(^|[\s(&'-])([a-z])/g, (m, a, b) => a + b.toUpperCase());
  if (!latinOk(s) || /^\d+'?s\b/i.test(s) || /\bspecial$/i.test(s) || /\s(?:ki|ka|ke|ko|aur)$/i.test(s) || /\b(?:picture|movie|film)\b/i.test(s) || PEOPLE.has(s.toLowerCase())) return null;
  return s;
}
const titleCase = s => (s === s.toUpperCase() && /[A-Z]{3}/.test(s)) ? s.toLowerCase().replace(/(^|[\s(&'-])([a-z])/g, (m, a, b) => a + b.toUpperCase()) : s;
function parseYtTitle(raw) {
  const r = String(raw || '').replace(/\s+/g, ' ').trim();
  const segs = r.split(/\s+[|।]\s+|\s+[-–—]\s+|\s+l\s+(?=[A-Z])/).map(s => s.trim()).filter(Boolean);
  let title = null;
  for (let i = 0; i < segs.length && !title; i++) {
    const seg = segs[i];
    // «Theri (थेरी) …», «Sainik ( सैनिक )» — lotincha nom, keyin qavsda hindcha
    let m = seg.match(/^([^()ऀ-ॿ]+?)\s*\(\s*[ऀ-ॿ][^)]*\)/);
    if (m && latinOk(tidy(m[1]))) { title = tidy(m[1]); break; }
    // «वेट्टैकारन (VETTAIKAARAN) …», «मेरा रक्षक (Mera Rakshak) …» — hindcha nom, qavsda lotincha
    m = seg.match(/^[ऀ-ॿ\s\d]+\(\s*([A-Za-z][A-Za-z0-9 .'&:!-]+?)\s*\)/);
    if (m && !/^(?:hd|4k|full hd|smp)$/i.test(m[1]) && latinOk(m[1])) { title = m[1]; break; }
    const hasYear = /\((?:19|20)\d\d\)/.test(seg);
    if (MARK.test(seg) || MARK_DEV.test(seg) || hasYear) {
      const before = tidy(seg.split(MARK)[0].split(MARK_DEV)[0].split(/\s*\((?:19|20)\d\d\)/)[0].split(/\s*\(\s*(?:hd|4k|full hd)\s*\)/i)[0].replace(/\s+(?:19|20)\d\d(?:\s+new)?\s*$/i, ''));
      if (latinOk(before)) { title = before; break; }
      // belgi oldida nom yo'q (yoki aktyorlar ro'yxati) — oldingi qismlardan lotincha nom
      for (let j = i - 1; j >= 0 && !title; j--) { const p = tidy(segs[j]); if (latinOk(p) && !/^part \d/i.test(p) && !/^\d{4}$/.test(p)) title = p; }
      if (title) break;
    }
  }
  if (!title) return null;
  title = finalTitle(titleCase(title.replace(/\s{2,}/g, ' ')));
  if (!title) return null;
  const part = r.match(/\bpart\s*(\d+)\s*of\s*\d+/i);
  if (part) title += ` (${part[1]}-qism)`;
  const year = +((r.match(/\(((?:19|20)\d\d)\)/) || r.match(/(?:^|\|\s*)((?:19|20)\d\d)\s*(?:\||$)/) || r.match(/\b((?:19|20)\d\d)\s+new\b/i) || [])[1]) || null;
  // aktyorlar: vergul bilan ajratilgan lotincha qism («| Dev Anand, Hema Malini»), janrlar ro'yxati emas
  const castSeg = segs.find(s => !DEV.test(s) && /,/.test(s) && !BAIT.test(s) && !MARK.test(s) && !EN_GENRES.some(([re]) => re.test(s)) && !/myth|epic|sci/i.test(s) &&
    s.split(',').every(x => /^\s*[A-Z][\w.'-]+(?:\s+[A-Z][\w.'-]+){0,3}\s*$/.test(x.replace(/&.*$/, ''))));
  const cast = castSeg ? castSeg.split(/\s*,\s*|\s*&\s*/).map(s => s.trim()).filter(Boolean).slice(0, 4) : [];
  return { title, year, cast };
}
const EN_GENRES = [[/comedy|funny/i, 'comedy'], [/action/i, 'action'], [/thriller|suspense/i, 'thriller'], [/horror|slasher/i, 'horror'], [/romanc|romantic|love story/i, 'romance'],
  [/drama/i, 'drama'], [/crime|gangster/i, 'crime'], [/sci-?fi|science fiction/i, 'scifi'], [/adventure/i, 'adventure'], [/family/i, 'family'], [/mystery/i, 'detective'],
  [/\bwar\b|deshbhakti|patriot/i, 'war'], [/fantasy|myth/i, 'fantasy'], [/historical|history/i, 'history'], [/biopic|biography|true story/i, 'biography'], [/animat|cartoon/i, 'animation']];
const genresOf = raw => [...new Set(EN_GENRES.filter(([re]) => re.test(raw)).map(([, g]) => g))].slice(0, 3);
const COUNTRY = { in: { uz: 'Hindiston', ru: 'Индия' }, us: { uz: 'AQSh', ru: 'США' } };
const idOf = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 96000000 + (h % 3900000); };

/* ---------- Tekshiruv ---------- */
async function oembed(id) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent('https://www.youtube.com/watch?v=' + id)}`);
      if (r.status === 200) { const j = await r.json(); return { exists: true, embed: true, thumb: j.thumbnail_url, channel: j.author_name }; }
      if (r.status === 401 || r.status === 403) return { exists: true, embed: false };
      if (r.status === 404 || r.status === 400) return { exists: false, embed: false };
    } catch {}
    await sleep(1500 * (i + 1));
  }
  throw new Error('oEmbed javob bermadi');
}
let ytMetaLocal = null, watchBlocked = false;
async function watchCheck(id) {
  if (!WATCH || watchBlocked) return null;
  ytMetaLocal = ytMetaLocal || require('../server/server.js').ytMeta;
  const m = await ytMetaLocal(id).catch(() => null);
  if (!m || m.error) { if (m && /topilmadi/.test(m.error)) watchBlocked = true; return null; }   // YouTube «bot» tekshiruvi — oEmbed bilan davom
  return m;
}
async function apiCheck(ids) {   // YouTube Data API (kalit bo'lsa): 50 tadan
  const out = {};
  if (!API_KEY) return out;
  for (let i = 0; i < ids.length; i += 50) {
    const u = `https://www.googleapis.com/youtube/v3/videos?part=status,contentDetails,snippet&id=${ids.slice(i, i + 50).join(',')}&key=${API_KEY}`;
    const j = await fetch(u).then(r => r.json()).catch(() => ({}));
    for (const v of j.items || []) {
      const rr = v.contentDetails?.regionRestriction || {};
      out[v.id] = { embed: !!v.status?.embeddable, public: v.status?.privacyStatus === 'public', uz: rr.allowed ? rr.allowed.includes('UZ') : !(rr.blocked || []).includes('UZ'),
        desc: v.snippet?.description || '', thumb: v.snippet?.thumbnails?.maxres?.url || v.snippet?.thumbnails?.high?.url || '' };
    }
  }
  return out;
}
const summaryOf = d => String(d || '').split(/\n\s*\n/).map(s => s.replace(/https?:\/\/\S+/g, '').replace(/#\S+/g, '').trim())
  .find(s => s.length > 60 && !/subscribe|follow us|download|copyright|℗|©|click here|watch more|also watch|presenting|starring|director|producer|music/i.test(s)) || '';

async function main() {
  const t0 = Date.now();
  const cfg = readJSON('data/yt-sources.json', { sources: [] });
  const site = loadSite();
  const siteMovies = site.MOVIES || [];
  let items = readRutubeFile();
  const state = readJSON('data/yt-state.json', { seen: {}, fails: {} });
  state.seen = state.seen || {}; state.fails = state.fails || {};

  // avval qo'shilganlarning nomi ham yangi qoidalar bilan tekshiriladi (nom emas — olib tashlanadi)
  let renamed = 0, dropped = 0;
  for (const m of items) for (const c of m.cast || []) if (/^[A-Za-z .'-]{4,}$/.test(c)) PEOPLE.add(c.toLowerCase());
  items = items.filter(m => {
    if (!m.yt) return true;
    const t = finalTitle(m.title.uz);
    if (!t) { state.seen[m.yt.id] = 'skip:notitle'; dropped++; return false; }
    if (t !== m.title.uz) { m.title = { uz: t, ru: t }; renamed++; }
    return true;
  });
  const ytOf = u => (String(u || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) || [])[1];
  const usedYt = new Set(items.map(m => m.yt && m.yt.id).filter(Boolean));
  for (const m of siteMovies) for (const u of [m.video, ...Object.values(m.langs || {})]) { const y = ytOf(u); if (y) usedYt.add(y); }
  const titleKeys = new Map();
  for (const m of [...siteMovies, ...items]) {
    if (!m || m.type === 'tahlil') continue;
    for (const t of new Set([m.title?.uz, m.title?.ru, ...(m.tags || [])].map(key).filter(k => k.length > 1))) (titleKeys.get(t) || titleKeys.set(t, []).get(t)).push(m);
  }
  const usedIds = new Set([...siteMovies.map(m => m.id), ...items.map(m => m.id)]);
  const usedSlugs = new Set([...siteMovies.map(m => m.slug), ...items.map(m => m.slug)]);

  const report = { at: new Date().toISOString(), method: API_KEY ? 'YouTube Data API' : WATCH ? 'oEmbed + video sahifasi (O‘zbekistondan)' : 'oEmbed', sources: [], totals: { found: 0, candidates: 0, checked: 0, working: 0, notWorking: 0, published: 0, duplicates: 0, noTitle: 0, recheckOk: 0, recheckFail: 0, removedBroken: 0 }, notes: [] };
  const T = report.totals;
  const skip = (src, why) => { src.skipped[why] = (src.skipped[why] || 0) + 1; };
  if (renamed || dropped) report.notes.push(`Nomlar qayta tekshirildi: ${renamed} ta tozalandi, ${dropped} ta nomi aniq emas — olib tashlandi`);

  /* 1) Kanallar */
  const lists = [];
  for (const s of cfg.sources) {
    const src = { id: s.id, name: s.name, franchise: s.franchise, listed: 0, candidates: 0, published: 0, skipped: {} };
    report.sources.push(src);
    let vids = [];
    try {
      const j = await fetch(LIST_API + 'UU' + s.id.slice(2)).then(r => r.json());
      if (j.error) throw new Error(j.error);
      vids = j.items || [];
    } catch (e) { report.notes.push(`${s.name}: ro‘yxat olinmadi — ${e.message}`); continue; }
    await sleep(800);
    src.listed = vids.length; T.found += vids.length;
    const best = new Map(), list = [];
    for (const v of vids) {
      if (!v || !/^[\w-]{11}$/.test(v.id || '')) continue;
      if (state.seen[v.id] || usedYt.has(v.id)) { skip(src, 'avval ko‘rilgan / saytda bor'); continue; }
      if (sec(v.len) < 60 * 60) { skip(src, '1 soatdan qisqa'); state.seen[v.id] = 'skip:short'; continue; }
      if (/trailer|teaser|jukebox|compilation|scenes|songs|#shorts|live|yule log/i.test(v.title)) { skip(src, 'treyler/to‘plam/jonli'); state.seen[v.id] = 'skip:clip'; continue; }
      const pt = parseYtTitle(v.title);
      if (!pt) { T.noTitle++; skip(src, 'nomi aniqlanmadi'); state.seen[v.id] = 'skip:notitle'; continue; }
      const k = `${key(pt.title)}|${pt.year || ''}`;
      if (best.has(k)) { T.duplicates++; skip(src, 'kanalda takror'); state.seen[v.id] = 'skip:dup'; continue; }
      best.set(k, true);
      list.push({ v, s, src, pt });
    }
    src.candidates = list.length;
    lists.push(list);
  }
  const cands = [];
  for (let i = 0; lists.some(l => l.length > i); i++) for (const l of lists) if (l[i]) cands.push(l[i]);
  T.candidates = cands.length;

  /* 2) Tekshirish va qo'shish */
  const batch = cands.slice(0, MAX_NEW);
  if (cands.length > MAX_NEW) report.notes.push(`${cands.length - MAX_NEW} ta video keyingi ishga qoldi (bir ishda ${MAX_NEW} ta)`);
  const api = await apiCheck(batch.map(c => c.v.id));
  await pool(batch, WATCH ? 2 : 4, async c => {
    try {
      const a = api[c.v.id];
      const o = a ? { exists: a.public, embed: a.embed } : await oembed(c.v.id);
      const w = !a && o.exists && o.embed ? await watchCheck(c.v.id) : null;
      c.chk = {
        exists: o.exists, embed: o.embed && (w ? w.embed : true), uz: a ? a.uz : w ? w.uz : null, playable: w ? w.status === 'OK' : null,
        desc: a ? summaryOf(a.desc) : w ? w.summary : '', thumb: (a && a.thumb) || (w && w.thumb) || o.thumb || '',
        year: w && w.year, cast: w && w.cast, director: w && w.director
      };
      if (WATCH) await sleep(400);
    } catch { c.chk = null; }
  });
  if (WATCH && watchBlocked) report.notes.push('YouTube video sahifasini bermadi («bot» tekshiruvi) — qolganlari faqat oEmbed bilan tekshirildi (O‘zbekiston cheklovi tekshirilmadi)');
  for (const c of batch) {
    const { v, s, src, pt, chk } = c;
    if (!chk) { skip(src, 'tekshirib bo‘lmadi'); continue; }
    T.checked++;
    const why = !chk.exists ? 'video yo‘q' : !chk.embed ? 'joylash taqiqlangan' : chk.uz === false ? 'O‘zbekistonda yopiq' : chk.playable === false ? 'o‘ynamaydi' : '';
    if (why) { T.notWorking++; skip(src, `ishlamaydi: ${why}`); state.seen[v.id] = `skip:${why}`; continue; }
    T.working++;
    const year = pt.year || chk.year || null;
    const same = (titleKeys.get(key(pt.title)) || []).filter(m => !year || !m.year || Math.abs(m.year - year) <= 1);
    if (same.length) { T.duplicates++; skip(src, 'saytda bor'); state.seen[v.id] = 'skip:exists'; continue; }
    let id = idOf(v.id);
    while (usedIds.has(id)) id++;
    usedIds.add(id);
    let slug = `yt-${slugOf(pt.title)}${year ? '-' + year : ''}`;
    while (usedSlugs.has(slug)) slug += '-2';
    usedSlugs.add(slug);
    const desc = String(chk.desc || '').slice(0, 360);
    const lang = /tamil|telugu|malayalam|kannada/i.test(v.title) && !/hindi/i.test(v.title) ? 'orig' : s.lang;
    const m = {
      id, slug, type: 'film', lang, franchise: s.franchise,
      title: { uz: pt.title, ru: pt.title },
      genres: genresOf(v.title), ...(year ? { year } : {}), duration: Math.max(1, Math.round(sec(v.len) / 60)),
      country: COUNTRY[s.country] || COUNTRY.us,
      ...(chk.director ? { director: chk.director } : {}),
      ...((pt.cast.length || (chk.cast || []).length) ? { cast: (pt.cast.length ? pt.cast : chk.cast).slice(0, 4) } : {}),
      desc: { uz: desc },
      poster: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, hposter: /maxres/.test(chk.thumb) ? chk.thumb : `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      video: `https://www.youtube.com/watch?v=${v.id}`,
      source: { name: s.name, url: `https://www.youtube.com/channel/${s.id}`, official: true },
      yt: { id: v.id, checked: today, ...(chk.uz === null ? { uz: 'n/a' } : {}) },
      addedAt: Date.now()
    };
    if (!m.genres.length) m.genres = detectGenres({ ...m, genres: [] }).slice(0, 3);
    items.push(m);
    for (const t of [key(pt.title)]) (titleKeys.get(t) || titleKeys.set(t, []).get(t)).push(m);
    T.published++; src.published++; state.seen[v.id] = 'published'; usedYt.add(v.id);
  }

  /* 3) Qayta tekshirish (oEmbed): eng eski tekshirilganlari; 2 marta ketma-ket ishlamasa — saytdan olinadi */
  const old = items.filter(m => m.yt && m.yt.checked !== today).sort((a, b) => String(a.yt.checked).localeCompare(String(b.yt.checked))).slice(0, RECHECK);
  const broken = new Set();
  await pool(old, 4, async m => {
    let o;
    try { o = await oembed(m.yt.id); } catch { return; }
    if (o.exists && o.embed) { m.yt.checked = today; delete state.fails[m.yt.id]; T.recheckOk++; return; }
    T.recheckFail++;
    state.fails[m.yt.id] = (state.fails[m.yt.id] || 0) + 1;
    if (state.fails[m.yt.id] >= 2) { broken.add(m.id); state.seen[m.yt.id] = 'broken'; }
  });
  if (broken.size) { items = items.filter(m => !broken.has(m.id)); T.removedBroken = broken.size; }

  const yt = items.filter(m => m.yt);
  report.catalog = { total: yt.length, hind: yt.filter(m => m.franchise === 'hind').length, hollywood: yt.filter(m => m.franchise === 'hollywood').length };
  report.seconds = Math.round((Date.now() - t0) / 1000);
  if (!DRY) {
    writeRutubeFile(items);
    state.updated = report.at;
    fs.writeFileSync(P('data/yt-state.json'), JSON.stringify(state) + '\n');
    fs.writeFileSync(P('data/yt-report.json'), JSON.stringify(report, null, 1) + '\n');
  }
  const lines = [
    `YouTube studiyalari importi — ${report.at}${DRY ? ' (sinov, faylga yozilmadi)' : ''} · tekshiruv: ${report.method}`,
    `Kanallarda topildi: ${T.found} · nomzod (1 soatdan uzun, nomi aniq): ${T.candidates} · nomi aniqlanmadi: ${T.noTitle}`,
    `Tekshirildi: ${T.checked} · ishlaydi: ${T.working} · ishlamaydi: ${T.notWorking}`,
    `Saytga qo‘shildi: ${T.published} · takror: ${T.duplicates}`,
    `Qayta tekshiruv: ${T.recheckOk} ishlaydi, ${T.recheckFail} ishlamadi, ${T.removedBroken} ta olindi`,
    `Saytdagi YouTube studiya filmlari: ${report.catalog.total} (Bollivud ${report.catalog.hind}, Gollivud/Amerika ${report.catalog.hollywood})`,
    ...report.sources.map(s => `  • ${s.name}: ${s.listed} video, ${s.candidates} nomzod, +${s.published} sayt${Object.keys(s.skipped).length ? ' · ' + Object.entries(s.skipped).map(([k, n]) => `${k} ${n}`).join(', ') : ''}`),
    ...report.notes.map(n => '  ! ' + n),
    `Vaqt: ${report.seconds} s`
  ];
  if (process.argv.includes('--sample')) for (const m of items.filter(x => x.yt).slice(-40)) console.log(`  [${m.franchise}] ${m.title.uz} | ${m.year || '?'} | ${m.genres.join(',')} | ${m.duration} daq | ${(m.cast || []).join(', ')}`);
  console.log(lines.join('\n'));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '```\n' + lines.join('\n') + '\n```\n');
}

module.exports = { parseYtTitle };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
