package uz.dezomax.app;

import android.Manifest;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
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

            // YouTube telefon brauzeriga «mobil» pleyer beradi — u videoning o'rtasida pauza/play
            // belgisini ko'rsatadi (bosh sahifa karuselida ko'rinib qolardi). Kompyuter brauzeri deb
            // tanishtiramiz: YouTube belgilarsiz pleyer beradi. Sayt dizayni ekran eniga qaraydi, UA'ga emas.
            String ua = webView.getSettings().getUserAgentString();
            java.util.regex.Matcher chrome = java.util.regex.Pattern.compile("Chrome/([\\d.]+)").matcher(ua == null ? "" : ua);
            String ver = chrome.find() ? chrome.group(1) : "140.0.0.0";
            webView.getSettings().setUserAgentString(
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/" + ver + " Safari/537.36 DezoMaxApp");
        }

        // To'liq ekran — barcha telefonlarda (Android 15 dan eskilarida ham):
        // sahifa oyna chetigacha chiziladi, kamera qirqimi (notch) joyiga ham chiqadi,
        // soat/batareya qatori ko'rinib turadi, sahifa uning ORTIDAN boshlanadi (treyler eng tepagacha chiqadi).
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
                ? WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
                : WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(lp);
        }

        // Pastda navbar tizim paneli ostida qolmasligi uchun joy qoldiriladi.
        // Tepadagi soat qatori (yoki kamera qirqimi) balandligi sahifaga --app-sat CSS o'zgaruvchisi bo'lib beriladi
        // (logo va profil tugmasi soat ostiga tushmaydi, video esa eng tepagacha chiqadi).
        View decor = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(decor, (v, insets) -> {
            int types = WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout();
            Insets bars = insets.getInsets(types);
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            boolean keyboard = insets.isVisible(WindowInsetsCompat.Type.ime());

            v.setPadding(bars.left, 0, bars.right, keyboard ? ime.bottom : bars.bottom);

            float density = getResources().getDisplayMetrics().density;
            applyTopInset(Math.round(bars.top / density));

            // WebView o'zi yana chekinish qo'shmasin (sahifadagi env() qiymatlari 0 bo'ladi)
            return new WindowInsetsCompat.Builder(insets).setInsets(types, Insets.NONE).build();
        });
        ViewCompat.requestApplyInsets(decor);

        // 5.5 gacha bildirishnomalar o'rtacha muhimlikdagi «Default» kanalida edi (tepadan tushmasdi).
        // Endi «dezomax_news» (yuqori muhimlik) ishlatiladi — eskisini sozlamalardan olib tashlaymiz.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            android.app.NotificationManager nm = getSystemService(android.app.NotificationManager.class);
            if (nm != null && nm.getNotificationChannel("default") != null) nm.deleteNotificationChannel("default");
        }

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

        // Android 13 va yangisida bildirishnomalarga ruxsat kod bilan so'raladi (aks holda xabarlar chiqmaydi).
        // Rad etilsa ham har safar bezovta qilmaymiz — eng ko'pi bilan 3 marta so'raymiz.
        if (Build.VERSION.SDK_INT >= 33
                && ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
            int asked = prefs.getInt("notifAsked", 0);
            if (asked < 3) {
                prefs.edit().putInt("notifAsked", asked + 1).apply();
                ActivityCompat.requestPermissions(this,
                    new String[]{ Manifest.permission.POST_NOTIFICATIONS }, 7001);
            }
        }
    }

    /* Tepadagi chekinish (soat qatori / kamera qirqimi) balandligini sahifaga beramiz:
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
