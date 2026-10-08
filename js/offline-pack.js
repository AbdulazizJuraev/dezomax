/* ============================================================
   DezoMax — «Internetsiz rejim» to'plami (ilovada)
   Ilova internet bilan ochilganda hamma narsani telefonga saqlaydi — keyin internetsiz ham to'liq ishlaydi:
     • barcha sahifalar va ularning kodi (data/offline-manifest.json — tools/gen-offline-manifest.js)
     • kinolar ro'yxati (data-custom.js, site-config.js)
     • kino posterlari (kichik nusxalar) va bosh sahifa slayderi rasmlari
     • sport (to'plar, jamoa logolari, o'yinchilar) — sport.html yashirin ochilib rasmlari yig'iladi; natijalar sw.js da saqlanadi
     • TV kanal logolari, Marvel sahifasi rasmlari, sayt logolari
   Saqlash sw.js ({ type: 'pack' }) da. Bor fayllar qayta yuklanmaydi.
   - Yangi versiya chiqsa — faqat sahifalar va kod (tez, yengil)
   - To'liq yangilash (rasmlar, sport) — birinchi marta, keyin 3 kunda bir yoki «Yangilash» tugmasi bilan
   - DezoCloud (Telegram) va boshqa saytlardagi kinolarning rasmlari bu to'plamga kirmaydi
   «Yuklab olinganlar» sahifasida (#dlPack) holati va «Yangilash» tugmasi.
   ============================================================ */

