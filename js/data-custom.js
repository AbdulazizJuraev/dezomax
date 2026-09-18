/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 4,
    "slug": "dune",
    "type": "film",
    "title": {
      "uz": "Dyuna 1",
      "ru": "Дюна"
    },
    "genres": [
      "drama",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Timothée Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Zendaya"
    ],
    "desc": {
      "uz": "Yosh Pol Atreydes oilasi bilan koinotdagi eng qimmat resurs manbai bo‘lgan xavfli sahro sayyorasiga ko‘chib o‘tadi.",
      "ru": "Юный Пол Атрейдес вместе с семьёй перебирается на опасную пустынную планету — источник самого ценного ресурса во Вселенной."
    },
    "colors": [
      "#a0663a",
      "#2e1a10"
    ],
    "poster": "images/dune.jpg",
    "trailer": "https://www.youtube.com/watch?v=Ja0zYjiQ8jc",
    "video": "",
    "featured": false,
    "addedAt": 1789720281818,
    "updatedAt": 1789720281818,
    "year": 2021,
    "duration": 155,
    "rating": 8,
    "director": "Denis Villeneuve"
  },
  {
    "id": 1,
    "slug": "interstellar",
    "type": "film",
    "title": {
      "uz": "INTERSTELLER",
      "ru": "Интерстеллар"
    },
    "genres": [
      "drama",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine"
    ],
    "desc": {
      "uz": "Yer sayyorasi yashash uchun yaroqsiz holga kelmoqda. Bir guruh tadqiqotchi insoniyatga yangi uy topish uchun qurt teshigi orqali boshqa galaktikaga yo‘l oladi.",
      "ru": "Земля становится непригодной для жизни. Группа исследователей отправляется через червоточину в другую галактику, чтобы найти новый дом для человечества."
    },
    "colors": [
      "#1b3a5c",
      "#0a1628"
    ],
    "poster": "images/interstellar.jpg",
    "trailer": "https://www.youtube.com/watch?v=qcPfI0y7wRU",
    "video": "http://2.29.52.42/s/fMA6pMT44vELITVWAxd61YYk",
    "featured": true,
    "addedAt": 1789720255608,
    "updatedAt": 1789722303488,
    "year": 2014,
    "duration": 169,
    "rating": 8.7,
    "director": "Christopher Nolan"
  },
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
