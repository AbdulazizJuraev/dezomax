/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 2981,
    "slug": "qutqaruv-operatsiyasi",
    "type": "film",
    "title": {
      "uz": "Qutqaruv Operatsiyasi",
      "ru": "Qutqaruv Operatsiyasi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Qutqaruv Operatsiyasi \n🇺🇿O'zbek Tilida\n📀Sifati 1080p \n📆Yili 2020\n🎞️Janri : Jangari Kriminal \n👥Bosh rollarda : Kris",
      "ru": "🎬Qutqaruv Operatsiyasi \n🇺🇿O'zbek Tilida\n📀Sifati 1080p \n📆Yili 2020\n🎞️Janri : Jangari Kriminal \n👥Bosh rollarda : Kris"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zw2H-gHXlLG4?s=Dhevcb_pJtfh3HGf991NR_u7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Dhevcb_pJtfh3HGf991NR_u7",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 105,
    "size": 1846204415,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2982,
    "slug": "flesh-the-flash-2023",
    "type": "film",
    "title": {
      "uz": "Flesh / The Flash (2023)",
      "ru": "Flesh / The Flash (2023)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Flesh / The Flash (2023)\n🇺🇿Tili: O'zbek tilida \n🎞Janri: Fantastika, Jangari, Sarguzasht\n📀Sifati: TS formatda 720p",
      "ru": "🎬Flesh / The Flash (2023)\n🇺🇿Tili: O'zbek tilida \n🎞Janri: Fantastika, Jangari, Sarguzasht\n📀Sifati: TS formatda 720p"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wbDex5DJj_8S?s=MuM2FzlNCy1JqAkV3KBNL2Lt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MuM2FzlNCy1JqAkV3KBNL2Lt",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 138,
    "size": 1451538805,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2983,
    "slug": "kino-kodi",
    "type": "film",
    "title": {
      "uz": "KINO KODI",
      "ru": "KINO KODI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "KINO KODI",
      "ru": "KINO KODI"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3ASuJJKsAkuQ?s=1zcuJur3uZ7wQOdj-Z_YmVYL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1zcuJur3uZ7wQOdj-Z_YmVYL",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 23692655,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2984,
    "slug": "kino-kodi",
    "type": "film",
    "title": {
      "uz": "Kino kodi",
      "ru": "Kino kodi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Kino kodi",
      "ru": "Kino kodi"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6YYt6UqXkCU_?s=DMrGS5_rYfiv5FAyoqau5C1h",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DMrGS5_rYfiv5FAyoqau5C1h",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 19802486,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2985,
    "slug": "notugri-burulish-uzbek-tilida-tarjima-kinolar-uzbek-tilida-j",
    "type": "film",
    "title": {
      "uz": "NOTUG'RI BURULISH uzbek tilida tarjima kinolar, uzbek tilida jahon kinolar, ujas",
      "ru": "NOTUG'RI BURULISH uzbek tilida tarjima kinolar, uzbek tilida jahon kinolar, ujas"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📹NOTUG'RI BURULISH uzbek tilida tarjima kinolar, uzbek tilida jahon kinolar, ujas\n\nKino kodi \n\nKanal",
      "ru": "📹NOTUG'RI BURULISH uzbek tilida tarjima kinolar, uzbek tilida jahon kinolar, ujas\n\nKino kodi \n\nKanal"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/b8nWx8zMoIYX?s=L4NHbg_YNneJ0sheXccBFyri",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L4NHbg_YNneJ0sheXccBFyri",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 84,
    "size": 228678773,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2986,
    "slug": "kino-kodi",
    "type": "film",
    "title": {
      "uz": "Kino kodi",
      "ru": "Kino kodi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Kino kodi \n\nPremyera tez kunda",
      "ru": "Kino kodi \n\nPremyera tez kunda"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/LU0KMu9tXH2L?s=Qp9pR3GrUgZXTWfxZiI19iDG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Qp9pR3GrUgZXTWfxZiI19iDG",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 5148048,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2987,
    "slug": "film-nomi-kotob",
    "type": "film",
    "title": {
      "uz": "Film Nomi: KOTOB",
      "ru": "Film Nomi: KOTOB"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📄 Film Nomi: KOTOB\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz",
      "ru": "📄 Film Nomi: KOTOB\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3p77Lnr1cJrs?s=uFjxzUrcC00O8adxu557pgcE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uFjxzUrcC00O8adxu557pgcE",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 100,
    "size": 506576571,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2988,
    "slug": "amerikalik-telba",
    "type": "film",
    "title": {
      "uz": "Amerikalik telba",
      "ru": "Amerikalik telba"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Amerikalik telba\nFilm Kodi \n🇺🇿O'zbek tilida (Uzmovi)\n🇺🇸Davlati: AQSH \n📆Yili: 2000\n🎞Janri: Triller, Kriminal \n💽Sifati: 720p HD\n🍿@uzmoviee_kinolar",
      "ru": "🎬Amerikalik telba\nFilm Kodi \n🇺🇿O'zbek tilida (Uzmovi)\n🇺🇸Davlati: AQSH \n📆Yili: 2000\n🎞Janri: Triller, Kriminal \n💽Sifati: 720p HD\n🍿@uzmoviee_kinolar"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Na64AXMMMDvX?s=soUIcfJbEDAhGDs8xG7ao35V",
    "trailer": "",
    "video": "https://dezocloud.uz/s/soUIcfJbEDAhGDs8xG7ao35V",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 103,
    "size": 1266895083,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2989,
    "slug": "amerikalik-telba",
    "type": "film",
    "title": {
      "uz": "Amerikalik telba",
      "ru": "Amerikalik telba"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Amerikalik telba\nFilm kodi \n🇺🇿O'zbek tilida \n🇺🇸Davlati: AQSH\n📆Yili: 2000\n🎞Janri: Triller, Kriminal \n💽Sifati: 720p HD\nKinoni to'lig'i pastda\n🍿@uzmoviee_kinolar",
      "ru": "🎬Amerikalik telba\nFilm kodi \n🇺🇿O'zbek tilida \n🇺🇸Davlati: AQSH\n📆Yili: 2000\n🎞Janri: Triller, Kriminal \n💽Sifati: 720p HD\nKinoni to'lig'i pastda\n🍿@uzmoviee_kinolar"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/X53Hu3p4sIKM?s=-AsfqdRdyZ7_NLS1d1FHn0Dx",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-AsfqdRdyZ7_NLS1d1FHn0Dx",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 11358475,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2990,
    "slug": "film-nomi-detpol",
    "type": "film",
    "title": {
      "uz": "Film Nomi: DETPOL",
      "ru": "Film Nomi: DETPOL"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📄 Film Nomi: DETPOL\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz",
      "ru": "📄 Film Nomi: DETPOL\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KgswoNaCEyH6?s=58Px8rZWeF2T9r1iID8aXLaT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/58Px8rZWeF2T9r1iID8aXLaT",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 130,
    "size": 892115121,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2991,
    "slug": "film-nomi-detpol",
    "type": "film",
    "title": {
      "uz": "Film Nomi: DETPOL",
      "ru": "Film Nomi: DETPOL"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📄 Film Nomi: DETPOL\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz\n\nKino to'lig'i pastda",
      "ru": "📄 Film Nomi: DETPOL\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz\n\nKino to'lig'i pastda"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dEESZRuuPaiC?s=VqpXOv_I7hK3EGicVED3EkNF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VqpXOv_I7hK3EGicVED3EkNF",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 21019510,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2992,
    "slug": "riya-play-da-1-2-3",
    "type": "film",
    "title": {
      "uz": "''Riya Play'' da 1 ⃣2 ⃣3 ⃣",
      "ru": "''Riya Play'' da 1 ⃣2 ⃣3 ⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🟣 ''Riya Play'' da 1️⃣2️⃣3️⃣\n\n📄 Film Nomi: SWAT Farishtalar shahri Maxsus Kuchlar\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz",
      "ru": "🟣 ''Riya Play'' da 1️⃣2️⃣3️⃣\n\n📄 Film Nomi: SWAT Farishtalar shahri Maxsus Kuchlar\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pZBbaHwQ-6Q8?s=JFQU_w2mowQfOy9QgPk9DLPW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JFQU_w2mowQfOy9QgPk9DLPW",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 106,
    "size": 619888990,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2993,
    "slug": "riya-play-da-1-2-3",
    "type": "film",
    "title": {
      "uz": "''Riya Play'' da 1 ⃣2 ⃣3 ⃣",
      "ru": "''Riya Play'' da 1 ⃣2 ⃣3 ⃣"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🟣 ''Riya Play'' da 1️⃣2️⃣3️⃣\n\n📄 Film Nomi: SWAT Farishtalar shahri Maxsus Kuchlar\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz\n\nKino to'lig'i pastda",
      "ru": "🟣 ''Riya Play'' da 1️⃣2️⃣3️⃣\n\n📄 Film Nomi: SWAT Farishtalar shahri Maxsus Kuchlar\n\nfilm kodi: \n\n Kanal ✔️\n\nReaksiya bosamiz\n\nKino to'lig'i pastda"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MnB0IJAaF-Nd?s=5ZudkdsI9Hfot4D_4oIDJyey",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5ZudkdsI9Hfot4D_4oIDJyey",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 6899082,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2994,
    "slug": "kok-moviy-qongiz",
    "type": "film",
    "title": {
      "uz": "Ko'k Moviy Qo'ng'iz",
      "ru": "Ko'k Moviy Qo'ng'iz"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ko'k Moviy Qo'ng'iz\nKino to'lig'i tepada",
      "ru": "Ko'k Moviy Qo'ng'iz\nKino to'lig'i tepada"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7OwIwumiHhxG?s=57sge7212WEvJjul_mIGw2Mg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/57sge7212WEvJjul_mIGw2Mg",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 9139941,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2995,
    "slug": "riya-play-da",
    "type": "film",
    "title": {
      "uz": "''Riya Play'' da",
      "ru": "''Riya Play'' da"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🟣 ''Riya Play'' da \n\n\nDC KINO kompaniyasidan ajoyib film\n\n Ko'k Moviy Qo'ng'iz\n\nfilm kodi: \n\n📍KANAL HAVOLASI: \n@ uzmoviee_kinolar ✔️",
      "ru": "🟣 ''Riya Play'' da \n\n\nDC KINO kompaniyasidan ajoyib film\n\n Ko'k Moviy Qo'ng'iz\n\nfilm kodi: \n\n📍KANAL HAVOLASI: \n@ uzmoviee_kinolar ✔️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fWxRkU4y_u_0?s=JJP89EpKCrcCXfZu9KJQulAR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JJP89EpKCrcCXfZu9KJQulAR",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 127,
    "size": 708075559,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2996,
    "slug": "ruxshunos-51-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 51 QSIM",
      "ru": "RUXSHUNOS 51 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 51 QSIM",
      "ru": "RUXSHUNOS 51 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/329DP7-9rheK?s=swwwbV7-0oMDBvC6_93g89pf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/swwwbV7-0oMDBvC6_93g89pf",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 182849850,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2997,
    "slug": "ruxshunos-50-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 50 QSIM",
      "ru": "RUXSHUNOS 50 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 50 QSIM",
      "ru": "RUXSHUNOS 50 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0W0UyAdRpXDR?s=8Hq5OrDv2EVSoP6pSayPr_fh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8Hq5OrDv2EVSoP6pSayPr_fh",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 40,
    "size": 233755737,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2998,
    "slug": "ruxshunos-49-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 49 QSIM",
      "ru": "RUXSHUNOS 49 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 49 QSIM",
      "ru": "RUXSHUNOS 49 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Eb9UkMTsAtme?s=1cFz0Nm-5XwfBlBYIsD4K67T",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1cFz0Nm-5XwfBlBYIsD4K67T",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 34,
    "size": 164771629,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 2999,
    "slug": "ruxshunos-48-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 48 QSIM",
      "ru": "RUXSHUNOS 48 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 48 QSIM",
      "ru": "RUXSHUNOS 48 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GdUjZzp8CK9-?s=uiMC6g9YUbprhRq6sehukno9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uiMC6g9YUbprhRq6sehukno9",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 205009978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3000,
    "slug": "ruxshunos-47-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 47 QSIM",
      "ru": "RUXSHUNOS 47 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 47 QSIM",
      "ru": "RUXSHUNOS 47 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g1ZPgefKPF0z?s=UMkIknLzu4K2EsdyPMOiaAUK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UMkIknLzu4K2EsdyPMOiaAUK",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 39,
    "size": 182748498,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3001,
    "slug": "ruxshunos-46-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 46 QSIM",
      "ru": "RUXSHUNOS 46 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 46 QSIM",
      "ru": "RUXSHUNOS 46 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BSf2s41j-NxA?s=X5GcHekhq-KWHc3steAFbN8x",
    "trailer": "",
    "video": "https://dezocloud.uz/s/X5GcHekhq-KWHc3steAFbN8x",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 198196264,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3002,
    "slug": "ruxshunos-45-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 45 QSIM",
      "ru": "RUXSHUNOS 45 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 45 QSIM",
      "ru": "RUXSHUNOS 45 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DCMntS6nZ8bU?s=tpd3loqmFYgf9la_DiLFFLy8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tpd3loqmFYgf9la_DiLFFLy8",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 38,
    "size": 171380944,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3003,
    "slug": "ruxshunos-44-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 44 QSIM",
      "ru": "RUXSHUNOS 44 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 44 QSIM",
      "ru": "RUXSHUNOS 44 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9Mita-8Kv269?s=Yom92LEAVa7yCaFBfjzKMoJ3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Yom92LEAVa7yCaFBfjzKMoJ3",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 202749614,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3004,
    "slug": "ruxshunos-43-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 43 QSIM",
      "ru": "RUXSHUNOS 43 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 43 QSIM",
      "ru": "RUXSHUNOS 43 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gImjM0dMN9rZ?s=93wdVDmGUrLTzIk6OssBGSfq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/93wdVDmGUrLTzIk6OssBGSfq",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 40,
    "size": 182073099,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3005,
    "slug": "ruxshunos-42-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 42 QSIM",
      "ru": "RUXSHUNOS 42 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 42 QSIM",
      "ru": "RUXSHUNOS 42 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bU9x0mWFiOoO?s=3J6OjaDsshA15QpjWZa97fsY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3J6OjaDsshA15QpjWZa97fsY",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 176497271,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3006,
    "slug": "ruxshunos-41-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 41 QSIM",
      "ru": "RUXSHUNOS 41 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 41 QSIM",
      "ru": "RUXSHUNOS 41 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sIwjBRD6gL3g?s=Sj0uxy6WTdfG3gnMEL9y8g2-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Sj0uxy6WTdfG3gnMEL9y8g2-",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 211776404,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3007,
    "slug": "ruxshunos-40-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 40 QSIM",
      "ru": "RUXSHUNOS 40 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 40 QSIM",
      "ru": "RUXSHUNOS 40 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FUzPwS63Fc85?s=wkF-LshDH3EjRU2zUMy7GGmY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wkF-LshDH3EjRU2zUMy7GGmY",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 40,
    "size": 204945600,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3008,
    "slug": "ruxshunos-39-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 39 QSIM",
      "ru": "RUXSHUNOS 39 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 39 QSIM",
      "ru": "RUXSHUNOS 39 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vl9WmkmqKo7Z?s=wrE0TIyM7P_x3C7pwK94jNez",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wrE0TIyM7P_x3C7pwK94jNez",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 181718967,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3009,
    "slug": "ruxshunos-38-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 38 QSIM",
      "ru": "RUXSHUNOS 38 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 38 QSIM",
      "ru": "RUXSHUNOS 38 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WIkRsT-sbv_0?s=Z6OwDUSx_Wl3LjwWNoTvAUHX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Z6OwDUSx_Wl3LjwWNoTvAUHX",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 200191796,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3010,
    "slug": "ruxshunos-37-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 37 QSIM",
      "ru": "RUXSHUNOS 37 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 37 QSIM",
      "ru": "RUXSHUNOS 37 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/p9EEbfEAqPtQ?s=beGY4dFE4Zm2CtH1AeTSQVXJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/beGY4dFE4Zm2CtH1AeTSQVXJ",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 169986912,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3011,
    "slug": "ruxshunos-36-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 36 QSIM",
      "ru": "RUXSHUNOS 36 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 36 QSIM",
      "ru": "RUXSHUNOS 36 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/j-jdfXExtxnr?s=T0x9W32QMroK2x17-WO8j7pY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/T0x9W32QMroK2x17-WO8j7pY",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 40,
    "size": 217027689,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3012,
    "slug": "ruxshunos-35-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 35 QSIM",
      "ru": "RUXSHUNOS 35 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 35 QSIM",
      "ru": "RUXSHUNOS 35 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/XoYLQRXzkeM8?s=cnQY3NeMV1_V9YfFU8gbWZK1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cnQY3NeMV1_V9YfFU8gbWZK1",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 184714124,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3013,
    "slug": "ruxshunos-34-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 34 QSIM",
      "ru": "RUXSHUNOS 34 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 34 QSIM",
      "ru": "RUXSHUNOS 34 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/aovlAf79Q5Ja?s=YM20RKhL_Qhe6LrsOwjd3YAo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YM20RKhL_Qhe6LrsOwjd3YAo",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 173966075,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3014,
    "slug": "ruxshunos-33-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 33 QSIM",
      "ru": "RUXSHUNOS 33 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 33 QSIM",
      "ru": "RUXSHUNOS 33 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/z2hm1if0NF_B?s=QJvTHQBHjYAME2r5lMwk_LAd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QJvTHQBHjYAME2r5lMwk_LAd",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 258644124,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3015,
    "slug": "ruxshunos-32-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 32 QSIM",
      "ru": "RUXSHUNOS 32 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 32 QSIM",
      "ru": "RUXSHUNOS 32 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/kZqWduIzK6co?s=azQbwj-Dla56bkXQsPL_V5JG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/azQbwj-Dla56bkXQsPL_V5JG",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 37,
    "size": 175293602,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3016,
    "slug": "ruxshunos-31-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 31 QSIM",
      "ru": "RUXSHUNOS 31 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 31 QSIM",
      "ru": "RUXSHUNOS 31 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/c2n2-TROqtnv?s=41fNuiYc_rAv-c0PzJO7LRtd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/41fNuiYc_rAv-c0PzJO7LRtd",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 40,
    "size": 191938667,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3017,
    "slug": "ruxshunos-30-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 30 QSIM",
      "ru": "RUXSHUNOS 30 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 30 QSIM",
      "ru": "RUXSHUNOS 30 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QOEoEJQXW4l6?s=zahaSdBl9eSukj-_i80pX7ky",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zahaSdBl9eSukj-_i80pX7ky",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 206437136,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3018,
    "slug": "ruxshunos-29-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 29 QSIM",
      "ru": "RUXSHUNOS 29 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 29 QSIM",
      "ru": "RUXSHUNOS 29 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JuIKvqd38C3o?s=KmJH41nctZ8dvn6qemU47Cef",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KmJH41nctZ8dvn6qemU47Cef",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 228183285,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3019,
    "slug": "ruxshunos-28-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 28 QSIM",
      "ru": "RUXSHUNOS 28 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 28 QSIM",
      "ru": "RUXSHUNOS 28 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JmjnBqT7AmRC?s=Q0AStlLBVXCOnsO5n9PkoNvZ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Q0AStlLBVXCOnsO5n9PkoNvZ",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 151731686,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3020,
    "slug": "ruxshunos-27-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 27 QSIM",
      "ru": "RUXSHUNOS 27 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 27 QSIM",
      "ru": "RUXSHUNOS 27 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BG9lRqLAWkc1?s=nI_j0Y8Ujt1WrqIUyIpejbGz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nI_j0Y8Ujt1WrqIUyIpejbGz",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 35,
    "size": 193324696,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3021,
    "slug": "ruxshunos-26-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 26 QSIM",
      "ru": "RUXSHUNOS 26 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 26 QSIM",
      "ru": "RUXSHUNOS 26 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/420pa_uPwOD1?s=RMdnb6ienOgwGw4ji-aEODph",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RMdnb6ienOgwGw4ji-aEODph",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 170421209,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3022,
    "slug": "ruxshunos-25-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 25 QSIM",
      "ru": "RUXSHUNOS 25 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 25 QSIM",
      "ru": "RUXSHUNOS 25 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5bIsPwvxnrqB?s=OImaKEIjkUeVPcn9kQxgLVJ5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OImaKEIjkUeVPcn9kQxgLVJ5",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 41,
    "size": 187630293,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3023,
    "slug": "ruxshunos-24-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 24 QSIM",
      "ru": "RUXSHUNOS 24 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 24 QSIM",
      "ru": "RUXSHUNOS 24 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/oHYQs0krxPID?s=UwoZPsGRCqMh2mOkC-X-55Z1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UwoZPsGRCqMh2mOkC-X-55Z1",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 194342809,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3024,
    "slug": "ruxshunos-23-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 23 QSIM",
      "ru": "RUXSHUNOS 23 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 23 QSIM",
      "ru": "RUXSHUNOS 23 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FIHWxWunvfu1?s=Ahk9oFd-8GfEXlOnaY7XaPIv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ahk9oFd-8GfEXlOnaY7XaPIv",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 458382349,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3025,
    "slug": "ruxshunos-22-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 22 QSIM",
      "ru": "RUXSHUNOS 22 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 22 QSIM",
      "ru": "RUXSHUNOS 22 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xtAytYOWxzpt?s=4LzHE6sFbHkX5XgB-0lYn98E",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4LzHE6sFbHkX5XgB-0lYn98E",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 654543907,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3026,
    "slug": "ruxshunos-21-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 21 QSIM",
      "ru": "RUXSHUNOS 21 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 21 QSIM",
      "ru": "RUXSHUNOS 21 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fxS3cLXy1xeF?s=zcXqxLzuwIHQErFlszn6y1s6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zcXqxLzuwIHQErFlszn6y1s6",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 422664716,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3027,
    "slug": "ruxshunos-20-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 20 QSIM",
      "ru": "RUXSHUNOS 20 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 20 QSIM",
      "ru": "RUXSHUNOS 20 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sahyxF-gnacr?s=MtuqtJKyXkN_5Y7WJ5mna7eH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MtuqtJKyXkN_5Y7WJ5mna7eH",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 482157224,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3028,
    "slug": "ruxshunos-19-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 19 QSIM",
      "ru": "RUXSHUNOS 19 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 19 QSIM",
      "ru": "RUXSHUNOS 19 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6t5Cugq7D5Mj?s=TYdmM1sqzZuYmeJBkAFTzinm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TYdmM1sqzZuYmeJBkAFTzinm",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 461855150,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3029,
    "slug": "ruxshunos-18-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 18 QSIM",
      "ru": "RUXSHUNOS 18 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 18 QSIM",
      "ru": "RUXSHUNOS 18 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Aj8kdayCh_9H?s=IoPB9BpPLHGEcd5xu7zmvh_v",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IoPB9BpPLHGEcd5xu7zmvh_v",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 388374083,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3030,
    "slug": "ruxshunos-17-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 17 QSIM",
      "ru": "RUXSHUNOS 17 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 17 QSIM\n\n🇷🇺 RUS TILIDA",
      "ru": "RUXSHUNOS 17 QSIM\n\n🇷🇺 RUS TILIDA"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/aHxoFkwFhNLm?s=3jmEtKi9dZacZ1lA1otN--Oz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3jmEtKi9dZacZ1lA1otN--Oz",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 403271393,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3031,
    "slug": "ruxshunos-16-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 16 QSIM",
      "ru": "RUXSHUNOS 16 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 16 QSIM",
      "ru": "RUXSHUNOS 16 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6C4dJ7XHCAAP?s=wMWlYTpVYNpXIOQLvQyMZP81",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wMWlYTpVYNpXIOQLvQyMZP81",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 415841748,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3032,
    "slug": "ruxshunos-15-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 15 QSIM",
      "ru": "RUXSHUNOS 15 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 15 QSIM",
      "ru": "RUXSHUNOS 15 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/D4LYLp_ag2nN?s=2xoDBrXcgvhpwYWzAspfD6ah",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2xoDBrXcgvhpwYWzAspfD6ah",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 493163610,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3033,
    "slug": "ruxshunos-14-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 14 QSIM",
      "ru": "RUXSHUNOS 14 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 14 QSIM",
      "ru": "RUXSHUNOS 14 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QZRYuWRk32I_?s=2LqXEbiq88Hl-PfjfaoPxNva",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2LqXEbiq88Hl-PfjfaoPxNva",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 515518413,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3034,
    "slug": "ruxshunos-13-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 13 QSIM",
      "ru": "RUXSHUNOS 13 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 13 QSIM",
      "ru": "RUXSHUNOS 13 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_OZ4OS7n_yIo?s=0Aycn6G6XGBc_XHGOwTOyROn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0Aycn6G6XGBc_XHGOwTOyROn",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 264266168,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3035,
    "slug": "ruxshunos-12-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 12 QSIM",
      "ru": "RUXSHUNOS 12 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 12 QSIM",
      "ru": "RUXSHUNOS 12 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PDL38RCbvHr2?s=9UZvcYHyGArqRy5bXu4GZWuI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9UZvcYHyGArqRy5bXu4GZWuI",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 418449927,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3036,
    "slug": "ruxshunos-11-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 11 QSIM",
      "ru": "RUXSHUNOS 11 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 11 QSIM",
      "ru": "RUXSHUNOS 11 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/y1qPuTRaiNuV?s=Dd1pLsmkgftSxVCEbEAG8hw8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Dd1pLsmkgftSxVCEbEAG8hw8",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 472485665,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3037,
    "slug": "ruxshunos-10-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 10 QSIM",
      "ru": "RUXSHUNOS 10 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 10 QSIM",
      "ru": "RUXSHUNOS 10 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/h9gbeD2Ddg6D?s=Ut3w0SsIDAjek2EH9kuWEuy4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ut3w0SsIDAjek2EH9kuWEuy4",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 470611696,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3038,
    "slug": "ruxshunos-9-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 9 QSIM",
      "ru": "RUXSHUNOS 9 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 9 QSIM",
      "ru": "RUXSHUNOS 9 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lMGtlBfwp4yX?s=5Aaix9GJqrDMw4UyBTt4aB77",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5Aaix9GJqrDMw4UyBTt4aB77",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 421034628,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3039,
    "slug": "ruxshunos-8-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 8 QSIM",
      "ru": "RUXSHUNOS 8 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 8 QSIM",
      "ru": "RUXSHUNOS 8 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/P5EpnZfE9832?s=tdZQAFPLDrR5AzgUnhB0Gc7e",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tdZQAFPLDrR5AzgUnhB0Gc7e",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 42,
    "size": 451838951,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3040,
    "slug": "ruxshunos-7-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 7 QSIM",
      "ru": "RUXSHUNOS 7 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 7 QSIM",
      "ru": "RUXSHUNOS 7 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Wu7ZYBCEf_ma?s=MadH5CEPpGpLstrilLvChqsm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MadH5CEPpGpLstrilLvChqsm",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 475811347,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3041,
    "slug": "ruxshunos-6-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 6 QSIM",
      "ru": "RUXSHUNOS 6 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 6 QSIM",
      "ru": "RUXSHUNOS 6 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g3l_FsalhorF?s=NZ-EAxZHSDz6iHIfoZe9A7ny",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NZ-EAxZHSDz6iHIfoZe9A7ny",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 398646194,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3042,
    "slug": "ruxshunos-5-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 5 QSIM",
      "ru": "RUXSHUNOS 5 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 5 QSIM",
      "ru": "RUXSHUNOS 5 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3-phdIoGKAHg?s=ugPbVqDtHMRbUSJ_uAS4D_Xy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ugPbVqDtHMRbUSJ_uAS4D_Xy",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 487242266,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3043,
    "slug": "ruxshunos-4-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 4 QSIM",
      "ru": "RUXSHUNOS 4 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 4 QSIM",
      "ru": "RUXSHUNOS 4 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/l2iG36ZPx8dD?s=nBHTzIUV3pyscvVc3PitAs7y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nBHTzIUV3pyscvVc3PitAs7y",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 43,
    "size": 492816827,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3044,
    "slug": "ruxshunos-3-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 3 QSIM",
      "ru": "RUXSHUNOS 3 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 3 QSIM",
      "ru": "RUXSHUNOS 3 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9XDtq5UY_YCw?s=UFS9ktJHoC-YKpHdxGpXNZO8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/UFS9ktJHoC-YKpHdxGpXNZO8",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 560469660,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3045,
    "slug": "ruxshunos-2-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 2 QSIM",
      "ru": "RUXSHUNOS 2 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 2 QSIM",
      "ru": "RUXSHUNOS 2 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/swL8U19_7lC7?s=rDWugrV0igE3F5hOEbrMSg8k",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rDWugrV0igE3F5hOEbrMSg8k",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 285785208,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3046,
    "slug": "ruxshunos-1-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 1 QSIM",
      "ru": "RUXSHUNOS 1 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 1 QSIM",
      "ru": "RUXSHUNOS 1 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7uf15TrYFas1?s=WDYw75mVB2MuxPBc5zI3I1qj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WDYw75mVB2MuxPBc5zI3I1qj",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 44,
    "size": 176592847,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3047,
    "slug": "ishtimoiy-tarmoqlarda-trenddagi-kino",
    "type": "film",
    "title": {
      "uz": "Ishtimoiy tarmoqlarda trenddagi kino",
      "ru": "Ishtimoiy tarmoqlarda trenddagi kino"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ishtimoiy tarmoqlarda trenddagi kino 👇👇👇",
      "ru": "Ishtimoiy tarmoqlarda trenddagi kino 👇👇👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rtj1XvmZpQqq?s=oXsySg9PI2oF-vsBi_89ojvg",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oXsySg9PI2oF-vsBi_89ojvg",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 6357897,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3048,
    "slug": "xavfli-kelishuv-premyera",
    "type": "film",
    "title": {
      "uz": "XAVFLI KELISHUV (Premyera)",
      "ru": "XAVFLI KELISHUV (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 XAVFLI KELISHUV (Premyera)\n\nJinoiy avtoritet Jek Vulf qamoqdan qutulish va 30 million dollar sug'urta pulini olish uchun o'z o'limini soxtalashtiradi. U bu qotillikda xotinining jazmanini aybdor qilib ko'rsatmoqchi bo'ladi. \n\nBiroq, uning ayyor rafiqasi bu rejadan xabar topadi va erini haqiqatdan ham o'ldirib, pullarni o'zi olib qochishga qaror qiladi.\n🇺🇸 Davlati: AQSH\n🎥 Janr: Triller, Jangari\n📆 Premyera: 2026-yil",
      "ru": "📺 XAVFLI KELISHUV (Premyera)\n\nJinoiy avtoritet Jek Vulf qamoqdan qutulish va 30 million dollar sug'urta pulini olish uchun o'z o'limini soxtalashtiradi. U bu qotillikda xotinining jazmanini aybdor qilib ko'rsatmoqchi bo'ladi. \n\nBiroq, uning ayyor rafiqasi bu rejadan xabar topadi va erini haqiqatdan ham o'ldirib, pullarni o'zi olib qochishga qaror qiladi.\n🇺🇸 Davlati: AQSH\n🎥 Janr: Triller, Jangari\n📆 Premyera: 2026-yil"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AxbRkRYz0o3F?s=bqShGd-LxYq_j1NyiYf16WRZ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bqShGd-LxYq_j1NyiYf16WRZ",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 97,
    "size": 1132427408,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3049,
    "slug": "55-element",
    "type": "film",
    "title": {
      "uz": "55 ELEMENT",
      "ru": "55 ELEMENT"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 55 ELEMENT\n\nGongkongdagi chiqindi omborida yuz bergan yong'in oqibatida radioaktiv seziy moddasi sizib chiqishi haqidagi film. Radiatsiya buluti 7 million aholi hayotiga tahdid soladi.\n\nOlimlar va amaldorlar halokat ko'lamini yashirishga urinib, o'zaro bahslashadilar. Fojia ortida korrupsiyalashgan biznesmen turgani ma'lum bo'ladi.\n\nJasur o't o'chiruvchilar shaharni saqlab qolish uchun hayotlarini tikib, radiatsiya markazida kurashadilar.\n\n🇭🇰 Davlati: Gong Kong\n🎥 Janr: Jangari, Triller\n📆 Premyera: 2024-yil\n⭐️ Reyting IMDB: 6.3/10",
      "ru": "📺 55 ELEMENT\n\nGongkongdagi chiqindi omborida yuz bergan yong'in oqibatida radioaktiv seziy moddasi sizib chiqishi haqidagi film. Radiatsiya buluti 7 million aholi hayotiga tahdid soladi.\n\nOlimlar va amaldorlar halokat ko'lamini yashirishga urinib, o'zaro bahslashadilar. Fojia ortida korrupsiyalashgan biznesmen turgani ma'lum bo'ladi.\n\nJasur o't o'chiruvchilar shaharni saqlab qolish uchun hayotlarini tikib, radiatsiya markazida kurashadilar.\n\n🇭🇰 Davlati: Gong Kong\n🎥 Janr: Jangari, Triller\n📆 Premyera: 2024-yil\n⭐️ Reyting IMDB: 6.3/10"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sUhAMYPLbYgd?s=PtsQCS8h5b5o4GBaCU4Qgq_i",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PtsQCS8h5b5o4GBaCU4Qgq_i",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 136,
    "size": 1569189139,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3050,
    "slug": "rempeyj",
    "type": "film",
    "title": {
      "uz": "REMPEYJ",
      "ru": "REMPEYJ"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 REMPEYJ\n\nKosmik stansiyadagi noqonuniy genetik mutagen yerga tushadi. Modda ta'sirida Jorj ismli oq gorilla, yovvoyi bo'ri va timsoh ulkan maxluqlarga aylanadi.\n\nAqldan ozgan yirtqichlar Chikago shahrini vayron qilish uchun u yerga yo'l oladi. Primatolog Devis gijgijlovchi dori qidiradi va o'zining do'sti Jorjni tinchlantiradi.\n\nDevis va Jorj birgalikda qolgan ulkan yirtqichlarni mag'lub etib, shaharni saqlab qolishadi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Ilmiy Fantastika \n📆 Premyera: 2018-yil\n⭐️ Reyting IMDB: 6.1/10",
      "ru": "📺 REMPEYJ\n\nKosmik stansiyadagi noqonuniy genetik mutagen yerga tushadi. Modda ta'sirida Jorj ismli oq gorilla, yovvoyi bo'ri va timsoh ulkan maxluqlarga aylanadi.\n\nAqldan ozgan yirtqichlar Chikago shahrini vayron qilish uchun u yerga yo'l oladi. Primatolog Devis gijgijlovchi dori qidiradi va o'zining do'sti Jorjni tinchlantiradi.\n\nDevis va Jorj birgalikda qolgan ulkan yirtqichlarni mag'lub etib, shaharni saqlab qolishadi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Ilmiy Fantastika \n📆 Premyera: 2018-yil\n⭐️ Reyting IMDB: 6.1/10"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/LAhAsvJAkbBg?s=CSDeqHw572rZoyI11--MIqJZ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CSDeqHw572rZoyI11--MIqJZ",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 107,
    "size": 1136841709,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3051,
    "slug": "sahro-farzandi-premyera",
    "type": "film",
    "title": {
      "uz": "SAHRO FARZANDI (Premyera)",
      "ru": "SAHRO FARZANDI (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 SAHRO FARZANDI (Premyera)\n\n14 yoshli Sun oʻz bobosining hikoyalari asosida choʻlda yoʻqolib qolgan bola haqida kitob yozadi. Keyinchalik u Sahroi kabirga borib, oʻz qahramonining real inson — Xadara boʻlganini bilib qoladi.\n\nXadara 2 yoshligida qum boʻronida adashib qolgan va uni tuyaqushlar oilasi asrab olib, 10 yil davomida choʻlda boquviga olgan. Odamlar uni topib, insonlar dunyosiga qaytarishganda, u yovvoyi tabiatdagi erkinlik va jamiyat qoidalari oʻrtasida tanlov qilishi kerak boʻladi.\n\n🇫🇷 Davlati: Fransiya\n🎥 Janr: Sarguzasht\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.3/10",
      "ru": "📺 SAHRO FARZANDI (Premyera)\n\n14 yoshli Sun oʻz bobosining hikoyalari asosida choʻlda yoʻqolib qolgan bola haqida kitob yozadi. Keyinchalik u Sahroi kabirga borib, oʻz qahramonining real inson — Xadara boʻlganini bilib qoladi.\n\nXadara 2 yoshligida qum boʻronida adashib qolgan va uni tuyaqushlar oilasi asrab olib, 10 yil davomida choʻlda boquviga olgan. Odamlar uni topib, insonlar dunyosiga qaytarishganda, u yovvoyi tabiatdagi erkinlik va jamiyat qoidalari oʻrtasida tanlov qilishi kerak boʻladi.\n\n🇫🇷 Davlati: Fransiya\n🎥 Janr: Sarguzasht\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.3/10"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_AgplC27AQOe?s=PXDcG7aDHAqB5vftLepFIkyJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PXDcG7aDHAqB5vftLepFIkyJ",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 92,
    "size": 1140702508,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3052,
    "slug": "qoyilmaqom-sheriklar",
    "type": "film",
    "title": {
      "uz": "QOYILMAQOM SHERIKLAR",
      "ru": "QOYILMAQOM SHERIKLAR"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 QOYILMAQOM SHERIKLAR \n\nSobiq yulduz-detektiv, hozirda esa omadsiz Jae-hyuk va uning yangi sherigi — boy oiladan chiqqan ambitsiyali yosh Jung-ho cherkov qutisidan 33 dollar o'g'irlagan mayda o'g'rini ushlashadi.\n\nTergov davomida ushbu mayda o'g'ri aslida Seulning Gangnam tumanida yuz bergan va allaqachon \"yopilgan\" yirik qotillik ishiga aloqadorligi ma'lum bo'ladi.\n\nIkki detektiv haqiqiy qotilni topish uchun Seulga yo'l oladi. Ular haqiqatni yashirishga urinayotgan korrupsiyalashgan politsiya tizimi va nufuzli shaxslarga qarshi kurashib, adolatni tiklashga majbur bo'lishadi.\n\n🇰🇷 Davlati: ",
      "ru": "📺 QOYILMAQOM SHERIKLAR \n\nSobiq yulduz-detektiv, hozirda esa omadsiz Jae-hyuk va uning yangi sherigi — boy oiladan chiqqan ambitsiyali yosh Jung-ho cherkov qutisidan 33 dollar o'g'irlagan mayda o'g'rini ushlashadi.\n\nTergov davomida ushbu mayda o'g'ri aslida Seulning Gangnam tumanida yuz bergan va allaqachon \"yopilgan\" yirik qotillik ishiga aloqadorligi ma'lum bo'ladi.\n\nIkki detektiv haqiqiy qotilni topish uchun Seulga yo'l oladi. Ular haqiqatni yashirishga urinayotgan korrupsiyalashgan politsiya tizimi va nufuzli shaxslarga qarshi kurashib, adolatni tiklashga majbur bo'lishadi.\n\n🇰🇷 Davlati: "
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BuIdZIKX5muY?s=xeoU5EX-ov9jli6Lv2_eP2sq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xeoU5EX-ov9jli6Lv2_eP2sq",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 95,
    "size": 705036998,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3053,
    "slug": "ogirlangan-qiz",
    "type": "film",
    "title": {
      "uz": "O'G'IRLANGAN QIZ",
      "ru": "O'G'IRLANGAN QIZ"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 O'G'IRLANGAN QIZ\n\nSobiq eri qizini yashirincha Suriyaga olib qochib ketgach, ona (Keyt Bekinsale) oʻn yildan ortiq vaqt davomida uni qaytarishga urinadi. Chorasiz qolgan ayol qizini topish evaziga sobiq harbiylar guruhi bilan kelishadi va butun dunyo boʻylab oʻgʻirlangan bolalarni qutqarish boʻyicha maxfiy, xavfli operatsiyalarda qatnasha boshlaydi. Biroq keyinchalik bu guruh ortida Markaziy razvedka boshqarmasi (MRB) turgani va unga yordam berayotgan shaxsning maqsadlari mutlaqo boshqa ekani maʼlum boʻladi.Kabi\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Sarguzasht\n📆 Premyera: 2025-yil\n⭐️ Reyting IMDB: ",
      "ru": "📺 O'G'IRLANGAN QIZ\n\nSobiq eri qizini yashirincha Suriyaga olib qochib ketgach, ona (Keyt Bekinsale) oʻn yildan ortiq vaqt davomida uni qaytarishga urinadi. Chorasiz qolgan ayol qizini topish evaziga sobiq harbiylar guruhi bilan kelishadi va butun dunyo boʻylab oʻgʻirlangan bolalarni qutqarish boʻyicha maxfiy, xavfli operatsiyalarda qatnasha boshlaydi. Biroq keyinchalik bu guruh ortida Markaziy razvedka boshqarmasi (MRB) turgani va unga yordam berayotgan shaxsning maqsadlari mutlaqo boshqa ekani maʼlum boʻladi.Kabi\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Sarguzasht\n📆 Premyera: 2025-yil\n⭐️ Reyting IMDB: "
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/r4R9_-O1L7w_?s=DtAbptWlgwnGIf0IALeaNR4w",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DtAbptWlgwnGIf0IALeaNR4w",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 106,
    "size": 961184383,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3054,
    "slug": "video-1662",
    "type": "film",
    "title": {
      "uz": "Video 1662",
      "ru": "Video 1662"
    },
    "genres": [
      "drama"
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
    "poster": "https://dezocloud.uz/t/4XRe1W1BHHda?s=RfyFbJnS7PwQtNjC56SH5_5b",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RfyFbJnS7PwQtNjC56SH5_5b",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 5450591,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3055,
    "slug": "video-1661",
    "type": "film",
    "title": {
      "uz": "Video 1661",
      "ru": "Video 1661"
    },
    "genres": [
      "drama"
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
    "poster": "https://dezocloud.uz/t/Xdhx28sUrAnz?s=rbAWrUXAFpr7Z6UbPTlmChGv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rbAWrUXAFpr7Z6UbPTlmChGv",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 4310759,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3056,
    "slug": "video-1660",
    "type": "film",
    "title": {
      "uz": "Video 1660",
      "ru": "Video 1660"
    },
    "genres": [
      "drama"
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
    "poster": "https://dezocloud.uz/t/LiwswwuSn1fg?s=NS9pD_t-7QWsLknvaTrREa6f",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NS9pD_t-7QWsLknvaTrREa6f",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 1,
    "size": 11405203,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3057,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 73-qism (final)\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 73-qism (final)\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/F7Rw3DdEcIli?s=O8jI4jgFyA2jSnT0BLm2r-gs",
    "trailer": "",
    "video": "https://dezocloud.uz/s/O8jI4jgFyA2jSnT0BLm2r-gs",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 79,
    "size": 761437765,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3058,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 72-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 72-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/U3m74tT4R3sy?s=LYoEv9bButER-UuSsnoEZ6uB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LYoEv9bButER-UuSsnoEZ6uB",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 78,
    "size": 1187264716,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3059,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 71-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 71-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g_-OkoTBuDyI?s=AiwpAHJ6hImbMWOuv0pQ94lO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AiwpAHJ6hImbMWOuv0pQ94lO",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 77,
    "size": 775846865,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3060,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 70-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 70-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/aPXHwKMDvCd-?s=lRWEXGOS2Th0hBVs5PVOBkE5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lRWEXGOS2Th0hBVs5PVOBkE5",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 82,
    "size": 825918668,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3061,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 69-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 69-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/j_psI-Q55ny2?s=NQ395Ad4aXMr-MqPcitQkHNk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NQ395Ad4aXMr-MqPcitQkHNk",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 58,
    "size": 425641825,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3062,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 68-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 8-fasl 68-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pARj2GGhjl1C?s=kNFN5KNT-Y0nNREaq0M5gqzw",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kNFN5KNT-Y0nNREaq0M5gqzw",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 53,
    "size": 492925608,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3063,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 67-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 67-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ol6mH1rWpKLh?s=glG1xARI35I2EHe9mV207ioA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/glG1xARI35I2EHe9mV207ioA",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 80,
    "size": 747216200,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3064,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 66-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 66-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3udpYNe9uuLV?s=qqrxCRpR0ymNnGGFZnL8cqrd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qqrxCRpR0ymNnGGFZnL8cqrd",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 70,
    "size": 806143006,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3065,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 65-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 65-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fCtwkXITgJDx?s=kroc7IreRebqzqs6OZDBFQ8z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kroc7IreRebqzqs6OZDBFQ8z",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 58,
    "size": 518019927,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3066,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 64-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 64-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/d6G7wPXKCrcJ?s=JLPqhBWcdJy8tYoCQF_xwiv5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JLPqhBWcdJy8tYoCQF_xwiv5",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 49,
    "size": 578848839,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3067,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 63-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 63-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5tFoFSjdymJB?s=1PYMoe1XyuyrQTBNYD_d0Dlu",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1PYMoe1XyuyrQTBNYD_d0Dlu",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 62,
    "size": 566024403,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3068,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 62-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 62-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7fnI5AuBCyQd?s=o___Svpnt9ryhahH9PxoxQJm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/o___Svpnt9ryhahH9PxoxQJm",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 58,
    "size": 476645050,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3069,
    "slug": "taxtlar-oyini",
    "type": "film",
    "title": {
      "uz": "«Taxtlar oʻyini»",
      "ru": "«Taxtlar oʻyini»"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 61-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida",
      "ru": "#🔥 \n\n🎬 «Taxtlar oʻyini»\n📂 7-fasl 61-qism\n🎞 Sifat: 1080p\n🇺🇿 O'zbek tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KvZUxmT921Mh?s=iyumj_dMS2sPsWis_wSpH2t9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iyumj_dMS2sPsWis_wSpH2t9",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 59,
    "size": 528663870,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3070,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay\n6-mavsum finali",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay\n6-mavsum finali"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ds_cy9tV3IJ-?s=Kt-2jY7eWg9bfFPdqOtwJQ7k",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Kt-2jY7eWg9bfFPdqOtwJQ7k",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 68,
    "size": 1063631603,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3071,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1ua9wnU9sBCY?s=aiYeYSg3xnJ5M3vixXuVMAte",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aiYeYSg3xnJ5M3vixXuVMAte",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 59,
    "size": 1144534488,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3072,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nXN1HI4ovBTn?s=JtbT5y1kgChHFvelgrnojgbS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JtbT5y1kgChHFvelgrnojgbS",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 58,
    "size": 1065155805,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3073,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/h_dmuQgukAPX?s=2Y7GGrfLE70aWqkYZ6nIMhHI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2Y7GGrfLE70aWqkYZ6nIMhHI",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 50,
    "size": 950342678,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3074,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rGt-Unfo8kC7?s=Wwcidz-5QH07f3FMh8f-KGB7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Wwcidz-5QH07f3FMh8f-KGB7",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 51,
    "size": 967770742,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3075,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K1Iy33hMHPNg?s=ca5L-6WJPjS0bgxJxWiCj0tG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ca5L-6WJPjS0bgxJxWiCj0tG",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 57,
    "size": 993285462,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3076,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 4-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 4-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/z6PxsFvfVlnn?s=_ucOcHeGek8ceiwckGYT4sB4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_ucOcHeGek8ceiwckGYT4sB4",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 59,
    "size": 1025478599,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3077,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 3-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 3-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/f8xhJd50XwxA?s=Uvp4DPCpgXz-LXFqSxElNuqm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Uvp4DPCpgXz-LXFqSxElNuqm",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 52,
    "size": 845462431,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3078,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 2-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 2-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3VHpBSa63gDx?s=VaZnVU2XOV3gPY8I6EU1972y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VaZnVU2XOV3gPY8I6EU1972y",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 54,
    "size": 859750664,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3079,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 1-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n6-mavsum 1-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mNxxoxABldh1?s=VIVgNcAYCgT9w4ZhHGkVVoEt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VIVgNcAYCgT9w4ZhHGkVVoEt",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 50,
    "size": 995169811,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3080,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QLMWQ7snajgG?s=fzln5AruY4B71iLxm6iONd9I",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fzln5AruY4B71iLxm6iONd9I",
    "featured": false,
    "addedAt": 1791033808165,
    "updatedAt": 1791033808165,
    "duration": 60,
    "size": 1117546610,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3081,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1Y_SoL7Y7zdS?s=gUixGemSrviVSY-ZhPSneH8a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gUixGemSrviVSY-ZhPSneH8a",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 52,
    "size": 1278040614,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3082,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MGvtsvkIySO6?s=QxRvBQPU9ry4Chs1afxLYMAR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QxRvBQPU9ry4Chs1afxLYMAR",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 60,
    "size": 1230822692,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3083,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/M83hHGxOsY-g?s=_wurh7EMOw4ZhJCkYU-kdHU_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_wurh7EMOw4ZhJCkYU-kdHU_",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 59,
    "size": 1060810065,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3084,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/E7De8_4kYwoR?s=myBs_LCaoxtdcf4Utyv23qen",
    "trailer": "",
    "video": "https://dezocloud.uz/s/myBs_LCaoxtdcf4Utyv23qen",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 54,
    "size": 1007712959,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3085,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GzD1wgRIAxfI?s=u-Z6viLk_ckL-94v_pAQvYS-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/u-Z6viLk_ckL-94v_pAQvYS-",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 57,
    "size": 850346711,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3086,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 4-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 4-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ijGAv-yvG0RV?s=28vpSamSjCS2strf91_J8tzw",
    "trailer": "",
    "video": "https://dezocloud.uz/s/28vpSamSjCS2strf91_J8tzw",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 50,
    "size": 1057843626,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3087,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 3-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 3-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K6mjg-_3Ke2J?s=u7Tt5sSLG5NdNotXRmuUpYu2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/u7Tt5sSLG5NdNotXRmuUpYu2",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 60,
    "size": 998688098,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3088,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 2-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 2-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xsq_EVLJqej9?s=cDPhu95BQI89m1n0582xgYoT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cDPhu95BQI89m1n0582xgYoT",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 56,
    "size": 1151906650,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3089,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 1-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n5-mavsum 1-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BNkJeK-NwA4H?s=eYjM0YyNY7_ppEMQAO3-Bo4p",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eYjM0YyNY7_ppEMQAO3-Bo4p",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 52,
    "size": 855500617,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3090,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay\n4-mavsum finali 👇",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 10-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay\n4-mavsum finali 👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/L926jXA_Foqh?s=dOCtfGn1H0O1H8v21md0q2CD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/dOCtfGn1H0O1H8v21md0q2CD",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 65,
    "size": 1146776732,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3091,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 9-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/HadjjU_8CfRm?s=Fkw_cMmRvRbIX82vGbqZ1laC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Fkw_cMmRvRbIX82vGbqZ1laC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 51,
    "size": 979207206,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3092,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 8-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/veVvFxo55A5E?s=mRBMx9jENmscunV_f1bozt0T",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mRBMx9jENmscunV_f1bozt0T",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 52,
    "size": 885156388,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3093,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 7-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xQGejTTHF5aV?s=oAFP9s7NBoM1N59jL65C9kpi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oAFP9s7NBoM1N59jL65C9kpi",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 51,
    "size": 865873788,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3094,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 6-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/v0fYQXabyohK?s=gnWz4swFSkFH2vz_hKL8YDdP",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gnWz4swFSkFH2vz_hKL8YDdP",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 51,
    "size": 892306358,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3095,
    "slug": "taxtlar-oyini-game-of-thrones",
    "type": "film",
    "title": {
      "uz": "##Taxtlar oʻyini (Game of thrones)",
      "ru": "##Taxtlar oʻyini (Game of thrones)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay",
      "ru": "##Taxtlar oʻyini (Game of thrones)\n4-mavsum 5-qism\n\n🇺🇿Uzbek tilida (tv dublaj)\n🏇1080p BluRay"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Pz4f3tq_5mU9?s=jIlIIOi729g1Obqg_ZoHBJUH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jIlIIOi729g1Obqg_ZoHBJUH",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 53,
    "size": 898383566,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3096,
    "slug": "olja",
    "type": "film",
    "title": {
      "uz": "O'lja",
      "ru": "O'lja"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "O'lja",
      "ru": "O'lja"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MpK76-upovdy?s=TC-iuYe3Ahfzj9vUZVWoR2sK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TC-iuYe3Ahfzj9vUZVWoR2sK",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 93,
    "size": 1962618381,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3097,
    "slug": "terminator-5-genezis",
    "type": "film",
    "title": {
      "uz": "« Terminator-5: Genezis",
      "ru": "« Terminator-5: Genezis"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "« Terminator-5: Genezis",
      "ru": "« Terminator-5: Genezis"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mdJKOElN6X_a?s=Yyh3brPpI367_1PTooCZ_tGh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Yyh3brPpI367_1PTooCZ_tGh",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 126,
    "size": 1558469415,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3098,
    "slug": "gullagan-oy-qotillari",
    "type": "film",
    "title": {
      "uz": "GULLAGAN OY QOTILLARI",
      "ru": "GULLAGAN OY QOTILLARI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 GULLAGAN OY QOTILLARI\n\n1920-yillarda Oklahomadagi oseyj qabilasi hindulari o‘z yerlaridan neft topilishi ortidan juda boyib ketishadi. \n\nUlarning boyligini qo‘lga kiritishni istagan yirik fermer Uilyam Xeyl jiyan Ernest Berkhartni boy hindu qizi Molli Kaylga uylantiradi. Shundan so‘ng, Mollining oila a’zolari va qabila vakillari birin-ketin sirli ravishda o‘ldirila boshlaydi. \n\nFQB (Federal Qidiruv Byurosi) surishtiruv o‘tkazib, barcha qotilliklar ortida neft boyligiga ega chiqmoqchi bo‘lgan Uilyam Xeyl va xiyonatkor turmush o‘rtoq Ernest turganini fosh qiladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: ",
      "ru": "📺 GULLAGAN OY QOTILLARI\n\n1920-yillarda Oklahomadagi oseyj qabilasi hindulari o‘z yerlaridan neft topilishi ortidan juda boyib ketishadi. \n\nUlarning boyligini qo‘lga kiritishni istagan yirik fermer Uilyam Xeyl jiyan Ernest Berkhartni boy hindu qizi Molli Kaylga uylantiradi. Shundan so‘ng, Mollining oila a’zolari va qabila vakillari birin-ketin sirli ravishda o‘ldirila boshlaydi. \n\nFQB (Federal Qidiruv Byurosi) surishtiruv o‘tkazib, barcha qotilliklar ortida neft boyligiga ega chiqmoqchi bo‘lgan Uilyam Xeyl va xiyonatkor turmush o‘rtoq Ernest turganini fosh qiladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: "
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qRajqfodjcX2?s=6CgBRwYtGj5Pd6MSN_SN1AlW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6CgBRwYtGj5Pd6MSN_SN1AlW",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 210,
    "size": 1688851564,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3099,
    "slug": "sher-zarbasi-premyera",
    "type": "film",
    "title": {
      "uz": "SHER ZARBASI (Premyera)",
      "ru": "SHER ZARBASI (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 SHER ZARBASI (Premyera)\n\nBosh qahramon Jo rafiqasining jinoyatini o'z bo'yniga olib, 4 yil qamoqda o'tiradi.\n\nOzodlikka chiqqach, u o'g'li og'ir xastalik (o'sma) bilan kasallanganini va unga qimmat operatsiya kerakligini biladi.\n\nPul topish uchun Jo 100 000 dollar mukofot qo'yilgan, qoidalarsiz shafqatsiz jangovar turnirga qatnashishga majbur bo'ladi.\n\nU qattiq tayyorgarlik ko'rib, o'g'lining hayoti uchun dunyoning eng xavfli jangchilariga qarshi maydonga tushadi\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Drama\n📆 Premyera: 2026-yil",
      "ru": "📺 SHER ZARBASI (Premyera)\n\nBosh qahramon Jo rafiqasining jinoyatini o'z bo'yniga olib, 4 yil qamoqda o'tiradi.\n\nOzodlikka chiqqach, u o'g'li og'ir xastalik (o'sma) bilan kasallanganini va unga qimmat operatsiya kerakligini biladi.\n\nPul topish uchun Jo 100 000 dollar mukofot qo'yilgan, qoidalarsiz shafqatsiz jangovar turnirga qatnashishga majbur bo'ladi.\n\nU qattiq tayyorgarlik ko'rib, o'g'lining hayoti uchun dunyoning eng xavfli jangchilariga qarshi maydonga tushadi\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Drama\n📆 Premyera: 2026-yil"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/J2CmDKia5_5u?s=shMRX-kvwMyP_YWVVg7naZDe",
    "trailer": "",
    "video": "https://dezocloud.uz/s/shMRX-kvwMyP_YWVVg7naZDe",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 91,
    "size": 737646902,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3100,
    "slug": "qahr-soqmogi",
    "type": "film",
    "title": {
      "uz": "QAHR SO'QMOG'I",
      "ru": "QAHR SO'QMOG'I"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 QAHR SO'QMOG'I\n\nSobiq chegarachi Sergey Markov odamlardan uzoqda, deyarli yolg'izlikda hayot kechiradi.\n\nUning qizi Tojikiston tog'larida bedarak yo'qolib qoladi. Qizini qutqarish uchun Sergey o'z yoshligi o'tgan, 1998-yilda xizmat qilgan tojik-afg'on chegarasiga qaytishga majbur bo'ladi.\n\nQizini qidirish jarayonida u nafaqat jinoiy guruhlar bilan to'qnashadi, balki o'tmishdagi \"arvohlar\" — eski dushmanlar, xiyonat va bitmagan yaralar bilan yuzma-yuz keladi.\n\nFilmda detektiv unsurlar, mistik savollar va shafqatsiz qasos mavzulari uyg'unlashib ketgan.\n🇷🇺 Davlati: Rossiya\n🎥 Janr: Jangari, ",
      "ru": "📺 QAHR SO'QMOG'I\n\nSobiq chegarachi Sergey Markov odamlardan uzoqda, deyarli yolg'izlikda hayot kechiradi.\n\nUning qizi Tojikiston tog'larida bedarak yo'qolib qoladi. Qizini qutqarish uchun Sergey o'z yoshligi o'tgan, 1998-yilda xizmat qilgan tojik-afg'on chegarasiga qaytishga majbur bo'ladi.\n\nQizini qidirish jarayonida u nafaqat jinoiy guruhlar bilan to'qnashadi, balki o'tmishdagi \"arvohlar\" — eski dushmanlar, xiyonat va bitmagan yaralar bilan yuzma-yuz keladi.\n\nFilmda detektiv unsurlar, mistik savollar va shafqatsiz qasos mavzulari uyg'unlashib ketgan.\n🇷🇺 Davlati: Rossiya\n🎥 Janr: Jangari, "
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/U44mBcq-x5SV?s=gc_4hWvaH57JDxnDTTYSiPVb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gc_4hWvaH57JDxnDTTYSiPVb",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 90,
    "size": 643812128,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3101,
    "slug": "yolgiz-jangchi-premyera",
    "type": "film",
    "title": {
      "uz": "YOLG'IZ JANGCHI (Premyera)",
      "ru": "YOLG'IZ JANGCHI (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 YOLG'IZ JANGCHI (Premyera)\n\nSirlarga boy o'tmishga ega sobiq maxsus kuchlar jangchisi kichik bir shaharchaga keladi. Shaharcha aholisi shafqatsiz jinoiy guruh boshlig'i va korrupsioner sherif zulmi ostida yashayotgan bo'ladi. Bosh qahramon o'z gunohlarini yuvish va adolat o'rnatish uchun bu to'daga qarshi bir o'zi shafqatsiz urush boshlaydi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Triller\n📆 Premyera: 2026-yil",
      "ru": "📺 YOLG'IZ JANGCHI (Premyera)\n\nSirlarga boy o'tmishga ega sobiq maxsus kuchlar jangchisi kichik bir shaharchaga keladi. Shaharcha aholisi shafqatsiz jinoiy guruh boshlig'i va korrupsioner sherif zulmi ostida yashayotgan bo'ladi. Bosh qahramon o'z gunohlarini yuvish va adolat o'rnatish uchun bu to'daga qarshi bir o'zi shafqatsiz urush boshlaydi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Jangari, Triller\n📆 Premyera: 2026-yil"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/H_ASf7jWwoTn?s=rESR0j_GVlOHcPqCnL-RDFBn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rESR0j_GVlOHcPqCnL-RDFBn",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 95,
    "size": 666615678,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3102,
    "slug": "majburiy-sheriklar-premyera",
    "type": "film",
    "title": {
      "uz": "MAJBURIY SHERIKLAR (Premyera)",
      "ru": "MAJBURIY SHERIKLAR (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 MAJBURIY SHERIKLAR (Premyera)\n\nNarkotiklarga qarshi kurash detektivi Xvang Chun Sik yirik jinoyatchini ushlagan kunining o'zida uning sobiq xotini o'g'irlab ketiladi. Ayolni qutqarish uchun u o'zining mutlaqo aksi bo'lgan odam — ayolning hozirgi eri, veterinar Li Min Sok bilan hamkorlik qilishga majbur bo'ladi. Bir-birini yoqtirmaydigan ikki er rashk va kelishmovchiliklarni chetga surib, xavfli va kulgili qutqaruv operatsiyasini boshlashadi.\n\n🇰🇷 Davlati: Janubiy Koreya\n🎥 Janr: Jangari, Komediya\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.2/10",
      "ru": "📺 MAJBURIY SHERIKLAR (Premyera)\n\nNarkotiklarga qarshi kurash detektivi Xvang Chun Sik yirik jinoyatchini ushlagan kunining o'zida uning sobiq xotini o'g'irlab ketiladi. Ayolni qutqarish uchun u o'zining mutlaqo aksi bo'lgan odam — ayolning hozirgi eri, veterinar Li Min Sok bilan hamkorlik qilishga majbur bo'ladi. Bir-birini yoqtirmaydigan ikki er rashk va kelishmovchiliklarni chetga surib, xavfli va kulgili qutqaruv operatsiyasini boshlashadi.\n\n🇰🇷 Davlati: Janubiy Koreya\n🎥 Janr: Jangari, Komediya\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.2/10"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/f9xYc-uSxXfT?s=e8Iq4wTAFcdVJo_LcSZhS6jH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/e8Iq4wTAFcdVJo_LcSZhS6jH",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 110,
    "size": 1097128601,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3103,
    "slug": "olim-chehrasi",
    "type": "film",
    "title": {
      "uz": "O'LIM CHEHRASI",
      "ru": "O'LIM CHEHRASI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 O'LIM CHEHRASI\n\nVideoplatformada taqiqlangan va shafqatsiz videolarni oʻchiruvchi ayol moderator.\n\nU tarmoqda 1978-yilgi original filmdagi oʻlim sahnalarini aniq takrorlayotgan sirli videolarga duch keladi.\n\nModerator videolarni oʻrganar ekan, ularning qayeri sahnalashtirilgan tomosha va qayeri haqiqiy qotillik ekanligini ajratolmay qoladi va dahshatli oʻyin ichiga tushib qoladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Qo'rqinchli, Saspens\n📆 Premyera: 2026-yil",
      "ru": "📺 O'LIM CHEHRASI\n\nVideoplatformada taqiqlangan va shafqatsiz videolarni oʻchiruvchi ayol moderator.\n\nU tarmoqda 1978-yilgi original filmdagi oʻlim sahnalarini aniq takrorlayotgan sirli videolarga duch keladi.\n\nModerator videolarni oʻrganar ekan, ularning qayeri sahnalashtirilgan tomosha va qayeri haqiqiy qotillik ekanligini ajratolmay qoladi va dahshatli oʻyin ichiga tushib qoladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Qo'rqinchli, Saspens\n📆 Premyera: 2026-yil"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KsuzS18eq2R1?s=e4daVxR3KHQRwFYMXOWGlLLC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/e4daVxR3KHQRwFYMXOWGlLLC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 97,
    "size": 691931502,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3104,
    "slug": "to-liq-talqinda",
    "type": "film",
    "title": {
      "uz": "Toʼliq talqinda",
      "ru": "Toʼliq talqinda"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Toʼliq talqinda ☝️✅",
      "ru": "Toʼliq talqinda ☝️✅"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CqtSuh8Hyh7h?s=mXKw7HN-K5yFS32GR5R7VP7Q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mXKw7HN-K5yFS32GR5R7VP7Q",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 1,
    "size": 2826996,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3105,
    "slug": "aqn9tqmnvfmkr-kbhauuxttwrha3m6xykqn1lna-xkk8ovvpbpq44vefehwd",
    "type": "film",
    "title": {
      "uz": "AQN9tQmnvfMcR cbhAUUxTtWrha3M6xYcqN1LNA XCK8oVvpbPq44vEFeHwDI7X",
      "ru": "AQN9tQmnvfMcR cbhAUUxTtWrha3M6xYcqN1LNA XCK8oVvpbPq44vEFeHwDI7X"
    },
    "genres": [
      "drama"
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
    "poster": "https://dezocloud.uz/t/qFQSr68xZwqZ?s=mp9pSHuVa7HNk36_ev7fVOc_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mp9pSHuVa7HNk36_ev7fVOc_",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 1,
    "size": 4950259,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3106,
    "slug": "ouk-strit-kochasining-oxiri-premyera",
    "type": "film",
    "title": {
      "uz": "OUK STRIT KO'CHASINING OXIRI (Premyera)",
      "ru": "OUK STRIT KO'CHASINING OXIRI (Premyera)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📺 OUK STRIT KO'CHASINING OXIRI (Premyera)\n\n1982-yilda tinchgina Oak Street mahallasi sirli kosmik anomaliya sababli boshqa vaqt va noma'lum makonga ko'chib qoladi. \n\nTashqi dunyodan uzilib qolgan Plattlar oilasi o'z uylari atrofida yura davri dinozavrlari yurganini ko'rib, vahshiy yirtqichlar orasida omon qolish va uyga qaytish yo'lini izlashga majbur bo'ladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Ilmiy Fantastika, Sarguzasht\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.3/10",
      "ru": "📺 OUK STRIT KO'CHASINING OXIRI (Premyera)\n\n1982-yilda tinchgina Oak Street mahallasi sirli kosmik anomaliya sababli boshqa vaqt va noma'lum makonga ko'chib qoladi. \n\nTashqi dunyodan uzilib qolgan Plattlar oilasi o'z uylari atrofida yura davri dinozavrlari yurganini ko'rib, vahshiy yirtqichlar orasida omon qolish va uyga qaytish yo'lini izlashga majbur bo'ladi.\n\n🇺🇸 Davlati: AQSH\n🎥 Janr: Ilmiy Fantastika, Sarguzasht\n📆 Premyera: 2026-yil\n⭐️ Reyting IMDB: 6.3/10"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gfFgqU0fCUiu?s=gRakM5Zayq83OG5XmhWGGjxE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gRakM5Zayq83OG5XmhWGGjxE",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 94,
    "size": 970124989,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3107,
    "slug": "nomi-jonli-gazab",
    "type": "film",
    "title": {
      "uz": "Nomi: Jonli g’azab",
      "ru": "Nomi: Jonli g’azab"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 Nomi: Jonli g’azab\n\n🗓️ Yili: 2026\n📹 Sifati: 1080p | Full HD\n⭐️ IMDb: 7.5/10\n🌍 Davlati: GonKong, Xitoy\n🇺🇿 Tili: O’zbek tilida\n🎭 Janri: , , \n----------------------",
      "ru": "🎬 Nomi: Jonli g’azab\n\n🗓️ Yili: 2026\n📹 Sifati: 1080p | Full HD\n⭐️ IMDb: 7.5/10\n🌍 Davlati: GonKong, Xitoy\n🇺🇿 Tili: O’zbek tilida\n🎭 Janri: , , \n----------------------"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/a80S7spwAWIs?s=QIVJXvlTr0ndAgdQK-GDTFXk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QIVJXvlTr0ndAgdQK-GDTFXk",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 107,
    "size": 2262826445,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3108,
    "slug": "ruxshunos-139-songi-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 139 SO'NGI QSIM",
      "ru": "RUXSHUNOS 139 SO'NGI QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 139 SO'NGI QSIM",
      "ru": "RUXSHUNOS 139 SO'NGI QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yQZv1fmhOsVe?s=JNDuedQjJ_WL2TuNIKcS7sVG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JNDuedQjJ_WL2TuNIKcS7sVG",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 182604768,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3109,
    "slug": "ruxshunos-138-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 138 QSIM",
      "ru": "RUXSHUNOS 138 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 138 QSIM",
      "ru": "RUXSHUNOS 138 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8gt3frd3cQKm?s=AsUNKCdEGSteHHRM24bJsRcT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AsUNKCdEGSteHHRM24bJsRcT",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 144678809,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3110,
    "slug": "ruxshunos-137-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 137 QSIM",
      "ru": "RUXSHUNOS 137 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 137 QSIM",
      "ru": "RUXSHUNOS 137 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lIPHyNDvWX3X?s=OMrwjo-vZXVmSfmsFKrv_7Tq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OMrwjo-vZXVmSfmsFKrv_7Tq",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 169607782,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3111,
    "slug": "ruxshunos-136-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 136 QSIM",
      "ru": "RUXSHUNOS 136 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 136 QSIM",
      "ru": "RUXSHUNOS 136 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ei2tmemOJNdQ?s=drX-fxFhhLZZ5rKspwYgsKB4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/drX-fxFhhLZZ5rKspwYgsKB4",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 166751640,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3112,
    "slug": "ruxshunos-135-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 135 QSIM",
      "ru": "RUXSHUNOS 135 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 135 QSIM",
      "ru": "RUXSHUNOS 135 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/erU35tF89q3Y?s=LJxvKjr8mRMn4b97xSgY4hcL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LJxvKjr8mRMn4b97xSgY4hcL",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 178505836,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3113,
    "slug": "ruxshunos-134-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 134 QSIM",
      "ru": "RUXSHUNOS 134 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 134 QSIM",
      "ru": "RUXSHUNOS 134 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/oa5IbxnH-61v?s=151wve0aDMzfnQf8iWeDS_dC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/151wve0aDMzfnQf8iWeDS_dC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 178814910,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3114,
    "slug": "ruxshunos-133-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 133 QSIM",
      "ru": "RUXSHUNOS 133 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 133 QSIM",
      "ru": "RUXSHUNOS 133 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/h-b0dY1pQdqd?s=ac8RsJ8U4NvQomNT4fv_CZZ9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ac8RsJ8U4NvQomNT4fv_CZZ9",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 155502594,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3115,
    "slug": "ruxshunos-132-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 132 QSIM",
      "ru": "RUXSHUNOS 132 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 132 QSIM",
      "ru": "RUXSHUNOS 132 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8UBOfoOzwfkF?s=b6-2DDU20K_ix2dN12pFCDvS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/b6-2DDU20K_ix2dN12pFCDvS",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 181106582,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3116,
    "slug": "ruxshunos-131-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 131 QSIM",
      "ru": "RUXSHUNOS 131 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 131 QSIM",
      "ru": "RUXSHUNOS 131 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3-vcJYqdwGli?s=ExpFpzAw6Q1VfiKIKFuLjfQs",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ExpFpzAw6Q1VfiKIKFuLjfQs",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 167716445,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3117,
    "slug": "ruxshunos-130-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 130 QSIM",
      "ru": "RUXSHUNOS 130 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 130 QSIM",
      "ru": "RUXSHUNOS 130 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/j_hm8PbhuAcb?s=ulZVUx8yQG4KkAkIdd55a2Ii",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ulZVUx8yQG4KkAkIdd55a2Ii",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 203567974,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3118,
    "slug": "ruxshunos-129-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 129 QSIM",
      "ru": "RUXSHUNOS 129 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 129 QSIM",
      "ru": "RUXSHUNOS 129 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1NheY3keJMBM?s=_IsvGAmNNUFtXbAD_KRRAwH4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_IsvGAmNNUFtXbAD_KRRAwH4",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 197943876,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3119,
    "slug": "ruxshunos-128-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 128 QSIM",
      "ru": "RUXSHUNOS 128 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 128 QSIM",
      "ru": "RUXSHUNOS 128 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ecNW0tt99Osw?s=VUUlnlmAMcfLb7IUji2HpKFC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VUUlnlmAMcfLb7IUji2HpKFC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 195603181,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3120,
    "slug": "ruxshunos-127-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 127 QSIM",
      "ru": "RUXSHUNOS 127 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 127 QSIM",
      "ru": "RUXSHUNOS 127 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OQSs50Vykbbb?s=YBHc3TrjbUf_Ma8wcUqcxogM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YBHc3TrjbUf_Ma8wcUqcxogM",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 213329299,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3121,
    "slug": "ruxshunos-126-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 126 QSIM",
      "ru": "RUXSHUNOS 126 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 126 QSIM",
      "ru": "RUXSHUNOS 126 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Ya91dF22MW-C?s=mUz2I6C2zO_PdB5VUtmYiSDA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mUz2I6C2zO_PdB5VUtmYiSDA",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 171738443,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3122,
    "slug": "ruxshunos-125-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 125 QSIM",
      "ru": "RUXSHUNOS 125 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 125 QSIM",
      "ru": "RUXSHUNOS 125 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bn5Te6A90HV2?s=xsOM_GaiNW0WL3FmBhVRSR-s",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xsOM_GaiNW0WL3FmBhVRSR-s",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 208580079,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3123,
    "slug": "ruxshunos-124-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 124 QSIM",
      "ru": "RUXSHUNOS 124 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 124 QSIM",
      "ru": "RUXSHUNOS 124 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Tl5WJpzsvxk8?s=jJHmIWNU2jhAIV7Cd-UqUSP-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jJHmIWNU2jhAIV7Cd-UqUSP-",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 174621888,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3124,
    "slug": "ruxshunos-123-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 123 QSIM",
      "ru": "RUXSHUNOS 123 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 123 QSIM",
      "ru": "RUXSHUNOS 123 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nBy6MY7psWqL?s=A3x1WiwAguX6OjOr0Dq1X4aV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/A3x1WiwAguX6OjOr0Dq1X4aV",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 194269438,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3125,
    "slug": "ruxshunos-122-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 122 QSIM",
      "ru": "RUXSHUNOS 122 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 122 QSIM",
      "ru": "RUXSHUNOS 122 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DXbjcLoXlwbc?s=JObDoglcm2__JuQmb-n8W2J1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JObDoglcm2__JuQmb-n8W2J1",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 200368745,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3126,
    "slug": "ruxshunos-121-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 121 QSIM",
      "ru": "RUXSHUNOS 121 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 121 QSIM",
      "ru": "RUXSHUNOS 121 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GMRoOnV0QWzt?s=njMvxBh0eUNvlNS70i4ZRiZS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/njMvxBh0eUNvlNS70i4ZRiZS",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 230328324,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3127,
    "slug": "ruxshunos-120-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 120 QSIM",
      "ru": "RUXSHUNOS 120 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 120 QSIM",
      "ru": "RUXSHUNOS 120 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Efx1CgoDvlbw?s=Qjf3LOBT-OV6C4fvCpG3vEcd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Qjf3LOBT-OV6C4fvCpG3vEcd",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 317520318,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3128,
    "slug": "ruxshunos-119-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 119 QSIM",
      "ru": "RUXSHUNOS 119 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 119 QSIM",
      "ru": "RUXSHUNOS 119 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mRrJzSI7zAYs?s=uMPGPu6EMv2Cgn87dE6aDOGv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uMPGPu6EMv2Cgn87dE6aDOGv",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 215255978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3129,
    "slug": "ruxshunos-118-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 118 QSIM",
      "ru": "RUXSHUNOS 118 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 118 QSIM",
      "ru": "RUXSHUNOS 118 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bpqb0587xqyP?s=Sr9Zzpt_BTxz-XBlwxvZ3OTX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Sr9Zzpt_BTxz-XBlwxvZ3OTX",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 191590670,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3130,
    "slug": "ruxshunos-117-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 117 QSIM",
      "ru": "RUXSHUNOS 117 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 117 QSIM",
      "ru": "RUXSHUNOS 117 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GwuFPRY8Nyez?s=XCCXbMTFo2OSynMQIwz8W3CT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XCCXbMTFo2OSynMQIwz8W3CT",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 213567439,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3131,
    "slug": "ruxshunos-116-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 116 QSIM",
      "ru": "RUXSHUNOS 116 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 116 QSIM",
      "ru": "RUXSHUNOS 116 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PU1wzed9D46P?s=SwvFITt_WVRhGS2JKOqf4Ln8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/SwvFITt_WVRhGS2JKOqf4Ln8",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 202269511,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3132,
    "slug": "ruxshunos-115-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 115 QSIM",
      "ru": "RUXSHUNOS 115 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 115 QSIM",
      "ru": "RUXSHUNOS 115 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xf7kS1xa2i40?s=n-wUjuj8zESNFT-qDb_ObgTh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/n-wUjuj8zESNFT-qDb_ObgTh",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 205059524,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3133,
    "slug": "ruxshunos-114-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 114 QSIM",
      "ru": "RUXSHUNOS 114 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 114 QSIM",
      "ru": "RUXSHUNOS 114 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YTgnquLc3z9r?s=lwuC0PxCHgJdW5DH2FlvIjNo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lwuC0PxCHgJdW5DH2FlvIjNo",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 200549764,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3134,
    "slug": "ruxshunos-113-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 113 QSIM",
      "ru": "RUXSHUNOS 113 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 113 QSIM",
      "ru": "RUXSHUNOS 113 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lDx1knDs_e_u?s=D5KKsRX_qLrQLi61iXswZbyC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/D5KKsRX_qLrQLi61iXswZbyC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 189025919,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3135,
    "slug": "ruxshunos-112-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 112 QSIM",
      "ru": "RUXSHUNOS 112 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 112 QSIM",
      "ru": "RUXSHUNOS 112 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6ovFu5udn5Uh?s=vt8R2SFmQsH8HUDTUWdLD_jS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vt8R2SFmQsH8HUDTUWdLD_jS",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 157352758,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3136,
    "slug": "ruxshunos-111-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 111 QSIM",
      "ru": "RUXSHUNOS 111 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 111 QSIM",
      "ru": "RUXSHUNOS 111 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ld_Z7u88ay8F?s=EmbgJrKvORIzHkg4Z8g6qxlQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EmbgJrKvORIzHkg4Z8g6qxlQ",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 202255806,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3137,
    "slug": "ruxshunos-110-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 110 QSIM",
      "ru": "RUXSHUNOS 110 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 110 QSIM",
      "ru": "RUXSHUNOS 110 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/hVVmfBzG2KXW?s=qTGCzb68I5pKNR-TX4gYNN2s",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qTGCzb68I5pKNR-TX4gYNN2s",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 194860168,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3138,
    "slug": "ruxshunos-109-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 109 QSIM",
      "ru": "RUXSHUNOS 109 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 109 QSIM",
      "ru": "RUXSHUNOS 109 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_hirQIwO0ee-?s=AUocpijJBg2cQZu0uLvBpan2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AUocpijJBg2cQZu0uLvBpan2",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 212955848,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3139,
    "slug": "ruxshunos-108-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 108 QSIM",
      "ru": "RUXSHUNOS 108 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 108 QSIM",
      "ru": "RUXSHUNOS 108 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WV5Pf95TcpQG?s=3EAy43XFV1M2-vCNM1OsEAhb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3EAy43XFV1M2-vCNM1OsEAhb",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 195732615,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3140,
    "slug": "ruxshunos-107-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 107 QSIM",
      "ru": "RUXSHUNOS 107 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 107 QSIM",
      "ru": "RUXSHUNOS 107 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DEHSHZm7PgGD?s=pmUJEvN3wjX68dMk2WZ5WZVO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pmUJEvN3wjX68dMk2WZ5WZVO",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 204963622,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3141,
    "slug": "ruxshunos-106-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 106 QSIM",
      "ru": "RUXSHUNOS 106 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 106 QSIM",
      "ru": "RUXSHUNOS 106 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZBHEMvH2El9M?s=CXOr-TsWvjpZ_cUggx1W9rcX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CXOr-TsWvjpZ_cUggx1W9rcX",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 183531467,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3142,
    "slug": "ruxshunos-105-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 105 QSIM",
      "ru": "RUXSHUNOS 105 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 105 QSIM",
      "ru": "RUXSHUNOS 105 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9ynTdEx6Y4Xp?s=YiZSGtrRVs7_jEdk7Q_2bXHW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YiZSGtrRVs7_jEdk7Q_2bXHW",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 198378636,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3143,
    "slug": "ruxshunos-104-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 104 QSIM",
      "ru": "RUXSHUNOS 104 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 104 QSIM",
      "ru": "RUXSHUNOS 104 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UsHduE47ONzr?s=6lPPTRYyFp_OVWTymVIapqJV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6lPPTRYyFp_OVWTymVIapqJV",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 184732935,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3144,
    "slug": "ruxshunos-103-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 103 QSIM",
      "ru": "RUXSHUNOS 103 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 103 QSIM",
      "ru": "RUXSHUNOS 103 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RW77CliEjkHe?s=xWrnldfhHrFH_nehpgjCDMJT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xWrnldfhHrFH_nehpgjCDMJT",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 190402311,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3145,
    "slug": "ruxshunos-102-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 102 QSIM",
      "ru": "RUXSHUNOS 102 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 102 QSIM",
      "ru": "RUXSHUNOS 102 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OOgN5RXdRCgX?s=OGHYlio2uBYCCnOhuaSrbnn5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OGHYlio2uBYCCnOhuaSrbnn5",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 204273304,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3146,
    "slug": "ruxshunos-101-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 101 QSIM",
      "ru": "RUXSHUNOS 101 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 101 QSIM",
      "ru": "RUXSHUNOS 101 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lbm16kMZcwp8?s=8tu8kiHZAFr9qAkzXaCWwmnr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8tu8kiHZAFr9qAkzXaCWwmnr",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 193692427,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3147,
    "slug": "ruxshunos-100-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 100 QSIM",
      "ru": "RUXSHUNOS 100 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 100 QSIM",
      "ru": "RUXSHUNOS 100 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6jdi3X-vO9x9?s=MEbjBW-usJ_PJRavGecveHsz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MEbjBW-usJ_PJRavGecveHsz",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 206452457,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3148,
    "slug": "ruxshunos-99-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 99 QSIM",
      "ru": "RUXSHUNOS 99 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 99 QSIM",
      "ru": "RUXSHUNOS 99 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Xfykspjzhd8m?s=G9wObqDk7XsHaWjkjHHOt8Dy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/G9wObqDk7XsHaWjkjHHOt8Dy",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 215890271,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3149,
    "slug": "ruxshunos-98-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 98 QSIM",
      "ru": "RUXSHUNOS 98 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 98 QSIM",
      "ru": "RUXSHUNOS 98 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3o8Vyn5XP685?s=9aP85QyU6aMGLL1PWFz_Onex",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9aP85QyU6aMGLL1PWFz_Onex",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 220900303,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3150,
    "slug": "ruxshunos-97-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 97 QSIM",
      "ru": "RUXSHUNOS 97 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 97 QSIM",
      "ru": "RUXSHUNOS 97 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FAQdskk-Mh8w?s=rS1nJa7LGyFnCtJ15BEoleL0",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rS1nJa7LGyFnCtJ15BEoleL0",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 213550128,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3151,
    "slug": "ruxshunos-96-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 96 QSIM",
      "ru": "RUXSHUNOS 96 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 96 QSIM",
      "ru": "RUXSHUNOS 96 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Eaa4JCy3EBsu?s=PFb6r56hHX1490a4EokMXhXc",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PFb6r56hHX1490a4EokMXhXc",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 201810428,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3152,
    "slug": "ruxshunos-95-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 95 QSIM",
      "ru": "RUXSHUNOS 95 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 95 QSIM",
      "ru": "RUXSHUNOS 95 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0smZLWTaLVIo?s=VLOJcmUdRCn8G6bgQUPrF4N4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/VLOJcmUdRCn8G6bgQUPrF4N4",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 221422546,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3153,
    "slug": "ruxshunos-94-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 94 QSIM",
      "ru": "RUXSHUNOS 94 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 94 QSIM",
      "ru": "RUXSHUNOS 94 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/drQH-7lBXA-d?s=ToHQtwyrBBy2htUnxAUVX_Ji",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ToHQtwyrBBy2htUnxAUVX_Ji",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 201674431,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3154,
    "slug": "ruxshunos-93-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 93 QSIM",
      "ru": "RUXSHUNOS 93 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 93 QSIM",
      "ru": "RUXSHUNOS 93 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_Lu_APSUR-Z6?s=F9fhB9i07Z5DpNb3ORjqBaFF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/F9fhB9i07Z5DpNb3ORjqBaFF",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 208384114,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3155,
    "slug": "ruxshunos-92-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 92 QSIM",
      "ru": "RUXSHUNOS 92 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 92 QSIM",
      "ru": "RUXSHUNOS 92 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/5S59f6dOsmCt?s=IOL5oXTSKrvf5x6OO0oK5rN2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IOL5oXTSKrvf5x6OO0oK5rN2",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 212345348,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3156,
    "slug": "ruxshunos-91-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 91 QSIM",
      "ru": "RUXSHUNOS 91 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 91 QSIM",
      "ru": "RUXSHUNOS 91 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_4sAbZtbrc2L?s=Zwe0p7HmKX6LVj-22ByfKQYq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Zwe0p7HmKX6LVj-22ByfKQYq",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 206539793,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3157,
    "slug": "ruxshunos-90-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 90 QSIM",
      "ru": "RUXSHUNOS 90 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 90 QSIM",
      "ru": "RUXSHUNOS 90 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/SrPaV-DLfNNI?s=h07Ojm69VVPuBj2kle1gFpox",
    "trailer": "",
    "video": "https://dezocloud.uz/s/h07Ojm69VVPuBj2kle1gFpox",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 218976384,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3158,
    "slug": "ruxshunos-89-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 89 QSIM",
      "ru": "RUXSHUNOS 89 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 89 QSIM",
      "ru": "RUXSHUNOS 89 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DAmGKz9vo4Sn?s=BtlZjXLfUSm3bXE8oPEH5OD_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/BtlZjXLfUSm3bXE8oPEH5OD_",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 214300648,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3159,
    "slug": "ruxshunos-88-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 88 QSIM",
      "ru": "RUXSHUNOS 88 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 88 QSIM",
      "ru": "RUXSHUNOS 88 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/p5p-EgYvDIkc?s=2m3Jd0lXlTumSqS3x54D4gBh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2m3Jd0lXlTumSqS3x54D4gBh",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 198094798,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3160,
    "slug": "ruxshunos-87-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 87 QSIM",
      "ru": "RUXSHUNOS 87 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 87 QSIM",
      "ru": "RUXSHUNOS 87 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NtqWLSL2tiL9?s=ahraK8KtOrHK9qVIw5J6oTMR",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ahraK8KtOrHK9qVIw5J6oTMR",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 180494988,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3161,
    "slug": "ruxshunos-86-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 86 QSIM",
      "ru": "RUXSHUNOS 86 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 86 QSIM",
      "ru": "RUXSHUNOS 86 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WlyRFk2YLKHp?s=Jk7YT9Jygs5nNPkLm2xEGrZ6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Jk7YT9Jygs5nNPkLm2xEGrZ6",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 179381982,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3162,
    "slug": "ruxshunos-85-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 85 QSIM",
      "ru": "RUXSHUNOS 85 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 85 QSIM",
      "ru": "RUXSHUNOS 85 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GRFR4rUxpMz4?s=Oft7R6GhpaLUJaYN50G1VPKB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Oft7R6GhpaLUJaYN50G1VPKB",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 37,
    "size": 144728104,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3163,
    "slug": "ruxshunos-84-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 84 QSIM",
      "ru": "RUXSHUNOS 84 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 84 QSIM",
      "ru": "RUXSHUNOS 84 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/I2BbG9k8MPh_?s=msIUeIg8oITMAovIDcVJC6kh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/msIUeIg8oITMAovIDcVJC6kh",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 165560536,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3164,
    "slug": "ruxshunos-83-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 83 QSIM",
      "ru": "RUXSHUNOS 83 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 83 QSIM",
      "ru": "RUXSHUNOS 83 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PTV7zarwZaon?s=Y1ndEjBIxka2xJJ5Bh3pMxFf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Y1ndEjBIxka2xJJ5Bh3pMxFf",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 177293784,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3165,
    "slug": "ruxshunos-82-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 82 QSIM",
      "ru": "RUXSHUNOS 82 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 82 QSIM",
      "ru": "RUXSHUNOS 82 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/i7ei4c9VPShD?s=LPScALxW8vASsWB23zTtqXQS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LPScALxW8vASsWB23zTtqXQS",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 192906785,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3166,
    "slug": "ruxshunos-81-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 81 QSIM",
      "ru": "RUXSHUNOS 81 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 81 QSIM",
      "ru": "RUXSHUNOS 81 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tOI6k_7QmB4R?s=xZOenM9CS46Z0jE9v8qZj48X",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xZOenM9CS46Z0jE9v8qZj48X",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 171857123,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3167,
    "slug": "ruxshunos-80-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 80 QSIM",
      "ru": "RUXSHUNOS 80 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 80 QSIM",
      "ru": "RUXSHUNOS 80 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ruXE5ouZ2vcW?s=3zkgL2_-ZOJTR_H1p3c4gt7l",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3zkgL2_-ZOJTR_H1p3c4gt7l",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 201380600,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3168,
    "slug": "ruxshunos-79-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 79 QSIM",
      "ru": "RUXSHUNOS 79 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 79 QSIM",
      "ru": "RUXSHUNOS 79 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7ag-890fQ44u?s=AqlXzW4Nxk6EjJhhH9EBLT2L",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AqlXzW4Nxk6EjJhhH9EBLT2L",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 183535717,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3169,
    "slug": "ruxshunos-78-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 78 QSIM",
      "ru": "RUXSHUNOS 78 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 78 QSIM",
      "ru": "RUXSHUNOS 78 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6lanoX3304wE?s=FCHlAjtJmSHghz3Agi82qleQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/FCHlAjtJmSHghz3Agi82qleQ",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 176473922,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3170,
    "slug": "ruxshunos-77-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 77 QSIM",
      "ru": "RUXSHUNOS 77 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 77 QSIM",
      "ru": "RUXSHUNOS 77 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/m9K4iNrBKIkN?s=XdSGduBMJ-0xqF7x4hI4zsK_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XdSGduBMJ-0xqF7x4hI4zsK_",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 172493241,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3171,
    "slug": "ruxshunos-76-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 76 QSIM",
      "ru": "RUXSHUNOS 76 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 76 QSIM",
      "ru": "RUXSHUNOS 76 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/e6K9Y5LP-8po?s=4Yh30VJAItzhl7B76Fk2Jpet",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4Yh30VJAItzhl7B76Fk2Jpet",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 191193275,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3172,
    "slug": "ruxshunos-75-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 75 QSIM",
      "ru": "RUXSHUNOS 75 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 75 QSIM",
      "ru": "RUXSHUNOS 75 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Bmgf7gaSDsRW?s=51CVMDWSTxZLkwfqlFmaCHvl",
    "trailer": "",
    "video": "https://dezocloud.uz/s/51CVMDWSTxZLkwfqlFmaCHvl",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 162334674,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3173,
    "slug": "ruxshunos-74-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 74 QSIM",
      "ru": "RUXSHUNOS 74 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 74 QSIM",
      "ru": "RUXSHUNOS 74 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_4vwfnPSwgOA?s=EjP32BZrp5Pyq2YEPN2XHTvP",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EjP32BZrp5Pyq2YEPN2XHTvP",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 198692130,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3174,
    "slug": "ruxshunos-73-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 73 QSIM",
      "ru": "RUXSHUNOS 73 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 73 QSIM",
      "ru": "RUXSHUNOS 73 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tAaIM6bz-hta?s=Qlfylep7RyIcbB6fQRj4NAex",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Qlfylep7RyIcbB6fQRj4NAex",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 41,
    "size": 229873719,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3175,
    "slug": "ruxshunos-72-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 72 QSIM",
      "ru": "RUXSHUNOS 72 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 72 QSIM",
      "ru": "RUXSHUNOS 72 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/G2Vo_2CqD_jV?s=L3GLoiuj-6WolNW_aFsLz83b",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L3GLoiuj-6WolNW_aFsLz83b",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 31,
    "size": 158913960,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3176,
    "slug": "ruxshunos-71-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 71 QSIM",
      "ru": "RUXSHUNOS 71 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 71 QSIM",
      "ru": "RUXSHUNOS 71 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sCzrEY0w7vyE?s=8Z5Yuce-ajenV5ZNy-DFt_ye",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8Z5Yuce-ajenV5ZNy-DFt_ye",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 197901156,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3177,
    "slug": "ruxshunos-70-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 70 QSIM",
      "ru": "RUXSHUNOS 70 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 70 QSIM",
      "ru": "RUXSHUNOS 70 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MuDcsl8IE5SR?s=DNXz-vBMqH_XqkjcFBrUiaty",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DNXz-vBMqH_XqkjcFBrUiaty",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 43,
    "size": 196421972,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3178,
    "slug": "ruxshunos-69-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 69 QSIM",
      "ru": "RUXSHUNOS 69 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 69 QSIM",
      "ru": "RUXSHUNOS 69 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Npuf6PYykWVI?s=MGkSy2LAp6_YJhdOPamrVo01",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MGkSy2LAp6_YJhdOPamrVo01",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 185436770,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3179,
    "slug": "ruxshunos-68-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 68 QSIM",
      "ru": "RUXSHUNOS 68 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 68 QSIM",
      "ru": "RUXSHUNOS 68 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JnWfIw3UnQCW?s=ZtA0yfu_F0dJr5b99H6xeM57",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZtA0yfu_F0dJr5b99H6xeM57",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 42,
    "size": 195300234,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3180,
    "slug": "ruxshunos-67-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 67 QSIM",
      "ru": "RUXSHUNOS 67 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 67 QSIM",
      "ru": "RUXSHUNOS 67 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/W6udE8gN2LO6?s=aPLCi8ZyaF-GnpQWJF25HYgC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aPLCi8ZyaF-GnpQWJF25HYgC",
    "featured": false,
    "addedAt": 1791033886592,
    "updatedAt": 1791033886592,
    "duration": 40,
    "size": 149815408,
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
