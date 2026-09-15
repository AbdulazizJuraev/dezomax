/* ============================================================
   DezoMax — bosh sahifa / главная страница
   ============================================================ */

// Admin → «Sayt» bo'limidagi sozlamalar (js/site-config.js). null bo'lsa — standart holat
const SITE_CFG = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG) || {};

// Slayder: admin tanlagan kinolar, aks holda «featured» belgilanganlar (o'zbekcha to'liq filmlar birinchi)
const adminHeroIds = SITE_CFG.hero && Array.isArray(SITE_CFG.hero.ids) ? SITE_CFG.hero.ids : null;
const featured = adminHeroIds && adminHeroIds.length
  ? adminHeroIds.map(id => MOVIES.find(m => m.id === id)).filter(Boolean).slice(0, 15)
  : MOVIES.filter(m => m.featured)
      .sort((a, b) => (watchStatus(a) === 'uz' ? 0 : 1) - (watchStatus(b) === 'uz' ? 0 : 1))
      .slice(0, 10);   // standart slayder juda uzun bo'lib ketmasin
let heroIndex = 0;
let heroTimer = null;
const HERO_DELAY = Math.min(15, Math.max(2, Number(SITE_CFG.hero && SITE_CFG.hero.delay) || 3)) * 1000;
document.documentElement.style.setProperty('--hero-delay', HERO_DELAY / 1000 + 's');

/* ---------- Hero slider ---------- */

function renderHero() {
  const hero = document.getElementById('hero');
  const dots = document.getElementById('heroDots');
  if (!hero) return;
  if (!featured.length) { hero.hidden = true; return; }

  const slides = featured.map((m, i) => {
    const st = watchStatus(m);
    // o'zbek filmlarining muqovasi keng (16:9) — butun fonga yoyiladi.
    // Boshqa filmlarda poster kichik (220px) — o'rniga rasmiy treyler muqovasi (1280×720)
    const ytId = (String(m.trailer || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1];
    const uzArt = m.poster && m.poster.startsWith('images/uz/') ? m.poster : null;
    const wideSrc = uzArt || (ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : null);
    const wideArt = !!wideSrc;
    const statusTag = st === 'uz'
      ? `<span class="tag tag-watch is-uz">${ICONS.play} ${t('watch.statusUz')}</span>`
      : st === 'trailer' ? `<span class="tag tag-watch is-trailer">${t('watch.statusTrailer')}</span>` : '';
    const meta = [
      m.year,
      typeName(m.type),
      m.genres.slice(0, 2).map(genreName).join(', '),
      durationText(m)
    ].filter(x => x && x !== '—');
    return `
    <div class="hero-slide${i === heroIndex ? ' is-active' : ''}" data-i="${i}">
      <div class="hero-bg${wideArt ? ' is-wide' : ''}" style="background-image:${wideArt ? `url('${esc(wideSrc)}'), ${backdropCSS(m)}` : backdropCSS(m)}"${ytId && !uzArt ? ` data-yt="${ytId}"` : ''}></div>
      ${m.poster && !wideArt ? `<div class="hero-art"><img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></div>` : ''}
      <div class="hero-inner">
        <div class="wrap">
          <div class="hero-content">
            <span class="hero-badge">DezoMax ${LANG === 'uz' ? 'tanlovi' : 'выбирает'}</span>
            <h1>${esc(title(m))}</h1>
            <div class="hero-meta">
              ${statusTag}
              ${m.rating ? `<span class="tag tag-rating">${ICONS.star} ${m.rating.toFixed(1)}</span>` : ''}
              ${meta.map(x => `<span>${esc(x)}</span>`).join('<i class="dot"></i>')}
            </div>
            <p>${esc(descOf(m))}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="movie.html?id=${m.id}&play=1">${ICONS.play}<span>${t(st === 'trailer' ? 'hero.trailer' : 'hero.watch')}</span></a>
              <a class="btn btn-ghost" href="movie.html?id=${m.id}">${ICONS.info}<span>${t('hero.more')}</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  hero.insertAdjacentHTML('afterbegin', slides);

  // maxresdefault bo'lmagan eski treylerlar uchun YouTube 120×90 kulrang rasm qaytaradi —
  // shunda sd (640×480) yoki hq variantiga tushamiz
  hero.querySelectorAll('.hero-bg[data-yt]').forEach(bg => {
    const id = bg.dataset.yt;
    const tries = ['maxresdefault', 'sddefault', 'hqdefault'];
    const test = i => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth <= 120 && i < tries.length - 1) return test(i + 1);
        if (i > 0) bg.style.backgroundImage = bg.style.backgroundImage.replace(/maxresdefault/, tries[i]);
      };
      img.onerror = () => { if (i < tries.length - 1) test(i + 1); };
      img.src = `https://i.ytimg.com/vi/${id}/${tries[i]}.jpg`;
    };
    test(0);
  });

  dots.innerHTML = featured.map((_, i) =>
    `<button data-i="${i}" class="${i === heroIndex ? 'is-active' : ''}" aria-label="Slayd ${i + 1}"></button>`
  ).join('');

  dots.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => { goToSlide(+b.dataset.i); restartHeroTimer(); });
  });
  updateCounter();
}

