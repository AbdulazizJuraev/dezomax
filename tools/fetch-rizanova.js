/* ============================================================
   RizaNova (YouTube: @UzbekFilmsHD) — rasmiy o'zbek seriallari va filmlari
   ------------------------------------------------------------
   Kanal playlistlari → seriallar (bitta karta, ichida qismlar), «O'zbek Filmlari»
   kolleksiyasi → alohida filmlar. Videolar YUKLAB OLINMAYDI — sayt YouTube pleyeri
   orqali ko'rsatadi (kanal embed'ga ruxsat bergan; ko'rishlar va reklama RizaNova'da qoladi).

   Natija: js/data-rizanova.js (MOVIES.push). Qismlar ixcham: eps: [[youtubeId, daqiqa], ...]
   (js/common.js partsOf ularni qismlarga aylantiradi).

   Yangi qismlar chiqqanda:  node tools/fetch-rizanova.js  → bump-version → commit
   ============================================================ */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const CHANNEL = 'https://www.youtube.com/@UzbekFilmsHD';
const SOURCE = { name: 'RizaNova', url: CHANNEL };
const HEAD = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' };

let CFG = null;   // INNERTUBE kaliti va mijoz versiyasi (davomini olish uchun)

async function page(url) {
  const h = await (await fetch(url, { headers: HEAD })).text();
  if (!CFG) {
    const key = h.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
    const ver = h.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];
    if (key) CFG = { key, ver };
  }
  const s = h.indexOf('var ytInitialData = ');
  if (s < 0) throw new Error('ytInitialData yo‘q: ' + url);
  return JSON.parse(h.slice(s + 20, h.indexOf(';</script>', s)));
}
async function more(token) {
  const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${CFG.key}`, {
    method: 'POST', headers: { ...HEAD, 'Content-Type': 'application/json' },
    body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion: CFG.ver, hl: 'en' } }, continuation: token })
  });
  return r.json();
}
const tokenOf = d => JSON.stringify(d).match(/"continuationCommand":\{"token":"([^"]+)"/)?.[1] || null;
function lockups(d) {
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.lockupViewModel) {
      const l = o.lockupViewModel;
      const img = JSON.stringify(l.contentImage || {});
      out.push({
        id: l.contentId,
        type: l.contentType,
        title: l.metadata?.lockupMetadataViewModel?.title?.content || '',
        len: img.match(/"text":"(\d+:\d\d(?::\d\d)?)"/)?.[1] || '',
        count: +(img.match(/"text":"(\d[\d,]*) (?:videos|video|episodes)"/)?.[1] || '0').replace(/,/g, '')
      });
      return;
    }
    if (o.playlistVideoRenderer) {
      const r = o.playlistVideoRenderer;
      out.push({ id: r.videoId, type: 'LOCKUP_CONTENT_TYPE_VIDEO', title: r.title?.runs?.[0]?.text || r.title?.simpleText || '', len: r.lengthText?.simpleText || '' });
      return;
    }
    for (const k in o) walk(o[k]);
  })(d);
  return out;
}
async function all(url) {
  let d = await page(url), items = lockups(d), tok = tokenOf(d), guard = 0;
  while (tok && guard++ < 60) {
    const j = await more(tok);
    const add = lockups(j);
    if (!add.length) break;
    items.push(...add);
    tok = tokenOf(j);
  }
  const seen = new Set();
  return items.filter(x => x.id && !seen.has(x.id) && seen.add(x.id));
}

const minutes = len => {
  const p = String(len).split(':').map(Number);
  if (p.some(isNaN) || !p.length) return 0;
  const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0);
  return Math.max(1, Math.round(s / 60));
};
const partNo = t => +(String(t).match(/(\d+)\s*-?\s*qism/i)?.[1] || String(t).match(/(?:qism|episode|серия)\s*(\d+)/i)?.[1] || 0);
const cleanTitle = t => String(t)
  .replace(/&\s*RizaNova!*/gi, '').replace(/\|\s*RizaNova/gi, '')
  .replace(/\((?:o['‘’]zbek|milliy)?\s*serial\)/gi, '').replace(/\(serial\)/gi, '')
  .replace(/\|\s*(?:Serial|Melodrama|Drama|Komediya|Detektiv)\s*/gi, ' ')
  .replace(/\s*\|\s*(\d+)-fasl\s*/i, ' $1-fasl ')
  .replace(/[|]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
const GENRE_RX = [[/drama/i, 'drama'], [/melodrama/i, 'romance'], [/komediya|comedy/i, 'comedy'], [/detektiv|detective/i, 'detective'],
  [/triller|thriller/i, 'thriller'], [/jangari|boevik|action/i, 'action'], [/oilaviy|family/i, 'family'], [/tarixiy|histor/i, 'history']];
const genresOf = titles => {
  const g = new Set();
  for (const t of titles) for (const [rx, id] of GENRE_RX) if (rx.test(t)) g.add(id);
  return g.size ? [...g].slice(0, 3) : ['drama'];
};
const yearOf = titles => { for (const t of titles) { const m = String(t).match(/\b(20[0-3]\d|19[89]\d)\b/); if (m) return +m[1]; } return null; };
// barqaror ID: playlist / video ID'dan (qayta yig'ilganda o'zgarmaydi) — 7 000 000 … 7 999 999
const stableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const slug = s => s.toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'serial';
const isCyr = s => /[А-Яа-яЁё]/.test(s);
// o'zbek lotin yozuvi: o‘, g‘ va ’ (saytdagidek)
const uzQuotes = s => s.replace(/([oOgG])['‘’`ʻ]/g, '$1‘').replace(/['`ʻ]/g, '’');
// «SNAYPER (2019)», «Muzlagan (o'zbek film) 2017» → «Snayper», «Muzlagan»
function filmTitle(raw) {
  let t = cleanTitle(String(raw).split(/\s[|–]\s|\s-\s/)[0])
    .replace(/\((?:o['‘’]zbek|milliy)\s*(?:film|kino|komediya)\)/gi, '')
    .replace(/\s*\b(4K|Ultra HD|Full HD|HD)\b.*$/i, '')
    .replace(/\(?\b(19[89]\d|20[0-3]\d)\b\)?\s*$/, '')
    .replace(/\s*[(\[]\s*[)\]]\s*/g, ' ').replace(/[\s.,:-]+$/, '').replace(/\s{2,}/g, ' ').trim();
  if (t === t.toUpperCase()) t = t.toLowerCase().replace(/(^|[\s(-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
  return uzQuotes(t);
}
const normT = s => String(s || '').toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

(async () => {
  const playlists = (await all(CHANNEL + '/playlists')).filter(p => p.type !== 'LOCKUP_CONTENT_TYPE_VIDEO');
  console.log(`playlistlar: ${playlists.length}`);
  const out = [], used = new Set(), seenFilms = new Set();
  // saytdagi mavjud kinolar (js/data.js) — takror qo'shilmasin
  const vm = require('vm');
  const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx);
  const baseTitles = new Set((ctx.MOVIES || []).flatMap(m => [m.title?.uz, m.title?.ru]).filter(Boolean).map(normT));

  for (const pl of playlists) {
    const name = cleanTitle(pl.title);
    // ruscha/inglizcha versiyalar va bitta videoli playlistlar — hozircha yo'q
    if (isCyr(pl.title) || /shards of the soul|broken pieces|treyler|trailer|anons/i.test(pl.title) || (pl.count && pl.count < 2)) { console.log(`  o'tkazildi: ${pl.title}`); continue; }
    let vids;
    for (let tryN = 0; tryN < 3 && !vids; tryN++) {
      try { vids = await all(`https://www.youtube.com/playlist?list=${pl.id}`); }
      catch (e) { if (tryN === 2) console.warn(`  xato: ${pl.title} — ${e.message}`); else await new Promise(r => setTimeout(r, 2000)); }
    }
    if (!vids) continue;
    vids = vids.filter(v => v.title && !/^\[(private|deleted)/i.test(v.title) && minutes(v.len) >= 5);
    if (vids.length < 2) continue;

    // «O'zbek filmlari» kolleksiyasi — har biri alohida film
    if (/film|kino/i.test(pl.title) && !/serial/i.test(pl.title)) {
      for (const v of vids) {
        if (used.has(v.id)) continue; used.add(v.id);
        const t = filmTitle(v.title);
        // bir film turli playlistlarda (4K / HD) yoki saytda allaqachon bor (boshqa rasmiy kanaldan) — takrorlamaymiz
        const key = normT(t);
        if (!key || seenFilms.has(key) || baseTitles.has(key)) continue;
        seenFilms.add(key);
        out.push({
          id: stableId(v.id), slug: 'rn-' + slug(t), type: 'film', franchise: 'uzbek', audio: 'uz',
          title: { uz: t, ru: t }, genres: genresOf([v.title]), year: yearOf([v.title]) || undefined,
          country: { uz: 'O‘zbekiston', ru: 'Узбекистан' }, cast: [],
          desc: { uz: `«${t}» — RizaNova studiyasining o‘zbek filmi. To‘liq versiyasi rasmiy RizaNova YouTube kanalida.`, ru: `«${t}» — узбекский фильм студии RizaNova. Полная версия — на официальном YouTube-канале RizaNova.` },
          colors: ['#3a1a4a', '#0d0610'],
          poster: `https://i.ytimg.com/vi/${v.id}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
          trailer: '', video: `https://www.youtube.com/watch?v=${v.id}`, duration: minutes(v.len), source: SOURCE, featured: false
        });
      }
      console.log(`  filmlar: ${pl.title} — ${vids.length}`);
      continue;
    }

    // serial: qism raqami bo'yicha, takror raqamlar — birinchisi
    const byNo = new Map();
    // bir playlistda bir necha fasl bo'lishi mumkin — kalit: fasl × 10000 + qism
    vids.forEach((v, i) => {
      const season = +(v.title.match(/(\d+)\s*-?\s*fasl/i)?.[1] || 1);
      const n = partNo(v.title) ? season * 10000 + partNo(v.title) : 900000 + i;
      if (!byNo.has(n)) byNo.set(n, v);
    });
    const eps = [...byNo.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
    eps.forEach(v => used.add(v.id));
    const titles = eps.map(v => v.title);
    const first = eps[0].id;
    out.push({
      id: stableId(pl.id), slug: 'rn-' + slug(name), type: 'serial', franchise: 'uzbek', audio: 'uz',
      title: { uz: uzQuotes(name), ru: uzQuotes(name) }, genres: genresOf([pl.title, ...titles]), year: yearOf(titles) || undefined,
      country: { uz: 'O‘zbekiston', ru: 'Узбекистан' }, cast: [],
      desc: { uz: `«${name}» — RizaNova studiyasining o‘zbek seriali, ${eps.length} qism. Rasmiy RizaNova YouTube kanalidan.`, ru: `«${name}» — узбекский сериал студии RizaNova, серий: ${eps.length}. С официального YouTube-канала RizaNova.` },
      colors: ['#3a1a4a', '#0d0610'],
      poster: `https://i.ytimg.com/vi/${first}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${first}/maxresdefault.jpg`,
      trailer: '', video: `https://www.youtube.com/watch?v=${first}`, source: SOURCE, featured: false,
      eps: eps.map(v => [v.id, minutes(v.len)])
    });
    console.log(`  serial: ${name} — ${eps.length} qism`);
  }

  // ID to'qnashuvi bo'lmasin
  const ids = new Set();
  for (const m of out) { while (ids.has(m.id)) m.id++; ids.add(m.id); }
  for (const m of out) if (m.year === undefined) delete m.year;

  const js = `/* tools/fetch-rizanova.js yaratadi — RizaNova rasmiy YouTube kanali (${CHANNEL}). Qo'lda o'zgartirmang.
   Videolar YouTube pleyeri orqali ko'rsatiladi (yuklab olinmaydi). */
MOVIES.push(${out.map(m => JSON.stringify(m)).join(',\n')});
`;
  fs.writeFileSync(path.join(root, 'js', 'data-rizanova.js'), js);
  const nEp = out.reduce((s, m) => s + (m.eps ? m.eps.length : 1), 0);
  console.log(`js/data-rizanova.js — ${out.filter(m => m.type === 'serial').length} serial, ${out.filter(m => m.type === 'film').length} film, ${nEp} video, ${Math.round(js.length / 1024)} KB`);
})();
