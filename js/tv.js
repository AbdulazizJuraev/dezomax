/* ============================================================
   DezoMax — Telekanallar / Телеканалы
   Jonli HLS efir. hls.js sahifa <head> ida ulangan.
   ============================================================ */

let tvCat = new URLSearchParams(location.search).get('cat') || 'all';
let tvCurrent = null;
let hls = null;

const catName = id => {
  const c = CHANNEL_CATS.find(x => x.id === id);
  return c ? (c[LANG] || c.uz) : id;
};

/* ---------- Kanal kartochkasi ---------- */

function channelHTML(c) {
  const [c1, c2] = c.colors;
  return `
  <button class="tv-card${c.id === tvCurrent?.id ? ' is-playing' : ''}" data-ch="${c.id}" type="button">
    <span class="tv-thumb" style="background:linear-gradient(150deg, ${c1} 0%, ${c2} 100%)">
      <span class="tv-thumb-name">${esc(c.name)}</span>
      ${c.id === tvCurrent?.id ? '<span class="tv-onair"></span>' : ''}
    </span>
    <span class="tv-card-body">
      <span class="tv-card-name">${esc(c.name)}</span>
      <span class="tv-card-cat">${esc(catName(c.category))}</span>
    </span>
  </button>`;
}

/* ---------- Pleyer ---------- */

function stopStream() {
  if (hls) { hls.destroy(); hls = null; }
}

function playChannel(ch) {
  tvCurrent = ch;
  stopStream();

  const box = document.getElementById('tvPlayer');
  box.innerHTML = '<video id="tvVideo" controls autoplay playsinline></video>';
  const video = document.getElementById('tvVideo');

  const fail = () => {
    box.innerHTML = `
      <div class="player-placeholder">
        <div class="pp-icon">${ICONS.play}</div>
        <h3>${t('tv.error')}</h3>
        <p>${t('tv.errorHint')}</p>
      </div>`;
  };

  if (window.Hls && Hls.isSupported()) {
    hls = new Hls({ maxBufferLength: 20, manifestLoadingTimeOut: 12000 });
    hls.loadSource(ch.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) { stopStream(); fail(); } });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari HLS ni o'zi qo'llab-quvvatlaydi
    video.src = ch.url;
    video.addEventListener('error', fail, { once: true });
  } else {
    fail();
    return;
  }

  video.play().catch(() => { /* avtoijro bloklangan bo'lsa — foydalanuvchi bosadi */ });

  renderNow();
  renderGrid();
  document.querySelector('.tv-stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderNow() {
  const box = document.getElementById('tvNow');
  if (!tvCurrent) {
    box.innerHTML = '';
    return;
  }
  box.innerHTML = `
    <span class="tv-live-dot"></span>
    <strong>${esc(tvCurrent.name)}</strong>
    <span class="tv-now-cat">${esc(catName(tvCurrent.category))}</span>
    <span class="tv-live-label">${t('tv.live')}</span>`;
}

/* ---------- Ro'yxat va filtrlar ---------- */

function filteredChannels() {
  return tvCat === 'all' ? CHANNELS : CHANNELS.filter(c => c.category === tvCat);
}

function renderCats() {
  const box = document.getElementById('tvCats');
  const used = CHANNEL_CATS.filter(c => CHANNELS.some(ch => ch.category === c.id));
  box.innerHTML =
    `<button class="chip${tvCat === 'all' ? ' is-active' : ''}" data-cat="all">${t('catalog.all')}</button>` +
    used.map(c => `<button class="chip${tvCat === c.id ? ' is-active' : ''}" data-cat="${c.id}">${esc(catName(c.id))}</button>`).join('');

  box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    tvCat = b.dataset.cat;
    const p = new URLSearchParams();
    if (tvCat !== 'all') p.set('cat', tvCat);
    history.replaceState(null, '', p.toString() ? '?' + p : location.pathname);
    renderCats();
    renderGrid();
  }));
}

function renderGrid() {
  const list = filteredChannels();
  const grid = document.getElementById('tvGrid');
  grid.innerHTML = list.map(channelHTML).join('');
  grid.querySelectorAll('[data-ch]').forEach(btn =>
    btn.addEventListener('click', () => playChannel(CHANNELS.find(c => c.id === btn.dataset.ch))));

  document.getElementById('tvCount').textContent = `${list.length} ${t('tv.channels')}`;
}

function renderPlaceholder() {
  document.getElementById('tvPlayer').innerHTML = `
    <div class="player-placeholder">
      <div class="pp-icon">${ICONS.play}</div>
      <h3>${t('tv.select')}</h3>
      <p>${t('tv.selectHint')}</p>
    </div>`;
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderPlaceholder();
renderCats();
renderGrid();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderCats();
  renderGrid();
  renderNow();
  if (!tvCurrent) renderPlaceholder();
  applyI18n();
});

window.addEventListener('beforeunload', stopStream);
