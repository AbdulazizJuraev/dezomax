/* ============================================================
   DezoMax — logotip (images/logo/new logo.svg asosida, sahifaga ichki SVG)
   «DEZO» — oq, «MAX» va plyonka — ko'k → qizil → yashil bo'lib almashib turadigan gradient.
   <body> boshida yuklanadi; .logo-img rasmlarini ichki SVG bilan almashtiradi.
   Qayta yig'ish: scratchpad/build-logo.js (SVG o'zgarsa shu skript qayta ishga tushiriladi).
   ============================================================ */

/* Ko'rinish sozlamalari (2026-11-23): yorug' mavzu va shrift o'lchami — localStorage, sahifa chizilishidan oldin (logo.js <body> boshida) */
try { var dzxD = document.documentElement, dzxT = localStorage.getItem('dzx_theme'), dzxF = localStorage.getItem('dzx_font');
  if (dzxT === 'light') dzxD.setAttribute('data-theme', 'light'); if (dzxF && dzxF !== 'm') dzxD.setAttribute('data-fs', dzxF); } catch (e) {}

/* Tekshiruv rejimi (?debug=1): JavaScript xatosi bo'lsa — ekranning pastida qizil yozuv: xato matni va fayl:qator.
   Oddiy foydalanuvchiga ko'rinmaydi. Yuklanmagan rasm (poster) — xato emas, ko'rsatilmaydi. */
(function () {
  if (!/[?&]debug=1/.test(location.search)) return;
  const shown = new Set();
  const show = (msg, src) => {
    const text = String(msg || 'xato').slice(0, 300) + (src ? ' — ' + src : '');
    if (shown.has(text) || shown.size > 4) return;
    shown.add(text);
    const put = () => {
      let box = document.getElementById('dzxErr');
      if (!box) {
        box = document.createElement('div');
        box.id = 'dzxErr';
        box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483647;padding:10px 12px;border-radius:12px;background:#7f1d1d;color:#fff;font:12px/1.45 monospace;white-space:pre-wrap;word-break:break-all;max-height:40vh;overflow:auto';
        box.addEventListener('click', () => box.remove());
        document.body.appendChild(box);
      }
      box.textContent += (box.textContent ? '\n\n' : 'XATO (skrinshot qilib yuboring):\n') + text;
    };
    document.body ? put() : addEventListener('DOMContentLoaded', put);
  };
  addEventListener('error', e => {
    if (e.target && e.target !== window && e.target.src) {
      if (e.target.tagName === 'SCRIPT') show('Yuklanmadi: ' + e.target.src.split('/').pop());
      return;
    }
    show(e.message, (e.filename || '').split('/').pop() + ':' + e.lineno + ':' + e.colno);
  }, true);
  addEventListener('unhandledrejection', e => show('Promise: ' + ((e.reason && (e.reason.stack || e.reason.message)) || e.reason)));
})();

