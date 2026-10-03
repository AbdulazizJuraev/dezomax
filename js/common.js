/* ============================================================
   DezoMax — umumiy funksiyalar / общие функции
   Barcha sahifalarda ishlatiladi.
   ============================================================ */

/* ---------- Android ilovasi ----------
   Ilova saytni internetdan ochadi — ilovaga xos qo'shimchalar (orqaga tugmasi, bildirishnomalar,
   gorizontal video) faqat ilova ichida, sahifa skriptlaridan keyin yuklanadi. */
if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
  const v = ((document.currentScript && document.currentScript.src) || '').split('?')[1] || '';
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('script');
    s.src = 'js/app-native.js' + (v ? '?' + v : '');
    document.body.appendChild(s);
  });
}

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
(function () {
  try {
    if (typeof MOVIES === 'undefined') return;
    const ids = new Set(MOVIES.map(m => m.id));
    for (const m of MOVIES) {
      if (!Array.isArray(m.parts) || m.parts.length < 2 || PART_OF.has(m.id)) continue;
      m.parts.forEach((id, i) => { if (id !== m.id && ids.has(id) && !PART_OF.has(id)) PART_OF.set(id, { parent: m.id, n: i + 1 }); });
    }
    const page = location.pathname.split('/').pop() || 'index.html';
    if (page === 'admin.html' || (document.body && document.body.classList.contains('page-admin'))) return;
    for (let i = MOVIES.length - 1; i >= 0; i--) {
      if (PART_OF.has(MOVIES[i].id)) { PART_MOVIES.set(MOVIES[i].id, MOVIES[i]); MOVIES.splice(i, 1); }
    }
  } catch (e) {}
})();

