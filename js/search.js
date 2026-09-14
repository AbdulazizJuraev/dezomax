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
  const e = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-z0-9])' + e + '([^a-z0-9]|$)').test(hay);
}

function searchMovies(query) {
  const q = norm(query);
  if (!q) return [];
  return MOVIES.map(m => {
    const titles = norm([m.title.uz, m.title.ru, ...(m.tags || [])].join(' '));
    const rest = norm([
      m.director || '', String(m.year || ''), m.franchise || '', m.source?.name || '',
      ...(m.cast || []),
      ...m.genres.map(g => { const x = GENRES.find(y => y.id === g); return x ? x.uz + ' ' + x.ru : g; }),
      m.franchise === 'uzbek' ? 'ozbek kino uzbek' : ''
    ].join(' '));
    const score = matchesQ(titles, q) ? (titles.startsWith(q) ? 3 : 2) : matchesQ(rest, q) ? 1 : 0;
    return { m, score };
  }).filter(x => x.score)
    .sort((a, b) => b.score - a.score || (b.m.year || 0) - (a.m.year || 0))
    .map(x => x.m);
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
      <div class="s-genres">
        ${GENRES.map((g, i) => `<a class="s-genre" style="--h:${(i * 37) % 360}" href="catalog.html?genre=${g.id}">${esc(g[LANG] || g.uz)}</a>`).join('')}
      </div>
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
if (!input.value) setTimeout(() => input.focus(), 100);

document.addEventListener('langchange', () => { applyI18n(); renderIdle(); run(); });
