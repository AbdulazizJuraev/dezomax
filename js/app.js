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
    const wideSrc = imgBig(uzArt) || (ytId ? imgBig(`https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`) : null);
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
      // treyler o'chirilgan bo'lsa — hamma o'lchamda kulrang «rasm yo'q» belgisi: YouTube rasmi olib tashlanadi
      const drop = () => { bg.style.backgroundImage = bg.style.backgroundImage.replace(/url\([^)]*i\.ytimg\.com[^)]*\),?\s*/, ''); };
      img.onload = () => {
        if (img.naturalWidth <= 120 && i < tries.length - 1) return test(i + 1);
        if (img.naturalWidth <= 120) return drop();
        if (i > 0) bg.style.backgroundImage = bg.style.backgroundImage.replace(/maxresdefault/, tries[i]);
      };
      img.onerror = () => { if (i < tries.length - 1) test(i + 1); else drop(); };
      img.src = `https://i.ytimg.com/vi_webp/${id}/${tries[i]}.webp`;   // fon bilan bir xil fayl — ikki marta yuklanmaydi
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
  if (!hero || !id || !navigator.onLine) return;
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
  if (!id || !bg || document.hidden || !navigator.onLine || heroShared || bg.querySelector('.hero-clip')) return;
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
  uzbek:    { title: 'row.uzbek',    all: 'catalog.html?watch=uz',        list: () => MOVIES.filter(m => m.franchise === 'uzbek').sort((a, b) => yr(b) - yr(a)).slice(0, 30) },   // qolgani — «Hammasi»
  // kino tahlillari — ruxsat berilgan kanallardan (tools/fetch-yt-meta.js), yangisi oldin
  tahlil:   { title: 'row.tahlil',   all: 'catalog.html?franchise=tahlil', list: () => MOVIES.filter(m => m.franchise === 'tahlil').sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 24) },
  konsert:  { title: 'row.konsert',  all: 'catalog.html?franchise=konsert', list: () => MOVIES.filter(m => m.franchise === 'konsert').sort((a, b) => yr(b) - yr(a)) },
  trending: { title: 'row.trending', all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) * (yr(b) >= 2014 ? 1.1 : 1) - rt(a) * (yr(a) >= 2014 ? 1.1 : 1)).slice(0, 14) },
  new:      { title: 'row.new',      all: null,                           list: () => [...MOVIES].filter(m => yr(m) && m.franchise !== 'konsert' && m.franchise !== 'tahlil' && m.poster && (m.trailer || m.video)).sort((a, b) => yr(b) - yr(a)).slice(0, 14) },
  dorama:   { title: 'row.dorama',   all: 'catalog.html?franchise=dorama', list: () => libRow('dorama') },
  anime:    { title: 'row.anime',    all: 'catalog.html?franchise=anime',  list: () => libRow('anime') },
  hind:     { title: 'row.hind',     all: 'catalog.html?franchise=hind',   list: () => libRow('hind') },
  marvel:   { title: 'row.marvel',   all: 'catalog.html?franchise=marvel', list: () => MOVIES.filter(m => m.franchise === 'marvel').sort((a, b) => yr(a) - yr(b)) },
  dc:       { title: 'row.dc',       all: 'catalog.html?franchise=dc',     list: () => MOVIES.filter(m => m.franchise === 'dc').sort((a, b) => yr(a) - yr(b)) },
  top:      { title: 'row.top',      all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) - rt(a)).slice(0, 14) },
  popular:  { title: 'row.popular',  all: null,                           list: () => [...MOVIES].filter(rt).sort((a, b) => rt(b) - rt(a)).slice(0, 10) },   // TOP 10 — js: initTop10
  series:   { title: 'row.series',   all: 'catalog.html?type=serial',     list: () => MOVIES.filter(m => m.type === 'serial').slice(0, 24) },
  cartoons: { title: 'row.cartoons', all: 'catalog.html?type=multfilm',   list: () => MOVIES.filter(m => m.type === 'multfilm').slice(0, 24) },
  studios:  { title: 'row.studios',  all: null,                           list: () => studiosShown() },   // js: studiosHTML
  custom:   { title: null,           all: null,                           list: row => (row.ids || []).map(id => MOVIES.find(m => m.id === id)).filter(Boolean) }
};

