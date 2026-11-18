/* ============================================================
   DezoMax — «Efir studiyasi» (TEST, efir-test.html), 2026-11-18
   Admin brauzerdan kamera yoki ekranni efirga chiqaradi: MediaRecorder → WebSocket (wss://pay.dezomax.uz/efir/ingest)
   → server/efir.js (ffmpeg → HLS) → tomoshabinlar hls.js bilan ko'radi (PAY_API/efir/hls/index.m3u8).
   ?watch — faqat tomoshabin ko'rinishi (havolani ulashish uchun).
   ============================================================ */
(function () {
  const main = document.querySelector('main.ef-page');
  if (!main) return;
  if (typeof initLayout === 'function') try { initLayout(); } catch (e) {}
  const app = document.getElementById('efApp');
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const API = String(typeof PAY_API !== 'undefined' ? PAY_API : 'https://pay.dezomax.uz').replace(/\/+$/, '');
  const WS = API.replace(/^http/, 'ws') + '/efir/ingest';
  let HLS = API + '/efir/hls/index.m3u8';
  const token = () => (typeof Pay !== 'undefined' && Pay.token ? Pay.token() : '');
  const watchOnly = /[?&]watch\b/.test(location.search);
  const $ = s => app.querySelector(s);
  const QUAL = { 480: [854, 480, 1200000], 720: [1280, 720, 2800000], 1080: [1920, 1080, 5000000] };
  const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60; return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };

  app.innerHTML = `
    <div class="ef-head"><h1>${L('Efir studiyasi', 'Студия эфира')} <span class="ef-test">TEST</span></h1>
      <p>${L('DezoMax’ning o‘z jonli efiri — YouTube’siz. Video serverimiz orqali tarqatiladi.', 'Собственный прямой эфир DezoMax — без YouTube.')}</p></div>
    <div class="ef-grid">
      <section class="ef-card ef-studio" id="efStudio" ${watchOnly ? 'hidden' : ''}>
        <h2>${L('Efirga chiqish', 'Выйти в эфир')}</h2>
        <div class="ef-lock" id="efLock">${L('Tekshirilmoqda…', 'Проверка…')}</div>
        <div id="efCtl" hidden>
          <div class="ef-prev"><video id="efPrev" muted autoplay playsinline></video><span class="ef-ph" id="efPh">${L('Manbani tanlang: kamera yoki ekran', 'Выберите источник: камера или экран')}</span>
            <span class="ef-badge" id="efBadge" hidden>● ${L('JONLI', 'ЭФИР')} <b id="efTime">00:00</b></span></div>
          <div class="ef-row">
            <button type="button" class="ef-chip" data-src="cam">📷 ${L('Kamera', 'Камера')}</button>
            <button type="button" class="ef-chip" data-src="screen">🖥 ${L('Ekran', 'Экран')}</button>
            <label class="ef-chip ef-mic"><input type="checkbox" id="efMic" checked> 🎙 ${L('Mikrofon', 'Микрофон')}</label>
            <select id="efQ" class="ef-sel" aria-label="${L('Sifat', 'Качество')}"><option value="480">480p</option><option value="720" selected>720p</option><option value="1080">1080p</option></select>
          </div>
          <input id="efTitle" class="ef-input" maxlength="120" placeholder="${L('Efir nomi (masalan: DezoMax test efiri)', 'Название эфира')}">
          <button type="button" class="ef-go" id="efGo" disabled>${L('Efirni boshlash', 'Начать эфир')}</button>
          <div class="ef-stats" id="efStats"></div>
          <p class="ef-note">${L('Brauzer orqali (Chrome tavsiya etiladi) yoki pastdagi OBS sozlamalari bilan.', 'Через браузер (рекомендуется Chrome) или через OBS — настройки ниже.')}</p>
          <div class="ef-obs">
            <h3>${L('OBS orqali efir', 'Эфир через OBS')}</h3>
            <p class="ef-note">${L('OBS → Sozlamalar → Efir (Stream): Xizmat — «Maxsus» (Custom), keyin quyidagilarni qo‘ying.', 'OBS → Настройки → Трансляция: Сервис — «Настраиваемый», затем вставьте:')}</p>
            <label class="ef-lbl">${L('Server', 'Сервер')}</label>
            <div class="ef-link"><input readonly id="efObsUrl" value="…"><button type="button" data-copy="efObsUrl">${L('Nusxalash', 'Копировать')}</button></div>
            <label class="ef-lbl">${L('Efir kaliti (maxfiy — hech kimga bermang)', 'Ключ потока (секретный)')}</label>
            <div class="ef-link"><input readonly id="efObsKey" type="password" value="…"><button type="button" class="ef-eye" id="efObsEye" aria-label="${L('Ko‘rsatish', 'Показать')}">👁</button><button type="button" data-copy="efObsKey">${L('Nusxalash', 'Копировать')}</button></div>
            <button type="button" class="ef-chip ef-newkey" id="efObsNew">↻ ${L('Yangi kalit', 'Новый ключ')}</button>
            <ul class="ef-tips">
              <li>${L('Chiqish (Output) → Kodlovchi: NVIDIA NVENC H.264 (yoki x264)', 'Вывод → Кодировщик: NVIDIA NVENC H.264 (или x264)')}</li>
              <li>${L('Bitreyt: 720p — 2500–3000 Kbps, 1080p — 4500–6000 Kbps', 'Битрейт: 720p — 2500–3000, 1080p — 4500–6000 Kbps')}</li>
              <li>${L('Kalit kadr oralig‘i (Keyframe Interval): 2 s', 'Интервал ключевых кадров: 2 с')}</li>
              <li>${L('Audio: AAC, 128–160 Kbps, 48 kHz', 'Аудио: AAC, 128–160 Kbps, 48 kHz')}</li>
            </ul>
            <p class="ef-note">${L('Efir nomi — yuqoridagi maydondan olinadi. «Efirni boshlash» OBS’da bosiladi.', 'Название эфира берётся из поля выше. «Начать трансляцию» — в OBS.')}</p>
          </div>
        </div>
      </section>
      <section class="ef-card ef-watch">
        <h2>${L('Tomoshabinlar shunday ko‘radi', 'Так видят зрители')}</h2>
        <div class="ef-player"><video id="efView" controls playsinline></video><div class="ef-off" id="efOff">${L('Hozir efir yo‘q', 'Сейчас эфира нет')}</div></div>
        <div class="ef-info"><b id="efVTitle"></b><span id="efVMeta"></span></div>
        <div class="ef-link"><input readonly id="efWatchUrl" value="https://dezomax.uz/efir-test.html?watch" aria-label="${L('Havola', 'Ссылка')}"><button type="button" id="efCopy">${L('Nusxalash', 'Копировать')}</button></div>
      </section>
    </div>`;

  /* ---------- tomoshabin ---------- */
  const view = $('#efView');
  let hls = null, wasLive = false;
  function attach() {
    if (hls || view.src) return;
    if (window.Hls && Hls.isSupported()) {
      hls = new Hls({ liveSyncDurationCount: 3, maxBufferLength: 20, backBufferLength: 30 });
      hls.loadSource(HLS); hls.attachMedia(view);
      hls.on(Hls.Events.MANIFEST_PARSED, () => view.play().catch(() => {}));
      hls.on(Hls.Events.ERROR, (e, d) => { if (d.fatal) { detach(); } });
    } else if (view.canPlayType('application/vnd.apple.mpegurl')) { view.src = HLS; view.play().catch(() => {}); }
  }
  function detach() { if (hls) { hls.destroy(); hls = null; } if (view.src) { view.removeAttribute('src'); view.load(); } }
  async function poll() {
    let s = null;
    try { s = await (await fetch(API + '/efir/status', { cache: 'no-store' })).json(); } catch (e) {}
    const live = !!(s && s.live);
    $('#efOff').hidden = live;
    $('#efVTitle').textContent = live ? s.title : '';
    $('#efVMeta').textContent = live ? `● ${L('Jonli', 'В эфире')} · ${clock(Date.now() - s.started)} · ${s.viewers} ${L('tomoshabin', 'зрит.')} · ${s.src === 'obs' ? 'OBS' : s.quality + 'p'}` : '';
    if (!watchOnly && live && s.src === 'obs' && !rec) $('#efStats').textContent = L('OBS orqali efir ketmoqda', 'Идёт эфир через OBS') + ' · ' + clock(Date.now() - s.started);
    const url = live && s.playlist ? API + s.playlist : HLS;
    if (live && url !== HLS) { detach(); HLS = url; wasLive = false; }      // manba o'zgardi (brauzer ↔ OBS)
    if (live && !wasLive) setTimeout(attach, 4000);       // birinchi bo'laklar tayyor bo'lishini kutamiz
    if (live && wasLive && !hls && !view.src) attach();
    if (!live && wasLive) detach();
    wasLive = live;
  }
  poll(); setInterval(() => { if (!document.hidden) poll(); }, 5000);
  $('#efCopy').addEventListener('click', async e => {
    const v = $('#efWatchUrl').value;
    try { await navigator.clipboard.writeText(v); } catch (er) { $('#efWatchUrl').select(); document.execCommand('copy'); }
    e.target.textContent = L('Nusxalandi ✓', 'Скопировано ✓');
  });
  if (watchOnly) return;

  /* ---------- studiya (faqat adminlar) ---------- */
  (async () => {
    const lock = $('#efLock');
    if (!token()) { lock.innerHTML = `${L('Efir qilish uchun akkauntga kiring.', 'Войдите в аккаунт, чтобы вести эфир.')} <a href="account.html?next=efir-test.html">${L('Kirish', 'Войти')}</a>`; return; }
    let c = null;
    try { c = await (await fetch(API + '/efir/check', { headers: { Authorization: 'Bearer ' + token() }, cache: 'no-store' })).json(); } catch (e) {}
    if (!c) { lock.textContent = L('Efir serveri javob bermadi — keyinroq urinib ko‘ring.', 'Сервер эфира не отвечает.'); return; }
    if (!c.admin) { lock.textContent = c.login ? L('Efir qilish hozircha faqat adminlar uchun (test).', 'Эфир пока только для админов (тест).') : L('Akkaunt sessiyasi eskirgan — qayta kiring.', 'Сессия устарела — войдите снова.'); return; }
    lock.hidden = true; $('#efCtl').hidden = false;
    loadObs();
  })();

  const authH = () => ({ Authorization: 'Bearer ' + token() });
  function showObs(j) { if (j && j.key) { $('#efObsUrl').value = j.server; $('#efObsKey').value = j.key; } }
  async function loadObs() {
    try { showObs(await (await fetch(API + '/efir/obs', { headers: authH(), cache: 'no-store' })).json()); } catch (e) {}
  }
  $('#efObsEye').addEventListener('click', () => { const k = $('#efObsKey'); k.type = k.type === 'password' ? 'text' : 'password'; });
  app.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const v = $('#' + b.dataset.copy).value;
    try { await navigator.clipboard.writeText(v); b.textContent = L('Nusxalandi ✓', 'Скопировано ✓'); setTimeout(() => { b.textContent = L('Nusxalash', 'Копировать'); }, 1500); } catch (e) {}
  }));
  $('#efObsNew').addEventListener('click', async () => {
    if (!confirm(L('Yangi kalit yaratilsinmi? Eski kalit ishlamay qoladi — OBS’ga yangisini qo‘yish kerak bo‘ladi.', 'Создать новый ключ? Старый перестанет работать.'))) return;
    try { showObs(await (await fetch(API + '/efir/obs/key', { method: 'POST', headers: authH() })).json()); $('#efObsKey').type = 'text'; } catch (e) {}
  });
  // efir nomi — OBS efiri uchun ham (serverda saqlanadi)
  $('#efTitle').addEventListener('change', () => {
    fetch(API + '/efir/meta', { method: 'POST', headers: { ...authH(), 'Content-Type': 'application/json' }, body: JSON.stringify({ title: $('#efTitle').value.trim() }) }).catch(() => {});
  });

  let stream = null, rec = null, ws = null, t0 = 0, tick = null, actx = null;
  const prev = $('#efPrev'), go = $('#efGo'), stats = $('#efStats');
  const live = () => !!(ws && ws.readyState === 1);

  function stopTracks() { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; if (actx) { actx.close().catch(() => {}); actx = null; } }

  async function pick(kind) {
    if (live()) return;
    const [w, h] = QUAL[$('#efQ').value];
    const mic = $('#efMic').checked;
    try {
      stopTracks();
      if (kind === 'cam') {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: 30 } }, audio: mic });
      } else {
        const scr = await navigator.mediaDevices.getDisplayMedia({ video: { width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: 30 } }, audio: true });
        const tracks = [...scr.getVideoTracks()];
        const sys = scr.getAudioTracks();
        let micS = null;
        if (mic) try { micS = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) {}
        if (sys.length && micS) {                 // ekran ovozi + mikrofon — bitta ovozga aralashtiriladi
          actx = new AudioContext(); const dst = actx.createMediaStreamDestination();
          actx.createMediaStreamSource(new MediaStream(sys)).connect(dst);
          actx.createMediaStreamSource(micS).connect(dst);
          tracks.push(dst.stream.getAudioTracks()[0]);
        } else tracks.push(...sys, ...(micS ? micS.getAudioTracks() : []));
        stream = new MediaStream(tracks);
        scr.getVideoTracks()[0].addEventListener('ended', () => stop(L('Ekran ulashish to‘xtatildi', 'Показ экрана остановлен')));
      }
      prev.srcObject = stream; $('#efPh').hidden = true;
      app.querySelectorAll('[data-src]').forEach(b => b.classList.toggle('is-on', b.dataset.src === kind));
      go.disabled = false;
    } catch (e) {
      stats.textContent = L('Ruxsat berilmadi yoki qurilma topilmadi: ', 'Нет доступа: ') + (e && e.message || e);
    }
  }
  app.querySelectorAll('[data-src]').forEach(b => b.addEventListener('click', () => pick(b.dataset.src)));

  function mimeOf() {
    const list = ['video/webm;codecs=h264,opus', 'video/webm;codecs=avc1,opus', 'video/mp4;codecs=avc1,mp4a.40.2', 'video/webm;codecs=vp8,opus', 'video/webm'];
    return list.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
  }

  function start() {
    if (!stream || live()) return;
    const mime = mimeOf();
    if (!mime) { stats.textContent = L('Bu brauzer efirni qo‘llamaydi — Chrome’dan oching.', 'Браузер не поддерживается — откройте в Chrome.'); return; }
    const q = $('#efQ').value;
    go.disabled = true; stats.textContent = L('Ulanmoqda…', 'Подключение…');
    ws = new WebSocket(WS);
    ws.binaryType = 'arraybuffer';
    ws.onopen = () => ws.send(JSON.stringify({ type: 'hello', token: token(), title: $('#efTitle').value.trim() || 'DezoMax efiri', mime, quality: q }));
    ws.onmessage = ev => {
      let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.type === 'error') { stats.textContent = m.error; return; }
      if (m.type === 'ready') {
        rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: QUAL[q][2], audioBitsPerSecond: 128000, videoKeyFrameIntervalDuration: 2000 });
        rec.ondataavailable = e => {
          if (!e.data || !e.data.size || !live()) return;
          if (ws.bufferedAmount > 8e6) stats.dataset.warn = '1';
          ws.send(e.data);
        };
        rec.start(500);
        t0 = Date.now();
        $('#efBadge').hidden = false; go.disabled = false; go.textContent = L('Efirni to‘xtatish', 'Остановить эфир'); go.classList.add('is-live');
        tick = setInterval(() => { $('#efTime').textContent = clock(Date.now() - t0); }, 1000);
        stats.textContent = L('Efir boshlandi — tomoshabinlarga ~6–10 soniya kechikib yetadi.', 'Эфир начался — у зрителей с задержкой ~6–10 с.') + (m.copy ? '' : ' ' + L('(server qayta kodlayapti)', '(сервер перекодирует)'));
        setTimeout(poll, 5000);
      }
      if (m.type === 'stats') {
        const warn = stats.dataset.warn === '1' ? ' · ⚠ ' + L('internet sekin', 'медленный интернет') : '';
        stats.dataset.warn = '';
        stats.textContent = `${m.kbps} kbit/s · ${m.viewers} ${L('tomoshabin', 'зрит.')} · HLS ${m.hls ? '✓' : '…'}${warn}`;
      }
      if (m.type === 'stopped') stop(L('Server efirni to‘xtatdi: ', 'Сервер остановил эфир: ') + (m.reason || ''));
    };
    ws.onclose = () => { if (rec) stop(L('Aloqa uzildi', 'Соединение прервано')); else { go.disabled = false; if (!stats.textContent || stats.textContent === L('Ulanmoqda…', 'Подключение…')) stats.textContent = L('Serverga ulanib bo‘lmadi', 'Не удалось подключиться'); } };
  }

  function stop(msg) {
    try { if (rec && rec.state !== 'inactive') rec.stop(); } catch (e) {}
    rec = null;
    try { if (ws && ws.readyState <= 1) ws.close(); } catch (e) {}
    ws = null;
    clearInterval(tick);
    $('#efBadge').hidden = true; go.textContent = L('Efirni boshlash', 'Начать эфир'); go.classList.remove('is-live'); go.disabled = !stream;
    if (msg) stats.textContent = msg;
    setTimeout(poll, 1500);
  }
  go.addEventListener('click', () => (live() || rec ? stop(L('Efir to‘xtatildi', 'Эфир остановлен')) : start()));
  addEventListener('beforeunload', e => { if (live()) { e.preventDefault(); e.returnValue = ''; } });
  $('#efQ').addEventListener('change', () => { if (stream && !live()) pick(app.querySelector('[data-src].is-on')?.dataset.src || 'cam'); });
})();
