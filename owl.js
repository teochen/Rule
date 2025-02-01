// 修改请求头中的订阅状态
let headers = $request.headers;
headers['x-subscription-status'] = 'ACTIVE';

// 构造新的响应体
let body = {
  "trigger_options": [],
  "toggles": [],
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
  "products": [],
  "attribution_options": {
    "apple_search_ads": {
      "enabled": false
    }
  },
  "ts": Date.now(),
  "paywalls": []
};

// 构造新的响应
const response = {
    status: 200,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body)
};

// 返回修改后的响应
$done(response);
