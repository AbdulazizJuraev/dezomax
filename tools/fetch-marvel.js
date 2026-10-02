/* ============================================================
   Marvel sahifasi uchun ma'lumotlar: js/marvel-data.js
   ------------------------------------------------------------
   Wikidata'dan (ochiq ma'lumotlar, CC0) har bir Marvel filmi uchun:
   chiqish sanasi, davomiyligi, rejissyor, aktyorlar, byudjet va
   kassa daromadi (AQSh dollarida). Kino ro'yxati — js/data.js
   (franchise: 'marvel'), poster va treyler o'sha yerda.

   Ishlatish (yangi Marvel filmi qo'shilganda):  node tools/fetch-marvel.js
   ============================================================ */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
// sayt ID → inglizcha nomi (Wikidata'dan qidirish uchun)
const FILMS = {
  32: 'Iron Man', 122: 'The Incredible Hulk', 123: 'Iron Man 2', 124: 'Thor', 125: 'Captain America: The First Avenger',
  33: 'The Avengers', 126: 'Iron Man 3', 127: 'Thor: The Dark World', 35: 'Captain America: The Winter Soldier',
  34: 'Guardians of the Galaxy', 128: 'Avengers: Age of Ultron', 129: 'Ant-Man', 130: 'Captain America: Civil War',
  36: 'Doctor Strange', 131: 'Guardians of the Galaxy Vol. 2', 132: 'Spider-Man: Homecoming', 37: 'Thor: Ragnarok',
  38: 'Black Panther', 39: 'Avengers: Infinity War', 133: 'Ant-Man and the Wasp', 134: 'Captain Marvel',
  40: 'Avengers: Endgame', 135: 'Spider-Man: Far From Home', 136: 'Black Widow', 137: 'Shang-Chi and the Legend of the Ten Rings',
  138: 'Eternals', 41: 'Spider-Man: No Way Home', 139: 'Doctor Strange in the Multiverse of Madness', 140: 'Thor: Love and Thunder',
  141: 'Black Panther: Wakanda Forever', 142: 'Ant-Man and the Wasp: Quantumania', 143: 'Guardians of the Galaxy Vol. 3',
  144: 'The Marvels', 145: 'Deadpool & Wolverine', 146: 'Captain America: Brave New World', 147: 'Thunderbolts*',
  148: 'The Fantastic Four: First Steps', 149: 'Spider-Man: Brand New Day', 150: 'Avengers: Doomsday',
  42: 'Deadpool', 43: 'Spider-Man: Into the Spider-Verse'
};
const YEAR = { 32: 2008, 122: 2008, 123: 2010, 124: 2011, 125: 2011, 33: 2012, 126: 2013, 127: 2013, 35: 2014, 34: 2014, 128: 2015, 129: 2015,
  130: 2016, 36: 2016, 131: 2017, 132: 2017, 37: 2017, 38: 2018, 39: 2018, 133: 2018, 134: 2019, 40: 2019, 135: 2019, 136: 2021, 137: 2021,
  138: 2021, 41: 2021, 139: 2022, 140: 2022, 141: 2022, 142: 2023, 143: 2023, 144: 2023, 145: 2024, 146: 2025, 147: 2025, 148: 2025,
  149: 2026, 150: 2026, 42: 2016, 43: 2018 };

