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
  watch:     params.get('watch') || 'all',        // all | uz | trailer
  sort:      params.get('sort') || 'new'
};

const WATCH = [['uz', 'watch.filterUz'], ['trailer', 'watch.filterTrailer']];
const TYPES = ['film', 'serial', 'multfilm'];
const FRANCHISES = ['uzbek', 'konsert', 'marvel', 'dc'];
const SORTS = ['new', 'old', 'rating', 'name'];

/* ---------- Filtrlar ---------- */

/* Filtr chiplari sahifadan olib tashlangan — faqat qidiruv qatori qoldi.
   Turi/janr/olam filtrlari URL orqali ishlayveradi (bosh sahifadagi «Hammasi» havolalari). */
function renderFilters() {}

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
    if (state.watch !== 'all' && watchStatus(m) !== state.watch) return false;
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
  else if (state.watch !== 'all')   h.textContent = t(state.watch === 'uz' ? 'watch.filterUz' : 'watch.filterTrailer');
  else if (state.franchise !== 'all') h.textContent = t('row.' + state.franchise);
  else if (state.type !== 'all')    h.textContent = typeName(state.type);
  else if (state.genre !== 'all')   h.textContent = genreName(state.genre);
  else                              h.textContent = t('catalog.title');

  if (pushUrl) {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.type !== 'all') p.set('type', state.type);
    if (state.genre !== 'all') p.set('genre', state.genre);
    if (state.franchise !== 'all') p.set('franchise', state.franchise);
    if (state.watch !== 'all') p.set('watch', state.watch);
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
input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
input.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => { state.q = input.value.trim(); update(); }, 180);
});

update(false);
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderFilters();
  update(false);
  applyI18n();
});
