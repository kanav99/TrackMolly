import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

import MapView from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabBar} from './TabBar';
import OrangeButton from './OrangeButton';
import StarRating from 'react-native-star-rating';

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
        <Text style={{color: '#6739B7', fontWeight: '600'}}>{place}</Text>
        <Text style={{color: 'rgba(103, 57, 183, 0.87)'}}>
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
                starStyle={{color: '#6739B7', marginRight: 5}}
                selectedStar={(rating) => {}}
              />
            </View>
            <OrangeButton title="Delete Log" />
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
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
        />
        <LogItem
          place="Hinckley & District Museum area"
          time="4:22 PM"
          status={false}
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
    };
  }

  render() {
    return (
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Map" component={MapTab} />
        <Tab.Screen name="Logs" component={LogsTab} />
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
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'rgba(103, 57, 183, 0.6)',
  },
});

export default Landing;
