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
