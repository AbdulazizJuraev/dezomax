/* ============================================================
   DezoMax — katalog / каталог
   URL parametrlari: ?q=qidiruv&type=film&genre=action&sort=rating
   ============================================================ */

const params = new URLSearchParams(location.search);

const state = {
  q:         params.get('q') || '',
  type:      params.get('type') || 'all',
  genre:     params.get('genre') || 'all',
  franchise: params.get('franchise') || 'all',
  sort:      params.get('sort') || 'new'
};

const TYPES = ['film', 'serial', 'multfilm'];
const FRANCHISES = ['uzbek', 'marvel', 'dc'];
const SORTS = ['new', 'old', 'rating', 'name'];

/* ---------- Filtrlar ---------- */

function renderFilters() {
  const typeBox = document.getElementById('typeChips');
  typeBox.innerHTML =
    `<button class="chip${state.type === 'all' ? ' is-active' : ''}" data-type="all">${t('catalog.all')}</button>` +
    TYPES.map(x => `<button class="chip${state.type === x ? ' is-active' : ''}" data-type="${x}">${typeName(x)}</button>`).join('');

  const franchiseBox = document.getElementById('franchiseChips');
  franchiseBox.innerHTML =
    `<button class="chip${state.franchise === 'all' ? ' is-active' : ''}" data-franchise="all">${t('catalog.all')}</button>` +
    FRANCHISES.map(f => `<button class="chip${state.franchise === f ? ' is-active' : ''}" data-franchise="${f}">${t('franchise.' + f)}</button>`).join('');

  const genreBox = document.getElementById('genreChips');
  genreBox.innerHTML =
    `<button class="chip${state.genre === 'all' ? ' is-active' : ''}" data-genre="all">${t('catalog.all')}</button>` +
    GENRES.map(g => `<button class="chip${state.genre === g.id ? ' is-active' : ''}" data-genre="${g.id}">${esc(g[LANG] || g.uz)}</button>`).join('');

  const sort = document.getElementById('sort');
  sort.innerHTML = SORTS.map(s =>
    `<option value="${s}"${state.sort === s ? ' selected' : ''}>${t('catalog.sort.' + s)}</option>`).join('');

  typeBox.querySelectorAll('button').forEach(b =>
    b.addEventListener('click', () => { state.type = b.dataset.type; update(); }));

  franchiseBox.querySelectorAll('button').forEach(b =>
    b.addEventListener('click', () => { state.franchise = b.dataset.franchise; update(); }));

  genreBox.querySelectorAll('button').forEach(b =>
    b.addEventListener('click', () => { state.genre = b.dataset.genre; update(); }));

  sort.addEventListener('change', () => { state.sort = sort.value; update(); });
}

/* ---------- Filtrlash + saralash ---------- */

/* Uzun so'rov — oddiy substring. Qisqa so'rov ("dc", "bak") esa faqat
   butun so'z sifatida qidiriladi, aks holda "Radcliffe" ham "dc" ga mos kelib qoladi. */
function matches(hay, q) {
  if (q.length > 3) return hay.includes(q);
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-z0-9])' + esc + '([^a-z0-9]|$)').test(hay);
}

function filtered() {
  const q = norm(state.q);

  let list = MOVIES.filter(m => {
    if (state.type !== 'all' && m.type !== state.type) return false;
    if (state.genre !== 'all' && !m.genres.includes(state.genre)) return false;
    if (state.franchise !== 'all' && m.franchise !== state.franchise) return false;
    if (!q) return true;

    const haystack = [
      m.title.uz, m.title.ru, m.director || '', String(m.year || ''), m.source?.name || '',
      m.franchise || '',
      ...(m.tags || []),
      ...(m.cast || []),
      ...m.genres.map(g => { const x = GENRES.find(y => y.id === g); return x ? x.uz + ' ' + x.ru : g; })
    ].join(' ');

    return matches(norm(haystack), q);
  });

  const sorters = {
    new:    (a, b) => (b.year || 0) - (a.year || 0),
    old:    (a, b) => (a.year || 9999) - (b.year || 9999),
    rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    name:   (a, b) => title(a).localeCompare(title(b), LANG === 'ru' ? 'ru' : 'uz')
  };

  return list.sort(sorters[state.sort] || sorters.new);
}

/* ---------- Chizish ---------- */

function update(pushUrl = true) {
  const list = filtered();
  const grid = document.getElementById('grid');

  if (list.length) {
    grid.className = 'grid';
    renderCards(grid, list);
  } else {
    grid.className = '';
    grid.innerHTML = emptyHTML('search.empty', 'search.emptyHint');
  }

  document.getElementById('count').textContent = resultsText(list.length);

  // Sarlavha
  const h = document.getElementById('pageTitle');
  if (state.q)                      h.textContent = `${t('search.results')}: "${state.q}"`;
  else if (state.franchise !== 'all') h.textContent = t('row.' + state.franchise);
  else if (state.type !== 'all')    h.textContent = typeName(state.type);
  else if (state.genre !== 'all')   h.textContent = genreName(state.genre);
  else                              h.textContent = t('catalog.title');

  // Faol chiplarni yangilash
  document.querySelectorAll('#typeChips .chip').forEach(b =>
    b.classList.toggle('is-active', b.dataset.type === state.type));
  document.querySelectorAll('#franchiseChips .chip').forEach(b =>
    b.classList.toggle('is-active', b.dataset.franchise === state.franchise));
  document.querySelectorAll('#genreChips .chip').forEach(b =>
    b.classList.toggle('is-active', b.dataset.genre === state.genre));

  if (pushUrl) {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.type !== 'all') p.set('type', state.type);
    if (state.genre !== 'all') p.set('genre', state.genre);
    if (state.franchise !== 'all') p.set('franchise', state.franchise);
    if (state.sort !== 'new') p.set('sort', state.sort);
    const url = p.toString() ? '?' + p : location.pathname;
    history.replaceState(null, '', url);
  }
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderFilters();

const input = document.getElementById('q');
input.value = state.q;

let debounce;
input.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => { state.q = input.value.trim(); update(); }, 180);
});

document.getElementById('reset').addEventListener('click', () => {
  state.q = ''; state.type = 'all'; state.genre = 'all'; state.franchise = 'all'; state.sort = 'new';
  input.value = '';
  document.getElementById('sort').value = 'new';
  update();
});

update(false);
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderFilters();
  update(false);
  applyI18n();
});
