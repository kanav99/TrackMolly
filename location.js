import React, {Component} from 'react';
import RNLocation from 'react-native-location';

class locationTracking extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
    };
  }

  componentWillMount() {
    RNLocation.configure({
      distanceFilter: 20, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 300000, // 5 min
      fastestInterval: 600000, // Milliseconds
      maxWaitTime: 600000, // Milliseconds
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
  };

  stopTracking = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({location: null});
  };
}
