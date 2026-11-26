package uz.dezomax.app;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONArray;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

/* ============================================================
   DezoMax bildirishnomalari — Firebase push (FCM), 2026-11-26.
   Admin «Bildirishnomalar»da xabar yozadi → data/notifications.json → to'lov serveri (server/server.js, pushTick)
   uni «dezomax» mavzusiga (topic) yuboradi → shu xizmat ilova YOPIQ bo'lsa ham soniyalar ichida ko'rsatadi.
   Xabar faqat ma'lumot (data) bo'lib keladi — ko'rinishini shu yerda o'zimiz chizamiz:
     · kichik belgi + DezoMax laym rangi, sarlavha, matn;
     · kino rasmi (image) bo'lsa — yon tomonda kichik rasm, ochilganda katta rasm (BigPicture);
     · «▶ Ko'rish» tugmasi; bosilsa — admin tanlagan sahifa (url) ilovada ochiladi.
   Eski usul (fondagi tekshiruvchi, mobile/native/notify-runner.js, ~15 daqiqa) zaxira bo'lib qoladi:
   ikkalasi bir xil «ko'rilganlar» ro'yxatini (SharedPreferences "uz.dezomax.app.notify") yuritadi — xabar ikki marta chiqmaydi.
   ============================================================ */
public class DezoPushService extends FirebaseMessagingService {

    static final String TOPIC = "dezomax";
    static final String CHANNEL = "dezomax_news";           // patch-runner.js dagi kanal bilan bir xil
    static final String SEEN_PREFS = "uz.dezomax.app.notify"; // BackgroundRunner KV (label)
    static final String SEEN_KEY = "dzxNotifySeen";

    static boolean isAdminApp() { return "admin".equals(BuildConfig.FLAVOR); }

    /* Ilova ochilganda (MainActivity) va token yangilanganda — «dezomax» mavzusiga obuna */
    static void subscribe(Context ctx) {
        if (isAdminApp()) return;
        try {
            if (FirebaseApp.getApps(ctx).isEmpty() && FirebaseApp.initializeApp(ctx) == null) return;   // google-services.json yo'q
            FirebaseMessaging.getInstance().subscribeToTopic(TOPIC);
        } catch (Throwable ignored) {}
    }

