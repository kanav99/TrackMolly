import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import Balls from './Balls';
import styled from 'styled-components';
import LongButton, {LongButtonTransparent} from './LongButton';
import globalData from '../Globals';
import auth from '@react-native-firebase/auth';
import BorderButton from './BorderButton';
import SolidButton from './SolidButton';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import RBSheet from 'react-native-raw-bottom-sheet';
import {addSaviour} from '../api/database-helper';

const totalHeight = Dimensions.get('window').height;

class RegistrationSaviours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      layer: false,
      contacts: [],
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onSkip = this.onSkip.bind(this);
  }

  onConfirm = () => {
    var contacts = this.state.contacts;
    for (var i = 0; i < contacts.length; ++i) {
      var c = contacts[i];
      addSaviour(
        auth().currentUser.uid,
        c.givenName + ' ' + c.familyName,
        c.phoneNumbers[0].number,
      );
    }
    this.props.navigation.navigate('RegistrationPIN');
  };

  onSkip = () => {
    this.props.navigation.navigate('RegistrationPIN');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <Balls />
        <Text style={styles.banner}>Let's add saviours!</Text>
        <View style={styles.frame}>
          <View style={styles.inner}>
            <Text style={styles.text}>
              I’ll reach out to these trusted contacts in case of an emergency
              💜
            </Text>
          </View>
          <ScrollView style={{width: '100%', height: 300}}>
            {this.state.contacts.map((x, i) =>
              x.selected ? (
                <View style={{height: 62}} key={'contact-' + i}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#F6F3FB',
                        borderRadius: 50,
                      }}>
                      <Text style={styles.nameIconText}>{x.givenName[0]}</Text>
                    </View>
                    <View style={{marginLeft: 16, flex: 1}}>
                      <Text style={styles.contactName}>
                        {x.givenName + ' ' + x.familyName}
                      </Text>
                      <Text style={styles.contactName}>
                        {x.phoneNumbers[0].number}
                      </Text>
                    </View>
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
                  </View>
                </View>
              ) : null,
            )}
            <BorderButton
              title="+ Add Contacts"
              color="#6739B7"
              onPress={() => {
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                  {
                    title: 'Contacts',
                    message: 'This app would like to view your contacts.',
                    buttonPositive: 'Please accept bare mortal',
                  },
                )
                  .then(() => Contacts.getAll())
                  .then((conts) => {
                    // setContacts(conts);
                    this.setState({contacts: conts});
                    this.sheet.open();
                  });
              }}
            />
          </ScrollView>
          <LongButton title="Confirm" onPress={this.onConfirm} />
          <LongButtonTransparent title="Skip" onPress={this.onSkip} />
        </View>

        {this.state.layer && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              backgroundColor: 'black',
              opacity: 0.7,
            }}></View>
        )}

        <RBSheet
          ref={(ref) => {
            this.sheet = ref;
          }}
          // closeOnDragDown={true}
          closeOnPressMask={false}
          onOpen={() => {
            this.setState({layer: true});
          }}
          onClose={() => {
            this.setState({layer: false});
          }}
          height={480}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{flex: 1, padding: 24}}>
            <View
              style={{
                height: 48,
                borderRadius: 6,
                backgroundColor: '#FAFAFA',
                paddingHorizontal: 16,
                flexDirection: 'row',
              }}>
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: 'Open Sans',
                  color: '#6739B7',
                  fontSize: 16,
                }}
                placeholder="Search contacts"></TextInput>
              <Image
                style={{marginTop: 12}}
                source={require('./images/search.png')}></Image>
            </View>
            <ScrollView style={{padding: 24, flex: 1}}>
              {this.state.contacts.map((c, i) => (
                <TouchableNativeFeedback
                  onPress={() => {
                    var nconts = this.state.contacts;
                    if (c.selected) {
                      nconts[i].selected = false;
                    } else {
                      nconts[i].selected = true;
                    }
                    this.setState({
                      contacts: nconts,
                    });
                  }}
                  key={'contact-' + i}>
                  <View style={{height: 62}} key={'contact-' + i}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#F6F3FB',
                          borderRadius: 50,
                        }}>
                        {!c.selected && (
                          <Text style={styles.nameIconText}>
                            {c.givenName[0]}
                          </Text>
                        )}
                        {c.selected && (
                          <Text style={styles.nameIconText}>✓</Text>
                        )}
                      </View>
                      <View style={{marginLeft: 16, flex: 1}}>
                        <Text style={styles.contactName}>
                          {c.givenName + ' ' + c.familyName}
                        </Text>
                        <Text style={styles.contactName}>
                          {c.phoneNumbers[0].number}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </ScrollView>
            <SolidButton
              color="#6739B7"
              title="Add Saviours"
              activeButton={true}
              onPress={() => {
                this.sheet.close();
              }}></SolidButton>
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: '100%',
    height: 33,
    left: 24,
    top: 74,
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    // line-height: 33,

    /* identical to box height */

    color: '#6739B7',
  },
  frame: {
    flex: 1,
    position: 'absolute',
    top: 155,
    left: 24,
    right: 24,

    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
  },
  inner: {
    width: '100%',
    height: 100,
    top: 0,
    left: 0,
    padding: 0,
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#6739B7',
    lineHeight: 30,
  },
  nameInput: {
    position: 'absolute',
    backgroundColor: '#eee',
    bottom: 0,
    width: '100%',
    fontWeight: '600',
    fontSize: 32,
    color: '#6739B7',
  },
  verify: {
    right: 24,
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

const ButtonGroup = styled.View`
  width: 100%;
  height: 72px;
  left: 0px;
  top: 40px;

  /* Inside Auto Layout */
  flex: none;
  flex-grow: 0;
  margin: 0px;
`;

export default RegistrationSaviours;
