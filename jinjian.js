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
                // 递归处理嵌套对象
                modifyObject(obj[key]);
            } else {
                // 使用原混淆脚本中的确切值
                if (key === 'type') {
                    obj[key] = 'studio.2players.wardrobe.pro.lifetime';
                }
                if (key === 'type_text') {
                    obj[key] = '永久会员';
                }
                if (key === 'expired_at') {
                    obj[key] = '2099-09-09';
                }
                // 确保自动续订为true
                if (key === 'apple_app_store_auto_renew') {
                    obj[key] = true;
                }
            }
        }
    }
}

modifyObject(body);
$done({ 'body': JSON.stringify(body) });
