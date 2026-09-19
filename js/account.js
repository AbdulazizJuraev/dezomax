/* ============================================================
   DezoMax вЂ” akkaunt sahifasi
   Kirmagan bo'lsa: telefon raqam yoki Google bilan kirish.
   Kirgan bo'lsa: 9 bo'lim (#tariff, #balance, #subs, #devices, #promo,
   #payments, #settings, #notify, #about).
   DIQQAT: to'lov tizimi ulanmagan вЂ” balans to'ldirish sinov uchun.
   ============================================================ */

Object.assign(I18N.uz, {
  'acc.m.tariff': 'Tarifni boshqarish',
  'acc.m.balance': 'Balans',
  'acc.m.subs': 'Obunalar',
  'acc.m.devices': 'Qurilmalar',
  'acc.m.promo': 'Promokodlar',
  'acc.m.payments': 'ToвЂlov tarixi',
  'acc.m.settings': 'Sozlamalar',
  'acc.m.notify': 'Bildirishnomalar',
  'acc.m.about': 'Biz haqimizda',
  'acc.back': 'Orqaga',
  'acc.language': 'Til',
  'acc.plan': 'Tarif',
  'acc.balance': 'Balans',
  'acc.until': 'amal qiladi:',
  'acc.freeForever': 'Muddatsiz',
  'acc.autoRenew': 'Avtomatik uzaytirish',
  'acc.autoRenewHint': 'Muddat tugaganda tarif balansdan uzaytiriladi',
  'acc.changePlan': 'Tarifni oвЂzgartirish',
  'acc.cancelPlan': 'Bepul tarifga oвЂtish',
  'acc.cancelConfirm': 'Tarifni bekor qilib, bepul tarifga oвЂtasizmi?',
  'acc.planCanceled': 'Bepul tarifga oвЂtdingiz',
  'acc.topup': 'Balansni toвЂldirish',
  'acc.amount': 'Summa',
  'acc.method': 'ToвЂlov usuli',
  'acc.pay': 'ToвЂldirish',
  'acc.topupDone': 'Balans toвЂldirildi',
  'acc.minAmount': 'Eng kam summa вЂ” 1 000 soвЂm',
  'acc.payNote': 'ToвЂlov tizimi hali ulanmagan: balans sinov uchun toвЂldiriladi, haqiqiy pul yechilmaydi.',
  'acc.subsEmpty': 'Hali obuna yoвЂq',
  'acc.subsEmptyHint': 'Tarif tanlang вЂ” reklamasiz va yuqori sifatda koвЂring.',
  'acc.active': 'Faol',
  'acc.expired': 'Tugagan',
  'acc.choosePlan': 'Tarif tanlash',
  'acc.thisDevice': 'Shu qurilma',
  'acc.lastSeen': 'Oxirgi faollik:',
  'acc.removeDevice': 'Chiqarish',
  'acc.deviceRemoved': 'Qurilma oвЂchirildi',
  'acc.devicesLimit': 'Tarifingiz boвЂyicha bir vaqtda qurilmalar:',
  'acc.promoPh': 'Promokodni kiriting',
  'acc.activate': 'Faollashtirish',
  'acc.promoBad': 'Bunday promokod yoвЂq',
  'acc.promoUsed': 'Bu promokod allaqachon ishlatilgan',
  'acc.promoOk': 'Promokod faollashtirildi',
  'acc.promoList': 'Faollashtirilgan promokodlar',
  'acc.promoEmpty': 'Hali promokod ishlatilmagan',
  'acc.payEmpty': 'ToвЂlovlar yoвЂq',
  'acc.setName': 'Ismingiz',
  'acc.save': 'Saqlash',
  'acc.saved': 'Saqlandi',
  'acc.autoplay': 'Keyingi videoni avtomatik boshlash',
  'acc.quality': 'Video sifati',
  'acc.qAuto': 'Avtomatik',
  'acc.loginMethod': 'Kirish usuli',
  'acc.notifyNew': 'Yangi kinolar',
  'acc.notifySport': 'Sport va jonli oвЂyinlar',
  'acc.notifyPromo': 'Aksiya va promokodlar',
  'acc.notifyTypes': 'Qaysi xabarlar kelsin',
  'acc.notifyList': 'Xabarlar',
  'acc.notifyEmpty': 'Xabarlar yoвЂq',
  'acc.readAll': 'Hammasini oвЂqilgan qilish',
  'acc.aboutText': 'DezoMax вЂ” OвЂzbekistondagi onlayn kinoteatr. OвЂzbek kinolari rasmiy manbalardan, Marvel, DC va boshqa filmlar treylerlari, oвЂzbek va rus telekanallari jonli efiri hamda sport natijalari вЂ” hammasi bitta ilovada.',
  'acc.aboutFeat1': 'OвЂzbek tilidagi toвЂliq filmlar',
  'acc.aboutFeat2': '60 dan ortiq telekanal',
  'acc.aboutFeat3': 'Futbol, basketbol, tennis, UFC, F1',
  'acc.aboutFeat4': 'Telefon, kompyuter va Android ilova',
  'acc.version': 'Versiya',
  'acc.website': 'Veb-sayt',
  'acc.memberSince': 'AвЂ™zo boвЂlgan sana:',
  'acc.bonus': 'Bonus',
  'acc.planBuy': 'Tarif',
  'acc.topupTx': 'Balansni toвЂldirish',
  'acc.promoTx': 'Promokod',
  'acc.daysLeft': 'kun qoldi',
  'acc.topupShort': 'ToвЂldirish',
  'acc.q.topup': 'ToвЂldirish',
  'acc.q.plan': 'Tariflar',
  'acc.q.promo': 'Promokod'
});

