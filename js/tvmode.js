/* ============================================================
   DezoMax — televizor rejimi (Samsung Tizen, LG webOS va boshqa Smart TV)
   ------------------------------------------------------------
   js/common.js televizorni aniqlasa (yoki ?tv=1) shu fayl yuklanadi va <html> ga .tv-mode qo'shiladi.
   - Pult strelkalari: ekrandagi eng yaqin tugma/kartochkaga o'tish (spatial navigation)
   - OK (Enter): bosish; Back (Tizen 10009 / Esc / Backspace): oyna yopiladi → katta ekrandan chiqiladi → orqaga
   - Pleyer katta ekranda: ←/→ — 10 soniya, OK — pauza/davom, ↑/↓ — panelni ko'rsatish
   - Pult media tugmalari (Play/Pause, ⏪, ⏩) — pleyerga
   - Kino boshlanganda pleyer o'zi katta ekranga o'tadi
   ============================================================ */

(function () {
  const KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ENTER: 13, BACK: 10009, ESC: 27, BACKSPACE: 8,
                PLAY_PAUSE: 10252, PLAY: 415, PAUSE: 19, STOP: 413, REW: 412, FF: 417 };
  const DIRS = { [KEY.LEFT]: 'left', [KEY.RIGHT]: 'right', [KEY.UP]: 'up', [KEY.DOWN]: 'down' };
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  // Tizen ilovasida pultning media tugmalarini olish uchun ro'yxatdan o'tkazish (brauzerda — jim o'tadi)
  try {
    const tvi = window.tizen && tizen.tvinputdevice;
    if (tvi) ['MediaPlayPause', 'MediaPlay', 'MediaPause', 'MediaStop', 'MediaRewind', 'MediaFastForward', 'ColorF0Red']
      .forEach(k => { try { tvi.registerKey(k); } catch (e) {} });
  } catch (e) {}

  const visible = el => {
    if (el.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    const st = getComputedStyle(el);
    return st.visibility !== 'hidden' && st.display !== 'none' && Number(st.opacity) > 0.05;
  };

  // ochiq oyna (modal) bo'lsa — faqat uning ichida yuramiz
  const scopeRoot = () =>
    [...document.querySelectorAll('.offline-modal, .soc-sheet-wrap, .vp-menu:not([hidden]), [role="dialog"]')].filter(visible).pop()
    || (fullPlayer() || document);

  function fullPlayer() {
    const fs = document.fullscreenElement || document.webkitFullscreenElement;
    return fs || document.querySelector('.player-wrap.ytp-pseudo-fs');
  }

  const candidates = root => [...root.querySelectorAll(FOCUSABLE)].filter(el => !el.closest('.vp-ui[hidden]') && visible(el));

  /* Yo'nalish bo'yicha eng yaqin element: asosiy o'q bo'yicha masofa + yon tomonga og'ish (jarima bilan) */
  function nearest(from, dir, list) {
    const a = from.getBoundingClientRect();
    const ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    let best = null, bestScore = Infinity;
    for (const el of list) {
      if (el === from || el.contains(from) || from.contains(el)) continue;
      const b = el.getBoundingClientRect();
      const bx = b.left + b.width / 2, by = b.top + b.height / 2;
      let main, side;
      if (dir === 'right') { if (b.left < a.right - 6 && bx <= ax + 4) continue; main = Math.max(0, b.left - a.right); side = Math.abs(by - ay); }
      if (dir === 'left')  { if (b.right > a.left + 6 && bx >= ax - 4) continue; main = Math.max(0, a.left - b.right); side = Math.abs(by - ay); }
      if (dir === 'down')  { if (b.top < a.bottom - 6 && by <= ay + 4) continue; main = Math.max(0, b.top - a.bottom); side = Math.abs(bx - ax); }
      if (dir === 'up')    { if (b.bottom > a.top + 6 && by >= ay - 4) continue; main = Math.max(0, a.top - b.bottom); side = Math.abs(bx - ax); }
      // gorizontal qatorda yurganda boshqa qatorga sakramasin; vertikalda chap-o'ng og'ish kamroq muhim
      const score = main + side * (dir === 'left' || dir === 'right' ? 3 : 0.6);
      if (score < bestScore) { bestScore = score; best = el; }
    }
    return best;
  }

  function focusEl(el) {
    if (!el) return;
    el.focus({ preventScroll: true });
    // gorizontal qatorlar (karusellar) ichida ham ko'rinadigan joyga suriladi
    el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  }

  function firstFocus() {
    const root = scopeRoot();
    const pref = root === document
      ? document.querySelector('.hero .btn-primary, .hero a.btn, main a.card, main .btn-primary, main a, main button')
      : null;
    const el = (pref && visible(pref)) ? pref : candidates(root)[0];
    focusEl(el);
  }

  function back() {
    const modal = document.querySelector('.offline-modal');
    if (modal) { modal.remove(); return; }
    const sheet = document.querySelector('.soc-sheet-wrap [data-close]');
    if (sheet) { sheet.click(); return; }
    const menu = document.querySelector('.vp-menu:not([hidden])');
    if (menu) { document.querySelector('#vpGear')?.click(); return; }
    const fp = fullPlayer();
    if (fp && typeof ytToggleFullscreen === 'function') { ytToggleFullscreen(fp.closest('.player-wrap') || fp); return; }
    if (history.length > 1 && !/(^|\/)(index\.html)?$/.test(location.pathname)) { history.back(); return; }
    // bosh sahifada — Tizen ilovasidan chiqish
    try { if (window.tizen) tizen.application.getCurrentApplication().exit(); } catch (e) {}
  }

  /* Pleyerga buyruq: faol pleyer konteyneriga klaviatura hodisasi yuboriladi (vplayer/ytplayer o'zi tinglaydi) */
  function playerKey(code) {
    const box = document.querySelector('.player-wrap.ytp');
    if (!box) return false;
    box.dispatchEvent(new KeyboardEvent('keydown', { code, key: code, bubbles: false }));
    return true;
  }

  // boshqargan tugmamiz pleyerning o'z ishlovchisiga ham yetib bormasin (aks holda 20 s suriladi)
  const stop = e => { e.preventDefault(); e.stopPropagation(); };

  document.addEventListener('keydown', e => {
    const k = e.keyCode;
    const tag = (e.target && e.target.tagName) || '';
    const typing = (tag === 'INPUT' && !/^(button|checkbox|radio|range|submit)$/i.test(e.target.type)) || tag === 'TEXTAREA';

    // media tugmalar
    if (k === KEY.PLAY_PAUSE || k === KEY.PLAY || k === KEY.PAUSE) { if (playerKey('Space')) stop(e); return; }
    if (k === KEY.REW) { if (playerKey('ArrowLeft')) stop(e); return; }
    if (k === KEY.FF) { if (playerKey('ArrowRight')) stop(e); return; }
    if (k === KEY.STOP) { const fp = fullPlayer(); if (fp) back(); return; }

    if (k === KEY.BACK || k === KEY.ESC || (k === KEY.BACKSPACE && !typing)) { stop(e); back(); return; }

    // katta ekrandagi pleyer: ←/→ — 10 s (pleyerning o'zi qiladi), OK — pauza, ↑/↓ — panel
    const fp = fullPlayer();
    const menuOpen = document.querySelector('.vp-menu:not([hidden])');
    if (fp && !menuOpen) {
      const box = fp.closest ? (fp.closest('.player-wrap') || fp) : fp;
      if (k === KEY.LEFT || k === KEY.RIGHT) {
        if (!box.contains(document.activeElement) || document.activeElement === box || document.activeElement?.classList.contains('vp-seek')) {
          stop(e); playerKey(k === KEY.LEFT ? 'ArrowLeft' : 'ArrowRight');
          box.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
          return;
        }
      }
      if (k === KEY.ENTER && (document.activeElement === box || !box.contains(document.activeElement))) {
        stop(e); playerKey('Space'); box.dispatchEvent(new MouseEvent('mousemove', { bubbles: true })); return;
      }
      if (k === KEY.UP || k === KEY.DOWN) box.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    }

    const dir = DIRS[k];
    if (dir) {
      if (typing && (dir === 'left' || dir === 'right')) return;     // matn ichida kursor yuradi
      const cur = document.activeElement;
      stop(e);
      if (!cur || cur === document.body || !visible(cur)) { firstFocus(); return; }
      const next = nearest(cur, dir, candidates(scopeRoot()));
      if (next) focusEl(next);
      else if (dir === 'up') { window.scrollBy({ top: -innerHeight * 0.6, behavior: 'smooth' }); }
      return;
    }

    if (k === KEY.ENTER) {
      const el = document.activeElement;
      // <div tabindex> kabi elementlar Enter'ni o'zi bosmaydi
      if (el && el !== document.body && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) { stop(e); el.click(); }
    }
  }, true);

  // kino boshlanganda — darhol katta ekranga (televizorda pleyer kichik oynada ko'rinishi noqulay)
  document.addEventListener('click', e => {
    const cover = e.target.closest && e.target.closest('.ytp-cover');
    if (!cover) return;
    const box = cover.closest('.player-wrap');
    setTimeout(() => {
      if (box && box.isConnected && !fullPlayer() && typeof ytToggleFullscreen === 'function') ytToggleFullscreen(box);
      box?.focus({ preventScroll: true });
    }, 400);
  });

  // sahifa ochilganda birinchi tugma tanlangan bo'lsin (pult bilan darhol yurish mumkin)
  const start = () => setTimeout(() => { if (!document.activeElement || document.activeElement === document.body) firstFocus(); }, 700);
  if (document.readyState === 'complete') start(); else addEventListener('load', start);
})();
