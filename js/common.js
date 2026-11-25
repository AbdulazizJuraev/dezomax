/* ============================================================
   DezoMax — umumiy funksiyalar / общие функции
   Barcha sahifalarda ishlatiladi.
   ============================================================ */

/* ---------- Yengil rejim (ilova va telefon/planshet) — 2026-11-18, «ilovada qotmoqda» ----------
   html.dzx-lite: blur (backdrop-filter) yo'q, doimiy aylanuvchi bloklar to'xtaydi (qo'l bilan suriladi),
   treyler kadrlari almashmaydi. Kompyuterda (sichqoncha) — to'liq ko'rinish. */
(function () {
  try {
    const app = /DezoMaxApp|; wv\)/.test(navigator.userAgent) || !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
    const touch = matchMedia('(hover: none), (pointer: coarse)').matches;
    if (app || touch) document.documentElement.classList.add('dzx-lite');
    if (app) document.documentElement.classList.add('dzx-app');
  } catch (e) {}
})();

/* ---------- Android ilovasi ----------
   Ilova saytni internetdan ochadi — ilovaga xos qo'shimchalar (orqaga tugmasi, bildirishnomalar,
   gorizontal video) faqat ilova ichida, sahifa skriptlaridan keyin yuklanadi. */
// (yashirin iframe ichida emas — js/offline-pack.js sport sahifasini shunday ochadi; aks holda orqaga tugmasi ikki marta ulanardi)
if (window.top === window && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
  const v = ((document.currentScript && document.currentScript.src) || '').split('?')[1] || '';
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('script');
    s.src = 'js/app-native.js' + (v ? '?' + v : '');
    document.body.appendChild(s);
  });
}

/* Kartalardagi rasmiy posterlar — admin → Sayt → «Kartalarga rasmiy posterlar (TMDB)» (js/site-config.js → SITE_CONFIG.posters).
   Avvalgi YouTube kadri gorizontal kartalar va fon uchun «cover» bo'lib qoladi. */
function dzxPosters() {
  const P = typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG && SITE_CONFIG.posters;
  if (!P || typeof MOVIES === 'undefined') return;
  // qisqa shakl: "/abc.jpg" — TMDB w342 manzili (fayl kichik bo'lsin); to'liq manzil ham qabul qilinadi
  for (const m of MOVIES) {
    const v = m && P[m.id];
    const p = v && (/^https?:/.test(v) ? v : 'https://image.tmdb.org/t/p/w342' + v);
    if (!p || m.poster === p) continue;
    if (!m.cover && m.poster) m.cover = m.poster;
    m.poster = p;
    m.wide = false;          // endi haqiqiy tik poster bor — karta tik (keng kartada tik rasm qirqilib qolardi)
  }
}
dzxPosters();

/* Ba'zi qurilmalarda (Fold) suzuvchi elementlar (fixed) ko'rinadigan ekrandan kengroq chiqib ketadi:
   ko'rinadigan kenglikni o'lchab, pastki panel va sarlavhani unga moslaymiz (css: html[data-fitw]) */
(function () {
  const vv = window.visualViewport;
  if (!vv) return;
  const de = document.documentElement;
  const fit = () => {
    const w = Math.round(vv.width), cw = de.clientWidth;
    if (w > 0 && cw - w > 1) { de.style.setProperty('--fit-w', w + 'px'); de.setAttribute('data-fitw', ''); }
    else { de.style.removeProperty('--fit-w'); de.removeAttribute('data-fitw'); }
  };
  fit();
  vv.addEventListener('resize', fit);
  addEventListener('resize', fit);
  addEventListener('load', fit);
})();

/* ---------- Guruhlar (qismlar) ----------
   Admin → «Guruhlar»: bir nechta video bitta kartaga yig'iladi. Guruh kartasi — 1-qism kinosi,
   unda parts: [1-qism id, 2-qism id, ...]. Qolgan qismlar ro'yxatlardan chiqariladi (PART_MOVIES'da
   saqlanadi) va kino sahifasida «1-qism, 2-qism…» tugmalari orqali ochiladi. Admin'da hammasi ko'rinadi. */
const PART_OF = new Map();      // qism id -> { parent: guruh kartasi id, n: qism raqami (1 dan) }
const PART_MOVIES = new Map();  // ro'yxatlardan chiqarilgan qismlar (id -> kino)
// bosh sahifa to'liq ro'yxatni keyin yuklasa (js/v4.js dzxLoadFull) — qayta hisoblanadi
function buildParts() {
  try {
    if (typeof MOVIES === 'undefined') return;
    PART_OF.clear(); PART_MOVIES.clear();
    const ids = new Set(MOVIES.map(m => m.id));
    for (const m of MOVIES) {
      if (!Array.isArray(m.parts) || m.parts.length < 2 || PART_OF.has(m.id)) continue;
      m.parts.forEach((id, i) => { if (id !== m.id && ids.has(id) && !PART_OF.has(id)) PART_OF.set(id, { parent: m.id, n: i + 1 }); });
    }
    const page = location.pathname.split('/').pop() || 'index.html';
    if (page === 'admin.html' || (document.body && document.body.classList.contains('page-admin'))) return;
    // bir o'tishda (splice sikli 50 000+ kinoda telefonni soniyalab band qilardi)
    let w = 0;
    for (let i = 0; i < MOVIES.length; i++) {
      const m = MOVIES[i];
      if (PART_OF.has(m.id)) PART_MOVIES.set(m.id, m); else MOVIES[w++] = m;
    }
    MOVIES.length = w;
  } catch (e) {}
}
buildParts();

/* Guruh kartasining qismlari tartibda (guruh bo'lmasa — bo'sh ro'yxat) */
function partsOf(m) {
  // ixcham qismlar (YouTube kanal seriallari, js/data-channels.js): eps: [[youtubeId, daqiqa], ...]
  if (m && Array.isArray(m.eps) && m.eps.length) {
    // 3-element (ixtiyoriy) — bo'lim: mavsum raqami yoki 'ep' (qismlar), 'sb' (to'plamlar), 'etc' (boshqa qismlar)
    return m.eps.map(([yt, min, sec]) => ({ id: m.id, title: m.title, sec, video: 'https://www.youtube.com/watch?v=' + yt, cover: 'https://i.ytimg.com/vi/' + yt + '/maxresdefault.jpg', duration: min || undefined, source: m.source, audio: m.audio }));
  }
  if (!m || !Array.isArray(m.parts) || m.parts.length < 2) return [];
  const list = m.parts.map(id => id === m.id ? m : PART_MOVIES.get(id) || MOVIES.find(x => x.id === id)).filter(Boolean);
  // guruh kartasining o'zida video bo'lmasa (masalan, faqat treylerli asl kino) — u qism emas, faqat muqova
  const real = list.filter(p => p !== m || hasFilm(m));
  return real.length ? real : list;
}

/* ---------- Saytda ko'rinadigan kinolar ----------
   Filmi yoki treyleri bor hamma kino ko'rinadi (Marvel treylerlari ham — kartada «Treyler» belgisi).
   Na videosi, na treyleri bo'lmagan yozuvlar (bo'sh katalog kartalari) ro'yxatlardan chiqariladi. */
/* Kanal videolari (kino tahlillari — FarZidGuy va h.k.) kino emas: faqat o'z bo'limida («Kino tahlillari»),
   bosh sahifa pastida va qidiruvda kinolardan keyin; katalog, «O'xshash kinolar», TOP-10 — faqat kinolar */
const isExtraVideo = m => !!m && m.franchise === 'tahlil';
/* Faqat treyleri bor (to'liq kinosi yo'q) yozuvlar — faqat «Treylerlar» bo'limida (catalog.html?watch=trailer), boshqa joyda ko'rinmaydi (2026-11-19) */
const isTrailerOnly = m => !!m && !m.video && !!m.trailer && !(Array.isArray(m.parts) && m.parts.length) && !(Array.isArray(m.eps) && m.eps.length);
/* Kinoning tili (ovozi): audio (YouTube kanallar, Telegram), lang (RuTube), o'zbek kinolari — 'uz' */
const audioLang = m => (m && (m.audio || m.lang || (m.franchise === 'uzbek' ? 'uz' : ''))) || '';
/* «Rus tilidagi kinolar», «Ingliz tilidagi kinolar» (bosh sahifa qatori, catalog.html?lang=ru|en): to'liq kino, tahlil emas */
const LANG_ROWS = { ru: ['Rus tilidagi kinolar', 'Фильмы на русском'], en: ['Ingliz tilidagi kinolar', 'Фильмы на английском'] };
const langFilms = (list, l) => list.filter(m => audioLang(m) === l && m.video && !isExtraVideo(m) && m.type !== 'serial');

/* Bosh sahifa slayderi: faqat admin tanlagan kinolar (25 tagacha), faqat to'liq filmlar — treylerlar chiqmaydi.
   Sayt o'zidan hech narsa qo'shmaydi (foydalanuvchi so'rovi, 2026-10-06). Admin hech narsa tanlamagan bo'lsa —
   rasmiy kanallardagi 5 ta o'zbek filmi (slayder bo'sh qolmasin).
   js/app.js (slayder), js/role.js («Kim tomosha qiladi?» foni) va admin («Rasmiy posterlar») ishlatadi. */
const HERO_MAX = 40;   // karuselda kamida 30 ta (foydalanuvchi so'rovi, 2026-10-13)
/* Slayder kinosi: saytdagi ro'yxatda bo'lmasa ham (videosiz kartalar ro'yxatdan olib tashlanadi) — admin qo'shgan nusxasidan.
   Admin o'zi tanlagan kino slayderda albatta chiqadi (videosi yo'q bo'lsa — «Batafsil») */
const heroMovie = id => MOVIES.find(m => m.id === id)
  || (typeof CUSTOM_MOVIES !== 'undefined' && CUSTOM_MOVIES.find(m => m.id === id))
  || (window.BASE_MOVIES && window.BASE_MOVIES.find(m => m.id === id)) || null;

/* Bolalar rejimi: «Bolalar» roli yoki «Mehmon → 0–6 yosh» (js/role.js) */
function kidsMode() {
  try {
    const u = JSON.parse(localStorage.getItem('dezomax_user') || 'null');
    const p = u && u.uid ? JSON.parse(localStorage.getItem('dezomax_profile_' + u.uid) || 'null') : null;
    return false && !!p && (p.role === 'child' || (p.role === 'guest' && p.guestAge === '0'));   // rol tanlovi o'chirildi (2026-11-18)
  } catch { return false; }
}
/* Bolalar slayderi: admin → Sayt → «Bolalar slayderi» (hero.kidsIds); tanlanmagan bo'lsa — YouTube'dagi multfilmlar */
function kidsHero(kidsIds) {
  const picked = (kidsIds || []).map(heroMovie).filter(m => m && watchStatus(m) !== 'trailer');
  if (picked.length) return picked.slice(0, HERO_MAX);
  return MOVIES.filter(m => m.type === 'multfilm' && /youtube\.com|youtu\.be/.test(m.video || '')).slice(0, HERO_MAX);
}
function heroCompose(picked) {
  const films = picked.filter(m => m && watchStatus(m) !== 'trailer').slice(0, HERO_MAX);
  if (films.length) return films;
  const newest = (x, y) => (y.year || 0) - (x.year || 0) || (y.addedAt || 0) - (x.addedAt || 0);
  return MOVIES.filter(m => (m.ch === 'rizanova' || m.ch === 'uzbekkinoofficial') && m.type === 'film'
    && m.meta && m.desc && (m.desc.uz || '').length > 60).sort(newest).slice(0, 5);
}

