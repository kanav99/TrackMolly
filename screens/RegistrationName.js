import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';
import Balls from './Balls';
import styled from 'styled-components';
import LongButton from './LongButton';
import globalData from '../Globals';
import auth from '@react-native-firebase/auth';
import {addUser} from '../api/database-helper';
import AsyncStorage from "@react-native-async-storage/async-storage";

class RegistrationName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      token: '',
    };
    this.setName = this.setName.bind(this);
  }
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    this.setState({token: fcmToken});
  }

  setName() {
    let user = auth().currentUser;
    user.updateProfile({
      displayName: this.state.name,
    });
    this.getToken().then(() => {
      addUser(user.uid, this.state.name, user.phoneNumber, this.state.token);
      this.props.navigation.navigate('RegistrationSaviours');
    });
    // this.state.navigation.reset({
    //   routes: [{name: 'Landing'}],
    // });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Balls />
          <Text style={styles.banner}>Hey, I’m TrackMolly!</Text>
          <View style={styles.frame}>
            <View style={styles.inner}>
              <Text style={styles.text}>What’s your name ? 😀</Text>
              <TextInput
                style={styles.nameInput}
                selectionColor="#6739b7"
                keyboardType="name-phone-pad"
                value={this.state.name}
                onChangeText={(val) => {
                  this.setState({
                    name: val,
                  });
                }}></TextInput>
            </View>
            <ButtonGroup>
              <LongButton title="Continue" onPress={this.setName} />
            </ButtonGroup>
          </View>
        </View>
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
    height: 284,

    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  inner: {
    width: '100%',
    height: 148,
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

export default RegistrationName;
