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
     featured  - bosh sahifadagi katta sliderda ko'rsatilsinmi
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
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
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
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
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
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
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
    trailer: 'https://www.youtube.com/watch?v=n9xhJrPXop4',
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
    trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
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
    trailer: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
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
    trailer: 'https://www.youtube.com/watch?v=isOGD_7hNIY',
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
    trailer: 'https://www.youtube.com/watch?v=UaVTIH8mujA',
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
    trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
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
    trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
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
    trailer: 'https://www.youtube.com/watch?v=P5ieIbInFpg',
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
    trailer: 'https://www.youtube.com/watch?v=kVrqfYjkTdQ',
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
    trailer: 'https://www.youtube.com/watch?v=CM79GTEm2ps',
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
    trailer: 'https://www.youtube.com/watch?v=C0BMx-qxsP4',
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
    trailer: 'https://www.youtube.com/watch?v=PLl99DlL6b4',
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
    trailer: 'https://www.youtube.com/watch?v=ByXuk9QqQkk',
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
    trailer: 'https://www.youtube.com/watch?v=xlnPHQ3TLX8',
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
    trailer: 'https://www.youtube.com/watch?v=v-PjgYDrg70',
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
    trailer: 'https://www.youtube.com/watch?v=CwXOrWvPBPk',
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
    trailer: 'https://www.youtube.com/watch?v=hEJnMQG9ev8',
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
    trailer: 'https://www.youtube.com/watch?v=7d_jQycdQGo',
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
    trailer: 'https://www.youtube.com/watch?v=qtRKdVHc-cE',
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
    trailer: 'https://www.youtube.com/watch?v=znmZoVkCjpI',
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
    trailer: 'https://www.youtube.com/watch?v=iszwuX1AK6A',
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
    trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
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
    trailer: 'https://www.youtube.com/watch?v=iWyeLZ9oP5c',
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
    trailer: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
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
    trailer: 'https://www.youtube.com/watch?v=s9APLXM9Ei8',
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
    trailer: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
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
    trailer: 'https://www.youtube.com/watch?v=03u4xyj0TH4',
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
    trailer: 'https://www.youtube.com/watch?v=8ugaeA-nMTc',
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
    trailer: 'https://www.youtube.com/watch?v=sXT4uBpGxNY',
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
    trailer: 'https://www.youtube.com/watch?v=d96cjJhvlMA',
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
    trailer: 'https://www.youtube.com/watch?v=7SlILk2WMTI',
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
    trailer: 'https://www.youtube.com/watch?v=h7gvFravm4A',
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
    trailer: 'https://www.youtube.com/watch?v=ue80QwXMRHg',
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
    trailer: 'https://www.youtube.com/watch?v=xjDjIWPwcPU',
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
    trailer: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
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
    trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
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
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
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
    trailer: 'https://www.youtube.com/watch?v=Xithigfg7dA',
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
    trailer: 'https://www.youtube.com/watch?v=g4Hbz2jLxvQ',
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
    trailer: 'https://www.youtube.com/watch?v=neY2xVmOfUM',
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
    trailer: 'https://www.youtube.com/watch?v=GokKUqLcvD8',
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
    trailer: 'https://www.youtube.com/watch?v=T6DJcgm3wNY',
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
    trailer: 'https://www.youtube.com/watch?v=0WWzgGyAH6Y',
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
    trailer: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
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
    trailer: 'https://www.youtube.com/watch?v=WDkg3h8PCVU',
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
    trailer: 'https://www.youtube.com/watch?v=go6GEIrcvFY',
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
    trailer: 'https://www.youtube.com/watch?v=ui37YKQ9AC4',
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
    trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
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
    trailer: 'https://www.youtube.com/watch?v=1g3_CFmnU7k',
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
    trailer: 'https://www.youtube.com/watch?v=jQ5lPt9edzQ',
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
    trailer: 'https://www.youtube.com/watch?v=qvsgGtivCgs',
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
    trailer: 'https://www.youtube.com/watch?v=CRRlbK5w8AE',
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
    trailer: 'https://www.youtube.com/watch?v=QWBKEmWWL38',
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
    trailer: 'https://www.youtube.com/watch?v=V75dMMIW2B4',
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
    trailer: 'https://www.youtube.com/watch?v=VyHV0BRtdxo',
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
    trailer: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g',
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
    trailer: 'https://www.youtube.com/watch?v=gCcx85zbxz4',
    video: '',
    featured: false
  }
];
