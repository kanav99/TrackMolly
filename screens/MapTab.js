import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
