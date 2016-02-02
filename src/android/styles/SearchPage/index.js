'use strict';
import React, { StyleSheet } from 'react-native';

/**
 * 定义样式
 */
const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 20,
        alignItems: 'center'
    },
    erroContainer: {
        marginBottom: 1,
        backgroundColor: '#c0ff00',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#8bb900',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row'
    },
    errorText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#2b3900'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'
    },
    buttonTextSearch: {
        marginLeft: 4,
        marginRight: 4
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});

module.exports = styles;