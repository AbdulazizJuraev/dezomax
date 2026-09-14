/* ============================================================
   DezoMax — bosh sahifa / главная страница
   ============================================================ */

// O'zbek tilida to'liq ko'riladigan filmlar slayderda birinchi
const featured = MOVIES.filter(m => m.featured)
  .sort((a, b) => (watchStatus(a) === 'uz' ? 0 : 1) - (watchStatus(b) === 'uz' ? 0 : 1))
  .slice(0, 10);   // slayder juda uzun bo'lib ketmasin
let heroIndex = 0;
let heroTimer = null;

/* ---------- Hero slider ---------- */

function renderHero() {
  const hero = document.getElementById('hero');
  const dots = document.getElementById('heroDots');
  if (!hero) return;

  const slides = featured.map((m, i) => {
    const st = watchStatus(m);
    // o'zbek filmlarining muqovasi keng (16:9) — butun fonga yoyiladi
    const wideArt = m.poster && m.poster.startsWith('images/uz/');
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
      <div class="hero-bg${wideArt ? ' is-wide' : ''}" style="background-image:${wideArt ? `url('${esc(m.poster)}')` : backdropCSS(m)}"></div>
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
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 7000);
  // faol nuqtadagi to'lish chizig'i qaytadan boshlansin
  const dot = document.querySelector('.hero-dots button.is-active');
  if (dot) { dot.classList.remove('is-active'); void dot.offsetWidth; dot.classList.add('is-active'); }
}

/* ---------- Qatorlar ---------- */

function renderRows() {
  const yr = m => m.year || 0;
  const rt = m => m.rating || 0;
  const byNew = [...MOVIES].filter(yr).sort((a, b) => yr(b) - yr(a));
  const byRating = [...MOVIES].filter(rt).sort((a, b) => rt(b) - rt(a));
  const trendScore = m => rt(m) * (yr(m) >= 2014 ? 1.1 : 1);

  renderCards(document.getElementById('rowTrending'),
    [...MOVIES].filter(rt).sort((a, b) => trendScore(b) - trendScore(a)).slice(0, 14));

  renderCards(document.getElementById('rowNew'), byNew.slice(0, 14));

  renderCards(document.getElementById('rowUzbek'),
    MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)));

  renderCards(document.getElementById('rowMarvel'),
    MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => a.year - b.year));
  renderCards(document.getElementById('rowDC'),
    MOVIES.filter(m => m.franchise === 'dc').sort((a, b) => a.year - b.year));

  renderCards(document.getElementById('rowTop'), byRating.slice(0, 14));
  renderCards(document.getElementById('rowSeries'), MOVIES.filter(m => m.type === 'serial'));
  renderCards(document.getElementById('rowCartoons'), MOVIES.filter(m => m.type === 'multfilm'));
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
initRowNav();
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
