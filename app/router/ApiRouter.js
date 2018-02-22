/**
 * 互动H5路由表
 */
module.exports = (app) => {

    // 微信分享签名
    app.post('/api/service/getWeChatSignature', app.controller.api.index.index.getWeChatSignature);
    
};