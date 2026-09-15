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
// Slayderda faqat video: treyleri (YouTube) bor kinolar qoladi. Bittasi ham bo'lmasa — hammasi
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const withVideo = featured.filter(m => /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)[\w-]{11}/.test(String(m.trailer || '')));
  if (withVideo.length) featured.splice(0, featured.length, ...withVideo);
}
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
    // o'zbek filmlarining muqovasi keng (16:9) — butun fonga yoyiladi.
    // Boshqa filmlarda poster kichik (220px) — o'rniga rasmiy treyler muqovasi (1280×720)
    const ytId = (String(m.trailer || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1];
    const uzArt = m.poster && m.poster.startsWith('images/uz/') ? m.poster : null;
    const wideSrc = uzArt || (ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : null);
    const wideArt = !!wideSrc;
    const meta = [
      m.year,
      typeName(m.type),
      m.genres.slice(0, 2).map(genreName).join(', '),
      durationText(m)
    ].filter(x => x && x !== '—');
    return `
    <div class="hero-slide${i === heroIndex ? ' is-active' : ''}" data-i="${i}">
      <div class="hero-bg${wideArt ? ' is-wide' : ''}${ytId && !matchMedia('(prefers-reduced-motion: reduce)').matches ? ' video-only' : ''}" style="background-image:${wideArt ? `url('${esc(wideSrc)}'), ${backdropCSS(m)}` : backdropCSS(m)}"${ytId && !uzArt ? ` data-yt="${ytId}"` : ''}></div>
      ${m.poster && !wideArt ? `<div class="hero-art"><img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></div>` : ''}
      <div class="hero-inner">
        <div class="wrap">
          <div class="hero-content">
            <span class="hero-badge">DezoMax ${LANG === 'uz' ? 'tanlovi' : 'выбирает'}</span>
            <h1>${esc(title(m))}</h1>
            <div class="hero-meta">
              ${m.rating ? `<span class="tag tag-rating">${ICONS.star} ${m.rating.toFixed(1)}</span>` : ''}
              ${meta.map(x => `<span>${esc(x)}</span>`).join('<i class="dot"></i>')}
            </div>
            <div class="hero-actions">
              <a class="btn btn-primary hero-watch" href="movie.html?id=${m.id}&play=1">${ICONS.play}<span>${LANG === 'uz' ? 'Filmni tomosha qilish' : 'Смотреть фильм'}</span></a>
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
    if (document.hidden) { clearTimeout(heroTimer); stopClip(); } else restartHeroTimer();
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

/* ---------- Slayd: faqat rasmiy treylerdan 7 soniyalik sahna (ovozsiz), rasm yo'q ---------- */

const HERO_IMAGE_SEC = 3;
const HERO_CLIP_SEC = 7;
const HERO_CLIP_START = 30;     // treyler boshidagi studiya logotiplarini o'tkazib yuboramiz
const heroClipsOn = !matchMedia('(prefers-reduced-motion: reduce)').matches;
let clipTimer = null;

const heroYtId = m => (String(m?.trailer || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1];

function slideDuration(i) {
  return heroClipsOn && heroYtId(featured[i]) ? (HERO_IMAGE_SEC + HERO_CLIP_SEC) * 1000 : HERO_DELAY;
}

function stopClip(keep) {
  clearTimeout(clipTimer);
  document.querySelectorAll('.hero-clip').forEach(c => {
    if (c === keep) return;
    c.classList.remove('is-on');
    setTimeout(() => c.remove(), 600);
  });
}

function sizeClip(clip) {
  // Video blokni to'liq qoplaydi. Tepa-pastdan qo'shimcha kesish YO'Q:
  // mobil YouTube pleyerida u tepada qora yo'lak qoldirardi. Pleyer belgilari esa sahnani
  // kechiktirib ochish orqali yashiriladi (pastda).
  if (window.CSS && CSS.supports('width: 1cqw')) return;   // o'lcham CSS'da (container units) — o'lchash shart emas
  const r = clip.getBoundingClientRect();
  // treylerlar ko'pincha kinoteatr formatida (2.39:1) — videoning o'zida tepa-pastda qora hoshiya bor.
  // 1.5 marta kattalashtirilganda qora hoshiyalar ko'rinmas qismga tushadi (chetlari kesiladi, soya bilan qo'shiladi)
  // Joylashuv transform bilan emas, aniq px bilan — Android WebView'da video siljib, tepada qora joy qolmasin
  const Z = 1.75;
  let w = r.width * Z, h = w * 9 / 16;
  if (h < r.height * Z) { h = r.height * Z; w = h * 16 / 9; }
  const f = clip.querySelector('iframe');
  if (f) {
    f.style.width = w + 'px'; f.style.height = h + 'px';
    f.style.left = (r.width - w) / 2 + 'px'; f.style.top = (r.height - h) / 2 + 'px';
  }
}

/* YouTube ramkasidan holat xabarlari.
   Slayderda faqat video turadi (rasm yo'q). Mobil YouTube video boshlanganda ~3–4 s pauza belgisi
   ko'rsatadi, tugaganda — «qayta ko'rish» belgisi. Shuning uchun:
   - har bir sahna ko'rinmas holda OLDINDAN o'ynay boshlaydi (keyingi slaydniki — joriy sahna tugashidan oldin);
   - belgilar yo'qolgach «tayyor» bo'ladi va slayd kelishi bilan darhol ochilib, 7 s ko'rinadi;
   - pauza/tugash/buferda sahna yopiladi va keyingi slaydga o'tiladi — belgilar ko'rinmaydi;
   - video umuman boshlanmasa (avtoijro taqiqlangan) — zaxira sifatida rasm ko'rsatiladi. */
const HERO_REVEAL_AFTER_PLAY = 4500;
const HERO_CLIP_FALLBACK = 9000;
const HERO_PRELOAD_MS = HERO_REVEAL_AFTER_PLAY + 1200;   // keyingi sahna shuncha oldin yuklana boshlaydi

let heroEverPlayed = false;

const nextSlide = () => { goToSlide(heroIndex + 1); restartHeroTimer(); };

function showClip(clip) {
  if (!clip.isConnected || clip.classList.contains('is-on') || clip._slide !== heroIndex) return;
  clip.classList.add('is-on');
  heroEverPlayed = true;
  // sahna ko'rindi — aynan 7 soniya ko'rsatamiz, oxirida keyingi sahnani oldindan yuklaymiz
  clearTimeout(heroTimer);
  clearTimeout(clipTimer);
  heroTimer = setTimeout(nextSlide, HERO_CLIP_SEC * 1000);
  const next = (heroIndex + 1) % featured.length;
  if (next !== heroIndex) clipTimer = setTimeout(() => startClip(next), Math.max(0, HERO_CLIP_SEC * 1000 - HERO_PRELOAD_MS));
}

addEventListener('message', e => {
  if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(e.origin)) return;
  let data;
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
  const state = data?.info?.playerState ?? (data?.event === 'onStateChange' ? data.info : undefined);
  if (state === undefined) return;
  document.querySelectorAll('.hero-clip').forEach(clip => {
    const f = clip.querySelector('iframe');
    if (!f || f.contentWindow !== e.source) return;
    if (state === 1) {
      if (clip._playingSince) return;
      clip._playingSince = Date.now();
      clearTimeout(clip._revealT);
      clip._revealT = setTimeout(() => {
        if (!clip.isConnected || !clip._playingSince) return;
        clip._ready = true;
        showClip(clip);   // joriy slayd bo'lsa — darhol; bo'lmasa slayd kelganda ochiladi
      }, clip._slide === heroIndex ? 150 : HERO_REVEAL_AFTER_PLAY);   // joriy slayd — darhol, oldindan yuklangani — belgilar yo'qolgach
    } else if (state === 0 || state === 2 || state === 3) {
      clearTimeout(clip._revealT);
      const wasOn = clip.classList.contains('is-on');
      clip._playingSince = 0;
      clip._ready = false;
      clip.classList.remove('is-on');
      // ko'rinib turgan sahna to'xtasa — YouTube belgisini ko'rsatmay, keyingi slaydga
      if (wasOn && clip._slide === heroIndex) {
        clearTimeout(heroTimer);
        heroTimer = setTimeout(nextSlide, 600);
      }
    }
  });
});

function startClip(i) {
  const m = featured[i], id = heroYtId(m);
  const bg = document.querySelector(`.hero-slide[data-i="${i}"] .hero-bg`);
  if (!id || !bg || document.hidden || bg.querySelector('.hero-clip')) return;
  const clip = document.createElement('div');
  clip.className = 'hero-clip';
  clip._slide = i;
  const s = HERO_CLIP_START;
  const origin = encodeURIComponent(location.origin);
  // «end» berilmaydi — tugash ekrani chiqmasin, sahnani o'zimiz yopamiz
  clip.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&start=${s}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${origin}"
    allow="autoplay; encrypted-media" tabindex="-1" title="" aria-hidden="true"></iframe>
    <span class="hero-clip-shade" aria-hidden="true"></span>`;
  bg.appendChild(clip);
  sizeClip(clip);
  // YouTube holat xabarlarini yuborishi uchun «tinglayapman» deymiz
  const f = clip.querySelector('iframe');
  f.addEventListener('load', () => {
    const ping = () => f.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hero' }), '*');
    ping(); setTimeout(ping, 500); setTimeout(ping, 1500);
  });
}

