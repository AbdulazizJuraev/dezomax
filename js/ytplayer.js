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
  gear:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  // katta ekranda: videoni ekran bo'yicha to'ldirish / to'liq sig'dirish
  fill:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 10l-2 2 2 2M16 10l2 2-2 2"/></svg>',
  fit:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 10l2 2-2 2M18 10l-2 2 2 2"/></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/></svg>',
  // Televizorga ulash (Chromecast)
  cast:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v2h2a2 2 0 0 0-2-2z"/><path d="M3 14v2a4 4 0 0 1 4 4h2a6 6 0 0 0-6-6z"/><rect x="3" y="4" width="18" height="13" rx="2"/></svg>'
};

/* ---------- Umumiy panel (YouTube va o'z pleyerimiz uchun bir xil) ----------
   Tepada: nom va ⚙ sozlamalar (tezlik, sifat, ekranni to'ldirish). O'rtada: «10 · play · 10».
   Pastda: davomiylik, oq chiziq, dumaloq play/ovoz, vaqt tabletkasi, like/dislike (js/social.js → #vpRate)
   va katta ekran. Video ustiga bir bosish — panel, ikki bosish — ±10 s. */
const VP_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const VP_ICONS = {
  rew: '<svg viewBox="0 0 24 24"><path d="M11 6.5v11L3.5 12zM20 6.5v11L12.5 12z" fill="currentColor"/></svg>',
  ffw: '<svg viewBox="0 0 24 24"><path d="M4 6.5v11l7.5-5.5zM13 6.5v11l7.5-5.5z" fill="currentColor"/></svg>'
};

/* o: { title, qualities: sifat tugmalari HTML (bo'lmasa bo'lim yashirin, keyin to'ldiriladi), cast: true — Chromecast tugmasi } */
function vpUiHTML(o = {}) {
  return `
      <div class="vp-flash" id="vpFlash" aria-hidden="true"></div>
      <div class="vp-ui" id="vpBar" hidden>
        <div class="vp-top">
          <span class="vp-title">${esc(o.title || '')}</span>
          <button class="vp-ico" id="vpGear" type="button" aria-label="${esc(t('player.quality'))}" aria-expanded="false">${YT_ICONS.gear}</button>
        </div>
        <div class="vp-menu" id="vpMenu" hidden>
          <div class="vp-menu-sec"><small>${LANG === 'ru' ? 'Скорость' : 'Tezlik'}</small>
            <div class="vp-menu-chips" id="vpSpeeds">${VP_SPEEDS.map(s => `<button type="button" data-speed="${s}" class="${s === 1 ? 'is-active' : ''}">${s === 1 ? (LANG === 'ru' ? 'Обычная' : 'Oddiy') : s + 'x'}</button>`).join('')}</div></div>
          <div class="vp-menu-sec" id="vpQRow"${o.qualities ? '' : ' hidden'}><small>${esc(t('player.quality'))} <span id="vpQNow"></span></small>
            <div class="vp-menu-chips" id="vpQChips">${o.qualities || ''}</div></div>
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
              ${o.cast ? `<button class="vp-ico" id="vpCast" type="button" hidden aria-label="${esc(t('player.cast'))}">${YT_ICONS.cast}</button>` : ''}
              <button class="vp-ico" id="vpFs" type="button" aria-label="${esc(t('tv.fullscreen'))}">${YT_ICONS.fs}</button>
            </span>
          </div>
        </div>
      </div>`;
}

