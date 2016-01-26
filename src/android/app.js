'use strict';

import React, {
    Navigator,
    Component
    } from 'react-native';

// 子页面
var SearchResult    = require('./scenes/SearchResult');
var SearchPage      = require('./scenes/SearchPage');
var SearchDetail    = require('./scenes/SearchDetail');
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
            case 'SearchResult':
                view = (<SearchResult route={route} navigator={navigator} />);
                break;
            case 'SearchPage':
                view = (<SearchPage route={route} navigator={navigator} />);
                break;
            case 'SearchDetail':
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
                initialRoute={{ name: 'SearchPage' }}
                renderScene={this.renderScene}>
            </Navigator>
        );
    }
}

module.exports = MyReact;