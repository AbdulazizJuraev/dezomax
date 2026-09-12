/* ============================================================
   DezoMax — umumiy funksiyalar / общие функции
   Barcha sahifalarda ishlatiladi.
   ============================================================ */

/* ---------- Ikonkalar ---------- */
const ICONS = {
  play:   '<svg viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>',
  star:   '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 5.9 6.6.95-4.8 4.65 1.14 6.5L12 17.4l-5.84 3.1L7.3 14 2.5 9.35l6.6-.95L12 2.5z"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.7 1.1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5M12 7.5v.01"/></svg>',
  left:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  up:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3.5l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
  tv:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M8 3.5l4 3.5 4-3.5"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>',
  ball:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.2"/><path d="M12 6.6l3.9 2.8-1.5 4.6H9.6l-1.5-4.6z"/><path d="M12 2.8v3.8M20.8 9.4l-4.9 0M17.5 20.1l-3.1-5.8M6.5 20.1l3.1-5.8M3.2 9.4l4.9 0"/></svg>',
  more:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M4.5 19.5h15"/></svg>',
  crown:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 7.5l3.4 3.2L12 4.6l5.4 6.1 3.4-3.2-1.6 11.1H4.8z"/></svg>',
  close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  film:   '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M2.5 12h19M2.5 8h4.5M2.5 16h4.5M17 8h4.5M17 16h4.5"/></svg>',
  empty:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M8.5 11h5"/></svg>'
};

/* ---------- Yordamchi funksiyalar ---------- */

const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const title = m => m.title[LANG] || m.title.uz;
const descOf = m => m.desc[LANG] || m.desc.uz;
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
      <div class="pa-year">${m.year}</div>
    </div>`;

  if (!m.poster) return fallback;

  return fallback +
    `<img class="poster-img" src="${esc(m.poster)}" alt="${esc(title(m))}" loading="lazy" onerror="this.remove()">`;
}

/* Orqa fon (hero va kino sahifasi uchun) */
function backdropCSS(m) {
  const [c1, c2] = m.colors || ['#2a3142', '#0d1018'];
  return `radial-gradient(90% 120% at 78% 18%, ${c1} 0%, transparent 62%),
          radial-gradient(70% 90% at 12% 88%, ${c2} 0%, transparent 66%),
          linear-gradient(120deg, ${c2} 0%, #07080c 70%)`;
}

/* ---------- Kartochka ---------- */

function cardHTML(m) {
  const meta = m.type === 'serial' && m.seasons
    ? `${m.year}<i class="dot"></i>${seasonsText(m.seasons)}`
    : `${m.year}<i class="dot"></i>${genreName(m.genres[0])}`;

  return `
  <a class="card reveal" href="movie.html?id=${m.id}">
    <div class="card-poster">
      ${posterHTML(m)}
      <div class="card-overlay"><div class="card-play">${ICONS.play}</div></div>
      <div class="badge-rating">${ICONS.star}${m.rating.toFixed(1)}</div>
      <div class="badge-type">${typeName(m.type)}</div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${esc(title(m))}</h3>
      <div class="card-meta">${meta}</div>
    </div>
  </a>`;
}

function renderCards(container, list) {
  if (!container) return;
  container.innerHTML = list.map(cardHTML).join('');
  observeReveals(container);
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
        location.href = 'catalog.html?q=' + encodeURIComponent(input.value.trim());
      }
    });
  }

  // Joriy sahifani navigatsiyada belgilash
  const page = location.pathname.split('/').pop() || 'index.html';
  const params = new URLSearchParams(location.search);
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'catalog.html' && href === 'catalog.html?type=' + params.get('type'))) {
      a.classList.add('is-active');
    }
  });

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
  { key: 'catalog', href: 'catalog.html', icon: 'grid', label: 'nav.catalog' },
  { key: 'sport',   href: 'sport.html',   icon: 'ball', label: 'nav.sport' },
  { key: 'tv',      href: 'tv.html',      icon: 'tv',   label: 'nav.tv' },
  { key: 'more',    href: null,           icon: 'more', label: 'nav.more' }
];

/* "Yana" menyusidagi bo'limlar */
const MORE_LINKS = [
  { href: 'favorites.html', icon: 'heart',    label: 'nav.favorites', badge: 'fav' },
  { href: 'downloads.html', icon: 'download', label: 'nav.downloads', badge: 'dl' },
  { href: 'plans.html',     icon: 'crown',    label: 'nav.plans' },
  { sep: true },
  { href: 'catalog.html?type=film',     icon: 'film', label: 'nav.films' },
  { href: 'catalog.html?type=serial',   icon: 'tv',   label: 'nav.series' },
  { href: 'catalog.html?type=multfilm', icon: 'grid', label: 'nav.cartoons' }
];

/* Qaysi bo'lim ochiq turganini aniqlaymiz */
function activeTab() {
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'sport.html') return 'sport';
  if (page === 'tv.html') return 'tv';
  if (page === 'catalog.html') return 'catalog';
  if (['favorites.html', 'downloads.html', 'plans.html'].includes(page)) return 'more';
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
  bar.innerHTML = TABS.map(tb => {
    const cls = `tabbar-item${tb.key === active ? ' is-active' : ''}`;
    const inner = `
      <span class="tabbar-icon">
        ${ICONS[tb.icon]}
        ${tb.key === 'more' ? '<b class="tabbar-badge" data-more-badge hidden></b>' : ''}
      </span>
      <span class="tabbar-label">${t(tb.label)}</span>`;
    return tb.href
      ? `<a class="${cls}" href="${tb.href}">${inner}</a>`
      : `<button class="${cls}" type="button" data-more-btn>${inner}</button>`;
  }).join('');

  bar.querySelector('[data-more-btn]')?.addEventListener('click', openMoreSheet);
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
      <div class="sheet-lang">
        <button class="lang-btn" data-lang="uz">UZ</button>
        <button class="lang-btn" data-lang="ru">RU</button>
      </div>
      <button class="btn btn-ghost sheet-close" data-sheet-close>${t('nav.close')}</button>
    </div>`;

  document.body.appendChild(wrap);
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => wrap.classList.add('is-open'));

  wrap.querySelectorAll('[data-sheet-close]').forEach(el =>
    el.addEventListener('click', closeMoreSheet));
  wrap.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => { setLang(b.dataset.lang); closeMoreSheet(); }));
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
