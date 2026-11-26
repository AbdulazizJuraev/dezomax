/* ============================================================
   DezoMax — katalog / каталог
   URL parametrlari: ?q=qidiruv&type=film&genre=action&sort=rating
   ============================================================ */

const params = new URLSearchParams(location.search);
window.CARD_TAGS_BELOW = true;                       // kartochka yozuvlari poster ostida (js/common.js cardHTML)
document.body.classList.add('page-catalog');        // telefonda qatorda 2 ta (css)

const state = {
  q:         params.get('q') || '',
  type:      params.get('type') || 'all',
  genre:     params.get('genre') || 'all',
  franchise: params.get('franchise') || 'all',
  watch:     params.get('watch') || 'all',        // all | uz | trailer
  sort:      params.get('sort') || 'new',
  lang:      LANG_ROWS[params.get('lang')] ? params.get('lang') : '',   // ru | en — shu tildagi to'liq kinolar
  studio:    params.get('studio') || ''            // kinostudiya — faqat rasmiy kanaldan kelgan treylerlar (js/common.js STUDIOS)
};

const WATCH = [['uz', 'watch.filterUz'], ['trailer', 'watch.filterTrailer']];
const TYPES = ['film', 'serial', 'multfilm'];
const FRANCHISES = ['uzbek', 'konsert', 'tahlil', 'dorama', 'anime', 'hind', 'marvel', 'dc'];
const SORTS = ['new', 'old', 'rating', 'name'];

/* ---------- Filtrlar ---------- */

/* Filtr chiplari sahifadan olib tashlangan — faqat qidiruv qatori qoldi.
   Turi/janr/olam filtrlari URL orqali ishlayveradi (bosh sahifadagi «Hammasi» havolalari). */
function renderFilters() {}

/* ---------- Filtrlash + saralash ---------- */

/* Uzun so'rov — oddiy substring. Qisqa so'rov ("dc", "bak") esa faqat
   butun so'z sifatida qidiriladi, aks holda "Radcliffe" ham "dc" ga mos kelib qoladi. */
function matcher(q) {
  if (q.length > 3) return hay => hay.includes(q);
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(^|[^a-z0-9])' + esc + '([^a-z0-9]|$)');
  return hay => re.test(hay);
}

/* Qidiruv matni har kino uchun bir marta tayyorlanadi (20 000+ kinoda har harfda qayta hisoblash sekin) */
const HAY = new WeakMap();
function hayOf(m) {
  let h = HAY.get(m);
  if (h === undefined) {
    h = norm([
      m.title.uz, m.title.ru, m.director || '', String(m.year || ''), m.source?.name || '',
      m.franchise || '',
      ...(m.tags || []),
      ...(m.cast || []),
      ...m.genres.map(g => { const x = GENRES.find(y => y.id === g); return x ? x.uz + ' ' + x.ru : g; })
    ].join(' '));
    HAY.set(m, h);
  }
  return h;
}

function filtered() {
  const q = norm(state.q);
  const hit = q ? matcher(q) : null;

  let list = MOVIES.filter(m => {
    if (state.type !== 'all' && m.type !== state.type) return false;
    if (state.genre !== 'all' && !m.genres.includes(state.genre)) return false;
    if (state.franchise !== 'all' && m.franchise !== state.franchise) return false;
    if (state.franchise !== 'tahlil' && isExtraVideo(m)) return false;      // katalog — kinolar (tahlillar o'z bo'limida)
    if (!q && isDupCopy(m)) return false;                                     // bitta filmning takror yozuvlari — faqat eng yaxshisi (js/common.js); qidiruvda hammasi topiladi
    if (state.studio && (m.franchise !== state.studio || !m.ch)) return false;
    if (state.watch !== 'trailer' && !state.studio && isTrailerOnly(m)) return false;
    if (state.lang && (audioLang(m) !== state.lang || !m.video || m.type === 'serial')) return false;
    if (state.watch !== 'all' && watchStatus(m) !== state.watch) return false;
    return !hit || hit(hayOf(m));
  });

  const sorters = {
    new:    (a, b) => (b.year || 0) - (a.year || 0),
    old:    (a, b) => (a.year || 9999) - (b.year || 9999),
    rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    name:   (a, b) => title(a).localeCompare(title(b), LANG === 'ru' ? 'ru' : 'uz')
  };

  // posteri borlar oldinda (kutubxonadagi ba'zi kinolarda muqova yo'q)
  // kanal videolari (kino tahlillari) — kanaldagi tartibda, yangisi birinchi
  const by = state.franchise === 'tahlil' && state.sort === 'new' ? (a, b) => (b.addedAt || 0) - (a.addedAt || 0)
    : sorters[state.sort] || sorters.new;
  // sifatli posterlilar oldinda (2026-11-20): TMDB/Wikimedia/saytdagi rasm → YouTube → Telegram kichik rasmi → postersiz;
  // serialning alohida qo'yilgan qismlari («9-qism», «7 серия») — bir pog'ona pastroqda
  return list.sort((a, b) => (posterQ(b) - posterQ(a)) || by(a, b));
}

