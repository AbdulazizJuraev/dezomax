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

const GOOGLE_WEB_CLIENT_ID = '';
