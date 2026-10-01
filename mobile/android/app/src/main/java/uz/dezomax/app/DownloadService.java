package uz.dezomax.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;

import androidx.core.app.NotificationCompat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/* ============================================================
   Ko'p ulanishli (parallel) yuklovchi — Android DownloadManager bitta ulanishdan foydalanadi,
   ko'p saytlar esa har bir ulanishni sekinlashtiradi (mover.uz: 1 ta → 0,3 MB/s, 6 ta → 0,8 MB/s).
   Fayl SEGMENTS bo'lakka bo'linib baravar yuklanadi, «.part» faylga yoziladi, tugagach nomi o'zgaradi.
   Doimiy bildirishnomali xizmat (foreground service) — ilova yopilsa ham davom etadi.
   Holat SharedPreferences'da saqlanadi: uzilsa/telefon o'chsa — qolgan joyidan davom etadi.
   ============================================================ */
public class DownloadService extends Service {
    static final int SEGMENTS = 6;
    static final long MIN_ID = 1_000_000_000_000L;      // DownloadManager ID'laridan ajratish uchun
    private static final String PREFS = "dzx_dl";
    private static final String CHANNEL = "dezomax_downloads";
    private static final int NOTIF_ID = 7301;

    static final Map<Long, Task> tasks = new ConcurrentHashMap<>();
    private final Handler ui = new Handler(Looper.getMainLooper());
    private boolean ticking;

    /* ---------- Vazifa ---------- */
    static class Task {
        long id; String url, file, title; long total;
        long[][] segs;                     // [start, end, pos]
        volatile String state = "running"; // running | done | failed | cancelled
        final AtomicLong loaded = new AtomicLong();
        int doneSegs;
        long lastSave;

        JSONObject toJson() {
            JSONObject o = new JSONObject();
            try {
                o.put("id", id); o.put("url", url); o.put("file", file); o.put("title", title);
                o.put("total", total); o.put("state", state);
                JSONArray a = new JSONArray();
                for (long[] s : segs) a.put(new JSONArray().put(s[0]).put(s[1]).put(s[2]));
                o.put("segs", a);
            } catch (Exception ignored) {}
            return o;
        }

        static Task fromJson(JSONObject o) {
            Task t = new Task();
            t.id = o.optLong("id"); t.url = o.optString("url"); t.file = o.optString("file");
            t.title = o.optString("title", "DezoMax"); t.total = o.optLong("total"); t.state = o.optString("state", "running");
            JSONArray a = o.optJSONArray("segs");
            t.segs = new long[a == null ? 0 : a.length()][];
            long sum = 0;
            for (int i = 0; a != null && i < a.length(); i++) {
                JSONArray s = a.optJSONArray(i);
                t.segs[i] = new long[]{ s.optLong(0), s.optLong(1), s.optLong(2) };
                sum += t.segs[i][2] - t.segs[i][0];
            }
            t.loaded.set(sum);
            return t;
        }
    }

    /* ---------- Saqlash ---------- */
    static SharedPreferences prefs(Context c) { return c.getSharedPreferences(PREFS, MODE_PRIVATE); }

    static synchronized void save(Context c, Task t) {
        t.lastSave = System.currentTimeMillis();
        prefs(c).edit().putString("t_" + t.id, t.toJson().toString()).apply();
    }

    static Task load(Context c, long id) {
        Task live = tasks.get(id);
        if (live != null) return live;
        String s = prefs(c).getString("t_" + id, null);
        if (s == null) return null;
        try { return Task.fromJson(new JSONObject(s)); } catch (Exception e) { return null; }
    }

    static void forget(Context c, long id) { prefs(c).edit().remove("t_" + id).apply(); }

    static List<Task> unfinished(Context c) {
        List<Task> out = new ArrayList<>();
        for (Map.Entry<String, ?> e : prefs(c).getAll().entrySet()) {
            if (!e.getKey().startsWith("t_")) continue;
            try {
                Task t = Task.fromJson(new JSONObject(String.valueOf(e.getValue())));
                if ("running".equals(t.state)) out.add(t);
            } catch (Exception ignored) {}
        }
        return out;
    }

