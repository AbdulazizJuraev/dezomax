/* ============================================================
   DezoMax — kinolarni telefonga yuklab olish (faqat Android ilovada)
   Fayl ilovaning o'z papkasiga yuklanadi (DownloadPlugin.java, Android DownloadManager),
   internetsiz «/_dzx_offline/<fayl>» manzili orqali o'z pleyerimizda o'ynaydi.
   Ro'yxat localStorage'da: dezomax_offline = [{ key, id, part, title, poster, cover, src, file, dmId, state, loaded, total, at }]
   Yuklab bo'ladiganlar: to'g'ridan-to'g'ri fayllar (.mp4/.webm/.m4v/.mov) va DezoCloud havolalari.
   YouTube va oqim (.m3u8) yuklanmaydi.
   ============================================================ */

Object.assign(I18N.uz, {
  'off.download': 'Yuklab olish',
  'off.downloading': 'Yuklanmoqda',
  'off.queued': 'Navbatda…',
  'off.done': 'Yuklab olingan',
  'off.failed': 'Xato — qayta urinish',
  'off.cancelAsk': 'Yuklab olish to‘xtatilsinmi?',
  'off.removeAsk': 'Telefondan o‘chirilsinmi?',
  'off.started': 'Yuklab olish boshlandi — bildirishnomada kuzatishingiz mumkin',
  'off.noSpace': 'Telefonda joy yetarli emas',
  'off.title': 'Telefonga yuklanganlar',
  'off.hint': 'Bu kinolarni internetsiz ko‘rish mumkin',
  'off.empty': 'Hali hech narsa yuklab olinmagan. Kino sahifasidagi «Yuklab olish» tugmasini bosing.',
  'off.watch': 'Ko‘rish',
  'off.delete': 'O‘chirish',
  'off.space': 'Band: {used} · Bo‘sh: {free}'
});
Object.assign(I18N.ru, {
  'off.download': 'Скачать',
  'off.downloading': 'Загрузка',
  'off.queued': 'В очереди…',
  'off.done': 'Скачано',
  'off.failed': 'Ошибка — повторить',
  'off.cancelAsk': 'Остановить загрузку?',
  'off.removeAsk': 'Удалить с телефона?',
  'off.started': 'Загрузка началась — следите в уведомлениях',
  'off.noSpace': 'Недостаточно места на телефоне',
  'off.title': 'Скачано на телефон',
  'off.hint': 'Эти фильмы можно смотреть без интернета',
  'off.empty': 'Пока ничего не скачано. Нажмите «Скачать» на странице фильма.',
  'off.watch': 'Смотреть',
  'off.delete': 'Удалить',
  'off.space': 'Занято: {used} · Свободно: {free}'
});

const OFF_ICONS = {
  dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>',
  done: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.8"/></svg>'
};