function hasFilm(m) { return !!(m && m.video && String(m.video).trim()); }
// ro'yxatdan keraksizlarini bir o'tishda olib tashlash (splice siklisiz)
const dzxKeep = ok => { let w = 0; for (let i = 0; i < MOVIES.length; i++) if (ok(MOVIES[i])) MOVIES[w++] = MOVIES[i]; MOVIES.length = w; };
function dzxVisible() {
  try {
    if (typeof MOVIES === 'undefined') return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const admin = page === 'admin.html' || (document.body && document.body.classList.contains('page-admin'));
    // Marvel sahifasi — treyleri bor filmlar ham kerak (ma'lumot sahifasi, film ko'rsatilmaydi)
    if (admin || page === 'movie.html' || page === 'marvel.html' || window.DZX_ID) return;
    // guruh kartasining o'zida video bo'lmasa ham, qismlaridan birida bo'lsa — ko'rinadi
    // bosh sahifada treylerlar umuman chiqmaydi (foydalanuvchi so'rovi, 2026-10-13) — faqat to'liq kinolar
    // partsOf(m).some(hasFilm) bilan bir xil, lekin id bo'yicha Map (MOVIES.find har kinoda — telefonda 1,4 s edi)
    let byId = null;
    const partFilm = m => {
      if (Array.isArray(m.eps) && m.eps.length) return true;
      if (!Array.isArray(m.parts) || m.parts.length < 2) return false;
      byId = byId || new Map(MOVIES.map(x => [x.id, x]));
      return m.parts.some(id => id !== m.id && hasFilm(PART_MOVIES.get(id) || byId.get(id)));
    };
    dzxKeep(m => hasFilm(m) || !(page === 'index.html' || page === '' || !String(m.trailer || '').trim()) || partFilm(m));

    // "Bola" rolidagi foydalanuvchilar: katalog/qidiruv/bosh sahifada faqat multfilmlar ko'rinadi
    if (page === 'index.html' || page === 'catalog.html' || page === 'search.html') {
      const u = JSON.parse(localStorage.getItem('dezomax_user') || 'null');
      const p = null && u;   // rol tanlovi («Kim tomosha qiladi?») o'chirildi (2026-11-18) — hamma uchun to'liq katalog
      if (p && p.role === 'child') {
        dzxKeep(m => m.type === 'multfilm');
      }
      // "Mehmon" — tanlagan yosh toifasi bo'yicha (js/role.js): kinolarda yosh chegarasi yo'q — janr bo'yicha,
      // kinoga yosh (m.age) kiritilgan bo'lsa — u ham hisobga olinadi
      if (p && p.role === 'guest' && p.guestAge && p.guestAge !== '18') {
        const age = +p.guestAge;
        const BAN = age < 7 ? ['horror', 'thriller', 'crime', 'war', 'romance', 'detective']
          : age < 13 ? ['horror', 'thriller', 'crime', 'war'] : ['horror'];
        const ok = m => {
          if (m.age && +m.age > age) return false;
          const g = m.genres || [];
          if (g.some(x => BAN.includes(x))) return false;
          if (age < 7) return m.type === 'multfilm' || g.includes('animation') || g.includes('family');
          return true;
        };
        dzxKeep(ok);
      }
    }
  } catch (e) {}
}
dzxVisible();
/* Kinolar bo'laklari (js/data-site.js → dzxData) keyin yuklanib MOVIES qayta yig'ilganda — shu tozalashlar yana */
(window.dzxDataHooks = window.dzxDataHooks || []).push(() => { dzxPosters(); buildParts(); dzxVisible(); });

/* ---------- Ikonkalar ---------- */
const ICONS = {
  // pastki panel (telefon, 2026-11-18 maketi): to'ldirilgan oq belgilar
  tbHome:  '<svg viewBox="0 0 24 24" fill="currentColor"><path class="tb-home" d="M12 2.6 1.6 11.9c-.4.4-.1 1 .4 1h2.3V21c0 .6.4 1 1 1h4.2v-6.3h5V22h4.2c.6 0 1-.4 1-1v-8.1h2.3c.5 0 .8-.6.4-1L19.4 9.2V3.6c0-.3-.3-.6-.6-.6h-2c-.3 0-.6.3-.6.6v2.7z"/></svg>',
  tbFilm:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3.5" width="18" height="17"/><path d="M3 7.2h18M3 16.8h18" /><path d="M5.6 5.35h1.6M9.2 5.35h1.6M12.8 5.35h1.6M16.4 5.35h1.6M5.6 18.65h1.6M9.2 18.65h1.6M12.8 18.65h1.6M16.4 18.65h1.6" stroke-width="1.6"/><path class="tb-play" d="M10.3 9.6v4.8l4.1-2.4z" fill="currentColor" stroke="none"/></svg>',
  tbShorts:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"><path class="tb-sh" d="M14.6 3.4 7.9 7.2a3.6 3.6 0 0 0 0 6.3l.8.4-.8.5a3.6 3.6 0 1 0 3.6 6.2l6.7-3.8a3.6 3.6 0 0 0 0-6.3l-.8-.4.8-.5a3.6 3.6 0 1 0-3.6-6.2z"/><path class="tb-play" d="M10.5 9.8v4.4l3.8-2.2z" fill="currentColor" stroke="none"/></svg>',
  tbTv:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="tb-ant" d="M8 2.8 12 6.6l4-3.8"/><rect x="2.5" y="6.6" width="19" height="14.4" rx="3"/><path d="M16.5 6.6V21"/><circle class="tb-dot" cx="19" cy="11" r=".9" fill="currentColor" stroke="none"/><circle class="tb-dot" cx="19" cy="13.8" r=".9" fill="currentColor" stroke="none"/><circle class="tb-dot" cx="19" cy="16.6" r=".9" fill="currentColor" stroke="none"/></svg>',
  tbLive:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle class="lv-c" cx="12" cy="12" r="2.8" fill="currentColor" stroke="none"/><path class="lv-w1" d="M7.6 7.6a6.2 6.2 0 0 0 0 8.8M16.4 7.6a6.2 6.2 0 0 1 0 8.8"/><path class="lv-w2" d="M4.6 4.6a10.4 10.4 0 0 0 0 14.8M19.4 4.6a10.4 10.4 0 0 1 0 14.8"/></svg>',
  play:   '<svg viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>',
  star:   '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 5.9 6.6.95-4.8 4.65 1.14 6.5L12 17.4l-5.84 3.1L7.3 14 2.5 9.35l6.6-.95L12 2.5z"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.7 1.1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
  back:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5M12 7.5v.01"/></svg>',
  left:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  up:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3.5l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
  tv:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M8 3.5l4 3.5 4-3.5"/></svg>',
  series: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6.5" width="14" height="13" rx="2.5"/><path d="M16.5 10.5l5-3v11l-5-3"/><path d="M6 3.5h8"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>',
  ball:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.2"/><path d="M12 6.6l3.9 2.8-1.5 4.6H9.6l-1.5-4.6z"/><path d="M12 2.8v3.8M20.8 9.4l-4.9 0M17.5 20.1l-3.1-5.8M6.5 20.1l3.1-5.8M3.2 9.4l4.9 0"/></svg>',
  more:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M4.5 19.5h15"/></svg>',
  crown:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 7.5l3.4 3.2L12 4.6l5.4 6.1 3.4-3.2-1.6 11.1H4.8z"/></svg>',
  user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20.5c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/></svg>',
  close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  film:   '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M2.5 12h19M2.5 8h4.5M2.5 16h4.5M17 8h4.5M17 16h4.5"/></svg>',
  films:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>',
  shorts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3.2"/><path d="M10.4 9.3v5.4l4.3-2.7z" fill="currentColor"/></svg>',
  empty:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M8.5 11h5"/></svg>'
};

/* ---------- Yordamchi funksiyalar ---------- */

const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const title = m => m.title[LANG] || m.title.uz;
/* Tavsif: emoji/stikerlarsiz (Telegram'dan kelgan matnlarda ko'p bo'ladi), ortiqcha bo'sh joylarsiz */
const stripEmoji = s => String(s || '')
  .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u{FE0F}\u{200D}\u{20E3}\u{1F3FB}-\u{1F3FF}]/gu, '')
  .replace(/[ \t ]{2,}/g, ' ').replace(/ +([,.!?;:])/g, '$1').replace(/^[ \t ]+|[ \t ]+$/gm, '').trim();
// «… YouTube kanalidan» kabi gaplar ko'rsatilmaydi (foydalanuvchi so'rovi, 2026-11-19) — tavsifda faqat kino haqida
const noYtText = s => String(s || '').split(/(?<=[.!?])\s+/).filter(x => !/youtube|ютуб/i.test(x)).join(' ').trim();
const descOf = m => noYtText(stripEmoji(m.desc?.[LANG] || m.desc?.uz || ''));
const countryOf = m => (m.country && (m.country[LANG] || m.country.uz)) || '';   // davlati noma'lum (ruscha kanallar) — ko'rsatilmaydi

function genreName(id) {
  const g = GENRES.find(x => x.id === id);
  return g ? (g[LANG] || g.uz) : id;
}

const typeName = type => t('type.' + type);

/* Ruscha ko'plik shakllari: 1 сезон / 2 сезона / 5 сезонов */
function plural(n, forms) {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return forms[0];
  if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return forms[1];
  return forms[2];
}

const seasonsText = n =>
  LANG === 'ru' ? `${n} ${plural(n, ['сезон', 'сезона', 'сезонов'])}` : `${n} fasl`;

const resultsText = n =>
  LANG === 'ru' ? `${n} ${plural(n, ['результат', 'результата', 'результатов'])}` : `${n} ta natija`;

function durationText(m) {
  const np = Array.isArray(m.eps) && m.eps.length > 1 ? m.eps.length
    : Array.isArray(m.parts) && m.parts.length > 1 ? (partsOf(m).length || m.parts.length) : 0;
  if (np) return LANG === 'ru' ? `${np} ${plural(np, ['серия', 'серии', 'серий'])}` : `${np} qism`;
  if (m.type === 'serial' && m.seasons) return seasonsText(m.seasons);
  if (!m.duration) return '—';
  const h = Math.floor(m.duration / 60), mn = m.duration % 60;
  const soat = LANG === 'uz' ? 'soat' : 'ч';
  if (!h) return `${mn} ${t('movie.min')}`;
  return mn ? `${h} ${soat} ${mn} ${t('movie.min')}` : `${h} ${soat}`;
}

/* Kirill -> lotin (qidiruv ikkala tilda ham ishlashi uchun) */
const CYR_MAP = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'j', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'y',
  ь: '', э: 'e', ю: 'yu', я: 'ya'
};

