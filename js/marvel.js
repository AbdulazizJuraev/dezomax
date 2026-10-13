/* ============================================================
   DezoMax — Marvel sahifasi (marvel.html)
   Marvel Studios filmlari: ro'yxat (yangisi birinchi) va har bir film haqida —
   rasmiy treyler, aktyorlar, rejissyor, chiqish sanasi, byudjet va kassa daromadi.
   Ro'yxat, poster, treyler va tavsif — js/data.js (franchise: 'marvel');
   sana, aktyorlar, byudjet, kassa — js/marvel-data.js (Wikidata, tools/fetch-marvel.js).
   URL: marvel.html — ro'yxat, marvel/<nom>.html — film (tools/gen-marvel-pages.js tayyorlaydi, window.MX_ID)
   ============================================================ */

const MX_TXT = {
  uz: {
    kicker: 'Marvel Studios', title: 'Marvel filmlari', sub: 'Rasmiy treylerlar, aktyorlar, byudjet va kassa daromadi',
    films: 'film', total: 'Jami kassa', soon: 'Tez orada', out: 'Kinoteatrlarda chiqqan', all: 'Barcha filmlar',
    back: 'Barcha Marvel filmlari', trailer: 'Rasmiy treyler', cast: 'Aktyorlar', director: 'Rejissyor',
    release: 'Premyera', runtime: 'Davomiyligi', min: 'daq.', budget: 'Byudjet', gross: 'Kassa (butun dunyo)',
    ratio: 'byudjetdan', profit: 'Foyda', noData: 'Ma’lumot hali yo‘q', play: 'Treylerni ko‘rish', watch: 'Kinoni ko‘rish', video: 'Video', pickLang: 'Tilni tanlang — video shu yerda ochiladi',
    src: 'Byudjet, kassa va aktyorlar: Wikidata (ochiq ma’lumotlar), yangi filmlar kassasi — Box Office Mojo. Aktyor suratlari: Wikimedia Commons.', srcYt: 'Treyler: {ch} rasmiy YouTube kanali.', trailerPlain: 'Treyler',
    mln: 'mln', mlrd: 'mlrd', notFound: 'Film topilmadi'
  },
  ru: {
    kicker: 'Marvel Studios', title: 'Фильмы Marvel', sub: 'Официальные трейлеры, актёры, бюджет и кассовые сборы',
    films: 'фильмов', total: 'Общие сборы', soon: 'Скоро', out: 'Вышли в кинотеатрах', all: 'Все фильмы',
    back: 'Все фильмы Marvel', trailer: 'Официальный трейлер', cast: 'Актёры', director: 'Режиссёр',
    release: 'Премьера', runtime: 'Длительность', min: 'мин.', budget: 'Бюджет', gross: 'Сборы (мир)',
    ratio: 'от бюджета', profit: 'Прибыль', noData: 'Данных пока нет', play: 'Смотреть трейлер', watch: 'Смотреть фильм', video: 'Видео', pickLang: 'Выберите язык — видео откроется здесь',
    src: 'Бюджет, сборы и актёры: Wikidata (открытые данные), сборы новых фильмов — Box Office Mojo. Фото актёров: Wikimedia Commons.', srcYt: 'Трейлер: официальный YouTube-канал {ch}.', trailerPlain: 'Трейлер',
    mln: 'млн', mlrd: 'млрд', notFound: 'Фильм не найден'
  }
};
const mx = k => (MX_TXT[LANG] || MX_TXT.uz)[k];

