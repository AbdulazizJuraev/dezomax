/* ============================================================
   DezoMax — YouTube videolar uchun o'z pleyerimiz
   ------------------------------------------------------------
   - Play bosilguncha YouTube umuman yuklanmaydi: o'z posterimiz va tugmamiz.
   - Ijro paytida YouTube boshqaruvi o'chiriladi (controls=0), o'rniga
     IFrame Player API orqali o'z panelimiz ishlaydi.
   - YouTube sarlavhasi, kanal belgisi, "Другие видео" va logotip ramkaning
     yuqori/pastki chetiga tushadi va kesib tashlanadi (.ytp-crop). Egasining
     talabi bilan; YouTube API qoidalariga zid ekani ma'lum.
   - Panel video ostida; pauzada o'z ijro ekranimiz.
   - Video tugaganda YouTube tavsiyalari o'rniga o'z ekranimiz.
   ============================================================ */

const YT_ICONS = {
  play:  '<svg viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor"/><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor"/></svg>',
  vol:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  mute:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
  fs:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  back:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a7 7 0 1 1-6.6 4.7"/><path d="M5 4v5h5"/><text x="12" y="15.5" font-size="6.5" text-anchor="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="700">10</text></svg>',
  fwd:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a7 7 0 1 0 6.6 4.7"/><path d="M19 4v5h-5"/><text x="12" y="15.5" font-size="6.5" text-anchor="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="700">10</text></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/></svg>'
};

/* YouTube havolasidan video ID */
function youTubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/* IFrame API faqat bir marta yuklanadi */
let ytApiPromise = null;
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev && prev(); resolve(); };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => { ytApiPromise = null; reject(new Error('YouTube API yuklanmadi')); };
    document.head.appendChild(s);
    setTimeout(() => reject(new Error('timeout')), 15000);
  });
  return ytApiPromise;
}

const fmtTime = sec => {
  sec = Math.max(0, Math.floor(sec || 0));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  const mm = String(m).padStart(h ? 2 : 1, '0'), ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

/* Faol pleyer (sahifada bittasi) */
let ytActive = null;

function destroyYouTube() {
  if (!ytActive) return;
  if (ytActive.box.classList.contains('ytp-pseudo-fs')) ytExitPseudo(ytActive.box);
  clearInterval(ytActive.timer);
  try { ytActive.player.destroy(); } catch {}
  ytActive = null;
}

/* box — .player-wrap elementi; opts: { poster, title } */
function mountYouTube(box, url, opts = {}) {
  destroyYouTube();
  const id = youTubeId(url);
  if (!id) return;

  // maxres bo'lmasa (eski videolar) — hqdefault
  const poster = opts.poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  box.classList.add('ytp');

  box.innerHTML = `
    <div class="ytp-stage">
      <div class="ytp-crop"><div class="ytp-frame" id="ytpFrame"></div></div>
      <div class="ytp-click" id="ytpClick" hidden></div>
      <button class="ytp-pause" id="ytpPause" type="button" hidden aria-label="${esc(t('player.play'))}">
        <span class="ytp-big">${YT_ICONS.play}</span>
      </button>
      <button class="ytp-cover" id="ytpCover" type="button" aria-label="${esc(t('player.play'))}">
        <img src="${esc(poster)}" alt="" data-fallback="${fallback}" onerror="if(this.dataset.fallback&&this.src!==this.dataset.fallback){this.src=this.dataset.fallback}else{this.remove()}">
        <span class="ytp-cover-shade"></span>
        <span class="ytp-big">${YT_ICONS.play}</span>
        ${opts.title ? `<span class="ytp-cover-title">${esc(opts.title)}</span>` : ''}
      </button>
      <div class="ytp-msg" id="ytpMsg" hidden></div>
    </div>
    <div class="ytp-bar" id="ytpBar" hidden>
      <button class="ytp-btn" id="ytpPlay" type="button" aria-label="${esc(t('player.play'))}">${YT_ICONS.pause}</button>
      <button class="ytp-btn ytp-hide-sm" id="ytpBack" type="button" aria-label="-10s">${YT_ICONS.back}</button>
      <button class="ytp-btn ytp-hide-sm" id="ytpFwd" type="button" aria-label="+10s">${YT_ICONS.fwd}</button>
      <span class="ytp-time" id="ytpTime">0:00</span>
      <input class="ytp-seek" id="ytpSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="seek">
      <span class="ytp-time" id="ytpDur">0:00</span>
      <button class="ytp-btn" id="ytpMute" type="button" aria-label="${esc(t('player.mute'))}">${YT_ICONS.vol}</button>
      <input class="ytp-vol ytp-hide-sm" id="ytpVol" type="range" min="0" max="100" value="100" aria-label="volume">
      <button class="ytp-btn" id="ytpFs" type="button" aria-label="${esc(t('tv.fullscreen'))}">${YT_ICONS.fs}</button>
    </div>`;

  const $ = s => box.querySelector(s);
  $('#ytpCover').addEventListener('click', () => ytStart(box, id));
}

async function ytStart(box, id) {
  const $ = s => box.querySelector(s);
  const cover = $('#ytpCover');
  cover.classList.add('is-loading');

  try {
    await loadYouTubeApi();
  } catch {
    return ytShowMsg(box, id, t('player.ytError'));
  }

  const player = new YT.Player($('#ytpFrame'), {
    videoId: id,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: 1, controls: 0, rel: 0, playsinline: 1,
      iv_load_policy: 3, disablekb: 1, fs: 0, cc_load_policy: 0,
      origin: location.origin
    },
    events: {
      onReady: () => {
        player.playVideo();
        // Telefonda ovozli avtoijro taqiqlangan bo'lsa — ovozsiz boshlaymiz
        setTimeout(() => {
          const st = player.getPlayerState();
          if (st !== YT.PlayerState.PLAYING && st !== YT.PlayerState.BUFFERING) {
            player.mute();
            player.playVideo();
          }
        }, 1800);
      },
      onStateChange: e => ytOnState(box, id, e.data),
      onError: e => {
        // 101 / 150 — egasi saytlarda ko'rsatishni taqiqlagan
        const blocked = e.data === 101 || e.data === 150;
        ytShowMsg(box, id, blocked ? t('player.ytBlocked') : t('player.ytError'));
      }
    }
  });

  ytActive = { player, box, id, timer: null, seeking: false };
  ytBindBar(box, player);
}

