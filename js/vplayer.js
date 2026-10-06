/* ============================================================
   DezoMax — to'g'ridan-to'g'ri video fayllar uchun o'z pleyerimiz
   (.mp4 / .webm / .m3u8 — admin orqali qo'shilgan kinolar)
   ------------------------------------------------------------
   - YouTube pleyeri (js/ytplayer.js) bilan bir xil ko'rinish va tugmalar
   - Sifat: .m3u8 — oqimdagi sifatlar (hls.js), .mp4 — admin kiritgan
     qo'shimcha havolalar (movie.videos: [{ label: '720p', url }])
   - Tezlik, ±10 soniya, ovoz, katta ekran (ytToggleFullscreen qayta ishlatiladi)
   ============================================================ */

let vpActive = null;   // { box, video, hls, timer }

// VP_SPEEDS, VP_ICONS, vpUiHTML, vpBindUi — js/ytplayer.js (YouTube pleyeri bilan umumiy panel)

function destroyVideo() {
  if (!vpActive) return;
  if (vpActive.box.classList.contains('ytp-pseudo-fs') && typeof ytExitPseudo === 'function') ytExitPseudo(vpActive.box);
  clearInterval(vpActive.timer);
  try { vpActive.hls?.destroy(); } catch {}
  try { vpActive.video.pause(); vpActive.video.removeAttribute('src'); vpActive.video.load(); } catch {}
  vpActive = null;
}

function loadHlsLib() {
  if (window.Hls) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'js/hls.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* box — .player-wrap; opts: { poster, title, qualities: [{label, url}] } */
/* DezoMax belgisi — admin → Boshqa → «LogoVidio» sozlamasi (js/site-config.js → SITE_CONFIG.logo).
   pos: br|bl|tr|tl, size: pleyer enining %, bg: black|white|none, opacity: 30–100, mode: idle|always, enabled */
const LOGO_DEFAULT = { enabled: true, pos: 'br', size: 17, bg: 'black', opacity: 100, mode: 'idle' };
function logoSettings(over) {
  const cfg = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG && SITE_CONFIG.logo) || {};
  return { ...LOGO_DEFAULT, ...cfg, ...(over || {}) };
}
function applyBrandStyle(img, box, over) {
  if (!img) return;
  const L = logoSettings(over);
  const set = (k, v) => img.style.setProperty(k, v, 'important');
  img.hidden = !L.enabled;
  // oq fonda: oq «DEZO» qora bo'ladi, ko'k «MAX» ko'kligicha qoladi
  img.style.setProperty('filter', L.bg === 'white' ? 'invert(1) hue-rotate(180deg)' : 'none', 'important');
  const v = L.pos[0] === 't' ? 'top' : 'bottom', h = L.pos[1] === 'l' ? 'left' : 'right';
  ['top', 'bottom', 'left', 'right'].forEach(k => set(k, 'auto'));
  set(v, v === 'top' ? '4%' : '4.5%'); set(h, '3%');
  set('width', `${Math.min(40, Math.max(5, +L.size || 17))}%`);
  set('background', L.bg === 'white' ? '#000' : L.bg === 'none' ? 'transparent' : '#000');   // oq fon: filtr teskari qiladi — #000 → oq
  set('padding', L.bg === 'none' ? '0' : '6px 10px');
  img.style.setProperty('--brand-op', String(Math.min(100, Math.max(30, +L.opacity || 100)) / 100));
  if (box) box.classList.toggle('vp-brand-always', L.mode === 'always');
}

