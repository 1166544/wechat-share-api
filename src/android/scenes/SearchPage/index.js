'use strict';

import React, {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Image,
    Component
} from 'react-native';

let SearchResult = require('../SearchResult');
let styles       = require('../../styles/SearchPage');
let SearchConfig = require('../../core/CoreConfig');

class SearchPage extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: '',
            showError: false
        };
    }

    /**
     * HTTP返回处理
     * @param response
     * @private
     */
    _handleResponse(response) {
        this.setState({isLoading: false});
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log(response);
            this.props.navigator.push({
                name: SearchConfig.SEARCH_RESULT_VIEW,
                component: SearchResult,
                params: {
                    listings: response.listings,
                    title: 'Property of: ' + this.state.searchString
                }
            });
        } else {
            this.setState({message: 'Location error plaese try again.'});
        }
    }

    /**
     * 执行查询
     * @param query
     * @private
     */
    _executeQuery(query) {
        if (this.state.isLoading) return;
        this.setState({isLoading: true, message: 'Loading.. please wait.'});
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error => {
                this.setState({isLoading: false, message: 'Something bad happend ' + error});
            });
    }

    /**
     * 搜索按钮按下处理
     */
    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }

    /**
     * 定位按钮按下处理
     */
    onLocationPressed() {
        console.log('onLocationPressed');
        navigator.geolocation.getCurrentPosition(
            location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({searchString: search});
                var query = urlForQueryAndPage('center_point', search, 1);
                this._executeQuery(query);
            },
            error => {
                this.setState({showError: true, message: 'There was a problem with obtaining your location: ' + error});
                this.timer = setTimeout(
                    () => {
                        this.timer && clearTimeout(this.timer);
                        this.setState({showError: false, message: ''});
                    },
                    2000
                );
            }
        );
    }

    /**
     * 搜索框文本更改处理
     * @param event
     */
    onSearchTextChanged(event) {
        // console.log('onSearchTextChanged: ' + event.nativeEvent.text);
        this.setState({searchString: event.nativeEvent.text});
    }

    /**
     * 渲染逻辑
     */
    render() {

        var spinner = this.state.showError || this.state.isLoading ?
            (<View style={styles.erroContainer}>
                <Text style={styles.errorText}>{this.state.message}</Text>
            </View>)
            :
            (<View/>);

        return (
            <View>

                {spinner}

                <View style={styles.container}>
                    <Text style={styles.description}>Search for house to buy!</Text>
                    <Text style={styles.description}>Search by place-name, postcode or search near your location.</Text>
                    <View style={styles.flowRight}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder='Search via name or postcode'
                            value={this.state.searchString}
                            onChange={this.onSearchTextChanged.bind(this)}/>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor='#99d9f4'
                            onPress={this.onSearchPressed.bind(this)}>
                            <Text style={[styles.buttonText, styles.buttonTextSearch]}>SEARCH</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.onLocationPressed.bind(this)}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                    <Image source={require('../../images/house.png')} style={styles.image}/>
                </View>
            </View>
        );
    }
}

/**
 * 定义FETCH服务,http.get()
 * @param key
 * @param value
 * @param pageNumber
 * @returns {string}
 */
function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');
    return 'http://api.nestoria.co.uk/api?' + querystring;
}

module.exports = SearchPage;