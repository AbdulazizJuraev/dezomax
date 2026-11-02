/* ============================================================
   Shorts: kinostudiyalarning rasmiy shortslari + har bir shortga mos kino (poster)
   ------------------------------------------------------------
   1) Har bir studiya (js/common.js → STUDIOS) rasmiy YouTube kanalining «Shorts» bo'limidan eng yangi
      PER_STUDIO tasi olinadi (faqat birinchi sahifa — YouTube cheklovi tufayli). FarZidGuy va boshqa
      ruxsat berilgan kanallarning shortslari tegilmaydi. Video yuklab olinmaydi — sayt YouTube pleyeri orqali ko'rsatadi.
   2) Har bir short (hammasi) nomi va heshteglari bo'yicha saytdagi kinoga bog'lanadi:
        m — kino id lari (kino sahifasidagi «Shorts» qatori uchun), p — o'sha kinoning posteri (short kartasi uchun).
      Faqat rasmiy manbali kinolar (js/seo-pages.js da sahifasi borlar) — DezoCloud/Telegram importlari emas.

   Ishlatish:  node tools/fetch-studio-shorts.js          (studiyalar + bog'lash)
               node tools/fetch-studio-shorts.js match    (faqat bog'lash, internetsiz)
   Keyin:      node tools/bump-version.js
   tools/fetch-yt-meta.js data-shorts.js ni qayta yozganda studiya shortslari va m/p saqlanadi.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SHORTS_PATH = path.join(root, 'js', 'data-shorts.js');
const PER_STUDIO = 20;
const matchOnly = process.argv[2] === 'match';

const load = (files, extra = {}) => {
  const c = { window: {}, ...extra }; c.window = c; vm.createContext(c);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8').replace(/^(const|let) /gm, 'var '), c);
  return c;
};
const commonSrc = fs.readFileSync(path.join(root, 'js', 'common.js'), 'utf8');
const sAt = commonSrc.indexOf('const STUDIOS');
const sctx = {}; vm.createContext(sctx);
vm.runInContext(commonSrc.slice(sAt, commonSrc.indexOf('];', sAt) + 2).replace(/^const /, 'var '), sctx);

const HEAD = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9', Cookie: 'SOCS=CAI; CONSENT=YES+1' };
const ADULT = /обнаж|голая|голый|эрот|секс|18\+|nude|naked|yalang.och/i;
const uzQuotes = s => s.replace(/([oOgG])['‘’`ʻ]/g, '$1‘').replace(/['`ʻ]/g, '’');
// tools/fetch-yt-meta.js shortTitle bilan bir xil: heshteg/emojisiz, KATTA HARFLAR — oddiy
function shortTitle(raw) {
  let t = String(raw).replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
  const letters = t.replace(/[^\p{L}]/gu, '');
  if (letters && letters === letters.toUpperCase()) t = t.toLowerCase();
  t = t.replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/[\s|\-–—:]+$/, '');
  return uzQuotes(t || String(raw).trim());
}

// kanal sahifasidan: kanal id (UC…) va «Shorts» bo'limining birinchi sahifasi
async function channelShorts(url) {
  const html = await (await fetch(url.replace(/\/+$/, '') + '/shorts?hl=en', { headers: HEAD, signal: AbortSignal.timeout(20000) })).text();
  const out = [];
  const at = html.indexOf('ytInitialData = ');
  if (at < 0) return out;
  let depth = 0, i = at + 16, start = i;
  for (; i < html.length; i++) { const ch = html[i]; if (ch === '{') depth++; else if (ch === '}' && --depth === 0) break; else if (ch === '"') { for (i++; html[i] !== '"'; i++) if (html[i] === '\\') i++; } }
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.shortsLockupViewModel) {
      const s = o.shortsLockupViewModel, id = JSON.stringify(s).match(/"videoId":"([\w-]{11})"/)?.[1];
      if (id) out.push({ id, title: s.overlayMetadata?.primaryText?.content || s.accessibilityText || '' });
      return;
    }
    if (o.reelItemRenderer) { out.push({ id: o.reelItemRenderer.videoId, title: o.reelItemRenderer.headline?.simpleText || '' }); return; }
    for (const k in o) walk(o[k]);
  })(JSON.parse(html.slice(start, i + 1)));
  return out;
}

/* ---------- short → kino ---------- */
const norm = s => String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/['‘’`ʻʼ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const STOP = new Set(['marvel', 'disney', 'pixar', 'dc', 'film', 'kino', 'trailer', 'treyler', 'shorts', 'official', 'serial', 'multfilm', 'premyera', 'qasoskor']);
// FarZidGuy o'zbekcha so'zlari → kino turkumi (kino nomida shu so'z bo'lsa — bog'lanadi)
const FRANCHISE = [
  [/transformer|трансформ|avtobot|autobot|deseptikon|decepticon|optimus|megatron|bumblebee|bambilbi|shockwave|starscream|wheeljack|lockdown|wrekker|sentinel|sentinal|drift\b/, /transformer|трансформ/],
  [/qasoskor|avenger|мстител|tanos|thanos|altron|ultron/, /qasoskorlar|avengers|мстители/],
  [/\bthor\b|\btor\b|torga|bolg.?a|mjolnir|мьёльнир|\bтор\b|momaqaldiroq/, /\bthor\b|\bтор\b/],
  [/temir odam|iron ?man|железн\S* челове/, /iron man|temir odam|железный человек/],
  [/spider|o.?rgimchak|паук/, /spider|o.?rgimchak|паук/],
  [/dedpul|deadpool|дэдпул/, /deadpool|дэдпул/],
  [/betmen|batman|бэтмен/, /batman|бэтмен|betmen/],
  [/supermen|superman|супермен/, /superman|супермен|supermen/],
  [/joker|джокер/, /joker|джокер/],
  [/venom|веном/, /venom|веном/],
  [/\bloki\b|\bлоки\b/, /\bloki\b|\bлоки\b/],
  [/halk|hulk|халк/, /\bhulk\b|\bхалк\b/],
  [/kapitan amerika|captain america|капитан\S* америк/, /captain america|капитан америка|kapitan amerika/],
  [/стражи галакт|guardians of the galaxy|galaktika qo.?riqchi|yulduzlar lordi|star.?lord/, /guardians of the galaxy|стражи галактики|galaktika/],
  [/star ?wars|yulduzlar jang|звёздн\S* войн|звездн\S* войн/, /star wars|звездные войны|yulduzlar jang/],
  [/harry ?pot|garri ?pot|гарри поттер/, /harry potter|гарри поттер|garri potter/],
  [/deyneris|daenerys|taxtlar|thrones|престол/, /game of thrones|игра престолов|taxtlar o/],
  [/wednesday|uenzdey|уэнсдэй/, /wednesday|уэнсдэй/],
  [/kung ?fu|tay ?lung/, /kung fu|кунг фу/],
  [/mortal kombat|смертельная битва/, /mortal kombat|смертельная битва/],
  [/makvin|mcqueen|молния маккуин/, /\bcars\b|тачки/],
  [/adolat liga|justice league|лига справедливости/, /justice league|лига справедливости|adolat ligasi/],
  [/thunderbolt|громовержц/, /thunderbolts|громовержцы/],
  [/ikaris|selestial|celestial|eternals|вечные/, /eternals|вечные/],
  [/wonder ?woman|чудо женщин/, /wonder woman|чудо женщина/],
  [/aquaman|аквамен/, /aquaman|аквамен/],
  [/\bflash\b|флэш/, /\bflash\b|флэш/],
];

function matcher() {
  const c = load(['js/data.js', 'js/data-site.js', 'js/data-channels.js', 'js/seo-pages.js']);
  const ok = c.SEO_PAGES || {};
  const seen = new Set(), films = [];
  for (const m of [...(c.CHANNEL_MOVIES || []), ...(c.CUSTOM_MOVIES || []), ...(c.MOVIES || [])]) {
    // kanal tahlil videolari (FarZidGuy) — kino emas, posteri ham YouTube kadri
    if (!m || seen.has(m.id) || !ok[m.id] || !m.poster || m.franchise === 'tahlil' || m.type === 'tahlil' || m.ch === 'farzidguy'
      || /tahlil|haqida|обзор|разбор|теори/i.test(JSON.stringify(m.title))) continue;
    seen.add(m.id);
    const names = [m.title && m.title.uz, m.title && m.title.ru, ...(m.tags || [])].map(norm)
      .filter(n => n && !STOP.has(n) && (n.includes(' ') ? n.length >= 6 : n.length >= 7));   // «Yovuz» kabi qisqa so'zlar — tasodifiy moslik
    films.push({ id: m.id, year: +m.year || 0, poster: m.poster, names: [...new Set(names)], all: names.join(' | ') });
  }
  return text => {
    const t = ' ' + norm(text) + ' ';
    let hit = films.filter(f => f.names.some(n => t.includes(' ' + n + ' ')));
    if (hit.length > 1) {        // eng uzun (aniq) nom mos kelganlari qoladi: «Avengers Endgame» > «Avengers»
      const len = f => Math.max(...f.names.filter(n => t.includes(' ' + n + ' ')).map(n => n.length));
      const best = Math.max(...hit.map(len));
      hit = hit.filter(f => len(f) === best);
    }
    // turkum so'zi bor bo'lsa — faqat shu turkum kinolari (aniq nom ham turkum ichida bo'lsa — o'sha)
    const fr = FRANCHISE.find(([rx]) => rx.test(t));
    if (fr) {
      const fam = films.filter(f => fr[1].test(f.all));
      const both = hit.filter(f => fam.includes(f));
      hit = both.length ? both : fam;                        // turkum kinosi saytda yo'q — tasodifiy nomga bog'lanmaydi
    }
    hit.sort((a, b) => b.year - a.year);
    hit = hit.slice(0, 12);
    return hit.length ? { m: hit.map(f => f.id), p: hit[0].poster } : null;
  };
}

(async () => {
  const c = load(['js/data-shorts.js']);
  let shorts = (c.SHORTS || []).slice();
  const raw = new Map();                                       // id → asl nomi (heshteglar bilan) — bog'lash uchun
  const studioKeys = new Set(sctx.STUDIOS.map(s => s.key));

  if (!matchOnly) {
    const fresh = [], byUrl = new Set();
    for (const st of sctx.STUDIOS) {
      const url = String(st.channel || '').toLowerCase();
      if (!url || byUrl.has(url)) continue;                   // DreamWorks = Universal kanali
      byUrl.add(url);
      try {
        const items = (await channelShorts(st.channel)).filter(x => /^[\w-]{11}$/.test(x.id) && x.title && !ADULT.test(x.title)).slice(0, PER_STUDIO);
        for (const x of items) { raw.set(x.id, x.title); fresh.push({ id: x.id, t: shortTitle(x.title), ch: st.key, n: st.name, u: st.channel }); }
        console.log(`${st.name}: ${items.length} ta shorts`);
      } catch (e) { console.warn(st.name, e.message); }
      await new Promise(r => setTimeout(r, 1500));
    }
    if (fresh.length) {
      const have = new Set();
      shorts = shorts.filter(s => !studioKeys.has(s.ch)).concat(fresh).filter(s => !have.has(s.id) && have.add(s.id));
    }
    // FarZidGuy va boshqalarning asl nomlari (heshteglarda kino nomi bo'ladi) — to'lov serveri keshidan, 1 so'rov
    for (const chId of ['UC40y8Eqvoans8S-n8bBqoOw', 'UCWIoDsZugYNNXqdxqrmbUog']) {
      try { for (const x of (await (await fetch('https://pay.dezomax.uz/api/yt/shorts?ch=' + chId)).json()).items || []) raw.set(x.id, x.title); } catch {}
    }
  }

  const match = matcher();
  let linked = 0;
  shorts = shorts.map(s => {
    const { m, p, ...rest } = s;
    const r = match(`${s.t} ${raw.get(s.id) || ''}`.replace(/#/g, ' '));
    if (r) linked++;
    return r ? { ...rest, m: r.m, p: r.p } : rest;
  });

  fs.writeFileSync(SHORTS_PATH,
    `/* DezoMax Shorts — ruxsat berilgan kanallar va rasmiy studiyalarning qisqa videolari (tools/fetch-yt-meta.js, tools/fetch-studio-shorts.js).\n` +
    `   YouTube pleyeri orqali ko'rsatiladi (shorts.html). id — YouTube video ID, t — nomi, s — soniya, m — mos kinolar id, p — kino posteri. */\n` +
    `var SHORTS = /*SHORTS*/[\n${shorts.map(x => JSON.stringify(x)).join(',\n')}\n]/*ENDSHORTS*/;\n`);
  const by = {};
  shorts.forEach(s => { by[s.ch] = (by[s.ch] || 0) + 1; });
  console.log(`js/data-shorts.js — ${shorts.length} ta shorts (${Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ')}), kinoga bog'langan: ${linked}`);
})();
