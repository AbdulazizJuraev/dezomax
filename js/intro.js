/* ============================================================
   DezoMax — kirishdagi 3 soniyalik intro video (images/intro/intro.mp4, tools/make-intro.js yasaydi)
   Yorug'lik chizig'i → chaqnash → logotip, ustidan nur o'tadi; «vush — bum» ovozi.
   - Ilovada — ovoz bilan (ilova ovozli avtoijroga ruxsat beradi), saytda — ovozsiz (brauzerlar ruxsat bermaydi)
   - Bosilsa — o'tkazib yuboriladi; video ochilmasa — avvalgi logo animatsiyasi
   <body> boshida yuklanadi; bir seansda bir marta (ilovada — har ochilganda).
   ============================================================ */

(function () {
  const KEY = 'dezomax_intro_seen';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  if (seen || /[?&]nointro\b/.test(location.search)) return;
  try { sessionStorage.setItem(KEY, '1'); } catch {}

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isApp = /DezoMaxApp/.test(navigator.userAgent) || !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  const el = document.createElement('div');
  el.className = 'intro intro-v2';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-lock');

  let ended = false, timer = 0;
  const done = () => {
    if (ended) return;
    ended = true;
    clearTimeout(timer);
    el.classList.add('is-out');
    document.documentElement.classList.remove('intro-lock');
    const v = el.querySelector('video');
    setTimeout(() => { try { v && v.pause(); } catch {} el.remove(); }, 450);
  };
  el.addEventListener('click', done, { once: true });   // bosilsa — o'tkazib yuborish

  /* avvalgi animatsiya (video ochilmasa yoki trafik tejash rejimida) */
  function logoAnim() {
    const DURATION = reduce ? 800 : 2200;
    el.classList.remove('intro-video-mode');
    el.innerHTML = `
      <div class="intro-glow"></div>
      <div class="intro-logo">
        ${window.dezoLogoSVG ? window.dezoLogoSVG() : '<img src="images/logo/oq.png" alt="DezoMax">'}
        <span class="intro-shine"></span>
      </div>
      <div class="intro-bar"><i style="animation-duration:${DURATION - 300}ms"></i></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    clearTimeout(timer);
    timer = setTimeout(done, DURATION);
  }

  if (reduce || saveData) { logoAnim(); return; }

  el.classList.add('intro-video-mode');
  el.innerHTML = '<video class="intro-video" src="images/intro/intro.mp4" poster="images/intro/intro-poster.jpg" playsinline preload="auto" muted></video>';
  const v = el.querySelector('video');
  let started = false;
  v.addEventListener('playing', () => { started = true; }, { once: true });
  v.addEventListener('ended', done, { once: true });
  v.addEventListener('error', () => { if (!ended) logoAnim(); }, { once: true });

  const play = async () => {
    // ilovada ovoz bilan; ruxsat bo'lmasa — ovozsiz
    if (isApp) { v.muted = false; try { await v.play(); return; } catch {} v.muted = true; }
    try { await v.play(); } catch { if (!ended) logoAnim(); }
  };
  play();
  // 1.5 s ichida boshlanmasa (sekin internet) — kutmaymiz, oddiy animatsiya
  setTimeout(() => { if (!started && !ended) { try { v.pause(); } catch {} logoAnim(); } }, 1500);
  // har ehtimolga qarshi — 4.5 s dan keyin baribir yopiladi
  timer = setTimeout(done, 4500);
})();
