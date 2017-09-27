import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class LanguageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
    }
    
    console.ignoredYellowBox = ['Remote debugger'];
  }


  handleButton() {

  }
  render() {
    const resizeMode = 'cover';
    return (
      <View style={styles.container}>

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
              resizeMode,
            }}
            source={require('./images/blue.jpg')}
          />
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color:"#444"
          }}
        >
          Select Language
        </Text>          

        <View style={{ height: 30, backgroundColor: "transparent" }} />

        <TouchableHighlight onPress={this.handleButton}>
          <Image
            style={styles.button}
            source={require("./images/flags/ca.png")}
          />
        </TouchableHighlight>

        <View style={{ height: 30, backgroundColor: "transparent" }} />

        <TouchableHighlight onPress={this.handleButton}>
          <Image
            style={styles.button}
            source={require("./images/flags/en.png")}
          />
        </TouchableHighlight>

      </View>
    );
  }
}

/*
<View style={{ height: 120, backgroundColor: "white" }} />


*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default LanguageScreen;
