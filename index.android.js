/**
 * React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry
    } from 'react-native';

// 将主要入口逻辑放至ANDROID专用目录内，方便管理
var MyReact = require('./src/android/app');

// 注册组件
AppRegistry.registerComponent('MyReact', () => MyReact);