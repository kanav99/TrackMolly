import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, TextInput} from 'react-native';
import Balls from './Balls';
import styled from 'styled-components';
import LongButton from './LongButton';
import globalData from '../Globals';
import auth from '@react-native-firebase/auth';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      route: props.route,
    };
  }

  render() {
    return <SafeAreaView></SafeAreaView>;
  }
}

export default Landing;
