/* Kino kutubxonasi (js/data-lib.js + data-lib2.js, ~5.5 MB) faqat admin sahifada kerak:
   sayt faqat filmi qo'shilgan kinolarni ko'rsatadi, admin qo'shganlari esa data-custom.js da to'liq saqlanadi.
   Oddiy sahifalarda yuklanmaydi — sahifa tez ochiladi (ilovada birinchi ochilishda 10 soniya qotib qolardi). */
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  if (page !== 'admin.html') return;
  var s = document.currentScript && document.currentScript.src;
  if (!s) return;
  document.write('<script src="' + s.replace(/data-lib-gate\.js/, 'data-lib.js') + '"><\/script>');
})();
