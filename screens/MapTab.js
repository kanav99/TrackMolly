import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Location from './Location';

const API_KEY = 'AIzaSyAiFf80N2skv0zHFHBgWImrunf3tn-ozgM';
import Geocoder from 'react-native-geocoding';
import {useState} from 'react/cjs/react.development';
import {getRating} from '../api/database-helper';
Geocoder.init(API_KEY);

const MapTab = ({navigation, route, screenProps, logs, pushLog}) => {
  // const [locationName, setLocationName] = useState(
  //   'Hinckley & District Museum area',
  // );
  // const [rating, setRating] = useState(4.2);

  // Geocoder.from(37.78825, -122.4325).then((json) => {
  //   // console.log(JSON.stringify(json, null, 2));
  //   console.log(json.results[0].place_id);
  //   console.log(json.results[0].formatted_address);
  //   console.log(json.plus_code.global_code);
  //   var addressComponent = json.results[0].address_components[0];
  //   console.log(addressComponent);
  // });
  // getRating(37.78825, -122.432, (r) => {
  //   console.log(r);
  // });
  var loc = logs[logs.length - 1].location;
  var rate = logs[logs.length - 1].rating ? logs[logs.length - 1].rating : 'No rating';
  return (
    <SafeAreaView style={{flex: 1}}>
      <Location logs={logs} pushLog={pushLog} />
      <View style={styles.topBar}>
        <View style={styles.locationSummary}>
          <MaterialIcons
            name="place"
            size={32}
            style={{color: 'white', opacity: 0.6, top: 2}}
          />
          <View style={styles.locationText}>
            <Text style={styles.text1}>{loc}</Text>
            <Text style={styles.text2}>{rate}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default MapTab;
