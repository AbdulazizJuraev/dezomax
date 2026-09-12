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

/* Xato holati — qayta urinish tugmasi bilan */
function showError(ch) {
  const box = document.getElementById('tvPlayer');
  box.innerHTML = `
    <div class="player-placeholder">
      <div class="pp-icon">${ICONS.play}</div>
      <h3>${t('tv.error')}</h3>
      <p>${t('tv.errorHint')}</p>
      <button class="btn btn-ghost" id="tvRetry" style="margin-top:16px">${t('sport.retry')}</button>
    </div>`;
  document.getElementById('tvRetry')?.addEventListener('click', () => playChannel(ch));
}

/* Telefonlarda ovozli avtoijro taqiqlangan. Shuning uchun:
   1) avval odatdagidek ijro qilamiz;
   2) brauzer ruxsat bermasa — ovozsiz ijro qilamiz (bunga ruxsat bor)
      va "ovozni yoqish" tugmasini ko'rsatamiz;
   3) u ham bo'lmasa — katta "ijro" tugmasini chiqaramiz. */
async function startPlayback(video) {
  const overlay = document.getElementById('tvOverlay');
  const hide = () => overlay && (overlay.hidden = true);

  try {
    await video.play();
    hide();
    return;
  } catch (e) { /* ovoz bilan ruxsat berilmadi */ }

  try {
    video.muted = true;
    await video.play();
    hide();
    showUnmute(video);
    return;
  } catch (e) { /* umuman ruxsat berilmadi */ }

  if (overlay) {
    overlay.hidden = false;
    overlay.onclick = async () => {
      try { video.muted = false; await video.play(); hide(); }
      catch { video.muted = true; await video.play().catch(() => {}); hide(); showUnmute(video); }
    };
  }
}

function showUnmute(video) {
  const bar = document.getElementById('tvUnmute');
  if (!bar) return;
  bar.hidden = false;
  bar.onclick = async () => {
    video.muted = false;
    try { await video.play(); } catch {}
    bar.hidden = true;
  };
}

function playChannel(ch) {
  tvCurrent = ch;
  stopStream();

  const box = document.getElementById('tvPlayer');
  box.innerHTML = `
    <video id="tvVideo" controls playsinline preload="auto"></video>
    <button class="tv-overlay" id="tvOverlay" type="button" hidden>
      <span class="tv-overlay-btn">${ICONS.play}</span>
    </button>
    <button class="tv-unmute" id="tvUnmute" type="button" hidden>${t('tv.unmute')}</button>`;

  const video = document.getElementById('tvVideo');
  let recovered = 0;

  if (window.Hls && Hls.isSupported()) {
    hls = new Hls({ maxBufferLength: 20, manifestLoadingTimeOut: 15000 });
    hls.loadSource(ch.url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => startPlayback(video));

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (!data.fatal) return;
      // Vaqtinchalik uzilishlarni ikki marta tiklashga urinamiz
      if (recovered < 2 && data.type === Hls.ErrorTypes.NETWORK_ERROR) { recovered++; hls.startLoad(); return; }
      if (recovered < 2 && data.type === Hls.ErrorTypes.MEDIA_ERROR) { recovered++; hls.recoverMediaError(); return; }
      stopStream();
      showError(ch);
    });

  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari / iOS HLS ni o'zi qo'llab-quvvatlaydi
    video.src = ch.url;
    video.addEventListener('loadedmetadata', () => startPlayback(video), { once: true });
    video.addEventListener('error', () => showError(ch), { once: true });
  } else {
    showError(ch);
    return;
  }

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
