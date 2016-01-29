'use strict';

import React, {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    Component
    } from 'react-native';

let styles = require('../../styles/SearchResult');

class SearchResult extends Component {

    constructor(props) {
        super(props);
        var dataChange = {rowHasChanged: (r1, r2) => r1.guid !== r2.guid};
        //var dataChange = true;
        var dataSource = new ListView.DataSource(dataChange);
        this.state = { dataSource: dataSource.cloneWithRows(this.props.route.params.listings) };
    }

    /**
     * 行数据项按下处理
     * @param propertyGuid
     */
    rowPressed(propertyGuid) {
        var property = this.props.listings.filter(prop => prop.guid === propertyGuid[0]);

        //this.propps.navigator.push({
        //    title: 'Property',
        //    component: PropertyView,
        //    passProps: {property: property}
        //});
        this.props.navigator.push({
            name: 'SearchDetail',
            params: {property: property}
        });
    }

    /**
     * 渲染行
     * @param rowData
     * @param sectionID
     * @param rowID
     */
    renderRow(rowData, sectionID, rowID){
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }
}

module.exports = SearchResult;
