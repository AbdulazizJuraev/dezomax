#!/usr/bin/env node
/* ============================================================
   Qiziqarli: to'liq arxivi YO'Q kanallar (Nat Geo, BBC Earth, Tasty, …) saytda YouTube RSS orqali ko'rsatiladi
   (Worker /_yt/feed — har pleylistdan oxirgi 15 ta). Shu videolar ro'yxati → data/fun-feed.json:
     { "<UC…>": { "lf": [[id, nom, ko'rishlar, "YYYY-MM-DD"], …], "sh": [...], "lv": [...] } }
   tools/gen-video-seo.js shu fayldan /video/ sahifalari, sitemap va admin statistikasini yasaydi.
   Faqat RSS (yengil, 3 so'rov / kanal). tools/fetch-fun-all.js (to'liq arxiv) BU EMAS — u ishga tushirilmaydi.
   Tarmoq xatosida kanalning eski ro'yxati saqlanib qoladi. bump-version.js chaqiradi. 2026-11-25
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const OUT = path.join(root, 'data', 'fun-feed.json');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/fun-data.js'), 'utf8').replace(/^const /m, 'var '), ctx);
const chans = (ctx.FUN_SECTIONS || []).flatMap(s => s.ch || []).filter(c => /^UC[\w-]{22}$/.test(c.id) && !(c.all && fs.existsSync(path.join(root, c.all))));

let prev = {};
try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) {}
const unx = s => String(s || '').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function rss(list) {
  const r = await fetch('https://www.youtube.com/feeds/videos.xml?playlist_id=' + list, { headers: { 'user-agent': 'DezoMax/1.0 https://dezomax.uz' } });
  if (r.status === 404) return [];          // bunday pleylist yo'q (masalan, kanalda shorts yo'q)
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return (await r.text()).split('<entry>').slice(1).map(e => [
    (e.match(/<yt:videoId>([\w-]{11})</) || [])[1],
    unx((e.match(/<title>([^<]*)</) || [])[1]),
    +((e.match(/<media:statistics views="(\d+)"/) || [])[1] || 0),
    ((e.match(/<published>(\d{4}-\d\d-\d\d)/) || [])[1] || '')
  ]).filter(x => x[0]);
}

(async () => {
  const out = {};
  let ok = 0, fail = 0, n = 0;
  for (const c of chans) {
    const u = c.id.slice(2);
    try {
      const [lf, sh, lv] = await Promise.all(['UULF', 'UUSH', 'UULV'].map(p => rss(p + u)));
      out[c.id] = { lf, sh, lv };
      n += lf.length + sh.length + lv.length; ok++;
    } catch (e) {
      if (prev[c.id]) out[c.id] = prev[c.id];
      fail++;
    }
  }
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log(`fetch-fun-feed: ${ok} kanal (${n} video)${fail ? `, ${fail} tasida xato — eski ro'yxat qoldi` : ''}`);
})();
