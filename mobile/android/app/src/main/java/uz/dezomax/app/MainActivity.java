package uz.dezomax.app;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Bosh sahifadagi treyler ovozini yoqqanda video to'xtab qolmasin:
        // WebView ovozli videoni ham to'g'ridan-to'g'ri o'ynata oladi
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
        }

        // Ilova yangilanganda WebView keshini tozalaymiz — aks holda yangi APK
        // o'rnatilgandan keyin ham eski sahifalar ko'rinib qolishi mumkin.
        // Sevimlilar, akkaunt va boshqa localStorage ma'lumotlari saqlanib qoladi.
        SharedPreferences prefs = getSharedPreferences("dezomax", MODE_PRIVATE);
        int current = BuildConfig.VERSION_CODE;
        if (prefs.getInt("webCacheVersion", 0) != current) {
            WebView webView = getBridge() != null ? getBridge().getWebView() : null;
            if (webView != null) {
                webView.clearCache(true);
                webView.reload();
            }
            prefs.edit().putInt("webCacheVersion", current).apply();
        }
    }
}
