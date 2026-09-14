/* ============================================================
   DezoMax — Tarjimalar / Переводы
   Yangi so'z qo'shish: I18N ga kalit qo'shing, HTML da data-i18n="kalit"
   ============================================================ */

const I18N = {
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.films': 'Filmlar',
    'nav.series': 'Seriallar',
    'nav.cartoons': 'Multfilmlar',
    'nav.favorites': 'Sevimlilar',
    'nav.catalog': 'Katalog',
    'nav.sport': 'Sport',
    'nav.tv': 'Telekanallar',
    'nav.plans': 'Obunalar',
    'nav.downloads': 'Yuklab olinganlar',
    'nav.more': 'Yana',
    'nav.close': 'Yopish',

    'sport.title': 'Sport',
    'sport.subtitle': 'Bugungi va yaqin kunlardagi o‘yinlar, jonli hisob',
    'sport.soccer': 'Futbol',
    'sport.basketball': 'Basketbol',
    'sport.tennis': 'Tennis',
    'sport.hockey': 'Xokkey',
    'sport.mma': 'UFC / MMA',
    'sport.f1': 'Formula 1',
    'sport.news': 'Futbol yangiliklari',
    'sport.live': 'JONLI',
    'sport.liveCount': 'jonli',
    'sport.finished': 'Tugadi',
    'sport.today': 'Bugun',
    'sport.tomorrow': 'Ertaga',
    'sport.yesterday': 'Kecha',
    'sport.more': 'Yana ko‘rsatish',
    'sport.less': 'Yig‘ish',
    'sport.noEvents': 'Yaqin kunlarda tadbir yo‘q',
    'sport.loading': 'Ma’lumot yuklanmoqda...',
    'sport.error': 'Ma’lumotni yuklab bo‘lmadi',
    'sport.errorHint': 'Internet aloqasini tekshiring yoki birozdan keyin urinib ko‘ring.',
    'sport.retry': 'Qayta urinish',
    'sport.source': 'Ma’lumot manbai: ESPN',
    'sport.readMore': 'To‘liq o‘qish',
    'sport.winner': 'G‘olib',
    'sport.race': 'Poyga',
    'sport.qual': 'Saralash',
    'sport.practice': 'Mashq',
    'sport.sprint': 'Sprint',
    'sport.podium': 'Podium',

    'tv.title': 'Telekanallar',
    'tv.live': 'JONLI EFIR',
    'tv.select': 'Jonli efirni boshlash',
    'tv.selectHint': 'Bosing — efir boshlanadi. Yoki pastdagi ro‘yxatdan boshqa kanalni tanlang.',
    'tv.channels': 'kanal',
    'tv.error': 'Kanal ochilmadi',
    'tv.errorHint': 'Efir vaqtincha to‘xtagan bo‘lishi mumkin. Boshqa kanalni tanlab ko‘ring.',
    'tv.unmute': '🔊 Ovozni yoqish',
    'tv.fullscreen': 'Katta ekran',
    'tv.note': 'Kanallar ochiq efirdan olingan, DezoMax serverida saqlanmaydi.',

    'plans.title': 'Obuna rejalari',
    'plans.subtitle': 'Xohlagan vaqtda bekor qilasiz. Yashirin to‘lovlar yo‘q.',
    'plans.month': 'oyiga',
    'plans.choose': 'Tanlash',
    'plans.current': 'Joriy rejangiz',
    'plans.popular': 'Eng ommabop',
    'plans.cancel': 'Rejadan voz kechish',
    'plans.saved': 'Reja tanlandi',
    'plans.notice': 'To‘lov tizimi hali ulanmagan. Hozircha reja faqat shu brauzerda saqlanadi — haqiqiy pul yechilmaydi.',
    'plans.compare': 'Rejalarni solishtirish',
    'plans.feature': 'Imkoniyat',

    'dl.title': 'Yuklab olinganlar',
    'dl.empty': 'Yuklab olinganlar yo‘q',
    'dl.emptyHint': 'Kino sahifasidagi «Yuklab olish» tugmasini bosing.',
    'dl.add': 'Yuklab olish',
    'dl.added': 'Ro‘yxatda',
    'dl.remove': 'Ro‘yxatdan o‘chirish',
    'dl.open': 'Faylni ochish',
    'dl.unavailable': 'Yuklab bo‘lmaydi',
    'dl.unavailableHint': 'Bu kinoning to‘g‘ridan-to‘g‘ri video fayli yo‘q — treyler YouTube’da joylashgan.',
    'dl.size': 'Hajmi',
    'dl.note': 'Fayl brauzerning «Yuklanmalar» papkasiga saqlanadi. Ro‘yxat esa shu brauzerda qoladi.',

    'search.placeholder': 'Kino yoki serial qidirish...',
    'search.results': 'Qidiruv natijalari',
    'search.empty': 'Hech narsa topilmadi',
    'search.emptyHint': 'Boshqa so‘z bilan urinib ko‘ring yoki filtrlarni tozalang.',

    'hero.watch': 'Ko‘rish',
    'hero.more': 'Batafsil',

    'row.trending': 'Trendda',
    'row.new': 'Yangi qo‘shilganlar',
    'row.top': 'Eng yuqori reyting',
    'row.films': 'Filmlar',
    'row.series': 'Seriallar',
    'row.cartoons': 'Multfilmlar',
    'row.favorites': 'Sevimlilaringiz',
    'row.marvel': 'Marvel olami',
    'row.dc': 'DC olami',
    'row.seeAll': 'Hammasi',

    'catalog.title': 'Katalog',
    'catalog.reset': 'Tozalash',
    'catalog.all': 'Barchasi',
    'catalog.sort': 'Saralash',
    'catalog.sort.new': 'Avval yangilari',
    'catalog.sort.old': 'Avval eskilari',
    'catalog.sort.rating': 'Reyting bo‘yicha',
    'catalog.sort.name': 'Nomi bo‘yicha',
    'catalog.type': 'Turi',
    'catalog.genre': 'Janr',
    'catalog.franchise': 'Olam',
    'franchise.marvel': 'Marvel',
    'franchise.dc': 'DC',

    'type.film': 'Film',
    'type.serial': 'Serial',
    'type.multfilm': 'Multfilm',

    'movie.watchNow': 'Hozir ko‘rish',
    'movie.trailer': 'Treyler',
    'movie.addFav': 'Sevimlilarga',
    'movie.inFav': 'Sevimlilarda',
    'movie.year': 'Yili',
    'movie.country': 'Davlat',
    'movie.genre': 'Janr',
    'movie.director': 'Rejissyor',
    'movie.cast': 'Rollarda',
    'movie.duration': 'Davomiyligi',
    'movie.seasons': 'Fasllar',
    'movie.min': 'daq.',
    'movie.about': 'Film haqida',
    'movie.similar': 'O‘xshash kinolar',
    'movie.notFound': 'Kino topilmadi',
    'movie.backHome': 'Bosh sahifaga qaytish',
    'movie.rating': 'Reyting',

    'player.noSource': 'Video havolasi qo‘shilmagan',
    'player.hint': 'js/data.js faylida ushbu kinoning "video" maydoniga havola qo‘shing.',
    'player.film': 'Kino',
    'player.trailer': 'Treyler',
    'player.openExternal': 'Yangi oynada ochish ↗',
    'player.trailerOnly': 'To‘liq kino havolasi qo‘shilmagan — hozircha treyler ko‘rsatilmoqda.',

    'fav.empty': 'Sevimlilar ro‘yxati bo‘sh',
    'fav.emptyHint': 'Kino sahifasidagi yurakcha tugmasini bosib, bu yerga qo‘shing.',

    'footer.about': 'DezoMax — filmlar, seriallar va multfilmlar uchun onlayn kinoteatr.',
    'footer.nav': 'Bo‘limlar',
    'footer.genres': 'Janrlar',
    'footer.rights': 'Barcha huquqlar himoyalangan.',
    'footer.demo': 'Demo loyiha. Barcha kino ma’lumotlari namuna sifatida keltirilgan.',

    'common.all': 'Barchasi',
    'common.showAll': 'Hammasi',
    'common.loading': 'Yuklanmoqda...'
  },

  ru: {
    'nav.home': 'Главная',
    'nav.films': 'Фильмы',
    'nav.series': 'Сериалы',
    'nav.cartoons': 'Мультфильмы',
    'nav.favorites': 'Избранное',
    'nav.catalog': 'Каталог',
    'nav.sport': 'Спорт',
    'nav.tv': 'Телеканалы',
    'nav.plans': 'Подписки',
    'nav.downloads': 'Загрузки',
    'nav.more': 'Ещё',
    'nav.close': 'Закрыть',

    'sport.title': 'Спорт',
    'sport.subtitle': 'Матчи сегодня и в ближайшие дни, счёт в реальном времени',
    'sport.soccer': 'Футбол',
    'sport.basketball': 'Баскетбол',
    'sport.tennis': 'Теннис',
    'sport.hockey': 'Хоккей',
    'sport.mma': 'UFC / ММА',
    'sport.f1': 'Формула 1',
    'sport.news': 'Новости футбола',
    'sport.live': 'LIVE',
    'sport.liveCount': 'в эфире',
    'sport.finished': 'Завершён',
    'sport.today': 'Сегодня',
    'sport.tomorrow': 'Завтра',
    'sport.yesterday': 'Вчера',
    'sport.more': 'Показать ещё',
    'sport.less': 'Свернуть',
    'sport.noEvents': 'В ближайшие дни событий нет',
    'sport.loading': 'Загружаем данные...',
    'sport.error': 'Не удалось загрузить данные',
    'sport.errorHint': 'Проверьте подключение к интернету или попробуйте позже.',
    'sport.retry': 'Повторить',
    'sport.source': 'Источник данных: ESPN',
    'sport.readMore': 'Читать полностью',
    'sport.winner': 'Победитель',
    'sport.race': 'Гонка',
    'sport.qual': 'Квалификация',
    'sport.practice': 'Практика',
    'sport.sprint': 'Спринт',
    'sport.podium': 'Подиум',

    'tv.title': 'Телеканалы',
    'tv.live': 'ПРЯМОЙ ЭФИР',
    'tv.select': 'Начать прямой эфир',
    'tv.selectHint': 'Нажмите — начнётся эфир. Или выберите другой канал из списка ниже.',
    'tv.channels': 'каналов',
    'tv.error': 'Канал не открылся',
    'tv.errorHint': 'Возможно, вещание временно остановлено. Попробуйте другой канал.',
    'tv.unmute': '🔊 Включить звук',
    'tv.fullscreen': 'Во весь экран',
    'tv.note': 'Каналы берутся из открытого эфира и не хранятся на сервере DezoMax.',

    'plans.title': 'Тарифы подписки',
    'plans.subtitle': 'Отмена в любой момент. Без скрытых платежей.',
    'plans.month': 'в месяц',
    'plans.choose': 'Выбрать',
    'plans.current': 'Ваш тариф',
    'plans.popular': 'Самый популярный',
    'plans.cancel': 'Отказаться от тарифа',
    'plans.saved': 'Тариф выбран',
    'plans.notice': 'Платёжная система пока не подключена. Тариф сохраняется только в этом браузере — реальные деньги не списываются.',
    'plans.compare': 'Сравнение тарифов',
    'plans.feature': 'Возможность',

    'dl.title': 'Загрузки',
    'dl.empty': 'Загрузок пока нет',
    'dl.emptyHint': 'Нажмите «Скачать» на странице фильма.',
    'dl.add': 'Скачать',
    'dl.added': 'В списке',
    'dl.remove': 'Убрать из списка',
    'dl.open': 'Открыть файл',
    'dl.unavailable': 'Скачивание недоступно',
    'dl.unavailableHint': 'У этого фильма нет прямого видеофайла — трейлер размещён на YouTube.',
    'dl.size': 'Размер',
    'dl.note': 'Файл сохраняется в папку загрузок браузера. Сам список остаётся в этом браузере.',

    'search.placeholder': 'Поиск фильмов и сериалов...',
    'search.results': 'Результаты поиска',
    'search.empty': 'Ничего не найдено',
    'search.emptyHint': 'Попробуйте другой запрос или сбросьте фильтры.',

    'hero.watch': 'Смотреть',
    'hero.more': 'Подробнее',

    'row.trending': 'В тренде',
    'row.new': 'Новинки',
    'row.top': 'Высокий рейтинг',
    'row.films': 'Фильмы',
    'row.series': 'Сериалы',
    'row.cartoons': 'Мультфильмы',
    'row.favorites': 'Ваше избранное',
    'row.marvel': 'Вселенная Marvel',
    'row.dc': 'Вселенная DC',
    'row.seeAll': 'Все',

    'catalog.title': 'Каталог',
    'catalog.reset': 'Сбросить',
    'catalog.all': 'Все',
    'catalog.sort': 'Сортировка',
    'catalog.sort.new': 'Сначала новые',
    'catalog.sort.old': 'Сначала старые',
    'catalog.sort.rating': 'По рейтингу',
    'catalog.sort.name': 'По названию',
    'catalog.type': 'Тип',
    'catalog.genre': 'Жанр',
    'catalog.franchise': 'Вселенная',
    'franchise.marvel': 'Marvel',
    'franchise.dc': 'DC',

    'type.film': 'Фильм',
    'type.serial': 'Сериал',
    'type.multfilm': 'Мультфильм',

    'movie.watchNow': 'Смотреть сейчас',
    'movie.trailer': 'Трейлер',
    'movie.addFav': 'В избранное',
    'movie.inFav': 'В избранном',
    'movie.year': 'Год',
    'movie.country': 'Страна',
    'movie.genre': 'Жанр',
    'movie.director': 'Режиссёр',
    'movie.cast': 'В ролях',
    'movie.duration': 'Длительность',
    'movie.seasons': 'Сезоны',
    'movie.min': 'мин.',
    'movie.about': 'О фильме',
    'movie.similar': 'Похожее',
    'movie.notFound': 'Фильм не найден',
    'movie.backHome': 'Вернуться на главную',
    'movie.rating': 'Рейтинг',

    'player.noSource': 'Ссылка на видео не добавлена',
    'player.hint': 'Добавьте ссылку в поле "video" этого фильма в файле js/data.js.',
    'player.film': 'Фильм',
    'player.trailer': 'Трейлер',
    'player.openExternal': 'Открыть в новом окне ↗',
    'player.trailerOnly': 'Ссылка на полный фильм не добавлена — пока показан трейлер.',

    'fav.empty': 'Список избранного пуст',
    'fav.emptyHint': 'Нажмите на сердечко на странице фильма, чтобы добавить.',

    'footer.about': 'DezoMax — онлайн-кинотеатр фильмов, сериалов и мультфильмов.',
    'footer.nav': 'Разделы',
    'footer.genres': 'Жанры',
    'footer.rights': 'Все права защищены.',
    'footer.demo': 'Демо-проект. Все данные о фильмах приведены в качестве примера.',

    'common.all': 'Все',
    'common.showAll': 'Все',
    'common.loading': 'Загрузка...'
  }
};

/* Joriy til / Текущий язык */
let LANG = localStorage.getItem('dezomax_lang') || 'uz';

function t(key) {
  return (I18N[LANG] && I18N[LANG][key]) || (I18N.uz[key]) || key;
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem('dezomax_lang', lang);
  document.documentElement.lang = lang;
  applyI18n();
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

/* data-i18n va data-i18n-ph atributlariga ega elementlarni yangilash */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === LANG);
  });
}
