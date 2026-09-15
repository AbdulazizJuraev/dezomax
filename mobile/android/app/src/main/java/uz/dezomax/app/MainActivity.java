package uz.dezomax.app;

import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.webkit.ScriptHandler;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import com.getcapacitor.BridgeActivity;

import java.util.Collections;
import java.util.Locale;

public class MainActivity extends BridgeActivity {

    private int lastTopDp = -1;
    private ScriptHandler topInsetScript;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView webView = getBridge() != null ? getBridge().getWebView() : null;

        // Bosh sahifadagi treyler ovozini yoqqanda video to'xtab qolmasin:
        // WebView ovozli videoni ham to'g'ridan-to'g'ri o'ynata oladi
        if (webView != null) {
            webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }

        // To'liq ekran — barcha telefonlarda (Android 15 dan eskilarida ham):
        // sahifa oyna chetigacha chiziladi, kamera qirqimi (notch) joyiga ham chiqadi,
        // soat/batareya qatori yashiriladi (tepadan pastga surilsa vaqtincha ko'rinadi).
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
                ? WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
                : WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(lp);
        }
        hideStatusBar();

        // Pastda navbar tizim paneli ostida qolmasligi uchun joy qoldiriladi.
        // Tepada kamera qirqimi balandligi sahifaga --app-sat CSS o'zgaruvchisi bo'lib beriladi
        // (logo va profil tugmasi kamera ostiga tushmaydi, video esa eng tepagacha chiqadi).
        View decor = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(decor, (v, insets) -> {
            int types = WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout();
            Insets bars = insets.getInsets(types);
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            boolean keyboard = insets.isVisible(WindowInsetsCompat.Type.ime());

            v.setPadding(bars.left, 0, bars.right, keyboard ? ime.bottom : bars.bottom);

            // tepada faqat kamera qirqimi hisobga olinadi: soat qatori yashirin, surib ochilganda sahifa sakramasin
            Insets cutout = insets.getInsets(WindowInsetsCompat.Type.displayCutout());
            float density = getResources().getDisplayMetrics().density;
            applyTopInset(Math.round(cutout.top / density));

            // WebView o'zi yana chekinish qo'shmasin (sahifadagi env() qiymatlari 0 bo'ladi)
            return new WindowInsetsCompat.Builder(insets).setInsets(types, Insets.NONE).build();
        });
        ViewCompat.requestApplyInsets(decor);

        // Ilova yangilanganda WebView keshini tozalaymiz — aks holda yangi APK
        // o'rnatilgandan keyin ham eski sahifalar ko'rinib qolishi mumkin.
        // Sevimlilar, akkaunt va boshqa localStorage ma'lumotlari saqlanib qoladi.
        SharedPreferences prefs = getSharedPreferences("dezomax", MODE_PRIVATE);
        int current = BuildConfig.VERSION_CODE;
        if (prefs.getInt("webCacheVersion", 0) != current) {
            if (webView != null) {
                webView.clearCache(true);
                webView.reload();
            }
            prefs.edit().putInt("webCacheVersion", current).apply();
        }
    }

    private void hideStatusBar() {
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        c.hide(WindowInsetsCompat.Type.statusBars());
    }

    @Override
    public void onResume() {
        super.onResume();
        // Capacitor tizim panellarini ishga tushirishda ko'rsatib qo'yishi mumkin — keyin yana yashiramiz
        getWindow().getDecorView().postDelayed(this::hideStatusBar, 300);
    }

    // boshqa ilovadan qaytganda yoki bildirishnoma pardasi yopilganda soat qatori yana yashirinsin
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideStatusBar();
    }

    /* Tepadagi chekinish (kamera qirqimi) balandligini sahifaga beramiz:
       - hozir ochiq sahifaga darhol;
       - keyingi har bir sahifaga — u chizilishidan oldin (document start skripti), header sakramasin. */
    private void applyTopInset(int topDp) {
        if (topDp == lastTopDp || getBridge() == null) return;
        lastTopDp = topDp;
        WebView webView = getBridge().getWebView();
        if (webView == null) return;

        String script = String.format(Locale.US,
            "(function(){var v='%dpx';function s(){var d=document.documentElement;if(d){d.style.setProperty('--app-sat',v);return true}return false}" +
            "if(!s()){new MutationObserver(function(m,o){if(s())o.disconnect()}).observe(document,{childList:true})}})();",
            topDp);

        webView.post(() -> {
            webView.evaluateJavascript(script, null);
            if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
                if (topInsetScript != null) topInsetScript.remove();
                topInsetScript = WebViewCompat.addDocumentStartJavaScript(webView, script, Collections.singleton("*"));
            }
        });
    }
}