(function () {
  if (window.DzxPack || window.top !== window) return;

  const KEY = 'dzx_pack';
  const FULL_EVERY = 3 * 24 * 3600e3;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const T = ru
    ? { title: 'Офлайн-режим', prep: 'Подготовка офлайн-режима…', ready: 'Офлайн-режим готов', none: 'Ещё не загружено', upd: 'Обновить', files: 'файлов', need: 'Нужен интернет', busy: 'Загрузка…' }
    : { title: 'Internetsiz rejim', prep: 'Internetsiz rejim tayyorlanmoqda…', ready: 'Internetsiz rejim tayyor', none: 'Hali yuklanmagan', upd: 'Yangilash', files: 'fayl', need: 'Internet kerak', busy: 'Yuklanmoqda…' };

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  const sw = () => navigator.serviceWorker && navigator.serviceWorker.controller;

  let running = false, sportBusy = false, prog = 0, toast = null;

  /* rasmiy manbadagi (YouTube, Vikimedia) yoki faqat treyleri bor kinolar */
  const OK_VIDEO = /youtube\.com|youtu\.be|wikimedia\.org|archive\.org/i;
  function okMovie(m) {
    if (!m || !m.poster || /dezocloud\.uz/i.test(m.poster)) return false;
    const vids = [m.video].concat(Array.isArray(m.parts) ? m.parts.map(p => p && p.video) : []).filter(Boolean).map(String);
    return vids.every(v => OK_VIDEO.test(v));
  }
  function posterItems() {
    const out = new Set();
    if (typeof MOVIES === 'undefined') return [];
    const small = typeof imgSmall === 'function' ? imgSmall : x => x;
    const big = typeof imgBig === 'function' ? imgBig : x => x;
    for (const m of MOVIES) {
      if (!okMovie(m)) continue;
      out.add(new URL(small(m.poster), document.baseURI).href);
      if (m.featured) out.add(new URL(big(m.cover || m.poster), document.baseURI).href);
    }
    return [...out];
  }

  /* sport sahifasi yashirin ochiladi — u yuklagan natijalar sw.js da saqlanadi, rasmlari bizga qaytadi (js/common.js) */
  function sportImages() {
    return new Promise(resolve => {
      const f = document.createElement('iframe');
      f.setAttribute('aria-hidden', 'true');
      f.tabIndex = -1;
      f.style.cssText = 'position:fixed;left:-9999px;top:0;width:360px;height:640px;border:0;visibility:hidden';
      let done = false;
      const end = urls => {
        if (done) return; done = true;
        removeEventListener('message', on);
        clearTimeout(t);
        setTimeout(() => f.remove(), 500);
        resolve(urls || []);
      };
      const on = e => { if (e.source === f.contentWindow && e.data && e.data.type === 'dzxpack-images') end(e.data.urls); };
      addEventListener('message', on);
      const t = setTimeout(() => end([]), 40000);
      f.src = 'sport.html?nointro&dzxpack=1';
      document.body.appendChild(f);
    });
  }

  function send(items) {
    return new Promise(resolve => {
      const ch = new MessageChannel();
      const t = setTimeout(() => resolve({ ok: 0, fail: items.length }), 120000);
      ch.port1.onmessage = e => { clearTimeout(t); resolve(e.data || { ok: 0, fail: 0 }); };
      sw().postMessage({ type: 'pack', items }, [ch.port2]);
    });
  }

  function showToast(show) {
    if (!show) { toast && toast.remove(); toast = null; return; }
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'pack-toast';
      toast.innerHTML = '<span></span><i><b></b></i>';
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = prog >= 100 ? T.ready + ' ✓' : `${T.prep} ${prog}%`;
    toast.querySelector('b').style.width = prog + '%';
  }

  async function run(opts) {
    opts = opts || {};
    if (running || sportBusy || !sw() || (!navigator.onLine && !window.dzxNetOk)) return false;
    const st = load();
    let man;
    try { man = await (await fetch('data/offline-manifest.json?t=' + Date.now(), { cache: 'no-store' })).json(); } catch { return false; }
    const full = opts.force || !st.full || Date.now() - st.full > FULL_EVERY;
    if (!full && st.v === man.v) return false;            // hammasi joyida
    const ui = !!opts.force || !st.full;                    // birinchi marta yoki tugma bosilganda — foiz ko'rsatiladi

    running = true; prog = 0;
    if (ui) showToast(true);
    render();
    if (full && navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

    const items = []
      .concat(man.pages.map(u => ({ u, k: 'page' })))
      .concat(man.shell.map(u => ({ u, k: 'shell' })))
      .concat(man.data.map(u => ({ u, k: 'data' })));
    if (full) {
      for (const u of man.images) items.push({ u, k: 'img' });
      for (const u of posterItems()) items.push({ u, k: 'img' });
    }
    const total = items.length;
    let done = 0, fail = 0;
    const step = r => { done += (r.ok || 0) + (r.fail || 0); fail += r.fail || 0; prog = Math.min(99, Math.round(done / total * 100)); if (ui) showToast(true); render(); };
    for (let i = 0; i < items.length; i += 40) {
      if (!navigator.onLine && !window.dzxNetOk) break;
      step(await send(items.slice(i, i + 40)));
    }

    const finish = async () => {
      const est = navigator.storage && navigator.storage.estimate ? await navigator.storage.estimate().catch(() => null) : null;
      const prev = load();
      save({ v: man.v, full: full ? Date.now() : prev.full, at: Date.now(), n: full ? done : (prev.n || done), fail, mb: est ? Math.round(est.usage / 1048576) : prev.mb });
    };
    await finish();
    running = false; prog = 100;
    if (ui) { showToast(true); setTimeout(() => showToast(false), 3000); }
    render();

    // sport rasmlari (jamoa logolari, o'yinchilar) — tayyor deb ko'rsatilgandan keyin, fonda (sekin internetda ham kutib o'tirmaydi)
    if (full) {
      sportBusy = true;
      const urls = (await sportImages()).slice(0, 250).map(u => ({ u, k: 'img' }));
      for (let i = 0; i < urls.length; i += 40) {
        if (!navigator.onLine && !window.dzxNetOk) break;
        const r = await send(urls.slice(i, i + 40));
        done += (r.ok || 0) + (r.fail || 0);
      }
      await finish();
      sportBusy = false;
      render();
    }
    return true;
  }

  /* «Yuklab olinganlar» sahifasidagi karta */
  function render() {
    const box = document.getElementById('dlPack');
    if (!box) return;
    const st = load();
    const when = st.full ? new Date(st.full).toLocaleString(ru ? 'ru-RU' : 'uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    const info = running ? `${T.busy} ${prog}%`
      : st.full ? `✓ ${when}${st.n ? ` · ${st.n} ${T.files}` : ''}${st.mb ? ` · ${st.mb} MB` : ''}` : T.none;
    box.hidden = false;
    box.innerHTML = `
      <div class="pack-card${st.full && !running ? ' is-ready' : ''}">
        <span class="pack-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 19h16"/></svg></span>
        <div class="pack-txt"><b>${T.title}</b><span>${info}</span>${running ? `<i class="pack-bar"><i style="width:${prog}%"></i></i>` : ''}</div>
        <button class="btn btn-ghost" type="button" ${running ? 'disabled' : ''}>${T.upd}</button>
      </div>`;
    box.querySelector('button').addEventListener('click', () => {
      if (!navigator.onLine && !window.dzxNetOk) { box.querySelector('.pack-txt span').textContent = T.need; return; }
      run({ force: true });
    });
  }

  window.DzxPack = { run, render };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();

  // ilova ochilganda avtomatik (sahifa yuklangandan keyin, telefonni qiynamasdan)
  const auto = () => setTimeout(() => {
    const c = navigator.connection;
    if (c && (c.saveData || /2g/.test(c.effectiveType || ''))) return;
    if (sw()) run();
    else navigator.serviceWorker && navigator.serviceWorker.ready.then(() => setTimeout(() => sw() && run(), 1500)).catch(() => {});
  }, 6000);
  if (document.readyState === 'complete') auto(); else addEventListener('load', auto);
})();
