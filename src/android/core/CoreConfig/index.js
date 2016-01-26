'use strict';

import React, {
    Component
    } from 'react-native';

class CoreConfig extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<View />);
    }

}

/** 搜索结果页面 */
const SEARCH_RESULT_VIEW = 'SearchResult';

/** 搜索页面 */
const SEARCH_PAGE_VIEW = 'SearchPage';

/** 搜索结果详细页面 */
const SEARCH_DETAIL_VIEW = 'SearchDetail';

module.exports = CoreConfig