import React from 'react';
import {View, StyleSheet, Text, Animated, Dimensions} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from './TabBar';
import SolidButton from './SolidButton';
import BorderButton from './BorderButton';

import SettingsTab from './SettingsTab';
import SavioursTab from './SavioursTab';
import LogsTab from './LogsTab';
import MapTab from './MapTab';

import globalData from '../Globals';

const Tab = createBottomTabNavigator();

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      route: props.route,
      showAlertBox: false,
      fadeAnim: new Animated.Value(0.0),
      emergencyCounter: 4,
      alertButtonActive: false,
      alertView: null,
      logs: [
        {
          location: 'Hinckley & District Museum area 1',
          time: '4:22 PM',
          status: true,
          latitude: 28.7041,
          longitude: 77.1,
        },
        {
          location: 'Hinckley & District Museum area 2',
          time: '4:22 PM',
          status: false,
          latitude: 28.7041,
          longitude: 77.102,
        },
        {
          location: 'Hinckley & District Museum area 2',
          time: '4:22 PM',
          status: false,
          latitude: 28.7041,
          longitude: 77.108,
        },
      ],
    };

    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.activateAlertButton = this.activateAlertButton.bind(this);
    this.alarmView = this.alarmView.bind(this);
    this.fadeInAlarm = this.fadeInAlarm.bind(this);
    this.pushLog = this.pushLog.bind(this);

    globalData.fadeIn = this.fadeIn;
    globalData.fadeOut = this.fadeOut;
    globalData.fadeInAlarm = this.fadeInAlarm;
  }

  componentDidMount() {
    // DEBUGGING!!
    setInterval(() => {
      console.log('yo');
      const {logs} = this.state;
      const ll = logs[logs.length - 1];
      this.pushLog({
        location: 'Hinckley & District Museum area 2',
        time: '4:22 PM',
        status: false,
        longitude: ll.longitude + Math.random() * 0.002,
        latitude: ll.latitude + Math.random() * 0.002,
      });
    }, 300000);
  }

  pushLog = (log) => {
    console.log('ho');
    const logs = this.state.logs;
    logs.push(log);
    this.setState({
      logs,
    });
  };

  decrementCounter = () => {
    if (this.state.emergencyCounter > 1) {
      setTimeout(this.decrementCounter, 1000);
    }
    let cnt = this.state.emergencyCounter - 1;
    this.setState({
      emergencyCounter: this.state.emergencyCounter - 1,
    });
    if (cnt == 0) {
      this.activateAlertButton();
    }
  };

  activateAlertButton = () => {
    console.log('yo');
    this.setState(
      {
        alertButtonActive: true,
      },
      () => {
        console.log(this.state.alertButtonActive);
      },
    );
  };

  resetCounter = () => {
    this.setState({
      emergencyCounter: 4,
      alertButtonActive: false,
    });
  };

  fadeIn = (view = null, timer = false) => {
    this.setState(
      {
        showAlertBox: true,
        alertView: view,
      },
      () => {
        Animated.timing(this.state.fadeAnim, {
          toValue: 1.0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          if (timer) this.decrementCounter();
        });
      },
    );
  };

  fadeInAlarm = () => {
    this.fadeIn(this.alarmView, true);
  };

  fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        showAlertBox: false,
      });
      this.resetCounter();
    });
  };

  alarmView = () => {
    return (
      <>
        <Text
          style={{
            color: '#6739B7',
            textAlign: 'center',
            fontSize: 16,
            padding: 6,
            fontWeight: '600',
            fontFamily: 'Open Sans',
          }}>
          Call for help
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#6739B7',
            padding: 6,
            fontFamily: 'Open Sans',
          }}>
          You are about to send an{' '}
          <Text style={{color: '#FF6D0A'}}>emergency</Text> alert to all your{' '}
          <Text style={{color: '#FF6D0A'}}>saviours</Text>.
        </Text>
        {!this.state.alertButtonActive ? (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: '#6739B7',
                padding: 6,
                fontFamily: 'Open Sans',
              }}>
              Please wait for
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#6739B7',
                padding: 6,
                fontWeight: 'bold',
              }}>
              {this.state.emergencyCounter}s
            </Text>
          </View>
        ) : null}
        {this.state.alertButtonActive && (
          <SolidButton
            title="Send Alert"
            color={'#FF6D0A'}
            activeButton={true}></SolidButton>
        )}
        {!this.state.alertButtonActive && (
          <SolidButton
            title="Send Alert"
            color={'#FF6D0A'}
            activeButton={false}></SolidButton>
        )}
        <BorderButton
          title="Cancel"
          color="#6739B7"
          onPress={this.fadeOut}></BorderButton>
      </>
    );
  };

  render() {
    const screenHeight = Dimensions.get('window').height;
    return (
      <>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen
            name="Map"
            component={(props) => (
              <MapTab
                {...props}
                logs={this.state.logs}
                pushLog={this.pushLog}
              />
            )}
          />
          <Tab.Screen
            name="Logs"
            component={(props) => (
              <LogsTab
                {...props}
                logs={this.state.logs}
                pushLog={this.pushLog}
              />
            )}
            initialParams={{logs: this.state.logs, pushLog: this.pushLog}}
          />
          <Tab.Screen name="Saviours" component={SavioursTab} />
          <Tab.Screen
            name="Settings"
            component={SettingsTab}
            initialParams={{navigation: this.state.navigation}}
          />
        </Tab.Navigator>
        {this.state.showAlertBox ? (
          <>
            <Animated.View
              style={{
                backgroundColor: 'white',
                opacity: this.state.fadeAnim.interpolate({
                  inputRange: [0.0, 1.0],
                  outputRange: [0.0, 0.6],
                  extrapolate: 'clamp',
                }),
                position: 'absolute',
                width: '100%',
                top: 0,
                bottom: 0,
              }}
              onTouchEnd={this.fadeOut}></Animated.View>
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
              <this.state.alertView />
            </Animated.View>
          </>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    width: '100%',
    height: 74,
    top: 0,
    left: 0,
    backgroundColor: '#6739B7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationSummary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    top: 16,
    left: 16,
  },
  locationText: {
    left: 15,
    top: 0,
  },
  text1: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    color: 'white',
  },
  text2: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: 'white',
    top: 5,
  },
  logsHeader1: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#6739B7',
  },
  logsHeader2: {
    padding: 16,
    fontFamily: 'OpenSans-Italic',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'rgba(103, 57, 183, 0.6)',
  },
});

export default Landing;
