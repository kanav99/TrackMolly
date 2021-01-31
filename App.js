/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import globalData from './Globals';

import Geolocation from 'react-native-geolocation-service';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import PhoneAuthScreen from './PhoneAuthScreen';
import messaging from '@react-native-firebase/messaging';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import RegistrationMobileNumber from './screens/RegistrationMobileNumber';
import RegistrationOTP from './screens/RegistrationOTP';
import RegistrationName from './screens/RegistrationName';
import WelcomeBack from './screens/WelcomeBack';
import Landing from './screens/Landing';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
};
const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App = () => {
  useEffect(() => {
    this.checkPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        //this.requestPermission();
    }
  }
  getToken = async () => {
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log(fcmToken);
    //if (!fcmToken) {
        var fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log(fcmToken);
            //await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    //}
  }
  var initalScreen =
    auth().currentUser == null ? 'RegistrationMobileNumber' : 'Landing';
  return (
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
        <Stack.Screen name="RegistrationName" component={RegistrationName} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
