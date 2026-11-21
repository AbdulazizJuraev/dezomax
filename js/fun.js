/* ============================================================
   DezoMax — «Siz uchun Qiziqarli» (qiziqarli.html): Gameplaylar, National Animals, Podcast, Audio Kitoblar, Music.
   Bo'limlar va kanallar — js/fun-data.js (FUN_SECTIONS). Videolar — dezomax.uz/_yt/feed (Worker, YouTube RSS).
   Ko'rsatish — YouTube'ning o'z pleyeri (bitta iframe, faqat bosilganda yuklanadi — sahifa yengil).
   Manzil: qiziqarli.html#music — bo'lim; #music&v=ID — video. 2026-11-21
   ============================================================ */
(function () {
  if (typeof initLayout === 'function') try { initLayout(); } catch (e) {}
  const main = document.getElementById('fun');
  if (!main || typeof FUN_SECTIONS === 'undefined') return;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // dezomax.uz va lokal sinov — o'z manzili; ilova (github.io / WebView) — dezomax.uz
  const FEED = (/^(dezomax\.uz|localhost|127\.0\.0\.1)$/.test(location.hostname) ? '' : 'https://dezomax.uz') + '/_yt/feed?ch=';
  const fmtN = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + L(' mln', ' млн') : n >= 1e3 ? Math.round(n / 1e3) + L(' ming', ' тыс.') : String(n || 0);
  const ago = d => {
    const s = (Date.now() - Date.parse(d)) / 1000;
    if (!(s > 0)) return '';
    const [n, u] = s < 3600 ? [Math.max(1, Math.round(s / 60)), L('daqiqa', 'мин.')] : s < 86400 ? [Math.round(s / 3600), L('soat', 'ч.')]
      : s < 2592000 ? [Math.round(s / 86400), L('kun', 'дн.')] : s < 31536000 ? [Math.round(s / 2592000), L('oy', 'мес.')] : [Math.round(s / 31536000), L('yil', 'г.')];
    return `${n} ${u} ${L('oldin', 'назад')}`;
  };
  const nameOf = s => (ru ? s.ru : s.uz);

  main.innerHTML = `
    <header class="fun-hero"><h1>${L('Siz uchun <em>Qiziqarli</em>', 'Интересное <em>для вас</em>')}</h1>
      <p>${L('O‘yinlar, hayvonot olami, podkastlar, audio kitoblar va musiqa — eng yangi videolar bir joyda', 'Игры, мир животных, подкасты, аудиокниги и музыка — свежие видео в одном месте')}</p></header>
    <nav class="fun-tabs" role="tablist">${FUN_SECTIONS.map(s => `<a href="#${s.key}" role="tab" data-fun="${s.key}" style="--c1:${s.c1};--c2:${s.c2}">
      <span class="fun-ti"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg></span><b>${esc(nameOf(s))}</b><small>${esc(s.sub[ru ? 1 : 0])}</small></a>`).join('')}</nav>
    <section class="fun-stage" id="funStage" hidden></section>
    <div class="fun-chs" id="funChs"></div>
    <div class="fun-grid" id="funGrid"></div>
    <p class="fun-empty" id="funEmpty" hidden></p>`;

  const $ = id => document.getElementById(id);
  const cache = {};
  let cur = null, items = [], chSel = '';

  function load(s) {
    if (cache[s.key]) return cache[s.key];
    cache[s.key] = fetch(FEED + s.ch.map(c => c.id).join(','))
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(j => j.items || [])
      .catch(() => { delete cache[s.key]; return null; });
    return cache[s.key];
  }

  const card = x => `<a class="fun-card" href="#${cur.key}&v=${x.id}" data-v="${x.id}">
    <span class="fun-th"><img src="https://i.ytimg.com/vi/${x.id}/mqdefault.jpg" alt="" loading="lazy" decoding="async"><i class="fun-play"></i></span>
    <b>${esc(x.t)}</b><small>${esc(x.cn)}${x.v ? ` · ${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d ? ` · ${ago(x.d)}` : ''}</small></a>`;

  function renderGrid() {
    const list = chSel ? items.filter(x => x.ch === chSel) : items;
    $('funGrid').innerHTML = list.map(card).join('');
    $('funEmpty').hidden = !!list.length;
    if (!list.length) $('funEmpty').textContent = L('Hozircha video yo‘q', 'Пока нет видео');
  }
  function renderChips() {
    const has = new Set(items.map(x => x.ch));
    const chs = cur.ch.filter(c => has.has(c.id));
    $('funChs').innerHTML = chs.length > 1 ? [['', L('Hammasi', 'Все')], ...chs.map(c => [c.id, c.name])]
      .map(([id, n]) => `<button type="button" class="fun-ch${id === chSel ? ' is-on' : ''}" data-ch="${id}">${esc(n)}</button>`).join('') : '';
  }

  async function pick(key) {
    const s = FUN_SECTIONS.find(x => x.key === key) || FUN_SECTIONS[0];
    if (cur === s) return;
    cur = s; chSel = ''; items = [];
    document.querySelectorAll('[data-fun]').forEach(a => { const on = a.dataset.fun === s.key; a.classList.toggle('is-on', on); a.setAttribute('aria-selected', String(on)); if (on && a.parentNode.scrollWidth > a.parentNode.clientWidth) a.parentNode.scrollLeft = a.offsetLeft - a.parentNode.offsetLeft - 16; });
    document.title = `${nameOf(s)} — ${L('Siz uchun Qiziqarli', 'Интересное')} | DezoMax`;
    $('funChs').innerHTML = '';
    $('funEmpty').hidden = true;
    $('funGrid').innerHTML = '<span class="fun-sk"></span>'.repeat(8);
    const got = await load(s);
    if (cur !== s) return;
    if (!got) { $('funGrid').innerHTML = ''; $('funEmpty').hidden = false; $('funEmpty').textContent = L('Videolar yuklanmadi. Birozdan keyin qayta urinib ko‘ring.', 'Не удалось загрузить видео. Попробуйте позже.'); return; }
    items = got;
    renderChips();
    renderGrid();
  }

  function play(id) {
    const st = $('funStage');
    if (!id) { st.hidden = true; st.innerHTML = ''; return; }
    const x = items.find(y => y.id === id) || { id, t: '', cn: '' };
    st.hidden = false;
    st.innerHTML = `<div class="fun-player"><iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="${esc(x.t)}"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      <div class="fun-info"><div><h2>${esc(x.t)}</h2><small>${esc(x.cn)}${x.v ? ` · ${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d ? ` · ${ago(x.d)}` : ''}</small></div>
        <div class="fun-acts"><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">YouTube ↗</a><button type="button" id="funClose" aria-label="${L('Yopish', 'Закрыть')}">✕</button></div></div>`;
    st.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  async function route() {
    const h = location.hash.slice(1).split('&');
    const v = (h.find(p => p.startsWith('v=')) || '').slice(2);
    await pick(h[0]);
    play(/^[\w-]{11}$/.test(v) ? v : '');
  }

  main.addEventListener('click', e => {
    const ch = e.target.closest('[data-ch]');
    if (ch) { chSel = ch.dataset.ch; renderChips(); renderGrid(); return; }
    if (e.target.closest('#funClose')) { e.preventDefault(); history.replaceState(null, '', '#' + cur.key); play(''); }
  });
  addEventListener('hashchange', route);
  route();
})();
