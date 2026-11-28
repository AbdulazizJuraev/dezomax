/* ============================================================
   DezoMax — Telegram kanaldagi ESKI postlarni yangi ko'rinishga o'tkazish (bir martalik, 2026-11-28)
   ------------------------------------------------------------
   Kanalning ochiq sahifasidan (t.me/s/dezomaxuz) har bir post va undagi kino havolasi (dezomax.uz/kino/<sahifa>.html)
   olinadi; matn tools/tg-post.js caption() bilan almashtiriladi, eski «Ko'rish» tugmalari olib tashlanadi.
   --media=456,457 — shu postlarda rasm ham kinoning o'z posteriga almashtiriladi (bezakli sinov rasmlari).
   Kino havolasi yo'q postlar (kanal tavsifi, reklama) va saytdan o'chgan kinolar — tegilmaydi.
   Ishga tushirish: GitHub Actions → tg-post → refresh: true. Lokal sinov: node tools/tg-refresh.js --dry
   ============================================================ */
const { caption, webpToJpeg, MOVIES, PAGES, abs, CHANNEL, TOKEN } = require('./tg-post.js');

const DRY = process.argv.includes('--dry') || !TOKEN;
const MEDIA = new Set(((process.argv.find(a => a.startsWith('--media=')) || '').split('=')[1] || '').split(',').filter(Boolean).map(Number));
const LIMIT = Number((process.argv.find(a => a.startsWith('--limit=')) || '').split('=')[1]) || Infinity;
const user = CHANNEL.replace(/^@/, '');
const bySlug = new Map(MOVIES.filter(m => PAGES[m.id]).map(m => [PAGES[m.id], m]));
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function channelPosts() {
  const posts = new Map();
  let before = '';
  for (let page = 0; page < 200; page++) {
    const html = await fetch(`https://t.me/s/${user}${before ? `?before=${before}` : ''}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text());
    const ids = [];
    for (const blk of html.split('tgme_widget_message_wrap').slice(1)) {
      const id = +((blk.match(new RegExp(`data-post="${user}/(\\d+)"`)) || [])[1] || 0);
      if (!id) continue;
      ids.push(id);
      const slug = (blk.match(/dezomax\.uz\/kino\/([\w-]+)\.html/) || [])[1];
      posts.set(id, { slug, photo: /tgme_widget_message_photo_wrap/.test(blk) });
    }
    if (!ids.length || Math.min(...ids) <= 1) break;
    before = Math.min(...ids);
    await sleep(400);
  }
  return [...posts.entries()].sort((a, b) => a[0] - b[0]);
}

async function api(method, body, isForm = false) {
  for (let i = 0; i < 5; i++) {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, isForm
      ? { method: 'POST', body }
      : { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (j.error_code === 429) { await sleep(((j.parameters?.retry_after || 5) + 1) * 1000); continue; }   // Telegram: sekinroq
    return j;
  }
  return { ok: false, description: 'ko‘p urinish (429)' };
}

(async () => {
  if (DRY) console.log('Sinov rejimi — hech narsa o‘zgartirilmaydi');
  const posts = await channelPosts();
  console.log(`kanalda ${posts.length} ta post`);
  let ok = 0, same = 0, skip = 0, fail = 0, n = 0;
  for (const [id, p] of posts) {
    if (n >= LIMIT) break;
    const m = p.slug && bySlug.get(p.slug);
    if (!m) { skip++; continue; }
    n++;
    const cap = caption(m);
    const empty = { inline_keyboard: [] };   // eski «Ko'rish» tugmasi olib tashlanadi
    if (DRY) { if (n <= 3) console.log(`— #${id} «${m.title?.uz}»${MEDIA.has(id) ? ' (rasm ham)' : ''}\n${cap}\n`); ok++; continue; }
    let j;
    if (MEDIA.has(id) && p.photo) {
      const src = m.vposter || m.hposter || m.poster;
      const jpg = webpToJpeg(src);
      if (jpg) {
        const fd = new FormData();
        fd.append('chat_id', CHANNEL); fd.append('message_id', String(id));
        fd.append('media', JSON.stringify({ type: 'photo', media: 'attach://poster', caption: cap, parse_mode: 'HTML' }));
        fd.append('poster', new Blob([jpg], { type: 'image/jpeg' }), 'poster.jpg');
        fd.append('reply_markup', JSON.stringify(empty));
        j = await api('editMessageMedia', fd, true);
      } else {
        j = await api('editMessageMedia', { chat_id: CHANNEL, message_id: id, media: { type: 'photo', media: abs(src), caption: cap, parse_mode: 'HTML' }, reply_markup: empty });
      }
    } else if (p.photo) {
      j = await api('editMessageCaption', { chat_id: CHANNEL, message_id: id, caption: cap, parse_mode: 'HTML', reply_markup: empty });
    } else {
      j = await api('editMessageText', { chat_id: CHANNEL, message_id: id, text: `${cap}`, parse_mode: 'HTML', reply_markup: empty });
    }
    if (j.ok) ok++;
    else if (/not modified/i.test(j.description || '')) same++;
    else { fail++; console.log(`✗ #${id} «${m.title?.uz}»: ${j.description}`); }
    if ((ok + same + fail) % 25 === 0) console.log(`… ${ok + same + fail} ta ko‘rib chiqildi (${ok} yangilandi)`);
    await sleep(3000);
  }
  console.log(`Tayyor: ${ok} ta yangilandi, ${same} tasi allaqachon yangi, ${skip} tasi kino posti emas yoki kino saytda yo‘q, ${fail} ta xato`);
  if (!DRY && fail > ok) process.exit(1);
})();
