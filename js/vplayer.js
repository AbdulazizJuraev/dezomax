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

const VP_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

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
function mountVideo(box, url, opts = {}) {
  if (typeof destroyYouTube === 'function') destroyYouTube();
  destroyVideo();

  const isHls = /\.m3u8(\?|$)/i.test(url);
  const extra = (opts.qualities || []).filter(q => q && q.url);
  box.classList.add('ytp', 'vp');

  box.innerHTML = `
    <div class="ytp-stage vp-stage">
      <video class="vp-video" playsinline preload="metadata"></video>
      <div class="ytp-click" id="vpClick" hidden></div>
      <button class="ytp-pause" id="vpPause" type="button" hidden aria-label="${esc(t('player.play'))}"><span class="ytp-big">${YT_ICONS.play}</span></button>
      <div class="vp-spinner" id="vpSpin" hidden><i></i></div>
      <button class="ytp-cover" id="vpCover" type="button" aria-label="${esc(t('player.play'))}">
        ${opts.poster ? `<span class="vp-cover-bg" style="background-image:url('${esc(opts.poster)}')"></span><img class="vp-cover-img" src="${esc(opts.poster)}" alt="" onerror="this.remove()">` : ''}
        <span class="ytp-cover-shade"></span>
        <span class="ytp-big">${YT_ICONS.play}</span>
        ${opts.title ? `<span class="ytp-cover-title">${esc(opts.title)}</span>` : ''}
      </button>
      <div class="ytp-msg" id="vpMsg" hidden></div>
    </div>
    <div class="ytp-bar" id="vpBar" hidden>
      <button class="ytp-btn" id="vpPlay" type="button" aria-label="${esc(t('player.play'))}">${YT_ICONS.pause}</button>
      <button class="ytp-btn ytp-hide-sm" id="vpBack" type="button" aria-label="-10s">${YT_ICONS.back}</button>
      <button class="ytp-btn ytp-hide-sm" id="vpFwd" type="button" aria-label="+10s">${YT_ICONS.fwd}</button>
      <span class="ytp-time" id="vpTime">0:00</span>
      <input class="ytp-seek" id="vpSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="seek">
      <span class="ytp-time" id="vpDur">0:00</span>
      <button class="ytp-btn" id="vpMute" type="button" aria-label="${esc(t('player.mute'))}">${YT_ICONS.vol}</button>
      <input class="ytp-vol ytp-hide-sm" id="vpVol" type="range" min="0" max="100" value="100" aria-label="volume">
      <button class="ytp-btn vp-speed-btn" id="vpSpeed" type="button" aria-label="speed">1x</button>
      <button class="ytp-btn ytp-fit" id="vpFit" type="button" aria-label="zoom">${YT_ICONS.fill}</button>
      <button class="ytp-btn" id="vpFs" type="button" aria-label="${esc(t('tv.fullscreen'))}">${YT_ICONS.fs}</button>
    </div>
    <div class="ytp-qrow" id="vpQRow" role="group" aria-label="${esc(t('player.quality'))}" hidden>
      <span class="ytp-qrow-label">${YT_ICONS.gear}${esc(t('player.quality'))}</span>
      <div class="ytp-qrow-chips" id="vpQChips"></div>
      <span class="ytp-qrow-now" id="vpQNow"></span>
    </div>`;

  const $ = s => box.querySelector(s);
  const video = $('.vp-video');
  vpActive = { box, video, hls: null, timer: null, url };

  // Sifatlar: .mp4 — asosiy havola + admin kiritgan qo'shimchalar
  const fileQualities = !isHls && extra.length
    ? [{ label: LANG === 'ru' ? 'Основное' : 'Asosiy', url }, ...extra]
    : null;

  const renderChips = (items, activeIdx) => {
    $('#vpQRow').hidden = !items || items.length < 2;
    if (!items) return;
    $('#vpQChips').innerHTML = items.map((q, i) =>
      `<button type="button" class="ytp-qchip${i === activeIdx ? ' is-active' : ''}" data-vq="${i}">${esc(q.label)}</button>`).join('');
  };

  const start = async () => {
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
    $('#vpCover').hidden = true;
    const msg = $('#vpMsg');
    msg.hidden = false;
    msg.innerHTML = `<div class="ytp-msg-inner"><p>${esc(t('player.ytError'))}</p>
      <a class="btn btn-ghost btn-sm" href="${esc(url)}" target="_blank" rel="noopener">${esc(t('player.openExternal'))}</a></div>`;
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
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = at;
          video.playbackRate = rate;
          if (!paused) video.play().catch(() => {});
        }, { once: true });
      }
    }));
  };

  $('#vpCover').addEventListener('click', start);

  /* ---- holatlar ---- */
  const setPlayIcon = () => { $('#vpPlay').innerHTML = video.paused ? YT_ICONS.play : YT_ICONS.pause; };
  video.addEventListener('playing', () => {
    $('#vpCover').hidden = true;
    $('#vpBar').hidden = false;
    $('#vpClick').hidden = false;
    $('#vpPause').hidden = true;
    $('#vpSpin').hidden = true;
    setPlayIcon(); wake();
  });
  video.addEventListener('pause', () => { if (!video.ended) $('#vpPause').hidden = false; setPlayIcon(); wake(); });
  video.addEventListener('waiting', () => { $('#vpSpin').hidden = false; });
  video.addEventListener('canplay', () => { $('#vpSpin').hidden = true; });
  video.addEventListener('ended', () => {
    const msg = $('#vpMsg');
    msg.hidden = false;
    msg.innerHTML = `<button class="ytp-replay" type="button">${YT_ICONS.replay}<span>${esc(t('player.replay'))}</span></button>`;
    msg.querySelector('button').addEventListener('click', () => { msg.hidden = true; video.currentTime = 0; video.play(); });
  });
  video.addEventListener('error', () => { if (!vpActive?.hls) showMsg(); });
  video.addEventListener('volumechange', () => {
    $('#vpMute').innerHTML = video.muted || video.volume === 0 ? YT_ICONS.mute : YT_ICONS.vol;
    box.classList.toggle('is-muted', video.muted);
  });

  /* ---- tugmalar ---- */
  const toggle = () => (video.paused ? video.play() : video.pause());
  const jump = d => { video.currentTime = Math.max(0, Math.min((video.duration || 0), video.currentTime + d)); };
  $('#vpPlay').addEventListener('click', toggle);
  $('#vpPause').addEventListener('click', () => video.play());
  $('#vpBack').addEventListener('click', () => jump(-10));
  $('#vpFwd').addEventListener('click', () => jump(10));
  $('#vpMute').addEventListener('click', () => { video.muted = !video.muted; });
  $('#vpVol').addEventListener('input', e => { video.volume = +e.target.value / 100; video.muted = video.volume === 0; });

  $('#vpSpeed').addEventListener('click', () => {
    const i = VP_SPEEDS.indexOf(video.playbackRate);
    video.playbackRate = VP_SPEEDS[(i + 1) % VP_SPEEDS.length];
    $('#vpSpeed').textContent = video.playbackRate + 'x';
    wake();
  });

  let seeking = false;
  const seek = $('#vpSeek');
  seek.addEventListener('input', () => { seeking = true; $('#vpTime').textContent = fmtTime((video.duration || 0) * seek.value / 1000); });
  seek.addEventListener('change', () => { video.currentTime = (video.duration || 0) * seek.value / 1000; seeking = false; });

  // video ustiga bosish: katta ekranda panel yashiringan bo'lsa — faqat ko'rsatadi
  $('#vpClick').addEventListener('click', () => {
    if (typeof ytIsFull === 'function' && ytIsFull(box) && box.classList.contains('ytp-idle')) { wake(); return; }
    toggle(); wake();
  });
  $('#vpClick').addEventListener('dblclick', () => ytToggleFullscreen(box));
  $('#vpFs').addEventListener('click', () => ytToggleFullscreen(box));
  $('#vpFit').addEventListener('click', () => {
    const fill = box.classList.toggle('ytp-fill');
    $('#vpFit').innerHTML = fill ? YT_ICONS.fit : YT_ICONS.fill;
    wake();
  });

  // katta ekranda 3 s harakatsizlikdan keyin panel yashirinadi
  let idleT;
  function wake() {
    box.classList.remove('ytp-idle');
    clearTimeout(idleT);
    idleT = setTimeout(() => {
      if (typeof ytIsFull === 'function' && ytIsFull(box) && !video.paused) box.classList.add('ytp-idle');
    }, 3000);
  }
  ['mousemove', 'touchstart'].forEach(ev => box.addEventListener(ev, wake, { passive: true }));

  box.tabIndex = 0;
  box.addEventListener('keydown', e => {
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
    }
    if (!vpActive.hls && fileQualities) {
      const h = video.videoHeight;
      $('#vpQNow').textContent = h ? `${t('player.qNow')}: ${h}p` : '';
    }
  }, 500);
}
