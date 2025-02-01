let obj = JSON.parse($response.body);

// 定义一个完整的终身会员产品
const lifetimeProduct = {
  store_product: {
    store: "APP_STORE",
    product_identifier: "app.vogelhaus.owl.pro.lifetime"
  },
  sw_composite_product_id: "app.vogelhaus.owl.pro.lifetime",
  entitlements: [{
    identifier: "pro_features",
    active: true,
    expires_date: null
  }]
};

// 替换主产品列表
obj.products = [lifetimeProduct];

// 修改所有paywall响应
obj.paywall_responses = obj.paywall_responses.map(paywall => {
  return {
    ...paywall,
    presentation_condition: "ALWAYS_SKIP", // 更改为始终跳过
    feature_gating: "NON_GATED",
    presentation_style: "NONE", // 禁用展示
    presentation_style_v2: "NONE",
    launch_option: "SKIP", // 跳过启动选项
    on_device_cache: "DISABLED", // 禁用缓存
    local_notifications: [],
    products: [{
      product_id: "app.vogelhaus.owl.pro.lifetime",
      product: "primary",
      productId: "app.vogelhaus.owl.pro.lifetime",
      product_id_android: "app.vogelhaus.owl.pro.lifetime",
      active: true,
      expires_date: null
    }],
    products_v2: [lifetimeProduct],
    surveys: [],
    dismissal_option: "SKIP",
    is_scroll_enabled: false,
    reroute_back_button: "DISABLED"
  };
});

// 完全禁用触发器
obj.trigger_options = [];

// 禁用产品组
obj.product_identifier_groups = [];

// 禁用所有预加载
obj.disable_preload = {
  all: true,
  triggers: []
};

// 设置会话超时为最大值
obj.app_session_timeout_ms = Number.MAX_SAFE_INTEGER;

// 禁用所有测试
obj.tests = {
  dns_resolution: []
};

// 清除所有paywalls
obj.paywalls = [];

// 添加额外的控制标志
obj.toggles = [{
  key: "disable_verbose_events",
  enabled: true
}, {
  key: "disable_paywalls",
  enabled: true
}, {
  key: "force_pro_access",
  enabled: true
}];

// 设置构建ID为永久版本
obj.build_id = "LIFETIME_PRO_ACCESS";

$done({body: JSON.stringify(obj)});
