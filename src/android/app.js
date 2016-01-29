'use strict';

import React, {
    Navigator,
    Component
    } from 'react-native';

// 子页面
let SearchResult    = require('./scenes/SearchResult');
let SearchPage      = require('./scenes/SearchPage');
let SearchDetail    = require('./scenes/SearchDetail');
let SearchConfig    = require('./core/CoreConfig');

class MyReact extends Component {

    /**
     * 路由导航逻辑
     * @param route
     * @param navigator
     * @returns {*}
     */
    renderScene (route, navigator) {
        var view;
        switch(route.name){
            case SearchConfig.SEARCH_RESULT_VIEW:
                view = (<SearchResult route={route} navigator={navigator} />);
                break;
            case SearchConfig.SEARCH_PAGE_VIEW:
                view = (<SearchPage route={route} navigator={navigator} />);
                break;
            case SearchConfig.SEARCH_DETAIL_VIEW:
                view = (<SearchDetail route={route} navigator={navigator} />);
                break;
            default:
                view = null;
                break;
        }
        return view;
    }

    /**
     * 启动设置默认页
     * @returns {XML}
     */
    render() {
        return (
            <Navigator
                initialRoute={{ name: SearchConfig.SEARCH_PAGE_VIEW }}
                renderScene={this.renderScene}>
            </Navigator>
        );
    }
}

module.exports = MyReact;