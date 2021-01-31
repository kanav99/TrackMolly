import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Balls from './Balls';
import styled from 'styled-components';
import LongButton from './LongButton';
import {NavigationActions} from '@react-navigation/stack';

class WelcomeBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.route.params.name,
      navigation: props.navigation,
      route: props.route,
    };
    this.goToLanding = this.goToLanding.bind(this);
  }

  goToLanding() {
    this.props.navigation.navigate('RegistrationPIN');
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Balls />
          <Text style={styles.banner}>Welcome back!</Text>
          <View style={styles.frame}>
            <View style={styles.inner}>
              <Text style={styles.text}>
                Welcome back {this.state.name}, You are all set!
              </Text>
            </View>
            <ButtonGroup>
              <LongButton title="Continue" onPress={this.goToLanding} />
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

export default WelcomeBack;
