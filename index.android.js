/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


class PlayScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Level ${navigation.state.params.level}`,
    //headerStyle: {backgroundColor:"white"},
    headerTintColor: 'blue',
  });

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      top: 120,
      level: "",
      focus_element: "0"
    }
    //text: ['', '', '', ''],
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleButton = this.handleButton.bind(this);

    console.ignoredYellowBox = ['Remote debugger'];
  }

  componentDidMount() {
    //const { params } = this.props.navigation.state;
    //this.setState({level: params.level})
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    LayoutAnimation.linear();
    if (this.state.top < -100) {
      this.setState({top: this.state.top + 300})
    } else {
      this.setState({top: this.state.top - 300})
    }
  }

  handleButton() {
    //const {goBack} = this.props.navigation;
    if (this.state.text === "L") {
      Alert.alert(
        'Correct',
        '',
        [
          {text: 'Return', onPress: () => this.props.navigation.goBack(null), style: 'cancel'},
          {text: '', onPress: () => {}},
          {text: 'Next Level', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }

        );
      this.props.navigation.goBack(null);
    } else {
      Alert.alert(
        'Wrong',
        this.state.text + 'is not correct',
      );
      this.setState({text: ""})
    }
  }

  handleKeyPress(i, input_text) {

    const text = this.state.text;
    text[i] = input_text;

    this.setState({
      text: text,
      focus_element: String(parseInt(this.state.focus_element) + 1)
    });

  }


  render() {
    let ToRender = [];
    let n = this.state.text.length;

    const { params } = this.props.navigation.state;

    /*for (let i=0; i<n; i++) {
      ToRender.push(
        <TextInput
          key={i}
          autoFocus={this.state.focus_element === String(i) ? true : false}
          size="1"
          value={this.state.text[i]}
          onChangeText={(text) => this.handleKeyPress(i, text)}
        />
      );
    }*/

    return(
      <View style={{ flex: 1, backgroundColor: "white"}}>

        <Image 
          style={{ position: "absolute", top: this.state.top, left: 120}}
          source={require('./images/l.jpg')} 
        />

        <View style={{ height: 70, backgroundColor: "white" }} />

        <View style={{ height: 4, backgroundColor: "transparent" }} />
        
        <View style={{ height: 150, backgroundColor: "white" }} />

        <Text style={{ position: "absolute", top: 130, left: 50, height: 40, width: 250, borderColor: 'black', borderWidth: 0}}>
          What do you see?
        </Text>
        <TextInput
          style={{ position: "absolute", top: 150, left: 50, height: 40, width: 250, borderColor: 'black', borderWidth: 0}}
          autoFocus={true}
          autoCapitalize='characters'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        
        <Button
          style={{ position: "absolute", top: 300, left: 20}}
          onPress={this.handleButton}
          title="Check"
        />
      
        <View style={{ flex:1, backgroundColor: "white" }} />
      
      </View>

    );

    /*return (
      <View style={styles.container}>
        {ToRender.map((e) => e)}
      </View>
    );*/
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Main Screen</Text>
        <View style={{ height: 20, backgroundColor: "white" }} />
        <Button
          onPress={() => navigate('PlayScr', { "level": "1" })}
          title="Play"
        />
      </View>
    );
  }
}

const figures = StackNavigator({
  HomeScr: { screen: HomeScreen },
  PlayScr: { screen: PlayScreen },
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
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

AppRegistry.registerComponent('figures', () => figures);


/*
<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
*/