const Offline = {
  KEY: 'dezomax_offline',
  plugin: () => (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.DezoDownload) || null,
  enabled() { return typeof IS_APP !== 'undefined' && IS_APP && !!this.plugin(); },

  list() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },
  save(list) { try { localStorage.setItem(this.KEY, JSON.stringify(list)); } catch {} },
  keyOf: (id, part) => `${id}-${part || 0}`,
  get(id, part) { return this.list().find(x => x.key === this.keyOf(id, part)) || null; },

  /* Yuklab olinadigan manzil (yuklab bo'lmasa — null) */
  srcOf(url) {
    const u = String(url || '');
    const dc = (u.match(/^https?:\/\/(?:www\.)?dezocloud\.uz\/s\/([\w-]+)/i) || [])[1];
    if (dc) return `https://dezocloud.uz/v/${dc}`;
    if (/^https?:\/\/[^?#]+\.(mp4|webm|m4v|mov)(\?|#|$)/i.test(u)) return u;
    return null;
  },

  localUrl: item => '/_dzx_offline/' + item.file,
  /* Shu video telefonda bo'lsa — lokal manzil (pleyer internetsiz shundan o'ynaydi) */
  localFor(url) {
    if (!url) return null;
    const it = this.list().find(x => x.src === url && x.state === 'done');
    return it ? this.localUrl(it) : null;
  },

  async start(m, part, src, partTitle) {
    const p = this.plugin();
    const dl = this.srcOf(src);
    if (!p || !dl) throw new Error('unsupported');
    const ext = (dl.match(/\.(webm|m4v|mov)(\?|#|$)/i) || [, 'mp4'])[1].toLowerCase();
    const key = this.keyOf(m.id, part);
    const file = `dzx-${String(key).replace(/[^\w-]/g, '')}.${ext}`;
    const old = this.get(m.id, part);
    if (old) await p.remove({ dmId: old.dmId ?? -1, file: old.file }).catch(() => {});
    const name = title(m) + (part ? ` · ${partTitle || part + '-qism'}` : '');
    const { dmId } = await p.start({ url: dl, file, title: name });
    const item = {
      key, id: m.id, part: part || 0, title: name, poster: m.poster || '', cover: (typeof wideCover === 'function' && wideCover(m)) || m.cover || '',
      src, file, dmId, state: 'pending', loaded: 0, total: -1, at: Date.now()
    };
    this.save([item, ...this.list().filter(x => x.key !== key)]);
    // posterlar internetsiz ham ko'rinsin — service worker saqlab qo'yadi
    [item.poster, item.cover].filter(Boolean).forEach(u => fetch(u, { mode: 'no-cors' }).catch(() => {}));
    return item;
  },

  /* Holatni yangilash (yuklanayotganlar uchun) */
  async refresh() {
    const p = this.plugin();
    const list = this.list();
    if (!p || !list.length) return list;
    try {
      const { items } = await p.status({ items: list.map(x => ({ dmId: x.dmId ?? -1, file: x.file })) });
      for (const s of items || []) {
        const it = list.find(x => x.file === s.file);
        if (!it) continue;
        it.state = s.state === 'missing' ? (it.state === 'done' ? 'missing' : 'failed') : s.state;
        it.loaded = s.loaded; it.total = s.total;
      }
      this.save(list);
    } catch {}
    return list;
  },

  async remove(key) {
    const p = this.plugin();
    const it = this.list().find(x => x.key === key);
    if (it && p) await p.remove({ dmId: it.dmId ?? -1, file: it.file }).catch(() => {});
    this.save(this.list().filter(x => x.key !== key));
  },

  async space() { try { return await this.plugin().space(); } catch { return null; } }
};

const offSize = b => !(b > 0) ? '' : b >= 1073741824 ? (b / 1073741824).toFixed(1).replace('.', ',') + ' GB' : Math.max(1, Math.round(b / 1048576)) + ' MB';
const offPct = it => it.total > 0 ? Math.min(100, Math.floor(it.loaded / it.total * 100)) : 0;

/* Kino sahifasidagi «Yuklab olish» tugmasi (faqat ilovada va yuklab bo'ladigan videoda) */
function mountOfflineButton(box, m, part, src, partTitle) {
  if (!box || !Offline.enabled() || !Offline.srcOf(src)) { if (box) box.hidden = true; return; }
  let timer = 0;
  const draw = () => {
    const it = Offline.get(m.id, part);
    const st = it ? it.state : null;
    const running = st === 'pending' || st === 'running' || st === 'paused';
    box.innerHTML = `<button type="button" class="soc-btn soc-pill off-btn${st === 'done' ? ' is-done' : ''}${running ? ' is-run' : ''}"${running ? ` style="--p:${offPct(it)}%"` : ''}>
      ${st === 'done' ? OFF_ICONS.done : OFF_ICONS.dl}
      <b>${st === 'done' ? esc(t('off.done'))
        : running ? (it.total > 0 ? `${esc(t('off.downloading'))} ${offPct(it)}%` : esc(t('off.queued')))
        : st === 'failed' || st === 'missing' ? esc(t('off.failed')) : esc(t('off.download'))}</b></button>`;
    box.querySelector('button').addEventListener('click', onClick);
    clearTimeout(timer);
    if (running) timer = setTimeout(async () => { await Offline.refresh(); if (box.isConnected) draw(); }, 1500);
  };
  async function onClick() {
    const it = Offline.get(m.id, part);
    if (it && it.state === 'done') { location.href = 'downloads.html'; return; }
    if (it && ['pending', 'running', 'paused'].includes(it.state)) {
      if (confirm(t('off.cancelAsk'))) { await Offline.remove(it.key); draw(); }
      return;
    }
    const sp = await Offline.space();
    if (sp && sp.free > 0 && sp.free < 300 * 1048576) { if (typeof socToast === 'function') socToast(t('off.noSpace')); return; }
    try {
      await Offline.start(m, part, src, partTitle);
      if (typeof socToast === 'function') socToast(t('off.started'));
    } catch (e) { if (typeof socToast === 'function') socToast(e.message === 'unsupported' ? t('off.failed') : String(e.message || e)); }
    draw();
  }
  Offline.refresh().then(draw);
  draw();
}