/* Panel tugmalarini ulash. p: { toggle, jump(d), speed(r), wake, hide, paused() } → { menuOpen() } */
function vpBindUi(box, clickEl, p) {
  const $ = s => box.querySelector(s);
  $('#vpPlay').addEventListener('click', () => { p.toggle(); p.wake(); });
  $('#vpPlay2').addEventListener('click', () => { p.toggle(); p.wake(); });
  $('#vpBack').addEventListener('click', () => { p.jump(-10); p.wake(); });
  $('#vpFwd').addEventListener('click', () => { p.jump(10); p.wake(); });
  $('#vpFs').addEventListener('click', () => ytToggleFullscreen(box));
  $('#vpFit').addEventListener('click', () => {
    const fill = box.classList.toggle('ytp-fill');
    $('#vpFit').classList.toggle('is-active', fill);
    $('#vpFit').querySelector('svg').outerHTML = fill ? YT_ICONS.fit : YT_ICONS.fill;
  });

  // ⚙ sozlamalar oynasi
  const menu = $('#vpMenu');
  const setMenu = open => { menu.hidden = !open; $('#vpGear').setAttribute('aria-expanded', open); box.classList.toggle('vp-menu-open', open); };
  $('#vpGear').addEventListener('click', e => { e.stopPropagation(); setMenu(menu.hidden); p.wake(); });
  menu.addEventListener('click', e => e.stopPropagation());
  box.addEventListener('click', e => { if (menu.isConnected && !menu.hidden && !e.target.closest('#vpMenu, #vpGear')) setMenu(false); });
  $('#vpSpeeds').addEventListener('click', e => {
    const b = e.target.closest('[data-speed]');
    if (!b) return;
    p.speed(+b.dataset.speed);
    $('#vpSpeeds').querySelectorAll('button').forEach(x => x.classList.toggle('is-active', x === b));
  });

  // bir marta bosish — panelni ko'rsatadi/yashiradi (pauza qilmaydi);
  // ikki marta: o'ng yarmida +10 s, chap yarmida −10 s (har keyingi tez bosish yana 10 s)
  let tapT = null, lastTap = 0, skipSum = 0, flashT;
  const flash = right => {
    const el = $('#vpFlash');
    skipSum = el.classList.contains(right ? 'is-right' : 'is-left') && el.classList.contains('is-on') ? skipSum + 10 : 10;
    el.className = 'vp-flash is-on ' + (right ? 'is-right' : 'is-left');
    el.innerHTML = right ? `<b>${skipSum}</b>${VP_ICONS.ffw}` : `${VP_ICONS.rew}<b>${skipSum}</b>`;
    clearTimeout(flashT);
    flashT = setTimeout(() => el.classList.remove('is-on'), 650);
  };
  clickEl.addEventListener('click', e => {
    const now = Date.now();
    const r = box.getBoundingClientRect(), right = e.clientX > r.left + r.width / 2;
    if (now - lastTap < 300) {
      clearTimeout(tapT); tapT = null; lastTap = now;
      p.jump(right ? 10 : -10); flash(right);
      return;
    }
    lastTap = now;
    tapT = setTimeout(() => {
      tapT = null;
      if (p.paused() || box.classList.contains('ytp-idle')) p.wake();
      else p.hide();
    }, 300);
  });
  return { menuOpen: () => !menu.hidden };
}

/* ---------- Video sifati ----------
   Tanlov localStorage'da saqlanadi (akkaunt sozlamalaridagi "Video sifati" ham shu kalitni o'zgartiradi).
   YouTube IFrame API'da sifat faqat "tavsiya" sifatida beriladi — YouTube internet tezligiga
   qarab boshqa sifatni tanlashi mumkin. Haqiqiy sifat belgida ko'rsatiladi. */
const QUALITY_KEY = 'dezomax_quality';
const QUALITIES = [
  { id: 'auto', yt: 'default', label: null },
  { id: '1080', yt: 'hd1080', label: '1080p', tag: 'Full HD' },
  { id: '720',  yt: 'hd720',  label: '720p',  tag: 'HD' },
  { id: '480',  yt: 'large',  label: '480p' },
  { id: '360',  yt: 'medium', label: '360p' },
  { id: '240',  yt: 'small',  label: '240p' }
];
const YT_Q_LABEL = { hd2160: '4K', hd1440: '1440p', hd1080: '1080p', hd720: '720p', large: '480p', medium: '360p', small: '240p', tiny: '144p', highres: '4K' };