function ytOnState(box, id, st) {
  const $ = s => box.querySelector(s);
  const S = YT.PlayerState;
  // Muqova video haqiqatan boshlanguncha turadi — yuklanish paytidagi YouTube ekrani ko'rinmasin
  if (st === S.PLAYING) {
    $('#ytpCover').hidden = true;
    $('#ytpBar').hidden = false;
    $('#ytpMsg').hidden = true;
    $('#ytpClick').hidden = false;
  }
  // Pauzada YouTube o'z panelini chiqaradi — ustiga o'zimizning ijro tugmasi
  $('#ytpPause').hidden = st !== S.PAUSED;
  $('#ytpPlay').innerHTML = st === S.PLAYING ? YT_ICONS.pause : YT_ICONS.play;
  box.classList.toggle('is-paused', st === S.PAUSED);

  if (st === S.ENDED) {
    // YouTube tavsiyalari o'rniga o'z ekranimiz: pleyerni yashirib, qayta ko'rish tugmasi
    $('#ytpFrame').style.visibility = 'hidden';
    const msg = $('#ytpMsg');
    msg.hidden = false;
    msg.innerHTML = `<button class="ytp-replay" type="button">${YT_ICONS.replay}<span>${esc(t('player.replay'))}</span></button>`;
    msg.querySelector('button').addEventListener('click', () => {
      $('#ytpFrame').style.visibility = '';
      msg.hidden = true;
      ytActive?.player.seekTo(0, true);
      ytActive?.player.playVideo();
    });
  }
}

function ytShowMsg(box, id, text) {
  const $ = s => box.querySelector(s);
  $('#ytpCover').hidden = true;
  const msg = $('#ytpMsg');
  msg.hidden = false;
  msg.innerHTML = `
    <div class="ytp-msg-inner">
      <p>${esc(text)}</p>
      <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${esc(t('player.openExternal'))}</a>
    </div>`;
}

