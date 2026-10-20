/* ============================================================
   DezoMax — logotip (images/logo/new logo.svg asosida, sahifaga ichki SVG)
   «DEZO» — oq, «MAX» va plyonka — ko'k → qizil → yashil bo'lib almashib turadigan gradient.
   <body> boshida yuklanadi; .logo-img rasmlarini ichki SVG bilan almashtiradi.
   Qayta yig'ish: scratchpad/build-logo.js (SVG o'zgarsa shu skript qayta ishga tushiriladi).
   ============================================================ */

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