    @Override
    public void onNewToken(@NonNull String token) { subscribe(getApplicationContext()); }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage msg) {
        if (isAdminApp()) return;
        Map<String, String> d = msg.getData();
        String id = d.get("id");
        String title = d.get("title");
        if (id == null || id.isEmpty() || title == null) return;
        if (!markSeen(this, id)) return;   // fondagi tekshiruvchi allaqachon ko'rsatgan
        show(this, id, title, d.get("body"), d.get("url"), d.get("image"), d.get("cover"));
    }

    /* JS dagi numId (mobile/native/notify-runner.js, js/app-native.js) bilan bir xil raqam — Java hashCode o'sha formula */
    static int numId(String s) { return (int) (Math.abs((long) s.hashCode()) % 2000000000L) + 1; }

    /* true — yangi (hozir ko'rsatiladi), false — avval ko'rsatilgan */
    static synchronized boolean markSeen(Context ctx, String id) {
        SharedPreferences p = ctx.getSharedPreferences(SEEN_PREFS, MODE_PRIVATE);
        JSONArray seen;
        try { seen = new JSONArray(p.getString(SEEN_KEY, "[]")); } catch (Exception e) { seen = new JSONArray(); }
        for (int i = 0; i < seen.length(); i++) if (id.equals(seen.optString(i))) return false;
        seen.put(id);
        JSONArray keep = new JSONArray();
        for (int i = Math.max(0, seen.length() - 200); i < seen.length(); i++) keep.put(seen.optString(i));
        p.edit().putString(SEEN_KEY, keep.toString()).apply();
        return true;
    }

    static void ensureChannel(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = ctx.getSystemService(NotificationManager.class);
        if (nm == null || nm.getNotificationChannel(CHANNEL) != null) return;
        NotificationChannel ch = new NotificationChannel(CHANNEL, "DezoMax yangiliklari", NotificationManager.IMPORTANCE_HIGH);
        ch.setDescription("Yangi kinolar, o'yinlar va boshqa xabarlar");
        nm.createNotificationChannel(ch);
    }

    static Bitmap loadImage(String url) {
        if (url == null || !url.startsWith("https://")) return null;
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(url).openConnection();
            c.setConnectTimeout(6000);
            c.setReadTimeout(8000);
            try (InputStream in = c.getInputStream()) {
                BitmapFactory.Options o = new BitmapFactory.Options();
                o.inPreferredConfig = Bitmap.Config.RGB_565;
                Bitmap b = BitmapFactory.decodeStream(in, null, o);
                if (b == null) return null;
                // juda katta rasm bildirishnomaga sig'maydi — eni 1024 gacha
                if (b.getWidth() > 1024) b = Bitmap.createScaledBitmap(b, 1024, Math.round(b.getHeight() * 1024f / b.getWidth()), true);
                return b;
            }
        } catch (Throwable e) {
            return null;
        } finally {
            if (c != null) c.disconnect();
        }
    }

    /* Kino posteri (tik, 2:3) bildirishnomaning keng rasmiga (2:1) sig'maydi — Android o'rtasini qirqib yuboradi.
       Shuning uchun keng rasmni o'zimiz yig'amiz: fonda kinoning keng muqovasi (xira), markazda posterning o'zi to'liq. */
    static Bitmap posterBanner(Bitmap poster, Bitmap cover) {
        int W = 1024, H = 512;
        Bitmap out = Bitmap.createBitmap(W, H, Bitmap.Config.ARGB_8888);
        android.graphics.Canvas c = new android.graphics.Canvas(out);
        c.drawColor(0xFF0F0F0F);
        android.graphics.Paint p = new android.graphics.Paint(android.graphics.Paint.FILTER_BITMAP_FLAG | android.graphics.Paint.ANTI_ALIAS_FLAG);
        Bitmap bg = cover != null ? cover : poster;
        float s = Math.max((float) W / bg.getWidth(), (float) H / bg.getHeight());
        float bw = bg.getWidth() * s, bh = bg.getHeight() * s;
        c.drawBitmap(bg, null, new android.graphics.RectF((W - bw) / 2, (H - bh) / 2, (W + bw) / 2, (H + bh) / 2), p);
        c.drawColor(0xB30F0F0F);   // fonni qoraytiramiz — poster ajralib tursin
        float ph = H - 48, pw = poster.getWidth() * ph / poster.getHeight();
        float left = (W - pw) / 2, top = 24;
        android.graphics.RectF r = new android.graphics.RectF(left, top, left + pw, top + ph);
        android.graphics.Path clip = new android.graphics.Path();
        clip.addRoundRect(r, 18, 18, android.graphics.Path.Direction.CW);
        c.save(); c.clipPath(clip); c.drawBitmap(poster, null, r, p); c.restore();
        return out;
    }

    static void show(Context ctx, String id, String title, String body, String url, String image, String cover) {
        if (Build.VERSION.SDK_INT >= 33 && ContextCompat.checkSelfPermission(ctx, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) return;
        ensureChannel(ctx);
        int nid = numId(id);
        String path = url != null && url.matches("[\\w./?=&%-]+") ? url : "index.html";
        Intent open = new Intent(ctx, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP)
            .putExtra(DzxWidgets.EXTRA_PATH, path);
        PendingIntent pi = PendingIntent.getActivity(ctx, nid, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        String text = body == null ? "" : body;
        NotificationCompat.Builder b = new NotificationCompat.Builder(ctx, CHANNEL)
            .setSmallIcon(R.drawable.ic_stat_dezomax)
            .setColor(0xFFC6FF3D)                       // DezoMax laym — belgi va ilova nomi shu rangda
            .setContentTitle(title)
            .setContentText(text)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setCategory(NotificationCompat.CATEGORY_RECOMMENDATION)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setContentIntent(pi)
            .addAction(0, "▶ Ko‘rish", pi);

        Bitmap pic = loadImage(image);   // kino bo'lsa — posteri
        if (pic != null) {
            boolean tall = pic.getHeight() > pic.getWidth();
            Bitmap big = tall ? posterBanner(pic, loadImage(cover)) : pic;
            b.setLargeIcon(pic);   // yig'iq holatda — o'ngda kichik poster
            b.setStyle(new NotificationCompat.BigPictureStyle()
                .bigPicture(big)
                .bigLargeIcon((Bitmap) null)   // ochilganda kichik rasm yo'qoladi, katta rasm qoladi
                .setSummaryText(text));
        } else {
            try { b.setLargeIcon(BitmapFactory.decodeResource(ctx.getResources(), R.drawable.ic_notify_large)); } catch (Throwable ignored) {}
            b.setStyle(new NotificationCompat.BigTextStyle().bigText(text));
        }
        try { NotificationManagerCompat.from(ctx).notify(nid, b.build()); } catch (SecurityException ignored) {}
    }
}
