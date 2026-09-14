/* ============================================================
   DezoMax — logotip (images/dezo max logo.svg asosida, sahifaga ichki SVG)
   "Max" so'zi va play belgisidagi gradient ko'k → qizil → yashil bo'lib
   almashib turadi. <body> boshida yuklanadi; .logo-img rasmlarini almashtiradi.
   ============================================================ */

(function () {
  let n = 0;

  // Gradient ranglari: [boshlanish, oxiri]
  const BLUE = ['#008DD2', '#035A8C'], RED = ['#FF3B5C', '#B3122E'], GREEN = ['#22C55E', '#0F7A3B'];
  // har bir rang 2 s turadi, keyingisiga 1 s da silliq o'tadi (jami 9 s)
  const seq = i => [BLUE[i], BLUE[i], RED[i], RED[i], GREEN[i], GREEN[i], BLUE[i]].join(';');
  const KEY_TIMES = '0;0.222;0.333;0.555;0.666;0.888;1';

  function dezoLogoSVG() {
    const s = 'dzx' + (++n);
    return `<svg class="logo-svg-el" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3524.95 658.94" role="img" aria-label="DezoMax" style="fill-rule:evenodd;clip-rule:evenodd">
  <defs>
    <clipPath id="${s}c"><path d="M170.84 0l317.27 0c93.96,0 170.84,76.88 170.84,170.84l0 317.27c0,93.96 -76.88,170.84 -170.84,170.84l-317.27 0c-93.96,0 -170.84,-76.88 -170.84,-170.84l0 -317.27c0,-93.96 76.88,-170.84 170.84,-170.84z"/></clipPath>
    <linearGradient id="${s}m1" gradientUnits="userSpaceOnUse" x1="331.91" y1="-54.1" x2="331.92" y2="457.11">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="${s}m"><rect fill="url(#${s}m1)" x="-2.44" y="-2.44" width="663.82" height="663.82"/></mask>
    <linearGradient id="${s}g" gradientUnits="userSpaceOnUse" x1="3143.69" y1="382.67" x2="3522.34" y2="382.67">
      <stop offset="0" stop-color="${BLUE[0]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(0)}"/></stop>
      <stop offset="1" stop-color="${BLUE[1]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(1)}"/></stop>
    </linearGradient>
    <linearGradient id="${s}gw" gradientUnits="userSpaceOnUse" x1="2073.9" y1="0" x2="3522.34" y2="0">
      <stop offset="0" stop-color="${BLUE[0]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(0)}"/></stop>
      <stop offset="1" stop-color="${BLUE[1]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(1)}"/></stop>
    </linearGradient>
    <linearGradient id="${s}p" gradientUnits="userSpaceOnUse" x1="286.8" y1="329.47" x2="372.14" y2="329.47">
      <stop offset="0" stop-color="${BLUE[0]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(0)}"/></stop>
      <stop offset="1" stop-color="${BLUE[1]}"><animate attributeName="stop-color" dur="9s" repeatCount="indefinite" keyTimes="${KEY_TIMES}" values="${seq(1)}"/></stop>
    </linearGradient>
  </defs>
  <g fill="#FEFEFE">
    <path d="M962.8 262.77l-70.05 -1.66c0,0 -39.5,3.95 -39.5,33.05 0,29.1 -0.73,239.08 -0.73,239.08l261.12 0c0,0 157.97,-31.13 165.41,-183.53 7.44,-152.4 -89.67,-211.41 -166.34,-221.63l-138.15 -1.58 -129.45 -0.81c0,0 -2.7,94.050 33.78,93.78 36.49,-0.27 203.5,0 203.5,0 0,0 92.61,10.02 86.85,111.55 -5.75,101.53 -71.93,101.53 -81.39,103.58 -9.45,2.05 -127.42,4.52 -127.42,4.52l2.36 -176.34z"/>
    <path d="M1389.99 411.53l230.09 1.05 -3.72 -69.69c-6.86,-128.32 -209.97,-157.16 -294.21,-63.1 -20.92,23.36 -27.65,59.53 -29.89,90.98 -5.64,79.15 40.81,160.1 135.09,164.69 103.21,5.03 184.83,-12.27 184.83,-12.27l-18.31 -68.77c0,0 -81.02,7.46 -124.73,5.6 -43.71,-1.87 -70.89,-8 -79.16,-48.49zm1.41 -61.52l129.86 -0.25c0,0 -2.1,-54.19 -64.43,-50.71 -62.34,3.49 -64.66,41.87 -65.43,50.96z"/>
    <polygon points="1630.89,228.86 1644.24,310.18 1807.39,310.18 1638.93,478.64 1638.93,533.24 1943.74,533.24 1943.74,450.64 1777.58,450.64 1938.61,289.61 1938.61,227.3"/>
    <path d="M1946.2 373.44c0,0 -11.84,-168.62 182.65,-170.18 194.49,-1.56 176.39,186.69 174.78,196.87 -1.61,10.18 -24.11,151.12 -172.55,146.29 -148.44,-4.82 -176.84,-85.74 -184.88,-172.98zm79 0.64c0,0 -6.62,-94.29 102.14,-95.17 108.76,-0.87 98.64,104.4 97.74,110.09 -0.9,5.69 -13.48,84.5 -96.49,81.81 -83,-2.7 -98.88,-47.95 -103.38,-96.73z"/>
  </g>
  <path class="logo-max" fill="url(#${s}gw)" d="M3269.09 231.3l253.25 302.83 -122.08 0 -68.55 -87.48 -70.18 86.83 -113.27 -0.65 125.67 -150.16 -130.24 -151.46 125.41 0.09zm-1195.19 90.33l0 104.15c0,5.17 2.56,9.61 7.04,12.2 4.48,2.59 9.61,2.59 14.09,0l90.85 -52.45c4.49,-2.59 7.060,-7.06 7.04,-12.24 -0.02,-5.19 -2.61,-9.63 -7.12,-12.2l-90.85 -51.7c-4.48,-2.55 -9.59,-2.53 -14.05,0.06 -4.46,2.6 -7,7.02 -7,12.18zm253.49 213.15l0.16 -409.79 90.18 0.92 148.77 227.97 150.61 -229.8 99.33 -0.92 -2.51 412.11 -106.8 0.64 2.91 -237.93 -121.03 181.12 -51.21 0 -113.83 -179.85 0.42 234.86 -97.01 0.66zm527.96 -303.54c0,0 -4.2,78.75 18.19,78.15 22.38,-0.6 138.3,-1.6 138.3,-1.6 0,0 32.58,1.8 32.58,39.97l-116.12 0.4c0,0 -80.32,-3.92 -87.32,67.03 -7,70.95 17.4,110.04 65.3,119.3 47.9,9.26 125.62,-3.39 141.44,-34.57l2.48 34.34c0,0 61.91,1.36 71.4,-2.94 9.49,-4.29 21.69,-9.72 22.37,-29.37 0.68,-19.66 -0.37,-175.24 -0.37,-175.24 0,0 -7.09,-84.79 -90.19,-97.28l-77.69 -0.34 -120.35 2.16zm191.23 211.64c0,0 -86.97,39.11 -109.34,12.36 -6.88,-8.23 -6.64,-16.54 -5.91,-22.98 1.64,-14.49 16.91,-22.76 38.14,-22.55 30.66,0.31 75.87,-0.31 75.87,-0.31l1.25 33.48zm298.19 -142.14c1.96,-2.61 55.17,-70.84 55.17,-70.84l125.02 -0.65 -118.82 141.67 -61.37 -70.18z"/>
  <path fill="#101B28" d="M170.84 0l317.27 0c93.96,0 170.84,76.88 170.84,170.84l0 317.27c0,93.96 -76.88,170.84 -170.84,170.84l-317.27 0c-93.96,0 -170.84,-76.88 -170.84,-170.84l0 -317.27c0,-93.96 76.88,-170.84 170.84,-170.84z"/>
  <g clip-path="url(#${s}c)"><path fill="#202936" mask="url(#${s}m)" d="M170.84 0l317.27 0c93.96,0 170.84,76.88 170.84,170.84l0 317.27c0,93.96 -76.88,170.84 -170.84,170.84l-317.27 0c-93.96,0 -170.84,-76.88 -170.84,-170.84l0 -317.27c0,-93.96 76.88,-170.84 170.84,-170.84z"/></g>
  <path fill="#FEFEFE" d="M243.97 272.14l-60.22 -1.43c0,0 -33.95,3.4 -33.95,28.41 0,25.02 -0.62,205.51 -0.62,205.51l224.46 0c0,0 135.79,-26.76 142.18,-157.76 6.39,-131 -77.08,-181.72 -142.98,-190.51l-118.76 -1.36 -111.28 -0.7c0,0 -2.32,80.85 29.04,80.61 31.36,-0.23 174.93,0 174.93,0 0,0 79.6,8.61 74.66,95.88 -4.95,87.27 -61.830,87.27 -69.96,89.04 -8.13,1.76 -109.53,3.89 -109.53,3.89l2.03 -151.58z"/>
  <path fill="url(#${s}p)" d="M286.8 292.13l0 74.68c0,3.71 1.84,6.89 5.05,8.75 3.21,1.85 6.89,1.85 10.1,0l65.14 -37.61c3.22,-1.86 5.06,-5.06 5.05,-8.78 -0.01,-3.72 -1.87,-6.91 -5.1,-8.75l-65.14 -37.07c-3.21,-1.83 -6.87,-1.81 -10.07,0.04 -3.19,1.86 -5.02,5.03 -5.02,8.73z"/>
</svg>`;
  }

  /* .logo-img rasmlarini ichki SVG bilan almashtirish */
  function upgradeLogos(root = document) {
    root.querySelectorAll('img.logo-img, img.acc-about-logo').forEach(img => {
      const span = document.createElement('span');
      span.className = img.className.replace('logo-img', 'logo-svg');
      if (img.classList.contains('acc-about-logo')) span.className = 'logo-svg acc-about-logo';
      span.innerHTML = dezoLogoSVG();
      img.replaceWith(span);
    });
  }

  window.dezoLogoSVG = dezoLogoSVG;
  window.upgradeLogos = upgradeLogos;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => upgradeLogos());
  } else {
    upgradeLogos();
  }
  // akkaunt sahifasi kabi keyin chiziladigan joylar uchun
  new MutationObserver(muts => {
    if (muts.some(m => [...m.addedNodes].some(nd => nd.nodeType === 1 && (nd.matches?.('img.logo-img, img.acc-about-logo') || nd.querySelector?.('img.logo-img, img.acc-about-logo'))))) upgradeLogos();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
