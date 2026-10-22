/* ============================================================
   DezoMax 4.0 — bosh sahifa (index.html)
   ------------------------------------------------------------
   - Tepada: «Dezo» qatori (yozing yoki ayting → qidiruv sahifasi)
   - Katta kino: admin → «Sayt» → slayder kinolari (SITE_CONFIG.hero.ids), har N soniyada keyingisi
   - «Yoki shulardan biri»: slayderdagi boshqa kinolar — bosilsa katta kino almashadi
   - Pastda qatorlar: yangi, o'zbek kinolari, seriallar, multfilmlar, konsertlar, klassika, Marvel, reyting
   Ma'lumot va yordamchilar — js/common.js (MOVIES, heroMovie, heroCompose, partsOf, watchStatus, movieHref ...)
   ============================================================ */
(function () {
  // Admin → «Bosh sahifa va sayt» jonli ko'rinishi (index.html?preview=1 iframe'da): saqlanmagan qoralama localStorage'dan olinadi,
  // admin o'zgartirganda ramkani o'zi qayta ochadi. Oddiy ochilishda — saytdagi SITE_CONFIG.
  const PREVIEW = /[?&]preview=1(?:&|$)/.test(location.search);
  let previewCfg = null;
  if (PREVIEW) {
    try { previewCfg = JSON.parse(localStorage.getItem('dzx_preview_cfg') || 'null'); } catch {}
    document.documentElement.classList.add('dzx-preview');
  }
  const CFG = previewCfg || (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG) || {};
  const $ = id => document.getElementById(id);
  const ru = LANG === 'ru';

  /* ---------- rasmlar ---------- */
  // Telegram/DezoCloud va images/custom rasmlari kichik — katta joyda cho'zilib xira bo'ladi
  const okBig = u => !!u && !/dezocloud\.uz|images\/custom\//.test(String(u));
  const tmSize = (u, size) => String(u).replace(/(image\.tmdb\.org\/t\/p\/)(w\d+|original)\//, `$1${size}/`);
  const ytOf = m => (String(m.video || m.trailer || '').match(/(?:[?&]v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  function wideOf(m, size) {
    if (okBig(m.hposter)) return tmSize(m.hposter, size);
    if (okBig(m.cover)) return /image\.tmdb\.org/.test(m.cover) ? tmSize(m.cover, size) : imgBig(m.cover);
    const yt = ytOf(m);
    return yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null;
  }
  function tallOf(m) {
    if (okBig(m.vposter)) return tmSize(m.vposter, 'w780');
    if (m.poster && /image\.tmdb\.org/.test(m.poster)) return tmSize(m.poster, 'w780');
    return m.poster ? imgBig(m.poster) || m.poster : null;
  }
  // kartadagi rasm: keng bo'lsa keng, bo'lmasa tik poster (kartada o'rtasidan kesiladi)
  const cardImg = m => wideOf(m, 'w780') || (m.poster ? imgSmall(m.poster) : null);

  /* ---------- matnlar ---------- */
  const DAY = 86400000;
  const ageOf = m => m.age ? `${m.age}+` : '';
  function lenText(m, parts) {
    if (parts > 1) return `${parts} ${ru ? 'серий' : 'qism'}`;
    const d = Math.round(+m.duration || 0);
    if (!d) return '';
    return d >= 60 ? `${Math.floor(d / 60)} ${ru ? 'ч' : 'soat'} ${d % 60 ? (d % 60) + (ru ? ' мин' : ' daq') : ''}`.trim() : `${d} ${ru ? 'мин' : 'daq'}`;
  }
  function descOk(m) {
    const d = String((m.desc && (m.desc[LANG] || m.desc.uz)) || '').replace(/\s+/g, ' ').trim();
    return d.length > 50 && !/obuna|kanal|t\.me|@\w|http|720p|1080p|tilida\s*$|🎬|📀/i.test(d) ? d : '';
  }
  function langsOf(m) {
    const out = [];
    if (m.audio === 'uz' || m.franchise === 'uzbek') out.push(['uz', ru ? 'Узбекский' : 'O‘zbekcha']);
    if (m.langs) Object.keys(m.langs).forEach(k => { if (!out.some(x => x[0] === k) && LANG_NAMES[k]) out.push([k, LANG_NAMES[k][LANG].replace(/ tilida.*| \(.*/, '')]); });
    if (m.lang && !out.some(x => x[0] === m.lang) && LANG_NAMES[m.lang]) out.push([m.lang, LANG_NAMES[m.lang][LANG].replace(/ tilida.*| \(.*/, '')]);
    return out;
  }

  /* ---------- katta kino ---------- */
  // O'zbek filmlari slayderga chiqmaydi (foydalanuvchi so'rovi, 2026-10-13) — hozirgi bosh sahifa bilan bir xil
  const heroIsUzbek = m => m.franchise === 'uzbek' || m.ch === 'rizanova' || m.ch === 'uzbekkinoofficial' || /^(rn|uzbekk)-/.test(m.slug || '')
    || /o.?zbekiston|узбекистан/i.test(`${m.country?.uz || ''} ${m.country?.ru || ''}`) || String(m.poster || '').startsWith('images/uz/');
  // katta rasmi sifatli bo'lsin (Telegram/DezoCloud kichik muqovalari cho'zilib xira bo'lardi)
  const heroArtOk = m => !!m && !heroIsUzbek(m) && !isExtraVideo(m) && watchStatus(m) !== 'trailer'
    && (okBig(m.vposter) || /image\.tmdb\.org/.test(m.poster || '') || okBig(m.hposter) || (okBig(m.cover) && /^images\//.test(m.cover)));
  const HERO_POP_KEY = 'dzxHeroPop';   // eng ko'p ko'rilganlar (hozirgi bosh sahifa ham shu kalitga yozadi)
  const HERO_HIDE_KEY = 'dzxHeroHidden';   // «Qiziq emas» bosilgan kinolar — karuselda chiqmaydi
  const heroHidden = () => { try { return JSON.parse(localStorage.getItem(HERO_HIDE_KEY) || '[]'); } catch { return []; } };
  function heroList(popIds) {
    if (kidsMode()) return kidsHero(CFG.hero && CFG.hero.kidsIds).slice(0, 12);
    const admin = ((CFG.hero && CFG.hero.ids) || []).map(heroMovie).filter(heroArtOk);
    const byId = new Map(MOVIES.map(m => [m.id, m]));
    const pop = (popIds || []).map(id => byId.get(id)).filter(heroArtOk);
    const hid = new Set(heroHidden());
    const list = [...new Set([...admin, ...pop])].filter(m => !hid.has(m.id)).slice(0, 12);
    return list.length ? list : heroCompose([]).slice(0, 12);
  }
  /* Sekin internet: index.html faqat js/data-home.js ni (bosh sahifa kinolari) yuklaydi. Kerakli kino unda
     bo'lmasa — to'liq ro'yxat (data-channels, data-rutube, data-site) shu yerda bir marta yuklanadi */
  let fullP = null;
  window.dzxLoadFull = () => {
    if (!window.DZX_HOME_PART || !window.DZX_BASE) return Promise.resolve(false);
    return fullP || (fullP = (async () => {
      const v = (document.querySelector('script[src*="data-home.js"]')?.src.split('?')[1]) || '';
      const urls = ['data-channels', 'data-rutube', 'data-site'].map(n => `js/${n}.js${v ? '?' + v : ''}`);
      // avval hammasi yuklanadi (MOVIES yarim holatda qolmasin), keyin ketma-ket ishga tushadi
      if (!(await Promise.all(urls.map(u => fetch(u).then(r => r.ok, () => false)))).every(Boolean)) { fullP = null; return false; }
      const keep = MOVIES.slice();
      MOVIES.splice(0, MOVIES.length, ...window.DZX_BASE);
      try {
        for (const u of urls) await new Promise((ok, no) => { const s = document.createElement('script'); s.src = u; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
      } catch { MOVIES.splice(0, MOVIES.length, ...keep); fullP = null; return false; }
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
  const DELAY = Math.min(60, Math.max(8, Number(CFG.hero && CFG.hero.delay) || 12)) * 1000;
  let cur = 0, timer = null;

  const BOOKMARK = '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>';
  const EYE_OFF = '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c5 0 9 4.5 10 7a14 14 0 0 1-3 4.1M6.6 6.6C4.4 8 2.8 10 2 12c1 2.5 5 7 10 7a9.7 9.7 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
  function infoHTML(m) {
    const parts = partsOf(m).length;
    const st = watchStatus(m);
    const last = parts > 1 ? partsOf(m)[parts - 1] : null;
    const fresh = last && last.addedAt && Date.now() - last.addedAt < 21 * DAY;
    const kicker = fresh ? `${ru ? 'Новая серия' : 'Yangi qism chiqdi'} · ${parts}-${ru ? 'я' : 'qism'}`
      : st === 'uz' ? (ru ? 'Dezo выбирает · на узбекском' : 'Dezo tanlovi · o‘zbek tilida')
      : (ru ? 'Dezo выбирает' : 'Dezo tanlovi');
    const meta = [
      m.rating ? `<b>★ ${(+m.rating).toFixed(1)}</b>` : '',
      m.year, genreName((m.genres || [])[0]), lenText(m, parts), ageOf(m)
    ].filter(Boolean).map(x => `<span>${typeof x === 'string' && x.startsWith('<b>') ? x : esc(String(x))}</span>`).join('');
    const d = descOk(m);
    const play = st === 'none' ? null
      : st === 'trailer' ? { href: `movie.html?id=${m.id}&play=1`, text: ru ? 'Трейлер' : 'Treylerni ko‘rish' }
      : parts > 1 ? { href: `movie.html?id=${m.id}&part=${parts}&play=1`, text: `${parts}-${ru ? 'ю серию' : 'qismni ko‘rish'}` }
      : { href: `movie.html?id=${m.id}&play=1`, text: ru ? 'Смотреть' : 'Ko‘rish' };
    const fav = isFav(m.id);
    return `
      <p class="v4-kick">${esc(kicker)}</p>
      <h1 class="v4-title">${esc(title(m))}</h1>
      <div class="v4-meta">${meta}</div>
      ${d ? `<p class="v4-desc">${esc(d)}</p>` : ''}
      <div class="v4-acts">
        ${play ? `<a class="v4-btn is-main" href="${play.href}"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>${esc(play.text)}</a>` : ''}
        ${parts > 1 ? `<a class="v4-btn is-alt" href="movie.html?id=${m.id}&part=1&play=1">${ru ? 'С 1-й серии' : '1-qismdan'}</a>` : ''}
        <a class="v4-btn is-more${parts > 1 ? '' : ' is-alt'}" href="${movieHref(m)}">${ru ? 'Подробнее' : 'Batafsil'}</a>
        <button class="v4-btn is-ic${fav ? ' is-on' : ''}" type="button" data-fav="${m.id}" aria-label="${ru ? 'В список' : 'Ro‘yxatga'}">${BOOKMARK}</button>
        <button class="v4-btn is-ic is-hide" type="button" data-hide="${m.id}" aria-label="${ru ? 'Не интересно' : 'Qiziq emas'}" title="${ru ? 'Не интересно' : 'Qiziq emas'}">${EYE_OFF}</button>
      </div>`;
  }

  function setArt(m) {
    const art = $('v4Art');
    // kompyuterda — gorizontal (16:9) poster (foydalanuvchi so'rovi, 2026-10-20); bo'lmasa tik poster.
    // Chap cheti qora soyaga silliq o'tadi (css: mask-image) — keskin chegara ko'rinmaydi
    const wide = wideOf(m, 'w1280'), src = wide || tallOf(m);
    art.classList.remove('is-in');
    art.classList.toggle('is-wide', !!wide);
    if (!src) { art.style.backgroundImage = backdropCSS(m); art.classList.add('is-in'); return; }
    const im = new Image();
    im.onload = () => { if (picks[cur] !== m) return; art.style.backgroundImage = `url('${src}')`; requestAnimationFrame(() => art.classList.add('is-in')); };
    im.onerror = () => { art.style.backgroundImage = backdropCSS(m); art.classList.add('is-in'); };
    im.src = src;
  }

  /* Telefonda karusel (foydalanuvchi maketi): o'rtada katta poster, yonlarida qo'shnilari; surib almashtiriladi.
     Yengil: faqat transform/opacity, xiralashtirish yo'q, rasm faqat yaqin kartalarga yuklanadi (w500). */
  const PHONE = matchMedia('(max-width: 900px)');
  const flowImg = m => { const v = tallOf(m); return v ? v.replace('/t/p/w780/', '/t/p/w500/') : cardImg(m); };
  function flowHTML() {
    return picks.map((m, i) => `<button class="v4-fc" type="button" data-i="${i}" aria-label="${esc(title(m))}">
      <img data-src="${esc(flowImg(m) || '')}" alt="" decoding="async" onerror="this.remove()"><span class="v4-fc-b"></span></button>`).join('');
  }
  function layoutFlow() {
    const n = picks.length;
    document.querySelectorAll('#v4Flow .v4-fc').forEach((el, i) => {
      let o = i - cur;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      const a = Math.abs(o);
      el.style.transform = `translateX(${o * 72}%) rotateY(${-o * 32}deg) scale(${a ? .9 : 1})`;
      el.style.zIndex = 10 - a;
      el.style.opacity = a > 1 ? 0 : a ? .8 : 1;
      el.style.pointerEvents = a > 1 ? 'none' : '';
      el.classList.toggle('is-on', !a);
      const im = a <= 2 && el.querySelector('img[data-src]');
      if (im && im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); }
    });
  }

  function show(i) {
    if (!picks.length) return;
    cur = (i + picks.length) % picks.length;
    const m = picks[cur];
    $('v4Info').innerHTML = infoHTML(m);
    $('v4Langs').innerHTML = langsOf(m).map(([k, n], j) => `<span class="${j ? '' : 'is-on'}">${esc(n)}</span>`).join('');
    $('v4Pick').querySelectorAll('.v4-pc').forEach((c, j) => c.classList.toggle('is-on', j === cur));
    const dots = $('v4Dots');
    if (dots) dots.innerHTML = picks.map((_, j) => `<i class="${j === cur ? 'is-on' : ''}"></i>`).join('');
    if (PHONE.matches) {
      layoutFlow();
      const b = document.querySelector(`#v4Flow .v4-fc[data-i="${cur}"] .v4-fc-b`);
      if (b) b.textContent = ($('v4Info').querySelector('.v4-kick') || {}).textContent || '';
      return;
    }
    setArt(m);
    // keyingi kinoning rasmi oldindan
    const nx = picks[(cur + 1) % picks.length];
    const nsrc = nx && (wideOf(nx, 'w1280') || tallOf(nx));
    if (nsrc) new Image().src = nsrc;
  }
  function initFlow() {
    const flow = $('v4Flow');
    if (!flow) return;
    flow.innerHTML = flowHTML();
    flow.addEventListener('click', e => {
      const b = e.target.closest('.v4-fc');
      if (!b) return;
      if (+b.dataset.i === cur) { location.href = movieHref(picks[cur]); return; }
      show(+b.dataset.i); restart();
    });
    // barmoq bilan surish
    let x0 = null, y0 = 0;
    flow.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    flow.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { show(cur + (dx < 0 ? 1 : -1)); restart(); }
    }, { passive: true });
    PHONE.addEventListener('change', () => show(cur));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => { if (!document.hidden) show(cur + 1); }, DELAY);
  }

  function pickHTML(m, i) {
    const img = cardImg(m);
    const sub = [watchStatus(m) === 'uz' ? (ru ? 'на узбекском' : 'o‘zbek tilida') : '', m.year, typeName(m.type)].filter(Boolean).join(' · ');
    return `<button class="v4-pc" type="button" data-i="${i}">
      ${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
      <span><b>${esc(title(m))}</b><small>${esc(sub)}</small></span></button>`;
  }

  /* ---------- qatorlar (admin → «Sayt» → qatorlar: SITE_CONFIG.rows — hozirgi bosh sahifa bilan bir xil) ---------- */
  const yr = m => m.year || 0;
  const rt = m => m.rating || 0;
  const libRow = fr => MOVIES.filter(m => m.franchise === fr && m.poster);
  const ROW_SOURCES = {
    uzbek:     { all: 'catalog.html?watch=uz',             list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)) },
    tahlil:    { all: 'catalog.html?franchise=tahlil',     list: () => MOVIES.filter(m => m.franchise === 'tahlil').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)) },
    konsert:   { all: 'catalog.html?franchise=konsert',    list: () => MOVIES.filter(m => m.franchise === 'konsert').sort((a, b) => yr(b) - yr(a)) },
    trending:  { all: null,                                list: () => MOVIES.filter(rt).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)) },
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
  const seeAll = ru ? 'Все' : 'Hammasi';
  const headHTML = (t, all) => `<div class="v4-row-h"><h2>${esc(t)}</h2>${all ? `<a href="${all}">${seeAll} →</a>` : ''}</div>`;

  function cardHTML4(m) {
    const img = cardImg(m);
    const parts = partsOf(m).length;
    const st = watchStatus(m);
    const sub = [st === 'uz' ? (ru ? 'на узбекском' : 'o‘zbekcha') : st === 'trailer' ? (ru ? 'трейлер' : 'treyler') : '',
      m.year, parts > 1 ? `${parts} ${ru ? 'серий' : 'qism'}` : genreName((m.genres || [])[0])].filter(Boolean).join(' · ');
    return `<a class="v4-card" href="${movieHref(m)}">
      <div class="v4-card-im">${img ? `<img src="${esc(img)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}
        ${m.rating ? `<i class="v4-rt">★ ${(+m.rating).toFixed(1)}</i>` : ''}</div>
      <b>${esc(title(m))}</b><small>${esc(sub)}</small></a>`;
  }
  // bitta serialning alohida qo'shilgan qismlari («… 65-qism», «… 64-qism») — qatorda bir marta
  const baseTitle = m => norm(title(m)).replace(/[\s.,:–—-]*\d+\s*-?\s*(qism|seriya|серия|bolim|bo‘lim)(\s.*)?$/i, '').trim();
  function uniq(list) {
    const seen = new Set();
    return list.filter(m => { const k = baseTitle(m); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  /* «Ko'rishni davom ettiring» — kino sahifasi saqlagan joy (js/movie.js → dezomax_watch_history) */
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
    const left = s => { const m = Math.max(1, Math.round(s / 60)); return m >= 60 ? `${Math.floor(m / 60)} ${ru ? 'ч' : 'soat'} ${m % 60} ${ru ? 'мин' : 'daq'}` : `${m} ${ru ? 'мин' : 'daq'}`; };
    return `<section class="v4-row" id="v4Cw">${headHTML(ru ? 'Продолжить просмотр' : 'Ko‘rishni davom ettiring')}
      <div class="v4-row-l">${list.map(({ x, m }) => {
        const pct = Math.min(100, Math.max(2, x.t / x.dur * 100));
        const img = cardImg(m);
        return `<div class="v4-card is-cw"><a href="${esc(x.path || `movie.html?id=${m.id}`)}">
          <div class="v4-card-im">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
            <span class="v4-cw-play"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg></span>
            <i class="v4-cw-bar"><i style="width:${pct.toFixed(1)}%"></i></i></div>
          <b>${esc(title(m))}</b><small>${[x.part ? `${x.part}-${ru ? 'я серия' : 'qism'}` : '', `${left(x.dur - x.t)} ${ru ? 'осталось' : 'qoldi'}`].filter(Boolean).join(' · ')}</small></a>
          <button class="v4-cw-del" type="button" data-cw-del="${m.id}" aria-label="${ru ? 'Убрать' : 'Olib tashlash'}">×</button></div>`;
      }).join('')}</div></section>`;
  }

  /* TOP 10 — eng ko'p ko'rilganlar (to'lov serveri /top: kunlik, haftalik, oylik); kam bo'lsa — reyting bo'yicha */
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
  const t10Cards = list => list.slice(0, 10).map((m, i) => {
    const img = tallOf(m) || cardImg(m);
    return `<a class="v4-t10" href="${movieHref(m)}"><span class="v4-t10-n">${i + 1}</span>
      <span class="v4-t10-im">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
      <b>${esc(title(m))}</b></a>`;
  }).join('');
  function top10HTML(title) {
    return `<section class="v4-row v4-top" id="v4Top">
      <div class="v4-row-h"><h2>${esc(title)}</h2>
        <div class="v4-tabs-sm">${TOP_TABS.map(([d, k]) => `<button type="button" data-days="${d}" class="${d === topDays ? 'is-on' : ''}">${t(k)}</button>`).join('')}</div></div>
      <p class="v4-top-sub">${esc(t('top.sub'))}</p>
      <div class="v4-row-l v4-t10-row" id="v4T10">${t10Cards(ROW_SOURCES.popular.list())}</div></section>`;
  }
  async function loadTop10() {
    const row = $('v4T10');
    if (!row) return;
    const byId = new Map(MOVIES.map(m => [m.id, m]));
    const days = topDays;
    const top = await topIds(days);
    if (needFull(top) && await window.dzxLoadFull()) return renderRows();
    const real = top.map(id => byId.get(id)).filter(m => m && !isExtraVideo(m));
    if (days !== topDays) return;
    const all = real.length < 10 ? (await topIds('all')).map(id => byId.get(id)).filter(m => m && !isExtraVideo(m)) : [];
    row.innerHTML = t10Cards([...new Set([...real, ...all, ...ROW_SOURCES.popular.list()])]);
    row.scrollLeft = 0;
  }

  /* Kinostudiyalar (js/common.js → STUDIOS): treylerlari kelganlari ochiq, qolganlari «Tez orada» */
  const studioReady = s => !!s.href || MOVIES.some(m => m.franchise === s.key && m.ch);
  function studiosHTML(title) {
    const list = [...STUDIOS].sort((a, b) => studioReady(b) - studioReady(a));
    const soon = ru ? 'Скоро' : 'Tez orada';
    return `<section class="v4-row">${headHTML(title)}
      <div class="v4-row-l v4-st-row">${list.map(s => studioReady(s)
        ? `<a class="v4-st" href="${studioHref(s)}" style="--st:${s.bg}" aria-label="${esc(s.name)}"><span>${s.logo}</span><small>${esc(s.name)}</small></a>`
        : `<span class="v4-st is-soon" style="--st:${s.bg}"><span>${s.logo}</span><small>${esc(s.name)}</small><em>${soon}</em></span>`).join('')}</div></section>`;
  }

  /* Shorts (js/data-shorts.js) — tik kartalar, bosilsa shorts.html lentasi */
  function shortsHTML() {
    const list = typeof SHORTS !== 'undefined' ? SHORTS.slice(0, 24) : [];
    if (!list.length) return '';
    return `<section class="v4-row">${headHTML('Shorts', 'shorts.html')}
      <div class="v4-row-l v4-sh-row">${list.map(s => `<a class="v4-sh" href="shorts.html#${s.id}" aria-label="${esc(s.t)}">
        <img src="https://i.ytimg.com/vi/${s.id}/oardefault.jpg" alt="" loading="lazy" decoding="async"><span>${esc(s.t)}</span></a>`).join('')}</div></section>`;
  }

  function renderRows() {
    let rows = (CFG.rows && CFG.rows.length) ? CFG.rows : DEFAULT_ROWS;
    // kanal videolari (Shorts va «Kino tahlillari») — doim eng oxirida; kinostudiyalar — TOP 10 dan keyin
    const tahlilRow = rows.find(r => r.source === 'tahlil') || { source: 'tahlil', visible: true };
    rows = [...rows.filter(r => r.source !== 'tahlil'), tahlilRow];
    if (!rows.some(r => r.source === 'studios')) {
      const at = rows.findIndex(r => r.source === 'popular');
      rows = [...rows.slice(0, at + 1), { source: 'studios', visible: true }, ...rows.slice(at + 1)];
    }
    let shown = 0, hasTop = false;
    const box = $('v4Rows');
    box.innerHTML = continueHTML() + rows.map(row => {
      if (row.visible === false) return '';
      const title = (row.title && (row.title[LANG] || row.title.uz)) || (row.source !== 'custom' ? t('row.' + row.source) : '');
      // har 3 qatordan keyin reklama joyi (js/ads.js; reklama ulanmagan bo'lsa — o'zi yo'qoladi)
      const ad = ++shown % 3 === 0 ? `<div class="ad-slot" data-ad-slot="home"></div>` : '';
      if (row.source === 'studios') return studiosHTML(title) + ad;
      if (row.source === 'popular' && !hasTop) { hasTop = true; return top10HTML(title) + ad; }
      const src = ROW_SOURCES[row.source] || ROW_SOURCES.custom;
      const list = uniq(src.list(row).filter(m => cardImg(m))).slice(0, 18);
      if (list.length < (row.source === 'custom' ? 1 : 4)) return '';
      const pre = row.source === 'tahlil' ? shortsHTML() : '';
      return `${pre}<section class="v4-row">${headHTML(title, src.all)}
        <div class="v4-row-l">${list.map(cardHTML4).join('')}</div></section>${ad}`;
    }).join('');

    if (typeof Ads !== 'undefined') Ads.fill(box);
    box.querySelectorAll('[data-days]').forEach(b => b.addEventListener('click', () => {
      topDays = +b.dataset.days;
      box.querySelectorAll('[data-days]').forEach(x => x.classList.toggle('is-on', x === b));
      loadTop10();
    }));
    if (hasTop) loadTop10();
  }
  // «davom ettirish» kartasini olib tashlash
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cw-del]');
    if (!b) return;
    e.preventDefault();
    const id = +b.dataset.cwDel;
    try { localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]').filter(x => x && x.id !== id))); } catch {}
    b.closest('.v4-card').remove();
    if (!document.querySelector('#v4Cw .v4-card')) $('v4Cw')?.remove();
  });
  // kino sahifasidan orqaga qaytilganda (sahifa keshdan) — «davom ettirish» yangilansin
  addEventListener('pageshow', e => { if (e.persisted) renderRows(); });

  /* ---------- Dezo qatori: yozing yoki ayting ---------- */
  const EXAMPLES = ru
    ? ['«Новый сериал про Вижна»', '«Узбекская комедия на вечер»', '«Мультфильм для детей»', '«Фантастика как Интерстеллар»']
    : ['«Vision haqidagi yangi serialni qo‘y»', '«Kechqurunga o‘zbek komediyasi»', '«Bolalar uchun multfilm»', '«Interstellarga o‘xshash fantastika»'];
  function initDezo() {
    const q = $('v4Q'), form = $('v4Dezo');
    let k = 0;
    setInterval(() => { if (document.activeElement !== q && !q.value) q.placeholder = EXAMPLES[++k % EXAMPLES.length]; }, 4000);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = q.value.replace(/[«»"]/g, '').trim();
      location.href = 'search.html' + (v ? '?q=' + encodeURIComponent(v) : '');
    });
    // ovoz bilan: brauzer qo'llasa (Chrome, Android); bo'lmasa — yozish maydoniga o'tadi
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    $('v4Mic').addEventListener('click', () => {
      if (!SR) { q.focus(); return; }
      const r = new SR();
      r.lang = ru ? 'ru-RU' : 'uz-UZ';
      r.interimResults = false;
      form.classList.add('is-listen');
      r.onresult = e => { q.value = e.results[0][0].transcript; form.requestSubmit(); };
      r.onend = () => form.classList.remove('is-listen');
      r.onerror = () => { form.classList.remove('is-listen'); q.focus(); };
      try { r.start(); } catch { form.classList.remove('is-listen'); q.focus(); }
    });
  }

  function clock() {
    const d = new Date();
    $('v4Clock').textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  /* ---------- ishga tushirish ---------- */
  if (picks.length) {
    $('v4Pick').innerHTML = picks.map(pickHTML).join('');
    initFlow();
    $('v4Pick').addEventListener('click', e => {
      const b = e.target.closest('.v4-pc');
      if (!b) return;
      // tanlangan kino ikkinchi marta bosilsa — kino sahifasi
      if (+b.dataset.i === cur) { location.href = movieHref(picks[cur]); return; }
      show(+b.dataset.i); restart();
      if (matchMedia('(max-width: 900px)').matches) $('v4Hero').scrollIntoView({ behavior: 'smooth' });
    });
    show(0); restart();
  } else $('v4Hero').classList.add('is-empty');

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    const on = toggleFav(b.dataset.fav);
    b.classList.toggle('is-on', on);
  });
  // «Qiziq emas» — kino karuseldan olib tashlanadi (shu telefonda eslab qolinadi)
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-hide]');
    if (!b || picks.length < 2) return;
    const id = +b.dataset.hide;
    try { localStorage.setItem(HERO_HIDE_KEY, JSON.stringify([...new Set([...heroHidden(), id])].slice(-200))); } catch {}
    const i = picks.findIndex(m => m.id === id);
    if (i < 0) return;
    picks.splice(i, 1);
    $('v4Pick').innerHTML = picks.map(pickHTML).join('');
    if ($('v4Flow')) $('v4Flow').innerHTML = flowHTML();
    show(Math.min(i, picks.length - 1)); restart();
  });
  // klaviatura / pult: ← → — kinolar, Enter — tanlangan kinoni ko'rish
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' && window.scrollY < 200) { show(cur + 1); restart(); }
    if (e.key === 'ArrowLeft' && window.scrollY < 200) { show(cur - 1); restart(); }
  });

  renderRows();
  initDezo();
  // yengil ro'yxatda yo'q kino kerak bo'lsa (bolalar rejimi, admin tanlovi, davom ettirish, oldingi Top) — to'liq ro'yxat
  (() => {
    if (!window.DZX_HOME_PART) return;
    let cw = [];
    try { cw = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]').filter(x => x && !x.done).map(x => x.id); } catch {}
    const want = [...((CFG.hero && CFG.hero.ids) || []), ...popCached.slice(0, 12), ...cw.slice(0, 12),
      ...(CFG.rows || []).flatMap(r => r.visible === false ? [] : r.ids || [])];
    if (!kidsMode() && !needFull(want)) return;
    window.dzxLoadFull().then(ok => {
      if (!ok) return;
      const next = heroList(popCached);
      if (next.length && next.map(m => m.id).join() !== picks.map(m => m.id).join()) {
        picks.splice(0, picks.length, ...next);
        $('v4Pick').innerHTML = picks.map(pickHTML).join('');
        if ($('v4Flow')) $('v4Flow').innerHTML = flowHTML();
        show(0); restart();
      }
      renderRows();
    });
  })();
  $('v4Year').textContent = new Date().getFullYear();
  // umumiy pastki menyu (Bosh sahifa, TV, Qidiruv, Kutubxona, Shorts — js/common.js) va tarjimalar
  if (typeof renderTabbar === 'function') renderTabbar();
  if (typeof applyI18n === 'function') applyI18n();
  // eng ko'p ko'rilganlar keyingi ochilish uchun saqlanadi (birinchi ochilishda tez kelsa — darrov qo'shiladi)
  if (!kidsMode()) (async () => {
    const t0 = Date.now();
    const week = await topIds(7);
    const ids = week.length >= 5 ? week : [...week, ...await topIds('all')];
    if (!ids.length) return;
    if (needFull(ids.slice(0, 12))) await window.dzxLoadFull();
    try { localStorage.setItem(HERO_POP_KEY, JSON.stringify(ids.slice(0, 30))); } catch {}
    if (!popCached.length && Date.now() - t0 < 4000 && cur === 0) {
      const next = heroList(ids);
      if (next.map(m => m.id).join() !== picks.map(m => m.id).join()) {
        picks.splice(0, picks.length, ...next);
        $('v4Pick').innerHTML = picks.map(pickHTML).join('');
        $('v4Flow').innerHTML = flowHTML();
        show(0); restart();
      }
    }
  })();
  clock(); setInterval(clock, 20000);
})();
