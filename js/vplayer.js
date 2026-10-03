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
const VP_ICONS = {
  rew: '<svg viewBox="0 0 24 24"><path d="M11 6.5v11L3.5 12zM20 6.5v11L12.5 12z" fill="currentColor"/></svg>',
  ffw: '<svg viewBox="0 0 24 24"><path d="M4 6.5v11l7.5-5.5zM13 6.5v11l7.5-5.5z" fill="currentColor"/></svg>'
};

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
      <video class="vp-video" playsinline preload="metadata" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
      <div class="ytp-click" id="vpClick" hidden></div>
      <div class="vp-spinner" id="vpSpin" hidden><i></i></div>
      <div class="vp-flash" id="vpFlash" aria-hidden="true"></div>
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
      <!-- Panel video ustida: tepada nom va sozlamalar, o'rtada ±10 s va play, pastda chiziq va tugmalar -->
      <div class="vp-ui" id="vpBar" hidden>
        <div class="vp-top">
          <span class="vp-title">${esc(opts.title || '')}</span>
          <button class="vp-ico" id="vpGear" type="button" aria-label="${esc(t('player.quality'))}" aria-expanded="false">${YT_ICONS.gear}</button>
        </div>
        <div class="vp-menu" id="vpMenu" hidden>
          <div class="vp-menu-sec"><small>${LANG === 'ru' ? 'Скорость' : 'Tezlik'}</small>
            <div class="vp-menu-chips" id="vpSpeeds">${VP_SPEEDS.map(s => `<button type="button" data-speed="${s}" class="${s === 1 ? 'is-active' : ''}">${s === 1 ? (LANG === 'ru' ? 'Обычная' : 'Oddiy') : s + 'x'}</button>`).join('')}</div></div>
          <div class="vp-menu-sec" id="vpQRow" hidden><small>${esc(t('player.quality'))} <span id="vpQNow"></span></small>
            <div class="vp-menu-chips" id="vpQChips"></div></div>
          <button class="vp-menu-row" id="vpFit" type="button">${YT_ICONS.fill}<span>${LANG === 'ru' ? 'Заполнить экран' : 'Ekranni to‘ldirish'}</span></button>
        </div>
        <div class="vp-mid">
          <button class="vp-skip" id="vpBack" type="button" aria-label="-10s">${VP_ICONS.rew}<span>10</span></button>
          <button class="vp-center" id="vpPlay" type="button" aria-label="${esc(t('player.play'))}">${YT_ICONS.pause}</button>
          <button class="vp-skip" id="vpFwd" type="button" aria-label="+10s"><span>10</span>${VP_ICONS.ffw}</button>
        </div>
        <div class="vp-bottom">
          <span class="vp-left" id="vpLeft"></span>
          <input class="vp-seek" id="vpSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="seek">
          <div class="vp-row">
            <button class="vp-circ" id="vpPlay2" type="button" aria-label="${esc(t('player.play'))}">${YT_ICONS.pause}</button>
            <span class="vp-volwrap">
              <button class="vp-circ" id="vpMute" type="button" aria-label="${esc(t('player.mute'))}">${YT_ICONS.vol}</button>
              <input class="vp-vol" id="vpVol" type="range" min="0" max="100" value="100" aria-label="volume">
            </span>
            <span class="vp-pill vp-times"><span id="vpTime">0:00</span><i></i><span id="vpDur">0:00</span></span>
            <span class="vp-gap"></span>
            <span class="vp-pill vp-right">
              <span class="vp-rate" id="vpRate"></span>
              <button class="vp-ico" id="vpCast" type="button" hidden aria-label="${esc(t('player.cast'))}">${YT_ICONS.cast}</button>
              <button class="vp-ico" id="vpFs" type="button" aria-label="${esc(t('tv.fullscreen'))}">${YT_ICONS.fs}</button>
            </span>
          </div>
        </div>
      </div>
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
  $('#vpPlay').addEventListener('click', () => { toggle(); wake(); });
  $('#vpPlay2').addEventListener('click', () => { toggle(); wake(); });
  $('#vpBack').addEventListener('click', () => { jump(-10); wake(); });
  $('#vpFwd').addEventListener('click', () => { jump(10); wake(); });
  $('#vpMute').addEventListener('click', () => { video.muted = !video.muted; });
  $('#vpVol').addEventListener('input', e => { video.volume = +e.target.value / 100; video.muted = video.volume === 0; });
  const volFill = () => $('#vpVol').style.setProperty('--p', (video.muted ? 0 : video.volume * 100) + '%');
  onV('volumechange', volFill); volFill();

  /* ---- sozlamalar (tishli g'ildirak): tezlik, sifat, ekranni to'ldirish ---- */
  const menu = $('#vpMenu');
  const setMenu = open => { menu.hidden = !open; $('#vpGear').setAttribute('aria-expanded', open); box.classList.toggle('vp-menu-open', open); };
  $('#vpGear').addEventListener('click', e => { e.stopPropagation(); setMenu(menu.hidden); wake(); });
  menu.addEventListener('click', e => e.stopPropagation());
  box.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('#vpMenu, #vpGear')) setMenu(false); });
  $('#vpSpeeds').addEventListener('click', e => {
    const b = e.target.closest('[data-speed]');
    if (!b) return;
    video.playbackRate = +b.dataset.speed;
    $('#vpSpeeds').querySelectorAll('button').forEach(x => x.classList.toggle('is-active', x === b));
  });

  let seeking = false;
  const seek = $('#vpSeek');
  seek.addEventListener('input', () => { seeking = true; $('#vpTime').textContent = fmtTime((video.duration || 0) * seek.value / 1000); });
  seek.addEventListener('change', () => { video.currentTime = (video.duration || 0) * seek.value / 1000; seeking = false; });

  // video ustiga bosish: katta ekranda panel yashiringan bo'lsa — faqat ko'rsatadi
  // video ustiga bir marta bosish — faqat panelni ko'rsatadi/yashiradi (pauza qilmaydi);
  // ikki marta bosish: o'ng yarmida +10 s, chap yarmida −10 s (har keyingi tez bosish yana 10 s)
  let tapT = null, lastTap = 0, skipSum = 0, flashT;
  const flash = right => {
    const el = $('#vpFlash');
    skipSum = el.classList.contains(right ? 'is-right' : 'is-left') && el.classList.contains('is-on') ? skipSum + 10 : 10;
    el.className = 'vp-flash is-on ' + (right ? 'is-right' : 'is-left');
    el.innerHTML = right ? `<b>${skipSum}</b>${VP_ICONS.ffw}` : `${VP_ICONS.rew}<b>${skipSum}</b>`;
    clearTimeout(flashT);
    flashT = setTimeout(() => el.classList.remove('is-on'), 650);
  };
  $('#vpClick').addEventListener('click', e => {
    const now = Date.now();
    const r = box.getBoundingClientRect(), right = e.clientX > r.left + r.width / 2;
    if (now - lastTap < 300) {
      clearTimeout(tapT); tapT = null; lastTap = now;
      jump(right ? 10 : -10); flash(right);
      return;
    }
    lastTap = now;
    tapT = setTimeout(() => {
      tapT = null;
      if (video.paused || box.classList.contains('ytp-idle')) wake();
      else { clearTimeout(idleT); box.classList.add('ytp-idle'); }
    }, 300);
  });
  $('#vpFs').addEventListener('click', () => ytToggleFullscreen(box));
  $('#vpFit').addEventListener('click', () => {
    const fill = box.classList.toggle('ytp-fill');
    $('#vpFit').classList.toggle('is-active', fill);
    $('#vpFit').querySelector('svg').outerHTML = fill ? YT_ICONS.fit : YT_ICONS.fill;
  });

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
      if (!video.paused && menu.hidden) box.classList.add('ytp-idle');
    }, 3000);
  }
  ['mousemove', 'touchstart'].forEach(ev => box.addEventListener(ev, wake, { passive: true }));
  box.addEventListener('mouseleave', () => { if (live() && !video.paused && menu.hidden) box.classList.add('ytp-idle'); });

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