const PQ = new WeakMap();
const EP_RX = /(^|[\s«"(])\d+\s*[-–]?\s*(qism|qisim|seriya|серия|серии)|(^|\s)(qism|серия|seriya)\s*\d+/i;
function posterQ(m) {
  let q = PQ.get(m);
  if (q !== undefined) return q;
  const p = String(m.hposter || m.poster || '');
  q = !p ? 0 : /dezocloud\.uz\/t\//.test(p) ? 2 : /i\.ytimg\.com|img\.youtube\.com/.test(p) ? 4 : 6;
  if (EP_RX.test(title(m))) q -= 1;
  PQ.set(m, q);
  return q;
}

/* Film | Serial tugmalari — tepada (2026-11-20) */
function renderTabs() {
  let el = document.getElementById('catTabs');
  const show = (state.type === 'film' || state.type === 'serial') && !state.q && state.franchise === 'all' && !state.studio && !state.lang && state.watch === 'all';
  if (!show) { el?.remove(); return; }
  if (!el) {
    el = document.createElement('div');
    el.id = 'catTabs';
    el.className = 'cat-tabs';
    el.setAttribute('role', 'tablist');
    document.querySelector('.cat-search').before(el);
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-type]');
      if (!b || b.dataset.type === state.type) return;
      state.type = b.dataset.type;
      renderTabs();
      update();
      window.scrollTo({ top: 0 });
    });
  }
  el.innerHTML = ['film', 'serial'].map(k => `<button type="button" role="tab" data-type="${k}" aria-selected="${state.type === k}" class="${state.type === k ? 'is-on' : ''}">${k === 'film' ? (LANG === 'ru' ? 'Фильмы' : 'Filmlar') : (LANG === 'ru' ? 'Сериалы' : 'Seriallar')}</button>`).join('');
}

/* ---------- Janr sahifasi (2026-11-26) ----------
   catalog.html?genre=crime — faqat janr tanlangan bo'lsa (qidiruv/tur/olam yo'q): tepada janrning o'z banneri
   (rangi bosh sahifadagi plitka bilan bir xil, kinolar soni, o'rtacha reyting, tavsif, eng yaxshi 5 ta poster,
   «Tasodifiy kino»), ostida boshqa janrlar tugmalari va saralash; pastda — shu janrdagi barcha kinolar (odatdagi panjara). */
