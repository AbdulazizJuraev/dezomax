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

  // Hozir jonli efirda bo'lgan kanallar (Worker /_yt/live, 2 daqiqa kesh) — kartada «JONLI», efir videosi ro'yxat boshida. 2026-11-23
  const LIVE_API = FEED.replace('/_yt/feed?ch=', '/_yt/live?ch=');
  let liveMap = {}, liveAt = 0, liveP = null;
  const liveOf = id => liveMap[id] || null;
  const liveItem = vid => { for (const [ch, x] of Object.entries(liveMap)) if (x.id === vid) return { id: x.id, t: x.t, ch, cn: (FUN_SECTIONS.flatMap(s => s.ch).find(c => c.id === ch) || {}).name || '', live: true }; return null; };
  function loadLive() {
    if (liveP && Date.now() - liveAt < 120000) return liveP;
    const ids = [...new Set(FUN_SECTIONS.flatMap(s => s.ch).filter(c => c.av).map(c => c.id))];
    if (!ids.length) return Promise.resolve(liveMap);
    liveAt = Date.now();
    return (liveP = fetch(LIVE_API + ids.join(',')).then(r => (r.ok ? r.json() : null)).then(j => { liveMap = (j && j.live) || {}; return liveMap; }).catch(() => liveMap));
  }
  // jonli holat kelgach — joriy sahifadagi belgilar va ro'yxat yangilanadi
  function applyLive() {
    const c = curChan();
    document.querySelectorAll('.fun-cc[data-ch]').forEach(a => a.classList.toggle('is-live', !!liveOf(a.dataset.ch)));
    const av = document.querySelector('.fun-chan-row');
    if (av && c) av.classList.toggle('is-live', !!liveOf(c.id));
    if (c && liveOf(c.id) && (tab === 'home' || tab === 'lv') && !q) renderGrid();
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

  // Har videoning Google uchun o'z manzili: dezomax.uz/video/<nom>-<ID> (tools/gen-video-seo.js — slug bir xil bo'lishi kerak).
  // Kartadagi havola shu manzil (Google kuzatadi), bosilganda esa sahifa ichida darhol ochiladi (pastda, click).
  const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h' };
  const videoSlug = t => String(t || '').toLowerCase().replace(/[а-яёўқғҳ]/g, c => CYR[c] ?? '')
    .replace(/[‘’'`ʻʼ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/, '');
  const videoUrl = x => `https://dezomax.uz/video/${videoSlug(x.t) ? videoSlug(x.t) + '-' : ''}${x.id}`;

  // Shorts — tik karta (hqdefault'ning o'rtasi = vertikal kadr)
  const card = x => `<a class="fun-card" href="${videoUrl(x)}" data-v="${x.id}">
    <span class="fun-th"><img src="https://i.ytimg.com/vi/${x.id}/${x.live ? 'mqdefault_live' : tab === 'sh' ? 'hqdefault' : 'mqdefault'}.jpg" alt="" loading="lazy" decoding="async"><i class="fun-play"></i>${x.live ? `<span class="fun-live-b">${L('JONLI', 'В ЭФИРЕ')}</span>` : ''}</span>
    <b>${esc(x.t)}</b>${x.live ? `<small class="fun-live-s">${L('Hozir jonli efirda', 'Сейчас в эфире')}</small>` : ''}<small>${tab === 'sh' ? '' : esc(x.cn)}${x.v ? `${tab === 'sh' ? '' : ' · '}${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d && tab !== 'sh' ? ` · ${ago(x.d)}` : ''}</small></a>`;

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
    const lv = cs && !q && (tab === 'home' || tab === 'lv') && liveOf(cs);
    if (lv) list = [liveItem(lv.id), ...list.filter(x => x.id !== lv.id)];
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
    $('funGrid').innerHTML = cur.ch.filter(c => c.av).map(c => `<a class="fun-cc${liveOf(c.id) ? ' is-live' : ''}" href="#${cur.key}&c=${c.id}" data-ch="${c.id}">
      <span class="fun-cc-ban">${c.ban ? `<img src="${c.ban}" alt="" loading="lazy" decoding="async">` : ''}</span>
      <span class="fun-cc-body"><span class="fun-avw"><img class="fun-cc-av" src="${c.av}" alt="" width="76" height="76"><i class="fun-live-tag">${L('JONLI', 'В ЭФИРЕ')}</i></span>
        <span class="fun-cc-txt"><b>${esc(c.name)}${c.vf ? VF : ''}</b><small>${subsOf(c)}</small></span></span></a>`).join('');
    $('funEmpty').hidden = true;
  }
  // kanal sahifasi (YouTube'dagidek): banner, dumaloq rasm, nom ✓, obunachilar, bo'limlar + qidiruv
  function renderChan(c) {
    $('funChan').innerHTML = `${c.ban ? `<div class="fun-chan-ban"><img src="${c.ban}" alt="" decoding="async"></div>` : ''}
      <div class="fun-chan-row${liveOf(c.id) ? ' is-live' : ''}"><a class="fun-avw" href="#${cur.key}&c=${c.id}" data-live-go><img class="fun-av" src="${c.av}" alt="${esc(c.name)}" width="96" height="96"><i class="fun-live-tag">${L('JONLI', 'В ЭФИРЕ')}</i></a>
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
    loadLive().then(() => { if (cur && curChan() === c) applyLive(); });
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

  /* O'z layk/dizlayk (2026-11-23, YouTube havolasi o'rniga): saytning baho tizimi — to'lov serveri /social, /api/react (Shorts bilan bir xil).
     Server raqamli ID taniydi — YouTube ID'dan barqaror raqam (9 000 000 000 + xesh, «yt:» oldi qo'shimchasi). Baho — faqat kirgan foydalanuvchi. */
  const SVG = p => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  const LIKE_IC = SVG('<path class="fl-fill" d="M7 11v9H4.6a1.1 1.1 0 0 1-1.1-1.1v-6.8A1.1 1.1 0 0 1 4.6 11zM7 11l3.6-7.2a1.9 1.9 0 0 1 3.5 1.2L13.4 9h5.4a2 2 0 0 1 2 2.4l-1.3 6.8a2.2 2.2 0 0 1-2.1 1.8H7"/>');
  const SHARE_IC = SVG('<path d="M14 5l7 7-7 7v-4.2c-6 0-9 1.6-11 5.2.6-6.2 3.6-10.6 11-11.4z"/>');
  const SAVE_IC = SVG('<path class="fl-fill" d="M6 3.5h12v17l-6-4.3-6 4.3z"/>');
  const MORE_IC = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>';
  const SAVED = 'dzx_fun_saved';
  const savedSet = () => { try { return new Set(JSON.parse(localStorage.getItem(SAVED) || '[]')); } catch (e) { return new Set(); } };
  const API = typeof PAY_API !== 'undefined' && PAY_API ? String(PAY_API).replace(/\/+$/, '') : '';
  const tok = () => (typeof Pay !== 'undefined' && Pay.token ? Pay.token() : '');
  const sid = yid => { let h = 2166136261; for (const ch of 'yt:' + yid) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 9e9 + h % 1e9; };
  const likeSt = {};
  async function likeReq(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (tok()) headers.Authorization = 'Bearer ' + tok();
    const r = await fetch(API + path + (method === 'GET' && tok() ? (path.includes('?') ? '&' : '?') + 'u=1' : ''), { method, headers, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(j.error || 'xato'), { status: r.status });
    return j;
  }
  function likePaint(id) {
    const el = $('funLike'), s = likeSt[id];
    if (!el || el.dataset.id !== id || !s) return;
    el.querySelector('[data-n="likes"]').textContent = s.likes ? fmtN(s.likes) : '';
    el.querySelector('[data-r="1"]').classList.toggle('is-on', s.mine === 1);
    el.querySelector('[data-r="-1"]').classList.toggle('is-on', s.mine === -1);
  }
  function likeLoad(id) {
    const el = $('funLike');
    if (!el) return;
    el.addEventListener('click', async e => {
      const b = e.target.closest('[data-r]');
      if (!b) return;
      const s = likeSt[id];
      const msg = m => (typeof toast === 'function' ? toast(m) : alert(m));
      if (!API || !s || s.down) return msg(L('Baholash hozircha ishlamayapti', 'Оценки временно недоступны'));
      if (!tok()) return msg(L('Baho berish uchun hisobingizga kiring', 'Войдите, чтобы оценить'));
      const v = s.mine === +b.dataset.r ? 0 : +b.dataset.r;
      const prev = { likes: s.likes, dislikes: s.dislikes, mine: s.mine };
      s.likes = (s.likes || 0) + (v === 1) - (prev.mine === 1);
      s.mine = v;
      likePaint(id);
      if (v) { b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); }
      try { Object.assign(s, await likeReq('POST', '/api/react', { movie: sid(id), value: v })); likePaint(id); }
      catch (er) {
        Object.assign(s, prev); likePaint(id); msg(er.status === 401 ? L('Baho berish uchun hisobingizga kiring', 'Войдите, чтобы оценить') : L('Xatolik, keyinroq urinib ko‘ring', 'Ошибка, попробуйте позже')); }
    });
    if (likeSt[id]) return likePaint(id);
    likeSt[id] = { likes: 0, dislikes: 0, mine: 0 };
    if (API) likeReq('GET', '/social?movie=' + sid(id)).then(j => { Object.assign(likeSt[id], j); likePaint(id); }).catch(() => { likeSt[id].down = true; });
  }

  function play(id) {
    const st = $('funStage');
    if (!id) { if (typeof destroyYouTube === 'function') destroyYouTube(); st.hidden = true; st.innerHTML = ''; return; }
    const x = items.find(y => y.id === id) || liveItem(id) || { id, t: '', cn: '' };
    st.hidden = false;
    // DezoMax o'z pleyeri (js/ytplayer.js): bizning panel, sifat, katta ekran; u bo'lmasa — oddiy YouTube oynasi
    const own = typeof mountYouTube === 'function';
    st.innerHTML = `<div class="fun-player">${own ? '<div class="player-wrap" id="funBox"></div>' : `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="${esc(x.t)}"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`}</div>
      <div class="fun-info"><div><h2>${esc(x.t)}</h2><small>${esc(x.cn)}${x.v ? ` · ${fmtN(x.v)} ${L('ko‘rish', 'просм.')}` : ''}${x.d ? ` · ${ago(x.d)}` : ''}</small></div>
        <div class="fun-acts"><span class="fun-like" id="funLike" data-id="${id}"><button type="button" class="fl-up" data-r="1" aria-label="${L('Yoqdi', 'Нравится')}">${LIKE_IC}<span data-n="likes"></span></button><i class="fl-sep" aria-hidden="true"></i><button type="button" class="fl-down" data-r="-1" aria-label="${L('Yoqmadi', 'Не нравится')}">${LIKE_IC}</button></span>
          <button type="button" class="fun-rb" id="funShare" aria-label="${L('Ulashish', 'Поделиться')}">${SHARE_IC}</button>
          <button type="button" class="fun-rb${savedSet().has(id) ? ' is-on' : ''}" id="funSave" aria-label="${L('Saqlash', 'Сохранить')}">${SAVE_IC}</button>
          <span class="fun-mm"><button type="button" class="fun-rb" id="funMoreBtn" aria-label="${L('Yana', 'Ещё')}" aria-expanded="false">${MORE_IC}</button>
            <span class="fun-menu" id="funMenu" hidden><button type="button" data-act="copy">${L('Havolani nusxalash', 'Копировать ссылку')}</button><button type="button" id="funClose">${L('Videoni yopish', 'Закрыть видео')}</button></span></span></div></div>`;
    {
      const msg = m => (typeof toast === 'function' ? toast(m) : alert(m));
      const url = 'https://dezomax.uz/qiziqarli.html' + location.hash;
      const pop = b => { b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); };
      $('funShare').addEventListener('click', e => {
        pop(e.currentTarget);
        if (navigator.share) navigator.share({ title: x.t + ' — DezoMax', url }).catch(() => {});
        else navigator.clipboard?.writeText(url).then(() => msg(L('Havola nusxalandi', 'Ссылка скопирована')));
      });
      $('funSave').addEventListener('click', e => {
        const b = e.currentTarget, set = savedSet(), on = !set.has(id);
        on ? set.add(id) : set.delete(id);
        try { localStorage.setItem(SAVED, JSON.stringify([...set].slice(-500))); } catch (er) {}
        b.classList.toggle('is-on', on); if (on) pop(b);
        msg(on ? L('Saqlandi', 'Сохранено') : L('Saqlanganlardan olindi', 'Удалено из сохранённых'));
      });
      const menu = $('funMenu'), mb = $('funMoreBtn');
      mb.addEventListener('click', e => { e.stopPropagation(); menu.hidden = !menu.hidden; mb.setAttribute('aria-expanded', String(!menu.hidden)); });
      menu.querySelector('[data-act="copy"]').addEventListener('click', () => { menu.hidden = true; navigator.clipboard?.writeText(url).then(() => msg(L('Havola nusxalandi', 'Ссылка скопирована'))); });
      document.addEventListener('click', () => { if (menu.isConnected) menu.hidden = true; });
    }
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
        if (next) setTimeout(() => { if ($('funBox') === box) location.replace(location.pathname + location.search + hp() + '&v=' + next.id); }, 1500);
      });
    }
    likeLoad(id);
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
    // video kartasi: sahifa ichida ochiladi (havolasi — Google uchun /video/… manzil); yangi oynada ochish (Ctrl/o'rta tugma) — o'sha manzil
    const vc = e.target.closest('a.fun-card[data-v]');
    if (vc && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) { e.preventDefault(); location.hash = hp().slice(1) + '&v=' + vc.dataset.v; return; }
    // «#…» havolalar (kanal kartalari va h.k.) — /video/… sahifasida <base href="/"> bo'lgani uchun qo'lda
    const ha = e.target.closest('a[href^="#"]');
    if (ha && !e.ctrlKey && !e.metaKey && e.button === 0 && !ha.hasAttribute('data-live-go')) { e.preventDefault(); location.hash = ha.getAttribute('href'); return; }
    const lg = e.target.closest('[data-live-go]');
    if (lg) { e.preventDefault(); const lv = cs && liveOf(cs); if (lv) location.hash = hp().slice(1) + '&v=' + lv.id; return; }
    if (e.target.closest('#funClose')) { e.preventDefault(); history.replaceState(null, '', location.pathname + location.search + hp()); play(''); return; }
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
