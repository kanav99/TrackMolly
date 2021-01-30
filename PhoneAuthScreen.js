import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';

class PhoneAuthScreen extends Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
  };

  // ...
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      console.log('phone regex validated');
      auth()
        .signInWithPhoneNumber(this.state.phone)
        .then((confirmResult) => {
          console.log(confirmResult);
          this.setState({confirmResult});
        })
        .catch((error) => {
          // alert(error.message);

          console.log(error);
        });
    } else {
      alert('Invalid Phone Number');
    }
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then((user) => {
          this.setState({userId: user});
          console.log(user);
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  changePhoneNumber = () => {
    this.setState({confirmResult: null, verificationCode: ''});
  };

  renderConfirmationCodeView = () => {
    return (
      <View>
        <TextInput
          placeholder="Verification code"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={(verificationCode) => {
            this.setState({verificationCode});
          }}
          maxLength={6}
        />
        <Button onPress={this.handleVerifyCode} title="Verify"></Button>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="Phone Number with country code"
            value={this.state.phone}
            onChangeText={(phone) => {
              this.setState({phone});
            }}
            maxLength={15}
            editable={this.state.confirmResult ? false : true}
          />

          <Button
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }
            title={
              this.state.confirmResult ? 'Change Phone Number' : 'Send Code'
            }></Button>

          {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default PhoneAuthScreen;
