/* ============================================================
   DezoMax — akkaunt: kirish, profil, header'dagi akkaunt tugmasi
   ------------------------------------------------------------
   Ikki rejim:
   - firebase: js/firebase-config.js to'ldirilgan bo'lsa — haqiqiy SMS kod
     va Google orqali kirish, profil Firestore'da (users/{uid}) saqlanadi.
   - demo: sozlama yo'q — SMS yuborilmaydi, sinov kodi ekranda chiqadi,
     profil shu qurilmaning localStorage'ida saqlanadi.
   Ikkala rejimda ham kirgan akkaunt eslab qolinadi: qayta kirganda
   telefon raqam yoki Google akkaunt tayyor turadi.
   ============================================================ */

const AUTH_USER_KEY = 'dezomax_user';
const AUTH_LAST_KEY = 'dezomax_last_account';
const DEVICE_KEY    = 'dezomax_device_id';
const PROFILE_KEY   = uid => 'dezomax_profile_' + uid;

Object.assign(I18N.uz, {
  'nav.search': 'Qidiruv',
  'nav.account': 'Akkaunt',
  'acc.login': 'Kirish',
  'acc.loginTitle': 'Akkauntga kirish',
  'acc.loginSub': 'Obunangiz, balansingiz va sozlamalaringiz akkauntingizda saqlanadi.',
  'acc.byPhone': 'Telefon raqam',
  'acc.byGoogle': 'Google',
  'acc.phoneLabel': 'Telefon raqamingiz',
  'acc.sendCode': 'Kod olish',
  'acc.codeLabel': 'SMS kod',
  'acc.codeSent': 'Kod yuborildi:',
  'acc.verify': 'Tasdiqlash',
  'acc.changePhone': 'Raqamni o‘zgartirish',
  'acc.resend': 'Kodni qayta yuborish',
  'acc.googleBtn': 'Google orqali kirish',
  'acc.googleEmail': 'Gmail manzilingiz',
  'acc.googleName': 'Ismingiz',
  'acc.continue': 'Davom etish',
  'acc.lastAccount': 'Avval shu akkaunt bilan kirgansiz',
  'acc.otherAccount': 'Boshqa akkaunt bilan kirish',
  'acc.demoNote': 'Demo rejim: SMS va Google hali ulanmagan. Sinov kodi shu yerda ko‘rsatiladi, ma’lumotlar shu qurilmada saqlanadi.',
  'acc.demoCode': 'Sinov kodi',
  'acc.errPhone': 'Raqamni to‘liq kiriting',
  'acc.errCode': 'Kod noto‘g‘ri',
  'acc.errEmail': 'Gmail manzilini to‘g‘ri kiriting',
  'acc.errGeneric': 'Xatolik yuz berdi. Qayta urinib ko‘ring.',
  'acc.errPopup': 'Google oynasi yopildi yoki bloklandi',
  'acc.welcome': 'Xush kelibsiz!',
  'acc.logout': 'Akkauntdan chiqish',
  'acc.logoutConfirm': 'Akkauntdan chiqasizmi?',
  'acc.loggedOut': 'Akkauntdan chiqdingiz',
  'acc.terms': 'Kirish orqali foydalanish shartlariga rozilik bildirasiz.',
  'acc.guest': 'Mehmon'
});

Object.assign(I18N.ru, {
  'nav.search': 'Поиск',
  'nav.account': 'Аккаунт',
  'acc.login': 'Войти',
  'acc.loginTitle': 'Вход в аккаунт',
  'acc.loginSub': 'Подписка, баланс и настройки сохраняются в вашем аккаунте.',
  'acc.byPhone': 'Номер телефона',
  'acc.byGoogle': 'Google',
  'acc.phoneLabel': 'Ваш номер телефона',
  'acc.sendCode': 'Получить код',
  'acc.codeLabel': 'Код из SMS',
  'acc.codeSent': 'Код отправлен:',
  'acc.verify': 'Подтвердить',
  'acc.changePhone': 'Изменить номер',
  'acc.resend': 'Отправить код ещё раз',
  'acc.googleBtn': 'Войти через Google',
  'acc.googleEmail': 'Ваш адрес Gmail',
  'acc.googleName': 'Ваше имя',
  'acc.continue': 'Продолжить',
  'acc.lastAccount': 'Ранее вы входили с этим аккаунтом',
  'acc.otherAccount': 'Войти с другим аккаунтом',
  'acc.demoNote': 'Демо-режим: SMS и Google пока не подключены. Тестовый код показывается здесь, данные хранятся на этом устройстве.',
  'acc.demoCode': 'Тестовый код',
  'acc.errPhone': 'Введите номер полностью',
  'acc.errCode': 'Неверный код',
  'acc.errEmail': 'Введите корректный адрес Gmail',
  'acc.errGeneric': 'Произошла ошибка. Попробуйте ещё раз.',
  'acc.errPopup': 'Окно Google закрыто или заблокировано',
  'acc.welcome': 'Добро пожаловать!',
  'acc.logout': 'Выйти из аккаунта',
  'acc.logoutConfirm': 'Выйти из аккаунта?',
  'acc.loggedOut': 'Вы вышли из аккаунта',
  'acc.terms': 'Входя, вы соглашаетесь с условиями использования.',
  'acc.guest': 'Гость'
});