const DEFAULT_ROWS = ['popular', 'uzbek', 'konsert', 'tahlil', 'trending', 'new', 'dorama', 'anime', 'hind', 'marvel', 'dc', 'top', 'series', 'cartoons']
  .map(source => ({ source, visible: true }));

/* ---------- «Seriallar» banneri: hamma seriallar bitta katta banner ostida ----------
   Fonda serialning keng kadri (treyler rasmi), chapda nomi/tavsifi, pastda hamma seriallar
   posterchalari. Har 6 soniyada keyingi serial; posterchani bosib tanlash mumkin. */
const SB_MS = 6000;
let sbTimer = 0;
const sbYt = m => (String(m.trailer || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/) || [])[1];
const sbArt = m => imgBig(m.cover) || (m.poster && m.poster.startsWith('images/uz/') && imgBig(m.poster)) ||
  (sbYt(m) ? imgBig(`https://i.ytimg.com/vi/${sbYt(m)}/maxresdefault.jpg`) : imgBig(m.poster));

function seriesBannerHTML(list, head) {
  return `
    <section class="section sb-section">
      ${head}
      <div class="sb" data-sb>
        <div class="sb-stage">
          ${list.map((m, i) => `<img class="sb-bg${i ? '' : ' is-on'}" ${i ? 'data-src' : 'src'}="${esc(sbArt(m) || '')}" alt="" decoding="async">`).join('')}
        </div>
        <div class="sb-info"></div>
        ${list.length > 1 ? `<div class="sb-thumbs">
          ${list.map((m, i) => `<button type="button" class="sb-thumb${i ? '' : ' is-on'}" data-i="${i}" aria-label="${esc(title(m))}">
            ${m.poster ? `<img src="${esc(imgSmall(m.poster))}" alt="" loading="lazy" decoding="async">` : `<span>${esc(title(m))}</span>`}</button>`).join('')}
        </div>` : ''}
      </div>
    </section>`;
}

function sbInfoHTML(m, n) {
  const meta = [m.year, m.type === 'serial' && m.seasons ? durationText(m) : '', m.rating ? `★ ${m.rating}` : '',
    (m.genres || []).slice(0, 2).map(genreName).join(', ')].filter(Boolean);
  return `
    <span class="sb-kicker">${LANG === 'ru' ? 'Сериалы DezoMax' : 'DezoMax seriallari'} · ${n}</span>
    <h3 class="sb-title">${esc(title(m))}</h3>
    <div class="sb-meta">${meta.map(x => `<span>${esc(x)}</span>`).join('')}</div>
    ${m.desc ? `<p class="sb-desc">${esc(descOf(m))}</p>` : ''}
    <div class="sb-actions">
      <a class="btn btn-primary" href="${movieHref(m)}">${ICONS.play}<span>${LANG === 'ru' ? 'Смотреть' : 'Ko‘rish'}</span></a>
      <a class="btn btn-ghost sb-all" href="catalog.html?type=serial">${LANG === 'ru' ? 'Все сериалы' : 'Barcha seriallar'}</a>
    </div>`;
}

function initSeriesBanner(root, list) {
  clearInterval(sbTimer);
  const sb = root.querySelector('[data-sb]');
  if (!sb) return;
  const bgs = [...sb.querySelectorAll('.sb-bg')], thumbs = [...sb.querySelectorAll('.sb-thumb')];
  const info = sb.querySelector('.sb-info');
  let cur = 0;

  // maxresdefault bo'lmagan treylerlarda YouTube 120×90 kulrang rasm beradi — hq variantiga o'tamiz
  bgs.forEach(img => {
    // maxres yo'q — hq; treyler o'chirilgan (hq ham kulrang belgi) — serialning posteri
    const fix = () => {
      if (!(img.naturalWidth > 0 && img.naturalWidth <= 120)) return;
      if (/maxresdefault/.test(img.src)) img.src = img.src.replace('maxresdefault', 'hqdefault');
      else if (/i\.ytimg\.com/.test(img.src)) { const m = list[bgs.indexOf(img)]; if (m && m.poster) img.src = m.poster; }
    };
    img.addEventListener('load', fix);
    if (img.complete) fix();
  });

  // fonlar faqat kerak bo'lganda yuklanadi (har biri ~300 KB): joriy va keyingisi
  const load = b => { if (b && b.dataset.src) { b.src = b.dataset.src; delete b.dataset.src; } };
  setTimeout(() => load(bgs[1]), 2500);
  const show = i => {
    cur = (i + list.length) % list.length;
    load(bgs[cur]); load(bgs[(cur + 1) % bgs.length]);
    bgs.forEach((b, k) => b.classList.toggle('is-on', k === cur));
    thumbs.forEach((b, k) => b.classList.toggle('is-on', k === cur));
    info.innerHTML = sbInfoHTML(list[cur], list.length);
    info.classList.remove('is-in'); void info.offsetWidth; info.classList.add('is-in');
    const th = thumbs[cur];
    if (th) th.parentElement.scrollTo({ left: th.offsetLeft - th.parentElement.clientWidth / 2 + th.clientWidth / 2, behavior: 'smooth' });
  };
  const restart = () => { clearInterval(sbTimer); if (list.length > 1) sbTimer = setInterval(() => { if (!document.hidden) show(cur + 1); }, SB_MS); };

  thumbs.forEach(b => b.addEventListener('click', () => { show(+b.dataset.i); restart(); }));
  // fonning bo'sh joyini bosish — shu serial sahifasi
  sb.querySelector('.sb-stage').addEventListener('click', () => { location.href = movieHref(list[cur]); });
  show(0);
  restart();
}

