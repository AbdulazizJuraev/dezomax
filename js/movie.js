/* ============================================================
   DezoMax — kino sahifasi / страница фильма
   URL: movie.html?id=1   (&play=1 — darhol pleyerga o'tish)
   ============================================================ */

const qp = new URLSearchParams(location.search);
const movieId = Number(qp.get('id'));
const movie = MOVIES.find(m => m.id === movieId);

/* ---------- Pleyer ----------
   Qo'llab-quvvatlanadigan havolalar:
     YouTube, Vimeo, Google Drive, .mp4/.webm, .m3u8 (HLS) va boshqa embed havolalar
   -------------------------------------------------------------- */

function embedFor(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return {
    html: `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen loading="lazy"></iframe>`,
    external: 'https://www.youtube.com/watch?v=' + yt[1]
  };

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return {
    html: `<iframe src="https://player.vimeo.com/video/${vimeo[1]}"
             allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`,
    external: url
  };

  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return {
    html: `<iframe src="https://drive.google.com/file/d/${drive[1]}/preview"
             allow="autoplay" allowfullscreen loading="lazy"></iframe>`,
    external: url
  };

  if (/\.m3u8(\?|$)/i.test(url)) return {
    html: `<video controls playsinline data-hls="${esc(url)}"></video>`,
    external: url
  };

  if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?|$)/i.test(url)) return {
    html: `<video controls playsinline preload="metadata"><source src="${esc(url)}"></video>`,
    external: url
  };

  // Boshqa har qanday havola — oddiy iframe sifatida
  return { html: `<iframe src="${esc(url)}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen loading="lazy"></iframe>`, external: url };
}

/* .m3u8 uchun hls.js ni faqat kerak bo'lganda yuklaymiz */
function initHls(video) {
  const src = video.dataset.hls;
  if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = src; return; }
  if (window.Hls) { attach(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js';
  s.onload = attach;
  document.head.appendChild(s);
  function attach() {
    if (window.Hls && Hls.isSupported()) { const h = new Hls(); h.loadSource(src); h.attachMedia(video); }
    else video.src = src;
  }
}

/* Mavjud manbalar: to'liq kino va/yoki treyler */
function sourcesOf(m) {
  const list = [];
  if (m.video)   list.push({ key: 'film',    label: t('player.film'),    url: m.video });
  if (m.trailer) list.push({ key: 'trailer', label: t('player.trailer'), url: m.trailer });
  return list;
}

function mountPlayer(url) {
  const box = document.getElementById('playerBox');
  const link = document.getElementById('playerExternal');
  const { html, external } = embedFor(url);
  box.innerHTML = html;
  const v = box.querySelector('video[data-hls]');
  if (v) initHls(v);
  if (link) { link.href = external; link.hidden = false; }
}

function playerSectionHTML(m) {
  const sources = sourcesOf(m);

  if (!sources.length) {
    return `
      <div class="player-wrap">
        <div class="player-placeholder">
          <div class="pp-icon">${ICONS.play}</div>
          <h3>${t('player.noSource')}</h3>
          <p>${t('player.hint')}</p>
        </div>
      </div>`;
  }

  const tabs = sources.length > 1
    ? `<div class="player-tabs">${sources.map((s, i) =>
        `<button class="chip${i === 0 ? ' is-active' : ''}" data-src="${esc(s.url)}">${esc(s.label)}</button>`).join('')}</div>`
    : '';

  const note = !m.video && m.trailer
    ? `<p class="player-note">${t('player.trailerOnly')}</p>`
    : '';

  return `
    ${tabs}
    <div class="player-wrap" id="playerBox"></div>
    <div class="player-foot">
      ${note}
      <a class="player-link" id="playerExternal" target="_blank" rel="noopener" hidden>${t('player.openExternal')}</a>
    </div>`;
}

/* ---------- O'xshash kinolar ---------- */

function similarOf(m) {
  return MOVIES
    .filter(x => x.id !== m.id)
    .map(x => ({ x, score: x.genres.filter(g => m.genres.includes(g)).length }))
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score || b.x.rating - a.x.rating)
    .slice(0, 12)
    .map(o => o.x);
}

/* ---------- Sahifani chizish ---------- */

