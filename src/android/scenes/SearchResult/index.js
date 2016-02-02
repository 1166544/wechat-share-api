'use strict';

import React, {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    Component,
    ToolbarAndroid
} from 'react-native';

let styles       = require('../../styles/SearchResult');
let SearchConfig = require('../../core/CoreConfig');

class SearchResult extends Component {

    constructor(props) {
        super(props);
        var dataChange = {rowHasChanged: (r1, r2) => r1.guid !== r2.guid};
        var dataSource = new ListView.DataSource(dataChange);
        this.state = {dataSource: dataSource.cloneWithRows(this.props.route.params.listings)};
        // console.log(this.state);
    }

    /**
     * 行数据项按下处理
     * @param propertyGuid
     */
    rowPressed(propertyGuid) {

        var property = this.props.route.params.listings.filter(prop => prop.guid === propertyGuid)[0];
        this.props.navigator.push({
            name: SearchConfig.SEARCH_DETAIL_VIEW,
            params: {
                property: property,
                title: 'Detail: ' + property.title
            }
        });

    }

    /**
     * 渲染行
     * @param rowData
     * @param sectionID
     * @param rowID
     */
    renderRow(rowData, sectionID, rowID) {
        var price = rowData.price_formatted.split(' ')[0];

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)} underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: rowData.img_url }}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>${price}</Text>
                            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * 渲染
     * @returns {XML}
     */
    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar}
                                title={this.props.route.params.title}
                                navIcon={require('../../images/arrow_back.png')}
                                onIconClicked={this.props.navigator.pop}
                                titleColor={'#FFFFFF'}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }
}

module.exports = SearchResult;