const GENRE_HUE = { comedy: 38, action: 2, drama: 265, scifi: 190, animation: 320, history: 95, thriller: 225, crime: 18, fantasy: 290, adventure: 140, romance: 340, family: 165, horror: 0, war: 80, detective: 210, biography: 30 };
const GENRE_DESC = {
  crime: ['Jinoyat olami, tergov va qasos: o‘g‘rilar, mafiya va ularni ta’qib qilayotgan detektivlar haqidagi filmlar.', 'Мир преступности, расследования и мести: фильмы о грабителях, мафии и детективах.'],
  action: ['Ta’qiblar, janglar va portlashlar — nafasni ichga yuttiradigan jangari filmlar.', 'Погони, драки и взрывы — фильмы, от которых захватывает дух.'],
  comedy: ['Kayfiyatni ko‘taradigan, butun oila bilan kulib ko‘riladigan komediyalar.', 'Комедии, которые поднимают настроение — смотреть всей семьёй.'],
  drama: ['Hayotiy voqealar, kuchli his-tuyg‘ular va esda qoladigan taqdirlar.', 'Жизненные истории, сильные эмоции и запоминающиеся судьбы.'],
  scifi: ['Kelajak, koinot va texnologiyalar — fantastik olamlarga sayohat.', 'Будущее, космос и технологии — путешествие в фантастические миры.'],
  thriller: ['Oxirigacha taranglik: sirlar, xavf va kutilmagan burilishlar.', 'Напряжение до последней минуты: тайны, опасность и неожиданные повороты.'],
  fantasy: ['Sehr, afsonaviy mavjudotlar va qahramonlarning buyuk sarguzashtlari.', 'Магия, мифические существа и великие приключения героев.'],
  adventure: ['Uzoq safarlar, xazinalar va xavfli sarguzashtlar.', 'Далёкие путешествия, сокровища и опасные приключения.'],
  romance: ['Sevgi, ayriliq va uchrashuvlar haqidagi ta’sirli hikoyalar.', 'Трогательные истории о любви, разлуке и встречах.'],
  family: ['Kattayu kichik birga ko‘radigan iliq va mehribon filmlar.', 'Тёплые и добрые фильмы для просмотра всей семьёй.'],
  history: ['Tarixning muhim voqealari va buyuk shaxslar haqida filmlar.', 'Фильмы о важных событиях истории и великих личностях.'],
  animation: ['Bolalar va kattalar uchun eng yaxshi multfilmlar.', 'Лучшие мультфильмы для детей и взрослых.']
};
const isGenrePage = () => state.genre !== 'all' && !state.q && state.type === 'all' && state.franchise === 'all' && !state.studio && !state.lang && state.watch === 'all';
const ghPoster = m => { const p = String(m.vposter || m.poster || ''); return /image\.tmdb\.org/.test(p) ? p.replace(/\/w\d+\//, '/w342/') : /^images\//.test(p) ? p : ''; };

function renderGenreHero(list) {
  const on = isGenrePage();
  document.body.classList.toggle('is-genre', on);
  let box = document.getElementById('genreHero');
  if (!on) { box?.remove(); return; }
  if (!box) {
    box = document.createElement('div');
    box.id = 'genreHero';
    document.querySelector('.cat-search').before(box);
    box.addEventListener('click', e => {
      const g = e.target.closest('[data-genre]');
      if (g) { state.genre = g.dataset.genre; update(); window.scrollTo({ top: 0 }); return; }
      const s = e.target.closest('[data-sort]');
      if (s) { state.sort = s.dataset.sort; update(); return; }
      const r = e.target.closest('[data-random]');
      if (r) {
        const pool = filtered().filter(m => m.video && watchStatus(m) !== 'trailer');
        if (pool.length) { e.preventDefault(); location.href = movieHref(pool[Math.floor(Math.random() * pool.length)]); }
      }
    });
  }
  const ru = LANG === 'ru', g = state.genre, h = GENRE_HUE[g] ?? 150;
  const rated = list.filter(m => m.rating);
  const avg = rated.length ? (rated.reduce((s, m) => s + +m.rating, 0) / rated.length).toFixed(1) : '';
  const top = list.filter(m => ghPoster(m) && m.rating).sort((a, b) => b.rating - a.rating).slice(0, 5);
  const desc = (GENRE_DESC[g] || [])[ru ? 1 : 0] || (ru ? 'Все фильмы этого жанра на DezoMax.' : 'Shu janrdagi barcha kinolar — DezoMax’da.');
  const sorts = [['new', ru ? 'Новые' : 'Yangilari'], ['rating', ru ? 'По рейтингу' : 'Reyting'], ['name', 'A–Z']];
  box.innerHTML = `
    <section class="gh" style="--h:${h}">
      <div class="gh-tx">
        <span class="gh-kick">${ru ? 'Жанр' : 'Janr'}</span>
        <h1>${esc(genreName(g))}</h1>
        <p class="gh-meta"><b>${list.length.toLocaleString(ru ? 'ru' : 'uz').replace(/,/g, ' ')}</b> ${ru ? 'фильмов' : 'ta kino'}${avg ? ` · <span class="gh-rt">★ ${avg}</span> ${ru ? 'средний рейтинг' : 'o‘rtacha reyting'}` : ''}</p>
        <p class="gh-desc">${esc(desc)}</p>
        <div class="gh-acts">
          <a class="gh-go" href="#" data-random>${ICONS.play}${ru ? 'Случайный фильм' : 'Tasodifiy kino'}</a>
          <button type="button" class="gh-top${state.sort === 'rating' ? ' is-on' : ''}" data-sort="rating">★ ${ru ? 'Лучшие' : 'Eng yaxshilari'}</button>
        </div>
      </div>
      <div class="gh-fan" aria-hidden="true">${top.map(m => `<img src="${esc(ghPoster(m))}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`).join('')}</div>
    </section>
    <div class="gh-genres" role="tablist">${GENRES.map(x => `<button type="button" role="tab" data-genre="${x.id}" class="${x.id === g ? 'is-on' : ''}" aria-selected="${x.id === g}" style="--h:${GENRE_HUE[x.id] ?? 150}">${esc(ru ? x.ru : x.uz)}</button>`).join('')}</div>
    <div class="gh-sort"><span>${ru ? 'Сортировка:' : 'Saralash:'}</span>${sorts.map(([k, l]) => `<button type="button" data-sort="${k}" class="${state.sort === k ? 'is-on' : ''}">${l}</button>`).join('')}</div>`;
  // tanlangan janr tugmasi qatorning o'rtasida ko'rinsin (faqat qator suriladi, sahifa emas)
  const row = box.querySelector('.gh-genres'), cur = row.querySelector('.is-on');
  if (cur) row.scrollLeft = cur.offsetLeft - row.clientWidth / 2 + cur.offsetWidth / 2;
}

/* ---------- Chizish ---------- */

function update(pushUrl = true, keep = 0) {
  const list = filtered();
  renderGenreHero(list);
  const grid = document.getElementById('grid');

  if (list.length) {
    grid.className = 'grid';
    renderCards(grid, list, keep);
  } else {
    grid.className = '';
    // ro'yxat hali to'liq emas (bo'laklar yuklanmoqda) — «topilmadi» demaymiz, to'liq kelgach qayta chiziladi
    grid.innerHTML = window.dzxData && !dzxData.done ? '' : emptyHTML('search.empty', 'search.emptyHint');
  }

  document.getElementById('count').textContent = resultsText(list.length);

  // «Seriallar» sahifasi — kartalar 16:9 (css: .is-serials); boshqa sahifalar odatdagidek
  document.body.classList.toggle('is-serials', state.type === 'serial');

  // Sarlavha
  const h = document.getElementById('pageTitle');
  if (state.q)                      h.textContent = `${t('search.results')}: "${state.q}"`;
  else if (state.lang)              h.textContent = LANG_ROWS[state.lang][LANG === 'ru' ? 1 : 0];
  else if (state.watch !== 'all')   h.textContent = t(state.watch === 'uz' ? 'watch.filterUz' : 'watch.filterTrailer');
  else if (state.studio && typeof studioOf === 'function' && studioOf(state.studio)) h.textContent = studioOf(state.studio).name + (LANG === 'ru' ? ' — официальные трейлеры' : ' — rasmiy treylerlar');
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
    if (state.studio) p.set('studio', state.studio);
    if (state.lang) p.set('lang', state.lang);
    if (state.watch !== 'all') p.set('watch', state.watch);
    if (state.sort !== 'new') p.set('sort', state.sort);
    const url = p.toString() ? '?' + p : location.pathname;
    history.replaceState(null, '', url);
  }
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderFilters();
renderTabs();

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

// kinolarning qolgan bo'laklari yuklandi (js/data-site.js) — ro'yxat to'liq, ko'rilgan joy saqlanadi
document.addEventListener('dzx:full', () => update(false, document.querySelectorAll('#grid > .card, #grid > *').length));

document.addEventListener('langchange', () => {
  renderFilters();
  renderTabs();
  update(false);
  applyI18n();
});
