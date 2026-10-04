package uz.dezomax.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

/* Vidjet turlari uchun umumiy: posterlar internetdan olinadi — fon oqimida (goAsync), keyin ekranga */
public abstract class DzxWidgetBase extends AppWidgetProvider {
    abstract int kind();

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        final PendingResult pending = goAsync();
        final Context app = context.getApplicationContext();
        new Thread(() -> {
            try {
                RemoteViews views = DzxWidgets.build(app, kind());
                for (int id : ids) manager.updateAppWidget(id, views);
            } catch (Throwable e) {
                MainActivity.noteProblem(app, "Vidjet xatosi", e);
            } finally {
                pending.finish();
            }
        }, "DzxWidget").start();
    }
}
