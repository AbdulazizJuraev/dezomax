/* ============================================================
   DezoMax — faqat Android ilovasida ishlaydigan qo'shimchalar
   (saytda bu fayl yuklanmaydi; mobile/scripts/copy-web.js ulaydi)
   ============================================================ */

(function () {
  const cap = window.Capacitor;
  if (!cap || !cap.isNativePlatform || !cap.isNativePlatform()) return;

  const { App, ScreenOrientation } = cap.Plugins;
  document.documentElement.classList.add('is-native-app');

  /* ---- Telefonning "orqaga" tugmasi ---- */
  App && App.addListener('backButton', ({ canGoBack }) => {
    // 1) "Yana" menyusi ochiq bo'lsa — yopamiz
    const sheet = document.querySelector('.sheet-wrap');
    if (sheet && typeof closeMoreSheet === 'function') { closeMoreSheet(); return; }

    // 2) video katta ekranda bo'lsa — chiqamiz
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    const pseudo = document.querySelector('.ytp-pseudo-fs');
    if (pseudo && typeof ytToggleFullscreen === 'function') { ytToggleFullscreen(pseudo); return; }

    // 3) oldingi sahifa yoki ilovadan chiqish
    if (canGoBack && history.length > 1) history.back();
    else App.exitApp();
  });

  /* ---- Video katta ekranda — telefon gorizontal holatga o'tadi ---- */
  const syncOrientation = () => {
    if (!ScreenOrientation) return;
    const fs = document.fullscreenElement || document.webkitFullscreenElement;
    if (fs) ScreenOrientation.lock({ orientation: 'landscape' }).catch(() => {});
    else ScreenOrientation.unlock().catch(() => {});
  };
  document.addEventListener('fullscreenchange', syncOrientation);
  document.addEventListener('webkitfullscreenchange', syncOrientation);

  /* ---- Tashqi havolalar (YouTube, ESPN yangiliklari) ----
     WebView'da window.open yangi oyna ochmaydi. Oddiy o'tish esa Capacitor tomonidan
     ushlanadi va boshqa domen bo'lgani uchun tizim brauzeri yoki ilovasida ochiladi. */
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[target="_blank"]');
    if (!a || !/^https?:/i.test(a.href)) return;
    e.preventDefault();
    location.href = a.href;
  }, true);
})();
