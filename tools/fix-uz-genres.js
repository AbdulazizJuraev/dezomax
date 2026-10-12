/* js/data.js dagi rasmiy o'zbek filmlari (YouTube kanallaridan) — janri faqat «drama» bo'lsa, kanal egasining
   video tavsifidagi janrdan (server/server.js → ytMeta) to'g'rilanadi. Telegram/DezoCloud kinolariga tegilmaydi.
   node tools/fix-uz-genres.js   (YouTube bloklamasligi uchun ketma-ket, 2,5 s oraliq bilan) */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ytMeta } = require('../server/server.js');

const F = path.join(__dirname, '..', 'js', 'data.js');
let src = fs.readFileSync(F, 'utf8');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src.replace(/^(const|let) /gm, 'var '), ctx);

const todo = ctx.MOVIES.filter(m => (m.genres || []).join() === 'drama' && /youtube\.com|youtu\.be/.test(String(m.video || '')));
console.log(`tekshiriladi: ${todo.length} ta`);

(async () => {
  let fixed = 0, fails = 0;
  for (const m of todo) {
    if (fails >= 5) { console.log('YouTube blokladi — keyinroq qayta ishga tushiring'); break; }
    const vid = (String(m.video).match(/[?&]v=([\w-]{11})/) || String(m.video).match(/youtu\.be\/([\w-]{11})/) || [])[1];
    if (!vid) continue;
    await new Promise(r => setTimeout(r, 2500));
    let meta = null;
    try { meta = await ytMeta(vid); } catch {}
    if (!meta || meta.error) { fails++; continue; }
    fails = 0;
    const g = (meta.genres || []).filter(x => x && x !== 'drama').length ? meta.genres : null;
    if (!g) continue;
    // aynan shu kinoning bloki ichidagi birinchi «genres: [...]» almashtiriladi
    const at = src.search(new RegExp(`\\bid: ${m.id},`));
    if (at < 0) continue;
    const rel = src.slice(at).search(/genres: \[[^\]]*\]/);
    if (rel < 0 || rel > 600) continue;
    const pos = at + rel, end = src.indexOf(']', pos) + 1;
    src = src.slice(0, pos) + `genres: [${g.map(x => `'${x}'`).join(', ')}]` + src.slice(end);
    fixed++;
    console.log(`${m.id} ${m.title.uz}: ${g.join(', ')}`);
  }
  fs.writeFileSync(F, src);
  console.log(`to'g'rilandi: ${fixed} ta`);
})();
