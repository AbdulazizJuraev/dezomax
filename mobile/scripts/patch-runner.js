/* ============================================================
   @capacitor/background-runner bildirishnomalarini tuzatish (npm install'dan keyin ham qayta qo'llanadi).
   Plagin bildirishnomani «Default» (o'rtacha muhimlik) kanaliga yuboradi — Android uni ekran tepasidan
   tushirib ko'rsatmaydi (heads-up), faqat panelga jimgina qo'yadi. Bu skript:
     • yangi «DezoMax yangiliklari» kanali (IMPORTANCE_HIGH) — eski kanal muhimligini ilova oshira olmaydi, shuning uchun yangi id;
     • PRIORITY_HIGH + ovoz/tebranish (Android 7 va eskilar uchun);
     • katta belgi (largeIcon) va to'liq matn (largeBody) — plagin ularni o'qimas edi.
   Takroriy ishga tushirish xavfsiz.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '..', 'node_modules', '@capacitor', 'background-runner',
  'android', 'src', 'main', 'java', 'io', 'ionic', 'backgroundrunner', 'plugin', 'api');

function patch(file, pairs) {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) { console.log('patch-runner: topilmadi —', file); return; }
  let s = fs.readFileSync(p, 'utf8');
  let n = 0;
  for (const [from, to, mark] of pairs) {
    if (s.includes(mark || to)) continue;          // allaqachon qo'llangan
    if (!s.includes(from)) { console.log('patch-runner: mos kelmadi —', file, JSON.stringify(from.slice(0, 50))); continue; }
    s = s.replace(from, to); n++;
  }
  fs.writeFileSync(p, s);
  console.log(`patch-runner: ${file} — ${n} ta o'zgarish`);
}

patch('Notifications.kt', [
  ['const val defaultNotificationChannelID = "default"', 'const val defaultNotificationChannelID = "dezomax_news"'],
  ['val name: CharSequence = "Default"\n            val description = "Default"\n            val importance = NotificationManager.IMPORTANCE_DEFAULT',
   'val name: CharSequence = "DezoMax yangiliklari"\n            val description = "Yangi kinolar, o\'yinlar va boshqa xabarlar"\n            val importance = NotificationManager.IMPORTANCE_HIGH\n            // DZX: heads-up'],
  ['builder.priority = NotificationCompat.PRIORITY_DEFAULT',
   'builder.priority = NotificationCompat.PRIORITY_HIGH\n' +
   '            builder.setDefaults(NotificationCompat.DEFAULT_ALL)\n' +
   '            builder.setCategory(NotificationCompat.CATEGORY_RECOMMENDATION)\n' +
   '            builder.setVisibility(NotificationCompat.VISIBILITY_PUBLIC)\n' +
   '            val dzxLarge = it.largeIcon\n' +
   '            if (!dzxLarge.isNullOrEmpty()) {\n' +
   '                val lid = AssetUtil.getResourceID(context, dzxLarge, "drawable")\n' +
   '                if (lid != AssetUtil.RESOURCE_ID_ZERO_VALUE) builder.setLargeIcon(android.graphics.BitmapFactory.decodeResource(context.resources, lid))\n' +
   '            }',
   'dzxLarge'],
  ['style.setSummaryText(it.summaryText)\n', 'style.setSummaryText(it.summaryText)\n                builder.setStyle(style)\n', 'builder.setStyle(style)'],
]);

patch('Notification.kt', [
  ['actionTypeId = jsonObject.optString("actionTypeId", null)',
   'actionTypeId = jsonObject.optString("actionTypeId", null)\n' +
   '        largeIcon = jsonObject.optString("largeIcon", "").ifEmpty { null }\n' +
   '        largeBody = jsonObject.optString("largeBody", "").ifEmpty { null }',
   'optString("largeIcon"'],
]);
