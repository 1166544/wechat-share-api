'use strict';

import React, {
    StyleSheet,
    Image,
    View,
    Text,
    Component,
    ScrollView
    } from 'react-native';

let styles = require('../../styles/SearchDetail');

class SearchDetail extends Component {

    render() {
        var property = this.props.route.params.property;
        var stats = property.bedroom_number + ' bed ' + property.property_type;
        if(property.bathroom_number) {
            stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
        }
        var price = property.price_formatted.split(' ')[0];
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: property.img_url}} />
                    <View style={styles.heading}>
                        <Text style={styles.price}>${price}</Text>
                        <Text style={styles.title}>${property.title}</Text>
                        <View style={styles.separator}></View>
                    </View>
                    <Text style={styles.description}>{stats}</Text>
                    <Text style={styles.description}>{property.summary}</Text>
                </View>
            </ScrollView>
        );
    }

}

module.exports =  SearchDetail;