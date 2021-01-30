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

class RegistrationMobileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '+91 9599346343',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Balls />
          <Text style={styles.banner}>I just pinged you!</Text>
          <View style={styles.frame}>
            <View style={styles.inner}>
              <Text style={styles.text}>Enter OTP sent via SMS on</Text>
              <Text style={styles.text}>📱 {this.state.phone}</Text>
              <TextInput
                style={styles.otpInput}
                selectionColor="#6739b7"
                keyboardType="number-pad"
                maxLength={6}></TextInput>
            </View>
            <ButtonGroup>
              <LongButton title="Verify" />
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
    width: 190,
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

    backgroundColor: '#ffff00',
  },
  inner: {
    width: 195,
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
  otpInput: {
    position: 'absolute',
    backgroundColor: '#eee',
    bottom: 0,
    width: '90%',
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
  top: 135px;

  /* Inside Auto Layout */
  flex: none;
  flex-grow: 0;
  margin: 0px;
`;

export default RegistrationMobileNumber;
