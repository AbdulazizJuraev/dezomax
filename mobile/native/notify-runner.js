/* ============================================================
   DezoMax — fondagi bildirishnoma tekshiruvchisi (Capacitor Background Runner)
   WebView'dan tashqarida alohida JS muhitda ishlaydi: ilova yopiq bo'lsa ham
   Android ~15 daqiqada bir marta ishga tushiradi. Ilova ochilganda ham chaqiriladi (app-native.js).
   Admin ilovasi yozgan data/notifications.json ni o'qiydi va yangi xabarlarni
   telefon bildirishnomasi sifatida ko'rsatadi (vaqt belgilangan bo'lsa — o'sha vaqtda).
   ============================================================ */

const NOTIFY_URL = 'https://raw.githubusercontent.com/AbdulazizJuraev/dezomax/main/data/notifications.json';
const SEEN_KEY = 'dzxNotifySeen';

// xabar id'sidan Android uchun barqaror raqamli id (app-native.js dagi bilan bir xil)
function numId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 2000000000) + 1;
}

addEventListener('checkNotifications', async (resolve, reject) => {
  try {
    // «DezoMax Admin» ilovasida bildirishnoma kerak emas
    try {
      const info = CapacitorApp.getInfo();
      if (info && /\.admin$/.test(info.id || '')) return resolve();
    } catch (e) {}

    const res = await fetch(NOTIFY_URL + '?t=' + Date.now());
    if (!res.ok) return resolve();
    const data = await res.json();

    let seen = [];
    try { seen = JSON.parse((CapacitorKV.get(SEEN_KEY) || {}).value || '[]'); } catch (e) { seen = []; }
    const firstRun = !CapacitorKV.get(SEEN_KEY) || !(CapacitorKV.get(SEEN_KEY) || {}).value;

    const now = Date.now();
    const list = [];
    for (const n of (data.items || [])) {
      if (!n || !n.id || seen.indexOf(n.id) > -1) continue;
      seen.push(n.id);
      const at = n.at ? Date.parse(n.at) : 0;
      const created = Date.parse(n.created || '') || 0;
      // eskirganlar ko'rsatilmaydi: vaqti 1 soatdan ko'p o'tgan yoki 1 kundan eski «hozir» xabarlari.
      // Ilova birinchi marta o'rnatilganda eski xabarlar to'planib kelmasin — faqat kelajakdagilar.
      if (at && at < now - 3600000) continue;
      if (!at && (firstRun || (created && created < now - 86400000))) continue;
      list.push({
        id: numId(n.id),
        title: String(n.title || 'DezoMax'),
        body: String(n.body || ''),
        largeBody: String(n.body || ''),
        scheduleAt: new Date(at && at > now ? at : now + 1000),
        smallIcon: 'ic_stat_dezomax',
        largeIcon: 'ic_notify_large',   // chapdagi katta DezoMax belgisi
        autoCancel: true,
      });
    }
    if (list.length) CapacitorNotifications.schedule(list);
    CapacitorKV.set(SEEN_KEY, JSON.stringify(seen.slice(-200)));
    resolve();
  } catch (e) {
    reject(e);
  }
});
