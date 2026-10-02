/* ============================================================
   DezoMax — Marvel sahifasi (marvel.html)
   Marvel Studios filmlari: ro'yxat (yangisi birinchi) va har bir film haqida —
   rasmiy treyler, aktyorlar, rejissyor, chiqish sanasi, byudjet va kassa daromadi.
   Ro'yxat, poster, treyler va tavsif — js/data.js (franchise: 'marvel');
   sana, aktyorlar, byudjet, kassa — js/marvel-data.js (Wikidata, tools/fetch-marvel.js).
   URL: marvel.html — ro'yxat, marvel.html?id=40 — film
   ============================================================ */

const MX_TXT = {
  uz: {
    kicker: 'Marvel Studios', title: 'Marvel filmlari', sub: 'Rasmiy treylerlar, aktyorlar, byudjet va kassa daromadi',
    films: 'film', total: 'Jami kassa', soon: 'Tez orada', out: 'Kinoteatrlarda chiqqan', all: 'Barcha filmlar',
    back: 'Barcha Marvel filmlari', trailer: 'Rasmiy treyler', cast: 'Aktyorlar', director: 'Rejissyor',
    release: 'Premyera', runtime: 'Davomiyligi', min: 'daq.', budget: 'Byudjet', gross: 'Kassa (butun dunyo)',
    ratio: 'byudjetdan', profit: 'Foyda', noData: 'Ma’lumot hali yo‘q', play: 'Treylerni ko‘rish',
    src: 'Byudjet, kassa va aktyorlar: Wikidata (ochiq ma’lumotlar).', srcYt: 'Treyler: {ch} rasmiy YouTube kanali.', trailerPlain: 'Treyler',
    mln: 'mln', mlrd: 'mlrd', notFound: 'Film topilmadi'
  },
  ru: {
    kicker: 'Marvel Studios', title: 'Фильмы Marvel', sub: 'Официальные трейлеры, актёры, бюджет и кассовые сборы',
    films: 'фильмов', total: 'Общие сборы', soon: 'Скоро', out: 'Вышли в кинотеатрах', all: 'Все фильмы',
    back: 'Все фильмы Marvel', trailer: 'Официальный трейлер', cast: 'Актёры', director: 'Режиссёр',
    release: 'Премьера', runtime: 'Длительность', min: 'мин.', budget: 'Бюджет', gross: 'Сборы (мир)',
    ratio: 'от бюджета', profit: 'Прибыль', noData: 'Данных пока нет', play: 'Смотреть трейлер',
    src: 'Бюджет, сборы и актёры: Wikidata (открытые данные).', srcYt: 'Трейлер: официальный YouTube-канал {ch}.', trailerPlain: 'Трейлер',
    mln: 'млн', mlrd: 'млрд', notFound: 'Фильм не найден'
  }
};
const mx = k => (MX_TXT[LANG] || MX_TXT.uz)[k];

