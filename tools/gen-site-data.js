/* js/data-custom.js (admin'ning to'liq fayli) → sayt uchun yengil nusxa:
     js/data-site.js          — kichik: birinchi ko'rinadigan kinolar + tartib + bo'laklar yuklovchisi
     js/data-site-<k>.json    — qolgan kinolar bo'laklari (sahifa chizilgach fonda yuklanadi)
     js/data-desc.js          — «tavsif kerak» belgisi; tavsiflar: js/data-desc-<k>.json
   tools/bump-version.js, .github/workflows/data-guard.yml va cf-site.yml chaqiradi. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { buildSiteData } = require('../js/site-data-build.js');

const root = path.join(__dirname, '..');
const js = f => path.join(root, 'js', f);
const src = fs.readFileSync(js('data-custom.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src.replace(/^(const|let) /gm, 'var '), ctx);
if (!Array.isArray(ctx.CUSTOM_MOVIES)) throw new Error('data-custom.js o‘qilmadi');

// asosiy ro'yxat id'lari (data.js, kanallar, RuTube) — shularni almashtiruvchi kinolar birinchi bo'lakka
const bctx = { window: {} };
vm.createContext(bctx);
for (const f of ['data.js', 'data-channels.js', 'data-rutube.js']) {
  if (fs.existsSync(js(f))) vm.runInContext(fs.readFileSync(js(f), 'utf8').replace(/^(const|let) /gm, 'var '), bctx);
}
const baseIds = new Set((bctx.MOVIES || []).map(m => m.id));

const { site, desc, shards, descShards } = buildSiteData(ctx.CUSTOM_MOVIES, ctx.HIDDEN_MOVIES || [], { baseIds });
const writeIfChanged = (p, s) => { if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== s) fs.writeFileSync(p, s); };
writeIfChanged(js('data-site.js'), site);
writeIfChanged(js('data-desc.js'), desc);
const keep = new Set();
for (const [k, s] of Object.entries(shards)) { keep.add(`data-site-${k}.json`); writeIfChanged(js(`data-site-${k}.json`), s); }
for (const [k, s] of Object.entries(descShards)) { keep.add(`data-desc-${k}.json`); writeIfChanged(js(`data-desc-${k}.json`), s); }
// bo'sh qolgan eski bo'laklar
for (const f of fs.readdirSync(path.join(root, 'js'))) if (/^data-(site|desc)-\w+\.json$/.test(f) && !keep.has(f)) fs.unlinkSync(js(f));

const kb = s => Math.round(Buffer.byteLength(s) / 1024);
const sum = o => Object.values(o).reduce((a, s) => a + kb(s), 0);
console.log(`data-site.js: ${kb(site)} KB + ${Object.keys(shards).length} bo'lak ${sum(shards)} KB (to‘liq data-custom.js: ${kb(src)} KB), tavsiflar: ${Object.keys(descShards).length} bo'lak ${sum(descShards)} KB`);
