import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import Balls from './Balls';
import auth from '@react-native-firebase/auth';

class RegistrationMobileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      navigation: props.navigation,
      route: props.route,
    };
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test('+91' + this.state.phone);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      auth()
        .signInWithPhoneNumber('+91' + this.state.phone)
        .then((confirmResult) => {
          console.log(confirmResult);
          this.state.navigation.navigate('RegistrationOTP');
        })
        .catch((error) => {
          // alert(error.message);

          console.log(error);
        });
    } else {
      alert('Invalid Phone Number');
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Body>
          <Balls />
          <Banner>Let's get started!</Banner>
          <Frame>
            <InputGroup>
              <MobileText>Enter your mobile number</MobileText>
              <CountryCodeText>+91</CountryCodeText>
              <MobileInput
                selectionColor="#6739b7"
                keyboardType="number-pad"
                value={this.state.phone}
                onChangeText={(phone) => {
                  this.setState({phone});
                }}
                maxLength={10}></MobileInput>
            </InputGroup>
            <ButtonGroup>
              {/* <LongButton title="Login" />
            <LongButton title="Back" /> */}
              <Button
                color="#6739b7"
                title="Login"
                onPress={this.handleSendCode}
              />
            </ButtonGroup>
          </Frame>
        </Body>
      </SafeAreaView>
    );
  }
}

const Body = styled.View``;

const Banner = styled.Text`
  position: absolute;
  width: 187px;
  height: 33px;
  left: 24px;
  top: 74px;

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;

  /* identical to box height */

  color: #6739b7;
`;
const Frame = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  height: 207px;
  left: 24px;
  top: 155px;
  right: 24px;
`;

const InputGroup = styled.View`
  position: absolute;
  width: 243px;
  height: 79px;
  left: 0px;
  top: 0px;

  flex: none;
  flex-grow: 0;
  margin: 0px;
`;

const MobileText = styled.Text`
  position: absolute;
  width: 198px;
  height: 22px;
  left: 0px;
  top: 0px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;

  /* identical to box height */

  color: #6739b7;
`;

const CountryCodeText = styled.Text`
  position: absolute;
  width: 50px;
  left: 0px;
  top: 56px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;

  /* identical to box height */

  color: #6739b7;

  opacity: 0.87;
`;

const MobileInput = styled.TextInput`
  position: absolute;
  width: 243px;
  /*   height: 33px; */
  left: 50px;
  top: 46px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;

  /* identical to box height */

  color: #6739b7;
  opacity: 0.87;
`;

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