const USER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20.5c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/></svg>';

const readJSON = (key, def = null) => { try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; } };
const writeJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val));

/* +998901234567 → +998 90 123 45 67 */
function formatPhone(p) {
  const d = String(p || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('998')) {
    return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  }
  return p ? '+' + d : '';
}

/* ---------- Qurilma ---------- */

function deviceId() {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

function deviceInfo() {
  const ua = navigator.userAgent;
  const os = /Android/i.test(ua) ? 'Android'
    : /iPhone|iPad|iPod/i.test(ua) ? 'iOS'
    : /Windows/i.test(ua) ? 'Windows'
    : /Mac OS/i.test(ua) ? 'macOS'
    : /Linux/i.test(ua) ? 'Linux' : '—';
  const native = !!(window.Capacitor?.isNativePlatform?.());
  const app = native ? 'DezoMax App'
    : /Edg\//.test(ua) ? 'Edge'
    : /OPR\//.test(ua) ? 'Opera'
    : /YaBrowser/.test(ua) ? 'Yandex'
    : /Chrome\//.test(ua) ? 'Chrome'
    : /Firefox\//.test(ua) ? 'Firefox'
    : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  const type = /Mobi|Android|iPhone|iPod/i.test(ua) ? 'phone' : /iPad|Tablet/i.test(ua) ? 'tablet' : 'desktop';
  return { id: deviceId(), os, app, type };
}

/* ---------- Profil ---------- */

function defaultProfile(user) {
  const now = Date.now();
  return {
    uid: user.uid,
    method: user.method,
    phone: user.phone || '',
    email: user.email || '',
    name: user.name || '',
    createdAt: now,
    balance: 0,
    plan: 'free',
    planUntil: null,
    autoRenew: true,
    subscriptions: [],
    devices: [],
    promos: [],
    payments: [],
    notifications: [
      { id: 'welcome', at: now, read: false,
        title: { uz: 'DezoMax’ga xush kelibsiz!', ru: 'Добро пожаловать в DezoMax!' },
        text: { uz: 'O‘zbek kinolari, telekanallar va sport — hammasi bir joyda. DEZOMAX promokodi bilan balansingizga bonus oling.',
                ru: 'Узбекское кино, телеканалы и спорт — всё в одном месте. Получите бонус на баланс по промокоду DEZOMAX.' } }
    ],
    settings: { notifyNew: true, notifySport: true, notifyPromo: true, autoplay: true, quality: 'auto' }
  };
}

/* Qurilmani profilga yozib qo'yamiz (yoki oxirgi faollik vaqtini yangilaymiz) */
function touchDevice(profile) {
  const info = deviceInfo();
  const list = profile.devices || (profile.devices = []);
  const cur = list.find(d => d.id === info.id);
  if (cur) Object.assign(cur, info, { lastSeen: Date.now() });
  else list.push({ ...info, addedAt: Date.now(), lastSeen: Date.now() });
}

/* ---------- Firebase (faqat sozlama bo'lsa yuklanadi) ---------- */

const FB_VERSION = '10.14.1';
let fbPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('load ' + src));
    document.head.appendChild(s);
  });
}

function firebaseReady() {
  if (!fbPromise) {
    const base = `https://www.gstatic.com/firebasejs/${FB_VERSION}/`;
    fbPromise = loadScript(base + 'firebase-app-compat.js')
      .then(() => Promise.all([
        loadScript(base + 'firebase-auth-compat.js'),
        loadScript(base + 'firebase-firestore-compat.js')
      ]))
      .then(() => {
        if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        firebase.auth().languageCode = LANG === 'ru' ? 'ru' : 'uz';
        return firebase;
      });
  }
  return fbPromise;
}

/* ---------- Auth ---------- */

