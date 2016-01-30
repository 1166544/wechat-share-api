'use strict';

import React, {
    Navigator,
    Component,
    BackAndroid
    } from 'react-native';

// 子页面
let SearchResult    = require('./scenes/SearchResult');
let SearchPage      = require('./scenes/SearchPage');
let SearchDetail    = require('./scenes/SearchDetail');
let SearchConfig    = require('./core/CoreConfig');

// 导航引用
let _navigator;

/**
 * 回退按钮按下处理
 */
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
    }
    _navigator.pop();
    return true;
})

class MyReact extends Component {

    /**
     * 路由导航逻辑
     * @param route
     * @param navigator
     * @returns {*}
     */
    renderScene (route, navigator) {
        _navigator = navigator;
        switch(route.name){
            case SearchConfig.SEARCH_RESULT_VIEW:
                return (<SearchResult route={route} navigator={navigator} />);
                break;
            case SearchConfig.SEARCH_PAGE_VIEW:
                return (<SearchPage route={route} navigator={navigator} />);
                break;
            case SearchConfig.SEARCH_DETAIL_VIEW:
                return (<SearchDetail route={route} navigator={navigator} />);
                break;
        }
    }

    /**
     * 启动设置默认页
     * @returns {XML}
     */
    render() {
        return (
            <Navigator
                tintColor='#FF6600'
                initialRoute={{ name: SearchConfig.SEARCH_PAGE_VIEW }}
                renderScene={this.renderScene}>
            </Navigator>
        );
    }
}

module.exports = MyReact;