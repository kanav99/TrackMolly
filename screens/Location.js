import React, {Component} from 'react';
import RNLocation from 'react-native-location';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import globalData from '../Globals';

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
    };
    // this.startTracking = this.startTracking.bind(this);
    // this.stopTracking = this.stopTracking.bind(this);
    // // this.requestPermission = this.requestPermission.bind(this);

    // RNLocation.configure({
    //   // distanceFilter: null, // Meters
    //   desiredAccuracy: {
    //     ios: 'best',
    //     android: 'balancedPowerAccuracy',
    //   },
    //   // Android only
    //   androidProvider: 'auto',
    //   // interval: 300000, // 5 min
    //   // fastestInterval: 600000, // Milliseconds
    //   // maxWaitTime: 600000, // Milliseconds
    //   // iOS Only
    //   activityType: 'other',
    //   allowsBackgroundLocationUpdates: true,
    //   headingOrientation: 'portrait',
    //   pausesLocationUpdatesAutomatically: false,
    //   showsBackgroundLocationIndicator: false,
    // });
  }

  // componentDidMount() {
  //   PermissionsAndroid.requestMultiple(
  //     [
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //     ],
  //     {
  //       title: 'Location',
  //       message: 'This app would like to view your Location.',
  //       buttonPositive: 'Please accept bare mortal',
  //     },
  //   ).then(() => {
  //     this.startTracking();
  //   });
  // }

  // requestPermission = () => {
  //   RNLocation.requestPermission({
  //     ios: 'always',
  //     android: {
  //       detail: 'fine', // or 'coarse'
  //       rationale: {
  //         title: 'We need to access your location',
  //         message: 'We use your location to ensure your safety',
  //         buttonPositive: 'OK',
  //         buttonNegative: 'Cancel',
  //       },
  //     },
  //   }).then((granted) => {
  //     if (granted) {
  //       this.startTracking();
  //     }
  //   });
  // };

  startTracking = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      (locations) => {
        console.log(locations);
        this.setState({location: locations[0]});
      },
    );
  };

  stopTracking = () => {
    clearTimeout(this.trackState);
    this.setState({location: null});
  };

  render() {
    const {location} = this.state;
    const {logs} = this.props;
    console.log(logs);
    return (
      logs && (
        <MapView
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          style={{flex: 1}}
          region={{
            latitude: logs[logs.length - 1].latitude ? logs[logs.length - 1].latitude : 0,
            longitude: logs[logs.length - 1].longitude ? logs[logs.length - 1].longitude : 0,
            latitudeDelta: 0.0461,
            longitudeDelta: 0.021,
          }}>
          {logs.map((m, i) => (
            <Marker
              key={i}
              coordinate={{latitude: m.latitude, longitude: m.longitude}}
              title={m.location}
              description={m.time}>
              <View
                style={
                  i == logs.length - 1
                    ? {
                        width: 21,
                        height: 21,
                        borderRadius: 10.5,
                        backgroundColor: '#03DAC5',
                      }
                    : {
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#FF6D0A',
                      }
                }></View>
            </Marker>
          ))}
        </MapView>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  innerContainer: {
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  repoLink: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0000CC',
    textDecorationLine: 'underline',
  },
  mapBox: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  detailBox: {
    padding: 15,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  valueTitle: {
    fontFamily: 'Futura',
    fontSize: 12,
  },
  detail: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  largeDetail: {
    fontSize: 20,
  },
  json: {
    fontSize: 12,
    fontFamily: 'Courier',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  full: {
    width: '100%',
  },
  half: {
    width: '50%',
  },
  third: {
    width: '33%',
  },
});

export default Location;
