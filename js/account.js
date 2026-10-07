/* ============================================================
   DezoMax — akkaunt sahifasi
   Kirmagan bo'lsa: telefon raqam yoki Google bilan kirish.
   Kirgan bo'lsa: 9 bo'lim (#tariff, #balance, #subs, #devices, #promo,
   #payments, #settings, #notify, #about).
   DIQQAT: to'lov tizimi ulanmagan — balans to'ldirish sinov uchun.
   ============================================================ */

Object.assign(I18N.uz, {
  'acc.m.tariff': 'Tarifni boshqarish',
  'acc.m.balance': 'Balans',
  'acc.m.subs': 'Obunalar',
  'acc.m.history': 'Ko‘rish tarixi',
  'acc.subsHistory': 'Obunalar tarixi',
  'acc.historyEmpty': 'Hali hech narsa ko‘rilmagan',
  'acc.historyHint': 'Boshlagan kinolaringiz shu yerda turadi — to‘xtagan joyidan davom ettirasiz.',
  'acc.historyClear': 'Tarixni tozalash',
  'acc.historyLeft': 'qoldi',
  'acc.m.devices': 'Qurilmalar',
  'acc.m.promo': 'Promokodlar',
  'acc.m.payments': 'To‘lov tarixi',
  'acc.m.settings': 'Sozlamalar',
  'acc.m.notify': 'Bildirishnomalar',
  'acc.m.support': 'Yordam',
  'acc.m.about': 'Biz haqimizda',
  'acc.supportText': 'Savolingiz bormi? Quyidagi usullardan biri orqali biz bilan bog‘laning — imkon qadar tezroq javob beramiz.',
  'acc.supportEmail': 'Email orqali yozish',
  'acc.supportTelegram': 'Telegram orqali yozish',
  'acc.supportFaqTitle': 'Ko‘p so‘raladigan savollar',
  'acc.faq1q': 'To‘lov qanday amalga oshadi?',
  'acc.faq1a': 'Balansni Click orqali to‘ldirasiz, tarif narxi shu balansdan avtomatik yechiladi.',
  'acc.faq2q': 'Obunani qanday bekor qilaman?',
  'acc.faq2a': '«Tarifni boshqarish» bo‘limida «Bepul tarifga o‘tish» tugmasini bosing — keyingi to‘lov olinmaydi.',
  'acc.faq3q': 'Hisobimni butunlay o‘chirtirsam bo‘ladimi?',
  'acc.faq3a': 'Ha, quyidagi havoladan hisobni o‘chirish tartibini ko‘ring.',
  'acc.supportDeleteLink': 'Hisobni o‘chirish',
  'acc.supportPrivacyLink': 'Maxfiylik siyosati',
  'acc.tvTitle': 'Televizorda ko‘ring',
  'acc.tvText': 'Kino tanlang, pleyerda TV belgisini bosing — Chromecast orqali katta ekranda tomosha qiling.',
  'acc.tvBtn': 'Kino tanlash',
  'acc.tvQrBtn': 'QR skanerlash',
  'acc.back': 'Orqaga',
  'acc.language': 'Til',
  'acc.plan': 'Tarif',
  'acc.balance': 'Balans',
  'acc.until': 'amal qiladi:',
  'acc.freeForever': 'Muddatsiz',
  'acc.autoRenew': 'Avtomatik uzaytirish',
  'acc.autoRenewHint': 'Muddat tugaganda tarif balansdan uzaytiriladi',
  'acc.changePlan': 'Tarifni o‘zgartirish',
  'acc.cancelPlan': 'Bepul tarifga o‘tish',
  'acc.cancelConfirm': 'Tarifni bekor qilib, bepul tarifga o‘tasizmi?',
  'acc.planCanceled': 'Bepul tarifga o‘tdingiz',
  'acc.topup': 'Balansni to‘ldirish',
  'acc.amount': 'Summa',
  'acc.method': 'To‘lov usuli',
  'acc.pay': 'To‘ldirish',
  'acc.topupDone': 'Balans to‘ldirildi',
  'acc.minAmount': 'Eng kam summa — 1 000 so‘m',
  'acc.payNote': 'To‘lov Click orqali amalga oshadi. Pul tushgach balans avtomatik to‘ldiriladi.',
  'acc.clickPay': 'Click orqali to‘lash',
  'acc.payOff': 'To‘lov tizimi ulanmoqda — tez orada ishga tushadi.',
  'acc.reLogin': 'Balansdan foydalanish uchun akkauntdan chiqib, qayta kiring.',
  'acc.payErr': 'To‘lov sahifasini ochib bo‘lmadi. Keyinroq urinib ko‘ring.',
  'acc.payReceived': 'To‘lov qabul qilindi, balans yangilandi',
  'acc.subsEmpty': 'Hali obuna yo‘q',
  'acc.subsEmptyHint': 'Tarif tanlang — reklamasiz va yuqori sifatda ko‘ring.',
  'acc.active': 'Faol',
  'acc.expired': 'Tugagan',
  'acc.choosePlan': 'Tarif tanlash',
  'acc.thisDevice': 'Shu qurilma',
  'acc.lastSeen': 'Oxirgi faollik:',
  'acc.removeDevice': 'Chiqarish',
  'acc.deviceRemoved': 'Qurilma akkauntdan chiqarildi',
  'acc.devUnknown': 'Qurilma (eski kirish)',
  'acc.devSince': 'Kirgan:',
  'acc.devLocal': 'Boshqa qurilmalarni ko‘rish uchun akkauntdan chiqib, qayta kiring.',
  'acc.devKicked': 'Bu qurilma akkauntdan chiqarilgan. Qayta kiring.',
  'acc.devT.desktop': 'Kompyuter',
  'acc.devT.phone': 'Telefon',
  'acc.devT.tablet': 'Planshet',
  'acc.devLink': 'Bu qurilma hali akkauntingizga ulanmagan — shuning uchun boshqa qurilmalarda ko‘rinmaydi. Google bilan bir marta tasdiqlang:',
  'acc.devLinkBtn': 'Qurilmani ulash',
  'acc.devErr': 'Server bilan bog‘lanib bo‘lmadi:',
  'acc.devOnline': 'Onlayn',
  'acc.devNoInfo': 'Eski kirish — ma’lumot yo‘q. Tanimasangiz, chiqarib tashlang.',
  'acc.devicesLimit': 'Tarifingiz bo‘yicha bir vaqtda qurilmalar:',
  'acc.promoPh': 'Promokodni kiriting',
  'acc.activate': 'Faollashtirish',
  'acc.promoBad': 'Bunday promokod yo‘q',
  'acc.promoUsed': 'Bu promokod allaqachon ishlatilgan',
  'acc.promoOk': 'Promokod faollashtirildi',
  'acc.promoList': 'Faollashtirilgan promokodlar',
  'acc.promoEmpty': 'Hali promokod ishlatilmagan',
  'acc.payEmpty': 'To‘lovlar yo‘q',
  'acc.setName': 'Ismingiz',
  'acc.editName': 'Ismni o‘zgartirish',
  'acc.save': 'Saqlash',
  'acc.saved': 'Saqlandi',
  'acc.autoplay': 'Keyingi videoni avtomatik boshlash',
  'acc.quality': 'Video sifati',
  'acc.qAuto': 'Avtomatik',
  'acc.loginMethod': 'Kirish usuli',
  'acc.notifyNew': 'Yangi kinolar',
  'acc.notifySport': 'Sport va jonli o‘yinlar',
  'acc.notifyPromo': 'Aksiya va promokodlar',
  'acc.notifyTypes': 'Qaysi xabarlar kelsin',
  'acc.notifyList': 'Xabarlar',
  'acc.notifyEmpty': 'Xabarlar yo‘q',
  'acc.readAll': 'Hammasini o‘qilgan qilish',
  'acc.aboutText': 'DezoMax — O‘zbekistondagi onlayn kinoteatr. O‘zbek kinolari rasmiy manbalardan, Marvel, DC va boshqa filmlar treylerlari, o‘zbek va rus telekanallari jonli efiri hamda sport natijalari — hammasi bitta ilovada.',
  'acc.aboutFeat1': 'O‘zbek tilidagi to‘liq filmlar',
  'acc.aboutFeat2': '60 dan ortiq telekanal',
  'acc.aboutFeat3': 'Futbol, basketbol, tennis, UFC, F1',
  'acc.aboutFeat4': 'Telefon, kompyuter va Android ilova',
  'acc.version': 'Versiya',
  'acc.website': 'Veb-sayt',
  'acc.memberSince': 'A’zo bo‘lgan sana:',
  'acc.bonus': 'Bonus',
  'acc.planBuy': 'Tarif',
  'acc.topupTx': 'Balansni to‘ldirish',
  'acc.promoTx': 'Promokod',
  'acc.daysLeft': 'kun qoldi',
  'acc.topupShort': 'To‘ldirish',
  'acc.q.topup': 'To‘ldirish',
  'acc.q.plan': 'Tariflar',
  'acc.q.promo': 'Promokod'
});