Object.assign(I18N.ru, {
  'acc.daysLeft': 'РґРЅ. РѕСЃС‚Р°Р»РѕСЃСЊ',
  'acc.topupShort': 'РџРѕРїРѕР»РЅРёС‚СЊ',
  'acc.q.topup': 'РџРѕРїРѕР»РЅРёС‚СЊ',
  'acc.q.plan': 'РўР°СЂРёС„С‹',
  'acc.q.promo': 'РџСЂРѕРјРѕРєРѕРґ',
  'acc.m.tariff': 'РЈРїСЂР°РІР»РµРЅРёРµ С‚Р°СЂРёС„РѕРј',
  'acc.m.balance': 'Р‘Р°Р»Р°РЅСЃ',
  'acc.m.subs': 'РџРѕРґРїРёСЃРєРё',
  'acc.m.devices': 'РЈСЃС‚СЂРѕР№СЃС‚РІР°',
  'acc.m.promo': 'РџСЂРѕРјРѕРєРѕРґС‹',
  'acc.m.payments': 'РСЃС‚РѕСЂРёСЏ РїР»Р°С‚РµР¶РµР№',
  'acc.m.settings': 'РќР°СЃС‚СЂРѕР№РєРё',
  'acc.m.notify': 'РЈРІРµРґРѕРјР»РµРЅРёСЏ',
  'acc.m.about': 'Рћ РЅР°СЃ',
  'acc.back': 'РќР°Р·Р°Рґ',
  'acc.language': 'РЇР·С‹Рє',
  'acc.plan': 'РўР°СЂРёС„',
  'acc.balance': 'Р‘Р°Р»Р°РЅСЃ',
  'acc.until': 'РґРµР№СЃС‚РІСѓРµС‚ РґРѕ:',
  'acc.freeForever': 'Р‘РµСЃСЃСЂРѕС‡РЅРѕ',
  'acc.autoRenew': 'РђРІС‚РѕРїСЂРѕРґР»РµРЅРёРµ',
  'acc.autoRenewHint': 'РџРѕ РѕРєРѕРЅС‡Р°РЅРёРё СЃСЂРѕРєР° С‚Р°СЂРёС„ РїСЂРѕРґР»РµРІР°РµС‚СЃСЏ СЃ Р±Р°Р»Р°РЅСЃР°',
  'acc.changePlan': 'РЎРјРµРЅРёС‚СЊ С‚Р°СЂРёС„',
  'acc.cancelPlan': 'РџРµСЂРµР№С‚Рё РЅР° Р±РµСЃРїР»Р°С‚РЅС‹Р№',
  'acc.cancelConfirm': 'РћС‚РјРµРЅРёС‚СЊ С‚Р°СЂРёС„ Рё РїРµСЂРµР№С‚Рё РЅР° Р±РµСЃРїР»Р°С‚РЅС‹Р№?',
  'acc.planCanceled': 'Р’С‹ РїРµСЂРµС€Р»Рё РЅР° Р±РµСЃРїР»Р°С‚РЅС‹Р№ С‚Р°СЂРёС„',
  'acc.topup': 'РџРѕРїРѕР»РЅРёС‚СЊ Р±Р°Р»Р°РЅСЃ',
  'acc.amount': 'РЎСѓРјРјР°',
  'acc.method': 'РЎРїРѕСЃРѕР± РѕРїР»Р°С‚С‹',
  'acc.pay': 'РџРѕРїРѕР»РЅРёС‚СЊ',
  'acc.topupDone': 'Р‘Р°Р»Р°РЅСЃ РїРѕРїРѕР»РЅРµРЅ',
  'acc.minAmount': 'РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° вЂ” 1 000 СЃСѓРј',
  'acc.payNote': 'РџР»Р°С‚С‘Р¶РЅР°СЏ СЃРёСЃС‚РµРјР° РїРѕРєР° РЅРµ РїРѕРґРєР»СЋС‡РµРЅР°: Р±Р°Р»Р°РЅСЃ РїРѕРїРѕР»РЅСЏРµС‚СЃСЏ РґР»СЏ С‚РµСЃС‚Р°, СЂРµР°Р»СЊРЅС‹Рµ РґРµРЅСЊРіРё РЅРµ СЃРїРёСЃС‹РІР°СЋС‚СЃСЏ.',
  'acc.subsEmpty': 'РџРѕРґРїРёСЃРѕРє РїРѕРєР° РЅРµС‚',
  'acc.subsEmptyHint': 'Р’С‹Р±РµСЂРёС‚Рµ С‚Р°СЂРёС„ вЂ” СЃРјРѕС‚СЂРёС‚Рµ Р±РµР· СЂРµРєР»Р°РјС‹ Рё РІ РІС‹СЃРѕРєРѕРј РєР°С‡РµСЃС‚РІРµ.',
  'acc.active': 'РђРєС‚РёРІРЅР°',
  'acc.expired': 'РСЃС‚РµРєР»Р°',
  'acc.choosePlan': 'Р’С‹Р±СЂР°С‚СЊ С‚Р°СЂРёС„',
  'acc.thisDevice': 'Р­С‚Рѕ СѓСЃС‚СЂРѕР№СЃС‚РІРѕ',
  'acc.lastSeen': 'РџРѕСЃР»РµРґРЅСЏСЏ Р°РєС‚РёРІРЅРѕСЃС‚СЊ:',
  'acc.removeDevice': 'РћС‚РєР»СЋС‡РёС‚СЊ',
  'acc.deviceRemoved': 'РЈСЃС‚СЂРѕР№СЃС‚РІРѕ СѓРґР°Р»РµРЅРѕ',
  'acc.devicesLimit': 'РЈСЃС‚СЂРѕР№СЃС‚РІ РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ РїРѕ РІР°С€РµРјСѓ С‚Р°СЂРёС„Сѓ:',
  'acc.promoPh': 'Р’РІРµРґРёС‚Рµ РїСЂРѕРјРѕРєРѕРґ',
  'acc.activate': 'РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ',
  'acc.promoBad': 'РўР°РєРѕРіРѕ РїСЂРѕРјРѕРєРѕРґР° РЅРµС‚',
  'acc.promoUsed': 'Р­С‚РѕС‚ РїСЂРѕРјРѕРєРѕРґ СѓР¶Рµ РёСЃРїРѕР»СЊР·РѕРІР°РЅ',
  'acc.promoOk': 'РџСЂРѕРјРѕРєРѕРґ Р°РєС‚РёРІРёСЂРѕРІР°РЅ',
  'acc.promoList': 'РђРєС‚РёРІРёСЂРѕРІР°РЅРЅС‹Рµ РїСЂРѕРјРѕРєРѕРґС‹',
  'acc.promoEmpty': 'РџСЂРѕРјРѕРєРѕРґС‹ РµС‰С‘ РЅРµ РёСЃРїРѕР»СЊР·РѕРІР°Р»РёСЃСЊ',
  'acc.payEmpty': 'РџР»Р°С‚РµР¶РµР№ РЅРµС‚',
  'acc.setName': 'Р’Р°С€Рµ РёРјСЏ',
  'acc.save': 'РЎРѕС…СЂР°РЅРёС‚СЊ',
  'acc.saved': 'РЎРѕС…СЂР°РЅРµРЅРѕ',
  'acc.autoplay': 'РђРІС‚РѕР·Р°РїСѓСЃРє СЃР»РµРґСѓСЋС‰РµРіРѕ РІРёРґРµРѕ',
  'acc.quality': 'РљР°С‡РµСЃС‚РІРѕ РІРёРґРµРѕ',
  'acc.qAuto': 'РђРІС‚Рѕ',
  'acc.loginMethod': 'РЎРїРѕСЃРѕР± РІС…РѕРґР°',
  'acc.notifyNew': 'РќРѕРІС‹Рµ С„РёР»СЊРјС‹',
  'acc.notifySport': 'РЎРїРѕСЂС‚ Рё РїСЂСЏРјС‹Рµ РјР°С‚С‡Рё',
  'acc.notifyPromo': 'РђРєС†РёРё Рё РїСЂРѕРјРѕРєРѕРґС‹',
  'acc.notifyTypes': 'РљР°РєРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏ РїРѕР»СѓС‡Р°С‚СЊ',
  'acc.notifyList': 'РЎРѕРѕР±С‰РµРЅРёСЏ',
  'acc.notifyEmpty': 'РЈРІРµРґРѕРјР»РµРЅРёР№ РЅРµС‚',
  'acc.readAll': 'РћС‚РјРµС‚РёС‚СЊ РІСЃРµ РїСЂРѕС‡РёС‚Р°РЅРЅС‹РјРё',
  'acc.aboutText': 'DezoMax вЂ” РѕРЅР»Р°Р№РЅ-РєРёРЅРѕС‚РµР°С‚СЂ РІ РЈР·Р±РµРєРёСЃС‚Р°РЅРµ. РЈР·Р±РµРєСЃРєРёРµ С„РёР»СЊРјС‹ РёР· РѕС„РёС†РёР°Р»СЊРЅС‹С… РёСЃС‚РѕС‡РЅРёРєРѕРІ, С‚СЂРµР№Р»РµСЂС‹ Marvel, DC Рё РґСЂСѓРіРёС… С„РёР»СЊРјРѕРІ, РїСЂСЏРјРѕР№ СЌС„РёСЂ СѓР·Р±РµРєСЃРєРёС… Рё СЂРѕСЃСЃРёР№СЃРєРёС… С‚РµР»РµРєР°РЅР°Р»РѕРІ Рё СЃРїРѕСЂС‚РёРІРЅС‹Рµ СЂРµР·СѓР»СЊС‚Р°С‚С‹ вЂ” РІСЃС‘ РІ РѕРґРЅРѕРј РїСЂРёР»РѕР¶РµРЅРёРё.',
  'acc.aboutFeat1': 'РџРѕР»РЅС‹Рµ С„РёР»СЊРјС‹ РЅР° СѓР·Р±РµРєСЃРєРѕРј',
  'acc.aboutFeat2': 'Р‘РѕР»РµРµ 60 С‚РµР»РµРєР°РЅР°Р»РѕРІ',
  'acc.aboutFeat3': 'Р¤СѓС‚Р±РѕР», Р±Р°СЃРєРµС‚Р±РѕР», С‚РµРЅРЅРёСЃ, UFC, F1',
  'acc.aboutFeat4': 'РўРµР»РµС„РѕРЅ, РєРѕРјРїСЊСЋС‚РµСЂ Рё Android-РїСЂРёР»РѕР¶РµРЅРёРµ',
  'acc.version': 'Р’РµСЂСЃРёСЏ',
  'acc.website': 'Р’РµР±-СЃР°Р№С‚',
  'acc.memberSince': 'РЎ РЅР°РјРё СЃ',
  'acc.bonus': 'Р‘РѕРЅСѓСЃ',
  'acc.planBuy': 'РўР°СЂРёС„',
  'acc.topupTx': 'РџРѕРїРѕР»РЅРµРЅРёРµ Р±Р°Р»Р°РЅСЃР°',
  'acc.promoTx': 'РџСЂРѕРјРѕРєРѕРґ'
});

