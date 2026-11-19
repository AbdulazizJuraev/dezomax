/* ============================================================
   DezoMax 5.0 — bosh sahifa (index.html, css/home5.css)
   ------------------------------------------------------------
   Foydalanuvchi maketi (2026-11-18). Ma'lumot va mantiq js/v4.js dagidek:
   - Hero: admin → «Sayt» → slayder kinolari (SITE_CONFIG.hero.ids) + eng ko'p ko'rilganlar; o'ngda kichik posterlar
   - Qatorlar: admin qatorlari (SITE_CONFIG.rows) maket bloklariga joylanadi — trend, janr plitkalari, TOP 10,
     Shorts paneli, yangi kinolar panjarasi, jonli efir paneli, ilova banneri, seriallar, multfilmlar
   - Navbar: qidiruv palitrasi (/ tugmasi), til, yangi kinolar qo'ng'irog'i, profil menyusi
   Yordamchilar — js/common.js (MOVIES, heroMovie, heroCompose, partsOf, watchStatus, movieHref ...)
   ============================================================ */
(function () {
  const PREVIEW = /[?&]preview=1(?:&|$)/.test(location.search);
  let previewCfg = null;
  if (PREVIEW) {
    try { previewCfg = JSON.parse(localStorage.getItem('dzx_preview_cfg') || 'null'); } catch {}
    document.documentElement.classList.add('dzx-preview');
  }
  const CFG = previewCfg || (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG) || {};
  const $ = id => document.getElementById(id);
  const ru = LANG === 'ru';
  const L = (uz, r) => ru ? r : uz;

  /* ---------- rasmlar ---------- */
  const okBig = u => !!u && !/dezocloud\.uz|images\/custom\//.test(String(u));
  const tmSize = (u, size) => String(u).replace(/(image\.tmdb\.org\/t\/p\/)(w\d+|original)\//, `$1${size}/`);
  const ytOf = m => (String(m.video || m.trailer || '').match(/(?:[?&]v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  function wideOf(m, size) {
    if (okBig(m.hposter)) return tmSize(m.hposter, size);
    if (okBig(m.cover)) return /image\.tmdb\.org/.test(m.cover) ? tmSize(m.cover, size) : imgBig(m.cover);
    const yt = ytOf(m);
    return yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null;
  }
  const isFrame = u => /rtbcdn\.ru|i\.ytimg\.com/.test(String(u || ''));
  // tik poster (2:3): TMDB / vposter / o'zimizdagi poster; YouTube/RuTube kadri — tik poster emas
  function tallOf(m, size = 'w500') {
    if (okBig(m.vposter)) return tmSize(m.vposter, size);
    if (m.poster && /image\.tmdb\.org/.test(m.poster)) return tmSize(m.poster, size);
    if (m.poster && !isFrame(m.poster)) return imgSmall(m.poster) || m.poster;
    return null;
  }
  const hasTall = m => !!tallOf(m);
  // kartadagi rasm: tik poster bo'lsa — u, bo'lmasa keng kadr (kartada o'rtasidan kesiladi)
  const cardImg = m => tallOf(m) || (m.poster ? imgSmall(m.poster) : null) || wideOf(m, 'w500');
  const colorsOf = m => m.colors || ['#17402B', '#06140C'];

  /* ---------- matnlar ---------- */
  const DAY = 86400000;
  const yr = m => m.year || 0;
  const rt = m => m.rating || 0;
  function lenText(m, parts) {
    if (parts > 1) return `${parts} ${L('qism', 'серий')}`;
    const d = Math.round(+m.duration || 0);
    if (!d) return '';
    return d >= 60 ? `${Math.floor(d / 60)} ${L('soat', 'ч')} ${d % 60 ? (d % 60) + L(' daq', ' мин') : ''}`.trim() : `${d} ${L('daq', 'мин')}`;
  }
  function descOk(m) {
    const d = String((m.desc && (m.desc[LANG] || m.desc.uz)) || '').replace(/\s+/g, ' ').trim();
    return d.length > 50 && !/obuna|kanal|t\.me|@\w|http|720p|1080p|tilida\s*$|🎬|📀/i.test(d) ? d : '';
  }
  const subOf = m => {
    const parts = partsOf(m).length;
    return [m.year, parts > 1 ? `${parts} ${L('qism', 'серий')}` : genreName((m.genres || [])[0]) || typeName(m.type)].filter(Boolean).join(' · ');
  };
  const fmtN = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* ---------- poster karta ---------- */
  /* Albom (gorizontal) rasmlar tik kartada kesilib qolmasin (foydalanuvchi so'rovi, 2026-11-18):
     - qatorning ko'pchiligida tik poster bo'lmasa — butun qator gorizontal 16:9 kartalar (land)
     - tik qatorga albom rasm tushsa (yoki aksincha) — rasm yuklanganda o'lchami tekshiriladi va kesilmay joylanadi (is-fit) */
  window.h5Fit = img => {
    const card = img.closest('.h5-poster');
    if (!card || !img.naturalWidth) return;
    const r = img.naturalWidth / img.naturalHeight;
    if (card.classList.contains('is-land') ? r < 1.2 : r > .9) card.classList.add('is-fit');
    // tik qatorda kartalarning yarmidan ko'pi albom rasm bo'lib chiqsa — butun qator gorizontal kartalarga o'tadi
    const row = card.parentElement.closest('.h5-row, .h5-grid');
    if (!row || row.classList.contains('is-land') || row.closest('.h5-top')) return;
    const cards = row.querySelectorAll('.h5-poster');
    // yuklangan rasmlarning 1/3 dan ko'pi albom bo'lsa — qator albom (masalan Konsertlar; qolganlari lazy, hali yuklanmagan)
    const loaded = [...cards].filter(c => { const i = c.querySelector('img'); return i && i.complete && i.naturalWidth; }).length;
    if (loaded < 3 || row.querySelectorAll('.h5-poster.is-fit').length * 3 <= loaded) return;
    row.classList.add('is-land');
    cards.forEach(c => { c.classList.add('is-land'); c.classList.remove('is-fit'); const i = c.querySelector('img'); if (i && i.complete) window.h5Fit(i); });
  };
  const landRow = list => list.filter(m => !tallOf(m)).length * 2 >= list.length;
  function posterHTML(m, extra = '', land = false) {
    const img = land ? (wideOf(m, 'w780') || cardImg(m)) : cardImg(m);
    const [c1, c2] = colorsOf(m);
    const st = watchStatus(m);
    return `<a class="h5-poster${land ? ' is-land' : ''}" href="${movieHref(m)}" style="--c1:${esc(c1)};--c2:${esc(c2)}" aria-label="${esc(title(m))}">
      ${img ? `<img src="${esc(img)}" alt="" loading="lazy" decoding="async" onload="h5Fit(this)" onerror="this.remove()">` : ''}
      ${m.rating ? `<span class="h5-badge">★ ${(+m.rating).toFixed(1)}</span>` : ''}
      ${st === 'uz' ? `<span class="h5-badge is-uz">UZ</span>` : ''}
      <span class="h5-shade"></span><span class="h5-info"><span class="h5-t">${esc(title(m))}</span><span class="h5-m">${esc(subOf(m))}</span></span>${extra}</a>`;
  }
  // bitta serialning alohida qo'shilgan qismlari — qatorda bir marta
  const baseTitle = m => norm(title(m)).replace(/[\s.,:–—-]*\d+\s*-?\s*(qism|seriya|серия|bolim|bo‘lim)(\s.*)?$/i, '').trim();
  function uniq(list) {
    const seen = new Set();
    return list.filter(m => { const k = baseTitle(m); if (seen.has(k)) return false; seen.add(k); return true; });
  }
  const seeAll = L('Barchasi', 'Все');
  const headHTML = (t, all, pre = '', post = '') => `<div class="h5-head">${pre}<h2>${esc(t)}</h2>${post}${all ? `<a class="h5-all" href="${all}">${seeAll} ›</a>` : ''}</div>`;
  const rowSec = (t, all, list, cls = '') => { const land = landRow(list);
    return `<section class="h5-sec h5-wrap">${headHTML(t, all)}<div class="h5-row${cls}${land ? ' is-land' : ''}">${list.map(m => posterHTML(m, '', land)).join('')}</div></section>`; };
  const gridSec = (t, all, list) => { const land = landRow(list);
    return `<section class="h5-sec h5-wrap">${headHTML(t, all)}<div class="h5-grid${land ? ' is-land' : ''}">${list.map(m => posterHTML(m, '', land)).join('')}</div></section>`; };

  /* ---------- hero ---------- */
  const heroIsUzbek = m => m.franchise === 'uzbek' || m.ch === 'rizanova' || m.ch === 'uzbekkinoofficial' || /^(rn|uzbekk)-/.test(m.slug || '')
    || /o.?zbekiston|узбекистан/i.test(`${m.country?.uz || ''} ${m.country?.ru || ''}`) || String(m.poster || '').startsWith('images/uz/');
  const heroArtOk = m => !!m && !heroIsUzbek(m) && !isExtraVideo(m) && watchStatus(m) !== 'trailer'
    && (okBig(m.vposter) || /image\.tmdb\.org/.test(m.poster || '') || okBig(m.hposter) || (okBig(m.cover) && /^images\//.test(m.cover)));
  const HERO_POP_KEY = 'dzxHeroPop';
  const HERO_HIDE_KEY = 'dzxHeroHidden';
  const heroHidden = () => { try { return JSON.parse(localStorage.getItem(HERO_HIDE_KEY) || '[]'); } catch { return []; } };
  function heroList(popIds) {
    if (kidsMode()) return kidsHero(CFG.hero && CFG.hero.kidsIds).slice(0, 8);
    const admin = ((CFG.hero && CFG.hero.ids) || []).map(heroMovie).filter(heroArtOk);
    const byId = new Map(MOVIES.map(m => [m.id, m]));
    const pop = (popIds || []).map(id => byId.get(id)).filter(heroArtOk);
    const hid = new Set(heroHidden());
    const list = [...new Set([...admin, ...pop])].filter(m => !hid.has(m.id)).slice(0, 8);
    return list.length ? list : heroCompose([]).slice(0, 8);
  }
  /* Sekin internet: index.html faqat js/data-home.js ni yuklaydi — kerakli kino unda bo'lmasa, to'liq ro'yxat bir marta */
  let fullP = null;
  window.dzxLoadFull = () => {
    if (!window.DZX_HOME_PART || !window.DZX_BASE) return Promise.resolve(false);
    return fullP || (fullP = (async () => {
      const v = (document.querySelector('script[src*="data-home.js"]')?.src.split('?')[1]) || '';
      const urls = ['data-channels', 'data-rutube', 'data-site'].map(n => `js/${n}.js${v ? '?' + v : ''}`);
      const codes = await Promise.all(urls.map(u => fetch(u).then(r => r.ok ? r.text() : null, () => null)));
      if (!codes.every(Boolean)) { fullP = null; return false; }
      const keep = MOVIES.slice();
      MOVIES.splice(0, MOVIES.length, ...window.DZX_BASE);
      try {
        for (const code of codes) { const s = document.createElement('script'); s.text = code; document.head.appendChild(s); }
      } catch { MOVIES.splice(0, MOVIES.length, ...keep); fullP = null; return false; }
      // data-site.js endi kichik: qolgan kinolar bo'laklarda (js/data-site-<k>.json) — hammasi kelguncha kutamiz
      if (window.dzxData) {
        await window.dzxData.load();
        if (!window.dzxData.full) { MOVIES.splice(0, MOVIES.length, ...keep); fullP = null; return false; }
      }
      if (typeof buildParts === 'function') buildParts();
      window.DZX_HOME_PART = false;
      return true;
    })());
  };
  const hasMovie = id => MOVIES.some(m => m.id === id) || PART_MOVIES.has(id);
  const gone = new Set([...(window.DZX_GONE || []), ...(typeof HIDDEN_MOVIES !== 'undefined' ? HIDDEN_MOVIES : [])]);
  const needFull = ids => !!window.DZX_HOME_PART && ids.some(id => id && !gone.has(id) && !hasMovie(id));

  let popCached = [];
  try { popCached = JSON.parse(localStorage.getItem(HERO_POP_KEY) || '[]'); } catch {}
  const picks = heroList(popCached);
  const DELAY = Math.min(60, Math.max(6, Number(CFG.hero && CFG.hero.delay) || 8)) * 1000;
  const PHONE = matchMedia('(max-width: 860px)');
  let cur = 0, timer = null;

  const PLAY_SVG = '<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="#04160B"/></svg>';
  const INFO_SVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>';
  const MARK_SVG = '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>';
  function heroArt(m) {
    // kompyuterda keng kadr (maketdagidek chapga eriydi), telefonda tik poster
    return PHONE.matches ? (tallOf(m, 'w780') || wideOf(m, 'w780')) : (wideOf(m, 'w1280') || tallOf(m, 'w780'));
  }
  function show(i) {
    if (!picks.length) return;
    cur = (i + picks.length) % picks.length;
    const m = picks[cur];
    const parts = partsOf(m).length;
    const st = watchStatus(m);
    const last = parts > 1 ? partsOf(m)[parts - 1] : null;
    const fresh = last && last.addedAt && Date.now() - last.addedAt < 21 * DAY;
    $('h5Kind').textContent = fresh ? `${L('Yangi qism', 'Новая серия')} · ${parts}` : st === 'uz' ? L('O‘zbek tilida', 'На узбекском') : L('Bugun trendda', 'Сегодня в тренде');
    const h = $('h5Title');
    h.textContent = title(m);
    h.classList.toggle('is-long', title(m).length > 26);
    $('h5Meta').innerHTML = [
      m.rating ? `<span class="h5-rt">★ ${(+m.rating).toFixed(1)}</span>` : '',
      m.year ? `<span>${esc(m.year)}</span>` : '',
      m.age ? `<span class="h5-age">${esc(m.age)}+</span>` : '',
      `<span>${esc([typeName(m.type), genreName((m.genres || [])[0])].filter(Boolean).join(' · '))}</span>`,
      lenText(m, parts) ? `<span>${esc(lenText(m, parts))}</span>` : ''
    ].join('');
    $('h5Desc').textContent = descOk(m);
    const play = st === 'none' ? null
      : st === 'trailer' ? { href: `movie.html?id=${m.id}&play=1`, text: L('Treyler', 'Трейлер') }
      : parts > 1 ? { href: `movie.html?id=${m.id}&part=${parts}&play=1`, text: L('Ko‘rish', 'Смотреть') }
      : { href: `movie.html?id=${m.id}&play=1`, text: L('Ko‘rish', 'Смотреть') };
    $('h5Acts').innerHTML = `${play ? `<a class="h5-btn is-green" href="${play.href}">${PLAY_SVG}${esc(play.text)}</a>` : ''}
      <a class="h5-btn is-soft" href="${movieHref(m)}">${INFO_SVG}${L('Batafsil', 'Подробнее')}</a>
      <button class="h5-btn is-soft is-ic${isFav(m.id) ? ' is-on' : ''}" type="button" data-fav="${m.id}" aria-label="${L('Ro‘yxatga', 'В список')}">${MARK_SVG}</button>`;
    $('h5Slider').querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-current', j === cur));
    const [c1] = colorsOf(m);
    $('h5Hero').style.background = `radial-gradient(800px 500px at 10% 20%, ${c1}44, transparent 70%)`;
    const src = heroArt(m), im = $('h5Art');
    im.classList.remove('is-in');
    if (!src) return;
    const pre = new Image();
    pre.onload = () => { if (picks[cur] !== m) return; im.src = src; im.alt = title(m); requestAnimationFrame(() => im.classList.add('is-in')); };
    pre.src = src;
    const nx = picks[(cur + 1) % picks.length];
    const nsrc = nx && heroArt(nx);
    if (nsrc) new Image().src = nsrc;
  }
  function restart() {
    clearInterval(timer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => { if (!document.hidden && window.scrollY < 600) show(cur + 1); }, DELAY);
  }
  function sliderHTML() {
    return picks.map((m, i) => { const img = tallOf(m, 'w185') || cardImg(m); const [c1, c2] = colorsOf(m);
      return `<button type="button" role="tab" data-i="${i}" aria-label="${esc(title(m))}" style="background:linear-gradient(160deg,${esc(c1)},${esc(c2)})">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</button>`; }).join('');
  }
  function initHero() {
    if (!picks.length) { $('h5Hero').hidden = true; return; }
    $('h5Slider').innerHTML = sliderHTML();
    $('h5Slider').addEventListener('click', e => {
      const b = e.target.closest('button[data-i]');
      if (!b) return;
      if (+b.dataset.i === cur) { location.href = movieHref(picks[cur]); return; }
      show(+b.dataset.i); restart();
    });
    // telefonda barmoq bilan surish
    let x0 = null, y0 = 0;
    const hero = $('h5Hero');
    hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { show(cur + (dx < 0 ? 1 : -1)); restart(); }
    }, { passive: true });
    PHONE.addEventListener('change', () => show(cur));
    show(0); restart();
  }

  /* ---------- qator manbalari (admin → «Sayt» → qatorlar) ---------- */
  const libRow = fr => MOVIES.filter(m => m.franchise === fr && m.poster);
  const ROW_SOURCES = {
    uzbek:     { all: 'catalog.html?watch=uz',             list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)) },
    tahlil:    { all: 'catalog.html?franchise=tahlil',     list: () => MOVIES.filter(m => m.franchise === 'tahlil').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)) },
    konsert:   { all: 'catalog.html?franchise=konsert',    list: () => MOVIES.filter(m => m.franchise === 'konsert').sort((a, b) => yr(b) - yr(a)) },
    trending:  { all: 'catalog.html?sort=rating',          list: () => MOVIES.filter(m => rt(m) && hasTall(m)).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)) },
    new:       { all: 'catalog.html?sort=new',             list: () => MOVIES.filter(m => m.addedAt && hasFilm(m) && !isExtraVideo(m)).sort((a, b) => b.addedAt - a.addedAt) },
    dorama:    { all: 'catalog.html?franchise=dorama',     list: () => libRow('dorama') },
    klassika:  { all: 'catalog.html?franchise=klassika',   list: () => MOVIES.filter(m => m.franchise === 'klassika' && m.type !== 'multfilm').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0) || yr(b) - yr(a)) },
    hollywood: { all: 'catalog.html?franchise=hollywood',  list: () => MOVIES.filter(m => m.franchise === 'hollywood').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)) },
    anime:     { all: 'catalog.html?franchise=anime',      list: () => libRow('anime') },
    hind:      { all: 'catalog.html?franchise=hind',       list: () => libRow('hind') },
    marvel:    { all: 'marvel.html',                       list: () => MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => yr(a) - yr(b)) },
    dc:        { all: 'catalog.html?franchise=dc',         list: () => MOVIES.filter(m => m.franchise === 'dc').sort((a, b) => yr(a) - yr(b)) },
    top:       { all: null,                                list: () => MOVIES.filter(m => rt(m) && !isExtraVideo(m)).sort((a, b) => rt(b) - rt(a)) },
    popular:   { all: null,                                list: () => MOVIES.filter(m => rt(m) && !isExtraVideo(m)).sort((a, b) => rt(b) - rt(a)) },
    series:    { all: 'catalog.html?type=serial',          list: () => MOVIES.filter(m => m.type === 'serial' && watchStatus(m) !== 'none') },
    cartoons:  { all: 'catalog.html?type=multfilm',        list: () => MOVIES.filter(m => m.type === 'multfilm' && hasFilm(m)) },
    custom:    { all: null,                                list: row => (row.ids || []).map(id => MOVIES.find(m => m.id === id)).filter(Boolean) }
  };
  const DEFAULT_ROWS = ['popular', 'uzbek', 'klassika', 'konsert', 'trending', 'new', 'dorama', 'anime', 'hind', 'marvel', 'dc', 'top', 'series', 'cartoons'].map(source => ({ source, visible: true }));
  // tik posterli kinolar oldinda — maketdagi poster qatorlari chiroyli chiqsin (tartib ichida saqlanadi)
  const tallFirst = list => [...list.filter(hasTall), ...list.filter(m => !hasTall(m))];

  /* «Ko'rishni davom ettiring» — js/movie.js → dezomax_watch_history */
  const WATCH_HISTORY_KEY = 'dezomax_watch_history';
  function watchHistory() {
    try {
      const hidden = typeof HIDDEN_MOVIES !== 'undefined' ? HIDDEN_MOVIES : [];
      return JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]')
        .filter(x => x && x.id && x.dur > 0 && !x.done && !hidden.includes(x.id))
        .map(x => ({ x, m: MOVIES.find(m => m.id === x.id) || PART_MOVIES.get(x.id) }))
        .filter(o => o.m).slice(0, 12);
    } catch { return []; }
  }
  function continueHTML() {
    const list = watchHistory();
    if (!list.length) return '';
    return `<section class="h5-sec h5-wrap" id="h5Cw">${headHTML(L('Ko‘rishni davom ettiring', 'Продолжить просмотр'), 'favorites.html')}
      <div class="h5-row is-sm">${list.map(({ x, m }) => {
        const pct = Math.min(100, Math.max(2, x.t / x.dur * 100));
        const card = posterHTML(m, `<span class="h5-prog"><i style="width:${pct.toFixed(1)}%"></i></span>`).replace(`href="${movieHref(m)}"`, `href="${esc(x.path || `movie.html?id=${m.id}`)}"`);
        return `<div class="h5-cw">${card}<button class="h5-cw-x" type="button" data-cw-del="${m.id}" aria-label="${L('Olib tashlash', 'Убрать')}">×</button></div>`;
      }).join('')}</div></section>`;
  }

  /* TOP 10 — eng ko'p ko'rilganlar (to'lov serveri /top), kam bo'lsa — reyting bo'yicha */
  const TOP_TABS = [[1, 'top.day'], [7, 'top.week'], [30, 'top.month']];
  let topDays = 1;
  const topCache = new Map();
  async function topIds(days) {
    if (topCache.has(days)) return topCache.get(days);
    const api = typeof PAY_API !== 'undefined' && PAY_API ? String(PAY_API).replace(/\/+$/, '') : '';
    if (!api) return [];
    const r = await fetch(`${api}/top?days=${days}&limit=40`).catch(() => null);
    const j = r && r.ok ? await r.json().catch(() => null) : null;
    const ids = (j?.items || []).map(x => x.movie);
    topCache.set(days, ids);
    return ids;
  }
  const t10Cards = list => list.filter(cardImg).slice(0, 10).map((m, i) => `<div class="h5-item"><span class="h5-num" aria-hidden="true">${i + 1}</span>${posterHTML(m)}</div>`).join('');
  function top10HTML(t) {
    return `<section class="h5-sec h5-wrap h5-top" id="h5Top">${headHTML(t, null, '', `<div class="h5-tabs">${TOP_TABS.map(([d, k]) => `<button type="button" data-days="${d}" class="${d === topDays ? 'is-on' : ''}">${esc(window.t(k))}</button>`).join('')}</div>`)}
      <div class="h5-row" id="h5T10">${t10Cards(tallFirst(ROW_SOURCES.popular.list()))}</div></section>`;
  }
  async function loadTop10() {
    const row = $('h5T10');
    if (!row) return;
    const byId = new Map(MOVIES.map(m => [m.id, m]));
    const days = topDays;
    const top = await topIds(days);
    // yengil ro'yxatda yo'q kinolar o'tkazib yuboriladi — TOP 10 uchun 12 MB to'liq ro'yxat yuklanmaydi (telefon, sekin internet)
    const real = top.map(id => byId.get(id)).filter(m => m && !isExtraVideo(m));
    if (days !== topDays) return;
    const all = real.length < 10 ? (await topIds('all')).map(id => byId.get(id)).filter(m => m && !isExtraVideo(m)) : [];
    row.innerHTML = t10Cards([...new Set([...real, ...all, ...tallFirst(ROW_SOURCES.popular.list())])]);
    row.scrollLeft = 0;
  }

  /* Janr plitkalari — har janrda nechta kino bor, yonida ikkita poster */
  const GENRE_TILES = [['comedy', 38], ['action', 2], ['drama', 265], ['scifi', 190], ['animation', 320], ['history', 95]];
  function genresHTML() {
    const watchable = MOVIES.filter(m => watchStatus(m) !== 'none' && !isExtraVideo(m));
    const tiles = GENRE_TILES.map(([g, h]) => {
      const list = g === 'animation' ? watchable.filter(m => m.type === 'multfilm' || (m.genres || []).includes('animation')) : watchable.filter(m => (m.genres || []).includes(g));
      const pics = list.filter(m => hasTall(m) && rt(m)).sort((a, b) => rt(b) - rt(a)).slice(0, 2);
      const href = g === 'animation' ? 'catalog.html?type=multfilm' : `catalog.html?genre=${g}`;
      return list.length < 3 ? '' : `<a class="h5-genre" href="${href}" style="--h:${h}"><b>${esc(g === 'animation' ? L('Multfilm', 'Мультфильмы') : genreName(g))}</b>
        <small>${fmtN(Math.max(list.length, (window.DZX_GENRE_N || {})[g] || 0))} ${L('ta kino', 'фильмов')}</small>
        <span class="h5-stack">${pics.map(m => `<img src="${esc(tallOf(m, 'w342'))}" alt="" loading="lazy" onerror="this.remove()">`).join('')}</span></a>`;
    }).join('');
    return tiles ? `<section class="h5-sec h5-wrap">${headHTML(L('Janr bo‘yicha', 'По жанрам'), 'catalog.html')}<div class="h5-genres">${tiles}</div></section>` : '';
  }

  /* Shorts paneli (js/data-shorts.js) — kanallar aralash */
  function shortsHTML() {
    const all = typeof SHORTS !== 'undefined' ? SHORTS.filter(s => s && s.id) : [];
    if (!all.length) return '';
    const groups = {};
    all.forEach(s => (groups[s.ch] = groups[s.ch] || []).push(s));
    const q = Object.values(groups).map(g => g.sort(() => Math.random() - .5).sort((a, b) => !!b.p - !!a.p));
    const list = [];
    for (let i = 0; list.length < 20 && q.some(g => g[i]); i++) q.forEach(g => { if (g[i] && list.length < 20) list.push(g[i]); });
    return `<section class="h5-sec h5-wrap"><div class="h5-panel is-violet">
      ${headHTML('Shorts', 'shorts.html', `<span class="h5-tag" style="background:#7B5CFF">${L('YANGI', 'НОВОЕ')}</span>`).replace('class="h5-all"', 'class="h5-all" style="color:var(--violet)"')}
      <div class="h5-row">${list.map(s => `<a class="h5-short" href="shorts.html#${s.id}" aria-label="${esc(s.t)}">
        <img src="${esc(s.p || `https://i.ytimg.com/vi/${s.id}/oardefault.jpg`)}" alt="" loading="lazy" decoding="async" onerror="this.closest('a').remove()"><span class="h5-shade"></span>
        <span class="h5-play"><svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="#fff"/></svg></span><span class="h5-sc">${esc(s.t)}</span></a>`).join('')}</div></div></section>`;
  }

  /* Kino studiyalari paneli (2026-11-19, foydalanuvchi so'rovi): Shorts paneli uslubida, tablar — Marvel, DC, Disney, Pixar…;
     kinolar chiqqan yili bo'yicha (ro'yxat — tools/gen-home-data.js → window.DZX_STUDIOS) */
  // «Barchasi» faqat o'z sahifasi borlarida (Marvel); boshqalarida butun ro'yxat panelning o'zida — umumiy katalogga olib bormaydi
  const KS = [['marvel', 'Marvel', 'marvel.html'], ['dc', 'DC', ''], ['disney', 'Disney', ''], ['pixar', 'Pixar', ''],
    ['dreamworks', 'DreamWorks', ''], ['illumination', 'Illumination', ''], ['bluesky', 'Blue Sky', '']];
  let ksCur = 'marvel';
  const ksName = m => title(m).replace(/^[^\p{L}\d]+/u, '').replace(/\s*\((?:asilmedia|qisqa|\d{4}).*?\)/ig, '').replace(/\s+(multfilm|o['‘’]?zbek tilida|uzbek tilida).*$/i, '').replace(/["«»]/g, '').trim() || title(m);
  const ksList = k => { const byId = new Map(MOVIES.map(m => [m.id, m])); return ((window.DZX_STUDIOS || {})[k] || []).map(id => byId.get(id)).filter(m => m && cardImg(m)); };
  const ksCards = k => ksList(k).map(m => `<a class="h5-ks-c" href="${movieHref(m)}"><img src="${esc(cardImg(m))}" alt="" loading="lazy" decoding="async" onerror="this.closest('a').remove()"><span class="h5-shade"></span><b class="h5-ks-y">${m.year}</b><span class="h5-sc">${esc(ksName(m))}</span></a>`).join('');
  function kinoStudioHTML() {
    const tabs = KS.filter(([k]) => ksList(k).length >= 3);
    if (!tabs.length) return '';
    if (!tabs.some(([k]) => k === ksCur)) ksCur = tabs[0][0];
    const all = (tabs.find(([k]) => k === ksCur) || tabs[0])[2];
    return `<section class="h5-sec h5-wrap"><div class="h5-panel is-violet h5-ks" id="h5Ks">
      ${headHTML(L('Kino studiyalar', 'Киностудии'), 'marvel.html').replace('class="h5-all"', `class="h5-all" id="h5KsAll" style="color:var(--violet)"${all ? '' : ' hidden'}`)}
      <div class="h5-ks-tabs" role="tablist">${tabs.map(([k, n]) => `<button type="button" role="tab" data-ks="${k}"${k === ksCur ? ' class="is-on" aria-selected="true"' : ''}>${n}</button>`).join('')}</div>
      <div class="h5-row" id="h5KsRow">${ksCards(ksCur)}</div></div></section>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ks]');
    if (!b) return;
    ksCur = b.dataset.ks;
    document.querySelectorAll('[data-ks]').forEach(x => { x.classList.toggle('is-on', x === b); x.toggleAttribute('aria-selected', x === b); });
    const row = $('h5KsRow');
    if (row) { row.innerHTML = ksCards(ksCur); row.scrollLeft = 0; }
    const a = $('h5KsAll'), k = KS.find(([x]) => x === ksCur);
    if (a && k) { a.hidden = !k[2]; if (k[2]) a.href = k[2]; }
  });

  /* Jonli efir va sport paneli (js/channels.js → TV_CHANNELS) */
  const CAT = { general: ['Umumiy', 'Общий'], sports: ['Sport', 'Спорт'], music: ['Musiqa', 'Музыка'], kids: ['Bolalar', 'Детский'], movies: ['Kino', 'Кино'], news: ['Yangiliklar', 'Новости'] };
  function liveHTML() {
    if (typeof TV_CHANNELS === 'undefined') return '';
    const list = TV_CHANNELS.filter(c => c.country === 'uz' && c.logo).slice(0, 10);
    if (!list.length) return '';
    const sport = `<a class="h5-live" href="sport.html" style="--c1:#1f5a2c;--c2:#04140a"><span class="h5-lg"><svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#B8EC4A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg></span>
      <span class="h5-shade"></span><span class="h5-kind">${L('Natijalar', 'Результаты')}</span><span class="h5-tx"><small>DezoMax Sport</small><b>${L('Futbol, tennis, F1 — natija va yangiliklar', 'Футбол, теннис, F1 — результаты и новости')}</b></span></a>`;
    return `<section class="h5-sec h5-wrap"><div class="h5-panel is-blue">
      ${headHTML(L('Telekanallar va sport', 'Телеканалы и спорт'), 'tv.html', `<span class="h5-tag" style="background:var(--red)">${L('JONLI', 'ЭФИР')}</span>`).replace('class="h5-all"', 'class="h5-all" style="color:var(--blue)"')}
      <div class="h5-row">${list.map(c => `<a class="h5-live" href="tv.html?ch=${encodeURIComponent(c.id)}" style="--c1:${esc(c.colors[0])};--c2:${esc(c.colors[1])}">
        <span class="h5-lg${c.tile === 'dark' ? '' : ' is-tile'}"><img src="${esc(c.logo)}" alt="" loading="lazy" onerror="this.remove()"></span><span class="h5-shade"></span>
        <span class="h5-lv"><i></i>${L('JONLI', 'ЭФИР')}</span><span class="h5-kind">${esc((CAT[c.category] || CAT.general)[ru ? 1 : 0])}</span>
        <span class="h5-tx"><small>${L('Telekanal', 'Телеканал')}</small><b>${esc(c.name)}</b></span></a>`).join('')}${sport}</div></div></section>`;
  }

  /* Ilova banneri: poster devori + telefon va planshet */
  function appHTML() {
    const pool = tallFirst(ROW_SOURCES.popular.list()).filter(hasTall).slice(0, 40);
    if (pool.length < 8) return '';
    const p = i => pool[i % pool.length];
    const img = (m, s = 'w185') => `<img src="${esc(tallOf(m, s))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
    const native = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
    const shot = (m, mini) => `<div class="h5-shot">${img(m, 'w342')}<span class="h5-cap">${esc(title(m).split(':')[0])}<br><i>${L('Ko‘rish', 'Смотреть')}</i></span></div><div class="h5-mini">${mini.map(x => img(x)).join('')}</div>`;
    return `<section class="h5-sec h5-wrap"><div class="h5-app">
      <div class="h5-wall" aria-hidden="true">${Array.from({ length: 30 }, (_, k) => img(p(k * 2 + Math.floor(k / 6)))).join('')}</div>
      <div class="h5-app-copy">
        <div class="h5-eyebrow">${L('Har qanday ekranda', 'На любом экране')}</div>
        <h2>${L('Bitta sayt — <em>barcha ekranlarda</em>', 'Один сайт — <em>на всех экранах</em>')}</h2>
        <p>${L('Telefon, planshet, kompyuter yoki televizor: DezoMax har bir ekranga o‘zi moslashadi. Android uchun ilovasi ham bor.', 'Телефон, планшет, компьютер или телевизор: DezoMax сам подстраивается под любой экран. Есть и приложение для Android.')}</p>
        <div class="h5-stores">
          <a class="h5-btn is-green" href="catalog.html">${PLAY_SVG}${L('Hoziroq ko‘rish', 'Смотреть сейчас')}</a>
          ${native ? '' : `<a class="h5-store" href="https://play.google.com/store/apps/details?id=uz.dezomax.app" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1zm11 11 2.4 2.4-11 6.3 8.6-8.7zm3.6-3.7 2.6 1.5c.7.4.7 1.6 0 2l-2.6 1.5-2.7-2.5 2.7-2.5zM6 1.9l11 6.3-2.4 2.4L6 1.9z"/></svg><span><small>ANDROID</small>Google Play</span></a>`}
          <a class="h5-store" href="https://t.me/dezomaxuz" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M21.5 3.3 2.6 10.6c-.9.4-.9 1.2 0 1.5l4.8 1.5 1.8 5.6c.2.6.9.8 1.4.4l2.7-2.2 4.7 3.5c.6.4 1.3.1 1.5-.6l3.2-15.2c.2-.9-.5-1.6-1.2-1.3zM9.2 13.3l8.6-5.4c.2-.1.4.1.2.3l-7 6.5-.3 3.1z"/></svg><span><small>${L('YANGILIKLAR', 'НОВОСТИ')}</small>Telegram</span></a>
        </div>
      </div>
      <div class="h5-devices" aria-hidden="true">
        <div class="h5-dev is-tablet"><div class="h5-scr">${shot(p(2), [p(3), p(4), p(5), p(6)])}</div></div>
        <div class="h5-dev is-phone"><div class="h5-scr">${shot(p(0), [p(1), p(2), p(3)])}</div></div>
      </div></div></section>`;
  }

  /* Kinostudiyalar (js/common.js → STUDIOS) */
  const studioReady = s => !!s.href || MOVIES.some(m => m.franchise === s.key && m.ch);
  function studiosHTML(t) {
    const list = [...STUDIOS].sort((a, b) => studioReady(b) - studioReady(a));
    return `<section class="h5-sec h5-wrap">${headHTML(t)}<div class="h5-row">${list.map(s => studioReady(s)
      ? `<a class="h5-st" href="${studioHref(s)}" style="--st:${s.bg}" aria-label="${esc(s.name)}"><span>${s.logo}</span><small>${esc(s.name)}</small></a>`
      : `<span class="h5-st is-soon" style="--st:${s.bg}"><span>${s.logo}</span><small>${esc(s.name)}</small><em>${L('Tez orada', 'Скоро')}</em></span>`).join('')}</div></section>`;
  }

  const ctaHTML = () => `<section class="h5-sec h5-wrap"><div class="h5-cta"><div><h2>${L('Reklama?', 'Реклама?')}</h2>
    <p>${L('Saytda va DezoMax ilovasida reklama joylashtirish uchun bog‘laning.', 'Свяжитесь с нами, чтобы разместить рекламу на сайте и в приложении DezoMax.')}</p></div>
    <a class="h5-btn" href="https://t.me/dezomaxuz" target="_blank" rel="noopener">${L('Bog‘lanish', 'Связаться')} ↗</a></div></section>`;

  /* ================= Reklama-uslubidagi bloklar (foydalanuvchi namunalari, 2026-11-18) =================
     Hammasi yengil: harakat faqat CSS transform, ekrandan chiqsa to'xtaydi (initAnims), rasmlar kichik o'lchamda va lazy */
  // sonlar data-home.js dagi DZX_TYPE_N dan (har chaqirilganda o'qiladi); topilmasa — '' va matn sonsiz chiqadi («0 ta kino» emas)
  const nOf = (k, f) => { const n = Math.max((window.DZX_TYPE_N || {})[k] || 0, f()); return n > 0 ? fmtN(n) : ''; };
  const withN = (n, uz, ru, uz0, ru0) => (n ? L(`${n} ${uz}`, `${n} ${ru}`) : L(uz0, ru0));
  const ICO = {
    film: '<path d="M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M4 15h4M16 9h4M16 15h4"/>',
    tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    toon: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    shorts: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>',
    live: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/>',
    cup: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    speed: '<path d="M12 13l4-4"/><path d="M3.5 18a9 9 0 1 1 17 0"/>',
    resume: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 8v4l3 2"/>',
    next: '<path d="m5 4 10 8-10 8z"/><path d="M19 5v14"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    inf: '<path d="M7 9a3 3 0 1 0 0 6c2.5 0 7.5-6 10-6a3 3 0 1 1 0 6c-2.5 0-7.5-6-10-6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  const ic = (k, cls = '') => `<svg class="h5-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg>`;
  const backOf = (m, s = 'w780') => wideOf(m, s) || tallOf(m, 'w342');
  const pool = (pred, n) => tallFirst(ROW_SOURCES.popular.list()).filter(m => pred(m)).slice(0, n);
  const pickOne = (list, used) => { const m = list.find(x => !used.has(x.id)); if (m) used.add(m.id); return m; };

  /* 1) To'q banner + yelpig'ich kartalar (namuna 1) */
  function fanHTML() {
    const used = new Set();
    const cards = [
      [L('Multfilmlar', 'Мультфильмы'), 'toon', 'catalog.html?type=multfilm', m => m.type === 'multfilm' || (m.genres || []).includes('animation')],
      [L('Kinolar', 'Фильмы'), 'film', 'catalog.html?type=film', m => m.type === 'film'],
      [L('Seriallar', 'Сериалы'), 'tv', 'catalog.html?type=serial', m => m.type === 'serial'],
      ['Shorts', 'shorts', 'shorts.html', m => m.franchise === 'marvel'],
      [L('Jonli efir', 'Прямой эфир'), 'live', 'live.html', m => m.type === 'film' && rt(m) > 7.5],
      [L('Sport', 'Спорт'), 'cup', 'sport.html', m => (m.genres || []).includes('action')]
    ].map(([n, i, h, f]) => [n, i, h, pickOne(pool(f, 40), used)]).filter(x => x[3]);
    if (cards.length < 4) return '';
    return `<section class="h5-sec h5-wrap"><div class="h5-fan">
      <div class="h5-fan-copy">
        <h2><b>${L('Cheksiz tomosha', 'Смотрите без ограничений')}</b> <a href="catalog.html?type=film">${L('kinolar', 'фильмы')}</a>, <a href="catalog.html?type=serial">${L('seriallar', 'сериалы')}</a>, <a href="catalog.html?type=multfilm">${L('multfilmlar', 'мультфильмы')}</a> ${L('va yana ko‘p.', 'и многое другое.')}</h2>
        <p>${L('O‘zbek tilidagi eng katta onlayn kino katalogi — bepul, ro‘yxatdan o‘tmasdan.', 'Крупнейший онлайн-каталог кино на узбекском — бесплатно и без регистрации.')}</p>
        <a class="h5-sq" href="catalog.html">${L('Boshlash', 'Начать')} ${ic('ext')}</a>
      </div>
      <div class="h5-fan-cards">${cards.map(([n, i, h, m], k) => `<a class="h5-fan-c" href="${h}" style="--k:${k};--n:${cards.length}">
        <img src="${esc(tallOf(m, 'w342') || backOf(m, 'w500'))}" alt="" loading="lazy" onerror="this.remove()"><span>${ic(i)}${esc(n)}</span></a>`).join('')}</div>
    </div></section>`;
  }

  /* 2) Och fonli «hammasi bir joyda» bloki (namuna 2) */
  function aioHTML() {
    const used = new Set();
    const T = [
      ['Kinolar', 'Фильмы', 'catalog.html?type=film', m => m.type === 'film', 'is-g'], ['Seriallar', 'Сериалы', 'catalog.html?type=serial', m => m.type === 'serial', 'is-g'],
      ['O‘zbek kinolari', 'Узбекское кино', 'catalog.html?watch=uz', m => m.franchise === 'uzbek', ''], ['Marvel', 'Marvel', 'marvel.html', m => m.franchise === 'marvel', ''],
      ['Multfilmlar', 'Мультфильмы', 'catalog.html?type=multfilm', m => m.type === 'multfilm', 'is-g'], ['Anime', 'Аниме', 'catalog.html?franchise=anime', m => m.franchise === 'anime', 'is-g'],
      ['Konsertlar', 'Концерты', 'catalog.html?franchise=konsert', m => m.franchise === 'konsert', ''], ['Dorama', 'Дорамы', 'catalog.html?franchise=dorama', m => m.franchise === 'dorama', ''],
      ['Hind kinolari', 'Индийское кино', 'catalog.html?franchise=hind', m => m.franchise === 'hind', 'is-g'], ['Klassika', 'Классика', 'catalog.html?franchise=klassika', m => m.franchise === 'klassika', ''],
      ['DC', 'DC', 'catalog.html?franchise=dc', m => m.franchise === 'dc', ''], ['Va yana…', 'И ещё…', 'catalog.html', m => rt(m) > 8, '']
    ].map(([u, r, h, f, c]) => { const all = MOVIES.filter(f).filter(m => backOf(m, 'w342')); const m = pickOne(tallFirst(all.sort((a, b) => rt(b) - rt(a))), used); return m && [ru ? r : u, h, m, c]; }).filter(Boolean);
    if (T.length < 8) return '';
    const cols = [0, 1, 2, 3].map(c => T.filter((_, i) => i % 4 === c));
    return `<section class="h5-sec"><div class="h5-aio"><div class="h5-aio-in h5-wrap">
      <div class="h5-aio-copy">
        <div class="h5-aio-logo"><span>Dezo</span><b>Max</b></div>
        <h2>${L('Sizning <em>hammasi bir joyda</em> kinoteatringiz', 'Ваш кинотеатр <em>всё в одном</em>')}</h2>
        <ul><li>${ic('spark')}${L('O‘zbek tilida kinolar, seriallar va multfilmlar', 'Фильмы, сериалы и мультфильмы на узбекском')}</li>
          <li>${ic('inf')}${L('Cheksiz va bepul — rasmiy kanallardan', 'Без ограничений и бесплатно — с официальных каналов')}</li></ul>
        <p>${L('Telekanallar, sport va Shorts ham shu yerda.', 'Телеканалы, спорт и Shorts — тоже здесь.')}</p>
        <a class="h5-sq" href="catalog.html">${L('Boshlash', 'Начать')} ${ic('ext')}</a>
      </div>
      <div class="h5-aio-grid">${cols.map((col, c) => `<div class="h5-aio-col" style="--o:${[0, 18, -12, 10][c]}px">${col.map(([n, h, m, cl]) => { const tall = tallOf(m, 'w342');   // rasm shakliga mos karta: tik poster — tik karta, albom kadr — albom karta (kesilmaydi)
        return `<a class="h5-aio-t ${cl}${tall ? '' : ' is-land'}" href="${h}">
        <span>${esc(n)}</span><img src="${esc(tall || backOf(m, 'w342'))}" alt="" loading="lazy" onerror="this.remove()"></a>`; }).join('')}</div>`).join('')}</div>
    </div></div></section>`;
  }

  /* 3) Pleyerning yangi funksiyalari — mini ko'rsatma (namuna 3): uchta belgi navbat bilan yonadi */
  const TOUR = [
    ['speed', L('Tezlik va sifat', 'Скорость и качество'), L('0.5× dan 2× gacha tezlik, 360p dan 1080p gacha sifat — bitta menyuda.', 'Скорость от 0.5× до 2× и качество от 360p до 1080p — в одном меню.')],
    ['resume', L('To‘xtagan joydan', 'С места остановки'), L('Kinoni yopsangiz ham, keyingi safar aynan o‘sha daqiqadan davom etadi.', 'Закрыли фильм — в следующий раз он продолжится с той же минуты.')],
    ['next', L('Keyingi qism', 'Следующая серия'), L('Serialda keyingi qism bir bosishda, qismlar mavsumlar bo‘yicha pleyer ostida.', 'Следующая серия в одно касание, серии по сезонам — под плеером.')]
  ];
  function tourHTML() {
    const m = pool(m => okBig(m.hposter) || (okBig(m.cover) && /tmdb/.test(m.cover)), 12)[3];
    const img = m && wideOf(m, 'w1280');
    if (!img) return '';
    return `<section class="h5-sec h5-wrap">${headHTML(L('Yangi pleyer', 'Новый плеер'), null, `<span class="h5-tag" style="background:#2FA84A">${L('YANGI', 'НОВОЕ')}</span>`)}
      <div class="h5-tour" id="h5Tour" data-anim>
        <img class="h5-tour-bg" src="${esc(wideOf(m, 'w780'))}" srcset="${esc(wideOf(m, 'w780'))} 780w, ${esc(img)} 1280w" sizes="(max-width: 900px) 100vw, 1100px" alt="" loading="lazy" decoding="async">
        <div class="h5-tour-bar" role="tablist">${TOUR.map(([k, t], i) => `<button type="button" role="tab" data-t="${i}" aria-label="${esc(t)}"${i ? '' : ' class="is-on"'}>${ic(k)}</button>`).join('')}</div>
        <div class="h5-tour-demo" aria-hidden="true">
          <div class="h5-td is-on" data-d="0"><b>${L('Tezlik', 'Скорость')}</b><span>0.5×</span><span>1×</span><span class="is-on">1.5×</span><span>2×</span><b>${L('Sifat', 'Качество')}</b><span>720p</span><span class="is-on">1080p</span></div>
          <div class="h5-td" data-d="1">${ic('resume')}<span>${L('Davom ettirish:', 'Продолжить с')} <b>42:15</b></span><i></i></div>
          <div class="h5-td" data-d="2"><small>${L('Keyingi qism', 'Следующая серия')}</small><b>${esc(title(m))} · 2</b><i></i></div>
        </div>
        <div class="h5-tour-cap">${TOUR.map(([, t, d], i) => `<div class="h5-tc${i ? '' : ' is-on'}" data-c="${i}"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>
      </div></section>`;
  }
  function initTour() {
    const box = $('h5Tour');
    if (!box) return;
    let i = 0, tm = null;
    const set = n => { i = n; box.querySelectorAll('[data-t],[data-d],[data-c]').forEach(el => el.classList.toggle('is-on', +(el.dataset.t ?? el.dataset.d ?? el.dataset.c) === n)); };
    const run = on => { clearInterval(tm); if (on && !matchMedia('(prefers-reduced-motion: reduce)').matches) tm = setInterval(() => set((i + 1) % TOUR.length), 3800); };
    box.addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) { set(+b.dataset.t); run(true); } });
    box._anim = run;
  }

  /* 4) Bento: katta karta + Kinolar / Seriallar / Multfilmlar + O'zbek kinolari (namuna 4) */
  function bentoHTML() {
    const used = new Set();
    // kichik kartalar — matnsiz keng kadr (TMDB backdrop «cover»): «hposter»da kino nomi yozilgan, karta matni bilan ustma-ust tushardi
    const isTm = u => /image\.tmdb\.org/.test(u || '');
    const usedU = new Set(), srcOf = m => (isTm(m.cover) ? m.cover : m.hposter);   // bir xil rasm ikki kartada chiqmasin
    const wideBg = f => { const m = pickOne(MOVIES.filter(m => f(m) && ((isTm(m.cover) && okBig(m.cover)) || (isTm(m.hposter) && okBig(m.hposter))) && !usedU.has(srcOf(m))).sort((a, b) => (isTm(b.cover) - isTm(a.cover)) || rt(b) - rt(a)), used);
      if (m) usedU.add(srcOf(m)); return m ? tmSize(srcOf(m), 'w780') : ''; };
    // katta tik karta — tik poster (kompyuterda); telefonda karta keng bo'ladi — keng kadr
    const tallM = pickOne(MOVIES.filter(m => (m.genres || []).includes('scifi') && isTm(m.vposter || m.poster) && tallOf(m)).sort((a, b) => rt(b) - rt(a)), used);
    const bigT = tallM ? tallOf(tallM, 'w500') : '';
    const bigW = wideBg(m => (m.genres || []).includes('scifi'));
    const nF = nOf('film', () => 0), nS = nOf('serial', () => 0), nU = nOf('uzbek', () => 0);
    const C = [
      [L('Kinolar', 'Фильмы'), withN(nF, 'ta kino: jangari, drama, komediya, fantastika — har kuni yangilari.', 'фильмов: боевики, драмы, комедии, фантастика — новые каждый день.', 'Jangari, drama, komediya, fantastika — har kuni yangilari.', 'Боевики, драмы, комедии, фантастика — новые каждый день.'), L('Kinolarni ko‘rish', 'Смотреть фильмы'), 'catalog.html?type=film', wideBg(m => m.type === 'film')],
      [L('Seriallar', 'Сериалы'), withN(nS, 'ta serial — qism-baqism, to‘xtagan joydan davom eting.', 'сериалов — серия за серией, с места остановки.', 'Qism-baqism, to‘xtagan joydan davom eting.', 'Серия за серией, с места остановки.'), L('Seriallarni ko‘rish', 'Смотреть сериалы'), 'catalog.html?type=serial', wideBg(m => m.type === 'serial')],
      [L('Multfilmlar', 'Мультфильмы'), L('Butun oila uchun: klassik va yangi multfilmlar, bolalar rejimi bilan.', 'Для всей семьи: классика и новинки, с детским режимом.'), L('Multfilmlarni ko‘rish', 'Смотреть мультфильмы'), 'catalog.html?type=multfilm', wideBg(m => m.type === 'multfilm' || (m.genres || []).includes('animation'))]
    ];
    const wide = wideBg(m => (m.genres || []).includes('history') || (m.genres || []).includes('adventure'));
    return `<section class="h5-sec h5-wrap"><div class="h5-bento">
      <a class="h5-bc is-big" href="catalog.html" style="--bg:url('${esc(bigW || bigT)}');--bgt:url('${esc(bigT || bigW)}')"><h3>${L('Har kayfiyatga — kino, serial va multfilm', 'На любое настроение — фильмы, сериалы и мультфильмы')}</h3></a>
      ${C.map(([t, d, b, h, im]) => `<a class="h5-bc" href="${h}" style="--bg:url('${esc(im)}')"><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="h5-pill">${esc(b)}</span></a>`).join('')}
      <a class="h5-bc is-wide" href="catalog.html?watch=uz" style="--bg:url('${esc(wide)}')"><h3>${L('O‘zbek kinolari va seriallari', 'Узбекские фильмы и сериалы')}</h3>
        <p>${withN(nU, 'ta milliy kino va serial — o‘zbek tilida, rasmiy kanallardan.', 'национальных фильмов и сериалов — на узбекском, с официальных каналов.', 'Milliy kino va seriallar — o‘zbek tilida, rasmiy kanallardan.', 'Национальные фильмы и сериалы — на узбекском, с официальных каналов.')}</p><span class="h5-pill">${L('O‘zbek kinolari', 'Узбекское кино')}</span></a>
    </div></section>`;
  }

  /* 5) Aylanib turadigan kadrlar mozaikasi (namuna 5): ustunlar — bitta baland yoki ikkita ustma-ust */
  function marqueeHTML() {
    const list = uniq(MOVIES.filter(m => rt(m) >= 6.8 && /tmdb/.test(m.hposter || m.cover || '') && okBig(m.hposter || m.cover)).sort((a, b) => rt(b) - rt(a))).slice(0, 22);
    if (list.length < 10) return '';
    const im = m => `<a href="${movieHref(m)}" tabindex="-1" aria-label="${esc(title(m))}"><img src="${esc(wideOf(m, 'w500'))}" alt="" loading="lazy" onerror="this.remove()"><span>${esc(title(m))}</span></a>`;
    const cols = [];
    for (let i = 0, k = 0; i < list.length; k++) {
      if (k % 3 === 1) cols.push(`<div class="h5-mq-c is-tall">${im(list[i++])}</div>`);
      else if (list[i + 1]) { cols.push(`<div class="h5-mq-c${k % 3 === 2 ? ' is-w' : ''}">${im(list[i])}${im(list[i + 1])}</div>`); i += 2; } else break;
    }
    return `<section class="h5-sec"><div class="h5-wrap">${headHTML(L('Eng yaxshi kadrlar', 'Лучшие кадры'), 'catalog.html')}</div>
      <div class="h5-mq" data-anim><div class="h5-mq-t">${cols.join('')}${cols.join('')}</div></div></section>`;
  }

  /* 6) Oq kartalar: ustida nomi; sichqoncha borsa — treyler yoki kinodan sahna (ovozsiz, boshqaruvlarsiz) (namuna 6–7) */
  const ytId = u => (String(u || '').match(/(?:[?&]v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  function hoverHTML() {
    const list = uniq(MOVIES.filter(m => (ytId(m.trailer) || ytId(m.video)) && rt(m) >= 6.5 && !isExtraVideo(m)).sort((a, b) => rt(b) - rt(a))).slice(0, 14);
    if (list.length < 6) return '';
    return `<section class="h5-sec h5-wrap">${headHTML(L('Treylerlar', 'Трейлеры'), 'catalog.html?watch=trailer')}
      <div class="h5-row h5-hv-row">${list.map(m => { const tr = ytId(m.trailer), id = tr || ytId(m.video);
        return `<a class="h5-hv" href="${movieHref(m)}" data-yt="${id}" data-st="${tr ? 0 : 300}" style="--thumb:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"><span class="h5-hv-t">${ic(m.type === 'serial' ? 'tv' : m.type === 'multfilm' ? 'toon' : 'film')}${esc(title(m))}</span><small>${esc(subOf(m))}</small></a>`; }).join('')}</div></section>`;
  }
  function initHover() {
    /* Yengil (foydalanuvchi: «qotib ochilyapti», 2026-11-18): YouTube pleyeri og'ir — telefonda sahifa bilan bir oqimda
       ishlab qotiradi. Shuning uchun avval faqat treylerning 3 ta tayyor kadri (i.ytimg.com hq1–3) almashinib turadi
       (CSS opacity/transform). Haqiqiy video — faqat kompyuterda, sichqoncha 1 soniyadan ko'p tursa. */
    const desk = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const stop = c => { clearTimeout(c._vt); c.classList.remove('is-play', 'is-hov'); c.querySelector('iframe')?.remove(); c.querySelector('.h5-hv-sl')?.remove(); };
    const video = c => {
      if (c.querySelector('iframe') || !c.classList.contains('is-hov')) return;
      const id = c.dataset.yt, st = +c.dataset.st || 0;
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${id}&start=${st}`;
      f.allow = 'autoplay; encrypted-media'; f.tabIndex = -1; f.setAttribute('aria-hidden', 'true');
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.onload = () => setTimeout(() => c.classList.contains('is-hov') && c.classList.add('is-play'), 700);   // YouTube sarlavhasi yo'qolguncha
      c.appendChild(f);
    };
    const play = c => {
      document.querySelectorAll('.h5-hv.is-hov').forEach(x => { if (x !== c) stop(x); });
      if (c.classList.contains('is-hov')) return;
      const id = c.dataset.yt;
      c.style.setProperty('--thumb', `url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')`);
      c.classList.add('is-hov');
      c.insertAdjacentHTML('afterbegin', `<span class="h5-hv-sl" aria-hidden="true">${[1, 2, 3].map(n => `<img src="https://i.ytimg.com/vi/${id}/hq${n}.jpg" alt="" decoding="async" onerror="this.remove()">`).join('')}</span>`);
      if (desk) c._vt = setTimeout(() => video(c), 1000);
    };
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let tm = null;
      document.addEventListener('mouseover', e => {
        const c = e.target.closest('.h5-hv');
        if (!c || c.classList.contains('is-hov')) return;
        clearTimeout(tm);
        tm = setTimeout(() => { if (c.matches(':hover')) play(c); }, 180);
      });
      document.addEventListener('mouseout', e => {
        const c = e.target.closest('.h5-hv');
        if (!c || c.contains(e.relatedTarget)) return;
        clearTimeout(tm);
        stop(c);
      });
      return;
    }
    /* Telefon/planshet (sichqoncha yo'q): qator ekranda bo'lsa — o'rtadagi karta o'zi ovozsiz o'ynaydi; suring — keyingisi.
       Bir vaqtda faqat bitta pleyer; qator ekrandan chiqsa yoki trafik tejash yoqilgan bo'lsa — o'ynamaydi. */
    if (navigator.connection && navigator.connection.saveData) return;
    const bind = () => document.querySelectorAll('.h5-hv-row:not([data-hvb])').forEach(row => {
      row.dataset.hvb = 1;
      let on = false, tm = null;
      const pick = () => {
        if (!on) return;
        const mid = row.getBoundingClientRect().left + row.clientWidth / 2;
        let best = null, bd = 1e9;
        row.querySelectorAll('.h5-hv').forEach(c => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
        if (best) play(best);
      };
      new IntersectionObserver(([en]) => {
        on = en.isIntersecting && en.intersectionRatio >= 0.6;
        clearTimeout(tm);
        if (on) tm = setTimeout(pick, 500); else row.querySelectorAll('.h5-hv.is-hov').forEach(stop);
      }, { threshold: [0, 0.6] }).observe(row);
      row.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(pick, 250); }, { passive: true });
    });
    bind();
    // qatorlar qayta chizilsa (to'liq ro'yxat yuklangach) — yangi qator ham kuzatiladi
    const rows = $('h5Rows');
    rows && new MutationObserver(bind).observe(rows, { childList: true });
  }

  /* 7) Posterlar ustunlari yuqoriga-pastga aylanadi + yozuv (namuna 8) */
  function mosaicHTML() {
    const list = tallFirst(ROW_SOURCES.popular.list()).filter(hasTall).slice(40, 80);
    if (list.length < 16) return '';
    const cols = [0, 1, 2, 3, 4].map(c => list.filter((_, i) => i % 5 === c));
    const col = (c, k) => `<div class="h5-mos-c${k % 2 ? ' is-down' : ''}" style="--d:${48 + k * 7}s"><div>${[...c, ...c].map(m => `<img src="${esc(tallOf(m, 'w185'))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`).join('')}</div></div>`;
    return `<section class="h5-sec h5-wrap"><div class="h5-mos" data-anim>
      <div class="h5-mos-in" aria-hidden="true">${cols.map(col).join('')}</div>
      <div class="h5-mos-cap"><b>${L(`${nOf('all', () => MOVIES.length)} ta kino — yoki faqat sevganlaringiz.`, `${nOf('all', () => MOVIES.length)} фильмов — или только любимые.`)}</b>
        <p>${L('Sevimlilarga qo‘shing va istalgan ekranda davom ettiring.', 'Добавляйте в избранное и продолжайте на любом экране.')}</p><a class="h5-pill is-dark" href="favorites.html">${L('Kutubxonam', 'Моя библиотека')}</a></div>
    </div></section>`;
  }

  /* animatsiyalar faqat ekranda ko'ringanda (CPU tejaladi) */
  function initAnims() {
    const els = document.querySelectorAll('[data-anim]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(el => { el.classList.add('is-run'); el._anim && el._anim(true); }); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { e.target.classList.toggle('is-run', e.isIntersecting); e.target._anim && e.target._anim(e.isIntersecting); }), { rootMargin: '100px' });
    els.forEach(el => io.observe(el));
  }

  /* ---------- barcha bloklar ---------- */
  function renderRows() {
    const rows = ((CFG.rows && CFG.rows.length) ? CFG.rows : DEFAULT_ROWS).filter(r => r.visible !== false);
    const titleOf = row => (row.title && (row.title[LANG] || row.title.uz)) || (row.source !== 'custom' ? t('row.' + row.source) : '');
    const take = src => { const i = rows.findIndex(r => r.source === src); return i < 0 ? null : rows.splice(i, 1)[0]; };
    const listOf = (row, n = 18) => uniq((ROW_SOURCES[row.source] || ROW_SOURCES.custom).list(row).filter(cardImg)).slice(0, n);
    const out = [];
    let shown = 0;
    const push = html => { if (!html) return; out.push(html); if (++shown % 3 === 0) out.push('<div class="ad-slot h5-wrap" data-ad-slot="home"></div>'); };

    out.push(continueHTML());
    const trending = take('trending'), uzbek = take('uzbek'), popular = take('popular') || take('top'), fresh = take('new');
    const series = take('series'), cartoons = take('cartoons'), tahlil = take('tahlil'), studios = take('studios');
    take('top');
    if (trending) { const l = listOf(trending); if (l.length >= 4) push(rowSec(L('Hozir trendda', 'Сейчас в тренде'), ROW_SOURCES.trending.all, l)); }
    if (uzbek) { const l = listOf(uzbek); if (l.length >= 4) push(rowSec(titleOf(uzbek), ROW_SOURCES.uzbek.all, l)); }
    push(genresHTML());
    push(bentoHTML());
    if (popular) push(top10HTML(L('Bugungi TOP 10', 'ТОП-10 сегодня')));
    push(hoverHTML());
    push(shortsHTML());
    push(fanHTML());
    const marvelRow = take('marvel'), dcRow = take('dc');   // Marvel va DC qatorlari endi «Kino studiyalar» panelida
    if (marvelRow || dcRow || window.DZX_STUDIOS) push(kinoStudioHTML());
    if (fresh) { const l = uniq(tallFirst(ROW_SOURCES.new.list().filter(cardImg)).slice(0, 40)).slice(0, 14); if (l.length >= 4) push(gridSec(L('Yangi kinolar', 'Новые фильмы'), ROW_SOURCES.new.all, l)); }
    push(marqueeHTML());
    push(liveHTML());
    push(tourHTML());
    // qolgan admin qatorlari (o'zbek klassikasi, konsertlar, dorama, anime, hind, Marvel, DC, tanlanganlar…) — admin tartibida
    let extra = 0, appDone = false;
    rows.forEach(row => {
      if (row.source === 'studios') return;
      const l = listOf(row);
      if (l.length < (row.source === 'custom' ? 1 : 4)) return;
      push(rowSec(titleOf(row), (ROW_SOURCES[row.source] || {}).all, l));
      if (++extra === 2) { push(appHTML()); appDone = true; }
    });
    if (!appDone) push(appHTML());
    push(aioHTML());
    if (series) { const l = listOf(series); if (l.length >= 4) push(rowSec(titleOf(series), ROW_SOURCES.series.all, l, ' is-sm')); }
    // YouTube'dagi multfilmlar (Pomidor Do'ppi, Bek va Lola…) — alohida albom karusel, rasmi kesilmaydi
    const ytToons = MOVIES.filter(m => (m.type === 'multfilm' || (m.genres || []).includes('animation')) && /youtube\.com|youtu\.be/.test(m.video || '') && cardImg(m));
    if (ytToons.length >= 3) push(`<section class="h5-sec h5-wrap">${headHTML(L('Bolalar uchun', 'Детям'), 'catalog.html?type=multfilm')}<div class="h5-row is-land h5-toons">${uniq(ytToons).slice(0, 14).map(m => posterHTML(m, '', true)).join('')}</div></section>`);
    if (cartoons) { const l = uniq(tallFirst(ROW_SOURCES.cartoons.list().filter(cardImg)).filter(m => hasTall(m) || !ytToons.includes(m))).slice(0, 12); if (l.length >= 4) push(gridSec(titleOf(cartoons), ROW_SOURCES.cartoons.all, l)); }
    push(mosaicHTML());
    push(studiosHTML(studios ? titleOf(studios) : t('row.studios')));
    if (tahlil) { const l = listOf(tahlil); if (l.length >= 4) push(rowSec(titleOf(tahlil), ROW_SOURCES.tahlil.all, l, ' is-sm')); }
    out.push(ctaHTML());

    const box = $('h5Rows');
    box.innerHTML = out.join('');
    if (typeof Ads !== 'undefined') Ads.fill(box);
    box.querySelectorAll('[data-days]').forEach(b => b.addEventListener('click', () => {
      topDays = +b.dataset.days;
      box.querySelectorAll('[data-days]').forEach(x => x.classList.toggle('is-on', x === b));
      loadTop10();
    }));
    if (popular) loadTop10();
    initTour();
    initAnims();
  }

  /* ---------- janr chiplari ---------- */
  function initChips() {
    const chips = [['', L('Hammasi', 'Все')], ['catalog.html?watch=uz', L('O‘zbekcha', 'На узбекском')], ...['comedy', 'drama', 'thriller', 'action', 'history', 'scifi'].map(g => [`catalog.html?genre=${g}`, genreName(g)]),
      ['catalog.html?type=serial', L('Seriallar', 'Сериалы')], ['catalog.html?type=multfilm', L('Multfilmlar', 'Мультфильмы')], ['catalog.html?franchise=anime', 'Anime'], ['marvel.html', 'Marvel']];
    $('h5Chips').innerHTML = chips.map(([h, n], i) => i ? `<a class="h5-chip" href="${h}">${esc(n)}</a>` : `<span class="h5-chip is-on">${esc(n)}</span>`).join('');
  }

  /* ---------- navbar: qidiruv palitrasi, qo'ng'iroq, profil ---------- */
  function initNav() {
    // telefonda: aylantirganda panel to'q fonga o'tadi, pastga — bo'limlar yashirinadi, tepaga — qaytadi
    const nav = document.querySelector('.h5-nav');
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle('is-solid', y > 40);
      if (Math.abs(y - lastY) > 6) { nav.classList.toggle('is-up', y < lastY); lastY = y; }
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    // menyu balandligi (bo'limlar qatori ochiq holatda) — telefonda katta rasm shundan pastda boshlanadi
    const navH = () => { if (scrollY < 40) document.documentElement.style.setProperty('--h5nav', nav.offsetHeight + 'px'); };
    navH(); addEventListener('resize', navH); document.fonts && document.fonts.ready.then(navH);
    const pal = $('h5Pal'), inp = $('h5PalQ'), res = $('h5PalRes');
    let items = [], sel = 0;
    const hay = m => norm([m.title.uz, m.title.ru, m.title.en, m.year, m.director, ...(m.cast || [])].filter(Boolean).join(' '));
    const pool = () => MOVIES.filter(m => watchStatus(m) !== 'none' || m.franchise === 'tahlil');
    const render = () => {
      const q = norm(inp.value.trim());
      items = q ? pool().filter(m => hay(m).includes(q)).sort((a, b) => (norm(title(b)).startsWith(q) - norm(title(a)).startsWith(q)) || rt(b) - rt(a)).slice(0, 8)
        : tallFirst(ROW_SOURCES.popular.list()).slice(0, 6);
      sel = 0;
      res.innerHTML = items.length ? `<div class="h5-pal-h">${q ? L('NATIJALAR', 'РЕЗУЛЬТАТЫ') : L('MASHHUR', 'ПОПУЛЯРНОЕ')}</div>` + items.map((m, k) => {
        const img = wideOf(m, 'w300') || cardImg(m);
        return `<a class="h5-pal-it${k ? '' : ' is-on'}" role="option" href="${movieHref(m)}" data-k="${k}">${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : '<span class="h5-pal-ph"></span>'}
          <span><b>${esc(title(m))}</b><small>${esc(subOf(m))}</small>${m.cast && m.cast.length ? `<small>${esc(m.cast.slice(0, 3).join(', '))}</small>` : ''}</span><span class="h5-go">${L('Ochish', 'Открыть')} ↵</span></a>`;
      }).join('') : `<div class="h5-pal-empty">«${esc(inp.value)}» ${L('bo‘yicha hech narsa topilmadi.', '— ничего не найдено.')}</div>`;
      $('h5PalAll').href = 'search.html' + (inp.value.trim() ? '?q=' + encodeURIComponent(inp.value.trim()) : '');
    };
    const mark = () => res.querySelectorAll('.h5-pal-it').forEach((e, k) => { e.classList.toggle('is-on', k === sel); if (k === sel) e.scrollIntoView({ block: 'nearest' }); });
    const open = () => { pal.hidden = false; inp.value = ''; render(); setTimeout(() => inp.focus(), 10); document.documentElement.style.overflow = 'hidden'; };
    const close = () => { pal.hidden = true; document.documentElement.style.overflow = ''; };
    $('h5Search').addEventListener('click', open);
    pal.addEventListener('click', e => { if (e.target === pal) close(); });
    res.addEventListener('mousemove', e => { const it = e.target.closest('.h5-pal-it'); if (it && +it.dataset.k !== sel) { sel = +it.dataset.k; mark(); } });
    let tmr = null;
    inp.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(render, 120); });
    inp.addEventListener('keydown', e => {
      const n = res.querySelectorAll('.h5-pal-it').length;
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(n, 1); mark(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + Math.max(n, 1)) % Math.max(n, 1); mark(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const it = res.querySelectorAll('.h5-pal-it')[sel];
        location.href = it && inp.value.trim() ? it.href : $('h5PalAll').href;
      }
    });
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && !pal.hidden) close();
      if (e.key === '/' && pal.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });

    // qo'ng'iroq: oxirgi kirishdan keyin yangi kino qo'shilgan bo'lsa — qizil nuqta
    const SEEN = 'dzxBellSeen';
    const newest = Math.max(0, ...MOVIES.filter(m => m.addedAt && hasFilm(m)).map(m => m.addedAt));
    const seen = +localStorage.getItem(SEEN) || 0;
    const bell = $('h5Bell');
    bell.querySelector('i').hidden = !(newest > seen);
    // bosilganda — bildirishnomalar oynasi: oxirgi qo'shilgan kinolar (yangilari belgili), katalogga o'tib ketmaydi
    const box = document.createElement('div');
    box.className = 'h5-notif';
    box.hidden = true;
    bell.after(box);
    const ago = t => { const d = Math.floor((Date.now() - t) / DAY); return d < 1 ? L('bugun', 'сегодня') : d === 1 ? L('kecha', 'вчера') : d < 30 ? L(`${d} kun oldin`, `${d} дн. назад`) : L(`${Math.floor(d / 30)} oy oldin`, `${Math.floor(d / 30)} мес. назад`); };
    const fill = () => {
      const list = uniq(MOVIES.filter(m => m.addedAt && hasFilm(m) && !isExtraVideo(m)).sort((a, b) => b.addedAt - a.addedAt)).slice(0, 8);
      box.innerHTML = `<div class="h5-notif-h"><b>${L('Bildirishnomalar', 'Уведомления')}</b><small>${L('Yangi qo‘shilgan kinolar', 'Новые фильмы')}</small></div>
        ${list.length ? list.map(m => { const img = wideOf(m, 'w300') || cardImg(m);
          return `<a class="h5-notif-it${m.addedAt > seen ? ' is-new' : ''}" href="${movieHref(m)}">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : '<span></span>'}
          <span><b>${esc(title(m))}</b><small>${esc(subOf(m))} · ${ago(m.addedAt)}</small></span></a>`; }).join('') : `<p>${L('Hozircha yangilik yo‘q', 'Пока ничего нового')}</p>`}
        <a class="h5-notif-all" href="catalog.html?sort=new">${L('Barcha yangi kinolar', 'Все новинки')} ›</a>`;
    };
    bell.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      if (box.hidden) { fill(); box.hidden = false; $('h5Menu').classList.remove('is-open'); } else box.hidden = true;
      bell.querySelector('i').hidden = true;
      try { localStorage.setItem(SEEN, String(newest || Date.now())); } catch {}
    });
    document.addEventListener('click', e => { if (!box.hidden && !e.target.closest('.h5-notif')) box.hidden = true; });
    addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });

    // profil menyusi
    const user = typeof Auth !== 'undefined' && Auth.user ? Auth.user() : null;
    const ava = $('h5Ava'), menu = $('h5Menu');
    if (user) {
      const nm = user.name || user.email || '';
      ava.innerHTML = user.photo ? `<img src="${esc(user.photo)}" alt="" referrerpolicy="no-referrer">` : esc((nm[0] || 'D').toUpperCase());
    }
    if (typeof dzxAcctMenu === 'function') dzxAcctMenu(menu);   // YouTube uslubidagi profil menyusi (common.js)
    ava.addEventListener('click', e => { e.stopPropagation(); const o = menu.classList.toggle('is-open'); ava.setAttribute('aria-expanded', o); });
    document.addEventListener('click', e => { if (!e.target.closest('.h5-me')) { menu.classList.remove('is-open'); ava.setAttribute('aria-expanded', 'false'); } });
    addEventListener('keydown', e => { if (e.key === 'Escape') menu.classList.remove('is-open'); });
    // til: dezomax.uz da /ru/ manzil (setLang), boshqa joyda — sahifa qayta chiziladi
    document.querySelectorAll('[data-setlang]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      if (a.dataset.setlang === LANG) return;
      setLang(a.dataset.setlang);
      if (location.hostname !== 'dezomax.uz') location.reload();
    }));
  }

  /* ---------- hodisalar ---------- */
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fav]');
    if (f) { f.classList.toggle('is-on', toggleFav(f.dataset.fav)); return; }
    const b = e.target.closest('[data-cw-del]');
    if (!b) return;
    e.preventDefault();
    const id = +b.dataset.cwDel;
    try { localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]').filter(x => x && x.id !== id))); } catch {}
    b.closest('.h5-cw').remove();
    if (!document.querySelector('#h5Cw .h5-cw')) $('h5Cw')?.remove();
  });
  addEventListener('pageshow', e => { if (e.persisted) renderRows(); });
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName) || window.scrollY > 300) return;
    if (e.key === 'ArrowRight') { show(cur + 1); restart(); }
    if (e.key === 'ArrowLeft') { show(cur - 1); restart(); }
  });

  /* ---------- ishga tushirish ---------- */
  // ruscha: /ru/ sahifa tools/gen-ru.js da tarjima qilinadi; boshqa joyda (test, til tugmasi) — shu yerda data-ru bo'yicha
  if (ru) {
    document.querySelectorAll('.h5 [data-ru], .h5[data-ru]').forEach(el => { if (!el.children.length || el.matches('span')) el.lastChild.textContent = el.dataset.ru; });
    document.querySelectorAll('.h5 [data-ru-ph]').forEach(el => { el.placeholder = el.dataset.ruPh; });
  }
  document.querySelectorAll('[data-setlang]').forEach(a => a.toggleAttribute('aria-current', a.dataset.setlang === LANG));
  initNav();
  initChips();
  initHero();
  renderRows();
  initHover();   // qatorlar chizilgandan keyin (telefonda treyler qatori kuzatiladi)
  // yengil ro'yxatda yo'q kino kerak bo'lsa — to'liq ro'yxat
  (() => {
    if (!window.DZX_HOME_PART) return;
    let cw = [];
    try { cw = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]').filter(x => x && !x.done).map(x => x.id); } catch {}
    // eng ko'p ko'rilganlar (popCached) bu yerda yo'q — ular uchun to'liq ro'yxat yuklanmaydi, slayder borlaridan tuziladi
    const want = [...((CFG.hero && CFG.hero.ids) || []), ...cw.slice(0, 12), ...(CFG.rows || []).flatMap(r => r.visible === false ? [] : r.ids || [])];
    if (!kidsMode() && !needFull(want)) return;
    window.dzxLoadFull().then(ok => {
      if (!ok) return;
      const next = heroList(popCached);
      if (next.length && next.map(m => m.id).join() !== picks.map(m => m.id).join()) {
        picks.splice(0, picks.length, ...next);
        $('h5Slider').innerHTML = sliderHTML();
        show(0); restart();
      }
      renderRows();
    });
  })();
  const yEl = $('v4Year'); if (yEl) yEl.textContent = new Date().getFullYear();
  if (typeof renderTabbar === 'function') renderTabbar();
  if (typeof applyI18n === 'function') applyI18n();
  // eng ko'p ko'rilganlar keyingi ochilish uchun saqlanadi
  if (!kidsMode()) (async () => {
    const t0 = Date.now();
    const week = await topIds(7);
    const ids = week.length >= 5 ? week : [...week, ...await topIds('all')];
    if (!ids.length) return;
    try { localStorage.setItem(HERO_POP_KEY, JSON.stringify(ids.slice(0, 30))); } catch {}
    if (!popCached.length && Date.now() - t0 < 4000 && cur === 0) {
      const next = heroList(ids);
      if (next.map(m => m.id).join() !== picks.map(m => m.id).join()) {
        picks.splice(0, picks.length, ...next);
        $('h5Slider').innerHTML = sliderHTML();
        show(0); restart();
      }
    }
  })();
})();
