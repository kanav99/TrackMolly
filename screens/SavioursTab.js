import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';

import BorderButton from './BorderButton';
import SolidButton from './SolidButton';

const AlertView = (fadeOut, onSuccess) => {
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
        Remove Contact
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#6739B7',
          padding: 6,
          fontFamily: 'Open Sans',
        }}>
        Are you sure you wish to remove the following contact from your Saviours
        list?
      </Text>

      <SolidButton
        title="Remove"
        color={'#FF6D0A'}
        activeButton={true}
        onPress={onSuccess}></SolidButton>
      <BorderButton
        title="Cancel"
        color="#6739B7"
        onPress={fadeOut}></BorderButton>
    </>
  );
};

const SettingsTab = ({route}) => {
  const {fadeIn, fadeOut} = route.params;
  var [selection, setSelection] = useState(0);
  const [translateValue] = useState(new Animated.Value(0.0));

  const [protectees] = useState([
    {name: 'Saurabh Sangam', contact: '+91 8702 694 200'},
  ]);

  const [saviours] = useState([
    {name: 'Shreyaa Sharma', contact: '+91 9599346343'},
    {name: 'Mahak Gupta', contact: '+91 8702 694 200'},
  ]);

  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / 2;

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: (index + 1) * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  //   useEffect(() => {
  //     animateSlider(selection);
  //   }, [selection]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.header}>
        {selection == 0 && (
          <>
            <TouchableNativeFeedback style={{flex: 1}}>
              <Text style={styles.tabSelected}>My Saviours</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              style={{flex: 1}}
              onPress={() => {
                setSelection(1);
                console.log('hej');
                animateSlider(1);
              }}>
              <Text style={styles.tabInactive}>Protectees</Text>
            </TouchableNativeFeedback>
          </>
        )}
        {selection == 1 && (
          <>
            <TouchableNativeFeedback
              style={{flex: 1}}
              onPress={() => {
                setSelection(0);
                console.log('bonjour');
                animateSlider(0);
              }}>
              <Text style={styles.tabInactive}>My Saviours</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={{flex: 1}}>
              <Text style={styles.tabSelected}>Protectees</Text>
            </TouchableNativeFeedback>
          </>
        )}
      </View>
      <Animated.View
        style={[
          styles.selectionBar,
          {
            // transform: [{translateX: translateValue}],
            width: tabWidth,
          },
        ]}></Animated.View>
      <View style={{padding: 16}}>
        <View>
          <Text style={styles.helpText}>
            {selection == 0
              ? 'I’ll send emergecy alerts to these trusted contacts'
              : 'The following people have added you as their saviour!'}
          </Text>
        </View>
        {selection == 1 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
              marginTop: 24,
              backgroundColor: '#FAFAFA',
              borderRadius: 6,
            }}>
            <Text style={styles.altText}>
              I’ll alert you when any of these contacts is in an emergency 🚨
            </Text>
          </View>
        )}
        <ScrollView style={{margin: 24}}>
          {(selection == 0 ? saviours : protectees).map((x, i) => (
            <View style={{height: 62}} key={'contact-' + i}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#F6F3FB',
                    borderRadius: 50,
                  }}>
                  <Text style={styles.nameIconText}>{x.name[0]}</Text>
                </View>
                <View style={{marginLeft: 16, flex: 1}}>
                  <Text style={styles.contactName}>{x.name}</Text>
                  <Text style={styles.contactName}>{x.contact}</Text>
                </View>
                {selection == 0 && (
                  <TouchableNativeFeedback
                    onPress={() => {
                      fadeIn(() =>
                        AlertView(fadeOut, () => {
                          console.log('remove saviour');
                          fadeOut();
                        }),
                      );
                    }}>
                    <Image
                      source={require('./images/remove.png')}
                      style={{marginTop: 15}}></Image>
                  </TouchableNativeFeedback>
                )}
              </View>
            </View>
          ))}
          {selection == 0 && (
            <BorderButton title="+ Add Contacts" color="#6739B7" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    height: 50,
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
    flexDirection: 'row',
  },
  tabSelected: {
    backgroundColor: '#FAFAFA',
    fontFamily: 'Open Sans',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#6739B7',
    width: '50%',
  },
  tabInactive: {
    backgroundColor: '#FAFAFA',
    fontFamily: 'Open Sans',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#6739B7',
    width: '50%',
    opacity: 0.5,
  },
  selectionBar: {
    borderWidth: 1,
    borderColor: '#03DAC5',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'OpenSans-Italic',
    color: 'rgba(103, 57, 183, 0.75)',
  },
  altText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#6739B7',
  },
  nameIconText: {
    textAlign: 'center',
    fontSize: 26,
    marginTop: 5,
    color: '#6739B7',
    fontWeight: '600',
  },
  contactName: {
    lineHeight: 24,
    fontSize: 16,
    color: '#6739B7',
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
});

export default SettingsTab;
