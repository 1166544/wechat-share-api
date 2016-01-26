'use strict';

import React, {
    Navigator,
    Component
    } from 'react-native';

var TaskList = require('./scenes/TaskList');
var TaskCreate = require('./scenes/TaskCreate');
var TaskView = require('./scenes/TaskView');

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
            case 'TaskList':
                view = (<TaskList route={route} navigator={navigator} />);
                break;
            case 'TaskCreate':
                view = (<TaskCreate route={route} navigator={navigator} />);
                break;
            case 'TaskView':
                view = (<TaskView route={route} navigator={navigator} />);
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
                initialRoute={{ name: 'TaskCreate' }}
                renderScene={this.renderScene}>
            </Navigator>
        );
    }
}

module.exports = MyReact;