const APP_VERSION = '5.9';

/* Promokodlar: bonus вЂ” balansga so'm, plan вЂ” tarif necha kunga */
const PROMOCODES = {
  DEZOMAX:  { bonus: 10000, text: { uz: 'Balansga 10 000 soвЂm', ru: '10 000 СЃСѓРј РЅР° Р±Р°Р»Р°РЅСЃ' } },
  KINO2026: { plan: 'standard', days: 7, text: { uz: 'Standart tarif 7 kunga bepul', ru: 'РўР°СЂРёС„ РЎС‚Р°РЅРґР°СЂС‚ РЅР° 7 РґРЅРµР№ Р±РµСЃРїР»Р°С‚РЅРѕ' } },
  PREMIUM3: { plan: 'premium', days: 3, text: { uz: 'Premium tarif 3 kunga bepul', ru: 'РўР°СЂРёС„ РџСЂРµРјРёСѓРј РЅР° 3 РґРЅСЏ Р±РµСЃРїР»Р°С‚РЅРѕ' } }
};

/* Tariflar (plans.js bilan bir xil narxlar) */
const ACC_PLANS = {
  free:     { price: 0,     devices: 1, name: { uz: 'Bepul', ru: 'Р‘РµСЃРїР»Р°С‚РЅРѕ' } },
  standard: { price: 29000, devices: 2, name: { uz: 'Standart', ru: 'РЎС‚Р°РЅРґР°СЂС‚' } },
  premium:  { price: 49000, devices: 4, name: { uz: 'Premium', ru: 'РџСЂРµРјРёСѓРј' } }
};

