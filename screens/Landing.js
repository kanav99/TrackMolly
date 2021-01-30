import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, TextInput} from 'react-native';

import MapView from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBar} from './TabBar';

const Tab = createBottomTabNavigator();

const MapTab = () => {
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
      <View style={styles.topBar}></View>
    </SafeAreaView>
  );
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      route: props.route,
    };
  }

  render() {
    return (
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Map" component={MapTab} />
        <Tab.Screen name="Logs" component={MapTab} />
        <Tab.Screen name="Saviours" component={MapTab} />
        <Tab.Screen name="Settings" component={MapTab} />
      </Tab.Navigator>
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
});

export default Landing;
