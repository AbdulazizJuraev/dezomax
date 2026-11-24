#!/usr/bin/env node
/* Ob-havo va valyuta sahifalari (2026-11-24): qiziqarli.html shablonidan
   ob-havo.html, valyuta.html va 14 ta shahar sahifasi ob-havo/<slug>.html yasaladi.
   Kontent js/kunlik.js da (brauzerda); bu yerda — sarlavha, tavsif, canonical, JSON-LD.
   bump-version.js chaqiradi (versiya ?v= qatorlari shablondan olinadi). */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const tpl = fs.readFileSync(path.join(ROOT, 'qiziqarli.html'), 'utf8');

const CITIES = [
  ['toshkent', 'Toshkent'], ['samarqand', 'Samarqand'], ['buxoro', 'Buxoro'], ['andijon', 'Andijon'],
  ['namangan', 'Namangan'], ['fargona', 'Farg‘ona'], ['qarshi', 'Qarshi'], ['termiz', 'Termiz'],
  ['nukus', 'Nukus'], ['urganch', 'Urganch'], ['navoiy', 'Navoiy'], ['jizzax', 'Jizzax'],
  ['guliston', 'Guliston'], ['nurafshon', 'Nurafshon']
];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function build({ file, title, desc, mainId, base, extra = '', ru = false }) {
  const url = 'https://dezomax.uz/' + file;
  let h = tpl;
  // sarlavha / tavsif / manzillar
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, '$1' + esc(desc))
    .replace(/(<meta property="og:title" content=")[^"]*/, '$1' + esc(title))
    .replace(/(<meta property="og:description" content=")[^"]*/, '$1' + esc(desc))
    .replace(/(<meta name="twitter:title" content=")[^"]*/, '$1' + esc(title))
    .replace(/(<meta name="twitter:description" content=")[^"]*/, '$1' + esc(desc))
    .replace(/(<meta property="og:url" content=")[^"]*/, '$1' + url)
    .replace(/(<link rel="canonical" href=")[^"]*/, '$1' + url);
  // ruscha versiyasi yo'q — faqat uz hreflang
  h = h.replace(/<link rel="alternate" hreflang="uz"[^>]*>\n/, '')
    .replace(/<link rel="alternate" hreflang="ru"[^>]*>\n/, '')
    .replace(/<link rel="alternate" hreflang="x-default"[^>]*>\n/, '')
    .replace(/<meta property="og:locale:alternate"[^>]*>\n/, '');
  if (base) h = h.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="../">');
  if (extra) h = h.replace('</head>', extra + '\n</head>');
  h = h.replace(/<main class="wrap fun-page" id="fun"/, `<main class="wrap kn-main" id="${mainId}"`);
  // sahifa skriptlari: fun.* o'rniga kunlik.js
  const v = (h.match(/js\/fun\.js\?v=(\w+)/) || [])[1] || '1';
  h = h.replace(/<script src="js\/ytplayer\.js[^\n]*\n/, '')
    .replace(/<script src="js\/fun-data\.js[^\n]*\n/, '')
    .replace(/<script src="js\/fun\.js[^"]*"><\/script>/, `<script src="js/kunlik.js?v=${v}"></script>`)
    .replace(/<script src="js\/thumbs\.js[^\n]*\n/, '');
  if (ru) h = h.replace('<html lang="uz">', '<html lang="ru">');
  fs.mkdirSync(path.dirname(path.join(ROOT, file)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, file), h);
}

const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
const crumbs = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: u })) });

build({
  file: 'ob-havo.html', mainId: 'wx',
  title: 'Ob-havo O‘zbekiston — bugun, ertaga va 10 kunlik prognoz | DezoMax',
  desc: 'Toshkent, Samarqand, Buxoro, Andijon, Namangan, Farg‘ona va boshqa shaharlarda ob-havo: hozirgi harorat, soatlik va 10 kunlik prognoz, shamol, namlik, quyosh chiqishi.',
  extra: ld(crumbs([['DezoMax', 'https://dezomax.uz/'], ['Ob-havo', 'https://dezomax.uz/ob-havo.html']]))
});
for (const [slug, name] of CITIES) {
  build({
    file: `ob-havo/${slug}.html`, mainId: 'wx', base: true,
    title: `${name} ob-havo — bugun, ertaga va 10 kunlik prognoz | DezoMax`,
    desc: `${name} shahrida ob-havo: hozirgi harorat, soatlik prognoz, ertangi va 10 kunlik ob-havo, shamol, namlik, bosim, quyosh chiqishi va botishi.`,
    extra: `<script>window.DZX_CITY='${slug}'</script>\n` + ld(crumbs([['DezoMax', 'https://dezomax.uz/'], ['Ob-havo', 'https://dezomax.uz/ob-havo.html'], [name, `https://dezomax.uz/ob-havo/${slug}.html`]]))
  });
}
build({
  file: 'valyuta.html', mainId: 'fx',
  title: 'Valyuta kursi bugun — dollar, yevro, rubl kursi | DezoMax',
  desc: 'Markaziy bank rasmiy valyuta kurslari: dollar, yevro, rubl, tenge, yuan va boshqalar. Konvertor, kurs o‘zgarishi va grafik — har kuni yangilanadi.',
  extra: ld(crumbs([['DezoMax', 'https://dezomax.uz/'], ['Valyuta kursi', 'https://dezomax.uz/valyuta.html']]))
});
console.log(`gen-weather-pages: ob-havo.html, valyuta.html, ${CITIES.length} shahar sahifasi`);