const Auth = {
  mode: (typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG) ? 'firebase' : 'demo',
  _pending: null,          // { phone, code | confirmation }

  user() { return readJSON(AUTH_USER_KEY); },
  lastAccount() { return readJSON(AUTH_LAST_KEY); },
  forgetLast() { localStorage.removeItem(AUTH_LAST_KEY); },

  /* Telefon: 1-qadam — kod yuborish */
  async sendPhoneCode(phone, recaptchaEl) {
    if (this.mode === 'demo') {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      this._pending = { phone, code };
      return { demoCode: code };
    }
    const fb = await firebaseReady();
    if (!this._verifier) {
      this._verifier = new fb.auth.RecaptchaVerifier(recaptchaEl, { size: 'invisible' });
    }
    const confirmation = await fb.auth().signInWithPhoneNumber(phone, this._verifier);
    this._pending = { phone, confirmation };
    return {};
  },

  /* Telefon: 2-qadam — kodni tekshirish */
  async verifyPhoneCode(code) {
    const p = this._pending;
    if (!p) throw new Error('no-pending');
    if (this.mode === 'demo') {
      if (code !== p.code) throw Object.assign(new Error('bad-code'), { code: 'bad-code' });
      return this._finish({ uid: 'phone_' + p.phone.replace(/\D/g, ''), method: 'phone', phone: p.phone });
    }
    try {
      const cred = await p.confirmation.confirm(code);
      return this._finish({ uid: cred.user.uid, method: 'phone', phone: cred.user.phoneNumber || p.phone });
    } catch (e) {
      if (e.code === 'auth/invalid-verification-code') e.code = 'bad-code';
      throw e;
    }
  },

  /* Google. Demo rejimda — email va ism so'raladi (opts) */
  async signInGoogle(opts = {}) {
    if (this.mode === 'demo') {
      const email = String(opts.email || '').trim().toLowerCase();
      return this._finish({ uid: 'google_' + email.replace(/[^a-z0-9]/g, '_'), method: 'google', email, name: opts.name || email.split('@')[0] });
    }
    const fb = await firebaseReady();
    const provider = new fb.auth.GoogleAuthProvider();
    if (opts.email) provider.setCustomParameters({ login_hint: opts.email });
    const cred = await fb.auth().signInWithPopup(provider);
    const u = cred.user;
    return this._finish({ uid: u.uid, method: 'google', email: u.email, name: u.displayName || '', photo: u.photoURL || '' });
  },

  async _finish(user) {
    user.at = Date.now();
    writeJSON(AUTH_USER_KEY, user);
    // Keyingi safar tezkor kirish uchun — telefon yoki Google akkaunt eslab qolinadi
    writeJSON(AUTH_LAST_KEY, { method: user.method, phone: user.phone || '', email: user.email || '', name: user.name || '', photo: user.photo || '' });

    const profile = await this.loadProfile(user);
    ['phone', 'email', 'name'].forEach(k => { if (user[k] && !profile[k]) profile[k] = user[k]; });
    touchDevice(profile);
    await this.saveProfile(profile);
    renderAccountButtons();
    return user;
  },

  async signOut() {
    if (this.mode === 'firebase') {
      try { const fb = await firebaseReady(); await fb.auth().signOut(); } catch {}
    }
    localStorage.removeItem(AUTH_USER_KEY);
    renderAccountButtons();
  },

  /* Profil: firebase — Firestore, demo — localStorage */
  async loadProfile(user = this.user()) {
    if (!user) return null;
    let data = null;
    if (this.mode === 'firebase') {
      try {
        const fb = await firebaseReady();
        const snap = await fb.firestore().collection('users').doc(user.uid).get();
        if (snap.exists) data = snap.data();
      } catch (e) { console.warn('Firestore o‘qilmadi', e); }
      data = data || readJSON(PROFILE_KEY(user.uid));
    } else {
      data = readJSON(PROFILE_KEY(user.uid));
    }
    return Object.assign(defaultProfile(user), data || {});
  },

  async saveProfile(profile) {
    writeJSON(PROFILE_KEY(profile.uid), profile);     // oflayn nusxa
    if (this.mode === 'firebase') {
      try {
        const fb = await firebaseReady();
        await fb.firestore().collection('users').doc(profile.uid).set(profile);
      } catch (e) { console.warn('Firestore’ga yozilmadi', e); }
    }
    document.dispatchEvent(new CustomEvent('profilechange', { detail: profile }));
  }
};

/* ---------- Header: akkaunt tugmasi ---------- */

function accountLabel(u) {
  if (!u) return t('acc.login');
  return u.name || (u.method === 'phone' ? formatPhone(u.phone) : u.email);
}

function avatarHTML(u, cls = 'avatar') {
  if (!u) return `<span class="${cls} is-guest">${USER_ICON}</span>`;
  if (u.photo) return `<span class="${cls}"><img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer"></span>`;
  const src = u.name || u.email || '';
  const letter = src ? src.trim()[0].toUpperCase() : '';
  return `<span class="${cls}">${letter ? esc(letter) : USER_ICON}</span>`;
}

function renderAccountButtons() {
  const u = Auth.user();
  document.querySelectorAll('[data-account-btn]').forEach(a => {
    a.innerHTML = avatarHTML(u, 'avatar avatar-sm');
    a.classList.toggle('is-in', !!u);
    a.title = accountLabel(u);
    a.setAttribute('aria-label', t('nav.account'));
    if (location.pathname.endsWith('account.html')) a.classList.add('is-active');
  });
}

document.addEventListener('DOMContentLoaded', renderAccountButtons);
if (document.readyState !== 'loading') renderAccountButtons();
document.addEventListener('langchange', renderAccountButtons);

/* Firebase rejimida sessiya muddati tugagan bo'lsa — mahalliy yozuvni ham tozalaymiz */
if (Auth.mode === 'firebase' && Auth.user()) {
  firebaseReady().then(fb => fb.auth().onAuthStateChanged(u => {
    if (!u && Auth.user()) { localStorage.removeItem(AUTH_USER_KEY); renderAccountButtons(); }
  })).catch(() => {});
}
