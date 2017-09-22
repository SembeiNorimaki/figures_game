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

import level_data from './images/android_figures.json';
import Images from './images';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


var CustomLayoutAnimation = {
    duration: 2000,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.linear,
    },
  };


class PlayScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //title: `Level ${navigation.state.params.level}`,
    //headerStyle: {backgroundColor:"white"},
    //headerTintColor: 'blue',
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      answer: level_data["1"]["en"],
      file: level_data["1"]["file"],
      n: 5,
      top: 140,
      level: this.props.navigation.state.params.level
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
      2500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //LayoutAnimation.linear();
    LayoutAnimation.configureNext(CustomLayoutAnimation)
    if (this.state.top < -100) {
      this.setState({top: this.state.top + 300})
    } else {
      this.setState({top: this.state.top - 300})
    }
  }

  handleButton() {
    const { navigate } = this.props.navigation;
    //Alert.alert(this.state.text);
    //const {goBack} = this.props.navigation;
    navigate('PlayScr', { "level": String(parseInt(this.state.level) + 1) })
    
    /*if (this.state.text === this.state.answer) {
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
    }*/
  }

  handleKeyPress(i, input_text) {
    //Alert.alert(input_text)
    const text = this.state.text;
    text[i] = input_text;

    this.setState({text: text});

    // if it's the last field
    if (i === this.state.n-1) {
      this.handleButton();
    } else {
      this.refs[i+1].focus();
    }
    
  }

  render() {
    let ToRender = [];
    
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    ToRender.push(
    <TextInput
      ref={0}
      key={0}
      autoFocus={true}
      maxLength={1}
      autoCapitalize='characters'
      value={this.state.text[0]}
      onChangeText={(text) => this.handleKeyPress(0, text)}
    />);

    for (let i=1; i<this.state.n; i++) {
      ToRender.push(
        <TextInput
          ref={i}
          key={i}
          autoFocus={false}
          maxLength={1}
          autoCapitalize='characters'
          value={this.state.text[i]}
          onChangeText={(text) => this.handleKeyPress(i, text)}
        />
      );
    }    
/*
    
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
*/

    return(
      <View style={{ flex: 1, backgroundColor: "white"}}>

        <Image 
          style={{ position: "absolute", top: this.state.top, left: 100}}
          source={Images[this.state.level]} 
        />

        <View style={{ height: 120, backgroundColor: "white" }} />
        
        <Text style={{ fontSize: 20, textAlign: 'center', position: "absolute", top: 25, left: 135}}> Level {this.state.level}</Text>


                
        <View style={{ height: 2, backgroundColor: "transparent" }} />
        
        <View style={{ height: 60, backgroundColor: "white" }} />

        <View style={{ flex: 1, backgroundColor: "white",
                       flexDirection: 'row', justifyContent: 'center', 
                       alignItems: 'center',}}>
        {ToRender.map((e) => e)}
        </View>
        
        
        
      
        <View style={{ flex:1, backgroundColor: "white" }} />
      
      </View>

    );


    /*
    //Alert.alert(Images["1"]);
    return(
      <View style={{ flex: 1, backgroundColor: "white"}}>

        <Image 
          style={{ position: "absolute", top: this.state.top, left: 120}}
          source={Images[this.state.level]} 
        />

        <View style={{ height: 90, backgroundColor: "transparent" }} />

        <View style={{ height: 4, backgroundColor: "transparent" }} />
        
        <View style={{ height: 200, backgroundColor: "transparent" }} />

        <View style={{ position: "absolute", top: 120, flex: 1,
                       flexDirection: 'row', justifyContent: 'center', 
                       alignItems: 'center',}}>
        {ToRender.map((e) => e)}
        </View>
      </View>

    );
    */

    //source={require('./images/l.jpg')} 
//<View style={{ flex:1, backgroundColor: "white" }} />
    /*return (
      <View style={styles.container}>
        {ToRender.map((e) => e)}
      </View>
    );*/
  }
}

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

export default PlayScreen;