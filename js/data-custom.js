/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 41,
    "slug": "spider-man-no-way-home",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak-odam: Uyga yo‘l yo‘q",
      "ru": "Человек-паук: Нет пути домой"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tom Holland",
      "Zendaya",
      "Benedict Cumberbatch",
      "Willem Dafoe"
    ],
    "desc": {
      "uz": "Piter Parkerning shaxsi oshkor bo‘lgach, u Doktor Streyndjdan yordam so‘raydi — va bu qadam olamlar orasidagi devorni ochib yuboradi.",
      "ru": "После раскрытия личности Питер Паркер просит помощи у Доктора Стрэнджа — и это открывает двери между вселенными."
    },
    "tags": [
      "Spider-Man",
      "Человек-паук"
    ],
    "colors": [
      "#7a1e3a",
      "#18060c"
    ],
    "poster": "images/spider-man-no-way-home.jpg",
    "trailer": "https://www.youtube.com/watch?v=gEG-EN9L7rA",
    "video": "https://a.uzbeklar.biz/film/orgimchakuy.mp4",
    "featured": true,
    "addedAt": 1790172265277,
    "updatedAt": 1790172265277,
    "year": 2021,
    "duration": 148,
    "rating": 8.2,
    "director": "Jon Watts",
    "franchise": "marvel"
  },
  {
    "id": 141,
    "slug": "black-panther-wakanda-forever",
    "type": "film",
    "title": {
      "uz": "Qora pantera: Vakanda abadiy",
      "ru": "Чёрная Пантера: Ваканда навеки"
    },
    "genres": [
      "action",
      "drama",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Letitia Wright",
      "Angela Bassett",
      "Tenoch Huerta",
      "Lupita Nyong’o"
    ],
    "desc": {
      "uz": "Qirol T’Challa vafotidan keyin Vakanda motamda. Suv osti qirolligi Talokan paydo bo‘lganda, mamlakat yangi himoyachisini topishi kerak.",
      "ru": "После гибели короля Т’Чаллы Ваканда в трауре. Когда появляется подводное королевство Талокан, стране нужно найти нового защитника."
    },
    "tags": [
      "Marvel",
      "black panther wakanda forever"
    ],
    "colors": [
      "#3a1a5a",
      "#0a0414"
    ],
    "poster": "images/marvel/black-panther-wakanda-forever.jpg",
    "trailer": "https://www.youtube.com/watch?v=fazUjELn0rg",
    "video": "https://topfilm.info/3/tarjima_kinolar/QORA_PANTERA_2_720.mp4",
    "featured": false,
    "addedAt": 1790171679630,
    "updatedAt": 1790171679630,
    "year": 2022,
    "duration": 161,
    "rating": 6.7,
    "director": "Ryan Coogler",
    "franchise": "marvel"
  },
  {
    "id": 136,
    "slug": "black-widow",
    "type": "film",
    "title": {
      "uz": "Qora beva",
      "ru": "Чёрная вдова"
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
      "Scarlett Johansson",
      "Florence Pugh",
      "David Harbour",
      "Rachel Weisz"
    ],
    "desc": {
      "uz": "Natasha Romanoff o‘tmishiga duch keladi. U «Qizil xona» dasturini yo‘q qilish uchun uzoq yillar ko‘rmagan «oilasi» bilan qayta birlashadi.",
      "ru": "Наташа Романофф сталкивается со своим прошлым. Чтобы уничтожить программу «Красная комната», она воссоединяется с давно утраченной «семьёй»."
    },
    "tags": [
      "Marvel",
      "black widow"
    ],
    "colors": [
      "#3a0a14",
      "#0a0204"
    ],
    "poster": "images/marvel/black-widow.jpg",
    "trailer": "https://www.youtube.com/watch?v=prwHu2MbMEE",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/Qora_beva_1080.mp4",
    "featured": false,
    "addedAt": 1790171497625,
    "updatedAt": 1790171497625,
    "year": 2021,
    "duration": 134,
    "rating": 6.7,
    "director": "Cate Shortland",
    "franchise": "marvel"
  },
  {
    "id": 38,
    "slug": "black-panther",
    "type": "film",
    "title": {
      "uz": "Qora pantera",
      "ru": "Чёрная пантера"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chadwick Boseman",
      "Michael B. Jordan",
      "Lupita Nyong'o",
      "Danai Gurira"
    ],
    "desc": {
      "uz": "Vakanda taxtiga o‘tirgan T‘Challa mamlakat siri ochilib ketish xavfi va o‘z qarindoshi tomonidan sinovga qo‘yiladi.",
      "ru": "Взошедший на трон Ваканды Т’Чалла сталкивается с угрозой раскрытия тайны страны и с собственным родственником."
    },
    "colors": [
      "#3a2a6b",
      "#0c0818"
    ],
    "poster": "images/black-panther.jpg",
    "trailer": "https://www.youtube.com/watch?v=qGpejFwCZS0",
    "video": "https://s11.faylmovi.ru/tarjima_kinolar/Qora_pantera_1080.mp4",
    "featured": false,
    "addedAt": 1790171443483,
    "updatedAt": 1790171443483,
    "year": 2018,
    "duration": 134,
    "rating": 7.3,
    "director": "Ryan Coogler",
    "franchise": "marvel"
  },
  {
    "id": 139,
    "slug": "doctor-strange-multiverse-of-madness",
    "type": "film",
    "title": {
      "uz": "Doktor Streyndj: Jinnilik multiolamida",
      "ru": "Доктор Стрэндж: В мультивселенной безумия"
    },
    "genres": [
      "action",
      "fantasy",
      "horror"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Benedict Cumberbatch",
      "Elizabeth Olsen",
      "Xochitl Gomez",
      "Benedict Wong"
    ],
    "desc": {
      "uz": "Doktor Streyndj olamlar orasida sayohat qila oladigan qiz Amerika Chavesni himoya qiladi. Ular multiolamning xavfli va g‘aroyib burchaklariga tushib qoladi.",
      "ru": "Доктор Стрэндж защищает Америку Чавес — девушку, способную путешествовать между вселенными. Они попадают в опасные и странные уголки мультивселенной."
    },
    "tags": [
      "Marvel",
      "doctor strange multiverse of madness"
    ],
    "colors": [
      "#4a1a6b",
      "#0e0414"
    ],
    "poster": "images/marvel/doctor-strange-multiverse-of-madness.jpg",
    "trailer": "https://www.youtube.com/watch?v=0_r_V5TOuEI",
    "video": "http://topfilm.info/4/tarjima_kinolar/DOKTOR_STRENJ_AQLSIZ_MULTIOLAM_1080.mp4",
    "featured": false,
    "addedAt": 1790171374583,
    "updatedAt": 1790171374583,
    "year": 2022,
    "duration": 126,
    "rating": 6.9,
    "director": "Sam Raimi",
    "franchise": "marvel"
  },
  {
    "id": 36,
    "slug": "doctor-strange",
    "type": "film",
    "title": {
      "uz": "Doktor Streyndj",
      "ru": "Доктор Стрэндж"
    },
    "genres": [
      "action",
      "fantasy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Benedict Cumberbatch",
      "Chiwetel Ejiofor",
      "Rachel McAdams",
      "Tilda Swinton"
    ],
    "desc": {
      "uz": "Halokatdan so‘ng qo‘llarini yo‘qotgan mag‘rur jarroh sehr sirlarini o‘rganib, olamlar himoyachisiga aylanadi.",
      "ru": "Потерявший руки после аварии хирург постигает тайны магии и становится защитником миров."
    },
    "colors": [
      "#7a4a1e",
      "#1a0f06"
    ],
    "poster": "images/doctor-strange.jpg",
    "trailer": "https://www.youtube.com/watch?v=o3tqPNSGzfE",
    "video": "http://topfilm.info/tarjima_kinolar/DOKTOR_STRENJ_720.mp4",
    "featured": false,
    "addedAt": 1790171315687,
    "updatedAt": 1790171315687,
    "year": 2016,
    "duration": 115,
    "rating": 7.5,
    "director": "Scott Derrickson",
    "franchise": "marvel"
  },
  {
    "id": 146,
    "slug": "captain-america-brave-new-world",
    "type": "film",
    "title": {
      "uz": "Kapitan Amerika: Yangi dunyo",
      "ru": "Капитан Америка: Новый мир"
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
      "Anthony Mackie",
      "Harrison Ford",
      "Danny Ramirez",
      "Tim Blake Nelson"
    ],
    "desc": {
      "uz": "Sem Uilson yangi Kapitan Amerika sifatida xalqaro mojaro markaziga tushib qoladi. U dunyoni urushga olib kelayotgan yashirin fitnani fosh etishi kerak.",
      "ru": "Сэм Уилсон в роли нового Капитана Америки оказывается в центре международного конфликта. Ему нужно раскрыть заговор, ведущий мир к войне."
    },
    "tags": [
      "Marvel",
      "captain america brave new world"
    ],
    "colors": [
      "#1d3565",
      "#6b1414"
    ],
    "poster": "images/marvel/captain-america-brave-new-world.jpg",
    "trailer": "https://www.youtube.com/watch?v=w3o3Z7julXo",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Kapitan_Amerika_Yangi_Dunyo_480.mp4",
    "featured": false,
    "addedAt": 1790171171644,
    "updatedAt": 1790171171644,
    "year": 2025,
    "duration": 118,
    "director": "Julius Onah",
    "franchise": "marvel"
  },
  {
    "id": 130,
    "slug": "captain-america-civil-war",
    "type": "film",
    "title": {
      "uz": "Kapitan Amerika: Fuqarolar urushi",
      "ru": "Первый мститель: Противостояние"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Evans",
      "Robert Downey Jr.",
      "Scarlett Johansson",
      "Sebastian Stan",
      "Tom Holland"
    ],
    "desc": {
      "uz": "Hukumat qahramonlarni nazorat ostiga olmoqchi. Bu masala Qasoskorlarni ikkiga bo‘ladi: bir tomonda Kapitan Amerika, boshqa tomonda Temir odam.",
      "ru": "Правительство хочет взять супергероев под контроль. Этот вопрос раскалывает Мстителей на два лагеря: Капитана Америку и Железного человека."
    },
    "tags": [
      "Marvel",
      "captain america civil war"
    ],
    "colors": [
      "#1d3565",
      "#5a1414"
    ],
    "poster": "images/marvel/captain-america-civil-war.jpg",
    "trailer": "https://www.youtube.com/watch?v=3DGRiomCPTM",
    "video": "https://files.uzmax.net/films/Kapitan.Amerika.Fuqarolar.urushi.2016.HDRip.uzmax.net.mp4",
    "featured": false,
    "addedAt": 1790171041261,
    "updatedAt": 1790171041261,
    "year": 2016,
    "duration": 147,
    "rating": 7.8,
    "director": "Anthony Russo, Joe Russo",
    "franchise": "marvel"
  },
  {
    "id": 125,
    "slug": "captain-america-the-first-avenger",
    "type": "film",
    "title": {
      "uz": "Kapitan Amerika: Birinchi qasoskor",
      "ru": "Первый мститель"
    },
    "genres": [
      "action",
      "scifi",
      "war"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Evans",
      "Hayley Atwell",
      "Hugo Weaving",
      "Tommy Lee Jones"
    ],
    "desc": {
      "uz": "Ikkinchi jahon urushi yillari. Zaif yigit Stiv Rodjers maxfiy tajriba natijasida super askarga aylanadi va Qizil Kalla boshchiligidagi GIDRAga qarshi chiqadi.",
      "ru": "Вторая мировая война. Хилый Стив Роджерс после секретного эксперимента становится суперсолдатом и выступает против ГИДРЫ Красного Черепа."
    },
    "tags": [
      "Marvel",
      "captain america the first avenger"
    ],
    "colors": [
      "#1d3565",
      "#6b1a1a"
    ],
    "poster": "images/marvel/captain-america-the-first-avenger.jpg",
    "trailer": "https://www.youtube.com/watch?v=FxTlOl03x9c",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Birinchi_qasoskor_1080.mp4",
    "featured": false,
    "addedAt": 1790170976850,
    "updatedAt": 1790170976850,
    "year": 2011,
    "duration": 124,
    "rating": 6.9,
    "director": "Joe Johnston",
    "franchise": "marvel"
  },
  {
    "id": 35,
    "slug": "captain-america-winter-soldier",
    "type": "film",
    "title": {
      "uz": "Kapitan Amerika: Qish askari",
      "ru": "Первый мститель: Другая война"
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
      "Chris Evans",
      "Scarlett Johansson",
      "Sebastian Stan",
      "Robert Redford"
    ],
    "desc": {
      "uz": "Stiv Rojers S.H.I.E.L.D. ichidagi xiyonatni fosh qiladi va o‘tmishdan qaytgan sirli qotil bilan to‘qnashadi.",
      "ru": "Стив Роджерс раскрывает заговор внутри Щ.И.Т. и сталкивается с загадочным убийцей из прошлого."
    },
    "colors": [
      "#2a4a6b",
      "#0a1220"
    ],
    "poster": "images/captain-america-winter-soldier.jpg",
    "trailer": "https://www.youtube.com/watch?v=sxtuHEazdoQ",
    "video": "https://files.uzmax.net/films/Kapitan.Amerika.Qish.askari.2014.HDRip.uzmax.net.mp4",
    "featured": false,
    "addedAt": 1790170923782,
    "updatedAt": 1790170923782,
    "year": 2014,
    "duration": 136,
    "rating": 7.7,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel"
  },
  {
    "id": 143,
    "slug": "guardians-of-the-galaxy-vol-3",
    "type": "film",
    "title": {
      "uz": "Galaktika qo‘riqchilari 3",
      "ru": "Стражи Галактики. Часть 3"
    },
    "genres": [
      "action",
      "comedy",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Pratt",
      "Bradley Cooper",
      "Zoe Saldaña",
      "Chukwudi Iwuji"
    ],
    "desc": {
      "uz": "Raketa hayoti xavf ostida qoladi. Qo‘riqchilar uni qutqarish va uning qayg‘uli o‘tmishi siriga yetish uchun so‘nggi xavfli safarga otlanadi.",
      "ru": "Жизнь Ракеты под угрозой. Стражи отправляются в последнее опасное путешествие, чтобы спасти его и раскрыть тайну его прошлого."
    },
    "tags": [
      "Marvel",
      "guardians of the galaxy vol 3"
    ],
    "colors": [
      "#1a5a6b",
      "#04121a"
    ],
    "poster": "images/marvel/guardians-of-the-galaxy-vol-3.jpg",
    "trailer": "https://www.youtube.com/watch?v=AsypwbMvSW8",
    "video": "https://faylmovi.ru/tarjima_kinolar/gallaktika_qoriqchilari_3_720.mp4",
    "featured": false,
    "addedAt": 1790170791824,
    "updatedAt": 1790170791824,
    "year": 2023,
    "duration": 150,
    "rating": 7.9,
    "director": "James Gunn",
    "franchise": "marvel"
  },
  {
    "id": 131,
    "slug": "guardians-of-the-galaxy-vol-2",
    "type": "film",
    "title": {
      "uz": "Galaktika qo‘riqchilari 2",
      "ru": "Стражи Галактики. Часть 2"
    },
    "genres": [
      "action",
      "comedy",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Pratt",
      "Zoe Saldaña",
      "Dave Bautista",
      "Kurt Russell"
    ],
    "desc": {
      "uz": "Qo‘riqchilar koinot bo‘ylab sarguzashtda davom etadi. Piter Kvill nihoyat otasi bilan uchrashadi, ammo bu uchrashuv katta sirlarni ochadi.",
      "ru": "Стражи продолжают странствовать по космосу. Питер Квилл наконец встречает своего отца, но эта встреча раскрывает опасные тайны."
    },
    "tags": [
      "Marvel",
      "guardians of the galaxy vol 2"
    ],
    "colors": [
      "#6a2a7a",
      "#12061a"
    ],
    "poster": "images/marvel/guardians-of-the-galaxy-vol-2.jpg",
    "trailer": "https://www.youtube.com/watch?v=ItV1Rrex-7k",
    "video": "http://83.69.136.9/2/tarjima-film/GALLAKTIKA_QO'RIQCHILARI_2_720.mp4",
    "featured": false,
    "addedAt": 1790170752160,
    "updatedAt": 1790170752160,
    "year": 2017,
    "duration": 136,
    "rating": 7.6,
    "director": "James Gunn",
    "franchise": "marvel"
  },
  {
    "id": 34,
    "slug": "guardians-of-the-galaxy",
    "type": "film",
    "title": {
      "uz": "Galaktika qo‘riqchilari",
      "ru": "Стражи Галактики"
    },
    "genres": [
      "action",
      "comedy",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Pratt",
      "Zoe Saldana",
      "Dave Bautista",
      "Bradley Cooper",
      "Vin Diesel"
    ],
    "desc": {
      "uz": "Koinot bo‘ylab sarson beshta jinoyatchi kutilmaganda galaktikani halokatdan qutqaruvchi jamoaga aylanadi.",
      "ru": "Пятеро космических изгоев неожиданно становятся командой, спасающей галактику от уничтожения."
    },
    "colors": [
      "#6b2a7a",
      "#160a1a"
    ],
    "poster": "images/guardians-of-the-galaxy.jpg",
    "trailer": "https://www.youtube.com/watch?v=p7VRUK7ctmU",
    "video": "http://topfilm.info/2/tarjima_kinolar/Gallaktika_qo'riqchilari_720.mp4",
    "featured": false,
    "addedAt": 1790170685398,
    "updatedAt": 1790170685398,
    "year": 2014,
    "duration": 121,
    "rating": 8,
    "director": "James Gunn",
    "franchise": "marvel"
  },
  {
    "id": 39,
    "slug": "avengers-infinity-war",
    "type": "film",
    "title": {
      "uz": "Qasoskorlar: Cheksizlik urushi",
      "ru": "Мстители: Война бесконечности"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Chris Hemsworth",
      "Josh Brolin",
      "Chris Evans",
      "Scarlett Johansson"
    ],
    "desc": {
      "uz": "Tanos oltita Cheksizlik toshini yig‘ib, koinot aholisining yarmini yo‘q qilmoqchi. Qasoskorlar uni to‘xtatishga urinadi.",
      "ru": "Танос собирает шесть Камней Бесконечности, чтобы уничтожить половину Вселенной. Мстители пытаются его остановить."
    },
    "colors": [
      "#6b2a4a",
      "#160810"
    ],
    "poster": "images/avengers-infinity-war.jpg",
    "trailer": "https://www.youtube.com/watch?v=FeJKZMFJ7NA",
    "video": "https://kinolar.tv/75bdf9e4-e916-4088-9f80-d2df64f7fc4d",
    "featured": false,
    "addedAt": 1790170603056,
    "updatedAt": 1790170603056,
    "year": 2018,
    "duration": 149,
    "rating": 8.4,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel"
  },
  {
    "id": 33,
    "slug": "the-avengers",
    "type": "film",
    "title": {
      "uz": "Qasoskorlar",
      "ru": "Мстители"
    },
    "genres": [
      "action",
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
      "Chris Hemsworth"
    ],
    "desc": {
      "uz": "Loki Yerga bostirib kirganda, Nik Fyuri sayyorani qutqarish uchun dunyodagi eng kuchli qahramonlarni bir jamoaga to‘playdi.",
      "ru": "Когда Локи вторгается на Землю, Ник Фьюри собирает величайших героев планеты в одну команду."
    },
    "colors": [
      "#1e3a6b",
      "#070e1c"
    ],
    "poster": "images/the-avengers.jpg",
    "trailer": "https://www.youtube.com/watch?v=5iw-hJ6xteE",
    "video": "https://kinolar.tv/07e12638-85b0-4ea8-aff0-b412402b0d04",
    "featured": false,
    "addedAt": 1790170530090,
    "updatedAt": 1790170530090,
    "year": 2012,
    "duration": 143,
    "rating": 8,
    "director": "Joss Whedon",
    "franchise": "marvel"
  },
  {
    "id": 15,
    "slug": "the-shawshank-redemption",
    "type": "film",
    "title": {
      "uz": "Sho‘shenkdan qochish",
      "ru": "Побег из Шоушенка"
    },
    "genres": [
      "drama",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton"
    ],
    "desc": {
      "uz": "Qilmagan jinoyati uchun umrbod qamoqqa hukm qilingan bankir yillar davomida umidini yo‘qotmaydi.",
      "ru": "Банкир, осуждённый пожизненно за преступление, которого не совершал, годами не теряет надежды."
    },
    "colors": [
      "#4a4028",
      "#12100a"
    ],
    "poster": "images/the-shawshank-redemption.jpg",
    "trailer": "https://www.youtube.com/watch?v=kgAeKpAPOYk",
    "video": "https://v.mover.uz/uvPAUMi_m.mp4",
    "featured": false,
    "addedAt": 1790169937219,
    "updatedAt": 1790169937219,
    "year": 1994,
    "duration": 142,
    "rating": 9.3,
    "director": "Frank Darabont"
  },
  {
    "id": 2926,
    "slug": "john-wick-chapter-4",
    "type": "film",
    "title": {
      "uz": "Jon Uik 4",
      "ru": "Джон Уик 4"
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
      "Keanu Reeves",
      "Laurence Fishburne",
      "Ian McShane",
      "Lance Reddick"
    ],
    "desc": {
      "uz": "«Jon Uik 4» — 2023-yilgi AQSh filmi. Rejissyor: Chad Stahelski. Rollarda: Keanu Reeves, Laurence Fishburne, Ian McShane. Saytda rasmiy treyleri bor.",
      "ru": "«Джон Уик 4» — американский художественный фильм в жанре неонуарного остросюжетного боевика, поставленный режиссёром Чадом Стахелски по сценарию Шэя Хаттена и Майкла Финча как продолжение фильма «Джон Уик 3» из серии о бывшем наёмном убийце в исполнении Киану Ривза наряду с Донни Йеном, Биллом Скарсгардом, Риной…"
    },
    "tags": [
      "John Wick: Chapter 4"
    ],
    "colors": [
      "hsl(187 45% 28%)",
      "hsl(207 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/d/d0/John_Wick_-_Chapter_4_promotional_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=04dwrLbAaTE",
    "video": "https://faylmovi.ru/tarjima_kinolar/Jon_Uik_4_1080.mp4",
    "featured": false,
    "addedAt": 1790169637085,
    "updatedAt": 1790169637085,
    "year": 2023,
    "duration": 169,
    "director": "Chad Stahelski"
  },
  {
    "id": 1052951815,
    "slug": "john-wick-chapter-3-parabellum",
    "type": "film",
    "title": {
      "uz": "John Wick 3: Parabellum",
      "ru": "Джон Уик 3"
    },
    "genres": [
      "action",
      "thriller",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Keanu Reeves",
      "Halle Berry",
      "Ian McShane"
    ],
    "desc": {
      "uz": "«John Wick 3: Parabellum» — 2019-yilgi AQSh filmi. Rejissyor: Chad Stahelski. Rollarda: Keanu Reeves, Halle Berry, Ian McShane.",
      "ru": "«Джон Уик 3» — фильм 2019 года (США). Режиссёр: Chad Stahelski. В ролях: Keanu Reeves, Halle Berry, Ian McShane."
    },
    "colors": [
      "hsl(301 45% 28%)",
      "hsl(321 50% 7%)"
    ],
    "trailer": "https://www.youtube.com/watch?v=rx-gQVUeSR8",
    "video": "http://topfilm.info/2/tarjima_kinolar/JON_UIK_3_720.mp4",
    "tags": [
      "John Wick: Chapter 3 – Parabellum"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/9/94/John_Wick_Chapter_3_Parabellum.png",
    "wiki": "Джон Уик 3",
    "featured": false,
    "addedAt": 1790169578079,
    "updatedAt": 1790169578079,
    "year": 2019,
    "duration": 131,
    "director": "Chad Stahelski"
  },
  {
    "id": 2665,
    "slug": "john-wick-chapter-2",
    "type": "film",
    "title": {
      "uz": "John Wick 2",
      "ru": "Джон Уик 2"
    },
    "genres": [
      "action",
      "thriller",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Keanu Reeves",
      "Common",
      "Laurence Fishburne",
      "Riccardo Scamarcio"
    ],
    "desc": {
      "uz": "«John Wick 2» — 2017-yilgi AQSh filmi. Rejissyor: Chad Stahelski. Rollarda: Keanu Reeves, Common, Laurence Fishburne. Saytda rasmiy treyleri bor.",
      "ru": "«Джон Уик 2» — американский неонуарный остросюжетный боевик режиссёра Чада Стахелски по сценарию Дерека Колстада, с Киану Ривзом в главной роли наряду с Common, Лоренсом Фишберном, Риккардо Скамарчо, Руби Роуз, Лэнсом Реддиком, Петером Стормаре, Бриджит Мойнахан, Франко Неро, Джоном Легуизамо и Иэном Макшейном."
    },
    "tags": [
      "John Wick: Chapter 2"
    ],
    "colors": [
      "hsl(185 45% 28%)",
      "hsl(205 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/3/31/John_Wick_Chapter_Two.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=0DkJa_aGTP8",
    "video": "https://kinolar.tv/60244cde-30f0-4d59-8503-234360844466",
    "featured": false,
    "addedAt": 1790167379581,
    "updatedAt": 1790167379581,
    "year": 2017,
    "duration": 122,
    "director": "Chad Stahelski"
  },
  {
    "id": 14,
    "slug": "john-wick",
    "type": "film",
    "title": {
      "uz": "Jon Uik",
      "ru": "Джон Уик"
    },
    "genres": [
      "action",
      "thriller",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Keanu Reeves",
      "Michael Nyqvist",
      "Willem Dafoe"
    ],
    "desc": {
      "uz": "Nafaqaga chiqqan afsonaviy qotil banditlar uning itini o‘ldirgach, qonli o‘ch olish yo‘liga qaytadi.",
      "ru": "Легендарный киллер возвращается к делам ради кровавой мести."
    },
    "colors": [
      "#5a1e2e",
      "#150609"
    ],
    "poster": "images/john-wick.jpg",
    "trailer": "https://www.youtube.com/watch?v=gLGaBb_EFkg",
    "video": "https://kinolar.tv/f4e436ca-37a4-4026-8e49-38403fc38826",
    "featured": false,
    "addedAt": 1790166840673,
    "updatedAt": 1790167317312,
    "year": 2014,
    "duration": 101,
    "rating": 7.4,
    "director": "Chad Stahelski"
  },
  {
    "id": 2664,
    "slug": "avatar-fire-and-ash",
    "type": "film",
    "title": {
      "uz": "Avatar 3",
      "ru": "Аватар: Пламя и пепел"
    },
    "genres": [
      "action",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Zoe Saldaña",
      "Stephen Lang",
      "Sigourney Weaver"
    ],
    "desc": {
      "uz": "«Avatar 3» — 2025-yilgi AQSh filmi. Rollarda: Zoe Saldaña, Stephen Lang, Sigourney Weaver. Saytda rasmiy treyleri bor.",
      "ru": "«Аватар: Пламя и пепел» — американский эпический научно-фантастический фильм режиссёра, продюсера, сценариста и монтажёра Джеймса Кэмерона."
    },
    "tags": [
      "Avatar: Fire and Ash"
    ],
    "colors": [
      "hsl(269 45% 28%)",
      "hsl(289 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/9/95/Avatar_Fire_and_Ash_poster.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=Txj8rCvAyrI",
    "video": "https://video.uzbek-tilida.net/films/avatar-3-2025-720p.mp4",
    "featured": false,
    "addedAt": 1790166649957,
    "updatedAt": 1790166649957,
    "year": 2025,
    "duration": 197
  },
  {
    "id": 2200,
    "slug": "avatar-the-way-of-water",
    "type": "film",
    "title": {
      "uz": "Avatar: Suv yo'li",
      "ru": "Аватар: Путь воды"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Joel David Moore"
    ],
    "desc": {
      "uz": "«Avatar: Suv yo'li» — 2022-yilgi AQSh filmi. Rollarda: Zoe Saldaña, Sigourney Weaver, Joel David Moore. Saytda rasmiy treyleri bor.",
      "ru": "«Аватар: Путь воды» — американский эпический научно-фантастический фильм режиссёра и сценариста Джеймса Кэмерона, созданный студиями Lightstorm Entertainment и выпущенный студией 20th Century Studios."
    },
    "tags": [
      "Avatar: The Way of Water"
    ],
    "colors": [
      "hsl(311 45% 28%)",
      "hsl(331 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=o6o2I6Innf0",
    "video": "https://kinolar.tv/6eabf0c3-7f18-4df5-af8f-40f46af1fff3",
    "featured": false,
    "addedAt": 1790166355514,
    "updatedAt": 1790166355514,
    "year": 2022,
    "duration": 192
  },
  {
    "id": 13,
    "slug": "avatar",
    "type": "film",
    "title": {
      "uz": "Avatar",
      "ru": "Аватар"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Sam Worthington",
      "Zoe Saldana",
      "Sigourney Weaver"
    ],
    "desc": {
      "uz": "Nogiron harbiy Pandora sayyorasida avatar tanasiga ko‘chiriladi va mahalliy xalqni himoya qilish uchun kurashadi.",
      "ru": "Парализованный морпех попадает на Пандору в теле аватара и встаёт на защиту местного народа."
    },
    "colors": [
      "#1c5c6e",
      "#06161c"
    ],
    "poster": "images/avatar.jpg",
    "trailer": "https://www.youtube.com/watch?v=uXC_0wE6k7k",
    "video": "https://d.uzbeklar.biz/film/avatar1.mp4",
    "featured": false,
    "addedAt": 1790166238215,
    "updatedAt": 1790166238215,
    "year": 2009,
    "duration": 162,
    "rating": 7.9,
    "director": "James Cameron"
  },
  {
    "id": 12,
    "slug": "titanic",
    "type": "film",
    "title": {
      "uz": "Titanik",
      "ru": "Титаник"
    },
    "genres": [
      "drama",
      "romance",
      "history"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Leonardo DiCaprio",
      "Kate Winslet",
      "Billy Zane"
    ],
    "desc": {
      "uz": "Turli tabaqadan bo‘lgan ikki yosh dunyodagi eng mashhur kemada bir-birini sevib qoladi — halokat arafasida.",
      "ru": "Двое молодых людей из разных сословий влюбляются на борту самого известного корабля — накануне катастрофы."
    },
    "colors": [
      "#1e4a6b",
      "#07141f"
    ],
    "poster": "images/titanic.png",
    "trailer": "https://www.youtube.com/watch?v=qcU-kWvRcVc",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/Titanik_1080.mp4",
    "featured": false,
    "addedAt": 1790166163230,
    "updatedAt": 1790166163230,
    "year": 1997,
    "duration": 194,
    "rating": 7.9,
    "director": "James Cameron"
  },
  {
    "id": 11,
    "slug": "gladiator",
    "type": "film",
    "title": {
      "uz": "Gladiator",
      "ru": "Гладиатор"
    },
    "genres": [
      "action",
      "drama",
      "history"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen"
    ],
    "desc": {
      "uz": "Xiyonatga uchragan Rim sarkardasi qul qilinadi va arenada gladiator sifatida o‘ch olish yo‘lini izlaydi.",
      "ru": "Преданный римский полководец становится рабом и ищет мести на арене гладиаторов."
    },
    "colors": [
      "#7a5a2e",
      "#1c1408"
    ],
    "poster": "images/gladiator.png",
    "trailer": "https://www.youtube.com/watch?v=F2Dr7Qb2Zf8",
    "video": "https://kinochilar.com/79007677-1eb7-4a44-b6de-d7dce769fc4f",
    "featured": false,
    "addedAt": 1790164520904,
    "updatedAt": 1790164520904,
    "year": 2000,
    "duration": 155,
    "rating": 8.5,
    "director": "Ridley Scott"
  },
  {
    "id": 10,
    "slug": "the-matrix",
    "type": "film",
    "title": {
      "uz": "Matritsa",
      "ru": "Матрица"
    },
    "genres": [
      "action",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss"
    ],
    "desc": {
      "uz": "Dasturchi Neo o‘zi yashab kelgan dunyo aslida mashinalar yaratgan ulkan simulyatsiya ekanini bilib qoladi.",
      "ru": "Программист Нео узнаёт, что мир вокруг него — гигантская симуляция, созданная машинами."
    },
    "colors": [
      "#1d4a30",
      "#04120a"
    ],
    "poster": "images/the-matrix.png",
    "trailer": "https://www.youtube.com/watch?v=YihPA42fdQ8",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Matritsa_1080.mp4",
    "featured": false,
    "addedAt": 1790164220499,
    "updatedAt": 1790164220499,
    "year": 1999,
    "duration": 136,
    "rating": 8.7,
    "director": "Lana & Lilly Wachowski"
  },
  {
    "id": 9,
    "slug": "forrest-gump",
    "type": "film",
    "title": {
      "uz": "Forrest Gamp",
      "ru": "Форрест Гамп"
    },
    "genres": [
      "drama",
      "comedy",
      "romance"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tom Hanks",
      "Robin Wright",
      "Gary Sinise"
    ],
    "desc": {
      "uz": "Oddiy qalbli Forrest bilmagan holda Amerika tarixining eng muhim voqealarida ishtirok etadi — va bir umr yagona sevgisini kutadi.",
      "ru": "Простодушный Форрест невольно становится участником главных событий американской истории — и всю жизнь ждёт свою любовь."
    },
    "colors": [
      "#3f6a4f",
      "#101a13"
    ],
    "poster": "images/forrest-gump.jpg",
    "trailer": "https://www.youtube.com/watch?v=otmeAaifX04",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/Forrest_Gamp_1080.mp4",
    "featured": false,
    "addedAt": 1790164146004,
    "updatedAt": 1790164146004,
    "year": 1994,
    "duration": 142,
    "rating": 8.8,
    "director": "Robert Zemeckis"
  },
  {
    "id": 8,
    "slug": "the-godfather",
    "type": "film",
    "title": {
      "uz": "Cho‘qintirgan ota",
      "ru": "Крёстный отец"
    },
    "genres": [
      "drama",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Robert Duvall"
    ],
    "desc": {
      "uz": "Qudratli mafiya klani boshlig‘i o‘z hokimiyatini kenja o‘g‘liga topshiradi. Bu qaror butun oila taqdirini o‘zgartiradi.",
      "ru": "Глава могущественного мафиозного клана передаёт власть младшему сыну — и это меняет судьбу всей семьи."
    },
    "colors": [
      "#4a3620",
      "#120c06"
    ],
    "poster": "images/the-godfather.jpg",
    "trailer": "https://www.youtube.com/watch?v=oCl5La_eUhI",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/Choqintirgan_Ota_1_1080.mp4",
    "featured": false,
    "addedAt": 1790164036499,
    "updatedAt": 1790164036499,
    "year": 1972,
    "duration": 175,
    "rating": 9.2,
    "director": "Francis Ford Coppola"
  },
  {
    "id": 6,
    "slug": "joker",
    "type": "film",
    "title": {
      "uz": "Joker",
      "ru": "Джокер"
    },
    "genres": [
      "drama",
      "thriller",
      "crime"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Joaquin Phoenix",
      "Robert De Niro",
      "Zazie Beetz"
    ],
    "desc": {
      "uz": "Jamiyat tomonidan rad etilgan yolg‘iz komediyachi Artur Flek asta-sekin shaharni larzaga soladigan shafqatsiz jinoyatchiga aylanadi.",
      "ru": "Отвергнутый обществом комик Артур Флек постепенно превращается в безжалостного преступника, потрясшего город."
    },
    "tags": [
      "Batman",
      "Betmen",
      "Бэтмен",
      "Gotham"
    ],
    "colors": [
      "#3d2a52",
      "#140d1c"
    ],
    "poster": "images/joker.jpg",
    "trailer": "https://www.youtube.com/watch?v=iC2RjcuAMx8",
    "video": "http://files.uzmedia.tv/tarjima/joker 2019 hd (uzmedia.tv).mp4",
    "featured": false,
    "addedAt": 1790163867588,
    "updatedAt": 1790163867588,
    "year": 2019,
    "duration": 122,
    "rating": 8.4,
    "director": "Todd Phillips",
    "franchise": "dc"
  },
  {
    "id": 126,
    "slug": "iron-man-3",
    "type": "film",
    "title": {
      "uz": "Temir odam 3",
      "ru": "Железный человек 3"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Gwyneth Paltrow",
      "Guy Pearce",
      "Ben Kingsley"
    ],
    "desc": {
      "uz": "Nyu-Yorkdagi jangdan keyin Toni Stark tinchlik topolmaydi. Mandarin ismli sirli terrorchi uning butun hayotini vayron qilganda, Toni zirhisiz kurashishga majbur bo‘ladi.",
      "ru": "После битвы за Нью-Йорк Тони Старк не находит покоя. Когда таинственный террорист Мандарин разрушает его жизнь, Тони приходится сражаться без брони."
    },
    "tags": [
      "Marvel",
      "iron man 3"
    ],
    "colors": [
      "#8a3a10",
      "#1a0a04"
    ],
    "poster": "images/marvel/iron-man-3.jpg",
    "trailer": "https://www.youtube.com/watch?v=-P_cWZPceKc",
    "video": "https://v.mover.uz/QqPJK22_h.mp4",
    "featured": false,
    "addedAt": 1790162713357,
    "updatedAt": 1790162713357,
    "year": 2013,
    "duration": 130,
    "rating": 7.1,
    "director": "Shane Black",
    "franchise": "marvel"
  },
  {
    "id": 123,
    "slug": "iron-man-2",
    "type": "film",
    "title": {
      "uz": "Temir odam 2",
      "ru": "Железный человек 2"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Gwyneth Paltrow",
      "Don Cheadle",
      "Scarlett Johansson",
      "Mickey Rourke"
    ],
    "desc": {
      "uz": "Toni Stark o‘zining Temir odam ekanini dunyoga ochiqladi. Endi hukumat texnologiyasini talab qilmoqda, raqiblar esa unga qarshi o‘z qurollarini tayyorlamoqda.",
      "ru": "Тони Старк раскрыл миру, что он Железный человек. Теперь правительство требует его технологии, а соперники готовят собственное оружие."
    },
    "tags": [
      "Marvel",
      "iron man 2"
    ],
    "colors": [
      "#7a1414",
      "#1a0404"
    ],
    "poster": "images/marvel/iron-man-2.jpg",
    "trailer": "https://www.youtube.com/watch?v=cHw0JLSPYmE",
    "video": "https://v.mover.uz/kveDTuTC_m.mp4",
    "featured": false,
    "addedAt": 1790162662969,
    "updatedAt": 1790162662970,
    "year": 2010,
    "duration": 124,
    "rating": 6.9,
    "director": "Jon Favreau",
    "franchise": "marvel"
  },
  {
    "id": 32,
    "slug": "iron-man",
    "type": "film",
    "title": {
      "uz": "Temir odam",
      "ru": "Железный человек"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Gwyneth Paltrow",
      "Jeff Bridges",
      "Terrence Howard"
    ],
    "desc": {
      "uz": "Qurol ishlab chiqaruvchi milliarder Toni Stark asirlikda o‘zi uchun zirh yaratadi va uydan chiqib, qahramonga aylanishga qaror qiladi.",
      "ru": "Миллиардер-оружейник Тони Старк создаёт в плену боевой костюм и решает стать героем."
    },
    "tags": [
      "Avengers",
      "Qasoskorlar",
      "Мстители",
      "Tony Stark"
    ],
    "colors": [
      "#8a2a1e",
      "#1c0a07"
    ],
    "poster": "images/iron-man.jpg",
    "trailer": "https://www.youtube.com/watch?v=i_IIxuHAClc",
    "video": "http://topfilm.info/3/tarjima_kinolar/Temir_Odam_360.mp4",
    "featured": false,
    "addedAt": 1790162448269,
    "updatedAt": 1790162448269,
    "year": 2008,
    "duration": 126,
    "rating": 7.9,
    "director": "Jon Favreau",
    "franchise": "marvel"
  },
  {
    "id": 2613,
    "slug": "transformers-age-of-extinction",
    "type": "film",
    "title": {
      "uz": "Transformerlar 4 Yo‘q bo‘lish davri",
      "ru": "Трансформеры 4 Эпоха истребления"
    },
    "genres": [
      "action",
      "comedy",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Mark Wahlberg",
      "Nicola Peltz",
      "Jack Reynor",
      "Kelsey Grammer"
    ],
    "desc": {
      "uz": "«Transformers: Age of Extinction» — 2014-yilgi AQSh filmi. Rejissyor: Michael Bay. Rollarda: Mark Wahlberg, Nicola Peltz, Jack Reynor. Saytda rasmiy treyleri bor.",
      "ru": "«Трансформеры: Эпоха истребления» — американский научно-фантастический боевик режиссёра Майкла Бэя, четвёртый фильм из серии о Трансформерах."
    },
    "colors": [
      "hsl(102 45% 28%)",
      "hsl(122 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/0/0f/Transformers_Age_of_Extinction_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=NZK13CCGzMY",
    "video": "https://dezocloud.uz/s/nE1fPQj4ATzncH-KZp-AUjwo",
    "featured": false,
    "addedAt": 1790157062563,
    "updatedAt": 1790157062563,
    "year": 2014,
    "duration": 165,
    "director": "Michael Bay"
  },
  {
    "id": 2924,
    "slug": "transformers-the-last-knight",
    "type": "film",
    "title": {
      "uz": "Transformers 5 So'ngi Ritsar",
      "ru": "Трансформеры 5: Последний Рыцарь"
    },
    "genres": [
      "action",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Mark Wahlberg",
      "Stanley Tucci",
      "Isabela Merced",
      "Josh Duhamel"
    ],
    "desc": {
      "uz": "«Transformers: The Last Knight» — 2017-yilgi AQSh filmi. Rejissyor: Michael Bay. Rollarda: Mark Wahlberg, Stanley Tucci, Isabela Merced. Saytda rasmiy treyleri bor.",
      "ru": "«Трансформеры: Последний рыцарь» — американский научно-фантастический боевик режиссёра Майкла Бэя."
    },
    "colors": [
      "hsl(61 45% 28%)",
      "hsl(81 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/2/26/Transformers_The_Last_Knight_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=6p59kWrfaX0",
    "video": "https://dezocloud.uz/s/CqIYnfhGoqvM-CHT3bHF9swX",
    "featured": false,
    "addedAt": 1790156969639,
    "updatedAt": 1790156969639,
    "year": 2017,
    "duration": 154,
    "director": "Michael Bay"
  },
  {
    "id": 2436,
    "slug": "transformers-revenge-of-the-fallen",
    "type": "film",
    "title": {
      "uz": "Transformers 2 Folening Qasosi",
      "ru": "Трансформеры: Месть падших"
    },
    "genres": [
      "action",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Shia LaBeouf",
      "Megan Fox",
      "Josh Duhamel",
      "John Turturro"
    ],
    "desc": {
      "uz": "«Transformers: Revenge of the Fallen» — 2009-yilgi AQSh filmi. Rejissyor: Michael Bay. Rollarda: Shia LaBeouf, Megan Fox, Josh Duhamel. Saytda rasmiy treyleri bor.",
      "ru": "«Трансформеры: Месть падших» — американский научно-фантастический боевик режиссёра Майкла Бэя, продолжение фильма «Трансформеры»."
    },
    "colors": [
      "hsl(352 45% 28%)",
      "hsl(12 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/cb/TF2SteelPoster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=fnXzKwUgDhg",
    "video": "https://dezocloud.uz/s/N64VGK7dLeAyBIKgvOBAeytT",
    "featured": false,
    "addedAt": 1790156928307,
    "updatedAt": 1790156928307,
    "year": 2009,
    "duration": 150,
    "director": "Michael Bay"
  },
  {
    "id": 2343,
    "slug": "transformers-dark-of-the-moon",
    "type": "film",
    "title": {
      "uz": "Transformers 3 Oyning qora tomoni",
      "ru": "Трансформеры 3: Тёмная сторона Луны"
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
      "Shia LaBeouf",
      "Josh Duhamel",
      "John Turturro"
    ],
    "desc": {
      "uz": "«Transformers: Dark of the Moon» — 2011-yilgi AQSh filmi. Rejissyor: Michael Bay. Rollarda: Shia LaBeouf, Josh Duhamel, John Turturro. Saytda rasmiy treyleri bor.",
      "ru": "«Трансформеры 3: Тёмная сторона Луны» — американский научно-фантастический боевик, снятый режиссёром Майклом Бэем и являющийся продолжением фильмов «Трансформеры» и «Трансформеры: Месть падших»."
    },
    "colors": [
      "hsl(351 45% 28%)",
      "hsl(11 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/b/bf/Transformers_dark_of_the_moon_ver5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=R7fRAbA_0Xg",
    "video": "https://dezocloud.uz/s/iuDTBB37qUVb9WD_j_1zwQEk",
    "featured": false,
    "addedAt": 1790156892050,
    "updatedAt": 1790156892050,
    "year": 2011,
    "duration": 154,
    "director": "Michael Bay"
  },
  {
    "id": 2205,
    "slug": "transformers",
    "type": "film",
    "title": {
      "uz": "Transformerlar",
      "ru": "Трансформеры"
    },
    "genres": [
      "action",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Shia LaBeouf",
      "Tyrese Gibson",
      "Josh Duhamel",
      "Anthony Anderson"
    ],
    "desc": {
      "uz": "«Transformerlar» — 2007-yilgi AQSh filmi. Rejissyor: Michael Bay. Rollarda: Shia LaBeouf, Tyrese Gibson, Josh Duhamel. Saytda rasmiy treyleri bor.",
      "ru": "«Трансформеры» — американский научно-фантастический боевик 2007 года режиссёра Майкла Бэя, снятый по мотивам серии игрушек компании Hasbro и одноимённого мультсериала."
    },
    "tags": [
      "Transformers"
    ],
    "colors": [
      "hsl(66 45% 28%)",
      "hsl(86 50% 7%)"
    ],
    "poster": "https://thumb.wikimedia.org/wikipedia/en/thumb/6/66/Transformers07.jpg/500px-Transformers07.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "trailer": "https://www.youtube.com/watch?v=p6X1eUzzFv4",
    "video": "https://dezocloud.uz/s/bUES5uhEFXyE-sJe7yTBIl19",
    "featured": false,
    "addedAt": 1790156851510,
    "updatedAt": 1790156851510,
    "year": 2007,
    "duration": 143,
    "director": "Michael Bay"
  },
  {
    "id": 2982,
    "slug": "oyning-qulashi",
    "type": "film",
    "title": {
      "uz": "Oyning qulashi",
      "ru": "Падение Луны"
    },
    "genres": [
      "action",
      "scifi",
      "thriller",
      "war",
      "family",
      "history"
    ],
    "country": {
      "uz": "Amerika Qo'shma Shtatlari",
      "ru": "Соединенные Штаты Америки"
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
    "poster": "https://abdulazizjuraev.github.io/dezomax/images/custom/oyning-qulashi-2982.jpg",
    "trailer": "https://www.youtube.com/watch?v=hNXzk74FcxM",
    "video": "https://dezocloud.uz/s/klEU7eqI_v2u-AHL0U0p1vnm",
    "featured": false,
    "addedAt": 1789967245094,
    "updatedAt": 1789967245094
  },
  {
    "id": 128,
    "slug": "avengers-age-of-ultron",
    "type": "film",
    "title": {
      "uz": "Qasoskorlar: Altron davri",
      "ru": "Мстители: Эра Альтрона"
    },
    "genres": [
      "action",
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
      "Chris Hemsworth",
      "Scarlett Johansson",
      "James Spader"
    ],
    "desc": {
      "uz": "Toni Stark tinchlikni saqlash uchun sun’iy intellekt Altronni yaratadi. Ammo Altron insoniyatni yo‘q qilishga qaror qiladi va Qasoskorlar yana birlashadi.",
      "ru": "Тони Старк создаёт искусственный интеллект Альтрона для защиты мира. Но Альтрон решает уничтожить человечество, и Мстители снова объединяются."
    },
    "tags": [
      "Marvel",
      "avengers age of ultron"
    ],
    "colors": [
      "#3a3f4a",
      "#0a0c10"
    ],
    "poster": "images/marvel/avengers-age-of-ultron.jpg",
    "trailer": "https://www.youtube.com/watch?v=FwW149BS9n4",
    "video": "https://dezocloud.uz/s/EdK5fVbN9voo-WuTIPkE2WNA",
    "featured": false,
    "addedAt": 1789967015915,
    "updatedAt": 1790157117196,
    "year": 2015,
    "duration": 141,
    "rating": 7.3,
    "director": "Joss Whedon",
    "franchise": "marvel"
  },
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
    "video": "https://dezocloud.uz/s/XWfhQ8mH6p1xR8RBe0ZaSrNJ",
    "featured": false,
    "addedAt": 1789489966997,
    "updatedAt": 1789817068533,
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
