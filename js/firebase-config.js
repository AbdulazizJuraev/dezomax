/* ============================================================
   DezoMax — Google orqali kirish sozlamasi
   ------------------------------------------------------------
   GOOGLE_WEB_CLIENT_ID bo'sh bo'lsa — DEMO rejim: Gmail manzili qo'lda
   kiritiladi, haqiqiy Google oynasi ochilmaydi.

   Ulash (bir marta, README.md → "Google orqali kirish"):
   1) console.cloud.google.com → yangi loyiha
   2) APIs & Services → OAuth consent screen → External, ilova nomi DezoMax
   3) Credentials → Create credentials → OAuth client ID:
      a) "Web application"
         Authorized JavaScript origins: https://abdulazizjuraev.github.io
      b) "Android"
         Package name: uz.dezomax.app
         SHA-1: 6C:BF:3F:3A:D5:12:72:CD:1A:D6:37:BE:2C:D6:E0:62:FF:2B:AF:5F
   4) (a) bandidagi Web client ID ni pastga qo'ying (…apps.googleusercontent.com)
   ============================================================ */

// Web Client ID ochiq ma'lumot (sahifa kodida baribir ko'rinadi). Client SECRET bu yerga HECH QACHON yozilmaydi.
const GOOGLE_WEB_CLIENT_ID = '908276451743-a2o6sj3n1fgfbm93q0e09ephcrotanvt.apps.googleusercontent.com';

/* To'lov serveri (Click) manzili — server/ papkasidagi dastur ishga tushirilgach shu yerga yoziladi:
   masalan 'https://12-34-56-78.sslip.io'. Bo'sh bo'lsa to'lov o'chiq (balans to'ldirilmaydi).
   Bu ochiq manzil; maxfiy Click kaliti FAQAT serverda turadi, bu yerga yozilmaydi. */
const PAY_API = 'https://pay.2-29-60-133.sslip.io';

/* Telegram orqali tasdiqlash uchun bot foydalanuvchi nomi (@siz), masalan 'DezoOnlinebot'.
   Bo'sh bo'lsa — kirish oynasida Telegram bo'limi ko'rinmaydi.
   Bot TOKENI faqat serverda (server/.env) turadi, bu yerga HECH QACHON yozilmaydi. */
const TG_BOT = 'dezomaxuserbot';