(function () {
  /* Yangi logotip (2026-10-20, foydalanuvchi tayyorlagan «DezoSite Name.svg» → images/logo/dezomax-name.webp).
     Asl CorelDRAW fayli juda og'ir (~2 MB, 300+ tashqi rasm) — saytda tayyor yengil rasm ishlatiladi. */
  function dezoLogoSVG() {
    return '<img class="logo-svg-el" src="images/logo/dezomax-name.webp" alt="DezoMax" width="980" height="160" decoding="async">';
  }

  /* .logo-img rasmlarini ichki SVG bilan almashtirish */
  function upgradeLogos(root = document) {
    root.querySelectorAll('img.logo-img, img.acc-about-logo').forEach(img => {
      const span = document.createElement('span');
      span.className = img.className.replace('logo-img', 'logo-svg');
      if (img.classList.contains('acc-about-logo')) span.className = 'logo-svg acc-about-logo';
      span.innerHTML = dezoLogoSVG();
      img.replaceWith(span);
    });
  }

  window.dezoLogoSVG = dezoLogoSVG;
  window.upgradeLogos = upgradeLogos;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => upgradeLogos());
  } else {
    upgradeLogos();
  }
  // akkaunt sahifasi kabi keyin chiziladigan joylar uchun
  new MutationObserver(muts => {
    if (muts.some(m => [...m.addedNodes].some(nd => nd.nodeType === 1 && (nd.matches?.('img.logo-img, img.acc-about-logo') || nd.querySelector?.('img.logo-img, img.acc-about-logo'))))) upgradeLogos();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

// Pastki panel «shisha» effekti (css/style.css, 2026-11-25): kuchsiz telefonlarda (≤4 GB xotira yoki ≤4 yadro)
// va «kamroq shaffoflik» sozlamasida o'chiriladi — oddiy to'q panel qoladi, qotmasin
(function () {
  try {
    const n = navigator, weak = (n.deviceMemory && n.deviceMemory <= 4) || (n.hardwareConcurrency && n.hardwareConcurrency <= 4)
      || (window.matchMedia && matchMedia('(prefers-reduced-transparency: reduce)').matches);
    if (weak) document.documentElement.classList.add('no-glass');
  } catch (e) {}
})();

// Pastki panel sahifa boshidanoq (2026-11-25): oldingi sahifada saqlangan nusxa (js/common.js renderTabbar → sessionStorage)
// darhol chiziladi — sahifalar orasida panel yo'qolib-chiqmaydi, faol kapsula esa yangi bo'limga suriladi (View Transitions).
// common.js keyinroq panelni o'sha joyda qayta chizadi (avatar, sanoqlar).
(function () {
  try {
    if (document.querySelector('.tabbar') || innerWidth > 900) return;
    const html = sessionStorage.getItem('dzx_tabbar');
    if (!html || !document.body) return;
    const bar = document.createElement('nav');
    bar.className = 'tabbar has-pill';
    bar.setAttribute('aria-label', 'Asosiy menyu');
    bar.innerHTML = html;
    document.body.appendChild(bar);
    // faol bo'lim — joriy manzil bo'yicha
    const here = location.pathname.replace(/\/index\.html$/, '/') + location.search;
    let act = null;
    bar.querySelectorAll('.tabbar-item').forEach(a => {
      a.classList.remove('is-active');
      const u = new URL(a.href, location.href), p = u.pathname.replace(/\/index\.html$/, '/');
      if (p + u.search === here || (!act && p === location.pathname.replace(/\/index\.html$/, '/') && !u.search)) act = a;
    });
    const p = bar.querySelector('.tb-pill');
    if (act && p) {
      act.classList.add('is-active');
      p.style.transition = 'none';
      p.style.opacity = '';
      p.style.width = act.offsetWidth + 'px'; p.style.height = act.offsetHeight + 'px';
      p.style.transform = `translate(${act.offsetLeft}px, ${act.offsetTop}px)`;
      requestAnimationFrame(() => { p.style.transition = ''; });
    } else if (p) p.style.opacity = '0';
  } catch (e) {}
})();

// Sekin internet rejimi (2026-11-25): 2G/3G, «trafik tejash» yoki tezlik < 1,5 Mbit/s bo'lsa — html.dzx-slow, window.DZX_SLOW.
// Unda: rasmlar kichikroq (YouTube 320 px, TMDB bir pog'ona kichik), bosh sahifa slayderi o'zi aylanmaydi va keyingi rasmni oldindan olmaydi.
(function () {
  try {
    const c = navigator.connection;
    let slow = !!c && (c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || '') || (c.downlink && c.downlink < 1.5));
    try { const f = localStorage.getItem('dzx_slow'); if (f === '1') slow = true; else if (f === '0') slow = false; } catch (e) {}   // qo'lda yoqish/o'chirish
    window.DZX_SLOW = slow;
    if (slow) document.documentElement.classList.add('dzx-slow');
  } catch (e) {}
})();