/* Qidiruv uchun matnni soddalashtirish: registr, o'zbek apostroflari, kirill */
const norm = s => String(s).toLowerCase()
  .replace(/[‘’'`ʻ´]/g, '')
  .replace(/[а-яё]/g, c => (c in CYR_MAP ? CYR_MAP[c] : c))
  .replace(/c(?!h)/g, 'k')   // DiCaprio / ДиКаприо kabi nomlar mos kelishi uchun
  .trim();

/* ---------- Poster ---------- */

/* Poster: rasm ustida, orqasida gradient zaxira.
   Rasm yuklanmasa (o'chirilgan/nomi noto'g'ri) — gradient poster ko'rinib qoladi. */
/* Rasmning yengil WebP nusxasi (tools/make-thumbs.js → js/thumbs.js): kichik — kartalar (400 px),
   katta — slayder va banner fonlari (1280 px). Nusxa bo'lmasa — asl rasm. */
// YouTube muqovasi: JPG o'rniga o'sha rasmning WebP varianti — sifat bir xil, hajmi ~2 barobar kichik (330 → 180 KB)
const ytWebp = src => String(src || '').replace(/^https:\/\/i\.ytimg\.com\/vi\/([\w-]{11})\/(hq720|maxresdefault|sddefault|hqdefault)\.jpg$/, 'https://i.ytimg.com/vi_webp/$1/$2.webp');
function imgSmall(src) { const k = String(src || '').split('?')[0]; return (typeof THUMBS !== 'undefined' && THUMBS[k]) || (src ? ytWebp(src) : src); }
function imgBig(src) { const k = String(src || '').split('?')[0]; return (typeof THUMBS_BIG !== 'undefined' && THUMBS_BIG[k]) || (src ? ytWebp(src) : src); }

/* Eski YouTube videolarida katta muqova (hq720/maxresdefault) yo'q — YouTube kulrang «…» rasm (120×90) qaytaradi.
   Shunda har doim bor hqdefault'ga o'tamiz (4:3, kartada qora chiziqlari kesilib 16:9 ko'rinadi). Xira fon ham shunga. */
function ytThumbFallback(img) {
  if (!img || img.naturalWidth > 120 || !/i\.ytimg\.com\/vi(_webp)?\/[\w-]{11}\/(hq720|maxresdefault|sddefault)\./.test(img.src)) return;
  const to = img.src.replace(/(hq720|maxresdefault|sddefault)\./, 'hqdefault.');
  img.src = to;
  const blur = img.parentElement && img.parentElement.querySelector('.poster-blur');
  if (blur) blur.src = to;
}

/* YouTube muqovasi (hq720/maxresdefault) umuman yo'q bo'lsa (404) — har doim bor hqdefault'ga o'tamiz, u ham bo'lmasa rasm olib tashlanadi */
function ytThumbError(img) {
  if (img && !img.dataset.ytfb && /i\.ytimg\.com\/vi(_webp)?\/[\w-]{11}\/(hq720|maxresdefault|sddefault)\./.test(img.src)) {
    img.dataset.ytfb = 1;
    img.src = img.src.replace(/(hq720|maxresdefault|sddefault)\./, 'hqdefault.');
    return;
  }
  img && img.remove();
}

function posterHTML(m) {
  const [c1, c2] = m.colors || ['#2a3142', '#0d1018'];

  const fallback = `
    <div class="poster-art" style="background:linear-gradient(160deg, ${c1} 0%, ${c2} 100%)">
      <div class="pa-title">${esc(title(m))}</div>
      <div class="pa-year">${m.year || ''}</div>
    </div>`;

  if (!m.poster) return fallback;
  // saytdagi katta poster fayllari o'rniga kichik WebP nusxa (js/thumbs.js, tools/make-thumbs.js) — sahifa tez ochiladi
  const thumb = imgSmall(m.poster);
  if (thumb !== m.poster) m = { ...m, poster: thumb };

  // «Seriallar» sahifasida kartalar 16:9 — tik (2:3) poster kesilmaydi: o'rtada to'liq, chetlarida xira nusxasi (css: .is-serials)
  // (bosh sahifadagi aralash qatorlarda ham — .row-wide / .row-tall; odatda yashirin)
  const blur = `<img class="poster-blur" src="${esc(m.poster)}" alt="" aria-hidden="true" loading="lazy" onerror="ytThumbError(this)">`;
  // tik posterli kino keng (16:9) kartada — haqiqiy gorizontal rasm: muqova, bo'lmasa rasmiy treyler rasmi.
  // Odatda yashirin (css: .row-wide / .is-serials da ko'rinadi); yashirin rasm yuklanmaydi (loading=lazy)
  // faqat kinoning O'Z videosi (rasmiy kanal) — treyler kadri emas (tasodifiy, ko'pincha yoqimsiz sahna chiqardi)
  const yt = !m.wide && (String(m.video || '').match(/(?:[?&]v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
  // 16:9 rasm: admin/TMDB gorizontal posteri birinchi (kino nomi yozilgan), keyin muqova, keyin kinoning o'z YouTube rasmi
  const hp = m.hposter && !/dezocloud\.uz/.test(m.hposter) ? m.hposter : null;
  const land = m.wide ? null : hp || (m.cover ? imgBig(m.cover) : yt ? imgBig(`https://i.ytimg.com/vi/${yt}/hq720.jpg`) : null);
  // TMDB posteri — ekranga mos o'lcham (kompyuter/retina'da w342 xira ko'rinardi): brauzer o'zi tanlaydi
  const tm = String(m.poster).match(/^(https:\/\/image\.tmdb\.org\/t\/p\/)w\d+(\/.+)$/);
  const srcset = tm ? ` srcset="${tm[1]}w342${tm[2]} 342w, ${tm[1]}w500${tm[2]} 500w, ${tm[1]}w780${tm[2]} 780w" sizes="(min-width: 901px) 280px, 46vw"` : '';
  return fallback + blur +
    `<img class="poster-img" src="${esc(m.poster)}"${srcset} alt="${esc(title(m))}" loading="lazy" onload="ytThumbFallback(this)" onerror="ytThumbError(this)">` +
    (land ? `<img class="poster-land" src="${esc(land)}" alt="" aria-hidden="true" loading="lazy" onload="ytThumbFallback(this)" onerror="ytThumbError(this)">` : '');
}

/* Orqa fon (hero va kino sahifasi uchun) */
function backdropCSS(m) {
  const [c1, c2] = m.colors || ['#2a3142', '#0d1018'];
  return `radial-gradient(90% 120% at 78% 18%, ${c1} 0%, transparent 62%),
          radial-gradient(70% 90% at 12% 88%, ${c2} 0%, transparent 66%),
          linear-gradient(120deg, ${c2} 0%, #07080c 70%)`;
}

/* ---------- Ko'rish holati ----------
   'uz'      — o'zbek tilida to'liq film (audio: 'uz' yoki o'zbek kinosi)
   'full'    — to'liq film, lekin o'zbekcha emas (masalan ovozsiz multfilm)
   'trailer' — faqat treyler
   'none'    — hech narsa yo'q */
function watchStatus(m) {
  // guruh: kartaning o'zida video bo'lmasa ham, qismlarida bo'lsa — to'liq
  const p = !m.video && Array.isArray(m.parts) ? partsOf(m).find(hasFilm) : null;
  if (p) return (m.audio === 'uz' || p.audio === 'uz' || m.franchise === 'uzbek') ? 'uz' : 'full';
  if (m.video) return (m.audio === 'uz' || m.franchise === 'uzbek') ? 'uz' : 'full';
  return m.trailer ? 'trailer' : 'none';
}

/* Davomiylik — YouTube kabi muqovaning o'ng pastki burchagida: «1:52:00», «45:00»; serial — «30 qism» */
const fmtClock = sec => {
  sec = Math.max(0, Math.round(sec));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60, p = n => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`;
};
function durPillHTML(m) {
  const eps = (m.eps && m.eps.length) || (Array.isArray(m.parts) && m.parts.length > 1 ? m.parts.length : 0);
  if (m.type === 'serial' && eps) return `<span class="card-dur">${eps} ${LANG === 'ru' ? 'серий' : 'qism'}</span>`;
  const d = Math.round(+m.duration || 0);
  return d && hasFilm(m) ? `<span class="card-dur">${fmtClock(d * 60)}</span>` : '';
}

function watchBadgeHTML(m) {
  const st = watchStatus(m);
  if (st === 'uz')      return `<div class="badge-watch is-uz">${ICONS.play}${t('watch.uz')}</div>`;
  // to'liq film — alohida yozuvsiz: davomiyligi YouTube kabi o'ng pastki burchakda (durPillHTML)
  if (st === 'full') return '';
  if (st === 'trailer') return `<div class="badge-watch is-trailer">${t('watch.trailer')}</div>`;
  return '';
}

/* ---------- Ovoz tillari: bayroqlar (kino sahifasi — js/movie.js, admin — guruh tillari) ----------
   Kino/qism maydonlari: lang: 'en' — asosiy video tili; langs: { uz: url, ru: url } — boshqa tildagi versiyalar */
const AUDIO_LANGS = ['uz', 'ru', 'en', 'tr', 'hi'];
const LANG_FLAGS = {
  uz: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.4" fill="#0099b5"/><rect y="13.6" width="30" height="6.4" fill="#1eb53a"/><rect y="6.4" width="30" height=".7" fill="#ce1126"/><rect y="12.9" width="30" height=".7" fill="#ce1126"/><circle cx="5" cy="3.2" r="2.2" fill="#fff"/><circle cx="5.9" cy="3.2" r="2" fill="#0099b5"/><circle cx="9" cy="2" r=".45" fill="#fff"/><circle cx="10.6" cy="2" r=".45" fill="#fff"/><circle cx="9" cy="3.6" r=".45" fill="#fff"/><circle cx="10.6" cy="3.6" r=".45" fill="#fff"/><circle cx="12.2" cy="2" r=".45" fill="#fff"/></svg>',
  en: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.4"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>',
  ru: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039a6"/><rect y="13.33" width="30" height="6.67" fill="#d52b1e"/></svg>',
  orig: '<svg viewBox="0 0 30 20"><rect width="30" height="20" rx="2" fill="#2a3142"/><circle cx="15" cy="10" r="6" fill="none" stroke="#cfd6e4" stroke-width="1.3"/><path d="M9 10h12M15 4c-2.4 2.6-2.4 9.4 0 12M15 4c2.4 2.6 2.4 9.4 0 12" fill="none" stroke="#cfd6e4" stroke-width="1.1"/></svg>',
  hi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#ff9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".7"/></svg>',
  tr: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.2" cy="10" r="4" fill="#e30a17"/><path d="M15.5 10l3.6-1.2-2.2 3.1V8.1l2.2 3.1z" fill="#fff"/></svg>'
};
const LANG_NAMES = {
  uz: { uz: 'O‘zbek tilida', ru: 'На узбекском' },
  en: { uz: 'Ingliz tilida (asl nusxa)', ru: 'На английском (оригинал)' },
  ru: { uz: 'Rus tilida', ru: 'На русском' },
  tr: { uz: 'Turk tilida', ru: 'На турецком' },
  hi: { uz: 'Hind tilida', ru: 'На хинди' },
  orig: { uz: 'Asl nusxa', ru: 'Оригинал' },
  // ovozni tuzatishda MKV yo'laklaridan chiqadigan boshqa tillar (bayrog'i yo'q — kod yoziladi)
  kk: { uz: 'Qozoq tilida', ru: 'На казахском' }, ky: { uz: 'Qirg‘iz tilida', ru: 'На киргизском' },
  tg: { uz: 'Tojik tilida', ru: 'На таджикском' }, tk: { uz: 'Turkman tilida', ru: 'На туркменском' },
  az: { uz: 'Ozarbayjon tilida', ru: 'На азербайджанском' }, uk: { uz: 'Ukrain tilida', ru: 'На украинском' },
  de: { uz: 'Nemis tilida', ru: 'На немецком' }, fr: { uz: 'Fransuz tilida', ru: 'На французском' },
  es: { uz: 'Ispan tilida', ru: 'На испанском' }, it: { uz: 'Italyan tilida', ru: 'На итальянском' },
  pt: { uz: 'Portugal tilida', ru: 'На португальском' }, ja: { uz: 'Yapon tilida', ru: 'На японском' },
  ko: { uz: 'Koreys tilida', ru: 'На корейском' }, zh: { uz: 'Xitoy tilida', ru: 'На китайском' },
  ar: { uz: 'Arab tilida', ru: 'На арабском' }, fa: { uz: 'Fors tilida', ru: 'На персидском' },
  pl: { uz: 'Polyak tilida', ru: 'На польском' }
};

/* ---------- Kartochka ---------- */

/* Kino havolasi: qidiruv tizimlari uchun tayyor sahifasi bo'lsa (js/seo-pages.js) — kino/<slug>.html,
   aks holda dezomax.uz'da film/<slug>-<id>.html (Cloudflare Worker beradi, tools/movie-seo.js bilan bir xil qoida).
   GitHub Pages / ilovada Worker yo'q — u yerda movie.html?id= qoladi */
const FILM_URLS = /(^|\.)dezomax\.uz$/.test(location.hostname);
function filmSlug(m) {
  const s = String(m.slug || (m.title && (m.title.uz || m.title.ru)) || 'kino').normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
  return `${s || 'kino'}-${Number(m.id)}.html`;
}
function movieHref(m) {
  const p = typeof SEO_PAGES !== 'undefined' && SEO_PAGES[m.id];
  // ruscha nusxada (dezomax.uz/ru/…, js/i18n.js) — ruscha kino sahifalari
  const ru = typeof RU_PATH !== 'undefined' && RU_PATH ? 'ru/' : '';
  if (p) return `${ru}kino/${p}.html`;
  return !ru && FILM_URLS ? `film/${filmSlug(m)}` : `${ru}movie.html?id=${m.id}`;
}

/* Posteri albom (gorizontal) bo'lgan kinolar: konsertlar, admin «keng» belgisi, video kadri (DezoCloud), YouTube/RuTube rasmi.
   Bunday kartalar 16:9 — tik kartada albom rasm (va aksincha) turmasin (foydalanuvchi so'rovi, 2026-11-19) */
function landPoster(m) {
  if (m.wide || m.franchise === 'konsert') return true;
  return /i\.ytimg\.com|img\.youtube\.com|dezocloud\.uz\/t\/|rtbcdn\.ru|rutube\.ru/.test(m.poster || '');
}

/* To'rda tik va albom kartalar alohida qatorlarda: tartib saqlanadi, lekin qator to'lguncha boshqa shakldagisi kutib turadi.
   Qolganlari keyingi bo'lakka o'tadi (container._sb); oxirida chala qatorlar «qator uzilishi» bilan yopiladi */
function gridCols(container) {
  const n = getComputedStyle(container).gridTemplateColumns.split(' ').filter(x => x && x !== 'none').length;
  return n > 0 ? n : 2;
}
function shapeRows(container, items, final) {
  if (!container.classList.contains('grid')) return items.map(cardHTML).join('');
  const cols = gridCols(container), span = cols >= 4 ? 2 : 1, per = Math.max(1, Math.floor(cols / span));
  container.style.setProperty('--ws', span);
  const b = container._sb || (container._sb = { t: [], w: [] });
  const out = [];
  for (const m of items) {
    (landPoster(m) ? b.w : b.t).push(m);
    if (b.t.length >= cols) out.push(...b.t.splice(0).map(cardHTML));
    if (b.w.length >= per) out.push(...b.w.splice(0).map(cardHTML));
  }
  if (final) {
    const br = '<i class="grid-br" aria-hidden="true"></i>';
    if (b.t.length) out.push(...b.t.splice(0).map(cardHTML), br);
    if (b.w.length) out.push(...b.w.splice(0).map(cardHTML), br);
  }
  return out.join('');
}

function cardHTML(m) {
  // yil yoki reyting noma'lum bo'lishi mumkin (masalan YouTube'dagi o'zbek filmlari)
  const meta = [m.year, m.type === 'serial' && m.seasons ? seasonsText(m.seasons) : genreName(m.genres[0])]
    .filter(Boolean).join('<i class="dot"></i>');
  // Katalogda (window.CARD_TAGS_BELOW, js/catalog.js) «Film/Serial», «O'zbekcha» va vaqt — poster ostida, poster toza (2026-11-20)
  if (window.CARD_TAGS_BELOW) return `
  <a class="card reveal is-tags-below${landPoster(m) ? ' is-wide' : ''}" href="${movieHref(m)}">
    <div class="card-poster">
      ${posterHTML(m)}
      <div class="card-overlay"><div class="card-play">${ICONS.play}</div></div>
      ${m.rating ? `<div class="badge-rating${m.rating >= 7 ? ' is-hi' : m.rating < 5 ? ' is-lo' : ''}">${ICONS.star}${m.rating.toFixed(1)}</div>` : ''}
    </div>
    <div class="card-body">
      <h3 class="card-title">${esc(title(m))}</h3>
      <div class="card-meta">${meta}</div>
      <div class="card-tags"><span class="badge-type">${typeName(m.type)}</span>${watchBadgeHTML(m)}${durPillHTML(m)}</div>
    </div>
  </a>`;

  return `
  <a class="card reveal${landPoster(m) ? ' is-wide' : ''}" href="${movieHref(m)}">
    <div class="card-poster">
      ${posterHTML(m)}
      <div class="card-overlay"><div class="card-play">${ICONS.play}</div></div>
      ${m.rating ? `<div class="badge-rating${m.rating >= 7 ? ' is-hi' : m.rating < 5 ? ' is-lo' : ''}">${ICONS.star}${m.rating.toFixed(1)}</div>` : ''}
      <div class="badge-type">${typeName(m.type)}</div>
      ${watchBadgeHTML(m)}
      ${durPillHTML(m)}
    </div>
    <div class="card-body">
      <h3 class="card-title">${esc(title(m))}</h3>
      <div class="card-meta">${meta}</div>
    </div>
  </a>`;
}

/* Kartochkalar to'plami. Kinolar ko'p (1000+) — birdaniga 48 tasi chiziladi,
   qolgani pastga surilganda (yoki «Yana ko'rsatish» bosilganda) qo'shiladi */
const CARDS_PAGE = 48;
// keep — qayta chizishda (to'liq ro'yxat kelganda) avval ko'rsatilgan kartalar soni saqlanadi
function renderCards(container, list, keep) {
  if (!container) return;
  container._more?.remove();
  container._io?.disconnect();
  let shown = Math.min(Math.max(CARDS_PAGE, keep || 0), list.length);
  container._sb = null;
  container.innerHTML = shapeRows(container, list.slice(0, shown), shown >= list.length);
  observeReveals(container);
  if (shown >= list.length) return;

  const more = document.createElement('div');
  more.className = 'cards-more';
  more.innerHTML = `<button class="btn btn-ghost" type="button">${LANG === 'ru' ? 'Показать ещё' : 'Yana ko‘rsatish'} <span></span></button>`;
  container.after(more);
  container._more = more;
  const left = more.querySelector('span');
  const step = () => {
    const next = list.slice(shown, shown + CARDS_PAGE);
    shown += next.length;
    container.insertAdjacentHTML('beforeend', shapeRows(container, next, shown >= list.length));
    observeReveals(container);
    if (shown >= list.length) { container._io?.disconnect(); more.remove(); container._more = null; }
    else left.textContent = `(${list.length - shown})`;
  };
  left.textContent = `(${list.length - shown})`;
  more.querySelector('button').addEventListener('click', step);
  if ('IntersectionObserver' in window) {
    container._io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) step(); }, { rootMargin: '600px 0px' });
    container._io.observe(more);
  }
}

function emptyHTML(titleKey, hintKey) {
  return `
  <div class="empty">
    <div class="empty-icon">${ICONS.empty}</div>
    <h3>${t(titleKey)}</h3>
    <p>${t(hintKey)}</p>
  </div>`;
}

/* ---------- Sevimlilar (localStorage) ---------- */

const FAV_KEY = 'dezomax_favorites';

function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { return []; }
}

const isFav = id => getFavs().includes(Number(id));

function toggleFav(id) {
  id = Number(id);
  const favs = getFavs();
  const i = favs.indexOf(id);
  if (i > -1) favs.splice(i, 1); else favs.push(id);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  updateFavCount();
  return i === -1;
}

/* ---------- Yuklab olinganlar ro'yxati ---------- */

const DL_KEY = 'dezomax_downloads';

function getDownloads() {
  try { return JSON.parse(localStorage.getItem(DL_KEY)) || []; }
  catch { return []; }
}

const isDownloaded = id => getDownloads().includes(Number(id));

function toggleDownload(id) {
  id = Number(id);
  const list = getDownloads();
  const i = list.indexOf(id);
  if (i > -1) list.splice(i, 1); else list.push(id);
  localStorage.setItem(DL_KEY, JSON.stringify(list));
  updateFavCount();
  return i === -1;
}

/* Barcha hisoblagichlarni yangilaymiz (nomi tarixiy sabab bilan shunday) */
function updateFavCount() {
  const nFav = getFavs().length;
  const nDl = getDownloads().length;

  document.querySelectorAll('[data-fav-count]').forEach(el => {
    el.textContent = nFav ? ` (${nFav})` : '';
  });
  document.querySelectorAll('[data-dl-count]').forEach(el => {
    el.textContent = nDl ? ` (${nDl})` : '';
  });
  document.querySelectorAll('[data-fav-count-sheet]').forEach(el => {
    el.textContent = nFav || '';
  });
  document.querySelectorAll('[data-dl-count-sheet]').forEach(el => {
    el.textContent = nDl || '';
  });

  // Pastki paneldagi "Yana" belgisi — sevimlilar va yuklanganlar yig'indisi
  const total = nFav + nDl;
  document.querySelectorAll('[data-more-badge]').forEach(el => {
    el.textContent = total > 99 ? '99+' : total;
    el.hidden = !total;
  });
}

/* ---------- Reveal animatsiyasi ---------- */

let revealObserver = null;

function observeReveals(root = document) {
  if (!('IntersectionObserver' in window)) {
    root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); revealObserver.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
  }
  root.querySelectorAll('.reveal:not(.is-in)').forEach((el, i) => {
    el.style.transitionDelay = Math.min(i % 12, 8) * 45 + 'ms';
    revealObserver.observe(el);
  });
}

/* ---------- DezoMax 5.0 menyu (bosh sahifadagi .h5-nav) — boshqa sahifalarda eski .header o'rniga ----------
   Bosh sahifada (index.html) menyu HTML ichida va js/home5.js boshqaradi; bu yerda — qolgan sahifalar.
   Admin panelda — eski header qoladi. */
const NAV5_IC = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/>',
  serial: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  multfilm: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  tvset: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  live: '<circle class="lv-c" cx="12" cy="12" r="2"/><path class="lv-w1" d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4"/><path class="lv-w2" d="M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/>',
  sport: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  fun: '<path d="M12 3l2.2 5.6L20 9.3l-4.4 3.9 1.3 5.8L12 16l-4.9 3 1.3-5.8L4 9.3l5.8-.7z"/>',
  trailer: '<path d="M4 6h16v12H4zM4 9h16M4 15h16M8 6v3M12 6v3M16 6v3M8 15v3M12 15v3M16 15v3"/>'
};
/* Telefon: logo chapida ☰ — ichida Seriallar, Multfilmlar, Sport (yuqoridagi bo'limlar qatori telefonda yashirin;
   asosiy bo'limlar pastki panelda). Bosh sahifadagi tayyor menyuga ham qo'shiladi. 2026-11-19 */
function mountBurger() {
  const nav = document.querySelector('.h5-nav .h5-nav-in');
  if (!nav || nav.querySelector('.h5-burger')) return;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const type = new URLSearchParams(location.search).get('type');
  const file = location.pathname.split('/').pop() || 'index.html';
  const items = [
    ['catalog.html?type=serial', 'serial', L('Seriallar', 'Сериалы'), file === 'catalog.html' && type === 'serial'],
    ['catalog.html?type=multfilm', 'multfilm', L('Multfilmlar', 'Мультфильмы'), file === 'catalog.html' && type === 'multfilm'],
    ['sport.html', 'sport', L('Sport', 'Спорт'), file === 'sport.html'],
    ['qiziqarli.html', 'fun', L('Siz uchun Qiziqarli', 'Интересное'), file === 'qiziqarli.html']
  ];
  const wrap = document.createElement('div');
  wrap.className = 'h5-bw';
  wrap.innerHTML = `<button type="button" class="h5-burger" aria-label="${L('Menyu', 'Меню')}" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/></svg></button>
    <div class="h5-bmenu" hidden>${items.map(([h, k, t, on]) => `<a href="${h}"${on ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" aria-hidden="true">${(typeof NAV5_IC !== 'undefined' && NAV5_IC[k]) || ''}</svg>${t}</a>`).join('')}</div>`;
  nav.insertBefore(wrap, nav.firstChild);
  const btn = wrap.querySelector('.h5-burger'), menu = wrap.querySelector('.h5-bmenu');
  const set = open => { menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
  btn.addEventListener('click', e => { e.stopPropagation(); set(menu.hidden); });
  document.addEventListener('click', e => { if (!menu.hidden && !wrap.contains(e.target)) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBurger); else setTimeout(mountBurger, 0);

/* ---------- Profil menyusi (YouTube uslubida, foydalanuvchi so'rovi 2026-11-19) ---------- */
function dzxAcctMenu(menu) {
  if (!menu) return;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const u = typeof Auth !== 'undefined' && Auth.user ? Auth.user() : null;
  const P = {
    g: '<path d="M20.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h4.8a4.2 4.2 0 0 1-1.8 2.7M15 16.6A5.6 5.6 0 0 1 6.6 13.8M6.6 10.2A5.6 5.6 0 0 1 15.6 7.8l2.6-2.6A9.2 9.2 0 1 0 18.3 18.8"/>',
    sw: '<rect x="3" y="4" width="13" height="16" rx="2"/><circle cx="9.5" cy="10" r="2.3"/><path d="M6 16.5a3.6 3.6 0 0 1 7 0M19 7v10"/>',
    out: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M14 8l4 4-4 4M18 12H9"/>',
    in: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 8l4 4-4 4M14 12H4"/>',
    lib: '<path d="M4 5h4v14H4zM10 5h4v14h-4zM16.5 5.5l3.5 1-3.4 13-3.5-1"/>',
    dl: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    pay: '<circle cx="12" cy="12" r="9"/><path d="M15 9.2c-.6-.8-1.7-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.4-.4-3-1.2M12 6.5v11"/>',
    data: '<path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6Z"/><circle cx="12" cy="10.5" r="2.2"/><path d="M8.6 16a3.8 3.8 0 0 1 6.8 0"/>',
    lang: '<path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.6 5 7M11 5c-.8 4-3.4 7-7 8.5M13 20l4-9 4 9M14.4 17h5.2"/>',
    key: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h1M10 10h1M14 10h1M18 10h0M7 14h10"/>',
    look: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor"/>',
    set: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6M12 17h0"/>',
    fb: '<path d="M4 4h16v12H8l-4 4Z"/><path d="M12 7.5v4M12 13.8h0"/>',
    wx: '<circle cx="8" cy="8" r="3"/><path d="M8 2v1.5M2 8h1.5M3.8 3.8l1 1M12.2 3.8l-1 1"/><path d="M9 20h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.4A2.8 2.8 0 0 0 9 20Z"/>',
    fx: '<path d="M4 7h13l-3-3M20 17H7l3 3"/><path d="M8.5 7v0M15.5 17v0"/>'
  };
  const ic = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${P[k]}</svg>`;
  // ruscha nusxada (dezomax.uz/ru/, <base href="../">) — ruscha sahifasi bor bo'lsa o'shanga
  const RU_PG = ['about.html', 'catalog.html', 'contacts.html', 'plans.html', 'privacy.html', 'search.html'];
  const pg = f => (typeof RU_PATH !== 'undefined' && RU_PATH && RU_PG.includes(f.split('#')[0]) ? 'ru/' : '') + f;
  const it = (k, label, href, attr = '', more = false) => `<a class="h5-mi" href="${href}"${attr}>${ic(k)}<span>${label}</span>${more ? '<i class="h5-mi-ch" aria-hidden="true"></i>' : ''}</a>`;
  const nm = u ? (u.name || (u.email || '').split('@')[0] || 'DezoMax') : L('Mehmon', 'Гость');
  const av = u && u.photo ? `<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">` : u ? esc((nm[0] || 'D').toUpperCase()) : '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>';
  menu.innerHTML = `<div class="h5-menu-h" id="h5MenuH"><span class="h5-mh-av">${av}</span><span class="h5-mh-tx"><b>${esc(nm)}</b><small>${u && u.email ? esc(u.email) : L('Kirmagansiz', 'Вы не вошли')}</small>
      <a class="h5-mh-link" href="${pg('account.html')}">${u ? L('Profilni ko‘rish', 'Посмотреть профиль') : L('Kirish', 'Войти')}</a></span></div>
    ${u ? `<div class="h5-mg">${u.method === 'google' ? it('g', L('Google akkaunt', 'Аккаунт Google'), 'https://myaccount.google.com/', ' target="_blank" rel="noopener"') : ''}${it('sw', L('Akkauntni almashtirish', 'Сменить аккаунт'), pg('account.html'), ' data-acc-switch', true)}${it('out', L('Chiqish', 'Выйти'), '#', ' data-acc-out')}</div>`
    : `<div class="h5-mg">${it('in', L('Kirish', 'Войти'), pg('account.html'))}</div>`}
    <div class="h5-mg">${it('lib', L('Kutubxona', 'Библиотека'), pg('favorites.html'))}${it('dl', L('Yuklab olinganlar', 'Загрузки'), pg('downloads.html'))}${it('pay', L('Obuna va to‘lovlar', 'Подписка и платежи'), pg('plans.html'))}</div>
    <div class="h5-mg">${it('wx', L('Ob-havo', 'Погода'), 'ob-havo.html')}${it('fx', L('Valyuta kursi', 'Курсы валют'), 'valyuta.html')}</div>
    <div class="h5-mg">${it('data', L('DezoMax’dagi ma’lumotlaringiz', 'Ваши данные на DezoMax'), pg('account.html#history'))}${it('lang', `${L('Interfeys tili', 'Язык интерфейса')}: ${typeof DZX_LANGS !== 'undefined' && dzxGtGet() ? (DZX_LANGS.find(x => x[0] === dzxGtGet()) || [, ''])[1] : ru ? 'Русский' : 'O‘zbekcha'}`, '#', ' data-acc-langs', true)}${it('look', L('Ko‘rinish va shrift', 'Тема и размер шрифта'), '#', ' data-acc-look', true)}${it('key', L('Tezkor tugmalar', 'Быстрые клавиши'), '#', ' data-acc-keys')}</div>
    <div class="h5-mg">${it('set', L('Sozlamalar', 'Настройки'), pg('account.html#settings'))}</div>
    <div class="h5-mg">${it('help', L('Yordam', 'Справка'), pg(u ? 'account.html#support' : 'about.html'))}${it('fb', L('Fikr yuborish', 'Отправить отзыв'), pg('contacts.html'))}</div>`;
}
// menyu tugmalari: chiqish / almashtirish / tezkor tugmalar
document.addEventListener('click', async e => {
  const a = e.target.closest('[data-acc-out], [data-acc-switch], [data-acc-keys], [data-acc-look], [data-acc-langs]');
  if (!a) return;
  e.preventDefault();
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  if (a.hasAttribute('data-acc-langs')) { a.closest('.h5-menu')?.classList.remove('is-open'); dzxLangDialog(); return; }
  if (a.hasAttribute('data-acc-look')) { a.closest('.h5-menu')?.classList.remove('is-open'); dzxLookDialog(); return; }
  if (a.hasAttribute('data-acc-keys')) {
    a.closest('.h5-menu')?.classList.remove('is-open');
    document.querySelector('.dzx-keys')?.remove();
    const K = ru ? [['Пробел / K', 'Пауза / воспроизведение'], ['← / →', '10 сек назад / вперёд'], ['F', 'Полный экран'], ['M', 'Без звука'], ['/', 'Поиск (главная)'], ['Esc', 'Закрыть окно']]
                 : [['Probel / K', 'Pauza / davom ettirish'], ['← / →', '10 soniya orqaga / oldinga'], ['F', 'To‘liq ekran'], ['M', 'Ovozsiz'], ['/', 'Qidiruv (bosh sahifa)'], ['Esc', 'Oynani yopish']];
    const d = document.createElement('div');
    d.className = 'dzx-keys';
    d.innerHTML = `<div class="dzx-keys-box" role="dialog" aria-modal="true"><b>${ru ? 'Быстрые клавиши' : 'Tezkor tugmalar'}</b>
      ${K.map(([k, v]) => `<div class="dzx-keys-r"><kbd>${k}</kbd><span>${v}</span></div>`).join('')}
      <button type="button" class="dzx-keys-x">${ru ? 'Закрыть' : 'Yopish'}</button></div>`;
    d.addEventListener('click', ev => { if (ev.target === d || ev.target.closest('.dzx-keys-x')) d.remove(); });
    addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { d.remove(); removeEventListener('keydown', esc); } });
    document.body.appendChild(d);
    return;
  }
  if (typeof Auth !== 'undefined') { try { await Auth.signOut(); } catch (e2) {} }
  if (a.hasAttribute('data-acc-switch')) location.href = a.getAttribute('href');
  else location.reload();
});

function mountNav5() {
  const old = document.querySelector('header.header');
  const file = /\/kino\//.test(location.pathname) ? 'kino' : location.pathname.split('/').pop() || 'index.html';
  if (!old || file === 'admin.html' || document.querySelector('.h5-nav')) return;
  const ru = LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const type = new URLSearchParams(location.search).get('type');
  let mv = null;   // kino sahifasida — kinoning turi bo'yicha bo'lim belgilanadi
  try { mv = (file === 'kino' || file === 'movie.html') && typeof movie !== 'undefined' ? movie : null; } catch (e) {}
  const cur = file === 'catalog.html' ? (new URLSearchParams(location.search).get('watch') === 'trailer' ? 'trailer' : type === 'serial' ? 'film' : type) : file === 'tv.html' ? 'tvset' : file === 'live.html' ? 'live' : file === 'sport.html' ? 'sport' : file === 'qiziqarli.html' ? 'fun' : mv && mv.type ? mv.type : '';
  const links = [
    ['index.html', 'home', L('Bosh sahifa', 'Главная')],
    ['catalog.html?type=film', 'film', L('Filmlar', 'Фильмы')],
    ['catalog.html?type=multfilm', 'multfilm', L('Multfilmlar', 'Мультфильмы')],
    ['catalog.html?watch=trailer', 'trailer', L('Treylerlar', 'Трейлеры')],
    ['live.html', 'live', L('Jonli efir', 'Прямой эфир')],
    ['tv.html', 'tvset', L('Telekanallar', 'Телеканалы')],
    ['sport.html', 'sport', L('Sport', 'Спорт')],
  ];
  const hd = document.createElement('header');
  hd.className = 'h5 h5-nav';
  hd.innerHTML = `<div class="h5-nav-in">
    <a class="h5-logo" href="index.html" aria-label="DezoMax"><img class="logo-img" src="images/logo/dezomax-name.webp" alt="DezoMax" width="184" height="30"></a>
    <nav class="h5-links" aria-label="${L('Bo‘limlar', 'Разделы')}">${links.map(([h, k, label]) => `<a href="${h}"${k === cur ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" aria-hidden="true">${NAV5_IC[k]}</svg><span>${k === 'live' ? '<i class="h5-ldot"></i>' : ''}${esc(label)}</span></a>`).join('')}</nav>
    <div class="h5-tools">
      <a class="h5-ib" href="search.html" aria-label="${L('Qidiruv', 'Поиск')}" title="${L('Qidiruv', 'Поиск')}"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></a>
      <div class="h5-lang" aria-label="${L('Til', 'Язык')}"><a href="#" data-setlang="uz"${ru ? '' : ' aria-current="true"'}>UZ</a><a href="#" data-setlang="ru"${ru ? ' aria-current="true"' : ''}>RU</a></div>
      <a class="h5-ib" id="h5Bell" href="catalog.html?sort=new" aria-label="${L('Bildirishnomalar', 'Уведомления')}" title="${L('Bildirishnomalar', 'Уведомления')}"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg><i hidden></i></a>
      <div class="h5-me">
        <button class="h5-ava" type="button" id="h5Ava" data-account-btn aria-label="${L('Profil', 'Профиль')}" aria-expanded="false"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg></button>
        <div class="h5-menu" id="h5Menu"></div>
      </div>
    </div>
  </div>`;
  old.replaceWith(hd);
  dzxAcctMenu(hd.querySelector('#h5Menu'));
  document.documentElement.classList.add('has-nav5');
  mountBurger();

  // aylantirganda (telefonda) — to'q fon, pastga — bo'limlar qatori yashirinadi, tepaga — qaytadi
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    hd.classList.toggle('is-solid', y > 40);
    if (Math.abs(y - lastY) > 6) { hd.classList.toggle('is-up', y < lastY); lastY = y; }
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  // sahifalar --header-h bo'yicha joylashadi — menyuning haqiqiy balandligi (tepada turganda)
  const navH = () => { if (scrollY < 40 && hd.offsetHeight) document.documentElement.style.setProperty('--header-h', (hd.offsetHeight + (innerWidth > 860 ? 8 : 0)) + 'px'); };
  navH(); addEventListener('resize', navH); document.fonts && document.fonts.ready.then(navH);

  // qo'ng'iroq — oxirgi qo'shilgan kinolar oynasi (bosh sahifadagi bilan bir xil, dzxBellSeen umumiy)
  const SEEN = 'dzxBellSeen';
  const pool = () => (typeof MOVIES !== 'undefined' ? MOVIES : []).filter(m => m && m.addedAt && (typeof hasFilm !== 'function' || hasFilm(m)) && (typeof isExtraVideo !== 'function' || !isExtraVideo(m)));
  const seen = +localStorage.getItem(SEEN) || 0;
  const newest = Math.max(0, ...pool().map(m => m.addedAt));
  const bell = hd.querySelector('#h5Bell');
  bell.querySelector('i').hidden = !(newest > seen);
  const box = document.createElement('div');
  box.className = 'h5-notif';
  box.hidden = true;
  bell.after(box);
  const DAYMS = 86400000;
  const ago = tm => { const d = Math.floor((Date.now() - tm) / DAYMS); return d < 1 ? L('bugun', 'сегодня') : d === 1 ? L('kecha', 'вчера') : d < 30 ? L(`${d} kun oldin`, `${d} дн. назад`) : L(`${Math.floor(d / 30)} oy oldin`, `${Math.floor(d / 30)} мес. назад`); };
  const fill = () => {
    const ids = new Set();
    const list = pool().sort((a, b) => b.addedAt - a.addedAt).filter(m => !ids.has(m.id) && ids.add(m.id)).slice(0, 8);
    box.innerHTML = `<div class="h5-notif-h"><b>${L('Bildirishnomalar', 'Уведомления')}</b><small>${L('Yangi qo‘shilgan kinolar', 'Новые фильмы')}</small></div>
      ${list.length ? list.map(m => { const img = m.hposter || (m.poster ? imgSmall(m.poster) : '');
        return `<a class="h5-notif-it${m.addedAt > seen ? ' is-new' : ''}" href="${movieHref(m)}">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : '<span></span>'}
        <span><b>${esc(title(m))}</b><small>${esc([m.year, typeName(m.type)].filter(Boolean).join(' · '))} · ${ago(m.addedAt)}</small></span></a>`; }).join('') : `<p>${L('Hozircha yangilik yo‘q', 'Пока ничего нового')}</p>`}
      <a class="h5-notif-all" href="catalog.html?sort=new">${L('Barcha yangi kinolar', 'Все новинки')} ›</a>`;
  };
  const menu = hd.querySelector('#h5Menu'), ava = hd.querySelector('#h5Ava');
  bell.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    if (box.hidden) { fill(); box.hidden = false; menu.classList.remove('is-open'); } else box.hidden = true;
    bell.querySelector('i').hidden = true;
    try { localStorage.setItem(SEEN, String(newest || Date.now())); } catch (e2) {}
  });
  ava.addEventListener('click', e => { e.stopPropagation(); box.hidden = true; const o = menu.classList.toggle('is-open'); ava.setAttribute('aria-expanded', o); });
  document.addEventListener('click', e => {
    if (!box.hidden && !e.target.closest('.h5-notif')) box.hidden = true;
    if (!e.target.closest('.h5-me')) { menu.classList.remove('is-open'); ava.setAttribute('aria-expanded', 'false'); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { box.hidden = true; menu.classList.remove('is-open'); } });
  hd.querySelectorAll('[data-setlang]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    if (a.dataset.setlang === LANG) return;
    setLang(a.dataset.setlang);
    if (location.hostname !== 'dezomax.uz') location.reload();
  }));
}

/* ---------- Header / layout ---------- */

function initLayout() {
  document.documentElement.lang = LANG;
  mountNav5();   // DezoMax 5.0: barcha sahifalarda bosh sahifadagi menyu

  // Ikonkalarni joylash
  const logoMark = document.querySelector('.logo-mark');
  if (logoMark) logoMark.innerHTML = ICONS.film;

  document.querySelectorAll('.search').forEach(box => {
    if (!box.querySelector('svg')) box.insertAdjacentHTML('beforeend', ICONS.search);
  });

  // Scroll holati
  const header = document.querySelector('.header');
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.innerHTML = ICONS.up;
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (toTop) toTop.classList.toggle('is-in', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Til almashtirish
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Header qidiruvi
  const input = document.querySelector('.search input');
  if (input && !input.dataset.local) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        location.href = 'search.html?q=' + encodeURIComponent(input.value.trim());
      }
    });
  }

  // Joriy sahifani navigatsiyada belgilash
  const page = /\/kino\//.test(location.pathname) ? 'kino' : location.pathname.split('/').pop() || 'index.html';   // kino/*.html — tools/gen-pages.js
  const params = new URLSearchParams(location.search);
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'catalog.html' && href === 'catalog.html?type=' + params.get('type'))) {
      a.classList.add('is-active');
    }
  });

  // Ortga tugmasi — bosh sahifadan boshqa barcha sahifalarda, logotip oldida
  const headWrap = header && (header.querySelector('.wrap') || header);
  // admin sahifada yo'q — bosilsa saytga chiqib ketib, admin «yopilib qolardi» (admin ilovasida qaytish yo'li yo'q)
  if (headWrap && page !== 'index.html' && page !== 'admin.html' && !headWrap.querySelector('.back-btn')) {
    headWrap.insertAdjacentHTML('afterbegin',
      `<button class="back-btn" type="button" aria-label="${LANG === 'ru' ? 'Назад' : 'Orqaga'}">${ICONS.back}</button>`);
    headWrap.querySelector('.back-btn').addEventListener('click', () => {
      let same = false;
      try { same = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
      if (same && history.length > 1) history.back();
      else location.href = 'index.html';
    });
  }

  enhanceHeader(header, page);
  renderMiniNav(header, page);
  renderTabbar();
  renderFooterGenres();
  applyI18n();
  updateFavCount();
  observeReveals();
}

/* ---------- Kompyuter navbari (Kinopoisk uslubida) ----------
   ☰ menyu (barcha bo'limlar), o'rtada katta bo'limlar (faol — ostida chiziq), qidiruv belgisi (bosilsa qidiruv maydoni
   ochiladi), «Ilova» va «Bolalar», avatar atrofida rangli halqa. Telefonda — o'zgarmaydi (pastki panel ishlaydi).
   Markup shu yerda qo'shiladi — har bir HTML faylga nusxalash shart emas. */
function enhanceHeader(header, page) {
  const wrap = header && header.querySelector('.wrap');
  if (!wrap || page === 'admin.html' || wrap.querySelector('.nav-burger')) return;
  const ru = LANG === 'ru';
  const I = {
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    kids: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="#a78bfa"/><circle cx="7" cy="6" r="3" fill="#a78bfa"/><circle cx="17" cy="6" r="3" fill="#a78bfa"/><circle cx="9.3" cy="12" r="1.3" fill="#1e1b4b"/><circle cx="14.7" cy="12" r="1.3" fill="#1e1b4b"/><path d="M9.5 16c1.4 1.2 3.6 1.2 5 0" stroke="#1e1b4b" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  const logo = wrap.querySelector('.logo');
  logo && logo.insertAdjacentHTML('beforebegin', `<button class="nav-burger" type="button" aria-label="${ru ? 'Меню' : 'Menyu'}">${I.burger}</button>`);
  const nav = wrap.querySelector('.nav');
  // DezoMax 4.0: yuqori menyu ham pastki panel bilan bir xil — Bosh sahifa, TV, Qidiruv, Kutubxona, Shorts (qolganlari ☰ da)
  if (nav) {
    const act = activeTab();
    nav.innerHTML = TABS.map(tb => `<a href="${tb.href}"${tb.key === act ? ' class="is-active"' : ''}>${esc(tb.key === 'home' ? t('nav.home') : t(tb.label))}</a>`).join('');
  }
  nav && nav.insertAdjacentHTML('beforeend', `<button class="nav-search-btn" type="button" aria-label="${ru ? 'Поиск' : 'Qidiruv'}">${I.search}</button>`);
  const acc = wrap.querySelector('.account-btn');
  const native = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  acc && acc.insertAdjacentHTML('beforebegin', `
    ${native ? '' : `<a class="nav-extra" href="https://play.google.com/store/apps/details?id=uz.dezomax.app" target="_blank" rel="noopener">${I.app}<span>${ru ? 'Приложение' : 'Ilova'}</span></a>`}
    <a class="nav-extra nav-kids" href="catalog.html?type=multfilm"><img class="nav-kids-av" src="images/role/child.webp" alt="" width="30" height="30"><span>${ru ? 'Дети' : 'Bolalar'}</span></a>`);

  // DezoMax 4.0: o'ng tomonda — qidiruv belgisi, soat, akkaunt (bosh sahifa navbari bilan bir xil)
  if (acc && !wrap.querySelector('.hd-right')) {
    acc.insertAdjacentHTML('beforebegin', `<div class="hd-right"><a class="hd-ic" href="search.html" aria-label="${ru ? 'Поиск' : 'Qidiruv'}">${I.search}</a><span class="hd-clock"></span></div>`);
    const right = wrap.querySelector('.hd-right');
    right.appendChild(acc);
    const clk = right.querySelector('.hd-clock');
    const tick = () => { const d = new Date(); clk.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
    tick(); setInterval(tick, 20000);
  }

  // qidiruv belgisi — header'dagi qidiruv maydonini ochadi
  const search = wrap.querySelector('.search');
  wrap.querySelector('.nav-search-btn')?.addEventListener('click', () => {
    if (!search) { location.href = 'search.html'; return; }
    header.classList.toggle('is-searching');
    if (header.classList.contains('is-searching')) search.querySelector('input')?.focus();
  });
  search?.querySelector('input')?.addEventListener('blur', () => setTimeout(() => header.classList.remove('is-searching'), 150));

  // ☰ — barcha bo'limlar (chapdan chiqadigan panel)
  const L = [
    ['index.html', 'nav.home'], ['catalog.html', ru ? 'Каталог' : 'Katalog'], ['catalog.html?type=film', ru ? 'Фильмы' : 'Filmlar'],
    ['catalog.html?type=serial', 'nav.series'], ['catalog.html?type=multfilm', ru ? 'Мультфильмы' : 'Multfilmlar'], ['marvel.html', 'nav.marvel'],
    ['shorts.html', 'Shorts'], ['sport.html', 'nav.sport'], ['live.html', ru ? 'Прямой эфир' : 'Jonli efir'], ['qiziqarli.html', ru ? 'Интересное' : 'Siz uchun Qiziqarli'], ['tv.html', 'nav.tv'], ['favorites.html', 'nav.favorites'],
    ['downloads.html', 'nav.downloads'], ['plans.html', ru ? 'Тарифы' : 'Tariflar'], ['account.html', 'nav.account']
  ];
  const lbl = k => (k.startsWith('nav.') && typeof t === 'function' ? t(k) : k);
  const drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  drawer.hidden = true;
  drawer.innerHTML = `<div class="nav-drawer-bg" data-close></div>
    <aside class="nav-drawer-box">
      <button class="nav-drawer-x" type="button" data-close aria-label="×">${I.close}</button>
      ${L.map(([h, k]) => `<a href="${h}"${h === page ? ' class="is-active"' : ''}>${esc(lbl(k))}</a>`).join('')}
    </aside>`;
  document.body.appendChild(drawer);
  const open = on => { drawer.hidden = !on; document.documentElement.classList.toggle('nav-drawer-open', on); };
  wrap.querySelector('.nav-burger')?.addEventListener('click', () => open(true));
  drawer.addEventListener('click', e => { if (e.target.closest('[data-close]')) open(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) open(false); });
}

/* ---------- Telefon uchun pastki navbar ----------
   Beshta asosiy bo'lim. Multfilmlar katalog filtri orqali ochiladi.
   Markup shu yerda yasaladi — har bir HTML faylga nusxalash shart emas. */

// DezoMax 5.0 (2026-11-18): Bosh sahifa, Filmlar, Shorts, Jonli, Kutubxona; qidiruv — yuqori paneldagi belgi
const TABS = [
  // DezoMax 5.0 telefon paneli (foydalanuvchi maketi, 2026-11-18): faqat belgilar — Bosh sahifa, Filmlar, Shorts, TV, Jonli efir
  { key: 'home',   href: 'index.html',             icon: 'tbHome',   label: 'nav.home' },
  { key: 'films',  href: 'catalog.html?type=film', icon: 'tbFilm',   label: 'nav.films' },
  { key: 'shorts', href: 'shorts.html',            icon: 'tbShorts', label: 'nav.shorts' },
  { key: 'tvset',  href: 'tv.html',                icon: 'tbTv',     label: 'nav.tv' },
  { key: 'live',   href: 'live.html',              icon: 'tbLive',   label: 'nav.live' }
  // Kutubxona, profil — yuqoridagi avatar menyusida
];

/* Telefonda, faqat bosh sahifada — logo ostidagi mini navbar: oddiy yozuvlar, bitta qora fon (kompyuterda yashirin) */
const MINI_NAV = [
  { href: 'sport.html',     icon: 'ball',     uz: 'Sport',             ru: 'Спорт' },
  { href: 'tv.html',        icon: 'tv',       uz: 'Kanallar',          ru: 'Каналы' },
  { href: 'plans.html',     icon: 'crown',    uz: 'Obuna',             ru: 'Подписка' },
  { href: 'downloads.html', icon: 'download', uz: 'Yuklab olinganlar', ru: 'Загрузки' }
];

function renderMiniNav(header, page) {
  if (!header || page !== 'index.html' || header.querySelector('.mini-nav')) return;   // faqat bosh sahifada
  header.insertAdjacentHTML('beforeend', `
    <nav class="mini-nav" aria-label="${LANG === 'ru' ? 'Разделы' : 'Bo‘limlar'}">
      ${MINI_NAV.map(l => `<a class="mini-nav-item${l.href === page ? ' is-active' : ''}" href="${l.href}">${l[LANG] || l.uz}</a>`).join('')}
    </nav>`);
  document.documentElement.classList.add('has-mini-nav');
}

/* "Yana" menyusidagi bo'limlar */
const MORE_LINKS = [
  { href: 'account.html',   icon: 'user',     label: 'nav.account' },
  { href: 'favorites.html', icon: 'heart',    label: 'nav.favorites', badge: 'fav' },
  { href: 'downloads.html', icon: 'download', label: 'nav.downloads', badge: 'dl' },
  { href: 'plans.html',     icon: 'crown',    label: 'nav.plans' },
  { sep: true },
  { href: 'catalog.html?type=serial',   icon: 'tv',   label: 'nav.series' },
  { href: 'catalog.html?type=multfilm', icon: 'grid', label: 'nav.cartoons' }
];

/* ---------- Kinostudiyalar ----------
   Har bir studiya — o'zining RASMIY YouTube kanali (admin → «Kanallar» → «Studiyalar»da bir bosishda qo'shiladi,
   «Yangilash» rasmiy treylerlarni olib keladi; franchise = key). Bosh sahifadagi «Kinostudiyalar» qatorida
   faqat treylerlari bor studiyalar ko'rinadi. Logotiplar — oddiy matnli belgilar (studiya nomini ko'rsatish uchun). */
const STUDIOS = [
  { key: 'marvel', name: 'Marvel Studios', href: 'marvel.html', channel: 'https://www.youtube.com/@marvel', bg: '#5c0a10',
    logo: '<svg viewBox="0 0 120 44"><rect width="120" height="44" rx="3" fill="#ec1d24"/><text x="60" y="34" text-anchor="middle" font-family="Oswald,Impact,Arial Narrow,sans-serif" font-weight="700" font-size="34" fill="#fff" letter-spacing="-1">MARVEL</text></svg>' },
  { key: 'dc', name: 'DC Studios', channel: 'https://www.youtube.com/@dcofficial', bg: '#0b2a6b',
    logo: '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#0476f2"/><circle cx="30" cy="30" r="23" fill="none" stroke="#fff" stroke-width="2.5"/><text x="30" y="39" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="24" fill="#fff" letter-spacing="-1">DC</text></svg>' },
  { key: 'pixar', name: 'Pixar', channel: 'https://www.youtube.com/@Pixar', bg: '#1d2a3a',
    logo: '<svg viewBox="0 0 150 44"><text x="75" y="35" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="38" fill="#fff" letter-spacing="3">PIXAR</text></svg>' },
  { key: 'disney', name: 'Walt Disney Studios', channel: 'https://www.youtube.com/@disney', bg: '#0a1f4d',
    logo: '<svg viewBox="0 0 150 50"><path d="M12 40 Q75 -6 138 34" fill="none" stroke="#9fd2ff" stroke-width="2.5" stroke-linecap="round"/><text x="75" y="42" text-anchor="middle" font-family="Brush Script MT,Segoe Script,cursive" font-size="34" fill="#fff">Disney</text></svg>' },
  { key: 'warner', name: 'Warner Bros. Pictures', channel: 'https://www.youtube.com/@WarnerBros', bg: '#0c2a52',
    logo: '<svg viewBox="0 0 60 66"><path d="M6 6 Q30 0 54 6 L50 46 Q30 64 30 64 Q30 64 10 46 Z" fill="#1c64c8" stroke="#c9a54a" stroke-width="3"/><text x="30" y="40" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="24" fill="#f3d27a">WB</text></svg>' },
  { key: 'universal', name: 'Universal Pictures', channel: 'https://www.youtube.com/@UniversalPictures', bg: '#081a33',
    logo: '<svg viewBox="0 0 160 60"><circle cx="80" cy="30" r="26" fill="#123e7a"/><path d="M58 22 Q80 14 102 22 M56 32 Q80 24 104 32 M60 41 Q80 35 100 41" stroke="#4aa3ff" stroke-width="1.6" fill="none"/><text x="80" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="17" fill="#fff" letter-spacing="2">UNIVERSAL</text></svg>' },
  { key: 'sony', name: 'Sony Pictures', channel: 'https://www.youtube.com/@SonyPictures', bg: '#1a1a1a',
    logo: '<svg viewBox="0 0 160 50"><text x="80" y="30" text-anchor="middle" font-family="Times New Roman,serif" font-weight="700" font-size="30" fill="#fff" letter-spacing="4">SONY</text><text x="80" y="46" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#bbb" letter-spacing="5">PICTURES</text></svg>' },
  { key: 'lucasfilm', name: 'Lucasfilm · Star Wars', channel: 'https://www.youtube.com/@starwars', bg: '#000000',
    logo: '<svg viewBox="0 0 160 60"><text x="80" y="28" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="24" fill="none" stroke="#ffe81f" stroke-width="1.6" letter-spacing="2">STAR</text><text x="80" y="54" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="24" fill="none" stroke="#ffe81f" stroke-width="1.6" letter-spacing="2">WARS</text></svg>' },
  { key: 'dreamworks', name: 'DreamWorks Animation', channel: 'https://www.youtube.com/@UniversalPictures', via: 'universal', bg: '#0c2c5c',
    logo: '<svg viewBox="0 0 170 50"><path d="M20 38 a10 10 0 0 1 10 -16" fill="none" stroke="#ffd36b" stroke-width="2"/><text x="95" y="33" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#fff">DreamWorks</text></svg>' },
  { key: 'paramount', name: 'Paramount Pictures', channel: 'https://www.youtube.com/@ParamountPictures', bg: '#0a2a6b',
    logo: '<svg viewBox="0 0 160 60"><path d="M30 46 L62 12 L80 30 L98 12 L130 46 Z" fill="#2a6fdb"/><text x="80" y="57" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="17" fill="#fff">Paramount</text></svg>' }
];
// Haqiqiy logolar (2026-11-20, foydalanuvchi so'rovi): Wikimedia Commons'dagi rasmiy logolar (Public domain — oddiy matnli belgilar),
// images/studios/<key>.png (500 px). Qora logolar qoramtir fonda CSS bilan oq qilinadi (.st-logo.is-mono). Yuqoridagi SVG — zaxira (admin).
const STUDIO_MONO = ['disney', 'dreamworks', 'lucasfilm', 'pixar', 'sony', 'universal'];
STUDIOS.forEach(s => {
  s.logoSvg = s.logo;
  s.logo = `<img class="st-logo is-${s.key}${STUDIO_MONO.includes(s.key) ? ' is-mono' : ''}" src="images/studios/${s.key}.png" alt="${s.name}" loading="lazy" decoding="async">`;
});
const studioOf = key => STUDIOS.find(s => s.key === key) || null;
const studioHref = s => s.href || 'catalog.html?studio=' + s.key;

/* Qaysi bo'lim ochiq turganini aniqlaymiz */
function activeTab() {
  const page = /\/kino\//.test(location.pathname) ? 'kino' : location.pathname.split('/').pop() || 'index.html';   // kino/*.html — tools/gen-pages.js
  if (page === 'sport.html') return 'sport';
  if (page === 'catalog.html' && new URLSearchParams(location.search).get('type') === 'film') return 'films';
  if (page === 'catalog.html' && new URLSearchParams(location.search).get('type') === 'film') return 'films';
  if (page === 'tv.html') return 'tvset';
  if (page === 'live.html') return 'live';
  if (page === 'search.html') return 'search';
  if (page === 'shorts.html') return 'shorts';
  if (page === 'favorites.html' || page === 'downloads.html') return 'library';
  if (page === 'index.html' || page === '') return 'home';
  return null;                       // movie.html — hech biri faol emas
}

function renderTabbar() {
  let bar = document.querySelector('.tabbar');
  if (!bar) {
    bar = document.createElement('nav');
    bar.className = 'tabbar';
    bar.setAttribute('aria-label', 'Asosiy menyu');
    document.body.appendChild(bar);
  }

  const active = activeTab();
  // Profil tabida — kirgan bo'lsa avatar (rasm yoki harf), aks holda odamcha ikonkasi
  const user = typeof Auth !== 'undefined' ? Auth.user() : null;
  bar.innerHTML = TABS.map(tb => {
    const cls = `tabbar-item${tb.key === active ? ' is-active' : ''}`;
    const icon = tb.key === 'account' && user && typeof avatarHTML === 'function'
      ? avatarHTML(user, 'avatar tabbar-avatar')
      : ICONS[tb.icon];
    const inner = `
      <span class="tabbar-icon">
        ${icon}
        ${tb.key === 'account' ? '<b class="tabbar-badge" data-more-badge hidden></b>' : ''}
      </span>
      <span class="tabbar-label">${t(tb.label)}</span>`;
    return `<a class="${cls}" href="${tb.href}" aria-label="${esc(t(tb.label))}" style="view-transition-name:dz-tb-${tb.key}">${inner}</a>`;
  }).join('');
  // Faol bo'lim foni — alohida «kapsula», bo'limdan bo'limga suriladi (2026-11-25)
  bar.insertAdjacentHTML('afterbegin', '<i class="tb-pill" aria-hidden="true"></i>');
  tabPill(bar, bar.querySelector('.tabbar-item.is-active'), false);
  if (!bar.dataset.pillClick) {
    bar.dataset.pillClick = '1';
    bar.addEventListener('click', e => {
      const a = e.target.closest('.tabbar-item');
      if (!a || a.classList.contains('is-active') || e.ctrlKey || e.metaKey || e.shiftKey) return;
      bar.querySelectorAll('.tabbar-item.is-active').forEach(x => x.classList.remove('is-active'));
      a.classList.add('is-active');
      tabPill(bar, a, true);          // darhol suriladi — sahifa ochilguncha kutmaydi
      // telefonda sahifa animatsiyasi yo'q — kapsula yetib borishi uchun 170 ms dan keyin o'tadi
      if (document.documentElement.classList.contains('dzx-lite')) { e.preventDefault(); setTimeout(() => { location.href = a.href; }, 170); }
    });
  }
  // Keyingi sahifa panelni boshidanoq chizsin (js/logo.js) — ochilganda yo'qolib-chiqmasin
  try { sessionStorage.setItem('dzx_tabbar', bar.innerHTML); } catch (e) {}

  updateFavCount();
  speculateNav();
}
// Kapsulani faol tugma ostiga qo'yadi (anim — surilib boradi)
function tabPill(bar, a, anim) {
  const p = bar && bar.querySelector('.tb-pill');
  if (!p) return;
  if (!a) { p.style.opacity = '0'; return; }
  if (!anim) p.style.transition = 'none';
  p.style.opacity = '';
  p.style.width = a.offsetWidth + 'px';
  p.style.height = a.offsetHeight + 'px';
  p.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
  bar.classList.add('has-pill');
  if (!anim) { void p.offsetWidth; p.style.transition = ''; }
}

/* Pastki panel va yuqori menyu sahifalari oldindan tayyorlanadi (Speculation Rules, 2026-11-23):
   HTML'i darhol olib qo'yiladi, bosila boshlaganda (barmoq tekkanda) sahifa orqada to'liq ochiladi — bosilganda bir zumda chiqadi.
   Qo'llamaydigan brauzer/WebView e'tiborsiz qoldiradi. Trafik tejash rejimida yoki sekin internetda o'chiq.
   Reklama yuklovchilari (HTML'dagi dzAds / shorts go) oldindan ochilgan sahifada foydalanuvchi ko'rmaguncha ishga tushmaydi. */
function speculateNav() {
  if (document.getElementById('dzSpec')) return;
  if (!(HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules'))) return;
  const c = navigator.connection;
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return;
  const s = document.createElement('script');
  s.type = 'speculationrules'; s.id = 'dzSpec';
  // 2026-11-25: telefon/ilovada (html.dzx-lite) sahifalar orqada OLDINDAN OCHILMAYDI («moderate» telefonda ekrandagi havolalarni
  // o'zi ochib qo'yadi — panel doim ekranda, katalog 7 MB → telefon qotardi). Faqat HTML oldindan olinadi, to'liq ochish — barmoq tekkanda.
  const lite = document.documentElement.classList.contains('dzx-lite');
  s.textContent = JSON.stringify({
    prefetch: [{ where: { selector_matches: 'nav.tabbar a' }, eagerness: 'eager' }],
    prerender: [{ where: { selector_matches: lite ? 'nav.tabbar a' : 'nav.tabbar a, .h5-links a' }, eagerness: lite ? 'conservative' : 'moderate' }]
  });
  document.head.appendChild(s);
}

/* ---------- "Yana" pastki menyusi ---------- */

function openMoreSheet() {
  closeMoreSheet();

  const wrap = document.createElement('div');
  wrap.className = 'sheet-wrap';
  wrap.innerHTML = `
    <div class="sheet-backdrop" data-sheet-close></div>
    <div class="sheet" role="dialog" aria-modal="true">
      <div class="sheet-grip"></div>
      <div class="sheet-list">
        ${MORE_LINKS.map(l => l.sep
          ? '<div class="sheet-sep"></div>'
          : `<a class="sheet-item" href="${l.href}">
               <span class="sheet-icon">${ICONS[l.icon]}</span>
               <span>${t(l.label)}</span>
               ${l.badge ? `<b class="sheet-count" data-${l.badge}-count-sheet></b>` : ''}
             </a>`).join('')}
      </div>
      <button class="btn btn-ghost sheet-close" data-sheet-close>${t('nav.close')}</button>
    </div>`;

  document.body.appendChild(wrap);
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => wrap.classList.add('is-open'));

  wrap.querySelectorAll('[data-sheet-close]').forEach(el =>
    el.addEventListener('click', closeMoreSheet));
  document.addEventListener('keydown', escCloseSheet);

  applyI18n();
  updateFavCount();
}

function escCloseSheet(e) { if (e.key === 'Escape') closeMoreSheet(); }

function closeMoreSheet() {
  const wrap = document.querySelector('.sheet-wrap');
  if (!wrap) return;
  document.removeEventListener('keydown', escCloseSheet);
  document.body.classList.remove('no-scroll');
  wrap.classList.remove('is-open');
  if (wrap.classList.contains('mt-wrap')) {      // sahifa ichidagi o'yin ko'rinishi: ro'yxatga qaytamiz
    wrap.remove();
    document.body.classList.remove('mt-open');
    window.scrollTo(0, window.__mtY || 0);
    return;
  }
  setTimeout(() => wrap.remove(), 250);
}

function renderFooterGenres() {
  const box = document.querySelector('.footer-genres');
  if (!box) return;
  box.innerHTML = GENRES.slice(0, 10)
    .map(g => `<a class="chip" href="catalog.html?genre=${g.id}">${esc(g[LANG] || g.uz)}</a>`)
    .join('');
}

/* Til o'zgarganda sahifani qayta chizish — har bir sahifa o'zi ulanadi */
document.addEventListener('langchange', () => {
  renderTabbar();
  renderFooterGenres();
  updateFavCount();
});

/* ---------- Internetsiz ishlash (sw.js) ----------
   Ochilgan sahifalar, kod va posterlar telefonda saqlanadi — internet yo'qolsa ham sayt/ilova ochiladi.
   Internet yo'q paytda tepada ogohlantirish va «Yuklab olinganlar»ga havola chiqadi. */
const IS_APP = /DezoMaxApp/.test(navigator.userAgent) || !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

/* Ilovadan chiqilganda (Home tugmasi, boshqa ilova, ekran o'chdi) yoki brauzer varag'i yashirilganda —
   barcha video va ovoz to'xtaydi. Android WebView fonda ham kinoning ovozini o'ynatib turardi (2026-10-07).
   Televizorga uzatish (DezoCast) telefon videosini o'zi to'xtatadi — unga ta'sir qilmaydi. */
function dzxPauseAll() {
  document.querySelectorAll('video, audio').forEach(m => { try { if (!m.paused) m.pause(); } catch {} });
  document.querySelectorAll('iframe').forEach(f => {
    if (/youtube(-nocookie)?\.com\/embed/.test(f.src || '')) {
      try { f.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*'); } catch {}
    }
  });
}
window.dzxPauseAll = dzxPauseAll;
document.addEventListener('visibilitychange', () => { if (document.hidden) dzxPauseAll(); });
window.addEventListener('pagehide', dzxPauseAll);

/* Televizor rejimi (pult bilan boshqarish — js/tvmode.js): Smart TV brauzeri / Tizen ilovasi o'zi aniqlanadi;
   ?tv=1 — majburan yoqish (kompyuterda sinash uchun), ?tv=0 — o'chirish. Tanlov shu qurilmada eslab qolinadi. */
const IS_TV = (() => {
  try {
    const q = new URLSearchParams(location.search).get('tv');
    if (q === '1' || q === '0') localStorage.setItem('dzx_tv', q);
    const saved = localStorage.getItem('dzx_tv');
    if (saved) return saved === '1';
  } catch (e) {}
  return /Tizen|SMART-TV|SmartTV|Web0S|webOS|NetCast|HbbTV|BRAVIA|VIDAA|AFTB|AFTS|AFTT|DezoMaxTV/i.test(navigator.userAgent);
})();
if (IS_TV) {
  document.documentElement.classList.add('tv-mode');
  const s = document.createElement('script');
  s.src = 'js/tvmode.js?v=' + ((document.querySelector('script[src*="js/common.js"]')?.src.match(/v=(\d+)/) || [])[1] || '1');
  document.head.appendChild(s);
}
(function () {
  try {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
        // asosiy sahifalar va shu sahifaning kod fayllari darhol saqlansin (internetsiz ochilishi uchun)
        // sahifalar har 6 soatda bir marta yangilanib saqlanadi (yangi versiya chiqsa ham internetsiz to'g'ri ochilsin)
        // sayt yangi versiyasi chiqqanda (?v= o'zgarsa) — darhol, aks holda internetsiz eski kod ochilardi
        const ver = (document.querySelector('script[src*="js/common.js"]')?.src.match(/v=(\d+)/) || [])[1] || '';
        let last = 0, lastVer = ''; try { last = +localStorage.getItem('dzx_precache_at') || 0; lastVer = localStorage.getItem('dzx_precache_ver') || ''; } catch {}
        if (navigator.onLine && (Date.now() - last > 6 * 3600e3 || (ver && ver !== lastVer))) navigator.serviceWorker.ready.then(reg => {
          try { localStorage.setItem('dzx_precache_at', String(Date.now())); localStorage.setItem('dzx_precache_ver', ver); } catch {}
          const assets = [...document.querySelectorAll('script[src], link[rel="stylesheet"][href]')]
            .map(el => el.src || el.href).filter(u => u && u.startsWith(location.origin));
          reg.active?.postMessage({
            type: 'precache',
            pages: ['index.html', 'catalog.html', 'movie.html', 'search.html', 'downloads.html', 'favorites.html', 'tv.html', 'live.html', 'qiziqarli.html', 'sport.html', 'account.html', 'marvel.html', 'plans.html'],
            assets
          });
        }).catch(() => {});
      });
    }
  } catch (e) {}

  const bar = async () => {
    let el = document.getElementById('offlineBar');
    let offline = !navigator.onLine;
    // ba'zi telefon brauzerlari (4G/Wi-Fi almashganda, VPN bilan) internet bo'lsa ham «yo'q» deydi — haqiqiy so'rov bilan tekshiramiz
    // (data/ — sw.js ushlamaydi, to'g'ridan-to'g'ri tarmoqqa boradi)
    if (offline) {
      try { await fetch(`data/widget.json?ping=${Date.now()}`, { method: 'HEAD', cache: 'no-store' }); offline = false; window.dzxNetOk = true; } catch { window.dzxNetOk = false; }
      el = document.getElementById('offlineBar');
    }
    if (!offline) { el?.remove(); document.documentElement.classList.remove('is-offline'); return; }
    document.documentElement.classList.add('is-offline');
    if (el) return;
    el = document.createElement('div');
    el.id = 'offlineBar';
    el.className = 'offline-bar';
    el.innerHTML = LANG === 'ru'
      ? `Нет интернета — открыта сохранённая версия.${IS_APP ? ' <a href="downloads.html">Скачанные фильмы →</a>' : ''}`
      : `Internet yo‘q — saqlangan nusxa ochildi.${IS_APP ? ' <a href="downloads.html">Yuklab olinganlar →</a>' : ''}`;
    document.body.appendChild(el);
  };
  addEventListener('online', bar);
  addEventListener('offline', bar);

  // sahifadagi posterlar va slayder rasmlari — internetsiz ham ko'rinsin (sw.js saqlaydi)
  addEventListener('load', () => setTimeout(() => {
    if (!navigator.onLine || !navigator.serviceWorker?.controller) return;
    const urls = new Set();
    document.querySelectorAll('img[src]').forEach(i => { if (/^https?:/.test(i.currentSrc || i.src)) urls.add(i.currentSrc || i.src); });
    document.querySelectorAll('.hero-bg, [style*="background-image"]').forEach(el => {
      const m = /url\(["']?([^"')]+)["']?\)/.exec(el.style.backgroundImage || getComputedStyle(el).backgroundImage || '');
      if (m && /^https?:/.test(m[1])) urls.add(m[1]);
    });
    navigator.serviceWorker.controller.postMessage({ type: 'images', images: [...urls].slice(0, 80) });
  }, 4000));

  // ilovada — js/offline-pack.js (to'liq «Internetsiz rejim»: sahifalar, kod, posterlar, sport rasmlari)
  if (IS_APP && window.top === window) {
    const loadPack = () => {
      const s = document.createElement('script');
      s.src = 'js/offline-pack.js?v=' + ((document.querySelector('script[src*="js/common.js"]')?.src.match(/v=(\d+)/) || [])[1] || '1');
      document.body.appendChild(s);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadPack); else loadPack();
  }

  // «Internetsiz rejim»: sahifa yashirin ochilgan (sport) — undagi barcha rasmlar manzilini ilovaga qaytaramiz
  if (/[?&]dzxpack=1/.test(location.search) && window.parent !== window) addEventListener('load', () => setTimeout(() => {
    const urls = new Set();
    document.querySelectorAll('img').forEach(i => { for (const u of [i.currentSrc || i.src, i.dataset && i.dataset.src]) if (u && /^https?:/.test(u)) urls.add(u); });
    document.querySelectorAll('[style*="background-image"]').forEach(el => {
      const m = /url\(["']?([^"')]+)["']?\)/.exec(el.style.backgroundImage || '');
      if (m) urls.add(new URL(m[1], document.baseURI).href);
    });
    window.parent.postMessage({ type: 'dzxpack-images', urls: [...urls] }, location.origin);
  }, 12000));

  // 2026-11-23: butun katalog posterlarini (600 ta, 15–40 MB) kuniga bir marta fonda yuklash saytda O'CHIRILDI — sahifa hajmini
  // kamaytirish (foydalanuvchi bilan kelishilgan). Ilovada «Internetsiz rejim» (js/offline-pack.js) o'zi yuklaydi.

  /* Internet yo'q paytda kinoga kirmoqchi bo'lsa — «Internetni yoqing» oynasi.
     Telefonga yuklab olingan kino bo'lsa — «Yuklab olinganlar»ga (u yerda internetsiz o'ynaydi). */
  document.addEventListener('click', e => {
    if (navigator.onLine || window.dzxNetOk) return;      // dzxNetOk — tekshiruvda tarmoq ishladi (yuqorida)
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const id = movieIdOfHref(href);
    if (id === null) return;
    e.preventDefault();
    e.stopPropagation();
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem('dezomax_offline') || '[]'); } catch {}
    if (id && saved.some(x => x && x.id === id && x.state === 'done')) { location.href = 'downloads.html'; return; }
    // kino sahifasi internetsiz ham ochiladi (saqlangan movie.html: poster, tavsif; pleyer o'rnida «Internetni yoqing»)
    if (id) { location.href = new URL('movie.html?id=' + id, document.baseURI).href; return; }
    showOfflineNotice();
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bar); else bar();
})();

/* Havola kino sahifasigami: movie.html?id=…, kino/<sahifa>.html, marvel/<sahifa>.html → kino id (noma'lum — 0); boshqa havola — null */
function movieIdOfHref(href) {
  const q = /(?:^|\/)movie\.html\?(?:[^#]*&)?id=(\d+)/.exec(href);
  if (q) return Number(q[1]);
  const k = /(?:^|\/)kino\/([\w-]+)\.html/.exec(href);
  if (k && k[1] !== 'index') {
    const map = typeof SEO_PAGES !== 'undefined' ? SEO_PAGES : {};
    const hit = Object.keys(map).find(i => map[i] === k[1]);
    return hit ? Number(hit) : 0;
  }
  if (/(?:^|\/)marvel\/[\w-]+\.html/.test(href)) return 0;
  return null;
}

function offlineNoticeHTML() {
  const ru = LANG === 'ru';
  return `
    <div class="offline-note">
      <span class="offline-note-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.8a15.5 15.5 0 0 1 5-3.2M10.5 4.6A15.6 15.6 0 0 1 22 8.8M5.3 12.3a10.4 10.4 0 0 1 4.2-2.6M14.7 9.9a10.4 10.4 0 0 1 4 2.4M8.6 15.7a5.5 5.5 0 0 1 6.8 0"/><circle cx="12" cy="19.2" r="1" fill="currentColor"/><path d="M3 3l18 18" stroke="#f87171"/></svg></span>
      <b>${ru ? 'Нет интернета' : 'Internet yo‘q'}</b>
      <p>${ru ? 'Чтобы смотреть фильм, включите интернет (Wi-Fi или мобильные данные).' : 'Kinoni ko‘rish uchun internetni yoqing (Wi-Fi yoki mobil internet).'}</p>
      <div class="offline-note-actions">
        ${IS_APP ? `<a class="btn btn-ghost" href="downloads.html">${ru ? 'Скачанные фильмы' : 'Yuklab olinganlar'}</a>` : ''}
        <button class="btn btn-primary" type="button" data-offline-close>${ru ? 'Понятно' : 'Tushunarli'}</button>
      </div>
    </div>`;
}

function showOfflineNotice() {
  document.querySelector('.offline-modal')?.remove();
  const el = document.createElement('div');
  el.className = 'offline-modal';
  el.innerHTML = `<div class="offline-modal-back" data-offline-close></div>${offlineNoticeHTML()}`;
  document.body.appendChild(el);
  el.querySelectorAll('[data-offline-close]').forEach(b => b.addEventListener('click', () => el.remove()));
  addEventListener('online', () => el.remove(), { once: true });
}

/* Ko'rinish va shrift (2026-11-23): Tungi / Yorug' mavzu, shrift S/M/L/XL — qurilmada saqlanadi (localStorage), hamma sahifada js/logo.js qo'llaydi.
   Menyu «Ko'rinish va shrift» va Sozlamalar (account.js) shu oynani ochadi. */
function dzxLookDialog() {
  const ru = typeof LANG !== 'undefined' && LANG === 'ru', L = (u, r) => ru ? r : u;
  const D = document.documentElement;
  const get = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  document.querySelector('.dzx-keys')?.remove();
  const d = document.createElement('div');
  d.className = 'dzx-keys dzx-look';
  const seg = (name, opts, cur) => `<div class="dzx-seg" data-k="${name}">${opts.map(([v, l, st]) => `<button type="button" data-v="${v}" class="${v === cur ? 'is-on' : ''}"${st ? ` style="${st}"` : ''}>${l}</button>`).join('')}</div>`;
  d.innerHTML = `<div class="dzx-keys-box" role="dialog" aria-modal="true"><b>${L('Ko‘rinish va shrift', 'Тема и размер шрифта')}</b>
    <p class="dzx-look-l">${L('Mavzu', 'Тема')}</p>${seg('dzx_theme', [['dark', L('Tungi', 'Тёмная')], ['light', L('Yorug‘', 'Светлая')]], get('dzx_theme', 'dark'))}
    <p class="dzx-look-l">${L('Shrift o‘lchami', 'Размер шрифта')}</p>${seg('dzx_font', [['s', 'A', 'font-size:.8rem'], ['m', 'A', 'font-size:1rem'], ['l', 'A', 'font-size:1.2rem'], ['xl', 'A', 'font-size:1.4rem']], get('dzx_font', 'm'))}
    <button type="button" class="dzx-keys-x">${L('Tayyor', 'Готово')}</button></div>`;
  d.addEventListener('click', ev => {
    const b = ev.target.closest('.dzx-seg button');
    if (b) {
      const k = b.parentNode.dataset.k, v = b.dataset.v;
      set(k, v);
      b.parentNode.querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
      if (k === 'dzx_theme') v === 'light' ? D.setAttribute('data-theme', 'light') : D.removeAttribute('data-theme');
      else v === 'm' ? D.removeAttribute('data-fs') : D.setAttribute('data-fs', v);
      return;
    }
    if (ev.target === d || ev.target.closest('.dzx-keys-x')) d.remove();
  });
  addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { d.remove(); removeEventListener('keydown', esc); } });
  document.body.appendChild(d);
}

/* Interfeys tili (2026-11-23): 34 til, qidiruv bilan. O'zbekcha/Русский — saytning o'zi, qolganlari — Google tarjimasi (js/i18n.js DZX_LANGS) */
function dzxLangDialog() {
  if (typeof DZX_LANGS === 'undefined') return;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru', L = (u, r) => ru ? r : u;
  const cur = dzxGtGet() || LANG;
  document.querySelector('.dzx-keys')?.remove();
  const d = document.createElement('div');
  d.className = 'dzx-keys dzx-langs';
  d.innerHTML = `<div class="dzx-keys-box" role="dialog" aria-modal="true"><b>${L('Interfeys tili', 'Язык интерфейса')}</b>
    <input type="search" class="dzx-lang-q" placeholder="${L('Tilni qidirish', 'Поиск языка')}" aria-label="${L('Tilni qidirish', 'Поиск языка')}">
    <div class="dzx-lang-list">${DZX_LANGS.map(([k, n]) => `<button type="button" data-l="${k}" class="${k === cur ? 'is-on' : ''}" lang="${k}"><span>${n}</span>${k === cur ? '<i aria-hidden="true">✓</i>' : ''}</button>`).join('')}</div>
    <p class="dzx-lang-note">${L('O‘zbek va rus tillaridan boshqa tillarga Google avtomatik tarjima qiladi.', 'Остальные языки переводит Google (автоматически).')}</p>
    <button type="button" class="dzx-keys-x">${L('Yopish', 'Закрыть')}</button></div>`;
  const q = d.querySelector('.dzx-lang-q');
  q.addEventListener('input', () => {
    const s = q.value.trim().toLowerCase();
    d.querySelectorAll('.dzx-lang-list button').forEach(b => { b.hidden = !!s && !(b.textContent.toLowerCase().includes(s) || b.dataset.l.toLowerCase().startsWith(s)); });
  });
  d.addEventListener('click', ev => {
    const b = ev.target.closest('[data-l]');
    if (b) { d.remove(); if (b.dataset.l !== cur) dzxPickLang(b.dataset.l); return; }
    if (ev.target === d || ev.target.closest('.dzx-keys-x')) d.remove();
  });
  addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { d.remove(); removeEventListener('keydown', esc); } });
  document.body.appendChild(d);
}
