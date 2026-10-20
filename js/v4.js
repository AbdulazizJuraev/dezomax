/* ============================================================
   DezoMax 4.0 — yangi bosh sahifa (sinov: v4.html)
   ------------------------------------------------------------
   - Tepada: «Dezo» qatori (yozing yoki ayting → qidiruv sahifasi)
   - Katta kino: admin → «Sayt» → slayder kinolari (SITE_CONFIG.hero.ids), har N soniyada keyingisi
   - «Yoki shulardan biri»: slayderdagi boshqa kinolar — bosilsa katta kino almashadi
   - Pastda qatorlar: yangi, o'zbek kinolari, seriallar, multfilmlar, konsertlar, klassika, Marvel, reyting
   Ma'lumot va yordamchilar — js/common.js (MOVIES, heroMovie, heroCompose, partsOf, watchStatus, movieHref ...)
   ============================================================ */
(function () {
  const CFG = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG) || {};
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
  const picks = heroCompose(((CFG.hero && CFG.hero.ids) || []).map(heroMovie).filter(Boolean)).slice(0, 12);
  const DELAY = Math.min(60, Math.max(8, Number(CFG.hero && CFG.hero.delay) || 12)) * 1000;
  let cur = 0, timer = null;

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
        ${parts > 1 ? `<a class="v4-btn" href="movie.html?id=${m.id}&part=1&play=1">${ru ? 'С 1-й серии' : '1-qismdan'}</a>` : ''}
        <a class="v4-btn is-more" href="${movieHref(m)}">${ru ? 'Подробнее' : 'Batafsil'}</a>
        <button class="v4-btn is-ic${fav ? ' is-on' : ''}" type="button" data-fav="${m.id}" aria-label="${ru ? 'В список' : 'Ro‘yxatga'}">${fav ? '✓' : '+'}</button>
      </div>`;
  }

  function setArt(m) {
    const art = $('v4Art');
    // tik poster (TV maketidagidek o'ngda); bo'lmasa keng rasm — kengroq joyga
    const tall = tallOf(m), src = tall || wideOf(m, 'w1280');
    art.classList.remove('is-in');
    art.classList.toggle('is-wide', !tall);
    if (!src) { art.style.backgroundImage = backdropCSS(m); art.classList.add('is-in'); return; }
    const im = new Image();
    im.onload = () => { if (picks[cur] !== m) return; art.style.backgroundImage = `url('${src}')`; requestAnimationFrame(() => art.classList.add('is-in')); };
    im.onerror = () => { art.style.backgroundImage = backdropCSS(m); art.classList.add('is-in'); };
    im.src = src;
  }

  function show(i) {
    if (!picks.length) return;
    cur = (i + picks.length) % picks.length;
    const m = picks[cur];
    $('v4Info').innerHTML = infoHTML(m);
    $('v4Langs').innerHTML = langsOf(m).map(([k, n], j) => `<span class="${j ? '' : 'is-on'}">${esc(n)}</span>`).join('');
    setArt(m);
    $('v4Pick').querySelectorAll('.v4-pc').forEach((c, j) => c.classList.toggle('is-on', j === cur));
    // keyingi kinoning rasmi oldindan
    const nx = picks[(cur + 1) % picks.length];
    const nsrc = nx && (tallOf(nx) || wideOf(nx, 'w1280'));
    if (nsrc) new Image().src = nsrc;
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

  /* ---------- qatorlar ---------- */
  const yr = m => m.year || 0;
  const ROWS = [
    { t: ru ? 'Новинки' : 'Yangi qo‘shilganlar', all: 'catalog.html?sort=new', list: () => MOVIES.filter(m => m.addedAt && hasFilm(m) && !isExtraVideo(m)).sort((a, b) => b.addedAt - a.addedAt) },
    { t: ru ? 'Узбекские фильмы' : 'O‘zbek kinolari', all: 'catalog.html?watch=uz', list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)) },
    { t: ru ? 'Сериалы' : 'Seriallar', all: 'catalog.html?type=serial', list: () => MOVIES.filter(m => m.type === 'serial' && watchStatus(m) !== 'none') },
    { t: ru ? 'Мультфильмы' : 'Multfilmlar', all: 'catalog.html?type=multfilm', list: () => MOVIES.filter(m => m.type === 'multfilm' && hasFilm(m)) },
    { t: ru ? 'Концерты' : 'Konsertlar', all: 'catalog.html?franchise=konsert', list: () => MOVIES.filter(m => m.franchise === 'konsert').sort((a, b) => yr(b) - yr(a)) },
    { t: ru ? 'Классика кино' : 'Kino klassikasi', all: 'catalog.html?franchise=klassika', list: () => MOVIES.filter(m => m.franchise === 'klassika' && m.type !== 'multfilm').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)) },
    { t: ru ? 'Вселенная Marvel' : 'Marvel olami', all: 'marvel.html', list: () => MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => yr(a) - yr(b)) },
    { t: ru ? 'Высокий рейтинг' : 'Eng yuqori reyting', all: null, list: () => MOVIES.filter(m => m.rating && hasFilm(m)).sort((a, b) => b.rating - a.rating) }
  ];
  function cardHTML4(m) {
    const img = cardImg(m);
    const parts = partsOf(m).length;
    const sub = [watchStatus(m) === 'uz' ? (ru ? 'на узбекском' : 'o‘zbekcha') : '', m.year, parts > 1 ? `${parts} ${ru ? 'серий' : 'qism'}` : genreName((m.genres || [])[0])].filter(Boolean).join(' · ');
    return `<a class="v4-card" href="${movieHref(m)}">
      <div class="v4-card-im">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
        ${m.rating ? `<i class="v4-rt">★ ${(+m.rating).toFixed(1)}</i>` : ''}</div>
      <b>${esc(title(m))}</b><small>${esc(sub)}</small></a>`;
  }
  // bitta serialning alohida qo'shilgan qismlari («… 65-qism», «… 64-qism») — qatorda bir marta
  const baseTitle = m => norm(title(m)).replace(/[\s.,:–—-]*\d+\s*-?\s*(qism|seriya|серия|bolim|bo‘lim)(\s.*)?$/i, '').trim();
  function uniq(list) {
    const seen = new Set();
    return list.filter(m => { const k = baseTitle(m); if (seen.has(k)) return false; seen.add(k); return true; });
  }
  function renderRows() {
    $('v4Rows').innerHTML = ROWS.map(r => {
      const list = uniq(r.list().filter(m => cardImg(m))).slice(0, 18);
      if (list.length < 4) return '';
      return `<section class="v4-row"><div class="v4-row-h"><h2>${esc(r.t)}</h2>${r.all ? `<a href="${r.all}">${ru ? 'Все' : 'Hammasi'} →</a>` : ''}</div>
        <div class="v4-row-l">${list.map(cardHTML4).join('')}</div></section>`;
    }).join('');
  }

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
    $('v4Pick').addEventListener('click', e => {
      const b = e.target.closest('.v4-pc');
      if (!b) return;
      // tanlangan kino ikkinchi marta bosilsa — kino sahifasi
      if (+b.dataset.i === cur) { location.href = movieHref(picks[cur]); return; }
      show(+b.dataset.i); restart();
      if (matchMedia('(max-width: 760px)').matches) $('v4Hero').scrollIntoView({ behavior: 'smooth' });
    });
    show(0); restart();
  } else $('v4Hero').classList.add('is-empty');

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    const on = toggleFav(b.dataset.fav);
    b.classList.toggle('is-on', on);
    b.textContent = on ? '✓' : '+';
  });
  // klaviatura / pult: ← → — kinolar, Enter — tanlangan kinoni ko'rish
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' && window.scrollY < 200) { show(cur + 1); restart(); }
    if (e.key === 'ArrowLeft' && window.scrollY < 200) { show(cur - 1); restart(); }
  });

  renderRows();
  initDezo();
  clock(); setInterval(clock, 20000);
})();
