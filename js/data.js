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
    id: 1, slug: 'interstellar', year: 2014, type: 'film',
    title: { uz: 'Yulduzlararo', ru: 'Интерстеллар' },
    genres: ['scifi', 'drama', 'adventure'], rating: 8.7, duration: 169,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    desc: {
      uz: 'Yer sayyorasi yashash uchun yaroqsiz holga kelmoqda. Bir guruh tadqiqotchi insoniyatga yangi uy topish uchun qurt teshigi orqali boshqa galaktikaga yo‘l oladi.',
      ru: 'Земля становится непригодной для жизни. Группа исследователей отправляется через червоточину в другую галактику, чтобы найти новый дом для человечества.'
    },
    colors: ['#1b3a5c', '#0a1628'],
    poster: 'images/interstellar.jpg',
    trailer: 'https://www.youtube.com/watch?v=qcPfI0y7wRU',
    video: '',
    featured: true
  },
  {
    id: 2, slug: 'inception', year: 2010, type: 'film',
    title: { uz: 'Boshlanish', ru: 'Начало' },
    genres: ['scifi', 'thriller', 'action'], rating: 8.8, duration: 148,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    desc: {
      uz: 'Tushga kirib sir o‘g‘irlaydigan usta o‘g‘ri oxirgi ish sifatida mutlaqo teskari vazifani oladi — odam ongiga g‘oya joylashtirish.',
      ru: 'Мастер проникновения в сны получает последнее задание — не украсть идею, а внедрить её в чужой разум.'
    },
    colors: ['#2b2b3d', '#101018'],
    poster: 'images/inception.jpg',
    trailer: 'https://www.youtube.com/watch?v=85Zz1CCXyDI',
    video: '',
    featured: false
  },
  {
    id: 3, slug: 'the-dark-knight', year: 2008, type: 'film', franchise: 'dc',
    title: { uz: 'Qorong‘u ritsar', ru: 'Тёмный рыцарь' },
    genres: ['action', 'crime', 'drama'], rating: 9.0, duration: 152,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman'],
    desc: {
      uz: 'Gotham shahri tinchlanayotgan bir paytda Joker ismli tartibsizlik ustasi paydo bo‘ladi va Betmenning barcha tamoyillarini sinovga qo‘yadi.',
      ru: 'В Готэме появляется Джокер — гений хаоса, который ставит под сомнение все принципы Бэтмена.'
    },
    tags: ['Batman', 'Betmen', 'Бэтмен', 'Joker'],
    colors: ['#1f2937', '#050607'],
    poster: 'images/the-dark-knight.jpg',
    trailer: 'https://www.youtube.com/watch?v=KO90kiH6W0U',
    video: '',
    featured: true
  },
  {
    id: 4, slug: 'dune', year: 2021, type: 'film',
    title: { uz: 'Dyuna', ru: 'Дюна' },
    genres: ['scifi', 'adventure', 'drama'], rating: 8.0, duration: 155,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Zendaya'],
    desc: {
      uz: 'Yosh Pol Atreydes oilasi bilan koinotdagi eng qimmat resurs manbai bo‘lgan xavfli sahro sayyorasiga ko‘chib o‘tadi.',
      ru: 'Юный Пол Атрейдес вместе с семьёй перебирается на опасную пустынную планету — источник самого ценного ресурса во Вселенной.'
    },
    colors: ['#a0663a', '#2e1a10'],
    poster: 'images/dune.jpg',
    trailer: 'https://www.youtube.com/watch?v=Ja0zYjiQ8jc',
    video: '',
    featured: false
  },
  {
    id: 5, slug: 'oppenheimer', year: 2023, type: 'film',
    title: { uz: 'Oppengeymer', ru: 'Оппенгеймер' },
    genres: ['biography', 'drama', 'history'], rating: 8.3, duration: 180,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.', 'Matt Damon'],
    desc: {
      uz: 'Atom bombasini yaratgan olim Robert Oppengeymerning hayoti va o‘z kashfiyoti oldidagi ma’naviy iztiroblari haqida.',
      ru: 'История Роберта Оппенгеймера — учёного, создавшего атомную бомбу, и его мучительного противостояния с собственным творением.'
    },
    colors: ['#6b2f1e', '#1a0d08'],
    poster: 'images/oppenheimer.jpg',
    trailer: 'https://www.youtube.com/watch?v=PFepj-rWbFE',
    video: '',
    featured: true
  },
  {
    id: 6, slug: 'joker', year: 2019, type: 'film', franchise: 'dc',
    title: { uz: 'Joker', ru: 'Джокер' },
    genres: ['drama', 'thriller', 'crime'], rating: 8.4, duration: 122,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz'],
    desc: {
      uz: 'Jamiyat tomonidan rad etilgan yolg‘iz komediyachi Artur Flek asta-sekin shaharni larzaga soladigan shafqatsiz jinoyatchiga aylanadi.',
      ru: 'Отвергнутый обществом комик Артур Флек постепенно превращается в безжалостного преступника, потрясшего город.'
    },
    tags: ['Batman', 'Betmen', 'Бэтмен', 'Gotham'],
    colors: ['#3d2a52', '#140d1c'],
    poster: 'images/joker.jpg',
    trailer: 'https://www.youtube.com/watch?v=iC2RjcuAMx8',
    video: '',
    featured: false
  },
  {
    id: 7, slug: 'parasite', year: 2019, type: 'film',
    title: { uz: 'Parazitlar', ru: 'Паразиты' },
    genres: ['drama', 'thriller', 'comedy'], rating: 8.5, duration: 132,
    country: { uz: 'Janubiy Koreya', ru: 'Южная Корея' },
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    desc: {
      uz: 'Kambag‘al oila a’zolari birin-ketin boy oilaning uyiga ishga joylashadi. Ammo bu uy o‘zining dahshatli sirini yashirmoqda.',
      ru: 'Члены бедной семьи один за другим устраиваются на работу в богатый дом. Но дом хранит страшную тайну.'
    },
    colors: ['#4a5a3a', '#141a10'],
    poster: 'images/parasite.png',
    trailer: 'https://www.youtube.com/watch?v=GGnM74uxjlo',
    video: '',
    featured: false
  },
  {
    id: 8, slug: 'the-godfather', year: 1972, type: 'film',
    title: { uz: 'Cho‘qintirgan ota', ru: 'Крёстный отец' },
    genres: ['crime', 'drama'], rating: 9.2, duration: 175,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall'],
    desc: {
      uz: 'Qudratli mafiya klani boshlig‘i o‘z hokimiyatini kenja o‘g‘liga topshiradi. Bu qaror butun oila taqdirini o‘zgartiradi.',
      ru: 'Глава могущественного мафиозного клана передаёт власть младшему сыну — и это меняет судьбу всей семьи.'
    },
    colors: ['#4a3620', '#120c06'],
    poster: 'images/the-godfather.jpg',
    trailer: 'https://www.youtube.com/watch?v=oCl5La_eUhI',
    video: '',
    featured: false
  },
  {
    id: 9, slug: 'forrest-gump', year: 1994, type: 'film',
    title: { uz: 'Forrest Gamp', ru: 'Форрест Гамп' },
    genres: ['drama', 'romance', 'comedy'], rating: 8.8, duration: 142,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Robert Zemeckis',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    desc: {
      uz: 'Oddiy qalbli Forrest bilmagan holda Amerika tarixining eng muhim voqealarida ishtirok etadi — va bir umr yagona sevgisini kutadi.',
      ru: 'Простодушный Форрест невольно становится участником главных событий американской истории — и всю жизнь ждёт свою любовь.'
    },
    colors: ['#3f6a4f', '#101a13'],
    poster: 'images/forrest-gump.jpg',
    trailer: 'https://www.youtube.com/watch?v=otmeAaifX04',
    video: '',
    featured: false
  },
  {
    id: 10, slug: 'the-matrix', year: 1999, type: 'film',
    title: { uz: 'Matritsa', ru: 'Матрица' },
    genres: ['scifi', 'action'], rating: 8.7, duration: 136,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Lana & Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    desc: {
      uz: 'Dasturchi Neo o‘zi yashab kelgan dunyo aslida mashinalar yaratgan ulkan simulyatsiya ekanini bilib qoladi.',
      ru: 'Программист Нео узнаёт, что мир вокруг него — гигантская симуляция, созданная машинами.'
    },
    colors: ['#1d4a30', '#04120a'],
    poster: 'images/the-matrix.png',
    trailer: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
    video: '',
    featured: false
  },
  {
    id: 11, slug: 'gladiator', year: 2000, type: 'film',
    title: { uz: 'Gladiator', ru: 'Гладиатор' },
    genres: ['action', 'drama', 'history'], rating: 8.5, duration: 155,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Ridley Scott',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
    desc: {
      uz: 'Xiyonatga uchragan Rim sarkardasi qul qilinadi va arenada gladiator sifatida o‘ch olish yo‘lini izlaydi.',
      ru: 'Преданный римский полководец становится рабом и ищет мести на арене гладиаторов.'
    },
    colors: ['#7a5a2e', '#1c1408'],
    poster: 'images/gladiator.png',
    trailer: 'https://www.youtube.com/watch?v=F2Dr7Qb2Zf8',
    video: '',
    featured: false
  },
  {
    id: 12, slug: 'titanic', year: 1997, type: 'film',
    title: { uz: 'Titanik', ru: 'Титаник' },
    genres: ['romance', 'drama', 'history'], rating: 7.9, duration: 194,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'James Cameron',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
    desc: {
      uz: 'Turli tabaqadan bo‘lgan ikki yosh dunyodagi eng mashhur kemada bir-birini sevib qoladi — halokat arafasida.',
      ru: 'Двое молодых людей из разных сословий влюбляются на борту самого известного корабля — накануне катастрофы.'
    },
    colors: ['#1e4a6b', '#07141f'],
    poster: 'images/titanic.png',
    trailer: 'https://www.youtube.com/watch?v=qcU-kWvRcVc',
    video: '',
    featured: false
  },
  {
    id: 13, slug: 'avatar', year: 2009, type: 'film',
    title: { uz: 'Avatar', ru: 'Аватар' },
    genres: ['scifi', 'adventure', 'action'], rating: 7.9, duration: 162,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    desc: {
      uz: 'Nogiron harbiy Pandora sayyorasida avatar tanasiga ko‘chiriladi va mahalliy xalqni himoya qilish uchun kurashadi.',
      ru: 'Парализованный морпех попадает на Пандору в теле аватара и встаёт на защиту местного народа.'
    },
    colors: ['#1c5c6e', '#06161c'],
    poster: 'images/avatar.jpg',
    trailer: 'https://www.youtube.com/watch?v=uXC_0wE6k7k',
    video: '',
    featured: false
  },
  {
    id: 14, slug: 'john-wick', year: 2014, type: 'film',
    title: { uz: 'Jon Uik', ru: 'Джон Уик' },
    genres: ['action', 'thriller', 'crime'], rating: 7.4, duration: 101,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Michael Nyqvist', 'Willem Dafoe'],
    desc: {
      uz: 'Nafaqaga chiqqan afsonaviy qotil banditlar uning itini o‘ldirgach, qonli o‘ch olish yo‘liga qaytadi.',
      ru: 'Легендарный киллер возвращается к делам ради кровавой мести.'
    },
    colors: ['#5a1e2e', '#150609'],
    poster: 'images/john-wick.jpg',
    trailer: 'https://www.youtube.com/watch?v=gLGaBb_EFkg',
    video: '',
    featured: false
  },
  {
    id: 15, slug: 'the-shawshank-redemption', year: 1994, type: 'film',
    title: { uz: 'Sho‘shenkdan qochish', ru: 'Побег из Шоушенка' },
    genres: ['drama', 'crime'], rating: 9.3, duration: 142,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    desc: {
      uz: 'Qilmagan jinoyati uchun umrbod qamoqqa hukm qilingan bankir yillar davomida umidini yo‘qotmaydi.',
      ru: 'Банкир, осуждённый пожизненно за преступление, которого не совершал, годами не теряет надежды.'
    },
    colors: ['#4a4028', '#12100a'],
    poster: 'images/the-shawshank-redemption.jpg',
    trailer: 'https://www.youtube.com/watch?v=kgAeKpAPOYk',
    video: '',
    featured: false
  },
  {
    id: 16, slug: 'spirited-away', year: 2001, type: 'multfilm',
    title: { uz: 'Ruhlar olami', ru: 'Унесённые призраками' },
    genres: ['animation', 'fantasy', 'adventure', 'family'], rating: 8.6, duration: 125,
    country: { uz: 'Yaponiya', ru: 'Япония' },
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    desc: {
      uz: 'Qizaloq Chixiro sehrli ruhlar olamiga tushib qoladi va ota-onasini qutqarish uchun kurashadi.',
      ru: 'Девочка Тихиро попадает в волшебный мир духов и борется за спасение родителей.'
    },
    colors: ['#2f6a6a', '#0b1c1c'],
    poster: 'images/spirited-away.png',
    trailer: 'https://www.youtube.com/watch?v=bgxiTkAlQrw',
    video: '',
    featured: false
  },
  {
    id: 17, slug: 'coco', year: 2017, type: 'multfilm',
    title: { uz: 'Koko', ru: 'Тайна Коко' },
    genres: ['animation', 'family', 'adventure'], rating: 8.4, duration: 105,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Lee Unkrich',
    cast: ['Anthony Gonzalez', 'Gael García Bernal', 'Benjamin Bratt'],
    desc: {
      uz: 'Musiqani sevuvchi bola Migel o‘liklar olamiga tushib qoladi va oilasining unutilgan sirini ochadi.',
      ru: 'Мальчик Мигель, мечтающий о музыке, попадает в Мир Мёртвых и раскрывает тайну своей семьи.'
    },
    colors: ['#8a3f7a', '#1c0c19'],
    poster: 'images/coco.jpg',
    trailer: 'https://www.youtube.com/watch?v=HMnUSq3dC1g',
    video: '',
    featured: false
  },
  {
    id: 18, slug: 'toy-story', year: 1995, type: 'multfilm',
    title: { uz: 'O‘yinchoqlar hikoyasi', ru: 'История игрушек' },
    genres: ['animation', 'family', 'comedy', 'adventure'], rating: 8.3, duration: 81,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'John Lasseter',
    cast: ['Tom Hanks', 'Tim Allen', 'Don Rickles'],
    desc: {
      uz: 'Kovboy o‘yinchoq Vudi uyga yangi kelgan kosmonavt Bazzni raqib deb biladi — ammo ular do‘st bo‘lishga majbur.',
      ru: 'Ковбой Вуди видит в новом игрушечном астронавте Баззе соперника — но им придётся стать друзьями.'
    },
    colors: ['#2b6fb5', '#0a1a2b'],
    poster: 'images/toy-story.jpg',
    trailer: 'https://www.youtube.com/watch?v=A4sqe5q4b3Y',
    video: '',
    featured: false
  },
  {
    id: 19, slug: 'shrek', year: 2001, type: 'multfilm',
    title: { uz: 'Shrek', ru: 'Шрек' },
    genres: ['animation', 'comedy', 'family', 'fantasy'], rating: 7.9, duration: 90,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Andrew Adamson',
    cast: ['Mike Myers', 'Eddie Murphy', 'Cameron Diaz'],
    desc: {
      uz: 'Yolg‘izlikni sevuvchi ogr Shrek gapiruvchi eshak bilan malikani qutqarish safariga chiqadi.',
      ru: 'Огр Шрек вместе с говорящим Ослом отправляется спасать принцессу.'
    },
    colors: ['#4a7a24', '#111c07'],
    poster: 'images/shrek.jpg',
    trailer: 'https://www.youtube.com/watch?v=1w1wBO-hlmA',
    video: '',
    featured: false
  },
  {
    id: 20, slug: 'mad-max-fury-road', year: 2015, type: 'film',
    title: { uz: 'Mad Maks: G‘azab yo‘li', ru: 'Безумный Макс: Дорога ярости' },
    genres: ['action', 'adventure', 'scifi'], rating: 8.1, duration: 120,
    country: { uz: 'Avstraliya', ru: 'Австралия' },
    director: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    desc: {
      uz: 'Post-apokaliptik sahroda Maks va Furiosa zolim hukmdordan qochib, cheksiz quvg‘inga tushadi.',
      ru: 'В постапокалиптической пустыне Макс и Фуриоса бегут от тирана сквозь бесконечную погоню.'
    },
    colors: ['#a8541e', '#201004'],
    poster: 'images/mad-max-fury-road.jpg',
    trailer: 'https://www.youtube.com/watch?v=-3ZoAp6owdk',
    video: '',
    featured: false
  },
  {
    id: 21, slug: 'whiplash', year: 2014, type: 'film',
    title: { uz: 'Barabanchi', ru: 'Одержимость' },
    genres: ['drama'], rating: 8.5, duration: 106,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Melissa Benoist'],
    desc: {
      uz: 'Yosh barabanchi mukammallikka intiladi, lekin shafqatsiz ustoz uni chegaradan ham narisiga surib boradi.',
      ru: 'Юный барабанщик стремится к совершенству, а жестокий наставник толкает его за все пределы.'
    },
    colors: ['#8a5a10', '#1a1104'],
    poster: 'images/whiplash.jpg',
    trailer: 'https://www.youtube.com/watch?v=Q9PxDPOo1jw',
    video: '',
    featured: false
  },
  {
    id: 22, slug: 'fight-club', year: 1999, type: 'film',
    title: { uz: 'Jangovar klub', ru: 'Бойцовский клуб' },
    genres: ['drama', 'thriller'], rating: 8.8, duration: 139,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
    desc: {
      uz: 'Uyqusizlikdan aziyat chekayotgan ofis xodimi sirli Tayler Durden bilan yashirin jangovar klub tashkil qiladi.',
      ru: 'Страдающий бессонницей клерк вместе с загадочным Тайлером Дёрденом создаёт подпольный бойцовский клуб.'
    },
    colors: ['#5a3030', '#140808'],
    poster: 'images/fight-club.jpg',
    trailer: 'https://www.youtube.com/watch?v=C7-7qQ61QHU',
    video: '',
    featured: false
  },
  {
    id: 23, slug: 'se7en', year: 1995, type: 'film',
    title: { uz: 'Yetti', ru: 'Семь' },
    genres: ['detective', 'thriller', 'crime'], rating: 8.6, duration: 127,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Morgan Freeman', 'Kevin Spacey'],
    desc: {
      uz: 'Ikki detektiv yetti gunoh asosida qotilliklar sodir etayotgan manyakni qidiradi.',
      ru: 'Два детектива ищут маньяка, совершающего убийства по мотивам семи смертных грехов.'
    },
    colors: ['#2a3236', '#080b0d'],
    poster: 'images/se7en.jpg',
    trailer: 'https://www.youtube.com/watch?v=GiFyoro7u78',
    video: '',
    featured: false
  },
  {
    id: 24, slug: 'the-wolf-of-wall-street', year: 2013, type: 'film',
    title: { uz: 'Uoll-strit bo‘risi', ru: 'Волк с Уолл-стрит' },
    genres: ['biography', 'comedy', 'crime'], rating: 8.2, duration: 180,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Martin Scorsese',
    cast: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    desc: {
      uz: 'Jordan Belfortning yo‘qdan sanoqsiz boylik yaratgan va keyin hammasini yo‘qotgan haqiqiy hikoyasi.',
      ru: 'Реальная история Джордана Белфорта, сделавшего состояние из ничего — и потерявшего всё.'
    },
    colors: ['#9a7a20', '#1c1606'],
    poster: 'images/the-wolf-of-wall-street.png',
    trailer: 'https://www.youtube.com/watch?v=CHivqmutR0I',
    video: '',
    featured: false
  },
  {
    id: 25, slug: 'breaking-bad', year: 2008, type: 'serial',
    title: { uz: 'Breaking Bad', ru: 'Во все тяжкие' },
    genres: ['crime', 'drama', 'thriller'], rating: 9.5, seasons: 5,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    desc: {
      uz: 'Saraton tashxisini olgan kimyo o‘qituvchisi oilasini ta’minlash uchun narkotik ishlab chiqarishni boshlaydi.',
      ru: 'Учитель химии с диагнозом рак начинает варить метамфетамин, чтобы обеспечить семью.'
    },
    colors: ['#3a5a2a', '#0c1408'],
    poster: 'images/breaking-bad.png',
    trailer: 'https://www.youtube.com/watch?v=uXPMbmR-V44',
    video: '',
    featured: false
  },
  {
    id: 26, slug: 'game-of-thrones', year: 2011, type: 'serial',
    title: { uz: 'Taxtlar o‘yini', ru: 'Игра престолов' },
    genres: ['fantasy', 'drama', 'adventure'], rating: 9.2, seasons: 8,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'David Benioff, D. B. Weiss',
    cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage', 'Lena Headey'],
    desc: {
      uz: 'To‘qqizta olijanob oila Temir Taxt uchun kurashadi, shimolda esa qadimiy dahshat uyg‘onmoqda.',
      ru: 'Девять благородных домов борются за Железный трон, а на Севере просыпается древнее зло.'
    },
    colors: ['#4a4a5a', '#0e0e14'],
    poster: 'images/game-of-thrones.jpg',
    trailer: 'https://www.youtube.com/watch?v=EKwB1HAuiZg',
    video: '',
    featured: false
  },
  {
    id: 27, slug: 'stranger-things', year: 2016, type: 'serial',
    title: { uz: 'Stranger Things', ru: 'Очень странные дела' },
    genres: ['scifi', 'horror', 'drama'], rating: 8.7, seasons: 4,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour'],
    desc: {
      uz: 'Kichik shaharchada bola g‘oyib bo‘ladi va do‘stlari sirli kuchlarga ega qiz bilan boshqa o‘lchamni kashf etadi.',
      ru: 'В маленьком городке пропадает мальчик, а его друзья вместе с девочкой со сверхспособностями открывают другое измерение.'
    },
    colors: ['#7a1520', '#180407'],
    poster: 'images/stranger-things.png',
    trailer: 'https://www.youtube.com/watch?v=PX6KNzyQfZM',
    video: '',
    featured: true
  },
  {
    id: 28, slug: 'chernobyl', year: 2019, type: 'serial',
    title: { uz: 'Chernobil', ru: 'Чернобыль' },
    genres: ['drama', 'history', 'thriller'], rating: 9.3, seasons: 1,
    country: { uz: 'AQSh, Buyuk Britaniya', ru: 'США, Великобритания' },
    director: 'Johan Renck',
    cast: ['Jared Harris', 'Stellan Skarsgård', 'Emily Watson'],
    desc: {
      uz: '1986-yilgi Chernobil halokati va uning ko‘lamini yashirishga urinishlar haqidagi haqiqiy voqealarga asoslangan mini-serial.',
      ru: 'Мини-сериал о катастрофе 1986 года и попытках скрыть её масштабы.'
    },
    colors: ['#5a6a3a', '#12160c'],
    poster: 'images/chernobyl.jpg',
    trailer: 'https://www.youtube.com/watch?v=NQEtwLPn5Fw',
    video: '',
    featured: false
  },
  {
    id: 29, slug: 'the-witcher', year: 2019, type: 'serial',
    title: { uz: 'Vedmak', ru: 'Ведьмак' },
    genres: ['fantasy', 'action', 'adventure'], rating: 8.0, seasons: 3,
    country: { uz: 'AQSh, Polsha', ru: 'США, Польша' },
    director: 'Lauren Schmidt Hissrich',
    cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
    desc: {
      uz: 'Maxluqlarga qarshi kurashuvchi mutant Geralt taqdiri bilan bog‘langan malika Sirini himoya qiladi.',
      ru: 'Охотник на чудовищ Геральт защищает принцессу Цири, связанную с ним судьбой.'
    },
    colors: ['#3a4a5a', '#0c1014'],
    poster: 'images/the-witcher.png',
    trailer: 'https://www.youtube.com/watch?v=Xtf3c-Y20Lw',
    video: '',
    featured: false
  },
  {
    id: 30, slug: 'wednesday', year: 2022, type: 'serial',
    title: { uz: 'Uednsdey', ru: 'Уэнсдэй' },
    genres: ['detective', 'comedy', 'fantasy'], rating: 8.1, seasons: 2,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Tim Burton',
    cast: ['Jenna Ortega', 'Catherine Zeta-Jones', 'Gwendoline Christie'],
    desc: {
      uz: 'Uednsdey Addams sirli akademiyada o‘qiy boshlaydi va shaharni qo‘rquvda saqlayotgan qotilliklarni tergov qiladi.',
      ru: 'Уэнсдэй Аддамс поступает в загадочную академию и расследует серию убийств.'
    },
    colors: ['#2a4a42', '#080f0d'],
    poster: 'images/wednesday.jpg',
    trailer: 'https://www.youtube.com/watch?v=zUyGvjsc6zo',
    video: '',
    featured: false
  },
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
  {
    id: 32, slug: 'iron-man', year: 2008, type: 'film', franchise: 'marvel',
    title: { uz: 'Temir odam', ru: 'Железный человек' },
    genres: ['action', 'scifi', 'adventure'], rating: 7.9, duration: 126,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Jon Favreau',
    cast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Jeff Bridges', 'Terrence Howard'],
    desc: {
      uz: 'Qurol ishlab chiqaruvchi milliarder Toni Stark asirlikda o‘zi uchun zirh yaratadi va uydan chiqib, qahramonga aylanishga qaror qiladi.',
      ru: 'Миллиардер-оружейник Тони Старк создаёт в плену боевой костюм и решает стать героем.'
    },
    tags: ['Avengers', 'Qasoskorlar', 'Мстители', 'Tony Stark'],
    colors: ['#8a2a1e', '#1c0a07'],
    poster: 'images/iron-man.jpg',
    trailer: 'https://www.youtube.com/watch?v=i_IIxuHAClc',
    video: '',
    featured: false
  },
  {
    id: 33, slug: 'the-avengers', year: 2012, type: 'film', franchise: 'marvel',
    title: { uz: 'Qasoskorlar', ru: 'Мстители' },
    genres: ['action', 'scifi', 'adventure'], rating: 8.0, duration: 143,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo', 'Chris Hemsworth'],
    desc: {
      uz: 'Loki Yerga bostirib kirganda, Nik Fyuri sayyorani qutqarish uchun dunyodagi eng kuchli qahramonlarni bir jamoaga to‘playdi.',
      ru: 'Когда Локи вторгается на Землю, Ник Фьюри собирает величайших героев планеты в одну команду.'
    },
    colors: ['#1e3a6b', '#070e1c'],
    poster: 'images/the-avengers.jpg',
    trailer: 'https://www.youtube.com/watch?v=5iw-hJ6xteE',
    video: '',
    featured: false
  },
  {
    id: 34, slug: 'guardians-of-the-galaxy', year: 2014, type: 'film', franchise: 'marvel',
    title: { uz: 'Galaktika qo‘riqchilari', ru: 'Стражи Галактики' },
    genres: ['action', 'scifi', 'comedy', 'adventure'], rating: 8.0, duration: 121,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Bradley Cooper', 'Vin Diesel'],
    desc: {
      uz: 'Koinot bo‘ylab sarson beshta jinoyatchi kutilmaganda galaktikani halokatdan qutqaruvchi jamoaga aylanadi.',
      ru: 'Пятеро космических изгоев неожиданно становятся командой, спасающей галактику от уничтожения.'
    },
    colors: ['#6b2a7a', '#160a1a'],
    poster: 'images/guardians-of-the-galaxy.jpg',
    trailer: 'https://www.youtube.com/watch?v=p7VRUK7ctmU',
    video: '',
    featured: false
  },
  {
    id: 35, slug: 'captain-america-winter-soldier', year: 2014, type: 'film', franchise: 'marvel',
    title: { uz: 'Kapitan Amerika: Qish askari', ru: 'Первый мститель: Другая война' },
    genres: ['action', 'thriller', 'scifi'], rating: 7.7, duration: 136,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Anthony & Joe Russo',
    cast: ['Chris Evans', 'Scarlett Johansson', 'Sebastian Stan', 'Robert Redford'],
    desc: {
      uz: 'Stiv Rojers S.H.I.E.L.D. ichidagi xiyonatni fosh qiladi va o‘tmishdan qaytgan sirli qotil bilan to‘qnashadi.',
      ru: 'Стив Роджерс раскрывает заговор внутри Щ.И.Т. и сталкивается с загадочным убийцей из прошлого.'
    },
    colors: ['#2a4a6b', '#0a1220'],
    poster: 'images/captain-america-winter-soldier.jpg',
    trailer: 'https://www.youtube.com/watch?v=sxtuHEazdoQ',
    video: '',
    featured: false
  },
  {
    id: 36, slug: 'doctor-strange', year: 2016, type: 'film', franchise: 'marvel',
    title: { uz: 'Doktor Streyndj', ru: 'Доктор Стрэндж' },
    genres: ['action', 'fantasy', 'adventure'], rating: 7.5, duration: 115,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Scott Derrickson',
    cast: ['Benedict Cumberbatch', 'Chiwetel Ejiofor', 'Rachel McAdams', 'Tilda Swinton'],
    desc: {
      uz: 'Halokatdan so‘ng qo‘llarini yo‘qotgan mag‘rur jarroh sehr sirlarini o‘rganib, olamlar himoyachisiga aylanadi.',
      ru: 'Потерявший руки после аварии хирург постигает тайны магии и становится защитником миров.'
    },
    colors: ['#7a4a1e', '#1a0f06'],
    poster: 'images/doctor-strange.jpg',
    trailer: 'https://www.youtube.com/watch?v=o3tqPNSGzfE',
    video: '',
    featured: false
  },
  {
    id: 37, slug: 'thor-ragnarok', year: 2017, type: 'film', franchise: 'marvel',
    title: { uz: 'Tor: Ragnarok', ru: 'Тор: Рагнарёк' },
    genres: ['action', 'comedy', 'fantasy', 'adventure'], rating: 7.9, duration: 130,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Taika Waititi',
    cast: ['Chris Hemsworth', 'Tom Hiddleston', 'Cate Blanchett', 'Mark Ruffalo'],
    desc: {
      uz: 'Bolg‘asidan ayrilgan Tor uzoq sayyorada gladiator jangiga tushadi va Asgardni Xeladan qutqarishga shoshiladi.',
      ru: 'Лишившийся молота Тор попадает на гладиаторскую арену и спешит спасти Асгард от Хелы.'
    },
    colors: ['#8a3a6b', '#1a0a14'],
    poster: 'images/thor-ragnarok.jpg',
    trailer: 'https://www.youtube.com/watch?v=yuXHUmpcwbQ',
    video: '',
    featured: false
  },
  {
    id: 38, slug: 'black-panther', year: 2018, type: 'film', franchise: 'marvel',
    title: { uz: 'Qora pantera', ru: 'Чёрная пантера' },
    genres: ['action', 'scifi', 'adventure'], rating: 7.3, duration: 134,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Ryan Coogler',
    cast: ['Chadwick Boseman', 'Michael B. Jordan', 'Lupita Nyong\'o', 'Danai Gurira'],
    desc: {
      uz: 'Vakanda taxtiga o‘tirgan T‘Challa mamlakat siri ochilib ketish xavfi va o‘z qarindoshi tomonidan sinovga qo‘yiladi.',
      ru: 'Взошедший на трон Ваканды Т’Чалла сталкивается с угрозой раскрытия тайны страны и с собственным родственником.'
    },
    colors: ['#3a2a6b', '#0c0818'],
    poster: 'images/black-panther.jpg',
    trailer: 'https://www.youtube.com/watch?v=qGpejFwCZS0',
    video: '',
    featured: false
  },
  {
    id: 39, slug: 'avengers-infinity-war', year: 2018, type: 'film', franchise: 'marvel',
    title: { uz: 'Qasoskorlar: Cheksizlik urushi', ru: 'Мстители: Война бесконечности' },
    genres: ['action', 'scifi', 'adventure'], rating: 8.4, duration: 149,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Anthony & Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Josh Brolin', 'Chris Evans', 'Scarlett Johansson'],
    desc: {
      uz: 'Tanos oltita Cheksizlik toshini yig‘ib, koinot aholisining yarmini yo‘q qilmoqchi. Qasoskorlar uni to‘xtatishga urinadi.',
      ru: 'Танос собирает шесть Камней Бесконечности, чтобы уничтожить половину Вселенной. Мстители пытаются его остановить.'
    },
    colors: ['#6b2a4a', '#160810'],
    poster: 'images/avengers-infinity-war.jpg',
    trailer: 'https://www.youtube.com/watch?v=FeJKZMFJ7NA',
    video: '',
    featured: false
  },
  {
    id: 40, slug: 'avengers-endgame', year: 2019, type: 'film', franchise: 'marvel',
    title: { uz: 'Qasoskorlar: Final', ru: 'Мстители: Финал' },
    genres: ['action', 'scifi', 'drama', 'adventure'], rating: 8.4, duration: 181,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Anthony & Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo', 'Josh Brolin'],
    desc: {
      uz: 'Tanosning qirg‘inidan omon qolgan qahramonlar yo‘qotilgan hamma narsani qaytarish uchun so‘nggi umidsiz rejani amalga oshiradi.',
      ru: 'Выжившие после щелчка Таноса герои идут на отчаянный шаг, чтобы вернуть всё потерянное.'
    },
    colors: ['#2a4a5a', '#08131a'],
    poster: 'images/avengers-endgame.jpg',
    trailer: 'https://www.youtube.com/watch?v=Io2dwq7B7xM',
    video: '',
    featured: true
  },
  {
    id: 41, slug: 'spider-man-no-way-home', year: 2021, type: 'film', franchise: 'marvel',
    title: { uz: 'O‘rgimchak-odam: Uyga yo‘l yo‘q', ru: 'Человек-паук: Нет пути домой' },
    genres: ['action', 'scifi', 'adventure'], rating: 8.2, duration: 148,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe'],
    desc: {
      uz: 'Piter Parkerning shaxsi oshkor bo‘lgach, u Doktor Streyndjdan yordam so‘raydi — va bu qadam olamlar orasidagi devorni ochib yuboradi.',
      ru: 'После раскрытия личности Питер Паркер просит помощи у Доктора Стрэнджа — и это открывает двери между вселенными.'
    },
    tags: ['Spider-Man', 'Человек-паук'],
    colors: ['#7a1e3a', '#18060c'],
    poster: 'images/spider-man-no-way-home.jpg',
    trailer: 'https://www.youtube.com/watch?v=gEG-EN9L7rA',
    video: '',
    featured: true
  },
  {
    id: 42, slug: 'deadpool', year: 2016, type: 'film', franchise: 'marvel',
    title: { uz: 'Dedpul', ru: 'Дэдпул' },
    genres: ['action', 'comedy', 'adventure'], rating: 8.0, duration: 108,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Tim Miller',
    cast: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller'],
    desc: {
      uz: 'Shafqatsiz tajribadan so‘ng g‘ayritabiiy qobiliyat olgan yollanma askar o‘ziga qilingan yomonlik uchun hazil-huzul bilan o‘ch oladi.',
      ru: 'Получивший сверхспособности после жестокого эксперимента наёмник мстит своим мучителям — с фирменным чёрным юмором.'
    },
    colors: ['#8a1e1e', '#1a0606'],
    poster: 'images/deadpool.png',
    trailer: 'https://www.youtube.com/watch?v=EmH6VNG8QEE',
    video: '',
    featured: false
  },
  {
    id: 43, slug: 'into-the-spider-verse', year: 2018, type: 'multfilm', franchise: 'marvel',
    title: { uz: 'O‘rgimchak-odam: Olamlar uzra', ru: 'Человек-паук: Через вселенные' },
    genres: ['animation', 'action', 'adventure', 'family'], rating: 8.4, duration: 117,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld', 'Mahershala Ali'],
    desc: {
      uz: 'O‘smir Mayls Morales boshqa olamlardan kelgan O‘rgimchak-odamlar bilan uchrashadi va o‘z qahramonligini topishi kerak.',
      ru: 'Подросток Майлз Моралес встречает Людей-пауков из других вселенных и должен найти собственного героя внутри себя.'
    },
    tags: ['Spider-Man', 'O‘rgimchak', 'Человек-паук'],
    colors: ['#7a1e6b', '#160518'],
    poster: 'images/into-the-spider-verse.png',
    trailer: 'https://www.youtube.com/watch?v=LQRvEknx6OU',
    video: '',
    featured: false
  },
  {
    id: 44, slug: 'batman-begins', year: 2005, type: 'film', franchise: 'dc',
    title: { uz: 'Betmen boshlanishi', ru: 'Бэтмен: Начало' },
    genres: ['action', 'crime', 'drama'], rating: 8.2, duration: 140,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Michael Caine', 'Liam Neeson', 'Cillian Murphy'],
    desc: {
      uz: 'Ota-onasidan ayrilgan Bryus Ueyn dunyo kezib o‘z qo‘rquvini yengadi va Gotemning himoyachisi Betmenga aylanadi.',
      ru: 'Потерявший родителей Брюс Уэйн побеждает свой страх и становится защитником Готэма — Бэтменом.'
    },
    tags: ['Batman', 'Бэтмен'],
    colors: ['#2a2a3a', '#08080d'],
    poster: 'images/batman-begins.jpg',
    trailer: 'https://www.youtube.com/watch?v=ZjIQbHL0gI8',
    video: '',
    featured: false
  },
  {
    id: 45, slug: 'the-dark-knight-rises', year: 2012, type: 'film', franchise: 'dc',
    title: { uz: 'Qorong‘u ritsar qaytadi', ru: 'Тёмный рыцарь: Возрождение легенды' },
    genres: ['action', 'crime', 'drama'], rating: 8.4, duration: 164,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Tom Hardy', 'Anne Hathaway', 'Gary Oldman'],
    desc: {
      uz: 'Sakkiz yillik sukunatdan so‘ng Betmen Gotemni Beyn ismli shafqatsiz kuchdan himoya qilish uchun qaytadi.',
      ru: 'После восьми лет затишья Бэтмен возвращается, чтобы защитить Готэм от беспощадного Бэйна.'
    },
    tags: ['Batman', 'Betmen', 'Бэтмен', 'Bane'],
    colors: ['#3a3a44', '#0a0a0e'],
    poster: 'images/the-dark-knight-rises.jpg',
    trailer: 'https://www.youtube.com/watch?v=MytbeYrN1R8',
    video: '',
    featured: false
  },
  {
    id: 46, slug: 'man-of-steel', year: 2013, type: 'film', franchise: 'dc',
    title: { uz: 'Po‘lat odam', ru: 'Человек из стали' },
    genres: ['action', 'scifi', 'adventure'], rating: 7.1, duration: 143,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Zack Snyder',
    cast: ['Henry Cavill', 'Amy Adams', 'Michael Shannon', 'Russell Crowe'],
    desc: {
      uz: 'Boshqa sayyorada tug‘ilgan Klark Kent o‘z kelib chiqishini bilib oladi va Yerni general Zoddan himoya qilishi kerak.',
      ru: 'Рождённый на другой планете Кларк Кент узнаёт своё происхождение и должен защитить Землю от генерала Зода.'
    },
    tags: ['Superman', 'Supermen', 'Супермен'],
    colors: ['#1e4a7a', '#06121e'],
    poster: 'images/man-of-steel.jpg',
    trailer: 'https://www.youtube.com/watch?v=ZG1E_GCtjHA',
    video: '',
    featured: false
  },
  {
    id: 47, slug: 'batman-v-superman', year: 2016, type: 'film', franchise: 'dc',
    title: { uz: 'Betmen Supermenga qarshi: Adolat tongi', ru: 'Бэтмен против Супермена: На заре справедливости' },
    genres: ['action', 'scifi', 'adventure'], rating: 6.5, duration: 151,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Zack Snyder',
    cast: ['Ben Affleck', 'Henry Cavill', 'Gal Gadot', 'Jesse Eisenberg'],
    desc: {
      uz: 'Gotem himoyachisi Metropolis qahramonini insoniyat uchun xavf deb biladi — ikki afsona bir-biriga qarshi chiqadi.',
      ru: 'Защитник Готэма видит в герое Метрополиса угрозу человечеству — и две легенды сходятся в бою.'
    },
    tags: ['Batman', 'Superman', 'Бэтмен', 'Супермен'],
    colors: ['#3a3a5a', '#0a0a14'],
    poster: 'images/batman-v-superman.jpg',
    trailer: 'https://www.youtube.com/watch?v=BL-b9f7nyx4',
    video: '',
    featured: false
  },
  {
    id: 48, slug: 'wonder-woman', year: 2017, type: 'film', franchise: 'dc',
    title: { uz: 'Mo‘jizakor ayol', ru: 'Чудо-женщина' },
    genres: ['action', 'fantasy', 'adventure', 'war'], rating: 7.3, duration: 141,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Patty Jenkins',
    cast: ['Gal Gadot', 'Chris Pine', 'Robin Wright', 'Danny Huston'],
    desc: {
      uz: 'Amazonkalar orolida o‘sgan Diana Birinchi jahon urushini to‘xtatish uchun odamlar dunyosiga chiqadi.',
      ru: 'Выросшая на острове амазонок Диана отправляется в мир людей, чтобы остановить Первую мировую войну.'
    },
    colors: ['#8a5a1e', '#1a1006'],
    poster: 'images/wonder-woman.jpg',
    trailer: 'https://www.youtube.com/watch?v=GE4GT52MJuM',
    video: '',
    featured: false
  },
  {
    id: 49, slug: 'aquaman', year: 2018, type: 'film', franchise: 'dc',
    title: { uz: 'Akvamen', ru: 'Аквамен' },
    genres: ['action', 'fantasy', 'adventure'], rating: 6.8, duration: 143,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'James Wan',
    cast: ['Jason Momoa', 'Amber Heard', 'Patrick Wilson', 'Nicole Kidman'],
    desc: {
      uz: 'Yarim odam, yarim atlantlik Artur Karri suv osti shohligining qonuniy taxtini talashib, urushning oldini olishga harakat qiladi.',
      ru: 'Полукровка Артур Карри заявляет права на трон подводного королевства, чтобы предотвратить войну.'
    },
    colors: ['#1e6b7a', '#06161a'],
    poster: 'images/aquaman.jpg',
    trailer: 'https://www.youtube.com/watch?v=bUq_fbMUYnE',
    video: '',
    featured: false
  },
  {
    id: 50, slug: 'shazam', year: 2019, type: 'film', franchise: 'dc',
    title: { uz: 'Shazam!', ru: 'Шазам!' },
    genres: ['action', 'comedy', 'fantasy', 'family'], rating: 7.0, duration: 132,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'David F. Sandberg',
    cast: ['Zachary Levi', 'Asher Angel', 'Mark Strong', 'Jack Dylan Grazer'],
    desc: {
      uz: 'O‘n to‘rt yoshli Billi bitta so‘zni aytishi bilan kattalar qiyofasidagi super qahramonga aylanadi.',
      ru: 'Четырнадцатилетний Билли одним словом превращается во взрослого супергероя.'
    },
    colors: ['#a03a1e', '#1e0a06'],
    poster: 'images/shazam.jpg',
    trailer: 'https://www.youtube.com/watch?v=rvJdxDjn6nI',
    video: '',
    featured: false
  },
  {
    id: 51, slug: 'zack-snyders-justice-league', year: 2021, type: 'film', franchise: 'dc',
    title: { uz: 'Zak Snayderning Adolat ligasi', ru: 'Лига справедливости Зака Снайдера' },
    genres: ['action', 'scifi', 'adventure'], rating: 7.9, duration: 242,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Zack Snyder',
    cast: ['Ben Affleck', 'Henry Cavill', 'Gal Gadot', 'Ezra Miller', 'Ray Fisher'],
    desc: {
      uz: 'Supermen halok bo‘lgach, Betmen va Diana Yerni yangi tahdiddan qutqarish uchun qahramonlar jamoasini yig‘adi.',
      ru: 'После гибели Супермена Бэтмен и Диана собирают команду героев, чтобы спасти Землю от новой угрозы.'
    },
    colors: ['#2a3a4a', '#080c12'],
    poster: 'images/zack-snyders-justice-league.png',
    trailer: 'https://www.youtube.com/watch?v=m9Jp6ZfBavw',
    video: '',
    featured: false
  },
  {
    id: 52, slug: 'the-batman', year: 2022, type: 'film', franchise: 'dc',
    title: { uz: 'Betmen', ru: 'Бэтмен' },
    genres: ['action', 'crime', 'detective', 'thriller'], rating: 7.8, duration: 176,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Colin Farrell'],
    desc: {
      uz: 'Ikkinchi yilini o‘tayotgan Betmen Gotem elitasini nishonga olgan Topishmoqchi ismli qotilning izidan boradi.',
      ru: 'На втором году борьбы Бэтмен идёт по следу Загадочника, убивающего элиту Готэма.'
    },
    tags: ['Batman', 'Бэтмен'],
    colors: ['#5a2a1e', '#140806'],
    poster: 'images/the-batman.jpg',
    trailer: 'https://www.youtube.com/watch?v=GeagFRms_xE',
    video: '',
    featured: true
  },
  {
    id: 53, slug: 'star-wars-a-new-hope', year: 1977, type: 'film',
    title: { uz: 'Yulduzli urushlar: Yangi umid', ru: 'Звёздные войны: Новая надежда' },
    genres: ['scifi', 'adventure', 'fantasy'], rating: 8.6, duration: 121,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'George Lucas',
    cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Alec Guinness'],
    desc: {
      uz: 'Sahro sayyorasidagi yosh Lyuk Skayvoker qo‘zg‘olonchilarga qo‘shilib, Imperiyaning halokatli qurolini yo‘q qilishga kirishadi.',
      ru: 'Юный Люк Скайуокер с пустынной планеты присоединяется к повстанцам, чтобы уничтожить смертоносное оружие Империи.'
    },
    tags: ['Star Wars', 'Yulduzli urushlar', 'Звёздные войны', 'Jedi'],
    colors: ['#6b5a1e', '#161206'],
    poster: 'images/star-wars-a-new-hope.jpg',
    trailer: 'https://www.youtube.com/watch?v=Opxh5AqFByQ',
    video: '',
    featured: true
  },
  {
    id: 54, slug: 'alien', year: 1979, type: 'film',
    title: { uz: 'Yot mavjudot', ru: 'Чужой' },
    genres: ['horror', 'scifi', 'thriller'], rating: 8.5, duration: 117,
    country: { uz: 'Buyuk Britaniya, AQSh', ru: 'Великобритания, США' },
    director: 'Ridley Scott',
    cast: ['Sigourney Weaver', 'Tom Skerritt', 'John Hurt', 'Ian Holm'],
    desc: {
      uz: 'Yuk kemasi ekipaji noma’lum signalga javob beradi va bortga olamdagi eng mukammal yirtqichni olib kiradi.',
      ru: 'Экипаж грузового корабля отвечает на неизвестный сигнал и приносит на борт совершенного хищника.'
    },
    colors: ['#1e2a2a', '#060a0a'],
    poster: 'images/alien.jpg',
    trailer: 'https://www.youtube.com/watch?v=xIe98nyo3xI',
    video: '',
    featured: false
  },
  {
    id: 55, slug: 'back-to-the-future', year: 1985, type: 'film',
    title: { uz: 'Kelajakka qaytish', ru: 'Назад в будущее' },
    genres: ['scifi', 'comedy', 'adventure'], rating: 8.5, duration: 116,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Robert Zemeckis',
    cast: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson', 'Crispin Glover'],
    desc: {
      uz: 'O‘smir Marti Makflay do‘sti yasagan vaqt mashinasida 1955-yilga tushib qoladi va o‘z tug‘ilishini xavf ostiga qo‘yadi.',
      ru: 'Подросток Марти Макфлай попадает в 1955 год на машине времени друга и рискует собственным появлением на свет.'
    },
    colors: ['#8a5a1e', '#1a1006'],
    poster: 'images/back-to-the-future.jpg',
    trailer: 'https://www.youtube.com/watch?v=6mJWHY2Jl-8',
    video: '',
    featured: false
  },
  {
    id: 56, slug: 'terminator-2', year: 1991, type: 'film',
    title: { uz: 'Terminator 2: Qiyomat kuni', ru: 'Терминатор 2: Судный день' },
    genres: ['action', 'scifi', 'thriller'], rating: 8.6, duration: 137,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'James Cameron',
    cast: ['Arnold Schwarzenegger', 'Linda Hamilton', 'Edward Furlong', 'Robert Patrick'],
    desc: {
      uz: 'Kelajakdan yuborilgan kiborg endi bolani himoya qilishi kerak — uni ovlayotgan yanada mukammal mashinadan.',
      ru: 'Присланный из будущего киборг теперь должен защитить мальчика от куда более совершенной машины.'
    },
    tags: ['Terminator', 'Терминатор'],
    colors: ['#2a3a4a', '#080c12'],
    poster: 'images/terminator-2.png',
    trailer: 'https://www.youtube.com/watch?v=M-SIftG16hU',
    video: '',
    featured: false
  },
  {
    id: 57, slug: 'jurassic-park', year: 1993, type: 'film',
    title: { uz: 'Yura davri parki', ru: 'Парк Юрского периода' },
    genres: ['scifi', 'adventure', 'thriller'], rating: 8.2, duration: 127,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Steven Spielberg',
    cast: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum', 'Richard Attenborough'],
    desc: {
      uz: 'Tiriltirilgan dinozavrlar parkida himoya tizimi ishdan chiqadi va mehmonlar orolda yirtqichlar bilan yolg‘iz qoladi.',
      ru: 'В парке с воскрешёнными динозаврами отключается защита, и гости остаются на острове наедине с хищниками.'
    },
    colors: ['#3a5a2a', '#0c1408'],
    poster: 'images/jurassic-park.jpg',
    trailer: 'https://www.youtube.com/watch?v=sqlfsYpUFSQ',
    video: '',
    featured: false
  },
  {
    id: 58, slug: 'lotr-fellowship', year: 2001, type: 'film',
    title: { uz: 'Uzuklar hukmdori: Uzuk hamrohlari', ru: 'Властелин колец: Братство Кольца' },
    genres: ['fantasy', 'adventure', 'drama'], rating: 8.9, duration: 178,
    country: { uz: 'Yangi Zelandiya, AQSh', ru: 'Новая Зеландия, США' },
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen', 'Sean Astin'],
    desc: {
      uz: 'Yosh xobbit Frodo olamni qulatishi mumkin bo‘lgan Uzukni yo‘q qilish uchun to‘qqiz nafar hamroh bilan yo‘lga chiqadi.',
      ru: 'Юный хоббит Фродо с восемью спутниками отправляется уничтожить Кольцо, способное погубить мир.'
    },
    tags: ['LOTR', 'Lord of the Rings', 'Властелин колец', 'Tolkien'],
    colors: ['#3a4a2a', '#0c1008'],
    poster: 'images/lotr-fellowship.jpg',
    trailer: 'https://www.youtube.com/watch?v=RNksw9VU2BQ',
    video: '',
    featured: true
  },
  {
    id: 59, slug: 'harry-potter-1', year: 2001, type: 'film',
    title: { uz: 'Garri Potter va falsafiy tosh', ru: 'Гарри Поттер и философский камень' },
    genres: ['fantasy', 'adventure', 'family'], rating: 7.7, duration: 152,
    country: { uz: 'Buyuk Britaniya, AQSh', ru: 'Великобритания, США' },
    director: 'Chris Columbus',
    cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Richard Harris'],
    desc: {
      uz: 'Yetim bola o‘zining sehrgar ekanini bilib qoladi va Xogvarts maktabida birinchi yilini boshlaydi.',
      ru: 'Мальчик-сирота узнаёт, что он волшебник, и начинает первый год в школе Хогвартс.'
    },
    tags: ['Harry Potter', 'Гарри Поттер', 'Hogwarts'],
    colors: ['#6b4a1e', '#160f06'],
    poster: 'images/harry-potter-1.jpg',
    trailer: 'https://www.youtube.com/watch?v=AFwrmkAHEk4',
    video: '',
    featured: false
  },
  {
    id: 60, slug: 'arrival', year: 2016, type: 'film',
    title: { uz: 'Kelish', ru: 'Прибытие' },
    genres: ['scifi', 'drama', 'thriller'], rating: 7.9, duration: 116,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Denis Villeneuve',
    cast: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'],
    desc: {
      uz: 'Yerga o‘n ikkita sirli kema qo‘nadi. Tilshunos olim ular bilan muloqot yo‘lini topishi kerak — vaqt tugab bormoqda.',
      ru: 'На Землю садятся двенадцать загадочных кораблей. Лингвист должна найти способ общения с пришельцами, пока не поздно.'
    },
    colors: ['#3a4a5a', '#0c1014'],
    poster: 'images/arrival.jpg',
    trailer: 'https://www.youtube.com/watch?v=7u7xTg0ZlDo',
    video: '',
    featured: false
  },
  {
    id: 61, slug: 'blade-runner-2049', year: 2017, type: 'film',
    title: { uz: 'Bleyd Ranner 2049', ru: 'Бегущий по лезвию 2049' },
    genres: ['scifi', 'drama', 'thriller'], rating: 8.1, duration: 164,
    country: { uz: 'AQSh', ru: 'США' },
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Jared Leto'],
    desc: {
      uz: 'Yosh blade runner K uzoq yillar yashirilgan sirni ochadi va yo‘qolgan Rik Dekkardni izlashga tushadi.',
      ru: 'Молодой блейдраннер К раскрывает давно скрываемую тайну и отправляется на поиски исчезнувшего Рика Декарда.'
    },
    tags: ['Blade Runner', 'Бегущий по лезвию'],
    colors: ['#8a4a1e', '#1a0e06'],
    poster: 'images/blade-runner-2049.png',
    trailer: 'https://www.youtube.com/watch?v=3s5zsFm3VgA',
    video: '',
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
  {
    id: 122, slug: "the-incredible-hulk", year: 2008, type: 'film', franchise: 'marvel',
    title: { uz: "Aql bovar qilmas Xalk", ru: "Невероятный Халк" },
    genres: ["action","scifi","adventure"], rating: 6.6, duration: 112,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Louis Leterrier",
    cast: ["Edward Norton","Liv Tyler","Tim Roth","William Hurt"],
    desc: {
      uz: "Olim Bryus Benner g‘azablanganda ulkan yashil maxluqqa aylanadi. U davosini izlab yashirinadi, harbiylar esa uni qo‘lga olish uchun yangi qurol yaratadi.",
      ru: "Учёный Брюс Бэннер в гневе превращается в огромного зелёного монстра. Он скрывается в поисках лекарства, а военные создают против него новое оружие."
    },
    tags: ["Marvel","the incredible hulk"],
    colors: ["#2f5a24","#0a1406"],
    poster: "images/marvel/the-incredible-hulk.jpg",
    trailer: "https://www.youtube.com/watch?v=_-iXjRm3jG0",
    video: '',
    featured: false
  },
  {
    id: 123, slug: "iron-man-2", year: 2010, type: 'film', franchise: 'marvel',
    title: { uz: "Temir odam 2", ru: "Железный человек 2" },
    genres: ["action","scifi","adventure"], rating: 6.9, duration: 124,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Jon Favreau",
    cast: ["Robert Downey Jr.","Gwyneth Paltrow","Don Cheadle","Scarlett Johansson","Mickey Rourke"],
    desc: {
      uz: "Toni Stark o‘zining Temir odam ekanini dunyoga ochiqladi. Endi hukumat texnologiyasini talab qilmoqda, raqiblar esa unga qarshi o‘z qurollarini tayyorlamoqda.",
      ru: "Тони Старк раскрыл миру, что он Железный человек. Теперь правительство требует его технологии, а соперники готовят собственное оружие."
    },
    tags: ["Marvel","iron man 2"],
    colors: ["#7a1414","#1a0404"],
    poster: "images/marvel/iron-man-2.jpg",
    trailer: "https://www.youtube.com/watch?v=cHw0JLSPYmE",
    video: '',
    featured: false
  },
  {
    id: 124, slug: "thor", year: 2011, type: 'film', franchise: 'marvel',
    title: { uz: "Tor", ru: "Тор" },
    genres: ["action","fantasy","adventure"], rating: 7, duration: 115,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Kenneth Branagh",
    cast: ["Chris Hemsworth","Natalie Portman","Tom Hiddleston","Anthony Hopkins"],
    desc: {
      uz: "Takabbur jangchi Tor otasi Odin tomonidan Yerga surgun qilinadi. U bolg‘asini qaytarib olish uchun haqiqiy qahramon bo‘lishni o‘rganishi kerak.",
      ru: "Высокомерного воина Тора отец Один изгоняет на Землю. Чтобы вернуть свой молот, ему предстоит научиться быть настоящим героем."
    },
    tags: ["Marvel","thor"],
    colors: ["#1f3a6b","#060c1a"],
    poster: "images/marvel/thor.jpg",
    trailer: "https://www.youtube.com/watch?v=KN0FHCErJjo",
    video: '',
    featured: false
  },
  {
    id: 125, slug: "captain-america-the-first-avenger", year: 2011, type: 'film', franchise: 'marvel',
    title: { uz: "Kapitan Amerika: Birinchi qasoskor", ru: "Первый мститель" },
    genres: ["action","scifi","war"], rating: 6.9, duration: 124,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Joe Johnston",
    cast: ["Chris Evans","Hayley Atwell","Hugo Weaving","Tommy Lee Jones"],
    desc: {
      uz: "Ikkinchi jahon urushi yillari. Zaif yigit Stiv Rodjers maxfiy tajriba natijasida super askarga aylanadi va Qizil Kalla boshchiligidagi GIDRAga qarshi chiqadi.",
      ru: "Вторая мировая война. Хилый Стив Роджерс после секретного эксперимента становится суперсолдатом и выступает против ГИДРЫ Красного Черепа."
    },
    tags: ["Marvel","captain america the first avenger"],
    colors: ["#1d3565","#6b1a1a"],
    poster: "images/marvel/captain-america-the-first-avenger.jpg",
    trailer: "https://www.youtube.com/watch?v=FxTlOl03x9c",
    video: '',
    featured: false
  },
  {
    id: 126, slug: "iron-man-3", year: 2013, type: 'film', franchise: 'marvel',
    title: { uz: "Temir odam 3", ru: "Железный человек 3" },
    genres: ["action","scifi","adventure"], rating: 7.1, duration: 130,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Shane Black",
    cast: ["Robert Downey Jr.","Gwyneth Paltrow","Guy Pearce","Ben Kingsley"],
    desc: {
      uz: "Nyu-Yorkdagi jangdan keyin Toni Stark tinchlik topolmaydi. Mandarin ismli sirli terrorchi uning butun hayotini vayron qilganda, Toni zirhisiz kurashishga majbur bo‘ladi.",
      ru: "После битвы за Нью-Йорк Тони Старк не находит покоя. Когда таинственный террорист Мандарин разрушает его жизнь, Тони приходится сражаться без брони."
    },
    tags: ["Marvel","iron man 3"],
    colors: ["#8a3a10","#1a0a04"],
    poster: "images/marvel/iron-man-3.jpg",
    trailer: "https://www.youtube.com/watch?v=-P_cWZPceKc",
    video: '',
    featured: false
  },
  {
    id: 127, slug: "thor-the-dark-world", year: 2013, type: 'film', franchise: 'marvel',
    title: { uz: "Tor 2: Zulmat saltanati", ru: "Тор 2: Царство тьмы" },
    genres: ["action","fantasy","adventure"], rating: 6.7, duration: 112,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Alan Taylor",
    cast: ["Chris Hemsworth","Natalie Portman","Tom Hiddleston","Christopher Eccleston"],
    desc: {
      uz: "Qadimiy qorong‘u elflar koinotni zulmatga cho‘ktirmoqchi. Tor Jeyn va xoin akasi Loki bilan birga ularni to‘xtatishga urinadi.",
      ru: "Древние тёмные эльфы хотят погрузить вселенную во тьму. Тор объединяется с Джейн и коварным братом Локи, чтобы остановить их."
    },
    tags: ["Marvel","thor the dark world"],
    colors: ["#3a2a4a","#0c0810"],
    poster: "images/marvel/thor-the-dark-world.jpg",
    trailer: "https://www.youtube.com/watch?v=wccked4BA9Q",
    video: '',
    featured: false
  },
  {
    id: 128, slug: "avengers-age-of-ultron", year: 2015, type: 'film', franchise: 'marvel',
    title: { uz: "Qasoskorlar: Altron asri", ru: "Мстители: Эра Альтрона" },
    genres: ["action","scifi","adventure"], rating: 7.3, duration: 141,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Joss Whedon",
    cast: ["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Scarlett Johansson","James Spader"],
    desc: {
      uz: "Toni Stark tinchlikni saqlash uchun sun’iy intellekt Altronni yaratadi. Ammo Altron insoniyatni yo‘q qilishga qaror qiladi va Qasoskorlar yana birlashadi.",
      ru: "Тони Старк создаёт искусственный интеллект Альтрона для защиты мира. Но Альтрон решает уничтожить человечество, и Мстители снова объединяются."
    },
    tags: ["Marvel","avengers age of ultron"],
    colors: ["#3a3f4a","#0a0c10"],
    poster: "images/marvel/avengers-age-of-ultron.jpg",
    trailer: "https://www.youtube.com/watch?v=FwW149BS9n4",
    video: '',
    featured: false
  },
  {
    id: 129, slug: "ant-man", year: 2015, type: 'film', franchise: 'marvel',
    title: { uz: "Chumoli-odam", ru: "Человек-муравей" },
    genres: ["action","comedy","scifi"], rating: 7.3, duration: 117,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Peyton Reed",
    cast: ["Paul Rudd","Michael Douglas","Evangeline Lilly","Corey Stoll"],
    desc: {
      uz: "Sobiq o‘g‘ri Skott Lang kichrayish qobiliyatini beradigan kostyumni qo‘lga kiritadi. Olim Xenk Pim unga xavfli texnologiyani yovuzlardan saqlashda yordam berishni topshiradi.",
      ru: "Бывший вор Скотт Лэнг получает костюм, позволяющий уменьшаться. Учёный Хэнк Пим поручает ему защитить опасную технологию от злодеев."
    },
    tags: ["Marvel","ant man"],
    colors: ["#6b1a1a","#120404"],
    poster: "images/marvel/ant-man.jpg",
    trailer: "https://www.youtube.com/watch?v=Vc0GhqtIteo",
    video: '',
    featured: false
  },
  {
    id: 130, slug: "captain-america-civil-war", year: 2016, type: 'film', franchise: 'marvel',
    title: { uz: "Kapitan Amerika: Fuqarolar urushi", ru: "Первый мститель: Противостояние" },
    genres: ["action","scifi","adventure"], rating: 7.8, duration: 147,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Anthony Russo, Joe Russo",
    cast: ["Chris Evans","Robert Downey Jr.","Scarlett Johansson","Sebastian Stan","Tom Holland"],
    desc: {
      uz: "Hukumat qahramonlarni nazorat ostiga olmoqchi. Bu masala Qasoskorlarni ikkiga bo‘ladi: bir tomonda Kapitan Amerika, boshqa tomonda Temir odam.",
      ru: "Правительство хочет взять супергероев под контроль. Этот вопрос раскалывает Мстителей на два лагеря: Капитана Америку и Железного человека."
    },
    tags: ["Marvel","captain america civil war"],
    colors: ["#1d3565","#5a1414"],
    poster: "images/marvel/captain-america-civil-war.jpg",
    trailer: "https://www.youtube.com/watch?v=3DGRiomCPTM",
    video: '',
    featured: false
  },
  {
    id: 131, slug: "guardians-of-the-galaxy-vol-2", year: 2017, type: 'film', franchise: 'marvel',
    title: { uz: "Galaktika qo‘riqchilari 2", ru: "Стражи Галактики. Часть 2" },
    genres: ["action","comedy","scifi","adventure"], rating: 7.6, duration: 136,
    country: { uz: 'AQSh', ru: 'США' },
    director: "James Gunn",
    cast: ["Chris Pratt","Zoe Saldaña","Dave Bautista","Kurt Russell"],
    desc: {
      uz: "Qo‘riqchilar koinot bo‘ylab sarguzashtda davom etadi. Piter Kvill nihoyat otasi bilan uchrashadi, ammo bu uchrashuv katta sirlarni ochadi.",
      ru: "Стражи продолжают странствовать по космосу. Питер Квилл наконец встречает своего отца, но эта встреча раскрывает опасные тайны."
    },
    tags: ["Marvel","guardians of the galaxy vol 2"],
    colors: ["#6a2a7a","#12061a"],
    poster: "images/marvel/guardians-of-the-galaxy-vol-2.jpg",
    trailer: "https://www.youtube.com/watch?v=ItV1Rrex-7k",
    video: '',
    featured: false
  },
  {
    id: 132, slug: "spider-man-homecoming", year: 2017, type: 'film', franchise: 'marvel',
    title: { uz: "O‘rgimchak-odam: Uyga qaytish", ru: "Человек-паук: Возвращение домой" },
    genres: ["action","comedy","adventure"], rating: 7.4, duration: 133,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Jon Watts",
    cast: ["Tom Holland","Michael Keaton","Robert Downey Jr.","Zendaya"],
    desc: {
      uz: "Yosh Piter Parker maktab hayoti va qahramonlik orasida qolib ketadi. U Toni Starkka o‘zini isbotlash uchun xavfli Kalxatga qarshi chiqadi.",
      ru: "Юный Питер Паркер разрывается между школой и геройством. Чтобы доказать себя Тони Старку, он выходит против опасного Стервятника."
    },
    tags: ["Marvel","spider man homecoming"],
    colors: ["#8a1a24","#140408"],
    poster: "images/marvel/spider-man-homecoming.jpg",
    trailer: "https://www.youtube.com/watch?v=9ibCwrDbp-8",
    video: '',
    featured: false
  },
  {
    id: 133, slug: "ant-man-and-the-wasp", year: 2018, type: 'film', franchise: 'marvel',
    title: { uz: "Chumoli-odam va Ari", ru: "Человек-муравей и Оса" },
    genres: ["action","comedy","scifi"], rating: 7, duration: 118,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Peyton Reed",
    cast: ["Paul Rudd","Evangeline Lilly","Michael Douglas","Michelle Pfeiffer"],
    desc: {
      uz: "Skott Lang uy qamog‘ida, ammo Xoup va Xenk Pim unga yana muhtoj. Ular kvant olamida adashib qolgan Janet van Daynni qutqarishga harakat qiladi.",
      ru: "Скотт Лэнг под домашним арестом, но Хоуп и Хэнк Пим снова нуждаются в нём. Вместе они пытаются спасти Джанет ван Дайн из квантового мира."
    },
    tags: ["Marvel","ant man and the wasp"],
    colors: ["#7a1a1a","#5a4a10"],
    poster: "images/marvel/ant-man-and-the-wasp.jpg",
    trailer: "https://www.youtube.com/watch?v=azquga_3_ss",
    video: '',
    featured: false
  },
  {
    id: 134, slug: "captain-marvel", year: 2019, type: 'film', franchise: 'marvel',
    title: { uz: "Kapitan Marvel", ru: "Капитан Марвел" },
    genres: ["action","scifi","adventure"], rating: 6.8, duration: 123,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Anna Boden, Ryan Fleck",
    cast: ["Brie Larson","Samuel L. Jackson","Jude Law","Ben Mendelsohn"],
    desc: {
      uz: "1990-yillar. Kosmik jangchi Kerol Denvers Yerga tushib qoladi va o‘tmishi haqidagi haqiqatni izlaydi. Yosh Nik Fyuri bilan birga u galaktik urushga aralashadi.",
      ru: "1990-е. Космическая воительница Кэрол Дэнверс попадает на Землю и ищет правду о своём прошлом. Вместе с молодым Ником Фьюри она вмешивается в галактическую войну."
    },
    tags: ["Marvel","captain marvel"],
    colors: ["#1d3a6b","#6b1a2a"],
    poster: "images/marvel/captain-marvel.jpg",
    trailer: "https://www.youtube.com/watch?v=2eaZUwBWJLM",
    video: '',
    featured: false
  },
  {
    id: 135, slug: "spider-man-far-from-home", year: 2019, type: 'film', franchise: 'marvel',
    title: { uz: "O‘rgimchak-odam: Uydan uzoqda", ru: "Человек-паук: Вдали от дома" },
    genres: ["action","comedy","adventure"], rating: 7.4, duration: 129,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Jon Watts",
    cast: ["Tom Holland","Jake Gyllenhaal","Zendaya","Samuel L. Jackson"],
    desc: {
      uz: "Piter sinfdoshlari bilan Yevropaga sayohatga chiqadi. Ammo Nik Fyuri uni sirli qahramon Misterio bilan birga yangi tahdidga qarshi kurashga chaqiradi.",
      ru: "Питер едет с одноклассниками в Европу. Но Ник Фьюри призывает его вместе с таинственным Мистерио сразиться с новой угрозой."
    },
    tags: ["Marvel","spider man far from home"],
    colors: ["#2a2a6b","#8a1a24"],
    poster: "images/marvel/spider-man-far-from-home.jpg",
    trailer: "https://www.youtube.com/watch?v=zx9vpIzH1u4",
    video: '',
    featured: false
  },
  {
    id: 136, slug: "black-widow", year: 2021, type: 'film', franchise: 'marvel',
    title: { uz: "Qora beva", ru: "Чёрная вдова" },
    genres: ["action","thriller","adventure"], rating: 6.7, duration: 134,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Cate Shortland",
    cast: ["Scarlett Johansson","Florence Pugh","David Harbour","Rachel Weisz"],
    desc: {
      uz: "Natasha Romanoff o‘tmishiga duch keladi. U «Qizil xona» dasturini yo‘q qilish uchun uzoq yillar ko‘rmagan «oilasi» bilan qayta birlashadi.",
      ru: "Наташа Романофф сталкивается со своим прошлым. Чтобы уничтожить программу «Красная комната», она воссоединяется с давно утраченной «семьёй»."
    },
    tags: ["Marvel","black widow"],
    colors: ["#3a0a14","#0a0204"],
    poster: "images/marvel/black-widow.jpg",
    trailer: "https://www.youtube.com/watch?v=prwHu2MbMEE",
    video: '',
    featured: false
  },
  {
    id: 137, slug: "shang-chi", year: 2021, type: 'film', franchise: 'marvel',
    title: { uz: "Shan-Chi va o‘n uzuk afsonasi", ru: "Шан-Чи и легенда десяти колец" },
    genres: ["action","fantasy","adventure"], rating: 7.4, duration: 132,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Destin Daniel Cretton",
    cast: ["Simu Liu","Awkwafina","Tony Leung","Michelle Yeoh"],
    desc: {
      uz: "Oddiy hayot kechirayotgan Shan-Chi otasi boshqaradigan «O‘n uzuk» tashkilotiga qaytishga majbur bo‘ladi va o‘z o‘tmishiga yuzma-yuz keladi.",
      ru: "Живущий обычной жизнью Шан-Чи вынужден вернуться в организацию «Десять колец», которой управляет его отец, и встретиться со своим прошлым."
    },
    tags: ["Marvel","shang chi"],
    colors: ["#8a5a14","#1a1004"],
    poster: "images/marvel/shang-chi.jpg",
    trailer: "https://www.youtube.com/watch?v=7IQUxblP30g",
    video: '',
    featured: false
  },
  {
    id: 138, slug: "eternals", year: 2021, type: 'film', franchise: 'marvel',
    title: { uz: "Abadiylar", ru: "Вечные" },
    genres: ["action","fantasy","adventure"], rating: 6.3, duration: 156,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Chloé Zhao",
    cast: ["Gemma Chan","Richard Madden","Angelina Jolie","Salma Hayek"],
    desc: {
      uz: "Minglab yillar davomida odamlar orasida yashirin yashagan o‘lmas mavjudotlar — Abadiylar — insoniyatning qadimiy dushmanlariga qarshi yana birlashadi.",
      ru: "Бессмертные существа, тысячи лет тайно жившие среди людей, снова объединяются против древних врагов человечества."
    },
    tags: ["Marvel","eternals"],
    colors: ["#8a6a24","#140f06"],
    poster: "images/marvel/eternals.jpg",
    trailer: "https://www.youtube.com/watch?v=NocQ13xC7gE",
    video: '',
    featured: false
  },
  {
    id: 139, slug: "doctor-strange-multiverse-of-madness", year: 2022, type: 'film', franchise: 'marvel',
    title: { uz: "Doktor Streyndj: Jinnilik multiolamida", ru: "Доктор Стрэндж: В мультивселенной безумия" },
    genres: ["action","fantasy","horror"], rating: 6.9, duration: 126,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Sam Raimi",
    cast: ["Benedict Cumberbatch","Elizabeth Olsen","Xochitl Gomez","Benedict Wong"],
    desc: {
      uz: "Doktor Streyndj olamlar orasida sayohat qila oladigan qiz Amerika Chavesni himoya qiladi. Ular multiolamning xavfli va g‘aroyib burchaklariga tushib qoladi.",
      ru: "Доктор Стрэндж защищает Америку Чавес — девушку, способную путешествовать между вселенными. Они попадают в опасные и странные уголки мультивселенной."
    },
    tags: ["Marvel","doctor strange multiverse of madness"],
    colors: ["#4a1a6b","#0e0414"],
    poster: "images/marvel/doctor-strange-multiverse-of-madness.jpg",
    trailer: "https://www.youtube.com/watch?v=0_r_V5TOuEI",
    video: '',
    featured: false
  },
  {
    id: 140, slug: "thor-love-and-thunder", year: 2022, type: 'film', franchise: 'marvel',
    title: { uz: "Tor: Muhabbat va momaqaldiroq", ru: "Тор: Любовь и гром" },
    genres: ["action","comedy","fantasy"], rating: 6.2, duration: 119,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Taika Waititi",
    cast: ["Chris Hemsworth","Natalie Portman","Christian Bale","Tessa Thompson"],
    desc: {
      uz: "Tor o‘zini izlab yurgan paytda xudolarni o‘ldiruvchi Gorr paydo bo‘ladi. Unga qarshi kurashda Tor kutilmaganda qudratli Jeyn Foster bilan uchrashadi.",
      ru: "Пока Тор ищет себя, появляется Горр — убийца богов. В борьбе с ним Тор неожиданно встречает обретшую силу Джейн Фостер."
    },
    tags: ["Marvel","thor love and thunder"],
    colors: ["#6a2a8a","#140418"],
    poster: "images/marvel/thor-love-and-thunder.jpg",
    trailer: "https://www.youtube.com/watch?v=WQfLxSqxicE",
    video: '',
    featured: false
  },
  {
    id: 141, slug: "black-panther-wakanda-forever", year: 2022, type: 'film', franchise: 'marvel',
    title: { uz: "Qora pantera: Vakanda abadiy", ru: "Чёрная Пантера: Ваканда навеки" },
    genres: ["action","drama","adventure"], rating: 6.7, duration: 161,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Ryan Coogler",
    cast: ["Letitia Wright","Angela Bassett","Tenoch Huerta","Lupita Nyong’o"],
    desc: {
      uz: "Qirol T’Challa vafotidan keyin Vakanda motamda. Suv osti qirolligi Talokan paydo bo‘lganda, mamlakat yangi himoyachisini topishi kerak.",
      ru: "После гибели короля Т’Чаллы Ваканда в трауре. Когда появляется подводное королевство Талокан, стране нужно найти нового защитника."
    },
    tags: ["Marvel","black panther wakanda forever"],
    colors: ["#3a1a5a","#0a0414"],
    poster: "images/marvel/black-panther-wakanda-forever.jpg",
    trailer: "https://www.youtube.com/watch?v=fazUjELn0rg",
    video: '',
    featured: false
  },
  {
    id: 142, slug: "ant-man-and-the-wasp-quantumania", year: 2023, type: 'film', franchise: 'marvel',
    title: { uz: "Chumoli-odam va Ari: Kvantomaniya", ru: "Человек-муравей и Оса: Квантомания" },
    genres: ["action","scifi","adventure"], rating: 6.1, duration: 125,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Peyton Reed",
    cast: ["Paul Rudd","Evangeline Lilly","Jonathan Majors","Kathryn Newton"],
    desc: {
      uz: "Skott Lang va uning oilasi kvant olamiga tortib ketiladi. U yerda ular vaqt ustidan hukmron bo‘lishni istagan Kang Zabt etuvchi bilan to‘qnashadi.",
      ru: "Скотта Лэнга и его семью затягивает в квантовый мир. Там они сталкиваются с Кангом Завоевателем, мечтающим властвовать над временем."
    },
    tags: ["Marvel","ant man and the wasp quantumania"],
    colors: ["#5a1a6b","#1a4a6b"],
    poster: "images/marvel/ant-man-and-the-wasp-quantumania.jpg",
    trailer: "https://www.youtube.com/watch?v=V6tE_-ZHDSg",
    video: '',
    featured: false
  },
  {
    id: 143, slug: "guardians-of-the-galaxy-vol-3", year: 2023, type: 'film', franchise: 'marvel',
    title: { uz: "Galaktika qo‘riqchilari 3", ru: "Стражи Галактики. Часть 3" },
    genres: ["action","comedy","scifi","adventure"], rating: 7.9, duration: 150,
    country: { uz: 'AQSh', ru: 'США' },
    director: "James Gunn",
    cast: ["Chris Pratt","Bradley Cooper","Zoe Saldaña","Chukwudi Iwuji"],
    desc: {
      uz: "Raketa hayoti xavf ostida qoladi. Qo‘riqchilar uni qutqarish va uning qayg‘uli o‘tmishi siriga yetish uchun so‘nggi xavfli safarga otlanadi.",
      ru: "Жизнь Ракеты под угрозой. Стражи отправляются в последнее опасное путешествие, чтобы спасти его и раскрыть тайну его прошлого."
    },
    tags: ["Marvel","guardians of the galaxy vol 3"],
    colors: ["#1a5a6b","#04121a"],
    poster: "images/marvel/guardians-of-the-galaxy-vol-3.jpg",
    trailer: "https://www.youtube.com/watch?v=AsypwbMvSW8",
    video: '',
    featured: false
  },
  {
    id: 144, slug: "the-marvels", year: 2023, type: 'film', franchise: 'marvel',
    title: { uz: "Marvellar", ru: "Марвелы" },
    genres: ["action","scifi","adventure"], rating: 5.5, duration: 105,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Nia DaCosta",
    cast: ["Brie Larson","Teyonah Parris","Iman Vellani","Samuel L. Jackson"],
    desc: {
      uz: "Kerol Denvers, Monika Rambo va Kamala Xon kuchlari chalkashib, har safar joy almashib qoladi. Ular koinotni qutqarish uchun jamoa bo‘lib ishlashni o‘rganadi.",
      ru: "Силы Кэрол Дэнверс, Моники Рамбо и Камалы Хан переплетаются, и героини меняются местами. Чтобы спасти вселенную, им придётся стать командой."
    },
    tags: ["Marvel","the marvels"],
    colors: ["#2a3a8a","#8a2a3a"],
    poster: "images/marvel/the-marvels.jpg",
    trailer: "https://www.youtube.com/watch?v=-JW8LzqUymc",
    video: '',
    featured: false
  },
  {
    id: 145, slug: "deadpool-and-wolverine", year: 2024, type: 'film', franchise: 'marvel',
    title: { uz: "Dedpul va Rosomaxa", ru: "Дэдпул и Росомаха" },
    genres: ["action","comedy","adventure"], rating: 7.5, duration: 128,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Shawn Levy",
    cast: ["Ryan Reynolds","Hugh Jackman","Emma Corrin","Matthew Macfadyen"],
    desc: {
      uz: "Dedpulning olami yo‘q bo‘lish arafasida. Uni qutqarish uchun u boshqa olamdagi eng qaysar Rosomaxa bilan birga ishlashga majbur bo‘ladi.",
      ru: "Вселенной Дэдпула грозит исчезновение. Чтобы спасти её, ему приходится объединиться с самым упрямым Росомахой из другой вселенной."
    },
    tags: ["Marvel","deadpool and wolverine"],
    colors: ["#8a1414","#8a6a10"],
    poster: "images/marvel/deadpool-and-wolverine.jpg",
    trailer: "https://www.youtube.com/watch?v=_HzQ_i0dr5k",
    video: '',
    featured: false
  },
  {
    id: 146, slug: "captain-america-brave-new-world", year: 2025, type: 'film', franchise: 'marvel',
    title: { uz: "Kapitan Amerika: Yangi dunyo", ru: "Капитан Америка: Новый мир" },
    genres: ["action","thriller","scifi"], duration: 118,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Julius Onah",
    cast: ["Anthony Mackie","Harrison Ford","Danny Ramirez","Tim Blake Nelson"],
    desc: {
      uz: "Sem Uilson yangi Kapitan Amerika sifatida xalqaro mojaro markaziga tushib qoladi. U dunyoni urushga olib kelayotgan yashirin fitnani fosh etishi kerak.",
      ru: "Сэм Уилсон в роли нового Капитана Америки оказывается в центре международного конфликта. Ему нужно раскрыть заговор, ведущий мир к войне."
    },
    tags: ["Marvel","captain america brave new world"],
    colors: ["#1d3565","#6b1414"],
    poster: "images/marvel/captain-america-brave-new-world.jpg",
    trailer: "https://www.youtube.com/watch?v=w3o3Z7julXo",
    video: '',
    featured: false
  },
  {
    id: 147, slug: "thunderbolts", year: 2025, type: 'film', franchise: 'marvel',
    title: { uz: "Momaqaldiroqlar*", ru: "Громовержцы*" },
    genres: ["action","thriller","adventure"], duration: 127,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Jake Schreier",
    cast: ["Florence Pugh","Sebastian Stan","David Harbour","Julia Louis-Dreyfus"],
    desc: {
      uz: "Yelena Belova va boshqa sobiq yollanma qotillar tuzoqqa tushib qoladi. Ular o‘tmishlariga qaramay, bir jamoa bo‘lib ishlashga majbur bo‘ladi.",
      ru: "Елена Белова и другие бывшие наёмники попадают в ловушку. Несмотря на своё прошлое, им приходится действовать как команда."
    },
    tags: ["Marvel","thunderbolts"],
    colors: ["#3a3a3a","#0a0a0a"],
    poster: "images/marvel/thunderbolts.jpg",
    trailer: "https://www.youtube.com/watch?v=wpQIWG4PPmQ",
    video: '',
    featured: false
  },
  {
    id: 148, slug: "the-fantastic-four-first-steps", year: 2025, type: 'film', franchise: 'marvel',
    title: { uz: "Fantastik to‘rtlik: Ilk qadamlar", ru: "Фантастическая четвёрка: Первые шаги" },
    genres: ["action","scifi","adventure","family"], duration: 115,
    country: { uz: 'AQSh', ru: 'США' },
    director: "Matt Shakman",
    cast: ["Pedro Pascal","Vanessa Kirby","Joseph Quinn","Ebon Moss-Bachrach"],
    desc: {
      uz: "1960-yillar ruhidagi retro-futuristik dunyo. Fantastik to‘rtlik sayyoralarni yutib yuboruvchi Galaktus va uning xabarchisi Kumush serfingchiga qarshi turadi.",
      ru: "Ретрофутуристичный мир в духе 1960-х. Фантастическая четвёрка противостоит пожирателю планет Галактусу и его вестнице Серебряной Сёрфер."
    },
    tags: ["Marvel","the fantastic four first steps"],
    colors: ["#1a4a8a","#04101e"],
    poster: "images/marvel/the-fantastic-four-first-steps.jpg",
    trailer: "https://www.youtube.com/watch?v=-ZjL-r6dW8c",
    video: '',
    featured: false
  },
  {
    id: 149, slug: "spider-man-brand-new-day", year: 2026, type: 'film', franchise: 'marvel',
    title: { uz: "O‘rgimchak-odam: Butunlay yangi kun", ru: "Человек-паук: Совершенно новый день" },
    genres: ["action","adventure","scifi"],
    country: { uz: 'AQSh', ru: 'США' },
    director: "Destin Daniel Cretton",
    cast: ["Tom Holland","Zendaya","Sadie Sink","Jon Bernthal","Mark Ruffalo"],
    desc: {
      uz: "Hamma uni unutgach, Piter Parker yolg‘iz qolib Nyu-Yorkni himoya qiladi. Charchoq tufayli kuchlari o‘zgara boshlaydi, shahar esa yangi telepatik tahdidga duch keladi.",
      ru: "После того как все забыли о нём, Питер Паркер в одиночку защищает Нью-Йорк. Из-за переутомления его силы начинают меняться, а городу угрожает новый телепат."
    },
    tags: ["Marvel","spider man brand new day"],
    colors: ["#8a1a24","#0a1a3a"],
    poster: "images/marvel/spider-man-brand-new-day.jpg",
    trailer: "https://www.youtube.com/watch?v=lnODSdqErm0",
    video: '',
    featured: false
  },
  {
    id: 150, slug: "avengers-doomsday", year: 2026, type: 'film', franchise: 'marvel',
    title: { uz: "Qasoskorlar: Qiyomat kuni", ru: "Мстители: Судный день" },
    genres: ["action","scifi","adventure"],
    country: { uz: 'AQSh', ru: 'США' },
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.","Chris Hemsworth","Anthony Mackie","Pedro Pascal","Florence Pugh"],
    desc: {
      uz: "«Qasoskorlar: Final»ning davomi. Qasoskorlar, Vakanda, Fantastik to‘rtlik va X-odamlar turli olamlardan birlashib, Doktor Dumga qarshi chiqadi. Chiqish sanasi — 2026-yil dekabr (kutilmoqda). Hozircha faqat treyler.",
      ru: "Продолжение «Мстителей: Финал». Мстители, Ваканда, Фантастическая четвёрка и Люди Икс из разных вселенных объединяются против Доктора Дума. Выход — декабрь 2026 года (ожидается). Пока доступен только трейлер."
    },
    tags: ["Marvel","avengers doomsday","Tez orada","Скоро"],
    colors: ["#2a4a2a","#050a05"],
    poster: "images/marvel/avengers-doomsday.jpg",
    trailer: "https://www.youtube.com/watch?v=O7DjtgMfNKw",
    video: '',
    featured: false
  }
];
