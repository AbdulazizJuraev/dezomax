/* ============================================================
   DezoMax — Telekanallar / Телеканалы
   Jonli HLS efir. hls.js loyihaning o'zida (js/hls.min.js) — CDN ga bog'liq emas.
   ============================================================ */

let tvCurrent = null;
let tvWatch = null;   // tv.html?ch=ID — kanal sahifasi (pastda init)
let hls = null;

const countryName = id => {
  const c = CHANNEL_COUNTRIES.find(x => x.id === id);
  return c ? (c[LANG] || c.uz) : id;
};

const FS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';

/* ---------- Kanal kartochkasi ---------- */

/* Panjara kartasi (2026-11-26, foydalanuvchi maketi): to'q karta, chap tepada nomi, o'ng tepada dumaloq logotip.
   tile: 'dark' — oq logotip, shuning uchun doira kanal rangida; boshqalari — oq doira. */
function channelHTML(c) {
  const on = c.id === tvCurrent?.id;
  const logo = c.logo
    ? `<span class="tvg-logo${c.tile === 'dark' ? ' is-dark' : ''}" style="--c1:${c.colors[0]};--c2:${c.colors[1]}"><img src="${esc(c.logo)}" alt="" loading="lazy" decoding="async" onerror="this.remove()"></span>`
    : `<span class="tvg-logo is-dark" style="--c1:${c.colors[0]};--c2:${c.colors[1]}"><b>${esc(c.name.slice(0, 2))}</b></span>`;
  // Kanal bosilsa — alohida sahifa (tv.html?ch=ID): ro'yxat ustida o'ynamaydi (2026-11-26)
  return `
  <a class="tvg-card${on ? ' is-playing' : ''}" href="tv.html?ch=${encodeURIComponent(c.id)}" aria-label="${esc(c.name)}">
    <span class="tvg-name">${esc(c.name)}</span>
    ${on ? `<span class="tvg-live">${t('tv.live')}</span>` : ''}
    ${logo}
  </a>`;
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
  try { localStorage.setItem('dzx_tv_last', ch.id); } catch (e) {}
  stopStream();
  // pleyer faqat kanal tanlanganda ko'rinadi
  document.getElementById('tvStage').hidden = false;

  const box = document.getElementById('tvPlayer');
  box.innerHTML = `
    <video id="tvVideo" controls playsinline preload="auto" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
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
}

function renderNow() {
  const box = document.getElementById('tvNow');
  if (!tvCurrent) { box.innerHTML = ''; return; }
  // kanal sahifasi (2026-11-26): pleyer ostida logotip, nomi, davlat · janr va «Jonli efir»
  const c = tvCurrent, cat = TVX_CATS.find(x => x[0] === c.category);
  box.innerHTML = `
    ${c.logo ? `<span class="tvg-logo tvw-logo${c.tile === 'dark' ? ' is-dark' : ''}" style="--c1:${c.colors[0]};--c2:${c.colors[1]}"><img src="${esc(c.logo)}" alt=""></span>` : ''}
    <span class="tvw-tx">
      <strong>${esc(c.name)}</strong>
      <span class="tv-now-cat">${esc(countryName(c.country))}${cat ? ' · ' + esc(TVX_L(cat[1], cat[2])) : ''}</span>
    </span>
    <span class="tv-live-label"><span class="tv-live-dot"></span>${t('tv.live')}</span>`;
}

/* ---------- Ro'yxat (2026-11-23, Netflix uslubi): davlat tugmalari + janr bo'yicha gorizontal qatorlar ---------- */

const TVX_L = (uz, ru) => (LANG === 'ru' ? ru : uz);
const TVX_CATS = [
  ['general', 'Umumiy kanallar', 'Общие'], ['news', 'Yangiliklar', 'Новости'], ['sports', 'Sport', 'Спорт'],
  ['movies', 'Kino va seriallar', 'Кино и сериалы'], ['entertainment', 'Ko‘ngilochar', 'Развлекательные'],
  ['kids', 'Bolalar uchun', 'Детские'], ['family', 'Oilaviy', 'Семейные'], ['music', 'Musiqa', 'Музыка'],
  ['documentary', 'Hujjatli va ilmiy', 'Познавательные']
];
/* Tablar (2026-11-26, maket): «Barcha kanallar», «Milliy» (O'zbekiston), «Rossiya», so'ng janrlar — bitta qator, bittasi tanlanadi.
   Pastda — bitta panjara (avvalgi janr bo'yicha gorizontal qatorlar o'rniga). Bo'sh tab ko'rsatilmaydi. */
let tvTab = 'all';
const TVX_TABS = () => [
  ['all', TVX_L('Barcha kanallar', 'Все каналы'), () => true],
  ['c:uz', TVX_L('Milliy', 'Национальные'), c => c.country === 'uz'],
  ['c:ru', TVX_L('Rossiya', 'Российские'), c => c.country === 'ru'],
  ...['sports', 'movies', 'documentary', 'kids', 'entertainment', 'music', 'news', 'family', 'general'].map(k => {
    const cat = TVX_CATS.find(x => x[0] === k);
    return ['k:' + k, TVX_L(cat[1], cat[2]), c => c.category === k];
  })
].filter(([, , f]) => TV_CHANNELS.some(f));

function renderChips() {
  const box = document.getElementById('tvChips');
  box.innerHTML = TVX_TABS().map(([id, l]) =>
    `<button type="button" role="tab" data-tab="${id}" class="${id === tvTab ? 'is-on' : ''}" aria-selected="${id === tvTab}">${esc(l)}</button>`).join('');
}

function renderGroups() {
  const box = document.getElementById('tvGroups');
  // kanal sahifasi — faqat shu kanal, katta pleyer; boshqa kanallar ko'rsatilmaydi (2026-11-26, foydalanuvchi so'rovi)
  if (tvWatch) { box.innerHTML = ''; return; }
  const tab = TVX_TABS().find(x => x[0] === tvTab) || TVX_TABS()[0];
  const list = TV_CHANNELS.filter(tab[2]);
  box.innerHTML = `<div class="tvg-grid">${list.map(channelHTML).join('')}</div>`;
  renderChips();
  document.getElementById('tvCount').textContent = `${list.length} ${t('tv.channels')}`;
}

document.getElementById('tvChips').addEventListener('click', e => {
  const b = e.target.closest('[data-tab]');
  if (!b || b.dataset.tab === tvTab) return;
  tvTab = b.dataset.tab;
  renderGroups();
});

/* ---------- Ishga tushirish ---------- */

/* Ikki ko'rinish (2026-11-26):
   - tv.html — faqat ro'yxat (sarlavha, tablar, panjara), pleyer yo'q;
   - tv.html?ch=ID — kanal sahifasi: «← Barcha kanallar», pleyer, kanal ma'lumoti, pastda boshqa kanallar.
   Kanal kartasi oddiy havola — har kanal o'z sahifasida ochiladi (orqaga tugmasi ro'yxatga qaytaradi). */
initLayout();
const chParam = new URLSearchParams(location.search).get('ch');
tvWatch = chParam ? TV_CHANNELS.find(c => c.id === chParam) || null : null;
const tvStageEl = document.getElementById('tvStage');
if (tvWatch) {
  document.body.classList.add('tv-watch');
  document.title = `${tvWatch.name} — ${TVX_L('jonli efir', 'прямой эфир')} | DezoMax`;
  tvStageEl.insertAdjacentHTML('beforebegin', `<a class="tvw-back" href="tv.html">← ${TVX_L('Barcha kanallar', 'Все каналы')}</a>`);
  renderGroups();
  playChannel(tvWatch);
} else {
  tvStageEl.hidden = true;
  renderGroups();
}
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderGroups();
  renderNow();
  const fs = document.getElementById('tvFs');
  if (fs) fs.title = t('tv.fullscreen');
  const um = document.getElementById('tvUnmute');
  if (um) um.textContent = t('tv.unmute');
  applyI18n();
});

window.addEventListener('beforeunload', stopStream);
