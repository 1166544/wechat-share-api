/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import SearchPage, {} from './SearchPage';

class MyReact extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
              title: 'Property Finder',
              component: SearchPage
          }}>
      </NavigatorIOS>
    );
  }
}

class HelloWorld extends Component{
    render() {
        return <Text style={styles.text}>HelloWorld(again)</Text>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
      color: 'black',
      backgroundColor: 'white',
      fontSize: 30,
      margin: 80
  }
});

AppRegistry.registerComponent('MyReact', () => MyReact);
