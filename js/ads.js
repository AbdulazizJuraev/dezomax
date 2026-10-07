/* ============================================================
   DezoMax — reklama (Yandex RSYa, Google AdSense, AdMob, VAST video)
   ------------------------------------------------------------
   - Bannerlar: sahifadagi <div class="ad-slot" data-ad-slot="..."> joylariga chiziladi
     (bosh sahifa qatorlari orasida, katalog, kino sahifasi). ID yo'q bo'lsa — joy ko'rinmaydi.
   - Kino oldidan reklama: saytda — VAST video (masalan Yandex InStream havolasi),
     Android ilovada — AdMob interstitial (DezoAds plagini, MainActivity).
   - Pullik/sinov obunasi faol foydalanuvchilar reklama ko'rmaydi ("Reklamasiz ko'rish").
   ID'larni reklama tarmoqlari tasdiqlagach ADS_CONFIG ga yozing.
   ============================================================ */

const ADS_CONFIG = {
  // Yandex RSYa: RTB blok ID'lari ('R-A-1234567-1'). Bir nechta bo'lsa — navbat bilan
  // on: false — Yandex moderatsiyadan o'tmagan (2026-10-07 rad etildi: haftasiga <100 tashrifchi). O'tmaguncha
  // uning ~1,8 MB kodi yuklanmaydi (sahifa tezroq). Qayta tasdiqlangach — on: true.
  yandex: { banners: ['R-A-20143550-1'], on: false },
  // Google AdSense: client — hisob ID, slot — banner blok raqami (sayt tasdiqlangach
  // AdSense → Объявления → По рекламным блокам → Медийный блок yaratib, raqamini yozing).
  // Yuklovchi kod va ads.txt har bir sahifada / ildizda turibdi.
  adsense: { client: 'ca-pub-3356248514435871', slot: '' },
  // Banner uchun tarmoqlar tartibi: birinchi sozlangani ishlatiladi
  bannerOrder: ['yandex', 'adsense'],
  // Kino oldidan video reklama (saytda): VAST havola. Yo'q bo'lsa — reklamasiz boshlanadi
  vastUrl: '',
  skipAfter: 5,           // shuncha soniyadan keyin "O'tkazib yuborish"
  prerollEveryMin: 10,    // ikki video reklama orasida kamida shuncha daqiqa
  // Android ilova (AdMob): kino oldidan interstitial blok ID ('ca-app-pub-.../...')
  admob: { interstitial: '' }
};

