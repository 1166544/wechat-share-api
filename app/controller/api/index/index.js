'use strict';

const sha1 = require('sha1');
const TOKEN_KEY = 'montage_token';
const SIGNATURE_KEY = 'montage_signature';
const SECOND_UNION = 1000;

module.exports = (app) => {

    class ApiIndexController extends app.Controller {

        /**
         * 获取微信分享信息
         * 用户创建时间戳，随机字符串，当前需要分享的页面的url三个变量，接着将自己的appid和APPsecret作为请求参数获取access_token，
         * 再根据access_token获取jsapi_ticket, 然后将获取的jsapi_ticket，
         * 以及自己创建的三个变量进行签名，注意签名过程案按照 key 值 ASCII 码升序排序
         */
        * getWeChatSignature() {
            const requestBody = this.ctx.request.body;
            const link = this.utf8ToNative(requestBody.link) || 'https://mp.yourdomain.com/montage/index.html';
            const imgUrl = this.utf8ToNative(requestBody.imgUrl) || 'https://mp.yourdomain.com/montage/images/cover.jpg';
            const title = this.utf8ToNative(requestBody.title) || '什么鬼！这也要收钱！';
            const desc = this.utf8ToNative(requestBody.desc) || '那些你以为你知道其实你不知道的值钱的东西。。。';
            const appId = app.config.weChatShare.appId;
            const appsecret = app.config.weChatShare.appsecret;
            const timestamp = this.getTimeSnap();
            const nonceStr = this.getNoncestr();

            let signature = '';
            let cacheTokenData = '';
            let accessTokenData = '';
            let cacheApiTicketData = '';
            let jsApiTicket = '';

            // 获取TOKEN和签名
            accessTokenData = yield this.ctx.service.weChatService.getAccessToken(appId, appsecret);

            // 获取TICKET
            if (accessTokenData && accessTokenData.access_token) {

                jsApiTicket = yield this.ctx.service.weChatService.getJsApiTicket(accessTokenData.access_token);
                if (jsApiTicket && jsApiTicket.ticket) {
                    // console.log('jsapi_ticket:: ', jsApiTicket.ticket);
                    // console.log('nonceStr:: ', nonceStr);
                    // console.log('timestamp:: ', timestamp);
                    // console.log('link:: ', link);
                    signature = this.generateSignature(nonceStr, jsApiTicket.ticket, timestamp, link);
                    // console.log('signature:: ', signature);
                }
            }

            const wxAccountInfo = {
                appId,      // 微信appid  
                timestamp,  // 时间戳  
                nonceStr,   // 随机字符串  
                signature,  // 签名 
            };

            const wxShareInfo = {
                imgUrl,     // 分享显示的缩略图地址  
                link,       // 分享地址  
                desc,       // 分享描述  
                title,      // 分享标题  
            };

            this.ctx.body = {
                code: 200,
                message: '请求成功',
                data: {
                    wxAccountInfo,
                    wxShareInfo
                }
            };
        }

        /**
         * UTF-8转码
         * @param {*} code 
         */
        utf8ToNative(code) {
            if (!code) {
                return '';
            }
            
            return unescape(code.replace(/&#x/g, '%u').replace(/;/g, ''));
        }

        /**
         * 获取签名,参数的顺序要按照 key 值 ASCII 码升序排序  
         */
        generateSignature(nocestr, ticket, timestamp, url) {
            const signature = `jsapi_ticket=${ticket}&noncestr=${nocestr}&timestamp=${timestamp}&url=${url}`;
            // console.log('signatureUrl:: ', signature);
            
            return sha1(signature);
        }

        /**
         * 获取nonstr
         */
        getNoncestr() {
            const STR_LENGTH = 16;
            const MAX_LENGTH = 10;
            const str = 'wCRVEhXMI4vysBmL0jBpQrW3aokRmEpP';
            let val = '';

            for (let i = 0; i < STR_LENGTH; i++) {
                val += str.substr(Math.round(Math.random() * MAX_LENGTH), 1);
            }

            return val;
        }

        /**
         * 获取时间截
         */
        getTimeSnap() {
            return Math.round(Date.now() / SECOND_UNION);
        }

        /**
         * 记录分享日志
         */
        * updateStatusLog() {
            const requestBody = this.ctx.request.body;
            
            try {
                if (requestBody) {
                    app.info(`WeChat Log..${JSON.stringify(requestBody)}`);
                }
            } catch (e) {
                app.info('JSON_ERROR ' + e.message);
            }

            this.ctx.body = {
                code: 200,
                message: '请求成功',
                data: requestBody
            };
        }

    }

    return ApiIndexController;

};