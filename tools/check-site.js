/* ============================================================
   DezoMax — saytni avtomatik tekshirish (barqarorlik)
   Har push'da GitHub'da ishlaydi (.github/workflows/cf-site.yml): tekshiruvdan o'tmasa — dezomax.uz ga YUKLANMAYDI,
   sayt oxirgi ishlagan versiyada qoladi. Lokal: node tools/check-site.js [--smoke]

   1) Kod: js/*.js — sintaksis xatosi yo'qmi (node --check)
   2) Ma'lumot: kinolar fayllari o'qiladimi, kinolar soni keskin kamaymaganmi, ID'lar takrorlanmaydimi, majburiy maydonlar bor
   3) Sahifalar: HTML'dagi har bir js/css fayl haqiqatan bormi
   4) --smoke: haqiqiy Chrome'da asosiy sahifalar ochiladi — JavaScript xatosi yo'qmi, kartalar/pleyer/shorts chiqadimi
   Chiqish kodi: 0 — hammasi joyida, 1 — xato (ro'yxati ekranda)
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);

/* ---------- 1) Kod ---------- */
for (const f of fs.readdirSync(path.join(root, 'js')).filter(f => f.endsWith('.js'))) {
  try { execFileSync(process.execPath, ['--check', path.join(root, 'js', f)], { stdio: 'pipe' }); }
  catch (e) { err(`js/${f}: sintaksis xatosi — ${String(e.stderr || e.message).split('\n').find(l => /Error/.test(l)) || ''}`); }
}

/* ---------- 2) Ma'lumot ---------- */
let MOVIES = [];
try {
  const ctx = { window: {}, document: { body: null }, localStorage: { getItem: () => null, setItem() {} }, location: { pathname: '/index.html', search: '' }, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of ['data.js', 'data-channels.js', 'data-custom.js', 'site-config.js']) {
    try { vm.runInContext(fs.readFileSync(path.join(root, 'js', f), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: f }); }
    catch (e) { err(`js/${f}: o'qib bo'lmadi — ${e.message}`); }
  }
  MOVIES = ctx.MOVIES || [];
  if (MOVIES.length < 1000) err(`Kinolar juda kam: ${MOVIES.length} ta (kamida 1000 bo'lishi kerak) — ma'lumot fayli buzilgan bo'lishi mumkin`);
  const seen = new Map();
  let noTitle = 0, badType = 0;
  for (const m of MOVIES) {
    if (!m || m.id == null) { err('ID siz kino bor'); continue; }
    seen.set(m.id, (seen.get(m.id) || 0) + 1);
    if (!m.title || !m.title.uz) noTitle++;
    if (m.type && !['film', 'serial', 'multfilm', 'tahlil', 'konsert'].includes(m.type)) badType++;
  }
  const dup = [...seen].filter(([, n]) => n > 1);
  if (dup.length) warn(`Bir xil ID'li yozuvlar: ${dup.length} ta (masalan ${dup.slice(0, 5).map(([id]) => id).join(', ')})`);
  if (noTitle) err(`Nomsiz kinolar: ${noTitle} ta`);
  if (badType) warn(`Noma'lum turdagi kinolar: ${badType} ta`);
  if (ctx.SITE_CONFIG && !Array.isArray(ctx.SITE_CONFIG.rows)) warn('site-config.js: «rows» yo\'q');
} catch (e) { err('Ma\'lumot tekshiruvi: ' + e.message); }

/* ---------- 3) Sahifalardagi fayllar ---------- */
const htmls = fs.readdirSync(root).filter(f => f.endsWith('.html') && !/^yandex_/.test(f));
for (const h of htmls) {
  const src = fs.readFileSync(path.join(root, h), 'utf8');
  for (const [, ref] of src.matchAll(/(?:src|href)="((?:js|css)\/[^"?#]+)/g)) {
    if (!fs.existsSync(path.join(root, ref))) err(`${h}: «${ref}» fayli yo'q`);
  }
}

/* ---------- 4) Haqiqiy brauzerda (--smoke) ---------- */
async function smoke() {
  let puppeteer;
  try { puppeteer = require('puppeteer-core'); } catch { warn('puppeteer-core o\'rnatilmagan — brauzer tekshiruvi o\'tkazib yuborildi'); return; }
  const chrome = process.env.CHROME_PATH || [
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium-browser',
    'C:/Program Files/Google/Chrome/Application/chrome.exe'
  ].find(p => fs.existsSync(p));
  if (!chrome) { warn('Chrome topilmadi — brauzer tekshiruvi o\'tkazib yuborildi'); return; }

  // oddiy statik server (sayt fayllari)
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(root, p);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}/`;

  const film = MOVIES.find(m => m && m.video && m.type !== 'tahlil' && /youtube\.com|youtu\.be/.test(m.video)) || MOVIES.find(m => m && m.video);
  const pages = [
    ['Bosh sahifa', 'index.html?nowelcome&nointro', () => document.querySelectorAll('#homeRows .card').length >= 5],
    ['Katalog', 'catalog.html?type=film&nointro', () => document.querySelectorAll('.grid .card').length >= 5],
    ['Kino sahifasi', `movie.html?id=${film ? film.id : 1}&nointro`, () => !!document.querySelector('.player-wrap') && !!document.querySelector('h1')],
    ['Qidiruv', 'search.html?q=kino&nointro', () => true],
    ['Shorts', 'shorts.html?nointro', () => document.querySelectorAll('.sh-slide').length >= 1],
    ['Marvel', 'marvel.html?nointro', () => document.querySelectorAll('.mx-card').length >= 1],
    ['Sport', 'sport.html?nointro', () => true],
    ['TV', 'tv.html?nointro', () => true],
    ['Akkaunt', 'account.html?nointro', () => !!document.querySelector('#account')?.children.length]
  ];
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
  try {
    for (const [name, url, check] of pages) {
      const page = await browser.newPage();
      const jsErrors = [];
      page.on('pageerror', e => jsErrors.push(String(e.message || e).split('\n')[0]));
      // tashqi so'rovlar (reklama, YouTube, ESPN, server) — tekshiruvda kerak emas, tez ishlasin
      await page.setRequestInterception(true);
      page.on('request', r => (r.url().startsWith(base) || r.url().startsWith('data:') ? r.continue() : r.abort()));
      try {
        await page.setViewport({ width: 1280, height: 900 });
        await page.goto(base + url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3500));
        const ok = await page.evaluate(check).catch(e => { jsErrors.push('tekshiruv: ' + e.message); return false; });
        if (!ok) err(`${name} (${url}): kerakli qism chiqmadi`);
        // tashqi so'rovlar to'xtatilgani sababli chiqqan tarmoq xatolari hisobga olinmaydi
        const real = jsErrors.filter(m => !/fetch|network|Failed to load|NetworkError|aborted|ERR_/i.test(m));
        if (real.length) err(`${name} (${url}): JavaScript xatosi — ${real.slice(0, 3).join(' | ')}`);
        else console.log(`  ✓ ${name}`);
      } catch (e) { err(`${name} (${url}): ochilmadi — ${e.message}`); }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

(async () => {
  if (process.argv.includes('--smoke')) await smoke();
  for (const w of warns) console.log('⚠ ' + w);
  if (errors.length) {
    console.log(`\n✗ Tekshiruvdan o'tmadi (${errors.length} ta xato):`);
    for (const e of errors) console.log('  • ' + e);
    process.exit(1);
  }
  console.log(`✓ Tekshiruvdan o'tdi: ${MOVIES.length} ta kino, ${htmls.length} ta sahifa${process.argv.includes('--smoke') ? ', brauzer sinovi' : ''}`);
})();
