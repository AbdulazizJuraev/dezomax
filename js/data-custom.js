/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 2981,
    "slug": "sirli-orol-2",
    "type": "film",
    "title": {
      "uz": "Sirli orol 2",
      "ru": "Таинственный остров 2"
    },
    "genres": [
      "action",
      "comedy",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "O'zbek tilida",
      "ru": "На узбекском языке"
    },
    "cast": [],
    "desc": {
      "uz": "Sirli sayohat / Sirli Orol / Orol 2 — sarguzasht, fantastika, jangari va komediya janridagi film. Shon Anderson sirli oroldan yordam so‘rab yuborilgan kodlangan signalni qabul qiladi. U o‘gay otasi bilan birgalikda noma’lum orolni izlashga yo‘l oladi. U yerda g‘ayrioddiy jonzotlar, oltin tog‘lari, xavfli vulqonlar va ko‘plab sirlar yashiringan. Ammo orolni kuchli zilzila suv ostida qoldirishidan oldin ular uning sirlarini ochib, u yerdagi odamni qutqarib, qochib chiqishlari kerak.",
      "ru": "«Путешествие 2: Таинственный остров» — приключенческий фантастический фильм 2012 года. Шон Андерсон получает закодированный сигнал о помощи с таинственного острова, существование которого практически невозможно. Вместе с отчимом, пилотом вертолёта и его дочерью Шон отправляется на поиски острова. Там их ждут необычные существа, золотые горы, опасные вулканы и множество загадок. Героям предстоит найти остров, спасти его единственного жителя и выбраться оттуда до того, как мощное землетрясение скроет остров под водой."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://abdulazizjuraev.github.io/dezomax/images/custom/sirli-orol-2-2981.jpg",
    "trailer": "https://youtu.be/7G8xGLbToFs?si=c0X3tO1K2GdDfDax",
    "video": "https://dezocloud.uz/s/jVAJyqBBFysYLb2rxoy4puWr",
    "featured": true,
    "addedAt": 1789810249059,
    "updatedAt": 1789810249059,
    "year": 2016,
    "duration": 1,
    "audio": "uz"
  },
  {
    "id": 1,
    "slug": "interstellar",
    "type": "film",
    "title": {
      "uz": "Yulduzlararo",
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
    "video": "https://dezocloud.uz/s/fMA6pMT44vELITVWAxd61YYk",
    "featured": true,
    "addedAt": 1789808327008,
    "updatedAt": 1789808327008,
    "year": 2014,
    "duration": 169,
    "rating": 8.7,
    "director": "Christopher Nolan"
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
    "trailer": "https://www.youtube.com/watch?v=Io2dwq7B7xM",
    "video": "https://dezocloud.uz/s/ZtKA-GdHEolSWUGnSf_qHuYw",
    "featured": true,
    "addedAt": 1789802968800,
    "updatedAt": 1789802968800,
    "year": 2019,
    "duration": 181,
    "rating": 8.4,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel"
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
