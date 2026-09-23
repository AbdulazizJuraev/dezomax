/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
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