/* "03 / 10" hisoblagichi */
function updateCounter() {
  const hero = document.getElementById('hero');
  let el = hero.querySelector('.hero-count');
  if (!el) {
    el = document.createElement('div');
    el.className = 'hero-count';
    hero.appendChild(el);
  }
  const p = n => String(n).padStart(2, '0');
  el.innerHTML = `<b>${p(heroIndex + 1)}</b><span>/ ${p(featured.length)}</span>`;
}

/* Telefonda barmoq bilan surib slayd almashtirish */
function initHeroSwipe() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let x0 = null, y0 = 0;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      goToSlide(heroIndex + (dx < 0 ? 1 : -1));
      restartHeroTimer();
    }
  }, { passive: true });
  // sahifa ko'rinmayotganda slayder to'xtaydi
  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearInterval(heroTimer) : restartHeroTimer();
  });
}

function goToSlide(i) {
  heroIndex = (i + featured.length) % featured.length;
  document.querySelectorAll('.hero-slide').forEach(s =>
    s.classList.toggle('is-active', +s.dataset.i === heroIndex));
  document.querySelectorAll('.hero-dots button').forEach(b =>
    b.classList.toggle('is-active', +b.dataset.i === heroIndex));
  updateCounter();
}

function restartHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), HERO_DELAY);
  // faol nuqtadagi to'lish chizig'i qaytadan boshlansin
  const dot = document.querySelector('.hero-dots button.is-active');
  if (dot) { dot.classList.remove('is-active'); void dot.offsetWidth; dot.classList.add('is-active'); }
}

/* ---------- Qatorlar (admin → «Sayt» bo'limidan boshqariladi) ---------- */

/* Qator manbalari: nomi (i18n kaliti), «Hammasi» havolasi va kinolar ro'yxati */
const yr = m => m.year || 0;
const rt = m => m.rating || 0;
const ROW_SOURCES = {
  uzbek:    { title: 'row.uzbek',    all: 'catalog.html?watch=uz',        list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)) },
  trending: { title: 'row.trending', all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)).slice(0, 14) },
  new:      { title: 'row.new',      all: null,                           list: () => [...MOVIES].filter(yr).sort((a, b) => yr(b) - yr(a)).slice(0, 14) },
  marvel:   { title: 'row.marvel',   all: 'catalog.html?franchise=marvel', list: () => MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => yr(a) - yr(b)) },
  dc:       { title: 'row.dc',       all: 'catalog.html?franchise=dc',     list: () => MOVIES.filter(m => m.franchise === 'dc').sort((a, b) => yr(a) - yr(b)) },
  top:      { title: 'row.top',      all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) - rt(a)).slice(0, 14) },
  series:   { title: 'row.series',   all: 'catalog.html?type=serial',     list: () => MOVIES.filter(m => m.type === 'serial') },
  cartoons: { title: 'row.cartoons', all: 'catalog.html?type=multfilm',   list: () => MOVIES.filter(m => m.type === 'multfilm') },
  custom:   { title: null,           all: null,                           list: row => (row.ids || []).map(id => MOVIES.find(m => m.id === id)).filter(Boolean) }
};

const DEFAULT_ROWS = ['uzbek', 'trending', 'new', 'marvel', 'dc', 'top', 'series', 'cartoons']
  .map(source => ({ source, visible: true }));

function renderRows() {
  const box = document.getElementById('homeRows');
  if (!box) return;
  const rows = (SITE_CFG.rows && SITE_CFG.rows.length) ? SITE_CFG.rows : DEFAULT_ROWS;

  box.innerHTML = rows.map((row, i) => {
    const src = ROW_SOURCES[row.source] || ROW_SOURCES.custom;
    if (row.visible === false) return '';
    const list = src.list(row);
    if (!list.length) return '';
    const title = (row.title && (row.title[LANG] || row.title.uz)) || (src.title ? t(src.title) : '');
    return `
      <section class="section">
        <div class="section-head">
          <i class="bar"></i><h2>${esc(title)}</h2>
          ${src.all ? `<a class="row-all" href="${src.all}">${t('row.seeAll')}</a>` : ''}
          <div class="row-nav" data-for="homeRow${i}"></div>
        </div>
        <div class="row" id="homeRow${i}">${list.map(cardHTML).join('')}</div>
      </section>`;
  }).join('');

  observeReveals(box);
  initRowNav();
}

/* ---------- Qator strelkalari ---------- */

function initRowNav() {
  document.querySelectorAll('.row-nav').forEach(nav => {
    const row = document.getElementById(nav.dataset.for);
    if (!row) return;
    nav.innerHTML = `<button data-dir="-1" aria-label="Chapga">${ICONS.left}</button>
                     <button data-dir="1" aria-label="O‘ngga">${ICONS.right}</button>`;
    nav.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        row.scrollBy({ left: +b.dataset.dir * Math.max(row.clientWidth * .8, 240), behavior: 'smooth' });
      });
    });
  });
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderHero();
renderRows();
initHeroSwipe();
restartHeroTimer();
document.getElementById('year').textContent = new Date().getFullYear();

/* Til almashtirilganda hamma narsani qayta chizish */
document.addEventListener('langchange', () => {
  document.querySelectorAll('.hero-slide').forEach(s => s.remove());
  renderHero();
  renderRows();
  applyI18n();
});
