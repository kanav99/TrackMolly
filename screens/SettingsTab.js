import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import OrangeButton from './OrangeButton';

import auth from '@react-native-firebase/auth';
import globalData from '../Globals';

const SettingsTab = ({route}) => {
  var [selection, setSelection] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Text style={styles.header}>App Settings</Text>
      <ScrollView
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
          paddingBottom: 24,
        }}>
        <TouchableNativeFeedback
          onPress={() => {
            setSelection(1);
          }}>
          <View
            style={[
              styles.settings,
              selection == 1 ? {height: 253, backgroundColor: '#FAFAFA'} : {},
            ]}>
            <View
              style={{flexDirection: 'row', height: 32, alignItems: 'center'}}>
              <Image source={require('./images/pin.png')} />
              <View style={{marginLeft: 16}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6739B7',
                    fontFamily: 'Open Sans',
                  }}>
                  Set / Change Security PIN
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'rgba(103, 57, 183, 0.87)',
                    fontFamily: 'Open Sans',
                  }}>
                  3 digit Security PIN is set
                </Text>
              </View>
            </View>
            {selection == 1 && (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 20,
                    color: '#6739B7',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                  }}>
                  Entering the PIN{' '}
                  <Text style={{color: '#FF6D0A'}}>backwards</Text> would send
                  an <Text style={{color: '#FF6D0A'}}>emergency alert</Text> to
                  your trusted contacts!
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 20,
                    color: '#6739B7',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                  }}>
                  For e.g. If your PIN is{' '}
                  <Text style={{color: '#FF6D0A'}}>123</Text> , entering{' '}
                  <Text style={{color: '#FF6D0A'}}>321</Text> triggers an
                  emergency alert
                </Text>
                <View
                  style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  <OrangeButton
                    title="View PIN"
                    style={{left: 40}}
                    color="#6739B7"
                    onPress={() => {
                      alert(globalData.pin);
                    }}
                  />
                  <OrangeButton
                    title="Reset PIN"
                    style={{left: 50}}
                    color="#FF6D0A"
                    onPress={() => {
                      console.log('fuck');
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={() => {
            setSelection(2);
          }}>
          <View
            style={[
              styles.settings,
              selection == 2 ? {height: 199, backgroundColor: '#FAFAFA'} : {},
            ]}>
            <View
              style={{flexDirection: 'row', height: 32, alignItems: 'center'}}>
              <Image source={require('./images/power.png')} />
              <View style={{marginLeft: 16}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6739B7',
                    fontFamily: 'Open Sans',
                  }}>
                  Power Button Alert Trigger
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'rgba(103, 57, 183, 0.87)',
                    fontFamily: 'Open Sans',
                  }}>
                  Enabled
                </Text>
              </View>
            </View>
            {selection == 2 && (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 20,
                    color: '#6739B7',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                  }}>
                  Pressing power button{' '}
                  <Text style={{color: '#FF6D0A'}}>5 times</Text> in succession
                  triggers an{' '}
                  <Text style={{color: '#FF6D0A'}}>emergency alert</Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <OrangeButton title="Disable Trigger" color="#FF6D0A" />
                </View>
              </>
            )}
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={() => {
            setSelection(3);
          }}>
          <View
            style={[
              styles.settings,
              selection == 3 ? {height: 253, backgroundColor: '#FAFAFA'} : {},
            ]}>
            <View
              style={{flexDirection: 'row', height: 32, alignItems: 'center'}}>
              <Image source={require('./images/notrack.png')} />
              <View style={{marginLeft: 16}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6739B7',
                    fontFamily: 'Open Sans',
                  }}>
                  Temporarily Disable Tracking
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'rgba(103, 57, 183, 0.87)',
                    fontFamily: 'Open Sans',
                  }}>
                  Tracking is Enabled
                </Text>
              </View>
            </View>
            {selection == 3 && (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 20,
                    color: '#6739B7',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                  }}>
                  You may disable tracking. I won't log your{' '}
                  <Text style={{color: '#FF6D0A'}}>location</Text> and{' '}
                  <Text style={{color: '#FF6D0A'}}>activity</Text> status when
                  disabled.
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 20,
                    color: '#6739B7',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                  }}>
                  Tracking would automatically be Enabled after{' '}
                  <Text style={{color: '#FF6D0A'}}>6 hours</Text>. emergency
                  alert
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <OrangeButton title="Disable Tracking" color="#FF6D0A" />
                </View>
              </>
            )}
          </View>
        </TouchableNativeFeedback>

        <TouchableOpacity
          onPress={() => {
            auth().signOut();
            route.params.navigation.reset({
              routes: [{name: 'RegistrationMobileNumber'}],
            });
          }}
          style={[
            {
              height: 42,
              borderColor: '#FF6D0A',
              borderWidth: 2,
              marginTop: 10,
              marginBottom: 100,
              borderRadius: 6,
              backgroundColor: 'rgba(255, 109, 10, 0.05)',
              flexDirection: 'column',
              alignItems: 'center',
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image source={require('./images/logout.png')} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Open Sans',
                color: '#FF6D0A',
                marginLeft: 13,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    height: 65,
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  header: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#6739B7',
  },
});

export default SettingsTab;
