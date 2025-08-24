/*
衣橱管家内购解锁脚本
使用方法：
[rewrite_local]
^https://closet\.jinjian\.tech/api/v3/user url script-response-body https://raw.githubusercontent.com/teochen/Rule/refs/heads/main/jinjiantest.js
[mitm]
hostname = closet.jinjian.tech
*/

// 添加调试日志
console.log("脚本开始执行");
console.log("原始响应:", $response.body);

try {
    // 解析响应数据
    let body = JSON.parse($response.body);
    console.log("解析后的数据:", JSON.stringify(body));
    
    // 修改会员状态
    if (body && body.data) {
        console.log("开始修改数据");
        
        // 设置为永久会员
        body.data.type = "studio.2players.wardrobe.pro.lifetime";
        body.data.type_text = "永久会员";
        body.data.expired_at = "2099-09-09";
        body.data.apple_app_store_auto_renew = true;
        
        // 确保有原始购买日期
        if (!body.data.original_purchase_date_ms) {
            body.data.original_purchase_date_ms = "1663136602000";
        }
        
        console.log("修改后的数据:", JSON.stringify(body));
    } else {
        console.log("数据结构异常:", body);
    }
    
    // 返回修改后的数据
    $done({
        body: JSON.stringify(body)
    });
    
} catch (error) {
    console.log("脚本执行错误:", error);
    // 如果出错，返回原始数据
    $done({
        body: $response.body
    });
}