Object.assign(I18N.uz, {
  'player.quality': 'Sifat',
  'player.qAuto': 'Avtomatik',
  'player.qNow': 'hozir',
  'player.qNote': 'Internet sekin bo‘lsa, YouTube sifatni o‘zi pasaytirishi mumkin.',
  'player.qSet': 'Sifat:'
});
Object.assign(I18N.ru, {
  'player.quality': 'Качество',
  'player.qAuto': 'Авто',
  'player.qNow': 'сейчас',
  'player.qNote': 'При медленном интернете YouTube может сам снизить качество.',
  'player.qSet': 'Качество:'
});

function getQuality() {
  const v = localStorage.getItem(QUALITY_KEY) || 'auto';
  return QUALITIES.some(q => q.id === v) ? v : 'auto';
}

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
  box.classList.remove('vp', 'vp-paused', 'is-paused', 'ytp-idle', 'ytp-fill');

  box.innerHTML = `
    <div class="ytp-stage">
      <div class="ytp-crop"><div class="ytp-frame" id="ytpFrame"></div></div>
      <div class="ytp-shade" id="ytpShade" hidden></div>
      <div class="ytp-click" id="ytpClick" hidden></div>
      <button class="ytp-cover" id="ytpCover" type="button" aria-label="${esc(t('player.play'))}">
        <img src="${esc(poster)}" alt="" data-fallback="${fallback}" onerror="if(this.dataset.fallback&&this.src!==this.dataset.fallback){this.src=this.dataset.fallback}else{this.remove()}">
        <span class="ytp-cover-shade"></span>
        <span class="ytp-big">${YT_ICONS.play}</span>
        ${opts.title ? `<span class="ytp-cover-title">${esc(opts.title)}</span>` : ''}
      </button>
      <div class="ytp-msg" id="ytpMsg" hidden></div>
    </div>
    ${vpUiHTML({
      title: opts.title,
      qualities: QUALITIES.filter(q => q.id !== '240').map(q =>
        `<button type="button" class="${q.id === getQuality() ? 'is-active' : ''}" data-qchip="${q.id}">${esc(q.label || t('player.qAuto'))}</button>`).join('')
    })}`;

  const $ = s => box.querySelector(s);
  // opts.preroll — kino oldidan reklama (js/ads.js); tugagach film boshlanadi
  let starting = false;
  const cover = $('#ytpCover');
  cover.addEventListener('click', async () => {
    if (starting) return;
    starting = true;
    cover.classList.add('is-loading');
    if (opts.preroll && typeof Ads !== 'undefined') await Ads.preroll(box);
    if (!cover.isConnected) return;   // reklama paytida boshqa video tanlangan
    ytStart(box, id);
  });
  // video boshlanmasdan oldin ham tanlash mumkin — boshlanganda shu sifat bilan ochiladi
  box.querySelectorAll('[data-qchip]').forEach(b =>
    b.addEventListener('click', () => ytApplyQuality(b.dataset.qchip)));
}

