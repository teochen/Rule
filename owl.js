let obj = JSON.parse($response.body);

// 修改所有主要产品定义
obj.products = obj.products.map(product => {
  return {
    store_product: {
      store: "APP_STORE",
      product_identifier: "app.vogelhaus.owl.pro.lifetime"
    },
    sw_composite_product_id: "app.vogelhaus.owl.pro.lifetime",
    entitlements: []
  }
});

// 修改paywall responses中的所有产品引用
obj.paywall_responses = obj.paywall_responses.map(paywall => {
  // 清除本地通知
  paywall.local_notifications = [];
  
  // 修改访问条件
  paywall.presentation_condition = "NON_GATED";
  paywall.feature_gating = "NON_GATED";
  
  // 修改products和products_v2中的所有产品引用
  if (paywall.products) {
    paywall.products = paywall.products.map(product => ({
      product_id: "app.vogelhaus.owl.pro.lifetime",
      product: "primary",
      productId: "app.vogelhaus.owl.pro.lifetime",
      product_id_android: "app.vogelhaus.owl.pro.lifetime"
    }));
  }
  
  if (paywall.products_v2) {
    paywall.products_v2 = paywall.products_v2.map(product => ({
      sw_composite_product_id: "app.vogelhaus.owl.pro.lifetime",
      entitlements: [],
      store_product: {
        store: "APP_STORE",
        product_identifier: "app.vogelhaus.owl.pro.lifetime"
      },
      reference_name: "lifetime"
    }));
  }
  
  return paywall;
});

// 清除触发器选项
obj.trigger_options = [];

// 清除产品标识符组
obj.product_identifier_groups = [];

// 禁用详细事件记录
if (obj.toggles) {
  obj.toggles = obj.toggles.map(toggle => {
    if (toggle.key === "disable_verbose_events") {
      toggle.enabled = true;
    }
    return toggle;
  });
}

$done({body: JSON.stringify(obj)});
