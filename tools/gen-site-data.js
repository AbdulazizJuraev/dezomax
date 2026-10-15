/* js/data-custom.js (admin'ning to'liq fayli) → js/data-site.js + js/data-desc.js (sayt uchun yengil nusxa).
   tools/bump-version.js va .github/workflows/site-data.yml chaqiradi. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { buildSiteData } = require('../js/site-data-build.js');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js', 'data-custom.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src.replace(/^(const|let) /gm, 'var '), ctx);
if (!Array.isArray(ctx.CUSTOM_MOVIES)) throw new Error('data-custom.js o‘qilmadi');
const { site, desc } = buildSiteData(ctx.CUSTOM_MOVIES, ctx.HIDDEN_MOVIES || []);
fs.writeFileSync(path.join(root, 'js', 'data-site.js'), site);
fs.writeFileSync(path.join(root, 'js', 'data-desc.js'), desc);
const kb = s => Math.round(Buffer.byteLength(s) / 1024);
console.log(`data-site.js: ${kb(site)} KB (to‘liq data-custom.js: ${kb(src)} KB), data-desc.js: ${kb(desc)} KB`);