const MENU = [
  { id: 'tariff',   icon: 'crown' },
  { id: 'balance',  icon: 'wallet' },
  { id: 'subs',     icon: 'film' },
  { id: 'devices',  icon: 'device' },
  { id: 'promo',    icon: 'gift' },
  { id: 'payments', icon: 'receipt' },
  { id: 'settings', icon: 'gear' },
  { id: 'notify',   icon: 'bell' },
  { id: 'about',    icon: 'info' }
];

const AI = {
  wallet:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/><path d="M6 6l9-3 1.5 3"/></svg>',
  device:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="13" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="17" y="8" width="5" height="12" rx="1.2"/></svg>',
  phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
  desktop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  gift:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8zM12 8c1.5-3 5-3.5 5-1.2C17 8 14.5 8 12 8z"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  gear:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  bell:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8.5a6 6 0 1 0-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  logout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  google:  '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
  check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};
const icon = name => AI[name] || ICONS[name] || '';

let profile = null;
const L = obj => (obj && (obj[LANG] || obj.uz)) || '';
const money = n => Math.round(n || 0).toLocaleString('ru-RU').replace(/В |,/g, ' ');
const sumWord = () => (LANG === 'ru' ? 'СЃСѓРј' : 'soвЂm');
const fmtDate = (ts, withTime) => {
  if (!ts) return 'вЂ”';
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

/* Tarif muddati o'tgan bo'lsa: avtomatik uzaytirish yoki bepulga qaytish */
function checkPlanExpiry() {
  if (!profile || profile.plan === 'free' || !profile.planUntil || profile.planUntil > Date.now()) return false;
  const plan = ACC_PLANS[profile.plan];
  if (profile.autoRenew && plan && profile.balance >= plan.price) {
    buyPlan(profile.plan, 30, plan.price, true);
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

/* Oldingi "Yana" menyusidagi bo'limlar вЂ” endi akkaunt sahifasida */
function sectionsHTML() {
  const links = (typeof MORE_LINKS !== 'undefined' ? MORE_LINKS : []).filter(l => !l.sep && l.href !== 'account.html');
  const nFav = getFavs().length, nDl = getDownloads().length;
  return `
    <nav class="acc-sections" aria-label="${esc(t('nav.sections'))}">
      <div class="acc-sections-title">${t('nav.sections')}</div>
      <div class="acc-sections-grid">
        ${links.map(l => {
          const n = l.badge === 'fav' ? nFav : l.badge === 'dl' ? nDl : 0;
          return `<a class="acc-section" href="${l.href}">
            <span class="acc-section-icon">${ICONS[l.icon] || ''}</span>
            <span class="acc-section-label">${t(l.label)}</span>
            ${n ? `<b class="acc-badge">${n}</b>` : ''}
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
      // foydalanuvchi oynani o'zi yopgan bo'lsa вЂ” xato ko'rsatmaymiz
      if (/cancel/i.test(msg)) return;
      // xato sababini ham ko'rsatamiz вЂ” muammoni topish oson bo'lsin
      const detail = msg && msg !== 'plugin' ? ` (${msg.slice(0, 160)})` : '';
      showErr((err.code === 'plugin' ? t('acc.errGoogleLoad') : t('acc.errGeneric')) + detail);
    } finally { btn.disabled = false; }
  });
}

