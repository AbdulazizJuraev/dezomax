/* ============================================================
   DezoMax — «Siz uchun Qiziqarli» (qiziqarli.html): Gameplaylar, Podcast, National Animals, Music, Oshxona, Ilm-fan, Sayohat, Avto.
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
    <header class="fun-hero">
      <button type="button" class="fun-back" id="funBack" aria-label="${L('Orqaga', 'Назад')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
      <h1><em>${L('Qiziqarli', 'Интересное')}</em></h1></header>
    <section class="fun-chan" id="funChan" hidden></section>
    <section class="fun-stage" id="funStage" hidden></section>
    <div class="fun-chs" id="funChs"></div>
    <div class="fun-grid" id="funGrid"></div>
    <p class="fun-empty" id="funEmpty" hidden></p>`;

  const $ = id => document.getElementById(id);
  const cache = {};
  let cur = null, items = [], chSel = '';

  // ro'yxat brauzerda saqlanadi: keyingi kirishda darhol chiqadi, 10 daqiqadan eski bo'lsa yangisi olinadi (sahifa tez ochiladi)
  const LS = k => 'dzxFun_' + k;
  const saved = k => { try { const j = JSON.parse(localStorage.getItem(LS(k)) || 'null'); return j && Array.isArray(j.items) && j.items.length ? j : null; } catch (e) { return null; } };
  function load(s) {
    if (cache[s.key]) return cache[s.key];
    cache[s.key] = fetch(FEED + s.ch.map(c => c.id).join(','))
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(j => { const it = j.items || []; try { localStorage.setItem(LS(s.key), JSON.stringify({ at: Date.now(), items: it })); } catch (e) {} return it; })
      .catch(() => { delete cache[s.key]; return null; });
    return cache[s.key];
  }

  const card = x => `<a class="fun-card" href="#${cur.key}&v=${x.id}" data-v="${x.id}">
    <span class="fun-th"><img src="https://i.ytimg.com/vi/${x.id}/mqdefault.jpg" alt="" loading="lazy" decoding="async"><i class="fun-play"></i></span>
    <b>${esc(x.t)}</b><small>${esc(x.cn)}${x.v ? ` · ${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d ? ` · ${ago(x.d)}` : ''}</small></a>`;

  // egasi saytlarda ko'rsatishni taqiqlagan videolar — eslab qolinadi, ro'yxatda chiqmaydi
  const BL = 'dzxFunBlocked';
  const blocked = new Set((() => { try { return JSON.parse(localStorage.getItem(BL) || '[]'); } catch (e) { return []; } })());
  // faqat joriy bo'limning kanallari (eski keshdagi olib tashlangan kanal videolari chiqmasin) va taqiqlanmagan videolar
  const okList = () => items.filter(x => !blocked.has(x.id) && cur.ch.some(c => c.id === x.ch));
  function renderGrid() {
    const list = chSel ? okList().filter(x => x.ch === chSel) : okList();
    $('funGrid').innerHTML = list.map(card).join('');
    $('funEmpty').hidden = !!list.length;
    if (!list.length) $('funEmpty').textContent = L('Hozircha video yo‘q', 'Пока нет видео');
  }
  function renderChips() {
    // bitta kanal bo'lsa — chiplar o'rniga YouTube'dagidek kanal «oynasi»: banner, dumaloq rasm, nom, obunachilar, tugma
    const one = cur.ch.length === 1 && cur.ch[0].av ? cur.ch[0] : null;
    $('funChan').hidden = !one;
    if (one) {
      $('funChan').innerHTML = `${one.ban ? `<div class="fun-chan-ban"><img src="${one.ban}" alt="" decoding="async"></div>` : ''}
        <div class="fun-chan-row"><img class="fun-av" src="${one.av}" alt="${esc(one.name)}" width="96" height="96">
          <div class="fun-chan-info"><h2>${esc(one.name)}<svg class="fun-vf" viewBox="0 0 24 24" aria-label="${L('Tasdiqlangan kanal', 'Подтверждённый канал')}"><circle cx="12" cy="12" r="10"/><path d="M7.6 12.4l3 3 5.8-6.4"/></svg></h2>
            <p>${esc(one.handle || '')}${one.subs ? ` · ${esc(ru ? one.subs[1] : one.subs[0])}` : ''}</p></div></div>`;
      $('funChs').innerHTML = '';
      return;
    }
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
    renderChips();
    $('funEmpty').hidden = true;
    const old = saved(s.key);
    if (old) { items = old.items; renderChips(); renderGrid(); }
    else $('funGrid').innerHTML = '<span class="fun-sk"></span>'.repeat(8);
    const got = !old || Date.now() - old.at > 10 * 60000 ? await load(s) : old.items;
    if (cur !== s) return;
    if (!got && old) return;
    if (!got) { $('funGrid').innerHTML = ''; $('funEmpty').hidden = false; $('funEmpty').textContent = L('Videolar yuklanmadi. Birozdan keyin qayta urinib ko‘ring.', 'Не удалось загрузить видео. Попробуйте позже.'); return; }
    items = got;
    renderChips();
    renderGrid();
  }

  function play(id) {
    const st = $('funStage');
    if (!id) { if (typeof destroyYouTube === 'function') destroyYouTube(); st.hidden = true; st.innerHTML = ''; return; }
    const x = items.find(y => y.id === id) || { id, t: '', cn: '' };
    st.hidden = false;
    // DezoMax o'z pleyeri (js/ytplayer.js): bizning panel, sifat, katta ekran; u bo'lmasa — oddiy YouTube oynasi
    const own = typeof mountYouTube === 'function';
    st.innerHTML = `<div class="fun-player">${own ? '<div class="player-wrap" id="funBox"></div>' : `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="${esc(x.t)}"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`}</div>
      <div class="fun-info"><div><h2>${esc(x.t)}</h2><small>${esc(x.cn)}${x.v ? ` · ${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d ? ` · ${ago(x.d)}` : ''}</small></div>
        <div class="fun-acts"><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">YouTube ↗</a><button type="button" id="funClose" aria-label="${L('Yopish', 'Закрыть')}">✕</button></div></div>`;
    if (own) {
      const box = $('funBox');
      mountYouTube(box, 'https://www.youtube.com/watch?v=' + id, { title: x.t, poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` });
      box.querySelector('#ytpCover')?.click();
      box.addEventListener('yterror', e => {
        if (!e.detail.blocked) return;
        blocked.add(id); try { localStorage.setItem(BL, JSON.stringify([...blocked].slice(-500))); } catch (er) {}
        const list = okList(), i = items.findIndex(y => y.id === id);
        const next = items.slice(i + 1).find(y => !blocked.has(y.id)) || list[0];
        renderGrid();
        box.querySelector('#ytpMsg .ytp-msg-inner')?.insertAdjacentHTML('beforeend', `<p>${L('Keyingi video ochilmoqda…', 'Открываем следующее видео…')}</p>`);
        if (next) setTimeout(() => { if ($('funBox') === box) location.replace('#' + cur.key + '&v=' + next.id); }, 1500);
      });
    }
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
    if (e.target.closest('#funClose')) { e.preventDefault(); history.replaceState(null, '', '#' + cur.key); play(''); return; }
    if (e.target.closest('#funBack')) {
      e.preventDefault();
      let same = false; try { same = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (er) {}
      if (same && history.length > 1) history.back(); else location.href = 'index.html';
    }
  });
  addEventListener('hashchange', route);
  route();
})();
