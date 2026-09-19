/* ============================================================
   DezoMax — akkaunt: Google orqali kirish, profil, header'dagi akkaunt tugmasi
   ------------------------------------------------------------
   Kirish faqat Google orqali (js/firebase-config.js → GOOGLE_WEB_CLIENT_ID).
   Sozlama bo'sh bo'lsa — demo rejim. Kirgan Google akkaunt eslab qolinadi.
   Profil (tarif, balans...) shu qurilmada saqlanadi.
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
  'acc.loginSub': 'Google akkauntingiz bilan bir bosishda kiring. Obuna, balans va sozlamalar akkauntingizga bog‘lanadi.',
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
  'acc.demoNote': 'Demo rejim: Google hali ulanmagan — Gmail manzilingizni yozing. Ma’lumotlar shu qurilmada saqlanadi.',
  'acc.errGoogleLoad': 'Google bilan bog‘lanib bo‘lmadi. Internetni tekshiring.',
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
  'acc.loginSub': 'Войдите в один клик через аккаунт Google. Подписка, баланс и настройки привязываются к аккаунту.',
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
  'acc.demoNote': 'Демо-режим: Google пока не подключён — введите адрес Gmail. Данные хранятся на этом устройстве.',
  'acc.errGoogleLoad': 'Не удалось связаться с Google. Проверьте интернет.',
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
  // Android ilovasi YouTube uchun o'zini kompyuter brauzeri deb tanishtiradi (DezoMaxApp belgisi bilan)
  if (/DezoMaxApp/.test(ua)) return { id: deviceId(), os: 'Android', app: 'DezoMax App', type: 'phone' };
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

/* Yangi ro'yxatdan o'tgan foydalanuvchiga 1 oy bepul Standart tarif. Muddat tugagach (js/account.js →
   checkPlanExpiry): balans yetsa oylik obuna avtomatik uzayadi, yetmasa — Bepul tarifga qaytadi.
   DIQQAT: to'lov tizimi ulanmagan va profil shu qurilmada saqlanadi — sinov muddati serverda nazorat qilinmaydi. */
const TRIAL = { plan: 'standard', days: 30, price: 29000 };

function defaultProfile(user) {
  const now = Date.now();
  const trialUntil = now + TRIAL.days * 86400000;
  return {
    uid: user.uid,
    method: user.method,
    phone: user.phone || '',
    email: user.email || '',
    name: user.name || '',
    createdAt: now,
    balance: 0,
    plan: TRIAL.plan,
    planUntil: trialUntil,
    trial: true,
    autoRenew: true,
    subscriptions: [{ id: 's' + now, plan: TRIAL.plan, from: now, until: trialUntil, price: 0, trial: true }],
    devices: [],
    promos: [],
    payments: [],
    notifications: [
      { id: 'trial', at: now + 1, read: false,
        title: { uz: '1 oy bepul boshlandi 🎁', ru: 'Бесплатный месяц начался 🎁' },
        text: { uz: 'Standart tarifdan 1 oy bepul foydalaning. Keyin oyiga 29 000 so‘m — obunani istalgan vaqtda bekor qilish mumkin.',
                ru: 'Пользуйтесь тарифом Стандарт 1 месяц бесплатно. Затем 29 000 сум в месяц — подписку можно отменить в любой момент.' } },
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

/* ---------- Google orqali kirish ----------
   - Sayt: Google Identity Services — Google'ning rasmiy "Sign in with Google" tugmasi
   - Android ilova: @capgo/capacitor-social-login — telefondagi Google akkaunt tanlash oynasi
   - Demo (GOOGLE_WEB_CLIENT_ID bo'sh): Gmail manzili qo'lda kiritiladi */

const GOOGLE_ID = (typeof GOOGLE_WEB_CLIENT_ID !== 'undefined' && GOOGLE_WEB_CLIENT_ID) || '';
const IS_NATIVE = !!(window.Capacitor?.isNativePlatform?.());

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('load ' + src));
    document.head.appendChild(s);
  });
}

/* Google ID token (JWT) ichidagi ism, email, rasm */
function decodeJwt(token) {
  try {
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(part).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
    return JSON.parse(json);
  } catch { return {}; }
}

