import React, { Component } from 'react';
import {
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Button,
  LayoutAnimation,
  NativeModules
} from 'react-native';
import { StackNavigator } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    const resizeMode = 'cover';
    return (

      <View
        style={{
          flex: 1,
          backgroundColor: '#aaa',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode,
            }}
            source={require('./images/blue.jpg')}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 40,
              color:"#444"
            }}
          >
            Figures
          </Text>          

          <View style={{ height: 50, backgroundColor: "transparent" }} />
          <Button
            color="red"
            onPress={() => navigate('PlayScr', { "level": "1" })}
            
            title="Play"
          />
          <View style={{ height: 30, backgroundColor: "transparent" }} />
          <Button
            color="green"
            onPress={() => navigate('LanguageScr')}
            title="Language"
          />
        </View>
      </View>
      
    );
  }
}

export default HomeScreen;