function ytBindBar(box, player) {
  const $ = s => box.querySelector(s);
  const seek = $('#ytpSeek'), vol = $('#ytpVol');

  const safe = fn => { try { return fn(); } catch { return 0; } };

  $('#ytpPlay').addEventListener('click', () => {
    // bufer paytida ham "ijroda" hisoblanadi — aks holda pauza bosilganda qayta play bo'lib qolardi
    const st = safe(() => player.getPlayerState());
    const running = st === YT.PlayerState.PLAYING || st === YT.PlayerState.BUFFERING;
    running ? player.pauseVideo() : player.playVideo();
  });

  const jump = d => player.seekTo(Math.max(0, safe(() => player.getCurrentTime()) + d), true);
  $('#ytpBack').addEventListener('click', () => jump(-10));
  $('#ytpFwd').addEventListener('click', () => jump(10));

  seek.addEventListener('input', () => {
    ytActive && (ytActive.seeking = true);
    const dur = safe(() => player.getDuration());
    $('#ytpTime').textContent = fmtTime(dur * seek.value / 1000);
  });
  seek.addEventListener('change', () => {
    const dur = safe(() => player.getDuration());
    player.seekTo(dur * seek.value / 1000, true);
    ytActive && (ytActive.seeking = false);
  });

  const syncMute = () => {
    const muted = safe(() => player.isMuted());
    $('#ytpMute').innerHTML = muted ? YT_ICONS.mute : YT_ICONS.vol;
    box.classList.toggle('is-muted', !!muted);
  };
  $('#ytpMute').addEventListener('click', () => {
    safe(() => player.isMuted()) ? player.unMute() : player.mute();
    setTimeout(syncMute, 60);
  });
  vol.addEventListener('input', () => {
    player.setVolume(Number(vol.value));
    if (Number(vol.value) > 0 && safe(() => player.isMuted())) player.unMute();
    setTimeout(syncMute, 60);
  });

  // Video ustiga bosish — pauza/davom, ikki marta — katta ekran
  $('#ytpClick').addEventListener('click', () => $('#ytpPlay').click());
  $('#ytpClick').addEventListener('dblclick', () => ytToggleFullscreen(box));
  $('#ytpPause').addEventListener('click', () => player.playVideo());

  $('#ytpFs').addEventListener('click', () => ytToggleFullscreen(box));

  // Klaviatura: probel — pauza, strelkalar — 10 s
  box.tabIndex = 0;
  box.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space' || e.code === 'KeyK') { e.preventDefault(); $('#ytpPlay').click(); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); jump(-10); }
    if (e.code === 'ArrowRight') { e.preventDefault(); jump(10); }
    if (e.code === 'Escape' && box.classList.contains('ytp-pseudo-fs')) ytToggleFullscreen(box);
    if (e.code === 'KeyF') $('#ytpFs').click();
    if (e.code === 'KeyM') $('#ytpMute').click();
  });

  ytActive.timer = setInterval(() => {
    if (!ytActive || ytActive.player !== player) return;
    const cur = safe(() => player.getCurrentTime()), dur = safe(() => player.getDuration());
    if (dur > 0 && !ytActive.seeking) {
      seek.value = Math.round(cur / dur * 1000);
      seek.style.setProperty('--p', (cur / dur * 100) + '%');
      $('#ytpTime').textContent = fmtTime(cur);
    }
    $('#ytpDur').textContent = fmtTime(dur);
    syncMute();
  }, 500);
}

/* ---------- Katta ekran (16:9) ----------
   1) Brauzer qo'llasa — haqiqiy to'liq ekran va telefonda gorizontal holat.
   2) iPhone Safari div'ni to'liq ekranga chiqarmaydi — shunda pleyerni CSS bilan
      butun ekranga yoyamiz; telefon tik turgan bo'lsa 90° buramiz. */

function ytFsSize(box) {
  const pseudo = box.classList.contains('ytp-pseudo-fs');
  const portrait = innerHeight > innerWidth;
  // burilgan holatda eni va bo'yi almashadi
  const w = pseudo && portrait ? innerHeight : innerWidth;
  const h = pseudo && portrait ? innerWidth : innerHeight;
  box.style.setProperty('--fsw', w + 'px');
  box.style.setProperty('--fsh', h + 'px');
  box.classList.toggle('ytp-rotated', pseudo && portrait);
}

function ytOnResize() {
  const box = document.querySelector('.player-wrap.ytp');
  if (box) ytFsSize(box);
}

function ytExitPseudo(box) {
  box.classList.remove('ytp-pseudo-fs', 'ytp-rotated');
  document.documentElement.classList.remove('ytp-lock');
  removeEventListener('resize', ytOnResize);
}

async function ytToggleFullscreen(box) {
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;

  // chiqish
  if (box.classList.contains('ytp-pseudo-fs')) { ytExitPseudo(box); return; }
  if (fsEl) {
    try { screen.orientation?.unlock?.(); } catch {}
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    return;
  }

  // kirish: haqiqiy to'liq ekran
  const req = box.requestFullscreen || box.webkitRequestFullscreen;
  if (req) {
    try {
      await req.call(box);
      ytFsSize(box);
      try { await screen.orientation?.lock?.('landscape'); } catch { /* kompyuterda qo'llanmaydi */ }
      return;
    } catch { /* ruxsat berilmadi — pastdagi usulga o'tamiz */ }
  }

  // zaxira: CSS orqali butun ekran (iPhone)
  box.classList.add('ytp-pseudo-fs');
  document.documentElement.classList.add('ytp-lock');
  ytFsSize(box);
  addEventListener('resize', ytOnResize);
}

document.addEventListener('fullscreenchange', ytOnResize);
document.addEventListener('webkitfullscreenchange', ytOnResize);
