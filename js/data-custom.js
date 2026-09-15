/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 1000,
    "slug": "ralf-internetga-qarshi",
    "type": "multfilm",
    "title": {
      "uz": "Ralf Internetga qarshi",
      "ru": "Ральф против интернета"
    },
    "genres": [
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "",
      "ru": ""
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://abdulazizjuraev.github.io/dezomax/images/custom/ralf-internetga-qarshi-1000.jpg",
    "trailer": "",
    "video": "https://uzbeklar.biz/3710-ralf-internetga-qarshi.html",
    "featured": false,
    "addedAt": 1789489966997,
    "updatedAt": 1789489966997,
    "year": 2019,
    "audio": "uz"
  },
  {
    "id": 40,
    "slug": "avengers-endgame",
    "type": "film",
    "title": {
      "uz": "Qasoskorlar: Final",
      "ru": "Мстители: Финал"
    },
    "genres": [
      "action",
      "drama",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson",
      "Mark Ruffalo",
      "Josh Brolin"
    ],
    "desc": {
      "uz": "Tanosning qirg‘inidan omon qolgan qahramonlar yo‘qotilgan hamma narsani qaytarish uchun so‘nggi umidsiz rejani amalga oshiradi.",
      "ru": "Выжившие после щелчка Таноса герои идут на отчаянный шаг, чтобы вернуть всё потерянное."
    },
    "colors": [
      "#2a4a5a",
      "#08131a"
    ],
    "poster": "images/avengers-endgame.jpg",
    "trailer": "https://youtu.be/QPRtU7EqQy0?si=gnkfWAZ-M57lBG-y",
    "video": "https://drive.google.com/file/d/16tKacOI7B6ZIV1R7TgrsxBvg8sndFPHD/view?usp=drivesdk",
    "featured": true,
    "addedAt": 1789461867370,
    "updatedAt": 1789482554546,
    "year": 2019,
    "duration": 181,
    "rating": 8.4,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel",
    "source": {
      "name": "DezoMax",
      "url": ""
    }
  }
]/*END*/;
const HIDDEN_MOVIES = /*HIDDEN*/[]/*ENDHIDDEN*/;

if (typeof MOVIES !== 'undefined') {
  window.BASE_MOVIES = MOVIES.slice();        // admin sahifa asl ro'yxatni ko'rishi uchun
  for (const m of CUSTOM_MOVIES) {
    const i = MOVIES.findIndex(x => x.id === m.id);
    if (i > -1) MOVIES[i] = m; else MOVIES.push(m);
  }
  for (let i = MOVIES.length - 1; i >= 0; i--) {
    if (HIDDEN_MOVIES.includes(MOVIES[i].id)) MOVIES.splice(i, 1);
  }
}
