/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Animated,
  Dimensions,
} from 'react-native';

import globalData from './Globals';

import Geolocation from 'react-native-geolocation-service';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import RegistrationMobileNumber from './screens/RegistrationMobileNumber';
import RegistrationOTP from './screens/RegistrationOTP';
import RegistrationName from './screens/RegistrationName';
import WelcomeBack from './screens/WelcomeBack';
import Landing from './screens/Landing';
import RegistrationSaviours from './screens/RegistrationSaviours';
import RegistrationPIN from './screens/RegistrationPIN';
import {
  addProtectee,
  addSaviour,
  getProtectees,
  getSaviours,
} from './api/database-helper';
import SolidButton from './screens/SolidButton';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quickTip: false,
      quickTipCallback: null,
      fadeAnim: new Animated.Value(0.0),
      tipView: null,
    };

    this.showQuickTip = this.showQuickTip.bind(this);
    globalData.showQuickTip = this.showQuickTip;
    this.closeQuickTip = this.closeQuickTip.bind(this);
  }

  showQuickTip = (view, cb) => {
    this.setState(
      {
        quickTip: true,
        tipView: view,
        quickTipCallback: cb,
      },
      () => {
        Animated.timing(this.state.fadeAnim, {
          toValue: 1.0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {});
      },
    );
  };

  closeQuickTip = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        quickTip: false,
      });
    });
  };

  render() {
    var user = auth().currentUser;
    const {quickTip, fadeAnim} = this.state;
    const screenHeight = Dimensions.get('window').height;

    var initalScreen = user == null ? 'RegistrationMobileNumber' : 'Landing';
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={initalScreen}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="RegistrationMobileNumber"
              component={RegistrationMobileNumber}
            />
            <Stack.Screen name="RegistrationOTP" component={RegistrationOTP} />
            <Stack.Screen
              name="RegistrationName"
              component={RegistrationName}
            />
            <Stack.Screen
              name="RegistrationSaviours"
              component={RegistrationSaviours}
            />
            <Stack.Screen name="RegistrationPIN" component={RegistrationPIN} />
            <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
            <Stack.Screen name="Landing" component={Landing} />
          </Stack.Navigator>
        </NavigationContainer>
        {quickTip ? (
          <>
            <Animated.View
              style={{
                backgroundColor: 'white',
                opacity: fadeAnim.interpolate({
                  inputRange: [0.0, 1.0],
                  outputRange: [0.0, 0.6],
                  extrapolate: 'clamp',
                }),
                position: 'absolute',
                width: '100%',
                top: 0,
                bottom: 0,
              }}
              onTouchEnd={() => {
                this.closeQuickTip();
              }}></Animated.View>
            <Animated.View
              style={{
                backgroundColor: 'white',
                left: '10%',
                width: 312,
                position: 'absolute',
                elevation: 2,
                borderRadius: 6,
                padding: 6,
                transform: [
                  {
                    translateY: this.state.fadeAnim.interpolate({
                      inputRange: [0.0, 1.0],
                      outputRange: [screenHeight, 0.2 * screenHeight],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <Text
                style={{
                  color: '#6739B7',
                  textAlign: 'center',
                  fontSize: 16,
                  padding: 6,
                  fontWeight: '600',
                  fontFamily: 'Open Sans',
                }}>
                Quick Tip
              </Text>
              {this.state.tipView}
              <SolidButton
                title="Got it!"
                color="#6739B7"
                activeButton={true}
                onPress={() => {
                  this.closeQuickTip();
                  if (this.state.quickTipCallback)
                    this.state.quickTipCallback();
                }}></SolidButton>
            </Animated.View>
          </>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
