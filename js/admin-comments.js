/* DezoMax admin — «Sharhlar» (2026-11-26, admin-maket asosida).
   Saytdagi barcha izohlar bir joyda: qidiruv, Yangi (24 soat) / Yashirilgan, yashirish, qaytarish, o'chirish.
   Ma'lumot to'lov serverida (server/server.js → /admin/comments, /admin/comment). Kirish — admin'ning GitHub tokeni
   (server uni api.github.com orqali tekshiradi: omborga yozish huquqi bo'lsa — ruxsat). admin.js'dan keyin yuklanadi. */
const CM_API = 'https://pay.dezomax.uz';
const cm = { counts: null, top: [], items: [], more: false, f: 'all', q: '', err: '', loading: false, last: [] };

async function cmReq(path, body) {
  let r;
  try {
    r = await fetch(CM_API + path, {
      method: body ? 'POST' : 'GET',
      headers: { authorization: 'GitHub ' + token(), ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined, cache: 'no-store'
    });
  } catch {
    // eski server /admin/* uchun CORS javobini bermaydi — brauzer so'rovni to'xtatadi
    throw new Error('Server bilan aloqa yo‘q. pay.dezomax.uz’dagi server.js hali yangilanmagan bo‘lishi mumkin.');
  }
  const j = await r.json().catch(() => null);
  if (r.status === 404 && !(j && j.error === 'Izoh topilmadi')) throw new Error('Server hali yangilanmagan: pay.dezomax.uz’da server.js’ni yangilab, qayta ishga tushiring.');
  if (r.status === 401) throw new Error('Server GitHub tokenni tasdiqlamadi (omborga yozish huquqi kerak).');
  if (!r.ok) throw new Error((j && j.error) || 'Server xatosi (' + r.status + ')');
  return j;
}

let cmMovies = null;
function cmMovie(id) {
  if (!cmMovies) {
    cmMovies = new Map();
    for (const m of (typeof CHANNEL_MOVIES !== 'undefined' ? CHANNEL_MOVIES : [])) cmMovies.set(m.id, m);
    for (const m of allMovies()) cmMovies.set(m.id, m);
  }
  return cmMovies.get(+id) || null;
}
const cmTitle = id => { const m = cmMovie(id); return m ? (m.title?.uz || m.title?.ru || m.title || '#' + id) : 'Kino #' + id; };
const CM_COLORS = ['#c6ff3d', '#7cc4ff', '#ffb547', '#ff8fb1', '#9b8cff', '#5eead4'];
const cmColor = s => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return CM_COLORS[h % CM_COLORS.length]; };
function cmAgo(at) {
  const s = Math.max(0, (Date.now() - at) / 1000);
  if (s < 60) return 'hozirgina';
  if (s < 3600) return Math.floor(s / 60) + ' daqiqa oldin';
  if (s < 86400) return Math.floor(s / 3600) + ' soat oldin';
  if (s < 172800) return 'kecha';
  if (s < 86400 * 30) return Math.floor(s / 86400) + ' kun oldin';
  const d = new Date(at); return `${d.getDate()}-${UZ_MON[d.getMonth()]} ${d.getFullYear()}`;
}
const CM_KIND = { taklif: '💡 Taklif', xato: '🐞 Xato', maqtov: '❤️ Maqtov', boshqa: '💬 Boshqa' };
const CM_IC = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
  open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};
if (typeof A4_ICONS !== 'undefined') A4_ICONS.chat = CM_IC.chat;

