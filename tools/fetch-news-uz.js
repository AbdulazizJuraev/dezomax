/* Sport sahifasi uchun o'zbekcha (va ruscha) sport yangiliklari — Sports.uz'ning ochiq RSS lentasidan.
   Sarlavha, qisqa tavsif, rasm va asl maqolaga havola olinadi; maqola matni ko'chirilmaydi —
   «To'liq o'qish» Sports.uz saytining o'zida ochiladi.
   GitHub Actions (.github/workflows/news-uz.yml) har 30 daqiqada ishga tushiradi va natijani
   news-data shoxchasiga yozadi; sayt uni raw.githubusercontent.com dan o'qiydi (js/sport.js loadNews).
   Qo'lda:  node tools/fetch-news-uz.js chiqish.json */
const fs = require('fs');

const FEEDS = { uz: 'https://sports.uz/oz/rss', ru: 'https://sports.uz/ru/rss' };
const LIMIT = 15;

const unescape = s => String(s || '')
  .replace(/^<!\[CDATA\[|\]\]>$/g, '')
  .replace(/<[^>]+>/g, '')
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? unescape(m[1]) : ''; };
const https = u => /^https:\/\//.test(u) ? u : '';

async function feed(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'DezoMax news (+https://dezomax.uz)' } });
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  const xml = await r.text();
  return (xml.match(/<item>[\s\S]*?<\/item>/g) || []).slice(0, LIMIT).map(it => ({
    title: tag(it, 'title'),
    desc: tag(it, 'description').slice(0, 220),
    link: https(tag(it, 'link')),
    img: https((it.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] || ''),
    date: new Date(tag(it, 'pubDate')).toISOString()
  })).filter(x => x.title && x.link);
}

(async () => {
  const out = { source: 'Sports.uz', url: 'https://sports.uz', at: new Date().toISOString() };
  for (const [lang, url] of Object.entries(FEEDS)) {
    try { out[lang] = await feed(url); } catch (e) { console.error(e.message); out[lang] = []; }
  }
  if (!out.uz.length && !out.ru.length) { console.error('yangilik olinmadi'); process.exit(1); }
  fs.writeFileSync(process.argv[2] || 'news-uz.json', JSON.stringify(out));
  console.log(`uz ${out.uz.length}, ru ${out.ru.length}`);
})();
