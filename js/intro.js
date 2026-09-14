/* ============================================================
   DezoMax — kirishdagi 4 soniyalik logo animatsiyasi
   <body> ning boshida yuklanadi — sahifa ko'rinishidan oldin ekranni yopadi.
   Bir seansda bir marta ko'rsatiladi (ilovada — har ochilganda).
   ============================================================ */

(function () {
  const KEY = 'dezomax_intro_seen';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  if (seen || /[?&]nointro\b/.test(location.search)) return;
  try { sessionStorage.setItem(KEY, '1'); } catch {}

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = reduce ? 1200 : 4000;

  const el = document.createElement('div');
  el.className = 'intro';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="intro-glow"></div>
    <div class="intro-logo">
      <img src="images/logo/logo.png" alt="">
      <span class="intro-shine"></span>
    </div>
    <div class="intro-bar"><i></i></div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-lock');

  const done = () => {
    el.classList.add('is-out');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => el.remove(), 600);
  };
  setTimeout(done, DURATION - 500);
  // bosilsa — o'tkazib yuborish
  el.addEventListener('click', done, { once: true });
})();