function cmHTML(c, compact) {
  const color = cmColor(c.uid || c.name);
  const isNew = !c.hidden && Date.now() - c.at < 86400000;
  const fb = !c.movie;   // «DezoMax haqida fikr» (fikr.html) — saytda ko'rinmaydi, yashirish = arxivga olish
  const acts = compact ? '' : `
    ${fb ? '' : `<a class="pz-act" href="https://dezomax.uz/movie.html?id=${c.movie}#comments" target="_blank" rel="noopener">${CM_IC.open}Kinoga</a>`}
    ${c.hidden ? `<button class="pz-act" type="button" data-cm="show">${ITEM_ICONS.eye}${fb ? 'Arxivdan qaytarish' : 'Ko‘rsatish'}</button>` : `<button class="pz-act" type="button" data-cm="hide">${ITEM_ICONS.eyeOff}${fb ? 'Ko‘rildi · arxiv' : 'Yashirish'}</button>`}
    <button class="pz-act is-danger" type="button" data-cm="delete">${ITEM_ICONS.trash}O‘chirish</button>`;
  const where = fb ? `<span class="pz-chip is-fb">${CM_IC.chat}DezoMax haqida</span>${c.kind ? `<span class="pz-chip">${CM_KIND[c.kind] || esc(c.kind)}</span>` : ''}${c.rating ? `<span class="pz-chip is-star">${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)}</span>` : ''}`
    : `<span class="pz-chip">${CM_IC.film}${esc(cmTitle(c.movie))}</span>`;
  const extra = fb ? [c.contact ? `aloqa: <b>${esc(c.contact)}</b>` : '', c.src === 'app' ? 'ilovadan' : c.src === 'web' ? 'saytdan' : ''].filter(Boolean).join(' · ') : '';
  return `<article class="pz-c${c.hidden ? ' is-hidden' : ''}${fb ? ' is-fb' : ''}" data-id="${c.id}">
    <span class="pz-c-ava" style="background:${color}">${esc((c.name || 'T').trim().charAt(0).toUpperCase())}</span>
    <div class="pz-c-b">
      <div class="pz-c-h"><b>${esc(c.name)}</b>${where}${isNew ? '<span class="pz-chip is-new">Yangi</span>' : ''}${c.hidden ? `<span class="pz-chip">${fb ? 'Arxivda' : 'Yashirilgan'}</span>` : ''}</div>
      <p class="pz-c-t">${esc(c.text)}</p>
      <div class="pz-c-f"><span class="pz-time">${cmAgo(c.at)}${extra ? ' · ' + extra : ''}</span>${acts}</div>
    </div></article>`;
}

function cmBadge() {
  const n = cm.counts ? cm.counts.new : 0;
  const it = document.querySelector('.a4-it[data-view="comments"]');
  if (!it) return;
  let em = it.querySelector('em');
  if (!n) { em?.remove(); return; }
  if (!em) { em = document.createElement('em'); em.className = 'n'; it.appendChild(em); }
  em.textContent = n;
}

/* Panel: «Yangi sharhlar» kartasi va «Oxirgi sharhlar» — admin ochilganda bir marta, keyin 2 daqiqada bir yangilanadi */
let cmSumAt = 0;
async function cmLoadSummary(force) {
  if (!force && Date.now() - cmSumAt < 120000 && cm.counts) return cmPaintSummary();
  cmSumAt = Date.now();
  try {
    const j = await cmReq('/admin/comments?limit=4');
    cm.counts = j.counts; cm.top = j.top; cm.last = j.items; cm.err = '';
  } catch (e) { cm.err = e.message; }
  cmPaintSummary();
}
function cmPaintSummary() {
  cmBadge();
  const k = document.getElementById('pzCmKpi'), last = document.getElementById('pzCmLast');
  const fmt = n => Number(n).toLocaleString('ru-RU').replace(/,/g, ' ');
  if (k) {
    if (cm.counts) k.innerHTML = `<p class="pz-kl">Yangi sharhlar</p><p class="pz-kv"><span>${fmt(cm.counts.new)}</span><b class="up">${fmt(cm.counts.week)} shu hafta</b></p><p class="pz-kf">jami ${fmt(cm.counts.all)} · ko‘rib chiqish →</p>`;
    else if (cm.err) k.innerHTML = `<p class="pz-kl">Sharhlar</p><p class="pz-kv">—</p><p class="pz-kf">server bilan aloqa yo‘q</p>`;
  }
  if (last) last.innerHTML = cm.last.length ? cm.last.map(c => cmHTML(c, true)).join('')
    : `<p class="a4-sub">${cm.err ? esc(cm.err) : 'Hali sharh yo‘q'}</p>`;
}

