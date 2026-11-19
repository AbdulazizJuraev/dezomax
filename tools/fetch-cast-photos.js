/* ============================================================
   Aktyorlar suratlari (TMDB) → js/cast-photos-<k>.json (16 bo'lak)
   ------------------------------------------------------------
   Kino sahifasidagi «Rollarda» ro'yxati (m.cast — faqat ismlar) uchun surat:
     1) TMDB raqami bor kinolar — o'sha kinoning rollar ro'yxatidan (aniq moslik)
     2) qolganlari — TMDB'da ism bo'yicha qidiruv (ruscha/boshqa yozilishlari ham), faqat ishonchli moslik
   Natija: { "Ism": "/profil.jpg" } — sayt https://image.tmdb.org/t/p/w185 + yo'l sifatida ko'rsatadi.
   Topilmagan aktyorda — avvalgidek bosh harflar.

   Ishlatish:  TMDB_KEY=... node tools/fetch-cast-photos.js
   Kalit hech qayerga yozilmaydi; oraliq natijalar tools/.cache/cast-photos.json da (qayta ishga tushirsa tez).
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const KEY = process.env.TMDB_KEY;
if (!KEY) { console.error('TMDB_KEY kerak'); process.exit(1); }
const SHARDS = 16;

const lines = f => fs.existsSync(path.join(root, 'js', f)) ? fs.readFileSync(path.join(root, 'js', f), 'utf8').split('\n')
  .filter(l => /^\{"id":\d+/.test(l)).map(l => { try { return JSON.parse(l.replace(/,\s*$/, '')); } catch { return null; } }).filter(Boolean) : [];
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx);
const films = [...(ctx.MOVIES || []), ...lines('data-custom.js'), ...lines('data-channels.js')].filter(m => Array.isArray(m.cast) && m.cast.length);

const cacheFile = path.join(__dirname, '.cache', 'cast-photos.json');
fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : { credits: {}, search: {} };
const save = () => fs.writeFileSync(cacheFile, JSON.stringify(cache));

const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[а-яё]/g, c => TR[c] ?? '').replace(/[ʻʼ‘’'`]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  // transliteratsiya farqlari: c/k, ph/f, y/i, kh/h
  .replace(/c(?=[aou])/g, 'k').replace(/ph/g, 'f').replace(/kh/g, 'h').replace(/y/g, 'i').replace(/x/g, 'ks');
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const same = (a, b) => { const x = norm(a), y = norm(b); if (!x || !y) return false; if (x === y) return true; return 1 - lev(x, y) / Math.max(x.length, y.length) >= 0.8; };

async function api(p) {
  for (let i = 0; i < 4; i++) {
    const r = await fetch(`https://api.themoviedb.org/3${p}${p.includes('?') ? '&' : '?'}api_key=${KEY}`).catch(() => null);
    if (r && r.ok) return r.json();
    if (r && r.status === 404) return null;
    await new Promise(res => setTimeout(res, 1500 * (i + 1)));
  }
  return null;
}
async function pool(items, n, fn) {
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const it = items[i++]; await fn(it); if (++done % 200 === 0) { save(); console.log(`  ${done}/${items.length}`); } }
  }));
}

(async () => {
  const photo = {};   // ism → profil yo'li
  // 1) TMDB raqamli kinolar — rollar ro'yxati
  const tm = films.filter(m => m.tmdb && m.tmdb.id);
  const keys = [...new Set(tm.map(m => `${m.tmdb.type === 'tv' ? 'tv' : 'movie'}/${m.tmdb.id}`))].filter(k => !(k in cache.credits));
  console.log(`kinolar: ${films.length} (TMDB: ${tm.length}), yangi rollar ro'yxati: ${keys.length}`);
  await pool(keys, 8, async k => {
    const j = await api(`/${k}/${k.startsWith('tv') ? 'aggregate_credits' : 'credits'}`);
    cache.credits[k] = (j && j.cast || []).slice(0, 40).map(c => [c.name, c.original_name, c.profile_path || '', c.id]);
  });
  save();
  for (const m of tm) {
    const cr = cache.credits[`${m.tmdb.type === 'tv' ? 'tv' : 'movie'}/${m.tmdb.id}`] || [];
    for (const name of m.cast) {
      if (photo[name]) continue;
      const hit = cr.find(c => c[2] && (same(name, c[0]) || same(name, c[1])));
      if (hit) photo[name] = hit[2];
    }
  }
  // 2) qolganlari — ism bo'yicha qidiruv
  const rest = [...new Set(films.flatMap(m => m.cast))].filter(n => !photo[n] && n.length > 3 && /\s/.test(n.trim()));
  const todo = rest.filter(n => !(n in cache.search));
  console.log(`TMDB rollaridan: ${Object.keys(photo).length}; qidiruvga: ${rest.length} (yangi ${todo.length})`);
  await pool(todo, 8, async n => {
    const j = await api(`/search/person?query=${encodeURIComponent(n)}&language=ru-RU&include_adult=false`);
    cache.search[n] = (j && j.results || []).slice(0, 3).map(p => [p.name, p.original_name || '', p.profile_path || '', p.known_for_department || '', p.popularity || 0]);
  });
  save();
  for (const n of rest) {
    const res = (cache.search[n] || []).filter(p => p[2]);
    // ishonchli: ismi mos (yozilishi farq qilsa ham) yoki TMDB faqat bitta aktyor topgan (ruscha/kirillcha qidiruv)
    const hit = res.find(p => same(n, p[0]) || same(n, p[1])) || ((cache.search[n] || []).length === 1 && res[0] && res[0][3] === 'Acting' ? res[0] : null);
    if (hit) photo[n] = hit[2];
  }

  // bo'laklarga — sayt faqat kerakli bo'lakni yuklaydi
  const h = s => { let x = 2166136261; for (const c of s) { x ^= c.codePointAt(0); x = Math.imul(x, 16777619) >>> 0; } return x % SHARDS; };
  const parts = Array.from({ length: SHARDS }, () => ({}));
  for (const [n, p] of Object.entries(photo).sort()) parts[h(n)][n] = p;
  parts.forEach((o, k) => fs.writeFileSync(path.join(root, 'js', `cast-photos-${k}.json`), JSON.stringify(o)));
  const all = new Set(films.flatMap(m => m.cast)).size;
  console.log(`tayyor: ${Object.keys(photo).length} / ${all} aktyor suratli → js/cast-photos-0..${SHARDS - 1}.json`);
})();