const MX_MONTHS = {
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

// Marvel Studios filmlari — js/marvel-films.js (to'liq ro'yxat: treyler, kassa; katalogga qo'shilmaydi)
function mxFilms() {
  const seen = new Set();
  return (typeof MARVEL_FILMS !== 'undefined' ? MARVEL_FILMS : []).filter(m => m && !seen.has(m.id) && seen.add(m.id))
    .map(m => {
      // Wikidata (js/marvel-data.js) + admin'da kiritilgani (m.mx); admin treyler qo'ysa — «rasmiy» faqat Wikidata ro'yxatidagisi
      const wd = (typeof MARVEL_INFO !== 'undefined' && MARVEL_INFO[m.id]) || {};
      const info = { ...wd, ...(m.mx || {}) };
      if (m.mx && m.mx.yt && m.mx.yt !== wd.yt && !m.mx.ytCh) delete info.ytCh;   // kanaldan kelgani (mx.ytCh) — rasmiy
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
/* Film sahifasining nomi: inglizcha nomidan (tools/gen-marvel-pages.js ham xuddi shunday) */
const mxSlug = (m, info) => String((info && info.en) || m.slug || m.id).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// tayyor sahifa (marvel/<nom>.html) faqat rasmiy video/treyleri borlarga yasaladi (tools/gen-marvel-pages.js) —
// qolganlari shu sahifaning o'zida ochiladi (marvel.html?id=N), aks holda 404 chiqardi
const MX_OFFICIAL = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|upload\.wikimedia\.org)\//i;
const mxHref = f => MX_OFFICIAL.test(String(f.m.video || f.m.trailer || '').trim()) ? `marvel/${mxSlug(f.m, f.info)}.html` : `marvel.html?id=${f.m.id}`;
const mxYt = url => (String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) || [])[1] || '';

/* ---------- Ro'yxat ---------- */
function mxListHTML() {
  const films = mxFilms();
  const soon = films.filter(f => f.date > mxToday);
  const out = films.filter(f => f.date <= mxToday);
  const total = out.reduce((s, f) => s + (f.info.gross || 0), 0);
  const card = f => `
    <a class="mx-card" href="${mxHref(f)}">
      <span class="mx-poster">${posterHTML(f.m)}</span>
      <b>${esc(title(f.m))}</b>
      <small>${esc(mxDate(f, true))}${f.info.gross ? ` · <em class="mx-card-gross">${mxMoney(f.info.gross)}</em>` : ''}</small>
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

/* Boshqa nomlari (teglar): ruscha, inglizcha va katalogdagi teglar — qidiruvda shular bilan ham topiladi */
function mxAka(f) {
  const own = title(f.m).toLowerCase();
  return [...new Set([f.m.title.uz, f.m.title.ru, f.info.en, ...(f.m.tags || [])])]
    .filter(x => x && x.length > 2 && x.toLowerCase() !== own && !/^(marvel|dc|tez orada|скоро)$/i.test(x));
}

/* ---------- Film ---------- */
function mxFilmHTML(f) {
  const { m, info } = f;
  // rasmiy treyler (studiya kanali, js/marvel-data.js) bo'lmasa — katalogdagi treyler, «rasmiy» deb yozilmaydi
  const yt = info.yt || mxYt(m.trailer);
  const official = !!(info.yt && info.ytCh);
  const ratio = info.budget && info.gross ? info.gross / info.budget : 0;
  // avval katalogdagi bosh rollar (tartibi to'g'ri), keyin Wikidata'dagi qolganlari
  const cast = [...new Set([...(m.cast || []), ...(info.cast || [])])].slice(0, 12);
  const director = info.director && info.director.length ? info.director.join(', ') : m.director || '';
  const runtime = info.runtime || m.duration;
  // «Kinoni ko'rish» — faqat filmning o'zi saytda qonuniy manbadan (rasmiy YouTube / Wikimedia) bo'lsa
  const watch = MX_OFFICIAL.test(String(m.video || '').trim()) && mxYt(m.video) !== yt ? m.video : '';
  return `
    <section class="mx-film">
      <div class="mx-film-art" aria-hidden="true"><img src="${esc(m.poster || '')}" alt="" decoding="async"></div>
      <div class="wrap">
        <a class="mx-back" href="marvel.html" data-mx-back>${ICONS.left}<span>${mx('back')}</span></a>
        <div class="mx-film-top">
          <div class="mx-film-poster">${posterHTML(m)}</div>
          <div class="mx-film-info">
            <span class="mx-logo mx-logo-sm">MARVEL STUDIOS</span>
            <h1>${esc(title(m))}${f.exact || m.year ? ` <span class="mx-year">(${esc(String(f.date || m.year).slice(0, 4))})</span>` : ''}</h1>
            ${mxAka(f).length ? `<div class="mx-aka">${LANG === 'ru' ? 'Также известен как' : 'Boshqa nomlari'}: ${esc(mxAka(f).join(' · '))}</div>` : ''}
            <dl class="mx-facts">
              ${f.exact || m.year ? `<div><dt>${mx('release')}</dt><dd>${esc(mxDate(f))}</dd></div>` : ''}
              ${runtime ? `<div><dt>${mx('runtime')}</dt><dd>${runtime} ${mx('min')}</dd></div>` : ''}
              ${director ? `<div><dt>${mx('director')}</dt><dd>${esc(director)}</dd></div>` : ''}
            </dl>
            ${descOf(m) ? `<p class="mx-desc">${esc(descOf(m))}</p>` : ''}
            <div class="mx-btns">
              ${yt ? `<a class="mx-btn mx-play" href="#mxTrailer">${ICONS.play}<span>${mx('play')}</span></a>` : ''}
              ${watch ? `<a class="mx-btn" href="${esc(watch)}" target="_blank" rel="noopener">${ICONS.play}<span>${mx('watch')}</span></a>` : ''}
            </div>
          </div>
        </div>

        <h2 class="mx-h2 mx-h2-trailer" id="mxTrailer">${yt ? (official ? mx('trailer') : mx('trailerPlain')) : mx('video')}</h2>
        ${typeof rtBarHTML === 'function' ? rtBarHTML(`marvel:${m.id}`, { always: true, backLabel: yt ? mx('trailerPlain') : '' }) : ''}
        <div class="player-wrap mx-trailer" id="mxPlayer" data-yt="${yt}">${yt ? '' : `<p class="mx-noplay">${mx('pickLang')}</p>`}</div>

        <div class="mx-money">
          <div class="mx-money-item"><small>${mx('budget')}</small><b>${info.budget ? mxMoney(info.budget) : `<i>${mx('noData')}</i>`}</b></div>
          <div class="mx-money-item is-gross"><small>${mx('gross')}</small><b>${info.gross ? mxMoney(info.gross) : `<i>${mx('noData')}</i>`}</b></div>
          ${ratio ? `<div class="mx-money-item is-ratio"><small>${mx('profit')}</small><b>×${ratio.toFixed(1)}</b><em>${mx('ratio')}</em>
            <span class="mx-bar"><i style="width:${Math.min(100, Math.round(100 / ratio))}%"></i></span></div>` : ''}
        </div>


        ${cast.length ? `
        <h2 class="mx-h2">${mx('cast')}</h2>
        <ul class="mx-cast">${cast.map(n => {
          // surat (Wikimedia Commons) — yuklanmasa bosh harflar qoladi
          const ph = typeof MARVEL_PHOTOS !== 'undefined' && MARVEL_PHOTOS[n];
          return `<li><span class="mx-cast-av">${esc(n.split(/\s+/).map(w => w[0]).join('').slice(0, 2))}${ph ? `<img src="${esc(ph)}" alt="${esc(n)}" loading="lazy" onerror="this.remove()">` : ''}</span><b>${esc(n)}</b></li>`;
        }).join('')}</ul>` : ''}

        <p class="mx-src">${mx('src')}${official ? ' ' + esc(mx('srcYt').replace('{ch}', info.ytCh)) : ''}</p>
      </div>
    </section>`;
}

/* ---------- Chizish ---------- */
function mxRender() {
  const root = document.getElementById('marvel');
  const id = Number(window.MX_ID || new URLSearchParams(location.search).get('id'));
  const f = id ? mxFilms().find(x => x.m.id === id) : null;
  if (id && !f) {
    root.innerHTML = `<div class="wrap mx-body"><p class="mx-empty">${mx('notFound')}</p><a class="btn btn-primary" href="marvel.html">${mx('back')}</a></div>`;
    return;
  }
  root.innerHTML = f ? mxFilmHTML(f) : mxListHTML();
  // tayyor sahifalarning sarlavhasi qidiruv uchun yozilgan — o'zbekchada o'zgartirmaymiz
  if (!(LANG === 'uz' && (window.MX_ID || (!f && !id)))) {
    document.title = f ? `${title(f.m)} — Marvel | DezoMax` : `${mx('title')} — ${mx('sub').toLowerCase()} | DezoMax`;
  }
  // marvel.html?id=N (eski havola) — asosiy manzil tayyor sahifa
  if (f) {
    let c = document.head.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); }
    c.href = 'https://dezomax.uz/' + mxHref(f);
  }

  // treyler — saytning o'z pleyerida (js/ytplayer.js: o'z tugmalari, tezlik, to'liq ekran)
  const pl = root.querySelector('#mxPlayer');
  const mountTrailer = () => { if (pl && pl.dataset.yt && typeof mountYouTube === 'function') mountYouTube(pl, 'https://www.youtube.com/watch?v=' + pl.dataset.yt, { title: f ? title(f.m) : '' }); };
  mountTrailer();
  // til tugmalari (🇷🇺 Русский ...) — RuTube'dagi til videolari (js/rutube.js, admin → «Til videolari»)
  if (f && pl && typeof rtBind === 'function') rtBind(root, { key: `marvel:${f.m.id}`, box: pl, title: title(f.m), onBack: pl.dataset.yt ? mountTrailer : null });
  root.querySelector('.mx-play')?.addEventListener('click', e => {
    e.preventDefault();
    pl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (pl?.classList.contains('rt-box')) root.querySelector('.rt-bar [data-rt-back]')?.click();   // RuTube ochiq bo'lsa — treylerga qaytamiz
    pl?.querySelector('#ytpCover')?.click();
  });
}

document.addEventListener('langchange', mxRender);
initLayout();
mxRender();