    /* ---------- Tekshiruv: sayt bo'lab berishni (Range) qo'llaydimi, hajmi qancha ---------- */
    /** Range qo'llansa — fayl hajmi, aks holda -1 */
    static long probe(String url) {
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(url).openConnection();
            c.setRequestProperty("Range", "bytes=0-0");
            c.setConnectTimeout(12000);
            c.setReadTimeout(12000);
            if (c.getResponseCode() != 206) return -1;
            String cr = c.getHeaderField("Content-Range");
            Matcher m = cr == null ? null : Pattern.compile("/(\\d+)\\s*$").matcher(cr);
            return m != null && m.find() ? Long.parseLong(m.group(1)) : -1;
        } catch (Exception e) {
            return -1;
        } finally {
            if (c != null) c.disconnect();
        }
    }

    static Task create(Context c, long id, String url, String file, String title, long total) {
        Task t = new Task();
        t.id = id; t.url = url; t.file = file; t.title = title; t.total = total;
        int n = (int) Math.max(1, Math.min(SEGMENTS, total / (4L * 1048576)));   // kichik faylga kam bo'lak
        t.segs = new long[n][];
        long per = total / n;
        for (int i = 0; i < n; i++) {
            long s = i * per, e = (i == n - 1) ? total - 1 : (s + per - 1);
            t.segs[i] = new long[]{ s, e, s };
        }
        save(c, t);
        return t;
    }

    /* ---------- Xizmat ---------- */
    static void kick(Context c) {
        Intent i = new Intent(c, DownloadService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) c.startForegroundService(i); else c.startService(i);
    }

    @Override public IBinder onBind(Intent intent) { return null; }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        goForeground();
        for (Task t : unfinished(this)) {
            if (!tasks.containsKey(t.id)) { tasks.put(t.id, t); run(t); }
        }
        if (!ticking) { ticking = true; ui.post(tick); }
        return START_STICKY;
    }

    private void goForeground() {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && nm != null && nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Yuklab olish", NotificationManager.IMPORTANCE_LOW);
            ch.setShowBadge(false);
            nm.createNotificationChannel(ch);
        }
        Notification n = build("Yuklab olish boshlanmoqda…", 0, 0, true);
        if (Build.VERSION.SDK_INT >= 34) startForeground(NOTIF_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC);
        else startForeground(NOTIF_ID, n);
    }

    private Notification build(String text, int max, int prog, boolean indeterminate) {
        Intent open = getPackageManager().getLaunchIntentForPackage(getPackageName());
        PendingIntent pi = open == null ? null : PendingIntent.getActivity(this, 0, open, PendingIntent.FLAG_IMMUTABLE);
        return new NotificationCompat.Builder(this, CHANNEL)
            .setSmallIcon(android.R.drawable.stat_sys_download)
            .setContentTitle("DezoMax — yuklab olinmoqda")
            .setContentText(text)
            .setProgress(max, prog, indeterminate)
            .setOnlyAlertOnce(true)
            .setOngoing(true)
            .setContentIntent(pi)
            .build();
    }

    private final Runnable tick = new Runnable() {
        @Override public void run() {
            long sum = 0, got = 0; int active = 0; String name = null;
            for (Task t : tasks.values()) {
                if (!"running".equals(t.state)) continue;
                active++; sum += t.total; got += t.loaded.get(); if (name == null) name = t.title;
                if (System.currentTimeMillis() - t.lastSave > 3000) save(DownloadService.this, t);
            }
            if (active == 0) { ticking = false; stopForeground(true); stopSelf(); return; }
            int pct = sum > 0 ? (int) (got * 100 / sum) : 0;
            String text = (active > 1 ? active + " ta kino · " : name + " · ") + pct + "% · " +
                (got / 1048576) + " / " + (sum / 1048576) + " MB";
            NotificationManager nm = getSystemService(NotificationManager.class);
            if (nm != null) nm.notify(NOTIF_ID, build(text, 100, pct, false));
            ui.postDelayed(this, 1000);
        }
    };

    /* ---------- Yuklash ---------- */
    private void run(Task t) {
        File dir = DownloadPlugin.dir(this);
        File part = new File(dir, t.file + ".part");
        final RandomAccessFile raf;
        try {
            raf = new RandomAccessFile(part, "rw");
            if (raf.length() != t.total) raf.setLength(t.total);
        } catch (Exception e) { t.state = "failed"; save(this, t); return; }
        final FileChannel ch = raf.getChannel();
        for (long[] seg : t.segs) {
            if (seg[2] > seg[1]) { synchronized (t) { t.doneSegs++; } continue; }
            new Thread(() -> segment(t, seg, ch, raf, part), "dzx-dl-" + t.id).start();
        }
        maybeFinish(t, raf, part);
    }

    private void segment(Task t, long[] seg, FileChannel ch, RandomAccessFile raf, File part) {
        int fails = 0;
        byte[] buf = new byte[256 * 1024];
        while (seg[2] <= seg[1] && "running".equals(t.state)) {
            HttpURLConnection c = null;
            try {
                c = (HttpURLConnection) new URL(t.url).openConnection();
                c.setRequestProperty("Range", "bytes=" + seg[2] + "-" + seg[1]);
                c.setConnectTimeout(15000);
                c.setReadTimeout(30000);
                if (c.getResponseCode() != 206) throw new java.io.IOException("HTTP " + c.getResponseCode());
                try (InputStream in = c.getInputStream()) {
                    int n;
                    while ((n = in.read(buf)) > 0 && "running".equals(t.state)) {
                        long room = seg[1] - seg[2] + 1;
                        if (n > room) n = (int) room;
                        ch.write(ByteBuffer.wrap(buf, 0, n), seg[2]);
                        seg[2] += n;
                        t.loaded.addAndGet(n);
                        fails = 0;
                        if (seg[2] > seg[1]) break;
                    }
                }
            } catch (Exception e) {
                if (++fails > 25) { t.state = "failed"; save(this, t); break; }
                try { Thread.sleep(Math.min(15000, 1000L * fails)); } catch (InterruptedException ignored) {}
            } finally {
                if (c != null) c.disconnect();
            }
        }
        if (seg[2] > seg[1]) synchronized (t) { t.doneSegs++; }
        maybeFinish(t, raf, part);
    }

    private void maybeFinish(Task t, RandomAccessFile raf, File part) {
        synchronized (t) {
            if ("cancelled".equals(t.state)) {
                try { raf.close(); } catch (Exception ignored) {}
                part.delete();
                return;
            }
            if (t.doneSegs < t.segs.length || !"running".equals(t.state)) {
                if ("failed".equals(t.state)) { try { raf.close(); } catch (Exception ignored) {} }
                return;
            }
            try { raf.close(); } catch (Exception ignored) {}
            File fin = new File(part.getParentFile(), t.file);
            if (fin.exists()) fin.delete();
            t.state = part.renameTo(fin) ? "done" : "failed";
            t.loaded.set(t.total);
            save(this, t);
            tasks.remove(t.id);
            NotificationManager nm = getSystemService(NotificationManager.class);
            if (nm != null && "done".equals(t.state)) {
                nm.notify((int) (t.id % 100000) + 8000, new NotificationCompat.Builder(this, CHANNEL)
                    .setSmallIcon(android.R.drawable.stat_sys_download_done)
                    .setContentTitle("Yuklab olindi")
                    .setContentText(t.title + " — internetsiz ko‘rish mumkin")
                    .setAutoCancel(true)
                    .build());
            }
        }
    }

    /* Bekor qilish (plagindan) */
    static void cancel(Context c, long id) {
        Task t = tasks.get(id);
        if (t != null) t.state = "cancelled";
        forget(c, id);
        tasks.remove(id);
    }
}
