/* ============================================================
   Asosiy sahifalarning ruscha nusxasi: ru/index.html, ru/catalog.html, ru/about.html …
   ------------------------------------------------------------
   Google AdSense o'zbek tilini qo'llab-quvvatlamaydi — robot sahifaning ruscha versiyasini ham ko'rsin:
   o'zbekcha sahifa (ildizdagi *.html) → tools/ru-lib.js toRu() → ru/<sahifa>.html.
   O'zbekcha sahifalarga hreflang (uz ↔ ru) shu yerda qo'shiladi (o'zgarmagan bo'lsa — fayl qayta yozilmaydi).
   kino/, toplam/ — tools/gen-pages.js, marvel/ — tools/gen-marvel-pages.js yasaydi.

   tools/gen-sitemap.js chaqiradi (u esa — bump-version.js). Qo'lda: node tools/gen-ru.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { RU_ROOT, toRu, withHreflang } = require('./ru-lib.js');

const root = path.join(__dirname, '..');

// sarlavha va tavsif (sahifada <meta name="dzx:ru-title"> bo'lsa — o'sha)
const META = {
  'index.html': ['DezoMax — узбекские фильмы, сериалы и мультфильмы онлайн бесплатно',
    'DezoMax — онлайн-кинотеатр: узбекское кино, фильмы в переводе, сериалы, мультфильмы, телеканалы и спорт. Смотрите бесплатно с официальных каналов правообладателей.',
    'узбекские фильмы, узбекское кино онлайн, фильмы на узбекском, узбекские сериалы, мультфильмы на узбекском, смотреть фильмы онлайн бесплатно, DezoMax'],
  'catalog.html': ['Каталог фильмов и сериалов — DezoMax', 'Все фильмы DezoMax: отбор по типу, вселенной и жанру, поиск по названию, режиссёру или актёру.'],
  'movie.html': ['DezoMax', 'Информация о фильме, трейлер и похожие фильмы.'],
  'search.html': ['Поиск фильмов — DezoMax', 'Ищите фильмы, сериалы и мультфильмы по названию, актёру или жанру.'],
  'sport.html': ['Спорт — DezoMax', 'Расписание футбольных матчей на сегодня и последние спортивные новости.'],
  'tv.html': ['Телеканалы онлайн — DezoMax', 'Смотрите телеканалы Узбекистана в прямом эфире онлайн.'],
  'plans.html': ['Подписки — DezoMax', 'Тарифы и цены подписки DezoMax.'],
  'shorts.html': ['Shorts — DezoMax', 'Короткие видео о кино на узбекском языке. Листайте вверх — откроется следующее.'],
  'marvel.html': ['Фильмы Marvel — трейлеры, актёры, бюджет и сборы | DezoMax', 'Фильмы Marvel Studios: официальные трейлеры, актёры, даты выхода, бюджет и кассовые сборы.']
};
const attr = (html, name) => { const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`)); return m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : ''; };

const OUT = path.join(root, 'ru');
fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const f of RU_ROOT) {
  const file = path.join(root, f);
  if (!fs.existsSync(file)) { console.warn(`gen-ru: ${f} yo'q`); continue; }
  const src = fs.readFileSync(file, 'utf8');
  const uz = withHreflang(src, f);
  if (uz !== src) fs.writeFileSync(file, uz);
  const [t, d, k] = META[f] || [];
  let html = toRu(uz, f, { title: attr(uz, 'dzx:ru-title') || t, desc: attr(uz, 'dzx:ru-desc') || d, keywords: k });
  html = html.replace(/<meta name="dzx:ru-(?:title|desc)" content="[^"]*">\r?\n?/g, '')
    // huquqiy sahifalardagi UZ/RU tugmalari (havolalar)
    .replace(/class="lang-btn is-active" href="\.\//, 'class="lang-btn" href="./')
    .replace(/class="lang-btn" href="ru\//, 'class="lang-btn is-active" href="ru/');
  fs.writeFileSync(path.join(OUT, f), html);
  n++;
}
console.log(`ru/ — ${n} ta asosiy sahifa`);
module.exports = { pages: RU_ROOT };