async function onLoggedIn() {
  profile = await Auth.loadProfile();
  toast(t('acc.welcome'));
  const next = new URLSearchParams(location.search).get('next');
  if (next && /^[a-z]+\.html(\?[\w=&%-]*)?$/.test(next)) { location.href = next; return; }
  renderAccount();
}

/* ================= AKKAUNT ================= */

const section = () => {
  const id = location.hash.slice(1);
  return MENU.some(m => m.id === id) ? id : '';
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
  const active = sec || (wide ? 'tariff' : '');

  root.className = 'acc-layout' + (sec ? ' has-section' : '');
  root.innerHTML = `
    <aside class="acc-side">
      <div class="acc-profile">
        ${avatarHTML({ ...u, name: profile.name || u.name }, 'avatar avatar-lg')}
        <div class="acc-profile-info">
          <b>${esc(profile.name || accountLabel(u))}</b>
          <small>${esc(u.email || formatPhone(u.phone))}</small>
        </div>
        ${langSwitchHTML()}
      </div>

      <div class="acc-stats">
        <a class="acc-stat${profile.plan !== 'free' ? ' is-paid' : ''}" href="#tariff">
          <small>${ICONS.crown}${t('acc.plan')}</small>
          <b>${esc(L(plan.name))}</b>
          ${planProgressHTML()}
        </a>
        <a class="acc-stat" href="#balance">
          <small>${AI.wallet}${t('acc.balance')}</small>
          <b>${money(profile.balance)} <span>${sumWord()}</span></b>
          <span class="acc-stat-sub">${t('acc.topupShort')} в†’</span>
        </a>
      </div>

      <div class="acc-quick">
        <a href="#balance"><span>${AI.wallet}</span>${t('acc.q.topup')}</a>
        <a href="plans.html"><span>${ICONS.crown}</span>${t('acc.q.plan')}</a>
        <a href="#promo"><span>${AI.gift}</span>${t('acc.q.promo')}</a>
      </div>

      ${sectionsHTML()}

      <nav class="acc-menu">
        ${MENU.map(m => `
          <a class="acc-menu-item${m.id === active ? ' is-active' : ''}" href="#${m.id}">
            <span class="acc-menu-icon">${icon(m.icon)}</span>
            <span class="acc-menu-label">${t('acc.m.' + m.id)}</span>
            ${m.id === 'notify' && unreadCount() ? `<b class="acc-badge">${unreadCount()}</b>` : ''}
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
  root.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', logout));
  if (active && BINDERS[active]) BINDERS[active](root.querySelector('#accPanel'));
  if (sec && !wide) window.scrollTo(0, 0);
}

