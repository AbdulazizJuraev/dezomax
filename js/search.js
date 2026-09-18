/* ============================================================
   DezoMax — qidiruv sahifasi (pastki navbardagi "Qidiruv")
   ?q=so'rov — natijalar darhol chiqadi
   ============================================================ */

Object.assign(I18N.uz, {
  'search.title': 'Qidiruv',
  'search.popular': 'Ko‘p qidiriladi',
  'search.recent': 'Oxirgi qidiruvlar',
  'search.clear': 'Tozalash',
  'search.genres': 'Janrlar',
  'search.found': 'Topildi',
  'search.catalog': 'To‘liq katalog'
});
Object.assign(I18N.ru, {
  'search.title': 'Поиск',
  'search.popular': 'Часто ищут',
  'search.recent': 'Недавние запросы',
  'search.clear': 'Очистить',
  'search.genres': 'Жанры',
  'search.found': 'Найдено',
  'search.catalog': 'Весь каталог'
});

const RECENT_KEY = 'dezomax_recent_search';
const POPULAR = ['O‘zbek kino', 'Marvel', 'Batman', 'Avengers', 'Spider-Man', 'Komediya', 'Interstellar', 'Multfilm'];

const getRecent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; } };
const addRecent = q => {
  const list = [q, ...getRecent().filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 8);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
};

/* Qisqa so'rov faqat butun so'z bo'yicha (katalogdagi kabi) */
function matchesQ(hay, q) {
  if (q.length > 3) return hay.includes(q);
  // RegExp bitta so'rov uchun bir marta yasaladi (har kino uchun emas)
  if (matchesQ.q !== q) {
    const e = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    matchesQ.q = q;
    matchesQ.re = new RegExp('(^|[^a-z0-9])' + e + '([^a-z0-9]|$)');
  }
  return matchesQ.re.test(hay);
}

/* Qidiruv matni har kino uchun bir marta tayyorlanadi (20 000+ kinoda har harfda qayta hisoblash sekin) */
const SEARCH_TEXT = new WeakMap();
function searchTextOf(m) {
  let s = SEARCH_TEXT.get(m);
  if (!s) {
    s = {
      titles: norm([m.title.uz, m.title.ru, ...(m.tags || [])].join(' ')),
      rest: norm([
        m.director || '', String(m.year || ''), m.franchise || '', m.source?.name || '',
        ...(m.cast || []),
        ...m.genres.map(g => { const x = GENRES.find(y => y.id === g); return x ? x.uz + ' ' + x.ru : g; }),
        m.franchise === 'uzbek' ? 'ozbek kino uzbek' : '',
        m.franchise === 'dorama' ? 'dorama koreys korea' : '',
        m.franchise === 'hind' ? 'hind hindiston india bollywood' : ''
      ].join(' '))
    };
    SEARCH_TEXT.set(m, s);
  }
  return s;
}

function searchMovies(query) {
  const q = norm(query);
  if (!q) return [];
  return MOVIES.map(m => {
    const { titles, rest } = searchTextOf(m);
    const score = matchesQ(titles, q) ? (titles.startsWith(q) ? 3 : 2) : matchesQ(rest, q) ? 1 : 0;
    return { m, score };
  }).filter(x => x.score)
    .sort((a, b) => b.score - a.score || (!!b.m.poster - !!a.m.poster) || (b.m.year || 0) - (a.m.year || 0))
    .map(x => x.m);
}

/* ---------- Janr kartalari: saytdagi shu janr kinolarining posterlari ---------- */

const GENRE_STYLE = {
  action:    ['#e0522d', '🔥'], drama:     ['#8b5cf6', '🎭'], comedy:    ['#f5b82e', '😂'],
  scifi:     ['#0ea5e9', '🚀'], thriller:  ['#64748b', '🔪'], crime:     ['#dc2626', '🕵️'],
  fantasy:   ['#a855f7', '🐉'], horror:    ['#7f1d1d', '👻'], animation: ['#22c55e', '🎨'],
  adventure: ['#f97316', '🧭'], romance:   ['#ec4899', '❤️'], biography: ['#14b8a6', '📖'],
  war:       ['#65743a', '🎖️'], detective: ['#6366f1', '🔍'], family:    ['#10b981', '👨‍👩‍👧'],
  history:   ['#b45309', '🏛️']
};

