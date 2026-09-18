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
let heroSound = false;   // treyler ovozi (foydalanuvchi tugmani bosguncha o'chiq)
// har bir slayd (treyler sahnasi) davomiyligi — admin → «Sayt»da 3 soniyadan 1 daqiqagacha
const HERO_DELAY = Math.min(60, Math.max(3, Number(SITE_CFG.hero && SITE_CFG.hero.delay) || 7)) * 1000;
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
    return `
    <div class="hero-slide${i === heroIndex ? ' is-active' : ''}" data-i="${i}">
      <div class="hero-bg${wideArt ? ' is-wide' : ''}${ytId && !matchMedia('(prefers-reduced-motion: reduce)').matches ? ' video-only' : ''}" style="background-image:${wideArt ? `url('${esc(wideSrc)}'), ${backdropCSS(m)}` : backdropCSS(m)}"${ytId && !uzArt ? ` data-yt="${ytId}"` : ''}></div>
      ${m.poster && !wideArt ? `<div class="hero-art"><img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></div>` : ''}
      <div class="hero-inner">
        <div class="wrap">
          <div class="hero-content">
            <span class="hero-badge">DezoMax ${LANG === 'uz' ? 'tanlovi' : 'выбирает'}</span>
            <h1>${esc(title(m))}</h1>
            <div class="hero-actions">
              <a class="btn btn-primary hero-watch" href="movie.html?id=${m.id}&play=1">${ICONS.play}<span>${LANG === 'uz' ? 'Filmni tomosha qilish' : 'Смотреть фильм'}</span></a>
              ${ytId ? `<button class="hero-sound${heroSound ? ' is-on' : ''}" type="button" aria-label="${LANG === 'uz' ? 'Ovoz' : 'Звук'}">${heroSoundIcon()}</button>` : ''}
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
    if (document.hidden) {
      clearTimeout(heroTimer); stopClip();
      // umumiy ovozli pleyer ham to'xtasin (ilova fonga o'tganda ovoz eshitilmasin)
      if (heroShared) { ytCmd(heroShared, 'pauseVideo'); heroShared.classList.remove('is-on'); heroShared._slide = -1; }
    } else restartHeroTimer();
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
const HERO_CLIP_SEC = HERO_DELAY / 1000;   // treyler sahnasi qancha ko'rinadi (admin sozlaydi)
const HERO_CLIP_START = 30;     // treyler boshidagi studiya logotiplarini o'tkazib yuboramiz
const heroClipsOn = !matchMedia('(prefers-reduced-motion: reduce)').matches;
let clipTimer = null;

const heroYtId = m => (String(m?.trailer || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1];

function slideDuration(i) {
  return heroClipsOn && heroYtId(featured[i]) ? (HERO_IMAGE_SEC + HERO_CLIP_SEC) * 1000 : HERO_DELAY;
}

/* ---------- Treyler ovozi ----------
   Ovozsiz holatda har bir slayd o'z pleyerida, keyingisi oldindan yuklanadi (silliq almashadi).
   Ovoz yoqilganda esa telefonda bir vaqtda ikkita pleyer ishlasa ovozli video to'xtab qoladi —
   shuning uchun bitta UMUMIY pleyerga o'tamiz: u slaydlar videosini loadVideoById bilan o'zi almashtiradi,
   ovoz yo'qolmaydi. */

let heroShared = null;   // umumiy pleyer (ovoz yoqilgach paydo bo'ladi)

function ytCmd(clip, func, args = []) {
  clip?.querySelector('iframe')?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
}

function heroSoundIcon() {
  return heroSound
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.hero-sound');
  if (!btn) return;
  setHeroSound(!heroSound);
  if (heroShared) { applySound(heroShared); return; }
  const cur = document.querySelector(`.hero-slide[data-i="${heroIndex}"] .hero-clip`);
  if (heroSound && heroClipsOn && heroYtId(featured[heroIndex])) createShared(cur);
  else applySound(cur);
});

function setHeroSound(on) {
  heroSound = on;
  document.querySelectorAll('.hero-sound').forEach(b => {
    b.innerHTML = heroSoundIcon();
    b.classList.toggle('is-on', heroSound);
  });
}

function applySound(clip) {
  if (!clip) return;
  if (!heroSound) { ytCmd(clip, 'mute'); return; }
  ytCmd(clip, 'unMute'); ytCmd(clip, 'setVolume', [100]);
  verifySound(clip);
}

/* Ovoz haqiqatda yoqilganini pleyer xabarlaridan (muted/volume) tekshiramiz — bo'lmasa qayta yuboramiz */
function verifySound(clip, tries = 4) {
  clearTimeout(clip._verifyT);
  clip._verifyT = setTimeout(() => {
    if (!clip.isConnected || !heroSound) return;
    if (clip._muted === false && clip._volume > 0) return;
    ytCmd(clip, 'unMute'); ytCmd(clip, 'setVolume', [100]);
    if (tries > 1) verifySound(clip, tries - 1);
  }, 700);
}

function clipIframe(id, { mute, start }) {
  const origin = encodeURIComponent(location.origin);
  // «end» berilmaydi — tugash ekrani chiqmasin, sahnani o'zimiz yopamiz
  return `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${mute ? 1 : 0}&controls=0&start=${start}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${origin}"
    allow="autoplay; encrypted-media" tabindex="-1" title="" aria-hidden="true"></iframe>
    <span class="hero-clip-shade" aria-hidden="true"></span>`;
}

function listenClip(clip) {
  const f = clip.querySelector('iframe');
  f.addEventListener('load', () => {
    // YouTube holat xabarlarini yuborishi uchun «tinglayapman» deymiz
    const ping = () => f.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hero' }), '*');
    ping(); setTimeout(ping, 500); setTimeout(ping, 1500);
  });
}

/* Umumiy ovozli pleyer: joriy sahna ko'rinib turgan joyidan (vaqtidan) davom etadi.
   U o'ynay boshlaguncha eski (ovozsiz) sahna ko'rinib turadi, keyin ustiga silliq chiqadi. */
function createShared(cur) {
  const hero = document.getElementById('hero');
  const id = heroYtId(featured[heroIndex]);
  if (!hero || !id) return;
  const sp = document.createElement('div');
  sp.className = 'hero-clip hero-clip-shared';
  sp._shared = true;
  sp._slide = heroIndex;
  const start = Math.max(HERO_CLIP_START, Math.floor((cur && cur._time) || HERO_CLIP_START) + 1);
  sp.innerHTML = clipIframe(id, { mute: false, start });
  hero.appendChild(sp);
  hero.classList.add('has-shared');
  heroShared = sp;
  listenClip(sp);
  verifySound(sp, 8);
  // brauzer ovozli ijroga ruxsat bermasa — umumiy pleyerni olib tashlab, eski sahnada ovozni yoqib ko'ramiz
  sp._failT = setTimeout(() => {
    if (sp._playingSince) return;
    sp.remove();
    heroShared = null;
    hero.classList.remove('has-shared');
    applySound(cur);
  }, 6000);
}

function sharedLoad(i) {
  const sp = heroShared, id = heroYtId(featured[i]);
  if (!sp || !id) return;
  clearTimeout(sp._revealT);
  sp._slide = i;
  sp._playingSince = 0;
  sp._loadAt = Date.now();
  sp.classList.remove('is-on');   // yuklanish belgisi ko'rinmasin — video o'ynaguncha yashirin
  ytCmd(sp, 'loadVideoById', [{ videoId: id, startSeconds: HERO_CLIP_START }]);
  applySound(sp);
}

function stopClip(keep) {
  clearTimeout(clipTimer);
  document.querySelectorAll('.hero-clip').forEach(c => {
    if (c === keep || c === heroShared) return;
    ytCmd(c, 'mute'); ytCmd(c, 'pauseVideo');   // yopilayotgan sahna ovozi eshitilib qolmasin
    c.classList.remove('is-on');
    setTimeout(() => c.remove(), 600);
  });
}

function sizeClip(clip) {
  if (window.CSS && CSS.supports('width: 1cqw')) return;   // o'lcham CSS'da (container units) — o'lchash shart emas
  // eski brauzerlar uchun: video blokni to'liq qoplaydi, qora hoshiyalar ko'rinmas qismga tushadi
  const r = clip.getBoundingClientRect();
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
  applySound(clip);
  heroEverPlayed = true;
  if (clip === heroShared) {
    clearTimeout(clip._failT);
    stopClip(heroShared);   // eski ovozsiz sahnalar kerak emas (ular o'chirilgach ham o'ynamaydi)
  }
  // sahna ko'rindi — aynan 7 soniya ko'rsatamiz
  clearTimeout(heroTimer);
  clearTimeout(clipTimer);
  heroTimer = setTimeout(nextSlide, HERO_CLIP_SEC * 1000);
  // ovozsiz rejimda keyingi sahnani oldindan yuklaymiz (umumiy pleyerda — kerak emas)
  const next = (heroIndex + 1) % featured.length;
  if (!heroShared && next !== heroIndex) clipTimer = setTimeout(() => startClip(next), Math.max(0, HERO_CLIP_SEC * 1000 - HERO_PRELOAD_MS));
}

addEventListener('message', e => {
  if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(e.origin)) return;
  let data;
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
  const state = data?.info?.playerState ?? (data?.event === 'onStateChange' ? data.info : undefined);
  document.querySelectorAll('.hero-clip').forEach(clip => {
    const f = clip.querySelector('iframe');
    if (!f || f.contentWindow !== e.source) return;
    const info = data?.info && typeof data.info === 'object' ? data.info : null;
    if (info) {
      if (typeof info.muted === 'boolean') clip._muted = info.muted;
      if (typeof info.volume === 'number') clip._volume = info.volume;
      if (typeof info.currentTime === 'number') clip._time = info.currentTime;
    }
    if (state === undefined) return;
    clip._lastState = state;
    // umumiy pleyerda yangi video yuklanayotganda eski videodan kelgan kechikkan holatlarni e'tiborsiz qoldiramiz
    if (clip._shared && clip._loadAt && Date.now() - clip._loadAt < 400) return;
    if (state === 1) {
      if (clip._playingSince) return;
      clip._playingSince = Date.now();
      clearTimeout(clip._revealT);
      // joriy slayd — darhol (umumiy pleyerda biroz kutib — yuklanish belgisi yo'qolsin); oldindan yuklangani — belgilar yo'qolgach
      const wait = clip._slide !== heroIndex ? HERO_REVEAL_AFTER_PLAY : clip._shared ? 500 : 150;
      clip._revealT = setTimeout(() => {
        if (!clip.isConnected || !clip._playingSince) return;
        clip._ready = true;
        showClip(clip);
      }, wait);
    } else if (state === 3 && clip._shared && clip.classList.contains('is-on')) {
      // ovozli pleyerda qisqa bufer — sahnani yopib almashtirmaymiz, davom etishini kutamiz
    } else if (state === 0 || state === 2 || state === 3) {
      clearTimeout(clip._revealT);
      const wasOn = clip.classList.contains('is-on');
      clip._playingSince = 0;
      clip._ready = false;
      clip.classList.remove('is-on');
      if (clip._shared && state === 2) ytCmd(clip, 'playVideo');
      // ko'rinib turgan sahna to'xtasa — YouTube belgisini ko'rsatmay, keyingi slaydga
      if (wasOn && clip._slide === heroIndex && (state !== 2 || !clip._shared)) {
        clearTimeout(heroTimer);
        heroTimer = setTimeout(nextSlide, 600);
      }
    }
  });
});

function startClip(i) {
  const m = featured[i], id = heroYtId(m);
  const bg = document.querySelector(`.hero-slide[data-i="${i}"] .hero-bg`);
  if (!id || !bg || document.hidden || heroShared || bg.querySelector('.hero-clip')) return;
  const clip = document.createElement('div');
  clip.className = 'hero-clip';
  clip._slide = i;
  clip.innerHTML = clipIframe(id, { mute: true, start: HERO_CLIP_START });
  bg.appendChild(clip);
  sizeClip(clip);
  listenClip(clip);
}

addEventListener('resize', () => document.querySelectorAll('.hero-clip').forEach(sizeClip));

function restartHeroTimer() {
  clearTimeout(heroTimer);
  if (!featured.length) return;
  const withClip = heroClipsOn && !!heroYtId(featured[heroIndex]);
  // oldindan yuklangan (joriy slaydga tegishli) sahnani saqlaymiz, qolganlarini yopamiz
  const ready = withClip && !heroShared ? document.querySelector(`.hero-slide[data-i="${heroIndex}"] .hero-clip`) : null;
  stopClip(ready);
  const d = withClip ? HERO_CLIP_SEC * 1000 : HERO_DELAY;

  const dot = document.querySelector('.hero-dots button.is-active');
  if (dot) {
    dot.style.setProperty('--hero-delay', d / 1000 + 's');
    dot.classList.remove('is-active'); void dot.offsetWidth; dot.classList.add('is-active');
  }

  if (!withClip) {
    if (heroShared) { heroShared.classList.remove('is-on'); ytCmd(heroShared, 'pauseVideo'); heroShared._slide = -1; }
    heroTimer = setTimeout(nextSlide, d);
    return;
  }
  const i = heroIndex;
  if (heroShared) {
    if (heroShared._slide !== i) sharedLoad(i);
    else if (heroShared._playingSince) { showClip(heroShared); return; }
  } else {
    if (ready && (ready._ready || ready._playingSince)) { showClip(ready); return; }
    if (!ready) clipTimer = setTimeout(() => startClip(i), 50);
  }
  // video boshlanmasa — keyingisiga o'tamiz
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
/* Kutubxona bo'limlari (doramalar, anime, hind kinolari): ma'lumot mashhurlik tartibida — posterlilarning birinchi 24 tasi */
const libRow = fr => MOVIES.filter(m => m.franchise === fr && m.poster).slice(0, 24);

const ROW_SOURCES = {
  uzbek:    { title: 'row.uzbek',    all: 'catalog.html?watch=uz',        list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)) },
  konsert:  { title: 'row.konsert',  all: 'catalog.html?franchise=konsert', list: () => MOVIES.filter(m => m.franchise === 'konsert').sort((a, b) => yr(b) - yr(a)) },
  trending: { title: 'row.trending', all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)).slice(0, 14) },
  new:      { title: 'row.new',      all: null,                           list: () => [...MOVIES].filter(m => yr(m) && m.franchise !== 'konsert' && m.poster && (m.trailer || m.video)).sort((a, b) => yr(b) - yr(a)).slice(0, 14) },
  dorama:   { title: 'row.dorama',   all: 'catalog.html?franchise=dorama', list: () => libRow('dorama') },
  anime:    { title: 'row.anime',    all: 'catalog.html?franchise=anime',  list: () => libRow('anime') },
  hind:     { title: 'row.hind',     all: 'catalog.html?franchise=hind',   list: () => libRow('hind') },
  marvel:   { title: 'row.marvel',   all: 'catalog.html?franchise=marvel', list: () => MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => yr(a) - yr(b)) },
  dc:       { title: 'row.dc',       all: 'catalog.html?franchise=dc',     list: () => MOVIES.filter(m => m.franchise === 'dc').sort((a, b) => yr(a) - yr(b)) },
  top:      { title: 'row.top',      all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) - rt(a)).slice(0, 14) },
  series:   { title: 'row.series',   all: 'catalog.html?type=serial',     list: () => MOVIES.filter(m => m.type === 'serial').slice(0, 24) },
  cartoons: { title: 'row.cartoons', all: 'catalog.html?type=multfilm',   list: () => MOVIES.filter(m => m.type === 'multfilm').slice(0, 24) },
  custom:   { title: null,           all: null,                           list: row => (row.ids || []).map(id => MOVIES.find(m => m.id === id)).filter(Boolean) }
};

const DEFAULT_ROWS = ['uzbek', 'konsert', 'trending', 'new', 'dorama', 'anime', 'hind', 'marvel', 'dc', 'top', 'series', 'cartoons']
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
