import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
  Animated,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabBar} from './TabBar';
import OrangeButton from './OrangeButton';
import StarRating from 'react-native-star-rating';
import LongButton from './LongButton';
import {out} from 'react-native/Libraries/Animated/src/Easing';
import SolidButton from './SolidButton';
import BorderButton from './BorderButton';

import SettingsTab from './SettingsTab';
import SavioursTab from './SavioursTab';

const Tab = createBottomTabNavigator();

const MapTab = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.topBar}>
        <View style={styles.locationSummary}>
          <MaterialIcons
            name="place"
            size={32}
            style={{color: 'white', opacity: 0.6, top: 2}}
          />
          <View style={styles.locationText}>
            <Text style={styles.text1}>Hinckley & District Museum area</Text>
            <Text style={styles.text2}>Safety Rating: 4.2/5</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const LogItem = ({place, time, status, selected}) => {
  return (
    <View
      style={{
        height: selected ? 127 : 42,
        marginBottom: 16,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: selected ? '#FAFAFA' : '#FFFFFF',
      }}>
      <MaterialIcons
        name="place"
        size={32}
        style={{color: 'rgba(0, 0, 0, 0.31);'}}
      />
      <View
        style={{
          paddingLeft: 10,
        }}>
        <Text
          style={{
            color: '#6739B7',
            fontWeight: '600',
            fontFamily: 'Open Sans',
          }}>
          {place}
        </Text>
        <Text
          style={{color: 'rgba(103, 57, 183, 0.87)', fontFamily: 'Open Sans'}}>
          {time} | Status: {status ? 'Active' : 'Inactive'}
        </Text>
        {selected ? (
          <View
            style={{
              height: 53,
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#6739B7',
                }}>
                Rate current area
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={2}
                starSize={18}
                emptyStarColor="#6739B7"
                fullStarColor="#6739B7"
                starStyle={{marginRight: 5}}
                selectedStar={(rating) => {}}
              />
            </View>
            <OrangeButton title="Delete Log" color="#FF6D0A" />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const LogsTab = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Text style={styles.logsHeader1}>My location logs</Text>
      <Text style={styles.logsHeader2}>
        Press and hold any row for more options
      </Text>
      <ScrollView>
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={true}
          selected={true}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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
    };

    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.activateAlertButton = this.activateAlertButton.bind(this);
    this.alarmView = this.alarmView.bind(this);
    this.fadeInAlarm = this.fadeInAlarm.bind(this);
  }

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

    // Animated.timing(this.state.fadeAnim, {
    //   toValue: 1.0,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   this.decrementCounter();
    // });
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
    console.log('landing ' + this.state.alertButtonActive);

    if (this.state.alertButtonActive) {
      var but = () => (
        <SolidButton
          title="Send Alert"
          color={this.state.alertButtonActive ? 'black' : '#FF6D0A'}
          activeButton={true}></SolidButton>
      );
    } else
      var but = () => (
        <SolidButton
          title="Send Alert"
          color={this.state.alertButtonActive ? 'black' : '#FF6D0A'}
          activeButton={false}></SolidButton>
      );
    return (
      <>
        <Tab.Navigator
          tabBar={(props) => (
            <TabBar
              fadeInFunc={this.fadeInAlarm}
              fadeOutFunc={this.fadeOut}
              {...props}
            />
          )}>
          <Tab.Screen name="Map" component={MapTab} />
          <Tab.Screen name="Logs" component={LogsTab} />
          <Tab.Screen
            name="Saviours"
            component={SavioursTab}
            initialParams={{fadeIn: this.fadeIn, fadeOut: this.fadeOut}}
          />
          <Tab.Screen name="Settings" component={SettingsTab} />
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
