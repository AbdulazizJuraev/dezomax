package uz.dezomax.app;

import android.net.Uri;
import androidx.mediarouter.app.MediaRouteChooserDialog;
import androidx.mediarouter.media.MediaRouteSelector;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.cast.MediaInfo;
import com.google.android.gms.cast.MediaLoadRequestData;
import com.google.android.gms.cast.MediaMetadata;
import com.google.android.gms.cast.framework.CastContext;
import com.google.android.gms.cast.framework.CastSession;
import com.google.android.gms.cast.framework.CastState;
import com.google.android.gms.cast.framework.SessionManagerListener;
import com.google.android.gms.cast.framework.media.RemoteMediaClient;
import com.google.android.gms.common.images.WebImage;

/* Televizorga ulash (Chromecast). Default Media Receiver — .mp4/.m3u8 to'g'ridan-to'g'ri
   uzatiladi, alohida qabul qiluvchi ilova kerak emas. */
@CapacitorPlugin(name = "DezoCast")
public class CastPlugin extends Plugin {
    private CastContext castContext;
    private PluginCall pendingCall;
    private String pendingUrl, pendingTitle, pendingPoster, pendingMime;

    @Override
    public void load() {
        try { castContext = CastContext.getSharedInstance(getContext()); } catch (Exception e) { castContext = null; }
    }

    /* Cast SDK faqat asosiy (UI) oqimdan chaqirilishi shart — aks holda IllegalStateException va ilova yiqiladi
       (6.7 gacha shunday bo'lgan: pleyer ochilganda ilova yopilib qolardi). */
    private void availability(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            JSObject r = new JSObject();
            boolean ok = false;
            try { ok = castContext != null && castContext.getCastState() != CastState.NO_DEVICES_AVAILABLE; } catch (Exception ignored) {}
            r.put("available", ok);
            call.resolve(r);
        });
    }

    @PluginMethod
    public void isAvailable(PluginCall call) { availability(call); }

    /* Yangi nom: sayt faqat shuni chaqiradi — eski ilovalarda bu usul yo'q (xatosiz rad etiladi, yiqilmaydi) */
    @PluginMethod
    public void state(PluginCall call) { availability(call); }

    @PluginMethod
    public void cast(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            try { castOnUi(call); } catch (Exception e) { failPending("cast_failed"); call.reject("cast_failed"); }
        });
    }

    private void castOnUi(PluginCall call) {
        if (castContext == null) { call.reject("cast_unavailable"); return; }
        pendingUrl = call.getString("url");
        pendingTitle = call.getString("title", "DezoMax");
        pendingPoster = call.getString("poster");
        pendingMime = call.getString("mimeType", "application/x-mpegURL");
        if (pendingUrl == null) { call.reject("no_url"); return; }

        CastSession existing = castContext.getSessionManager().getCurrentCastSession();
        if (existing != null && existing.isConnected()) {
            loadMedia(existing);
            call.resolve();
            return;
        }

        pendingCall = call;
        castContext.getSessionManager().addSessionManagerListener(sessionListener, CastSession.class);
        MediaRouteSelector selector = castContext.getMergedSelector();
        if (selector == null) { failPending("cast_unavailable"); return; }
        MediaRouteChooserDialog dialog = new MediaRouteChooserDialog(getActivity());
        dialog.setRouteSelector(selector);
        dialog.show();
    }

    private void failPending(String code) {
        if (pendingCall != null) { pendingCall.reject(code); pendingCall = null; }
        try { if (castContext != null) castContext.getSessionManager().removeSessionManagerListener(sessionListener, CastSession.class); } catch (Exception ignored) {}
    }

    private final SessionManagerListener<CastSession> sessionListener = new SessionManagerListener<CastSession>() {
        @Override public void onSessionStarted(CastSession session, String sessionId) { finishPending(session); }
        @Override public void onSessionResumed(CastSession session, boolean wasSuspended) { finishPending(session); }
        @Override public void onSessionStartFailed(CastSession session, int error) { failPending("cast_failed"); }
        @Override public void onSessionResumeFailed(CastSession session, int error) { failPending("cast_failed"); }
        @Override public void onSessionEnded(CastSession session, int error) {}
        @Override public void onSessionSuspended(CastSession session, int reason) {}
        @Override public void onSessionStarting(CastSession session) {}
        @Override public void onSessionEnding(CastSession session) {}
        @Override public void onSessionResuming(CastSession session, String sessionId) {}

        private void finishPending(CastSession session) {
            loadMedia(session);
            if (pendingCall != null) { pendingCall.resolve(); pendingCall = null; }
            if (castContext != null) castContext.getSessionManager().removeSessionManagerListener(this, CastSession.class);
        }
    };

    private void loadMedia(CastSession session) {
        RemoteMediaClient client = session.getRemoteMediaClient();
        if (client == null || pendingUrl == null) return;
        MediaMetadata meta = new MediaMetadata(MediaMetadata.MEDIA_TYPE_MOVIE);
        meta.putString(MediaMetadata.KEY_TITLE, pendingTitle);
        if (pendingPoster != null && !pendingPoster.isEmpty()) meta.addImage(new WebImage(Uri.parse(pendingPoster)));
        MediaInfo info = new MediaInfo.Builder(pendingUrl)
                .setStreamType(MediaInfo.STREAM_TYPE_BUFFERED)
                .setContentType(pendingMime)
                .setMetadata(meta)
                .build();
        client.load(new MediaLoadRequestData.Builder().setMediaInfo(info).build());
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
        try { if (castContext != null) castContext.getSessionManager().removeSessionManagerListener(sessionListener, CastSession.class); } catch (Exception ignored) {}
    }
}
