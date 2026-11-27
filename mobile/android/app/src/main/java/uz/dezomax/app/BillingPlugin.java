package uz.dezomax.app;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/* Google Play Billing (2026-11-27): ilovada tarif obunasi Google Play orqali sotiladi.
   js/plans.js → DezoBilling.products() / buy() / owned().
   Xarid serverda tekshiriladi va tasdiqlanadi (server.js → /api/play/verify): server tasdiqlamasa,
   Google 3 kunda pulni o'zi qaytaradi — tekshirilmagan xarid tarif bermaydi.
   Mahsulotlar Play Console'da: obunalar dezomax_standard, dezomax_premium; asosiy rejalar monthly, yearly. */
@CapacitorPlugin(name = "DezoBilling")
public class BillingPlugin extends Plugin {
    private BillingClient client;
    private final Map<String, ProductDetails> details = new HashMap<>();
    private PluginCall pendingBuy;

    @Override
    public void load() {
        client = BillingClient.newBuilder(getContext())
            .setListener((result, purchases) -> onPurchases(result, purchases))
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .enableAutoServiceReconnection()
            .build();
    }

    private interface Ready { void run(); }

    private void connected(PluginCall call, Ready then) {
        if (client.isReady()) { then.run(); return; }
        client.startConnection(new BillingClientStateListener() {
            @Override public void onBillingSetupFinished(BillingResult r) {
                if (r.getResponseCode() == BillingClient.BillingResponseCode.OK) then.run();
                else call.reject("unavailable", String.valueOf(r.getResponseCode()));
            }
            @Override public void onBillingServiceDisconnected() {}
        });
    }

    /* {ids: ['dezomax_standard', ...]} → mahsulotlar, har birining rejalari va Google ko'rsatadigan narxi */
    @PluginMethod
    public void products(PluginCall call) {
        JSArray ids = call.getArray("ids");
        if (ids == null || ids.length() == 0) { call.reject("no_ids"); return; }
        connected(call, () -> {
            List<QueryProductDetailsParams.Product> list = new ArrayList<>();
            try {
                for (int i = 0; i < ids.length(); i++) list.add(QueryProductDetailsParams.Product.newBuilder()
                    .setProductId(ids.getString(i)).setProductType(BillingClient.ProductType.SUBS).build());
            } catch (Exception e) { call.reject("bad_ids"); return; }
            client.queryProductDetailsAsync(QueryProductDetailsParams.newBuilder().setProductList(list).build(), (r, res) -> {
                if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) { call.reject("query_failed", String.valueOf(r.getResponseCode())); return; }
                JSArray out = new JSArray();
                for (ProductDetails pd : res.getProductDetailsList()) {
                    details.put(pd.getProductId(), pd);
                    JSArray plans = new JSArray();
                    List<ProductDetails.SubscriptionOfferDetails> offers = pd.getSubscriptionOfferDetails();
                    if (offers != null) for (ProductDetails.SubscriptionOfferDetails o : offers) {
                        if (o.getOfferId() != null) continue;              // faqat asosiy reja (aksiyalarsiz)
                        List<ProductDetails.PricingPhase> ph = o.getPricingPhases().getPricingPhaseList();
                        ProductDetails.PricingPhase last = ph.get(ph.size() - 1);
                        JSObject p = new JSObject();
                        p.put("basePlan", o.getBasePlanId());
                        p.put("price", last.getFormattedPrice());
                        p.put("micros", last.getPriceAmountMicros());
                        p.put("currency", last.getPriceCurrencyCode());
                        p.put("period", last.getBillingPeriod());
                        plans.put(p);
                    }
                    JSObject o = new JSObject();
                    o.put("id", pd.getProductId());
                    o.put("plans", plans);
                    out.put(o);
                }
                JSObject ret = new JSObject();
                ret.put("products", out);
                call.resolve(ret);
            });
        });
    }

    /* {product, basePlan, account} → Google to'lov oynasi; natija: {productId, purchaseToken} */
    @PluginMethod
    public void buy(PluginCall call) {
        String id = call.getString("product"), base = call.getString("basePlan"), acct = call.getString("account");
        ProductDetails pd = id == null ? null : details.get(id);
        if (pd == null) { call.reject("unknown_product"); return; }
        if (pendingBuy != null) { call.reject("busy"); return; }
        String token = null;
        List<ProductDetails.SubscriptionOfferDetails> offers = pd.getSubscriptionOfferDetails();
        if (offers != null) for (ProductDetails.SubscriptionOfferDetails o : offers)
            if (o.getOfferId() == null && o.getBasePlanId().equals(base)) token = o.getOfferToken();
        if (token == null) { call.reject("unknown_plan"); return; }
        final String offerToken = token;
        connected(call, () -> {
            List<BillingFlowParams.ProductDetailsParams> items = new ArrayList<>();
            items.add(BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(pd).setOfferToken(offerToken).build());
            BillingFlowParams.Builder b = BillingFlowParams.newBuilder().setProductDetailsParamsList(items);
            if (acct != null && !acct.isEmpty()) b.setObfuscatedAccountId(acct);
            pendingBuy = call;
            getActivity().runOnUiThread(() -> {
                BillingResult r = client.launchBillingFlow(getActivity(), b.build());
                if (r.getResponseCode() != BillingClient.BillingResponseCode.OK && pendingBuy != null) {
                    pendingBuy.reject(r.getResponseCode() == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED ? "owned" : "launch_failed");
                    pendingBuy = null;
                }
            });
        });
    }

    private void onPurchases(BillingResult r, List<Purchase> purchases) {
        PluginCall call = pendingBuy;
        pendingBuy = null;
        if (call == null) return;
        int code = r.getResponseCode();
        if (code == BillingClient.BillingResponseCode.USER_CANCELED) { call.reject("canceled"); return; }
        if (code != BillingClient.BillingResponseCode.OK || purchases == null || purchases.isEmpty()) { call.reject("failed", String.valueOf(code)); return; }
        Purchase p = purchases.get(0);
        JSObject o = purchaseJson(p);
        if (p.getPurchaseState() == Purchase.PurchaseState.PENDING) o.put("pending", true);
        call.resolve(o);
    }

    /* Telefondagi Google akkauntda faol obunalar — boshqa qurilmada sotib olinganini tiklash uchun */
    @PluginMethod
    public void owned(PluginCall call) {
        connected(call, () -> client.queryPurchasesAsync(
            QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.SUBS).build(), (r, list) -> {
                if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) { call.reject("query_failed"); return; }
                JSArray out = new JSArray();
                for (Purchase p : list) if (p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) out.put(purchaseJson(p));
                JSObject ret = new JSObject();
                ret.put("purchases", out);
                call.resolve(ret);
            }));
    }

    private JSObject purchaseJson(Purchase p) {
        JSObject o = new JSObject();
        o.put("productId", p.getProducts().isEmpty() ? "" : p.getProducts().get(0));
        o.put("purchaseToken", p.getPurchaseToken());
        o.put("acknowledged", p.isAcknowledged());
        o.put("autoRenewing", p.isAutoRenewing());
        return o;
    }
}
