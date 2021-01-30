/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import globalData from './Globals';

import Geolocation from 'react-native-geolocation-service';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import PhoneAuthScreen from './PhoneAuthScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import RegistrationMobileNumber from './screens/RegistrationMobileNumber';
import RegistrationOTP from './screens/RegistrationOTP';

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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="RegistrationMobileNumber">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="RegistrationMobileNumber"
          component={RegistrationMobileNumber}
        />
        <Stack.Screen name="RegistrationOTP" component={RegistrationOTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