const MX_MONTHS = {
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

// faqat filmlar (WandaVision kabi seriallar — o'z sahifasida)
function mxFilms() {
  const all = MOVIES.concat(typeof PART_MOVIES !== 'undefined' ? [...PART_MOVIES.values()] : []);
  const seen = new Set();
  return all.filter(m => m && m.franchise === 'marvel' && m.type !== 'serial' && !seen.has(m.id) && seen.add(m.id))
    .map(m => {
      const info = (typeof MARVEL_INFO !== 'undefined' && MARVEL_INFO[m.id]) || {};
      const date = info.date || (m.year ? `${m.year}-12-31` : '');
      return { m, info, date, exact: !!info.date };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const mxToday = new Date().toISOString().slice(0, 10);
function mxDate(f, short = false) {
  if (!f.exact) return String(f.m.year || '');
  const [y, mo, d] = f.date.split('-').map(Number);
  const mon = MX_MONTHS[LANG] || MX_MONTHS.uz;
  if (short) return f.date > mxToday ? `${d} ${mon[mo - 1]} ${y}` : String(y);
  return LANG === 'ru' ? `${d} ${mon[mo - 1]} ${y}` : `${d}-${mon[mo - 1]}, ${y}`;
}
function mxMoney(n) {
  if (!n) return '';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2).replace(/\.?0+$/, '')} ${mx('mlrd')}`;
  return `$${Math.round(n / 1e6)} ${mx('mln')}`;
}
const mxYt = url => (String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) || [])[1] || '';

/* ---------- Ro'yxat ---------- */
function mxListHTML() {
  const films = mxFilms();
  const soon = films.filter(f => f.date > mxToday);
  const out = films.filter(f => f.date <= mxToday);
  const total = out.reduce((s, f) => s + (f.info.gross || 0), 0);
  const card = f => `
    <a class="mx-card" href="marvel.html?id=${f.m.id}" data-mx="${f.m.id}">
      <span class="mx-poster">${posterHTML(f.m)}</span>
      <b>${esc(title(f.m))}</b>
      <small>${esc(mxDate(f, true))}</small>
    </a>`;
  return `
    <section class="mx-hero">
      <div class="wrap">
        <span class="mx-logo">MARVEL</span>
        <h1>${mx('title')}</h1>
        <p>${mx('sub')}</p>
        <div class="mx-stats">
          <span><b>${films.length}</b> ${mx('films')}</span>
          ${total ? `<span><b>${mxMoney(total)}</b> ${mx('total')}</span>` : ''}
        </div>
      </div>
    </section>
    <div class="wrap mx-body">
      ${soon.length ? `<h2 class="mx-h2">${mx('soon')}</h2><div class="mx-grid">${soon.map(card).join('')}</div>` : ''}
      <h2 class="mx-h2">${soon.length ? mx('out') : mx('all')}</h2>
      <div class="mx-grid">${out.map(card).join('')}</div>
    </div>`;
}

/* ---------- Film ---------- */
function mxFilmHTML(f) {
  const { m, info } = f;
  // rasmiy treyler (studiya kanali, js/marvel-data.js) bo'lmasa — katalogdagi treyler, «rasmiy» deb yozilmaydi
  const yt = info.yt || mxYt(m.trailer);
  const official = !!info.yt;
  const ratio = info.budget && info.gross ? info.gross / info.budget : 0;
  // avval katalogdagi bosh rollar (tartibi to'g'ri), keyin Wikidata'dagi qolganlari
  const cast = [...new Set([...(m.cast || []), ...(info.cast || [])])].slice(0, 12);
  const director = info.director && info.director.length ? info.director.join(', ') : m.director || '';
  const runtime = info.runtime || m.duration;
  return `
    <section class="mx-film">
      <div class="mx-film-bg" style="background-image:url('${esc(m.poster || '')}')"></div>
      <div class="wrap">
        <a class="mx-back" href="marvel.html" data-mx-back>${ICONS.left}<span>${mx('back')}</span></a>
        <div class="mx-film-top">
          <div class="mx-film-poster">${posterHTML(m)}</div>
          <div class="mx-film-info">
            <span class="mx-logo mx-logo-sm">MARVEL STUDIOS</span>
            <h1>${esc(title(m))}</h1>
            ${info.en && info.en !== title(m) ? `<div class="mx-en">${esc(info.en)}</div>` : ''}
            <dl class="mx-facts">
              ${f.exact || m.year ? `<div><dt>${mx('release')}</dt><dd>${esc(mxDate(f))}</dd></div>` : ''}
              ${runtime ? `<div><dt>${mx('runtime')}</dt><dd>${runtime} ${mx('min')}</dd></div>` : ''}
              ${director ? `<div><dt>${mx('director')}</dt><dd>${esc(director)}</dd></div>` : ''}
            </dl>
            ${descOf(m) ? `<p class="mx-desc">${esc(descOf(m))}</p>` : ''}
            ${yt ? `<a class="btn btn-primary mx-play" href="#mxTrailer">${ICONS.play}<span>${mx('play')}</span></a>` : ''}
          </div>
        </div>

        <div class="mx-money">
          <div class="mx-money-item"><small>${mx('budget')}</small><b>${info.budget ? mxMoney(info.budget) : `<i>${mx('noData')}</i>`}</b></div>
          <div class="mx-money-item is-gross"><small>${mx('gross')}</small><b>${info.gross ? mxMoney(info.gross) : `<i>${mx('noData')}</i>`}</b></div>
          ${ratio ? `<div class="mx-money-item is-ratio"><small>${mx('profit')}</small><b>×${ratio.toFixed(1)}</b><em>${mx('ratio')}</em>
            <span class="mx-bar"><i style="width:${Math.min(100, Math.round(100 / ratio))}%"></i></span></div>` : ''}
        </div>

        ${yt ? `
        <h2 class="mx-h2" id="mxTrailer">${official ? mx('trailer') : mx('trailerPlain')}</h2>
        <div class="mx-trailer" data-yt="${yt}">
          <img src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt="" loading="lazy">
          <button type="button" class="mx-trailer-play" aria-label="${esc(mx('play'))}">${ICONS.play}</button>
        </div>` : ''}

        ${cast.length ? `
        <h2 class="mx-h2">${mx('cast')}</h2>
        <ul class="mx-cast">${cast.map(n => `<li><span class="mx-cast-av">${esc(n.split(/\s+/).map(w => w[0]).join('').slice(0, 2))}</span><b>${esc(n)}</b></li>`).join('')}</ul>` : ''}

        <p class="mx-src">${mx('src')}${official ? ' ' + esc(mx('srcYt').replace('{ch}', info.ytCh)) : ''}</p>
      </div>
    </section>`;
}

/* ---------- Chizish ---------- */
function mxRender() {
  const root = document.getElementById('marvel');
  const id = Number(new URLSearchParams(location.search).get('id'));
  const f = id ? mxFilms().find(x => x.m.id === id) : null;
  if (id && !f) {
    root.innerHTML = `<div class="wrap mx-body"><p class="mx-empty">${mx('notFound')}</p><a class="btn btn-primary" href="marvel.html">${mx('back')}</a></div>`;
    return;
  }
  root.innerHTML = f ? mxFilmHTML(f) : mxListHTML();
  document.title = f ? `${title(f.m)} — Marvel | DezoMax` : `${mx('title')} — ${mx('sub').toLowerCase()} | DezoMax`;

  // treyler — bosilganda YouTube pleyeri (oldindan yuklanmaydi)
  root.querySelector('.mx-trailer')?.addEventListener('click', e => {
    const box = e.currentTarget;
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${box.dataset.yt}?autoplay=1&rel=0&modestbranding=1"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="${esc(mx('trailer'))}"></iframe>`;
    box.classList.add('is-on');
  }, { once: true });
  root.querySelector('.mx-play')?.addEventListener('click', e => {
    e.preventDefault();
    const tr = root.querySelector('.mx-trailer');
    tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    tr.click();
  });
  // ro'yxat ↔ film: sahifani qayta yuklamasdan
  root.querySelectorAll('[data-mx]').forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    history.pushState(null, '', a.getAttribute('href'));
    mxRender(); window.scrollTo(0, 0);
  }));
  root.querySelector('[data-mx-back]')?.addEventListener('click', e => {
    e.preventDefault();
    history.pushState(null, '', 'marvel.html');
    mxRender(); window.scrollTo(0, 0);
  });
}

window.addEventListener('popstate', mxRender);
document.addEventListener('langchange', mxRender);
initLayout();
mxRender();