function mountVideo(box, url, opts = {}) {
  if (typeof destroyYouTube === 'function') destroyYouTube();
  destroyVideo();

  const isHls = /\.m3u8(\?|$)/i.test(url);
  const extra = (opts.qualities || []).filter(q => q && q.url);
  box.classList.add('ytp', 'vp');

  box.innerHTML = `
    <div class="ytp-stage vp-stage">
      <video class="vp-video" playsinline preload="metadata" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
      <span class="vp-brand" aria-hidden="true">${window.dezoLogoSVG ? window.dezoLogoSVG() : '<img src="images/logo/logo.png" alt="" draggable="false">'}</span>   <!-- DezoMax belgisi — pleyer ustida (videoga yopishtirilmaydi) -->

      <div class="ytp-click" id="vpClick" hidden></div>
      <div class="vp-spinner" id="vpSpin" hidden><i></i></div>
      <button class="ytp-cover" id="vpCover" type="button" aria-label="${esc(t('player.play'))}">
        ${!opts.poster ? ''
          // albom (keng) rasm — butun ekranni egallaydi; tik poster — xira fon ustida o'rtada
          : opts.wide ? `<img class="vp-cover-img is-wide" src="${esc(opts.poster)}" alt="" onerror="this.remove()">`
          : `<span class="vp-cover-bg" style="background-image:url('${esc(opts.poster)}')"></span><img class="vp-cover-img" src="${esc(opts.poster)}" alt="" onerror="this.remove()">`}
        <span class="ytp-cover-shade"></span>
        <span class="ytp-big">${YT_ICONS.play}</span>
        ${opts.title ? `<span class="ytp-cover-title">${esc(opts.title)}</span>` : ''}
      </button>
      <div class="ytp-msg" id="vpMsg" hidden></div>
      ${vpUiHTML({ title: opts.title, cast: true })}
    </div>`;

  const $ = s => box.querySelector(s);
  const video = $('.vp-video');
  vpActive = { box, video, hls: null, timer: null, url };
  // video almashtirilgach (boshqa manba / tashqi pleyer) eski video hodisalari e'tiborsiz qoldiriladi
  const live = () => vpActive?.video === video;
  const onV = (ev, fn, o) => video.addEventListener(ev, e => { if (live()) fn(e); }, o);

  // Sifatlar: .mp4 — asosiy havola + admin kiritgan qo'shimchalar
  const fileQualities = !isHls && extra.length
    ? [{ label: LANG === 'ru' ? 'Основное' : 'Asosiy', url }, ...extra]
    : null;

  const renderChips = (items, activeIdx) => {
    $('#vpQRow').hidden = !items || items.length < 2;   // sozlamalar menyusida
    if (!items) return;
    $('#vpQChips').innerHTML = items.map((q, i) =>
      `<button type="button" class="ytp-qchip${i === activeIdx ? ' is-active' : ''}" data-vq="${i}">${esc(q.label)}</button>`).join('');
  };

  let adStarted = false, failed = false;
  const start = async () => {
    if (opts.preroll && typeof Ads !== 'undefined') {
      if (adStarted) return;
      adStarted = true;
      await Ads.preroll(box);   // kino oldidan reklama (js/ads.js)
      if (vpActive?.video !== video) return;   // reklama paytida boshqa video tanlangan
    }
    $('#vpCover').classList.add('is-loading');
    try {
      if (isHls) {
        await loadHlsLib().catch(() => {});
        if (window.Hls && Hls.isSupported()) {
          const hls = new Hls({ capLevelToPlayerSize: false });
          vpActive.hls = hls;
          hls.loadSource(url);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // oqimdagi sifatlar: Avto + har bir balandlik (yuqoridan pastga)
            const levels = hls.levels.map((l, i) => ({ i, h: l.height, label: l.height ? `${l.height}p` : `${Math.round((l.bitrate || 0) / 1000)} kbps` }))
              .sort((a, b) => b.h - a.h);
            const items = [{ label: t('player.qAuto'), level: -1 }, ...levels.map(l => ({ label: l.label, level: l.i }))];
            vpActive.hlsItems = items;
            renderChips(items, 0);
            bindChips();
            video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
          });
          hls.on(Hls.Events.LEVEL_SWITCHED, (_, d) => {
            const l = hls.levels[d.level];
            $('#vpQNow').textContent = l?.height ? `${t('player.qNow')}: ${l.height}p` : '';
          });
          hls.on(Hls.Events.ERROR, (_, d) => {
            if (!d.fatal) return;
            if (d.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
            else if (d.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
            else showMsg();
          });
          return;
        }
        video.src = url;   // Safari: o'zi o'ynaydi, sifat avtomatik
      } else {
        video.src = url;
        if (fileQualities) { renderChips(fileQualities, 0); bindChips(); }
      }
      await video.play().catch(() => { video.muted = true; return video.play(); });
    } catch { showMsg(); }
  };

  const showMsg = () => {
    if (!live()) return;
    if (opts.onFail && !failed) { failed = true; return opts.onFail(); }
    $('#vpCover').hidden = true;
    const msg = $('#vpMsg');
    msg.hidden = false;
    msg.innerHTML = `<div class="ytp-msg-inner"><p>${esc(t('player.ytError'))}</p></div>`;
  };

  const bindChips = () => {
    box.querySelectorAll('[data-vq]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.vq;
      box.querySelectorAll('[data-vq]').forEach(x => x.classList.toggle('is-active', x === b));
      if (vpActive.hls && vpActive.hlsItems) {
        vpActive.hls.currentLevel = vpActive.hlsItems[i].level;   // -1 — avtomatik
        if (vpActive.hlsItems[i].level === -1) $('#vpQNow').textContent = '';
      } else if (fileQualities) {
        // mp4: havolani almashtiramiz, vaqt va holat saqlanadi
        const at = video.currentTime, paused = video.paused, rate = video.playbackRate;
        video.src = fileQualities[i].url;
        onV('loadedmetadata', () => {
          video.currentTime = at;
          video.playbackRate = rate;
          if (!paused) video.play().catch(() => {});
        }, { once: true });
      }
    }));
  };

  $('#vpCover').addEventListener('click', start);
  // DezoMax belgisi bosilsa — hech narsa bo'lmaydi (pauza ham, boshqaruv ham ochilmaydi)
  const brand = box.querySelector('.vp-brand');
  applyBrandStyle(brand, box);
  ['click', 'dblclick', 'pointerdown', 'pointerup', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'contextmenu'].forEach(ev =>
    brand.addEventListener(ev, e => { e.stopPropagation(); if (ev !== 'touchstart' && ev !== 'pointerdown') e.preventDefault(); }, { passive: false }));

  /* ---- holatlar ---- */
  const setPlayIcon = () => { $('#vpPlay').innerHTML = $('#vpPlay2').innerHTML = video.paused ? YT_ICONS.play : YT_ICONS.pause; box.classList.toggle('vp-paused', video.paused); };
  onV('playing', () => {
    $('#vpCover').hidden = true;
    $('#vpBar').hidden = false;
    $('#vpClick').hidden = false;
    $('#vpSpin').hidden = true;
    setPlayIcon(); wake();
  });
  onV('pause', () => { setPlayIcon(); wake(); });
  onV('waiting', () => { $('#vpSpin').hidden = false; });
  onV('canplay', () => { $('#vpSpin').hidden = true; });
  onV('ended', () => {
    const msg = $('#vpMsg');
    msg.hidden = false;
    msg.innerHTML = `<button class="ytp-replay" type="button">${YT_ICONS.replay}<span>${esc(t('player.replay'))}</span></button>`;
    msg.querySelector('button').addEventListener('click', () => { msg.hidden = true; video.currentTime = 0; video.play(); });
  });
  onV('error', () => { if (!vpActive?.hls) showMsg(); });
  onV('volumechange', () => {
    $('#vpMute').innerHTML = video.muted || video.volume === 0 ? YT_ICONS.mute : YT_ICONS.vol;
    box.classList.toggle('is-muted', video.muted);
  });

  /* ---- tugmalar ---- */
  const toggle = () => (video.paused ? video.play() : video.pause());
  const jump = d => { video.currentTime = Math.max(0, Math.min((video.duration || 0), video.currentTime + d)); };
  const ui = vpBindUi(box, $('#vpClick'), {
    toggle, jump,
    speed: r => { video.playbackRate = r; },
    wake: () => wake(),
    hide: () => { clearTimeout(idleT); box.classList.add('ytp-idle'); },
    paused: () => video.paused
  });
  $('#vpMute').addEventListener('click', () => { video.muted = !video.muted; });
  $('#vpVol').addEventListener('input', e => { video.volume = +e.target.value / 100; video.muted = video.volume === 0; });
  const volFill = () => $('#vpVol').style.setProperty('--p', (video.muted ? 0 : video.volume * 100) + '%');
  onV('volumechange', volFill); volFill();

  let seeking = false;
  const seek = $('#vpSeek');
  seek.addEventListener('input', () => { seeking = true; $('#vpTime').textContent = fmtTime((video.duration || 0) * seek.value / 1000); });
  seek.addEventListener('change', () => { video.currentTime = (video.duration || 0) * seek.value / 1000; seeking = false; });

  /* ---- Televizorga ulash (faqat Android ilovada, Chromecast topilganda) ---- */
  const DezoCast = window.Capacitor?.isNativePlatform?.() ? window.Capacitor.Plugins?.DezoCast : null;
  if (DezoCast) {
    const castBtn = $('#vpCast');
    // eski ilovalarda (6.7 gacha) isAvailable() ilovani yiqitardi — faqat xavfsiz state() (6.8+) ishlatiladi
    if (typeof DezoCast.state === 'function') DezoCast.state().then(r => { castBtn.hidden = !r.available; }).catch(() => { castBtn.hidden = true; });
    else castBtn.hidden = true;
    castBtn.addEventListener('click', async () => {
      castBtn.disabled = true;
      try {
        await DezoCast.cast({
          url,
          title: opts.title || '',
          poster: opts.poster || '',
          mimeType: isHls ? 'application/x-mpegURL' : 'video/mp4'
        });
        video.pause();
      } catch { if (typeof toast === 'function') toast(t('player.castErr')); }
      finally { castBtn.disabled = false; }
    });
  }

  // katta ekranda 3 s harakatsizlikdan keyin panel yashirinadi
  let idleT;
  function wake() {
    box.classList.remove('ytp-idle');
    clearTimeout(idleT);
    idleT = setTimeout(() => {
      if (!video.paused && !ui.menuOpen()) box.classList.add('ytp-idle');
    }, 3000);
  }
  ['mousemove', 'touchstart'].forEach(ev => box.addEventListener(ev, wake, { passive: true }));
  box.addEventListener('mouseleave', () => { if (live() && !video.paused && !ui.menuOpen()) box.classList.add('ytp-idle'); });

  box.tabIndex = 0;
  box.addEventListener('keydown', e => {
    if (!live()) return;
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space' || e.code === 'KeyK') { e.preventDefault(); toggle(); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); jump(-10); }
    if (e.code === 'ArrowRight') { e.preventDefault(); jump(10); }
    if (e.code === 'KeyF') ytToggleFullscreen(box);
    if (e.code === 'KeyM') video.muted = !video.muted;
    if (e.code === 'Escape' && box.classList.contains('ytp-pseudo-fs')) ytToggleFullscreen(box);
  });

  vpActive.timer = setInterval(() => {
    if (!vpActive || vpActive.video !== video) return;
    const dur = video.duration || 0, cur = video.currentTime || 0;
    if (dur && isFinite(dur) && !seeking) {
      seek.value = Math.round(cur / dur * 1000);
      seek.style.setProperty('--p', (cur / dur * 100) + '%');
      $('#vpTime').textContent = fmtTime(cur);
      $('#vpDur').textContent = fmtTime(dur);
      $('#vpLeft').textContent = fmtTime(dur);
    }
    if (!vpActive.hls && fileQualities) {
      const h = video.videoHeight;
      $('#vpQNow').textContent = h ? `${t('player.qNow')}: ${h}p` : '';
    }
  }, 500);
}
