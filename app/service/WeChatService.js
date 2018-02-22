'use strict';
const md5 = require('md5');
const config = require('../engine/ConfigEngine');
const codeEngine = require('../engine/CodeEngine');
const SIGN = 'sign';

const NONCE_NUM = 10000;
const COOKIE = 'cookie';
const SHORTEST_LENGTH = 3;

module.exports = (app) => {

    /**
     * 微信API
     */
    class WeChatService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.channle = 'weChatApi';
            this.config = this.ctx.app.config[this.channle];
        }

        /**
         * request api
         * @param {String} api - Api name
         * @param {Object} [opts] - urllib options
         * @return {Promise} response.data
         */
        * request(api, opts, key) {
            const startTime = Date.now();
            let resultBuffer = '';
            let requestUrl = '';

            this.serverUrl = this.config.serverUrl;
            if (opts.dataType === config.JSONP) {
                // JSONP解释
                let paramsStr = '';

                for (const keyOpts in opts.data) {
                    if (keyOpts !== config.DataType && keyOpts !== config.JSONP_CALLBACK) {
                        paramsStr += opts.data[keyOpts];
                    }
                }

                const options = Object.assign({
                    timeout: [config.TIME_OUT, config.TIME_OUT],
                }, opts);

                options.encrypt = true;
                if (opts.encrypt !== undefined) {
                    opts.encrypt = Boolean(opts.encrypt);
                    options.encrypt = opts.encrypt;
                }
                if (options.encrypt) {
                    const nonceStr = Math.floor(Math.random() * NONCE_NUM).toString();
                    const sign = md5(paramsStr + nonceStr + this.ctx.app.config.ssoKey);

                    opts.data.nonceStr = nonceStr;
                    opts.data.sign = sign;
                }

                options.dataType = opts.dataType;
                options.jsonpCallback = 'typeCall';
                if (opts.jsonpCallback) {
                    options.jsonpCallback = opts.jsonpCallback;
                }

                requestUrl = `${this.serverUrl}/${api}`;

                // JSON转换
                try {
                    const result = yield this.ctx.curl(requestUrl, options);

                    resultBuffer = result.data.toString();
                    resultBuffer = resultBuffer.replace(options.jsonpCallback + '(', '');
                    if (resultBuffer.length > SHORTEST_LENGTH) {
                        let lastBuffer = resultBuffer.charAt(resultBuffer.length - 1);

                        if (lastBuffer.indexOf(';') !== -1) {
                            resultBuffer = resultBuffer.slice(0, resultBuffer.length - 1);
                            lastBuffer = resultBuffer.charAt(resultBuffer.length - 1);
                        }

                        if (lastBuffer.indexOf(')') !== -1) {
                            resultBuffer = resultBuffer.slice(0, resultBuffer.length - 1);
                        }

                    }
                    resultBuffer = JSON.parse(resultBuffer);

                } catch (e) {
                    console.log(e);
                }


            } else if (opts.dataType === config.FORM) {
                //  FORM解释
                let options = null;
                let result = '';

                if (opts.method === config.GET) {
                    options = Object.assign({
                        contentType: config.FORM_CONTENT_TYPE,
                        method: config.GET
                    }, opts);
                } else {
                    options = Object.assign({
                        dataType: config.JSON,
                        contentType: config.FORM_CONTENT_TYPE,
                        method: config.POST,
                        timeout: [config.TIME_OUT, config.TIME_OUT],
                    }, opts);
                }

                requestUrl = `${this.serverUrl}/${api}`;

                // JSON转换
                try {
                    result = yield this.ctx.curl(requestUrl, options);
                    resultBuffer = result.data;
                    resultBuffer = result.data.toString();
                    if (opts.parseJSON) {
                        resultBuffer = JSON.parse(resultBuffer);
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                //  JSON解释
                let options = null;
                let result = '';

                if (opts.method === config.GET) {
                    options = Object.assign({
                        contentType: config.JSON,
                        method: config.GET
                    }, opts);
                } else {
                    options = Object.assign({
                        dataType: config.JSON,
                        contentType: config.JSON,
                        method: config.POST,
                        timeout: [config.TIME_OUT, config.TIME_OUT],
                    }, opts);
                }

                requestUrl = `${this.serverUrl}/${api}`;

                // JSON转换
                try {
                    result = yield this.ctx.curl(requestUrl, options);
                    resultBuffer = result.data;
                    if (opts.method === config.GET) {
                        resultBuffer = result.data.toString();
                        if (opts.parseJSON) {
                            resultBuffer = JSON.parse(resultBuffer);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }

            }

            return resultBuffer;
        }

        // ========================================== 业务接口 =================================

        /**
         * 获取access_token
         * @param {*} appId 
         * @param {*} appsecret 
         */
        * getAccessToken(appId, appsecret) {
            const requestUrl = `cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`;
            const paramsData = {};
            const result = yield this.request(requestUrl, {
                data: paramsData,
                type: 'get'
            });

            return result;
        }

        /**
         * 获取JS API TICKET
         * @param {*} accessToken 
         */
        * getJsApiTicket(accessToken) {
            const requestUrl = `cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
            const paramsData = {};
            const result = yield this.request(requestUrl, {
                data: paramsData,
                type: 'get'
            });

            return result;
        }
    }

    return WeChatService;
};