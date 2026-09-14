/* ============================================================
   DezoMax — bosh sahifa / главная страница
   ============================================================ */

const featured = MOVIES.filter(m => m.featured);
let heroIndex = 0;
let heroTimer = null;

/* ---------- Hero slider ---------- */

function renderHero() {
  const hero = document.getElementById('hero');
  const dots = document.getElementById('heroDots');
  if (!hero) return;

  const slides = featured.map((m, i) => {
    const meta = [
      m.year,
      typeName(m.type),
      m.genres.slice(0, 2).map(genreName).join(', '),
      durationText(m)
    ].filter(x => x && x !== '—');
    return `
    <div class="hero-slide${i === heroIndex ? ' is-active' : ''}" data-i="${i}">
      <div class="hero-bg" style="background-image:${backdropCSS(m)}"></div>
      ${m.poster ? `<div class="hero-art"><img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></div>` : ''}
      <div class="hero-inner">
        <div class="wrap">
          <div class="hero-content">
            <span class="hero-badge">DezoMax ${LANG === 'uz' ? 'tanlovi' : 'выбирает'}</span>
            <h1>${esc(title(m))}</h1>
            <div class="hero-meta">
              ${m.rating ? `<span class="tag tag-rating">${ICONS.star} ${m.rating.toFixed(1)}</span>` : ''}
              ${meta.map(x => `<span>${esc(x)}</span>`).join('<i class="dot"></i>')}
            </div>
            <p>${esc(descOf(m))}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="movie.html?id=${m.id}&play=1">${ICONS.play}<span>${t('hero.watch')}</span></a>
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
}

function goToSlide(i) {
  heroIndex = (i + featured.length) % featured.length;
  document.querySelectorAll('.hero-slide').forEach(s =>
    s.classList.toggle('is-active', +s.dataset.i === heroIndex));
  document.querySelectorAll('.hero-dots button').forEach(b =>
    b.classList.toggle('is-active', +b.dataset.i === heroIndex));
}

function restartHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 7000);
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
restartHeroTimer();
document.getElementById('year').textContent = new Date().getFullYear();

/* Til almashtirilganda hamma narsani qayta chizish */
document.addEventListener('langchange', () => {
  document.querySelectorAll('.hero-slide').forEach(s => s.remove());
  renderHero();
  renderRows();
  applyI18n();
});