function genreTileHTML(g) {
  const list = MOVIES.filter(m => m.genres.includes(g.id));
  // posteri bor, avval yuqori reytingli / yangi kinolar; tik (2:3) posterlar yelpig'ichga yaxshi tushadi
  const posters = list
    .filter(m => m.poster)
    .sort((a, b) => (a.poster.startsWith('images/uz/') - b.poster.startsWith('images/uz/')) || (b.rating || 0) - (a.rating || 0) || (b.year || 0) - (a.year || 0))
    .slice(0, 6);      // zaxira bilan: yotiq posterlar yuklangach olib tashlanadi, CSS birinchi 3 tasini ko'rsatadi
  const [color, emoji] = GENRE_STYLE[g.id] || ['#0a93dc', '🎬'];
  return `
    <a class="s-genre" style="--gc:${color}" href="catalog.html?genre=${g.id}">
      <span class="s-genre-posters">
        ${posters.map(m => `<img src="${esc(m.poster)}" alt="" loading="lazy" onload="if(this.naturalWidth>this.naturalHeight)this.remove()" onerror="this.remove()">`).join('')}
      </span>
      <span class="s-genre-info">
        <span class="s-genre-emoji">${emoji}</span>
        <b>${esc(g[LANG] || g.uz)}</b>
        <small>${list.length} ${LANG === 'ru' ? 'фильмов' : 'ta kino'}</small>
      </span>
    </a>`;
}

const input = document.getElementById('searchInput');
const clearBtn = document.getElementById('searchClear');

function renderIdle() {
  const recent = getRecent();
  document.getElementById('searchIdle').innerHTML = `
    ${recent.length ? `
      <div class="s-block">
        <div class="s-head"><h3>${t('search.recent')}</h3><button class="acc-link" type="button" id="clearRecent">${t('search.clear')}</button></div>
        <div class="chips">${recent.map(r => `<button class="chip" data-q="${esc(r)}">${esc(r)}</button>`).join('')}</div>
      </div>` : ''}
    <div class="s-block">
      <div class="s-head"><h3>${t('search.popular')}</h3></div>
      <div class="chips">${POPULAR.map(r => `<button class="chip" data-q="${esc(r)}">${esc(r)}</button>`).join('')}</div>
    </div>
    <div class="s-block">
      <div class="s-head"><h3>${t('search.genres')}</h3><a class="acc-link" href="catalog.html">${t('search.catalog')}</a></div>
      <div class="s-genres">${GENRES.map(genreTileHTML).join('')}</div>
    </div>`;

  document.querySelectorAll('#searchIdle [data-q]').forEach(b => b.addEventListener('click', () => {
    input.value = b.dataset.q;
    run(true);
  }));
  document.getElementById('clearRecent')?.addEventListener('click', () => {
    localStorage.removeItem(RECENT_KEY);
    renderIdle();
  });
}

function run(remember = false) {
  const q = input.value.trim();
  clearBtn.hidden = !q;
  document.getElementById('searchIdle').hidden = !!q;
  const box = document.getElementById('searchResults');
  box.hidden = !q;
  history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) : location.pathname);
  if (!q) { renderIdle(); return; }

  const list = searchMovies(q);
  if (remember && list.length) addRecent(q);
  document.getElementById('searchCount').textContent = list.length ? `${t('search.found')}: ${resultsText(list.length)}` : '';
  const grid = document.getElementById('grid');
  if (list.length) {
    grid.className = 'grid';
    renderCards(grid, list);
  } else {
    grid.className = '';
    grid.innerHTML = emptyHTML('search.empty', 'search.emptyHint');
  }
}

initLayout();
document.querySelector('.s-field-icon').innerHTML = ICONS.search;
clearBtn.innerHTML = ICONS.close;
document.getElementById('year').textContent = new Date().getFullYear();

input.value = new URLSearchParams(location.search).get('q') || '';
let timer;
input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => run(), 180); });
input.addEventListener('keydown', e => { if (e.key === 'Enter') { input.blur(); run(true); } });
clearBtn.addEventListener('click', () => { input.value = ''; run(); input.focus(); });

renderIdle();
run();
// klaviatura o'zi ochilmaydi — foydalanuvchi qidiruv maydoniga bosgandagina chiqadi

document.addEventListener('langchange', () => { applyI18n(); renderIdle(); run(); });
