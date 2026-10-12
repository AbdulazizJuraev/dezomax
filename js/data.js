/* ============================================================
   DezoMax — Kinolar bazasi / База фильмов
   ------------------------------------------------------------
   Yangi kino qo'shish uchun MOVIES ro'yxatiga yangi obyekt qo'shing.
   Чтобы добавить фильм — добавьте объект в список MOVIES.

   Maydonlar / Поля:
     id        - unikal raqam
     slug      - havola uchun nom (lotin harflari, chiziqcha bilan)
     title     - {uz, ru} nomi
     year      - yili
     type      - "film" | "serial" | "multfilm"
     franchise - (ixtiyoriy) "marvel" | "dc" — bosh sahifada alohida qator
                 va katalogda alohida filtr sifatida chiqadi
     genres    - janr kodlari (pastdagi GENRES ro'yxatidan)
     rating    - 0..10
     duration  - daqiqada (film uchun)
     seasons   - fasllar soni (serial uchun)
     country   - {uz, ru}
     director  - rejissyor
     cast      - aktyorlar
     tags      - (ixtiyoriy) qo'shimcha qidiruv kalitlari. Masalan "Qorong'u ritsar"
                 nomida "Betmen" so'zi yo'q, shuning uchun tags ga yoziladi
     desc      - {uz, ru} qisqacha tavsif
     colors    - poster rasmi bo'lmaganda ishlatiladigan gradient ranglari
     poster    - poster rasmiga yo'l, masalan 'images/dune.jpg'
     trailer   - treyler havolasi (YouTube)
     video     - to'liq kino havolasi. Qo'llab-quvvatlanadi:
                   YouTube      https://www.youtube.com/watch?v=XXXXXXXXXXX
                   Vimeo        https://vimeo.com/123456789
                   Google Drive https://drive.google.com/file/d/FILE_ID/view
                   To'g'ridan-to'g'ri fayl   videos/kino.mp4  yoki  https://.../kino.mp4
                   HLS oqim     https://.../playlist.m3u8
                   Boshqa har qanday embed havola ham iframe sifatida ochiladi.
                 Bo'sh bo'lsa — pleyerda treyler ko'rsatiladi.
     source    - (ixtiyoriy) { name, url } — video joylangan rasmiy kanal/platforma.
                 Kino sahifasida pleyer ostida "Rasmiy manba" deb ko'rsatiladi
     audio     - (ixtiyoriy) 'uz' — video o'zbek tilida. Kartochkadagi "O'zbekcha"
                 belgisi va katalogdagi "O'zbek tilida to'liq" filtri shunga qaraydi
                 (franchise: 'uzbek' bo'lsa avtomatik o'zbekcha hisoblanadi)
     featured  - bosh sahifadagi katta sliderda ko'rsatilsinmi

   year, rating, director — ixtiyoriy: noma'lum bo'lsa yozmang, sayt ularni
   ko'rsatmaydi (o'ylab topilgan qiymat qo'ymang).
   ============================================================ */

const GENRES = [
  { id: 'action',    uz: 'Jangari',      ru: 'Боевик' },
  { id: 'drama',     uz: 'Drama',        ru: 'Драма' },
  { id: 'comedy',    uz: 'Komediya',     ru: 'Комедия' },
  { id: 'scifi',     uz: 'Fantastika',   ru: 'Фантастика' },
  { id: 'thriller',  uz: 'Triller',      ru: 'Триллер' },
  { id: 'crime',     uz: 'Jinoyat',      ru: 'Криминал' },
  { id: 'fantasy',   uz: 'Fentezi',      ru: 'Фэнтези' },
  { id: 'horror',    uz: 'Qo‘rqinchli',  ru: 'Ужасы' },
  { id: 'animation', uz: 'Animatsiya',   ru: 'Анимация' },
  { id: 'adventure', uz: 'Sarguzasht',   ru: 'Приключения' },
  { id: 'romance',   uz: 'Melodrama',    ru: 'Мелодрама' },
  { id: 'biography', uz: 'Biografiya',   ru: 'Биография' },
  { id: 'war',       uz: 'Harbiy',       ru: 'Военный' },
  { id: 'detective', uz: 'Detektiv',     ru: 'Детектив' },
  { id: 'family',    uz: 'Oilaviy',      ru: 'Семейный' },
  { id: 'history',   uz: 'Tarixiy',      ru: 'Исторический' }
];

