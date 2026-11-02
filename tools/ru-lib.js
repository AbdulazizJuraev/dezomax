/* ============================================================
   Ruscha versiya (dezomax.uz/ru/…) — umumiy o'girish qoidalari
   ------------------------------------------------------------
   Google AdSense o'zbek tilini qo'llab-quvvatlamaydi, rus tilini qo'llaydi. Shuning uchun har bir asosiy
   sahifaning ruscha nusxasi alohida manzilda turadi: ru/<sahifa>.html — HTML'ning o'zida ruscha matn,
   <html lang="ru">, canonical, hreflang (uz ↔ ru). Brauzerda js/i18n.js /ru/ manzilni ko'rib LANG='ru' qiladi.

   tools/gen-pages.js (kino/, toplam/), tools/gen-marvel-pages.js (marvel/) va tools/gen-ru.js (asosiy sahifalar) ishlatadi.
   Matn qoidalari:
     data-i18n="kalit"      → js/i18n.js dagi I18N.ru[kalit]
     data-i18n-ph="kalit"   → placeholder
     data-ru="ruscha matn"  → elementning ichi shu matn bilan almashadi (faqat ichida teg yo'q elementlar)
     data-lang-block="uz|ru" → boshqa tildagi blok ruscha sahifadan olib tashlanadi
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://dezomax.uz/';

const ictx = { localStorage: { getItem: () => null, setItem() {} }, location: { pathname: '/' }, document: {} };
vm.createContext(ictx);
vm.runInContext(fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ictx);
const RU = (ictx.I18N && ictx.I18N.ru) || {};

// ruscha nusxasi bor asosiy sahifalar (tools/gen-ru.js); kino/, toplam/, marvel/ — o'z generatorlarida
const RU_ROOT = ['index.html', 'catalog.html', 'movie.html', 'search.html', 'marvel.html', 'sport.html', 'tv.html', 'shorts.html',
  'plans.html', 'about.html', 'contacts.html', 'privacy.html'];
const RU_DIRS = /^(kino|toplam|marvel)\//;
const hasRu = rel => RU_ROOT.includes(rel) || RU_DIRS.test(rel);

const ARIA = {
  'Qidiruv': 'Поиск', 'Akkaunt': 'Аккаунт', 'Bo‘limlar': 'Разделы', 'Yuqoriga': 'Наверх', 'Ovoz bilan qidirish': 'Голосовой поиск',
  'Tanlangan kinolar': 'Избранные фильмы', 'Yopish': 'Закрыть', 'Ovoz': 'Звук', 'DezoMax haqida': 'О DezoMax'
};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uzUrl = rel => SITE + (rel === 'index.html' ? '' : rel);
const ruUrl = rel => SITE + 'ru/' + (rel === 'index.html' ? '' : rel);

/* hreflang: ikkala tildagi sahifada bir xil uchlik (uz, ru, x-default) */
function hreflang(rel) {
  return `<link rel="alternate" hreflang="uz" href="${uzUrl(rel)}">\n<link rel="alternate" hreflang="ru" href="${ruUrl(rel)}">\n<link rel="alternate" hreflang="x-default" href="${uzUrl(rel)}">`;
}
function withHreflang(html, rel) {
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\r?\n?/g, '');
  // faqat haqiqiy teg (movie.html da canonical JavaScript satri ichida yoziladi — unga tegilmaydi)
  return html.replace(/(<link rel="canonical" href="https:\/\/[^"]*">)/, `$1\n${hreflang(rel)}`);
}

/* O'zbekcha sahifa (rel — sayt ildiziga nisbatan yo'l) → ruscha nusxa. meta: { title, desc } */
function toRu(html, rel, meta = {}) {
  const depth = rel.split('/').length;   // ru/index.html → 1, ru/kino/x.html → 2
  const base = `<base href="${'../'.repeat(depth)}">`;
  html = /<base href="[^"]*">/.test(html) ? html.replace(/<base href="[^"]*">/, base) : html.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n${base}`);
  html = html.replace(/<html lang="uz"/, '<html lang="ru"')
    .replace(/<meta property="og:locale" content="uz_UZ">/, '<meta property="og:locale" content="ru_RU">')
    .replace(/<meta property="og:locale:alternate" content="ru_RU">/, '<meta property="og:locale:alternate" content="uz_UZ">')
    .replace(/<link rel="canonical" href="https:\/\/[^"]*">/, `<link rel="canonical" href="${ruUrl(rel)}">`)
    .replace(/<meta property="og:url" content="https:\/\/[^"]*">/, `<meta property="og:url" content="${ruUrl(rel)}">`)
    // movie.html: canonical JavaScript'da yoziladi (…/movie.html?id=N)
    .replace(/var u='https:\/\/dezomax\.uz\//, "var u='https://dezomax.uz/ru/");
  html = withHreflang(html, rel);
  if (meta.title) html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta (property="og:title"|name="twitter:title") content="[^"]*">/g, `<meta $1 content="${esc(meta.title)}">`);
  if (meta.desc) html = html.replace(/<meta (name="description"|property="og:description"|name="twitter:description") content="[^"]*">/g, `<meta $1 content="${esc(meta.desc)}">`);
  if (meta.keywords) html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${esc(meta.keywords)}">`);

  // boshqa tildagi bloklar
  html = html.replace(/<(\w+)[^>]*\sdata-lang-block="uz"[^>]*>[\s\S]*?<\/\1>\s*<!--\/uz-->\r?\n?/g, '');
  html = html.replace(/(<\w+[^>]*\sdata-lang-block="ru"[^>]*?)\shidden(?=[\s>])/g, '$1');
  // matnlar
  html = html.replace(/<(\w+)([^>]*?)\sdata-ru="([^"]*)"([^>]*)>[^<]*<\/\1>/g, (m, t, a, ru, b) => `<${t}${a}${b}>${ru}</${t}>`);
  html = html.replace(/<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>[^<]*<\/\1>/g, (m, t, attrs, k) => RU[k] ? `<${t}${attrs}>${esc(RU[k])}</${t}>` : m);
  html = html.replace(/<(input|textarea)([^>]*\sdata-i18n-ph="([^"]+)"[^>]*)>/g, (m, t, attrs, k) =>
    RU[k] ? `<${t}${attrs.replace(/\splaceholder="[^"]*"/, ` placeholder="${esc(RU[k])}"`)}>` : m);
  html = html.replace(/\splaceholder="[^"]*"([^>]*?)\sdata-ru-ph="([^"]*)"/g, ' placeholder="$2"$1');
  html = html.replace(/\saria-label="([^"]+)"/g, (m, v) => ARIA[v] ? ` aria-label="${ARIA[v]}"` : m);
  // sahifa havolalari: ruscha nusxasi borlari — ru/… (base sayt ildiziga qaraydi)
  html = html.replace(/\s(href|action)="([^"#:]*?)"/g, (m, attr, href) => {
    const p = href.replace(/[?#].*$/, '') || '';
    if (!p || p.startsWith('/') || p.startsWith('ru/') || !/\.html$/.test(p) || !hasRu(p)) return m;
    return ` ${attr}="ru/${href}"`;
  });
  return html;
}

module.exports = { RU, RU_ROOT, hasRu, toRu, withHreflang, hreflang, ruUrl, uzUrl, esc };
