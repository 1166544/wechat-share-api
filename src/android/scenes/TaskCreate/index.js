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

class TaskCreate extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    /**
     * HTTP返回处理
     * @param response
     * @private
     */
    _handleResponse(response) {
        this.setState({ isLoading: false });
        if (response.application_response_code.substr(0, 1) === '1') {
            this.props.navigator.push({
                name: 'TaskList'
            });
        } else {
            this.setState({ message: 'Location error plaese try again.' });
        }
    }

    /**
     * 执行查询
     * @param query
     * @private
     */
    _executeQuery(query) {
        this.setState({isLoading: true, message: 'Loading.. please wait.'});
        fecth(query)
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
        navigator.geolocation.getCurrentPosition(
                location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({ searchString: search });
                var query = urlForQueryAndPage('center_point', search, 1);
                this._executeQuery(query);
            },
                error => {
                this.setState({ message: 'There was a problem with obtaining your location: ' + error });
            }
        );
    }

    /**
     * 搜索框文本更改处理
     * @param event
     */
    onSearchTextChanged(event) {
        this.setState({ searchString: event.nativeEvent.text });
    }

    /**
     * 渲染逻辑
     */
    render(){
        var spinner = <View/>
        //this.state.isLoading ?
        //(<ActivityIndicatorIOS hidden='true' size='large'/>)
        //:
        //(<View/>);

        return (
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
                        <Text syle={styles.buttonText}>GO</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onLocationPressed.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                <Image source={require('../../images/house.png')} style={styles.image}/>
            {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
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
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height:36,
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
        flex: 4,
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

module.exports = TaskCreate;