/* Guruh kartasining qismlari tartibda (guruh bo'lmasa — bo'sh ro'yxat) */
function partsOf(m) {
  // ixcham qismlar (YouTube kanal seriallari, js/data-channels.js): eps: [[youtubeId, daqiqa], ...]
  if (m && Array.isArray(m.eps) && m.eps.length) {
    return m.eps.map(([yt, min]) => ({ id: m.id, title: m.title, video: 'https://www.youtube.com/watch?v=' + yt, cover: 'https://i.ytimg.com/vi/' + yt + '/maxresdefault.jpg', duration: min || undefined, source: m.source, audio: m.audio }));
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
function hasFilm(m) { return !!(m && m.video && String(m.video).trim()); }
(function () {
  try {
    if (typeof MOVIES === 'undefined') return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const admin = page === 'admin.html' || (document.body && document.body.classList.contains('page-admin'));
    // Marvel sahifasi — treyleri bor filmlar ham kerak (ma'lumot sahifasi, film ko'rsatilmaydi)
    if (admin || page === 'movie.html' || page === 'marvel.html' || window.DZX_ID) return;
    // guruh kartasining o'zida video bo'lmasa ham, qismlaridan birida bo'lsa — ko'rinadi
    for (let i = MOVIES.length - 1; i >= 0; i--) {
      const m = MOVIES[i];
      if (!hasFilm(m) && !String(m.trailer || '').trim() && !partsOf(m).some(hasFilm)) MOVIES.splice(i, 1);
    }

    // "Bola" rolidagi foydalanuvchilar: katalog/qidiruv/bosh sahifada faqat multfilmlar ko'rinadi
    if (page === 'index.html' || page === 'catalog.html' || page === 'search.html') {
      const u = JSON.parse(localStorage.getItem('dezomax_user') || 'null');
      const p = u && u.uid ? JSON.parse(localStorage.getItem('dezomax_profile_' + u.uid) || 'null') : null;
      if (p && p.role === 'child') {
        for (let i = MOVIES.length - 1; i >= 0; i--) if (MOVIES[i].type !== 'multfilm') MOVIES.splice(i, 1);
      }
    }
  } catch (e) {}
})();

/* ---------- Ikonkalar ---------- */
const ICONS = {
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
const descOf = m => stripEmoji(m.desc?.[LANG] || m.desc?.uz || '');
const countryOf = m => m.country[LANG] || m.country.uz;

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
function posterHTML(m) {
  const [c1, c2] = m.colors || ['#2a3142', '#0d1018'];

  const fallback = `
    <div class="poster-art" style="background:linear-gradient(160deg, ${c1} 0%, ${c2} 100%)">
      <div class="pa-title">${esc(title(m))}</div>
      <div class="pa-year">${m.year || ''}</div>
    </div>`;

  if (!m.poster) return fallback;

  // «Seriallar» sahifasida kartalar 16:9 — tik (2:3) poster kesilmaydi: o'rtada to'liq, chetlarida xira nusxasi (css: .is-serials)
  const blur = m.wide || m.franchise === 'konsert'
    ? '' : `<img class="poster-blur" src="${esc(m.poster)}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()">`;
  return fallback + blur +
    `<img class="poster-img" src="${esc(m.poster)}" alt="${esc(title(m))}" loading="lazy" onerror="this.remove()">`;
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

function watchBadgeHTML(m) {
  const st = watchStatus(m);
  if (st === 'uz')      return `<div class="badge-watch is-uz">${ICONS.play}${t('watch.uz')}</div>`;
  if (st === 'full')    return `<div class="badge-watch is-full">${ICONS.play}${t('watch.full')}</div>`;
  if (st === 'trailer') return `<div class="badge-watch is-trailer">${t('watch.trailer')}</div>`;
  return '';
}

/* ---------- Ovoz tillari: bayroqlar (kino sahifasi — js/movie.js, admin — guruh tillari) ----------
   Kino/qism maydonlari: lang: 'en' — asosiy video tili; langs: { uz: url, ru: url } — boshqa tildagi versiyalar */
const AUDIO_LANGS = ['uz', 'ru', 'en', 'tr'];
const LANG_FLAGS = {
  uz: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.4" fill="#0099b5"/><rect y="13.6" width="30" height="6.4" fill="#1eb53a"/><rect y="6.4" width="30" height=".7" fill="#ce1126"/><rect y="12.9" width="30" height=".7" fill="#ce1126"/><circle cx="5" cy="3.2" r="2.2" fill="#fff"/><circle cx="5.9" cy="3.2" r="2" fill="#0099b5"/><circle cx="9" cy="2" r=".45" fill="#fff"/><circle cx="10.6" cy="2" r=".45" fill="#fff"/><circle cx="9" cy="3.6" r=".45" fill="#fff"/><circle cx="10.6" cy="3.6" r=".45" fill="#fff"/><circle cx="12.2" cy="2" r=".45" fill="#fff"/></svg>',
  en: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.4"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>',
  ru: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039a6"/><rect y="13.33" width="30" height="6.67" fill="#d52b1e"/></svg>',
  orig: '<svg viewBox="0 0 30 20"><rect width="30" height="20" rx="2" fill="#2a3142"/><circle cx="15" cy="10" r="6" fill="none" stroke="#cfd6e4" stroke-width="1.3"/><path d="M9 10h12M15 4c-2.4 2.6-2.4 9.4 0 12M15 4c2.4 2.6 2.4 9.4 0 12" fill="none" stroke="#cfd6e4" stroke-width="1.1"/></svg>',
  tr: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.2" cy="10" r="4" fill="#e30a17"/><path d="M15.5 10l3.6-1.2-2.2 3.1V8.1l2.2 3.1z" fill="#fff"/></svg>'
};
const LANG_NAMES = {
  uz: { uz: 'O‘zbek tilida', ru: 'На узбекском' },
  en: { uz: 'Ingliz tilida (asl nusxa)', ru: 'На английском (оригинал)' },
  ru: { uz: 'Rus tilida', ru: 'На русском' },
  tr: { uz: 'Turk tilida', ru: 'На турецком' },
  orig: { uz: 'Asl nusxa', ru: 'Оригинал' }
};

/* ---------- Kartochka ---------- */

/* Kino havolasi: qidiruv tizimlari uchun tayyor sahifasi bo'lsa (js/seo-pages.js) — kino/<slug>.html */
function movieHref(m) {
  const p = typeof SEO_PAGES !== 'undefined' && SEO_PAGES[m.id];
  return p ? `kino/${p}.html` : `movie.html?id=${m.id}`;
}

function cardHTML(m) {
  // yil yoki reyting noma'lum bo'lishi mumkin (masalan YouTube'dagi o'zbek filmlari)
  const meta = [m.year, m.type === 'serial' && m.seasons ? seasonsText(m.seasons) : genreName(m.genres[0])]
    .filter(Boolean).join('<i class="dot"></i>');

  return `
  <a class="card reveal${m.franchise === 'konsert' || m.wide ? ' is-wide' : ''}" href="${movieHref(m)}">
    <div class="card-poster">
      ${posterHTML(m)}
      <div class="card-overlay"><div class="card-play">${ICONS.play}</div></div>
      ${m.rating ? `<div class="badge-rating">${ICONS.star}${m.rating.toFixed(1)}</div>` : ''}
      <div class="badge-type">${typeName(m.type)}</div>
      ${watchBadgeHTML(m)}
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
function renderCards(container, list) {
  if (!container) return;
  container._more?.remove();
  container._io?.disconnect();
  let shown = Math.min(CARDS_PAGE, list.length);
  container.innerHTML = list.slice(0, shown).map(cardHTML).join('');
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
    container.insertAdjacentHTML('beforeend', next.map(cardHTML).join(''));
    shown += next.length;
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

/* ---------- Header / layout ---------- */

function initLayout() {
  document.documentElement.lang = LANG;

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

  renderTabbar();
  renderFooterGenres();
  applyI18n();
  updateFavCount();
  observeReveals();
}

/* ---------- Telefon uchun pastki navbar ----------
   Beshta asosiy bo'lim. Multfilmlar katalog filtri orqali ochiladi.
   Markup shu yerda yasaladi — har bir HTML faylga nusxalash shart emas. */

const TABS = [
  { key: 'home',    href: 'index.html',   icon: 'home', label: 'nav.home' },
  { key: 'search',  href: 'search.html',  icon: 'search', label: 'nav.search' },
  { key: 'series',  href: 'catalog.html?type=serial', icon: 'series', label: 'nav.series' },
  { key: 'sport',   href: 'sport.html',   icon: 'ball', label: 'nav.sport' },
  { key: 'tv',      href: 'tv.html',      icon: 'tv',   label: 'nav.tv' }
  // Profil — headerda (o'ng yuqorida). "Yana" bo'limidagilar akkaunt sahifasida
];

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
const studioOf = key => STUDIOS.find(s => s.key === key) || null;
const studioHref = s => s.href || 'catalog.html?studio=' + s.key;

/* Qaysi bo'lim ochiq turganini aniqlaymiz */
function activeTab() {
  const page = /\/kino\//.test(location.pathname) ? 'kino' : location.pathname.split('/').pop() || 'index.html';   // kino/*.html — tools/gen-pages.js
  if (page === 'sport.html') return 'sport';
  if (page === 'tv.html') return 'tv';
  if (page === 'search.html') return 'search';
  if (page === 'catalog.html' && new URLSearchParams(location.search).get('type') === 'serial') return 'series';
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
    return `<a class="${cls}" href="${tb.href}">${inner}</a>`;
  }).join('');

  updateFavCount();
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

/* Televizor rejimi (pult bilan boshqarish — js/tvmode.js): Smart TV brauzeri / Tizen ilovasi o'zi aniqlanadi;
   ?tv=1 — majburan yoqish (kompyuterda sinash uchun), ?tv=0 — o'chirish. Tanlov shu qurilmada eslab qolinadi. */
const IS_TV = (() => {
  try {
    const q = new URLSearchParams(location.search).get('tv');
    if (q === '1' || q === '0') localStorage.setItem('dzx_tv', q);
    const saved = localStorage.getItem('dzx_tv');
    if (saved) return saved === '1';
  } catch (e) {}
  return /Tizen|SMART-TV|SmartTV|Web0S|webOS|NetCast|HbbTV|BRAVIA|VIDAA|AFTB|AFTS|AFTT/i.test(navigator.userAgent);
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
            pages: ['index.html', 'catalog.html', 'movie.html', 'search.html', 'downloads.html', 'favorites.html', 'tv.html', 'sport.html', 'account.html', 'marvel.html', 'plans.html'],
            assets
          });
        }).catch(() => {});
      });
    }
  } catch (e) {}

  const bar = () => {
    let el = document.getElementById('offlineBar');
    if (navigator.onLine) { el?.remove(); document.documentElement.classList.remove('is-offline'); return; }
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

  /* Internet yo'q paytda kinoga kirmoqchi bo'lsa — «Internetni yoqing» oynasi.
     Telefonga yuklab olingan kino bo'lsa — «Yuklab olinganlar»ga (u yerda internetsiz o'ynaydi). */
  document.addEventListener('click', e => {
    if (navigator.onLine) return;
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
