/* ============================================================
   DezoMax — Obuna rejalari / Тарифы подписки
   ------------------------------------------------------------
   DIQQAT: to'lov tizimi ulanmagan. Tanlangan reja faqat
   localStorage da saqlanadi, hech qanday pul yechilmaydi.
   Haqiqiy to'lovni ulash uchun server tomoni kerak bo'ladi
   (Payme / Click / Stripe hammasi server kalitini talab qiladi).
   ============================================================ */

const PLAN_KEY = 'dezomax_plan';

/* Narxlar so'mda. Yillik — 10 oylik narx (2 oy sovg'a). */
const PLANS = [
  {
    id: 'free',
    price: 0,
    accent: false,
    name: { uz: 'Bepul', ru: 'Бесплатно' },
    tagline: { uz: 'Tanishib chiqish uchun', ru: 'Чтобы познакомиться' },
    features: {
      uz: ['Barcha treylerlar', 'Telekanallar jonli efiri', 'Sport bo‘limi va yangiliklar', 'Sifat: 720p', '1 qurilma'],
      ru: ['Все трейлеры', 'Прямой эфир телеканалов', 'Раздел спорта и новости', 'Качество: 720p', '1 устройство']
    }
  },
  {
    id: 'standard',
    price: 29000,
    accent: true,
    name: { uz: 'Standart', ru: 'Стандарт' },
    tagline: { uz: 'Ko‘pchilik tanlaydi', ru: 'Выбор большинства' },
    features: {
      uz: ['Bepul rejadagi hammasi', 'Reklamasiz ko‘rish', 'Sifat: Full HD 1080p', '2 qurilma bir vaqtda', 'Yuklab olish (offline)'],
      ru: ['Всё из бесплатного тарифа', 'Просмотр без рекламы', 'Качество: Full HD 1080p', '2 устройства одновременно', 'Скачивание (офлайн)']
    }
  },
  {
    id: 'premium',
    price: 49000,
    accent: false,
    name: { uz: 'Premium', ru: 'Премиум' },
    tagline: { uz: 'Oila uchun', ru: 'Для всей семьи' },
    features: {
      uz: ['Standart rejadagi hammasi', 'Sifat: 4K va HDR', '4 qurilma bir vaqtda', 'Premyeralar birinchi bo‘lib', 'Bolalar profili'],
      ru: ['Всё из тарифа Стандарт', 'Качество: 4K и HDR', '4 устройства одновременно', 'Премьеры первыми', 'Детский профиль']
    }
  }
];

/* Solishtirish jadvali */
const CMP_ROWS = [
  { label: { uz: 'Narxi (oyiga)', ru: 'Цена (в месяц)' }, vals: ['0', '29 000', '49 000'] },
  { label: { uz: 'Reklama', ru: 'Реклама' }, vals: [{ uz: 'Bor', ru: 'Есть' }, '—', '—'] },
  { label: { uz: 'Maksimal sifat', ru: 'Максимальное качество' }, vals: ['720p', '1080p', '4K HDR'] },
  { label: { uz: 'Bir vaqtda qurilmalar', ru: 'Устройств одновременно' }, vals: ['1', '2', '4'] },
  { label: { uz: 'Yuklab olish', ru: 'Скачивание' }, vals: [false, true, true] },
  { label: { uz: 'Telekanallar', ru: 'Телеканалы' }, vals: [true, true, true] },
  { label: { uz: 'Bolalar profili', ru: 'Детский профиль' }, vals: [false, false, true] }
];

let yearly = false;

const money = n => n.toLocaleString('ru-RU').replace(/,/g, ' ');
const sum = () => (LANG === 'ru' ? 'сум' : 'so‘m');

/* Kirgan foydalanuvchining profili (js/auth.js). Kirmagan bo'lsa — null */
let accProfile = null;

function getPlan() {
  if (accProfile) return accProfile.plan || 'free';
  return localStorage.getItem(PLAN_KEY) || 'free';
}

Object.assign(I18N.uz, {
  'plans.needLogin': 'Tarif tanlash uchun akkauntga kiring',
  'plans.needRelogin': 'Balansdan foydalanish uchun akkauntdan chiqib, qayta kiring',
  'plans.payOff': 'To‘lov tizimi ulanmoqda — tez orada ishga tushadi',
  'plans.error': 'Xatolik yuz berdi, qayta urinib ko‘ring',
  'plans.noMoney': 'Balansda mablag‘ yetarli emas — balansni to‘ldiring',
  'plans.bought': 'Tarif faollashtirildi'
});
Object.assign(I18N.ru, {
  'plans.needLogin': 'Войдите в аккаунт, чтобы выбрать тариф',
  'plans.needRelogin': 'Чтобы пользоваться балансом, выйдите из аккаунта и войдите снова',
  'plans.payOff': 'Платёжная система подключается — скоро заработает',
  'plans.error': 'Произошла ошибка, попробуйте ещё раз',
  'plans.noMoney': 'Недостаточно средств — пополните баланс',
  'plans.bought': 'Тариф активирован'
});

