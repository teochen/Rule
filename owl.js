let obj = JSON.parse($response.body);

// 完全替换所有产品为终身会员
const lifetimeProduct = {
  store_product: {
    store: "APP_STORE",
    product_identifier: "app.vogelhaus.owl.pro.lifetime"
  },
  sw_composite_product_id: "app.vogelhaus.owl.pro.lifetime",
  entitlements: []
};

// 替换主产品列表
obj.products = [lifetimeProduct];

// 修改所有paywall响应
obj.paywall_responses = obj.paywall_responses.map(paywall => {
  return {
    ...paywall,
    presentation_condition: "NON_GATED",
    feature_gating: "NON_GATED",
    local_notifications: [],
    products: [{
      product_id: "app.vogelhaus.owl.pro.lifetime",
      product: "primary",
      productId: "app.vogelhaus.owl.pro.lifetime",
      product_id_android: "app.vogelhaus.owl.pro.lifetime"
    }],
    products_v2: [lifetimeProduct],
    surveys: [],
    dismissal_option: "NORMAL",
    launch_option: "EXPLICIT"
  };
});

// 清除所有触发器
obj.trigger_options = [];

// 清除产品组
obj.product_identifier_groups = [];

// 禁用预加载
obj.disable_preload = {
  all: true,
  triggers: []
};

// 设置日志级别为最低
obj.log_level = 0;

// 清除所有测试
obj.tests = {
  dns_resolution: []
};

// 移除所有paywalls
obj.paywalls = [];

$done({body: JSON.stringify(obj)});