Object.assign(I18N.ru, {
  'acc.daysLeft': 'дн. осталось',
  'acc.topupShort': 'Пополнить',
  'acc.q.topup': 'Пополнить',
  'acc.q.plan': 'Тарифы',
  'acc.q.promo': 'Промокод',
  'acc.m.tariff': 'Управление тарифом',
  'acc.m.balance': 'Баланс',
  'acc.m.subs': 'Подписки',
  'acc.m.history': 'История просмотра',
  'acc.subsHistory': 'История подписок',
  'acc.historyEmpty': 'Вы ещё ничего не смотрели',
  'acc.historyHint': 'Начатые фильмы появятся здесь — продолжите с того же места.',
  'acc.historyClear': 'Очистить историю',
  'acc.historyLeft': 'осталось',
  'acc.m.devices': 'Устройства',
  'acc.m.promo': 'Промокоды',
  'acc.m.payments': 'История платежей',
  'acc.m.settings': 'Настройки',
  'acc.m.notify': 'Уведомления',
  'acc.m.support': 'Помощь',
  'acc.m.about': 'О нас',
  'acc.supportText': 'Есть вопрос? Свяжитесь с нами одним из способов ниже — ответим как можно быстрее.',
  'acc.supportEmail': 'Написать на почту',
  'acc.supportTelegram': 'Написать в Telegram',
  'acc.supportFaqTitle': 'Часто задаваемые вопросы',
  'acc.faq1q': 'Как проходит оплата?',
  'acc.faq1a': 'Пополняете баланс через Click, стоимость тарифа списывается с баланса автоматически.',
  'acc.faq2q': 'Как отменить подписку?',
  'acc.faq2a': 'В разделе «Управление тарифом» нажмите «Перейти на бесплатный» — следующее списание не произойдёт.',
  'acc.faq3q': 'Можно ли полностью удалить аккаунт?',
  'acc.faq3a': 'Да, порядок удаления аккаунта — по ссылке ниже.',
  'acc.supportDeleteLink': 'Удаление аккаунта',
  'acc.supportPrivacyLink': 'Политика конфиденциальности',
  'acc.tvTitle': 'Смотрите на телевизоре',
  'acc.tvText': 'Выберите фильм, нажмите значок ТВ в плеере — смотрите на большом экране через Chromecast.',
  'acc.tvBtn': 'Выбрать фильм',
  'acc.tvQrBtn': 'Сканировать QR',
  'acc.back': 'Назад',
  'acc.language': 'Язык',
  'acc.plan': 'Тариф',
  'acc.balance': 'Баланс',
  'acc.until': 'действует до:',
  'acc.freeForever': 'Бессрочно',
  'acc.autoRenew': 'Автопродление',
  'acc.autoRenewHint': 'По окончании срока тариф продлевается с баланса',
  'acc.changePlan': 'Сменить тариф',
  'acc.cancelPlan': 'Перейти на бесплатный',
  'acc.cancelConfirm': 'Отменить тариф и перейти на бесплатный?',
  'acc.planCanceled': 'Вы перешли на бесплатный тариф',
  'acc.topup': 'Пополнить баланс',
  'acc.amount': 'Сумма',
  'acc.method': 'Способ оплаты',
  'acc.pay': 'Пополнить',
  'acc.topupDone': 'Баланс пополнен',
  'acc.minAmount': 'Минимальная сумма — 1 000 сум',
  'acc.payNote': 'Оплата проходит через Click. После поступления средств баланс пополнится автоматически.',
  'acc.clickPay': 'Оплатить через Click',
  'acc.payOff': 'Платёжная система подключается — скоро заработает.',
  'acc.reLogin': 'Чтобы пользоваться балансом, выйдите из аккаунта и войдите снова.',
  'acc.payErr': 'Не удалось открыть страницу оплаты. Попробуйте позже.',
  'acc.payReceived': 'Оплата получена, баланс обновлён',
  'acc.subsEmpty': 'Подписок пока нет',
  'acc.subsEmptyHint': 'Выберите тариф — смотрите без рекламы и в высоком качестве.',
  'acc.active': 'Активна',
  'acc.expired': 'Истекла',
  'acc.choosePlan': 'Выбрать тариф',
  'acc.thisDevice': 'Это устройство',
  'acc.lastSeen': 'Последняя активность:',
  'acc.removeDevice': 'Отключить',
  'acc.deviceRemoved': 'Устройство отключено от аккаунта',
  'acc.devUnknown': 'Устройство (старый вход)',
  'acc.devSince': 'Вход:',
  'acc.devLocal': 'Чтобы видеть другие устройства, выйдите и войдите снова.',
  'acc.devKicked': 'Это устройство отключено от аккаунта. Войдите снова.',
  'acc.devT.desktop': 'Компьютер',
  'acc.devT.phone': 'Телефон',
  'acc.devT.tablet': 'Планшет',
  'acc.devLink': 'Это устройство ещё не привязано к аккаунту — поэтому его не видно на других устройствах. Подтвердите один раз через Google:',
  'acc.devLinkBtn': 'Привязать устройство',
  'acc.devErr': 'Не удалось связаться с сервером:',
  'acc.devOnline': 'В сети',
  'acc.devNoInfo': 'Старый вход — нет данных. Если не узнаёте, отключите.',
  'acc.devicesLimit': 'Устройств одновременно по вашему тарифу:',
  'acc.promoPh': 'Введите промокод',
  'acc.activate': 'Активировать',
  'acc.promoBad': 'Такого промокода нет',
  'acc.promoUsed': 'Этот промокод уже использован',
  'acc.promoOk': 'Промокод активирован',
  'acc.promoList': 'Активированные промокоды',
  'acc.promoEmpty': 'Промокоды ещё не использовались',
  'acc.payEmpty': 'Платежей нет',
  'acc.setName': 'Ваше имя',
  'acc.editName': 'Изменить имя',
  'acc.save': 'Сохранить',
  'acc.saved': 'Сохранено',
  'acc.autoplay': 'Автозапуск следующего видео',
  'acc.quality': 'Качество видео',
  'acc.qAuto': 'Авто',
  'acc.loginMethod': 'Способ входа',
  'acc.notifyNew': 'Новые фильмы',
  'acc.notifySport': 'Спорт и прямые матчи',
  'acc.notifyPromo': 'Акции и промокоды',
  'acc.notifyTypes': 'Какие уведомления получать',
  'acc.notifyList': 'Сообщения',
  'acc.notifyEmpty': 'Уведомлений нет',
  'acc.readAll': 'Отметить все прочитанными',
  'acc.aboutText': 'DezoMax — онлайн-кинотеатр в Узбекистане. Узбекские фильмы из официальных источников, трейлеры Marvel, DC и других фильмов, прямой эфир узбекских и российских телеканалов и спортивные результаты — всё в одном приложении.',
  'acc.aboutFeat1': 'Полные фильмы на узбекском',
  'acc.aboutFeat2': 'Более 60 телеканалов',
  'acc.aboutFeat3': 'Футбол, баскетбол, теннис, UFC, F1',
  'acc.aboutFeat4': 'Телефон, компьютер и Android-приложение',
  'acc.version': 'Версия',
  'acc.website': 'Веб-сайт',
  'acc.memberSince': 'С нами с',
  'acc.bonus': 'Бонус',
  'acc.planBuy': 'Тариф',
  'acc.topupTx': 'Пополнение баланса',
  'acc.promoTx': 'Промокод'
});

const APP_VERSION = '6.4';

