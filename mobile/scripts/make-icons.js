/* DezoMax logotipidan ilova ikonkasi va ochilish ekrani rasmlarini yasash (sharp) */
const path = require('path');
const sharp = require(require.resolve('sharp', { paths: [path.dirname(require.resolve('@capacitor/assets/package.json'))] }));

const OUT = path.join(__dirname, '..', 'assets');

// Saytdagi logo-mark: gradient to'rtburchak ichida kinolenta
const film = `<g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2.5" y="4" width="19" height="16" rx="2.5"/>
  <path d="M7 4v16M17 4v16M2.5 12h19M2.5 8h4.5M2.5 16h4.5M17 8h4.5M17 16h4.5"/></g>`;

const grad = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#ff2e4c"/><stop offset=".5" stop-color="#ff5e3a"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>`;

// To'liq ikonka (eski Android / Play Store)
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${grad}
  <rect width="1024" height="1024" rx="230" fill="url(#g)"/>
  <g transform="translate(262 262) scale(20.8)">${film}</g></svg>`;

// Adaptive: fon + old qatlam (markaziy 66% xavfsiz zona)
const bg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${grad}<rect width="1024" height="1024" fill="url(#g)"/></svg>`;
const fg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <g transform="translate(332 332) scale(15)">${film}</g></svg>`;

// Ochilish ekrani: qora fon, markazda logo va nom
const splash = dark => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">${grad}
  <rect width="2732" height="2732" fill="${dark ? '#07080c' : '#07080c'}"/>
  <rect x="1166" y="1016" width="400" height="400" rx="96" fill="url(#g)"/>
  <g transform="translate(1246 1096) scale(10)">${film}</g>
  <text x="1366" y="1620" font-family="Segoe UI, Arial, sans-serif" font-size="150" font-weight="800" text-anchor="middle" fill="#fff">Dezo<tspan fill="#ff5e3a">Max</tspan></text></svg>`;

(async () => {
  const jobs = [
    ['icon-only.png', icon, 1024],
    ['icon-background.png', bg, 1024],
    ['icon-foreground.png', fg, 1024],
    ['splash.png', splash(false), 2732],
    ['splash-dark.png', splash(true), 2732]
  ];
  for (const [name, svg, size] of jobs) {
    await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(OUT, name));
    console.log('assets/' + name);
  }
})();