async function logout() {
  if (!confirm(t('acc.logoutConfirm'))) return;
  await Auth.signOut();
  profile = null;
  history.replaceState(null, '', location.pathname);
  toast(t('acc.loggedOut'));
  renderLogin();
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
      </div>`;
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
        <span class="acc-label">${t('acc.method')}</span>
        <div class="acc-methods">
          ${['Payme', 'Click', 'Uzcard', 'Humo'].map((m, i) => `
            <label class="acc-method"><input type="radio" name="method" value="${m}"${i ? '' : ' checked'}><span>${m}</span></label>`).join('')}
        </div>
        <p class="acc-error" id="topupErr" hidden></p>
        <button class="btn btn-primary acc-submit" type="submit">${t('acc.pay')}</button>
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
            <b>${esc(L(ACC_PLANS[s.plan]?.name))}${s.promo ? ` В· ${esc(s.promo)}` : ''}</b>
            <small>${fmtDate(s.from)} вЂ” ${fmtDate(s.until)}</small>
          </div>
          <span class="acc-pill${on ? ' is-on' : ''}">${on ? t('acc.active') : t('acc.expired')}</span>
        </div>`;
    }).join('')}</div>`;
  },

  devices() {
    const me = deviceId();
    const plan = ACC_PLANS[profile.plan] || ACC_PLANS.free;
    const list = [...(profile.devices || [])].sort((a, b) => (b.id === me) - (a.id === me) || b.lastSeen - a.lastSeen);
    return `
      <p class="acc-muted">${t('acc.devicesLimit')} <b>${list.length} / ${plan.devices}</b></p>
      <div class="acc-list">${list.map(d => `
        <div class="acc-item">
          <span class="acc-item-icon">${d.type === 'desktop' ? AI.desktop : AI.phone}</span>
          <div class="acc-item-main">
            <b>${esc(d.os)} В· ${esc(d.app)}</b>
            <small>${d.id === me ? t('acc.thisDevice') : `${t('acc.lastSeen')} ${fmtDate(d.lastSeen, true)}`}</small>
          </div>
          ${d.id === me
            ? `<span class="acc-pill is-on">${t('acc.active')}</span>`
            : `<button class="btn btn-ghost btn-sm" type="button" data-remove-device="${esc(d.id)}">${t('acc.removeDevice')}</button>`}
        </div>`).join('')}
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
            <small>${esc(L(PROMOCODES[p.code]?.text))} В· ${fmtDate(p.at)}</small>
          </div>
          <span class="acc-pill is-on">${AI.check}</span>
        </div>`).join('')}</div>` : `<p class="acc-muted">${t('acc.promoEmpty')}</p>`}`;
  },

  payments() {
    const list = profile.payments || [];
    if (!list.length) return emptyBox(t('acc.payEmpty'), '');
    return `<div class="acc-list">${list.map(p => {
      const title = p.kind === 'plan' ? `${t('acc.planBuy')}: ${L(ACC_PLANS[p.plan]?.name)} В· ${p.days} ${LANG === 'ru' ? 'РґРЅ.' : 'kun'}`
        : p.kind === 'topup' ? `${t('acc.topupTx')} В· ${p.method}`
        : `${t('acc.promoTx')}: ${p.code}`;
      return `
        <div class="acc-item">
          <span class="acc-item-icon">${AI.receipt}</span>
          <div class="acc-item-main">
            <b>${esc(title)}</b>
            <small>${fmtDate(p.at, true)}</small>
          </div>
          <span class="acc-amount${p.amount > 0 ? ' is-plus' : ''}">${p.amount > 0 ? '+' : 'в€’'}${money(Math.abs(p.amount))} ${sumWord()}</span>
        </div>`;
    }).join('')}</div>`;
  },

  settings() {
    const s = profile.settings || {};
    const u = Auth.user();
    return `
      <div class="acc-card">
        <div class="acc-setting">
          <b>${t('acc.language')}</b>
          ${langSwitchHTML()}
        </div>
      </div>
      <form class="acc-card" id="nameForm">
        <label class="acc-label" for="nameInput">${t('acc.setName')}</label>
        <div class="acc-promo-row">
          <input class="acc-input" id="nameInput" type="text" maxlength="40" value="${esc(profile.name || '')}">
          <button class="btn btn-ghost" type="submit">${t('acc.save')}</button>
        </div>
      </form>
      <div class="acc-card">
        ${toggleHTML('setAutoplay', s.autoplay !== false, t('acc.autoplay'))}
        <div class="acc-setting">
          <b>${t('acc.quality')}</b>
          <select class="select" id="setQuality">
            ${[['auto', t('acc.qAuto')], ['1080', '1080p'], ['720', '720p'], ['480', '480p'], ['360', '360p'], ['240', '240p']]
              .map(([v, l]) => `<option value="${v}"${(localStorage.getItem('dezomax_quality') || s.quality || 'auto') === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="acc-card">
        <div class="acc-setting">
          <b>${t('acc.loginMethod')}</b>
          <span class="acc-muted">Google В· ${esc(u.email || formatPhone(u.phone))}</span>
        </div>
        <div class="acc-setting">
          <b>${t('acc.memberSince')}</b>
          <span class="acc-muted">${fmtDate(profile.createdAt)}</span>
        </div>
      </div>
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
          <a class="acc-link" href="https://abdulazizjuraev.github.io/dezomax/" target="_blank" rel="noopener">abdulazizjuraev.github.io/dezomax</a></div>
      </div>
      <p class="acc-muted acc-copy">В© ${new Date().getFullYear()} DezoMax. ${t('footer.rights')}</p>`;
  }
};

