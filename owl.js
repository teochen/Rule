// 首先检查是否有响应体
if (!$response.body) {
    // 如果是304响应，我们需要构造一个新的响应
    const fakeResponse = {
        products: [{
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
        }],
        trigger_options: [],
        toggles: [{
            key: "disable_verbose_events",
            enabled: true
        }],
        app_session_timeout_ms: 3600000,
        tests: {
            dns_resolution: []
        },
        product_identifier_groups: [],
        localization: {
            locales: []
        },
        build_id: "LIFETIME_ACCESS",
        postback: {
            delay: 0,
            products: []
        },
        log_level: 0,
        paywall_responses: [],
        disable_preload: {
            all: true,
            triggers: []
        },
        attribution_options: {
            apple_search_ads: {
                enabled: false
            }
        },
        ts: Date.now(),
        paywalls: []
    };

    $done({
        body: JSON.stringify(fakeResponse),
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        status: 200
    });
} else {
    // 如果有响应体，使用之前的逻辑处理
    let obj = JSON.parse($response.body);
    
    // 定义终身会员产品
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

    // 替换所有产品
    obj.products = [lifetimeProduct];
    
    // 清除所有paywall响应
    obj.paywall_responses = [];
    
    // 禁用所有触发器
    obj.trigger_options = [];
    
    // 禁用产品组
    obj.product_identifier_groups = [];
    
    // 完全禁用预加载
    obj.disable_preload = {
        all: true,
        triggers: []
    };
    
    // 设置日志级别为最低
    obj.log_level = 0;
    
    // 移除所有paywalls
    obj.paywalls = [];

    $done({
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        status: 200
    });
}