/* Qatorda tik (2:3) va yotiq (16:9) kartalar yonma-yon turmasin: ko'pchiligi qanday bo'lsa — hammasi shunday.
   Rasm kesilmaydi — sig'magan joyi o'sha rasmning xira nusxasi bilan to'ladi (css: .row-wide / .row-tall) */
function rowShape(list) {
  const wide = list.filter(m => m.franchise === 'konsert' || m.wide).length;
  if (!wide || wide === list.length) return '';
  return wide * 2 >= list.length ? ' row-wide' : ' row-tall';
}

/* ---------- «Ko'rishni davom ettiring» ----------
   Kino sahifasi to'liq film qayerda to'xtaganini saqlaydi (js/movie.js → dezomax_watch_history).
   Bosh sahifaning eng tepasida: qizil chiziq, qolgan vaqt; bosilsa — o'sha joydan davom etadi; × — qatordan olib tashlash. */
const WATCH_HISTORY_KEY = 'dezomax_watch_history';
function watchHistory() {
  try {
    const hidden = typeof HIDDEN_MOVIES !== 'undefined' ? HIDDEN_MOVIES : [];
    return JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]')
      .filter(x => x && x.id && x.dur > 0 && !x.done && !hidden.includes(x.id))
      .map(x => ({ x, m: MOVIES.find(m => m.id === x.id) }))
      .filter(o => o.m)
      .slice(0, 12);
  } catch { return []; }
}
function continueHTML() {
  const list = watchHistory();
  if (!list.length) return '';
  const ru = LANG === 'ru';
  const left = s => { const m = Math.max(1, Math.round(s / 60)); return m >= 60 ? `${Math.floor(m / 60)} ${ru ? 'ч' : 'soat'} ${m % 60} ${ru ? 'мин' : 'daq'}` : `${m} ${ru ? 'мин' : 'daq.'}`; };
  return `
    <section class="section cw" id="cwSection">
      <div class="section-head"><i class="bar"></i><h2>${ru ? 'Продолжить просмотр' : 'Ko‘rishni davom ettiring'}</h2><div class="row-nav" data-for="cwRow"></div></div>
      <div class="row row-wide" id="cwRow">${list.map(({ x, m }) => {
        const pct = Math.min(100, Math.max(2, x.t / x.dur * 100));
        const part = x.part && typeof partLabel === 'function' ? partLabel(x.part) : x.part ? `${x.part}-qism` : '';
        return `
        <div class="card cw-card${m.franchise === 'konsert' || m.wide ? ' is-wide' : ''}">
          <a class="cw-link" href="${esc(x.path || `movie.html?id=${m.id}`)}">
            <div class="card-poster">
              ${posterHTML(m)}
              <div class="card-overlay is-on"><div class="card-play">${ICONS.play}</div></div>
              <div class="cw-bar"><i style="width:${pct.toFixed(1)}%"></i></div>
            </div>
            <div class="card-body">
              <h3 class="card-title">${esc(title(m))}</h3>
              <div class="card-meta">${[part, `${left(x.dur - x.t)} ${ru ? 'осталось' : 'qoldi'}`].filter(Boolean).join('<i class="dot"></i>')}</div>
            </div>
          </a>
          <button class="cw-del" type="button" data-cw-del="${m.id}" aria-label="${ru ? 'Убрать' : 'Olib tashlash'}">×</button>
        </div>`;
      }).join('')}</div>
    </section>`;
}
function bindContinue(box) {
  box.querySelectorAll('[data-cw-del]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const id = +b.dataset.cwDel;
    try {
      const hist = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || '[]').filter(x => x && x.id !== id);
      localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(hist));
    } catch {}
    const card = b.closest('.cw-card');
    card.remove();
    if (!document.querySelector('#cwRow .cw-card')) document.getElementById('cwSection')?.remove();
  }));
}

