/* ============================================================
   DezoMax — birinchi kirish: 3 ta afzallik slayderi, keyin ro'yxatdan o'tish / kirish (1 oy bepul)
   Faqat bosh sahifada, foydalanuvchi hali kirmagan va oynani hali yopmagan bo'lsa ko'rsatiladi.
   Logotip va til almashtirish tugmasi tepada. Kirish — js/auth.js (Google), sinov — TRIAL (30 kun).
   Qayta ko'rish: ?welcome=1
   ============================================================ */

(function () {
  const DONE_KEY = 'dezomax_welcome_done';
  const page = location.pathname.split('/').pop() || 'index.html';
  const force = /[?&]welcome=1\b/.test(location.search);
  if (page !== 'index.html' && page !== '') return;
  if (/[?&]nowelcome\b/.test(location.search)) return;
  let done = false;
  try { done = localStorage.getItem(DONE_KEY) === '1'; } catch {}
  if (!force && (done || (typeof Auth !== 'undefined' && Auth.user()))) return;

  Object.assign(I18N.uz, {
    'wc.s1.title': 'Minglab kino va seriallar',
    'wc.s1.sub': '{n}+ film, serial, anime va doramalar bir joyda',
    'wc.s2.title': 'O‘zbek kinolari va konsertlar',
    'wc.s2.sub': 'Marvel, DC va yuzlab rasmiy treylerlar',
    'wc.s3.title': 'Telekanallar va sport jonli',
    'wc.s3.sub': 'Futbol, telekanallar va yangiliklar — hammasi bir ilovada',
    'wc.skip': 'O‘tkazib yuborish',
    'wc.next': 'Keyingi',
    'wc.live': 'JONLI',
    'wc.trial': '7 kun bepul',
    'wc.auth.title': 'Ro‘yxatdan o‘ting yoki kiring',
    'wc.auth.sub': 'Ro‘yxatdan o‘tgach 7 kun bepul. Keyin har 7 kun uchun {price} so‘m — obunani istalgan vaqtda bekor qilish mumkin.',
    'wc.auth.later': 'Hozircha o‘tkazib yuborish',
    'wc.googleBtn': 'Google bilan davom etish',
    'wc.googleSub': 'Bir bosishda, parolsiz',
    'wc.or': 'yoki',
    'wc.tgBtn': 'Telegram orqali tasdiqlash',
    'wc.tgOpen': 'Telegram ochilmoqda…',
    'wc.tgSent': 'Telegram botga 6 xonali kod yuborildi. Shu yerga yozing:',
    'wc.tgAgain': 'Kod kelmadimi? Botni qayta ochish',
    'wc.tgBad': 'Kod noto‘g‘ri yoki eskirgan',
    'wc.tgErr': 'Telegram bilan bog‘lanib bo‘lmadi. Keyinroq urinib ko‘ring.',
    'wc.welcome': 'Xush kelibsiz! 7 kun bepul boshlandi 🎁'
  });
  Object.assign(I18N.ru, {
    'wc.s1.title': 'Тысячи фильмов и сериалов',
    'wc.s1.sub': '{n}+ фильмов, сериалов, аниме и дорам в одном месте',
    'wc.s2.title': 'Узбекское кино и концерты',
    'wc.s2.sub': 'Marvel, DC и сотни официальных трейлеров',
    'wc.s3.title': 'Телеканалы и спорт в прямом эфире',
    'wc.s3.sub': 'Футбол, телеканалы и новости — всё в одном приложении',
    'wc.skip': 'Пропустить',
    'wc.next': 'Далее',
    'wc.live': 'LIVE',
    'wc.trial': '7 дней бесплатно',
    'wc.auth.title': 'Зарегистрируйтесь или войдите',
    'wc.auth.sub': 'После регистрации 7 дней бесплатно. Затем {price} сум за каждые 7 дней — подписку можно отменить в любой момент.',
    'wc.auth.later': 'Пропустить пока',
    'wc.googleBtn': 'Продолжить с Google',
    'wc.googleSub': 'В один клик, без пароля',
    'wc.or': 'или',
    'wc.tgBtn': 'Подтвердить через Telegram',
    'wc.tgOpen': 'Открываем Telegram…',
    'wc.tgSent': 'Бот прислал 6-значный код. Введите его здесь:',
    'wc.tgAgain': 'Код не пришёл? Открыть бота снова',
    'wc.tgBad': 'Код неверный или устарел',
    'wc.tgErr': 'Не удалось связаться с Telegram. Попробуйте позже.',
    'wc.welcome': 'Добро пожаловать! 7 дней бесплатно начались 🎁'
  });

  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const text = (key) => t(key)
    .replace('{n}', fmt(Math.floor(MOVIES.length / 1000) * 1000))
    .replace('{price}', fmt(typeof TRIAL !== 'undefined' ? TRIAL.price : 29000));

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>',
    ball: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 7.5l4 2.9-1.5 4.7h-5L8 10.4z"/><path d="M12 2.5v5M16 10.4l5-1.6M14.5 15.1l3 4.1M9.5 15.1l-3 4.1M8 10.4L3 8.8"/></svg>',
    google: '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 3.3 2.9 10.6c-1 .4-1 1.2-.2 1.5l4.7 1.5 1.8 5.5c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.5-1.8-1-1.6zM8.9 13.9l9.4-5.9c.4-.3.8-.1.5.2l-8 7.3-.3 3.3-1.6-4.9z"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>'
  };

  /* Kolleaj: asosan fantastika va fentezi. Faqat saytimizdagi suratlar (images/...) —
     ular ilova ichida ham, internetsiz ham ochiladi; tashqi (Wikipedia) havolalar olinmaydi. */
  const localPosters = MOVIES.filter(m => m.poster && m.poster.startsWith('images/') && !m.poster.includes('/uz/') && m.franchise !== 'konsert');
  const byRating = (a, b) => (b.rating || 0) - (a.rating || 0);
  const isFantastic = m => m.genres.some(g => g === 'scifi' || g === 'fantasy');
  const fantastic = localPosters.filter(isFantastic).sort(byRating);
  const posters = [...fantastic, ...localPosters.filter(m => !isFantastic(m)).sort(byRating)].map(m => m.poster);
  /* 2-slayddagi katta kartochka — fantastik kino (reyting bo'yicha eng yuqorisi) */
  const heroPoster = (fantastic[0] || localPosters[0] || {}).poster;
  const colOf = (k) => {                       // 3 ustun: har birida 8 ta poster
    const out = [];
    for (let i = 0; i < 8; i++) out.push(posters[(i * 6 + k) % Math.max(1, posters.length)]);
    return out;
  };

  /* Telegram orqali tasdiqlash: bot 6 xonali kod yuboradi (server/server.js → /api/tg/*).
     TG_BOT (js/firebase-config.js) va to'lov serveri sozlanmagan bo'lsa — bu bo'lim ko'rinmaydi. */
  const Tg = {
    enabled: () => typeof TG_BOT !== 'undefined' && !!TG_BOT && typeof Pay !== 'undefined' && Pay.enabled(),
    async start() {
      const r = await fetch(String(PAY_API).replace(/\/+$/, '') + '/api/tg/start', { method: 'POST' });
      if (!r.ok) throw new Error('start');
      return r.json();                       // { link, ticket }
    },
    async check(ticket, code) {
      const r = await fetch(String(PAY_API).replace(/\/+$/, '') + '/api/tg/verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticket, code })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(j.error || 'verify'), { code: r.status });
      return j;                              // { token, uid, balance }
    }
  };

  let step = 0;              // 0..2 — slaydlar, 3 — kirish
  const SLIDES = 3;
  const root = document.createElement('div');
  root.className = 'wc';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  document.documentElement.classList.add('welcome-lock');

  /* Kolleaj, yorqin kartalar va tepa qator bir marta yasaladi (slaydlar almashganda animatsiya uzilmasin);
     faqat matn / tugmalar / kirish bloki qayta chiziladi */
  function build() {
    root.innerHTML = `
      <div class="wc-collage" aria-hidden="true">
        ${Array.from({ length: matchMedia("(min-width: 720px)").matches ? 6 : 3 }, (_, k) => k).map(k => `<div class="wc-col wc-col-${k}">${colOf(k).map(p => `<div class="wc-p"><img src="${p}" alt="" decoding="async"></div>`).join('')}</div>`).join('')}
      </div>
      <div class="wc-hl wc-hl-2" aria-hidden="true">
        ${heroPoster ? `<img src="${heroPoster}" alt="">` : ''}
        <span class="wc-badge">${ICON.play}</span>
      </div>
      <div class="wc-hl wc-hl-3" aria-hidden="true">
        <img src="images/welcome/football-4.jpg" alt="" decoding="async">
        <span class="wc-live"><i></i><em data-live></em></span>
        <span class="wc-ball">${ICON.ball}</span>
      </div>
      <div class="wc-shade"></div>
      <header class="wc-top">
        <img class="wc-logo" src="images/logo/logo.png" alt="DezoMax" width="150" height="29">
        <div class="wc-lang" role="group" aria-label="Language">
          <button type="button" data-lang="uz">UZ</button>
          <button type="button" data-lang="ru">RU</button>
        </div>
      </header>
      <div class="wc-dyn" id="wcDyn"></div>`;
    root.querySelectorAll('.wc-lang [data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  }

  function render() {
    const auth = step >= SLIDES;
    const s = Math.min(step, SLIDES - 1) + 1;
    root.classList.toggle('is-auth', auth);
    root.classList.toggle('is-hl2', step === 1);
    root.classList.toggle('is-hl3', step === 2);
    root.dataset.step = String(step);
    root.querySelectorAll('.wc-lang [data-lang]').forEach(b => b.classList.toggle('is-active', b.dataset.lang === LANG));
    root.querySelector('[data-live]').textContent = t('wc.live');

    root.querySelector('#wcDyn').innerHTML = auth ? `
        <section class="wc-auth">
          <span class="wc-trial">${ICON.gift}<b>${t('wc.trial')}</b></span>
          <h1>${t('wc.auth.title')}</h1>
          <p>${text('wc.auth.sub')}</p>
          <p class="wc-err" id="wcErr" hidden></p>
          <div class="wc-gsi" id="wcGsi" hidden></div>
          <small class="wc-gsi-note" id="wcGsiNote" hidden>${t('wc.googleSub')}</small>
          <button class="wc-google" id="wcGoogle" type="button">
            <span class="wc-g-icon">${ICON.google}</span>
            <span class="wc-g-text"><b>${t('wc.googleBtn')}</b><small>${t('wc.googleSub')}</small></span>
          </button>
          ${Tg.enabled() ? `
            <div class="wc-or"><span>${t('wc.or')}</span></div>
            <button class="wc-tg" id="wcTg" type="button">${ICON.tg}<span>${t('wc.tgBtn')}</span></button>
            <div class="wc-code" id="wcCode" hidden>
              <p>${t('wc.tgSent')}</p>
              <div class="wc-code-inputs">${[0,1,2,3,4,5].map(i => `<input type="text" inputmode="numeric" maxlength="1" data-code="${i}" aria-label="${i + 1}">`).join('')}</div>
              <button class="wc-code-again" id="wcTgAgain" type="button">${t('wc.tgAgain')}</button>
            </div>` : ''}
          <button class="wc-later" id="wcLater" type="button">${t('wc.auth.later')}</button>
          <small>${t('acc.terms')}</small>
        </section>` : `
        <section class="wc-text" aria-live="polite">
          <h2>${t('wc.s' + s + '.title')}</h2>
          <p>${text('wc.s' + s + '.sub')}</p>
        </section>
        <footer class="wc-bar">
          <button class="wc-skip" id="wcSkip" type="button">${t('wc.skip')}</button>
          <div class="wc-dots">${[0, 1, 2].map(i => `<i class="${i === step ? 'is-on' : ''}"></i>`).join('')}</div>
          <button class="wc-next" id="wcNext" type="button" aria-label="${t('wc.next')}">${ICON.arrow}</button>
        </footer>`;
    bind();
  }

  function finish(loggedIn) {
    try { localStorage.setItem(DONE_KEY, '1'); } catch {}
    root.classList.add('is-out');
    document.documentElement.classList.remove('welcome-lock');
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('langchange', render);
    setTimeout(() => root.remove(), 450);
    if (loggedIn) {
      const el = document.createElement('div');
      el.className = 'wc-toast';
      el.textContent = t('wc.welcome');
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.add('is-in'));
      setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 400); }, 3800);
    }
  }

  const go = n => { step = Math.max(0, Math.min(SLIDES, n)); render(); };

  function bind() {
    root.querySelector('#wcNext')?.addEventListener('click', () => go(step + 1));
    root.querySelector('#wcSkip')?.addEventListener('click', () => go(SLIDES));
    root.querySelector('#wcLater')?.addEventListener('click', () => finish(false));
    if (step >= SLIDES) bindAuth();
  }

  function bindAuth() {
    const err = root.querySelector('#wcErr');
    const showErr = m => { err.textContent = m; err.hidden = !m; };
    const btn = root.querySelector('#wcGoogle');
    const ok = () => { finish(true); };

    // Sayt: Google'ning o'z tugmasi (popup). Ilova (yoki Google yuklanmasa): bizning tugma
    if (Auth.mode === 'google' && !Auth.native) {
      const box = root.querySelector('#wcGsi'), note = root.querySelector('#wcGsiNote');
      box.hidden = false; btn.hidden = true; note.hidden = false;
      Auth.renderGoogleButton(box, ok, e => { console.warn(e); showErr(t('acc.errGeneric')); })
        .catch(() => { box.hidden = true; note.hidden = true; btn.hidden = false; showErr(t('acc.errGoogleLoad')); });
    }
    // Telegram: botni ochish → bot kod yuboradi → kodni shu yerga yozish
    const tgBtn = root.querySelector('#wcTg');
    if (tgBtn) {
      const box = root.querySelector('#wcCode');
      const inputs = [...root.querySelectorAll('[data-code]')];
      let ticket = null;
      const open = async () => {
        showErr('');
        tgBtn.disabled = true;
        try {
          const r = await Tg.start();
          ticket = r.ticket;
          box.hidden = false;
          inputs.forEach(i => (i.value = ''));
          inputs[0].focus();
          window.open(r.link, '_blank', 'noopener');
        } catch { showErr(t('wc.tgErr')); }
        finally { tgBtn.disabled = false; }
      };
      tgBtn.addEventListener('click', open);
      root.querySelector('#wcTgAgain')?.addEventListener('click', open);

      const submit = async () => {
        const code = inputs.map(i => i.value).join('');
        if (code.length !== 6 || !ticket) return;
        inputs.forEach(i => (i.disabled = true));
        try {
          const j = await Tg.check(ticket, code);
          try { localStorage.setItem('dezomax_pay_token', j.token); } catch {}
          await Auth._finish({ uid: j.uid, method: 'telegram', name: j.name || '', phone: j.phone || '' });
          ok();
        } catch (ex) {
          showErr(t('wc.tgBad'));
          inputs.forEach(i => { i.disabled = false; i.value = ''; });
          inputs[0].focus();
        }
      };
      inputs.forEach((inp, i) => {
        inp.addEventListener('input', () => {
          inp.value = inp.value.replace(/\D/g, '').slice(0, 1);
          if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
          submit();
        });
        inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && inputs[i - 1]) inputs[i - 1].focus(); });
        inp.addEventListener('paste', e => {
          const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
          if (!d) return;
          e.preventDefault();
          d.split('').forEach((c, k) => { if (inputs[k]) inputs[k].value = c; });
          inputs[Math.min(d.length, 5)].focus();
          submit();
        });
      });
    }

    btn.addEventListener('click', async () => {
      // demo rejim (Google sozlanmagan) — akkaunt sahifasida Gmail so'raladi
      if (Auth.mode === 'demo') { finish(false); location.href = 'account.html'; return; }
      showErr(''); btn.disabled = true;
      try { await Auth.signInGoogle(); ok(); }
      catch (e) {
        console.warn(e);
        const msg = String(e?.message || e?.code || '');
        if (!/cancel/i.test(msg)) showErr(e.code === 'plugin' ? t('acc.errGoogleLoad') : t('acc.errGeneric'));
      } finally { btn.disabled = false; }
    });
  }

  /* Surish (swipe) va klaviatura */
  let x0 = null;
  root.addEventListener('pointerdown', e => { if (!e.target.closest('button, a, .wc-gsi, .wc-auth')) x0 = e.clientX; });
  root.addEventListener('pointerup', e => {
    if (x0 === null || step >= SLIDES) { x0 = null; return; }
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go(step + (dx < 0 ? 1 : -1));
  });
  const onKey = e => {
    if (step >= SLIDES) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') go(step + 1);
    else if (e.key === 'ArrowLeft') go(step - 1);
  };
  document.addEventListener('keydown', onKey);
  document.addEventListener('langchange', render);

  // Android orqaga tugmasi (js/app-native.js yuboradi): avvalgi qadamga; birinchisida — ilovadan chiqish
  document.addEventListener('wc-back', () => {
    if (step > 0) go(step - 1);
    else window.Capacitor?.Plugins?.App?.exitApp?.();
  });
  build();
  render();
  document.body.appendChild(root);
})();