const Auth = {
  mode: GOOGLE_ID ? 'google' : 'demo',
  native: IS_NATIVE,

  user() { return readJSON(AUTH_USER_KEY); },
  lastAccount() {
    const last = readJSON(AUTH_LAST_KEY);
    return last && last.method === 'google' ? last : null;     // eski telefon raqamli yozuvlar e'tiborga olinmaydi
  },

  /* Sayt: Google tugmasini chizish. onUser(user) — muvaffaqiyatli kirganda */
  async renderGoogleButton(el, onUser, onError) {
    if (!GOOGLE_ID || IS_NATIVE) return false;
    await loadScript('https://accounts.google.com/gsi/client');
    google.accounts.id.initialize({
      client_id: GOOGLE_ID,
      ux_mode: 'popup',
      auto_select: false,
      callback: async resp => {
        try {
          const p = decodeJwt(resp.credential);
          if (!p.email) throw new Error('no email');
          onUser(await this._finish({ uid: 'google_' + p.sub, method: 'google', email: p.email, name: p.name || '', photo: p.picture || '' }));
        } catch (e) { onError && onError(e); }
      }
    });
    google.accounts.id.renderButton(el, {
      theme: 'filled_black', size: 'large', shape: 'pill', text: 'continue_with',
      width: Math.min(400, Math.max(200, el.clientWidth || 300)),
      locale: LANG === 'ru' ? 'ru' : 'uz'
    });
    return true;
  },

  /* Ilova: telefondagi Google akkauntlardan tanlash. Demo: opts = { email, name } */
  async signInGoogle(opts = {}) {
    if (!GOOGLE_ID) {
      const email = String(opts.email || '').trim().toLowerCase();
      return this._finish({ uid: 'google_' + email.replace(/[^a-z0-9]/g, '_'), method: 'google', email, name: opts.name || email.split('@')[0] });
    }
    const SL = window.Capacitor?.Plugins?.SocialLogin;
    if (!SL) throw Object.assign(new Error('plugin'), { code: 'plugin' });
    if (!this._slReady) {
      await SL.initialize({ google: { webClientId: GOOGLE_ID } });
      this._slReady = true;
    }
    // scopes BERILMAYDI: plagin qo'shimcha scope uchun MainActivity o'zgartirishni talab qiladi,
    // ism, email va rasm esa Google ID token ichida baribir keladi
    const res = await SL.login({ provider: 'google', options: {} });
    const r = res.result || {};
    const p = r.profile || {};
    const jwt = r.idToken ? decodeJwt(r.idToken) : {};
    const email = p.email || jwt.email;
    if (!email) throw new Error('no email');
    return this._finish({
      uid: 'google_' + (p.id || jwt.sub || email),
      method: 'google', email,
      name: p.name || jwt.name || '',
      photo: p.imageUrl || jwt.picture || ''
    });
  },

  async _finish(user) {
    user.at = Date.now();
    writeJSON(AUTH_USER_KEY, user);
    // keyingi safar tezkor kirish uchun Google akkaunt eslab qolinadi
    writeJSON(AUTH_LAST_KEY, { method: 'google', email: user.email, name: user.name || '', photo: user.photo || '' });

    const profile = await this.loadProfile(user);
    ['email', 'name', 'photo'].forEach(k => { if (user[k]) profile[k] = user[k]; });
    profile.method = 'google';
    touchDevice(profile);
    await this.saveProfile(profile);
    renderAccountButtons();
    return user;
  },

  async signOut() {
    try {
      if (IS_NATIVE && GOOGLE_ID) await window.Capacitor.Plugins.SocialLogin?.logout({ provider: 'google' });
      else if (window.google?.accounts?.id) google.accounts.id.disableAutoSelect();
    } catch {}
    localStorage.removeItem(AUTH_USER_KEY);
    renderAccountButtons();
  },

  /* Profil shu qurilmada saqlanadi (server ulanmagan) */
  async loadProfile(user = this.user()) {
    if (!user) return null;
    return Object.assign(defaultProfile(user), readJSON(PROFILE_KEY(user.uid)) || {});
  },

  async saveProfile(profile) {
    writeJSON(PROFILE_KEY(profile.uid), profile);
    document.dispatchEvent(new CustomEvent('profilechange', { detail: profile }));
  }
};

/* ---------- Header: akkaunt tugmasi ---------- */

function accountLabel(u) {
  if (!u) return t('acc.login');
  return u.name || u.email || formatPhone(u.phone);
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
