/* ============================================================
   Ma'lumot qo'riqchisi (GitHub Actions — .github/workflows/data-guard.yml)
   ------------------------------------------------------------
   Har bir push'dan keyin kinolar fayllarini push'dan oldingi holat bilan solishtiradi:
     js/data-custom.js   — CUSTOM_MOVIES (qo'shilgan/tahrirlangan) va HIDDEN_MOVIES (yashirilgan)
     js/data-channels.js — CHANNEL_MOVIES (kanallardan; «Yangilash» hech narsani o'chirmaydi)
   Admin'dagi har bir amal ko'pi bilan BITTA yozuvni olib tashlaydi. Fayl buzilgan (o'qilmaydi)
   yoki bittadan ko'p yozuv yo'qolgan bo'lsa — oldingi holat avtomatik qaytariladi va
   GitHub'da ogohlantirish (issue) ochiladi (egasiga email keladi).
   Ataylab ko'p o'chirish kerak bo'lsa — commit xabarida [guard-skip].

   Ishga tushirish: BEFORE=<oldingi commit> node tools/data-guard.js
   Natija: guard-result.json ({ restored: [...], report: "..." })
   ============================================================ */

const fs = require('fs');
const vm = require('vm');
const { execSync } = require('child_process');

const BEFORE = process.env.BEFORE || 'HEAD~1';
const git = cmd => execSync(`git ${cmd}`, { maxBuffer: 256 << 20 }).toString('utf8');

const FILES = [
  { path: 'js/data-custom.js', lists: ['CUSTOM_MOVIES', 'HIDDEN_MOVIES'] },
  { path: 'js/data-channels.js', lists: ['CHANNEL_MOVIES', 'CHANNELS'] }
];

function parse(text) {
  const ctx = { console: { log() {}, warn() {} }, window: {}, document: { write() {} }, location: { pathname: '/' } };
  vm.createContext(ctx);
  vm.runInContext(String(text).replace(/^(const|let) /gm, 'var '), ctx, { timeout: 10000 });
  return ctx;
}

const message = (() => { try { return git('log -1 --format=%B'); } catch { return ''; } })();
const out = { restored: [], report: [] };

if (/\[guard-skip\]/i.test(message)) {
  out.report.push('Commit xabarida [guard-skip] — tekshiruv o‘tkazib yuborildi.');
} else {
  for (const f of FILES) {
    let prevText;
    try { prevText = git(`show ${BEFORE}:${f.path}`); } catch { continue; }   // oldin fayl yo'q edi
    if (!fs.existsSync(f.path)) { out.restored.push(f.path); out.report.push(`${f.path} o‘chirib yuborilgan — qaytarildi.`); fs.writeFileSync(f.path, prevText); continue; }
    const curText = fs.readFileSync(f.path, 'utf8');
    if (curText === prevText) continue;

    let prev;
    try { prev = parse(prevText); } catch { continue; }                         // oldingisi ham buzuq — solishtirib bo'lmaydi
    let cur, problem = '';
    try { cur = parse(curText); } catch (e) { problem = `fayl o‘qilmaydi (${e.message})`; }

    if (!problem) for (const name of f.lists) {
      const a = Array.isArray(prev[name]) ? prev[name].length : null;
      const b = Array.isArray(cur[name]) ? cur[name].length : null;
      if (a === null) continue;
      if (b === null) { problem = `${name} topilmadi`; break; }
      if (b < a - 1) { problem = `${name}: ${a} → ${b} (${a - b} ta yo‘qoldi)`; break; }
    }
    if (problem) {
      fs.writeFileSync(f.path, prevText);
      out.restored.push(f.path);
      out.report.push(`${f.path}: ${problem} — oldingi holat qaytarildi.`);
    } else {
      out.report.push(`${f.path}: joyida (${f.lists.map(n => `${n} ${Array.isArray(cur[n]) ? cur[n].length : '—'}`).join(', ')}).`);
    }
  }
}

out.report = out.report.join('\n');
fs.writeFileSync('guard-result.json', JSON.stringify(out, null, 2));
console.log(out.report || 'O‘zgarish yo‘q.');
