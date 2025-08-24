/*
衣橱管家内购解锁脚本
使用方法：
[rewrite_local]
^https://closet\.jinjian\.tech/api/v3/user url script-response-body https://raw.githubusercontent.com/yourusername/jinjianyigui.js
[mitm]
hostname = closet.jinjian.tech
*/

// 解析响应数据
let body = JSON.parse($response.body);

// 修改会员状态
if (body.data) {
    // 设置为永久会员
    body.data.type = "studio.2players.wardrobe.pro.lifetime";
    body.data.type_text = "永久会员";
    body.data.expired_at = "2099-09-09";
    body.data.apple_app_store_auto_renew = true;
    
    // 确保有原始购买日期
    if (!body.data.original_purchase_date_ms) {
        body.data.original_purchase_date_ms = "1663136602000";
    }
}

// 返回修改后的数据
$done({
    body: JSON.stringify(body)
});
