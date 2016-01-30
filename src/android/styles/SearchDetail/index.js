'use strict';

import React, { StyleSheet } from 'react-native';

/**
 * 定义样式
 */
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 56,
        backgroundColor: '#999999'
    },
    heading: {
        backgroundColor: '#f8f8f8'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    image: {
        width: 400,
        height: 300
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48bbec'
    },
    title: {
        fontSize: 20,
        margin: 5,
        color: '#656565'
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    }
});

module.exports = styles;