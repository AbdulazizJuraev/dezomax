/* ============================================================
   DezoMax — Telekanallar / Телеканалы
   Jonli HLS efir. hls.js loyihaning o'zida (js/hls.min.js) — CDN ga bog'liq emas.
   ============================================================ */

let tvCurrent = null;
let hls = null;

const countryName = id => {
  const c = CHANNEL_COUNTRIES.find(x => x.id === id);
  return c ? (c[LANG] || c.uz) : id;
};

const FS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';

/* ---------- Kanal kartochkasi ---------- */

/* Logotip bo'lsa — oq fonda logotip; yuklanmasa yoki yo'q bo'lsa — gradient ustida nomi */
function thumbHTML(c) {
  const onair = c.id === tvCurrent?.id ? '<span class="tv-onair"></span>' : '';
  const grad = `background:linear-gradient(150deg, ${c.colors[0]} 0%, ${c.colors[1]} 100%)`;

  if (c.logo) {
    return `<span class="tv-thumb tv-thumb-logo" style="--fallback:${c.colors[0]}">
              <img src="${esc(c.logo)}" alt="${esc(c.name)}" loading="lazy"
                   onerror="this.parentNode.classList.add('is-broken')">
              <span class="tv-thumb-name">${esc(c.name)}</span>
              ${onair}
            </span>`;
  }
  return `<span class="tv-thumb" style="${grad}">
            <span class="tv-thumb-name">${esc(c.name)}</span>
            ${onair}
          </span>`;
}

function channelHTML(c) {
  return `
  <button class="tv-card${c.id === tvCurrent?.id ? ' is-playing' : ''}" data-ch="${c.id}" type="button">
    ${thumbHTML(c)}
    <span class="tv-card-body">
      <span class="tv-card-name">${esc(c.name)}</span>
    </span>
  </button>`;
}

/* ---------- Pleyer ---------- */

function stopStream() {
  if (hls) { hls.destroy(); hls = null; }
}

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

/* Telefonlarda ovozli avtoijro taqiqlangan:
   1) ovoz bilan ijro; 2) bo'lmasa ovozsiz + "Ovozni yoqish"; 3) bo'lmasa katta tugma */
async function startPlayback(video) {
  const overlay = document.getElementById('tvOverlay');
  const hide = () => { if (overlay) overlay.hidden = true; };

  try { await video.play(); hide(); return; } catch (e) { /* ovoz bilan ruxsat yo'q */ }

  try {
    video.muted = true;
    await video.play();
    hide();
    showUnmute(video);
    return;
  } catch (e) { /* umuman ruxsat yo'q */ }

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

/* Katta ekran: avval butun pleyer blokini (tugmalar ham ko'rinib tursin),
   iPhone'da esa videoning o'z to'liq ekran rejimini ishlatamiz */
function toggleFullscreen() {
  const wrap = document.getElementById('tvPlayer');
  const video = document.getElementById('tvVideo');
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;

  if (fsEl) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    return;
  }
  if (wrap.requestFullscreen) { wrap.requestFullscreen().catch(() => video?.webkitEnterFullscreen?.()); return; }
  if (wrap.webkitRequestFullscreen) { wrap.webkitRequestFullscreen(); return; }
  if (video?.webkitEnterFullscreen) video.webkitEnterFullscreen();
}

function playChannel(ch) {
  if (!ch) return;
  tvCurrent = ch;
  stopStream();

  const box = document.getElementById('tvPlayer');
  box.innerHTML = `
    <video id="tvVideo" controls playsinline preload="auto"></video>
    <button class="tv-overlay" id="tvOverlay" type="button" hidden aria-label="Play">
      <span class="tv-overlay-btn">${ICONS.play}</span>
    </button>
    <button class="tv-unmute" id="tvUnmute" type="button" hidden>${t('tv.unmute')}</button>
    <button class="tv-fs" id="tvFs" type="button" aria-label="${t('tv.fullscreen')}" title="${t('tv.fullscreen')}">${FS_ICON}</button>`;

  const video = document.getElementById('tvVideo');
  document.getElementById('tvFs').addEventListener('click', toggleFullscreen);
  video.addEventListener('dblclick', toggleFullscreen);

  let recovered = 0;

  if (window.Hls && Hls.isSupported()) {
    hls = new Hls({ maxBufferLength: 20, manifestLoadingTimeOut: 15000 });
    hls.loadSource(ch.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => startPlayback(video));
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (!data.fatal) return;
      if (recovered < 2 && data.type === Hls.ErrorTypes.NETWORK_ERROR) { recovered++; hls.startLoad(); return; }
      if (recovered < 2 && data.type === Hls.ErrorTypes.MEDIA_ERROR) { recovered++; hls.recoverMediaError(); return; }
      stopStream();
      showError(ch);
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari / iPhone HLS ni o'zi o'ynaydi
    video.src = ch.url;
    video.addEventListener('loadedmetadata', () => startPlayback(video), { once: true });
    video.addEventListener('error', () => showError(ch), { once: true });
  } else {
    showError(ch);
    return;
  }

  renderNow();
  renderGroups();
  document.querySelector('.tv-stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderNow() {
  const box = document.getElementById('tvNow');
  if (!tvCurrent) { box.innerHTML = ''; return; }
  box.innerHTML = `
    <span class="tv-live-dot"></span>
    <strong>${esc(tvCurrent.name)}</strong>
    <span class="tv-now-cat">${esc(countryName(tvCurrent.country))}</span>
    <span class="tv-live-label">${t('tv.live')}</span>`;
}

/* ---------- Ro'yxat: davlat bo'yicha guruhlar ---------- */

function renderGroups() {
  const box = document.getElementById('tvGroups');
  box.innerHTML = CHANNEL_COUNTRIES.map(ct => {
    const list = CHANNELS.filter(c => c.country === ct.id);
    if (!list.length) return '';
    return `
      <section class="tv-group">
        <div class="section-head">
          <i class="bar"></i><h2>${esc(countryName(ct.id))}</h2>
          <span class="result-count">${list.length} ${t('tv.channels')}</span>
        </div>
        <div class="tv-grid">${list.map(channelHTML).join('')}</div>
      </section>`;
  }).join('');

  box.querySelectorAll('[data-ch]').forEach(btn =>
    btn.addEventListener('click', () => playChannel(CHANNELS.find(c => c.id === btn.dataset.ch))));

  document.getElementById('tvCount').textContent = `${CHANNELS.length} ${t('tv.channels')}`;
}

/* Kanal tanlanmaganda — markazdagi ijro tugmasi birinchi kanalni ochadi */
function renderPlaceholder() {
  const first = CHANNELS[0];
  document.getElementById('tvPlayer').innerHTML = `
    <button class="player-placeholder tv-start" id="tvStart" type="button">
      <span class="pp-icon">${ICONS.play}</span>
      <h3>${t('tv.select')}</h3>
      <p>${t('tv.selectHint')}</p>
    </button>`;
  document.getElementById('tvStart').addEventListener('click', () => playChannel(first));
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderPlaceholder();
renderGroups();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderGroups();
  renderNow();
  if (!tvCurrent) renderPlaceholder();
  const fs = document.getElementById('tvFs');
  if (fs) fs.title = t('tv.fullscreen');
  const um = document.getElementById('tvUnmute');
  if (um) um.textContent = t('tv.unmute');
  applyI18n();
});

window.addEventListener('beforeunload', stopStream);
