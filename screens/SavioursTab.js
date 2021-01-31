import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';

import BorderButton from './BorderButton';
import SolidButton from './SolidButton';
import {TextInput} from 'react-native-gesture-handler';

import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import auth from '@react-native-firebase/auth';
import {
  addSaviour,
  getProtectees,
  getSaviours,
  removeSaviour,
} from '../api/database-helper';
import globalData from '../Globals';

const totalWidth = Dimensions.get('window').width;
const tabWidth = totalWidth / 2;

export function fix(saviours) {
  return saviours
    ? Object.keys(saviours).map((x, i) => ({
        name: saviours[x].name,
        mobile: saviours[x].mobile,
        uid: x,
      }))
    : [];
}

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

class SavioursTab extends React.Component {
  constructor(params) {
    super(params);
    globalData.saviourTab = this;
    this.state = {
      contacts: [],
      saviours: [],
      protectees: [],
      layer: false,
      selection: 0,
    };

    this.setSheet = this.setSheet.bind(this);
    this.setContacts = this.setContacts.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setLayer = this.setLayer.bind(this);
  }

  setSheet = (val) => {
    this.setState({
      sheet: val,
    });
  };

  setContacts = (val) => {
    this.setState({
      contacts: val,
    });
  };

  setSelection = (val) => {
    this.setState({
      selection: val,
    });
  };

  setLayer = (val) => {
    this.setState({
      layer: val,
    });
  };

  componentDidMount() {
    var user = auth().currentUser;
    getSaviours(user.uid, (saviours) => {
      var sav = fix(saviours);
      this.setState({
        saviours: sav,
      });
    });
    getProtectees(user.uid, (protectees) => {
      var prot = fix(protectees);
      globalData.saviourTab.setState({
        protectees: prot,
      });
    });
  }

  render() {
    const {fadeIn, fadeOut} = globalData;
    var contacts = this.state.contacts;
    var selection = this.state.selection;
    var protectees = this.state.protectees;

    var saviours = this.state.saviours;
    var target = selection == 0 ? saviours : protectees;
    var layer = this.state.layer;

    return (
      <>
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
                    this.setSelection(1);
                    console.log('hej');
                    // animateSlider(1);
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
                    this.setSelection(0);
                    console.log('bonjour');
                    // animateSlider(0);
                  }}>
                  <Text style={styles.tabInactive}>My Saviours</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback style={{flex: 1}}>
                  <Text style={styles.tabSelected}>Protectees</Text>
                </TouchableNativeFeedback>
              </>
            )}
          </View>
          {/* <Animated.View
          style={[
            styles.selectionBar,
            {
              // transform: [{translateX: translateValue}],
              width: tabWidth,
            },
          ]}></Animated.View> */}
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
                  I’ll alert you when any of these contacts is in an emergency
                  🚨
                </Text>
              </View>
            )}
            <ScrollView style={{margin: 24}}>
              {target.map((x, i) => {
                // console.log(x.uid);
                return (
                  <View style={{height: 62}} key={'contact-' + i}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#F6F3FB',
                          borderRadius: 50,
                        }}>
                        <Text style={styles.nameIconText}>{x['name'][0]}</Text>
                      </View>
                      <View style={{marginLeft: 16, flex: 1}}>
                        <Text style={styles.contactName}>{x['name']}</Text>
                        <Text style={styles.contactName}>{x['mobile']}</Text>
                      </View>
                      {selection == 0 && (
                        <TouchableNativeFeedback
                          onPress={() => {
                            fadeIn(() =>
                              AlertView(fadeOut, () => {
                                var savs = saviours;
                                savs.splice(i, 1);
                                this.setState({
                                  saviours: savs,
                                });
                                removeSaviour(auth().currentUser.uid, x.uid);
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
                );
              })}
              {selection == 0 && (
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
                        this.setContacts(conts);
                        this.sheet.open();
                      });
                  }}
                />
              )}
            </ScrollView>
          </View>
        </View>
        {layer && (
          <TouchableWithoutFeedback
            onPress={() => {
              refRBSheet.close();
            }}>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                backgroundColor: 'black',
                opacity: 0.7,
              }}></View>
          </TouchableWithoutFeedback>
        )}
        <RBSheet
          ref={(ref) => {
            this.sheet = ref;
          }}
          // closeOnDragDown={true}
          closeOnPressMask={false}
          onOpen={() => {
            this.setLayer(true);
          }}
          onClose={() => {
            this.setLayer(false);
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
              {contacts.map((c, i) => (
                <TouchableNativeFeedback
                  onPress={() => {
                    var nconts = contacts;
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
                  <View style={{height: 62}}>
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
                for (var i = 0; i < contacts.length; ++i) {
                  var c = contacts[i];
                  if (c.selected) {
                    addSaviour(
                      auth().currentUser.uid,
                      c.givenName + ' ' + c.familyName,
                      c.phoneNumbers[0].number,
                    );
                    contacts[i].selected = false;
                  }
                }
                getSaviours(auth().currentUser.uid, (savs) => {
                  this.setState(
                    {
                      saviours: fix(savs),
                    },
                    () => {
                      this.sheet.close();
                    },
                  );
                });
              }}></SolidButton>
          </View>
        </RBSheet>
      </>
    );
  }
}

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

export default SavioursTab;
