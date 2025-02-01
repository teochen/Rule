// 修改请求头中的订阅状态
let headers = $request.headers;
headers['x-subscription-status'] = 'ACTIVE';

// 构造新的响应体
let body = {
  "trigger_options": [],
  "toggles": [
    {
      "key": "disable_verbose_events",
      "enabled": true
    }
  ],
  "app_session_timeout_ms": 3600000,
  "tests": {"dns_resolution": []},
  "product_identifier_groups": [],
  "localization": {"locales": []},
  "build_id": "custom-response",
  "postback": {
    "delay": 5000,
    "products": []
  },
  "log_level": 10,
  "paywall_responses": [],
  "disable_preload": {
    "all": true,
    "triggers": []
  },
  "products": [
    {
      "sw_composite_product_id": "app.vogelhaus.owl.pro.lifetime",
      "store_product": {
        "store": "APP_STORE",
        "product_identifier": "app.vogelhaus.owl.pro.lifetime"
      },
      "entitlements": ["PRO_ACCESS"],
      "is_active": true,
      "is_lifetime": true,
      "purchase_date": "2024-01-01T00:00:00Z"
    }
  ],
  "attribution_options": {
    "apple_search_ads": {
      "enabled": false
    }
  },
  "ts": Date.now(),
  "paywalls": [],
  "subscription_status": {
    "is_active": true,
    "is_lifetime": true,
    "product_id": "app.vogelhaus.owl.pro.lifetime",
    "purchase_date": "2024-01-01T00:00:00Z",
    "expires_date": null,
    "is_trial": false
  }
};

// 构造新的响应
const response = {
    status: 200,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-subscription-status': 'ACTIVE',
        'x-is-lifetime': 'true'
    },
    body: JSON.stringify(body)
};

// 返回修改后的响应
$done(response); 
