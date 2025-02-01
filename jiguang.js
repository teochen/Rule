const response = {
  "request_date": new Date().toISOString(),
  "request_date_ms": Date.now(),
  "subscriber": {
    "entitlements": {
      "premium": {
        "expires_date": null,  // null 表示永不过期
        "grace_period_expires_date": null,
        "product_identifier": "lan.kylin.premium.lifetime", // 改为终身会员产品ID
        "purchase_date": "2024-01-01T00:00:00Z"
      }
    },
    "first_seen": "2024-01-01T00:00:00Z",
    "last_seen": new Date().toISOString(),
    "management_url": null,
    "non_subscriptions": {
      "lan.kylin.premium.lifetime": {  // 添加一次性购买
        "id": "lan.kylin.premium.lifetime",
        "is_sandbox": false,
        "original_purchase_date": "2024-01-01T00:00:00Z",
        "purchase_date": "2024-01-01T00:00:00Z",
        "store": "app_store"
      }
    },
    "original_app_user_id": "$RCAnonymousID:7931bfd5c6ca4f26bd2e5fc470c618fb",
    "original_application_version": "1",
    "original_purchase_date": "2024-01-01T00:00:00Z",
    "subscriptions": {}  // 清空订阅，因为是终身会员
  }
}

const handlers = {
  // 处理订阅状态请求
  'subscribers/(.+)$': response,
  
  // 处理商品列表请求
  'offerings$': {
    "offerings": [
      {
        "identifier": "default",
        "packages": [
          {
            "identifier": "$rc_lifetime",
            "platform_product_identifier": "lan.kylin.premium.lifetime"
          }
        ]
      }
    ]
  }
}

const url = $request.url
let body = null

for (const path in handlers) {
  if (new RegExp(path).test(url)) {
    body = JSON.stringify(handlers[path])
    break
  }
}

if (body) {
  $done({ body })
} else {
  $done({})
} 
