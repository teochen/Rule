/*
衣橱管家内购解锁脚本
使用方法：
[rewrite_local]
^https://closet\.jinjian\.tech/api/v3\.1/apple_app_store/resolve_receipt url script-response-body https://raw.githubusercontent.com/teochen/Rule/refs/heads/main/jinjian.js
[mitm]
hostname = closet.jinjian.tech
*/

// 解析响应数据
let body = JSON.parse($response.body);

function modifyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                modifyObject(obj[key]);
            } else {
                if (key === 'type') {
                    obj[key] = 'studio.2players.wardrobe.pro.lifetime';
                }
                if (key === 'type_text') {
                    obj[key] = '永久会员';
                }
                if (key === 'expired_at') {
                    obj[key] = '2099-09-09';
                }
                if (key === 'apple_app_store_auto_renew') {
                    obj[key] = true;
                }
            }
        }
    }
}

// 确保有必要的字段
if (body.data) {
    // 保持原有的购买时间戳
    if (!body.data.original_purchase_date_ms) {
        body.data.original_purchase_date_ms = "1663136602000";
    }
    
    // 可能需要的额外字段
    body.data.is_active = true;
    body.data.is_valid = true;
    body.data.status = "active";
}

modifyObject(body);
$done({ 'body': JSON.stringify(body) });
