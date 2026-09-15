/* ============================================================
   DezoMax — faqat Android ilovasida ishlaydigan qo'shimchalar
   (saytda bu fayl yuklanmaydi; mobile/scripts/copy-web.js ulaydi)
   ============================================================ */

(function () {
  const cap = window.Capacitor;
  if (!cap || !cap.isNativePlatform || !cap.isNativePlatform()) return;

  const { App, ScreenOrientation, SystemBars } = cap.Plugins;
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

  /* ---- Video katta ekranda — telefon gorizontal holatga o'tadi, status bar yashirinadi ---- */
  const syncOrientation = () => {
    const fs = document.fullscreenElement || document.webkitFullscreenElement;
    // katta ekranda soat/batareya qatori va pastki panel butunlay yashirinadi
    if (SystemBars) Promise.resolve(fs ? SystemBars.hide() : SystemBars.show()).catch(() => {});
    if (!ScreenOrientation) return;
    if (fs) ScreenOrientation.lock({ orientation: 'landscape' }).catch(() => {});
    else ScreenOrientation.unlock().catch(() => {});
    // o'lcham burilishdan keyin qayta hisoblansin
    setTimeout(() => window.dispatchEvent(new Event('resize')), 400);
  };
  document.addEventListener('fullscreenchange', syncOrientation);
  document.addEventListener('webkitfullscreenchange', syncOrientation);

  /* ---- Bildirishnomalar (admin ilovasi yuboradi) ----
     Tekshiruvni fondagi runner bajaradi (mobile/native/notify-runner.js). Bu yerda:
     ruxsat so'raymiz, ilova ochilganda/qaytganda darhol tekshirtiramiz, bosilganda kerakli sahifani ochamiz. */
  const Runner = cap.Plugins.BackgroundRunner;
  const isAdminApp = document.documentElement.classList.contains('is-admin-app') || document.body.classList.contains('is-admin-app');
  if (Runner && !isAdminApp) {
    const NOTIFY_URL = 'https://raw.githubusercontent.com/AbdulazizJuraev/dezomax/main/data/notifications.json';
    const numId = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (Math.abs(h) % 2000000000) + 1; };
    const check = () => Promise.resolve(Runner.dispatchEvent({ label: 'uz.dezomax.app.notify', event: 'checkNotifications', details: {} })).catch(() => {});

    // ruxsatni kirish animatsiyasidan keyin so'raymiz (Android 13+ oynasi chiqadi)
    setTimeout(async () => {
      try {
        const asked = localStorage.getItem('dzxNotifyAsked');
        if (!asked) {
          localStorage.setItem('dzxNotifyAsked', '1');
          await Runner.requestPermissions({ apis: ['notifications'] });
        }
      } catch {}
      check();
    }, 6500);
    App && App.addListener('resume', check);

    Runner.addListener && Runner.addListener('backgroundRunnerNotificationReceived', async ev => {
      try {
        const data = await (await fetch(NOTIFY_URL + '?t=' + Date.now())).json();
        const item = (data.items || []).find(n => numId(n.id) === ev.notificationId);
        if (item && item.url) location.href = item.url;
      } catch {}
    });
  }

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
