/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 3381,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 105,
    "size": 1846204415,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3382,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 138,
    "size": 1451538805,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3383,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 23692655,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3384,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 19802486,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3385,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 84,
    "size": 228678773,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3386,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 5148048,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3387,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 100,
    "size": 506576571,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3388,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 103,
    "size": 1266895083,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3389,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 11358475,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3390,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 130,
    "size": 892115121,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3391,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 21019510,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3392,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 619888990,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3393,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 6899082,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3394,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 9139941,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3395,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 127,
    "size": 708075559,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3396,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 182849850,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3397,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 233755737,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3398,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 34,
    "size": 164771629,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3399,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 205009978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3400,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 39,
    "size": 182748498,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3401,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 198196264,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3402,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 38,
    "size": 171380944,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3403,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 202749614,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3404,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 182073099,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3405,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 176497271,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3406,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 211776404,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3407,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 204945600,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3408,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 181718967,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3409,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 200191796,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3410,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 169986912,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3411,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 217027689,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3412,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 184714124,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3413,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 173966075,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3414,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 258644124,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3415,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 37,
    "size": 175293602,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3416,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 191938667,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3417,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 206437136,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3418,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 228183285,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3419,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 151731686,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3420,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 35,
    "size": 193324696,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3421,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 170421209,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3422,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 187630293,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3423,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 194342809,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3424,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 458382349,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3425,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 654543907,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3426,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 422664716,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3427,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 482157224,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3428,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 461855150,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3429,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 388374083,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3430,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 403271393,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3431,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 415841748,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3432,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 493163610,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3433,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 515518413,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3434,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 264266168,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3435,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 418449927,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3436,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 472485665,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3437,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 470611696,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3438,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 421034628,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3439,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 451838951,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3440,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 475811347,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3441,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 398646194,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3442,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 487242266,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3443,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 492816827,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3444,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 560469660,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3445,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 285785208,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3446,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 44,
    "size": 176592847,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3447,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 6357897,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3448,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 97,
    "size": 1132427408,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3449,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 136,
    "size": 1569189139,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3450,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 107,
    "size": 1136841709,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3451,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 92,
    "size": 1140702508,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3452,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 95,
    "size": 705036998,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3453,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 961184383,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3454,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 5450591,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3455,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 4310759,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3456,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 11405203,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3457,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 79,
    "size": 761437765,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3458,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 78,
    "size": 1187264716,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3459,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 77,
    "size": 775846865,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3460,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 82,
    "size": 825918668,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3461,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 425641825,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3462,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 53,
    "size": 492925608,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3463,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 80,
    "size": 747216200,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3464,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 70,
    "size": 806143006,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3465,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 518019927,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3466,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 49,
    "size": 578848839,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3467,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 62,
    "size": 566024403,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3468,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 476645050,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3469,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 59,
    "size": 528663870,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3470,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 68,
    "size": 1063631603,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3471,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 59,
    "size": 1144534488,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3472,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 1065155805,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3473,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 50,
    "size": 950342678,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3474,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 51,
    "size": 967770742,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3475,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 57,
    "size": 993285462,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3476,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 59,
    "size": 1025478599,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3477,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 52,
    "size": 845462431,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3478,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 54,
    "size": 859750664,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3479,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 50,
    "size": 995169811,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3480,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 60,
    "size": 1117546610,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3481,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 52,
    "size": 1278040614,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3482,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 60,
    "size": 1230822692,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3483,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 59,
    "size": 1060810065,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3484,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 54,
    "size": 1007712959,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3485,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 57,
    "size": 850346711,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3486,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 50,
    "size": 1057843626,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3487,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 60,
    "size": 998688098,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3488,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 56,
    "size": 1151906650,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3489,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 52,
    "size": 855500617,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3490,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 65,
    "size": 1146776732,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3491,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 51,
    "size": 979207206,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3492,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 52,
    "size": 885156388,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3493,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 51,
    "size": 865873788,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3494,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 51,
    "size": 892306358,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3495,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 53,
    "size": 898383566,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3496,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 93,
    "size": 1962618381,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3497,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 126,
    "size": 1558469415,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3498,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 210,
    "size": 1688851564,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3499,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 91,
    "size": 737646902,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3500,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 90,
    "size": 643812128,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3501,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 95,
    "size": 666615678,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3502,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 110,
    "size": 1097128601,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3503,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 97,
    "size": 691931502,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3504,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 2826996,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3505,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 4950259,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3506,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 94,
    "size": 970124989,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3507,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 107,
    "size": 2262826445,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3508,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 182604768,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3509,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 144678809,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3510,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 169607782,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3511,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 166751640,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3512,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 178505836,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3513,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 178814910,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3514,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 155502594,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3515,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 181106582,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3516,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 167716445,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3517,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 203567974,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3518,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 197943876,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3519,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 195603181,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3520,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 213329299,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3521,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 171738443,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3522,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 208580079,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3523,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 174621888,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3524,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 194269438,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3525,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 200368745,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3526,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 230328324,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3527,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 317520318,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3528,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 215255978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3529,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 191590670,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3530,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 213567439,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3531,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 202269511,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3532,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 205059524,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3533,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 200549764,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3534,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 189025919,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3535,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 157352758,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3536,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 202255806,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3537,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 194860168,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3538,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 212955848,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3539,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 195732615,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3540,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 204963622,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3541,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 183531467,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3542,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 198378636,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3543,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 184732935,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3544,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 190402311,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3545,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 204273304,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3546,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 193692427,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3547,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 206452457,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3548,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 215890271,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3549,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 220900303,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3550,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 213550128,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3551,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 201810428,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3552,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 221422546,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3553,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 201674431,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3554,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 208384114,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3555,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 212345348,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3556,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 206539793,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3557,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 218976384,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3558,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 214300648,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3559,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 198094798,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3560,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 180494988,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3561,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 179381982,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3562,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 37,
    "size": 144728104,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3563,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 165560536,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3564,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 177293784,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3565,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 192906785,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3566,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 171857123,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3567,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 201380600,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3568,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 183535717,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3569,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 176473922,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3570,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 172493241,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3571,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 191193275,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3572,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 162334674,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3573,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 198692130,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3574,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 229873719,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3575,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 31,
    "size": 158913960,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3576,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 197901156,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3577,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 196421972,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3578,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 185436770,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3579,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 195300234,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3580,
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
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 149815408,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3581,
    "slug": "ruxshunos-66-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 66 QSIM",
      "ru": "RUXSHUNOS 66 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 66 QSIM",
      "ru": "RUXSHUNOS 66 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/obJP-P_vi5W0?s=L6XPRhA5znNf_7uQ6zI53X-Q",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L6XPRhA5znNf_7uQ6zI53X-Q",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 208298530,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3582,
    "slug": "ruxshunos-65-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 65 QSIM",
      "ru": "RUXSHUNOS 65 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 65 QSIM",
      "ru": "RUXSHUNOS 65 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/P9abZiruwa24?s=iQWi71KyshYjdBztIH7HNKCA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iQWi71KyshYjdBztIH7HNKCA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 187931925,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3583,
    "slug": "ruxshunos-64-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 64 QSIM",
      "ru": "RUXSHUNOS 64 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 64 QSIM",
      "ru": "RUXSHUNOS 64 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iXZQHa_LYuvx?s=eF9xrR92l28ZqdVU7wB8u8xk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eF9xrR92l28ZqdVU7wB8u8xk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 172260320,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3584,
    "slug": "ruxshunos-63-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 63 QSIM",
      "ru": "RUXSHUNOS 63 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 63 QSIM",
      "ru": "RUXSHUNOS 63 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g_L4KxGlgIMP?s=LtEVCcq1xRzwa3Kt-wrppZ8_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/LtEVCcq1xRzwa3Kt-wrppZ8_",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 39,
    "size": 146674756,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3585,
    "slug": "ruxshunos-62-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 62 QSIM",
      "ru": "RUXSHUNOS 62 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 62 QSIM",
      "ru": "RUXSHUNOS 62 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/fkeqV7WhPBns?s=jgj2ecOOkLshNHM22Te_P9Ln",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jgj2ecOOkLshNHM22Te_P9Ln",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 183151808,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3586,
    "slug": "ruxshunos-61-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 61 QSIM",
      "ru": "RUXSHUNOS 61 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 61 QSIM",
      "ru": "RUXSHUNOS 61 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GPcTZgPL0jEi?s=DVjRNO81XeRVjWJVm9xjBGEk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DVjRNO81XeRVjWJVm9xjBGEk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 180069725,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3587,
    "slug": "ruxshunos-60-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 60 QSIM",
      "ru": "RUXSHUNOS 60 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 60 QSIM",
      "ru": "RUXSHUNOS 60 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2bwOwwjaERJ3?s=qlQR18p4WT5BEZHw0FY3FN8n",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qlQR18p4WT5BEZHw0FY3FN8n",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 183112801,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3588,
    "slug": "ruxshunos-59-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 59 QSIM",
      "ru": "RUXSHUNOS 59 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 59 QSIM",
      "ru": "RUXSHUNOS 59 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NDLMrgthZ7eY?s=0vtSpT8iN80LN3wtduFmKxkQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0vtSpT8iN80LN3wtduFmKxkQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 41,
    "size": 233544007,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3589,
    "slug": "ruxshunos-58-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 58 QSIM",
      "ru": "RUXSHUNOS 58 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 58 QSIM",
      "ru": "RUXSHUNOS 58 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/u8mSO2ESeubq?s=XUxh53609Nx_4Sd8yiePt-Z7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XUxh53609Nx_4Sd8yiePt-Z7",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 39,
    "size": 168491291,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3590,
    "slug": "ruxshunos-57-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 57 QSIM",
      "ru": "RUXSHUNOS 57 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 57 QSIM",
      "ru": "RUXSHUNOS 57 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/DzwLP2fxUHqD?s=73NmSY8JE0Z93wn1G9Gniw3M",
    "trailer": "",
    "video": "https://dezocloud.uz/s/73NmSY8JE0Z93wn1G9Gniw3M",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 202025825,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3591,
    "slug": "ruxshunos-56-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 56 QSIM",
      "ru": "RUXSHUNOS 56 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 56 QSIM",
      "ru": "RUXSHUNOS 56 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gkxXNRHZJ979?s=2_AKaWKKIgiqXbT-komhmv8g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2_AKaWKKIgiqXbT-komhmv8g",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 39,
    "size": 177346744,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3592,
    "slug": "ruxshunos-55-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 55 QSIM",
      "ru": "RUXSHUNOS 55 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 55 QSIM",
      "ru": "RUXSHUNOS 55 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4ap28zmCT6xn?s=Z2fFuKeVSuXbEr5qQa5En-mA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Z2fFuKeVSuXbEr5qQa5En-mA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 229101291,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3593,
    "slug": "ruxshunos-54-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 54 QSIM",
      "ru": "RUXSHUNOS 54 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 54 QSIM",
      "ru": "RUXSHUNOS 54 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cGlslXUV8meQ?s=K-cKhoW806IXk1-s625YPJH2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/K-cKhoW806IXk1-s625YPJH2",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 40,
    "size": 170450632,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3594,
    "slug": "ruxshunos-53-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 53 QSIM",
      "ru": "RUXSHUNOS 53 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 53 QSIM",
      "ru": "RUXSHUNOS 53 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/OsrqBh4N6tZS?s=Hq-H-dq6yfdLY6yaDIcclkrY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Hq-H-dq6yfdLY6yaDIcclkrY",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 42,
    "size": 226820881,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3595,
    "slug": "ruxshunos-52-qsim",
    "type": "film",
    "title": {
      "uz": "RUXSHUNOS 52 QSIM",
      "ru": "RUXSHUNOS 52 QSIM"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "RUXSHUNOS 52 QSIM",
      "ru": "RUXSHUNOS 52 QSIM"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lccZkS82I0oi?s=Oiwc7DfAB_ZoRBquFbgAsWTC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Oiwc7DfAB_ZoRBquFbgAsWTC",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 36,
    "size": 184714082,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3596,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟱",
      "ru": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟱"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟱 \n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2017\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟱 \n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2017\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IR1xYYfX-Pzv?s=swZzwaiQHnrgwRazxkMq-x1a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/swZzwaiQHnrgwRazxkMq-x1a",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 129,
    "size": 1435897846,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3597,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟰",
      "ru": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟰"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟰\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟰\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vJ3YvVsEZ4ki?s=oDAoxHKRgcftw-GmW89npNqH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oDAoxHKRgcftw-GmW89npNqH",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 124,
    "size": 1377293655,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3598,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟯",
      "ru": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟯"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2007\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2007\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Nb-CJkdY8Jb-?s=XHTEWzNzdboLo3UUQ34rDdS4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XHTEWzNzdboLo3UUQ34rDdS4",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 144,
    "size": 1566603418,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3599,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟮",
      "ru": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟮"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2006\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2006\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vgpFEYx9ejSn?s=te4Gw5xwcXHfQB5N-t3qtXJk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/te4Gw5xwcXHfQB5N-t3qtXJk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 139,
    "size": 1545388261,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3600,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟭",
      "ru": "𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟭"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2003\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "💀\n𝗞𝗮𝗿𝗶𝗯 𝗗𝗲𝗻𝗴𝗶𝘇𝗶 𝗤𝗮𝗿𝗼𝗾𝗰𝗵𝗶𝗹𝗮𝗿𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2003\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-QKNj-RKQFaE?s=j7m_99w9vO4AsPM09BN_TK27",
    "trailer": "",
    "video": "https://dezocloud.uz/s/j7m_99w9vO4AsPM09BN_TK27",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 133,
    "size": 1481074652,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3601,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗔𝘃𝗮𝘁𝗮𝗿 𝟮 (𝘀𝘂𝘃 𝘆𝗼'𝗹𝗶)",
      "ru": "𝗔𝘃𝗮𝘁𝗮𝗿 𝟮 (𝘀𝘂𝘃 𝘆𝗼'𝗹𝗶)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👽\n𝗔𝘃𝗮𝘁𝗮𝗿 𝟮 (𝘀𝘂𝘃 𝘆𝗼'𝗹𝗶)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2022\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "👽\n𝗔𝘃𝗮𝘁𝗮𝗿 𝟮 (𝘀𝘂𝘃 𝘆𝗼'𝗹𝗶)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2022\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3SuVnrxYZZMh?s=wZhWmHltRiPg1qaV4oK3eKgd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/wZhWmHltRiPg1qaV4oK3eKgd",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 193,
    "size": 1992333948,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3602,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗔𝘃𝗮𝘁𝗮𝗿 𝟭",
      "ru": "𝗔𝘃𝗮𝘁𝗮𝗿 𝟭"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👽\n𝗔𝘃𝗮𝘁𝗮𝗿 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2009\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "👽\n𝗔𝘃𝗮𝘁𝗮𝗿 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2009\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/62zccd1FXyLh?s=CF7h5Rhhf1oOkLb9miJH9qr6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CF7h5Rhhf1oOkLb9miJH9qr6",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 178,
    "size": 1568674658,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3603,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "\"𝗚'𝗮𝗿𝗼𝘆𝗶𝗯 𝗯𝗼𝗹𝗮𝗹𝗮𝗿 𝘂𝘆𝗶\"",
      "ru": "\"𝗚'𝗮𝗿𝗼𝘆𝗶𝗯 𝗯𝗼𝗹𝗮𝗹𝗮𝗿 𝘂𝘆𝗶\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧚‍♀️\n\"𝗚'𝗮𝗿𝗼𝘆𝗶𝗯 𝗯𝗼𝗹𝗮𝗹𝗮𝗿 𝘂𝘆𝗶\"\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2016\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🧚‍♀️\n\"𝗚'𝗮𝗿𝗼𝘆𝗶𝗯 𝗯𝗼𝗹𝗮𝗹𝗮𝗿 𝘂𝘆𝗶\"\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2016\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1cFQssXWQieW?s=gqKH7iXzXzPhtKBdDRDYb-6C",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gqKH7iXzXzPhtKBdDRDYb-6C",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 117,
    "size": 733272807,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3604,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢 \n𝟏-𝐟𝐚𝐬𝐥 𝟐-𝐪𝐢𝐬𝐦\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢 \n𝟏-𝐟𝐚𝐬𝐥 𝟐-𝐪𝐢𝐬𝐦\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9ChK9Vt0Ifxu?s=yfL7omoAYoZGNeJeoEW928OJ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yfL7omoAYoZGNeJeoEW928OJ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 125,
    "size": 425888545,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3605,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢 \n𝟏-𝐟𝐚𝐬𝐥 𝟏-𝐪𝐢𝐬𝐦\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2010\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐞𝐫 𝐯𝐚 𝐚𝐣𝐚𝐥 𝐭𝐮𝐡𝐟𝐚𝐬𝐢 \n𝟏-𝐟𝐚𝐬𝐥 𝟏-𝐪𝐢𝐬𝐦\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2010\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3Wqztbyh1kov?s=jkTaJJ7WVRVXqa5vD420k0FM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jkTaJJ7WVRVXqa5vD420k0FM",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 139,
    "size": 429463374,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3606,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐭𝐢𝐥𝐬𝐢𝐦 𝐬𝐡𝐚𝐡𝐳𝐨𝐝𝐚 𝟔",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐭𝐢𝐥𝐬𝐢𝐦 𝐬𝐡𝐚𝐡𝐳𝐨𝐝𝐚 𝟔"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐭𝐢𝐥𝐬𝐢𝐦 𝐬𝐡𝐚𝐡𝐳𝐨𝐝𝐚 𝟔\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶:AQSH \n𝗦𝗮𝗻𝗮𝘀𝗶: 2009\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐭𝐢𝐥𝐬𝐢𝐦 𝐬𝐡𝐚𝐡𝐳𝐨𝐝𝐚 𝟔\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶:AQSH \n𝗦𝗮𝗻𝗮𝘀𝗶: 2009\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vR48XsP46YLO?s=1vGTpSfDK6gm5oOPOS0Lw_CM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1vGTpSfDK6gm5oOPOS0Lw_CM",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 145,
    "size": 449271474,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3607,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 \"𝐟𝐞𝐧𝐢𝐤𝐬\" 𝐣𝐚𝐦𝐢𝐲𝐚𝐭𝐢 𝟓",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 \"𝐟𝐞𝐧𝐢𝐤𝐬\" 𝐣𝐚𝐦𝐢𝐲𝐚𝐭𝐢 𝟓"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 \"𝐟𝐞𝐧𝐢𝐤𝐬\" 𝐣𝐚𝐦𝐢𝐲𝐚𝐭𝐢 𝟓\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2007\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 \"𝐟𝐞𝐧𝐢𝐤𝐬\" 𝐣𝐚𝐦𝐢𝐲𝐚𝐭𝐢 𝟓\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2007\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Ej4L16yFAbG0?s=HWRp993oEKJ1vUxAGAsTP5C2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HWRp993oEKJ1vUxAGAsTP5C2",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 131,
    "size": 434443566,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3608,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐥𝐚𝐧𝐠𝐚 𝐤𝐮𝐛𝐨𝐠𝐢 𝟒",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐥𝐚𝐧𝐠𝐚 𝐤𝐮𝐛𝐨𝐠𝐢 𝟒"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐥𝐚𝐧𝐠𝐚 𝐤𝐮𝐛𝐨𝐠𝐢 𝟒\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2005\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐥𝐚𝐧𝐠𝐚 𝐤𝐮𝐛𝐨𝐠𝐢 𝟒\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2005\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/jZcuI1qqn--7?s=zD5ISQIi0VUgoTCHDnEV8hwp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zD5ISQIi0VUgoTCHDnEV8hwp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 157,
    "size": 487095405,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3609,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐬𝐤𝐚𝐛𝐚𝐧 𝐦𝐚𝐱𝐛𝐮𝐬𝐢 𝟑",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐬𝐤𝐚𝐛𝐚𝐧 𝐦𝐚𝐱𝐛𝐮𝐬𝐢 𝟑"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐬𝐤𝐚𝐛𝐚𝐧 𝐦𝐚𝐱𝐛𝐮𝐬𝐢 𝟑\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2004\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐚𝐬𝐤𝐚𝐛𝐚𝐧 𝐦𝐚𝐱𝐛𝐮𝐬𝐢 𝟑\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2004\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/t-8rIeJydxhi?s=Jp0KELyqS52e7XxdcQF96al4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Jp0KELyqS52e7XxdcQF96al4",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 133,
    "size": 411987779,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3610,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐦𝐚𝐱𝐟𝐢𝐲 𝐡𝐮𝐣𝐫𝐚 𝟐",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐦𝐚𝐱𝐟𝐢𝐲 𝐡𝐮𝐣𝐫𝐚 𝟐"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐦𝐚𝐱𝐟𝐢𝐲 𝐡𝐮𝐣𝐫𝐚 𝟐\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶:AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2002\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐦𝐚𝐱𝐟𝐢𝐲 𝐡𝐮𝐣𝐫𝐚 𝟐\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶:AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2002\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Jk-pnF6sOJvD?s=IWLAeZKG2sJ7UuCTQUwB2Mwf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IWLAeZKG2sJ7UuCTQUwB2Mwf",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 149,
    "size": 462358183,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3611,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐡𝐢𝐤𝐦𝐚𝐭𝐥𝐚𝐫 𝐭𝐨𝐬𝐡𝐢 𝟏",
      "ru": "𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐡𝐢𝐤𝐦𝐚𝐭𝐥𝐚𝐫 𝐭𝐨𝐬𝐡𝐢 𝟏"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐡𝐢𝐤𝐦𝐚𝐭𝐥𝐚𝐫 𝐭𝐨𝐬𝐡𝐢 𝟏\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2001\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🔮\n𝐆𝐚𝐫𝐫𝐢 𝐏𝐨𝐭𝐭𝐞𝐫 𝐯𝐚 𝐡𝐢𝐤𝐦𝐚𝐭𝐥𝐚𝐫 𝐭𝐨𝐬𝐡𝐢 𝟏\n\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2001\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TqmhU3OFR6Rz?s=2nfTNYExUvaNokH9hf35xSQz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2nfTNYExUvaNokH9hf35xSQz",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 152,
    "size": 472460438,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3612,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟯",
      "ru": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟯"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2017\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2017\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/0A1UWXjVIjom?s=0K0oS4z01aV-Rc4MSiV5Eb1t",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0K0oS4z01aV-Rc4MSiV5Eb1t",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 134,
    "size": 499466545,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3613,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟮",
      "ru": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟮"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2014\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2014\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZcDVA87OTqPE?s=2rhUuF1ewfz-GCvoSonM_jSi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2rhUuF1ewfz-GCvoSonM_jSi",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 119,
    "size": 422054502,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3614,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟭",
      "ru": "𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟭"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦍\n𝗠𝗮𝘆𝗺𝘂𝗻𝗹𝗮𝗿 𝘀𝗮𝘆𝗼𝗿𝗮𝘀𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2011\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vZOb3PAbNy4m?s=DheMmw5JNx74Ex9vSbE0OVo6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DheMmw5JNx74Ex9vSbE0OVo6",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 99,
    "size": 387853142,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3615,
    "slug": "odin-doma-6",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟲 (Один Дома 6)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟲 (Один Дома 6)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟲 (Один Дома 6)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2021\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟲 (Один Дома 6)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2021\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eDK-VXyUmIlH?s=g8bwTZuIHib9XW8_XAr7ya7G",
    "trailer": "",
    "video": "https://dezocloud.uz/s/g8bwTZuIHib9XW8_XAr7ya7G",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 93,
    "size": 468266335,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3616,
    "slug": "odin-doma-5",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟱 (Один Дома 5)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟱 (Один Дома 5)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟱 (Один Дома 5)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2012\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟱 (Один Дома 5)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2012\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_hBs1LQaJk2k?s=M3TNoBPGLmlhCxfQysP8XxwH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/M3TNoBPGLmlhCxfQysP8XxwH",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 82,
    "size": 322344138,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3617,
    "slug": "odin-doma-4",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟰 (Один Дома 4)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟰 (Один Дома 4)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟰 (Один Дома 4)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2002\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟰 (Один Дома 4)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2002\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/7Tp9wOw0LKhc?s=AYIH_vWp1S7fddTXEXG29eO3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/AYIH_vWp1S7fddTXEXG29eO3",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 80,
    "size": 315522867,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3618,
    "slug": "odin-doma-3",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟯 (Один Дома 3)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟯 (Один Дома 3)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟯 (Один Дома 3)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1997\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟯 (Один Дома 3)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1997\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/s3WW136wzCyB?s=lrXGpHwc6cDBaJBozzfVmdyz",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lrXGpHwc6cDBaJBozzfVmdyz",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 90,
    "size": 340864992,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3619,
    "slug": "odin-doma-2",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟮 (Один Дома 2)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟮 (Один Дома 2)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟮 (Один Дома 2)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1992\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟮 (Один Дома 2)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1992\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NsdJaSEKz6Iq?s=sPL8CZrADcFrGpZxMlP1w4sU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/sPL8CZrADcFrGpZxMlP1w4sU",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 120,
    "size": 778723710,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3620,
    "slug": "odin-doma-1",
    "type": "film",
    "title": {
      "uz": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟭 (Один Дома 1)",
      "ru": "𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟭 (Один Дома 1)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟭 (Один Дома 1)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1990\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🤩\n𝗨𝘆𝗱𝗮 𝗬𝗼𝗹𝗴'𝗶𝘇 𝟭 (Один Дома 1)\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 1990\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GipdlE-ICtaL?s=oDx40Eu7mMFPpbrzYc9xOXTG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oDx40Eu7mMFPpbrzYc9xOXTG",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 103,
    "size": 666035164,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3621,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟯",
      "ru": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟯"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2018\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟯\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2018\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ULs-xSQE7vm0?s=W_tKlb98FJ-E1ktkTxQqZW8m",
    "trailer": "",
    "video": "https://dezocloud.uz/s/W_tKlb98FJ-E1ktkTxQqZW8m",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 136,
    "size": 1009424078,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3622,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟮",
      "ru": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟮"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2015\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟮\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2015\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YUMMgzAvd1Xh?s=mejOY5ysOPWLmAsFtApI8F14",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mejOY5ysOPWLmAsFtApI8F14",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 124,
    "size": 790972438,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3623,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟭",
      "ru": "𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟭"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2014\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🧩\n𝗟𝗮𝗯𝗶𝗿𝗶𝗻𝘁 𝘆𝘂𝗴𝘂𝗿𝘂𝘃𝗰𝗵𝗶𝘀𝗶 𝟭\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2014\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WprNKa6SlaSN?s=2hNwOm5rsdeWtI67HuRuIgIA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/2hNwOm5rsdeWtI67HuRuIgIA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 108,
    "size": 591865539,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3624,
    "slug": "demetr-shaytonning-songgi-sayohati",
    "type": "film",
    "title": {
      "uz": "Demetr: Shaytonning so'nggi sayohati",
      "ru": "Demetr: Shaytonning so'nggi sayohati"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👿\nDemetr: Shaytonning so'nggi sayohati.\n\nDavlati: AQSH\nSanasi: 2023\nTili: O'zbek tilida (Tarjima)\nJanr: / / / \n\nKanalimizga obuna bo'ling🔔",
      "ru": "👿\nDemetr: Shaytonning so'nggi sayohati.\n\nDavlati: AQSH\nSanasi: 2023\nTili: O'zbek tilida (Tarjima)\nJanr: / / / \n\nKanalimizga obuna bo'ling🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/2AelAkt4JFfQ?s=qKOAYBV6In6hiDyNzJDTfjL-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qKOAYBV6In6hiDyNzJDTfjL-",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 118,
    "size": 955909130,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3625,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟴-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟴-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟴-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟴-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/j3spBp7m9zAT?s=ymUDCu2unK2sjWkt4mC92-0P",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ymUDCu2unK2sjWkt4mC92-0P",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 50,
    "size": 225074704,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3626,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟳-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟳-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟳-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟳-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bHhuo1sg8vjy?s=506SjBEjnXjWoXB7uln3wpti",
    "trailer": "",
    "video": "https://dezocloud.uz/s/506SjBEjnXjWoXB7uln3wpti",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 206381712,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3627,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟲-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟲-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟲-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟲-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ooIReA-oaah1?s=cwlCFmZQMeCo7pc3Cps-qCCN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/cwlCFmZQMeCo7pc3Cps-qCCN",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 54,
    "size": 245756520,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3628,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟱-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟱-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟱-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟱-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eqWNlejzjXVW?s=uI07GWF0vrt1WbIPsVIFdbi5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uI07GWF0vrt1WbIPsVIFdbi5",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 51,
    "size": 196534884,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3629,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟰-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟰-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟰-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟰-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/zJMy1uKrlrl8?s=Weu-79ddJ3Z5LkZqgUilyXz1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Weu-79ddJ3Z5LkZqgUilyXz1",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 63,
    "size": 237675477,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3630,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟯-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟯-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟯-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟯-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UwVmiA6io053?s=Qw4AoGG5pQ5DHYP-MPpMPD1f",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Qw4AoGG5pQ5DHYP-MPpMPD1f",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 58,
    "size": 206855377,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3631,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟮-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟮-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟮-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟮-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1JFVNwRpL-8t?s=k7uf5lgC0NwVaSQE1lGjAhzT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/k7uf5lgC0NwVaSQE1lGjAhzT",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 55,
    "size": 222986324,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3632,
    "slug": "kino",
    "type": "film",
    "title": {
      "uz": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟭-𝗤𝗶𝘀𝗺",
      "ru": "𝗩𝗔𝗡 𝗣𝗜𝗦 𝟭-𝗤𝗶𝘀𝗺"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟭-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔",
      "ru": "🦾\n𝗩𝗔𝗡 𝗣𝗜𝗦 𝟭-𝗤𝗶𝘀𝗺\n𝗗𝗮𝘃𝗹𝗮𝘁𝗶: AQSH\n𝗦𝗮𝗻𝗮𝘀𝗶: 2023\n𝗧𝗶𝗹𝗶: O'zbek tilida (Tarjima)\n𝗝𝗮𝗻𝗿𝗶: / / / \n\n𝗸𝗮𝗻𝗮𝗹𝗶𝗺𝗶𝘇𝗴𝗮 𝗼𝗯𝘂𝗻𝗮 𝗯𝗼𝗹𝗶𝗻𝗴🔔"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1zCwVXPx_gmH?s=kBo9MV3iarv8DSdhzBYhv0An",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kBo9MV3iarv8DSdhzBYhv0An",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 64,
    "size": 308775426,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3633,
    "slug": "nomi-65-million-yil-avval",
    "type": "film",
    "title": {
      "uz": "Nomi: 65 million yil avval",
      "ru": "Nomi: 65 million yil avval"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: 65 million yil avval\n\n🍿Sifati: 480p HD\n📆Yili: 2023-yil\n🇺🇸Davlati: AQSh\n🗣Tarjima: O'zbek tilida\n🎭Janri: , ,",
      "ru": "🎬Nomi: 65 million yil avval\n\n🍿Sifati: 480p HD\n📆Yili: 2023-yil\n🇺🇸Davlati: AQSh\n🗣Tarjima: O'zbek tilida\n🎭Janri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/65MgOOUPAoVH?s=Z9vMPtjZbmvo7VRTo68SLjEh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Z9vMPtjZbmvo7VRTo68SLjEh",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 93,
    "size": 725672167,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3634,
    "slug": "kino-nomi-sheriklar",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Sheriklar",
      "ru": "# Kino Nomi: Sheriklar"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Sheriklar\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri: Jangari fantastic\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 26424\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Sheriklar\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri: Jangari fantastic\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 26424\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mCYHQ5klH5pl?s=RxUM-F4149A48lXk9KzYIQPB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RxUM-F4149A48lXk9KzYIQPB",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 163,
    "size": 1254881481,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3635,
    "slug": "nomi-qarol-2",
    "type": "film",
    "title": {
      "uz": "Nomi: Qarol 2",
      "ru": "Nomi: Qarol 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: Qarol 2\n➖➖➖➖➖➖➖➖➖➖\n🇺🇿Tili: O'zbek tilida\n📀Sifati: 1080P Full HD\n🇷🇺Davlat: Rossiya \n📆Yili: 2024-yil\n🎞️Janri:",
      "ru": "🎬Nomi: Qarol 2\n➖➖➖➖➖➖➖➖➖➖\n🇺🇿Tili: O'zbek tilida\n📀Sifati: 1080P Full HD\n🇷🇺Davlat: Rossiya \n📆Yili: 2024-yil\n🎞️Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xi9NLQfW3QtU?s=5SgxonNVx87Di_j3M3E_exzp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5SgxonNVx87Di_j3M3E_exzp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 115,
    "size": 1941985635,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3636,
    "slug": "xitoylik-savdogar",
    "type": "film",
    "title": {
      "uz": "➺ Xitoylik Savdogar",
      "ru": "➺ Xitoylik Savdogar"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Xitoylik Savdogar \n🇺🇿 ➺ O'zbek Tilida\n🌍 ➺ Xitoy filmi\n⚔ ➺ Jangari, Triller",
      "ru": "🎬 ➺ Xitoylik Savdogar \n🇺🇿 ➺ O'zbek Tilida\n🌍 ➺ Xitoy filmi\n⚔ ➺ Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tDQ8m504yVZo?s=TwTadt35CGY6No-cBj4CUtKP",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TwTadt35CGY6No-cBj4CUtKP",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 110,
    "size": 725679204,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3637,
    "slug": "nomi-fortuna-operatsiyasi",
    "type": "film",
    "title": {
      "uz": "Nomi: Fortuna operatsiyasi",
      "ru": "Nomi: Fortuna operatsiyasi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: Fortuna operatsiyasi\n➖➖➖➖➖➖➖➖➖➖\n🌍Tili: Oʻzbek Tilida \n📀Sifati: 480P Mobile HD\n🌏Davlat: AQSH, Xitoy \n📆Yili: 2022-yil\n🎞️Janri:",
      "ru": "🎬Nomi: Fortuna operatsiyasi\n➖➖➖➖➖➖➖➖➖➖\n🌍Tili: Oʻzbek Tilida \n📀Sifati: 480P Mobile HD\n🌏Davlat: AQSH, Xitoy \n📆Yili: 2022-yil\n🎞️Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IjzGYBG4zAcW?s=-pSsX6IjujssxdtnU81Axe4L",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-pSsX6IjujssxdtnU81Axe4L",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 114,
    "size": 514411442,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3638,
    "slug": "nomi-snayperlar",
    "type": "film",
    "title": {
      "uz": "Nomi: Snayperlar",
      "ru": "Nomi: Snayperlar"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: Snayperlar\n🇺🇿Tili: O'zbek Tilida\n📀Sifati 480P HD\n🌏Davlat: Koreya\n📆Yili: 2021-yil\n🎞️Janri:",
      "ru": "🎬Nomi: Snayperlar\n🇺🇿Tili: O'zbek Tilida\n📀Sifati 480P HD\n🌏Davlat: Koreya\n📆Yili: 2021-yil\n🎞️Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iaHinzHhgf04?s=A9bjKdWcZlpT228ei1QlK2TD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/A9bjKdWcZlpT228ei1QlK2TD",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 95,
    "size": 690826763,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3639,
    "slug": "nomi-qarol",
    "type": "film",
    "title": {
      "uz": "Nomi: Qarol",
      "ru": "Nomi: Qarol"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: Qarol\n🇺🇿Tili: O'zbek Tilida\n📅Yili: 2020\n🌏Davlati: Rossiya\n🎞Sifati: 480p\n🎭Janri: Komediya",
      "ru": "🎬Nomi: Qarol\n🇺🇿Tili: O'zbek Tilida\n📅Yili: 2020\n🌏Davlati: Rossiya\n🎞Sifati: 480p\n🎭Janri: Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-utcQRlLot6B?s=8AAn_soZTd1bvEndv40mHqJ9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8AAn_soZTd1bvEndv40mHqJ9",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 97,
    "size": 797242272,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3640,
    "slug": "nojentelmencha-ishlar-vazirligi-18-2024-720p-ozbek-tilida",
    "type": "film",
    "title": {
      "uz": "#▷ \"Nojentelmencha ishlar vazirligi\" 18+ (2024) (720p) O'zbek Tilida",
      "ru": "#▷ \"Nojentelmencha ishlar vazirligi\" 18+ (2024) (720p) O'zbek Tilida"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#▷ \"Nojentelmencha ishlar vazirligi\" 18+ (2024) (720p) O'zbek Tilida\n\nJanri: Jangari, Drama, Harbiy, Tarixiy\n❗️Eng yangi Tarjima Kinolar \nVa Seriallar⁠⁠⁠⁠⁠ 👉 \n🗂 Yuklash: 4161\n\n\n🤖 Bizning bot:",
      "ru": "#▷ \"Nojentelmencha ishlar vazirligi\" 18+ (2024) (720p) O'zbek Tilida\n\nJanri: Jangari, Drama, Harbiy, Tarixiy\n❗️Eng yangi Tarjima Kinolar \nVa Seriallar⁠⁠⁠⁠⁠ 👉 \n🗂 Yuklash: 4161\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MDAt_EGyqTUi?s=uyOiSedA_eNIvU9xs8ZxAvO8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/uyOiSedA_eNIvU9xs8ZxAvO8",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 120,
    "size": 1790231118,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3641,
    "slug": "songi-samuray-tarixiy-jangari-kino-ozbek-tilida-2003",
    "type": "film",
    "title": {
      "uz": "So'ngi samuray (Tarixiy jangari kino, O'zbek tilida) 2003",
      "ru": "So'ngi samuray (Tarixiy jangari kino, O'zbek tilida) 2003"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 So'ngi samuray (Tarixiy jangari kino, O'zbek tilida) 2003",
      "ru": "🎞 So'ngi samuray (Tarixiy jangari kino, O'zbek tilida) 2003"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1BUFUZ5TgpYt?s=_8TsSiaHnw11qYT0qURBA-mh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_8TsSiaHnw11qYT0qURBA-mh",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 133,
    "size": 399206345,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3642,
    "slug": "red-2",
    "type": "film",
    "title": {
      "uz": "Red 2",
      "ru": "Red 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎥 Red 2 \n🌍 Davlati: AQSH\n🔛 Davomiyligi: 1:40:27\n🇺🇿 Tarjima: O'zbek Tilida\n📽 Janri: Jangari\n\n📡 𝙺𝚊𝚗𝚊𝚕𝚒𝚖𝚒𝚣 ➣👇",
      "ru": "🎥 Red 2 \n🌍 Davlati: AQSH\n🔛 Davomiyligi: 1:40:27\n🇺🇿 Tarjima: O'zbek Tilida\n📽 Janri: Jangari\n\n📡 𝙺𝚊𝚗𝚊𝚕𝚒𝚖𝚒𝚣 ➣👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/hQrWZ9qCd_mf?s=mU_qvlH3N-Yc4lQBQECwaX7A",
    "trailer": "",
    "video": "https://dezocloud.uz/s/mU_qvlH3N-Yc4lQBQECwaX7A",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 382033399,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3643,
    "slug": "red",
    "type": "film",
    "title": {
      "uz": "Red",
      "ru": "Red"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎥 Red \n🌍 Davlati: AQSH\n🔛 Davomiyligi: 1:43:54\n🇺🇿 Tarjima: O'zbek Tilida\n📽 Janri: Jangari\n\n📡 𝙺𝚊𝚗𝚊𝚕𝚒𝚖𝚒𝚣 ➣👇",
      "ru": "🎥 Red \n🌍 Davlati: AQSH\n🔛 Davomiyligi: 1:43:54\n🇺🇿 Tarjima: O'zbek Tilida\n📽 Janri: Jangari\n\n📡 𝙺𝚊𝚗𝚊𝚕𝚒𝚖𝚒𝚣 ➣👇"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MwD3xk19DUA3?s=L-rcHO4eLDSFQl5PiCHjlTNf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L-rcHO4eLDSFQl5PiCHjlTNf",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 395863709,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3644,
    "slug": "nomi-lochin-ovi",
    "type": "film",
    "title": {
      "uz": "Nomi: Lochin ovi",
      "ru": "Nomi: Lochin ovi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Nomi: Lochin ovi\n➖➖➖➖➖➖➖➖➖➖\n🌍Tili: Oʻzbek Tilida \n📀Sifati: 480P Mobile HD\n🌏Davlat: AQSH \n📆Yili: 2014-yil\n🎞️Janri:",
      "ru": "🎬Nomi: Lochin ovi\n➖➖➖➖➖➖➖➖➖➖\n🌍Tili: Oʻzbek Tilida \n📀Sifati: 480P Mobile HD\n🌏Davlat: AQSH \n📆Yili: 2014-yil\n🎞️Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ogiDX-E1gLOA?s=FXLI4DX70esi5uHfnIwuFbVK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/FXLI4DX70esi5uHfnIwuFbVK",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 101,
    "size": 656016845,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3645,
    "slug": "uch-bahodir-va-taxtdagi-ot",
    "type": "film",
    "title": {
      "uz": "\"Uch bahodir va taxtdagi ot\"",
      "ru": "\"Uch bahodir va taxtdagi ot\""
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬\"Uch bahodir va taxtdagi ot\"\n🇺🇿 O'zbek Tilida \n🌍 Davlat: Rossiya\n📀 Sifati : 480p\n📆 Yili : 2021\n⏳ Davomiyligi: 1s | 27 minut\n🎞️ Janri :",
      "ru": "🎬\"Uch bahodir va taxtdagi ot\"\n🇺🇿 O'zbek Tilida \n🌍 Davlat: Rossiya\n📀 Sifati : 480p\n📆 Yili : 2021\n⏳ Davomiyligi: 1s | 27 minut\n🎞️ Janri :"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/kYEcwbypE5pb?s=euvCckNGGIj-PrxfxO6JnXdQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/euvCckNGGIj-PrxfxO6JnXdQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 481634376,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3646,
    "slug": "premyera",
    "type": "film",
    "title": {
      "uz": "PREMYERA",
      "ru": "PREMYERA"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔥PREMYERA🔥\n\n🎬 Nomi: QONLI REJA (2022)\n🌎 Davlati: AQSH\n💽 Formati: HD (720)\nMobile HD (480p)\n🇺🇿 Tili: O'zbekcha\n🎭 Janri: \n⏳ Davomiyligi: 1s | 27 minut",
      "ru": "🔥PREMYERA🔥\n\n🎬 Nomi: QONLI REJA (2022)\n🌎 Davlati: AQSH\n💽 Formati: HD (720)\nMobile HD (480p)\n🇺🇿 Tili: O'zbekcha\n🎭 Janri: \n⏳ Davomiyligi: 1s | 27 minut"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GEalC73SSH_i?s=yavsX5qk_TRfYGeW2cZXVluC",
    "trailer": "",
    "video": "https://dezocloud.uz/s/yavsX5qk_TRfYGeW2cZXVluC",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 554277179,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3647,
    "slug": "nomi-qilichboz-2020",
    "type": "film",
    "title": {
      "uz": "Nomi: Qilichboz (2020)",
      "ru": "Nomi: Qilichboz (2020)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 Nomi: Qilichboz (2020) \n ➖➖➖➖➖➖➖\n🌎 Davlati: Koreya\n💽 Formati: 720p, HD\n🇺🇿 Tili: O'zbek tilida\n🎭 Janri: \n⏳ Davomiyligi: 1s 28 minut\n\n♻️Do'stlarga ulashing\n👉🏻 Kanalga ulanish:\n👇👇👇👇👇👇👇👇\n🎥Войенный фильм",
      "ru": "🎬 Nomi: Qilichboz (2020) \n ➖➖➖➖➖➖➖\n🌎 Davlati: Koreya\n💽 Formati: 720p, HD\n🇺🇿 Tili: O'zbek tilida\n🎭 Janri: \n⏳ Davomiyligi: 1s 28 minut\n\n♻️Do'stlarga ulashing\n👉🏻 Kanalga ulanish:\n👇👇👇👇👇👇👇👇\n🎥Войенный фильм"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YlZ-UhT32Hk9?s=qNt9en74mjaKOfJyveGF1FxI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qNt9en74mjaKOfJyveGF1FxI",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 920291496,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3648,
    "slug": "pablo-eskobar",
    "type": "film",
    "title": {
      "uz": "Pablo Eskobar",
      "ru": "Pablo Eskobar"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Pablo Eskobar\n\nTili: oʻzbek tilida\nJanri: jangari hayotiy\nSifati: 720p\nDavlati: AQSh\nYili:",
      "ru": "Pablo Eskobar\n\nTili: oʻzbek tilida\nJanri: jangari hayotiy\nSifati: 720p\nDavlati: AQSh\nYili:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mDL1AIubwi5A?s=EewtbCZz_YUYVnwmUUEKx1lj",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EewtbCZz_YUYVnwmUUEKx1lj",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 912684336,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3649,
    "slug": "shamol-jangchisi",
    "type": "film",
    "title": {
      "uz": "Shamol jangchisi",
      "ru": "Shamol jangchisi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎥 Shamol jangchisi\n📹 Sifati: HD 480p\n📆 Yil: 2004\n🎞 Janr: Jangari, Drama, Tarixiy\n🇺🇸 Davlat: Janubiy Koreya\n🇺🇿 Tarjima: O'zbek tilida\nPS: Film kesilmagan orginal holda",
      "ru": "🎥 Shamol jangchisi\n📹 Sifati: HD 480p\n📆 Yil: 2004\n🎞 Janr: Jangari, Drama, Tarixiy\n🇺🇸 Davlat: Janubiy Koreya\n🇺🇿 Tarjima: O'zbek tilida\nPS: Film kesilmagan orginal holda"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/AcI-IyKbcxZT?s=crrCQ09Cp6dTKh6tGmbsnT-k",
    "trailer": "",
    "video": "https://dezocloud.uz/s/crrCQ09Cp6dTKh6tGmbsnT-k",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 121,
    "size": 849366455,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3650,
    "slug": "jonivorlar-qiroli-2018",
    "type": "film",
    "title": {
      "uz": "➺ Jonivorlar qiroli (2018)",
      "ru": "➺ Jonivorlar qiroli (2018)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Jonivorlar qiroli (2018)\n🇺🇿 ➺ O'zbek Tilida [480p/HD]\n🌍 ➺ Davlati: Pokiston\n⚔️ ➺ Janri: Oilaviy, Komediya",
      "ru": "🎬 ➺ Jonivorlar qiroli (2018)\n🇺🇿 ➺ O'zbek Tilida [480p/HD]\n🌍 ➺ Davlati: Pokiston\n⚔️ ➺ Janri: Oilaviy, Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nzkhZOqoqrdS?s=L6pSkUvnGx-rSmmyOhykkWYv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L6pSkUvnGx-rSmmyOhykkWYv",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 94,
    "size": 532808048,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3651,
    "slug": "kino-nomi-gerakl",
    "type": "film",
    "title": {
      "uz": "Kino Nomi: Gerakl",
      "ru": "Kino Nomi: Gerakl"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Kino Nomi: Gerakl\n➖➖➖➖➖➖\n🌐 Davlati: Aqsh\n⏱ Davomligi: 1:31:36\n⏳ Hajmi: 566.5 MB\n🖥 Formati: HD 720p\n📻 Janri: Jangari Fantastik Sarguzasht\n➖➖➖➖➖➖",
      "ru": "🎞 Kino Nomi: Gerakl\n➖➖➖➖➖➖\n🌐 Davlati: Aqsh\n⏱ Davomligi: 1:31:36\n⏳ Hajmi: 566.5 MB\n🖥 Formati: HD 720p\n📻 Janri: Jangari Fantastik Sarguzasht\n➖➖➖➖➖➖"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GjlnZRGDkLdk?s=_91XsSCWxMHQfAkieYaxQb0N",
    "trailer": "",
    "video": "https://dezocloud.uz/s/_91XsSCWxMHQfAkieYaxQb0N",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 92,
    "size": 593971374,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3652,
    "slug": "maxsus-kuchlar-guruhi",
    "type": "film",
    "title": {
      "uz": "Maxsus kuchlar guruhi",
      "ru": "Maxsus kuchlar guruhi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬Maxsus kuchlar guruhi \n🇺🇿O'zbek tilida \n📀Sifati 480p \n📆Yili 2011\n🎞️Janri : Jangari Harbiy \n👥Bosh rollarda : Jimon Xounsou, Diane Kruger, Benoit Magimel, Denis Manochet",
      "ru": "🎬Maxsus kuchlar guruhi \n🇺🇿O'zbek tilida \n📀Sifati 480p \n📆Yili 2011\n🎞️Janri : Jangari Harbiy \n👥Bosh rollarda : Jimon Xounsou, Diane Kruger, Benoit Magimel, Denis Manochet"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tpzTQcEmtEON?s=c2OzceK64nyWUCBrdS3MRTJt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/c2OzceK64nyWUCBrdS3MRTJt",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 99,
    "size": 829709825,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3653,
    "slug": "kino-nomi-qotil-va-himoyachi",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Qotil va himoyachi",
      "ru": "# Kino Nomi: Qotil va himoyachi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Qotil va himoyachi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 463091\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Qotil va himoyachi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 463091\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Wko3jz0qR5Jn?s=Ksqgq5A6xAgj2uWnRBGQB4ej",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ksqgq5A6xAgj2uWnRBGQB4ej",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 96,
    "size": 670495024,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3654,
    "slug": "kino-nomi-chegarasiz-3",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Chegarasiz 3",
      "ru": "# Kino Nomi: Chegarasiz 3"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Chegarasiz 3\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 510707\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Chegarasiz 3\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 510707\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/69CaDmMjK-UV?s=kNYata7wxIjMerMljfMVYLRG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kNYata7wxIjMerMljfMVYLRG",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 132,
    "size": 1147143614,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3655,
    "slug": "kino-nomi-songi-bahodir",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: So'ngi bahodir",
      "ru": "# Kino Nomi: So'ngi bahodir"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: So'ngi bahodir\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 12+\n\n🔰| Kanal: \n🗂 Yuklash: 449191\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: So'ngi bahodir\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 12+\n\n🔰| Kanal: \n🗂 Yuklash: 449191\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yV0cnIOV8sy_?s=iTkmzyAdYWmvYIr5rTNpXV3S",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iTkmzyAdYWmvYIr5rTNpXV3S",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 108,
    "size": 1040787449,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3656,
    "slug": "kino-nomi-eltuvchi",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Eltuvchi",
      "ru": "# Kino Nomi: Eltuvchi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Eltuvchi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 464744\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Eltuvchi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 464744\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/SLjree1jRFQ_?s=XzG5sWSEuuAigNrD2QahIwm4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/XzG5sWSEuuAigNrD2QahIwm4",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 86,
    "size": 668193002,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3657,
    "slug": "kino-nomi-yirtqich-4",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Yirtqich 4",
      "ru": "# Kino Nomi: Yirtqich 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Yirtqich 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 495359\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Yirtqich 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 495359\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/18SkXEtRcyMn?s=aZ-BSgtPxHgx3zs_Vf_-dEuA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aZ-BSgtPxHgx3zs_Vf_-dEuA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 1243948853,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3658,
    "slug": "kino-nomi-jinoyat-shahri-4",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Jinoyat shahri 4",
      "ru": "# Kino Nomi: Jinoyat shahri 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Jinoyat shahri 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: Ts format\n🎞️| Janri:Jangari triller\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 5129\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Jinoyat shahri 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: Ts format\n🎞️| Janri:Jangari triller\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 5129\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/wqc0K2c5NOUP?s=rz6zSCjE6eE2R59-30mpqVVr",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rz6zSCjE6eE2R59-30mpqVVr",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 103,
    "size": 1187551166,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3659,
    "slug": "kino-nomi-asalarichi",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Asalarichi",
      "ru": "# Kino Nomi: Asalarichi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Asalarichi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 446716\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Asalarichi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 446716\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/nBXDmG724E1R?s=D9qhWQjsh40zIg_9zlnDqQDk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/D9qhWQjsh40zIg_9zlnDqQDk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 1214754261,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3660,
    "slug": "kino-nomi-eltuvchi",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Eltuvchi",
      "ru": "# Kino Nomi: Eltuvchi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Eltuvchi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 436545\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Eltuvchi\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 436545\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WHhF3T8_lhj6?s=t4HBeaqqrVj9WD3WmHTS2JH2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/t4HBeaqqrVj9WD3WmHTS2JH2",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 86,
    "size": 668193002,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3661,
    "slug": "kino-nomi-jinoyat-izidan",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Jinoyat izidan",
      "ru": "# Kino Nomi: Jinoyat izidan"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Jinoyat izidan\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Janagari triller\n⛔️| Ko'rish Kategoriyasi: 16\n\n🔰| Kanal: \n🗂 Yuklash: 495208\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Jinoyat izidan\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Janagari triller\n⛔️| Ko'rish Kategoriyasi: 16\n\n🔰| Kanal: \n🗂 Yuklash: 495208\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/J4407l6scLm1?s=fy2H1Cs7MCCYH41Tx-xfNDoq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fy2H1Cs7MCCYH41Tx-xfNDoq",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 87,
    "size": 587937297,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3662,
    "slug": "kino-nomi-chegarasizlar-4",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Chegarasizlar 4",
      "ru": "# Kino Nomi: Chegarasizlar 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Chegarasizlar 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 494359\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Chegarasizlar 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 494359\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/imWPqIU4dwYG?s=74HNMlHc1TD7DoM__HiRBK0a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/74HNMlHc1TD7DoM__HiRBK0a",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 99,
    "size": 1218116399,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3663,
    "slug": "kino-nomi-red",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Red",
      "ru": "# Kino Nomi: Red"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Red\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 469046\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Red\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Jangari\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 469046\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vUhktd5uH3ue?s=kjnzhNc90yG1xH8kn2b2Yx5z",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kjnzhNc90yG1xH8kn2b2Yx5z",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 652719125,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3664,
    "slug": "kino-nomi-red-2",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Red 2",
      "ru": "# Kino Nomi: Red 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Red 2\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Jangari triller\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 187389\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Red 2\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Jangari triller\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 187389\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YDD7GJ61ZNXH?s=kfncgMcmRKdUDy634_CicQ1d",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kfncgMcmRKdUDy634_CicQ1d",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 109,
    "size": 1639507502,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3665,
    "slug": "kino-nomi-farzand",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Farzand",
      "ru": "# Kino Nomi: Farzand"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Farzand\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Kriminal\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 304227\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Farzand\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 1080p\n🎞️| Janri:Kriminal\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 304227\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/gRCDWoAfPP_W?s=pYfykxdu75HoN8iH6o2MzGJp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pYfykxdu75HoN8iH6o2MzGJp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 118,
    "size": 2489797192,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3666,
    "slug": "kino-nomi-forrest-gamp",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Forrest gamp",
      "ru": "# Kino Nomi: Forrest gamp"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Forrest gamp\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 0\n\n🔰| Kanal: \n🗂 Yuklash: 484183\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Forrest gamp\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 480p\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 0\n\n🔰| Kanal: \n🗂 Yuklash: 484183\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/g2PMoGL5PMeS?s=iSW0HjSiwDRi_3rww0AsAZSK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/iSW0HjSiwDRi_3rww0AsAZSK",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 142,
    "size": 617265973,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3667,
    "slug": "kino-nomi-jinoyatchilar-shahri-3",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Jinoyatchilar shahri 3",
      "ru": "# Kino Nomi: Jinoyatchilar shahri 3"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Jinoyatchilar shahri 3\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari kriminal\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 346231\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Jinoyatchilar shahri 3\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: 720p\n🎞️| Janri:Jangari kriminal\n⛔️| Ko'rish Kategoriyasi: 18+\n\n🔰| Kanal: \n🗂 Yuklash: 346231\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CevdA8FM7x7k?s=vRQWWSv86MwVcDtZQWM1hXh6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vRQWWSv86MwVcDtZQWM1hXh6",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 105,
    "size": 1047691783,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3668,
    "slug": "kino-nomi-maymunlar-sayyorasi-4",
    "type": "film",
    "title": {
      "uz": "# Kino Nomi: Maymunlar sayyorasi 4",
      "ru": "# Kino Nomi: Maymunlar sayyorasi 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "#🍿| Kino Nomi: Maymunlar sayyorasi 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: Ts format\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 16997\n\n\n🤖 Bizning bot:",
      "ru": "#🍿| Kino Nomi: Maymunlar sayyorasi 4\n➖➖➖➖➖➖➖➖➖➖➖➖\n🇺🇿| Tili: O'zbek tilida\n💾| Sifati: Ts format\n🎞️| Janri:Sarguzasht\n⛔️| Ko'rish Kategoriyasi: 16+\n\n🔰| Kanal: \n🗂 Yuklash: 16997\n\n\n🤖 Bizning bot:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/V7MuAm-Ta8M_?s=X58Pr7wvA2xl-NHN2AROGXaB",
    "trailer": "",
    "video": "https://dezocloud.uz/s/X58Pr7wvA2xl-NHN2AROGXaB",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 134,
    "size": 1069342527,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3669,
    "slug": "ajal-poygasi-3-2013",
    "type": "film",
    "title": {
      "uz": "➺ Ajal Poygasi 3 (2013)",
      "ru": "➺ Ajal Poygasi 3 (2013)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 ➺ Ajal Poygasi 3 (2013)\n🇺🇿 ➺ Rus tilida [480]\n🌍 ➺ Davlati: AQSH, Germaniya, B.Britaniya\n⚔ ➺ Janri: 🎄",
      "ru": "🎬 ➺ Ajal Poygasi 3 (2013)\n🇺🇿 ➺ Rus tilida [480]\n🌍 ➺ Davlati: AQSH, Germaniya, B.Britaniya\n⚔ ➺ Janri: 🎄"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/S0gyJWBZixXZ?s=eFK0DHEpY1lena1Bs-RPF5RS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eFK0DHEpY1lena1Bs-RPF5RS",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 105,
    "size": 501532959,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3670,
    "slug": "ajal-poygasi-2",
    "type": "film",
    "title": {
      "uz": "Ajal Poygasi 2",
      "ru": "Ajal Poygasi 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ajal Poygasi 2\n-----------------------------------------------------\n‣ Davlat: AQSH Germaniya B.Britaniya\n‣ Janr: jangari triller poyga\n‣ Til: o'zbek tilida\n‣ Sifat: 720p",
      "ru": "Ajal Poygasi 2\n-----------------------------------------------------\n‣ Davlat: AQSH Germaniya B.Britaniya\n‣ Janr: jangari triller poyga\n‣ Til: o'zbek tilida\n‣ Sifat: 720p"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/e6KE-tIhVrOZ?s=E18kpVQF1R18rd73cn092CM4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/E18kpVQF1R18rd73cn092CM4",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 100,
    "size": 678882865,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3671,
    "slug": "sherlokk-holmes-2009",
    "type": "film",
    "title": {
      "uz": "Sherlock Holmes (2009)",
      "ru": "Sherlock Holmes (2009)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "| \nSherlock Holmes (2009)\nBoshrolda: Robert Downey JR\nRus Tilida HD",
      "ru": "| \nSherlock Holmes (2009)\nBoshrolda: Robert Downey JR\nRus Tilida HD"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/oaO-YL0Uw6_Z?s=qB0fZhbctisuCjP-oQcHBZxD",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qB0fZhbctisuCjP-oQcHBZxD",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 129,
    "size": 429947483,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3672,
    "slug": "qora-libosli-odamlar-4",
    "type": "film",
    "title": {
      "uz": "Qora libosli odamlar 4",
      "ru": "Qora libosli odamlar 4"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qora libosli odamlar 4",
      "ru": "Qora libosli odamlar 4"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/V1CGAKt7Siac?s=nZho-sEHDREJey7Tkg-Yt0Ym",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nZho-sEHDREJey7Tkg-Yt0Ym",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 101,
    "size": 511507195,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3673,
    "slug": "ravan-2011",
    "type": "film",
    "title": {
      "uz": "Ravan (2011)",
      "ru": "Ravan (2011)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ravan (2011)\nO'zbek Tilida [360p HD]\nDavlati: Hindiston, AQSH\nJanri: ,",
      "ru": "Ravan (2011)\nO'zbek Tilida [360p HD]\nDavlati: Hindiston, AQSH\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/d-lQHBYTcgnr?s=oTLvSpv-dIh-hEa2FplnE8V-",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oTLvSpv-dIh-hEa2FplnE8V-",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 127,
    "size": 459841897,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3674,
    "slug": "agent-007-oltin-barmoq-1964",
    "type": "film",
    "title": {
      "uz": "Agent 007: Oltin barmoq (1964)",
      "ru": "Agent 007: Oltin barmoq (1964)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Agent 007: Oltin barmoq (1964)\nO'zbek Tilida [480p/HD]\nDavlati: Buyuk Britaniya\nJanri: ,",
      "ru": "Agent 007: Oltin barmoq (1964)\nO'zbek Tilida [480p/HD]\nDavlati: Buyuk Britaniya\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rsRrLX8KaHqM?s=Oh8xj0nXaTpOpV29dz0sn74y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Oh8xj0nXaTpOpV29dz0sn74y",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 100,
    "size": 487187760,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3675,
    "slug": "nomi-karib-dengizi-qaroqchilari-qora-marvarid-tavqi-lanati",
    "type": "film",
    "title": {
      "uz": "Nomi: Karib dengizi qaroqchilari Qora Marvarid tavqi lan'ati",
      "ru": "Nomi: Karib dengizi qaroqchilari Qora Marvarid tavqi lan'ati"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Karib dengizi qaroqchilari Qora Marvarid tavqi lan'ati\nTili: Ózbekcha\nDavlat: Buyuk Britaniya\nJanri:",
      "ru": "Nomi: Karib dengizi qaroqchilari Qora Marvarid tavqi lan'ati\nTili: Ózbekcha\nDavlat: Buyuk Britaniya\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6cQDNapAGgF-?s=ZqXZjjxScGxar7nuqEselZnn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZqXZjjxScGxar7nuqEselZnn",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 143,
    "size": 557284726,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3676,
    "slug": "qudalar-2018",
    "type": "film",
    "title": {
      "uz": "Qudalar (2018)",
      "ru": "Qudalar (2018)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qudalar (2018)\nO'zbek Tilida [720p/HD]\nDavlati: Qozog'iston\nJanri:",
      "ru": "Qudalar (2018)\nO'zbek Tilida [720p/HD]\nDavlati: Qozog'iston\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xPj0_EKr898X?s=hka5EIra55k7BR8czNsWhnUy",
    "trailer": "",
    "video": "https://dezocloud.uz/s/hka5EIra55k7BR8czNsWhnUy",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 92,
    "size": 489013606,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3677,
    "slug": "ummon-qarida-2-2019",
    "type": "film",
    "title": {
      "uz": "Ummon Qarida 2 (2019)",
      "ru": "Ummon Qarida 2 (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ummon Qarida 2 (2019)\nO'zbek Tilida [Full/HD]\nDavlati: AQSH\nJanri: ʻrqinchli,",
      "ru": "Ummon Qarida 2 (2019)\nO'zbek Tilida [Full/HD]\nDavlati: AQSH\nJanri: ʻrqinchli,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/F3ociDebWMJl?s=ZSqNjUW9VWp_2C15gtkgSvdM",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ZSqNjUW9VWp_2C15gtkgSvdM",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 87,
    "size": 952642410,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3678,
    "slug": "nomi-jolli",
    "type": "film",
    "title": {
      "uz": "Nomi :Jolli",
      "ru": "Nomi :Jolli"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi :Jolli \nTili :ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ\nsɪғᴀᴛɪ: 360p \n546ᴍʙ\nJanri :#Sarguzasht",
      "ru": "Nomi :Jolli \nTili :ᴏ'ᴢʙᴇᴋ ᴛɪʟɪᴅᴀ\nsɪғᴀᴛɪ: 360p \n546ᴍʙ\nJanri :#Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/pW_m1D4AHfp5?s=nmLoWVE3NhyadOxllxZxadd3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nmLoWVE3NhyadOxllxZxadd3",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 126,
    "size": 572521575,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3679,
    "slug": "film-nomi-pakana-oshiq-ozbek-tilida",
    "type": "film",
    "title": {
      "uz": "Filм noмi: Pakana Oshiq (O'zbek tilida)",
      "ru": "Filм noмi: Pakana Oshiq (O'zbek tilida)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: Pakana Oshiq (O'zbek tilida)\nsifaтi: HD\nтili: Uzbek tilida\nкorisн: 6+\n Janri:",
      "ru": "Filм noмi: Pakana Oshiq (O'zbek tilida)\nsifaтi: HD\nтili: Uzbek tilida\nкorisн: 6+\n Janri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/P3LAUmQtHumK?s=Ku-d2_3g3eCGuDq4m60X5GAv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Ku-d2_3g3eCGuDq4m60X5GAv",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 124,
    "size": 864601849,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3680,
    "slug": "tasavvur-2018",
    "type": "film",
    "title": {
      "uz": "Tasavvur (2018)",
      "ru": "Tasavvur (2018)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Tasavvur (2018)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: , ,",
      "ru": "Tasavvur (2018)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZaDXn4-3TkBR?s=PJtvY64g0FgVVIuQw6e0Zn-W",
    "trailer": "",
    "video": "https://dezocloud.uz/s/PJtvY64g0FgVVIuQw6e0Zn-W",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 99,
    "size": 521575854,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3681,
    "slug": "lara-kroft-2-hayot-beshigi-2003",
    "type": "film",
    "title": {
      "uz": "Lara Kroft 2: Hayot beshigi (2003)",
      "ru": "Lara Kroft 2: Hayot beshigi (2003)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Lara Kroft 2: Hayot beshigi (2003)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller",
      "ru": "Lara Kroft 2: Hayot beshigi (2003)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IoHjmRGpAkGP?s=63aKFQHdq1oSMK6VQluNAlkV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/63aKFQHdq1oSMK6VQluNAlkV",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 102,
    "size": 506469194,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3682,
    "slug": "lara-kroft-1-muqaddima-2001",
    "type": "film",
    "title": {
      "uz": "Lara Kroft 1: Muqaddima (2001)",
      "ru": "Lara Kroft 1: Muqaddima (2001)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Lara Kroft 1: Muqaddima (2001)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller",
      "ru": "Lara Kroft 1: Muqaddima (2001)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/xN86029qLJ7m?s=rtPdqagduNM0lrNkwm7x65kT",
    "trailer": "",
    "video": "https://dezocloud.uz/s/rtPdqagduNM0lrNkwm7x65kT",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 382487398,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3683,
    "slug": "rojdestvenskaya-istoriya",
    "type": "film",
    "title": {
      "uz": "Рождественская история",
      "ru": "Рождественская история"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Рождественская история\nDavlat : AQSH , СЩА\nDavomiyligi: 01:35:00\nTarjima: Rus Tilida",
      "ru": "Рождественская история\nDavlat : AQSH , СЩА\nDavomiyligi: 01:35:00\nTarjima: Rus Tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/YjxqllwZdfJE?s=QQo74fThLh9NpY7xHbsAZ7jc",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QQo74fThLh9NpY7xHbsAZ7jc",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 96,
    "size": 596680215,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3684,
    "slug": "korinmaslar-2013",
    "type": "film",
    "title": {
      "uz": "KO'RINMASLAR (2013)",
      "ru": "KO'RINMASLAR (2013)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "KO'RINMASLAR (2013)\nO'zbek Tilida [480p/HD]\nDavlati: Rossiya\nJanri: Fentezi, Komediya, Sarguzasht, Oilaviy",
      "ru": "KO'RINMASLAR (2013)\nO'zbek Tilida [480p/HD]\nDavlati: Rossiya\nJanri: Fentezi, Komediya, Sarguzasht, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3uC3_Xp9ojSe?s=9sM6KPalZNPQdBjInVMynqOl",
    "trailer": "",
    "video": "https://dezocloud.uz/s/9sM6KPalZNPQdBjInVMynqOl",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 83,
    "size": 398905616,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3685,
    "slug": "qor-malikasi-multfilm-uzbek-tilida-2012",
    "type": "film",
    "title": {
      "uz": "Qor Malikasi (Multfilm, Uzbek tilida) 2012",
      "ru": "Qor Malikasi (Multfilm, Uzbek tilida) 2012"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎞 Qor Malikasi (Multfilm, Uzbek tilida) 2012",
      "ru": "🎞 Qor Malikasi (Multfilm, Uzbek tilida) 2012"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dQEt-u67cGXF?s=OjydhoXYB6YkX55KmFEcAuTQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/OjydhoXYB6YkX55KmFEcAuTQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 72,
    "size": 335156874,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3686,
    "slug": "shrek-4-2010",
    "type": "film",
    "title": {
      "uz": "Shrek 4 (2010)",
      "ru": "Shrek 4 (2010)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Shrek 4 (2010)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Komediya, Sarguzasht, Oilaviy",
      "ru": "Shrek 4 (2010)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Fentezi, Komediya, Sarguzasht, Oilaviy"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tAY-uas_P3MC?s=92VFq4AIERZEVs_dNxrd4hVV",
    "trailer": "",
    "video": "https://dezocloud.uz/s/92VFq4AIERZEVs_dNxrd4hVV",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 81,
    "size": 323102452,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3687,
    "slug": "bori-qizi-2019",
    "type": "film",
    "title": {
      "uz": "Bo'ri Qizi ( 2019 )",
      "ru": "Bo'ri Qizi ( 2019 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Bo'ri Qizi ( 2019 )\nO'zbek Tilida [720p/HD]\nDavlati: Kanada\nJanri: Jangari, Triller",
      "ru": "Bo'ri Qizi ( 2019 )\nO'zbek Tilida [720p/HD]\nDavlati: Kanada\nJanri: Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/etNdzitm9NY8?s=nLPCEkXp-3pBMUgH3L31ni-A",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nLPCEkXp-3pBMUgH3L31ni-A",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 84,
    "size": 566450119,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3688,
    "slug": "fokus-2015",
    "type": "film",
    "title": {
      "uz": "Fokus ( 2015 )",
      "ru": "Fokus ( 2015 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Fokus ( 2015 )\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: ,",
      "ru": "Fokus ( 2015 )\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/PmATv9U0BhMg?s=oVeL3kwfhkLdBlMgGpCCg19a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/oVeL3kwfhkLdBlMgGpCCg19a",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 89,
    "size": 557129516,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3689,
    "slug": "nomi-yuldizlar-jangi",
    "type": "film",
    "title": {
      "uz": "NOMI YULDIZLAR JANGI",
      "ru": "NOMI YULDIZLAR JANGI"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI YULDIZLAR JANGI\nSKAYUOKERNING YUKSALISHI\nDAVLAT AQSH\nCHQAN SANA 2019\nJANRI FANTASTIK\nFARMAT HD\nTILI RUS TILIDA\nDAVOMIYLIGI 2:11:32\nHAJMI 572 MB",
      "ru": "NOMI YULDIZLAR JANGI\nSKAYUOKERNING YUKSALISHI\nDAVLAT AQSH\nCHQAN SANA 2019\nJANRI FANTASTIK\nFARMAT HD\nTILI RUS TILIDA\nDAVOMIYLIGI 2:11:32\nHAJMI 572 MB"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/6g5tjA0hG_GY?s=xeL85R5KX2h8OOTG1xOwTJxS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/xeL85R5KX2h8OOTG1xOwTJxS",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 132,
    "size": 599731808,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3690,
    "slug": "telba-politsiyachi-2006",
    "type": "film",
    "title": {
      "uz": "Telba Politsiyachi (2006)",
      "ru": "Telba Politsiyachi (2006)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Telba Politsiyachi (2006)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Super Komediya",
      "ru": "Telba Politsiyachi (2006)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Super Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/XsObQBPxOeHX?s=Zs4GtJyUJaLhktcStW2nAsa_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Zs4GtJyUJaLhktcStW2nAsa_",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 91,
    "size": 754287746,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3691,
    "slug": "qahramon-narasima-reddi",
    "type": "film",
    "title": {
      "uz": "Qahramon Narasima Reddi",
      "ru": "Qahramon Narasima Reddi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qahramon Narasima Reddi\nO'zbek Tilida [480p/HD]\nDavlati: Hindiston (2019)\nJanri: Jangari, Tarixiy, Drama",
      "ru": "Qahramon Narasima Reddi\nO'zbek Tilida [480p/HD]\nDavlati: Hindiston (2019)\nJanri: Jangari, Tarixiy, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3KWcZCaq8eSh?s=m6_Dm3mDIxfgbLdIonRrhMgZ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/m6_Dm3mDIxfgbLdIonRrhMgZ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 158,
    "size": 579997409,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3692,
    "slug": "korinmas-oltovlon-2019",
    "type": "film",
    "title": {
      "uz": "Ko'rinmas Oltovlon (2019)",
      "ru": "Ko'rinmas Oltovlon (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ko'rinmas Oltovlon (2019)\nO'zbek Tilida [360p/HD]\nDavlati: AQSH\nJanri: Jangari, Triller",
      "ru": "Ko'rinmas Oltovlon (2019)\nO'zbek Tilida [360p/HD]\nDavlati: AQSH\nJanri: Jangari, Triller"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/irWEvUxQ7bR1?s=4l_A-wQ1u_4CJLfwuOx1G77j",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4l_A-wQ1u_4CJLfwuOx1G77j",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 115,
    "size": 487336656,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3693,
    "slug": "chempionlar-2016",
    "type": "film",
    "title": {
      "uz": "Chempionlar (2016)",
      "ru": "Chempionlar (2016)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Chempionlar (2016)\nO'zbek Tilida [720p/HD]\nDavlati: Rossiya\nJanri: Sport, Drama",
      "ru": "Chempionlar (2016)\nO'zbek Tilida [720p/HD]\nDavlati: Rossiya\nJanri: Sport, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/hggswJZSbVmu?s=x6SPqf95_xdYI0SkYVamd81v",
    "trailer": "",
    "video": "https://dezocloud.uz/s/x6SPqf95_xdYI0SkYVamd81v",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 100,
    "size": 926095117,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3694,
    "slug": "madagaskar-1-2005",
    "type": "film",
    "title": {
      "uz": "Madagaskar 1 (2005)",
      "ru": "Madagaskar 1 (2005)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Madagaskar 1 (2005)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: ,",
      "ru": "Madagaskar 1 (2005)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/chX21U_ZgrnJ?s=Aq1XOdVgl4UNLWhdvjJy7Dri",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Aq1XOdVgl4UNLWhdvjJy7Dri",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 82,
    "size": 357652561,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3695,
    "slug": "men-kimman-1998",
    "type": "film",
    "title": {
      "uz": "Men Kimman (1998)",
      "ru": "Men Kimman (1998)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Men Kimman (1998)\nO'zbek Tilida [480p/HD]\nDavlati: Xitoy\nJanri: ,",
      "ru": "Men Kimman (1998)\nO'zbek Tilida [480p/HD]\nDavlati: Xitoy\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/W_HRjWKRCOAE?s=chCNRgphhAz73puzOgjqaa9y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/chCNRgphhAz73puzOgjqaa9y",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 128,
    "size": 758486775,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3696,
    "slug": "shrek-2-shiroq-2004",
    "type": "film",
    "title": {
      "uz": "Shrek 2 \"Shiroq\" (2004)",
      "ru": "Shrek 2 \"Shiroq\" (2004)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Shrek 2 \"Shiroq\" (2004)\nO'zbek Tilida (Gobliddin Tarjima) \nDavlati: AQSH [480p/HD]\nJanri: , ,",
      "ru": "Shrek 2 \"Shiroq\" (2004)\nO'zbek Tilida (Gobliddin Tarjima) \nDavlati: AQSH [480p/HD]\nJanri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/s43yu3QAkorq?s=3zWSwL0l6X-E_FY1qK2ALXEh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3zWSwL0l6X-E_FY1qK2ALXEh",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 92,
    "size": 509733158,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3697,
    "slug": "sehrli-fudbol",
    "type": "film",
    "title": {
      "uz": "Sehrli Fudbol",
      "ru": "Sehrli Fudbol"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Sehrli Fudbol\n1:35:53 (390 Mb) \nMobile Version HD (480p)",
      "ru": "Sehrli Fudbol\n1:35:53 (390 Mb) \nMobile Version HD (480p)"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/S_IanvIhMqYk?s=QNJ_J2lyDBDMroI1KA3YiZo9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QNJ_J2lyDBDMroI1KA3YiZo9",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 96,
    "size": 409122515,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3698,
    "slug": "yulduzlar-sari-2019",
    "type": "film",
    "title": {
      "uz": "Yulduzlar sari (2019)",
      "ru": "Yulduzlar sari (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Yulduzlar sari (2019)\nO'zbek Tilida [480p/MobileHD]\nDavlati: AQSH, Xitoy, Braziliya\nJanri: , ,",
      "ru": "Yulduzlar sari (2019)\nO'zbek Tilida [480p/MobileHD]\nDavlati: AQSH, Xitoy, Braziliya\nJanri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/efdftcdmogxu?s=HMqCzWEWjw-Xdo4H3d3blcvQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/HMqCzWEWjw-Xdo4H3d3blcvQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 111,
    "size": 343673328,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3699,
    "slug": "nomi-buguning-parvozi",
    "type": "film",
    "title": {
      "uz": "Nomi Bug'uning Parvozi",
      "ru": "Nomi Bug'uning Parvozi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi Bug'uning Parvozi\nJanri Sarguzasht\nTili Ozbekcha",
      "ru": "Nomi Bug'uning Parvozi\nJanri Sarguzasht\nTili Ozbekcha"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/GeKT6PGlWBQb?s=1-FXoOF8DOEBrqGpwLRIV3Zo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1-FXoOF8DOEBrqGpwLRIV3Zo",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 71,
    "size": 220167978,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3700,
    "slug": "uyda-yolgiz-2-qism",
    "type": "film",
    "title": {
      "uz": "Uyda Yolg'iz 2-qism",
      "ru": "Uyda Yolg'iz 2-qism"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Uyda Yolg'iz 2-qism\nHammamiz Sevgan Uyda Yolg'iz Filmi\nUzbek Tilida",
      "ru": "Uyda Yolg'iz 2-qism\nHammamiz Sevgan Uyda Yolg'iz Filmi\nUzbek Tilida"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/9vHm4HKQkFtw?s=TSGuKVlKcR3bEoyAhoyyT7Uw",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TSGuKVlKcR3bEoyAhoyyT7Uw",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 111,
    "size": 335369370,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3701,
    "slug": "nomi-prikup",
    "type": "film",
    "title": {
      "uz": "Nomi: Прикуп",
      "ru": "Nomi: Прикуп"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 Nomi: Прикуп\n🎤 Tili: Rus tilida\n🎭 Janri: \n⏳ Davomiyligi: 2 soatu 53 minut\n💾 Hajmi: 814 mb\n📆 Sanasi: 2009\n▪️▪️▪️▪️▪️▪️▪️▪▪️",
      "ru": "🎬 Nomi: Прикуп\n🎤 Tili: Rus tilida\n🎭 Janri: \n⏳ Davomiyligi: 2 soatu 53 minut\n💾 Hajmi: 814 mb\n📆 Sanasi: 2009\n▪️▪️▪️▪️▪️▪️▪️▪▪️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/a1EcZCY8kKc2?s=EAFGZE7ODkoKNG0WbzAekmnh",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EAFGZE7ODkoKNG0WbzAekmnh",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 173,
    "size": 853248071,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3702,
    "slug": "nomi-prikup",
    "type": "film",
    "title": {
      "uz": "Nomi: Прикуп",
      "ru": "Nomi: Прикуп"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🎬 Nomi: Прикуп\n🎤 Tili: Rus tilida\n🎭 Janri: \n⏳ Davomiyligi: 2 soatu 53 minut\n💾 Hajmi: 814 mb\n📆 Sanasi: 2009\n▪️▪️▪️▪️▪️▪️▪️▪▪️ \n\nKino treyleri",
      "ru": "🎬 Nomi: Прикуп\n🎤 Tili: Rus tilida\n🎭 Janri: \n⏳ Davomiyligi: 2 soatu 53 minut\n💾 Hajmi: 814 mb\n📆 Sanasi: 2009\n▪️▪️▪️▪️▪️▪️▪️▪▪️ \n\nKino treyleri"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/thj9WAA7Haet?s=zUYR9zjISfZ7msKtch_iwhRY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zUYR9zjISfZ7msKtch_iwhRY",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 1,
    "size": 4341463,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3703,
    "slug": "nomi-soya-bilan-jang",
    "type": "film",
    "title": {
      "uz": "Nomi Soya bilan Jang",
      "ru": "Nomi Soya bilan Jang"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi Soya bilan Jang \nDavlat Rassia \nTil Uzbek tarjima \nFarmat HD\nJanir Jangari \nDavomiyligi 01:59:32",
      "ru": "Nomi Soya bilan Jang \nDavlat Rassia \nTil Uzbek tarjima \nFarmat HD\nJanir Jangari \nDavomiyligi 01:59:32"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ArtEOt_xRnLc?s=1duHRd20J33WJiFhx_KKlTsk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/1duHRd20J33WJiFhx_KKlTsk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 120,
    "size": 264283035,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3704,
    "slug": "muzlikda-yoqolganlar-2019",
    "type": "film",
    "title": {
      "uz": "Muzlikda yo'qolganlar (2019)",
      "ru": "Muzlikda yo'qolganlar (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Muzlikda yo'qolganlar (2019)\nO'zbek Tilida [720p/HD]\nDavlati: Islandiya\nJanri: ,",
      "ru": "Muzlikda yo'qolganlar (2019)\nO'zbek Tilida [720p/HD]\nDavlati: Islandiya\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/URqnDt4zgCyK?s=ERnvoOzlSq2kVDDHoYUgXPHi",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ERnvoOzlSq2kVDDHoYUgXPHi",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 93,
    "size": 390842072,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3705,
    "slug": "holodnoe-serdke-2",
    "type": "film",
    "title": {
      "uz": "Холодное сердце 2",
      "ru": "Холодное сердце 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Холодное сердце 2 - \nНа русском языке [480p/TS]\nСтрана: США (2019)\nЖанр: , ,",
      "ru": "Холодное сердце 2 - \nНа русском языке [480p/TS]\nСтрана: США (2019)\nЖанр: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1JnGXeTkdgcl?s=RDFKozV5JpkvpljMHsvTIYyL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/RDFKozV5JpkvpljMHsvTIYyL",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 92,
    "size": 382292705,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3706,
    "slug": "everest-2019",
    "type": "film",
    "title": {
      "uz": "Everest (2019)",
      "ru": "Everest (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Everest (2019) - \nO'zbek Tilida [720p/HD]\nDavlati: AQSH, Xitoy \nJanri: , , .",
      "ru": "Everest (2019) - \nO'zbek Tilida [720p/HD]\nDavlati: AQSH, Xitoy \nJanri: , , ."
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RBwBpLq9uyd8?s=7t_QSxjzh72h7p-m35XemRl5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/7t_QSxjzh72h7p-m35XemRl5",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 720825220,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3707,
    "slug": "qishning-birinchi-kuni-bilan",
    "type": "film",
    "title": {
      "uz": "Qishning birinchi kuni bilan",
      "ru": "Qishning birinchi kuni bilan"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qishning birinchi kuni bilan\n\nFilм noмi: Niqob \nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 12+\nJanri:",
      "ru": "Qishning birinchi kuni bilan\n\nFilм noмi: Niqob \nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 12+\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rasjwTOeEa0b?s=JvRbkbXOTZDSURK7RCBO2Mw9",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JvRbkbXOTZDSURK7RCBO2Mw9",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 88,
    "size": 802914546,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3708,
    "slug": "multifilm-nomi-uy-hayvonlarining-sirli-hayoti-2",
    "type": "film",
    "title": {
      "uz": "MultiFilм noмi: Uy hayvonlarining sirli hayoti 2",
      "ru": "MultiFilм noмi: Uy hayvonlarining sirli hayoti 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "MultiFilм noмi: Uy hayvonlarining sirli hayoti 2 \nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 16+\nJanri: \nYili: 2019",
      "ru": "MultiFilм noмi: Uy hayvonlarining sirli hayoti 2 \nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 16+\nJanri: \nYili: 2019"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/RQmKBX1I9FDx?s=JL2KMNPB7aqBAe1levhNKdK8",
    "trailer": "",
    "video": "https://dezocloud.uz/s/JL2KMNPB7aqBAe1levhNKdK8",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 86,
    "size": 478145025,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3709,
    "slug": "nomi-qorboboni-qutqarish",
    "type": "film",
    "title": {
      "uz": "Nomi:Qorboboni Qutqarish",
      "ru": "Nomi:Qorboboni Qutqarish"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi:Qorboboni Qutqarish\nJanri:#Komediya\nTili: O'zbekcha \n\nQishning kelayotgan kuniga\nbaģishlanib",
      "ru": "Nomi:Qorboboni Qutqarish\nJanri:#Komediya\nTili: O'zbekcha \n\nQishning kelayotgan kuniga\nbaģishlanib"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Z0Y07y7bjZCK?s=eUSKkl3Id59PSrtuSJbqbc7Y",
    "trailer": "",
    "video": "https://dezocloud.uz/s/eUSKkl3Id59PSrtuSJbqbc7Y",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 76,
    "size": 232166467,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3710,
    "slug": "dambo-1941",
    "type": "film",
    "title": {
      "uz": "Dambo ( 1941 )",
      "ru": "Dambo ( 1941 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Dambo ( 1941 )\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: , ,",
      "ru": "Dambo ( 1941 )\nO'zbek Tilida [720p/HD]\nDavlati: AQSH\nJanri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZA6B-9mpMn3l?s=jzMQmWclOQJ9riYDioxM1vd_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/jzMQmWclOQJ9riYDioxM1vd_",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 63,
    "size": 998308362,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3711,
    "slug": "film-nomi-rembo-oxirgi-jang",
    "type": "film",
    "title": {
      "uz": "Filм noмi: Rembo: Oxirgi Jang",
      "ru": "Filм noмi: Rembo: Oxirgi Jang"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Filм noмi: Rembo: Oxirgi Jang\nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 16+\nJanri: \nYili: 2019",
      "ru": "Filм noмi: Rembo: Oxirgi Jang\nsifaтi: Mobile Hd\nтili: Uzbek tilida\nкorisн: 16+\nJanri: \nYili: 2019"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Um8Eh8HVRCF-?s=N9XfQ6bokrr9ZjXK18QOjdhG",
    "trailer": "",
    "video": "https://dezocloud.uz/s/N9XfQ6bokrr9ZjXK18QOjdhG",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 87,
    "size": 506769383,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3712,
    "slug": "maxluqlar-tatilda-2012",
    "type": "film",
    "title": {
      "uz": "Maxluqlar ta'tilda ( 2012 )",
      "ru": "Maxluqlar ta'tilda ( 2012 )"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Maxluqlar ta'tilda ( 2012 )\nO'zbek Tilida [360p/HD]\nDavlati: AQSH\nJanri: ,",
      "ru": "Maxluqlar ta'tilda ( 2012 )\nO'zbek Tilida [360p/HD]\nDavlati: AQSH\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ipt2AlIFyGvq?s=bRpRzRk3J64NkpFLyuVt7guE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/bRpRzRk3J64NkpFLyuVt7guE",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 80,
    "size": 212533438,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3713,
    "slug": "gemini-2019",
    "type": "film",
    "title": {
      "uz": "Gemini (2019)",
      "ru": "Gemini (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Gemini (2019) \nO'zbek Tilida [480p/📱HD]\nDavlati: AQSH, Xitoy\nJanri: , ,",
      "ru": "Gemini (2019) \nO'zbek Tilida [480p/📱HD]\nDavlati: AQSH, Xitoy\nJanri: , ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NQI6s9E3Lt-C?s=Qa_boG8WPYDRnIpEbnTIg2rQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Qa_boG8WPYDRnIpEbnTIg2rQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 376709864,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3714,
    "slug": "nomi-men-afsonaman",
    "type": "film",
    "title": {
      "uz": "Nomi: Men afsonaman",
      "ru": "Nomi: Men afsonaman"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Men afsonaman\nDavlat: AQSH\nJanri:",
      "ru": "Nomi: Men afsonaman\nDavlat: AQSH\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rBwtpOtronfo?s=YhJJvBN4w5TeVtqeAoC5kbig",
    "trailer": "",
    "video": "https://dezocloud.uz/s/YhJJvBN4w5TeVtqeAoC5kbig",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 100,
    "size": 388068200,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3715,
    "slug": "nomi-orol",
    "type": "film",
    "title": {
      "uz": "Nomi: Orol",
      "ru": "Nomi: Orol"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Orol\nTili: Ózbekcha \nDavlat: AQSH\nJanri: #krimal",
      "ru": "Nomi: Orol\nTili: Ózbekcha \nDavlat: AQSH\nJanri: #krimal"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JKyDjubR00Gg?s=S_GgwJF7dNIRjBDLKGJl6MdA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S_GgwJF7dNIRjBDLKGJl6MdA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 130,
    "size": 889989082,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3716,
    "slug": "nomi-uchinchisi-ortiqcha",
    "type": "film",
    "title": {
      "uz": "Nomi: Uchinchisi ortiqcha",
      "ru": "Nomi: Uchinchisi ortiqcha"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Uchinchisi ortiqcha\nJanri:",
      "ru": "Nomi: Uchinchisi ortiqcha\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/tO4BA-DLYuxi?s=ftMUXtXVfcNk3QA2T1n0Hpjm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ftMUXtXVfcNk3QA2T1n0Hpjm",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 106,
    "size": 409468611,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3717,
    "slug": "nomi-joker",
    "type": "film",
    "title": {
      "uz": "Nomi: Joker",
      "ru": "Nomi: Joker"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Joker\nTili: Ózbekcha \nJanri: #komediya",
      "ru": "Nomi: Joker\nTili: Ózbekcha \nJanri: #komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/CFoImHtxxL9f?s=S424oDTUw27q8TMouEFP4Lir",
    "trailer": "",
    "video": "https://dezocloud.uz/s/S424oDTUw27q8TMouEFP4Lir",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 115,
    "size": 453049108,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3718,
    "slug": "nomi-xishnik",
    "type": "film",
    "title": {
      "uz": "Nomi: Xishnik",
      "ru": "Nomi: Xishnik"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi: Xishnik\nTili: Rus tili\nJanri:",
      "ru": "Nomi: Xishnik\nTili: Rus tili\nJanri:"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/E8K-RvtYg3g6?s=TXNjDGDKEi1YyMMCJrSl-oIQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TXNjDGDKEi1YyMMCJrSl-oIQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 108,
    "size": 475238854,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3719,
    "slug": "nomi-aqsh",
    "type": "film",
    "title": {
      "uz": "Nomi:AQSH",
      "ru": "Nomi:AQSH"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi:AQSH\nTili:rus tilida\nJanri:#fantastic#jangari",
      "ru": "Nomi:AQSH\nTili:rus tilida\nJanri:#fantastic#jangari"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/G5Blu9Tfc1Hn?s=87N_zGsgxJUZqfo4BXu7DJCa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/87N_zGsgxJUZqfo4BXu7DJCa",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 102,
    "size": 424455001,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3720,
    "slug": "nomi-bori-odam",
    "type": "film",
    "title": {
      "uz": "Nomi:Bori odam",
      "ru": "Nomi:Bori odam"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi:Bori odam\nJanri:#qorqinchili",
      "ru": "Nomi:Bori odam\nJanri:#qorqinchili"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/52RvV3o1ul8Q?s=NupVm7UsHOc75mJa-RdzUqCt",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NupVm7UsHOc75mJa-RdzUqCt",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 112,
    "size": 252565844,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3721,
    "slug": "nomi-piter-pen",
    "type": "film",
    "title": {
      "uz": "Nomi:Piter Pen",
      "ru": "Nomi:Piter Pen"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nomi:Piter Pen\nÕzbek tilida\nJanri:#Sarguzasht",
      "ru": "Nomi:Piter Pen\nÕzbek tilida\nJanri:#Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/QWLPvqYeqAiV?s=QvCqC4nzO81lwp8no3ZFLH_w",
    "trailer": "",
    "video": "https://dezocloud.uz/s/QvCqC4nzO81lwp8no3ZFLH_w",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 707022727,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3722,
    "slug": "qor-tozalovchi-2019",
    "type": "film",
    "title": {
      "uz": "Qor Tozalovchi (2019)",
      "ru": "Qor Tozalovchi (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Qor Tozalovchi (2019)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH, B.Britaniya, Norvegiya, Kanada, Fransiya, Germaniya\nJanri: ,",
      "ru": "Qor Tozalovchi (2019)\nO'zbek Tilida [720p/HD]\nDavlati: AQSH, B.Britaniya, Norvegiya, Kanada, Fransiya, Germaniya\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ktVJsAaWhRU8?s=8wXABo6fGznGJVm4wmi618rO",
    "trailer": "",
    "video": "https://dezocloud.uz/s/8wXABo6fGznGJVm4wmi618rO",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 103,
    "size": 572106456,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3723,
    "slug": "naruto-92-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 92 серия",
      "ru": "Наруто 92 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐸Наруто 92 серия🐸",
      "ru": "🐸Наруто 92 серия🐸"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rUjFDp2xa9Ak?s=zaxeRVRo4GPomU3gz7TEySjK",
    "trailer": "",
    "video": "https://dezocloud.uz/s/zaxeRVRo4GPomU3gz7TEySjK",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106111387,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3724,
    "slug": "naruto-98-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 98 серия",
      "ru": "Наруто 98 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌊Наруто 98 серия🌊",
      "ru": "🌊Наруто 98 серия🌊"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/d55SJx0pCUG-?s=-OexjloOJoSgMEDs1k49I16N",
    "trailer": "",
    "video": "https://dezocloud.uz/s/-OexjloOJoSgMEDs1k49I16N",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106317826,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3725,
    "slug": "naruto-91-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 91 серия",
      "ru": "Наруто 91 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🍡Наруто 91 серия🍡",
      "ru": "🍡Наруто 91 серия🍡"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/U3lZqn9I-TMQ?s=qInDgyktSLzTvoo6OJv5KkTa",
    "trailer": "",
    "video": "https://dezocloud.uz/s/qInDgyktSLzTvoo6OJv5KkTa",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 105987942,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3726,
    "slug": "ensoning-garoyib-hayoti",
    "type": "film",
    "title": {
      "uz": "Ensoning gʻaroyib hayoti",
      "ru": "Ensoning gʻaroyib hayoti"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ensoning gʻaroyib hayoti\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2019)\nJanri: Komediya, Drama",
      "ru": "Ensoning gʻaroyib hayoti\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2019)\nJanri: Komediya, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Pol0jxHc8pKY?s=fVjxv7VMiYzkYOHiH3lKC59B",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fVjxv7VMiYzkYOHiH3lKC59B",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 98,
    "size": 469111703,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3727,
    "slug": "naruto-88-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 88 серия",
      "ru": "Наруто 88 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌐Наруто 88 серия🌐",
      "ru": "🌐Наруто 88 серия🌐"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mJqMGSHqYc6d?s=T_n_3P6QxtLbPNy3VbP8q9DP",
    "trailer": "",
    "video": "https://dezocloud.uz/s/T_n_3P6QxtLbPNy3VbP8q9DP",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106214255,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3728,
    "slug": "naruto-90-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 90 серия",
      "ru": "Наруто 90 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "⛰Наруто 90 серия⛰",
      "ru": "⛰Наруто 90 серия⛰"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eqIQJjXuwKLN?s=lCxTi8tO4rSPFT9prQfvJIAd",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lCxTi8tO4rSPFT9prQfvJIAd",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106228206,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3729,
    "slug": "naruto-89-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 89 серия",
      "ru": "Наруто 89 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👅Наруто 89 серия👅",
      "ru": "👅Наруто 89 серия👅"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/hqH43wgTwffW?s=EKlTNrAXAzeOTmTu_ijtsa-t",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EKlTNrAXAzeOTmTu_ijtsa-t",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106305358,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3730,
    "slug": "naruto-86-87-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 86-87 серия",
      "ru": "Наруто 86-87 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "㊙️Наруто 86-87 серия🉐",
      "ru": "㊙️Наруто 86-87 серия🉐"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TWMIsVwDF6nV?s=Me4ev6jVPYgnQCvkmGDj8ObL",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Me4ev6jVPYgnQCvkmGDj8ObL",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 196638688,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3731,
    "slug": "naruto-85-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 85 серия",
      "ru": "Наруто 85 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🔥Наруто 85 серия🔥",
      "ru": "🔥Наруто 85 серия🔥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/_PtJr6ilE0rN?s=pVvrWO4uxkDRvuvur-QDscjf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/pVvrWO4uxkDRvuvur-QDscjf",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106221514,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3732,
    "slug": "naruto-84-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 84 серия",
      "ru": "Наруто 84 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🥁Наруто 84 серия🥁",
      "ru": "🥁Наруто 84 серия🥁"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/KdA-tO1WrCpt?s=WbrD72sE8w_U-Y3CQo2nuRdp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WbrD72sE8w_U-Y3CQo2nuRdp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106207651,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3733,
    "slug": "naruto-83-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 83 серия",
      "ru": "Наруто 83 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🆘Наруто 83 серия🆘",
      "ru": "🆘Наруто 83 серия🆘"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JM-axn9ExYli?s=lg-1STUucMrHTtCRhLPYyaqQ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/lg-1STUucMrHTtCRhLPYyaqQ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106243020,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3734,
    "slug": "naruto-82-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 82 серия",
      "ru": "Наруто 82 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👀Наруто 82 серия👀",
      "ru": "👀Наруто 82 серия👀"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZlJNcZXvwz8K?s=KjWzCSws7aXfnNrJ3AhYs8St",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KjWzCSws7aXfnNrJ3AhYs8St",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106275705,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3735,
    "slug": "naruto-81-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 81 серия",
      "ru": "Наруто 81 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📜Наруто 81 серия📜",
      "ru": "📜Наруто 81 серия📜"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/bf1eD-ifIwrM?s=CCh6VcixZP2BYz-hKRpFqvVm",
    "trailer": "",
    "video": "https://dezocloud.uz/s/CCh6VcixZP2BYz-hKRpFqvVm",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106243772,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3736,
    "slug": "pele-rojdenie-legendy-pele-birth-of-a-legend-pele-2016-biogr",
    "type": "film",
    "title": {
      "uz": "Пеле: Рождение легенды / Pele: Birth of a Legend Pele) (2016) / Биография",
      "ru": "Пеле: Рождение легенды / Pele: Birth of a Legend Pele) (2016) / Биография"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📹 Пеле: Рождение легенды / Pele: Birth of a Legend Pele) (2016) / Биография",
      "ru": "📹 Пеле: Рождение легенды / Pele: Birth of a Legend Pele) (2016) / Биография"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IRqCgcgea4RJ?s=Iw3Kc680F4GYQ5Km0cybmH-C",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Iw3Kc680F4GYQ5Km0cybmH-C",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 107,
    "size": 410469553,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3737,
    "slug": "kod-8-2019",
    "type": "film",
    "title": {
      "uz": "Kod 8 (2019)",
      "ru": "Kod 8 (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Kod 8 (2019) \nO'zbek Tilida [480p/HD]\nDavlati: Kanada\nJanri: Jangari, Fantastika",
      "ru": "Kod 8 (2019) \nO'zbek Tilida [480p/HD]\nDavlati: Kanada\nJanri: Jangari, Fantastika"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/quAlkyBWC6_e?s=MXSv4AXwJSkiEiVKZM1KhOEH",
    "trailer": "",
    "video": "https://dezocloud.uz/s/MXSv4AXwJSkiEiVKZM1KhOEH",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 79,
    "size": 495734785,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3738,
    "slug": "bruklinda-yolgiz-2019",
    "type": "film",
    "title": {
      "uz": "Bruklinda Yolg'iz (2019)",
      "ru": "Bruklinda Yolg'iz (2019)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Bruklinda Yolg'iz (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Kriminal, Drama",
      "ru": "Bruklinda Yolg'iz (2019)\nO'zbek Tilida [480p/HD]\nDavlati: AQSH\nJanri: Kriminal, Drama"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/K19UeYd3jh0G?s=emHiW25QIMU5gnq1RX_M9cOF",
    "trailer": "",
    "video": "https://dezocloud.uz/s/emHiW25QIMU5gnq1RX_M9cOF",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 137,
    "size": 569043483,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3739,
    "slug": "naruto-80-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 80 серия",
      "ru": "Наруто 80 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💧Наруто 80 серия💧",
      "ru": "💧Наруто 80 серия💧"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WeC46pm0kZEp?s=NGauBthgRgTKXVO762Jp1SpA",
    "trailer": "",
    "video": "https://dezocloud.uz/s/NGauBthgRgTKXVO762Jp1SpA",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106191015,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3740,
    "slug": "naruto-76-77-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 76-77 серия",
      "ru": "Наруто 76-77 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦎Наруто 76-77 серия🦎",
      "ru": "🦎Наруто 76-77 серия🦎"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sN5bnhqLRgrn?s=4wHYJSoGECv5L8dHHQR0o5I6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4wHYJSoGECv5L8dHHQR0o5I6",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 198970375,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3741,
    "slug": "naruto-75-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 75 серия",
      "ru": "Наруто 75 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🍜Наруто 75 серия🍜",
      "ru": "🍜Наруто 75 серия🍜"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/k9qcoBcBjyzy?s=KCgCvA3mu29FjWgeihz87nYo",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KCgCvA3mu29FjWgeihz87nYo",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106149038,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3742,
    "slug": "naruto-74-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 74 серия",
      "ru": "Наруто 74 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "✨Наруто 74 серия✨",
      "ru": "✨Наруто 74 серия✨"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iwJHvzLlyGa-?s=tVRw-kMDM35E7UTSSqLfSuMp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tVRw-kMDM35E7UTSSqLfSuMp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106243667,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3743,
    "slug": "naruto-73-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 73 серия",
      "ru": "Наруто 73 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌿Наруто 73 серия🌿",
      "ru": "🌿Наруто 73 серия🌿"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/yxahlP2zKs1X?s=27fSvpr_dkiR5Rz-vdG6eAQu",
    "trailer": "",
    "video": "https://dezocloud.uz/s/27fSvpr_dkiR5Rz-vdG6eAQu",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 105123640,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3744,
    "slug": "naruto-78-79-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 78-79 серия",
      "ru": "Наруто 78-79 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧠Наруто 78-79 серия🧠",
      "ru": "🧠Наруто 78-79 серия🧠"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/mBzYWXCyj-r9?s=i8gCpF-KWBHVRq7vJcbPTjz7",
    "trailer": "",
    "video": "https://dezocloud.uz/s/i8gCpF-KWBHVRq7vJcbPTjz7",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 199128059,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3745,
    "slug": "naruto-72-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 72 серия",
      "ru": "Наруто 72 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧨Наруто 72 серия🧨",
      "ru": "🧨Наруто 72 серия🧨"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TbKcWBsjxjuo?s=aGWxtv-I8JMswLy4jU9VWR_a",
    "trailer": "",
    "video": "https://dezocloud.uz/s/aGWxtv-I8JMswLy4jU9VWR_a",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 105196750,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3746,
    "slug": "naruto-71-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 71 серия",
      "ru": "Наруто 71 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦴Наруто 71 серия🦴",
      "ru": "🦴Наруто 71 серия🦴"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/qXzO3MfhQY1E?s=L8b8cBCk9M2zRGcoKnLwZcmv",
    "trailer": "",
    "video": "https://dezocloud.uz/s/L8b8cBCk9M2zRGcoKnLwZcmv",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 105075769,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3747,
    "slug": "ninza-2-koz-yosh-soyasi",
    "type": "film",
    "title": {
      "uz": "Ninza 2: Ko'z yosh soyasi",
      "ru": "Ninza 2: Ko'z yosh soyasi"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Ninza 2: Ko'z yosh soyasi\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2013)\nJanri: ,",
      "ru": "Ninza 2: Ko'z yosh soyasi\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2013)\nJanri: ,"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/4PdpLWPMs2FN?s=etMUG3jDb5RsXR0ylSIxVKwb",
    "trailer": "",
    "video": "https://dezocloud.uz/s/etMUG3jDb5RsXR0ylSIxVKwb",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 89,
    "size": 474154481,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3748,
    "slug": "jumanji-keyingi-bosqich",
    "type": "film",
    "title": {
      "uz": "Jumanji: Keyingi bosqich",
      "ru": "Jumanji: Keyingi bosqich"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Jumanji: Keyingi bosqich\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2019)\nJanri: Jangari, Sarguzasht, Komediya",
      "ru": "Jumanji: Keyingi bosqich\nO'zbek Tilida [480p/HD]\nDavlati: AQSH (2019)\nJanri: Jangari, Sarguzasht, Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/1L5PSQ7t4NNG?s=ltBXiHeAnlvY9VjSauBMSYvl",
    "trailer": "",
    "video": "https://dezocloud.uz/s/ltBXiHeAnlvY9VjSauBMSYvl",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 114,
    "size": 459156186,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3749,
    "slug": "naruto-70-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 70 серия",
      "ru": "Наруто 70 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💧Наруто 70 серия💧",
      "ru": "💧Наруто 70 серия💧"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/TivU35JBFv8Q?s=N69KeDJZT86UsR5t8n3mc3KS",
    "trailer": "",
    "video": "https://dezocloud.uz/s/N69KeDJZT86UsR5t8n3mc3KS",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 105044949,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3750,
    "slug": "naruto-68-69-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 68-69 серия",
      "ru": "Наруто 68-69 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦊Наруто 68-69 серия🦊",
      "ru": "🦊Наруто 68-69 серия🦊"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/t94W9GXu21Ui?s=IMgUWBtiVfYgtTP9Mirl_hRU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/IMgUWBtiVfYgtTP9Mirl_hRU",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 196382511,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3751,
    "slug": "naruto-67-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 67 серия",
      "ru": "Наруто 67 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💀Наруто 67 серия💀",
      "ru": "💀Наруто 67 серия💀"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/ZinE71la6mwS?s=5iNGVeO6KoHYlJ7z2t7ZZg4c",
    "trailer": "",
    "video": "https://dezocloud.uz/s/5iNGVeO6KoHYlJ7z2t7ZZg4c",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106203943,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3752,
    "slug": "naruto-66-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 66 серия",
      "ru": "Наруто 66 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👻Наруто 66 серия👻",
      "ru": "👻Наруто 66 серия👻"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/WDZHIGenXPmZ?s=DIiKPLhyZ0kULUp6R9doTIyZ",
    "trailer": "",
    "video": "https://dezocloud.uz/s/DIiKPLhyZ0kULUp6R9doTIyZ",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 107824338,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3753,
    "slug": "naruto-64-65-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 64-65 серия",
      "ru": "Наруто 64-65 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "☄️Наруто 64-65 серия☄️",
      "ru": "☄️Наруто 64-65 серия☄️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/FSKHItiu9wRb?s=A1VNSspKKspSZkL7LenM_86D",
    "trailer": "",
    "video": "https://dezocloud.uz/s/A1VNSspKKspSZkL7LenM_86D",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 198755381,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3754,
    "slug": "naruto-62-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 62 серия",
      "ru": "Наруто 62 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌾Наруто 62 серия🌾",
      "ru": "🌾Наруто 62 серия🌾"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/vJTpVrlYzNNd?s=0hv6iE2KsklmWyr-Pyd9q4kE",
    "trailer": "",
    "video": "https://dezocloud.uz/s/0hv6iE2KsklmWyr-Pyd9q4kE",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 107785430,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3755,
    "slug": "naruto-63-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 63 серия",
      "ru": "Наруто 63 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👑Наруто 63 серия👑",
      "ru": "👑Наруто 63 серия👑"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/28Nei_lR_Os6?s=6w3ctAG0q6ZbTCBaeWsUXfoI",
    "trailer": "",
    "video": "https://dezocloud.uz/s/6w3ctAG0q6ZbTCBaeWsUXfoI",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 107852474,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3756,
    "slug": "naruto-61-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 61 серия",
      "ru": "Наруто 61 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🧶Наруто 61 серия🧶",
      "ru": "🧶Наруто 61 серия🧶"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/y-grz1icCuMo?s=J6DjgcDTIfP55FRt2W9qlxs2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/J6DjgcDTIfP55FRt2W9qlxs2",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 106197738,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3757,
    "slug": "nomi-alovuddinning-sarguzashtlari-2",
    "type": "film",
    "title": {
      "uz": "NOMI Alovuddinning sarguzashtlari 2",
      "ru": "NOMI Alovuddinning sarguzashtlari 2"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "NOMI Alovuddinning sarguzashtlari 2\ndavlat AQSH\ntili O'ZBEK TILIDA\nformati HD\njanri \ndavomiyligi 01:25:12\nhajmi 306.8 mb",
      "ru": "NOMI Alovuddinning sarguzashtlari 2\ndavlat AQSH\ntili O'ZBEK TILIDA\nformati HD\njanri \ndavomiyligi 01:25:12\nhajmi 306.8 mb"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/k8hanXg8BcVm?s=a7Tm-_bhDbks1vBPR9DDgNRn",
    "trailer": "",
    "video": "https://dezocloud.uz/s/a7Tm-_bhDbks1vBPR9DDgNRn",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 85,
    "size": 321693822,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3758,
    "slug": "jumanji-jungli-chorlovi-2017",
    "type": "film",
    "title": {
      "uz": "Jumanji: jungli chorlovi (2017)",
      "ru": "Jumanji: jungli chorlovi (2017)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Jumanji: jungli chorlovi (2017)\nO'zbek Tilida [360p/SD]\nDavlati: AQSH\nJanri: Komediya",
      "ru": "Jumanji: jungli chorlovi (2017)\nO'zbek Tilida [360p/SD]\nDavlati: AQSH\nJanri: Komediya"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/IEZn99W9WaDQ?s=tCgYTIo9X-cj8qSeVzazLmRW",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tCgYTIo9X-cj8qSeVzazLmRW",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 99,
    "size": 203149486,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3759,
    "slug": "jumanji-1995-djumandji",
    "type": "film",
    "title": {
      "uz": "Jumanji (1995) Джуманджи",
      "ru": "Jumanji (1995) Джуманджи"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Jumanji (1995) Джуманджи\nO'zbek Tilida [360p/SD]\nDavlati: AQSH\nJanri: Komediya, Sarguzasht",
      "ru": "Jumanji (1995) Джуманджи\nO'zbek Tilida [360p/SD]\nDavlati: AQSH\nJanri: Komediya, Sarguzasht"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/-TLC8bp4LfDW?s=gYlbIwTF6fsLH-8r8c5DbqJq",
    "trailer": "",
    "video": "https://dezocloud.uz/s/gYlbIwTF6fsLH-8r8c5DbqJq",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 104,
    "size": 404485938,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3760,
    "slug": "nindzya-2009",
    "type": "film",
    "title": {
      "uz": "Nindzya (2009)",
      "ru": "Nindzya (2009)"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "Nindzya (2009) \nO'zbek Tilida [480p/HD] Original\nDavlati: AQSH\nJanri: Jangari, Kriminal",
      "ru": "Nindzya (2009) \nO'zbek Tilida [480p/HD] Original\nDavlati: AQSH\nJanri: Jangari, Kriminal"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/3-VU4iQt0UYV?s=Kt03ONhLeB-MuryM1zpi_crX",
    "trailer": "",
    "video": "https://dezocloud.uz/s/Kt03ONhLeB-MuryM1zpi_crX",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 84,
    "size": 342802029,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3761,
    "slug": "naruto-57-58-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 57-58 серия",
      "ru": "Наруто 57-58 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐱Наруто 57-58 серия🐱",
      "ru": "🐱Наруто 57-58 серия🐱"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/O1o_cy7bVrrQ?s=M6g5KWAwU1IjKz6XAJr5n3l4",
    "trailer": "",
    "video": "https://dezocloud.uz/s/M6g5KWAwU1IjKz6XAJr5n3l4",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 43,
    "size": 370403181,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3762,
    "slug": "naruto-56-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 56 серия",
      "ru": "Наруто 56 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌪Наруто 56 серия🌪",
      "ru": "🌪Наруто 56 серия🌪"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/cdpYbIavfOCa?s=tVOpfFYQ4JhEKWyIY9CNpEon",
    "trailer": "",
    "video": "https://dezocloud.uz/s/tVOpfFYQ4JhEKWyIY9CNpEon",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200510773,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3763,
    "slug": "naruto-55-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 55 серия",
      "ru": "Наруто 55 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💤Наруто 55 серия💤",
      "ru": "💤Наруто 55 серия💤"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/NxY4xmeEWF9t?s=KH2MuFwVnq06ll6F2ik-rhLk",
    "trailer": "",
    "video": "https://dezocloud.uz/s/KH2MuFwVnq06ll6F2ik-rhLk",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 461919849,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3764,
    "slug": "naruto-54-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 54 серия",
      "ru": "Наруто 54 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💨Наруто 54 серия💨",
      "ru": "💨Наруто 54 серия💨"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/MNcsBiWv0dNX?s=vC1H4qqQ9G3y3DtG4BGPJ1qf",
    "trailer": "",
    "video": "https://dezocloud.uz/s/vC1H4qqQ9G3y3DtG4BGPJ1qf",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201106669,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3765,
    "slug": "naruto-53-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 53 серия",
      "ru": "Наруто 53 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐸Наруто 53 серия🐸",
      "ru": "🐸Наруто 53 серия🐸"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/dwps1LcUuFlu?s=EH92wSVcBpKxHOYSkFMaP3v1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EH92wSVcBpKxHOYSkFMaP3v1",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 202268982,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3766,
    "slug": "naruto-52-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 52 серия",
      "ru": "Наруто 52 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👁Наруто 52 серия👁",
      "ru": "👁Наруто 52 серия👁"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/EQIPZLDxX5wa?s=kTVuxSMTHWsxH2K-bdvrSwGp",
    "trailer": "",
    "video": "https://dezocloud.uz/s/kTVuxSMTHWsxH2K-bdvrSwGp",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201031832,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3767,
    "slug": "naruto-51-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 51 серия",
      "ru": "Наруто 51 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "⚖️Наруто 51 серия⚖️",
      "ru": "⚖️Наруто 51 серия⚖️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/8kcA-ck17Mex?s=icm0SlHAAzWCN5Tv_QS4IlKY",
    "trailer": "",
    "video": "https://dezocloud.uz/s/icm0SlHAAzWCN5Tv_QS4IlKY",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201229272,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3768,
    "slug": "naruto-50-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 50 серия",
      "ru": "Наруто 50 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐀Наруто 50 серия🐀",
      "ru": "🐀Наруто 50 серия🐀"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/f6J_5Uk-lhuW?s=nRS8f3WUyHj4PdpKJJI5OdeN",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nRS8f3WUyHj4PdpKJJI5OdeN",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200967171,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3769,
    "slug": "naruto-49-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 49 серия",
      "ru": "Наруто 49 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🏹Наруто 49 серия🏹",
      "ru": "🏹Наруто 49 серия🏹"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Q3GopJXv_Y7Y?s=fINjpR9AUyEOfwpTnloWBW-c",
    "trailer": "",
    "video": "https://dezocloud.uz/s/fINjpR9AUyEOfwpTnloWBW-c",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200871250,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3770,
    "slug": "naruto-48-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 48 серия",
      "ru": "Наруто 48 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "♻️Наруто 48 серия♻️",
      "ru": "♻️Наруто 48 серия♻️"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/BqOqyQqF7DxP?s=TAwHu6JmohzmyQr_Yu3hf38X",
    "trailer": "",
    "video": "https://dezocloud.uz/s/TAwHu6JmohzmyQr_Yu3hf38X",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 202006724,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3771,
    "slug": "naruto-47-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 47 серия",
      "ru": "Наруто 47 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "👣Наруто 47 серия👣",
      "ru": "👣Наруто 47 серия👣"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/Sj8hDX0fx6OQ?s=EWPMDhyauOamy8zXzTBOprB1",
    "trailer": "",
    "video": "https://dezocloud.uz/s/EWPMDhyauOamy8zXzTBOprB1",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201106479,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3772,
    "slug": "naruto-46-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 46 серия",
      "ru": "Наруто 46 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "📘Наруто 46 серия📘",
      "ru": "📘Наруто 46 серия📘"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/sf5jOd7xA-KM?s=V5jUz4pUkP8C2FCqwcfU1N-g",
    "trailer": "",
    "video": "https://dezocloud.uz/s/V5jUz4pUkP8C2FCqwcfU1N-g",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201036625,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3773,
    "slug": "naruto-45-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 45 серия",
      "ru": "Наруто 45 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦚Наруто 45 серия🦚",
      "ru": "🦚Наруто 45 серия🦚"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/JcndzrcKE9Tl?s=p_SyOBI1Bvng-hyzud3J99Ze",
    "trailer": "",
    "video": "https://dezocloud.uz/s/p_SyOBI1Bvng-hyzud3J99Ze",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201102559,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3774,
    "slug": "naruto-44-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 44 серия",
      "ru": "Наруто 44 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🥼Наруто 44 серия🥼",
      "ru": "🥼Наруто 44 серия🥼"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/lkbJaYJOseUB?s=3-gIfsO35yigxPBMxPBVXjG3",
    "trailer": "",
    "video": "https://dezocloud.uz/s/3-gIfsO35yigxPBMxPBVXjG3",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201966494,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3775,
    "slug": "naruto-43-seriya",
    "type": "film",
    "title": {
      "uz": "наруто 43 серия",
      "ru": "наруто 43 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💧наруто 43 серия💧",
      "ru": "💧наруто 43 серия💧"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UsICiaOOEgVB?s=WRIj8Gvi7KbCpnUnD0viz_D2",
    "trailer": "",
    "video": "https://dezocloud.uz/s/WRIj8Gvi7KbCpnUnD0viz_D2",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200989116,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3776,
    "slug": "naruto-42-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 42 серия",
      "ru": "Наруто 42 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🦊Наруто 42 серия🦊",
      "ru": "🦊Наруто 42 серия🦊"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/uamemrD8aOEv?s=GDA4gj0sw5a5YwDVKp2_CHrU",
    "trailer": "",
    "video": "https://dezocloud.uz/s/GDA4gj0sw5a5YwDVKp2_CHrU",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200774356,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3777,
    "slug": "naruto-41-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 41 серия",
      "ru": "Наруто 41 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "💥Наруто 41 серия💥",
      "ru": "💥Наруто 41 серия💥"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/iA6x73wHSZhy?s=nTbOMr5y_QwhPHbO3Ay9-X2w",
    "trailer": "",
    "video": "https://dezocloud.uz/s/nTbOMr5y_QwhPHbO3Ay9-X2w",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 200974852,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3778,
    "slug": "naruto-40-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 40 серия",
      "ru": "Наруто 40 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🐉Наруто 40 серия🐉",
      "ru": "🐉Наруто 40 серия🐉"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/rffR4VtNOHoh?s=X95LPuLWkGItanr4Uv_h7jy_",
    "trailer": "",
    "video": "https://dezocloud.uz/s/X95LPuLWkGItanr4Uv_h7jy_",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 202122578,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3779,
    "slug": "naruto-39-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 39 серия",
      "ru": "Наруто 39 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "⛩Наруто 39 серия⛩",
      "ru": "⛩Наруто 39 серия⛩"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/eiLo0swxtnLe?s=4aH9pML43JlQiIgsCRXRVSk5",
    "trailer": "",
    "video": "https://dezocloud.uz/s/4aH9pML43JlQiIgsCRXRVSk5",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201074885,
    "year": 2026,
    "audio": "uz"
  },
  {
    "id": 3780,
    "slug": "naruto-38-seriya",
    "type": "film",
    "title": {
      "uz": "Наруто 38 серия",
      "ru": "Наруто 38 серия"
    },
    "genres": [
      "drama"
    ],
    "country": {
      "uz": "—",
      "ru": "—"
    },
    "cast": [],
    "desc": {
      "uz": "🌪Наруто 38 серия🌪",
      "ru": "🌪Наруто 38 серия🌪"
    },
    "colors": [
      "#2a3142",
      "#0d1018"
    ],
    "poster": "https://dezocloud.uz/t/UFdnfajYhmP2?s=h1AcFUq86MP2E_srwC5eReE6",
    "trailer": "",
    "video": "https://dezocloud.uz/s/h1AcFUq86MP2E_srwC5eReE6",
    "featured": false,
    "addedAt": 1791042876202,
    "updatedAt": 1791042876202,
    "duration": 23,
    "size": 201116623,
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