function renderRows() {
  const box = document.getElementById('homeRows');
  if (!box) return;
  let rows = (SITE_CFG.rows && SITE_CFG.rows.length) ? SITE_CFG.rows : DEFAULT_ROWS;
  if (!rows.some(r => r.source === 'tahlil')) {
    const at = rows.findIndex(r => r.source === 'konsert');
    rows = [...rows.slice(0, at + 1), { source: 'tahlil', visible: true }, ...rows.slice(at + 1)];
  }
  if (!rows.some(r => r.source === 'studios')) {
    const at = rows.findIndex(r => r.source === 'popular');
    rows = [...rows.slice(0, at + 1), { source: 'studios', visible: true }, ...rows.slice(at + 1)];
  }

  let shown = 0, seriesList = null, hasTop = false;
  box.innerHTML = continueHTML() + rows.map((row, i) => {
    const src = ROW_SOURCES[row.source] || ROW_SOURCES.custom;
    if (row.visible === false) return '';
    const list = src.list(row);
    if (!list.length) return '';
    // har 3 qatordan keyin reklama joyi (js/ads.js; reklama ID'lari bo'lmasa — ko'rinmaydi)
    const ad = ++shown % 3 === 0 ? `<div class="ad-slot" data-ad-slot="home"></div>` : '';
    const title = (row.title && (row.title[LANG] || row.title.uz)) || (src.title ? t(src.title) : '');
    if (row.source === 'studios') return studiosHTML(title) + ad;
    if (row.source === 'popular' && !hasTop) {
      hasTop = true;
      return top10HTML(title) + ad;
    }
    if (row.source === 'series' && !seriesList) {
      seriesList = list;
      return seriesBannerHTML(list, `
        <div class="section-head">
          <i class="bar"></i><h2>${esc(title)}</h2>
          ${src.all ? `<a class="row-all" href="${src.all}">${t('row.seeAll')}</a>` : ''}
        </div>`) + ad;
    }
    return `
      <section class="section">
        <div class="section-head">
          <i class="bar"></i><h2>${esc(title)}</h2>
          ${src.all ? `<a class="row-all" href="${src.all}">${t('row.seeAll')}</a>` : ''}
          <div class="row-nav" data-for="homeRow${i}"></div>
        </div>
        <div class="row${rowShape(list)}" id="homeRow${i}">${list.map(cardHTML).join('')}</div>
      </section>${ad}`;
  }).join('');

  if (typeof Ads !== 'undefined') Ads.fill(box);
  bindContinue(box);
  observeReveals(box);
  initRowNav();
  if (hasTop) initTop10(box);
  if (seriesList) initSeriesBanner(box, seriesList);
  else clearInterval(sbTimer);
}

/* ---------- Kinostudiyalar (ro'yxat — js/common.js STUDIOS) ----------
   Hammasi ko'rinadi. Marvel — o'z sahifasi; qolganlari — rasmiy kanaldan treylerlari kelgach ochiladi,
   ungacha xira holda «Tez orada» (admin → Kanallar → Kinostudiyalar). Treylerlari borlari birinchi. */
const studioReady = s => !!s.href || MOVIES.some(m => m.franchise === s.key && m.ch);
const studiosShown = () => [...STUDIOS].sort((a, b) => studioReady(b) - studioReady(a));