// Rasmiy treylerlar (YouTube oEmbed bilan tekshirilgan: kanal — studiyaning o'zi). Yangi film qo'shilsa — shu yerga.
const TRAILERS = {"33":{"yt":"eOrNdBpGMv8","ch":"Marvel Entertainment"},"34":{"yt":"d96cjJhvlMA","ch":"Marvel Entertainment"},"35":{"yt":"7SlILk2WMTI","ch":"Marvel Entertainment"},"36":{"yt":"HSzx-zryEgM","ch":"Marvel Entertainment"},"37":{"yt":"BynD1PEVAB4","ch":"Marvel Entertainment"},"38":{"yt":"xjDjIWPwcPU","ch":"Marvel Entertainment"},"39":{"yt":"6ZfuNTqbHE8","ch":"Marvel Entertainment"},"40":{"yt":"TcMBFSGVi1c","ch":"Marvel Entertainment"},"41":{"yt":"ZYzbalQ6Lg8","ch":"Marvel Entertainment"},"42":{"yt":"ONHBaC-pfsk","ch":"20th Century Studios"},"43":{"yt":"XfJ1PFzE8DU","ch":"Marvel Entertainment"},"124":{"yt":"JOddp-nlNvQ","ch":"Marvel Entertainment"},"125":{"yt":"JerVrbLldXw","ch":"Marvel Entertainment"},"126":{"yt":"Ke1Y3P9D0Bc","ch":"Marvel UK"},"127":{"yt":"npvJ9FTgZbM","ch":"Marvel Entertainment"},"128":{"yt":"tmeOjFno6Do","ch":"Marvel Entertainment"},"129":{"yt":"pWdKf3MneyI","ch":"Marvel Entertainment"},"130":{"yt":"dKrVegVI0Us","ch":"Marvel Entertainment"},"131":{"yt":"wUn05hdkhjM","ch":"Marvel Entertainment"},"132":{"yt":"39udgGPyYMg","ch":"Marvel Entertainment"},"133":{"yt":"8_rTIAOohas","ch":"Marvel Entertainment"},"134":{"yt":"Z1BCujX3pw8","ch":"Marvel Entertainment"},"135":{"yt":"LFoz8ZJWmPs","ch":"Marvel Entertainment"},"136":{"yt":"ybji16u608U","ch":"Marvel Entertainment"},"137":{"yt":"8YjFbMbfXaQ","ch":"Marvel Entertainment"},"139":{"yt":"aWzlQ2N6qqg","ch":"Marvel Entertainment"},"140":{"yt":"Go8nTmfrQd8","ch":"Marvel Entertainment"},"141":{"yt":"_Z3QKkl1WyM","ch":"Marvel Entertainment"},"142":{"yt":"ZlNFpri-Y40","ch":"Marvel Entertainment"},"143":{"yt":"u3V5KDHRQvk","ch":"Marvel Entertainment"},"144":{"yt":"wS_qbDztgVY","ch":"Marvel Entertainment"},"145":{"yt":"73_1biulkYk","ch":"Marvel Entertainment"},"146":{"yt":"1pHDWnXmK7Y","ch":"Marvel Entertainment"},"147":{"yt":"hUUszE29jS0","ch":"Marvel Entertainment"},"148":{"yt":"pAsmrKyMqaA","ch":"Marvel Entertainment"},"149":{"yt":"daXaTug8rL4","ch":"Marvel Entertainment"},"150":{"yt":"irVNGjRFZGk","ch":"Marvel Entertainment"}};

const API = 'https://www.wikidata.org/w/api.php';
const USD = 'http://www.wikidata.org/entity/Q4917';
const WORLD = 'Q13780930';
const get = async params => {
  const u = new URL(API);
  Object.entries({ format: 'json', ...params }).forEach(([k, v]) => u.searchParams.set(k, v));
  for (let i = 0; i < 3; i++) {
    const r = await fetch(u, { headers: { 'User-Agent': 'DezoMax/1.0 (https://dezomax.uz)' } }).catch(() => null);
    if (r && r.ok) return r.json();
    await new Promise(res => setTimeout(res, 1500));
  }
  throw new Error('Wikidata javob bermadi');
};
const claims = (e, p) => (e.claims?.[p] || []).filter(c => c.rank !== 'deprecated');
const val = c => c.mainsnak?.datavalue?.value;
const yearOf = e => { const t = val(claims(e, 'P577')[0] || {})?.time; return t ? +t.slice(1, 5) : null; };
const FILM_TYPES = new Set(['Q11424', 'Q24869', 'Q202866', 'Q29168811']);

async function find(title, year) {
  const j = await get({ action: 'wbsearchentities', search: title, language: 'en', type: 'item', limit: 12 });
  const ids = (j.search || []).map(s => s.id);
  if (!ids.length) return null;
  const e = (await get({ action: 'wbgetentities', ids: ids.join('|'), props: 'claims|labels', languages: 'en|mul' })).entities;
  const films = ids.map(id => e[id]).filter(x => x && claims(x, 'P31').some(c => FILM_TYPES.has(val(c)?.id)));
  return films.find(f => yearOf(f) === year) || films.find(f => Math.abs((yearOf(f) || 0) - year) <= 1)
    || films.find(f => !yearOf(f) && (f.labels?.en?.value || '').toLowerCase() === title.toLowerCase()) || null;   // hali chiqmagan film — sanasiz
}

// AQSh dollaridagi miqdor; kassa uchun — butun dunyo bo'yicha (P3005 = dunyo), bo'lmasa eng kattasi
function money(e, p, world = false) {
  const list = claims(e, p).filter(c => val(c)?.unit === USD).map(c => ({
    n: Math.abs(parseFloat(val(c).amount)),
    world: (c.qualifiers?.P3005 || []).some(q => q.datavalue?.value?.id === WORLD),
    pref: c.rank === 'preferred'
  }));
  if (!list.length) return null;
  const pick = (world && list.find(x => x.world)) || list.find(x => x.pref) || list.sort((a, b) => b.n - a.n)[0];
  return Math.round(pick.n);
}