function renderMovie() {
  const page = document.getElementById('page');

  if (!movie) {
    document.title = t('movie.notFound') + ' — DezoMax';
    page.innerHTML = `
      <div class="wrap" style="padding-top:calc(var(--header-h) + 80px)">
        <div class="empty">
          <div class="empty-icon">${ICONS.empty}</div>
          <h3>${t('movie.notFound')}</h3>
          <p><a class="chip" href="index.html" style="margin-top:14px;display:inline-block">${t('movie.backHome')}</a></p>
        </div>
      </div>`;
    return;
  }

  document.title = `${title(movie)} (${movie.year}) — DezoMax`;

  const info = [
    [t('movie.year'), movie.year],
    [t('movie.country'), countryOf(movie)],
    [movie.type === 'serial' ? t('movie.seasons') : t('movie.duration'), durationText(movie)],
    [t('movie.director'), movie.director],
    [t('movie.rating'), movie.rating.toFixed(1) + ' / 10']
  ];

  page.innerHTML = `
  <section class="mv-hero">
    <div class="mv-hero-bg${movie.poster ? ' has-art' : ''}" style="background-image:${movie.poster ? `url('${esc(movie.poster)}')` : backdropCSS(movie)}"></div>
    <div class="wrap">
      <div class="mv-layout">
        <div class="mv-poster">${posterHTML(movie)}</div>

        <div>
          <h1 class="mv-title">${esc(title(movie))}</h1>
          <div class="mv-sub">${esc(LANG === 'uz' ? movie.title.ru : movie.title.uz)} · ${movie.year}</div>

          <div class="mv-tags">
            <span class="tag tag-rating">${ICONS.star} ${movie.rating.toFixed(1)}</span>
            <span class="tag">${typeName(movie.type)}</span>
            ${movie.genres.map(g => `<a class="tag" href="catalog.html?genre=${g}">${esc(genreName(g))}</a>`).join('')}
            <span class="tag">${esc(durationText(movie))}</span>
          </div>

          <p class="mv-desc">${esc(descOf(movie))}</p>

          <div class="mv-actions">
            <a class="btn btn-primary" href="#player">${ICONS.play}<span>${t('movie.watchNow')}</span></a>
            ${movie.trailer ? `<a class="btn btn-ghost" href="#player" id="trailerBtn">${ICONS.play}<span>${t('movie.trailer')}</span></a>` : ''}
            <button class="btn btn-ghost" id="favBtn">${ICONS.heart}<span id="favLabel"></span></button>
          </div>

          <dl class="mv-info">
            ${info.map(([k, v]) => `
              <div class="mv-info-item"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
        </div>
      </div>
    </div>
  </section>

  <div class="wrap">
    <section class="section" id="player">
      <div class="section-head"><i class="bar"></i><h2>${t('movie.watchNow')}</h2></div>
      ${playerSectionHTML(movie)}
    </section>

    <section class="section">
      <div class="section-head"><i class="bar"></i><h2>${t('movie.cast')}</h2></div>
      <div class="cast-list">
        ${(movie.cast || []).map(c => `<span class="tag">${esc(c)}</span>`).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><i class="bar"></i><h2>${t('movie.similar')}</h2></div>
      <div class="grid" id="similar"></div>
    </section>
  </div>`;

  renderCards(document.getElementById('similar'), similarOf(movie));

  // Pleyer: birinchi manbani yuklaymiz, tablar orqali almashtiriladi
  const sources = sourcesOf(movie);
  if (sources.length) {
    mountPlayer(sources[0].url);

    const tabs = [...document.querySelectorAll('.player-tabs .chip')];
    const selectTab = btn => {
      tabs.forEach(x => x.classList.toggle('is-active', x === btn));
      mountPlayer(btn.dataset.src);
    };
    tabs.forEach(b => b.addEventListener('click', () => selectTab(b)));

    // "Treyler" tugmasi treyler tabini ochadi
    const trailerBtn = document.getElementById('trailerBtn');
    if (trailerBtn) {
      trailerBtn.addEventListener('click', () => {
        const tab = tabs.find(x => x.dataset.src === movie.trailer);
        if (tab) selectTab(tab);
      });
    }
  }

  // Sevimlilar tugmasi
  const favBtn = document.getElementById('favBtn');
  const syncFav = () => {
    const on = isFav(movie.id);
    favBtn.classList.toggle('is-fav', on);
    document.getElementById('favLabel').textContent = on ? t('movie.inFav') : t('movie.addFav');
  };
  favBtn.addEventListener('click', () => { toggleFav(movie.id); syncFav(); });
  syncFav();

  // ?play=1 bo'lsa pleyerga o'tamiz
  if (qp.get('play')) {
    setTimeout(() => document.getElementById('player').scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderMovie();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderMovie();
  applyI18n();
});