function studiosHTML(title) {
  const list = studiosShown();
  if (!list.length) return '';
  const soon = LANG === 'ru' ? 'Скоро' : 'Tez orada';
  return `
    <section class="section studios">
      <div class="section-head"><i class="bar"></i><h2>${esc(title)}</h2><div class="row-nav" data-for="studiosRow"></div></div>
      <div class="row studios-row" id="studiosRow">${list.map(s => studioReady(s) ? `
        <a class="studio-card is-${s.key}" href="${studioHref(s)}" style="--studio:${s.bg}" aria-label="${esc(s.name)}">
          <span class="studio-logo">${s.logo}</span>
          <span class="studio-name">${esc(s.name)}</span>
        </a>` : `
        <span class="studio-card is-soon is-${s.key}" style="--studio:${s.bg}" aria-label="${esc(s.name)} — ${soon}">
          <span class="studio-logo">${s.logo}</span>
          <span class="studio-name">${esc(s.name)}</span>
          <em class="studio-soon">${soon}</em>
        </span>`).join('')}
      </div>
    </section>`;
}

/* ---------- TOP 10: eng ko'p ko'rilganlar (kunlik / haftalik / oylik) ----------
   Ko'rishlar to'lov serverida sanaladi (js/social.js → POST /view, GET /top). Server javob bermasa yoki
   ko'rishlar hali kam bo'lsa — qolgan joylar reyting bo'yicha to'ldiriladi («Real vaqt» belgisi faqat haqiqiy ma'lumotda). */
const TOP_TABS = [[1, 'top.day'], [7, 'top.week'], [30, 'top.month']];
let topDays = 1;
const topCache = new Map();

function top10HTML(title) {
  return `
    <section class="section t10" id="top10">
      <div class="wrap">
        <div class="t10-head">
          <div>
            <span class="t10-kicker" id="t10Kicker" hidden>${t('top.kicker')}</span>
            <h2>${esc(title)}</h2>
            <p class="t10-sub">${t('top.sub')}</p>
          </div>
          <div class="t10-side">
            <div class="t10-tabs" role="tablist">${TOP_TABS.map(([d, k]) => `<button type="button" role="tab" data-days="${d}" class="${d === topDays ? 'is-on' : ''}" aria-selected="${d === topDays}">${t(k)}</button>`).join('')}</div>
            <div class="row-nav t10-nav" data-for="t10Row"></div>
          </div>
        </div>
      </div>
      <div class="wrap t10-wrap">
        <div class="row t10-row" id="t10Row">${t10CardsHTML(ROW_SOURCES.popular.list())}</div>
      </div>
    </section>`;
}

function t10CardsHTML(list) {
  return list.slice(0, 10).map((m, i) => `
    <a class="t10-card${i < 3 ? ' is-top' : ''}" href="${movieHref(m)}">
      <span class="t10-num" aria-hidden="true">${i + 1}</span>
      <span class="t10-poster">
        ${posterHTML(m)}
        ${i === 0 ? `<em class="t10-badge">TOP 1</em>` : ''}
        <span class="badge-type">${typeName(m.type)}</span>
      </span>
      <span class="t10-title">${esc(title(m))}</span>
    </a>`).join('');
}

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

async function loadTop10(root) {
  const row = root.querySelector('#t10Row');
  if (!row) return;
  const byId = new Map(MOVIES.map(m => [m.id, m]));
  const days = topDays;
  const real = (await topIds(days)).map(id => byId.get(id)).filter(Boolean);
  if (days !== topDays) return;   // boshqa tab tanlandi
  // kam bo'lsa — hamma vaqtdagi ko'rishlar, keyin reyting bo'yicha to'ldiramiz
  const all = real.length < 10 ? (await topIds('all')).map(id => byId.get(id)).filter(Boolean) : [];
  const list = [...new Set([...real, ...all, ...ROW_SOURCES.popular.list()])].slice(0, 10);
  root.querySelector('#t10Kicker').hidden = !real.length;
  row.innerHTML = t10CardsHTML(list);
  row.scrollLeft = 0;
}

function initTop10(root) {
  const box = root.querySelector('#top10');
  if (!box) return;
  box.querySelectorAll('[data-days]').forEach(b => b.addEventListener('click', () => {
    topDays = +b.dataset.days;
    box.querySelectorAll('[data-days]').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
    loadTop10(box);
  }));
  loadTop10(box);
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

/* kino sahifasidan orqaga qaytilganda sahifa keshdan ochiladi — «Ko'rishni davom ettiring» yangilansin */
addEventListener('pageshow', e => {
  if (!e.persisted) return;
  const box = document.getElementById('homeRows');
  if (!box) return;
  document.getElementById('cwSection')?.remove();
  const html = continueHTML();
  if (html) { box.insertAdjacentHTML('afterbegin', html); bindContinue(box); initRowNav(); }
});
