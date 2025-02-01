let obj = JSON.parse($response.body);

// 修改所有产品为终身订阅
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

// 移除所有本地通知和试用期提醒
obj.paywall_responses = obj.paywall_responses.map(paywall => {
  paywall.local_notifications = [];
  paywall.presentation_condition = "NON_GATED";
  return paywall;
});

// 禁用所有触发器
obj.trigger_options = [];

// 移除所有产品组
obj.product_identifier_groups = [];

$done({body: JSON.stringify(obj)});