const MOVIES = [
  {
    /* Erkin litsenziyali (CC BY) film — "video" maydoni qanday ishlashini ko'rsatadi.
       Свободная лицензия (CC BY) — пример работающего поля "video". */
    id: 31, slug: 'big-buck-bunny', year: 2008, type: 'multfilm',
    title: { uz: 'Katta quyon Bak', ru: 'Большой кролик Бак' },
    genres: ['animation', 'comedy', 'family', 'adventure'], rating: 6.4, duration: 10,
    country: { uz: 'Niderlandiya', ru: 'Нидерланды' },
    director: 'Sacha Goedegebuure',
    cast: ['Blender Institute'],
    desc: {
      uz: 'Yuvosh bahaybat quyon uch shumtaka kemiruvchidan o‘ch oladi. Blender Foundation yaratgan, CC BY litsenziyasidagi erkin qisqa metrajli film — saytda to‘liq ko‘rish mumkin.',
      ru: 'Добродушный великан-кролик мстит трём хулиганам-грызунам. Свободный короткометражный фильм Blender Foundation под лицензией CC BY — доступен для полного просмотра на сайте.'
    },
    colors: ['#4a7a3a', '#0f1a0c'],
    poster: 'images/big-buck-bunny.jpg',
    trailer: 'https://www.youtube.com/watch?v=5xAgp6i9lUQ',
    video: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.720p.vp9.webm',
    featured: false
  },
  /* ------------------------------------------------------------
     O'zbek filmlari — rasmiy studiya va distribyutor YouTube kanallaridan.
     Reyting ko'rsatilmagan (YouTube'da yo'q); yil va rejissyor faqat
     videoning o'z tavsifida yozilgan bo'lsa qo'yilgan.
     ------------------------------------------------------------ */
  {
    id: 62, slug: "uz-bir-uyda-sevishganlar", type: 'film', franchise: 'uzbek',
    title: { uz: "Bir uyda sevishganlar", ru: "Бир уйда севишганлар" },
    genres: ['drama'], duration: 85,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Bir uyda sevishganlar» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Бир уйда севишганлар». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/bir-uyda-sevishganlar.jpg',
    video: 'https://www.youtube.com/watch?v=_fY8NJXI9VQ',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 63, slug: "uz-daxshatli-uy", type: 'film', franchise: 'uzbek',
    title: { uz: "Daxshatli uy", ru: "Дахшатли уй" },
    genres: ['drama'], duration: 65,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Daxshatli uy» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Дахшатли уй». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/daxshatli-uy.jpg',
    video: 'https://www.youtube.com/watch?v=Xtn0twJzvD0',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 64, slug: "uz-omadli-oshiqlar", type: 'film', franchise: 'uzbek',
    title: { uz: "Omadli oshiqlar", ru: "Омадли ошиқлар" },
    genres: ['drama'], duration: 69,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Omadli oshiqlar» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Омадли ошиқлар». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/omadli-oshiqlar.jpg',
    video: 'https://www.youtube.com/watch?v=3bcrOfMLHGU',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 65, slug: "uz-qizil-oyna", type: 'film', franchise: 'uzbek',
    title: { uz: "Qizil oyna", ru: "Қизил ойна" },
    genres: ['drama'], duration: 74,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Qizil oyna» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Қизил ойна». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/qizil-oyna.jpg',
    video: 'https://www.youtube.com/watch?v=YsrXyb6Y_NQ',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 66, slug: "uz-nomussiz", type: 'film', franchise: 'uzbek',
    title: { uz: "Nomussiz", ru: "Номуссиз" },
    genres: ['drama'], duration: 75,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Nomussiz» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Номуссиз». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/nomussiz.jpg',
    video: 'https://www.youtube.com/watch?v=kWsioSdc-XU',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 67, slug: "uz-kutilmagan-kelin", type: 'film', franchise: 'uzbek',
    title: { uz: "Kutilmagan kelin", ru: "Кутилмаган келин" },
    genres: ['drama'], duration: 69,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Kutilmagan kelin» — o‘zbek filmi. To‘liq versiyasi rasmiy «Kashtan films» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Кутилмаган келин». Полная версия размещена на официальном YouTube-канале «Kashtan films»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/kutilmagan-kelin.jpg',
    video: 'https://www.youtube.com/watch?v=wotfYFZepZM',
    source: { name: "Kashtan films", url: 'https://www.youtube.com/@KashtanFilms' },
    featured: false
  },
  {
    id: 68, slug: "uz-super-kelinchak", year: 2008, type: 'film', franchise: 'uzbek',
    title: { uz: "Super kelinchak", ru: "Super kelinchak" },
    genres: ['comedy', 'romance', 'drama'], duration: 103,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Bahrom Yoqubov",
    cast: ["Diana Yagofarova", "Adiz Rajabov", "Saida Rametova", "Murod Rajabov", "Nozim To'laxo'jayev", "Elizaveta Karali"],
    desc: {
      uz: "«Super kelinchak» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Super kelinchak». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/super-kelinchak.jpg',
    video: 'https://www.youtube.com/watch?v=Be-Ja91Z7Qk',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 69, slug: "uz-notanish-qotil", type: 'film', franchise: 'uzbek',
    title: { uz: "Notanish qotil", ru: "Нотаниш котил" },
    genres: ['drama'], duration: 94,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Jamol aka badavlat, obroʼli inson boʼlsa ham, bir jinoyatda ayblanib, qamoqqa olinish arafasida edi. Bu esa, uning obroʼsiga toʼgʼri kelmasdi. Uning oʼgʼli Baxtiyor ham xorijdagi oʼqishini tugatib, uyga qaytayotgan edi.",
      ru: "Узбекский фильм «Нотаниш котил». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/notanish-qotil.jpg',
    video: 'https://www.youtube.com/watch?v=HATGTIhNAuA',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 70, slug: "uz-borilar-2-quvgin", year: 2008, type: 'film', franchise: 'uzbek',
    title: { uz: "Bo'rilar 2 – quvg'in", ru: "Bo'rilar 2 – quvg'in" },
    genres: ['drama'], duration: 100,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Zebo Navruzova",
    cast: ["Shohruhxon", "Nilufar Usmonova", "Jalil Mavlonov", "Bekzod Tojiyev", "Ulug'bek Tuganov", "Nasrulloh Nurov"],
    desc: {
      uz: "«Bo'rilar 2 – quvg'in» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Bo'rilar 2 – quvg'in». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/borilar-2-quvgin.jpg',
    video: 'https://www.youtube.com/watch?v=kzTOyuHWEUM',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 71, slug: "uz-borilar", year: 2007, type: 'film', franchise: 'uzbek',
    title: { uz: "Bo'rilar", ru: "Bo'rilar" },
    genres: ['drama'], duration: 90,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Zebo Navruzova",
    cast: ["Shohruhxon", "Bekzod Tojiyev", "Adiz Rajabov", "Nilufar Usmonova", "Jalil Mavlonov", "Jamshid Abduazimov"],
    desc: {
      uz: "«Bo'rilar» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Bo'rilar». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/borilar.jpg',
    video: 'https://www.youtube.com/watch?v=VWNbZRyrqWg',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 72, slug: "uz-qaysarginam", type: 'film', franchise: 'uzbek',
    title: { uz: "Qaysarginam", ru: "Кайсаргинам" },
    genres: ['drama'], duration: 88,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Qaysarginam» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Кайсаргинам». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/qaysarginam.jpg',
    video: 'https://www.youtube.com/watch?v=fNxF0okFGNI',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 73, slug: "uz-tilim-qursin-2", type: 'film', franchise: 'uzbek',
    title: { uz: "Tilim qursin 2", ru: "Тилим курсин 2" },
    genres: ['drama'], duration: 79,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Жахонгир Ахмедов",
    cast: [],
    desc: {
      uz: "«Tilim qursin 2» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Тилим курсин 2». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/tilim-qursin-2.jpg',
    video: 'https://www.youtube.com/watch?v=t8Saf1DG3n8',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 74, slug: "uz-qaysarginam-2", type: 'film', franchise: 'uzbek',
    title: { uz: "Qaysarginam 2", ru: "Кайсаргинам 2" },
    genres: ['family'], duration: 97,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Jasur va Jasmin sevishib turmush qurishgan. Lekin, Jasur oilaviy hayotni faqat romantika, oʼyin-kulgidan iborat, deb biladigan oʼta zamonaviy yigit. Xotini Jasminning homilador boʼlishi, uning hayotini ostin-ustun qilib yuboradi.",
      ru: "Узбекский фильм «Кайсаргинам 2». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/qaysarginam-2.jpg',
    video: 'https://www.youtube.com/watch?v=8hrUzzOl2uU',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 75, slug: "uz-ichkuyov", year: 2009, type: 'film', franchise: 'uzbek',
    title: { uz: "Ichkuyov", ru: "Ichkuyov" },
    genres: ['drama'], duration: 73,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Bahrom Yoqubov",
    cast: ["Adiz Rajabov", "Diana Yagofarova", "Murod Rajabov", "Ra'no Yarasheva", "Tohir Saidov", "Zuhra Ashurova"],
    desc: {
      uz: "«Ichkuyov» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Ichkuyov». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/ichkuyov.jpg',
    video: 'https://www.youtube.com/watch?v=9F16cxwZSgQ',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 76, slug: "uz-xoreograf", year: 2025, type: 'film', franchise: 'uzbek',
    title: { uz: "Xoreograf", ru: "Xoreograf" },
    genres: ['comedy', 'action'], duration: 70,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Otabek Mirzaxolov, Sunnat Namozov",
    cast: ["G'ayrat Ahmedov", "Dilshod Mirzamurodov", "Otabek Mirzaxolov", "Huvaydo Jumayeva", "Elbek Fayziyev", "Aysanem Yusupova"],
    desc: {
      uz: "Film kriminal, jangari va komediya janrida bo'lib, Afg'onistondan O'zbekistonga noqonuniy giyohvand moddalarni olib o'tuvchi guruh hamda narkobaronning ayyorona usulda qo'lga olinishi haqida.",
      ru: "Узбекский фильм «Xoreograf». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/xoreograf.jpg',
    video: 'https://www.youtube.com/watch?v=PUU02klggno',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: true
  },
  {
    id: 77, slug: "uz-zamonaviy-sovchilar-4", year: 2022, type: 'film', franchise: 'uzbek',
    title: { uz: "Zamonaviy sovchilar 4", ru: "Zamonaviy sovchilar 4" },
    genres: ['comedy'], duration: 103,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Muhammad Iso Abdulhairov",
    cast: ["Muhammad Iso Abdulhairov", "Suxrob Isomov", "Alisher Uzoqov", "Huvaydo Jumayeva", "Qobil Karimberdiyev", "Alisher Otaboyev"],
    desc: {
      uz: "Ushbu film zamonaviy turmush qurish jarayonidagi kulgili va murakkab holatlar haqida hikoya. Sovchilar yana bir yosh juftlikni oila qurishga undashga harakat qiladi, ammo qarindoshlar bosimi, turli qarashlar va kutilmagan vaziyatlar ishni chigallashtirib yuboradi.",
      ru: "Узбекский фильм «Zamonaviy sovchilar 4». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/zamonaviy-sovchilar-4.jpg',
    video: 'https://www.youtube.com/watch?v=iGWKed8Qdwc',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: true
  },
  {
    id: 78, slug: "uz-oling-quda-bering-quda", type: 'film', franchise: 'uzbek',
    title: { uz: "Oling quda-bering quda", ru: "Олинг куда-беринг куда" },
    genres: ['drama'], duration: 89,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Жахонгир Ахмедов",
    cast: [],
    desc: {
      uz: "«Oling quda-bering quda» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Олинг куда-беринг куда». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/oling-quda-bering-quda.jpg',
    video: 'https://www.youtube.com/watch?v=4s4AL0Aq-fQ',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: false
  },
  {
    id: 79, slug: "uz-snayper", year: 2019, type: 'film', franchise: 'uzbek',
    title: { uz: "Snayper", ru: "Snayper" },
    genres: ['drama'], duration: 103,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Ozod Shams",
    cast: ["Ulug'bek Qodirov", "Bonu Nur", "Matyoqub Matchonov", "Behzod Muhammadkarimov", "Mansur Mirzo", "Saida Rametova"],
    desc: {
      uz: "«Snayper» — o‘zbek filmi. To‘liq versiyasi rasmiy «UzbekFilmsHD (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Snayper». Полная версия размещена на официальном YouTube-канале «UzbekFilmsHD (RizaNova)»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/snayper.jpg',
    video: 'https://www.youtube.com/watch?v=0ycW8BtCZdg',
    source: { name: "UzbekFilmsHD (RizaNova)", url: 'https://www.youtube.com/@UzbekFilmsHD' },
    featured: true
  },
  {
    id: 80, slug: "uz-sotqin", type: 'film', franchise: 'uzbek',
    title: { uz: "Sotqin", ru: "Соткин" },
    genres: ['drama'], duration: 145,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Film bir oilaning fojiasi haqida hikoya qiladi, ular diniy ekstremistlarning qurboniga aylangan. Bir tomonda - doimo hamma narsadan norozi bo'lgan ota va o'zini hammadan ustun qo'ygan, o'ziga hamma narsani ravo ko'rgan to'ng'ich o'g'il.",
      ru: "Узбекский фильм «Соткин». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/sotqin.jpg',
    video: 'https://www.youtube.com/watch?v=7XrD7KN1Zpk',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 81, slug: "uz-jasur", type: 'film', franchise: 'uzbek',
    title: { uz: "Jasur", ru: "Жасур" },
    genres: ['drama'], duration: 82,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Ushbu film terrorizmga qarshi kurashda yurtimiz tinchligi va osoyishtaligi uchun jon fido qilgan vatan himoyachilariga bag'ishlanadi. Film real voqealarga asoslangan Bahodir Odilov, Najmiddin G'ulomov filmi",
      ru: "Узбекский фильм «Жасур». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/jasur.jpg',
    video: 'https://www.youtube.com/watch?v=8EdasvDM6g4',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 82, slug: "uz-novda", year: 2013, type: 'film', franchise: 'uzbek',
    title: { uz: "Novda", ru: "Новда" },
    genres: ['drama'], duration: 98,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Novda» — o‘zbek filmi. To‘liq versiyasi rasmiy «Uzbekkino (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Новда». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/novda.jpg',
    video: 'https://www.youtube.com/watch?v=FVSAtbNsJzI',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 83, slug: "uz-18-kvadrat", type: 'film', franchise: 'uzbek',
    title: { uz: "18 kvadrat", ru: "18 квадрат" },
    genres: ['drama'], duration: 93,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«18 kvadrat» — o‘zbek filmi. To‘liq versiyasi rasmiy «Uzbekkino (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «18 квадрат». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/18-kvadrat.jpg',
    video: 'https://www.youtube.com/watch?v=NwEUY4-XNy8',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 84, slug: "uz-uch-qahramon", type: 'film', franchise: 'uzbek',
    title: { uz: "Uch qahramon", ru: "Уч кахрамон" },
    genres: ['drama'], duration: 158,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Uch qahramon» — o‘zbek filmi. To‘liq versiyasi rasmiy «Uzbekkino (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Уч кахрамон». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/uch-qahramon.jpg',
    video: 'https://www.youtube.com/watch?v=RrOKftK5bjM',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 85, slug: "uz-telba", type: 'film', franchise: 'uzbek',
    title: { uz: "Telba", ru: "Телба" },
    genres: ['romance'], duration: 100,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Bu film kambag‘al yigit va boy oilaning qizi o‘rtasidagi muhabbat hikoyasi haqida.Yigit ko‘chada hanum sotib, shu orqali onasi va singlisini boqadi. Qiz esa nufuzli universitet talabasi, o‘z mashinasi bor va hashamatli uyda yashaydi.",
      ru: "Узбекский фильм «Телба». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/telba.jpg',
    video: 'https://www.youtube.com/watch?v=oDgbigMiKkU',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 86, slug: "uz-panoh", type: 'film', franchise: 'uzbek',
    title: { uz: "Panoh", ru: "Панох" },
    genres: ['drama'], duration: 162,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Muvaffaqiyatli tadbirkorga tahdidli ovozli xabar keladi. Uning yordamchisi rahbarning qizlari uchun tansoqchilar yollashni taklif qiladi. Aytilgan – bajarilgan.",
      ru: "Узбекский фильм «Панох». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/panoh.jpg',
    video: 'https://www.youtube.com/watch?v=8dxJb9RVJas',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 87, slug: "uz-puling-bolsa", type: 'film', franchise: 'uzbek',
    title: { uz: "Puling bo'lsa", ru: "Пулинг булса" },
    genres: ['drama'], duration: 87,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Puling bo'lsa» — o‘zbek filmi. To‘liq versiyasi rasmiy «Uzbekkino (RizaNova)» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Пулинг булса». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/puling-bolsa.jpg',
    video: 'https://www.youtube.com/watch?v=9gS6bunZW6I',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 88, slug: "uz-afv", type: 'film', franchise: 'uzbek',
    title: { uz: "Afv", ru: "Афв" },
    genres: ['drama'], duration: 84,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Film real voqealarga asoslangan bo‘lib, turli jinoyatlarda ayblangan, shuningdek, afv etilgan shaxslarning hayoti va taqdiri haqida hikoya qiladi.",
      ru: "Узбекский фильм «Афв». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/afv.jpg',
    video: 'https://www.youtube.com/watch?v=YPYq4sT7xVg',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: false
  },
  {
    id: 89, slug: "uz-tutqunlik", year: 2020, type: 'film', franchise: 'uzbek',
    title: { uz: "Tutqunlik", ru: "Туткинлик" },
    genres: ['drama'], duration: 88,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Yosh feldsher ish topish maqsadida Yaqin Sharqqa yo'l oladi. Mehribon ayol esa turmush o'rtog'i ortidan ketadi. O'qituvchi-dinshunosning oilasi esa haqiqiy e’tiqodni topish umidida urush o'chog'iga yo'l oladi... Ularning barchasi o'z xatolarining garoviga aylanadi.",
      ru: "Узбекский фильм «Туткинлик». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/tutqunlik.jpg',
    video: 'https://www.youtube.com/watch?v=Y-mmYdJRvr0',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: true
  },
  {
    id: 90, slug: "uz-101-reys", year: 2021, type: 'film', franchise: 'uzbek',
    title: { uz: "101 reys", ru: "101 reys" },
    genres: ['drama', 'history'], duration: 102,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "Uchuvchilar Z. Saidazimov va B. Asatulloyevlarning 2001 yil 11 sentyabrda Nyu-Yorkda sodir bo‘lgan terroristik hujumda oqilona va qat’iy qarorlarini tasvirlaydigan biografiyaga oid film.",
      ru: "Узбекский фильм «101 reys». Полная версия размещена на официальном YouTube-канале «Uzbekkino (RizaNova)»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/101-reys.jpg',
    video: 'https://www.youtube.com/watch?v=uD2L0CmWwnM',
    source: { name: "Uzbekkino (RizaNova)", url: 'https://www.youtube.com/@UzbekkinoHD' },
    featured: true
  },
  {
    id: 91, slug: "uz-oshiqlar", type: 'film', franchise: 'uzbek',
    title: { uz: "Oshiqlar", ru: "Ошиқлар" },
    genres: ['drama'], duration: 98,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Oshiqlar» — o‘zbek filmi. To‘liq versiyasi rasmiy «O‘zbekkino» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Ошиқлар». Полная версия размещена на официальном YouTube-канале «O‘zbekkino»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/oshiqlar.jpg',
    video: 'https://www.youtube.com/watch?v=oeKcX6Y2xCA',
    source: { name: "O‘zbekkino", url: 'https://www.youtube.com/@Uzbekkino_official' },
    featured: false
  },
  {
    id: 92, slug: "uz-posht-arava", type: 'film', franchise: 'uzbek',
    title: { uz: "Po‘sht Arava", ru: "Пўшт Арава" },
    genres: ['drama'], duration: 89,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Po‘sht Arava» — o‘zbek filmi. To‘liq versiyasi rasmiy «O‘zbekkino» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Пўшт Арава». Полная версия размещена на официальном YouTube-канале «O‘zbekkino»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/posht-arava.jpg',
    video: 'https://www.youtube.com/watch?v=ed9l5fwYu0U',
    source: { name: "O‘zbekkino", url: 'https://www.youtube.com/@Uzbekkino_official' },
    featured: false
  },
  {
    id: 93, slug: "uz-ogay-ona", type: 'film', franchise: 'uzbek',
    title: { uz: "O‘gay Ona", ru: "Ўгай Она" },
    genres: ['drama'], duration: 105,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«O‘gay Ona» — o‘zbek filmi. To‘liq versiyasi rasmiy «O‘zbekkino» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Ўгай Она». Полная версия размещена на официальном YouTube-канале «O‘zbekkino»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/ogay-ona.jpg',
    video: 'https://www.youtube.com/watch?v=vjf9h8zyEBk',
    source: { name: "O‘zbekkino", url: 'https://www.youtube.com/@Uzbekkino_official' },
    featured: false
  },
  {
    id: 94, slug: "uz-men-talabaman", type: 'film', franchise: 'uzbek',
    title: { uz: "Men talabaman", ru: "Мен талабаман" },
    genres: ['drama'], duration: 91,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Фаррух Эгамбердиев",
    cast: [],
    desc: {
      uz: "«Men talabaman» — o‘zbek filmi. To‘liq versiyasi rasmiy «NevoFilms» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Мен талабаман». Полная версия размещена на официальном YouTube-канале «NevoFilms»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/men-talabaman.jpg',
    video: 'https://www.youtube.com/watch?v=hbpnuFXzOYY',
    source: { name: "NevoFilms", url: 'https://www.youtube.com/@nevofilms1' },
    featured: false
  },
  {
    id: 95, slug: "uz-janob-hech-kim", type: 'film', franchise: 'uzbek',
    title: { uz: "Janob hech kim", ru: "Жаноб хеч ким" },
    genres: ['drama'], duration: 87,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Mirmaqsud Oxunov",
    cast: ["Alisher Uzoqov", "Asal Shodiyeva", "Hamid Toshpo'latov", "Iroda Nosirova", "Mahfuza Bobotillayeva", "Shukur Abdurahmonov"],
    desc: {
      uz: "«Janob hech kim» — o‘zbek filmi. To‘liq versiyasi rasmiy «NevoFilms» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Жаноб хеч ким». Полная версия размещена на официальном YouTube-канале «NevoFilms»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/janob-hech-kim.jpg',
    video: 'https://www.youtube.com/watch?v=ouCLHQHEXH0',
    source: { name: "NevoFilms", url: 'https://www.youtube.com/@nevofilms1' },
    featured: false
  },
  {
    id: 96, slug: "uz-shabnam", type: 'film', franchise: 'uzbek',
    title: { uz: "Shabnam", ru: "Шабнам" },
    genres: ['drama'], duration: 98,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Mirmaqsud Oxunov",
    cast: ["Ulug'bek Qodirov", "Gulchexra Eshonqulova", "Aziz Rametov", "Oydin Yusupova"],
    desc: {
      uz: "«Shabnam» — o‘zbek filmi. To‘liq versiyasi rasmiy «NevoFilms» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Шабнам». Полная версия размещена на официальном YouTube-канале «NevoFilms»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/shabnam.jpg',
    video: 'https://www.youtube.com/watch?v=DD1ODs30ers',
    source: { name: "NevoFilms", url: 'https://www.youtube.com/@nevofilms1' },
    featured: false
  },
  {
    id: 97, slug: "uz-yugurganniki-emas-buyurganniki", type: 'film', franchise: 'uzbek',
    title: { uz: "Yugurganniki emas buyurganniki", ru: "Югурганники эмас буюрганники" },
    genres: ['drama'], duration: 70,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    director: "Zafar Asqarov",
    cast: ["Matyoqub Matchonov", "Hosiyat Xusanova", "Asqar Hikmatov"],
    desc: {
      uz: "«Yugurganniki emas buyurganniki» — o‘zbek filmi. To‘liq versiyasi rasmiy «NevoFilms» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Югурганники эмас буюрганники». Полная версия размещена на официальном YouTube-канале «NevoFilms»."
    },
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/uz/yugurganniki-emas-buyurganniki.jpg',
    video: 'https://www.youtube.com/watch?v=EcFgjOgYHFc',
    source: { name: "NevoFilms", url: 'https://www.youtube.com/@nevofilms1' },
    featured: false
  },
  {
    id: 98, slug: "uz-qalb-kozi", type: 'film', franchise: 'uzbek',
    title: { uz: "Qalb Ko'zi", ru: "Қалб Кўзи" },
    genres: ['drama'], duration: 98,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Qalb Ko'zi» — o‘zbek filmi. To‘liq versiyasi rasmiy «Fox Music Cinema» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Қалб Кўзи». Полная версия размещена на официальном YouTube-канале «Fox Music Cinema»."
    },
    colors: ['#5a3a2a', '#140c08'],
    poster: 'images/uz/qalb-kozi.jpg',
    video: 'https://www.youtube.com/watch?v=HYqWsnmQYQc',
    source: { name: "Fox Music Cinema", url: 'https://www.youtube.com/@FoxMusicCinema' },
    featured: false
  },
  {
    id: 99, slug: "uz-yoqotilgan-jannat", type: 'film', franchise: 'uzbek',
    title: { uz: "Yo'qotilgan jannat", ru: "Йукотилган жаннат" },
    genres: ['drama'], duration: 80,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Yo'qotilgan jannat» — o‘zbek filmi. To‘liq versiyasi rasmiy «navo.tv» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Йукотилган жаннат». Полная версия размещена на официальном YouTube-канале «navo.tv»."
    },
    colors: ['#2a4a5a', '#081014'],
    poster: 'images/uz/yoqotilgan-jannat.jpg',
    video: 'https://www.youtube.com/watch?v=aG5JclI9cx4',
    source: { name: "navo.tv", url: 'https://www.youtube.com/@navotv' },
    featured: false
  },
  {
    id: 100, slug: "uz-dadam-bilmasin", type: 'film', franchise: 'uzbek',
    title: { uz: "Dadam bilmasin", ru: "Дадам билмасин" },
    genres: ['drama'], duration: 83,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: [],
    desc: {
      uz: "«Dadam bilmasin» — o‘zbek filmi. To‘liq versiyasi rasmiy «navo.tv» YouTube kanalida joylangan.",
      ru: "Узбекский фильм «Дадам билмасин». Полная версия размещена на официальном YouTube-канале «navo.tv»."
    },
    colors: ['#4a2a4a', '#100810'],
    poster: 'images/uz/dadam-bilmasin.jpg',
    video: 'https://www.youtube.com/watch?v=U_FTs4VHl9U',
    source: { name: "navo.tv", url: 'https://www.youtube.com/@navotv' },
    featured: false
  },
  {
    id: 101, slug: "konsert-avaz-2025-kulib-yashaylik", year: 2025, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — «Kulib yashaylik» konserti 2025", ru: "Аваз Охун — концерт «Kulib yashaylik» 2025" },
    genres: ['comedy'], duration: 169,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2025-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2025 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2025-kulib-yashaylik.jpg",
    video: 'https://www.youtube.com/watch?v=mjLbvt7wIq8',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 102, slug: "konsert-avaz-2024-toydagi-tomosha", year: 2024, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — «To‘ydagi tomosha» konserti 2024", ru: "Аваз Охун — концерт «To‘ydagi tomosha» 2024" },
    genres: ['comedy'], duration: 150,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2024-yilgi to‘liq konsert dasturi. Rasmiy «Avaz Oxun» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2024 года. Размещена на официальном YouTube-канале «Avaz Oxun»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2024-toydagi-tomosha.jpg",
    video: 'https://www.youtube.com/watch?v=jY98EwB1IJQ',
    source: { name: "Avaz Oxun", url: "https://www.youtube.com/@AvazOxun" },
    featured: false
  },
  {
    id: 103, slug: "konsert-avaz-2023-10-yillik-yubiley", year: 2023, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — «10 yillik yubiley» konserti 2023", ru: "Аваз Охун — концерт «10 yillik yubiley» 2023" },
    genres: ['comedy'], duration: 173,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2023-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2023 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2023-10-yillik-yubiley.jpg",
    video: 'https://www.youtube.com/watch?v=UHT1ArsrJlc',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 104, slug: "konsert-avaz-2022-kulgiterapiya", year: 2022, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — «Kulgiterapiya» konserti 2022", ru: "Аваз Охун — концерт «Kulgiterapiya» 2022" },
    genres: ['comedy'], duration: 182,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2022-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2022 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2022-kulgiterapiya.jpg",
    video: 'https://www.youtube.com/watch?v=_nhXnUn7A-M',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 105, slug: "konsert-avaz-2021-kulgularingizni-sogindim", year: 2021, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — «Kulgularingizni sog‘indim» konserti 2021", ru: "Аваз Охун — концерт «Kulgularingizni sog‘indim» 2021" },
    genres: ['comedy'], duration: 154,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2021-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2021 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2021-kulgularingizni-sogindim.jpg",
    video: 'https://www.youtube.com/watch?v=pac0a59ZsHw',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 106, slug: "konsert-avaz-2019", year: 2019, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2019", ru: "Аваз Охун — концертная программа 2019" },
    genres: ['comedy'], duration: 166,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2019-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2019 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2019.jpg",
    video: 'https://www.youtube.com/watch?v=HXoU8KqMd2o',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 107, slug: "konsert-avaz-2018", year: 2018, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2018", ru: "Аваз Охун — концертная программа 2018" },
    genres: ['comedy'], duration: 142,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2018-yilgi to‘liq konsert dasturi. Rasmiy «Avaz Oxun» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2018 года. Размещена на официальном YouTube-канале «Avaz Oxun»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2018.jpg",
    video: 'https://www.youtube.com/watch?v=CWgoDzE3cZM',
    source: { name: "Avaz Oxun", url: "https://www.youtube.com/@AvazOxun" },
    featured: false
  },
  {
    id: 108, slug: "konsert-avaz-2017", year: 2017, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2017", ru: "Аваз Охун — концертная программа 2017" },
    genres: ['comedy'], duration: 162,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2017-yilgi to‘liq konsert dasturi. Rasmiy «YangiKulgu Official» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2017 года. Размещена на официальном YouTube-канале «YangiKulgu Official»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2017.jpg",
    video: 'https://www.youtube.com/watch?v=Oy4PQvke7Rc',
    source: { name: "YangiKulgu Official", url: "https://www.youtube.com/@YangiKulgu" },
    featured: false
  },
  {
    id: 109, slug: "konsert-avaz-2016", year: 2016, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2016", ru: "Аваз Охун — концертная программа 2016" },
    genres: ['comedy'], duration: 162,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2016-yilgi to‘liq konsert dasturi. Rasmiy «Avaz Oxun» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2016 года. Размещена на официальном YouTube-канале «Avaz Oxun»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2016.jpg",
    video: 'https://www.youtube.com/watch?v=2NiTIEp5Ugk',
    source: { name: "Avaz Oxun", url: "https://www.youtube.com/@AvazOxun" },
    featured: false
  },
  {
    id: 110, slug: "konsert-avaz-2015", year: 2015, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2015", ru: "Аваз Охун — концертная программа 2015" },
    genres: ['comedy'], duration: 119,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2015-yilgi to‘liq konsert dasturi. Rasmiy «Avaz Oxun» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2015 года. Размещена на официальном YouTube-канале «Avaz Oxun»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2015.jpg",
    video: 'https://www.youtube.com/watch?v=LuDFFGkpyE4',
    source: { name: "Avaz Oxun", url: "https://www.youtube.com/@AvazOxun" },
    featured: false
  },
  {
    id: 111, slug: "konsert-avaz-2014", year: 2014, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Avaz Oxun — konsert dasturi 2014", ru: "Аваз Охун — концертная программа 2014" },
    genres: ['comedy'], duration: 154,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Avaz Oxun"],
    tags: ["konsert","kulgu","Avaz Ohun","Аваз Охун","концерт"],
    desc: {
      uz: "Avaz Oxunning 2014-yilgi to‘liq konsert dasturi. Rasmiy «Avaz Oxun» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Аваз Охун» 2014 года. Размещена на официальном YouTube-канале «Avaz Oxun»."
    },
    colors: ["#5a3a12","#140c04"],
    poster: "images/uz/konsert-avaz-2014.jpg",
    video: 'https://www.youtube.com/watch?v=2aZ6pZ3qWt4',
    source: { name: "Avaz Oxun", url: "https://www.youtube.com/@AvazOxun" },
    featured: false
  },
  {
    id: 112, slug: "konsert-million-2025-kuz", year: 2025, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — «Kuz» konserti 2025", ru: "Миллион жамоаси — концерт «Kuz» 2025" },
    genres: ['comedy'], duration: 121,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2025-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2025 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2025-kuz.jpg",
    video: 'https://www.youtube.com/watch?v=qZ9ZpSn3eOs',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 113, slug: "konsert-million-2025", year: 2025, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2025", ru: "Миллион жамоаси — концертная программа 2025" },
    genres: ['comedy'], duration: 168,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2025-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2025 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2025.jpg",
    video: 'https://www.youtube.com/watch?v=YZddDdYi7h4',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 114, slug: "konsert-million-2024-kuz", year: 2024, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — «Kuz» konserti 2024", ru: "Миллион жамоаси — концерт «Kuz» 2024" },
    genres: ['comedy'], duration: 141,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2024-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2024 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2024-kuz.jpg",
    video: 'https://www.youtube.com/watch?v=q6u7FuT3vWo',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 115, slug: "konsert-million-2024", year: 2024, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2024", ru: "Миллион жамоаси — концертная программа 2024" },
    genres: ['comedy'], duration: 138,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2024-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2024 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2024.jpg",
    video: 'https://www.youtube.com/watch?v=FNjWoKRKe6s',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 116, slug: "konsert-million-2023-10-yillik-yubiley", year: 2023, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — «10 yillik yubiley» konserti 2023", ru: "Миллион жамоаси — концерт «10 yillik yubiley» 2023" },
    genres: ['comedy'], duration: 180,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2023-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2023 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2023-10-yillik-yubiley.jpg",
    video: 'https://www.youtube.com/watch?v=D1LVulqHw4s',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 117, slug: "konsert-million-2022", year: 2022, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2022", ru: "Миллион жамоаси — концертная программа 2022" },
    genres: ['comedy'], duration: 123,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2022-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2022 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2022.jpg",
    video: 'https://www.youtube.com/watch?v=sxWszokjdzg',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 118, slug: "konsert-million-2021-kuz", year: 2021, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — «Kuz» konserti 2021", ru: "Миллион жамоаси — концерт «Kuz» 2021" },
    genres: ['comedy'], duration: 111,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2021-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2021 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2021-kuz.jpg",
    video: 'https://www.youtube.com/watch?v=tPg6FNt-NYg',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 119, slug: "konsert-million-2019", year: 2019, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2019", ru: "Миллион жамоаси — концертная программа 2019" },
    genres: ['comedy'], duration: 149,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2019-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2019 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2019.jpg",
    video: 'https://www.youtube.com/watch?v=jo3aLcacRow',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 120, slug: "konsert-million-2018", year: 2018, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2018", ru: "Миллион жамоаси — концертная программа 2018" },
    genres: ['comedy'], duration: 123,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2018-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2018 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2018.jpg",
    video: 'https://www.youtube.com/watch?v=At8bxuzGm2Q',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  {
    id: 121, slug: "konsert-million-2017", year: 2017, type: 'film', franchise: 'konsert', audio: 'uz',
    title: { uz: "Million jamoasi — konsert dasturi 2017", ru: "Миллион жамоаси — концертная программа 2017" },
    genres: ['comedy'], duration: 119,
    country: { uz: 'O‘zbekiston', ru: 'Узбекистан' },
    cast: ["Million jamoasi"],
    tags: ["konsert","kulgu","Million","Миллион","концерт"],
    desc: {
      uz: "Million jamoasining 2017-yilgi to‘liq konsert dasturi. Rasmiy «Million Jamoasi ™» YouTube kanalida joylangan.",
      ru: "Полная концертная программа «Миллион жамоаси» 2017 года. Размещена на официальном YouTube-канале «Million Jamoasi ™»."
    },
    colors: ["#12325a","#040c14"],
    poster: "images/uz/konsert-million-2017.jpg",
    video: 'https://www.youtube.com/watch?v=dY8LY6vGV1c',
    source: { name: "Million Jamoasi ™", url: "https://www.youtube.com/@millionjamoasi" },
    featured: false
  },
  /* WandaVision — Marvel Entertainment'ning rasmiy YouTube kanali qismlarni bepul joylamoqda
     (2026-oktabr, «VisionQuest» oldidan). Yangi qism chiqsa — shu guruhga qo'shiladi */
  {
    id: 151, slug: "wandavision", year: 2021, type: 'serial', franchise: 'marvel',
    title: { uz: "WandaVision", ru: "ВандаВижн" },
    genres: ["scifi","comedy","drama"],
    country: { uz: 'AQSh', ru: 'США' },
    director: "Matt Shakman",
    cast: ["Elizabeth Olsen","Paul Bettany","Kathryn Hahn","Teyonah Parris","Kat Dennings"],
    desc: {
      uz: "Vanda Maksimoff va Vijn — ikki super qahramon — shahar chetida 1950-yillar sitkomidagidek tinch hayot kechirmoqda. Ammo har bir qism yangi davrga o‘tadi va ular hamma narsa ko‘ringanidek emasligini sezib qoladi. Qismlar Marvel Entertainment’ning rasmiy YouTube kanalidan, asl tilda (ingliz tilida).",
      ru: "Ванда Максимофф и Вижн — двое супергероев — живут идеальной жизнью в пригороде, словно в ситкоме 1950-х. Но каждая серия переносит их в новую эпоху, и они начинают подозревать, что всё не так, как кажется. Серии — с официального YouTube-канала Marvel Entertainment, на языке оригинала (английский)."
    },
    tags: ["Marvel","WandaVision","Wanda Vision","Vanda Vijn","Ванда Вижн","ВандаВижн","Ванда/Вижн","Ванда и Вижн","Vanda Vijin","Vanda va Vijn","WandaVision serial","Scarlet Witch","Алая ведьма","Marvel seriali"],
    colors: ["#8a1a2a","#10060a"],
    poster: "images/marvel/wandavision.jpg",
    cover: "images/marvel/wandavision-cover.jpg",
    trailer: "https://www.youtube.com/watch?v=sj9J2ecsSpo",
    video: "https://www.youtube.com/watch?v=X5Am3fEqvQI",
    lang: 'en',
    duration: 27,
    source: { name: 'Marvel Entertainment', url: 'https://www.youtube.com/@marvel' },
    brands: ['marvel', 'disney-plus'],   // rasmiy manba belgisidagi logotiplar (images/brands/)
    parts: [151, 152, 153],
    featured: false
  },
  {
    id: 152, slug: "wandavision-2-qism", year: 2021, type: 'serial', franchise: 'marvel',
    title: { uz: "WandaVision (2-qism)", ru: "ВандаВижн (2 серия)" },
    genres: ["scifi","comedy","drama"], country: { uz: 'AQSh', ru: 'США' }, cast: [],
    desc: { uz: "", ru: "" }, colors: ["#8a1a2a","#10060a"], poster: "images/marvel/wandavision.jpg", trailer: "",
    video: "https://www.youtube.com/watch?v=MDu8SVwYaa0", lang: 'en', duration: 34, source: { name: 'Marvel Entertainment', url: 'https://www.youtube.com/@marvel' }, featured: false
  },
  {
    id: 153, slug: "wandavision-3-qism", year: 2021, type: 'serial', franchise: 'marvel',
    title: { uz: "WandaVision (3-qism)", ru: "ВандаВижн (3 серия)" },
    genres: ["scifi","comedy","drama"], country: { uz: 'AQSh', ru: 'США' }, cast: [],
    desc: { uz: "", ru: "" }, colors: ["#8a1a2a","#10060a"], poster: "images/marvel/wandavision.jpg", trailer: "",
    video: "https://www.youtube.com/watch?v=NUW7dpNXfyU", lang: 'en', duration: 30, source: { name: 'Marvel Entertainment', url: 'https://www.youtube.com/@marvel' }, featured: false
  }
];
