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
      <h1 id="funTitle"></h1></header>
    <section class="fun-chan" id="funChan" hidden></section>
    <section class="fun-stage" id="funStage" hidden></section>
    <div class="fun-chs" id="funChs"></div>
    <div class="fun-grid" id="funGrid"></div>
    <div class="fun-more" id="funMore" aria-hidden="true"></div>
    <p class="fun-empty" id="funEmpty" hidden></p>`;

  const $ = id => document.getElementById(id);
  const cache = {};
  /* Uch qatlam (2026-11-23, foydalanuvchi so'rovi):
     #gameplay            — bo'lim: kanallar ro'yxati (kanal kartalari; keyin yangi kanallar qo'shilib boradi)
     #gameplay&c=UC…      — kanal sahifasi (YouTube'dagidek: banner, rasm, bo'limlar, videolar)
     #gameplay&c=UC…&v=ID — video
     Kanal kartasi bo'lmagan bo'limlar (av'siz kanallar) — avvalgidek: hamma kanal videolari + kanal chiplari. */
  let cur = null, cs = '', items = [], chSel = '';
  let tab = 'lf', q = '';   // kanal sahifasi: lf — videolar, home — videolar + jonli, sh — Shorts, lv — jonli efirlar; q — qidiruv
  const TABS = [['home', 'Bosh sahifa', 'Главная'], ['lf', 'Videolar', 'Видео'], ['sh', 'Shorts', 'Shorts'], ['lv', 'Jonli efirlar', 'Трансляции']];
  const chanSec = s => s.ch.some(c => c.av);
  const curChan = () => (cs ? cur.ch.find(c => c.id === cs) : null);
  const hp = () => '#' + cur.key + (cs ? '&c=' + cs : '');
  const ckey = () => cur.key + (cs ? '@' + cs : '') + (tab === 'lf' ? '' : ':' + tab);
  const VF = `<svg class="fun-vf" viewBox="0 0 24 24" aria-label="${L('Tasdiqlangan kanal', 'Подтверждённый канал')}"><circle cx="12" cy="12" r="10"/><path d="M7.6 12.4l3 3 5.8-6.4"/></svg>`;
  const subsOf = c => `${esc(c.handle || '')}${c.subs ? ` · ${esc(ru ? c.subs[1] : c.subs[0])}` : ''}`;

  // ro'yxat brauzerda saqlanadi: keyingi kirishda darhol chiqadi, 10 daqiqadan eski bo'lsa yangisi olinadi (sahifa tez ochiladi)
  const LS = k => 'dzxFun_' + k;
  const saved = k => { try { const j = JSON.parse(localStorage.getItem(LS(k)) || 'null'); return j && Array.isArray(j.items) && j.items.length ? j : null; } catch (e) { return null; } };
  function load(ids, t, k) {
    if (cache[k]) return cache[k];
    cache[k] = fetch(FEED + ids.join(',') + (t === 'lf' ? '' : '&t=' + t))
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(j => { const it = j.items || []; try { localStorage.setItem(LS(k), JSON.stringify({ at: Date.now(), items: it })); } catch (e) {} return it; })
      .catch(() => { delete cache[k]; return null; });
    return cache[k];
  }

  // kanalning BARCHA videolari (data/fun-<key>.json, tools/fetch-fun-all.js) — bo'lmasa faqat RSS'dagi oxirgi 15 tasi
  const allCache = {};
  const loadAll = c => allCache[c.all] || (allCache[c.all] = fetch(c.all).then(r => (r.ok ? r.json() : null)).catch(() => null));
  function withAll(c, t, fresh, all) {
    if (!all) return fresh;
    const rows = t === 'home' ? [...(all.lf || []), ...(all.lv || [])] : all[t] || [];
    const seen = new Set(fresh.map(x => x.id)), out = fresh.slice();
    for (const [id, tt, v, d] of rows) if (!seen.has(id)) { seen.add(id); out.push({ id, t: tt, v, d, ch: c.id, cn: c.name }); }
    // yangisi birinchi; sanasi yo'qlar (Shorts) oxirida, kanaldagi tartibida (sort barqaror)
    return out.sort((a, b) => String(b.d || '').localeCompare(String(a.d || '')));
  }

  // Shorts — tik karta (hqdefault'ning o'rtasi = vertikal kadr)
  const card = x => `<a class="fun-card" href="${hp()}&v=${x.id}" data-v="${x.id}">
    <span class="fun-th"><img src="https://i.ytimg.com/vi/${x.id}/${tab === 'sh' ? 'hqdefault' : 'mqdefault'}.jpg" alt="" loading="lazy" decoding="async"><i class="fun-play"></i></span>
    <b>${esc(x.t)}</b><small>${tab === 'sh' ? '' : esc(x.cn)}${x.v ? `${tab === 'sh' ? '' : ' · '}${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d && tab !== 'sh' ? ` · ${ago(x.d)}` : ''}</small></a>`;

  // egasi saytlarda ko'rsatishni taqiqlagan videolar — eslab qolinadi, ro'yxatda chiqmaydi
  const BL = 'dzxFunBlocked';
  const blocked = new Set((() => { try { return JSON.parse(localStorage.getItem(BL) || '[]'); } catch (e) { return []; } })());
  // faqat joriy kanal / bo'lim kanallari (eski keshdagi olib tashlangan kanal videolari chiqmasin) va taqiqlanmagan videolar
  const okList = () => items.filter(x => !blocked.has(x.id) && (cs ? x.ch === cs : cur.ch.some(c => c.id === x.ch)));
  // ko'p video (kanalning hammasi — 2000+) bir yo'la chizilmaydi: 48 tadan, pastga surilganda qo'shiladi (sahifa yengil).
  // pump — «oxiri» belgisi ekranga yaqin bo'lsa, ekran to'lguncha qo'shadi: keng ekranda 48 ta karta sahifani to'ldirmasa,
  // IntersectionObserver holati o'zgarmaydi va qayta chaqirilmaydi — avval shu sabab kompyuterda 48 tada to'xtab qolardi
  const STEP = 48, NEAR = 1600;
  let shown = STEP, lastList = [];
  function pump() {
    if (shown >= lastList.length || $('funMore').getBoundingClientRect().top > innerHeight + NEAR) return;
    $('funGrid').insertAdjacentHTML('beforeend', lastList.slice(shown, shown + STEP).map(card).join(''));
    shown += STEP;
    requestAnimationFrame(pump);
  }
  const more = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) pump(); }, { rootMargin: NEAR + 'px 0px' });
  function renderGrid() {
    let list = chSel ? okList().filter(x => x.ch === chSel) : okList();
    if (q) { const n = q.toLowerCase(); list = list.filter(x => String(x.t).toLowerCase().includes(n)); }
    lastList = list; shown = STEP;
    $('funGrid').classList.remove('is-chans');
    $('funGrid').classList.toggle('is-shorts', tab === 'sh');
    $('funGrid').innerHTML = list.slice(0, STEP).map(card).join('');
    requestAnimationFrame(pump);
    $('funEmpty').hidden = !!list.length;
    if (!list.length) $('funEmpty').textContent = q ? L('Hech narsa topilmadi', 'Ничего не найдено') : L('Hozircha video yo‘q', 'Пока нет видео');
  }
  // bo'lim sahifasi: kanallar kartalari (banner, dumaloq rasm, nom ✓, obunachilar) — bosilsa kanal sahifasi
  function renderChanList() {
    lastList = []; shown = 0;
    $('funGrid').classList.remove('is-shorts');
    $('funGrid').classList.add('is-chans');
    $('funGrid').innerHTML = cur.ch.filter(c => c.av).map(c => `<a class="fun-cc" href="#${cur.key}&c=${c.id}">
      <span class="fun-cc-ban">${c.ban ? `<img src="${c.ban}" alt="" loading="lazy" decoding="async">` : ''}</span>
      <span class="fun-cc-body"><img class="fun-cc-av" src="${c.av}" alt="" width="76" height="76">
        <span class="fun-cc-txt"><b>${esc(c.name)}${c.vf ? VF : ''}</b><small>${subsOf(c)}</small></span></span></a>`).join('');
    $('funEmpty').hidden = true;
  }
  // kanal sahifasi (YouTube'dagidek): banner, dumaloq rasm, nom ✓, obunachilar, bo'limlar + qidiruv
  function renderChan(c) {
    $('funChan').innerHTML = `${c.ban ? `<div class="fun-chan-ban"><img src="${c.ban}" alt="" decoding="async"></div>` : ''}
      <div class="fun-chan-row"><img class="fun-av" src="${c.av}" alt="${esc(c.name)}" width="96" height="96">
        <div class="fun-chan-info"><h2>${esc(c.name)}${c.vf ? VF : ''}</h2><p>${subsOf(c)}<span id="funStats"></span></p></div></div>
      <nav class="fun-ytabs" role="tablist">${TABS.map(([k, uz, r]) => `<button type="button" role="tab" data-tab="${k}" class="${k === tab ? 'is-on' : ''}" aria-selected="${k === tab}">${L(uz, r)}</button>`).join('')}
        <span class="fun-ysearch${q ? ' is-open' : ''}"><button type="button" id="funSearchBtn" aria-label="${L('Kanaldan qidirish', 'Поиск по каналу')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button>
          <input type="search" id="funQ" placeholder="${L('Kanaldan qidirish', 'Поиск по каналу')}" value="${esc(q)}"></span></nav>`;
    // obunachilar yonida bitta qatorda: «· 196 video · 2 376 shorts · 10 jonli efir» (arxiv faylidan)
    if (c.all) loadAll(c).then(all => {
      if (!all || curChan() !== c) return;
      const n = { lf: (all.lf || []).length, sh: (all.sh || []).length, lv: (all.lv || []).length };
      const f = v => v.toLocaleString('ru-RU');
      $('funStats').textContent = [[n.lf, 'video', 'видео'], [n.sh, 'shorts', 'shorts'], [n.lv, 'jonli efir', 'трансляций']].filter(x => x[0]).map(x => ' · ' + f(x[0]) + ' ' + L(x[1], x[2])).join('');
    });
  }
  function renderChips() {
    if (chanSec(cur)) return;
    const has = new Set(items.map(x => x.ch));
    const chs = cur.ch.filter(c => has.has(c.id));
    $('funChs').innerHTML = chs.length > 1 ? [['', L('Hammasi', 'Все')], ...chs.map(c => [c.id, c.name])]
      .map(([id, n]) => `<button type="button" class="fun-ch${id === chSel ? ' is-on' : ''}" data-ch="${id}">${esc(n)}</button>`).join('') : '';
  }

  // bo'lim yoki kanal almashganda sahifani qayta quradi
  async function show() {
    chSel = ''; items = []; q = '';
    const c = curChan();
    tab = c ? 'home' : 'lf';
    main.classList.toggle('is-chan', !!c);
    $('funTitle').hidden = !!c;   // kanal sahifasida sarlavha yo'q — faqat «Orqaga» (foydalanuvchi maketi)
    $('funTitle').innerHTML = c ? '' : `<em>${esc(nameOf(cur))}</em>`;
    document.title = `${c ? c.title || c.name : nameOf(cur)} — ${L('Qiziqarli', 'Интересное')} | DezoMax`;
    $('funChan').hidden = !c;
    $('funChs').innerHTML = '';
    if (chanSec(cur) && !c) { renderChanList(); return; }
    if (c) renderChan(c);
    renderChips();
    await fill();
  }

  // joriy kanal / bo'lim + tab videolari: keshdagisi darhol, eskirgan bo'lsa yangisi
  async function fill() {
    const s = cur, cc = cs, t = tab, k = ckey(), c = curChan();
    const same = () => cur === s && cs === cc && tab === t;
    items = [];
    $('funEmpty').hidden = true;
    const old = saved(k);
    if (old) { items = old.items; renderChips(); renderGrid(); }
    else { $('funGrid').classList.remove('is-chans'); $('funGrid').classList.toggle('is-shorts', t === 'sh'); $('funGrid').innerHTML = '<span class="fun-sk"></span>'.repeat(8); }
    const got = !old || Date.now() - old.at > 10 * 60000 ? await load(c ? [c.id] : s.ch.map(x => x.id), t, k) : old.items;
    const all = c && c.all ? await loadAll(c) : null;
    if (!same()) return;
    const base = got || (old && old.items) || null;
    if (!base && !all) { $('funGrid').innerHTML = ''; $('funEmpty').hidden = false; $('funEmpty').textContent = L('Videolar yuklanmadi. Birozdan keyin qayta urinib ko‘ring.', 'Не удалось загрузить видео. Попробуйте позже.'); return; }
    if (!got && old && !all) return;
    items = c ? withAll(c, t, base || [], all) : base;
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
        if (next) setTimeout(() => { if ($('funBox') === box) location.replace(hp() + '&v=' + next.id); }, 1500);
      });
    }
    st.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  async function route() {
    const h = location.hash.slice(1).split('&');
    const get = p => (h.find(x => x.startsWith(p + '=')) || '').slice(p.length + 1);
    const s = FUN_SECTIONS.find(x => x.key === h[0]) || FUN_SECTIONS[0];
    let c = get('c');
    if (!chanSec(s) || !s.ch.some(x => x.id === c)) c = '';
    const v = get('v');
    if (s !== cur || c !== cs) {
      const into = !!c && c !== cs;
      cur = s; cs = c;
      play('');
      if (into) scrollTo(0, 0);
      await show();
    }
    play(/^[\w-]{11}$/.test(v) ? v : '');
  }

  main.addEventListener('click', e => {
    const ch = e.target.closest('[data-ch]');
    if (ch) { chSel = ch.dataset.ch; renderChips(); renderGrid(); return; }
    const tb = e.target.closest('[data-tab]');
    if (tb) {
      if (tb.dataset.tab === tab) return;
      tab = tb.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(b => { const on = b.dataset.tab === tab; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); });
      fill();
      return;
    }
    if (e.target.closest('#funSearchBtn')) {
      const box = e.target.closest('.fun-ysearch'), inp = $('funQ');
      box.classList.toggle('is-open');
      if (box.classList.contains('is-open')) inp.focus(); else if (q) { q = ''; inp.value = ''; renderGrid(); }
      return;
    }
    if (e.target.closest('#funClose')) { e.preventDefault(); history.replaceState(null, '', hp()); play(''); return; }
    // «Orqaga»: kanal sahifasidan — bo'limning kanallar ro'yxatiga (masalan Gameplay); bo'limdan — bosh sahifadagi «Siz uchun Qiziqarli» qatoriga
    if (e.target.closest('#funBack')) {
      e.preventDefault();
      if (cs) location.hash = '#' + cur.key; else location.href = 'index.html#qiziqarli';
    }
  });
  main.addEventListener('input', e => { if (e.target.id === 'funQ') { q = e.target.value.trim(); renderGrid(); } });
  more.observe($('funMore'));
  addEventListener('hashchange', route);
  route();
})();
