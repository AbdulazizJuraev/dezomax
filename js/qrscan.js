/* ============================================================
   DezoMax — QR kod skanerlash (kamera orqali)
   jsQR (js/jsqr.js) faqat ochilganda yuklanadi. Natija:
     - dezomax.uz/github.io/dezomax havolasi bo'lsa — o'sha sahifaga o'tiladi
     - boshqa http(s) havola — yangi oynada ochiladi
     - oddiy matn — nusxalab, ekranda ko'rsatiladi
   ============================================================ */

Object.assign(I18N.uz, {
  'qr.title': 'QR kodni skanerlang',
  'qr.hint': 'Kamerani QR kodga qarating',
  'qr.noCamera': 'Kameraga ruxsat berilmadi yoki topilmadi',
  'qr.textFound': 'Topildi:',
  'qr.copy': 'Nusxalash',
  'qr.copied': 'Nusxalandi'
});
Object.assign(I18N.ru, {
  'qr.title': 'Сканируйте QR-код',
  'qr.hint': 'Наведите камеру на QR-код',
  'qr.noCamera': 'Нет доступа к камере или камера не найдена',
  'qr.textFound': 'Найдено:',
  'qr.copy': 'Копировать',
  'qr.copied': 'Скопировано'
});

let qrLoading = null;
function loadJsQr() {
  if (window.jsQR) return Promise.resolve();
  if (qrLoading) return qrLoading;
  qrLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'js/jsqr.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return qrLoading;
}

function ownSiteUrl(text) {
  try {
    const u = new URL(text, location.href);
    return /(^|\.)dezomax\.uz$/i.test(u.hostname) || /github\.io$/i.test(u.hostname) ? u.href : null;
  } catch { return null; }
}

async function openQrScanner() {
  let stream = null;
  const el = document.createElement('div');
  el.className = 'qr-scan';
  el.innerHTML = `
    <button type="button" class="qr-scan-close" aria-label="${esc(t('acc.back'))}">${ICONS.left || '←'}</button>
    <h1>${esc(t('qr.title'))}</h1>
    <div class="qr-scan-frame">
      <video class="qr-scan-video" playsinline muted autoplay></video>
      <div class="qr-scan-box"></div>
    </div>
    <p class="qr-scan-hint">${esc(t('qr.hint'))}</p>
    <div class="qr-scan-result" id="qrResult" hidden></div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('welcome-lock');

  const close = () => {
    try { stream?.getTracks().forEach(tr => tr.stop()); } catch {}
    document.documentElement.classList.remove('welcome-lock');
    el.remove();
  };
  el.querySelector('.qr-scan-close').addEventListener('click', close);

  try {
    await loadJsQr();
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  } catch {
    el.querySelector('.qr-scan-frame').hidden = true;
    el.querySelector('.qr-scan-hint').hidden = true;
    const r = el.querySelector('#qrResult');
    r.hidden = false;
    r.innerHTML = `<p>${esc(t('qr.noCamera'))}</p>`;
    return;
  }

  const video = el.querySelector('.qr-scan-video');
  video.srcObject = stream;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let raf = null, done = false;

  const tick = () => {
    if (done) return;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = window.jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
      if (code && code.data) { done = true; onFound(code.data); return; }
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  function onFound(text) {
    cancelAnimationFrame(raf);
    try { stream.getTracks().forEach(tr => tr.stop()); } catch {}
    const own = ownSiteUrl(text);
    if (own) { location.href = own; return; }
    if (/^https?:\/\//i.test(text)) { window.open(text, '_blank', 'noopener'); close(); return; }

    el.querySelector('.qr-scan-frame').hidden = true;
    el.querySelector('.qr-scan-hint').hidden = true;
    const r = el.querySelector('#qrResult');
    r.hidden = false;
    r.innerHTML = `
      <small>${esc(t('qr.textFound'))}</small>
      <p class="qr-scan-text">${esc(text)}</p>
      <button type="button" class="btn btn-primary" id="qrCopy">${esc(t('qr.copy'))}</button>`;
    r.querySelector('#qrCopy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(text); if (typeof toast === 'function') toast(t('qr.copied')); } catch {}
    });
  }
}