async function setPlan(id) {
  const user = Auth.user();
  if (!user) {
    toast(t('plans.needLogin'));
    setTimeout(() => { location.href = 'account.html?next=plans.html'; }, 900);
    return;
  }
  const p = accProfile || await Auth.loadProfile(user);
  const plan = PLANS.find(x => x.id === id);
  const days = yearly ? 365 : 30;
  const price = yearly ? plan.price * 10 : plan.price;
  const now = Date.now();

  if (id === 'free') {
    p.plan = 'free';
    p.planUntil = null;
  } else {
    // Balans serverda (Click orqali to'ldirilgan haqiqiy pul): yechish ham serverda, u ikki marta yechmaydi
    if (Pay.enabled()) {
      if (!Pay.hasSession()) { toast(t('plans.needRelogin')); return; }
      try {
        const r = await Pay.spend(price, id, days);
        p.balance = r.balance;
      } catch (ex) {
        if (ex.code === 'funds') {
          toast(t('plans.noMoney'));
          setTimeout(() => { location.href = 'account.html#balance'; }, 1400);
        } else toast(ex.code === 'auth' ? t('plans.needRelogin') : t('plans.error'));
        return;
      }
    } else {
      toast(t('plans.payOff'));           // to'lov tizimi ulanmaguncha pullik tarif sotib olinmaydi
      return;
    }
    p.plan = id;
    p.planUntil = now + days * 86400000;
    p.subscriptions.unshift({ id: 's' + now, plan: id, from: now, until: p.planUntil, price });
  }

  localStorage.setItem(PLAN_KEY, id);
  accProfile = p;
  await Auth.saveProfile(p);
  renderPlans();
  toast(id === 'free' ? t('plans.saved') : t('plans.bought'));
}

/* ---------- Chizish ---------- */

function planHTML(p) {
  const cur = getPlan() === p.id;
  const price = yearly ? Math.round(p.price * 10) : p.price;
  const per = yearly
    ? (LANG === 'ru' ? 'в год' : 'yiliga')
    : t('plans.month');

  return `
  <div class="plan${p.accent ? ' is-accent' : ''}${cur ? ' is-current' : ''}">
    ${p.accent ? `<span class="plan-tag">${t('plans.popular')}</span>` : ''}
    <h3 class="plan-name">${esc(p.name[LANG] || p.name.uz)}</h3>
    <p class="plan-tagline">${esc(p.tagline[LANG] || p.tagline.uz)}</p>

    <div class="plan-price">
      ${price === 0
        ? `<span class="plan-amount">0</span>`
        : `<span class="plan-amount">${money(price)}</span><span class="plan-cur">${sum()}</span>`}
      <span class="plan-per">/ ${per}</span>
    </div>

    <ul class="plan-features">
      ${(p.features[LANG] || p.features.uz).map(f => `<li>${esc(f)}</li>`).join('')}
    </ul>

    <button class="btn ${p.accent ? 'btn-primary' : 'btn-ghost'} plan-btn" data-plan="${p.id}" ${cur ? 'disabled' : ''}>
      ${cur ? t('plans.current') : t('plans.choose')}
    </button>
  </div>`;
}

function renderPlans() {
  const box = document.getElementById('plans');

  const toggle = `
    <div class="plan-toggle">
      <button class="${yearly ? '' : 'is-active'}" data-yearly="0">${t('plans.month')}</button>
      <button class="${yearly ? 'is-active' : ''}" data-yearly="1">${LANG === 'ru' ? 'В год · −17%' : 'Yiliga · −17%'}</button>
    </div>`;

  box.innerHTML = toggle + `<div class="plan-grid">${PLANS.map(planHTML).join('')}</div>`;

  box.querySelectorAll('[data-yearly]').forEach(b => b.addEventListener('click', () => {
    yearly = b.dataset.yearly === '1';
    renderPlans();
  }));
  box.querySelectorAll('[data-plan]').forEach(b =>
    b.addEventListener('click', () => setPlan(b.dataset.plan)));
}

function renderCmp() {
  const tbl = document.getElementById('cmp');
  const tick = '<span class="cmp-yes">✓</span>';
  const dash = '<span class="cmp-no">—</span>';

  const cell = v => {
    if (v === true) return tick;
    if (v === false) return dash;
    if (typeof v === 'object') return esc(v[LANG] || v.uz);
    return esc(v);
  };

  tbl.innerHTML = `
    <thead>
      <tr>
        <th>${t('plans.feature')}</th>
        ${PLANS.map(p => `<th>${esc(p.name[LANG] || p.name.uz)}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${CMP_ROWS.map(r => `
        <tr>
          <td>${esc(r.label[LANG] || r.label.uz)}</td>
          ${r.vals.map(v => `<td>${cell(v)}</td>`).join('')}
        </tr>`).join('')}
    </tbody>`;
}

/* Kichik xabar oynasi */
function toast(msg) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-in'));
  setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 300); }, 2600);
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderPlans();
renderCmp();
document.querySelector('.plans-notice-icon').innerHTML = ICONS.info;
document.getElementById('year').textContent = new Date().getFullYear();

if (Auth.user()) {
  Auth.loadProfile().then(p => { accProfile = p; renderPlans(); });
}

document.addEventListener('langchange', () => {
  renderPlans();
  renderCmp();
  applyI18n();
});