async function cmLoad(reset) {
  if (cm.loading) return;
  cm.loading = true;
  const before = !reset && cm.items.length ? cm.items[cm.items.length - 1].id : 0;
  try {
    const j = await cmReq(`/admin/comments?f=${cm.f}&limit=40${cm.q ? '&q=' + encodeURIComponent(cm.q) : ''}${before ? '&before=' + before : ''}`);
    cm.items = reset ? j.items : cm.items.concat(j.items);
    cm.more = j.more; cm.counts = j.counts; cm.top = j.top; cm.err = ''; cmSumAt = Date.now();
  } catch (e) { cm.err = e.message; if (reset) cm.items = []; }
  cm.loading = false;
  cmPaintList();
}

function cmPaintList() {
  const box = document.getElementById('pzCmList');
  if (!box) return;
  cmBadge();
  const fmt = n => Number(n || 0).toLocaleString('ru-RU').replace(/,/g, ' ');
  const tabs = document.getElementById('pzCmTabs');
  if (tabs && cm.counts) {
    tabs.querySelector('[data-f="all"] em').textContent = fmt(cm.counts.all);
    tabs.querySelector('[data-f="new"] em').textContent = fmt(cm.counts.new);
    tabs.querySelector('[data-f="hidden"] em').textContent = fmt(cm.counts.hidden);
    tabs.querySelector('[data-f="feedback"] em').textContent = fmt(cm.counts.feedback);
  }
  if (cm.err) box.innerHTML = `<div class="pz-card"><p class="acc-error">${esc(cm.err)}</p></div>`;
  else box.innerHTML = (cm.items.length ? cm.items.map(c => cmHTML(c)).join('') : `<p class="pz-card pz-empty">${cm.q ? 'Hech narsa topilmadi' : cm.f === 'hidden' ? 'Yashirilgan sharh yo‘q' : cm.f === 'feedback' ? 'Hali fikr kelmagan — fikr.html sahifasidan yoziladi' : cm.f === 'new' ? 'Oxirgi 24 soatda sharh yo‘q' : 'Hali sharh yo‘q'}</p>`)
    + (cm.more ? '<button class="a4-btn pz-more" type="button" id="pzCmMore">Yana ko‘rsatish</button>' : '');
  document.getElementById('pzCmMore')?.addEventListener('click', () => cmLoad(false));
  const top = document.getElementById('pzCmTop');
  if (top) top.innerHTML = cm.top.length ? cm.top.map(t => { const m = cmMovie(t.movie); return `
    <li data-movie="${t.movie}"><span class="pz-pst">${m && m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
      <span class="pz-tt"><b>${esc(cmTitle(t.movie))}</b><small>${m && m.year ? m.year : ''}</small></span><span class="pz-num">${t.n}<small>sharh</small></span></li>`; }).join('')
    : '<p class="a4-sub">Oxirgi 30 kunda sharh yo‘q</p>';
}