(async () => {
  const out = {};
  const actorIds = new Map();   // aktyor nomi → Wikidata ID (surati uchun)
  for (const [id, title] of Object.entries(FILMS)) {
    try {
      const f = await find(title, YEAR[id]);
      if (!f) { console.warn(`  topilmadi: ${title}`); continue; }
      const dates = claims(f, 'P577').map(c => val(c)?.time).filter(Boolean).map(t => t.slice(1, 11)).sort();
      // barcha aktyorlar va rejissyorlar nomi (Wikidata bir so'rovda 50 tagacha beradi)
      const people = [...new Set([...claims(f, 'P57').map(c => val(c)?.id), ...claims(f, 'P161').map(c => val(c)?.id)].filter(Boolean))].slice(0, 150);
      const lab = {};
      for (let i = 0; i < people.length; i += 50) {
        Object.assign(lab, (await get({ action: 'wbgetentities', ids: people.slice(i, i + 50).join('|'), props: 'labels', languages: 'en|mul' })).entities || {});
      }
      // mashhur odamlarning ismi Wikidata'da ko'pincha faqat «mul» (barcha tillar uchun) maydonida
      const name = q => lab[q]?.labels?.en?.value || lab[q]?.labels?.mul?.value || '';
      for (const q of claims(f, 'P161').map(c => val(c)?.id).filter(Boolean)) if (name(q) && !actorIds.has(name(q))) actorIds.set(name(q), q);
      const dur = val(claims(f, 'P2047')[0] || {});
      out[id] = {
        wd: f.id,
        en: f.labels?.en?.value || title,
        date: dates.find(d => !d.endsWith('-00')) || dates[0] || null,
        runtime: dur ? Math.round(Math.abs(parseFloat(dur.amount))) : null,
        director: claims(f, 'P57').map(c => name(val(c)?.id)).filter(Boolean),
        cast: claims(f, 'P161').map(c => name(val(c)?.id)).filter(Boolean).slice(0, 12),
        budget: money(f, 'P2130'),
        gross: money(f, 'P2142', true),
        ...(TRAILERS[id] ? { yt: TRAILERS[id].yt, ytCh: TRAILERS[id].ch } : {})
      };
      console.log(`  ${title}: ${out[id].date} · $${out[id].budget || '?'} / $${out[id].gross || '?'}`);
    } catch (e) { console.warn(`  xato: ${title} — ${e.message}`); }
  }
  // Aktyor suratlari: Wikidata P18 → Wikimedia Commons (erkin litsenziya). Katalogdagi bosh rollar ham (data.js cast).
  const vm = require('vm');
  const ctx = { console, window: {}, document: { write() {} }, location: { pathname: '/' } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx);
  const names = new Set();
  for (const m of ctx.MOVIES || []) if (FILMS[m.id]) (m.cast || []).forEach(n => names.add(n));
  Object.values(out).forEach(o => (o.cast || []).forEach(n => names.add(n)));
  for (const n of names) {
    if (actorIds.has(n)) continue;
    await new Promise(r => setTimeout(r, 250));   // Wikidata so'rovlarni cheklaydi
    // bir xil ismli odamlar ko'p — tavsifida aktyor/aktrisa bo'lganini tanlaymiz
    const j = await get({ action: 'wbsearchentities', search: n, language: 'en', type: 'item', limit: 8 }).catch(() => null);
    const hit = (j?.search || []).find(r => /(actor|actress)/i.test(r.description || ''));
    if (hit) actorIds.set(n, hit.id);
  }
  const photos = {};
  const pairs = [...names].filter(n => actorIds.has(n)).map(n => [n, actorIds.get(n)]);
  for (let i = 0; i < pairs.length; i += 50) {
    const ents = (await get({ action: 'wbgetentities', ids: pairs.slice(i, i + 50).map(p => p[1]).join('|'), props: 'claims' })).entities || {};
    for (const [n, q] of pairs.slice(i, i + 50)) {
      const e = ents[q];
      if (!e || !claims(e, 'P31').some(c => val(c)?.id === 'Q5')) continue;     // faqat odamlar
      const file = val(claims(e, 'P18')[0] || {});
      if (file) photos[n] = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(file.replace(/ /g, '_')) + '?width=160';
    }
  }
  console.log(`aktyor suratlari: ${Object.keys(photos).length} / ${names.size}`);

  for (const id of Object.keys(TRAILERS)) if (!out[id]) out[id] = { yt: TRAILERS[id].yt, ytCh: TRAILERS[id].ch };   // Wikidata'da yo'q (hali chiqmagan) — treyleri bo'lsa ham
  const js = `/* tools/fetch-marvel.js yaratadi — Wikidata (CC0) ma'lumotlari. Qo'lda o'zgartirmang. */\nvar MARVEL_INFO = ${JSON.stringify(out, null, 1)};\n` +
    `/* Aktyor suratlari — Wikimedia Commons (erkin litsenziya) */\nvar MARVEL_PHOTOS = ${JSON.stringify(photos, null, 1)};\n`;
  fs.writeFileSync(path.join(root, 'js', 'marvel-data.js'), js);
  console.log(`js/marvel-data.js — ${Object.keys(out).length} ta film`);
})();