const Ads = (() => {
  const C = ADS_CONFIG;
  const LAST_KEY = 'dezomax_ad_last';
  const native = () => !!(window.Capacitor?.isNativePlatform?.());
  const L = (uz, ru) => (typeof LANG !== 'undefined' && LANG === 'ru' ? ru : uz);

  /* Faol pullik yoki sinov obunasi bor — reklama yo'q */
  function adFree() {
    try {
      const u = typeof Auth !== 'undefined' && Auth.user();
      if (!u) return false;
      const p = Object.assign(defaultProfile(u), readJSON(PROFILE_KEY(u.uid)) || {});
      if (p.role === 'child') return true;   // bolalar rejimida reklama ko'rsatilmaydi (Google bolalar siyosati)
      return p.plan !== 'free' && !!p.planUntil && p.planUntil > Date.now();
    } catch { return false; }
  }

  function bannerNet() {
    for (const n of C.bannerOrder) {
      if (n === 'yandex' && C.yandex.on !== false && C.yandex.banners.length) return 'yandex';
      if (n === 'adsense' && C.adsense.client && C.adsense.slot) return 'adsense';
    }
    return null;
  }

  const loaded = {};
  function loadOnce(key, src, attrs = {}) {
    if (loaded[key]) return;
    loaded[key] = true;
    if (document.querySelector(`script[src="${src}"]`)) return;   // sahifa <head>ida allaqachon bor
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    document.head.appendChild(s);
  }

  let slotN = 0;
  function fill(root = document) {
    const slots = [...root.querySelectorAll('.ad-slot:not([data-ad-done])')];
    if (!slots.length) return;
    const net = bannerNet();
    if (!net || adFree()) { slots.forEach(s => s.remove()); return; }

    slots.forEach(slot => {
      slot.dataset.adDone = '1';
      const n = ++slotN;
      slot.innerHTML = `
        <div class="ad-head"><span>${L('Reklama', 'Реклама')}</span>
          <a href="plans.html">${L('Reklamasiz ko‘rish', 'Смотреть без рекламы')} →</a></div>
        <div class="ad-body" id="adBody${n}"></div>`;
      const body = slot.querySelector('.ad-body');

      if (net === 'yandex') {
        const ids = C.yandex.banners;
        const blockId = ids[(n - 1) % ids.length];
        // reklama haqiqatan chizilmaguncha joy yashirin — bo'sh "Reklama" qutisi ko'rinmasin
        slot.classList.add('is-pending');
        // Yandex reklama bermasa (moderatsiya, reklama yo'q) — AdSense sozlangan bo'lsa o'shani qo'yamiz
        const fallback = () => { if (adsenseReady()) { slot.classList.remove('is-pending'); renderAdsense(body); } else slot.remove(); };
        window.yaContextCb = window.yaContextCb || [];
        loadOnce('ya', 'https://yandex.ru/ads/system/context.js');
        window.yaContextCb.push(() => {
          try {
            Ya.Context.AdvManager.render({
              blockId, renderTo: body.id,
              ...(ids.length === 1 && n > 1 ? { pageNumber: n } : {}),
              onRender: () => slot.classList.remove('is-pending'),
              onError: fallback
            });
          } catch { fallback(); }
        });
      } else {
        renderAdsense(body);
      }
    });
  }

  const adsenseReady = () => !!(C.adsense.client && C.adsense.slot);
  function renderAdsense(body) {
    loadOnce('gads', `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${C.adsense.client}`, { crossorigin: 'anonymous' });
    body.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${C.adsense.client}"
      data-ad-slot="${C.adsense.slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }

  /* ---------- Kino oldidan reklama ---------- */

  function prerollDue() {
    try { return Date.now() - (+localStorage.getItem(LAST_KEY) || 0) > C.prerollEveryMin * 60000; }
    catch { return true; }
  }
  function markShown() { try { localStorage.setItem(LAST_KEY, String(Date.now())); } catch {} }

  /* Hozir kino oldidan reklama ko'rsatiladimi (tashqi pleyerlar muqova chizish uchun so'raydi) */
  function wantsPreroll() {
    if (adFree() || !prerollDue()) return false;
    return native() ? !!(C.admob.interstitial && window.Capacitor?.Plugins?.DezoAds) : !!C.vastUrl;
  }

  /* box — pleyer (.player-wrap). Reklama tugagach / o'tkazilganda / xato bo'lsa resolve bo'ladi */
  async function preroll(box) {
    if (!wantsPreroll()) return;
    if (native()) {
      const plugin = window.Capacitor.Plugins.DezoAds;
      try { await withTimeout(plugin.interstitial({ adUnitId: C.admob.interstitial }), 20000); markShown(); } catch {}
      return;
    }
    let ad;
    try { ad = await withTimeout(loadVast(C.vastUrl), 4000); } catch { return; }
    if (!ad) return;
    markShown();
    await playVast(box, ad);
  }

  function withTimeout(p, ms) {
    return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  }

  const macro = u => u.replace(/\[(CACHEBUSTING|TIMESTAMP)\]/g, (_, k) =>
    k === 'TIMESTAMP' ? new Date().toISOString() : String(Math.floor(Math.random() * 1e8)));
  const ping = u => { try { if (u) new Image().src = macro(u.trim()); } catch {} };
  const texts = (el, sel) => [...el.querySelectorAll(sel)].map(x => x.textContent.trim()).filter(Boolean);
  const secs = s => { const m = /(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(s || ''); return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : null; };

  /* VAST 2/3/4: Wrapper'larni kuzatib, mp4 faylni, hisoblagichlarni va bosish havolasini yig'amiz */
  async function loadVast(url, depth = 0, acc = { impressions: [], tracking: {}, clicks: [] }) {
    if (depth > 4) return null;
    const u = macro(url);
    // cookie bilan (reklama aniqroq) — server CORS'da ruxsat bermasa, cookie'siz qayta
    const r = await fetch(u, { credentials: 'include' }).catch(() => fetch(u));
    const xml = new DOMParser().parseFromString(await r.text(), 'text/xml');
    const adEl = xml.querySelector('Ad');
    if (!adEl) { texts(xml, 'Error').forEach(ping); return null; }

    acc.impressions.push(...texts(adEl, 'Impression'));
    acc.clicks.push(...texts(adEl, 'Linear ClickTracking'));
    adEl.querySelectorAll('Linear Tracking').forEach(t => {
      const ev = t.getAttribute('event');
      (acc.tracking[ev] = acc.tracking[ev] || []).push(t.textContent.trim());
    });

    const wrapper = adEl.querySelector('Wrapper VASTAdTagURI');
    if (wrapper) return loadVast(wrapper.textContent.trim(), depth + 1, acc);

    const linear = adEl.querySelector('Linear');
    if (!linear) return null;
    const files = [...linear.querySelectorAll('MediaFile')]
      .filter(f => /mp4|webm/.test(f.getAttribute('type') || '') && !/vpaid/i.test(f.getAttribute('apiFramework') || ''))
      .map(f => ({ url: f.textContent.trim(), w: +f.getAttribute('width') || 0 }))
      .filter(f => f.url);
    if (!files.length) return null;
    // ekranga eng mos sifat: 720p atrofida
    files.sort((a, b) => Math.abs(a.w - 1280) - Math.abs(b.w - 1280));
    return {
      ...acc,
      src: files[0].url,
      clickThrough: texts(linear, 'ClickThrough')[0] || '',
      skip: secs(linear.getAttribute('skipoffset')) ?? C.skipAfter
    };
  }

  function playVast(box, ad) {
    return new Promise(resolve => {
      const layer = document.createElement('div');
      layer.className = 'ad-preroll';
      layer.innerHTML = `
        <video playsinline preload="auto" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        <span class="ad-preroll-tag">${L('Reklama', 'Реклама')} <b></b></span>
        ${ad.clickThrough ? `<a class="ad-preroll-more" href="${esc(ad.clickThrough)}" target="_blank" rel="noopener sponsored">${L('Batafsil', 'Подробнее')}</a>` : ''}
        <button class="ad-preroll-skip" type="button" disabled></button>`;
      box.appendChild(layer);
      const v = layer.querySelector('video');
      const skip = layer.querySelector('.ad-preroll-skip');
      const left = layer.querySelector('.ad-preroll-tag b');
      const fired = {};
      const fire = ev => { if (!fired[ev]) { fired[ev] = 1; (ad.tracking[ev] || []).forEach(ping); } };

      let done = false;
      const finish = ev => {
        if (done) return;
        done = true;
        if (ev) fire(ev);
        try { v.pause(); v.removeAttribute('src'); v.load(); } catch {}
        layer.remove();
        resolve();
      };

      v.src = ad.src;
      v.addEventListener('playing', () => { if (!fired.start) { ad.impressions.forEach(ping); fire('creativeView'); fire('start'); } }, { once: true });
      v.addEventListener('timeupdate', () => {
        const d = v.duration || 0, c = v.currentTime;
        if (d) {
          if (c / d > .25) fire('firstQuartile');
          if (c / d > .5) fire('midpoint');
          if (c / d > .75) fire('thirdQuartile');
          left.textContent = '· ' + Math.max(0, Math.ceil(d - c));
        }
        const wait = Math.ceil(ad.skip - c);
        skip.disabled = wait > 0;
        skip.textContent = wait > 0 ? L(`O‘tkazish: ${wait}`, `Пропустить: ${wait}`) : L('O‘tkazib yuborish ›', 'Пропустить ›');
      });
      v.addEventListener('ended', () => finish('complete'));
      v.addEventListener('error', () => finish());
      skip.addEventListener('click', () => finish('skip'));
      layer.querySelector('.ad-preroll-more')?.addEventListener('click', () => { ad.clicks.forEach(ping); v.pause(); });
      v.addEventListener('pause', () => { if (!done && !v.ended) layer.classList.add('is-paused'); });
      layer.addEventListener('click', e => { if (e.target === v && v.paused) { layer.classList.remove('is-paused'); v.play().catch(() => {}); } });
      skip.textContent = L(`O‘tkazish: ${Math.ceil(ad.skip)}`, `Пропустить: ${Math.ceil(ad.skip)}`);

      v.play().catch(() => { v.muted = true; v.play().catch(() => finish()); });
      setTimeout(() => { if (!fired.start) finish(); }, 8000);   // reklama yuklanmasa — kino kutib qolmasin
    });
  }

  document.addEventListener('DOMContentLoaded', () => fill());
  if (document.readyState !== 'loading') fill();
  // obuna olinganda — sahifadagi reklamalar darhol yo'qoladi
  document.addEventListener('profilechange', () => { if (adFree()) document.querySelectorAll('.ad-slot').forEach(s => s.remove()); });

  return { fill, preroll, wantsPreroll, adFree };
})();