/* Promokodlar: bonus — balansga so'm, plan — tarif necha kunga */
const PROMOCODES = {
  KINO2026: { plan: 'standard', days: 7, text: { uz: 'Standart tarif 7 kunga bepul', ru: 'Тариф Стандарт на 7 дней бесплатно' } },
  PREMIUM3: { plan: 'premium', days: 3, text: { uz: 'Premium tarif 3 kunga bepul', ru: 'Тариф Премиум на 3 дня бесплатно' } }
};

/* Tariflar (plans.js bilan bir xil narxlar) */
const ACC_PLANS = {
  free:     { price: 0,     devices: 1, name: { uz: 'Bepul', ru: 'Бесплатно' } },
  standard: { price: 29000, devices: 2, name: { uz: 'Standart', ru: 'Стандарт' } },
  premium:  { price: 49000, devices: 4, name: { uz: 'Premium', ru: 'Премиум' } }
};

const MENU = [
  { id: 'settings', icon: 'gear' }
];
/* Asosiy menyu faqat "Sozlamalar" — Tarif/Balans/Obunalar/Qurilmalar/Promokod
   yuqorida rangli kartalar sifatida ko'rinadi, qolganlari shu ro'yxatda */
const MORE_MENU = [
  { id: 'payments', icon: 'receipt' },
  { id: 'notify',  icon: 'bell' },
  { id: 'support', icon: 'help' },
  { id: 'about',   icon: 'info' }
];
/* Tepadagi rangli kartalar orqali ochiladigan bo'limlar (menyu qatori emas, lekin #hash to'g'ri ishlashi kerak) */
const TILE_SECTIONS = [
  { id: 'tariff',  icon: 'crown' },
  { id: 'balance', icon: 'wallet' },
  { id: 'subs',    icon: 'film' },
  { id: 'history', icon: 'film' },
  { id: 'devices', icon: 'device' },
  { id: 'promo',   icon: 'gift' }
];
const ALL_SECTIONS = [...MENU, ...MORE_MENU, ...TILE_SECTIONS];

const AI = {
  wallet:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/><path d="M6 6l9-3 1.5 3"/></svg>',
  device:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="13" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="17" y="8" width="5" height="12" rx="1.2"/></svg>',
  phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
  desktop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  gift:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8zM12 8c1.5-3 5-3.5 5-1.2C17 8 14.5 8 12 8z"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  gear:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  bell:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8.5a6 6 0 1 0-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/></svg>',
  help:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.3a2.8 2.8 0 0 1 5.4.9c0 1.9-2.4 2-2.4 3.6"/><path d="M12 17.2v.1"/></svg>',
  tv:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="13" rx="2.5"/><path d="M8 21h8M12 18v3"/><path d="M6.5 9.5a4 4 0 0 1 4-2M6.5 12.3a6.7 6.7 0 0 1 6.7-3.3"/></svg>',
  qr:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v.01"/></svg>',
  percent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/></svg>',
  play:    '<svg viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" fill="currentColor"/></svg>',
  send:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 12.3L21 3.5l-4.8 18-6-4.6-3.2 3.1-.5-5.1z"/></svg>',
  mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  logout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  google:  '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
  check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  pen:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19.5 8.5a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>'
};
const icon = name => AI[name] || ICONS[name] || '';