/* Sifatni tanlash va qo'llash (⚙️ menyu va pleyer ostidagi qator uchun umumiy) */
function ytApplyQuality(qid) {
  const q = QUALITIES.find(x => x.id === qid) || QUALITIES[0];
  localStorage.setItem(QUALITY_KEY, q.id);
  document.querySelectorAll('[data-qchip]').forEach(b => b.classList.toggle('is-active', b.dataset.qchip === q.id));

  const p = ytActive?.player;
  if (!p || typeof p.getPlayerState !== 'function') return;
  try {
    const st = p.getPlayerState();
    if (st === -1 || st === 5) { p.setPlaybackQuality(q.yt); return; }   // hali boshlanmagan
    const at = p.getCurrentTime();
    const wasPaused = st === YT.PlayerState.PAUSED;
    // videoni shu joyidan tanlangan sifat bilan qayta yuklaymiz
    p.loadVideoById({ videoId: ytActive.id, startSeconds: at, suggestedQuality: q.yt });
    p.setPlaybackQuality(q.yt);
    if (wasPaused) setTimeout(() => p.pauseVideo(), 700);
  } catch {}
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
        const q = QUALITIES.find(x => x.id === getQuality());
        if (q && q.id !== 'auto') try { player.setPlaybackQuality(q.yt); } catch {}
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
    $('#vpBar').hidden = false;
    $('#ytpMsg').hidden = true;
    $('#ytpClick').hidden = false;
  }
  // Pauzada YouTube o'z katta «Play» belgisi va tavsiyalarini chiqaradi — videoning muqovasi bilan to'liq yopamiz
  // (faqat bizning tugmalar ko'rinadi; bosish o'tib ketadi)
  const shade = $('#ytpShade');
  if (st === S.PAUSED && !shade.dataset.bg) {
    shade.dataset.bg = '1';
    shade.style.backgroundImage = `url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')`;
  }
  shade.hidden = st !== S.PAUSED;
  const running = st === S.PLAYING || st === S.BUFFERING;
  $('#vpPlay').innerHTML = $('#vpPlay2').innerHTML = running ? YT_ICONS.pause : YT_ICONS.play;
  box.classList.toggle('is-paused', st === S.PAUSED);
  box.classList.toggle('vp-paused', !running);
  ytWake(box);

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
    </div>`;
}

function ytBindBar(box, player) {
  const $ = s => box.querySelector(s);
  const seek = $('#vpSeek'), vol = $('#vpVol');

  const safe = fn => { try { return fn(); } catch { return 0; } };
  // bufer paytida ham "ijroda" hisoblanadi — aks holda pauza bosilganda qayta play bo'lib qolardi
  const running = () => { const st = safe(() => player.getPlayerState()); return st === YT.PlayerState.PLAYING || st === YT.PlayerState.BUFFERING; };
  const toggle = () => (running() ? player.pauseVideo() : player.playVideo());
  const jump = d => player.seekTo(Math.max(0, safe(() => player.getCurrentTime()) + d), true);

  box._vpUi = vpBindUi(box, $('#ytpClick'), {
    toggle, jump,
    speed: r => { try { player.setPlaybackRate(r); } catch {} },
    wake: () => ytWake(box),
    hide: () => { clearTimeout(box._idleT); box.classList.add('ytp-idle'); },
    paused: () => !running()
  });

  seek.addEventListener('input', () => {
    ytActive && (ytActive.seeking = true);
    const dur = safe(() => player.getDuration());
    $('#vpTime').textContent = fmtTime(dur * seek.value / 1000);
  });
  seek.addEventListener('change', () => {
    const dur = safe(() => player.getDuration());
    player.seekTo(dur * seek.value / 1000, true);
    ytActive && (ytActive.seeking = false);
  });

  const syncMute = () => {
    const muted = safe(() => player.isMuted());
    $('#vpMute').innerHTML = muted ? YT_ICONS.mute : YT_ICONS.vol;
    box.classList.toggle('is-muted', !!muted);
    vol.style.setProperty('--p', (muted ? 0 : vol.value) + '%');
  };
  $('#vpMute').addEventListener('click', () => {
    safe(() => player.isMuted()) ? player.unMute() : player.mute();
    setTimeout(syncMute, 60);
  });
  vol.addEventListener('input', () => {
    player.setVolume(Number(vol.value));
    if (Number(vol.value) > 0 && safe(() => player.isMuted())) player.unMute();
    setTimeout(syncMute, 60);
  });

  // ⚙ ichidagi «Sifat»: hozir haqiqatda qaysi sifat o'ynayapti
  const syncQ = () => {
    const now = YT_Q_LABEL[safe(() => player.getPlaybackQuality())];
    const nowEl = $('#vpQNow');
    if (nowEl) nowEl.textContent = now ? `· ${t('player.qNow')} ${now}` : '';
  };

  // Sichqoncha/barmoq harakati — panel ko'rinadi, 3 s dan keyin yashirinadi
  ['mousemove', 'touchstart'].forEach(ev => box.addEventListener(ev, () => ytWake(box), { passive: true }));
  box.addEventListener('mouseleave', () => { if (ytActive?.player === player && running() && !box._vpUi?.menuOpen()) box.classList.add('ytp-idle'); });
  $('#vpBar').addEventListener('input', () => ytWake(box));

  // Klaviatura: probel — pauza, strelkalar — 10 s
  box.tabIndex = 0;
  box.addEventListener('keydown', e => {
    if (ytActive?.player !== player) return;
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space' || e.code === 'KeyK') { e.preventDefault(); toggle(); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); jump(-10); }
    if (e.code === 'ArrowRight') { e.preventDefault(); jump(10); }
    if (e.code === 'Escape' && box.classList.contains('ytp-pseudo-fs')) ytToggleFullscreen(box);
    if (e.code === 'KeyF') ytToggleFullscreen(box);
    if (e.code === 'KeyM') $('#vpMute').click();
  });

  ytActive.timer = setInterval(() => {
    if (!ytActive || ytActive.player !== player) return;
    const cur = safe(() => player.getCurrentTime()), dur = safe(() => player.getDuration());
    if (dur > 0 && !ytActive.seeking) {
      seek.value = Math.round(cur / dur * 1000);
      seek.style.setProperty('--p', (cur / dur * 100) + '%');
      $('#vpTime').textContent = fmtTime(cur);
    }
    $('#vpDur').textContent = $('#vpLeft').textContent = fmtTime(dur);
    syncMute();
    syncQ();
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

/* O'lcham har safar ekran burilganda qayta hisoblanadi. Avval faqat to'liq ekranga
   kirish paytida o'lchanardi — telefon hali tik turgan bo'lsa, gorizontal holatda
   video eni tik ekran eniga teng qolib, kichkina chiqardi. */
function ytOnResize() {
  const box = document.querySelector('.player-wrap.ytp');
  if (!box) return;
  ytFsSize(box);
  // burilish animatsiyasi tugagach yana bir marta
  clearTimeout(ytOnResize.t);
  ytOnResize.t = setTimeout(() => ytFsSize(box), 350);
  if (!ytIsFull(box)) box.classList.remove('ytp-idle', 'ytp-fill');
}

function ytIsFull(box) {
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  return fsEl === box || box.classList.contains('ytp-pseudo-fs');
}

/* Panelni ko'rsatib, ijro davom etsa 3 s dan keyin yashiramiz */
function ytWake(box) {
  box.classList.remove('ytp-idle');
  clearTimeout(box._idleT);
  box._idleT = setTimeout(() => {
    const st = ytActive?.box === box ? ytActive.player?.getPlayerState?.() : null;
    if (st === 1 && !box._vpUi?.menuOpen()) box.classList.add('ytp-idle');
  }, 3000);
}

function ytExitPseudo(box) {
  box.classList.remove('ytp-pseudo-fs', 'ytp-rotated', 'ytp-idle', 'ytp-fill');
  document.documentElement.classList.remove('ytp-lock');
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
      ytOnResize();
      ytWake(box);
      return;
    } catch { /* ruxsat berilmadi — pastdagi usulga o'tamiz */ }
  }

  // zaxira: CSS orqali butun ekran (iPhone)
  box.classList.add('ytp-pseudo-fs');
  document.documentElement.classList.add('ytp-lock');
  ytFsSize(box);
  ytWake(box);
}

addEventListener('resize', ytOnResize);
addEventListener('orientationchange', ytOnResize);
document.addEventListener('fullscreenchange', ytOnResize);
document.addEventListener('webkitfullscreenchange', ytOnResize);