/* ---------- Bo'lim tugmalari ---------- */

const rerender = async msg => { await save(); if (msg) toast(msg); renderAccount(); };

const BINDERS = {
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
    p.querySelector('#topupForm').addEventListener('submit', e => {
      e.preventDefault();
      const amount = +input.value.replace(/\D/g, '');
      const err = p.querySelector('#topupErr');
      if (amount < 1000) { err.textContent = t('acc.minAmount'); err.hidden = false; return; }
      const method = p.querySelector('input[name="method"]:checked').value;
      profile.balance += amount;
      profile.payments.unshift({ id: 'p' + Date.now(), at: Date.now(), amount, kind: 'topup', method });
      rerender(t('acc.topupDone'));
    });
  },

  devices(p) {
    p.querySelectorAll('[data-remove-device]').forEach(b => b.addEventListener('click', () => {
      profile.devices = profile.devices.filter(d => d.id !== b.dataset.removeDevice);
      rerender(t('acc.deviceRemoved'));
    }));
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
        title: { uz: `Promokod ${code} faollashtirildi`, ru: `РџСЂРѕРјРѕРєРѕРґ ${code} Р°РєС‚РёРІРёСЂРѕРІР°РЅ` },
        text: promo.text });
      rerender(t('acc.promoOk'));
    });
  },

  settings(p) {
    p.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', logout));
    p.querySelector('#nameForm').addEventListener('submit', e => {
      e.preventDefault();
      profile.name = p.querySelector('#nameInput').value.trim();
      const u = Auth.user();
      if (u) { u.name = profile.name; localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u)); renderAccountButtons(); }
      rerender(t('acc.saved'));
    });
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
  const expired = checkPlanExpiry();
  touchDevice(profile);
  if (expired) await save(); else Auth.saveProfile(profile);
  renderAccount();
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
