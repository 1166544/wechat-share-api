'use strict';

const apiRouter = require('./router/ApiRouter');

module.exports = (app) => {

  // 互动H5项目-路由表
  apiRouter(app);

};