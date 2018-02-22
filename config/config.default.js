'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
    const config = {};

    // 静态资源目录
    config.sources = 'public';

    // 项目名 
    config.keys = appInfo.name + 'wechat share api';

    // 微信API
    config.weChatApi = {
        serverUrl: 'https://api.weixin.qq.com'
    };

    // 微信分享签名配置
    config.weChatShare = {
        appId: 'your app id',
        appsecret: 'you app scret',
    }

    // 模板
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
            '.html': 'nunjucks',
        },
    };

    // 模版配置默认关闭过滤
    config.nunjucks = {
        autoescape: false,
    };

    // CSRF
    config.security = {
        domainWhiteList: ['.yourdomain.com', 'localhost'],
        csrf: {
            queryName: '_csrf',
            bodyName: '_csrf',
            headerName: 'x-csrf-token',
            ignore: [
                '/api/service/getWeChatSignature',
            ]
        },
        ctoken: true,
        xframe: {
            enable: true,
            value: 'ALLOW-FROM https://tongji.baidu.com/,https://web.umeng.com/'
        },
    };
    
    config.oss = {
        useAgent: true,
    };

    // 静态服务目录
    config.static = {
        prefix: `/${config.sources}/`,
        dir: path.join(appInfo.baseDir, `app/${config.sources}`),
        dynamic: true,
        preload: false,
        buffer: false,
        maxFiles: 1000,
    };

    return config;
};