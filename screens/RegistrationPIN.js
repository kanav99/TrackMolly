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

class RegistrationPIN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: '',
      navigation: props.navigation,
      route: props.route,
    };
    this.confirmPIN = this.confirmPIN.bind(this);
  }

  confirmPIN = () => {
    globalData.pin = this.state.pin;
    this.state.navigation.reset({
      routes: [{name: 'Landing'}],
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <Balls />
          <Text style={styles.banner}>Privacy is important! 🔓</Text>
          <View style={styles.frame}>
            <View style={styles.inner}>
              <Text style={styles.text}>Set a 3-digit security PIN 🔑 </Text>

              <TextInput
                style={styles.otpInput}
                selectionColor="#6739b7"
                secureTextEntry={true}
                keyboardType="numeric"
                value={this.state.pin}
                onChangeText={(val) => {
                  this.setState({
                    pin: val,
                  });
                }}
                maxLength={3}></TextInput>
            </View>
            <ButtonGroup>
              <LongButton title="Confirm" onPress={this.confirmPIN} />
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
    width: 5,
    width: '40%',
    marginLeft: 100,
    fontWeight: '600',
    fontSize: 32,
    color: '#6739B7',
    letterSpacing: 25,
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

export default RegistrationPIN;
