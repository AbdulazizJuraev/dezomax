package uz.dezomax.app;

import android.app.DownloadManager;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.webkit.ServiceWorkerClient;
import android.webkit.ServiceWorkerController;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/* ============================================================
   Kinoni telefonga yuklab olish va internetsiz ko'rish.
   - Yuklash: Android DownloadManager (ilova yopilsa ham davom etadi, bildirishnomada ko'rinadi),
     fayl ilovaning o'z papkasiga: Android/data/uz.dezomax.app/files/Movies/dezomax/<fayl>
     (ruxsat so'ralmaydi; ilova o'chirilsa — fayllar ham o'chadi).
   - Ko'rish: sahifa <video src="/_dzx_offline/<fayl>"> so'raydi — bu so'rov shu yerda ushlanib,
     fayl Range (oldinga/orqaga surish) bilan beriladi. Capacitor'ning o'z lokal fayl berishi
     Range'da boshlang'ich nuqtaga o'tmaydi — surilganda video buziladi, shuning uchun o'zimiz.
   - Internetsiz ro'yxat: har bir kino yonida <fayl>.json (nomi, poster, dmId) va <fayl>.jpg (poster nusxasi).
     /_dzx_offline/__list.json — tayyor kinolar ro'yxati. «Internet yo'q» sahifasi (https://localhost/offline.html)
     saytning localStorage'ini ko'ra olmaydi (boshqa manzil) — ro'yxatni shu yerdan oladi.
   JS: Capacitor.Plugins.DezoDownload — start, status, remove, space, meta.
   ============================================================ */
@CapacitorPlugin(name = "DezoDownload")
public class DownloadPlugin extends Plugin {
    static final String PREFIX = "/_dzx_offline/";

    private DownloadManager dm() { return (DownloadManager) getContext().getSystemService(Context.DOWNLOAD_SERVICE); }

    static File dir(Context ctx) {
        File d = new File(ctx.getExternalFilesDir(Environment.DIRECTORY_MOVIES), "dezomax");
        if (!d.exists()) d.mkdirs();
        return d;
    }

    // fayl nomi faqat xavfsiz belgilardan (papkadan tashqariga chiqib bo'lmasin)
    static String safeName(String s) {
        if (s == null) return null;
        String n = s.replaceAll("[^A-Za-z0-9._-]", "");
        return n.isEmpty() || n.startsWith(".") ? null : n;
    }

