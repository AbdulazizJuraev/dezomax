package uz.dezomax.app;

import androidx.annotation.NonNull;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

/* AdMob: kino oldidan to'liq ekranli reklama (js/ads.js → Ads.preroll).
   Blok ID sayt tomonidan beriladi (ADS_CONFIG.admob.interstitial), ilova ID esa
   build.gradle → manifestPlaceholders.admobAppId. */
@CapacitorPlugin(name = "DezoAds")
public class AdsPlugin extends Plugin {
    private boolean busy;

    @Override
    public void load() {
        new Thread(() -> {
            try { MobileAds.initialize(getContext(), status -> {}); } catch (Exception ignored) {}
        }).start();
    }

    @PluginMethod
    public void interstitial(PluginCall call) {
        String unit = call.getString("adUnitId");
        if (unit == null || unit.isEmpty()) { call.reject("no_unit"); return; }
        if (busy) { call.reject("busy"); return; }
        busy = true;

        getActivity().runOnUiThread(() -> InterstitialAd.load(getContext(), unit, new AdRequest.Builder().build(),
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd ad) {
                    ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdDismissedFullScreenContent() { busy = false; call.resolve(); }

                        @Override
                        public void onAdFailedToShowFullScreenContent(@NonNull AdError e) { busy = false; call.reject(e.getMessage()); }
                    });
                    if (getActivity() == null || getActivity().isFinishing()) { busy = false; call.reject("no_activity"); return; }
                    ad.show(getActivity());
                }

                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError e) { busy = false; call.reject(e.getMessage()); }
            }));
    }
}
