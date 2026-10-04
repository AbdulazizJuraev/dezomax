package uz.dezomax.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Rect;
import android.graphics.RectF;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Locale;

/* ============================================================
   DezoMax bosh ekran vidjetlari (umumiy qism)
   - NEW      «Yangi kinolar»     — data/widget.json (tools/gen-widget.js), har ~1 soatda
   - CONTINUE «Davom ettirish»    — sayt beradi (js/movie.js → DzxWidget.setContinue)
   - QUICK    «Tezkor tugmalar»   — ochish, qidiruv, yuklanganlar, sevimlilar (internetsiz)
   - ALL      «Hammasi birga»     — yangi kinolar + tugmalar
   Bosilganda ilova o'sha sahifani ochadi (MainActivity → dzx_path).
   Faqat «site» ilovasida (admin ilovasida — src/admin/AndroidManifest.xml olib tashlaydi).
   ============================================================ */
final class DzxWidgets {
    static final String BASE = "https://abdulazizjuraev.github.io/dezomax/";
    static final String EXTRA_PATH = "dzx_path";
    static final int NEW = 1, CONTINUE = 2, QUICK = 3, ALL = 4;
    private static final String PREFS = "dzx_widget";

    private DzxWidgets() {}

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE); }

    /* Barcha vidjetlarni yangilash (sayt «davom ettirish»ni berganda) */
    static void updateAll(Context c) {
        for (Class<?> k : new Class<?>[] { WidgetNew.class, WidgetContinue.class, WidgetQuick.class, WidgetAll.class }) update(c, k);
    }

    static void update(Context c, Class<?> k) {
        {
            int[] ids = AppWidgetManager.getInstance(c).getAppWidgetIds(new ComponentName(c, k));
            if (ids.length == 0) return;
            Intent i = new Intent(c, k).setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE)
                .putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            c.sendBroadcast(i);
        }
    }

    /* Bosilganda ilovada sahifa ochish */
    static PendingIntent open(Context c, String path, int code) {
        Intent i = new Intent(c, MainActivity.class)
            .setAction("uz.dezomax.app.OPEN." + code)
            .putExtra(EXTRA_PATH, path)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(c, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    /* ---------- tarmoq (fon oqimida) ---------- */

    private static byte[] get(String url, int max) throws Exception {
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
        con.setConnectTimeout(5000);
        con.setReadTimeout(7000);
        con.setRequestProperty("User-Agent", "DezoMaxWidget");
        try (InputStream in = con.getInputStream(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[16384];
            int n, total = 0;
            while ((n = in.read(buf)) > 0) {
                total += n;
                if (total > max) throw new Exception("katta");
                out.write(buf, 0, n);
            }
            return out.toByteArray();
        } finally { con.disconnect(); }
    }

    /* Yangi kinolar: internetdan (bo'lmasa — oxirgi saqlangani) */
    static JSONArray newFilms(Context c) {
        SharedPreferences p = prefs(c);
        long last = p.getLong("newAt", 0);
        String cached = p.getString("newJson", null);
        if (cached == null || System.currentTimeMillis() - last > 30 * 60_000L) {
            try {
                String s = new String(get(BASE + "data/widget.json?t=" + System.currentTimeMillis(), 200_000), "UTF-8");
                JSONArray items = new JSONObject(s).getJSONArray("items");
                p.edit().putString("newJson", items.toString()).putLong("newAt", System.currentTimeMillis()).apply();
                return items;
            } catch (Throwable ignored) {}
        }
        try { return new JSONArray(cached == null ? "[]" : cached); } catch (Throwable e) { return new JSONArray(); }
    }

    /* Kino rasmi kartaga (w×h, burchaklari yumaloq), faylda keshlanadi:
       - videoning qora chiziqlari (letterbox) kesiladi;
       - shakli kartaga yaqin bo'lsa — to'ldirib, o'rtasidan; juda farq qilsa (tik poster yotiq kartada) —
         orqada o'sha rasm kattalashtirilib xiralashtirilgan, ustida rasmning o'zi to'liq. */
    static Bitmap poster(Context c, String url, boolean wide, int w, int h) {
        if (url == null || url.isEmpty()) return null;
        File f = new File(c.getCacheDir(), "w3_" + Integer.toHexString(url.hashCode()) + "_" + w + "x" + h + ".png");
        if (f.exists()) {
            Bitmap b = BitmapFactory.decodeFile(f.getAbsolutePath());
            if (b != null) return b;
        }
        try {
            byte[] data = get(url, 4_000_000);
            BitmapFactory.Options o = new BitmapFactory.Options();
            o.inJustDecodeBounds = true;
            BitmapFactory.decodeByteArray(data, 0, data.length, o);
            int sample = 1;
            while (o.outWidth / (sample * 2) >= w && o.outHeight / (sample * 2) >= h) sample *= 2;
            o = new BitmapFactory.Options();
            o.inSampleSize = sample;
            Bitmap raw = BitmapFactory.decodeByteArray(data, 0, data.length, o);
            if (raw == null) return null;
            Bitmap src = trimDark(raw);
            Bitmap out = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
            Canvas cv = new Canvas(out);
            float r = Math.min(w, h) * 0.12f;
            Path clip = new Path();
            clip.addRoundRect(new RectF(0, 0, w, h), r, r, Path.Direction.CW);
            cv.clipPath(clip);
            cv.drawColor(0xFF1A1F2B);
            Paint paint = new Paint(Paint.FILTER_BITMAP_FLAG | Paint.ANTI_ALIAS_FLAG);
            float sw = src.getWidth(), sh = src.getHeight();
            float ratio = (sw / sh) / ((float) w / h);
            if (ratio > 0.7f && ratio < 1.45f) {
                float k = Math.max(w / sw, h / sh);       // to'ldirib, o'rtadan
                float cw = w / k, ch = h / k;
                int l = Math.round((sw - cw) / 2f), t = Math.round((sh - ch) / 2f);
                cv.drawBitmap(src, new Rect(l, t, l + Math.round(cw), t + Math.round(ch)), new RectF(0, 0, w, h), paint);
            } else {
                Bitmap tiny = Bitmap.createScaledBitmap(src, Math.max(4, Math.round(sw / 24f)), Math.max(4, Math.round(sh / 24f)), true);
                float kb = Math.max(w / (float) tiny.getWidth(), h / (float) tiny.getHeight());
                float bw = tiny.getWidth() * kb, bh = tiny.getHeight() * kb;
                cv.drawBitmap(tiny, null, new RectF((w - bw) / 2f, (h - bh) / 2f, (w + bw) / 2f, (h + bh) / 2f), paint);
                tiny.recycle();
                cv.drawColor(0x66000000);
                float k = Math.min(w / sw, h / sh);       // to'liq, o'rtada
                float dw = sw * k, dh = sh * k;
                cv.drawBitmap(src, null, new RectF((w - dw) / 2f, (h - dh) / 2f, (w + dw) / 2f, (h + dh) / 2f), paint);
            }
            if (src != raw) src.recycle();
            raw.recycle();
            try (FileOutputStream fo = new FileOutputStream(f)) { out.compress(Bitmap.CompressFormat.PNG, 100, fo); }
            return out;
        } catch (Throwable e) { return null; }
    }

    /* Rasm chetidagi qora chiziqlarni (video letterbox) kesish — har tomondan ko'pi bilan 30% */
    private static Bitmap trimDark(Bitmap b) {
        int w = b.getWidth(), h = b.getHeight();
        int top = 0, bottom = h - 1, left = 0, right = w - 1;
        while (top < h * 0.3 && dark(b, true, top, w, h)) top++;
        while (bottom > h * 0.7 && dark(b, true, bottom, w, h)) bottom--;
        while (left < w * 0.3 && dark(b, false, left, w, h)) left++;
        while (right > w * 0.7 && dark(b, false, right, w, h)) right--;
        if (top < 3 && left < 3 && h - 1 - bottom < 3 && w - 1 - right < 3) return b;
        return Bitmap.createBitmap(b, left, top, right - left + 1, bottom - top + 1);
    }

    private static boolean dark(Bitmap b, boolean row, int at, int w, int h) {
        int n = 24, sum = 0, max = 0;
        for (int i = 0; i < n; i++) {
            int x = row ? (int) ((i + 0.5f) * w / n) : at, y = row ? at : (int) ((i + 0.5f) * h / n);
            int p = b.getPixel(x, y);
            int lum = (((p >> 16) & 0xff) * 3 + ((p >> 8) & 0xff) * 6 + (p & 0xff)) / 10;
            sum += lum;
            max = Math.max(max, lum);
        }
        return sum / n < 20 && max < 60;
    }

    static String time(int s) {
        s = Math.max(0, s);
        int h = s / 3600, m = (s % 3600) / 60, sec = s % 60;
        return h > 0 ? String.format(Locale.US, "%d:%02d:%02d", h, m, sec) : String.format(Locale.US, "%d:%02d", m, sec);
    }

    /* ---------- maketlar ---------- */

    private static final int[] POSTER = { R.id.wPoster1, R.id.wPoster2, R.id.wPoster3 };
    private static final int[] PTITLE = { R.id.wTitle1, R.id.wTitle2, R.id.wTitle3 };
    private static final int[] PCELL = { R.id.wCell1, R.id.wCell2, R.id.wCell3 };
    private static final int[] PSUB = { R.id.wSub1, R.id.wSub2, R.id.wSub3 };

    static RemoteViews build(Context c, int kind) {
        switch (kind) {
            case CONTINUE: return buildContinue(c);
            case QUICK: { RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_quick); bindQuick(c, v); return v; }
            case ALL: { RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_all); bindNew(c, v); bindQuick(c, v); return v; }
            default: { RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_new); bindNew(c, v); return v; }
        }
    }

    private static void bindNew(Context c, RemoteViews v) {
        v.setOnClickPendingIntent(R.id.wHead, open(c, "index.html", 100));
        JSONArray items = newFilms(c);
        for (int i = 0; i < POSTER.length; i++) {
            JSONObject m = items.optJSONObject(i);
            if (m == null) { v.setViewVisibility(PCELL[i], View.INVISIBLE); continue; }
            v.setViewVisibility(PCELL[i], View.VISIBLE);
            v.setTextViewText(PTITLE[i], m.optString("title"));
            v.setTextViewText(PSUB[i], m.optString("sub"));
            Bitmap b = poster(c, m.optString("poster"), m.optBoolean("wide"), 320, 180);   // ro'yxat: 16:9
            if (b != null) v.setImageViewBitmap(POSTER[i], b);
            else v.setImageViewResource(POSTER[i], R.drawable.widget_thumb_empty);
            v.setOnClickPendingIntent(PCELL[i], open(c, m.optString("path", "index.html"), 110 + i));
        }
    }

    private static void bindQuick(Context c, RemoteViews v) {
        v.setOnClickPendingIntent(R.id.wqOpen, open(c, "index.html", 200));
        v.setOnClickPendingIntent(R.id.wqSearch, open(c, "search.html", 201));
        v.setOnClickPendingIntent(R.id.wqDownloads, open(c, "downloads.html", 202));
        v.setOnClickPendingIntent(R.id.wqFav, open(c, "favorites.html", 203));
    }

    private static RemoteViews buildContinue(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_continue);
        JSONObject m = null;
        try { String s = prefs(c).getString("continue", null); if (s != null) m = new JSONObject(s); } catch (Throwable ignored) {}
        if (m == null || m.optBoolean("done")) {
            v.setTextViewText(R.id.wcLabel, "Davom ettirish");
            v.setTextViewText(R.id.wcTitle, "Hali kino ko‘rilmagan");
            v.setTextViewText(R.id.wcTime, "Ko‘rishni boshlang — shu yerda chiqadi");
            v.setProgressBar(R.id.wcBar, 100, 0, false);
            v.setImageViewResource(R.id.wcPoster, R.drawable.widget_poster_empty);
            v.setOnClickPendingIntent(R.id.wcRoot, open(c, "index.html", 300));
            return v;
        }
        int t = m.optInt("t"), dur = Math.max(1, m.optInt("dur"));
        v.setTextViewText(R.id.wcLabel, "Davom ettirish");
        v.setTextViewText(R.id.wcTitle, m.optString("title"));
        v.setTextViewText(R.id.wcTime, time(t) + " / " + time(dur));
        v.setProgressBar(R.id.wcBar, 1000, Math.round(t * 1000f / dur), false);
        Bitmap b = poster(c, m.optString("poster"), m.optBoolean("wide"), 200, 300);
        if (b != null) v.setImageViewBitmap(R.id.wcPoster, b);
        else v.setImageViewResource(R.id.wcPoster, R.drawable.widget_poster_empty);
        v.setOnClickPendingIntent(R.id.wcRoot, open(c, m.optString("path", "index.html"), 301));
        return v;
    }
}
