/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 3281,
    "slug": "uch-tomonlama-tahdid-2019",
    "type": "film",
    "title": {
      "uz": "Uch Tomonlama tahdid (2019)",
      "ru": "Uch Tomonlama tahdid (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Uch Tomonlama tahdid (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH, Xitoy\nJanri: ,",
      "ru": "Uch Tomonlama tahdid (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH, Xitoy\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GkhzVt2j3TfO?s=vrOTc2F-9zfFpeoPUSYJuuNS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vrOTc2F-9zfFpeoPUSYJuuNS",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 101,
    "size": 474067891,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3282,
    "slug": "juma-muborak",
    "type": "film",
    "title": {
      "uz": "Juma muborak",
      "ru": "Juma muborak"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Juma muborak",
      "ru": "Juma muborak"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7qkCC7LwBukJ?s=BqNUydkz1Pg4c7QU8aFmeXCt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BqNUydkz1Pg4c7QU8aFmeXCt",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 3,
    "size": 16665216,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3283,
    "slug": "yovvoyi-jangchi-2017",
    "type": "film",
    "title": {
      "uz": "Yovvoyi Jangchi ( 2017 )",
      "ru": "Yovvoyi Jangchi ( 2017 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Yovvoyi Jangchi ( 2017 )\nO'zbek Tilida [1080p/FullHD]\nDavlati: AQSH\nJanri: ,",
      "ru": "Yovvoyi Jangchi ( 2017 )\nO'zbek Tilida [1080p/FullHD]\nDavlati: AQSH\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8nmVoaxYUfhE?s=Utl1W9Xhl06BJYi7l87oEUyV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Utl1W9Xhl06BJYi7l87oEUyV",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 84,
    "size": 1352764404,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3284,
    "slug": "betmen-protiv-cherepashek-nindzya-2019",
    "type": "film",
    "title": {
      "uz": "Бэтмен против Черепашек-ниндзя (2019)",
      "ru": "Бэтмен против Черепашек-ниндзя (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Бэтмен против Черепашек-ниндзя (2019)",
      "ru": "Бэтмен против Черепашек-ниндзя (2019)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DYTHJLXhB_iK?s=C30P-HEJ7Dh3Og9CORhzGCXf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/C30P-HEJ7Dh3Og9CORhzGCXf",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 404506140,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3285,
    "slug": "kino-planet-2019",
    "type": "film",
    "title": {
      "uz": "KINO PLANET 2019",
      "ru": "KINO PLANET 2019"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🏆 KINO PLANET 2019 🏆\n\nNOMI: KUNG FU PANDA \nDAVLAT: QITOY\nJANRI: \nFARMAT: MP4\nTILI: UZBEK TILIDA\nDAVOMIYLIGI: 1:23:24\nHAJMI: 232 MB",
      "ru": "🏆 KINO PLANET 2019 🏆\n\nNOMI: KUNG FU PANDA \nDAVLAT: QITOY\nJANRI: \nFARMAT: MP4\nTILI: UZBEK TILIDA\nDAVOMIYLIGI: 1:23:24\nHAJMI: 232 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3wiU26iq8b7N?s=jQMWhjKUbF0UO5-qLPf1EV4d",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jQMWhjKUbF0UO5-qLPf1EV4d",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 83,
    "size": 243795370,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3286,
    "slug": "kino-planet-2019",
    "type": "film",
    "title": {
      "uz": "KINO PLANET 2019",
      "ru": "KINO PLANET 2019"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🏆 KINO PLANET 2019 🏆\n\nNOMI: KUNGFU PANDA\nDAVLAT : QITOY\nJANRI : \nFARMAT : MP4\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 1:23:53\nHAJMI : 232 MB",
      "ru": "🏆 KINO PLANET 2019 🏆\n\nNOMI: KUNGFU PANDA\nDAVLAT : QITOY\nJANRI : \nFARMAT : MP4\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 1:23:53\nHAJMI : 232 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/foXTdBKmSwO3?s=eH4hM4bA_yMsaa0EO68w0jP6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eH4hM4bA_yMsaa0EO68w0jP6",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 84,
    "size": 244058141,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3287,
    "slug": "nomi-skawitlar",
    "type": "film",
    "title": {
      "uz": "NOMI: SKAWITLAR",
      "ru": "NOMI: SKAWITLAR"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI: SKAWITLAR\nDAVLAT: AQSH\nCHQAN SANA: 2015\nJANRI : UJIS, KAMEDIA\nFARMAT : HD\nTILI: RUS TILIDA\nDAVOMIYLIGI: 1:32:46\nHAJMI: 390 MB",
      "ru": "NOMI: SKAWITLAR\nDAVLAT: AQSH\nCHQAN SANA: 2015\nJANRI : UJIS, KAMEDIA\nFARMAT : HD\nTILI: RUS TILIDA\nDAVOMIYLIGI: 1:32:46\nHAJMI: 390 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/flMZUWPhDLOp?s=qTqj4x1pTqPUJqMaxm70iuFm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qTqj4x1pTqPUJqMaxm70iuFm",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 93,
    "size": 409794482,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3288,
    "slug": "film-nomi-dunyo-boylab-80kun-ozbek-tilid",
    "type": "film",
    "title": {
      "uz": "Filм noмi: Dunyo bo'ylab 80kun O'zbek tilid",
      "ru": "Filм noмi: Dunyo bo'ylab 80kun O'zbek tilid"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: Dunyo bo'ylab 80kun O'zbek tilid\nSifaтi: HD\nTili: Uzbek tilida\n Janri:",
      "ru": "Filм noмi: Dunyo bo'ylab 80kun O'zbek tilid\nSifaтi: HD\nTili: Uzbek tilida\n Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YOvWyxtMHRPg?s=yT7LmthD0oUSSjoiD-5_frAi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yT7LmthD0oUSSjoiD-5_frAi",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 113,
    "size": 971840512,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3289,
    "slug": "nomi-karib-dengiz-qaroqchilari",
    "type": "film",
    "title": {
      "uz": "Nomi: Karib dengiz qaroqchilari",
      "ru": "Nomi: Karib dengiz qaroqchilari"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Karib dengiz qaroqchilari\nJanri: \nTili: Ózbekcha \nFormat: HD",
      "ru": "Nomi: Karib dengiz qaroqchilari\nJanri: \nTili: Ózbekcha \nFormat: HD"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/655JxecbHCoo?s=rWJjrWCzPKDC9MzcW0nvqz3C",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rWJjrWCzPKDC9MzcW0nvqz3C",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 143,
    "size": 557284726,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3290,
    "slug": "qaytish-nuqtasi-2018-tili-ozbek-tilida-davlat-aqsh-kanadajan",
    "type": "film",
    "title": {
      "uz": "Qaytish Nuqtasi (2018) Tili: O'zbek Tilida Davlat :AQSH, KanadaJanri",
      "ru": "Qaytish Nuqtasi (2018) Tili: O'zbek Tilida Davlat :AQSH, KanadaJanri"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qaytish Nuqtasi (2018) Tili: O'zbek Tilida Davlat :AQSH, KanadaJanri:",
      "ru": "Qaytish Nuqtasi (2018) Tili: O'zbek Tilida Davlat :AQSH, KanadaJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/99kpUXDsNgX7?s=iFnEm1iT6jIYTl4BOXQzqz8m",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iFnEm1iT6jIYTl4BOXQzqz8m",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 84,
    "size": 369403222,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3291,
    "slug": "film-nomi-chumolilar-xujumi-ozbek-tilida",
    "type": "film",
    "title": {
      "uz": "Filм noмi: Chumolilar Xujumi (O'zbek tilida)",
      "ru": "Filм noмi: Chumolilar Xujumi (O'zbek tilida)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: Chumolilar Xujumi (O'zbek tilida)\nSifaтi: HD\nTili: Uzbek tilida\n Janri:",
      "ru": "Filм noмi: Chumolilar Xujumi (O'zbek tilida)\nSifaтi: HD\nTili: Uzbek tilida\n Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gYb8Kk2YUX3F?s=awBmFAuW_bz9P5tG02xhhq0s",
    "trailer": "",
    "video": "https://dezocloud.uz/s/awBmFAuW_bz9P5tG02xhhq0s",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 77,
    "size": 433522527,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3292,
    "slug": "nomi-akula-koli",
    "type": "film",
    "title": {
      "uz": "Nomi: Akula ko'li",
      "ru": "Nomi: Akula ko'li"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Akula ko'li\nNomi: O'zbekcha\nDavlati: AQSH\nJanri: #Ujas",
      "ru": "Nomi: Akula ko'li\nNomi: O'zbekcha\nDavlati: AQSH\nJanri: #Ujas"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vnsp_GtdbwIu?s=tyszhjyyQNzy8llzBsvkG4ce",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tyszhjyyQNzy8llzBsvkG4ce",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 82,
    "size": 490846426,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3293,
    "slug": "nomi-legenda",
    "type": "film",
    "title": {
      "uz": "Nomi: Legenda",
      "ru": "Nomi: Legenda"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Legenda\nDavlat: AQSH\nJanri: #krimal\nFormat: HD\nTili: Ruscha\nDavomiyliga: 130:18",
      "ru": "Nomi: Legenda\nDavlat: AQSH\nJanri: #krimal\nFormat: HD\nTili: Ruscha\nDavomiyliga: 130:18"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Znm_s6TgtCzj?s=qbyRBx_ttoAH__34VwUrawT2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qbyRBx_ttoAH__34VwUrawT2",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 131,
    "size": 439775279,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3294,
    "slug": "nomi-maymunlar-sayorasi",
    "type": "film",
    "title": {
      "uz": "Nomi: Maymunlar sayorasi",
      "ru": "Nomi: Maymunlar sayorasi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Maymunlar sayorasi\nDavlati: AQSH\nJanr: \nFarmat: HD \nTili: Ózbekcha \nDavomiylig: 130:24\nHajmi :483 MB",
      "ru": "Nomi: Maymunlar sayorasi\nDavlati: AQSH\nJanr: \nFarmat: HD \nTili: Ózbekcha \nDavomiylig: 130:24\nHajmi :483 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/btCzfN17zyrc?s=NrJa4IM0M1yaE3d9PYBrFQkI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NrJa4IM0M1yaE3d9PYBrFQkI",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 130,
    "size": 507306850,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3295,
    "slug": "nomi-uzuklar-hukumdori-2",
    "type": "film",
    "title": {
      "uz": "NOMI UZUKLAR HUKUMDORI 2⃣",
      "ru": "NOMI UZUKLAR HUKUMDORI 2⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI UZUKLAR HUKUMDORI 2⃣\nDAVLAT AQSH\nCHQAN SANA 2002\nJANRI FANTASTIK\nFARMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 2:55:07\nHAJMI 692 MB",
      "ru": "NOMI UZUKLAR HUKUMDORI 2⃣\nDAVLAT AQSH\nCHQAN SANA 2002\nJANRI FANTASTIK\nFARMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 2:55:07\nHAJMI 692 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/M_0KtJ05qyBV?s=6ajWdl1wLqfE6-xRGDJU63IY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6ajWdl1wLqfE6-xRGDJU63IY",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 235,
    "size": 725710972,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3296,
    "slug": "nomi-uzuklar-hukumdori-3",
    "type": "film",
    "title": {
      "uz": "NOMI UZUKLAR HUKUMDORI 3⃣",
      "ru": "NOMI UZUKLAR HUKUMDORI 3⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI UZUKLAR HUKUMDORI 3⃣\nDAVLAT AQSH\nCHQAN SANA 2005 \nJANRI FANTASTIK\nFAMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 4:23:00\nHAJMI 679 MB",
      "ru": "NOMI UZUKLAR HUKUMDORI 3⃣\nDAVLAT AQSH\nCHQAN SANA 2005 \nJANRI FANTASTIK\nFAMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 4:23:00\nHAJMI 679 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/M54JVDVixX41?s=yJJzE7EJCmN39G4KS3Me7iJv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yJJzE7EJCmN39G4KS3Me7iJv",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 263,
    "size": 712857931,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3297,
    "slug": "nomi-labirint-3-olimga-qarshi-davo-davlat-aqsh",
    "type": "film",
    "title": {
      "uz": "NOMI Labirint 3: O'limga qarshi davo Davlat : AQSH",
      "ru": "NOMI Labirint 3: O'limga qarshi davo Davlat : AQSH"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI Labirint 3: O'limga qarshi davo ❗️Davlat : AQSH \nDavomiyligi: 02:23:08\nTarjima: O'zbek tilida\n Janr: , \nEng so'ngi tarjimakinolar",
      "ru": "NOMI Labirint 3: O'limga qarshi davo ❗️Davlat : AQSH \nDavomiyligi: 02:23:08\nTarjima: O'zbek tilida\n Janr: , \nEng so'ngi tarjimakinolar"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WDukMV9yvz2o?s=E6If9ftfUbQmaRCpFFgi2lvC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E6If9ftfUbQmaRCpFFgi2lvC",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 136,
    "size": 423353404,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3298,
    "slug": "nomi-mafiya",
    "type": "film",
    "title": {
      "uz": "NOMI : MAFIYA",
      "ru": "NOMI : MAFIYA"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : MAFIYA\nDAVLAT : RASSIA\nJANIR : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIG : 100:49\nHAJMI : 332 MB\n\nBIZGA QOSHILING👇",
      "ru": "NOMI : MAFIYA\nDAVLAT : RASSIA\nJANIR : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIG : 100:49\nHAJMI : 332 MB\n\nBIZGA QOSHILING👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xDp6nHVQETkx?s=HUOdG5ild3iXyfdLjt_XiwdL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HUOdG5ild3iXyfdLjt_XiwdL",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 101,
    "size": 348348237,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3299,
    "slug": "million-2019-yangi-konsert",
    "type": "film",
    "title": {
      "uz": "MILLION - 2019 YANGI KONSERT",
      "ru": "MILLION - 2019 YANGI KONSERT"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "MILLION - 2019 YANGI KONSERT \nTOMOSH QILING\nFarmati mobil HD\nMB si kamlarga\n\nBIZGA QOSHILING👇",
      "ru": "MILLION - 2019 YANGI KONSERT \nTOMOSH QILING\nFarmati mobil HD\nMB si kamlarga\n\nBIZGA QOSHILING👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jqO9Y5IbKQU9?s=cE5wWqWTlGCL4E5YyOtfoX-6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cE5wWqWTlGCL4E5YyOtfoX-6",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 149,
    "size": 398090283,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3300,
    "slug": "million-2019-yangi-konsert",
    "type": "film",
    "title": {
      "uz": "MILLION - 2019 YANGI KONSERT",
      "ru": "MILLION - 2019 YANGI KONSERT"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "MILLION - 2019 YANGI KONSERT \nTOMOSH QILING\nFarmati HD\n\nBizga Qo'shiling 👇",
      "ru": "MILLION - 2019 YANGI KONSERT \nTOMOSH QILING\nFarmati HD\n\nBizga Qo'shiling 👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1k_fqcjHTChJ?s=zU6XHiOmCi-aoMf-a_RPohz0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zU6XHiOmCi-aoMf-a_RPohz0",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 149,
    "size": 760119627,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3301,
    "slug": "nomi-labirint",
    "type": "film",
    "title": {
      "uz": "NOMI : LABIRINT",
      "ru": "NOMI : LABIRINT"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : LABIRINT \nDAVLATI : AQSH\nJANIRI : \nFORMAT : HD \nTILI : OZBEK TILIDA\nDAVOMIYLIGI : 113:01\nHAJMI : 407 MB\n\nBIZGA QOSHILING👇🏻",
      "ru": "NOMI : LABIRINT \nDAVLATI : AQSH\nJANIRI : \nFORMAT : HD \nTILI : OZBEK TILIDA\nDAVOMIYLIGI : 113:01\nHAJMI : 407 MB\n\nBIZGA QOSHILING👇🏻"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/P9T5XlnAMKpT?s=0P6nZawQeXpR27sm9AhnavOz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0P6nZawQeXpR27sm9AhnavOz",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 113,
    "size": 426861513,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3302,
    "slug": "nomi-uzuklar-hukimdori",
    "type": "film",
    "title": {
      "uz": "NOMI : UZUKLAR HUKIMDORI",
      "ru": "NOMI : UZUKLAR HUKIMDORI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : UZUKLAR HUKIMDORI\nDAVLAT : AQSH\nJANRI : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 3:20:16\nHAJMI : 488 MB",
      "ru": "NOMI : UZUKLAR HUKIMDORI\nDAVLAT : AQSH\nJANRI : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 3:20:16\nHAJMI : 488 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nNfqqbwIGVZq?s=cp1eN_r8nTxsYVKYfOaAu9mM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cp1eN_r8nTxsYVKYfOaAu9mM",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 200,
    "size": 512646974,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3303,
    "slug": "nomi-qasoskorlar-4",
    "type": "film",
    "title": {
      "uz": "NOMI : QASOSKORLAR 4⃣",
      "ru": "NOMI : QASOSKORLAR 4⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : QASOSKORLAR 4⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 3:01:11\nHAJMI : 674 MB",
      "ru": "NOMI : QASOSKORLAR 4⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 3:01:11\nHAJMI : 674 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JsKa5kgT4tcQ?s=ln7JRfZJ_lucrREF2r8Kflh8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ln7JRfZJ_lucrREF2r8Kflh8",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 181,
    "size": 707322544,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3304,
    "slug": "nomi-qasoskorlar-3",
    "type": "film",
    "title": {
      "uz": "NOMI : QASOSKORLAR 3⃣",
      "ru": "NOMI : QASOSKORLAR 3⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : QASOSKORLAR 3⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT : FULL HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 2:29:21\nHAJMI : 762 MB",
      "ru": "NOMI : QASOSKORLAR 3⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT : FULL HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 2:29:21\nHAJMI : 762 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/twqdkRHBRqyx?s=FZiCkpTS7eHR6i2CFBq3ISLg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/FZiCkpTS7eHR6i2CFBq3ISLg",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 149,
    "size": 799488665,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3305,
    "slug": "nomi-qasoskorlar-2",
    "type": "film",
    "title": {
      "uz": "NOMI : QASOSKORLAR 2⃣",
      "ru": "NOMI : QASOSKORLAR 2⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI : QASOSKORLAR 2⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 2:21:18\nHAJMI : 488 MB",
      "ru": "NOMI : QASOSKORLAR 2⃣\nDAVLAT : AQSH\nJANRI : \nFARMAT : HD\nTILI : UZBEK TILIDA\nDAVOMIYLIGI : 2:21:18\nHAJMI : 488 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QSJ4p0jLl42B?s=OCLdERorE7KvQGjjLC3qEinL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OCLdERorE7KvQGjjLC3qEinL",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 141,
    "size": 512145538,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3306,
    "slug": "nomi-qasoskorlar",
    "type": "film",
    "title": {
      "uz": "NOMI QASOSKORLAR",
      "ru": "NOMI QASOSKORLAR"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI QASOSKORLAR\nDAVLAT AQSH\nCHQAN SANA 2012\nJANRI FANTASTIK\nFARMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 2:22:54\nHAJMI 525 MB",
      "ru": "NOMI QASOSKORLAR\nDAVLAT AQSH\nCHQAN SANA 2012\nJANRI FANTASTIK\nFARMAT HD\nTILI UZBEK TILIDA\nDAVOMIYLIGI 2:22:54\nHAJMI 525 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9uMIb0yZ7Ba1?s=4wmlKI1wO0oXccttBuCx7mrm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4wmlKI1wO0oXccttBuCx7mrm",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 143,
    "size": 551215046,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3307,
    "slug": "orgimchak-odam-koinotlar-aro",
    "type": "film",
    "title": {
      "uz": "O'rgimchak-Odam Koinotlar Aro",
      "ru": "O'rgimchak-Odam Koinotlar Aro"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "O'rgimchak-Odam Koinotlar Aro\nDavlat:AQSH\nFormat:HD\nTili:Ózbekcha\nJanri:#fantastika",
      "ru": "O'rgimchak-Odam Koinotlar Aro\nDavlat:AQSH\nFormat:HD\nTili:Ózbekcha\nJanri:#fantastika"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GmcWm9MCJvAk?s=WWEqexsn1j4S6holC47FN599",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WWEqexsn1j4S6holC47FN599",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 117,
    "size": 454283565,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3308,
    "slug": "orgimchak-odam-3",
    "type": "film",
    "title": {
      "uz": "Orgimchak odam-3",
      "ru": "Orgimchak odam-3"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Orgimchak odam-3\nDavlat: AQSH\nFormat: HD\nTili: Ózbekcha\nJanri:",
      "ru": "Orgimchak odam-3\nDavlat: AQSH\nFormat: HD\nTili: Ózbekcha\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tYcKwXB1c9-b?s=la9iskCZEscWA_CAcsFlxRMv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/la9iskCZEscWA_CAcsFlxRMv",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 132,
    "size": 382801065,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3309,
    "slug": "orgimchak-odam-2",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak Odam 2",
      "ru": "O‘rgimchak Odam 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "O‘rgimchak Odam 2\nDavlati: AQSH\nFormati: HD\nTili: O'zbekcha\nJanri:",
      "ru": "O‘rgimchak Odam 2\nDavlati: AQSH\nFormati: HD\nTili: O'zbekcha\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TR2qaQvkWVC0?s=EYCI2Mq3grVLk7l7okEJKRaU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EYCI2Mq3grVLk7l7okEJKRaU",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 122,
    "size": 449840355,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3310,
    "slug": "orgimchak-odam-2002",
    "type": "film",
    "title": {
      "uz": "O‘rgimchak Odam 2002",
      "ru": "O‘rgimchak Odam 2002"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "O‘rgimchak Odam 2002\nDavlati: AQSH\nFormati: HD\nTili: Õzbek tili",
      "ru": "O‘rgimchak Odam 2002\nDavlati: AQSH\nFormati: HD\nTili: Õzbek tili"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UtBb-T5w5x0Y?s=_VFPVKZOg5_nlOUPsnhoCr3R",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_VFPVKZOg5_nlOUPsnhoCr3R",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 116,
    "size": 524030553,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3311,
    "slug": "juma-muborak",
    "type": "film",
    "title": {
      "uz": "Juma muborak",
      "ru": "Juma muborak"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Juma muborak",
      "ru": "Juma muborak"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RAUCB_wRV06A?s=kVvGTJfuaKQhdcJIeuMdUhXe",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kVvGTJfuaKQhdcJIeuMdUhXe",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 1,
    "size": 1669813,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3312,
    "slug": "uch-bahodir-dengiz-ortida",
    "type": "film",
    "title": {
      "uz": "Uch Bahodir Dengiz Ortida",
      "ru": "Uch Bahodir Dengiz Ortida"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Uch Bahodir Dengiz Ortida\n O'zbek Tilida [HD]\n Davlati: Rossiya (2012)\nJanri: Oilaviy, Komediya",
      "ru": "Uch Bahodir Dengiz Ortida\n O'zbek Tilida [HD]\n Davlati: Rossiya (2012)\nJanri: Oilaviy, Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uaukxV2aQHAw?s=2hXmhhC1z20SglT4_RWKKyPv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2hXmhhC1z20SglT4_RWKKyPv",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 62,
    "size": 136132011,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3313,
    "slug": "uch-bahodir-va-taxt-vorisi-2019",
    "type": "film",
    "title": {
      "uz": "Uch Bahodir va Taxt vorisi (2019)",
      "ru": "Uch Bahodir va Taxt vorisi (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Uch Bahodir va Taxt vorisi (2019) \n O'zbek Tilida [360p/HD]\n Davlati: Rossiya \n Janri: Sarguzasht,",
      "ru": "Uch Bahodir va Taxt vorisi (2019) \n O'zbek Tilida [360p/HD]\n Davlati: Rossiya \n Janri: Sarguzasht,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lVdZ9AW8Djqx?s=bybjETyxQv3_jM7HtnxNyMrW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bybjETyxQv3_jM7HtnxNyMrW",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 77,
    "size": 209415887,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3314,
    "slug": "qora-pantera",
    "type": "film",
    "title": {
      "uz": "Qora Pantera",
      "ru": "Qora Pantera"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qora Pantera\n Davlati: AQSh\n Davomiyligi: 2:03:18\n Tarjima: O'zbek tilida",
      "ru": "Qora Pantera\n Davlati: AQSh\n Davomiyligi: 2:03:18\n Tarjima: O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dvFGkBwAwp8d?s=cNgzQngPVpt9pu7B2ybdsC2n",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cNgzQngPVpt9pu7B2ybdsC2n",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 123,
    "size": 467442045,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3315,
    "slug": "galaktikaquriqchilari-2",
    "type": "film",
    "title": {
      "uz": "GalaktikaQuriqchilari-2",
      "ru": "GalaktikaQuriqchilari-2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "GalaktikaQuriqchilari-2 \nÕzbek-Tilida\nHajmi 444\nJanri #jangari",
      "ru": "GalaktikaQuriqchilari-2 \nÕzbek-Tilida\nHajmi 444\nJanri #jangari"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MFyp89msrUxR?s=BRLpNPqm7v0Y_RDISihK62nW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BRLpNPqm7v0Y_RDISihK62nW",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 126,
    "size": 466085568,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3316,
    "slug": "nomi-galaktika-qoriqchilari",
    "type": "film",
    "title": {
      "uz": "Nomi Galaktika Qo'riqchilari",
      "ru": "Nomi Galaktika Qo'riqchilari"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi Galaktika Qo'riqchilari\nYili 2⃣0⃣1⃣4⃣\nSifati HD\nHajmi 338 MB\nDavlati AQSH \nJanri Fantastika Jangari \nTili O'zbek tili",
      "ru": "Nomi Galaktika Qo'riqchilari\nYili 2⃣0⃣1⃣4⃣\nSifati HD\nHajmi 338 MB\nDavlati AQSH \nJanri Fantastika Jangari \nTili O'zbek tili"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Hd90Cl9JJaBg?s=OQfp3iIP8ulF4_40Ptojohwr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OQfp3iIP8ulF4_40Ptojohwr",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 115,
    "size": 355356234,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3317,
    "slug": "jahldor-qushlar-2",
    "type": "film",
    "title": {
      "uz": "\"JAHLDOR QUSHLAR-2\"",
      "ru": "\"JAHLDOR QUSHLAR-2\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "\"JAHLDOR QUSHLAR-2\"\nDAVLATI : AQSH\nYILI : 2019 \nJanri : \nSIFATI : HD\nHAJMI 350.6 Mb\n 1:29:20 R U S Tilida",
      "ru": "\"JAHLDOR QUSHLAR-2\"\nDAVLATI : AQSH\nYILI : 2019 \nJanri : \nSIFATI : HD\nHAJMI 350.6 Mb\n 1:29:20 R U S Tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BaXftSBRLED2?s=JG79IIaA2ABpI2e6C0QkUm7g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JG79IIaA2ABpI2e6C0QkUm7g",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 367624138,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3318,
    "slug": "nomi-bambilbi",
    "type": "film",
    "title": {
      "uz": "Nomi Bambilbi",
      "ru": "Nomi Bambilbi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi Bambilbi\nDavlat AQSH\nTil O'ZBEK TILIDA\nFarmat HD\n Janir ▪ \nDavomiyligi 01:57:06\n316.8mb",
      "ru": "Nomi Bambilbi\nDavlat AQSH\nTil O'ZBEK TILIDA\nFarmat HD\n Janir ▪ \nDavomiyligi 01:57:06\n316.8mb"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/e6BmUCBSeose?s=XZfiAmCfiQP-dFQ45-ql_sZE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XZfiAmCfiQP-dFQ45-ql_sZE",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 107,
    "size": 332139221,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3319,
    "slug": "super-primyera",
    "type": "film",
    "title": {
      "uz": "Super primyera",
      "ru": "Super primyera"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Super primyera\nForsaj:Xobbs va Shou\nHD",
      "ru": "Super primyera\nForsaj:Xobbs va Shou\nHD"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lwwSam049HYV?s=Txp5QOrAR1AqWt6OCkxksafa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Txp5QOrAR1AqWt6OCkxksafa",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 129,
    "size": 500346651,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3320,
    "slug": "kino-planet-2019",
    "type": "film",
    "title": {
      "uz": "KINO PLANET 2019",
      "ru": "KINO PLANET 2019"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🏆 KINO PLANET 2019 🏆\n\nNOMI JOKER\nDAVLAT AQSH\nCHQAN SANA 2019\nJANRI FANTASTIK, TRILLER\nFARMAT HD\nTILI RUS TILIDA\nDAVOMIYLIGI 1:55:58\nHAJMI 504 MB",
      "ru": "🏆 KINO PLANET 2019 🏆\n\nNOMI JOKER\nDAVLAT AQSH\nCHQAN SANA 2019\nJANRI FANTASTIK, TRILLER\nFARMAT HD\nTILI RUS TILIDA\nDAVOMIYLIGI 1:55:58\nHAJMI 504 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FNfAGK0Xl_aP?s=E5BmXOaRXNmKHxaYHxRPQlvq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E5BmXOaRXNmKHxaYHxRPQlvq",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 116,
    "size": 529250260,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3321,
    "slug": "oyinchoqlar-tarixi-4",
    "type": "film",
    "title": {
      "uz": "O'yinchoqlar tarixi 4 (ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ)",
      "ru": "O'yinchoqlar tarixi 4 (ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "O'yinchoqlar tarixi 4 (ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ)\n sɪғᴀᴛɪ: Zoʻr (💾328ᴍʙ)",
      "ru": "O'yinchoqlar tarixi 4 (ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ)\n sɪғᴀᴛɪ: Zoʻr (💾328ᴍʙ)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Yt9yu00MhK74?s=AW7LixKZRDryfsAT8wskDT7P",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AW7LixKZRDryfsAT8wskDT7P",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 94,
    "size": 343615357,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3322,
    "slug": "qirol-sher-2019-360p",
    "type": "film",
    "title": {
      "uz": "Qirol Sher (2019) [360p]",
      "ru": "Qirol Sher (2019) [360p]"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qirol Sher (2019) [360p]",
      "ru": "Qirol Sher (2019) [360p]"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zzrJWbOA-z_p?s=RnS-ZROx3Vv5nfxkriRjpPTy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RnS-ZROx3Vv5nfxkriRjpPTy",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 118,
    "size": 459010534,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3323,
    "slug": "minionlar-2015",
    "type": "film",
    "title": {
      "uz": "Minionlar (2015)",
      "ru": "Minionlar (2015)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Minionlar (2015) \nilk bor O'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Komediya, Sarguzasht, Jangari, Oilaviy",
      "ru": "Minionlar (2015) \nilk bor O'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Komediya, Sarguzasht, Jangari, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JTCz6oB1IH-O?s=dbfbUpLTFgYkjmlDqj3INU1W",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dbfbUpLTFgYkjmlDqj3INU1W",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 82,
    "size": 608284907,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3324,
    "slug": "xua-mulan-2-2004",
    "type": "film",
    "title": {
      "uz": "Xua Mulan 2 (2004)",
      "ru": "Xua Mulan 2 (2004)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Xua Mulan 2 (2004)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Musiqiy, Fentezi, Komediya, Sarguzasht, Oilaviy",
      "ru": "Xua Mulan 2 (2004)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Musiqiy, Fentezi, Komediya, Sarguzasht, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/M8XSMKubyDJj?s=SKxzXoQLODmyMVGlLMSevIct",
    "trailer": "",
    "video": "https://dezocloud.uz/s/SKxzXoQLODmyMVGlLMSevIct",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 71,
    "size": 294591194,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3325,
    "slug": "vaxshiy-2019",
    "type": "film",
    "title": {
      "uz": "Vaxshiy ( 2019 )",
      "ru": "Vaxshiy ( 2019 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Vaxshiy ( 2019 )\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Jangari, Drama",
      "ru": "Vaxshiy ( 2019 )\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Jangari, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CboYH9EgsBSr?s=jwQbD4c7ToF4crQK-X8QaQMk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jwQbD4c7ToF4crQK-X8QaQMk",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 92,
    "size": 405929153,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3326,
    "slug": "xua-mulan-1998",
    "type": "film",
    "title": {
      "uz": "Xua Mulan (1998)",
      "ru": "Xua Mulan (1998)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Xua Mulan (1998)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Musiqiy, Fentezi, Komediya, Sarguzasht, Oilaviy",
      "ru": "Xua Mulan (1998)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH \nJanri: Musiqiy, Fentezi, Komediya, Sarguzasht, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9JIaXhVnOqKa?s=SqHyoJ4EQJDFNmnHudI9mihK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/SqHyoJ4EQJDFNmnHudI9mihK",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 77,
    "size": 315329685,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3327,
    "slug": "golib-2019",
    "type": "film",
    "title": {
      "uz": "G'olib (2019)",
      "ru": "G'olib (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "G'olib (2019) \nO'zbek Tilida [360p]\nDavlati: Hindiston\nJanri: Jangari, Drama",
      "ru": "G'olib (2019) \nO'zbek Tilida [360p]\nDavlati: Hindiston\nJanri: Jangari, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eJx51gTImxbJ?s=J3LFQjdvq-3wzYuNeg-ozdpr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/J3LFQjdvq-3wzYuNeg-ozdpr",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 166,
    "size": 576942124,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3328,
    "slug": "uzuklar-hukumdori-2-ikki-qalla-fantastika-uzbek-tilida-2002",
    "type": "film",
    "title": {
      "uz": "Uzuklar Hukumdori 2 Ikki Qalla (Fantastika, Uzbek tilida) 2002",
      "ru": "Uzuklar Hukumdori 2 Ikki Qalla (Fantastika, Uzbek tilida) 2002"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Uzuklar Hukumdori 2 Ikki Qalla (Fantastika, Uzbek tilida) 2002",
      "ru": "🎞 Uzuklar Hukumdori 2 Ikki Qalla (Fantastika, Uzbek tilida) 2002"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7LKli8IWpEyW?s=YwmHiKJMCzwG6oSkfcQyRq1m",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YwmHiKJMCzwG6oSkfcQyRq1m",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 223,
    "size": 539563663,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3329,
    "slug": "qoyilmaqom-yettilik-tarjima-uzbek-tilida",
    "type": "film",
    "title": {
      "uz": "Qoyilmaqom Yettilik (Tarjima, Uzbek tilida)",
      "ru": "Qoyilmaqom Yettilik (Tarjima, Uzbek tilida)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Qoyilmaqom Yettilik (Tarjima, Uzbek tilida)",
      "ru": "🎞 Qoyilmaqom Yettilik (Tarjima, Uzbek tilida)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5YkB-0ujEB6E?s=lbXDKe40-tXvAq0teTyPPCZL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lbXDKe40-tXvAq0teTyPPCZL",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 128,
    "size": 465522378,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3330,
    "slug": "uzuklar-hukumdori-tarjima-fontastika-uzbek-tilida-2001",
    "type": "film",
    "title": {
      "uz": "Uzuklar Hukumdori (Tarjima, Fontastika, Uzbek tilida) 2001",
      "ru": "Uzuklar Hukumdori (Tarjima, Fontastika, Uzbek tilida) 2001"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Uzuklar Hukumdori (Tarjima, Fontastika, Uzbek tilida) 2001",
      "ru": "🎞 Uzuklar Hukumdori (Tarjima, Fontastika, Uzbek tilida) 2001"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/230LSUg9dRnW?s=6e_pQzGa2lsRnYRELeKZYhd_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6e_pQzGa2lsRnYRELeKZYhd_",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 200,
    "size": 512646974,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3331,
    "slug": "naruto-1-sezon",
    "type": "film",
    "title": {
      "uz": "Наруто: 1 сезон",
      "ru": "Наруто: 1 сезон"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 30 🔥",
      "ru": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 30 🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9xD0OIYRja0w?s=_WhoydENDt5gVbgeq_bzspib",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_WhoydENDt5gVbgeq_bzspib",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 23,
    "size": 77579076,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3332,
    "slug": "naruto-1-sezon",
    "type": "film",
    "title": {
      "uz": "Наруто: 1 сезон",
      "ru": "Наруто: 1 сезон"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 29 🔥",
      "ru": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 29 🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/z2s1N2xy-9rt?s=3HPqglZhaywFZaw8i5rx4DGb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3HPqglZhaywFZaw8i5rx4DGb",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 23,
    "size": 89417611,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3333,
    "slug": "naruto-1-sezon",
    "type": "film",
    "title": {
      "uz": "Наруто: 1 сезон",
      "ru": "Наруто: 1 сезон"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 28 🔥",
      "ru": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 28 🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zd6w9qe9ySbs?s=3AwRT3rO-CLfy2XSdTtA6C9w",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3AwRT3rO-CLfy2XSdTtA6C9w",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 23,
    "size": 93793353,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3334,
    "slug": "naruto-1-sezon",
    "type": "film",
    "title": {
      "uz": "Наруто: 1 сезон",
      "ru": "Наруто: 1 сезон"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 27 🔥",
      "ru": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 27 🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/G6EOjmVDgG6E?s=K9ERBz3XHCG5M72oxQGW1K5A",
    "trailer": "",
    "video": "https://dezocloud.uz/s/K9ERBz3XHCG5M72oxQGW1K5A",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 23,
    "size": 102965533,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3335,
    "slug": "naruto-1-sezon",
    "type": "film",
    "title": {
      "uz": "Наруто: 1 сезон",
      "ru": "Наруто: 1 сезон"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 26 🔥",
      "ru": "🐲 Наруто: 1 сезон.\n\n🔥 Серия 26 🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZZxwYvbJBZHV?s=NpRTyJ5zgRD1smBxvzGCjKWh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NpRTyJ5zgRD1smBxvzGCjKWh",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 23,
    "size": 109820795,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3336,
    "slug": "qidiruv-2012",
    "type": "film",
    "title": {
      "uz": "Qidiruv ( 2012 )",
      "ru": "Qidiruv ( 2012 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qidiruv ( 2012 )\n O'zbek Tilida [360p/HD]\n Davlati: Hindiston\n Janri: Kriminal, Detektiv",
      "ru": "Qidiruv ( 2012 )\n O'zbek Tilida [360p/HD]\n Davlati: Hindiston\n Janri: Kriminal, Detektiv"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sBAhE_DJLYP7?s=byeJlenweGE3hPyGfBF6cmPX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/byeJlenweGE3hPyGfBF6cmPX",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 136,
    "size": 409238715,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3337,
    "slug": "karib-dengizi-qaroqchilari-4",
    "type": "film",
    "title": {
      "uz": "Karib Dengizi Qaroqchilari 4",
      "ru": "Karib Dengizi Qaroqchilari 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Karib Dengizi Qaroqchilari 4\nO'zbek Tilida [360p/HD]\nDavlati: AQSH ( 2011 )\nJanri: Jangari, Sarguzasht",
      "ru": "Karib Dengizi Qaroqchilari 4\nO'zbek Tilida [360p/HD]\nDavlati: AQSH ( 2011 )\nJanri: Jangari, Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WkRXB2w9f8qn?s=fxqpdz1YYg-FiOgeijJU9Tpp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fxqpdz1YYg-FiOgeijJU9Tpp",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 124,
    "size": 483477591,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3338,
    "slug": "uy-2015",
    "type": "film",
    "title": {
      "uz": "Uy (2015)",
      "ru": "Uy (2015)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Uy (2015)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: Fantastika, Komediya, Sarguzasht, Oilaviy",
      "ru": "Uy (2015)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: Fantastika, Komediya, Sarguzasht, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lTo-oO6YMmKl?s=G-gnbudUd7VaD82l_IfHg5Dn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/G-gnbudUd7VaD82l_IfHg5Dn",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 82,
    "size": 661876074,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3339,
    "slug": "film-nomi-smofult",
    "type": "film",
    "title": {
      "uz": "Film noмi: SmoFult",
      "ru": "Film noмi: SmoFult"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Film noмi: SmoFult\nsifaтi: 360P\nтili: Uzbek tilida",
      "ru": "Film noмi: SmoFult\nsifaтi: 360P\nтili: Uzbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/urQQnUUOgnFU?s=DX1AVkkOmfwuN28bR_3bc0Oj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DX1AVkkOmfwuN28bR_3bc0Oj",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 84,
    "size": 489144975,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3340,
    "slug": "orzular-xonasi-2019",
    "type": "film",
    "title": {
      "uz": "Orzular xonasi (2019)",
      "ru": "Orzular xonasi (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Orzular xonasi (2019)\nO'zbek Tilida: [480p/HD]\nDavlati: Fransiya, BelgiyaJanri: Triller, Fantastika",
      "ru": "Orzular xonasi (2019)\nO'zbek Tilida: [480p/HD]\nDavlati: Fransiya, BelgiyaJanri: Triller, Fantastika"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Fm2u0EjaKZvZ?s=Udm8OcGm-bc28Lng17a8XXaQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Udm8OcGm-bc28Lng17a8XXaQ",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 85,
    "size": 469762128,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3341,
    "slug": "terminator-6-2019",
    "type": "film",
    "title": {
      "uz": "Terminator 6 (2019)",
      "ru": "Terminator 6 (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Terminator 6 (2019)\nO'zbek Tilida: [480p/HD]\nDavlati: AQSH\nJanri: Jangari, Fantastika",
      "ru": "Terminator 6 (2019)\nO'zbek Tilida: [480p/HD]\nDavlati: AQSH\nJanri: Jangari, Fantastika"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/i_-WDqWtVsaa?s=ahD_RtN0aRaBMoB1ceoJgysr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ahD_RtN0aRaBMoB1ceoJgysr",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 118,
    "size": 519198181,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3342,
    "slug": "sumerki-2008",
    "type": "film",
    "title": {
      "uz": "Сумерки 2008",
      "ru": "Сумерки 2008"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Сумерки 2008",
      "ru": "Сумерки 2008"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/d55YKfMhhdYe?s=EFQ0NmOxM31UpcYhQExETe7g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EFQ0NmOxM31UpcYhQExETe7g",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 122,
    "size": 363997029,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3343,
    "slug": "nomi-yirtqich-xishnik",
    "type": "film",
    "title": {
      "uz": "NOMI YIRTQICH (XISHNIK)",
      "ru": "NOMI YIRTQICH (XISHNIK)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI ~ YIRTQICH (XISHNIK)\nDAVLAT ~ AQSH\nCHQAN SANA ~ 1987\nJANRI ~ UJAS\nFARMAT ~ MP4\nTILI ~ UZBEK TILIDA\nDAVOMIYLIGI ~ 1:46:46\nHAJMI ~ 282 MB",
      "ru": "NOMI ~ YIRTQICH (XISHNIK)\nDAVLAT ~ AQSH\nCHQAN SANA ~ 1987\nJANRI ~ UJAS\nFARMAT ~ MP4\nTILI ~ UZBEK TILIDA\nDAVOMIYLIGI ~ 1:46:46\nHAJMI ~ 282 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UBjL3-I-CkM1?s=XB3dAG0E192oEQDJWwikx_wH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XB3dAG0E192oEQDJWwikx_wH",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 107,
    "size": 295860975,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3344,
    "slug": "bizda-premyera",
    "type": "film",
    "title": {
      "uz": "Bizda premyera!",
      "ru": "Bizda premyera!"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Bizda premyera!\n🎬 \"DULITTIL\"\n🇷🇺RUS TILIDA\n💿TS FORMATDA.\n📆 Yili: 2020 - yilning ilk qaynoq katta premyerasi.\n🎭 Bosh rollarda: Robert Dauni, Antonio Banderas, Maykl Shin, Selena Gomez va Tom Holland.\n🎞 Janri: Fentezi,",
      "ru": "Bizda premyera!\n🎬 \"DULITTIL\"\n🇷🇺RUS TILIDA\n💿TS FORMATDA.\n📆 Yili: 2020 - yilning ilk qaynoq katta premyerasi.\n🎭 Bosh rollarda: Robert Dauni, Antonio Banderas, Maykl Shin, Selena Gomez va Tom Holland.\n🎞 Janri: Fentezi,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zS6DrOTK6_nd?s=LtNZuDZQQmsTsWYd75-Xz_nr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LtNZuDZQQmsTsWYd75-Xz_nr",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 90,
    "size": 1102693456,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3345,
    "slug": "t-34-2019",
    "type": "film",
    "title": {
      "uz": "T - 34 ( 2019 )",
      "ru": "T - 34 ( 2019 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "T - 34 ( 2019 )\nO'zbek Tilida [480p/HD]\nDavlati: Rossiya\nJanri: Jangari, Hayotiy, Harbiy",
      "ru": "T - 34 ( 2019 )\nO'zbek Tilida [480p/HD]\nDavlati: Rossiya\nJanri: Jangari, Hayotiy, Harbiy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/78TKjicbR47p?s=u8VNVZeoa9chdpTAN6lOoMGQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/u8VNVZeoa9chdpTAN6lOoMGQ",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 126,
    "size": 466096392,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3346,
    "slug": "tanklar-2018",
    "type": "film",
    "title": {
      "uz": "Tanklar ( 2018 )",
      "ru": "Tanklar ( 2018 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Tanklar ( 2018 )\n O'zbek Tilida [480p/HD]\nDavlati: Rossiya\n Janri: Jangari, Harbiy, Hayotiy",
      "ru": "Tanklar ( 2018 )\n O'zbek Tilida [480p/HD]\nDavlati: Rossiya\n Janri: Jangari, Harbiy, Hayotiy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JCgw1yOCdEQf?s=xHdqdNUWZ4iEB0negF1KD5KT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xHdqdNUWZ4iEB0negF1KD5KT",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 458022956,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3347,
    "slug": "alomatlar-2009",
    "type": "film",
    "title": {
      "uz": "Alomatlar ( 2009 )",
      "ru": "Alomatlar ( 2009 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Alomatlar ( 2009 )\n O'zbek Tilida [480p/HD]\nDavlati: AQSH, B.Britaniya, Avstraliya\nJanri: Jangari, Fantastika, Drama",
      "ru": "Alomatlar ( 2009 )\n O'zbek Tilida [480p/HD]\nDavlati: AQSH, B.Britaniya, Avstraliya\nJanri: Jangari, Fantastika, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UnhAHGeEwsHM?s=BUyyLIWwRfwWPgxI8zB9sDK4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BUyyLIWwRfwWPgxI8zB9sDK4",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 108,
    "size": 345387104,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3348,
    "slug": "karib-dengizi-qaroqchilari-2",
    "type": "film",
    "title": {
      "uz": "➺ Karib Dengizi Qaroqchilari 2",
      "ru": "➺ Karib Dengizi Qaroqchilari 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Karib Dengizi Qaroqchilari 2\n🇺🇿 ➺ O'zbek Tilida [360p]\n🌍 ➺ Davlati: AQSH ( 2003 )\n⚔ ➺ Janri: Jangari, Sarguzasht\n\n⚠️ Eng qulay hajmda (216mb), Soʻraganlar uchun maxsus tayyorlandi!",
      "ru": "🎬 ➺ Karib Dengizi Qaroqchilari 2\n🇺🇿 ➺ O'zbek Tilida [360p]\n🌍 ➺ Davlati: AQSH ( 2003 )\n⚔ ➺ Janri: Jangari, Sarguzasht\n\n⚠️ Eng qulay hajmda (216mb), Soʻraganlar uchun maxsus tayyorlandi!"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JG26A-AX36YW?s=CiUdy9HfUV34zr72Lr_3j5oy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CiUdy9HfUV34zr72Lr_3j5oy",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 151,
    "size": 226638188,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3349,
    "slug": "karib-dengizi-qaroqchilari-1",
    "type": "film",
    "title": {
      "uz": "➺ Karib Dengizi Qaroqchilari 1",
      "ru": "➺ Karib Dengizi Qaroqchilari 1"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Karib Dengizi Qaroqchilari 1\n🇺🇿 ➺ O'zbek Tilida [360p]\n🌍 ➺ Davlati: AQSH ( 2003 )\n⚔ ➺ Janri: Jangari, Sarguzasht\n\n⚠️ Eng qulay hajmda (423mb) lekin sifati buzilmagan holda yuklab oling!",
      "ru": "🎬 ➺ Karib Dengizi Qaroqchilari 1\n🇺🇿 ➺ O'zbek Tilida [360p]\n🌍 ➺ Davlati: AQSH ( 2003 )\n⚔ ➺ Janri: Jangari, Sarguzasht\n\n⚠️ Eng qulay hajmda (423mb) lekin sifati buzilmagan holda yuklab oling!"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IIH5FTQG4XRI?s=Nc7rsdzzDZNimQBg4FE77czH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Nc7rsdzzDZNimQBg4FE77czH",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 134,
    "size": 444073729,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3350,
    "slug": "film-nomi-ford-ferrariga-qarshi",
    "type": "film",
    "title": {
      "uz": "Filм noмi: FORD FERRARIGA QARSHI",
      "ru": "Filм noмi: FORD FERRARIGA QARSHI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔥\nFilм noмi: FORD FERRARIGA QARSHI\nsifaтi: 360P\nтili: Uzbek tilida",
      "ru": "🔥\nFilм noмi: FORD FERRARIGA QARSHI\nsifaтi: 360P\nтili: Uzbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nCqztpEAX69a?s=u-W15yEfZdexNPyNyV9MlDK6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/u-W15yEfZdexNPyNyV9MlDK6",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 144,
    "size": 708417891,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3351,
    "slug": "alisa-mojizalar-mamlakatida",
    "type": "film",
    "title": {
      "uz": "➺ Alisa Moʻjizalar mamlakatida",
      "ru": "➺ Alisa Moʻjizalar mamlakatida"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Alisa Moʻjizalar mamlakatida\n🇺🇿 ➺ O'zbek Tilida [360p/HD]\n🌍 ➺ Davlati: AQSH (1951)\n⚔ ➺ Janri: Sarguzasht, Oilaviy\n\n⚠️ Eng qulay hajmda (188mb) lekin sifati buzilmagan holda yuklab oling!",
      "ru": "🎬 ➺ Alisa Moʻjizalar mamlakatida\n🇺🇿 ➺ O'zbek Tilida [360p/HD]\n🌍 ➺ Davlati: AQSH (1951)\n⚔ ➺ Janri: Sarguzasht, Oilaviy\n\n⚠️ Eng qulay hajmda (188mb) lekin sifati buzilmagan holda yuklab oling!"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HaOJt1bk_mtI?s=72ZklgFV-blRAiTrcOLHp-6j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/72ZklgFV-blRAiTrcOLHp-6j",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 66,
    "size": 198098079,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3352,
    "slug": "malefisenta-1-2014",
    "type": "film",
    "title": {
      "uz": "Malefisenta 1 ( 2014 )",
      "ru": "Malefisenta 1 ( 2014 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Malefisenta 1 ( 2014 )\n O'zbek Tilida [720p/HD]\n Davlati: AQSH\n Janri: Jangari, Sarguzasht",
      "ru": "Malefisenta 1 ( 2014 )\n O'zbek Tilida [720p/HD]\n Davlati: AQSH\n Janri: Jangari, Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OdynpD9LocpJ?s=n53wE9WtSJGzB89fL_IproNX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/n53wE9WtSJGzB89fL_IproNX",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 623893993,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3353,
    "slug": "8-kod",
    "type": "film",
    "title": {
      "uz": "\" 8 - KOD\"",
      "ru": "\" 8 - KOD\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "\" 8 - KOD\"\nRus tilida.\n2019 - yilda chiqqan.\n Bosh rollarda:Stiven Ammel, Robbi Ammel, San Keng va Kerri Matchet.\nJanri: Jangari, Fantastika.\n HD Formatda.",
      "ru": "\" 8 - KOD\"\nRus tilida.\n2019 - yilda chiqqan.\n Bosh rollarda:Stiven Ammel, Robbi Ammel, San Keng va Kerri Matchet.\nJanri: Jangari, Fantastika.\n HD Formatda."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/L8Ze_HqH_ghF?s=AE1hLLPuVZ5ByEc1PG0g9LC4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AE1hLLPuVZ5ByEc1PG0g9LC4",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 94,
    "size": 1564129923,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3354,
    "slug": "normning-sarguzashtlari-multfilm-uzbek-tilida",
    "type": "film",
    "title": {
      "uz": "Normning sarguzashtlari (Multfilm, Uzbek tilida)",
      "ru": "Normning sarguzashtlari (Multfilm, Uzbek tilida)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Normning sarguzashtlari (Multfilm, Uzbek tilida)",
      "ru": "🎞 Normning sarguzashtlari (Multfilm, Uzbek tilida)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/I0DzbwbksE-Y?s=goZzawP8ZdFo0jpgsCXhnJmi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/goZzawP8ZdFo0jpgsCXhnJmi",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 85,
    "size": 321441273,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3355,
    "slug": "film-nomi-malika-va-ovchi-2",
    "type": "film",
    "title": {
      "uz": "Filм noмi: Malika va ovchi 2",
      "ru": "Filм noмi: Malika va ovchi 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: Malika va ovchi 2\nsifaтi: HD\n тili: Uzbek tilida",
      "ru": "Filм noмi: Malika va ovchi 2\nsifaтi: HD\n тili: Uzbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wVr1VV5Zjlcd?s=L6dnHxMhKx9zeLbr7fylVMEH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L6dnHxMhKx9zeLbr7fylVMEH",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 109,
    "size": 640277511,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3356,
    "slug": "murtadlar-2006",
    "type": "film",
    "title": {
      "uz": "Murtadlar ( 2006 )",
      "ru": "Murtadlar ( 2006 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Murtadlar ( 2006 )\nO'zbek Tilida [480pHDDavlati:\nJanri: Drama, Kriminal",
      "ru": "Murtadlar ( 2006 )\nO'zbek Tilida [480pHDDavlati:\nJanri: Drama, Kriminal"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eymNFWcVEUkL?s=LWWjJQgf6wpoz5cevQXpxI9j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LWWjJQgf6wpoz5cevQXpxI9j",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 145,
    "size": 524102922,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3357,
    "slug": "togo-2019",
    "type": "film",
    "title": {
      "uz": "➺ Togo (2019)",
      "ru": "➺ Togo (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Togo (2019)\n🇺🇿 ➺ O'zbek Tilida: [480p/HD]\n🌍 ➺ Davlati: AQSH\n⚔️ ➺ Janri: Drama, Sarguzasht",
      "ru": "🎬 ➺ Togo (2019)\n🇺🇿 ➺ O'zbek Tilida: [480p/HD]\n🌍 ➺ Davlati: AQSH\n⚔️ ➺ Janri: Drama, Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/aLuz3QUot9oJ?s=a0m2VOwxNkca4rPiFFL3dkHi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/a0m2VOwxNkca4rPiFFL3dkHi",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 104,
    "size": 433783307,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3358,
    "slug": "maxfiy-qorbobo-multfilm-uzbek-tilida-2014",
    "type": "film",
    "title": {
      "uz": "Maxfiy qorbobo (Multfilm, Uzbek tilida) 2014",
      "ru": "Maxfiy qorbobo (Multfilm, Uzbek tilida) 2014"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Maxfiy qorbobo (Multfilm, Uzbek tilida) 2014",
      "ru": "🎞 Maxfiy qorbobo (Multfilm, Uzbek tilida) 2014"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sqMxJCCvlIdH?s=7gc8ctzA3HtoHZCsc5ShztjO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7gc8ctzA3HtoHZCsc5ShztjO",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 321328944,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3359,
    "slug": "ninza-toshbaqalar-uzbek-tilida-2014",
    "type": "film",
    "title": {
      "uz": "NINZA TOSHBAQALAR (Uzbek tilida) 2014",
      "ru": "NINZA TOSHBAQALAR (Uzbek tilida) 2014"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 NINZA TOSHBAQALAR (Uzbek tilida) 2014 \n\nBizga siz ham qo'shiling👇🏻",
      "ru": "🎞 NINZA TOSHBAQALAR (Uzbek tilida) 2014 \n\nBizga siz ham qo'shiling👇🏻"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6YpkSQ0I5ms-?s=L7c14DWy-2f64qUGKEeP7W0a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L7c14DWy-2f64qUGKEeP7W0a",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 94,
    "size": 403824017,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3360,
    "slug": "yupiter-2014",
    "type": "film",
    "title": {
      "uz": "Yupiter (2014)",
      "ru": "Yupiter (2014)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Yupiter (2014)\nO'zbek Tilida: [480p/HD]\nDavlati: AQSH\nJanri: Fantastika, Jangari",
      "ru": "Yupiter (2014)\nO'zbek Tilida: [480p/HD]\nDavlati: AQSH\nJanri: Fantastika, Jangari"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BkdINupiUZ7N?s=n7BOjTx7YOnDGLgMm14OKfhy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/n7BOjTx7YOnDGLgMm14OKfhy",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 112,
    "size": 466999480,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3361,
    "slug": "muzyurak-2-2019",
    "type": "film",
    "title": {
      "uz": "Muzyurak 2 (2019)",
      "ru": "Muzyurak 2 (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Muzyurak 2 (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Komediya, Oilaviy, Sarguzasht, Fentezi",
      "ru": "Muzyurak 2 (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Komediya, Oilaviy, Sarguzasht, Fentezi"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wfJogv6ieI-u?s=s7nl6oUgdEDuk_IyH6RaJfJb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/s7nl6oUgdEDuk_IyH6RaJfJb",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 90,
    "size": 420263113,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3362,
    "slug": "ford-ferrariga-qarshi",
    "type": "film",
    "title": {
      "uz": "\"FORD FERRARIGA QARSHI\"",
      "ru": "\"FORD FERRARIGA QARSHI\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "\"FORD FERRARIGA QARSHI\"\nRus tilida.\n Yili: 2019 - yil.\nBosh rollarda: Kristian Beyl va Mett Deymon.\nJanri: Jangari, Dramma.",
      "ru": "\"FORD FERRARIGA QARSHI\"\nRus tilida.\n Yili: 2019 - yil.\nBosh rollarda: Kristian Beyl va Mett Deymon.\nJanri: Jangari, Dramma."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mWdZMziuTYfo?s=M0_TJvG2C7LdxYU7lWUfQaLt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/M0_TJvG2C7LdxYU7lWUfQaLt",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 154,
    "size": 652500961,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3363,
    "slug": "parazitlar",
    "type": "film",
    "title": {
      "uz": "\"PARAZITLAR\"",
      "ru": "\"PARAZITLAR\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 \"PARAZITLAR\" \n📆2019- yil\n🎞 Janri: Komediya, Drama.\n🇷🇺 Rus Tilida.\nFilm bugun \"Oltin Globus\" ning eng yaxshi chet el filmi nominatsiyasi g‘olibi bo‘ldi.",
      "ru": "🎬 \"PARAZITLAR\" \n📆2019- yil\n🎞 Janri: Komediya, Drama.\n🇷🇺 Rus Tilida.\nFilm bugun \"Oltin Globus\" ning eng yaxshi chet el filmi nominatsiyasi g‘olibi bo‘ldi."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-oOLXvzZ89S6?s=R_yn74nwDqSL6105m0pabkkW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/R_yn74nwDqSL6105m0pabkkW",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 132,
    "size": 386416978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3364,
    "slug": "tush-qoriqichilari-multfilm-uzbek-tilida-2012",
    "type": "film",
    "title": {
      "uz": "TUSH QO'RIQICHILARI (Multfilm, Uzbek tilida) 2012",
      "ru": "TUSH QO'RIQICHILARI (Multfilm, Uzbek tilida) 2012"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "TUSH QO'RIQICHILARI (Multfilm, Uzbek tilida) 2012",
      "ru": "TUSH QO'RIQICHILARI (Multfilm, Uzbek tilida) 2012"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/hixTXtiAcUXZ?s=AqmZCXpWjK-S__dRfOYHPjSD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AqmZCXpWjK-S__dRfOYHPjSD",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 88,
    "size": 347240584,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3365,
    "slug": "film-nomi-xush-kelibsiz-janjalkash-qoshnilar",
    "type": "film",
    "title": {
      "uz": "Filм noмi: XUSH KELIBSIZ JANJALKASH QO'SHNILAR",
      "ru": "Filм noмi: XUSH KELIBSIZ JANJALKASH QO'SHNILAR"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: XUSH KELIBSIZ JANJALKASH QO'SHNILAR\nsifaтi: HD\nтili: Uzbek tilida\nкorisн: 6+\n Janri:",
      "ru": "Filм noмi: XUSH KELIBSIZ JANJALKASH QO'SHNILAR\nsifaтi: HD\nтili: Uzbek tilida\nкorisн: 6+\n Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/w0HhNlyH2fPK?s=WOAJkEXOZToDvGe-p51G23ox",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WOAJkEXOZToDvGe-p51G23ox",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 77,
    "size": 796057531,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3366,
    "slug": "zoya-hind-kino-komediya-uzbek-tilida-2019",
    "type": "film",
    "title": {
      "uz": "ZOYA (Hind kino, Komediya Uzbek tilida) 2019",
      "ru": "ZOYA (Hind kino, Komediya Uzbek tilida) 2019"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 ZOYA (Hind kino, Komediya Uzbek tilida) 2019 \nBizga qo'shiling",
      "ru": "🎞 ZOYA (Hind kino, Komediya Uzbek tilida) 2019 \nBizga qo'shiling"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/L9yTp1mT4uvs?s=o8iCL5aWkfwoo87wA7p_h8kB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/o8iCL5aWkfwoo87wA7p_h8kB",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 126,
    "size": 422976787,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3367,
    "slug": "nomi-raqs-va-olmos",
    "type": "film",
    "title": {
      "uz": "NOMI RAQS VA OLMOS",
      "ru": "NOMI RAQS VA OLMOS"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI ~ RAQS VA OLMOS\nDAVLAT ~ HIND\nCHQAN SANA ~ 2017\nJANRI ~ KOMEDIYA\nFARMAT ~ HD\nTILI ~ UZBEK TILIDA\nDAVOMIYLIGI ~ 2:29:22\nHAJMI ~ 420 MB",
      "ru": "NOMI ~ RAQS VA OLMOS\nDAVLAT ~ HIND\nCHQAN SANA ~ 2017\nJANRI ~ KOMEDIYA\nFARMAT ~ HD\nTILI ~ UZBEK TILIDA\nDAVOMIYLIGI ~ 2:29:22\nHAJMI ~ 420 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xcqjBVv1CRJc?s=gHlJIOthkDFvoI8Cdwj_WNPv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gHlJIOthkDFvoI8Cdwj_WNPv",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 149,
    "size": 440683083,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3368,
    "slug": "malefisenta-zulmat-qirolichasi-fontastik-film-uzbek-tilida-2",
    "type": "film",
    "title": {
      "uz": "Malefisenta: Zulmat qirolichasi (Fontastik film, Uzbek tilida) 2019",
      "ru": "Malefisenta: Zulmat qirolichasi (Fontastik film, Uzbek tilida) 2019"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Malefisenta: Zulmat qirolichasi (Fontastik film, Uzbek tilida) 2019 \n\nBizda eng sifatli, kesilmagan talqini...kinolar bor",
      "ru": "🎞 Malefisenta: Zulmat qirolichasi (Fontastik film, Uzbek tilida) 2019 \n\nBizda eng sifatli, kesilmagan talqini...kinolar bor"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9b-bQ4L93_P5?s=XG0yn0m4uoJ0k2cTjDTsjiuJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XG0yn0m4uoJ0k2cTjDTsjiuJ",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 111,
    "size": 517748813,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3369,
    "slug": "nomi-janob-hech-kim",
    "type": "film",
    "title": {
      "uz": "Номи: Janob hech kim",
      "ru": "Номи: Janob hech kim"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 Номи: Janob hech kim \n➖➖➖➖➖➖➖\n💽 Formati: HD\n🎭 Janri: \n⏳ Davomiyligi: 1s|30min\n🗓 Yili: 2015-yil",
      "ru": "🎬 Номи: Janob hech kim \n➖➖➖➖➖➖➖\n💽 Formati: HD\n🎭 Janri: \n⏳ Davomiyligi: 1s|30min\n🗓 Yili: 2015-yil"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AGulKJYsD8ap?s=CyRshHqrpYaYhC7h7zv-C_7Y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CyRshHqrpYaYhC7h7zv-C_7Y",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 87,
    "size": 305974150,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3370,
    "slug": "janob-popperning-pingvinlari",
    "type": "film",
    "title": {
      "uz": "Janob Popperning pingvinlari",
      "ru": "Janob Popperning pingvinlari"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎥Janob Popperning pingvinlari",
      "ru": "🎥Janob Popperning pingvinlari"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9ZOAp1zWI9hc?s=PsQrWfYemjOxaI-AVwFpOIAz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PsQrWfYemjOxaI-AVwFpOIAz",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 84,
    "size": 713920490,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3371,
    "slug": "grinch",
    "type": "film",
    "title": {
      "uz": "Grinch",
      "ru": "Grinch"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Grinch",
      "ru": "Grinch"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jO093gW9ZFjC?s=YDp5_8-OS1CkHJ4payp58Lzx",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YDp5_8-OS1CkHJ4payp58Lzx",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 86,
    "size": 343705907,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3372,
    "slug": "arktika-qoriqchilari-2019",
    "type": "film",
    "title": {
      "uz": "Arktika qo'riqchilari (2019)",
      "ru": "Arktika qo'riqchilari (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Arktika qo'riqchilari (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH,Kanada, Xitoy\nJanri: Komediya, Oilaviy, Sarguzasht",
      "ru": "Arktika qo'riqchilari (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH,Kanada, Xitoy\nJanri: Komediya, Oilaviy, Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8bblVPW7-nh-?s=mf17-1Omqmn6tvUDiZZcxA-q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mf17-1Omqmn6tvUDiZZcxA-q",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 89,
    "size": 337422521,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3373,
    "slug": "arvoh-qiz-2019",
    "type": "film",
    "title": {
      "uz": "Arvoh qiz (2019)",
      "ru": "Arvoh qiz (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Arvoh qiz (2019)\nO'zbek Tilida [480p/HD]\nDavlati: Hindiston\nJanri: Komediya, Drama",
      "ru": "Arvoh qiz (2019)\nO'zbek Tilida [480p/HD]\nDavlati: Hindiston\nJanri: Komediya, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZepWM0I_IAWr?s=2Z91DyJQCgt_uGaupDWLBH-5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2Z91DyJQCgt_uGaupDWLBH-5",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 123,
    "size": 500123028,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3374,
    "slug": "grinch",
    "type": "film",
    "title": {
      "uz": "Гринч",
      "ru": "Гринч"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Гринч",
      "ru": "Гринч"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2Mo8Oni3w-jl?s=2B4I0UjJRULYrm1K4FCgFxrT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2B4I0UjJRULYrm1K4FCgFxrT",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 86,
    "size": 342339938,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3375,
    "slug": "yangi-yilni-qutqaramiz",
    "type": "film",
    "title": {
      "uz": "Yangi yilni qutqaramiz",
      "ru": "Yangi yilni qutqaramiz"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Yangi yilni qutqaramiz",
      "ru": "Yangi yilni qutqaramiz"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uFE0d0eeSh81?s=ynAXAhf_yQ5yh7HxdrMmY0eG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ynAXAhf_yQ5yh7HxdrMmY0eG",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 104,
    "size": 412800154,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3376,
    "slug": "shimoliy-ekspress-2004",
    "type": "film",
    "title": {
      "uz": "Shimoliy Ekspress (2004)",
      "ru": "Shimoliy Ekspress (2004)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Shimoliy Ekspress (2004)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: , , , ,",
      "ru": "Shimoliy Ekspress (2004)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: , , , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HbF-suruDJdo?s=M1wzFilF32NOV40neNWN2J_A",
    "trailer": "",
    "video": "https://dezocloud.uz/s/M1wzFilF32NOV40neNWN2J_A",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 96,
    "size": 708241628,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3377,
    "slug": "nomi-kupperlar-oilasi",
    "type": "film",
    "title": {
      "uz": "Nomi: Kupperlar oilasi",
      "ru": "Nomi: Kupperlar oilasi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Kupperlar oilasi",
      "ru": "Nomi: Kupperlar oilasi"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/LuDiRXMslD0e?s=bo9nWtk9u5dgQlzOuky6rEDA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bo9nWtk9u5dgQlzOuky6rEDA",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 93,
    "size": 334750979,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3378,
    "slug": "koko-siri-multfilm",
    "type": "film",
    "title": {
      "uz": "Koko siri Multfilm",
      "ru": "Koko siri Multfilm"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Koko siri Multfilm",
      "ru": "🎞 Koko siri Multfilm"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/anmPn3h2qKAZ?s=B0md3orNRo_HR8vJUpRd-vWF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/B0md3orNRo_HR8vJUpRd-vWF",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 105,
    "size": 350192014,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3379,
    "slug": "klaus-2019",
    "type": "film",
    "title": {
      "uz": "Клаус (2019)",
      "ru": "Клаус (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Клаус (2019)",
      "ru": "Клаус (2019)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/n2bKFRB3pS4_?s=Zq-Y6Hl1EzPY2sn86Sh-fdJm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Zq-Y6Hl1EzPY2sn86Sh-fdJm",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 98,
    "size": 850772623,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3380,
    "slug": "lara-kroft-daxma-talonchisi-2018",
    "type": "film",
    "title": {
      "uz": "Lara Kroft: Daxma talonchisi (2018)",
      "ru": "Lara Kroft: Daxma talonchisi (2018)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Lara Kroft: Daxma talonchisi (2018)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller",
      "ru": "Lara Kroft: Daxma talonchisi (2018)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0E8y7bO91qGG?s=Mz6OPbKhcTvXY6enMYBv8bkC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Mz6OPbKhcTvXY6enMYBv8bkC",
    "featured": false,
    "addedAt": 1791040655784,
    "updatedAt": 1791040655784,
    "duration": 111,
    "size": 787655242,
    "year": 2026,
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
