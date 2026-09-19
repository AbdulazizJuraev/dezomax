/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 5,
    "slug": "oppenheimer",
    "type": "film",
    "title": {
      "uz": "Oppengeymer",
      "ru": "Оппенгеймер"
    },
    "genres": [
      "drama",
      "biography",
      "history"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Robert Downey Jr.",
      "Matt Damon"
    ],
    "desc": {
      "uz": "Atom bombasini yaratgan olim Robert Oppengeymerning hayoti va o‘z kashfiyoti oldidagi ma’naviy iztiroblari haqida.",
      "ru": "История Роберта Оппенгеймера — учёного, создавшего атомную бомбу, и его мучительного противостояния с собственным творением."
    },
    "colors": [
      "#6b2f1e",
      "#1a0d08"
    ],
    "poster": "images/oppenheimer.jpg",
    "trailer": "https://www.youtube.com/watch?v=PFepj-rWbFE",
    "video": "https://dezocloud.uz/s/PlooAUF232-t4wVxnTNQS04I",
    "featured": true,
    "addedAt": 1789812012361,
    "updatedAt": 1789812012361,
    "year": 2023,
    "duration": 180,
    "rating": 8.3,
    "director": "Christopher Nolan"
  },
  {
    "id": 52,
    "slug": "the-batman",
    "type": "film",
    "title": {
      "uz": "Betmen",
      "ru": "Бэтмен"
    },
    "genres": [
      "action",
      "thriller",
      "crime",
      "detective"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Paul Dano",
      "Colin Farrell"
    ],
    "desc": {
      "uz": "Ikkinchi yilini o‘tayotgan Betmen Gotem elitasini nishonga olgan Topishmoqchi ismli qotilning izidan boradi.",
      "ru": "На втором году борьбы Бэтмен идёт по следу Загадочника, убивающего элиту Готэма."
    },
    "tags": [
      "Batman",
      "Бэтмен"
    ],
    "colors": [
      "#5a2a1e",
      "#140806"
    ],
    "poster": "images/the-batman.jpg",
    "trailer": "https://www.youtube.com/watch?v=GeagFRms_xE",
    "video": "https://dezocloud.uz/s/FycksdYvl40J3t_IN4tG3If3",
    "featured": true,
    "addedAt": 1789811984881,
    "updatedAt": 1789811984881,
    "year": 2022,
    "duration": 176,
    "rating": 7.8,
    "director": "Matt Reeves",
    "franchise": "dc"
  },
  {
    "id": 4,
    "slug": "dune",
    "type": "film",
    "title": {
      "uz": "Dyuna",
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
    "video": "https://dezocloud.uz/s/E-w6Cea6beCHxvwo1WUPopVL",
    "featured": false,
    "addedAt": 1789811944008,
    "updatedAt": 1789811944008,
    "year": 2021,
    "duration": 155,
    "rating": 8,
    "director": "Denis Villeneuve"
  },
  {
    "id": 7,
    "slug": "parasite",
    "type": "film",
    "title": {
      "uz": "Parazitlar",
      "ru": "Паразиты"
    },
    "genres": [
      "drama",
      "comedy",
      "thriller"
    ],
    "country": {
      "uz": "Janubiy Koreya",
      "ru": "Южная Корея"
    },
    "cast": [
      "Song Kang-ho",
      "Lee Sun-kyun",
      "Cho Yeo-jeong"
    ],
    "desc": {
      "uz": "Kambag‘al oila a’zolari birin-ketin boy oilaning uyiga ishga joylashadi. Ammo bu uy o‘zining dahshatli sirini yashirmoqda.",
      "ru": "Члены бедной семьи один за другим устраиваются на работу в богатый дом. Но дом хранит страшную тайну."
    },
    "colors": [
      "#4a5a3a",
      "#141a10"
    ],
    "poster": "images/parasite.png",
    "trailer": "https://www.youtube.com/watch?v=GGnM74uxjlo",
    "video": "https://dezocloud.uz/s/lhtc61qD9oAoCSLDOAjsFt8I",
    "featured": false,
    "addedAt": 1789811917969,
    "updatedAt": 1789811917969,
    "year": 2019,
    "duration": 132,
    "rating": 8.5,
    "director": "Bong Joon-ho"
  },
  {
    "id": 147,
    "slug": "thunderbolts",
    "type": "film",
    "title": {
      "uz": "Momaqaldiroqlar*",
      "ru": "Громовержцы*"
    },
    "genres": [
      "action",
      "thriller",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Florence Pugh",
      "Sebastian Stan",
      "David Harbour",
      "Julia Louis-Dreyfus"
    ],
    "desc": {
      "uz": "Yelena Belova va boshqa sobiq yollanma qotillar tuzoqqa tushib qoladi. Ular o‘tmishlariga qaramay, bir jamoa bo‘lib ishlashga majbur bo‘ladi.",
      "ru": "Елена Белова и другие бывшие наёмники попадают в ловушку. Несмотря на своё прошлое, им приходится действовать как команда."
    },
    "tags": [
      "Marvel",
      "thunderbolts"
    ],
    "colors": [
      "#3a3a3a",
      "#0a0a0a"
    ],
    "poster": "images/marvel/thunderbolts.jpg",
    "trailer": "https://www.youtube.com/watch?v=wpQIWG4PPmQ",
    "video": "https://dezocloud.uz/s/Wcdf5zKwCYfaAX1_NriNLTLd",
    "featured": false,
    "addedAt": 1789811892281,
    "updatedAt": 1789811892281,
    "year": 2025,
    "duration": 127,
    "director": "Jake Schreier",
    "franchise": "marvel"
  },
  {
    "id": 28,
    "slug": "chernobyl",
    "type": "serial",
    "title": {
      "uz": "Chernobil",
      "ru": "Чернобыль"
    },
    "genres": [
      "drama",
      "thriller",
      "history"
    ],
    "seasons": 1,
    "country": {
      "uz": "AQSh, Buyuk Britaniya",
      "ru": "США, Великобритания"
    },
    "cast": [
      "Jared Harris",
      "Stellan Skarsgård",
      "Emily Watson"
    ],
    "desc": {
      "uz": "1986-yilgi Chernobil halokati va uning ko‘lamini yashirishga urinishlar haqidagi haqiqiy voqealarga asoslangan mini-serial.",
      "ru": "Мини-сериал о катастрофе 1986 года и попытках скрыть её масштабы."
    },
    "colors": [
      "#5a6a3a",
      "#12160c"
    ],
    "poster": "images/chernobyl.jpg",
    "trailer": "https://www.youtube.com/watch?v=NQEtwLPn5Fw",
    "video": "https://dezocloud.uz/s/cxIr23e5LiweGS0RzjB0myD1",
    "featured": false,
    "addedAt": 1789811864389,
    "updatedAt": 1789811864389,
    "year": 2019,
    "rating": 9.3,
    "director": "Johan Renck"
  },
  {
    "id": 2928,
    "slug": "sonic-the-hedgehog-3",
    "type": "film",
    "title": {
      "uz": "Sonic 3",
      "ru": "Соник 3 в кино"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh, Yaponiya",
      "ru": "США, Япония"
    },
    "cast": [
      "Jim Carrey",
      "James Marsden",
      "Tika Sumpter",
      "Krysten Ritter"
    ],
    "desc": {
      "uz": "«Sonic 3» — 2024-yilgi AQSh va Yaponiya filmi. Rejissyor: Jeff Fowler. Rollarda: Jim Carrey, James Marsden, Tika Sumpter. Saytda rasmiy treyleri bor.",
      "ru": "«Соник 3 в кино» — полнометражный приключенческий комедийный экшен-фильм, основанный на серии компьютерных игр Sonic the Hedgehog."
    },
    "tags": [
      "Sonic the Hedgehog 3"
    ],
    "colors": [
      "hsl(350 45% 28%)",
      "hsl(10 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/f/f2/Sonic_the_Hedgehog_3_film_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=Mdsn1TSTHGY",
    "video": "https://dezocloud.uz/s/n-0DaY_5jkClM3cxxvCXrmmY",
    "featured": false,
    "addedAt": 1789811835087,
    "updatedAt": 1789811835087,
    "year": 2024,
    "duration": 110,
    "director": "Jeff Fowler"
  },
  {
    "id": 3,
    "slug": "the-dark-knight",
    "type": "film",
    "title": {
      "uz": "Qorong‘u ritsar",
      "ru": "Тёмный рыцарь"
    },
    "genres": [
      "action",
      "drama",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Gary Oldman"
    ],
    "desc": {
      "uz": "Gotham shahri tinchlanayotgan bir paytda Joker ismli tartibsizlik ustasi paydo bo‘ladi va Betmenning barcha tamoyillarini sinovga qo‘yadi.",
      "ru": "В Готэме появляется Джокер — гений хаоса, который ставит под сомнение все принципы Бэтмена."
    },
    "tags": [
      "Batman",
      "Betmen",
      "Бэтмен",
      "Joker"
    ],
    "colors": [
      "#1f2937",
      "#050607"
    ],
    "poster": "images/the-dark-knight.jpg",
    "trailer": "https://www.youtube.com/watch?v=KO90kiH6W0U",
    "video": "https://s11.faylmovi.ru/tarjima_kinolar/betmen_qora_ritsar_1080.mp4",
    "featured": true,
    "addedAt": 1789811740797,
    "updatedAt": 1789811740797,
    "year": 2008,
    "duration": 152,
    "rating": 9,
    "director": "Christopher Nolan",
    "franchise": "dc"
  },
  {
    "id": 2,
    "slug": "inception",
    "type": "film",
    "title": {
      "uz": "Boshlanish",
      "ru": "Начало"
    },
    "genres": [
      "action",
      "scifi",
      "thriller"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy"
    ],
    "desc": {
      "uz": "Tushga kirib sir o‘g‘irlaydigan usta o‘g‘ri oxirgi ish sifatida mutlaqo teskari vazifani oladi — odam ongiga g‘oya joylashtirish.",
      "ru": "Мастер проникновения в сны получает последнее задание — не украсть идею, а внедрить её в чужой разум."
    },
    "colors": [
      "#2b2b3d",
      "#101018"
    ],
    "poster": "images/inception.jpg",
    "trailer": "https://www.youtube.com/watch?v=85Zz1CCXyDI",
    "video": "https://s8.faylmovi.ru/tarjima_kinolar/Muqaddima_720.mp4",
    "featured": false,
    "addedAt": 1789811668187,
    "updatedAt": 1789811668187,
    "year": 2010,
    "duration": 148,
    "rating": 8.8,
    "director": "Christopher Nolan"
  },
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
    "cast": [
      "Dwayne Johnson",
      "Josh Hutcherson",
      "Michael Caine",
      "Vanessa Hudgens"
    ],
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
    "updatedAt": 1789811155879,
    "year": 2016,
    "duration": 1,
    "director": "Brad Peyton",
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
    "video": "https://files.uzbeklar.biz/film3/ralf-internetga-qarshi.mp4",
    "featured": false,
    "addedAt": 1789489966997,
    "updatedAt": 1789811566262,
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
