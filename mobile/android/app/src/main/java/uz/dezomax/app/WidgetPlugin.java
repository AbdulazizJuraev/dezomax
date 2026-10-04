package uz.dezomax.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/* Sayt → bosh ekran vidjetlari (js/movie.js): oxirgi ko'rilgan kino va qayerda to'xtagani */
@CapacitorPlugin(name = "DzxWidget")
public class WidgetPlugin extends Plugin {
    @PluginMethod
    public void setContinue(PluginCall call) {
        JSObject data = call.getData();
        DzxWidgets.prefs(getContext()).edit().putString("continue", data.toString()).apply();
        DzxWidgets.update(getContext(), WidgetContinue.class);   // faqat «Davom ettirish» (har ~10 s)
        call.resolve();
    }

    @PluginMethod
    public void refresh(PluginCall call) {
        DzxWidgets.updateAll(getContext());
        call.resolve();
    }
}
