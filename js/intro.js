/* ============================================================
   DezoMax — kirishdagi logo animatsiyasi (tovushsiz, tez, silliq)
   Logo qalqib chiqadi, ustidan yorug'lik yugurib o'tadi. Faqat transform/opacity
   ishlatiladi — GPU'da chiziladi, shuning uchun yuqori chastotali ekranlarda ham qotmaydi.
   <body> boshida yuklanadi; bir seansda bir marta (ilovada — har ochilganda).
   ============================================================ */

(function () {
  const KEY = 'dezomax_intro_seen';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  if (seen || /[?&]nointro\b/.test(location.search)) return;
  try { sessionStorage.setItem(KEY, '1'); } catch {}

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = reduce ? 800 : 2200;

  const el = document.createElement('div');
  el.className = 'intro intro-v2';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="intro-glow"></div>
    <div class="intro-logo">
      ${window.dezoLogoSVG ? window.dezoLogoSVG() : '<img src="images/logo/oq.png" alt="DezoMax">'}
      <span class="intro-shine"></span>
    </div>
    <div class="intro-bar"><i style="animation-duration:${DURATION - 300}ms"></i></div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-lock');

  // animatsiya keyingi kadrda boshlanadi (birinchi chizishdan keyin — sakramaydi)
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));

  let ended = false;
  const done = () => {
    if (ended) return;
    ended = true;
    clearTimeout(timer);
    el.classList.add('is-out');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => el.remove(), 450);
  };
  const timer = setTimeout(done, DURATION);
  el.addEventListener('click', done, { once: true });   // bosilsa — o'tkazib yuborish
})();
