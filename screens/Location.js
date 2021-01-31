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
} from 'react-native';
import MapView from 'react-native-maps';

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
    };
  }

  componentWillMount() {
    RNLocation.configure({
      // distanceFilter: null, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      // interval: 300000, // 5 min
      // fastestInterval: 600000, // Milliseconds
      // maxWaitTime: 600000, // Milliseconds
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: true,
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });

    var status = RNLocation.checkPermission({
      ios: 'always',
      android: {
        detail: 'fine', // or 'coarse'
      },
    });

    if (!status) {
      this.requestPermission();
    } else {
      this.startTracking();
    }
  }

  requestPermission = () => {
    RNLocation.requestPermission({
      ios: 'always',
      android: {
        detail: 'fine', // or 'coarse'
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to ensure your safety',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then((granted) => {
      if (granted) {
        this.startTracking();
      }
    });
  };

  startTracking = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      (locations) => {
        this.setState({location: locations[0]});
      },
    );
    // this.locationSubscription = RNLocation.subscribeToLocationUpdates(
    //   (locations) => {
    //     this.setState({location: locations[0]});
    //   },
    // );
  };

  stopTracking = () => {
    clearTimeout(this.trackState);
    this.setState({location: null});
  };

  render() {
    const {location} = this.state;
    return (
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 28.64556,
          longitude: 77.3563884,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