let profile = null;
const L = obj => (obj && (obj[LANG] || obj.uz)) || '';
const money = n => Math.round(n || 0).toLocaleString('ru-RU').replace(/ |,/g, ' ');
const sumWord = () => (LANG === 'ru' ? 'сум' : 'so‘m');
const fmtDate = (ts, withTime) => {
  if (!ts) return '—';
  const d = new Date(ts), p = n => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}` + (withTime ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : '');
};
const DAY = 86400000;

function toast(msg) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-in'));
  setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 300); }, 2600);
}

const langSwitchHTML = () => `
  <div class="lang acc-lang">
    <button class="lang-btn${LANG === 'uz' ? ' is-active' : ''}" data-lang="uz">UZ</button>
    <button class="lang-btn${LANG === 'ru' ? ' is-active' : ''}" data-lang="ru">RU</button>
  </div>`;

function bindLang(root) {
  root.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
}

async function save() { await Auth.saveProfile(profile); }

/* Balans va to'lovlar tarixi serverdan (server/server.js) — haqiqiy pul serverda saqlanadi */
async function syncServer() {
  if (!Pay.hasSession()) return false;
  try {
    const me = await Pay.me();
    const before = profile.balance;
    profile.balance = me.balance;
    const local = (profile.payments || []).filter(p => p.kind === 'promo');
    profile.payments = [...me.payments.map(p => ({ id: 's' + p.id, at: p.at, amount: p.amount, kind: p.kind === 'topup' ? 'topup' : 'plan', method: p.method, plan: p.plan, days: p.days })), ...local]
      .sort((a, b) => b.at - a.at);
    return before !== me.balance;
  } catch { return false; }          // server javob bermasa — oxirgi ma'lum balans qoladi
}

/* Click'dan qaytgach: pul serverga bir necha soniyada tushadi — balans oshguncha tekshirib turamiz */
async function waitPayment() {
  let w = null;
  try { w = JSON.parse(sessionStorage.getItem('dzxPayWait') || 'null'); } catch {}
  if (!w || Date.now() - w.at > 10 * 60000 || !Pay.hasSession()) return;
  for (let i = 0; i < 20; i++) {
    if (await syncServer() && profile.balance > w.balance) {
      try { sessionStorage.removeItem('dzxPayWait'); } catch {}
      await save(); renderAccount(); toast(t('acc.payReceived'));
      return;
    }
    await new Promise(r => setTimeout(r, 3000));
  }
}

/* Tarif uchun pul yechish: server yoqilgan bo'lsa — serverdan (haqiqiy balans), aks holda mahalliy (demo) */
async function charge(price, planId, days) {
  if (price <= 0) return true;
  if (!Pay.enabled()) return profile.balance >= price;         // demo: buyPlan o'zi yechadi
  if (!Pay.hasSession()) return false;
  try { const r = await Pay.spend(price, planId, days); profile.balance = r.balance + price; return true; }   // buyPlan yana price ayiradi
  catch { return false; }
}

/* Tarif muddati o'tgan bo'lsa: avtomatik uzaytirish yoki bepulga qaytish */
async function checkPlanExpiry() {
  if (!profile || profile.plan === 'free' || !profile.planUntil || profile.planUntil > Date.now()) return false;
  const plan = ACC_PLANS[profile.plan];
  // uzaytirish shartlari: sinovdan kelganlarda 7 kun / 5 000 so'm, qolganlarda tarif narxi / 30 kun
  const bill = profile.billing && profile.billing.price ? profile.billing : { days: 30, price: plan ? plan.price : 0 };
  if (profile.autoRenew && plan && profile.balance >= bill.price && await charge(bill.price, profile.plan, bill.days)) {
    buyPlan(profile.plan, bill.days, bill.price, true);
  } else {
    profile.plan = 'free';
    profile.planUntil = null;
  }
  return true;
}

function buyPlan(planId, days, price, renew = false) {
  const now = Date.now();
  const from = profile.plan === planId && profile.planUntil > now ? profile.planUntil : now;
  profile.balance -= price;
  profile.plan = planId;
  profile.planUntil = from + days * DAY;
  profile.subscriptions.unshift({ id: 's' + now, plan: planId, from: now, until: profile.planUntil, price });
  if (price > 0) {
    profile.payments.unshift({ id: 'p' + now, at: now, amount: -price, kind: 'plan', plan: planId, days, renew });
  }
}

/* ================= KIRISH ================= */

/* Bo'limlar kartochkalari: rang va katta rasm (chapdagi Tarif/Obunalar kartalari uslubida) */
const SECTION_LOOK = {
  'favorites.html': { cls: 'fav', glyph: '<svg viewBox="0 0 24 24"><defs><linearGradient id="gHeart" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd1dc"/><stop offset="1" stop-color="#ff4d7a"/></linearGradient></defs><path fill="url(#gHeart)" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.7 1.1-1a5.5 5.5 0 0 0 0-7.9z"/><ellipse cx="7.6" cy="7.6" rx="2.2" ry="1.3" fill="#fff" opacity=".55" transform="rotate(-35 7.6 7.6)"/></svg>' },
  'downloads.html': { cls: 'dl', glyph: '<svg viewBox="0 0 24 24"><defs><linearGradient id="gDl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0fbff"/><stop offset="1" stop-color="#5ee0f5"/></linearGradient></defs><circle cx="12" cy="12" r="10" fill="url(#gDl)"/><path d="M12 6.5v8M8.3 11.3 12 15l3.7-3.7M7.5 17.8h9" fill="none" stroke="#0e7490" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  'plans.html': { cls: 'plans', img: 'crown.webp' },
  'catalog.html': { cls: 'cat', glyph: '<svg viewBox="0 0 24 24"><defs><linearGradient id="gCat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs><rect x="2.5" y="2.5" width="8.5" height="8.5" rx="2.4" fill="url(#gCat)"/><rect x="13" y="2.5" width="8.5" height="8.5" rx="2.4" fill="url(#gCat)" opacity=".85"/><rect x="2.5" y="13" width="8.5" height="8.5" rx="2.4" fill="url(#gCat)" opacity=".85"/><rect x="13" y="13" width="8.5" height="8.5" rx="2.4" fill="url(#gCat)"/></svg>' },
  'catalog.html?type=film': { cls: 'film', img: 'play.webp' },
  'catalog.html?type=serial': { cls: 'serial', img: 'tv.webp' },
  'marvel.html': { cls: 'marvel', glyph: '<svg viewBox="0 0 40 24"><rect width="40" height="24" rx="2" fill="#fff"/><text x="20" y="18.5" text-anchor="middle" font-family="Oswald,Impact,sans-serif" font-weight="700" font-size="17" fill="#ec1d24" letter-spacing="-0.5">MARVEL</text></svg>' },
  'catalog.html?type=multfilm': { cls: 'cartoon', glyph: '<svg viewBox="0 0 24 24"><defs><linearGradient id="gStar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7c2"/><stop offset="1" stop-color="#facc15"/></linearGradient></defs><path fill="url(#gStar)" d="M12 2.2l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.1l-6 3.2 1.3-6.6-4.9-4.6 6.7-.8z"/><circle cx="9.6" cy="11.4" r="1" fill="#854d0e"/><circle cx="14.4" cy="11.4" r="1" fill="#854d0e"/><path d="M9.8 14.2c1.2 1 3.2 1 4.4 0" fill="none" stroke="#854d0e" stroke-width="1.1" stroke-linecap="round"/></svg>' }
};

/* Oldingi "Yana" menyusidagi bo'limlar — endi akkaunt sahifasida */
function sectionsHTML(skip = []) {
  const links = (typeof MORE_LINKS !== 'undefined' ? MORE_LINKS : []).filter(l => !l.sep && l.href !== 'account.html' && !skip.includes(l.href));
  const nFav = getFavs().length, nDl = getDownloads().length;
  return `
    <nav class="acc-sections" aria-label="${esc(t('nav.sections'))}">
      <div class="acc-sections-title">${t('nav.sections')}</div>
      <div class="acc-sections-grid">
        ${links.map(l => {
          const n = l.badge === 'fav' ? nFav : l.badge === 'dl' ? nDl : 0;
          const look = SECTION_LOOK[l.href] || {};
          return `<a class="acc-tile acc-sec-tile is-${look.cls || 'plain'}" href="${l.href}">
            ${look.img ? `<img class="acc-tile-hero" src="images/account/${look.img}" alt="" loading="lazy">` : `<span class="acc-sec-glyph" aria-hidden="true">${look.glyph || ICONS[l.icon] || ''}</span>`}
            <b>${t(l.label)}</b>
            ${n ? `<em class="acc-sec-count">${n}</em>` : ''}
          </a>`;
        }).join('')}
      </div>
    </nav>`;
}

function renderLogin() {
  const root = document.getElementById('account');
  const last = Auth.lastAccount();
  const demo = Auth.mode === 'demo';

  root.className = 'acc-auth-wrap';
  root.innerHTML = `
    <div class="acc-auth">
      <div class="acc-auth-top">
        <img class="acc-auth-logo" src="images/logo/standart.png" alt="DezoMax">
        ${langSwitchHTML()}
      </div>
      <h1>${t('acc.loginTitle')}</h1>
      <p class="acc-sub">${t('acc.loginSub')}</p>

      ${last ? `
        <div class="acc-last" id="accLast">
          <span class="acc-last-label">${t('acc.lastAccount')}</span>
          <div class="acc-last-card">
            ${last.photo ? `<span class="avatar"><img src="${esc(last.photo)}" alt="" referrerpolicy="no-referrer"></span>` : `<span class="avatar">${AI.google}</span>`}
            <span class="acc-last-info">
              <b>${esc(last.name || last.email)}</b>
              <small>${esc(last.email)}</small>
            </span>
          </div>
        </div>` : ''}

      <form class="acc-form" id="googleForm">
        ${demo ? `
          <label class="acc-label" for="gEmail">${t('acc.googleEmail')}</label>
          <input class="acc-input" id="gEmail" type="email" autocomplete="email" placeholder="name@gmail.com" value="${esc(last?.email || '')}">
          <label class="acc-label" for="gName">${t('acc.googleName')}</label>
          <input class="acc-input" id="gName" type="text" autocomplete="name" value="${esc(last?.name || '')}">` : ''}
        <p class="acc-error" id="gErr" hidden></p>
        <div class="acc-gbtn" id="gsiBtn" hidden></div>
        <button class="btn acc-google" id="gBtn" type="submit">${AI.google}<span>${t('acc.googleBtn')}</span></button>
      </form>

      ${demo ? `<p class="acc-note">${ICONS.info}<span>${t('acc.demoNote')}</span></p>` : ''}
      <p class="acc-terms">${t('acc.terms')}</p>
    </div>
    <div class="acc-auth-sections">${sectionsHTML()}</div>`;

  bindLang(root);
  const $ = s => root.querySelector(s);
  const showErr = msg => { const el = $('#gErr'); el.textContent = msg; el.hidden = !msg; };

  // Sayt + haqiqiy Google: Google'ning o'z tugmasi (popup), bizning tugma yashiriladi
  if (!demo && !Auth.native) {
    const box = $('#gsiBtn');
    box.hidden = false;
    $('#gBtn').hidden = true;
    Auth.renderGoogleButton(box, () => onLoggedIn(), e => { console.warn(e); showErr(`${t('acc.errGeneric')} (${String(e?.message || e).slice(0, 160)})`); })
      .catch(() => { box.hidden = true; $('#gBtn').hidden = false; showErr(t('acc.errGoogleLoad')); });
  }

  $('#googleForm').addEventListener('submit', async e => {
    e.preventDefault();
    let opts = {};
    if (demo) {
      const email = $('#gEmail').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showErr(t('acc.errEmail'));
      opts = { email, name: $('#gName').value.trim() };
    }
    showErr('');
    const btn = $('#gBtn');
    btn.disabled = true;
    try {
      await Auth.signInGoogle(opts);
      onLoggedIn();
    } catch (err) {
      console.warn(err);
      const msg = String(err?.message || err?.code || '');
      // foydalanuvchi oynani o'zi yopgan bo'lsa — xato ko'rsatmaymiz
      if (/cancel/i.test(msg)) return;
      // xato sababini ham ko'rsatamiz — muammoni topish oson bo'lsin
      const detail = msg && msg !== 'plugin' ? ` (${msg.slice(0, 160)})` : '';
      showErr((err.code === 'plugin' ? t('acc.errGoogleLoad') : t('acc.errGeneric')) + detail);
    } finally { btn.disabled = false; }
  });
}

async function onLoggedIn() {
  profile = await Auth.loadProfile();
  await showRolePicker(profile);
  toast(t('acc.welcome'));
  const next = new URLSearchParams(location.search).get('next');
  if (next && /^[a-z]+\.html(\?[\w=&%-]*)?$/.test(next)) { location.href = next; return; }
  renderAccount();
}

/* ================= AKKAUNT ================= */

const section = () => {
  const id = location.hash.slice(1);
  return ALL_SECTIONS.some(m => m.id === id) ? id : '';
};

/* Tarif muddati: qolgan kunlar va chiziq */
function planProgressHTML() {
  if (profile.plan === 'free' || !profile.planUntil) return `<span class="acc-stat-sub">${t('acc.freeForever')}</span>`;
  const sub = (profile.subscriptions || []).find(s => s.plan === profile.plan && s.until === profile.planUntil);
  const from = sub ? sub.from : profile.planUntil - 30 * DAY;
  const total = Math.max(DAY, profile.planUntil - from);
  const left = Math.max(0, profile.planUntil - Date.now());
  const days = Math.ceil(left / DAY);
  const pct = Math.round(left / total * 100);
  return `
    <span class="acc-stat-sub">${days} ${t('acc.daysLeft')}</span>
    <span class="acc-bar"><i style="width:${pct}%"></i></span>`;
}

function unreadCount() { return (profile.notifications || []).filter(n => !n.read).length; }

function renderAccount() {
  const root = document.getElementById('account');
  const u = Auth.user();
  const plan = ACC_PLANS[profile.plan] || ACC_PLANS.free;
  const sec = section();
  const wide = matchMedia('(min-width: 900px)').matches;
  const active = sec || (wide ? 'settings' : '');

  root.className = 'acc-layout' + (sec ? ' has-section' : '');
  root.innerHTML = `
    <aside class="acc-side">
      <div class="acc-profile">
        ${avatarHTML({ ...u, name: profile.name || u.name }, 'avatar avatar-lg')}
        <div class="acc-profile-info">
          <div class="acc-name" id="accName">
            <b>${esc(profile.name || accountLabel(u))}</b>
            <button type="button" class="acc-name-edit" id="accNameEdit" aria-label="${esc(t('acc.editName'))}" title="${esc(t('acc.editName'))}">${AI.pen}</button>
          </div>
          <small>${esc(u.email || formatPhone(u.phone))}</small>
          <span class="acc-profile-since">${t('acc.memberSince')} ${fmtDate(profile.createdAt)}</span>
        </div>
        ${langSwitchHTML()}
      </div>

      <div class="acc-tiles">
        <a class="acc-tile acc-tile-tariff" href="#tariff">
          <img class="acc-tile-hero" src="images/account/crown.webp" alt="" loading="lazy">
          <b>${t('acc.m.tariff')}</b>
          <small>${esc(L(plan.name))}</small>
        </a>
        <a class="acc-tile acc-tile-balance" href="#balance">
          <small>${t('acc.balance')}:</small>
          <b>${money(profile.balance)} <span>${sumWord()}</span></b>
          <span class="acc-tile-btn">${t('acc.topupShort')}</span>
        </a>
      </div>

      <a class="acc-tile acc-tile-subs acc-tile-history" href="#history">
        <img class="acc-tile-hero acc-tile-hero-wide" src="images/account/play.webp" alt="" loading="lazy">
        <b>${t('acc.m.history')}</b>
        ${watchList().length ? `<small>${watchList().length} ${LANG === 'ru' ? 'шт.' : 'ta'}</small>` : ''}
      </a>

      <div class="acc-tiles">
        <a class="acc-tile acc-tile-devices" href="#devices">
          <img class="acc-tile-hero" src="images/account/phone.webp" alt="" loading="lazy">
          <b>${t('acc.m.devices')}</b>
        </a>
        <a class="acc-tile acc-tile-promo" href="#promo">
          <img class="acc-tile-hero" src="images/account/percent.webp" alt="" loading="lazy">
          <b>${t('acc.m.promo')}</b>
        </a>
      </div>

      <div class="acc-tiles">
        <a class="acc-tile acc-tile-fav" href="favorites.html">
          <span class="acc-tile-glyph" aria-hidden="true">${SECTION_LOOK['favorites.html'].glyph}</span>
          <b>${t('nav.favorites')}</b>
          ${getFavs().length ? `<small>${getFavs().length} ${LANG === 'ru' ? 'шт.' : 'ta'}</small>` : ''}
        </a>
        <a class="acc-tile acc-tile-dl" href="downloads.html">
          <span class="acc-tile-glyph" aria-hidden="true">${SECTION_LOOK['downloads.html'].glyph}</span>
          <b>${t('nav.downloads')}</b>
          ${getDownloads().length ? `<small>${getDownloads().length} ${LANG === 'ru' ? 'шт.' : 'ta'}</small>` : ''}
        </a>
      </div>

      ${window.Capacitor?.isNativePlatform?.() ? `
      <div class="acc-tv-banner">
        <div class="acc-tv-banner-text">
          <b>${t('acc.tvTitle')}</b>
          <div class="acc-tv-banner-btns">
            <a class="acc-tv-banner-btn" href="catalog.html">${t('acc.tvBtn')}</a>
            <button type="button" class="acc-tv-banner-qr" id="tvQrBtn" aria-label="${esc(t('acc.tvQrBtn'))}">${AI.qr}</button>
          </div>
        </div>
        <img class="acc-tv-banner-icon" src="images/account/tv.webp" alt="" loading="lazy">
      </div>` : ''}

      <nav class="acc-menu">
        ${MENU.map(m => `
          <a class="acc-menu-item${m.id === active ? ' is-active' : ''}" href="#${m.id}">
            <span class="acc-menu-icon">${icon(m.icon)}</span>
            <span class="acc-menu-label">${t('acc.m.' + m.id)}</span>
            ${m.id === 'settings' && unreadCount() ? `<b class="acc-badge">${unreadCount()}</b>` : ''}
            <span class="acc-chev">${AI.chevron}</span>
          </a>`).join('')}
        <button class="acc-menu-item acc-logout" type="button" data-logout>
          <span class="acc-menu-icon">${AI.logout}</span>
          <span class="acc-menu-label">${t('acc.logout')}</span>
        </button>
      </nav>
    </aside>

    <section class="acc-panel" id="accPanel">
      ${active ? `
        <div class="acc-panel-head">
          <a class="acc-back" href="#">${ICONS.left}<span>${t('acc.back')}</span></a>
          <h2>${t('acc.m.' + active)}</h2>
        </div>
        <div class="acc-panel-body">${SECTIONS[active]()}</div>` : ''}
    </section>`;

  bindLang(root);
  bindNameEdit(root);
  root.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', logout));
  root.querySelector('#tvQrBtn')?.addEventListener('click', () => openQrScanner());
  if (active && BINDERS[active]) BINDERS[active](root.querySelector('#accPanel'));
  if (sec && !wide) window.scrollTo(0, 0);
}

/* Ismni profil kartasining o'zida tahrirlash (qalamcha → maydon → ✓) */
function bindNameEdit(root) {
  const box = root.querySelector('#accName');
  root.querySelector('#accNameEdit')?.addEventListener('click', () => {
    box.innerHTML = `<form class="acc-name-form" id="nameForm">
        <input class="acc-input" id="nameInput" type="text" maxlength="40" value="${esc(profile.name || '')}" placeholder="${esc(t('acc.setName'))}" aria-label="${esc(t('acc.setName'))}">
        <button type="submit" class="acc-name-ok" aria-label="${esc(t('acc.save'))}">${AI.check}</button>
      </form>`;
    const inp = box.querySelector('#nameInput');
    inp.focus(); inp.select();
    inp.addEventListener('keydown', e => { if (e.key === 'Escape') renderAccount(); });
    box.querySelector('#nameForm').addEventListener('submit', e => {
      e.preventDefault();
      profile.name = inp.value.trim();
      const u = Auth.user();
      if (u) { u.name = profile.name; localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u)); renderAccountButtons(); }
      rerender(t('acc.saved'));
    });
  });
}

async function logout() {
  if (!confirm(t('acc.logoutConfirm'))) return;
  await Auth.signOut();
  profile = null;
  history.replaceState(null, '', location.pathname);
  toast(t('acc.loggedOut'));
  renderLogin();
}

/* Telefon model kodi → savdo nomi (SM-S906B → Samsung Galaxy S22+): data/device-names.json, faqat shu sahifada yuklanadi */
let deviceNamesP = null;
const loadDeviceNames = () => deviceNamesP || (deviceNamesP = fetch('data/device-names.json').then(r => r.ok ? r.json() : {}).catch(() => ({})));
function prettyModel(raw, names) {
  const s = String(raw || '').trim();
  if (!s || !names) return s;
  const code = s.replace(/^\S+\s+(?=\S)/, '');            // ilova: «Samsung SM-S906B» → «SM-S906B»
  const sm = /SM-[A-Z]\d{3,4}/i.exec(s);
  return names[s] || names[code] || (sm && names[sm[0].toUpperCase()]) || s;
}
const withNames = async list => { const n = await loadDeviceNames(); return list.map(d => d.model ? { ...d, model: prettyModel(d.model, n) } : d); };

/* serverga ulanmagan holat: faqat shu qurilma (profilda bo'lmasa — hozirgi ma'lumot) */
const thisDeviceList = me => {
  const d = (profile.devices || []).find(x => x.id === me) || { ...deviceInfo(), lastSeen: Date.now() };
  return [{ ...d, current: true }];
};

/* Qurilmalar ro'yxati: joriysi birinchi, qolganlarini «Chiqarish» mumkin */
function devicesHTML(list) {
  const plan = ACC_PLANS[profile.plan] || ACC_PLANS.free;
  const kind = d => t('acc.devT.' + (['desktop', 'tablet'].includes(d.type) ? d.type : 'phone'));
  const known = d => d.os || d.app || d.model;
  // oxirgi 10 daqiqada faol — «Onlayn»
  const when = d => d.current || (d.lastSeen && Date.now() - d.lastSeen < 10 * 60000) ? `<span class="acc-dev-on">${t('acc.devOnline')}</span>`
    : d.lastSeen ? `${t('acc.lastSeen')} ${fmtDate(d.lastSeen, true)}` : d.addedAt ? `${t('acc.devSince')} ${fmtDate(d.addedAt, true)}` : '';
  return `
    <p class="acc-muted">${t('acc.devicesLimit')} <b>${list.length} / ${plan.devices}</b></p>
    <div class="acc-list">${list.map(d => `
      <div class="acc-item acc-dev">
        <span class="acc-item-icon">${d.type === 'desktop' ? AI.desktop : AI.phone}</span>
        <div class="acc-item-main">
          <b>${known(d) ? esc(kind(d) + (d.model ? ' · ' + d.model : '')) : t('acc.devUnknown')}</b>
          ${known(d) ? `<small>${esc([d.os, d.app].filter(Boolean).join(' · '))}${d.current ? ' · ' + t('acc.thisDevice') : ''}</small>` : `<small>${t('acc.devNoInfo')}</small>`}
          ${when(d) || d.ip ? `<small class="acc-dev-meta">${[when(d), d.ip ? 'IP ' + esc(d.ip) : ''].filter(Boolean).join(' · ')}</small>` : ''}
        </div>
        ${d.current
          ? `<span class="acc-pill is-on">${t('acc.active')}</span>`
          : `<button class="btn btn-ghost btn-sm" type="button" data-remove-device="${esc(d.id)}">${t('acc.removeDevice')}</button>`}
      </div>`).join('')}
    </div>`;
}

const HISTORY_KEY = 'dezomax_watch_history';   // js/movie.js yozadi
function watchList() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]').filter(x => x && x.id && x.dur > 0 && !x.done).slice(0, 20);
  } catch { return []; }
}

const emptyBox = (title, hint, action = '') => `
  <div class="acc-empty">${ICONS.empty || ''}<b>${title}</b>${hint ? `<p>${hint}</p>` : ''}${action}</div>`;

const toggleHTML = (id, on, label, hint = '') => `
  <label class="acc-toggle">
    <span><b>${label}</b>${hint ? `<small>${hint}</small>` : ''}</span>
    <input type="checkbox" id="${id}"${on ? ' checked' : ''}><i></i>
  </label>`;

/* ---------- Bo'limlar ---------- */

const SECTIONS = {
  tariff() {
    const plan = ACC_PLANS[profile.plan] || ACC_PLANS.free;
    const paid = profile.plan !== 'free';
    return `
      <div class="acc-card acc-plan-card${paid ? ' is-paid' : ''}">
        <div class="acc-plan-top">
          <span class="acc-plan-icon">${ICONS.crown}</span>
          <div>
            <small>${t('acc.plan')}</small>
            <h3>${esc(L(plan.name))}</h3>
          </div>
          <div class="acc-plan-price">${plan.price ? `${money(plan.price)} ${sumWord()}<small> / ${t('plans.month')}</small>` : '0'}</div>
        </div>
        <p class="acc-muted">${paid ? `${t('acc.until')} <b>${fmtDate(profile.planUntil)}</b>` : t('acc.freeForever')}</p>
        <p class="acc-muted">${t('acc.devicesLimit')} <b>${plan.devices}</b></p>
      </div>
      ${paid ? `<div class="acc-card">${toggleHTML('autoRenew', profile.autoRenew, t('acc.autoRenew'), t('acc.autoRenewHint'))}</div>` : ''}
      <div class="acc-actions">
        <a class="btn btn-primary" href="plans.html">${t('acc.changePlan')}</a>
        ${paid ? `<button class="btn btn-ghost" type="button" id="cancelPlan">${t('acc.cancelPlan')}</button>` : ''}
      </div>
      ${(profile.subscriptions || []).length ? `<h3 class="acc-sub-h">${t('acc.subsHistory')}</h3>${SECTIONS.subs()}` : ''}`;
  },

  /* Ko'rish tarixi — kino sahifasi saqlagan, oxirigacha ko'rilmagan kinolar (js/movie.js → dezomax_watch_history) */
  history() {
    const list = watchList();
    if (!list.length) return emptyBox(t('acc.historyEmpty'), t('acc.historyHint'), `<a class="btn btn-primary btn-sm" href="catalog.html">${t('acc.tvBtn')}</a>`);
    const left = sec => { const m = Math.max(1, Math.round(sec / 60)); return m >= 60 ? `${Math.floor(m / 60)} ${LANG === 'ru' ? 'ч' : 'soat'}${m % 60 ? ` ${m % 60} ${LANG === 'ru' ? 'мин' : 'daq.'}` : ''}` : `${m} ${LANG === 'ru' ? 'мин' : 'daq.'}`; };
    return `
      <div class="acc-list acc-hist">${list.map(x => `
        <a class="acc-item acc-hist-item" href="${esc(x.path || 'movie.html?id=' + x.id)}">
          <span class="acc-hist-thumb">${x.poster ? `<img src="${esc(x.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<i style="width:${Math.min(100, Math.max(3, x.t / x.dur * 100)).toFixed(1)}%"></i></span>
          <div class="acc-item-main">
            <b>${esc(x.title || '')}</b>
            <small>${left(x.dur - x.t)} ${t('acc.historyLeft')} · ${fmtDate(x.at, true)}</small>
          </div>
          <span class="acc-chev">${AI.chevron}</span>
        </a>`).join('')}
      </div>
      <div class="acc-actions"><button class="btn btn-ghost" type="button" id="histClear">${t('acc.historyClear')}</button></div>`;
  },

  balance() {
    return `
      <div class="acc-card acc-balance">
        <small>${t('acc.balance')}</small>
        <div class="acc-balance-sum">${money(profile.balance)} <span>${sumWord()}</span></div>
      </div>
      <form class="acc-card acc-topup" id="topupForm">
        <h3>${t('acc.topup')}</h3>
        <div class="chips">
          ${[10000, 29000, 50000, 100000].map(v => `<button class="chip" type="button" data-amount="${v}">${money(v)}</button>`).join('')}
        </div>
        <label class="acc-label" for="topupAmount">${t('acc.amount')}</label>
        <div class="acc-phone"><input id="topupAmount" type="text" inputmode="numeric" placeholder="50 000"><span>${sumWord()}</span></div>
        <p class="acc-error" id="topupErr"${Pay.enabled() && Pay.hasSession() ? ' hidden' : ''}>${!Pay.enabled() ? t('acc.payOff') : !Pay.hasSession() ? t('acc.reLogin') : ''}</p>
        <button class="btn btn-primary acc-submit" type="submit"${Pay.enabled() ? '' : ' disabled'}>${t('acc.clickPay')}</button>
        <p class="acc-note">${ICONS.info}<span>${t('acc.payNote')}</span></p>
      </form>`;
  },

  subs() {
    const list = profile.subscriptions || [];
    if (!list.length) {
      return emptyBox(t('acc.subsEmpty'), t('acc.subsEmptyHint'), `<a class="btn btn-primary btn-sm" href="plans.html">${t('acc.choosePlan')}</a>`);
    }
    const now = Date.now();
    return `<div class="acc-list">${list.map(s => {
      const on = s.until > now && s.plan === profile.plan;
      return `
        <div class="acc-item">
          <span class="acc-item-icon">${ICONS.crown}</span>
          <div class="acc-item-main">
            <b>${esc(L(ACC_PLANS[s.plan]?.name))}${s.promo ? ` · ${esc(s.promo)}` : ''}</b>
            <small>${fmtDate(s.from)} — ${fmtDate(s.until)}</small>
          </div>
          <span class="acc-pill${on ? ' is-on' : ''}">${on ? t('acc.active') : t('acc.expired')}</span>
        </div>`;
    }).join('')}</div>`;
  },

  devices() {
    if (Pay.hasSession()) return `<div id="accDevices"><div class="mt-loading"><i></i><i></i><i></i></div></div>`;
    const me = deviceId();
    const list = thisDeviceList(me);
    if (!Pay.enabled()) return devicesHTML(list) + `<p class="acc-muted acc-dev-note">${t('acc.devLocal')}</p>`;
    return devicesHTML(list) + `
      <div class="acc-card acc-dev-link">
        <p>${t('acc.devLink')}</p>
        <p class="acc-error" id="devErr"${Pay.lastError ? '' : ' hidden'}>${Pay.lastError ? esc(t('acc.devErr') + ' ' + Pay.lastError) : ''}</p>
        <div class="acc-gbtn" id="devGsi" hidden></div>
        <button class="btn btn-primary" id="devLinkBtn" type="button">${AI.google}<span>${t('acc.devLinkBtn')}</span></button>
      </div>`;
  },

  promo() {
    const used = profile.promos || [];
    return `
      <form class="acc-card acc-promo" id="promoForm">
        <div class="acc-promo-row">
          <input class="acc-input" id="promoInput" type="text" placeholder="${t('acc.promoPh')}" autocapitalize="characters" autocomplete="off">
          <button class="btn btn-primary" type="submit">${t('acc.activate')}</button>
        </div>
        <p class="acc-error" id="promoErr" hidden></p>
      </form>
      <h3 class="acc-h3">${t('acc.promoList')}</h3>
      ${used.length ? `<div class="acc-list">${used.map(p => `
        <div class="acc-item">
          <span class="acc-item-icon">${AI.gift}</span>
          <div class="acc-item-main">
            <b>${esc(p.code)}</b>
            <small>${esc(L(PROMOCODES[p.code]?.text))} · ${fmtDate(p.at)}</small>
          </div>
          <span class="acc-pill is-on">${AI.check}</span>
        </div>`).join('')}</div>` : `<p class="acc-muted">${t('acc.promoEmpty')}</p>`}`;
  },

  payments() {
    const list = profile.payments || [];
    if (!list.length) return emptyBox(t('acc.payEmpty'), '');
    return `<div class="acc-list">${list.map(p => {
      const title = p.kind === 'plan' ? `${t('acc.planBuy')}: ${L(ACC_PLANS[p.plan]?.name)} · ${p.days} ${LANG === 'ru' ? 'дн.' : 'kun'}`
        : p.kind === 'topup' ? `${t('acc.topupTx')} · ${p.method}`
        : `${t('acc.promoTx')}: ${p.code}`;
      return `
        <div class="acc-item">
          <span class="acc-item-icon">${AI.receipt}</span>
          <div class="acc-item-main">
            <b>${esc(title)}</b>
            <small>${fmtDate(p.at, true)}</small>
          </div>
          <span class="acc-amount${p.amount > 0 ? ' is-plus' : ''}">${p.amount > 0 ? '+' : '−'}${money(Math.abs(p.amount))} ${sumWord()}</span>
        </div>`;
    }).join('')}</div>`;
  },

  settings() {
    const s = profile.settings || {};
    const u = Auth.user();
    return `
      <div class="acc-card is-compact">
        ${toggleHTML('setAutoplay', s.autoplay !== false, t('acc.autoplay'))}
        <div class="acc-setting">
          <b>${t('acc.quality')}</b>
          <select class="select" id="setQuality">
            ${[['auto', t('acc.qAuto')], ['1080', '1080p'], ['720', '720p'], ['480', '480p'], ['360', '360p'], ['240', '240p']]
              .map(([v, l]) => `<option value="${v}"${(localStorage.getItem('dezomax_quality') || s.quality || 'auto') === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="acc-card is-compact">
        <div class="acc-setting">
          <b>${t('acc.loginMethod')}</b>
          <span class="acc-muted">Google · ${esc(u.email || formatPhone(u.phone))}</span>
        </div>
        <div class="acc-setting">
          <b>${t('acc.memberSince')}</b>
          <span class="acc-muted">${fmtDate(profile.createdAt)}</span>
        </div>
      </div>
      ${sectionsHTML(['favorites.html', 'downloads.html'])}
      <nav class="acc-menu acc-more-menu">
        ${MORE_MENU.map(m => `
          <a class="acc-menu-item" href="#${m.id}">
            <span class="acc-menu-icon">${icon(m.icon)}</span>
            <span class="acc-menu-label">${t('acc.m.' + m.id)}</span>
            ${m.id === 'notify' && unreadCount() ? `<b class="acc-badge">${unreadCount()}</b>` : ''}
            <span class="acc-chev">${AI.chevron}</span>
          </a>`).join('')}
      </nav>
      <button class="btn btn-ghost acc-logout-btn" type="button" data-logout>${AI.logout}<span>${t('acc.logout')}</span></button>`;
  },

  notify() {
    const s = profile.settings || {};
    const list = profile.notifications || [];
    return `
      <div class="acc-card">
        <h3 class="acc-h3">${t('acc.notifyTypes')}</h3>
        ${toggleHTML('nNew', s.notifyNew !== false, t('acc.notifyNew'))}
        ${toggleHTML('nSport', s.notifySport !== false, t('acc.notifySport'))}
        ${toggleHTML('nPromo', s.notifyPromo !== false, t('acc.notifyPromo'))}
      </div>
      <div class="acc-h3-row">
        <h3 class="acc-h3">${t('acc.notifyList')}</h3>
        ${unreadCount() ? `<button class="acc-link" type="button" id="readAll">${t('acc.readAll')}</button>` : ''}
      </div>
      ${list.length ? `<div class="acc-list">${list.map(n => `
        <div class="acc-item acc-notif${n.read ? '' : ' is-unread'}">
          <span class="acc-item-icon">${AI.bell}</span>
          <div class="acc-item-main">
            <b>${esc(L(n.title))}</b>
            <p>${esc(L(n.text))}</p>
            <small>${fmtDate(n.at, true)}</small>
          </div>
        </div>`).join('')}</div>` : emptyBox(t('acc.notifyEmpty'), '')}`;
  },

  support() {
    const faqs = [1, 2, 3].map(i => ({ q: t('acc.faq' + i + 'q'), a: t('acc.faq' + i + 'a') }));
    const tgLink = typeof TG_BOT !== 'undefined' && TG_BOT ? `https://t.me/${TG_BOT}` : '';
    return `
      <div class="acc-card acc-support-top">
        <span class="acc-support-icon">${AI.help}</span>
        <p>${t('acc.supportText')}</p>
        <div class="acc-support-btns">
          <a class="btn btn-primary" href="mailto:newaccaunt0404@gmail.com">${AI.mail}<span>${t('acc.supportEmail')}</span></a>
          ${tgLink ? `<a class="btn btn-ghost" href="${esc(tgLink)}" target="_blank" rel="noopener">${AI.send}<span>${t('acc.supportTelegram')}</span></a>` : ''}
        </div>
      </div>
      <h3 class="acc-h3">${t('acc.supportFaqTitle')}</h3>
      <div class="acc-list acc-faq">
        ${faqs.map(f => `
          <details class="acc-item acc-faq-item">
            <summary><b>${esc(f.q)}</b><span class="acc-faq-chev">${AI.chevron}</span></summary>
            <p>${esc(f.a)}${f.a === t('acc.faq3a') ? ` <a class="acc-link" href="delete-account.html">${t('acc.supportDeleteLink')}</a>` : ''}</p>
          </details>`).join('')}
      </div>
      <div class="acc-card">
        <div class="acc-setting"><b>${t('acc.supportPrivacyLink')}</b>
          <a class="acc-link" href="privacy.html">${t('acc.supportPrivacyLink')}</a></div>
        <div class="acc-setting"><b>${t('acc.supportDeleteLink')}</b>
          <a class="acc-link" href="delete-account.html">${t('acc.supportDeleteLink')}</a></div>
      </div>`;
  },

  about() {
    return `
      <div class="acc-card acc-about">
        <img src="images/logo/logo.png" alt="DezoMax" class="acc-about-logo">
        <p>${t('acc.aboutText')}</p>
        <ul class="acc-feats">
          ${[1, 2, 3, 4].map(i => `<li>${AI.check}<span>${t('acc.aboutFeat' + i)}</span></li>`).join('')}
        </ul>
      </div>
      <div class="acc-card">
        <div class="acc-setting"><b>${t('acc.version')}</b><span class="acc-muted">${APP_VERSION}</span></div>
        <div class="acc-setting"><b>${t('acc.website')}</b>
          <a class="acc-link" href="https://dezomax.uz" target="_blank" rel="noopener">dezomax.uz</a></div>
      </div>
      <p class="acc-muted acc-copy">© ${new Date().getFullYear()} DezoMax. ${t('footer.rights')}</p>`;
  }
};

/* ---------- Bo'lim tugmalari ---------- */

const rerender = async msg => { await save(); if (msg) toast(msg); renderAccount(); };

const BINDERS = {
  history(p) {
    p.querySelector('#histClear')?.addEventListener('click', () => {
      try { localStorage.removeItem(HISTORY_KEY); } catch {}
      renderAccount();
    });
  },
  tariff(p) {
    p.querySelector('#autoRenew')?.addEventListener('change', e => { profile.autoRenew = e.target.checked; save(); });
    p.querySelector('#cancelPlan')?.addEventListener('click', () => {
      if (!confirm(t('acc.cancelConfirm'))) return;
      profile.plan = 'free';
      profile.planUntil = null;
      localStorage.setItem('dezomax_plan', 'free');
      rerender(t('acc.planCanceled'));
    });
  },

  balance(p) {
    const input = p.querySelector('#topupAmount');
    const fmt = () => { const d = input.value.replace(/\D/g, '').slice(0, 8); input.value = d ? money(+d) : ''; };
    input.addEventListener('input', fmt);
    p.querySelectorAll('[data-amount]').forEach(b => b.addEventListener('click', () => { input.value = money(+b.dataset.amount); }));
    p.querySelector('#topupForm').addEventListener('submit', async e => {
      e.preventDefault();
      const amount = +input.value.replace(/\D/g, '');
      const err = p.querySelector('#topupErr');
      const fail = m => { err.textContent = m; err.hidden = false; };
      if (!Pay.enabled()) return fail(t('acc.payOff'));
      if (!Pay.hasSession()) return fail(t('acc.reLogin'));
      if (amount < 1000) return fail(t('acc.minAmount'));
      const btn = p.querySelector('.acc-submit');
      btn.disabled = true; err.hidden = true;
      try {
        const o = await Pay.order(amount);
        try { sessionStorage.setItem('dzxPayWait', JSON.stringify({ at: Date.now(), balance: profile.balance })); } catch {}
        location.href = o.url;                     // Click to'lov sahifasi (ilovada tizim brauzeri / Click ilovasi ochiladi)
      } catch (ex) {
        btn.disabled = false;
        fail(ex.code === 'auth' ? t('acc.reLogin') : (ex.code === 'server' && ex.message ? ex.message : t('acc.payErr')));
      }
    });
  },

  async devices(p) {
    const link = p.querySelector('#devLinkBtn');
    if (link) {
      const err = p.querySelector('#devErr');
      const fail = m => { err.textContent = t('acc.devErr') + ' ' + m; err.hidden = false; };
      const done = async () => { profile = await Auth.loadProfile(); if (Pay.hasSession()) renderAccount(); else fail(Pay.lastError || '—'); };
      if (!Auth.native) {
        // saytda — Google'ning o'z tugmasi (popup)
        const g = p.querySelector('#devGsi');
        g.hidden = false; link.hidden = true;
        Auth.renderGoogleButton(g, done, e => fail(e?.message || e)).catch(() => { g.hidden = true; link.hidden = false; });
      }
      link.addEventListener('click', async () => {
        link.disabled = true;
        try { await Auth.signInGoogle(); await done(); }
        catch (e) { if (!/cancel/i.test(String(e?.message))) fail(e?.message || e?.code || '—'); }
        finally { link.disabled = false; }
      });
      return;
    }
    const box = p.querySelector('#accDevices');
    if (!box) return;
    const draw = list => {
      box.innerHTML = devicesHTML(list);
      box.querySelectorAll('[data-remove-device]').forEach(b => b.addEventListener('click', async () => {
        b.disabled = true;
        try { draw(await withNames(await Pay.removeDevice(b.dataset.removeDevice))); toast(t('acc.deviceRemoved')); }
        catch (e) { b.disabled = false; toast(e.message || t('acc.errGeneric')); }
      }));
    };
    try { draw(await withNames(await Pay.devices())); }
    catch (e) {
      // boshqa qurilmadan chiqarilgan — bu yerda ham akkauntdan chiqamiz
      if (e.code === 'auth') { await Auth.signOut(); profile = null; toast(t('acc.devKicked')); return renderLogin(); }
      const me = deviceId();
      draw(await withNames(thisDeviceList(me)));
      box.insertAdjacentHTML('beforeend', `<p class="acc-error">${esc(t('acc.devErr') + ' ' + (e.message || e.code || '—'))}</p>`);
    }
  },

  promo(p) {
    p.querySelector('#promoForm').addEventListener('submit', e => {
      e.preventDefault();
      const code = p.querySelector('#promoInput').value.trim().toUpperCase();
      const err = p.querySelector('#promoErr');
      const promo = PROMOCODES[code];
      const fail = msg => { err.textContent = msg; err.hidden = false; };
      if (!promo) return fail(t('acc.promoBad'));
      if ((profile.promos || []).some(x => x.code === code)) return fail(t('acc.promoUsed'));

      const now = Date.now();
      if (promo.bonus) {
        profile.balance += promo.bonus;
        profile.payments.unshift({ id: 'p' + now, at: now, amount: promo.bonus, kind: 'promo', code });
      }
      if (promo.plan) {
        buyPlan(promo.plan, promo.days, 0);
        profile.subscriptions[0].promo = code;
        localStorage.setItem('dezomax_plan', promo.plan);
      }
      profile.promos.unshift({ code, at: now });
      profile.notifications.unshift({ id: 'n' + now, at: now, read: false,
        title: { uz: `Promokod ${code} faollashtirildi`, ru: `Промокод ${code} активирован` },
        text: promo.text });
      rerender(t('acc.promoOk'));
    });
  },

  settings(p) {
    p.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', logout));
    p.querySelector('#setAutoplay').addEventListener('change', e => { profile.settings.autoplay = e.target.checked; save(); });
    p.querySelector('#setQuality').addEventListener('change', e => {
      profile.settings.quality = e.target.value;
      localStorage.setItem('dezomax_quality', e.target.value);     // pleyer shu kalitni o'qiydi
      save();
      toast(t('acc.saved'));
    });
  },

  notify(p) {
    [['nNew', 'notifyNew'], ['nSport', 'notifySport'], ['nPromo', 'notifyPromo']].forEach(([id, key]) =>
      p.querySelector('#' + id).addEventListener('change', e => { profile.settings[key] = e.target.checked; save(); }));
    p.querySelector('#readAll')?.addEventListener('click', () => {
      profile.notifications.forEach(n => { n.read = true; });
      rerender();
    });
  }
};

/* ================= Ishga tushirish ================= */

async function boot() {
  const user = Auth.user();
  if (!user) { renderLogin(); return; }
  profile = await Auth.loadProfile(user);
  await syncServer();
  const expired = await checkPlanExpiry();
  touchDevice(profile);
  if (expired) await save(); else Auth.saveProfile(profile);
  renderAccount();
  waitPayment();
}

initLayout();
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
boot();

addEventListener('hashchange', () => { if (profile) renderAccount(); });
document.addEventListener('langchange', () => { profile ? renderAccount() : renderLogin(); applyI18n(); });

let wasWide = matchMedia('(min-width: 900px)').matches;
addEventListener('resize', () => {
  const wide = matchMedia('(min-width: 900px)').matches;
  if (wide !== wasWide && profile) { wasWide = wide; renderAccount(); }
});
