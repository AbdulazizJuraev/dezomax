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

  // har bir bo'lim uchun ikonka (chiziqli, currentColor bilan bo'yaladi)
  const ICON = {
    gameplay: '<svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="19" height="11" rx="5.5"/><path d="M6.5 11h3.4M8.2 9.3v3.4"/><circle cx="15.2" cy="10.3" r=".9"/><circle cx="17.6" cy="12.7" r=".9"/></svg>',
    podcast: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="10.5" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9.5 21h5"/></svg>',
    animals: '<svg viewBox="0 0 24 24"><circle cx="6.6" cy="10.4" r="1.5"/><circle cx="10" cy="7" r="1.5"/><circle cx="14" cy="7" r="1.5"/><circle cx="17.4" cy="10.4" r="1.5"/><path d="M12 12c-2.4 0-4.4 1.9-4.4 3.9 0 1.6 1.3 2.5 2.8 2 1-.3 2.2-.3 3.2 0 1.5.5 2.8-.4 2.8-2 0-2-2-3.9-4.4-3.9Z"/></svg>',
    music: '<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.3" cy="18" r="2.4"/><circle cx="16.3" cy="16" r="2.4"/></svg>',
    oshxona: '<svg viewBox="0 0 24 24"><path d="M3 9.5h18M5.2 9.5l.8 8.3a2 2 0 0 0 2 1.7h8a2 2 0 0 0 2-1.7l.8-8.3M9 5.5c0-1 .6-2 1.5-2M14.2 5.5c0-1-.6-2-1.5-2"/></svg>',
    ilm: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></svg>',
    sayohat: '<svg viewBox="0 0 24 24"><path d="M21 3 3 10.6l6.1 2.3L11.4 19 21 3Z"/><path d="M9.1 12.9 14 8"/></svg>',
    avto: '<svg viewBox="0 0 24 24"><path d="M4 13.2 5.6 8.7A2 2 0 0 1 7.5 7.3h9a2 2 0 0 1 1.9 1.4L20 13.2M4 13.2h16v3.5a1 1 0 0 1-1 1h-1.3a1 1 0 0 1-1-1v-.4M6.3 16.3v.4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.5M7 15.5h.01M17 15.5h.01"/></svg>',
    _: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>'
  };

  main.innerHTML = `
    <header class="fun-hero"><h1><em>${L('Qiziqarli', 'Интересное')}</em></h1>
      <p>${L('O‘yinlar, podkastlar, hayvonot olami, musiqa, taomlar, ilm-fan, sayohat va avto — eng yangi videolar bir joyda', 'Игры, подкасты, мир животных, музыка, кухня, наука, путешествия и авто — свежие видео в одном месте')}</p></header>
    <nav class="fun-tabs" role="tablist">${FUN_SECTIONS.map(s => `<a href="#${s.key}" role="tab" data-fun="${s.key}" style="--c1:${s.c1};--c2:${s.c2}"><i class="fun-ti">${ICON[s.key] || ICON._}</i><b>${esc(nameOf(s))}</b></a>`).join('')}</nav>
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
  const okList = () => items.filter(x => !blocked.has(x.id));
  function renderGrid() {
    const list = chSel ? okList().filter(x => x.ch === chSel) : okList();
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
    if (e.target.closest('#funClose')) { e.preventDefault(); history.replaceState(null, '', '#' + cur.key); play(''); }
  });
  addEventListener('hashchange', route);
  route();
})();