addEventListener('resize', () => document.querySelectorAll('.hero-clip').forEach(sizeClip));

function restartHeroTimer() {
  clearTimeout(heroTimer);
  if (!featured.length) return;
  const withClip = heroClipsOn && !!heroYtId(featured[heroIndex]);
  // oldindan yuklangan (joriy slaydga tegishli) sahnani saqlaymiz, qolganlarini yopamiz
  const ready = withClip ? document.querySelector(`.hero-slide[data-i="${heroIndex}"] .hero-clip`) : null;
  stopClip(ready);
  const d = withClip ? HERO_CLIP_SEC * 1000 : HERO_DELAY;

  const dot = document.querySelector('.hero-dots button.is-active');
  if (dot) {
    dot.style.setProperty('--hero-delay', d / 1000 + 's');
    dot.classList.remove('is-active'); void dot.offsetWidth; dot.classList.add('is-active');
  }

  if (!withClip) { heroTimer = setTimeout(nextSlide, d); return; }
  const i = heroIndex;
  if (ready && (ready._ready || ready._playingSince)) { showClip(ready); return; }
  if (!ready) clipTimer = setTimeout(() => startClip(i), 50);
  // video boshlanmasa — zaxira rasm ko'rsatib, keyingisiga o'tamiz
  heroTimer = setTimeout(() => {
    // avtoijro umuman ishlamasa (masalan, quvvat tejash rejimi) — slayderda rasmlar ko'rinadi
    if (!heroEverPlayed) document.querySelectorAll('.hero-bg.video-only').forEach(b => b.classList.add('no-video'));
    nextSlide();
  }, HERO_CLIP_FALLBACK);
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
