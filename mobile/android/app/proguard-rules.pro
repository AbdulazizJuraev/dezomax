# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# ==================== DezoMax ====================
# Kod siqilib, obfuskatsiya qilinadi (minifyEnabled true). Quyidagilar nomi bo'yicha chaqiriladi — o'zgarmasin:

# Ilovaning o'z kodi: Capacitor plaginlari (Ads, Cast, Download, Widget), CastOptionsProvider (manifestdagi
# meta-data orqali nomi bilan yuklanadi), vidjetlar, xizmatlar. Kichik — to'liq saqlanadi.
-keep class uz.dezomax.app.** { *; }

# BackgroundRunner (bildirishnomalar tekshiruvchisi): JavaScript dvigateli (JNI) Java klasslarini nomi bilan chaqiradi
-keep class io.ionic.backgroundrunner.** { *; }
-keepclasseswithmembernames class * { native <methods>; }

# Capacitor ko'prigi (JS ↔ Java), WebView JavaScript interfeyslari
-keep class com.getcapacitor.** { *; }
-keepclassmembers class * { @android.webkit.JavascriptInterface <methods>; }

# Xato hisobotlarida qator raqamlari (Play Console → Ishdan chiqishlar) — fayl nomi yashiriladi
-keepattributes SourceFile,LineNumberTable,*Annotation*,Signature,InnerClasses,EnclosingMethod
-renamesourcefileattribute SourceFile