function renderCommentsView() {
  $('#admView').innerHTML = `
    <header class="pz-top">
      <div><h1>Sharhlar</h1><p class="a4-sub">Saytdagi barcha izohlar — bir joyda</p></div>
      <div class="pz-top-r">
        <label class="pz-search">${A4_ICONS.search}<input id="pzCmQ" type="search" placeholder="Matn yoki ism…" value="${esc(cm.q)}"></label>
        <button type="button" class="pz-ib" id="pzCmRe" title="Yangilash" aria-label="Yangilash">${ITEM_ICONS.sync}</button>
      </div>
    </header>
    <div class="pz-tabs" id="pzCmTabs">
      ${[['all', 'Hammasi'], ['new', 'Yangi · 24 soat'], ['feedback', 'DezoMax haqida fikrlar'], ['hidden', 'Yashirilgan / arxiv']].map(([f, l]) => `<button type="button" data-f="${f}" class="${cm.f === f ? 'is-on' : ''}">${l} <em></em></button>`).join('')}
    </div>
    <div class="pz-grid g21">
      <div class="pz-clist" id="pzCmList"><div class="mt-loading"><i></i><i></i><i></i></div></div>
      <aside class="pz-stack">
        <article class="pz-card"><header class="pz-ch"><h2>Ko‘p muhokama qilingan</h2><span class="pz-mut">30 kun</span></header><ol class="pz-list" id="pzCmTop"></ol></article>
        <article class="pz-card"><header class="pz-ch"><h2>Qanday ishlaydi</h2></header>
          <p class="pz-note"><b>Yashirish</b> — sharh saytda ko‘rinmaydi, lekin «Yashirilgan»da qoladi va qaytarish mumkin.</p>
          <p class="pz-note"><b>O‘chirish</b> — butunlay o‘chadi, qaytarib bo‘lmaydi.</p>
          <p class="pz-note">Sharhni faqat saytga kirgan (Google/Telegram) foydalanuvchi yozadi: bir soatda 30 tadan ko‘p emas.</p>
          <p class="pz-note"><b>DezoMax haqida fikrlar</b> — <a href="https://dezomax.uz/fikr.html" target="_blank" rel="noopener">fikr.html</a> sahifasidan keladi (kirish shart emas). Saytda hech kimga ko‘rinmaydi — faqat sizga.</p></article>
      </aside>
    </div>`;
  if (cm.items.length || cm.err) cmPaintList();
  cmLoad(true);
  $('#pzCmTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b || cm.loading) return;
    cm.f = b.dataset.f;
    $('#pzCmTabs').querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
    cmLoad(true);
  });
  let t = null;
  $('#pzCmQ').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { cm.q = e.target.value.trim(); cmLoad(true); }, 350); });
  $('#pzCmRe').addEventListener('click', () => cmLoad(true));
  $('#pzCmTop').addEventListener('click', e => {
    const li = e.target.closest('[data-movie]'); if (!li) return;
    cm.q = ''; $('#pzCmQ').value = '';
    cmLoadMovie(+li.dataset.movie);
  });
  $('#pzCmList').addEventListener('click', async e => {
    const b = e.target.closest('[data-cm]'); if (!b) return;
    const art = b.closest('.pz-c'), id = +art.dataset.id, action = b.dataset.cm;
    if (action === 'delete' && !confirm('Sharh butunlay o‘chirilsinmi? Uni qaytarib bo‘lmaydi.')) return;
    b.disabled = true;
    try {
      await cmReq('/admin/comment', { id, action });
      // «Hammasi»/«Yangi» — faqat ko'rinadiganlar, «Yashirilgan» — faqat yashirilganlar: har qanday amaldan keyin sharh shu ro'yxatdan chiqadi
      const c = cm.items.find(x => x.id === id);
      cm.items = cm.items.filter(x => x.id !== id);
      if (cm.counts) {
        if (action === 'hide') { cm.counts.all--; cm.counts.hidden++; }
        if (action === 'show') { cm.counts.all++; cm.counts.hidden--; }
        if (action === 'delete') { if (c && c.hidden) cm.counts.hidden--; else cm.counts.all--; }
        const fresh = c && Date.now() - c.at < 86400000;   // «Yangi» — oxirgi 24 soatdagi ko'rinadigan sharhlar
        if (fresh && (action === 'hide' || (action === 'delete' && !c.hidden))) cm.counts.new--;
        if (fresh && action === 'show') cm.counts.new++;
      }
      cmSumAt = 0;
      toast(action === 'hide' ? 'Sharh yashirildi' : action === 'show' ? 'Sharh qaytarildi' : 'Sharh o‘chirildi');
      cmPaintList();
    } catch (er) { b.disabled = false; toast(er.message, true); }
  });
}

async function cmLoadMovie(movie) {
  cm.loading = true;
  try {
    const j = await cmReq(`/admin/comments?f=${cm.f === 'hidden' ? 'hidden' : 'all'}&movie=${movie}&limit=100`);
    cm.items = j.items; cm.more = false; cm.err = '';
  } catch (e) { cm.err = e.message; }
  cm.loading = false;
  cmPaintList();
  const box = document.getElementById('pzCmList');
  box?.insertAdjacentHTML('afterbegin', `<div class="pz-filter">«${esc(cmTitle(movie))}» sharhlari <button class="pz-link" type="button" id="pzCmClr">Hammasini ko‘rsatish</button></div>`);
  document.getElementById('pzCmClr')?.addEventListener('click', () => cmLoad(true));
}