    @Override
    public void load() {
        Bridge bridge = getBridge();
        Context ctx = getContext();
        // telefon o'chib-yongan yoki ilova yopilgan bo'lsa — chala qolgan parallel yuklashlar davom etadi
        try { if (!DownloadService.unfinished(ctx).isEmpty()) DownloadService.kick(ctx); } catch (Exception ignored) {}
        // sahifa va service worker so'rovlarida /_dzx_offline/ — telefondagi fayl
        bridge.getWebView().post(() -> bridge.setWebViewClient(new BridgeWebViewClient(bridge) {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                try {
                    WebResourceResponse r = serveLocal(ctx, request);
                    return r != null ? r : super.shouldInterceptRequest(view, request);
                } catch (Exception e) {
                    MainActivity.noteProblem(ctx, "intercept: " + request.getUrl(), e);
                    return null;
                }
            }

            // Sahifa jarayoni yiqilsa yoki xotira yetmay o'chirilsa — butun ilova yopilmasin:
            // sababini yozib qo'yamiz va oynani qayta yaratamiz (sahifa qaytadan yuklanadi)
            @Override
            public boolean onRenderProcessGone(WebView view, android.webkit.RenderProcessGoneDetail detail) {
                boolean crashed = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && detail != null && detail.didCrash();
                MainActivity.noteProblem(ctx, "WebView " + (crashed ? "yiqildi (crash)" : "xotira yetmadi (killed)") + " — " + view.getUrl(), null);
                try {
                    android.view.ViewGroup parent = (android.view.ViewGroup) view.getParent();
                    if (parent != null) parent.removeView(view);
                    view.destroy();
                } catch (Exception ignored) {}
                if (getActivity() != null) getActivity().runOnUiThread(() -> {
                    // ketma-ket ko'p marta bo'lsa — aylanib qolmaymiz, ilovani yopamiz (sababi keyin ko'rsatiladi)
                    if (MainActivity.tooManyGone()) getActivity().finish(); else getActivity().recreate();
                });
                return true;
            }
        }));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            try {
                ServiceWorkerController.getInstance().setServiceWorkerClient(new ServiceWorkerClient() {
                    @Override
                    public WebResourceResponse shouldInterceptRequest(WebResourceRequest request) {
                        try {
                            WebResourceResponse r = serveLocal(ctx, request);
                            if (r != null) return r;
                            // qolganini Capacitor'ning o'zi qiladigandek (sahifalarga ko'prik skriptini qo'shish)
                            return bridge.getLocalServer().shouldInterceptRequest(request);
                        } catch (Exception e) {
                            MainActivity.noteProblem(ctx, "sw: " + request.getUrl(), e);
                            return null;
                        }
                    }
                });
            } catch (Exception ignored) {}
        }
    }

    static WebResourceResponse serveLocal(Context ctx, WebResourceRequest request) {
        Uri u = request.getUrl();
        String path = u.getPath();
        if (path == null || !path.contains(PREFIX)) return null;
        String name = safeName(path.substring(path.indexOf(PREFIX) + PREFIX.length()));
        File f = name == null ? null : new File(dir(ctx), name);
        Map<String, String> headers = new HashMap<>();
        headers.put("Accept-Ranges", "bytes");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Cache-Control", "no-store");
        if ("__list.json".equals(name)) {
            byte[] body = listJson(ctx).getBytes(java.nio.charset.StandardCharsets.UTF_8);
            return new WebResourceResponse("application/json", "utf-8", 200, "OK", headers, new java.io.ByteArrayInputStream(body));
        }
        if (name != null && name.endsWith(".json")) {
            return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", headers, null);
        }
        if (name != null && name.endsWith(".jpg")) {
            if (f == null || !f.isFile()) return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", headers, null);
            try { return new WebResourceResponse("image/jpeg", null, 200, "OK", headers, new FileInputStream(f)); }
            catch (IOException e) { return new WebResourceResponse("text/plain", "utf-8", 500, "Error", headers, null); }
        }
        if (f == null || !f.isFile()) {
            return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", headers, null);
        }
        long size = f.length();
        long start = 0, end = size - 1;
        String range = null;
        Map<String, String> rq = request.getRequestHeaders();
        if (rq != null) for (Map.Entry<String, String> e : rq.entrySet()) if (e.getKey().equalsIgnoreCase("Range")) range = e.getValue();
        boolean partial = false;
        if (range != null && range.startsWith("bytes=")) {
            try {
                String[] p = range.substring(6).split("-", 2);
                if (!p[0].isEmpty()) start = Long.parseLong(p[0].trim());
                if (p.length > 1 && !p[1].trim().isEmpty()) end = Math.min(Long.parseLong(p[1].trim()), size - 1);
                else if (p[0].isEmpty() && p.length > 1) { start = Math.max(0, size - Long.parseLong(p[1].trim())); end = size - 1; }
                partial = true;
            } catch (Exception ignored) { start = 0; end = size - 1; }
        }
        if (start >= size || start > end) {
            headers.put("Content-Range", "bytes */" + size);
            return new WebResourceResponse("video/mp4", null, 416, "Range Not Satisfiable", headers, null);
        }
        try {
            InputStream in = new FileInputStream(f);
            long skipped = 0;
            while (skipped < start) { long s = in.skip(start - skipped); if (s <= 0) break; skipped += s; }
            final long len = end - start + 1;
            InputStream limited = new InputStream() {
                long left = len;
                @Override public int read() throws IOException { if (left <= 0) return -1; int b = in.read(); if (b >= 0) left--; return b; }
                @Override public int read(byte[] b, int off, int n) throws IOException {
                    if (left <= 0) return -1;
                    int r = in.read(b, off, (int) Math.min(n, left));
                    if (r > 0) left -= r;
                    return r;
                }
                @Override public void close() throws IOException { in.close(); }
            };
            headers.put("Content-Length", String.valueOf(len));
            if (partial) headers.put("Content-Range", "bytes " + start + "-" + end + "/" + size);
            String mime = name.endsWith(".webm") ? "video/webm" : "video/mp4";
            return new WebResourceResponse(mime, null, partial ? 206 : 200, partial ? "Partial Content" : "OK", headers, limited);
        } catch (IOException e) {
            return new WebResourceResponse("text/plain", "utf-8", 500, "Error", headers, null);
        }
    }

    /* start({url, file, title}) → { dmId } */
    @PluginMethod
    public void start(PluginCall call) {
        String url = call.getString("url");
        String file = safeName(call.getString("file"));
        if (url == null || !url.startsWith("http") || file == null) { call.reject("bad_args"); return; }
        try {
            File target = new File(dir(getContext()), file);
            if (target.exists()) target.delete();
            // DownloadManager 308 (va ba'zi 307) yo'naltirishni kuzatmaydi — haqiqiy fayl manzilini o'zimiz topamiz
            url = resolveRedirects(url);
            new File(dir(getContext()), file + ".part").delete();

            // DezoCloud'dan boshqa saytlar: bo'lab berishni (Range) qo'llasa — 6 ta parallel ulanish (ancha tez).
            // DezoCloud'da foyda yo'q (Telegram chegarasi) va serverni ortiqcha yuklaydi — oddiy usul.
            if (!Uri.parse(url).getHost().endsWith("dezocloud.uz")) {
                long total = DownloadService.probe(url);
                if (total > 8L * 1048576) {
                    long id = Math.max(System.currentTimeMillis(), DownloadService.MIN_ID + 1);
                    DownloadService.create(getContext(), id, url, file, call.getString("title", "DezoMax"), total);
                    DownloadService.kick(getContext());
                    writeMeta(getContext(), file, call.getString("title", "DezoMax"), call.getString("poster"), id);
                    JSObject ret = new JSObject();
                    ret.put("dmId", id);
                    ret.put("parallel", true);
                    call.resolve(ret);
                    return;
                }
            }

            DownloadManager.Request r = new DownloadManager.Request(Uri.parse(url));
            r.setTitle(call.getString("title", "DezoMax"));
            r.setDescription("DezoMax — internetsiz ko‘rish uchun");
            r.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            r.setDestinationInExternalFilesDir(getContext(), Environment.DIRECTORY_MOVIES, "dezomax/" + file);
            r.setAllowedOverMetered(true);
            r.setAllowedOverRoaming(true);
            long id = dm().enqueue(r);
            writeMeta(getContext(), file, call.getString("title", "DezoMax"), call.getString("poster"), id);
            JSObject ret = new JSObject();
            ret.put("dmId", id);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject(e.getMessage() == null ? "start_failed" : e.getMessage());
        }
    }

    /* Yo'naltirishlar zanjiri (301/302/303/307/308) bo'ylab yakuniy manzil; xato bo'lsa — asl manzil.
       (Plagin chaqiruvlari asosiy oqimda emas — tarmoqqa murojaat qilish mumkin.) */
    static String resolveRedirects(String url) {
        String cur = url;
        for (int i = 0; i < 8; i++) {
            java.net.HttpURLConnection c = null;
            try {
                c = (java.net.HttpURLConnection) new java.net.URL(cur).openConnection();
                c.setInstanceFollowRedirects(false);
                c.setRequestMethod("HEAD");
                c.setConnectTimeout(10000);
                c.setReadTimeout(10000);
                int code = c.getResponseCode();
                if (code == 301 || code == 302 || code == 303 || code == 307 || code == 308) {
                    String loc = c.getHeaderField("Location");
                    if (loc == null || loc.isEmpty()) return cur;
                    cur = new java.net.URL(new java.net.URL(cur), loc).toString();
                    continue;
                }
                return cur;
            } catch (Exception e) {
                return cur;
            } finally {
                if (c != null) c.disconnect();
            }
        }
        return cur;
    }

    /* status({items:[{dmId, file}]}) → { items: [{dmId, file, state, loaded, total, exists}] }
       state: pending | running | paused | done | failed | missing */
    @PluginMethod
    public void status(PluginCall call) {
        JSArray out = new JSArray();
        try {
            JSArray items = call.getArray("items", new JSArray());
            for (int i = 0; i < items.length(); i++) {
                org.json.JSONObject it = items.getJSONObject(i);
                long id = it.optLong("dmId", -1);
                String file = safeName(it.optString("file", ""));
                File f = file == null ? null : new File(dir(getContext()), file);
                JSObject o = new JSObject();
                o.put("dmId", id);
                o.put("file", file);
                long[] lt = new long[] { 0, -1 };
                String state = stateOf(getContext(), id, f, lt);
                o.put("state", state);
                o.put("loaded", lt[0]);
                o.put("total", lt[1]);
                o.put("exists", f != null && f.isFile());
                out.put(o);
            }
        } catch (Exception ignored) {}
        JSObject ret = new JSObject();
        ret.put("items", out);
        call.resolve(ret);
    }

    /* Yuklash holati: pending | running | paused | done | failed | missing; lt = {yuklangan, jami} */
    static String stateOf(Context ctx, long id, File f, long[] lt) {
        String state = "missing";
        if (id >= DownloadService.MIN_ID) {
            DownloadService.Task t = DownloadService.load(ctx, id);
            if (t != null) {
                state = "running".equals(t.state) ? "running" : "done".equals(t.state) ? "done" : "failed";
                lt[0] = t.loaded.get();
                lt[1] = t.total;
            }
        } else if (id >= 0) {
            DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);
            try (Cursor c = dm.query(new DownloadManager.Query().setFilterById(id))) {
                if (c != null && c.moveToFirst()) {
                    int st = c.getInt(c.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
                    lt[0] = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                    lt[1] = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
                    state = st == DownloadManager.STATUS_SUCCESSFUL ? "done"
                        : st == DownloadManager.STATUS_FAILED ? "failed"
                        : st == DownloadManager.STATUS_PAUSED ? "paused"
                        : st == DownloadManager.STATUS_RUNNING ? "running" : "pending";
                }
            } catch (Exception ignored) {}
        }
        // DownloadManager yozuvni unutgan bo'lsa ham fayl joyida bo'lsa — tayyor
        if (f != null && f.isFile() && (state.equals("missing") || state.equals("done"))) {
            state = "done";
            lt[0] = f.length();
            lt[1] = f.length();
        }
        return state;
    }

    /* <fayl>.json — nomi, poster manzili, dmId; poster rasmi <fayl>.jpg ga fonda yuklanadi (internetsiz ko'rinsin) */
    static synchronized void writeMeta(Context ctx, String file, String title, String poster, Long dmId) {
        if (file == null) return;
        File mf = new File(dir(ctx), file + ".json");
        org.json.JSONObject m = readMeta(ctx, file);
        try {
            if (title != null && !title.isEmpty()) m.put("title", title);
            if (poster != null && poster.startsWith("http")) m.put("poster", poster);
            if (dmId != null) m.put("dmId", dmId);
            try (java.io.FileOutputStream out = new java.io.FileOutputStream(mf)) {
                out.write(m.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));
            }
        } catch (Exception ignored) {}
        final String url = m.optString("poster", "");
        final File jpg = new File(dir(ctx), file + ".jpg");
        if (!url.isEmpty() && !jpg.isFile()) new Thread(() -> {
            java.net.HttpURLConnection c = null;
            try {
                c = (java.net.HttpURLConnection) new java.net.URL(url).openConnection();
                c.setConnectTimeout(15000);
                c.setReadTimeout(20000);
                if (c.getResponseCode() != 200) return;
                File tmp = new File(dir(ctx), file + ".jpg.part");
                try (InputStream in = c.getInputStream(); java.io.FileOutputStream out = new java.io.FileOutputStream(tmp)) {
                    byte[] buf = new byte[16384];
                    int n, total = 0;
                    while ((n = in.read(buf)) > 0 && total < 8 * 1048576) { out.write(buf, 0, n); total += n; }
                }
                if (!tmp.renameTo(jpg)) tmp.delete();
            } catch (Exception ignored) {
            } finally { if (c != null) c.disconnect(); }
        }).start();
    }

    static org.json.JSONObject readMeta(Context ctx, String file) {
        File mf = new File(dir(ctx), file + ".json");
        if (mf.isFile()) {
            try (FileInputStream in = new FileInputStream(mf)) {
                byte[] b = new byte[(int) Math.min(mf.length(), 65536)];
                int n = in.read(b);
                return new org.json.JSONObject(new String(b, 0, Math.max(n, 0), java.nio.charset.StandardCharsets.UTF_8));
            } catch (Exception ignored) {}
        }
        return new org.json.JSONObject();
    }

    /* Telefondagi tayyor kinolar (yangilari birinchi) — «Internet yo'q» sahifasi uchun */
    static String listJson(Context ctx) {
        org.json.JSONArray arr = new org.json.JSONArray();
        File[] files = dir(ctx).listFiles();
        if (files != null) {
            java.util.Arrays.sort(files, (a, b) -> Long.compare(b.lastModified(), a.lastModified()));
            for (File f : files) {
                String n = f.getName();
                if (!f.isFile() || !n.matches("[A-Za-z0-9._-]+\\.(mp4|webm|m4v|mov)")) continue;
                org.json.JSONObject m = readMeta(ctx, n);
                if (!"done".equals(stateOf(ctx, m.optLong("dmId", -1), f, new long[] { 0, -1 }))) continue;
                try {
                    org.json.JSONObject o = new org.json.JSONObject();
                    o.put("file", n);
                    o.put("title", m.optString("title", n));
                    o.put("poster", new File(dir(ctx), n + ".jpg").isFile() ? PREFIX + n + ".jpg" : "");
                    o.put("total", f.length());
                    arr.put(o);
                } catch (Exception ignored) {}
            }
        }
        return arr.toString();
    }

    /* meta({file, title, poster}) — oldin yuklangan kinolar uchun ham nomi va posterini telefonga yozib qo'yadi */
    @PluginMethod
    public void meta(PluginCall call) {
        String file = safeName(call.getString("file"));
        if (file == null) { call.reject("bad_args"); return; }
        writeMeta(getContext(), file, call.getString("title"), call.getString("poster"), null);
        call.resolve();
    }

    /* remove({dmId, file}) — yuklashni to'xtatadi va faylni o'chiradi */
    @PluginMethod
    public void remove(PluginCall call) {
        long id = call.getLong("dmId", -1L);
        String file = safeName(call.getString("file"));
        if (id >= DownloadService.MIN_ID) DownloadService.cancel(getContext(), id);
        else try { if (id >= 0) dm().remove(id); } catch (Exception ignored) {}
        if (file != null) {
            File f = new File(dir(getContext()), file);
            if (f.exists()) f.delete();
            File part = new File(dir(getContext()), file + ".part");
            if (part.exists()) part.delete();
            new File(dir(getContext()), file + ".json").delete();
            new File(dir(getContext()), file + ".jpg").delete();
        }
        call.resolve();
    }

    /* space() → { free, used } — telefonda bo'sh joy va yuklangan kinolar hajmi (bayt) */
    @PluginMethod
    public void space(PluginCall call) {
        File d = dir(getContext());
        long used = 0;
        File[] files = d.listFiles();
        if (files != null) for (File f : files) used += f.length();
        long free = 0;
        try { StatFs s = new StatFs(d.getAbsolutePath()); free = s.getAvailableBytes(); } catch (Exception ignored) {}
        JSObject ret = new JSObject();
        ret.put("free", free);
        ret.put("used", used);
        call.resolve(ret);
    }
}
