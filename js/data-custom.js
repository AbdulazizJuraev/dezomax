/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 2065,
    "slug": "pirates-of-the-caribbean-dead-man-s-chest",
    "type": "film",
    "title": {
      "uz": "Karib dengizi qaroqchilari: Murdalar sandigʻi",
      "ru": "Пираты Карибского моря: Сундук мертвеца"
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
      "Orlando Bloom",
      "Keira Knightley",
      "Stellan Skarsgård",
      "Bill Nighy"
    ],
    "desc": {
      "uz": "«Karib dengizi qaroqchilari: Murdalar sandigʻi» — 2006-yilgi AQSh filmi. Rejissyor: Gore Verbinski. Rollarda: Orlando Bloom, Keira Knightley, Stellan Skarsgård. Saytda rasmiy treyleri bor.",
      "ru": "«Пираты Карибского моря: Сундук мертвеца» — американский фэнтезийный фильм плаща и шпаги 2006 года и вторая картина из серии фильмов «Пираты Карибского моря» после «Пираты Карибского моря: Проклятие Чёрной жемчужины» режиссёра Гора Вербински по сценарию Терри Россио и Тед Эллиот."
    },
    "tags": [
      "Pirates of the Caribbean: Dead Man's Chest"
    ],
    "colors": [
      "hsl(74 45% 28%)",
      "hsl(94 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/2/2d/Pirates_of_the_caribbean_2_poster_b.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=3sKnbnz6-KY",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/Karib_Dengizi_qaroqchilari_2_1080.mp4",
    "featured": false,
    "addedAt": 1790849958075,
    "updatedAt": 1790849958075,
    "year": 2006,
    "duration": 145,
    "director": "Gore Verbinski"
  },
  {
    "id": 2061,
    "slug": "inside-out",
    "type": "multfilm",
    "title": {
      "uz": "Boshqotirma",
      "ru": "Головоломка"
    },
    "genres": [
      "fantasy",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Boshqotirma» — 2015-yilgi AQSh multfilmi. Rejissyor: Pete Docter, Ronnie del Carmen. Saytda rasmiy treyleri bor.",
      "ru": "«Головоломка» — американский анимационный фильм о взрослении 2015 года, созданный Pixar Animation Studios и распространяемый Walt Disney Studios."
    },
    "tags": [
      "Inside Out"
    ],
    "colors": [
      "hsl(133 45% 28%)",
      "hsl(153 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=XaGjd5paQ4M",
    "video": "https://a.uzbeklar.biz/film/boshqotirma1.mp4",
    "featured": false,
    "addedAt": 1790849887220,
    "updatedAt": 1790849887220,
    "year": 2015,
    "duration": 94,
    "director": "Pete Docter, Ronnie del Carmen"
  },
  {
    "id": 2059,
    "slug": "up",
    "type": "multfilm",
    "title": {
      "uz": "Tepaga",
      "ru": "Вверх"
    },
    "genres": [
      "fantasy",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Tepaga» — 2009-yilgi AQSh multfilmi. Rejissyor: Pete Docter, Bob Peterson. Saytda rasmiy treyleri bor.",
      "ru": "«Вверх» — американский анимационный комедийно-драматический приключенческий фильм 2009 года, созданный студией Pixar Animation Studios для Walt Disney Pictures."
    },
    "tags": [
      "Up"
    ],
    "colors": [
      "hsl(139 45% 28%)",
      "hsl(159 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=NYwpa1nxH84",
    "video": "http://topfilm.info/2/tarjima_kinolar/YUKSAKLIK_SARI_720.mp4",
    "featured": false,
    "addedAt": 1790849737843,
    "updatedAt": 1790849737843,
    "year": 2009,
    "duration": 96,
    "director": "Pete Docter, Bob Peterson"
  },
  {
    "id": 2053,
    "slug": "toy-story-3",
    "type": "multfilm",
    "title": {
      "uz": "Oʻyinchoqlar tarixi 3",
      "ru": "История игрушек: Большой побег"
    },
    "genres": [
      "drama",
      "comedy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Oʻyinchoqlar tarixi 3» — 2010-yilgi AQSh multfilmi. Rejissyor: Lee Unkrich. Saytda rasmiy treyleri bor.",
      "ru": "«История игрушек: Большой побег» — американский полнометражный компьютерно-анимационный комедийно-драматический фильм 2010 года, созданный студией Pixar Animation Studios и выпущенный компанией Walt Disney Pictures."
    },
    "tags": [
      "Toy Story 3"
    ],
    "colors": [
      "hsl(28 45% 28%)",
      "hsl(48 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=2BlMNH1QTeE",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Oyinchoqlar_tarixi_3_1080.mp4",
    "featured": false,
    "addedAt": 1790841858775,
    "updatedAt": 1790841858775,
    "year": 2010,
    "duration": 103,
    "director": "Lee Unkrich"
  },
  {
    "id": 2052,
    "slug": "kung-fu-panda",
    "type": "multfilm",
    "title": {
      "uz": "Kung Fu Panda",
      "ru": "Кунг-фу панда"
    },
    "genres": [
      "action",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Kung Fu Panda» — 2008-yilgi AQSh multfilmi. Rejissyor: John Stevenson, Mark Osborne. Saytda rasmiy treyleri bor.",
      "ru": "«Кунг-фу панда» — американский компьютерно-анимационный комедийный фильм о боевых искусствах, созданный студией DreamWorks Animation и распространяемый студией Paramount Pictures."
    },
    "colors": [
      "hsl(230 45% 28%)",
      "hsl(250 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/7/76/Kungfupanda.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=XEZKXIQjYFQ",
    "video": "https://s6.faylmovi.ru/tarjima_multfilmlar/Kunfu_Panda_1080.mp4",
    "featured": false,
    "addedAt": 1790841791699,
    "updatedAt": 1790841791699,
    "year": 2008,
    "duration": 92,
    "director": "John Stevenson, Mark Osborne"
  },
  {
    "id": 2042,
    "slug": "ratatouille",
    "type": "multfilm",
    "title": {
      "uz": "Ratatuy",
      "ru": "Рататуй"
    },
    "genres": [
      "drama",
      "comedy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Ratatuy» — 2007-yilgi AQSh multfilmi. Rejissyor: Brad Bird, Jan Pinkava. Saytda rasmiy treyleri bor.",
      "ru": "«Рататуй» — американский анимационный комедийно-драматический фильм 2007 года, созданный студией Pixar Animation Studios для Walt Disney Pictures."
    },
    "tags": [
      "Ratatouille"
    ],
    "colors": [
      "hsl(34 45% 28%)",
      "hsl(54 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=mqV_C5eqUus",
    "video": "http://topfilm.info/2/MULTIFILM/Ratatuy_720.mp4",
    "featured": false,
    "addedAt": 1790841465150,
    "updatedAt": 1790841465150,
    "year": 2007,
    "duration": 111,
    "director": "Brad Bird, Jan Pinkava"
  },
  {
    "id": 2049,
    "slug": "monsters-inc",
    "type": "multfilm",
    "title": {
      "uz": "Maxluqlar jamiyati",
      "ru": "Корпорация монстров"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Maxluqlar jamiyati» — 2001-yilgi AQSh multfilmi. Rejissyor: Pete Docter, Lee Unkrich. Saytda rasmiy treyleri bor.",
      "ru": "«Корпорация монстров» (англ. Monsters, Inc."
    },
    "tags": [
      "Monsters",
      "Inc."
    ],
    "colors": [
      "hsl(34 45% 28%)",
      "hsl(54 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=EGIzZ0JzMzg",
    "video": "http://topfilm.info/3/MULTIFILM/Maxluqlar_uyushmasii_720.mp4",
    "featured": false,
    "addedAt": 1790841388211,
    "updatedAt": 1790841388211,
    "year": 2001,
    "duration": 92,
    "director": "Pete Docter, Lee Unkrich"
  },
  {
    "id": 2018,
    "slug": "beauty-and-the-beast",
    "type": "multfilm",
    "title": {
      "uz": "Sohibjamol va maxluq",
      "ru": "Красавица и Чудовище"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Sohibjamol va maxluq» — 1991-yilgi AQSh multfilmi. Rejissyor: Gary Trousdale, Kirk Wise. Saytda rasmiy treyleri bor.",
      "ru": "«Красавица и Чудовище» — американский анимационный фильм в жанре музыкального романтического фэнтези 1991 года, снятый студией Walt Disney Feature Animation и выпущенный студией Walt Disney Pictures."
    },
    "tags": [
      "Beauty and the Beast"
    ],
    "colors": [
      "hsl(260 45% 28%)",
      "hsl(280 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/5/5e/Beauty_and_the_Beast_%281991_film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=_t-ff-GUGwU",
    "video": "http://topfilm.info/2/MULTIFILM/Sohibjamol_va_maxluq_1_720.mp4",
    "featured": false,
    "addedAt": 1790841271759,
    "updatedAt": 1790841271759,
    "year": 1991,
    "duration": 84,
    "director": "Gary Trousdale, Kirk Wise"
  },
  {
    "id": 16,
    "slug": "spirited-away",
    "type": "multfilm",
    "title": {
      "uz": "Ruhlar olami",
      "ru": "Унесённые призраками"
    },
    "genres": [
      "fantasy",
      "animation",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "Yaponiya",
      "ru": "Япония"
    },
    "cast": [
      "Rumi Hiiragi",
      "Miyu Irino",
      "Mari Natsuki"
    ],
    "desc": {
      "uz": "Qizaloq Chixiro sehrli ruhlar olamiga tushib qoladi va ota-onasini qutqarish uchun kurashadi.",
      "ru": "Девочка Тихиро попадает в волшебный мир духов и борется за спасение родителей."
    },
    "colors": [
      "#2f6a6a",
      "#0b1c1c"
    ],
    "poster": "images/spirited-away.png",
    "trailer": "https://www.youtube.com/watch?v=bgxiTkAlQrw",
    "video": "https://iv.okcdn.ru/i?r=BDFSTM1h2o92P_v-s8DgGlgYie117TfYy5Gq0chBlNXq8qY_4CIrgWuPLQmWM8jm8P0&fn=external_8",
    "featured": false,
    "addedAt": 1790665790283,
    "updatedAt": 1790665790283,
    "year": 2001,
    "duration": 125,
    "rating": 8.6,
    "director": "Hayao Miyazaki",
    "tags": [
      "Spirited Away"
    ]
  },
  {
    "id": 1124457266,
    "slug": "moana-2",
    "type": "multfilm",
    "title": {
      "uz": "Moana 2",
      "ru": "Моана 2"
    },
    "genres": [
      "fantasy",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Moana 2» — 2024-yilgi AQSh multfilmi. Rejissyor: David Derrick Jr..",
      "ru": "«Моана 2» — мультфильм 2024 года (США). Режиссёр: David Derrick Jr.."
    },
    "colors": [
      "hsl(228 45% 28%)",
      "hsl(248 50% 7%)"
    ],
    "trailer": "https://www.youtube.com/watch?v=oYY0z4qFin0",
    "video": "http://s10.faylmovi.ru/tarjima_multfilmlar/Moana_2_480.mp4",
    "tags": [
      "Moana 2"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg",
    "wiki": "Моана 2",
    "featured": false,
    "addedAt": 1790344701184,
    "updatedAt": 1790344701184,
    "year": 2024,
    "duration": 100,
    "director": "David Derrick Jr."
  },
  {
    "id": 2046,
    "slug": "moana",
    "type": "multfilm",
    "title": {
      "uz": "Moana",
      "ru": "Моана"
    },
    "genres": [
      "action",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Moana» — 2016-yilgi AQSh multfilmi. Rejissyor: John Musker, Ron Clements. Saytda rasmiy treyleri bor.",
      "ru": "«Моана» — американский компьютерно-анимационный музыкальный фэнтезийно-приключенческий фильм 2016 года, снятый студией Walt Disney Animation Studios и выпущенный студией Walt Disney Pictures."
    },
    "colors": [
      "hsl(314 45% 28%)",
      "hsl(334 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/2/26/Moana_Teaser_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=6HZr-6GKbJI",
    "video": "http://topfilm.info/2/MULTIFILM/Moana_720.mp4",
    "featured": false,
    "addedAt": 1790343700031,
    "updatedAt": 1790343700031,
    "year": 2016,
    "duration": 107,
    "director": "John Musker, Ron Clements",
    "tags": [
      "Moana 1"
    ]
  },
  {
    "id": 2045,
    "slug": "toy-story-2",
    "type": "multfilm",
    "title": {
      "uz": "Oʻyinchoqlar tarixi 2",
      "ru": "История игрушек 2"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Oʻyinchoqlar tarixi 2» — 1999-yilgi AQSh multfilmi. Rejissyor: John Lasseter, Lee Unkrich. Saytda rasmiy treyleri bor.",
      "ru": "«История игрушек 2» — американский полнометражный компьютерно-анимационный комедийный фильм 1999 года, созданный студией Pixar Animation Studios и выпущенный компанией Walt Disney Pictures."
    },
    "tags": [
      "Toy Story 2",
      "O‘yinchoqlar hikoyasi 2"
    ],
    "colors": [
      "hsl(27 45% 28%)",
      "hsl(47 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=bktNr4q2IcE",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Oyinchoqlar_olami_2_1080.mp4",
    "featured": false,
    "addedAt": 1790343545480,
    "updatedAt": 1790343545480,
    "year": 1999,
    "duration": 92,
    "director": "John Lasseter, Lee Unkrich"
  },
  {
    "id": 2026,
    "slug": "zootopia",
    "type": "multfilm",
    "title": {
      "uz": "Hayvonlar shahri",
      "ru": "Зверополис"
    },
    "genres": [
      "action",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Hayvonlar shahri» — 2016-yilgi AQSh multfilmi. Rejissyor: Byron Howard, Rich Moore. Saytda rasmiy treyleri bor.",
      "ru": "«Зверополис» — американский компьютерно-анимационный комедийно-приключенческий фильм о друзьях-полицейских в формате 3D производства Walt Disney Animation Studios, выпущенный Walt Disney Pictures."
    },
    "tags": [
      "Zootopia",
      "Zootropolis",
      "Hayvonlar shahri 1"
    ],
    "colors": [
      "hsl(275 45% 28%)",
      "hsl(295 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/9/96/Zootopia_%28movie_poster%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=N6zm52tRF0c",
    "video": "https://kinolar.tv/a9a53499-12d3-4c57-bb6f-7b695fad9c1f",
    "featured": false,
    "addedAt": 1790343203722,
    "updatedAt": 1790343203722,
    "year": 2016,
    "duration": 108,
    "director": "Byron Howard, Rich Moore"
  },
  {
    "id": 2008,
    "slug": "frozen",
    "type": "multfilm",
    "title": {
      "uz": "Muzyurak",
      "ru": "Холодное сердце"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Muzyurak» — 2013-yilgi AQSh multfilmi. Rejissyor: Chris Buck, Jennifer Lee. Saytda rasmiy treyleri bor.",
      "ru": "«Холодное сердце» — американский компьютерно-анимационный музыкальный фэнтези фильм 2013 года, пятьдесят третий полнометражный мультфильм, созданный студией «Walt Disney Animation Studios» и выпущенный компанией «Walt Disney Pictures»."
    },
    "tags": [
      "Frozen",
      "Muz yurak",
      "Sovuq yurak",
      "Muzyurak 1"
    ],
    "colors": [
      "hsl(120 45% 28%)",
      "hsl(140 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=UvsA9tv3mIY",
    "video": "https://topfilm.info/6/tarjima_kinolar/MUZYURAK_1_1080.mp4",
    "featured": false,
    "addedAt": 1790342701845,
    "updatedAt": 1790342701845,
    "year": 2013,
    "duration": 101,
    "director": "Chris Buck, Jennifer Lee"
  },
  {
    "id": 2004,
    "slug": "snow-white-and-the-seven-dwarfs",
    "type": "multfilm",
    "title": {
      "uz": "Oppogʻoy va yetti mitti odam",
      "ru": "Белоснежка и семь гномов"
    },
    "genres": [
      "fantasy",
      "animation",
      "romance"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Oppogʻoy va yetti mitti odam» — 1937-yilgi AQSh multfilmi. Rejissyor: David Hand, William Cottrell. Saytda rasmiy treyleri bor.",
      "ru": "«Белоснежка и семь гномов» — американский анимационный музыкальный фэнтезийный фильм 1937 года, снятый студией Walt Disney Productions и выпущенный студией RKO Radio Pictures, основанный на сказке братьев Гримм «Белоснежка»."
    },
    "tags": [
      "Snow White and the Seven Dwarfs"
    ],
    "colors": [
      "hsl(121 45% 28%)",
      "hsl(141 50% 7%)"
    ],
    "poster": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Snow_White_and_the_Seven_Dwarfs_%28Style_B%29_poster.jpg/500px-Snow_White_and_the_Seven_Dwarfs_%28Style_B%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "trailer": "https://www.youtube.com/watch?v=sqIBCspyoxQ",
    "video": "https://s11.faylmovi.ru/tarjima_kinolar/Oppogoy_va_yetti_mitti_odam_1080.mp4",
    "featured": false,
    "addedAt": 1790342637227,
    "updatedAt": 1790342637227,
    "year": 1937,
    "duration": 83,
    "director": "David Hand, William Cottrell"
  },
  {
    "id": 1027044293,
    "slug": "the-lion-king",
    "type": "multfilm",
    "title": {
      "uz": "Qirol Sher",
      "ru": "Король Лев"
    },
    "genres": [
      "comedy",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Qirol Sher» — 2019-yilgi AQSh multfilmi. Rejissyor: Jon Favreau.",
      "ru": "«Король Лев» — мультфильм 2019 года (США). Режиссёр: Jon Favreau."
    },
    "colors": [
      "hsl(260 45% 28%)",
      "hsl(280 50% 7%)"
    ],
    "trailer": "",
    "video": "https://files.uzmax.net/films/Qirol.sher.2019.HDRip.uzmax.net.mp4",
    "tags": [
      "The Lion King",
      "The Lion King 2019",
      "Qirol Sher 2019"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/9/9d/Disney_The_Lion_King_2019.jpg",
    "wiki": "Король Лев (мультфильм, 2019)",
    "featured": false,
    "addedAt": 1790342554584,
    "updatedAt": 1790342554584,
    "year": 2019,
    "duration": 118,
    "director": "Jon Favreau"
  },
  {
    "id": 2792,
    "slug": "the-lion-king-11-2",
    "type": "multfilm",
    "title": {
      "uz": "Qirol sher 3: Hakuna Matata",
      "ru": "Король Лев 3: Хакуна матата"
    },
    "genres": [
      "comedy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Qirol sher 3: Hakuna Matata» — 2004-yilgi AQSh multfilmi. Rejissyor: Bradley Raymond. Saytda rasmiy treyleri bor.",
      "ru": "«Король Лев 3: Хакуна матата» — американский анимационный музыкальный комедийный фильм 2004 года, снятый австралийским филиалом Disneytoon Studios и выпущенный на видео 10 февраля 2004 года."
    },
    "tags": [
      "The Lion King 1½",
      "The Lion King 3",
      "Qirol Sher 3"
    ],
    "colors": [
      "hsl(326 45% 28%)",
      "hsl(346 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/a/a9/Lion_king_1_half_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=p0DTnqn71WQ",
    "video": "https://files.uzbeklar.biz/film2/qirol-sher3.mp4",
    "featured": false,
    "addedAt": 1790342471504,
    "updatedAt": 1790342471504,
    "year": 2004,
    "duration": 77,
    "director": "Bradley Raymond"
  },
  {
    "id": 2003,
    "slug": "the-lion-king",
    "type": "multfilm",
    "title": {
      "uz": "Qirol Sher",
      "ru": "Король Лев"
    },
    "genres": [
      "drama",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Qirol Sher» — 1994-yilgi AQSh multfilmi. Rejissyor: Roger Allers, Rob Minkoff. Saytda rasmiy treyleri bor.",
      "ru": "«Король Лев» — американский анимационный музыкальный драматический фильм о взрослении 1994 года производства студии Walt Disney Feature Animation и выпущенный компанией Walt Disney Pictures."
    },
    "tags": [
      "The Lion King",
      "Qirol Sher 1994",
      "Qirol sher 1",
      "The Lion King 1994"
    ],
    "colors": [
      "hsl(116 45% 28%)",
      "hsl(136 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=w5xsFvmAxrs",
    "video": "https://d.uzbeklar.biz/film/qirolsher1.mp4",
    "featured": false,
    "addedAt": 1790342345216,
    "updatedAt": 1790342345216,
    "year": 1994,
    "duration": 88,
    "director": "Roger Allers, Rob Minkoff"
  },
  {
    "id": 2724,
    "slug": "penguins-of-madagascar",
    "type": "multfilm",
    "title": {
      "uz": "Madagaskar pingvinlari",
      "ru": "Пингвины из Мадагаскара"
    },
    "genres": [
      "action",
      "comedy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Madagaskar pingvinlari» — 2014-yilgi AQSh multfilmi. Rejissyor: Eric Darnell, Simon J. Smith. Saytda rasmiy treyleri bor.",
      "ru": "«Пингвины Мадагаскара» — американский компьютерно-анимационный фильм студии DreamWorks Animation, спин-офф серии мультфильмов «Мадагаскар»."
    },
    "tags": [
      "Penguins of Madagascar",
      "Madagaskar pingvinlari multfilm"
    ],
    "colors": [
      "hsl(252 45% 28%)",
      "hsl(272 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/5/5f/Penguins_of_Madagascar_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=8FWnwP4Hrko",
    "video": "http://topfilm.info/2/tarjima_kinolar/MADAGASKAR_PINGIVINLARI_720.mp4",
    "featured": false,
    "addedAt": 1790342166957,
    "updatedAt": 1790342166957,
    "year": 2014,
    "duration": 92,
    "director": "Eric Darnell, Simon J. Smith"
  },
  {
    "id": 2457,
    "slug": "madagascar-3-europe-s-most-wanted",
    "type": "multfilm",
    "title": {
      "uz": "Madagaskar 3: Yevropa boʻylab qidiruv",
      "ru": "Мадагаскар 3"
    },
    "genres": [
      "comedy",
      "animation",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Madagaskar 3: Yevropa boʻylab qidiruv» — 2012-yilgi AQSh multfilmi. Rejissyor: Eric Darnell, Tom McGrath. Saytda rasmiy treyleri bor.",
      "ru": "«Мадагаскар 3» — американский компьютерный анимационный фильм производства американской киностудии DreamWorks Animation, премьера которого состоялась в СНГ 7 июня 2012 года в форматах 2D, 3D и IMAX 3D."
    },
    "tags": [
      "Madagascar 3: Europe's Most Wanted",
      "Madagascar 3"
    ],
    "colors": [
      "hsl(295 45% 28%)",
      "hsl(315 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/c4/Madagascar3-Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=qlOhhNGwNl0",
    "video": "https://s6.faylmovi.ru/tarjima_multfilmlar/Madagaskar_3_1080.mp4",
    "featured": false,
    "addedAt": 1790342108004,
    "updatedAt": 1790342108004,
    "year": 2012,
    "duration": 93,
    "director": "Eric Darnell, Tom McGrath"
  },
  {
    "id": 2132,
    "slug": "madagascar-escape-2-africa",
    "type": "multfilm",
    "title": {
      "uz": "Madagaskar 2",
      "ru": "Мадагаскар 2"
    },
    "genres": [
      "comedy",
      "animation",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Madagaskar 2» — 2008-yilgi AQSh multfilmi. Rejissyor: Eric Darnell, Tom McGrath. Saytda rasmiy treyleri bor.",
      "ru": "«Мадагаскар 2» — американский мультипликационный фильм режиссёров Эрика Дарнелла и Тома Макграта, производства DreamWorks Animation и Pacific Data Images при поддержке Paramount Pictures."
    },
    "tags": [
      "Madagascar: Escape 2 Africa",
      "Madagascar 2"
    ],
    "colors": [
      "hsl(80 45% 28%)",
      "hsl(100 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/7/7f/Madagascar2poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=LEySS_8SCng",
    "video": "https://s1.kxcdn.ru/Madagaskar_2_HD_2008_Daxshat.Net.mp4",
    "featured": false,
    "addedAt": 1790342036885,
    "updatedAt": 1790342036885,
    "year": 2008,
    "duration": 89,
    "director": "Eric Darnell, Tom McGrath"
  },
  {
    "id": 2001,
    "slug": "madagascar",
    "type": "multfilm",
    "title": {
      "uz": "Madagaskar",
      "ru": "Мадагаскар"
    },
    "genres": [
      "comedy",
      "animation",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Madagaskar» — 2005-yilgi AQSh multfilmi. Rejissyor: Eric Darnell, Tom McGrath. Saytda rasmiy treyleri bor.",
      "ru": "«Мадагаскар» — американский анимационный комедийный фильм о выживании 2005 года производства DreamWorks Animation SKG и PDI/DreamWorks, распространяемый DreamWorks Pictures."
    },
    "tags": [
      "Madagascar",
      "Madagaskar 1",
      "Madagascar 1"
    ],
    "colors": [
      "hsl(316 45% 28%)",
      "hsl(336 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/3/36/Madagascar_Theatrical_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=qbWE7fOa0KM",
    "video": "http://topfilm.info/multifilm/MADAGASKAR_1_480.mp4",
    "featured": false,
    "addedAt": 1790341906982,
    "updatedAt": 1790341906982,
    "year": 2005,
    "duration": 86,
    "director": "Eric Darnell, Tom McGrath"
  },
  {
    "id": 148,
    "slug": "the-fantastic-four-first-steps",
    "type": "film",
    "title": {
      "uz": "Fantastik to‘rtlik: Ilk qadamlar",
      "ru": "Фантастическая четвёрка: Первые шаги"
    },
    "genres": [
      "action",
      "scifi",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Pedro Pascal",
      "Vanessa Kirby",
      "Joseph Quinn",
      "Ebon Moss-Bachrach"
    ],
    "desc": {
      "uz": "1960-yillar ruhidagi retro-futuristik dunyo. Fantastik to‘rtlik sayyoralarni yutib yuboruvchi Galaktus va uning xabarchisi Kumush serfingchiga qarshi turadi.",
      "ru": "Ретрофутуристичный мир в духе 1960-х. Фантастическая четвёрка противостоит пожирателю планет Галактусу и его вестнице Серебряной Сёрфер."
    },
    "tags": [
      "Marvel",
      "the fantastic four first steps",
      "The Fantastic Four: First Steps",
      "Fantastic Four",
      "Fantastik to‘rtlik"
    ],
    "colors": [
      "#1a4a8a",
      "#04101e"
    ],
    "poster": "images/marvel/the-fantastic-four-first-steps.jpg",
    "trailer": "https://www.youtube.com/watch?v=-ZjL-r6dW8c",
    "video": "https://kinolar.tv/78b9dffa-c3e0-4f40-bd60-bdc34b7b7706",
    "featured": false,
    "addedAt": 1790341795822,
    "updatedAt": 1790341795822,
    "year": 2025,
    "duration": 115,
    "director": "Matt Shakman",
    "franchise": "marvel"
  },
  {
    "id": 144,
    "slug": "the-marvels",
    "type": "film",
    "title": {
      "uz": "Marvellar",
      "ru": "Марвелы"
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
      "Brie Larson",
      "Teyonah Parris",
      "Iman Vellani",
      "Samuel L. Jackson"
    ],
    "desc": {
      "uz": "Kerol Denvers, Monika Rambo va Kamala Xon kuchlari chalkashib, har safar joy almashib qoladi. Ular koinotni qutqarish uchun jamoa bo‘lib ishlashni o‘rganadi.",
      "ru": "Силы Кэрол Дэнверс, Моники Рамбо и Камалы Хан переплетаются, и героини меняются местами. Чтобы спасти вселенную, им придётся стать командой."
    },
    "tags": [
      "Marvel",
      "the marvels"
    ],
    "colors": [
      "#2a3a8a",
      "#8a2a3a"
    ],
    "poster": "images/marvel/the-marvels.jpg",
    "trailer": "https://www.youtube.com/watch?v=-JW8LzqUymc",
    "video": "https://faylmovi.ru/tarjima_kinolar/kapitan_marvel_2_720.mp4",
    "featured": false,
    "addedAt": 1790341730788,
    "updatedAt": 1790341730788,
    "year": 2023,
    "duration": 105,
    "rating": 5.5,
    "director": "Nia DaCosta",
    "franchise": "marvel"
  },
  {
    "id": 138,
    "slug": "eternals",
    "type": "film",
    "title": {
      "uz": "Abadiylar",
      "ru": "Вечные"
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
      "Gemma Chan",
      "Richard Madden",
      "Angelina Jolie",
      "Salma Hayek"
    ],
    "desc": {
      "uz": "Minglab yillar davomida odamlar orasida yashirin yashagan o‘lmas mavjudotlar — Abadiylar — insoniyatning qadimiy dushmanlariga qarshi yana birlashadi.",
      "ru": "Бессмертные существа, тысячи лет тайно жившие среди людей, снова объединяются против древних врагов человечества."
    },
    "tags": [
      "Marvel",
      "eternals"
    ],
    "colors": [
      "#8a6a24",
      "#140f06"
    ],
    "poster": "images/marvel/eternals.jpg",
    "trailer": "https://www.youtube.com/watch?v=NocQ13xC7gE",
    "video": "https://topfilm.info/3/tarjima_kinolar/Abadiylar_360.mp4",
    "featured": false,
    "addedAt": 1790341648207,
    "updatedAt": 1790341648207,
    "year": 2021,
    "duration": 156,
    "rating": 6.3,
    "director": "Chloé Zhao",
    "franchise": "marvel"
  },
  {
    "id": 137,
    "slug": "shang-chi",
    "type": "film",
    "title": {
      "uz": "Shan-Chi va o‘n uzuk afsonasi",
      "ru": "Шан-Чи и легенда десяти колец"
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
      "Simu Liu",
      "Awkwafina",
      "Tony Leung",
      "Michelle Yeoh"
    ],
    "desc": {
      "uz": "Oddiy hayot kechirayotgan Shan-Chi otasi boshqaradigan «O‘n uzuk» tashkilotiga qaytishga majbur bo‘ladi va o‘z o‘tmishiga yuzma-yuz keladi.",
      "ru": "Живущий обычной жизнью Шан-Чи вынужден вернуться в организацию «Десять колец», которой управляет его отец, и встретиться со своим прошлым."
    },
    "tags": [
      "Marvel",
      "shang chi",
      "Shang-Chi and the Legend of the Ten Rings",
      "Shang-Chi"
    ],
    "colors": [
      "#8a5a14",
      "#1a1004"
    ],
    "poster": "images/marvel/shang-chi.jpg",
    "trailer": "https://www.youtube.com/watch?v=7IQUxblP30g",
    "video": "http://topfilm.info/3/tarjima_kinolar/SAN_CHI_VA_O'N_HALQA_AFSONASI_720.mp4",
    "featured": false,
    "addedAt": 1790341580147,
    "updatedAt": 1790341580147,
    "year": 2021,
    "duration": 132,
    "rating": 7.4,
    "director": "Destin Daniel Cretton",
    "franchise": "marvel"
  },
  {
    "id": 134,
    "slug": "captain-marvel",
    "type": "film",
    "title": {
      "uz": "Kapitan Marvel",
      "ru": "Капитан Марвел"
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
      "Brie Larson",
      "Samuel L. Jackson",
      "Jude Law",
      "Ben Mendelsohn"
    ],
    "desc": {
      "uz": "1990-yillar. Kosmik jangchi Kerol Denvers Yerga tushib qoladi va o‘tmishi haqidagi haqiqatni izlaydi. Yosh Nik Fyuri bilan birga u galaktik urushga aralashadi.",
      "ru": "1990-е. Космическая воительница Кэрол Дэнверс попадает на Землю и ищет правду о своём прошлом. Вместе с молодым Ником Фьюри она вмешивается в галактическую войну."
    },
    "tags": [
      "Marvel",
      "captain marvel"
    ],
    "colors": [
      "#1d3a6b",
      "#6b1a2a"
    ],
    "poster": "images/marvel/captain-marvel.jpg",
    "trailer": "https://www.youtube.com/watch?v=2eaZUwBWJLM",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/Kapitan_Marvel_1080.mp4",
    "featured": false,
    "addedAt": 1790341518151,
    "updatedAt": 1790341518151,
    "year": 2019,
    "duration": 123,
    "rating": 6.8,
    "director": "Anna Boden, Ryan Fleck",
    "franchise": "marvel"
  },
  {
    "id": 2036,
    "slug": "tangled",
    "type": "multfilm",
    "title": {
      "uz": "Rapunsel",
      "ru": "Рапунцель: Запутанная история"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [],
    "desc": {
      "uz": "«Rapunsel» — 2010-yilgi AQSh multfilmi. Rejissyor: Byron Howard, Nathan Greno. Saytda rasmiy treyleri bor.",
      "ru": "«Рапунцель: Запутанная история» — американский компьютерно-анимационный музыкальный фэнтезийный комедийно-приключенческий фильм 2010 года в формате 3D, снятый студией Walt Disney Animation Studios и выпущенный студией Walt Disney Pictures и основанный на сказке братьев Гримм «Рапунцель»."
    },
    "tags": [
      "Tangled",
      "Rapuntsel"
    ],
    "colors": [
      "hsl(261 45% 28%)",
      "hsl(281 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/a/a8/Tangled_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=J60jgkOHt5w",
    "video": "http://topfilm.info/3/MULTIFILM/RAPUNSEL_720.mp4",
    "featured": false,
    "addedAt": 1790256616751,
    "updatedAt": 1790256616751,
    "year": 2010,
    "duration": 100,
    "director": "Byron Howard, Nathan Greno"
  },
  {
    "id": 140,
    "slug": "thor-love-and-thunder",
    "type": "film",
    "title": {
      "uz": "Tor: Muhabbat va momaqaldiroq",
      "ru": "Тор: Любовь и гром"
    },
    "genres": [
      "action",
      "comedy",
      "fantasy"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Hemsworth",
      "Natalie Portman",
      "Christian Bale",
      "Tessa Thompson"
    ],
    "desc": {
      "uz": "Tor o‘zini izlab yurgan paytda xudolarni o‘ldiruvchi Gorr paydo bo‘ladi. Unga qarshi kurashda Tor kutilmaganda qudratli Jeyn Foster bilan uchrashadi.",
      "ru": "Пока Тор ищет себя, появляется Горр — убийца богов. В борьбе с ним Тор неожиданно встречает обретшую силу Джейн Фостер."
    },
    "tags": [
      "Marvel",
      "thor love and thunder",
      "Thor: Love and Thunder",
      "Tor 4"
    ],
    "colors": [
      "#6a2a8a",
      "#140418"
    ],
    "poster": "images/marvel/thor-love-and-thunder.jpg",
    "trailer": "https://www.youtube.com/watch?v=WQfLxSqxicE",
    "video": "https://faylmovi.ru/tarjima_kinolar/tor_4_720.mp4",
    "featured": false,
    "addedAt": 1790256558458,
    "updatedAt": 1790256558458,
    "year": 2022,
    "duration": 119,
    "rating": 6.2,
    "director": "Taika Waititi",
    "franchise": "marvel"
  },
  {
    "id": 127,
    "slug": "thor-the-dark-world",
    "type": "film",
    "title": {
      "uz": "Tor 2: Zulmat saltanati",
      "ru": "Тор 2: Царство тьмы"
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
      "Chris Hemsworth",
      "Natalie Portman",
      "Tom Hiddleston",
      "Christopher Eccleston"
    ],
    "desc": {
      "uz": "Qadimiy qorong‘u elflar koinotni zulmatga cho‘ktirmoqchi. Tor Jeyn va xoin akasi Loki bilan birga ularni to‘xtatishga urinadi.",
      "ru": "Древние тёмные эльфы хотят погрузить вселенную во тьму. Тор объединяется с Джейн и коварным братом Локи, чтобы остановить их."
    },
    "tags": [
      "Marvel",
      "thor the dark world",
      "Thor: The Dark World",
      "Tor 2"
    ],
    "colors": [
      "#3a2a4a",
      "#0c0810"
    ],
    "poster": "images/marvel/thor-the-dark-world.jpg",
    "trailer": "https://www.youtube.com/watch?v=wccked4BA9Q",
    "video": "http://topfilm.info/2/tarjima_kinolar/Tor_2_720.mp4",
    "featured": false,
    "addedAt": 1790256481628,
    "updatedAt": 1790256481628,
    "year": 2013,
    "duration": 112,
    "rating": 6.7,
    "director": "Alan Taylor",
    "franchise": "marvel"
  },
  {
    "id": 124,
    "slug": "thor",
    "type": "film",
    "title": {
      "uz": "Tor",
      "ru": "Тор"
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
      "Chris Hemsworth",
      "Natalie Portman",
      "Tom Hiddleston",
      "Anthony Hopkins"
    ],
    "desc": {
      "uz": "Takabbur jangchi Tor otasi Odin tomonidan Yerga surgun qilinadi. U bolg‘asini qaytarib olish uchun haqiqiy qahramon bo‘lishni o‘rganishi kerak.",
      "ru": "Высокомерного воина Тора отец Один изгоняет на Землю. Чтобы вернуть свой молот, ему предстоит научиться быть настоящим героем."
    },
    "tags": [
      "Marvel",
      "thor",
      "Tor 1"
    ],
    "colors": [
      "#1f3a6b",
      "#060c1a"
    ],
    "poster": "images/marvel/thor.jpg",
    "trailer": "https://www.youtube.com/watch?v=KN0FHCErJjo",
    "video": "http://topfilm.info/3/tarjima_kinolar/TOR_1_720.mp4",
    "featured": false,
    "addedAt": 1790256433815,
    "updatedAt": 1790256433815,
    "year": 2011,
    "duration": 115,
    "rating": 7,
    "director": "Kenneth Branagh",
    "franchise": "marvel"
  },
  {
    "id": 142,
    "slug": "ant-man-and-the-wasp-quantumania",
    "type": "film",
    "title": {
      "uz": "Chumoli-odam va Ari: Kvantomaniya",
      "ru": "Человек-муравей и Оса: Квантомания"
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
      "Paul Rudd",
      "Evangeline Lilly",
      "Jonathan Majors",
      "Kathryn Newton"
    ],
    "desc": {
      "uz": "Skott Lang va uning oilasi kvant olamiga tortib ketiladi. U yerda ular vaqt ustidan hukmron bo‘lishni istagan Kang Zabt etuvchi bilan to‘qnashadi.",
      "ru": "Скотта Лэнга и его семью затягивает в квантовый мир. Там они сталкиваются с Кангом Завоевателем, мечтающим властвовать над временем."
    },
    "tags": [
      "Marvel",
      "ant man and the wasp quantumania",
      "Ant-Man and the Wasp: Quantumania",
      "Chumoli odam 3"
    ],
    "colors": [
      "#5a1a6b",
      "#1a4a6b"
    ],
    "poster": "images/marvel/ant-man-and-the-wasp-quantumania.jpg",
    "trailer": "https://www.youtube.com/watch?v=V6tE_-ZHDSg",
    "video": "https://faylmovi.ru/tarjima_kinolar/chumoli_odam_3_720.mp4",
    "featured": false,
    "addedAt": 1790256357041,
    "updatedAt": 1790256357041,
    "year": 2023,
    "duration": 125,
    "rating": 6.1,
    "director": "Peyton Reed",
    "franchise": "marvel"
  },
  {
    "id": 133,
    "slug": "ant-man-and-the-wasp",
    "type": "film",
    "title": {
      "uz": "Chumoli-odam va Ari",
      "ru": "Человек-муравей и Оса"
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
      "Paul Rudd",
      "Evangeline Lilly",
      "Michael Douglas",
      "Michelle Pfeiffer"
    ],
    "desc": {
      "uz": "Skott Lang uy qamog‘ida, ammo Xoup va Xenk Pim unga yana muhtoj. Ular kvant olamida adashib qolgan Janet van Daynni qutqarishga harakat qiladi.",
      "ru": "Скотт Лэнг под домашним арестом, но Хоуп и Хэнк Пим снова нуждаются в нём. Вместе они пытаются спасти Джанет ван Дайн из квантового мира."
    },
    "tags": [
      "Marvel",
      "ant man and the wasp",
      "Ant-Man and the Wasp",
      "Chumoli odam 2"
    ],
    "colors": [
      "#7a1a1a",
      "#5a4a10"
    ],
    "poster": "images/marvel/ant-man-and-the-wasp.jpg",
    "trailer": "https://www.youtube.com/watch?v=azquga_3_ss",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/Chumoli_odam_va_Ari_1080.mp4",
    "featured": false,
    "addedAt": 1790256218094,
    "updatedAt": 1790256218094,
    "year": 2018,
    "duration": 118,
    "rating": 7,
    "director": "Peyton Reed",
    "franchise": "marvel"
  },
  {
    "id": 61,
    "slug": "blade-runner-2049",
    "type": "film",
    "title": {
      "uz": "Bleyd Ranner 2049",
      "ru": "Бегущий по лезвию 2049"
    },
    "genres": [
      "drama",
      "scifi",
      "thriller"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Ryan Gosling",
      "Harrison Ford",
      "Ana de Armas",
      "Jared Leto"
    ],
    "desc": {
      "uz": "Yosh blade runner K uzoq yillar yashirilgan sirni ochadi va yo‘qolgan Rik Dekkardni izlashga tushadi.",
      "ru": "Молодой блейдраннер К раскрывает давно скрываемую тайну и отправляется на поиски исчезнувшего Рика Декарда."
    },
    "tags": [
      "Blade Runner",
      "Бегущий по лезвию",
      "Blade Runner 2049"
    ],
    "colors": [
      "#8a4a1e",
      "#1a0e06"
    ],
    "poster": "images/blade-runner-2049.png",
    "trailer": "https://www.youtube.com/watch?v=3s5zsFm3VgA",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/TIG_USTIDA_YUGURUVCHILAR_1080.mp4",
    "featured": false,
    "addedAt": 1790255844532,
    "updatedAt": 1790255844532,
    "year": 2017,
    "duration": 164,
    "rating": 8.1,
    "director": "Denis Villeneuve"
  },
  {
    "id": 2082,
    "slug": "harry-potter-and-the-deathly-hallows-part-2",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Ajal tuhfasi: 2-qism",
      "ru": "Гарри Поттер и Дары Смерти. Часть 2"
    },
    "genres": [
      "fantasy",
      "adventure"
    ],
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "cast": [
      "Rupert Grint",
      "Ralph Fiennes"
    ],
    "desc": {
      "uz": "«Harry Potter va Ajal tuhfasi: 2-qism» — 2011-yilgi Buyuk Britaniya va AQSh filmi. Rejissyor: David Yates. Rollarda: Rupert Grint, Ralph Fiennes. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Дары Смерти. Часть 2» (англ."
    },
    "tags": [
      "Harry Potter and the Deathly Hallows – Part 2",
      "Harry Potter 8",
      "Garri Potter 8",
      "Garri Potter va Ajal tuhfalari 2"
    ],
    "colors": [
      "hsl(189 45% 28%)",
      "hsl(209 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/d/df/Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=O5aCY_MPmzc",
    "video": "https://kinolar.tv/53f5ac2c-52a4-4c05-83e4-9246b2b4b36f",
    "featured": false,
    "addedAt": 1790255699738,
    "updatedAt": 1790255699738,
    "year": 2011,
    "duration": 130,
    "director": "David Yates"
  },
  {
    "id": 2072,
    "slug": "harry-potter-and-the-deathly-hallows-part-1",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Ajal tuhfasi: 1-qism",
      "ru": "Гарри Поттер и Дары Смерти. Часть 1"
    },
    "genres": [
      "action",
      "fantasy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh, Buyuk Britaniya",
      "ru": "США, Великобритания"
    },
    "cast": [
      "Ralph Fiennes",
      "Helena Bonham Carter",
      "Tom Felton"
    ],
    "desc": {
      "uz": "«Harry Potter va Ajal tuhfasi: 1-qism» — 2010-yilgi AQSh va Buyuk Britaniya filmi. Rejissyor: David Yates. Rollarda: Ralph Fiennes, Helena Bonham Carter, Tom Felton. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Дары Смерти. Часть 1» (англ."
    },
    "tags": [
      "Harry Potter and the Deathly Hallows – Part 1",
      "Harry Potter 7",
      "Garri Potter 7",
      "Garri Potter va Ajal tuhfalari 1"
    ],
    "colors": [
      "hsl(188 45% 28%)",
      "hsl(208 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/2/2d/Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=oBTJEwG2NOM",
    "video": "https://kinochilar.com/8aa7c77a-4f39-4e1e-b603-c2ed5645ba6b",
    "featured": false,
    "addedAt": 1790255640647,
    "updatedAt": 1790255640647,
    "year": 2010,
    "duration": 147,
    "director": "David Yates"
  },
  {
    "id": 2047,
    "slug": "harry-potter-and-the-order-of-the-phoenix",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Feniks jamiyati",
      "ru": "Гарри Поттер и Орден Феникса"
    },
    "genres": [
      "fantasy",
      "family"
    ],
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "cast": [
      "Rupert Grint",
      "Helena Bonham Carter"
    ],
    "desc": {
      "uz": "«Harry Potter va Feniks jamiyati» — 2007-yilgi Buyuk Britaniya va AQSh filmi. Rejissyor: David Yates. Rollarda: Rupert Grint, Helena Bonham Carter. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Орден Феникса» — фэнтезийно-приключенческий фильм 2007 года режиссёра Дэвида Йейтса, пятый из серии фильмов о Гарри Поттере."
    },
    "tags": [
      "Harry Potter and the Order of the Phoenix",
      "Harry Potter 5",
      "Garri Potter 5",
      "Garri Potter va Feniks ordeni"
    ],
    "colors": [
      "hsl(90 45% 28%)",
      "hsl(110 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/e/e7/Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=Q3P10wkGDBQ",
    "video": "https://kinolar.tv/9a8dce1f-d1d0-4566-8615-dd19ca6227f6",
    "featured": false,
    "addedAt": 1790255593124,
    "updatedAt": 1790255593124,
    "year": 2007,
    "duration": 133,
    "director": "David Yates"
  },
  {
    "id": 2044,
    "slug": "harry-potter-and-the-half-blood-prince",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Tilsim shahzodasi",
      "ru": "Гарри Поттер и Принц-полукровка"
    },
    "genres": [
      "fantasy"
    ],
    "country": {
      "uz": "AQSh, Buyuk Britaniya",
      "ru": "США, Великобритания"
    },
    "cast": [
      "Rupert Grint",
      "Jim Broadbent"
    ],
    "desc": {
      "uz": "«Harry Potter va Tilsim shahzodasi» — 2009-yilgi AQSh va Buyuk Britaniya filmi. Rejissyor: David Yates. Rollarda: Rupert Grint, Jim Broadbent. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Принц-полукровка» — фэнтезийно-приключенческий фильм 2009 года режиссёра Дэвида Йейтса, шестой из серии фильмов о Гарри Поттере."
    },
    "tags": [
      "Harry Potter and the Half-Blood Prince",
      "Harry Potter 6",
      "Garri Potter 6",
      "Harry Potter va Yarimqon shahzoda"
    ],
    "colors": [
      "hsl(16 45% 28%)",
      "hsl(36 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/3/3f/Harry_Potter_and_the_Half-Blood_Prince_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=U0hMHgNw8hs",
    "video": "https://kxcdn.ru/Garri_Potter_6_Tilsim_Shahzoda_2009_HD_Daxshat.Net.mp4",
    "featured": false,
    "addedAt": 1790255548915,
    "updatedAt": 1790255548915,
    "year": 2009,
    "duration": 147,
    "director": "David Yates"
  },
  {
    "id": 2040,
    "slug": "harry-potter-and-the-prisoner-of-azkaban",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Askaban mahbusi",
      "ru": "Гарри Поттер и узник Азкабана"
    },
    "genres": [
      "fantasy",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "AQSh, Buyuk Britaniya",
      "ru": "США, Великобритания"
    },
    "cast": [
      "Rupert Grint",
      "Robbie Coltrane"
    ],
    "desc": {
      "uz": "«Harry Potter va Askaban mahbusi» — 2004-yilgi AQSh va Buyuk Britaniya filmi. Rejissyor: Alfonso Cuarón. Rollarda: Rupert Grint, Robbie Coltrane. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и узник Азкабана» — фэнтезийно-приключенческий фильм 2004 года, третий из серии фильмов о Гарри Поттере."
    },
    "tags": [
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter 3",
      "Garri Potter 3",
      "Garri Potter va Azkaban mahbusi"
    ],
    "colors": [
      "hsl(145 45% 28%)",
      "hsl(165 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/1/18/Harry_Potter_and_the_Prisoner_of_Azkaban_film_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=IB7OXZ6WkzQ",
    "video": "https://kinolar.tv/8c221152-b19a-4cef-be65-42660b56c19a",
    "featured": false,
    "addedAt": 1790255477336,
    "updatedAt": 1790255477336,
    "year": 2004,
    "duration": 141,
    "director": "Alfonso Cuarón"
  },
  {
    "id": 2039,
    "slug": "harry-potter-and-the-goblet-of-fire",
    "type": "film",
    "title": {
      "uz": "Harry Potter va Alanga kubogi",
      "ru": "Гарри Поттер и Кубок огня"
    },
    "genres": [
      "fantasy",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "cast": [
      "Rupert Grint",
      "Robbie Coltrane"
    ],
    "desc": {
      "uz": "«Harry Potter va Alanga kubogi» — 2005-yilgi Buyuk Britaniya va AQSh filmi. Rejissyor: Mike Newell. Rollarda: Rupert Grint, Robbie Coltrane. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Кубок огня» — фэнтезийно-приключенческий фильм 2005 года режиссёра Майка Ньюэлла, четвёртый из серии фильмов о Гарри Поттере."
    },
    "tags": [
      "Harry Potter and the Goblet of Fire",
      "Harry Potter 4",
      "Garri Potter 4",
      "Garri Potter va Alanga kubogi"
    ],
    "colors": [
      "hsl(278 45% 28%)",
      "hsl(298 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/c9/Harry_Potter_and_the_Goblet_of_Fire_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=4a1g4YisNbQ",
    "video": "https://kinolar.tv/eff94cfc-2b5f-44b7-8366-1120c13fe5e0",
    "featured": false,
    "addedAt": 1790255429413,
    "updatedAt": 1790255429413,
    "year": 2005,
    "duration": 151,
    "director": "Mike Newell"
  },
  {
    "id": 2029,
    "slug": "harry-potter-and-the-chamber-of-secrets",
    "type": "film",
    "title": {
      "uz": "Harry Potter va maxfiy hujra",
      "ru": "Гарри Поттер и тайная комната"
    },
    "genres": [
      "fantasy",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "cast": [
      "Warwick Davis",
      "Rupert Grint"
    ],
    "desc": {
      "uz": "«Harry Potter va maxfiy hujra» — 2002-yilgi Buyuk Britaniya va AQSh filmi. Rejissyor: Chris Columbus. Rollarda: Warwick Davis, Rupert Grint. Saytda rasmiy treyleri bor.",
      "ru": "«Гарри Поттер и Тайная комната» — британско-американский фэнтезийный фильм 2002 года режиссёра Криса Коламбуса по сценарию Стива Кловиса."
    },
    "tags": [
      "Harry Potter and the Chamber of Secrets",
      "Harry Potter 2",
      "Garri Potter 2",
      "Garri Potter va maxfiy hujra"
    ],
    "colors": [
      "hsl(210 45% 28%)",
      "hsl(230 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/c0/Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=5NqcCpw7PKA",
    "video": "https://kxcdn.ru/Garri_Potter_2_Maxfiy_Hujra_2002_HD_Daxshat.Net.mp4",
    "featured": false,
    "addedAt": 1790255384517,
    "updatedAt": 1790255384517,
    "year": 2002,
    "duration": 161,
    "director": "Chris Columbus"
  },
  {
    "id": 59,
    "slug": "harry-potter-1",
    "type": "film",
    "title": {
      "uz": "Garri Potter va falsafiy tosh",
      "ru": "Гарри Поттер и философский камень"
    },
    "genres": [
      "fantasy",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "cast": [
      "Daniel Radcliffe",
      "Rupert Grint",
      "Emma Watson",
      "Richard Harris"
    ],
    "desc": {
      "uz": "Yetim bola o‘zining sehrgar ekanini bilib qoladi va Xogvarts maktabida birinchi yilini boshlaydi.",
      "ru": "Мальчик-сирота узнаёт, что он волшебник, и начинает первый год в школе Хогвартс."
    },
    "tags": [
      "Harry Potter",
      "Гарри Поттер",
      "Hogwarts",
      "Harry Potter and the Sorcerer’s Stone",
      "Harry Potter va falsafiy tosh",
      "Harry Potter 1",
      "Garri Potter 1"
    ],
    "colors": [
      "#6b4a1e",
      "#160f06"
    ],
    "poster": "images/harry-potter-1.jpg",
    "trailer": "https://www.youtube.com/watch?v=AFwrmkAHEk4",
    "video": "https://kinolar.tv/2e2b2135-8d85-4687-bd2e-b52f237af409",
    "featured": false,
    "addedAt": 1790255327492,
    "updatedAt": 1790255327492,
    "year": 2001,
    "duration": 152,
    "rating": 7.7,
    "director": "Chris Columbus"
  },
  {
    "id": 57,
    "slug": "jurassic-park",
    "type": "film",
    "title": {
      "uz": "Yura davri parki",
      "ru": "Парк Юрского периода"
    },
    "genres": [
      "scifi",
      "thriller",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Sam Neill",
      "Laura Dern",
      "Jeff Goldblum",
      "Richard Attenborough"
    ],
    "desc": {
      "uz": "Tiriltirilgan dinozavrlar parkida himoya tizimi ishdan chiqadi va mehmonlar orolda yirtqichlar bilan yolg‘iz qoladi.",
      "ru": "В парке с воскрешёнными динозаврами отключается защита, и гости остаются на острове наедине с хищниками."
    },
    "colors": [
      "#3a5a2a",
      "#0c1408"
    ],
    "poster": "images/jurassic-park.jpg",
    "trailer": "https://www.youtube.com/watch?v=sqlfsYpUFSQ",
    "video": "https://kxcdn.ru/Yura_Davri_Dunyosi_1_1993_HD_Daxshat.Tv.mp4",
    "featured": false,
    "addedAt": 1790255184345,
    "updatedAt": 1790255184345,
    "year": 1993,
    "duration": 127,
    "rating": 8.2,
    "director": "Steven Spielberg",
    "tags": [
      "Jurassic Park",
      "Yura davri parki 1"
    ]
  },
  {
    "id": 56,
    "slug": "terminator-2",
    "type": "film",
    "title": {
      "uz": "Terminator 2: Qiyomat kuni",
      "ru": "Терминатор 2: Судный день"
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
      "Arnold Schwarzenegger",
      "Linda Hamilton",
      "Edward Furlong",
      "Robert Patrick"
    ],
    "desc": {
      "uz": "Kelajakdan yuborilgan kiborg endi bolani himoya qilishi kerak — uni ovlayotgan yanada mukammal mashinadan.",
      "ru": "Присланный из будущего киборг теперь должен защитить мальчика от куда более совершенной машины."
    },
    "tags": [
      "Terminator",
      "Терминатор",
      "Terminator 2: Judgment Day",
      "Terminator 2"
    ],
    "colors": [
      "#2a3a4a",
      "#080c12"
    ],
    "poster": "images/terminator-2.png",
    "trailer": "https://www.youtube.com/watch?v=M-SIftG16hU",
    "video": "http://topfilm.info/2/tarjima_kinolar/Terminator_2_720.mp4",
    "featured": false,
    "addedAt": 1790255080904,
    "updatedAt": 1790255080904,
    "year": 1991,
    "duration": 137,
    "rating": 8.6,
    "director": "James Cameron"
  },
  {
    "id": 55,
    "slug": "back-to-the-future",
    "type": "film",
    "title": {
      "uz": "Kelajakka qaytish",
      "ru": "Назад в будущее"
    },
    "genres": [
      "comedy",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Michael J. Fox",
      "Christopher Lloyd",
      "Lea Thompson",
      "Crispin Glover"
    ],
    "desc": {
      "uz": "O‘smir Marti Makflay do‘sti yasagan vaqt mashinasida 1955-yilga tushib qoladi va o‘z tug‘ilishini xavf ostiga qo‘yadi.",
      "ru": "Подросток Марти Макфлай попадает в 1955 год на машине времени друга и рискует собственным появлением на свет."
    },
    "colors": [
      "#8a5a1e",
      "#1a1006"
    ],
    "poster": "images/back-to-the-future.jpg",
    "trailer": "https://www.youtube.com/watch?v=6mJWHY2Jl-8",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/kelajakka_qaytib_1_kinochilar_480.mp4",
    "featured": false,
    "addedAt": 1790255018301,
    "updatedAt": 1790255018301,
    "year": 1985,
    "duration": 116,
    "rating": 8.5,
    "director": "Robert Zemeckis",
    "tags": [
      "Back to the Future",
      "Kelajakka qaytish 1"
    ]
  },
  {
    "id": 53,
    "slug": "star-wars-a-new-hope",
    "type": "film",
    "title": {
      "uz": "Yulduzli urushlar: Yangi umid",
      "ru": "Звёздные войны: Новая надежда"
    },
    "genres": [
      "scifi",
      "fantasy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher",
      "Alec Guinness"
    ],
    "desc": {
      "uz": "Sahro sayyorasidagi yosh Lyuk Skayvoker qo‘zg‘olonchilarga qo‘shilib, Imperiyaning halokatli qurolini yo‘q qilishga kirishadi.",
      "ru": "Юный Люк Скайуокер с пустынной планеты присоединяется к повстанцам, чтобы уничтожить смертоносное оружие Империи."
    },
    "tags": [
      "Star Wars",
      "Yulduzli urushlar",
      "Звёздные войны",
      "Jedi",
      "Star Wars: A New Hope",
      "Star Wars 4"
    ],
    "colors": [
      "#6b5a1e",
      "#161206"
    ],
    "poster": "images/star-wars-a-new-hope.jpg",
    "trailer": "https://www.youtube.com/watch?v=Opxh5AqFByQ",
    "video": "https://files.uzmax.net/films/Yulduzlar.jangi.4.Yangi.umid.1977.HDRip.uzmax.net.mp4",
    "featured": true,
    "addedAt": 1790254933988,
    "updatedAt": 1790254933988,
    "year": 1977,
    "duration": 121,
    "rating": 8.6,
    "director": "George Lucas"
  },
  {
    "id": 51,
    "slug": "zack-snyders-justice-league",
    "type": "film",
    "title": {
      "uz": "Zak Snayderning Adolat ligasi",
      "ru": "Лига справедливости Зака Снайдера"
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
      "Ben Affleck",
      "Henry Cavill",
      "Gal Gadot",
      "Ezra Miller",
      "Ray Fisher"
    ],
    "desc": {
      "uz": "Supermen halok bo‘lgach, Betmen va Diana Yerni yangi tahdiddan qutqarish uchun qahramonlar jamoasini yig‘adi.",
      "ru": "После гибели Супермена Бэтмен и Диана собирают команду героев, чтобы спасти Землю от новой угрозы."
    },
    "colors": [
      "#2a3a4a",
      "#080c12"
    ],
    "poster": "images/zack-snyders-justice-league.png",
    "trailer": "https://www.youtube.com/watch?v=m9Jp6ZfBavw",
    "video": "https://files.uzbeklar.biz/film2/zakkk.mp4",
    "featured": false,
    "addedAt": 1790254844662,
    "updatedAt": 1790254844662,
    "year": 2021,
    "duration": 242,
    "rating": 7.9,
    "director": "Zack Snyder",
    "franchise": "dc",
    "tags": [
      "Zack Snyder’s Justice League",
      "Adolat ligasi",
      "Justice League"
    ]
  },
  {
    "id": 50,
    "slug": "shazam",
    "type": "film",
    "title": {
      "uz": "Shazam!",
      "ru": "Шазам!"
    },
    "genres": [
      "action",
      "comedy",
      "fantasy",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Zachary Levi",
      "Asher Angel",
      "Mark Strong",
      "Jack Dylan Grazer"
    ],
    "desc": {
      "uz": "O‘n to‘rt yoshli Billi bitta so‘zni aytishi bilan kattalar qiyofasidagi super qahramonga aylanadi.",
      "ru": "Четырнадцатилетний Билли одним словом превращается во взрослого супергероя."
    },
    "colors": [
      "#a03a1e",
      "#1e0a06"
    ],
    "poster": "images/shazam.jpg",
    "trailer": "https://www.youtube.com/watch?v=rvJdxDjn6nI",
    "video": "http://topfilm.info/2/tarjima_kinolar/SHAZAM_720.mp4",
    "featured": false,
    "addedAt": 1790254721154,
    "updatedAt": 1790254721154,
    "year": 2019,
    "duration": 132,
    "rating": 7,
    "director": "David F. Sandberg",
    "franchise": "dc",
    "tags": [
      "Shazam",
      "Shazam 1"
    ]
  },
  {
    "id": 1091226161,
    "slug": "aquaman-and-the-lost-kingdom",
    "type": "film",
    "title": {
      "uz": "Aquaman and the Lost Kingdom",
      "ru": "Аквамен и потерянное царство"
    },
    "genres": [
      "action",
      "scifi",
      "fantasy"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Jason Momoa",
      "Amber Heard",
      "Patrick Wilson"
    ],
    "desc": {
      "uz": "«Aquaman and the Lost Kingdom» — 2022-yilgi AQSh filmi. Rejissyor: James Wan. Rollarda: Jason Momoa, Amber Heard, Patrick Wilson.",
      "ru": "«Аквамен и потерянное царство» — фильм 2022 года (США). Режиссёр: James Wan. В ролях: Jason Momoa, Amber Heard, Patrick Wilson."
    },
    "colors": [
      "hsl(33 45% 28%)",
      "hsl(53 50% 7%)"
    ],
    "trailer": "https://www.youtube.com/watch?v=WuGIT7e-Vas",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/AKVAMEN_2_1080.mp4",
    "tags": [
      "Aquaman and the Lost Kingdom",
      "Aquaman 2",
      "Akvamen 2",
      "Akvamen va yo‘qolgan qirollik"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/4/4a/Aquaman_and_the_Lost_Kingdom_poster.jpg",
    "wiki": "Аквамен и потерянное царство",
    "featured": false,
    "addedAt": 1790254669001,
    "updatedAt": 1790254669001,
    "year": 2022,
    "duration": 124,
    "director": "James Wan"
  },
  {
    "id": 49,
    "slug": "aquaman",
    "type": "film",
    "title": {
      "uz": "Akvamen",
      "ru": "Аквамен"
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
      "Jason Momoa",
      "Amber Heard",
      "Patrick Wilson",
      "Nicole Kidman"
    ],
    "desc": {
      "uz": "Yarim odam, yarim atlantlik Artur Karri suv osti shohligining qonuniy taxtini talashib, urushning oldini olishga harakat qiladi.",
      "ru": "Полукровка Артур Карри заявляет права на трон подводного королевства, чтобы предотвратить войну."
    },
    "colors": [
      "#1e6b7a",
      "#06161a"
    ],
    "poster": "images/aquaman.jpg",
    "trailer": "https://www.youtube.com/watch?v=bUq_fbMUYnE",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/akvamen_1080.mp4",
    "featured": false,
    "addedAt": 1790254616863,
    "updatedAt": 1790254616863,
    "year": 2018,
    "duration": 143,
    "rating": 6.8,
    "director": "James Wan",
    "franchise": "dc",
    "tags": [
      "Aquaman",
      "Akvamen 1"
    ]
  },
  {
    "id": 48,
    "slug": "wonder-woman",
    "type": "film",
    "title": {
      "uz": "Mo‘jizakor ayol",
      "ru": "Чудо-женщина"
    },
    "genres": [
      "action",
      "fantasy",
      "adventure",
      "war"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Gal Gadot",
      "Chris Pine",
      "Robin Wright",
      "Danny Huston"
    ],
    "desc": {
      "uz": "Amazonkalar orolida o‘sgan Diana Birinchi jahon urushini to‘xtatish uchun odamlar dunyosiga chiqadi.",
      "ru": "Выросшая на острове амазонок Диана отправляется в мир людей, чтобы остановить Первую мировую войну."
    },
    "colors": [
      "#8a5a1e",
      "#1a1006"
    ],
    "poster": "images/wonder-woman.jpg",
    "trailer": "https://www.youtube.com/watch?v=GE4GT52MJuM",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/MOJIZAKOR_AYOL_1080.mp4",
    "featured": false,
    "addedAt": 1790254561655,
    "updatedAt": 1790254561655,
    "year": 2017,
    "duration": 141,
    "rating": 7.3,
    "director": "Patty Jenkins",
    "franchise": "dc",
    "tags": [
      "Wonder Woman",
      "Mo‘jizakor ayol 1"
    ]
  },
  {
    "id": 46,
    "slug": "man-of-steel",
    "type": "film",
    "title": {
      "uz": "Po‘lat odam",
      "ru": "Человек из стали"
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
      "Henry Cavill",
      "Amy Adams",
      "Michael Shannon",
      "Russell Crowe"
    ],
    "desc": {
      "uz": "Boshqa sayyorada tug‘ilgan Klark Kent o‘z kelib chiqishini bilib oladi va Yerni general Zoddan himoya qilishi kerak.",
      "ru": "Рождённый на другой планете Кларк Кент узнаёт своё происхождение и должен защитить Землю от генерала Зода."
    },
    "tags": [
      "Superman",
      "Supermen",
      "Супермен",
      "Man of Steel",
      "Po‘lat odam 1"
    ],
    "colors": [
      "#1e4a7a",
      "#06121e"
    ],
    "poster": "images/man-of-steel.jpg",
    "trailer": "https://www.youtube.com/watch?v=ZG1E_GCtjHA",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/POLAT_ODAM_1080.mp4",
    "featured": false,
    "addedAt": 1790254486994,
    "updatedAt": 1790254486994,
    "year": 2013,
    "duration": 143,
    "rating": 7.1,
    "director": "Zack Snyder",
    "franchise": "dc"
  },
  {
    "id": 2473,
    "slug": "batman-returns",
    "type": "film",
    "title": {
      "uz": "Batman Returns",
      "ru": "Бэтмен возвращается"
    },
    "genres": [
      "action",
      "scifi",
      "fantasy"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Michael Keaton",
      "Danny DeVito",
      "Michelle Pfeiffer",
      "Christopher Walken"
    ],
    "desc": {
      "uz": "«Batman Returns» — 1992-yilgi AQSh filmi. Rejissyor: Tim Burton. Rollarda: Michael Keaton, Danny DeVito, Michelle Pfeiffer. Saytda rasmiy treyleri bor.",
      "ru": "«Бэтмен возвращается» — американский супергеройский фильм 1992 года, срежиссированный и спродюсированный Тимом Бёртоном по сценарию Дэниела Уотерса."
    },
    "colors": [
      "hsl(275 45% 28%)",
      "hsl(295 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/83/Batman_returns_poster2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=u4Zufh_KykQ",
    "video": "https://topfilm.info/6/tarjima_kinolar/BETMENNING_QAYTISHI_1080.mp4",
    "featured": false,
    "addedAt": 1790254280371,
    "updatedAt": 1790254280371,
    "year": 1992,
    "duration": 126,
    "director": "Tim Burton",
    "tags": [
      "Betmen qaytadi"
    ]
  },
  {
    "id": 47,
    "slug": "batman-v-superman",
    "type": "film",
    "title": {
      "uz": "Betmen Supermenga qarshi: Adolat tongi",
      "ru": "Бэтмен против Супермена: На заре справедливости"
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
      "Ben Affleck",
      "Henry Cavill",
      "Gal Gadot",
      "Jesse Eisenberg"
    ],
    "desc": {
      "uz": "Gotem himoyachisi Metropolis qahramonini insoniyat uchun xavf deb biladi — ikki afsona bir-biriga qarshi chiqadi.",
      "ru": "Защитник Готэма видит в герое Метрополиса угрозу человечеству — и две легенды сходятся в бою."
    },
    "tags": [
      "Batman",
      "Superman",
      "Бэтмен",
      "Супермен",
      "Batman v Superman: Dawn of Justice",
      "Betmen va Supermen"
    ],
    "colors": [
      "#3a3a5a",
      "#0a0a14"
    ],
    "poster": "images/batman-v-superman.jpg",
    "trailer": "https://www.youtube.com/watch?v=BL-b9f7nyx4",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/BETMEN_SUPERMENGA_QARSHI_1080.mp4",
    "featured": false,
    "addedAt": 1790254227687,
    "updatedAt": 1790254227687,
    "year": 2016,
    "duration": 151,
    "rating": 6.5,
    "director": "Zack Snyder",
    "franchise": "dc"
  },
  {
    "id": 44,
    "slug": "batman-begins",
    "type": "film",
    "title": {
      "uz": "Betmen boshlanishi",
      "ru": "Бэтмен: Начало"
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
      "Michael Caine",
      "Liam Neeson",
      "Cillian Murphy"
    ],
    "desc": {
      "uz": "Ota-onasidan ayrilgan Bryus Ueyn dunyo kezib o‘z qo‘rquvini yengadi va Gotemning himoyachisi Betmenga aylanadi.",
      "ru": "Потерявший родителей Брюс Уэйн побеждает свой страх и становится защитником Готэма — Бэтменом."
    },
    "tags": [
      "Batman",
      "Бэтмен",
      "Batman Begins",
      "Betmen: Boshlanish"
    ],
    "colors": [
      "#2a2a3a",
      "#08080d"
    ],
    "poster": "images/batman-begins.jpg",
    "trailer": "https://www.youtube.com/watch?v=ZjIQbHL0gI8",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Betmen_muqaddima_1080.mp4",
    "featured": false,
    "addedAt": 1790254148828,
    "updatedAt": 1790254148828,
    "year": 2005,
    "duration": 140,
    "rating": 8.2,
    "director": "Christopher Nolan",
    "franchise": "dc"
  },
  {
    "id": 145,
    "slug": "deadpool-and-wolverine",
    "type": "film",
    "title": {
      "uz": "Dedpul va Rosomaxa",
      "ru": "Дэдпул и Росомаха"
    },
    "genres": [
      "action",
      "comedy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin",
      "Matthew Macfadyen"
    ],
    "desc": {
      "uz": "Dedpulning olami yo‘q bo‘lish arafasida. Uni qutqarish uchun u boshqa olamdagi eng qaysar Rosomaxa bilan birga ishlashga majbur bo‘ladi.",
      "ru": "Вселенной Дэдпула грозит исчезновение. Чтобы спасти её, ему приходится объединиться с самым упрямым Росомахой из другой вселенной."
    },
    "tags": [
      "Marvel",
      "deadpool and wolverine",
      "Deadpool & Wolverine",
      "Deadpool 3",
      "Dedpul 3",
      "Dedpul va Rosomaha"
    ],
    "colors": [
      "#8a1414",
      "#8a6a10"
    ],
    "poster": "images/marvel/deadpool-and-wolverine.jpg",
    "trailer": "https://www.youtube.com/watch?v=_HzQ_i0dr5k",
    "video": "https://s6.faylmovi.ru/tarjima_kinolar/dedpul_rosamaxa_treyler.mp4",
    "featured": false,
    "addedAt": 1790253960513,
    "updatedAt": 1790253960513,
    "year": 2024,
    "duration": 128,
    "rating": 7.5,
    "director": "Shawn Levy",
    "franchise": "marvel"
  },
  {
    "id": 2522,
    "slug": "deadpool-2",
    "type": "film",
    "title": {
      "uz": "Dedpul 2",
      "ru": "Дэдпул 2"
    },
    "genres": [
      "action",
      "comedy"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Ryan Reynolds",
      "T. J. Miller",
      "Leslie Uggams",
      "Brianna Hildebrand"
    ],
    "desc": {
      "uz": "«Dedpul 2» — 2018-yilgi AQSh filmi. Rejissyor: David Leitch. Rollarda: Ryan Reynolds, T. J. Miller, Leslie Uggams. Saytda rasmiy treyleri bor.",
      "ru": "«Дэдпул 2» — американский супергеройский фильм, основанный на комиксах Marvel Comics о персонаже Дэдпуле."
    },
    "tags": [
      "Deadpool 2"
    ],
    "colors": [
      "hsl(341 45% 28%)",
      "hsl(1 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/c/cf/Deadpool_2_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=YR7txR7-D6k",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Dedpul_2_1080.mp4",
    "featured": false,
    "addedAt": 1790253863232,
    "updatedAt": 1790253863232,
    "year": 2018,
    "duration": 119,
    "director": "David Leitch"
  },
  {
    "id": 37,
    "slug": "thor-ragnarok",
    "type": "film",
    "title": {
      "uz": "Tor: Ragnarok",
      "ru": "Тор: Рагнарёк"
    },
    "genres": [
      "action",
      "comedy",
      "fantasy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Chris Hemsworth",
      "Tom Hiddleston",
      "Cate Blanchett",
      "Mark Ruffalo"
    ],
    "desc": {
      "uz": "Bolg‘asidan ayrilgan Tor uzoq sayyorada gladiator jangiga tushadi va Asgardni Xeladan qutqarishga shoshiladi.",
      "ru": "Лишившийся молота Тор попадает на гладиаторскую арену и спешит спасти Асгард от Хелы."
    },
    "colors": [
      "#8a3a6b",
      "#1a0a14"
    ],
    "poster": "images/thor-ragnarok.jpg",
    "trailer": "https://www.youtube.com/watch?v=yuXHUmpcwbQ",
    "video": "https://video.uzbek-tilida.net/films/tor-ragnarok-720p.mp4",
    "featured": false,
    "addedAt": 1790253759653,
    "updatedAt": 1790253759653,
    "year": 2017,
    "duration": 130,
    "rating": 7.9,
    "director": "Taika Waititi",
    "franchise": "marvel",
    "tags": [
      "Thor: Ragnarok",
      "Tor 3",
      "Tor: Ragnarek"
    ]
  },
  {
    "id": 31,
    "slug": "big-buck-bunny",
    "type": "multfilm",
    "title": {
      "uz": "Katta quyon Bak",
      "ru": "Большой кролик Бак"
    },
    "genres": [
      "comedy",
      "animation",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "Niderlandiya",
      "ru": "Нидерланды"
    },
    "cast": [
      "Blender Institute"
    ],
    "desc": {
      "uz": "Yuvosh bahaybat quyon uch shumtaka kemiruvchidan o‘ch oladi. Blender Foundation yaratgan, CC BY litsenziyasidagi erkin qisqa metrajli film — saytda to‘liq ko‘rish mumkin.",
      "ru": "Добродушный великан-кролик мстит трём хулиганам-грызунам. Свободный короткометражный фильм Blender Foundation под лицензией CC BY — доступен для полного просмотра на сайте."
    },
    "colors": [
      "#4a7a3a",
      "#0f1a0c"
    ],
    "poster": "images/big-buck-bunny.jpg",
    "trailer": "https://www.youtube.com/watch?v=5xAgp6i9lUQ",
    "video": "https://s11.faylmovi.ru/tarjima_kinolar/BigBuckBunny_480.mp4",
    "featured": false,
    "addedAt": 1790253635183,
    "updatedAt": 1790253635183,
    "year": 2008,
    "duration": 10,
    "rating": 6.4,
    "director": "Sacha Goedegebuure"
  },
  {
    "id": 29,
    "slug": "the-witcher",
    "type": "serial",
    "title": {
      "uz": "Vedmak",
      "ru": "Ведьмак"
    },
    "genres": [
      "action",
      "fantasy",
      "adventure"
    ],
    "seasons": 3,
    "country": {
      "uz": "AQSh, Polsha",
      "ru": "США, Польша"
    },
    "cast": [
      "Henry Cavill",
      "Anya Chalotra",
      "Freya Allan"
    ],
    "desc": {
      "uz": "Maxluqlarga qarshi kurashuvchi mutant Geralt taqdiri bilan bog‘langan malika Sirini himoya qiladi.",
      "ru": "Охотник на чудовищ Геральт защищает принцессу Цири, связанную с ним судьбой."
    },
    "colors": [
      "#3a4a5a",
      "#0c1014"
    ],
    "poster": "images/the-witcher.png",
    "trailer": "https://www.youtube.com/watch?v=Xtf3c-Y20Lw",
    "video": "https://c.uzbeklar.biz/film9/vedmakhd/1qism.mp4",
    "featured": false,
    "addedAt": 1790253505867,
    "updatedAt": 1790253505867,
    "year": 2019,
    "rating": 8,
    "director": "Lauren Schmidt Hissrich",
    "tags": [
      "The Witcher",
      "Vedmak serial"
    ]
  },
  {
    "id": 27,
    "slug": "stranger-things",
    "type": "serial",
    "title": {
      "uz": "Stranger Things",
      "ru": "Очень странные дела"
    },
    "genres": [
      "drama",
      "scifi",
      "horror"
    ],
    "seasons": 4,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "Winona Ryder",
      "David Harbour"
    ],
    "desc": {
      "uz": "Kichik shaharchada bola g‘oyib bo‘ladi va do‘stlari sirli kuchlarga ega qiz bilan boshqa o‘lchamni kashf etadi.",
      "ru": "В маленьком городке пропадает мальчик, а его друзья вместе с девочкой со сверхспособностями открывают другое измерение."
    },
    "colors": [
      "#7a1520",
      "#180407"
    ],
    "poster": "images/stranger-things.png",
    "trailer": "https://www.youtube.com/watch?v=PX6KNzyQfZM",
    "video": "https://c.uzbeklar.biz/film6/ajabtovur/1qism.mp4",
    "featured": true,
    "addedAt": 1790253445383,
    "updatedAt": 1790253445383,
    "year": 2016,
    "rating": 8.7,
    "director": "The Duffer Brothers",
    "tags": [
      "Juda g‘alati ishlar"
    ]
  },
  {
    "id": 26,
    "slug": "game-of-thrones",
    "type": "serial",
    "title": {
      "uz": "Taxtlar o‘yini",
      "ru": "Игра престолов"
    },
    "genres": [
      "drama",
      "fantasy",
      "adventure"
    ],
    "seasons": 8,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Emilia Clarke",
      "Kit Harington",
      "Peter Dinklage",
      "Lena Headey"
    ],
    "desc": {
      "uz": "To‘qqizta olijanob oila Temir Taxt uchun kurashadi, shimolda esa qadimiy dahshat uyg‘onmoqda.",
      "ru": "Девять благородных домов борются за Железный трон, а на Севере просыпается древнее зло."
    },
    "colors": [
      "#4a4a5a",
      "#0e0e14"
    ],
    "poster": "images/game-of-thrones.jpg",
    "trailer": "https://www.youtube.com/watch?v=EKwB1HAuiZg",
    "video": "https://c.uzbeklar.biz/film8/taxtlar/taxtlar_oyini_1.mp4",
    "featured": false,
    "addedAt": 1790253332010,
    "updatedAt": 1790253332010,
    "year": 2011,
    "rating": 9.2,
    "director": "David Benioff, D. B. Weiss",
    "tags": [
      "Game of Thrones",
      "Taxtlar oyini"
    ]
  },
  {
    "id": 25,
    "slug": "breaking-bad",
    "type": "serial",
    "title": {
      "uz": "Breaking Bad",
      "ru": "Во все тяжкие"
    },
    "genres": [
      "drama",
      "thriller",
      "crime"
    ],
    "seasons": 5,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Bryan Cranston",
      "Aaron Paul",
      "Anna Gunn"
    ],
    "desc": {
      "uz": "Saraton tashxisini olgan kimyo o‘qituvchisi oilasini ta’minlash uchun narkotik ishlab chiqarishni boshlaydi.",
      "ru": "Учитель химии с диагнозом рак начинает варить метамфетамин, чтобы обеспечить семью."
    },
    "colors": [
      "#3a5a2a",
      "#0c1408"
    ],
    "poster": "images/breaking-bad.png",
    "trailer": "https://www.youtube.com/watch?v=uXPMbmR-V44",
    "video": "https://e.uzbeklar.biz/breaking/1qism.mp4",
    "featured": false,
    "addedAt": 1790253250945,
    "updatedAt": 1790253250945,
    "year": 2008,
    "rating": 9.5,
    "director": "Vince Gilligan"
  },
  {
    "id": 24,
    "slug": "the-wolf-of-wall-street",
    "type": "film",
    "title": {
      "uz": "Uoll-strit bo‘risi",
      "ru": "Волк с Уолл-стрит"
    },
    "genres": [
      "comedy",
      "crime",
      "biography"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Leonardo DiCaprio",
      "Jonah Hill",
      "Margot Robbie"
    ],
    "desc": {
      "uz": "Jordan Belfortning yo‘qdan sanoqsiz boylik yaratgan va keyin hammasini yo‘qotgan haqiqiy hikoyasi.",
      "ru": "Реальная история Джордана Белфорта, сделавшего состояние из ничего — и потерявшего всё."
    },
    "colors": [
      "#9a7a20",
      "#1c1606"
    ],
    "poster": "images/the-wolf-of-wall-street.png",
    "trailer": "https://www.youtube.com/watch?v=CHivqmutR0I",
    "video": "https://v.mover.uz/IF4n4Sph_m.mp4",
    "featured": false,
    "addedAt": 1790253109619,
    "updatedAt": 1790253109619,
    "year": 2013,
    "duration": 180,
    "rating": 8.2,
    "director": "Martin Scorsese",
    "tags": [
      "The Wolf of Wall Street",
      "Uoll strit bo‘risi"
    ]
  },
  {
    "id": 23,
    "slug": "se7en",
    "type": "film",
    "title": {
      "uz": "Yetti",
      "ru": "Семь"
    },
    "genres": [
      "thriller",
      "crime",
      "detective"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Brad Pitt",
      "Morgan Freeman",
      "Kevin Spacey"
    ],
    "desc": {
      "uz": "Ikki detektiv yetti gunoh asosida qotilliklar sodir etayotgan manyakni qidiradi.",
      "ru": "Два детектива ищут маньяка, совершающего убийства по мотивам семи смертных грехов."
    },
    "colors": [
      "#2a3236",
      "#080b0d"
    ],
    "poster": "images/se7en.jpg",
    "trailer": "https://www.youtube.com/watch?v=GiFyoro7u78",
    "video": "http://files.uzmedia.tv/tarjima/yetti 1995 hd (uzmedia.tv).mp4",
    "featured": false,
    "addedAt": 1790252959190,
    "updatedAt": 1790252959190,
    "year": 1995,
    "duration": 127,
    "rating": 8.6,
    "director": "David Fincher",
    "tags": [
      "Se7en",
      "Seven"
    ]
  },
  {
    "id": 20,
    "slug": "mad-max-fury-road",
    "type": "film",
    "title": {
      "uz": "Mad Maks: G‘azab yo‘li",
      "ru": "Безумный Макс: Дорога ярости"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "Avstraliya",
      "ru": "Австралия"
    },
    "cast": [
      "Tom Hardy",
      "Charlize Theron",
      "Nicholas Hoult"
    ],
    "desc": {
      "uz": "Post-apokaliptik sahroda Maks va Furiosa zolim hukmdordan qochib, cheksiz quvg‘inga tushadi.",
      "ru": "В постапокалиптической пустыне Макс и Фуриоса бегут от тирана сквозь бесконечную погоню."
    },
    "colors": [
      "#a8541e",
      "#201004"
    ],
    "poster": "images/mad-max-fury-road.jpg",
    "trailer": "https://www.youtube.com/watch?v=-3ZoAp6owdk",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/TELBA_MAKS_GAZAB_YOLIDA_1080.mp4",
    "featured": false,
    "addedAt": 1790252677867,
    "updatedAt": 1790252677867,
    "year": 2015,
    "duration": 120,
    "rating": 8.1,
    "director": "George Miller",
    "tags": [
      "Mad Max: Fury Road",
      "Mad Max"
    ]
  },
  {
    "id": 19,
    "slug": "shrek",
    "type": "multfilm",
    "title": {
      "uz": "Shrek",
      "ru": "Шрек"
    },
    "genres": [
      "comedy",
      "fantasy",
      "animation",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Mike Myers",
      "Eddie Murphy",
      "Cameron Diaz"
    ],
    "desc": {
      "uz": "Yolg‘izlikni sevuvchi ogr Shrek gapiruvchi eshak bilan malikani qutqarish safariga chiqadi.",
      "ru": "Огр Шрек вместе с говорящим Ослом отправляется спасать принцессу."
    },
    "colors": [
      "#4a7a24",
      "#111c07"
    ],
    "poster": "images/shrek.jpg",
    "trailer": "https://www.youtube.com/watch?v=1w1wBO-hlmA",
    "video": "http://topfilm.info/3/MULTIFILM/SHREK_1_720.mp4",
    "featured": false,
    "addedAt": 1790252613783,
    "updatedAt": 1790252613783,
    "year": 2001,
    "duration": 90,
    "rating": 7.9,
    "director": "Andrew Adamson",
    "tags": [
      "Shrek 1"
    ]
  },
  {
    "id": 18,
    "slug": "toy-story",
    "type": "multfilm",
    "title": {
      "uz": "O‘yinchoqlar hikoyasi",
      "ru": "История игрушек"
    },
    "genres": [
      "comedy",
      "animation",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tom Hanks",
      "Tim Allen",
      "Don Rickles"
    ],
    "desc": {
      "uz": "Kovboy o‘yinchoq Vudi uyga yangi kelgan kosmonavt Bazzni raqib deb biladi — ammo ular do‘st bo‘lishga majbur.",
      "ru": "Ковбой Вуди видит в новом игрушечном астронавте Баззе соперника — но им придётся стать друзьями."
    },
    "colors": [
      "#2b6fb5",
      "#0a1a2b"
    ],
    "poster": "images/toy-story.jpg",
    "trailer": "https://www.youtube.com/watch?v=A4sqe5q4b3Y",
    "video": "https://s9.faylmovi.ru/tarjima_kinolar/Oyinchoqlar_olami_1080.mp4",
    "featured": false,
    "addedAt": 1790252564013,
    "updatedAt": 1790252564013,
    "year": 1995,
    "duration": 81,
    "rating": 8.3,
    "director": "John Lasseter",
    "tags": [
      "Toy Story",
      "O‘yinchoqlar tarixi",
      "Oyinchoqlar hikoyasi 1"
    ]
  },
  {
    "id": 17,
    "slug": "coco",
    "type": "multfilm",
    "title": {
      "uz": "Koko",
      "ru": "Тайна Коко"
    },
    "genres": [
      "animation",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Anthony Gonzalez",
      "Gael García Bernal",
      "Benjamin Bratt"
    ],
    "desc": {
      "uz": "Musiqani sevuvchi bola Migel o‘liklar olamiga tushib qoladi va oilasining unutilgan sirini ochadi.",
      "ru": "Мальчик Мигель, мечтающий о музыке, попадает в Мир Мёртвых и раскрывает тайну своей семьи."
    },
    "colors": [
      "#8a3f7a",
      "#1c0c19"
    ],
    "poster": "images/coco.jpg",
    "trailer": "https://www.youtube.com/watch?v=HMnUSq3dC1g",
    "video": "http://topfilm.info/2/MULTIFILM/KOKO_siri_720.mp4",
    "featured": false,
    "addedAt": 1790252507999,
    "updatedAt": 1790252508000,
    "year": 2017,
    "duration": 105,
    "rating": 8.4,
    "director": "Lee Unkrich",
    "tags": [
      "Coco"
    ]
  },
  {
    "id": 2241,
    "slug": "the-amazing-spider-man-2",
    "type": "film",
    "title": {
      "uz": "Yangi Oʻrgimchak-odam 2",
      "ru": "Новый Человек-паук. Высокое напряжение"
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
      "Jamie Foxx",
      "Dane DeHaan"
    ],
    "desc": {
      "uz": "«Yangi Oʻrgimchak-odam 2» — 2014-yilgi AQSh filmi. Rejissyor: Marc Webb. Rollarda: Jamie Foxx, Dane DeHaan. Saytda rasmiy treyleri bor.",
      "ru": "«Новый Человек-паук: Высокое напряжение» — американский супергеройский фильм 2014 года по мотивам комиксов издательства Marvel Comics об одноимённом супергерое."
    },
    "tags": [
      "The Amazing Spider-Man 2",
      "Yangi O‘rgimchak odam 2"
    ],
    "colors": [
      "hsl(195 45% 28%)",
      "hsl(215 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/2/24/The_Amazing_Spider-Man_2_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=LeasTthmHgo",
    "video": "https://s7.faylmovi.ru/tarjima_kinolar/Yangi_orgimchak_odam_2014_Uzbek_1080.mp4",
    "featured": false,
    "addedAt": 1790252387149,
    "updatedAt": 1790252387149,
    "year": 2014,
    "duration": 142,
    "director": "Marc Webb"
  },
  {
    "id": 2224,
    "slug": "the-amazing-spider-man",
    "type": "film",
    "title": {
      "uz": "Yangi Oʻrgimchak-odam",
      "ru": "Новый Человек-паук"
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
      "Rhys Ifans",
      "Denis Leary"
    ],
    "desc": {
      "uz": "«Yangi Oʻrgimchak-odam» — 2012-yilgi AQSh filmi. Rejissyor: Marc Webb. Rollarda: Rhys Ifans, Denis Leary. Saytda rasmiy treyleri bor.",
      "ru": "«Новый Человек-паук» — американский супергеройский фильм 2012 года, основанный на персонаже Marvel Comics Человеке-пауке."
    },
    "tags": [
      "The Amazing Spider-Man",
      "Yangi O‘rgimchak odam 1"
    ],
    "colors": [
      "hsl(246 45% 28%)",
      "hsl(266 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/e/e0/The_Amazing_Spider-Man_%28film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=PxflbeTxW_k",
    "video": "https://kxcdn.ru/Yangi_Orgimchak_Odam_1_2012_HD_Daxshat.Net.mp4",
    "featured": false,
    "addedAt": 1790252344767,
    "updatedAt": 1790252344767,
    "year": 2012,
    "duration": 136,
    "director": "Marc Webb"
  },
  {
    "id": 2209,
    "slug": "spider-man-3",
    "type": "film",
    "title": {
      "uz": "Oʻrgimchak-odam 3",
      "ru": "Человек-паук 3: Враг в отражении"
    },
    "genres": [
      "action",
      "drama",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Thomas Haden Church",
      "Topher Grace",
      "Bryce Dallas Howard",
      "James Cromwell"
    ],
    "desc": {
      "uz": "«Oʻrgimchak-odam 3» — 2007-yilgi AQSh filmi. Rejissyor: Sam Raimi. Rollarda: Thomas Haden Church, Topher Grace, Bryce Dallas Howard. Saytda rasmiy treyleri bor.",
      "ru": "«Человек-паук 3: Враг в отражении» — американский полнометражный супергеройский фильм 2007 года, основанный на комиксах издательства Marvel Comics о супергерое Человеке-пауке."
    },
    "tags": [
      "Spider-Man 3",
      "O‘rgimchak odam 3"
    ],
    "colors": [
      "hsl(64 45% 28%)",
      "hsl(84 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/7/7a/Spider-Man_3%2C_International_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=XahuuJFdJSw",
    "video": "http://topfilm.info/3/tarjima_kinolar/o'rgimchak_odam_3_720.mp4",
    "featured": false,
    "addedAt": 1790252146953,
    "updatedAt": 1790252146953,
    "year": 2007,
    "duration": 139,
    "director": "Sam Raimi"
  },
  {
    "id": 2184,
    "slug": "spider-man-2",
    "type": "film",
    "title": {
      "uz": "Oʻrgimchak-odam 2",
      "ru": "Человек-паук 2"
    },
    "genres": [
      "action",
      "drama",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Kirsten Dunst",
      "James Franco",
      "Alfred Molina"
    ],
    "desc": {
      "uz": "«Oʻrgimchak-odam 2» — 2004-yilgi AQSh filmi. Rejissyor: Sam Raimi. Rollarda: Kirsten Dunst, James Franco, Alfred Molina. Saytda rasmiy treyleri bor.",
      "ru": "«Человек-паук 2» — американский супергеройский фильм 2004 года режиссёра Сэма Рэйми, снятый по сценарию Элвина Сарджента, написанному по сюжету Альфреда Гофа, Майлза Миллара и Майкла Шейбона, и основанный на комиксах издательства Marvel Comics о супергерое Человеке-пауке."
    },
    "tags": [
      "Spider-Man 2",
      "O‘rgimchak odam 2"
    ],
    "colors": [
      "hsl(63 45% 28%)",
      "hsl(83 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/4/4e/Spider-Man_2_USA_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=k-aOAUBeViI",
    "video": "http://topfilm.info/3/tarjima_kinolar/O'RGIMCHAK_ODAM_2_720.mp4",
    "featured": false,
    "addedAt": 1790252098683,
    "updatedAt": 1790252098683,
    "year": 2004,
    "duration": 122,
    "director": "Sam Raimi"
  },
  {
    "id": 2069,
    "slug": "spider-man",
    "type": "film",
    "title": {
      "uz": "Oʻrgimchak-odam",
      "ru": "Человек-паук"
    },
    "genres": [
      "action",
      "drama",
      "scifi"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Willem Dafoe",
      "Kirsten Dunst",
      "James Franco"
    ],
    "desc": {
      "uz": "«Oʻrgimchak-odam» — 2002-yilgi AQSh filmi. Rejissyor: Sam Raimi. Rollarda: Willem Dafoe, Kirsten Dunst, James Franco. Saytda rasmiy treyleri bor.",
      "ru": "«Человек-паук» — американский супергеройский фильм 2002 года режиссёра Сэма Рэйми, снятый по сценарию Дэвида Кеппа и основанный на комиксах издательства Marvel Comics об одноимённом супергерое."
    },
    "tags": [
      "Spider-Man",
      "Spider-Man 2002",
      "O‘rgimchak odam 1",
      "Spider-Man 1"
    ],
    "colors": [
      "hsl(354 45% 28%)",
      "hsl(14 50% 7%)"
    ],
    "poster": "https://upload.wikimedia.org/wikipedia/en/6/6c/Spider-Man_%282002_film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "trailer": "https://www.youtube.com/watch?v=KLLhImjJ1NI",
    "video": "http://topfilm.info/3/tarjima_kinolar/O'RGIMCHAK_ODAM_720.mp4",
    "featured": false,
    "addedAt": 1790252060003,
    "updatedAt": 1790252060003,
    "year": 2002,
    "duration": 121,
    "director": "Sam Raimi"
  },
  {
    "id": 149,
    "slug": "spider-man-brand-new-day",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak-odam: Butunlay yangi kun",
      "ru": "Человек-паук: Совершенно новый день"
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
      "Sadie Sink",
      "Jon Bernthal",
      "Mark Ruffalo"
    ],
    "desc": {
      "uz": "Hamma uni unutgach, Piter Parker yolg‘iz qolib Nyu-Yorkni himoya qiladi. Charchoq tufayli kuchlari o‘zgara boshlaydi, shahar esa yangi telepatik tahdidga duch keladi.",
      "ru": "После того как все забыли о нём, Питер Паркер в одиночку защищает Нью-Йорк. Из-за переутомления его силы начинают меняться, а городу угрожает новый телепат."
    },
    "tags": [
      "Marvel",
      "spider man brand new day",
      "Spider-Man: Brand New Day",
      "Spider-Man 4",
      "O‘rgimchak odam 4"
    ],
    "colors": [
      "#8a1a24",
      "#0a1a3a"
    ],
    "poster": "images/marvel/spider-man-brand-new-day.jpg",
    "trailer": "https://www.youtube.com/watch?v=lnODSdqErm0",
    "video": "https://s2.faylmovi.ru/tarjima_kinolar/Orgimchak_odam_Yangi_kun_480.mp4",
    "featured": false,
    "addedAt": 1790251977109,
    "updatedAt": 1790251977109,
    "year": 2026,
    "director": "Destin Daniel Cretton",
    "franchise": "marvel"
  },
  {
    "id": 135,
    "slug": "spider-man-far-from-home",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak-odam: Uydan uzoqda",
      "ru": "Человек-паук: Вдали от дома"
    },
    "genres": [
      "action",
      "comedy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tom Holland",
      "Jake Gyllenhaal",
      "Zendaya",
      "Samuel L. Jackson"
    ],
    "desc": {
      "uz": "Piter sinfdoshlari bilan Yevropaga sayohatga chiqadi. Ammo Nik Fyuri uni sirli qahramon Misterio bilan birga yangi tahdidga qarshi kurashga chaqiradi.",
      "ru": "Питер едет с одноклассниками в Европу. Но Ник Фьюри призывает его вместе с таинственным Мистерио сразиться с новой угрозой."
    },
    "tags": [
      "Marvel",
      "spider man far from home",
      "Spider-Man: Far From Home",
      "O‘rgimchak odam: Uydan uzoqda"
    ],
    "colors": [
      "#2a2a6b",
      "#8a1a24"
    ],
    "poster": "images/marvel/spider-man-far-from-home.jpg",
    "trailer": "https://www.youtube.com/watch?v=zx9vpIzH1u4",
    "video": "https://d.uzbeklar.biz/film/orgimchakuydan.mp4",
    "featured": false,
    "addedAt": 1790251595154,
    "updatedAt": 1790251595154,
    "year": 2019,
    "duration": 129,
    "rating": 7.4,
    "director": "Jon Watts",
    "franchise": "marvel"
  },
  {
    "id": 43,
    "slug": "into-the-spider-verse",
    "type": "multfilm",
    "title": {
      "uz": "O‘rgimchak-odam: Olamlar uzra",
      "ru": "Человек-паук: Через вселенные"
    },
    "genres": [
      "action",
      "animation",
      "adventure",
      "family"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Shameik Moore",
      "Jake Johnson",
      "Hailee Steinfeld",
      "Mahershala Ali"
    ],
    "desc": {
      "uz": "O‘smir Mayls Morales boshqa olamlardan kelgan O‘rgimchak-odamlar bilan uchrashadi va o‘z qahramonligini topishi kerak.",
      "ru": "Подросток Майлз Моралес встречает Людей-пауков из других вселенных и должен найти собственного героя внутри себя."
    },
    "tags": [
      "Spider-Man",
      "O‘rgimchak",
      "Человек-паук",
      "Spider-Man: Into the Spider-Verse",
      "O‘rgimchak odam: Olamlar uzra",
      "O‘rgimchak-odam multfilm"
    ],
    "colors": [
      "#7a1e6b",
      "#160518"
    ],
    "poster": "images/into-the-spider-verse.png",
    "trailer": "https://www.youtube.com/watch?v=LQRvEknx6OU",
    "video": "https://d.uzbeklar.biz/film/yondosholamlar.mp4",
    "featured": false,
    "addedAt": 1790251517879,
    "updatedAt": 1790251517879,
    "year": 2018,
    "duration": 117,
    "rating": 8.4,
    "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    "franchise": "marvel"
  },
  {
    "id": 132,
    "slug": "spider-man-homecoming",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak-odam: Uyga qaytish",
      "ru": "Человек-паук: Возвращение домой"
    },
    "genres": [
      "action",
      "comedy",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Tom Holland",
      "Michael Keaton",
      "Robert Downey Jr.",
      "Zendaya"
    ],
    "desc": {
      "uz": "Yosh Piter Parker maktab hayoti va qahramonlik orasida qolib ketadi. U Toni Starkka o‘zini isbotlash uchun xavfli Kalxatga qarshi chiqadi.",
      "ru": "Юный Питер Паркер разрывается между школой и геройством. Чтобы доказать себя Тони Старку, он выходит против опасного Стервятника."
    },
    "tags": [
      "Marvel",
      "spider man homecoming",
      "Spider-Man: Homecoming",
      "O‘rgimchak odam: Uyga qaytish"
    ],
    "colors": [
      "#8a1a24",
      "#140408"
    ],
    "poster": "images/marvel/spider-man-homecoming.jpg",
    "trailer": "https://www.youtube.com/watch?v=9ibCwrDbp-8",
    "video": "http://topfilm.info/3/tarjima_kinolar/O'RGIMCHAK_ODAM_UYGA_QAYTISH_720.mp4",
    "featured": false,
    "addedAt": 1790172315804,
    "updatedAt": 1790172315804,
    "year": 2017,
    "duration": 133,
    "rating": 7.4,
    "director": "Jon Watts",
    "franchise": "marvel"
  },
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
      "Человек-паук",
      "Spider-Man: No Way Home",
      "O‘rgimchak odam: Uyga yo‘l yo‘q",
      "O‘rgimchak-odam 3 (Tom Holland)"
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
      "black panther wakanda forever",
      "Black Panther: Wakanda Forever",
      "Qora pantera 2"
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
    "franchise": "marvel",
    "tags": [
      "Black Panther",
      "Qora pantera 1"
    ]
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
      "doctor strange multiverse of madness",
      "Doctor Strange in the Multiverse of Madness",
      "Doktor Streyndj 2",
      "Doktor Strenj 2"
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
    "franchise": "marvel",
    "tags": [
      "Doctor Strange",
      "Doktor Strenj"
    ]
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
      "captain america brave new world",
      "Captain America: Brave New World",
      "Kapitan Amerika 4"
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
      "captain america civil war",
      "Captain America: Civil War",
      "Kapitan Amerika 3",
      "Kapitan Amerika: Qarama-qarshilik"
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
      "captain america the first avenger",
      "Captain America: The First Avenger",
      "Kapitan Amerika 1"
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
    "franchise": "marvel",
    "tags": [
      "Captain America: The Winter Soldier",
      "Kapitan Amerika 2",
      "Kapitan Amerika: Qishki askar"
    ]
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
      "guardians of the galaxy vol 3",
      "Guardians of the Galaxy Vol. 3"
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
      "guardians of the galaxy vol 2",
      "Guardians of the Galaxy Vol. 2"
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
    "franchise": "marvel",
    "tags": [
      "Guardians of the Galaxy",
      "Galaktika qo‘riqchilari 1"
    ]
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
    "trailer": "https://youtu.be/d6S5dbxonl8?si=wcsNwNeEZluCQIPe",
    "video": "https://kinolar.tv/75bdf9e4-e916-4088-9f80-d2df64f7fc4d",
    "featured": false,
    "addedAt": 1790170603056,
    "updatedAt": 1790704862188,
    "year": 2018,
    "duration": 149,
    "rating": 8.4,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel",
    "tags": [
      "Avengers: Infinity War",
      "Qasoskorlar 3",
      "Qasoskorlar: Cheksiz urush",
      "Мстители 3"
    ]
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
    "trailer": "https://kinolar.tv/07e12638-85b0-4ea8-aff0-b412402b0d04",
    "video": "https://kinolar.tv/07e12638-85b0-4ea8-aff0-b412402b0d04",
    "featured": false,
    "addedAt": 1790170530090,
    "updatedAt": 1790705038066,
    "year": 2012,
    "duration": 143,
    "rating": 8,
    "director": "Joss Whedon",
    "franchise": "marvel",
    "tags": [
      "The Avengers",
      "Avengers",
      "Qasoskorlar 1",
      "Мстители 1"
    ]
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
    "director": "Frank Darabont",
    "tags": [
      "The Shawshank Redemption",
      "Shoushenkdan qochish"
    ]
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
      "John Wick: Chapter 4",
      "John Wick 4"
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
      "John Wick: Chapter 3 – Parabellum",
      "John Wick 3",
      "Jon Uik 3",
      "Jon Uik 3: Parabellum"
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
      "John Wick: Chapter 2",
      "Jon Uik 2"
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
    "director": "Chad Stahelski",
    "tags": [
      "John Wick",
      "John Wick 1",
      "Jon Uik 1",
      "Jon Vik"
    ]
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
      "Avatar: Fire and Ash",
      "Avatar: Olov va kul"
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
      "Avatar: The Way of Water",
      "Avatar 2",
      "Avatar: Suv yoli"
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
    "trailer": "https://www.youtube.com/watch?v=Do6UmtsxHY8",
    "video": "https://d.uzbeklar.biz/film/avatar1.mp4",
    "featured": false,
    "addedAt": 1790166238215,
    "updatedAt": 1790770826953,
    "tags": [
      "Avatar 1",
      "Avatar 2009"
    ],
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
    "director": "James Cameron",
    "tags": [
      "Titanic"
    ]
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
    "director": "Ridley Scott",
    "tags": [
      "Gladiator 2000"
    ]
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
    "director": "Lana & Lilly Wachowski",
    "tags": [
      "The Matrix",
      "Matrix"
    ]
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
    "director": "Robert Zemeckis",
    "tags": [
      "Forrest Gump"
    ]
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
    "director": "Francis Ford Coppola",
    "tags": [
      "The Godfather",
      "Choqintirgan ota"
    ]
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
      "Tony Stark",
      "Iron Man",
      "Temir odam 1",
      "Temir odam (2008)"
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
    "director": "Michael Bay",
    "tags": [
      "Transformers: Age of Extinction",
      "Transformers 4",
      "Transformerlar 4"
    ]
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
    "director": "Michael Bay",
    "tags": [
      "Transformers: The Last Knight",
      "Transformers 5",
      "Transformerlar 5"
    ]
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
    "director": "Michael Bay",
    "tags": [
      "Transformers: Revenge of the Fallen",
      "Transformers 2",
      "Transformerlar 2"
    ]
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
    "director": "Michael Bay",
    "tags": [
      "Transformers: Dark of the Moon",
      "Transformers 3",
      "Transformerlar 3"
    ]
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
      "Transformers",
      "Transformers 1",
      "Transformerlar 1"
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
      "avengers age of ultron",
      "Avengers: Age of Ultron",
      "Qasoskorlar 2",
      "Qasoskorlar: Ultron davri",
      "Мстители 2"
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
    "director": "Christopher Nolan",
    "tags": [
      "Oppenheimer"
    ]
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
      "Бэтмен",
      "The Batman",
      "Betmen 2022",
      "Batman 2022"
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
    "director": "Denis Villeneuve",
    "tags": [
      "Dune",
      "Dyuna 1"
    ]
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
    "director": "Bong Joon-ho",
    "tags": [
      "Parasite"
    ]
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
      "thunderbolts",
      "Thunderbolts*",
      "Momaqaldiroqlar"
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
    "director": "Johan Renck",
    "tags": [
      "Chernobyl",
      "Chernobl"
    ]
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
      "Sonic the Hedgehog 3",
      "Sonik 3"
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
      "Joker",
      "The Dark Knight",
      "Qorongu ritsar",
      "Betmen 2"
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
    "director": "Christopher Nolan",
    "tags": [
      "Inception"
    ]
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
    "director": "Christopher Nolan",
    "tags": [
      "Interstellar"
    ]
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
    "tags": [
      "Qasoskorlar: Intiho",
      "Qasoskorlar 4",
      "Avengers: Endgame",
      "Мстители 4"
    ],
    "colors": [
      "#2a4a5a",
      "#08131a"
    ],
    "poster": "images/avengers-endgame.jpg",
    "trailer": "https://www.youtube.com/watch?v=Io2dwq7B7xM",
    "video": "https://dezocloud.uz/s/ZtKA-GdHEolSWUGnSf_qHuYw",
    "featured": true,
    "addedAt": 1789802968800,
    "updatedAt": 1790314500737,
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
    "audio": "uz",
    "tags": [
      "Ralph Breaks the Internet",
      "Ralf 2",
      "Ralf internetni buzadi"
    ]
  },
  {
    "id": 22,
    "slug": "fight-club",
    "year": 1999,
    "type": "film",
    "title": {
      "uz": "Jangovar klub",
      "ru": "Бойцовский клуб"
    },
    "genres": [
      "drama",
      "thriller"
    ],
    "rating": 8.8,
    "duration": 139,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "David Fincher",
    "cast": [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter"
    ],
    "desc": {
      "uz": "Uyqusizlikdan aziyat chekayotgan ofis xodimi sirli Tayler Durden bilan yashirin jangovar klub tashkil qiladi.",
      "ru": "Страдающий бессонницей клерк вместе с загадочным Тайлером Дёрденом создаёт подпольный бойцовский клуб."
    },
    "colors": [
      "#5a3030",
      "#140808"
    ],
    "poster": "images/fight-club.jpg",
    "trailer": "https://www.youtube.com/watch?v=C7-7qQ61QHU",
    "video": "",
    "featured": false,
    "tags": [
      "Fight Club"
    ]
  },
  {
    "id": 30,
    "slug": "wednesday",
    "year": 2022,
    "type": "serial",
    "title": {
      "uz": "Uednsdey",
      "ru": "Уэнсдэй"
    },
    "genres": [
      "detective",
      "comedy",
      "fantasy"
    ],
    "rating": 8.1,
    "seasons": 2,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Tim Burton",
    "cast": [
      "Jenna Ortega",
      "Catherine Zeta-Jones",
      "Gwendoline Christie"
    ],
    "desc": {
      "uz": "Uednsdey Addams sirli akademiyada o‘qiy boshlaydi va shaharni qo‘rquvda saqlayotgan qotilliklarni tergov qiladi.",
      "ru": "Уэнсдэй Аддамс поступает в загадочную академию и расследует серию убийств."
    },
    "colors": [
      "#2a4a42",
      "#080f0d"
    ],
    "poster": "images/wednesday.jpg",
    "trailer": "https://www.youtube.com/watch?v=zUyGvjsc6zo",
    "video": "",
    "featured": false,
    "tags": [
      "Wednesday",
      "Uensdey"
    ]
  },
  {
    "id": 42,
    "slug": "deadpool",
    "year": 2016,
    "type": "film",
    "franchise": "marvel",
    "title": {
      "uz": "Dedpul",
      "ru": "Дэдпул"
    },
    "genres": [
      "action",
      "comedy",
      "adventure"
    ],
    "rating": 8,
    "duration": 108,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Tim Miller",
    "cast": [
      "Ryan Reynolds",
      "Morena Baccarin",
      "Ed Skrein",
      "T.J. Miller"
    ],
    "desc": {
      "uz": "Shafqatsiz tajribadan so‘ng g‘ayritabiiy qobiliyat olgan yollanma askar o‘ziga qilingan yomonlik uchun hazil-huzul bilan o‘ch oladi.",
      "ru": "Получивший сверхспособности после жестокого эксперимента наёмник мстит своим мучителям — с фирменным чёрным юмором."
    },
    "colors": [
      "#8a1e1e",
      "#1a0606"
    ],
    "poster": "images/deadpool.png",
    "trailer": "https://www.youtube.com/watch?v=EmH6VNG8QEE",
    "video": "",
    "featured": false,
    "tags": [
      "Deadpool",
      "Dedpul 1",
      "Deadpool 1"
    ]
  },
  {
    "id": 45,
    "slug": "the-dark-knight-rises",
    "year": 2012,
    "type": "film",
    "franchise": "dc",
    "title": {
      "uz": "Qorong‘u ritsar qaytadi",
      "ru": "Тёмный рыцарь: Возрождение легенды"
    },
    "genres": [
      "action",
      "crime",
      "drama"
    ],
    "rating": 8.4,
    "duration": 164,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Christopher Nolan",
    "cast": [
      "Christian Bale",
      "Tom Hardy",
      "Anne Hathaway",
      "Gary Oldman"
    ],
    "desc": {
      "uz": "Sakkiz yillik sukunatdan so‘ng Betmen Gotemni Beyn ismli shafqatsiz kuchdan himoya qilish uchun qaytadi.",
      "ru": "После восьми лет затишья Бэтмен возвращается, чтобы защитить Готэм от беспощадного Бэйна."
    },
    "tags": [
      "Batman",
      "Betmen",
      "Бэтмен",
      "Bane",
      "The Dark Knight Rises",
      "Betmen 3"
    ],
    "colors": [
      "#3a3a44",
      "#0a0a0e"
    ],
    "poster": "images/the-dark-knight-rises.jpg",
    "trailer": "https://www.youtube.com/watch?v=MytbeYrN1R8",
    "video": "",
    "featured": false
  },
  {
    "id": 54,
    "slug": "alien",
    "year": 1979,
    "type": "film",
    "title": {
      "uz": "Yot mavjudot",
      "ru": "Чужой"
    },
    "genres": [
      "horror",
      "scifi",
      "thriller"
    ],
    "rating": 8.5,
    "duration": 117,
    "country": {
      "uz": "Buyuk Britaniya, AQSh",
      "ru": "Великобритания, США"
    },
    "director": "Ridley Scott",
    "cast": [
      "Sigourney Weaver",
      "Tom Skerritt",
      "John Hurt",
      "Ian Holm"
    ],
    "desc": {
      "uz": "Yuk kemasi ekipaji noma’lum signalga javob beradi va bortga olamdagi eng mukammal yirtqichni olib kiradi.",
      "ru": "Экипаж грузового корабля отвечает на неизвестный сигнал и приносит на борт совершенного хищника."
    },
    "colors": [
      "#1e2a2a",
      "#060a0a"
    ],
    "poster": "images/alien.jpg",
    "trailer": "https://www.youtube.com/watch?v=xIe98nyo3xI",
    "video": "",
    "featured": false,
    "tags": [
      "Alien",
      "Yot mavjudot 1"
    ]
  },
  {
    "id": 58,
    "slug": "lotr-fellowship",
    "year": 2001,
    "type": "film",
    "title": {
      "uz": "Uzuklar hukmdori: Uzuk hamrohlari",
      "ru": "Властелин колец: Братство Кольца"
    },
    "genres": [
      "fantasy",
      "adventure",
      "drama"
    ],
    "rating": 8.9,
    "duration": 178,
    "country": {
      "uz": "Yangi Zelandiya, AQSh",
      "ru": "Новая Зеландия, США"
    },
    "director": "Peter Jackson",
    "cast": [
      "Elijah Wood",
      "Ian McKellen",
      "Viggo Mortensen",
      "Sean Astin"
    ],
    "desc": {
      "uz": "Yosh xobbit Frodo olamni qulatishi mumkin bo‘lgan Uzukni yo‘q qilish uchun to‘qqiz nafar hamroh bilan yo‘lga chiqadi.",
      "ru": "Юный хоббит Фродо с восемью спутниками отправляется уничтожить Кольцо, способное погубить мир."
    },
    "tags": [
      "LOTR",
      "Lord of the Rings",
      "Властелин колец",
      "Tolkien",
      "The Lord of the Rings: The Fellowship of the Ring",
      "Uzuklar hukmdori 1"
    ],
    "colors": [
      "#3a4a2a",
      "#0c1008"
    ],
    "poster": "images/lotr-fellowship.jpg",
    "trailer": "https://www.youtube.com/watch?v=RNksw9VU2BQ",
    "video": "",
    "featured": true
  },
  {
    "id": 60,
    "slug": "arrival",
    "year": 2016,
    "type": "film",
    "title": {
      "uz": "Kelish",
      "ru": "Прибытие"
    },
    "genres": [
      "scifi",
      "drama",
      "thriller"
    ],
    "rating": 7.9,
    "duration": 116,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Denis Villeneuve",
    "cast": [
      "Amy Adams",
      "Jeremy Renner",
      "Forest Whitaker"
    ],
    "desc": {
      "uz": "Yerga o‘n ikkita sirli kema qo‘nadi. Tilshunos olim ular bilan muloqot yo‘lini topishi kerak — vaqt tugab bormoqda.",
      "ru": "На Землю садятся двенадцать загадочных кораблей. Лингвист должна найти способ общения с пришельцами, пока не поздно."
    },
    "colors": [
      "#3a4a5a",
      "#0c1014"
    ],
    "poster": "images/arrival.jpg",
    "trailer": "https://www.youtube.com/watch?v=7u7xTg0ZlDo",
    "video": "",
    "featured": false,
    "tags": [
      "Arrival"
    ]
  },
  {
    "id": 70,
    "slug": "uz-borilar-2-quvgin",
    "year": 2008,
    "type": "film",
    "franchise": "uzbek",
    "title": {
      "uz": "Bo'rilar 2 – quvg'in",
      "ru": "Bo'rilar 2 – quvg'in"
    },
    "genres": [
      "drama"
    ],
    "duration": 100,
    "country": {
      "uz": "O‘zbekiston",
      "ru": "Узбекистан"
    },
    "director": "Zebo Navruzova",
    "cast": [
      "Shohruhxon",
      "Nilufar Usmonova",
      "Jalil Mavlonov",
      "Bekzod Tojiyev",
      "Ulug'bek Tuganov",
      "Nasrulloh Nurov"
    ],
    "desc": {
      "uz": "«Bo'rilar 2 – quvg'in» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      "ru": "Узбекский фильм «Bo'rilar 2 – quvg'in». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    "colors": [
      "#5a3a2a",
      "#140c08"
    ],
    "poster": "images/uz/borilar-2-quvgin.jpg",
    "video": "https://www.youtube.com/watch?v=kzTOyuHWEUM",
    "source": {
      "name": "UzbekFilmsHD (RizaNova)",
      "url": "https://www.youtube.com/@UzbekFilmsHD"
    },
    "featured": false,
    "tags": [
      "Borilar 2",
      "Bo‘rilar 2"
    ]
  },
  {
    "id": 71,
    "slug": "uz-borilar",
    "year": 2007,
    "type": "film",
    "franchise": "uzbek",
    "title": {
      "uz": "Bo'rilar",
      "ru": "Bo'rilar"
    },
    "genres": [
      "drama"
    ],
    "duration": 90,
    "country": {
      "uz": "O‘zbekiston",
      "ru": "Узбекистан"
    },
    "director": "Zebo Navruzova",
    "cast": [
      "Shohruhxon",
      "Bekzod Tojiyev",
      "Adiz Rajabov",
      "Nilufar Usmonova",
      "Jalil Mavlonov",
      "Jamshid Abduazimov"
    ],
    "desc": {
      "uz": "«Bo'rilar» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      "ru": "Узбекский фильм «Bo'rilar». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    "colors": [
      "#2a4a5a",
      "#081014"
    ],
    "poster": "images/uz/borilar.jpg",
    "video": "https://www.youtube.com/watch?v=VWNbZRyrqWg",
    "source": {
      "name": "UzbekFilmsHD (RizaNova)",
      "url": "https://www.youtube.com/@UzbekFilmsHD"
    },
    "featured": false,
    "tags": [
      "Borilar",
      "Bo‘rilar 1"
    ]
  },
  {
    "id": 122,
    "slug": "the-incredible-hulk",
    "year": 2008,
    "type": "film",
    "franchise": "marvel",
    "title": {
      "uz": "Aql bovar qilmas Xalk",
      "ru": "Невероятный Халк"
    },
    "genres": [
      "action",
      "scifi",
      "adventure"
    ],
    "rating": 6.6,
    "duration": 112,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Louis Leterrier",
    "cast": [
      "Edward Norton",
      "Liv Tyler",
      "Tim Roth",
      "William Hurt"
    ],
    "desc": {
      "uz": "Olim Bryus Benner g‘azablanganda ulkan yashil maxluqqa aylanadi. U davosini izlab yashirinadi, harbiylar esa uni qo‘lga olish uchun yangi qurol yaratadi.",
      "ru": "Учёный Брюс Бэннер в гневе превращается в огромного зелёного монстра. Он скрывается в поисках лекарства, а военные создают против него новое оружие."
    },
    "tags": [
      "Marvel",
      "the incredible hulk",
      "Xalk",
      "Hulk"
    ],
    "colors": [
      "#2f5a24",
      "#0a1406"
    ],
    "poster": "images/marvel/the-incredible-hulk.jpg",
    "trailer": "https://www.youtube.com/watch?v=_-iXjRm3jG0",
    "video": "",
    "featured": false
  },
  {
    "id": 129,
    "slug": "ant-man",
    "year": 2015,
    "type": "film",
    "franchise": "marvel",
    "title": {
      "uz": "Chumoli-odam",
      "ru": "Человек-муравей"
    },
    "genres": [
      "action",
      "comedy",
      "scifi"
    ],
    "rating": 7.3,
    "duration": 117,
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "director": "Peyton Reed",
    "cast": [
      "Paul Rudd",
      "Michael Douglas",
      "Evangeline Lilly",
      "Corey Stoll"
    ],
    "desc": {
      "uz": "Sobiq o‘g‘ri Skott Lang kichrayish qobiliyatini beradigan kostyumni qo‘lga kiritadi. Olim Xenk Pim unga xavfli texnologiyani yovuzlardan saqlashda yordam berishni topshiradi.",
      "ru": "Бывший вор Скотт Лэнг получает костюм, позволяющий уменьшаться. Учёный Хэнк Пим поручает ему защитить опасную технологию от злодеев."
    },
    "tags": [
      "Marvel",
      "ant man",
      "Ant-Man",
      "Chumoli odam 1"
    ],
    "colors": [
      "#6b1a1a",
      "#120404"
    ],
    "poster": "images/marvel/ant-man.jpg",
    "trailer": "https://www.youtube.com/watch?v=Vc0GhqtIteo",
    "video": "",
    "featured": false
  },
  {
    "id": 150,
    "slug": "avengers-doomsday",
    "year": 2026,
    "type": "film",
    "franchise": "marvel",
    "title": {
      "uz": "Qasoskorlar: Qiyomat kuni",
      "ru": "Мстители: Судный день"
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
    "director": "Anthony Russo, Joe Russo",
    "cast": [
      "Robert Downey Jr.",
      "Chris Hemsworth",
      "Anthony Mackie",
      "Pedro Pascal",
      "Florence Pugh"
    ],
    "desc": {
      "uz": "«Qasoskorlar: Final»ning davomi. Qasoskorlar, Vakanda, Fantastik to‘rtlik va X-odamlar turli olamlardan birlashib, Doktor Dumga qarshi chiqadi. Chiqish sanasi — 2026-yil dekabr (kutilmoqda). Hozircha faqat treyler.",
      "ru": "Продолжение «Мстителей: Финал». Мстители, Ваканда, Фантастическая четвёрка и Люди Икс из разных вселенных объединяются против Доктора Дума. Выход — декабрь 2026 года (ожидается). Пока доступен только трейлер."
    },
    "tags": [
      "Marvel",
      "avengers doomsday",
      "Tez orada",
      "Скоро",
      "Avengers: Doomsday",
      "Qasoskorlar 5"
    ],
    "colors": [
      "#2a4a2a",
      "#050a05"
    ],
    "poster": "images/marvel/avengers-doomsday.jpg",
    "trailer": "https://www.youtube.com/watch?v=O7DjtgMfNKw",
    "video": "",
    "featured": false
  },
  {
    "id": 2983,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n342-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n342-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RJYjJAo7lH7e?s=ubgnoYYRXZBkvdXmZPkO8UK_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ubgnoYYRXZBkvdXmZPkO8UK_",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2984,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n341-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n341-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/A8RyUnGsv7v-?s=uEBsHufVr2OIMkDwfrfyOzr7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uEBsHufVr2OIMkDwfrfyOzr7",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2985,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n340-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n340-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NlBXpeca9bRr?s=RTxRnyO6vRjJa5Z9Tu3f9NK0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RTxRnyO6vRjJa5Z9Tu3f9NK0",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2986,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n339-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n339-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yfgD5wRdMKeR?s=NhRX-lm3AjHKtUKXrOycx9ld",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NhRX-lm3AjHKtUKXrOycx9ld",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2987,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n338-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n338-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nQCaIj2FVVjl?s=jZv8yFbnfSvaN32qler0iqY3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jZv8yFbnfSvaN32qler0iqY3",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2988,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n337-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n337-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_1mz1R31j0z8?s=0lVLWjS3RplR7Wq1zigNQjBT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0lVLWjS3RplR7Wq1zigNQjBT",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2989,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n336-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n336-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/EjVhJqmdEVFR?s=s5f0MDyHA6wHuyl_q1mbkBtM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/s5f0MDyHA6wHuyl_q1mbkBtM",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2990,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n335-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n335-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jkJWd-fHmSk9?s=g43OiyoeaHHc4D2CsvrlqsjG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/g43OiyoeaHHc4D2CsvrlqsjG",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2991,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n334-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n334-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/llyo6RacAP1s?s=-t9CXo0rKxXP5OGbXc1C-CNV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-t9CXo0rKxXP5OGbXc1C-CNV",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2992,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n333-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n333-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WdNWRTgVY0eG?s=KR-hlrgB9NfTU8HrfSF04lPa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KR-hlrgB9NfTU8HrfSF04lPa",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2993,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n332-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n332-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sqV__ErN5YOU?s=NPmCSGv7RH5j2Za2L3Jxh4AO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NPmCSGv7RH5j2Za2L3Jxh4AO",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2994,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n331-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n331-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/XHpBuNCWtBaf?s=IqNGxTGyFH8UqZefODTNIRYj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IqNGxTGyFH8UqZefODTNIRYj",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2995,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n330-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n330-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7uJADc5LVqJW?s=gzdf3O_zbnSEtlLg_OnDyvW2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gzdf3O_zbnSEtlLg_OnDyvW2",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2996,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n329-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n329-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TrsoKu2BvNHo?s=YcSXg2y4lPdsJ6anLpphCa8e",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YcSXg2y4lPdsJ6anLpphCa8e",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2997,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n328-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n328-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DlpZ8BnhUYmL?s=H_mD9uu1I00WAGxfScgqL3bb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/H_mD9uu1I00WAGxfScgqL3bb",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2998,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n327-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n327-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iVOwH5Y2_gCf?s=KqoAgWMVAEIjOj7YhYxt1uJ6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KqoAgWMVAEIjOj7YhYxt1uJ6",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2999,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n326-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n326-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Odyq4uY0KmTe?s=N4nwY1yaVz72wW6IpCjjRASa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/N4nwY1yaVz72wW6IpCjjRASa",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3000,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n325-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n325-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6Ecovy8fb8VI?s=kQyiV8kO_0oV0Xo_bU2naFKM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kQyiV8kO_0oV0Xo_bU2naFKM",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3001,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n324-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n324-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/B3DKnDUhQIOR?s=cxAfUYMIV65QBch_W13CmEOr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cxAfUYMIV65QBch_W13CmEOr",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3002,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n323-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n323-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MAkYcZ3AfxGu?s=VDDXms9RxJza04Xt_d1Jt8DK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VDDXms9RxJza04Xt_d1Jt8DK",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3003,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n322-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n322-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bx6zZllta5Jp?s=-UUARwKQxYUZ2msAQzaCThCH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-UUARwKQxYUZ2msAQzaCThCH",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3004,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n321-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n321-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JXpT0jfGeIF9?s=E4pd6n-1h-FE1N_Cs_dH1P0x",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E4pd6n-1h-FE1N_Cs_dH1P0x",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3005,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n320-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n320-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ifIDZ9jYyHXl?s=dolaDk-oA6c13XekcqNgpCmx",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dolaDk-oA6c13XekcqNgpCmx",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 37,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3006,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n319-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n319-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TLCxBYLjPdok?s=jW09ENGq8z0OJ9JNXPgHGT1w",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jW09ENGq8z0OJ9JNXPgHGT1w",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3007,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n318-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n318-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3MBeRIndqcmF?s=WvWjfq4nLe_JammTtU1JG0RJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WvWjfq4nLe_JammTtU1JG0RJ",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3008,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n317-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n317-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vCe6qWSBXC2e?s=8ISH9FQqkuhyUdxgazCH3ika",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8ISH9FQqkuhyUdxgazCH3ika",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3009,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n316-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n316-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iBw2B0IQ-uFL?s=JLdhmkgbZoPpn8cbfdgG8J2_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JLdhmkgbZoPpn8cbfdgG8J2_",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3010,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n315-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n315-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3scOb_h--Rei?s=g8MTl3GsXtZl9EqdxQfIADpO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/g8MTl3GsXtZl9EqdxQfIADpO",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3011,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n314-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n314-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bje9yHWJSVum?s=nA5PpOO6z-wpYuK-l7drBk-4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nA5PpOO6z-wpYuK-l7drBk-4",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3012,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n313-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n313-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/E6TlVg-5MfT2?s=LWc7qLcTLySebdEadZIHddh8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LWc7qLcTLySebdEadZIHddh8",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3013,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n312-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n312-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ew4McAGSYrhe?s=clB1IFaw_6VKR1k6sqGmdPAn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/clB1IFaw_6VKR1k6sqGmdPAn",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3014,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n311-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n311-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yBwUXC_69QeU?s=EKn2dhar0dS0x5d6sQVd2YXQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EKn2dhar0dS0x5d6sQVd2YXQ",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3015,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n310-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n310-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/szSXppge7dL8?s=elQ3UDdBdHyv6hhnKK3-vmG0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/elQ3UDdBdHyv6hhnKK3-vmG0",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 54,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3016,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n309-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n309-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/coT0Q_wtQFD1?s=VU1ZmAZneBYYFm43rX_pCHhm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VU1ZmAZneBYYFm43rX_pCHhm",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3017,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n308-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n308-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dqyhxJB78lSw?s=aSYuqlD0oRD5bdcYz9weRTq8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aSYuqlD0oRD5bdcYz9weRTq8",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3018,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n307-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n307-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Jkzkm4tsrKDr?s=m6fJQLWOMPYgT8tUB2rwrDn_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/m6fJQLWOMPYgT8tUB2rwrDn_",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3019,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n306-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n306-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DIfUIIWIItzE?s=6CJ8wy47oEogpbCn0c6-SiCW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6CJ8wy47oEogpbCn0c6-SiCW",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3020,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n305-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n305-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Mb8JenaD9Y9q?s=sD2OSOqev0qI9sM7oRr9YO63",
    "trailer": "",
    "video": "https://dezocloud.uz/s/sD2OSOqev0qI9sM7oRr9YO63",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3021,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n304-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n304-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_g0jhqeayHAo?s=p02uUW95y5ejCuoqnsaIsgJx",
    "trailer": "",
    "video": "https://dezocloud.uz/s/p02uUW95y5ejCuoqnsaIsgJx",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3022,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n303-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n303-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/r3Wz162O3fDY?s=UohQs-mJxM6BM_zhf1El2-id",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UohQs-mJxM6BM_zhf1El2-id",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3023,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n302-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n302-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IzTV6sIc5VQJ?s=FIxUAdGuZvftM5bhhj4qqumO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/FIxUAdGuZvftM5bhhj4qqumO",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3024,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n301-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n301-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/d5u9L8voMDl8?s=-SKnQNcj0alnRVrZjQ9LkYiN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-SKnQNcj0alnRVrZjQ9LkYiN",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3025,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n300-қисм\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n300-қисм\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9bhmvIIEeDPJ?s=ZFzDIiR1rzcFfvaowB6P-aW6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZFzDIiR1rzcFfvaowB6P-aW6",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3026,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n299-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n299-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eGT4y-kq5zcf?s=qeI7Gnhao2hLmqg5WvXZ1594",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qeI7Gnhao2hLmqg5WvXZ1594",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3027,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n298-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n298-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8vvc-zfNClt-?s=56TBWQpiUHnD8K3Y4dVs7LZ2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/56TBWQpiUHnD8K3Y4dVs7LZ2",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3028,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n297-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n297-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ElBMaHcBhZgi?s=Wwt0o9TO0xqdCfypBD6zWzkE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Wwt0o9TO0xqdCfypBD6zWzkE",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3029,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n296-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n296-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qciW2NLFn9fi?s=vkIj3OKyf-aGn9ypyYhB4cnC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vkIj3OKyf-aGn9ypyYhB4cnC",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3030,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n295-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n295-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Byq3WXIKBTHG?s=3q5J2dh9kxWF4jQdu4Hn5vui",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3q5J2dh9kxWF4jQdu4Hn5vui",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3031,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n294-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n294-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/egxyPNIr9uGD?s=_v6JQ5E3r_zuIA87POhq9Fv2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_v6JQ5E3r_zuIA87POhq9Fv2",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3032,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "serial",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n293-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n293-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/SNVVlhUwUwmn?s=5uWdT8oF1O43MTOAaW97FYUJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5uWdT8oF1O43MTOAaW97FYUJ",
    "featured": false,
    "addedAt": 1790842037568,
    "updatedAt": 1790842037568,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3033,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n292-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n292-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cquPI6Pa1ac2?s=RK-TLcWN8vPKIYX4fwjDpvu9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RK-TLcWN8vPKIYX4fwjDpvu9",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3034,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n291-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n291-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GYgNsr_g9iIt?s=WSObDFCoHiLQVd3dFDEhonzo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WSObDFCoHiLQVd3dFDEhonzo",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3035,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n290-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n290-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/V11wPy8-vjmr?s=TrwokVRt2CiaDLKyemTb1eoa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TrwokVRt2CiaDLKyemTb1eoa",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3036,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n289-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n289-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eJxqHtHTU6uW?s=wYAob6Pvs_20-vG-g_6Sv2hy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wYAob6Pvs_20-vG-g_6Sv2hy",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3037,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n288-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n288-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KliR4b-8MjIE?s=kt8lmMI1NPMjBbar5Y60brzS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kt8lmMI1NPMjBbar5Y60brzS",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3038,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n287-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n287-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sjEn32RhYItI?s=Cr9Q5NzasPt2ym-ziSd8V62S",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Cr9Q5NzasPt2ym-ziSd8V62S",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3039,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n286-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n286-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/b3xlOTpyB9jq?s=VwjRoGN7H-pCXyi02HF6qSpA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VwjRoGN7H-pCXyi02HF6qSpA",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3040,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n285-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n285-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nsfgJkUunFBT?s=mqNpyPRQibvcOzpKmXkGzl6p",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mqNpyPRQibvcOzpKmXkGzl6p",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3041,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n284-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n284-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dnrehl7qw5cW?s=blkcYLKc6t6bUm_a8ULRQZL3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/blkcYLKc6t6bUm_a8ULRQZL3",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3042,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n283-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n283-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/oHCaJSEMYMLB?s=pUuM4rqxrK0pdD1CHhjKqmF2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pUuM4rqxrK0pdD1CHhjKqmF2",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3043,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n282-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n282-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VyVG-HU3orsA?s=ari_8D2v93Nwpka2kFtwyQZ-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ari_8D2v93Nwpka2kFtwyQZ-",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3044,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n281-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n281-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uOnu-wMVZ0Af?s=qWJPavnQWMUZl5hVyyiFrx3Z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qWJPavnQWMUZl5hVyyiFrx3Z",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3045,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n280-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n280-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tC25LiVvl2Fd?s=0M3GMyBasjFlC6K7Kzy9Ug4X",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0M3GMyBasjFlC6K7Kzy9Ug4X",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3046,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n279-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n279-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PrLvl_vs5wkZ?s=S3kmzw3K7aEjE4Wa3mZU1_kU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S3kmzw3K7aEjE4Wa3mZU1_kU",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3047,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n278-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n278-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/po4EqA_EalpW?s=6YQZknjBjbKl_EFTFRIr8GNz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6YQZknjBjbKl_EFTFRIr8GNz",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3048,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n277-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n277-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VRCGQYgFSCFh?s=mF3nes5HikzyHYb4h8oCx0M6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mF3nes5HikzyHYb4h8oCx0M6",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3049,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n276-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n276-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xDY8UCSbZnJp?s=3UbrJmoVDWnItD0iJpt9Oht_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3UbrJmoVDWnItD0iJpt9Oht_",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3050,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n275-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n275-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K5kWTUUDfHp1?s=-887lev517FQV6uEfF3xJLEz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-887lev517FQV6uEfF3xJLEz",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 52,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3051,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n274-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n274-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OeTeEGGzW4jm?s=ziyfzTRPJZZJuOy2APeuLvmA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ziyfzTRPJZZJuOy2APeuLvmA",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3052,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n273-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n273-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TFMKcVBiiI39?s=GPWAz75CRjJ2H2Li8wKlkcI5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GPWAz75CRjJ2H2Li8wKlkcI5",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3053,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n272-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n272-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OX8pNaJXpGd9?s=xYwTOCYashxbbLGiLDAbTias",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xYwTOCYashxbbLGiLDAbTias",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3054,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n271-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n271-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yyRPO9Ot_0_S?s=oePaFdcv14KcMt-tVCTk1fuR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oePaFdcv14KcMt-tVCTk1fuR",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3055,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n270-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n270-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uMfAHhfy__er?s=ROwggE13HqeiKT45_mTRloJ2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ROwggE13HqeiKT45_mTRloJ2",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3056,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n269-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n269-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xqDzMHVxqgkR?s=Wo8Rzlt6xYnctEPhK8Wa2NSi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Wo8Rzlt6xYnctEPhK8Wa2NSi",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 58,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3057,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n268-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n268-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pRH7Ll7iUwIH?s=EVYOxglvD_BqcIqh1AX1N1yv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EVYOxglvD_BqcIqh1AX1N1yv",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 53,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3058,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n267-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n267-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yDOLnco8pKIb?s=Ix9DjFhIk7RCJ2uWwtgzqGNW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ix9DjFhIk7RCJ2uWwtgzqGNW",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3059,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n266-қисм.",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n266-қисм."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CeBFqO2sqUEA?s=5p9qw7TrqH93bgXLr9WPaMnu",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5p9qw7TrqH93bgXLr9WPaMnu",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3060,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n265-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n265-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BuWrbquarRqV?s=pNY2BJNhlXEkve4DDm97QnQg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pNY2BJNhlXEkve4DDm97QnQg",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3061,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n264-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n264-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fh1aQ0Y6y_iB?s=gP2ypq5ZHr4zH1OPtlh9ufS0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gP2ypq5ZHr4zH1OPtlh9ufS0",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3062,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n263-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n263-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JdTJZH_SIwWh?s=wUSCG-vXZqiYpI2ZubjD4ZM8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wUSCG-vXZqiYpI2ZubjD4ZM8",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3063,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n262-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n262-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-vtBE1FYm79L?s=TkJN_pFG6Tj8gnCZi3_MNnaa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TkJN_pFG6Tj8gnCZi3_MNnaa",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 59,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3064,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n261-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n261-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0leSlBvLRb9a?s=h8T-sv6bZ_LSP_dArCjDMe6Z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/h8T-sv6bZ_LSP_dArCjDMe6Z",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 52,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3065,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n260-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n260-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7pir1aTDhd-3?s=Q6_Ix5lFL9XU-54Sb1x6eu4y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Q6_Ix5lFL9XU-54Sb1x6eu4y",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3066,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n259-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n259-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8KhylHtsXzYH?s=HKNywh3CkO5ORv13CBVmuRWH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HKNywh3CkO5ORv13CBVmuRWH",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3067,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n258-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n258-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nEI16Rq484jS?s=pJGoNF70T8zNXhXhrGRgqjHd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pJGoNF70T8zNXhXhrGRgqjHd",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3068,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n257-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n257-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jf8tLXdsdsW-?s=COhwaP0wBFE17q70q2MZ6lTC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/COhwaP0wBFE17q70q2MZ6lTC",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3069,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n256-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n256-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DvuiltBDc7fL?s=IFexul232Prmx7VuQVXAk61d",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IFexul232Prmx7VuQVXAk61d",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3070,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n255-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n255-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xKvHY3IWiCO5?s=X6LGI12TQknAcUziaRzFbdgF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/X6LGI12TQknAcUziaRzFbdgF",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3071,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n254-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n254-қисм.\n\nЯқинларга ҳам улашинг👇\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/XtpwbXOF4iXj?s=woIZr3-qD8xE9Px_szn3eF8p",
    "trailer": "",
    "video": "https://dezocloud.uz/s/woIZr3-qD8xE9Px_szn3eF8p",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3072,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n253-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n253-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nf-uZPl8_ruq?s=y6xQ_BLnksxLwgDPILxlAqTV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/y6xQ_BLnksxLwgDPILxlAqTV",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3073,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n252-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n252-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rR9kszydM-2a?s=nInqCLtbM8Oewzjj2jK6WyD8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nInqCLtbM8Oewzjj2jK6WyD8",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3074,
    "slug": "italyan-oshhonasida-turk-me-mond-stligi",
    "type": "film",
    "title": {
      "uz": "Итальян ошхонасида турк меҳмондўстлиги",
      "ru": "Итальян ошхонасида турк меҳмондўстлиги"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Итальян ошхонасида турк меҳмондўстлиги\n\n👉",
      "ru": "Итальян ошхонасида турк меҳмондўстлиги\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rIrp_pamcqq9?s=tjCfmUPAyrydTVpnyOuZv7dI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tjCfmUPAyrydTVpnyOuZv7dI",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 2,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3075,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n250-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n250-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_RJ-vJnFZj3j?s=7GebsDF7v2tU3AOl25uz67FN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7GebsDF7v2tU3AOl25uz67FN",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3076,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n251-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n251-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1Z1pnvGElIam?s=S8ZwksvPkpgV-4A3VvW_NiSk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S8ZwksvPkpgV-4A3VvW_NiSk",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3077,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n249-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n249-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3BJ6bI_nUQPG?s=zcvU9-6_YfNzbtC5udZaBZSH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zcvU9-6_YfNzbtC5udZaBZSH",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 51,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3078,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n248-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n248-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yYlL0zUxX9Ty?s=F6B87v-EQ8rCoTGnhg-ka7y7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/F6B87v-EQ8rCoTGnhg-ka7y7",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 54,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3079,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n247-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n247-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Qa34FMZ-r_KF?s=HaHM-5W4gRLsg9VgNGX4ZNCX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HaHM-5W4gRLsg9VgNGX4ZNCX",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3080,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n246-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n246-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sY87uAtZZKVj?s=JP9f2aASLSgFmH9ugCGknZ8p",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JP9f2aASLSgFmH9ugCGknZ8p",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3081,
    "slug": "mendan-arzingiz-bor-ukmdorim",
    "type": "film",
    "title": {
      "uz": "Мендан қарзингиз бор, ҳукмдорим",
      "ru": "Мендан қарзингиз бор, ҳукмдорим"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Мендан қарзингиз бор, ҳукмдорим\n\nҲурматли мухлислари! Каналимиз ривожи учун ушбу постни ўзингизнинг 10 та яқин дўстларингизга улашиб қўйинг. Мақсадимиз яхшилик ва маърифат тарқатишдир. Эҳтимол сизлар туфайли каналамизнинг обуначилари, ҳамкорлари кўпайиб барчамиз учун манфаатли бўлар деган умиддамиз. Сизлардан Аллоҳ рози бўлсин!\n\n👉",
      "ru": "Мендан қарзингиз бор, ҳукмдорим\n\nҲурматли мухлислари! Каналимиз ривожи учун ушбу постни ўзингизнинг 10 та яқин дўстларингизга улашиб қўйинг. Мақсадимиз яхшилик ва маърифат тарқатишдир. Эҳтимол сизлар туфайли каналамизнинг обуначилари, ҳамкорлари кўпайиб барчамиз учун манфаатли бўлар деган умиддамиз. Сизлардан Аллоҳ рози бўлсин!\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-tRN7mDel95T?s=fUDSW0jqiSsXi9XPkNYkLrGn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fUDSW0jqiSsXi9XPkNYkLrGn",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 5,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3082,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n245-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n245-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DFLMuEVK1V2H?s=Nxo7w7eSIcHoLt5YlP3801JC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Nxo7w7eSIcHoLt5YlP3801JC",
    "featured": false,
    "addedAt": 1790842074760,
    "updatedAt": 1790842074760,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3083,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n444-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n444-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CT8FRdhXJcpO?s=x3tF3HZz2uA_D0IXgkLE7xX-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/x3tF3HZz2uA_D0IXgkLE7xX-",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3084,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 443-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 443-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OsX7EjAOYgiY?s=d2DMUNVeYqyTADjGl5tvmhQ5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/d2DMUNVeYqyTADjGl5tvmhQ5",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3085,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n442-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n442-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mePdA6x3ZQGg?s=YHYZ64BVEN-dd5JqO3bgVHoU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YHYZ64BVEN-dd5JqO3bgVHoU",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3086,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n441-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n441-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/EWZ-9cgLwrln?s=_a4hMSkRXa8uRFZUhNqFNTh7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_a4hMSkRXa8uRFZUhNqFNTh7",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3087,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n440-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n440-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4gO3liLYA54R?s=wL3qkPezo6hFxZP_a9lCYvc0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wL3qkPezo6hFxZP_a9lCYvc0",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3088,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n439-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n439-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZHhwu15eeIa9?s=GSC2W4jL3jgVuop_-Bov6Zuk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GSC2W4jL3jgVuop_-Bov6Zuk",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3089,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n438-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n438-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Qacw6TjLj3Xp?s=vmwbqhLhP3AGfhLADJaM1i2h",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vmwbqhLhP3AGfhLADJaM1i2h",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3090,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 437-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 437-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iQNpxSg8frGM?s=y0v6GeJkK3brPkxFtW24Dqzm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/y0v6GeJkK3brPkxFtW24Dqzm",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3091,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n436-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n436-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wwGQgLRxlL3l?s=0SjpGBPy3oZrKFS3Nr8fgvGi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0SjpGBPy3oZrKFS3Nr8fgvGi",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3092,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n435-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n435-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qp7ClWySmssq?s=CArs_nEjuSMlLDVpj3YTPuNB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CArs_nEjuSMlLDVpj3YTPuNB",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3093,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 434-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 434-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UMZMfionO-Eh?s=GUuh2bd5s-p_f6JW0AM6mDz_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GUuh2bd5s-p_f6JW0AM6mDz_",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3094,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 433-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 433-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/h_ky55rgf-b9?s=w0mzZU6ubAEONqFs0R7WG7Zp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/w0mzZU6ubAEONqFs0R7WG7Zp",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3095,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n432-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n432-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cGR8HFsLUx-H?s=nIN1ZOMB1BmUL1sTjhRhPjJI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nIN1ZOMB1BmUL1sTjhRhPjJI",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3096,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n431-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n431-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lEs6fRVKN1wy?s=O2jAfHnbR3C0Mut6qUq2bGx7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/O2jAfHnbR3C0Mut6qUq2bGx7",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 51,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3097,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n430-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n430-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/roVMOqPqDVj9?s=3WFzFsZ5PQSHjDBdrZpKzBFQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3WFzFsZ5PQSHjDBdrZpKzBFQ",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3098,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n429-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n429-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jJEA5z9DQJMG?s=99DpuJdMXpAbNps8VODr5tD5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/99DpuJdMXpAbNps8VODr5tD5",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3099,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n428-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n428-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ccoqkCoVCqRD?s=fdCbE5FrwuIHObAMYF3FP_R3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fdCbE5FrwuIHObAMYF3FP_R3",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3100,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n427-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n427-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ruKZTngOt7T3?s=sgzIztxecOzwt_sHWha4_vom",
    "trailer": "",
    "video": "https://dezocloud.uz/s/sgzIztxecOzwt_sHWha4_vom",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3101,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n426-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n426-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zTDCuJMU3UfF?s=eJrvBey7UqOzvArGjkMUXpSt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eJrvBey7UqOzvArGjkMUXpSt",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3102,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n425-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n425-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BhzohNkONqPO?s=tiibs_HXHIsftV1yELVFbtZ0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tiibs_HXHIsftV1yELVFbtZ0",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3103,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n424-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n424-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zlI5FAxuy5cN?s=kfVI8U4LJcDFmU22ShRwXY6v",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kfVI8U4LJcDFmU22ShRwXY6v",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 53,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3104,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n423-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n423-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/f11g9quaeBc2?s=WI68whjou2AYovUU-4DHvg3j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WI68whjou2AYovUU-4DHvg3j",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3105,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n422-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n422-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/LM_-9nc0r9lg?s=PeJFUOPoziaEHZChW2dQv2Ac",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PeJFUOPoziaEHZChW2dQv2Ac",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3106,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n421-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n421-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gxigC6rrIyqi?s=yLt0di_hS6JjnoQUW746eOZz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yLt0di_hS6JjnoQUW746eOZz",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3107,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n420-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n420-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/szral7UsSh7-?s=7LTWgI9sXobebnA5OYXVAQZi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7LTWgI9sXobebnA5OYXVAQZi",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3108,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n419-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n419-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6za9C_gCfKEA?s=mf_kZUPxdeZSmyalR8iLeWjL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mf_kZUPxdeZSmyalR8iLeWjL",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3109,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n418-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n418-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mN_U7lb62IFu?s=-LoLEfUqt3wqUunSkkrv2MnR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-LoLEfUqt3wqUunSkkrv2MnR",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3110,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n417-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n417-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nld3fAR1Vfrj?s=qIwqbWj_7333K9WbyeUMGP4O",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qIwqbWj_7333K9WbyeUMGP4O",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3111,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n416-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n416-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YBpYMeVKe0Na?s=G3JEpgy_4iL82N67j8ufPcSS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/G3JEpgy_4iL82N67j8ufPcSS",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3112,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n415-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n415-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xq0dr8_Ss2MC?s=dB2yRI5Q8ZkwnhaTSPMDTlZl",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dB2yRI5Q8ZkwnhaTSPMDTlZl",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3113,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n414-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n414-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rAPzUGrnb_oE?s=kP35Hsx1gz02PwVEb83MZ03q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kP35Hsx1gz02PwVEb83MZ03q",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3114,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 413-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 413-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/odbkhoQ5xzgG?s=AqCmqp0Jac2afrW3iMQGLtzC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AqCmqp0Jac2afrW3iMQGLtzC",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3115,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n412-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n412-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nhtdqv186Fy5?s=0ZZ3L6k1PN3Sz8O9wvr4Be1d",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0ZZ3L6k1PN3Sz8O9wvr4Be1d",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 41,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3116,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n411-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n411-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7gPYoaJziQ_d?s=nseHzqCXKwsn0MxBNUup2fWB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nseHzqCXKwsn0MxBNUup2fWB",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3117,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n410-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n410-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4y6ug_83dWiz?s=a3shNLe5KfTTJR9IjDZO2lYf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/a3shNLe5KfTTJR9IjDZO2lYf",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3118,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n409-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n409-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uWA_YMQMEFv1?s=DiQFLMuJD5_WGA6FQckrWczM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DiQFLMuJD5_WGA6FQckrWczM",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3119,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n408-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n408-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/drrGmnMU8yFa?s=zgyvBgQJcVKTK4s1ATOkPQg5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zgyvBgQJcVKTK4s1ATOkPQg5",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3120,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n407-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n407-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PwIklwcaqxKE?s=nh6_4lKaxn3zobqEhJ9-Un_f",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nh6_4lKaxn3zobqEhJ9-Un_f",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3121,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n406-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n406-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ro4rDBUSW_UB?s=TraVj4sNTn8uyiX3KoWxCmqT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TraVj4sNTn8uyiX3KoWxCmqT",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3122,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 405-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 405-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KClLUoLF1orz?s=5UR6oLHFGVMDrL6XpIOpT5dU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5UR6oLHFGVMDrL6XpIOpT5dU",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3123,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n404-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n404-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TWqC6t1ykOwD?s=46u3dMQ9zbCzdeXnBdFqd5fQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/46u3dMQ9zbCzdeXnBdFqd5fQ",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3124,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n403-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n403-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OAFqJsEdyi5d?s=38b1Ri01yXWWFdUcPVv0xqgb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/38b1Ri01yXWWFdUcPVv0xqgb",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3125,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n402-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n402-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/14XtdSVn0iKq?s=jRSnpAKTxPMA97t6s2rEnd1I",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jRSnpAKTxPMA97t6s2rEnd1I",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3126,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 401-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 401-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zd1Lt_itjDQC?s=KbBLzCLYRHVmThu0W840L-YE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KbBLzCLYRHVmThu0W840L-YE",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3127,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n400-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n400-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jfTxaLrDhIeD?s=8__48wNTTnfLdabtlE01-VeS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8__48wNTTnfLdabtlE01-VeS",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3128,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n399-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n399-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bjMbl83O1lXi?s=S3xjsoFTfMWIvWH___vMFOkz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S3xjsoFTfMWIvWH___vMFOkz",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3129,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n398-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n398-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g4mAkJ7eKYTA?s=i8_yV3KME4ZB2RTHuvQ1ClkY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/i8_yV3KME4ZB2RTHuvQ1ClkY",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3130,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n397-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n397-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/XO-Cz4qhUhxH?s=CsK5aeXwrfmEQSLGqF2BjF1n",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CsK5aeXwrfmEQSLGqF2BjF1n",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3131,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n396-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n396-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PVZzWrT2ahZR?s=Jz40VKHJKy0bKmY41oJFuszE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Jz40VKHJKy0bKmY41oJFuszE",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 56,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3132,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n395-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n395-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OymBZML2d5sQ?s=oQoJ0iE2hlx83famuAutw_NR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oQoJ0iE2hlx83famuAutw_NR",
    "featured": false,
    "addedAt": 1790842108245,
    "updatedAt": 1790842108245,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3133,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n394-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n394-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CfXlvyGtE1kW?s=dGw08eCeTgQgkOtrefogPeJY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dGw08eCeTgQgkOtrefogPeJY",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3134,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n393-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n393-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IbmNtktjTuAP?s=9aw4OXS5jONdJr3t0AI6SJ_x",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9aw4OXS5jONdJr3t0AI6SJ_x",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3135,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n392-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n392-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4bK5f_RgOOdF?s=T-6DGV6SON2SsV5EzRuyDW4X",
    "trailer": "",
    "video": "https://dezocloud.uz/s/T-6DGV6SON2SsV5EzRuyDW4X",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3136,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n391-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n391-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9Gs2QaeUoEug?s=3BJR4W1tGnDgH3PxR23ooAjk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3BJR4W1tGnDgH3PxR23ooAjk",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3137,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n390-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n390-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/kozbXkMbqaRX?s=t5vGyplEMweLz9My9gUPiA0z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/t5vGyplEMweLz9My9gUPiA0z",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3138,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n389-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n389-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0NM1c1yeg5Jw?s=9q5zcWpwUP8rKuC1naDgwIRT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9q5zcWpwUP8rKuC1naDgwIRT",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 60,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3139,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n388-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n388-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7uhTzX1TrD4A?s=jsdeshPCdYIpRF_Ig3UCctam",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jsdeshPCdYIpRF_Ig3UCctam",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 55,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3140,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n387-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n387-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xHpPW-wJ0Sxm?s=6GQ_qZUomTNIcP_REUJYNyke",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6GQ_qZUomTNIcP_REUJYNyke",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 55,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3141,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n386-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n386-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_nwkwMv4iRz4?s=mrjJkLg56nX0_JP0eC4PrMld",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mrjJkLg56nX0_JP0eC4PrMld",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 58,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3142,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n385-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n385-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ifPl7UFEbMsd?s=EfIsHVEGijDMA_EdU9sVL8kN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EfIsHVEGijDMA_EdU9sVL8kN",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 55,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3143,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n384-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n384-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/haOo9iNtwUwA?s=fYp1KF0Ba9AvEtSed9iY344J",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fYp1KF0Ba9AvEtSed9iY344J",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 52,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3144,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n383-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n383-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jAId6DCRhsjy?s=I0MqEUzzXfrKJks-sDITr-jt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/I0MqEUzzXfrKJks-sDITr-jt",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3145,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n382-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n382-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5f2UAJPJtqYV?s=hn9-SBvACPiaDGiKxSk3fe28",
    "trailer": "",
    "video": "https://dezocloud.uz/s/hn9-SBvACPiaDGiKxSk3fe28",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3146,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n381-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n381-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Od_VrcrELtOe?s=JOv7dyOfB6QU7iNsD02-BTzX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JOv7dyOfB6QU7iNsD02-BTzX",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3147,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n380-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n380-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pK7X3FuwFUu1?s=_KnX4PMCR0KAbc0FP5WmUUeW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_KnX4PMCR0KAbc0FP5WmUUeW",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3148,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n379-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n379-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zJ76RsXW7baz?s=WXlYblxkbXqFK9sZv9V07v5I",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WXlYblxkbXqFK9sZv9V07v5I",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3149,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n378-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n378-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Is8xVqJ215kr?s=FwiO-LU2AcPhwMchyoQp2gfW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/FwiO-LU2AcPhwMchyoQp2gfW",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3150,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n377-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n377-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BDbAxJ46EW6i?s=wOacl23VGxPlc5DvUopSvBgS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wOacl23VGxPlc5DvUopSvBgS",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3151,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n376-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n376-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Zh6ivFLBYvSt?s=Gxijbib_FSjpXC_o1LmqyfcJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Gxijbib_FSjpXC_o1LmqyfcJ",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3152,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 375-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 375-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PNYewumGlQJI?s=gjE2pqvMADppT_H2HP0oGSuY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gjE2pqvMADppT_H2HP0oGSuY",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3153,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n374-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n374-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jl-GCtw92InU?s=j3_HO3pIp7OX9oQax45wYDYG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/j3_HO3pIp7OX9oQax45wYDYG",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3154,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n373-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n373-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wdYxVUkdZOrB?s=16NIGAKSvy2W3lb-sH7h9zE-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/16NIGAKSvy2W3lb-sH7h9zE-",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3155,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n372-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n372-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1D-eDsbrdR3j?s=HUxO24dN4vBwJWF4f8xc6SeA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HUxO24dN4vBwJWF4f8xc6SeA",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 51,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3156,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n371-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n371-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tXVInSz0eGM8?s=4whRtYGdIEujeEw049frLXhg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4whRtYGdIEujeEw049frLXhg",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3157,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n370-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n370-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tjs1CjNcwRTN?s=i_eIyKOPJFP5_c-7kt9woLrW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/i_eIyKOPJFP5_c-7kt9woLrW",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3158,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n369-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n369-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YRmvuYEK3WBt?s=S7HfGh5yotruejBQCcVBx3ga",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S7HfGh5yotruejBQCcVBx3ga",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3159,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n368-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n368-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AWnNjbnQzsy8?s=lBrFz34_6Wq7u-rhviFUQJIC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lBrFz34_6Wq7u-rhviFUQJIC",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3160,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n367-қисм\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n367-қисм\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1L0moLPHcY25?s=JGHBfCWWe-8qJXYszGKYOaPw",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JGHBfCWWe-8qJXYszGKYOaPw",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3161,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n366-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n366-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nExjFeOVIRuE?s=gCsVfkbABF-JWDDT0bpJ8ryO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gCsVfkbABF-JWDDT0bpJ8ryO",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3162,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n365-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n365-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AoTog8OYGjXn?s=oC-t1JTeeSO4UUeSohorJJZW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oC-t1JTeeSO4UUeSohorJJZW",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3163,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 364-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 364-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4NlIcD_HPmyY?s=eeSmHH-s9Wwen7zpY3pskEYj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eeSmHH-s9Wwen7zpY3pskEYj",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3164,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n363-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n363-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/v6-H5pRCi7F4?s=rTRm_a-Ld7QisAjnRZoNoPdR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rTRm_a-Ld7QisAjnRZoNoPdR",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3165,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n362-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n362-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eMlP0pMyCsFI?s=kbJcUWOS2fUUNnf8eoE5c7oa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kbJcUWOS2fUUNnf8eoE5c7oa",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3166,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n361-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n361-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/H3GF-r3OOA3a?s=Wd1pofxJEVRR8Zrg4dX6b21B",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Wd1pofxJEVRR8Zrg4dX6b21B",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 52,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3167,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 360-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 360-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/aZVOoJbYintI?s=otX0W9Q_XJ-A6pLXHZgY0QNl",
    "trailer": "",
    "video": "https://dezocloud.uz/s/otX0W9Q_XJ-A6pLXHZgY0QNl",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3168,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n358-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n358-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/484CzX68sfP1?s=KAK8bUHgsyY4apdVR5-Q9DUA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KAK8bUHgsyY4apdVR5-Q9DUA",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3169,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n357-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n357-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/N6gO_8R6-Lu3?s=D4bHovHZGXPDW7YqoT56j69q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/D4bHovHZGXPDW7YqoT56j69q",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3170,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 356-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 356-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KQ-sM_LghweQ?s=zRRcWSle7IJV_0uMN8enAVZv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zRRcWSle7IJV_0uMN8enAVZv",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3171,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n355-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n355-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xWbx09_CwpuG?s=A1OMJdm5W5CST9Mjsu7NEySL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/A1OMJdm5W5CST9Mjsu7NEySL",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3172,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 354-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 354-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/apIQeACno9nZ?s=p3OO2phtMfnpFjBHO7Rj8qiL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/p3OO2phtMfnpFjBHO7Rj8qiL",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3173,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n353-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n353-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZGgjSIqU-zVb?s=ee9SHTjJ_23xamQONZVHlvHa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ee9SHTjJ_23xamQONZVHlvHa",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3174,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n352-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n352-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iaAb__XBGOGr?s=tuRAEu0Y9_E6nDOaY4vN7ef7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tuRAEu0Y9_E6nDOaY4vN7ef7",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3175,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n351-қисм\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n351-қисм\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K3I2gi3crAQm?s=qhQU48D9NQogOxtHjP9QXT3R",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qhQU48D9NQogOxtHjP9QXT3R",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3176,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n350-қисм\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n350-қисм\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pIw_3AxFvboO?s=StRuuU1U3Sv0nsTWcSrkN8Tv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/StRuuU1U3Sv0nsTWcSrkN8Tv",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3177,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n349-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n349-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HDh8xWLazVSs?s=0l4HaBkMFZ1mO8dyAA7LGpQy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0l4HaBkMFZ1mO8dyAA7LGpQy",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3178,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n348-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n348-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PAw9F1iz-jyz?s=Z0hH1N7WlSwUr66LhQLgQqGN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Z0hH1N7WlSwUr66LhQLgQqGN",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3179,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 347-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 347-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Y__imqW0Sqn6?s=Ys-KMrsh52j0elY9s-lw7BqM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ys-KMrsh52j0elY9s-lw7BqM",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3180,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 346-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”\n 346-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NDDoi2Pqt_Dv?s=eGZWc42x5dRcnHJ_xkFfaXHB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eGZWc42x5dRcnHJ_xkFfaXHB",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 52,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3181,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n345-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n345-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xs5wIX3dklUI?s=E3HYi6Z_XenqKD-nFCmHAS9j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E3HYi6Z_XenqKD-nFCmHAS9j",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3182,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n344-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n344-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1XSrkcgKb-E0?s=x6YTgJQX5n3Fi5GfPMSnWJMU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/x6YTgJQX5n3Fi5GfPMSnWJMU",
    "featured": false,
    "addedAt": 1790842151562,
    "updatedAt": 1790842151562,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3183,
    "slug": "songi-imperator-544-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 544-qism",
      "ru": "So'ngi imperator 544-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_544-qism\n\n👉",
      "ru": "So'ngi_imperator_544-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3HPBNeKudVoN?s=BwHk9_KrWXmg1wnEohxQccnk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BwHk9_KrWXmg1wnEohxQccnk",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3184,
    "slug": "songi-imperator-543-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 543-qism",
      "ru": "So'ngi imperator 543-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_543-qism\n\n👉",
      "ru": "So'ngi_imperator_543-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YKSqMe5-X_-l?s=yz90QwpGE0YvcwgjiBpMTtFO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yz90QwpGE0YvcwgjiBpMTtFO",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3185,
    "slug": "songi-imperator-542-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 542-qism",
      "ru": "So'ngi imperator 542-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_542-qism\n\n👉",
      "ru": "So'ngi_imperator_542-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vvrkFSCEcyfj?s=PcbH3zCSUo07AXVLLWZeU2Og",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PcbH3zCSUo07AXVLLWZeU2Og",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3186,
    "slug": "songi-imperator-541-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 541-qism",
      "ru": "So'ngi imperator 541-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_541-qism\n\n👉",
      "ru": "So'ngi_imperator_541-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vIMl9Ti05LJo?s=xuWSPnT-tmg9Oyfj2CU76KMR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xuWSPnT-tmg9Oyfj2CU76KMR",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3187,
    "slug": "songi-imperator-540-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 540-qism",
      "ru": "So'ngi imperator 540-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_540-qism\n\n👉",
      "ru": "So'ngi_imperator_540-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bwC73ts2tpyA?s=C_dnR-Hg4dTundCuFimJPvBJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/C_dnR-Hg4dTundCuFimJPvBJ",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3188,
    "slug": "songi-imperator-539-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 539-qism",
      "ru": "So'ngi imperator 539-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_539-qism",
      "ru": "So'ngi_imperator_539-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PXtxXd8MWKMh?s=PhxVScAsqX6LeJvbHF-rXg3G",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PhxVScAsqX6LeJvbHF-rXg3G",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 39,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3189,
    "slug": "songi-imperator-538-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 538-qism",
      "ru": "So'ngi imperator 538-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_538-qism",
      "ru": "So'ngi_imperator_538-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RSajNc6-z3da?s=0mUGh2ju7e_yBdihacuxfLdW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0mUGh2ju7e_yBdihacuxfLdW",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 41,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3190,
    "slug": "songi-imperator-537-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 537-qism",
      "ru": "So'ngi imperator 537-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_537-qism",
      "ru": "So'ngi_imperator_537-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iSy3L60ceOFg?s=93Si0muaVIcBFEDavGZp2syB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/93Si0muaVIcBFEDavGZp2syB",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3191,
    "slug": "songi-imperator-536-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 536-qism",
      "ru": "So'ngi imperator 536-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_536-qism",
      "ru": "So'ngi_imperator_536-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xal2q89QSFyz?s=pKUsj8S2tQ-Y2Jr0FkV220LU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pKUsj8S2tQ-Y2Jr0FkV220LU",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3192,
    "slug": "songi-imperator-535-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 535-qism",
      "ru": "So'ngi imperator 535-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_535-qism",
      "ru": "So'ngi_imperator_535-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dHQeVkKRZeNL?s=_OUzqCDJfBm6Ej3JbeMnKQA4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_OUzqCDJfBm6Ej3JbeMnKQA4",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3193,
    "slug": "songi-imperator-534-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 534-qism",
      "ru": "So'ngi imperator 534-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_534-qism",
      "ru": "So'ngi_imperator_534-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CEaV12sryn79?s=JMPHAAWUMtVPacGwlMDzXo-g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JMPHAAWUMtVPacGwlMDzXo-g",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3194,
    "slug": "songi-imperator-533-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 533-qism",
      "ru": "So'ngi imperator 533-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_533-qism",
      "ru": "So'ngi_imperator_533-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5craKadlMsrT?s=IX9F-ckicRjsqh6gGzytPasE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IX9F-ckicRjsqh6gGzytPasE",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3195,
    "slug": "songi-imperator-532-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 532-qism",
      "ru": "So'ngi imperator 532-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_532-qism",
      "ru": "So'ngi_imperator_532-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KdfdVOGKXUMk?s=bkSvxieuaHYlSsqlnhYXZKZm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bkSvxieuaHYlSsqlnhYXZKZm",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3196,
    "slug": "songi-imperator-531-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 531-qism",
      "ru": "So'ngi imperator 531-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_531-qism",
      "ru": "So'ngi_imperator_531-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DowhSxldOPkN?s=pdi2rIzwgDwm9oqjmq5ZKH19",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pdi2rIzwgDwm9oqjmq5ZKH19",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3197,
    "slug": "songi-imperator-530-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 530-qism",
      "ru": "So'ngi imperator 530-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_530-qism",
      "ru": "So'ngi_imperator_530-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qPEkkVS4NnSK?s=f_IPoKstMG_o_HSgGmBCJkbY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/f_IPoKstMG_o_HSgGmBCJkbY",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3198,
    "slug": "songi-imperator-529-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 529-qism",
      "ru": "So'ngi imperator 529-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_529-qism",
      "ru": "So'ngi_imperator_529-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nB_BjMI3I0PU?s=Gar-IumLfv9bKqzaeBfKqWGo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Gar-IumLfv9bKqzaeBfKqWGo",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3199,
    "slug": "songi-imperator-528-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 528-qism",
      "ru": "So'ngi imperator 528-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_528-qism",
      "ru": "So'ngi_imperator_528-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iLaVh4rmbF9L?s=7IUTpZ3Tflj0lMpqw290wMyj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7IUTpZ3Tflj0lMpqw290wMyj",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3200,
    "slug": "songi-imperator-527-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 527-qism",
      "ru": "So'ngi imperator 527-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_527-qism",
      "ru": "So'ngi_imperator_527-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HYoCJT0kMQe8?s=XeUMxD1hqk-lfA6Hgg_PVy6Y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XeUMxD1hqk-lfA6Hgg_PVy6Y",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3201,
    "slug": "songi-imperator-526-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 526-qism",
      "ru": "So'ngi imperator 526-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_526-qism",
      "ru": "So'ngi_imperator_526-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0JKRUO6y7cFR?s=QZ0Uhzs20HTtxq-PBg9O3hlJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QZ0Uhzs20HTtxq-PBg9O3hlJ",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3202,
    "slug": "songi-imperator-525-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 525-qism",
      "ru": "So'ngi imperator 525-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_525-qism",
      "ru": "So'ngi_imperator_525-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/e42nNacVQt-f?s=GfDMnNNEwVLBJUJ19uPxEpAS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GfDMnNNEwVLBJUJ19uPxEpAS",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3203,
    "slug": "songi-imperator-524-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 524-qism",
      "ru": "So'ngi imperator 524-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_524-qism",
      "ru": "So'ngi_imperator_524-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yYCyie2_xo7N?s=YT4nPdpmOu7ihz_QjtBbBWmA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YT4nPdpmOu7ihz_QjtBbBWmA",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3204,
    "slug": "songi-imperator-523-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 523-qism",
      "ru": "So'ngi imperator 523-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_523-qism",
      "ru": "So'ngi_imperator_523-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vyvT9QxJ_vWn?s=oZxwDrSFEV-oifXN2a968JMi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oZxwDrSFEV-oifXN2a968JMi",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3205,
    "slug": "songi-imperator-522-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 522-qism",
      "ru": "So'ngi imperator 522-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_522-qism",
      "ru": "So'ngi_imperator_522-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7VF40pXMHeqZ?s=GpBDZmYrwl6LoHvaK6LrhlN2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GpBDZmYrwl6LoHvaK6LrhlN2",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3206,
    "slug": "songi-imperator-521-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 521-qism",
      "ru": "So'ngi imperator 521-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_521-qism",
      "ru": "So'ngi_imperator_521-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vwh0Lc2Ndb9W?s=KWK8wYIYY1muiPwNZdcUNfi7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KWK8wYIYY1muiPwNZdcUNfi7",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3207,
    "slug": "songi-imperator-520-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 520-qism",
      "ru": "So'ngi imperator 520-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_520-qism",
      "ru": "So'ngi_imperator_520-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/o9EzWCq52Jkq?s=NC3g_5DEOWlHVHEosG3ytHKY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NC3g_5DEOWlHVHEosG3ytHKY",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3208,
    "slug": "songi-imperator-519-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 519-qism",
      "ru": "So'ngi imperator 519-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_519-qism",
      "ru": "So'ngi_imperator_519-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CaS0GaJS1wFm?s=35hVNU4NS8mxBHV2cW0RZZUG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/35hVNU4NS8mxBHV2cW0RZZUG",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3209,
    "slug": "songi-imperator-518-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 518-qism",
      "ru": "So'ngi imperator 518-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_518-qism",
      "ru": "So'ngi_imperator_518-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JL_X0YcGxmyH?s=TEqvYO1pP75ykpyNr3J9e-wc",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TEqvYO1pP75ykpyNr3J9e-wc",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3210,
    "slug": "songi-imperator-517-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 517-qism",
      "ru": "So'ngi imperator 517-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_517-qism",
      "ru": "So'ngi_imperator_517-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/U9w3YGe-7tlG?s=qRXytEuRUZZkIlJ5Oy2zhcAy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qRXytEuRUZZkIlJ5Oy2zhcAy",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3211,
    "slug": "songi-imperator-516-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 516-qism",
      "ru": "So'ngi imperator 516-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_516-qism",
      "ru": "So'ngi_imperator_516-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/btT4p8g0uAMa?s=G8KsB0wfFRs7satkT8jAC_D-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/G8KsB0wfFRs7satkT8jAC_D-",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3212,
    "slug": "songi-imperator-515-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 515-qism",
      "ru": "So'ngi imperator 515-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_515-qism",
      "ru": "So'ngi_imperator_515-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/V39w5KnLb3bz?s=yhyw8XprjUnMbDlb5o7CZmE6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yhyw8XprjUnMbDlb5o7CZmE6",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3213,
    "slug": "songi-imperator-514-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 514-qism",
      "ru": "So'ngi imperator 514-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_514-qism",
      "ru": "So'ngi_imperator_514-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eNRNNP8Sv-9t?s=TbwrbuHuoU7AblIDi-LrW6ay",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TbwrbuHuoU7AblIDi-LrW6ay",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3214,
    "slug": "songi-imperator-513-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 513-qism",
      "ru": "So'ngi imperator 513-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_513-qism\n\n👉",
      "ru": "So'ngi_imperator_513-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xdt6aQj-rfqJ?s=eNra4meYhwn4XkYvmyEm0B7F",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eNra4meYhwn4XkYvmyEm0B7F",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3215,
    "slug": "songi-imperator-512-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 512-qism",
      "ru": "So'ngi imperator 512-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_512-qism\n\n👉",
      "ru": "So'ngi_imperator_512-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VKx4jlkdZqc0?s=-DyzXMj60IiEOycr4f43qJ6j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-DyzXMj60IiEOycr4f43qJ6j",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3216,
    "slug": "songi-imperator-511-qism",
    "type": "film",
    "title": {
      "uz": "So'ngi imperator 511-qism",
      "ru": "So'ngi imperator 511-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "So'ngi_imperator_511-qism\n\n👉",
      "ru": "So'ngi_imperator_511-qism\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_7O8IU1HmIqH?s=v3X8nwZ-MgkHQIdDRxXXU41y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/v3X8nwZ-MgkHQIdDRxXXU41y",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3217,
    "slug": "abdul-amidhon-s-nggi-imperator-510-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 510-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 510-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 510-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 510-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/EqXKmUpIM5af?s=hG9hrTuqy6cKC2TXkU5gSiW0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/hG9hrTuqy6cKC2TXkU5gSiW0",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3218,
    "slug": "abdul-amidhon-s-nggi-imperator-509-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 509-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 509-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 509-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 509-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UNusqw--z-NR?s=0I0z6VMHCxrISv_obKrnixaE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0I0z6VMHCxrISv_obKrnixaE",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3219,
    "slug": "abdul-amidhon-s-nggi-imperator-508-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 508-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 508-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 508-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 508-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PbTtksq-sEnL?s=34e6JPaYmd5eJvewJG9hjtJX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/34e6JPaYmd5eJvewJG9hjtJX",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3220,
    "slug": "abdul-amidhon-s-nggi-imperator-507-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 507-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 507-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 507-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 507-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5L1oujknjGZ_?s=yG0x_zc1V4JPb6cgB-0pytvo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yG0x_zc1V4JPb6cgB-0pytvo",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3221,
    "slug": "abdul-amidhon-s-nggi-imperator-506-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 506-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 506-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 506-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 506-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2XkOFTkDWhNc?s=0bpLfQuoTF2R1VAFUgtiv6oj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0bpLfQuoTF2R1VAFUgtiv6oj",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3222,
    "slug": "abdul-amidhon-s-nggi-imperator-505-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 505-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 505-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 505-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 505-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/R0-Z4352Tqsy?s=KS2siRxIdHSjqP-N5XAvJP-K",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KS2siRxIdHSjqP-N5XAvJP-K",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3223,
    "slug": "abdul-amidhon-s-nggi-imperator-504-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 504-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 504-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 504-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 504-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mFnONqWbbT3E?s=OxkOdIcyo3EaS_8v5SLpg8XX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OxkOdIcyo3EaS_8v5SLpg8XX",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3224,
    "slug": "abdul-amidhon-s-nggi-imperator-503-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 503-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 503-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 503-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 503-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cVB6tRo9pJxw?s=2zYiXiEVzqEW5q6-Xc4KG_VE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2zYiXiEVzqEW5q6-Xc4KG_VE",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 53,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3225,
    "slug": "abdul-amidhon-s-nggi-imperator-502-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 502-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 502-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 502-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 502-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/s_6tDVc0JVIX?s=Na6ev7gywLuA0lN36aUDYKbu",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Na6ev7gywLuA0lN36aUDYKbu",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3226,
    "slug": "abdul-amidhon-s-nggi-imperator-501-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 501-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 501-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 501-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 501-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HsypFGhYnYGe?s=2EtwnjVXEboxzzGnmkQQEwAi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2EtwnjVXEboxzzGnmkQQEwAi",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3227,
    "slug": "abdul-amidhon-s-nggi-imperator-500-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 500-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 500-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 500-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 500-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RPjrw53pXTRB?s=BCPVLbMwxH-7Tg0sMqD3X_GF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BCPVLbMwxH-7Tg0sMqD3X_GF",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 54,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3228,
    "slug": "abdul-amidhon-s-nggi-imperator-499-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 499-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 499-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 499-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 499-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/EUgENa0yAIGV?s=fRW6osb2IXSkPsyvG3cIVm4i",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fRW6osb2IXSkPsyvG3cIVm4i",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3229,
    "slug": "abdul-amidhon-s-nggi-imperator-498-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 498-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 498-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 498-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 498-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OQU1-5gp9M_2?s=UlLmZ3nI8y0XDwg4dxNOg2Q5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UlLmZ3nI8y0XDwg4dxNOg2Q5",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3230,
    "slug": "abdul-amidhon-s-nggi-imperator-497-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 497-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 497-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 497-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 497-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tMyN4lCHGyJg?s=IXXak-0DoT63FSbAPug7zHxy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IXXak-0DoT63FSbAPug7zHxy",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3231,
    "slug": "abdul-amidhon-s-nggi-imperator-496-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 496-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 496-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 496-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 496-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6UugFb8F869i?s=QQ4B9fptW2uf-yO55OgodyrD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QQ4B9fptW2uf-yO55OgodyrD",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 51,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3232,
    "slug": "abdul-amidhon-s-nggi-imperator-495-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 495-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 495-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 495-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 495-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MWUIh5QMiv9p?s=qmY-8PBj-CECxorJb4atQ3zJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qmY-8PBj-CECxorJb4atQ3zJ",
    "featured": false,
    "addedAt": 1790842196482,
    "updatedAt": 1790842196482,
    "duration": 49,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3233,
    "slug": "abdul-amidhon-s-nggi-imperator-494-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 494-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 494-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 494-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 494-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ITQOAv6_NKjs?s=AuDi2ghJxN0Vma4uuZW--2HR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AuDi2ghJxN0Vma4uuZW--2HR",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3234,
    "slug": "abdul-amidhon-s-nggi-imperator-493-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 493-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 493-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 493-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 493-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cix-vGJNmx6E?s=bZsddvoOxGIgPug2rYdO8_6Y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bZsddvoOxGIgPug2rYdO8_6Y",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3235,
    "slug": "abdul-amidhon-s-nggi-imperator-492-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 492-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 492-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 492-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 492-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/abvS2kQN2tog?s=W2npyw23GCDdpLj70-yqcvip",
    "trailer": "",
    "video": "https://dezocloud.uz/s/W2npyw23GCDdpLj70-yqcvip",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3236,
    "slug": "abdul-amidhon-s-nggi-imperator-491-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 491-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 491-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 491-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 491-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/i_kbmYuVrdPT?s=LF401iIOsAlo6525SAxIjwT3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LF401iIOsAlo6525SAxIjwT3",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3237,
    "slug": "abdul-amidhon-s-nggi-imperator-490-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 490-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 490-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 490-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 490-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jWe2Nb_vF_t3?s=S1Fn0cqHtH32hbaSLBvlSrGy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S1Fn0cqHtH32hbaSLBvlSrGy",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3238,
    "slug": "abdul-amidhon-s-nggi-imperator-489-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 489-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 489-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 489-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 489-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7SnBgrS-Wh25?s=le7-iJwebAiRTqJdm5hlkEeN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/le7-iJwebAiRTqJdm5hlkEeN",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3239,
    "slug": "abdul-amidhon-s-nggi-imperator-488-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 488-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 488-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 488-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 488-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cHCc6OpIP7FS?s=DOUrRrl0klw--y6ouTZWY7vY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DOUrRrl0klw--y6ouTZWY7vY",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3240,
    "slug": "abdul-amidhon-s-nggi-imperator-487-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 487-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 487-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 487-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 487-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FDJKLoIp1a0i?s=WRf-E8EJ9vVah3DXCfVLvgvG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WRf-E8EJ9vVah3DXCfVLvgvG",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3241,
    "slug": "abdul-amidhon-s-nggi-imperator-486-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 486-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 486-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 486-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 486-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lrhFg8k2Aprn?s=zPY8htIFhFr27U1ufIy-lalz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zPY8htIFhFr27U1ufIy-lalz",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3242,
    "slug": "abdul-amidhon-s-nggi-imperator-485-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 485-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 485-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 485-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 485-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ERhADOU370bk?s=Zyrwwx75FcOy80uEa7D93Y8Z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Zyrwwx75FcOy80uEa7D93Y8Z",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3243,
    "slug": "abdul-amidhon-s-nggi-imperator-484-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 484-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 484-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 484-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 484-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ctni2KFWMo9Y?s=He3mRObeNTKvjrHz4Nyh0YE8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/He3mRObeNTKvjrHz4Nyh0YE8",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3244,
    "slug": "abdul-amidhon-s-nggi-imperator-483-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 483-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 483-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 483-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 483-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/slX5q7_m9SWR?s=6es_Kb3lt4tAKD19RmsiL4V3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6es_Kb3lt4tAKD19RmsiL4V3",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3245,
    "slug": "abdul-amidhon-s-nggi-imperator-482-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 482-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 482-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 482-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 482-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9L9ASpnmrLUR?s=bLO-efmlwUiiH9tuJKRNVQsK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bLO-efmlwUiiH9tuJKRNVQsK",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3246,
    "slug": "abdul-amidhon-s-nggi-imperator-481-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 481-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 481-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 481-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 481-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rQho6Hb_w2wb?s=-zauzWgM2XVVA0utPSMR-lyF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-zauzWgM2XVVA0utPSMR-lyF",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3247,
    "slug": "abdul-amidhon-s-nggi-imperator-480-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 480-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 480-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 480-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 480-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zZWv_pxRq5Mk?s=_xLu439ol-2a9QtX8TFBcLU6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_xLu439ol-2a9QtX8TFBcLU6",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3248,
    "slug": "abdul-amidhon-s-nggi-imperator-479-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 479-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 479-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 479-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 479-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sWg5YwNA1LQP?s=_yxCQiy3JOtkMzTRpeNPbOnO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_yxCQiy3JOtkMzTRpeNPbOnO",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3249,
    "slug": "abdul-amidhon-s-nggi-imperator-478-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 478-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 478-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 478-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 478-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yUIMKPxQnoe1?s=ScQMuiQY5Gllf_uFA3x5xmUH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ScQMuiQY5Gllf_uFA3x5xmUH",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3250,
    "slug": "abdul-amidhon-s-nggi-imperator-477-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 477-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 477-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 477-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 477-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BTlEBueEe8tf?s=dMMIkpysCcdMsYqZ5CrY6Vaq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dMMIkpysCcdMsYqZ5CrY6Vaq",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3251,
    "slug": "abdul-amidhon-s-nggi-imperator-476-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 476-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 476-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 476-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 476-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xDJMFD--h-mj?s=MAFyswUcDXjdGFel-EzP-bZX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MAFyswUcDXjdGFel-EzP-bZX",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3252,
    "slug": "abdul-amidhon-s-nggi-imperator-475-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 475-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 475-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 475-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 475-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lpsofKaSt1ok?s=sd2uZo4XxklA4DSGI5ScK9fI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/sd2uZo4XxklA4DSGI5ScK9fI",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3253,
    "slug": "abdul-amidhon-s-nggi-imperator-474-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 474-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 474-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 474-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 474-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g1t_jxCwn0qf?s=h8hKpkVXxoAfabV1vfaxiiy9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/h8hKpkVXxoAfabV1vfaxiiy9",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3254,
    "slug": "abdul-amidhon-s-nggi-imperator-473-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 473-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 473-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 473-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 473-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rA7A5WXgsSfp?s=iZBYKcR2hHfaSYD7yC00XjPj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iZBYKcR2hHfaSYD7yC00XjPj",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3255,
    "slug": "abdul-amidhon-s-nggi-imperator-472-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 472-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 472-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 472-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 472-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/80MLrZkeaX05?s=5ZR0uy1I8UQDBfpTbN5_vvcz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5ZR0uy1I8UQDBfpTbN5_vvcz",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3256,
    "slug": "abdul-amidhon-s-nggi-imperator-471-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 471-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 471-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 471-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 471-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jmIiwe6rpxth?s=fQoVRzHZ5qkhuQDGb0g5ZxcE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fQoVRzHZ5qkhuQDGb0g5ZxcE",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3257,
    "slug": "abdul-amidhon-s-nggi-imperator-470-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 470-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 470-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 470-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 470-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zZwTrI7zhNb2?s=ZdPk1zhxZcKlE-BUYipTppr8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZdPk1zhxZcKlE-BUYipTppr8",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3258,
    "slug": "abdul-amidhon-s-nggi-imperator-469-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 469-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 469-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 469-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 469-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nHJLjrSj6bKW?s=E2U5K6deqMnVnfg6jN09ZUcr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E2U5K6deqMnVnfg6jN09ZUcr",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3259,
    "slug": "abdul-amidhon-s-nggi-imperator-468-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 468-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 468-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 468-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 468-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FeijL0e1gXzm?s=NpRCXSFptfhaQbrk5ZeIMKbd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NpRCXSFptfhaQbrk5ZeIMKbd",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3260,
    "slug": "abdul-amidhon-s-nggi-imperator-467-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 467-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 467-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 467-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 467-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/a0wUyrOCjPNB?s=MiBK_vJ2VnihcC_AmubEyiIT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MiBK_vJ2VnihcC_AmubEyiIT",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 55,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3261,
    "slug": "abdul-amidhon-s-nggi-imperator-466-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 466-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 466-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 466-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 466-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/llJXSqmIRIY0?s=z0bofCfgH0g7S25Fsm5ZAujc",
    "trailer": "",
    "video": "https://dezocloud.uz/s/z0bofCfgH0g7S25Fsm5ZAujc",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3262,
    "slug": "abdul-amidhon-s-nggi-imperator-465-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 465-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 465-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 465-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 465-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4dOtsWW3T07r?s=tm8UdeA8wBo2WWUxZFv3L8Om",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tm8UdeA8wBo2WWUxZFv3L8Om",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3263,
    "slug": "abdul-amidhon-s-nggi-imperator-464-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 464-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 464-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 464-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 464-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/u31y5QSBq4Rr?s=YVnsVax4A-P_kVlsRai9i_E6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YVnsVax4A-P_kVlsRai9i_E6",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3264,
    "slug": "abdul-amidhon-s-nggi-imperator-463-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 463-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 463-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 463-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 463-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6y2kOl7VfKjs?s=rYbp4zurkV4i_E_Hke5yihf1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rYbp4zurkV4i_E_Hke5yihf1",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3265,
    "slug": "abdul-amidhon-s-nggi-imperator-462-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 462-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 462-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 462-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 462-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5eFrBkPeB_2y?s=wvuLyWbuaqFcj5ZlVG8arSV-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wvuLyWbuaqFcj5ZlVG8arSV-",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3266,
    "slug": "abdul-amidhon-s-nggi-imperator-461-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 461-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 461-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 461-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 461-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Q-mG6xtQQVOG?s=JGtb5AulSGMFEtYmZDMuTzM-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JGtb5AulSGMFEtYmZDMuTzM-",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3267,
    "slug": "abdul-amidhon-s-nggi-imperator-460-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 460-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 460-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 460-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 460-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rKHS3_3OPPdV?s=tx_vdFgZxsIcm89wJ-StrR4s",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tx_vdFgZxsIcm89wJ-StrR4s",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3268,
    "slug": "abdul-amidhon-s-nggi-imperator-459-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 459-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 459-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 459-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 459-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7jitGGIzmqjc?s=aNWULKFYC2Z0JwhWuwsRQrd7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aNWULKFYC2Z0JwhWuwsRQrd7",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3269,
    "slug": "abdul-amidhon-s-nggi-imperator-458-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 458-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 458-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 458-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 458-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/X7_muE_gmarA?s=uAT6Qn8Dd0IisGS_rB950FhI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uAT6Qn8Dd0IisGS_rB950FhI",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3270,
    "slug": "abdul-amidhon-s-nggi-imperator-457-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 457-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 457-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 457-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 457-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/u-GUzFhrFDj3?s=oTcdACcUgcytXcr-8LItS5oB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oTcdACcUgcytXcr-8LItS5oB",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3271,
    "slug": "abdul-amidhon-s-nggi-imperator-456-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 456-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 456-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 456-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 456-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HcM-ksiHly16?s=etRbidTagVUQEI3gpNi8aNDD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/etRbidTagVUQEI3gpNi8aNDD",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3272,
    "slug": "abdul-amidhon-s-nggi-imperator-455-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 455-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 455-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 455-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 455-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0dd84etlBstR?s=65s30uEoFPJCXLtOr-nNJOIu",
    "trailer": "",
    "video": "https://dezocloud.uz/s/65s30uEoFPJCXLtOr-nNJOIu",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3273,
    "slug": "abdul-amidhon-s-nggi-imperator-454-ism",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 454-қисм",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 454-қисм"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 454-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” 454-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VLM3aefUb2Cz?s=tSAmMUI3U1g69-tOW6U2y_wX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tSAmMUI3U1g69-tOW6U2y_wX",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3274,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n453-қисм.\n\n👉",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n453-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BJzHZihn9SkB?s=bW2z2kGh0pH_jBezvnIN0CC_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bW2z2kGh0pH_jBezvnIN0CC_",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3275,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n452-қисм.\n\n👉",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n452-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tS9VB_98S4Vi?s=dkvhh05Ra0G9VG4MOQ9VFKGW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dkvhh05Ra0G9VG4MOQ9VFKGW",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3276,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n451-қисм.\n\n👉",
      "ru": "АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n451-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ysJ6u48WUZa7?s=IK3eL4d6wmGPrkyMJEtzpUVM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IK3eL4d6wmGPrkyMJEtzpUVM",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3277,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n450-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n450-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0XSSolQFXgqu?s=n9R2Jvk3MvdVob-1vJpS8Vzi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/n9R2Jvk3MvdVob-1vJpS8Vzi",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3278,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n449-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n449-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9p-qEJFV6tXC?s=s7odpTWJq72oBXSSp7e_m9Yg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/s7odpTWJq72oBXSSp7e_m9Yg",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 46,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3279,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n448-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n448-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eqhwr4fKiyw-?s=n207A6pxOBgjW4hJUnc_Qa-M",
    "trailer": "",
    "video": "https://dezocloud.uz/s/n207A6pxOBgjW4hJUnc_Qa-M",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3280,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n447-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n447-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/u_g0tF6koMwd?s=8smd0RqZ6eIebFANKxeo5j3Q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8smd0RqZ6eIebFANKxeo5j3Q",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3281,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n446-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n446-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MgUI2rfLvd3J?s=uItXZmx7KhEXKo7VOkAJUI6E",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uItXZmx7KhEXKo7VOkAJUI6E",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 62,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3282,
    "slug": "abdul-amidhon-s-nggi-imperator",
    "type": "film",
    "title": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР”"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n445-қисм.\n\n👉",
      "ru": "“АБДУЛҲАМИДХОН – СЎНГГИ ИМПЕРАТОР” \n445-қисм.\n\n👉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4oEtxiZKMVEX?s=VYAjVq5SmEj5_rhsixQdILPq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VYAjVq5SmEj5_rhsixQdILPq",
    "featured": false,
    "addedAt": 1790842242511,
    "updatedAt": 1790842242511,
    "duration": 50,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3283,
    "slug": "merlin-65-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 65 qism",
      "ru": "Merlin - 65 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 65 qism \n\nSerial yakunlandi❗️\nReaksiya qoldiramiz",
      "ru": "Merlin - 65 qism \n\nSerial yakunlandi❗️\nReaksiya qoldiramiz"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NIFTp6HKWxPn?s=-mNxGBzpSlFC-UhpvpCqAQUS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-mNxGBzpSlFC-UhpvpCqAQUS",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 47,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3284,
    "slug": "merlin-64-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 64 qism",
      "ru": "Merlin - 64 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 64 qism",
      "ru": "Merlin - 64 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YdnqhRbS_QZl?s=4QpDxhviXXvWGjAN5nPEJYiJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4QpDxhviXXvWGjAN5nPEJYiJ",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3285,
    "slug": "merlin-63-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 63 qism",
      "ru": "Merlin - 63 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 63 qism",
      "ru": "Merlin - 63 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/v0YmvBXj0mng?s=B5H7MKabofK2U5R12u70RYKb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/B5H7MKabofK2U5R12u70RYKb",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3286,
    "slug": "merlin-62-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 62 qism",
      "ru": "Merlin - 62 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 62 qism",
      "ru": "Merlin - 62 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jBuIm9wW5t7q?s=AmU2nou7ErXTRoqM4rPHAE9g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AmU2nou7ErXTRoqM4rPHAE9g",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3287,
    "slug": "merlin-61-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 61-qism",
      "ru": "Merlin - 61-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 61-qism",
      "ru": "Merlin - 61-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/oFBXRCuop6Qd?s=gqxQm4O8dyIkEVJ84esUwJZW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gqxQm4O8dyIkEVJ84esUwJZW",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3288,
    "slug": "merlin-60-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 60-qism",
      "ru": "Merlin - 60-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 60-qism",
      "ru": "Merlin - 60-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PNLdxvZDtCO6?s=bM8uxAHTteoBoeoR0x_yhCn0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bM8uxAHTteoBoeoR0x_yhCn0",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 39,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3289,
    "slug": "merlin-59-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin- 59-qism",
      "ru": "Merlin- 59-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin- 59-qism",
      "ru": "Merlin- 59-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/o8HjDGxT9v8W?s=bAB4GJmLxi7oIBs6fqngk3DM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bAB4GJmLxi7oIBs6fqngk3DM",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3290,
    "slug": "merlin-58-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 58-qism",
      "ru": "Merlin - 58-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 58-qism",
      "ru": "Merlin - 58-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eBMa3mn9B4li?s=agLAlXxt7qPfZs_foJz8raHK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/agLAlXxt7qPfZs_foJz8raHK",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3291,
    "slug": "merlin-57-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 57-qism",
      "ru": "Merlin - 57-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 57-qism",
      "ru": "Merlin - 57-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7j8LX9aAjBBS?s=Krh4YvG2HeljyV_gqhIFKvXC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Krh4YvG2HeljyV_gqhIFKvXC",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3292,
    "slug": "merlin-56-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 56-qism",
      "ru": "Merlin - 56-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 56-qism",
      "ru": "Merlin - 56-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0Kzx9sr-yjyI?s=Q9Nicws8kQgE_L6Jtcl3ae1v",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Q9Nicws8kQgE_L6Jtcl3ae1v",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3293,
    "slug": "merlin-55-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 55-qism",
      "ru": "Merlin - 55-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 55-qism",
      "ru": "Merlin - 55-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Ouv41Y3StsqN?s=iwSPkd6Bziptwkqryk76djyY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iwSPkd6Bziptwkqryk76djyY",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3294,
    "slug": "merlin-54-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 54-qism",
      "ru": "Merlin - 54-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 54-qism",
      "ru": "Merlin - 54-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1CeFTZWlGX-R?s=t3Lu6NeHJa-Qb5hU9Aokbjan",
    "trailer": "",
    "video": "https://dezocloud.uz/s/t3Lu6NeHJa-Qb5hU9Aokbjan",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3295,
    "slug": "merlin-53-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 53-qism",
      "ru": "Merlin - 53-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 53-qism",
      "ru": "Merlin - 53-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PVygUBfPMpeD?s=7F66j6BQNUtb1ih6nLat3vL_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7F66j6BQNUtb1ih6nLat3vL_",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3296,
    "slug": "merlin-52-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 52-qism",
      "ru": "Merlin - 52-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 52-qism",
      "ru": "Merlin - 52-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/O-_j6aZv8DNJ?s=3wqR8FgZ_HNubg5ACis6_eJc",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3wqR8FgZ_HNubg5ACis6_eJc",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3297,
    "slug": "merlin-51-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 51-qism",
      "ru": "Merlin: 51-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 51-qism",
      "ru": "Merlin: 51-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9QSoM72SzpEj?s=UmCUhSwu8-nd7GiRtol18yjT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UmCUhSwu8-nd7GiRtol18yjT",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3298,
    "slug": "merlin-50-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 50-qism",
      "ru": "Merlin - 50-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 50-qism",
      "ru": "Merlin - 50-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Jcf2R9yOAV6n?s=wlc_LZXOmTm-u4RvbRdOTG5b",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wlc_LZXOmTm-u4RvbRdOTG5b",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3299,
    "slug": "merlin-49-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 49-qism",
      "ru": "Merlin - 49-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 49-qism",
      "ru": "Merlin - 49-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JMjNZ7Ahc51A?s=ywcDdqUL5S5NzbwA4ynBWACi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ywcDdqUL5S5NzbwA4ynBWACi",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3300,
    "slug": "merlin-48-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 48-qism",
      "ru": "Merlin - 48-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 48-qism",
      "ru": "Merlin - 48-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K_TfhaFfc6lq?s=QZJB9__ypA-HVbUqrFLobiWr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QZJB9__ypA-HVbUqrFLobiWr",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3301,
    "slug": "merlin-47-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 47-qism",
      "ru": "Merlin - 47-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 47-qism",
      "ru": "Merlin - 47-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/LwsyFTGo6ZyE?s=Pv0NheiKjXoHHMSyAZBzEmmQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Pv0NheiKjXoHHMSyAZBzEmmQ",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3302,
    "slug": "merlin-46-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 46-qism",
      "ru": "Merlin: 46-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 46-qism",
      "ru": "Merlin: 46-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zeTxh_b7CCpn?s=hUcTNLmnlb-oLmopvn5UBF81",
    "trailer": "",
    "video": "https://dezocloud.uz/s/hUcTNLmnlb-oLmopvn5UBF81",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3303,
    "slug": "merlin-45-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 45-qism",
      "ru": "Merlin: 45-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 45-qism",
      "ru": "Merlin: 45-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yh5sYFXVypoL?s=my5F8YXPeNHopUEE7-1KtsR1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/my5F8YXPeNHopUEE7-1KtsR1",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3304,
    "slug": "merlin-44-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 44-qism",
      "ru": "Merlin: 44-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 44-qism",
      "ru": "Merlin: 44-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mNonKIQXjENV?s=1UlOVGrY45h_nrYytwZuXLI7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1UlOVGrY45h_nrYytwZuXLI7",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3305,
    "slug": "merlin-43-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 43-qism",
      "ru": "Merlin - 43-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 43-qism",
      "ru": "Merlin - 43-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-nC5ZozSa0Gm?s=dwUGX7jJ2sw6zzqVh6rUTTly",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dwUGX7jJ2sw6zzqVh6rUTTly",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3306,
    "slug": "merlin-42-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 42-qism",
      "ru": "Merlin - 42-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 42-qism",
      "ru": "Merlin - 42-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/L7QJ3z_lpOma?s=ZbrZjbijtiMz-xUIf1XoYtrJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZbrZjbijtiMz-xUIf1XoYtrJ",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3307,
    "slug": "merlin-41-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 41-qism",
      "ru": "Merlin - 41-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 41-qism",
      "ru": "Merlin - 41-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OsCkuGFOaMM7?s=kmmJ_RN8SxJsfk2u-70C0wDj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kmmJ_RN8SxJsfk2u-70C0wDj",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3308,
    "slug": "merlin-40-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 40 qism",
      "ru": "Merlin - 40 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 40 qism",
      "ru": "Merlin - 40 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eGj4q944n0nM?s=e2PAy2RTIPAEaRtTydZCsSQ8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/e2PAy2RTIPAEaRtTydZCsSQ8",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3309,
    "slug": "merlin-39-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 39 qism",
      "ru": "Merlin - 39 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 39 qism",
      "ru": "Merlin - 39 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/SFJydoKwkcwM?s=hFEO1JVKrgIBtDz1pI5n1zbB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/hFEO1JVKrgIBtDz1pI5n1zbB",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3310,
    "slug": "merlin-38-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 38 qism",
      "ru": "Merlin - 38 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 38 qism",
      "ru": "Merlin - 38 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8YMBQmcYuUU8?s=QhmU9XdGj_iaCTVnggVryEeD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QhmU9XdGj_iaCTVnggVryEeD",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3311,
    "slug": "merlin-37-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 37 qism",
      "ru": "Merlin - 37 qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 37 qism",
      "ru": "Merlin - 37 qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4ZMVi4oiO7pg?s=31sMytjX4lUXllVxZbX4wYeK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/31sMytjX4lUXllVxZbX4wYeK",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3312,
    "slug": "merlin-36-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 36-qism",
      "ru": "Merlin - 36-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 36-qism",
      "ru": "Merlin - 36-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/l1oE1mLIy6AF?s=NtZ8kqEiLgjCLy8ks2A5iwD1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NtZ8kqEiLgjCLy8ks2A5iwD1",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3313,
    "slug": "merlin-35-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 35-qism",
      "ru": "Merlin - 35-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 35-qism",
      "ru": "Merlin - 35-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/i2Ce4ZPIrR7R?s=50KSxgAE928GZupP9t9V3p7M",
    "trailer": "",
    "video": "https://dezocloud.uz/s/50KSxgAE928GZupP9t9V3p7M",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3314,
    "slug": "merlin-34-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 34-qism",
      "ru": "Merlin - 34-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 34-qism",
      "ru": "Merlin - 34-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qwZLivuudRnq?s=1HCbm2rr_Hi66bDhyNiYDok_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1HCbm2rr_Hi66bDhyNiYDok_",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3315,
    "slug": "merlin-33-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 33-qism",
      "ru": "Merlin - 33-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 33-qism",
      "ru": "Merlin - 33-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YIfgHZ3M7p9g?s=zsLpqo4PbjVbGxTa1Yuf0l5T",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zsLpqo4PbjVbGxTa1Yuf0l5T",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3316,
    "slug": "merlin-32-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 32-qism",
      "ru": "Merlin - 32-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 32-qism",
      "ru": "Merlin - 32-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2Y5s9fFCospv?s=AXAl5l502CEsbF1KH7Ua1mRe",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AXAl5l502CEsbF1KH7Ua1mRe",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3317,
    "slug": "merlin-31-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 31-qism",
      "ru": "Merlin - 31-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 31-qism",
      "ru": "Merlin - 31-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GhBG5_ucbJi_?s=f1D9soHdOp-5f553JY91Ixdt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/f1D9soHdOp-5f553JY91Ixdt",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3318,
    "slug": "merlin-30-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 30-qism",
      "ru": "Merlin - 30-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 30-qism",
      "ru": "Merlin - 30-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/smSBpJGltUta?s=pUesT4zgL6c31ahpa_sEzLsL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pUesT4zgL6c31ahpa_sEzLsL",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3319,
    "slug": "merlin-29-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 29-qism",
      "ru": "Merlin - 29-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 29-qism",
      "ru": "Merlin - 29-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KD-9pXe5_wPw?s=d08EUPe6F9u7FMHt0R7bI4QA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/d08EUPe6F9u7FMHt0R7bI4QA",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3320,
    "slug": "merlin-28-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 28-qism",
      "ru": "Merlin - 28-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 28-qism",
      "ru": "Merlin - 28-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QHaq2seBh6I3?s=IL-_D07WirsZGF-zcTJw4L4F",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IL-_D07WirsZGF-zcTJw4L4F",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3321,
    "slug": "merlin-27-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 27-qism",
      "ru": "Merlin: 27-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 27-qism",
      "ru": "Merlin: 27-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nA8Kt567GA0y?s=iceA-5CU5DSw3iVaxdOtbm2x",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iceA-5CU5DSw3iVaxdOtbm2x",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3322,
    "slug": "merlin-26-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 26-qism",
      "ru": "Merlin: 26-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 26-qism",
      "ru": "Merlin: 26-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3urc0oGmTKum?s=i0stZqbldj_-QUwXQa6E3VeV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/i0stZqbldj_-QUwXQa6E3VeV",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 48,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3323,
    "slug": "merlin-25-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 25-qism",
      "ru": "Merlin: 25-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 25-qism",
      "ru": "Merlin: 25-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fxjX6Tj-vcSW?s=rjiFvyIGPq-nLzxAm3m60oid",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rjiFvyIGPq-nLzxAm3m60oid",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3324,
    "slug": "merlin-24-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 24-qism",
      "ru": "Merlin: 24-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 24-qism",
      "ru": "Merlin: 24-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/l3iW6Lu6xi-H?s=BlsOulPGcVVKOuafCCkCETHg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BlsOulPGcVVKOuafCCkCETHg",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 42,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3325,
    "slug": "merlin-23-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin : 23-qism",
      "ru": "Merlin : 23-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin : 23-qism",
      "ru": "Merlin : 23-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lqCNZLY5DcFU?s=1520BumDpg-VOOtPR1vnR6wY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1520BumDpg-VOOtPR1vnR6wY",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3326,
    "slug": "merlin-22-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 22-qism",
      "ru": "Merlin: 22-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 22-qism",
      "ru": "Merlin: 22-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/w5tIPmKXCNbE?s=6BY9QS-QEapt8lEdOHL2M39O",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6BY9QS-QEapt8lEdOHL2M39O",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3327,
    "slug": "merlin-21-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 21-qism",
      "ru": "Merlin: 21-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 21-qism",
      "ru": "Merlin: 21-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/melddWtgO_e2?s=jI3LY0pCcYEsUjqWK7wcmAS4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jI3LY0pCcYEsUjqWK7wcmAS4",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3328,
    "slug": "merlin-20-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 20-qism",
      "ru": "Merlin - 20-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 20-qism",
      "ru": "Merlin - 20-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7ju9CUwVDLNM?s=7mjt0SbQmJ4CvJSr0xYlSd-s",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7mjt0SbQmJ4CvJSr0xYlSd-s",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3329,
    "slug": "merlin-19-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin-19-qism",
      "ru": "Merlin-19-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin-19-qism",
      "ru": "Merlin-19-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rqAhLmAGGWHN?s=ISuKThI5GI4D0x4vwUnZZ1iS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ISuKThI5GI4D0x4vwUnZZ1iS",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3330,
    "slug": "merlin-18-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin- 18-qism",
      "ru": "Merlin- 18-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin- 18-qism",
      "ru": "Merlin- 18-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VjVSJInb8Ys0?s=YskrjPR_0U_8XoP4HAy4kdBU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YskrjPR_0U_8XoP4HAy4kdBU",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3331,
    "slug": "merlin-17-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin - 17-qism",
      "ru": "Merlin - 17-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin - 17-qism",
      "ru": "Merlin - 17-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Bslp6ZQZSOK1?s=9SWB5jNnLPjTfAqBAjyWwuuT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9SWB5jNnLPjTfAqBAjyWwuuT",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3332,
    "slug": "merlin-16-qism",
    "type": "serial",
    "title": {
      "uz": "Merlin: 16-qism",
      "ru": "Merlin: 16-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin: 16-qism",
      "ru": "Merlin: 16-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AX7Q0vOObQcc?s=Pl1jAbKmip4DRDnQRaB7871M",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Pl1jAbKmip4DRDnQRaB7871M",
    "featured": false,
    "addedAt": 1790848717320,
    "updatedAt": 1790848717320,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3333,
    "slug": "merlin-15-qism",
    "type": "film",
    "title": {
      "uz": "Merlin- 15-qism",
      "ru": "Merlin- 15-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin- 15-qism",
      "ru": "Merlin- 15-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cSvIGCba9UJL?s=eO32qOxI5uMFaFYlvwInlk91",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eO32qOxI5uMFaFYlvwInlk91",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3334,
    "slug": "merlin-14-qism",
    "type": "film",
    "title": {
      "uz": "Merlin- 14-qism",
      "ru": "Merlin- 14-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Merlin- 14-qism",
      "ru": "Merlin- 14-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Imlj8qcViPO9?s=w_EeP-x8bswvisgO7ThPfQN_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/w_EeP-x8bswvisgO7ThPfQN_",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3335,
    "slug": "1-mavsum-13-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 13-qism",
      "ru": "1-mavsum 13-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 13-qism\n\n1-mavsum yakunlandi❗️",
      "ru": "1-mavsum 13-qism\n\n1-mavsum yakunlandi❗️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/VYSG48UWZXnx?s=T7ds8DBrx5D9CjmHgkfTIVjU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/T7ds8DBrx5D9CjmHgkfTIVjU",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3336,
    "slug": "1-mavsum-12-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 12-qism",
      "ru": "1-mavsum 12-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 12-qism",
      "ru": "1-mavsum 12-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QWcZXbwLWN7S?s=E_NdHIixynQI_lfAY8hyCclV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E_NdHIixynQI_lfAY8hyCclV",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3337,
    "slug": "1-mavsum-11-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 11-qism",
      "ru": "1-mavsum 11-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 11-qism",
      "ru": "1-mavsum 11-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wU7bb9XmxBma?s=JGzeNVPkgwhTbIHH1z01CIcq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JGzeNVPkgwhTbIHH1z01CIcq",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3338,
    "slug": "1-mavsum-10-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 10-qism",
      "ru": "1-mavsum 10-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 10-qism",
      "ru": "1-mavsum 10-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZzwmCU71yYRu?s=xjfBlSIkfIHUe0m3r5eU2Ilj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xjfBlSIkfIHUe0m3r5eU2Ilj",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3339,
    "slug": "1-mavsum-9-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 9-qism",
      "ru": "1-mavsum 9-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 9-qism",
      "ru": "1-mavsum 9-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wL7ILnPFjGIP?s=8m-gsmUBytjxZExFatL5NpfB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8m-gsmUBytjxZExFatL5NpfB",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3340,
    "slug": "1-mavsum-8-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 8-qism",
      "ru": "1-mavsum 8-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 8-qism",
      "ru": "1-mavsum 8-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xakYcod-Xi8X?s=ESt9BTQOBbyWod9sJ9adnMZP",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ESt9BTQOBbyWod9sJ9adnMZP",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3341,
    "slug": "1-mavsum-7-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 7-qism",
      "ru": "1-mavsum 7-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 7-qism",
      "ru": "1-mavsum 7-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CVnV6CS32RbE?s=KaURUcqsSj4j41jdUWpIalCM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KaURUcqsSj4j41jdUWpIalCM",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3342,
    "slug": "1-mavsum-6-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 6-qism",
      "ru": "1-mavsum 6-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 6-qism",
      "ru": "1-mavsum 6-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/k6MITF1Rse1d?s=X5kOHfASokXUby74v3BV_o92",
    "trailer": "",
    "video": "https://dezocloud.uz/s/X5kOHfASokXUby74v3BV_o92",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3343,
    "slug": "1-mavsum-5-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 5-qism",
      "ru": "1-mavsum 5-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 5-qism",
      "ru": "1-mavsum 5-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Jli7tNmXNngI?s=eUPsUvhdxLq5hZuqYhs0O7lf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eUPsUvhdxLq5hZuqYhs0O7lf",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3344,
    "slug": "1-mavsum-4-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 4-qism",
      "ru": "1-mavsum 4-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 4-qism",
      "ru": "1-mavsum 4-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sAs4hS7s3zn9?s=f6eNym33UoJG8mHb0cmga3RC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/f6eNym33UoJG8mHb0cmga3RC",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3345,
    "slug": "1-mavsum-3-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 3-qism",
      "ru": "1-mavsum 3-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 3-qism",
      "ru": "1-mavsum 3-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/INqoGAJY508P?s=WzJ_WpZceVRvrpCJktIOH4ZQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WzJ_WpZceVRvrpCJktIOH4ZQ",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 44,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3346,
    "slug": "1-mavsum-2-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 2-qism",
      "ru": "1-mavsum 2-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 2-qism",
      "ru": "1-mavsum 2-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2_LFef_NNwMb?s=TtXiPNDkkEYsp867GDOekAxY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TtXiPNDkkEYsp867GDOekAxY",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 45,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3347,
    "slug": "1-mavsum-1-qism",
    "type": "film",
    "title": {
      "uz": "1-mavsum 1-qism",
      "ru": "1-mavsum 1-qism"
    },
    "genres": [
      "biography"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "1-mavsum 1-qism",
      "ru": "1-mavsum 1-qism"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1DwKZmrhggZq?s=mBJCDBGk_MCbwwkXBW9Xi-wM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mBJCDBGk_MCbwwkXBW9Xi-wM",
    "featured": false,
    "addedAt": 1790848733305,
    "updatedAt": 1790848733305,
    "duration": 43,
    "year": 2026,
    "audio": "uz"
  }
]/*END*/;
const HIDDEN_MOVIES = /*HIDDEN*/[21]/*ENDHIDDEN*/;

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
