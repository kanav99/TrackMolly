import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useState} from 'react/cjs/react.development';

import Carousel from './Carousel';
import SolidButton from './SolidButton';

const headings = ['TrackMolly 🐶', 'How it works❓', 'Privacy 💛'];
const subheads = [
  'Hey there! 👋',
  'Smart distress-detection algorithm',
  'Your privacy is important!',
];
const paras = [
  'I am your digital companion. My job is to ensure you are safe. So you could enjoy life carefreely and focus on things that matter 😀',
  'I maintain a log of your location and activity to detect a situation of distress. I, then alert your loved ones with additional info for your help.',
  'You have a complete control over what’s being tracked and saved on the servers. The flow of data is 100% transparent and encrypted. ',
];

const buttonTexts = ['Great!', 'Got it!', 'Awesome!'];

const SplashScreen = (navigation, route) => {
  const [slide] = useState(1);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginVertical: 43,
          fontSize: 28,
          fontFamily: 'OpenSans-Bold',
          color: '#6739B7',
        }}>
        {headings[slide]}
      </Text>
      <Carousel
        style="slides"
        itemsPerInterval={1}
        items={[
          {
            title: 'Welcome, swipe to continue.',
            image: 1,
          },
          {
            title: 'About feature X.',
            image: 2,
          },
          {
            title: 'About feature Y.',
            image: 3,
          },
        ]}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FBF9FD',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 24,
        }}>
        <Text
          style={{
            marginTop: 10,
            color: '#6739B7',
            fontSize: 16,
            fontFamily: 'Open Sans',
          }}>
          {subheads[slide]}
        </Text>
        <Text
          style={{
            marginTop: 12,
            color: '#6739B7',
            fontSize: 14,
            opacity: 0.75,
            fontFamily: 'Open Sans',
          }}>
          {paras[slide]}
        </Text>
        <SolidButton
          color="#6739B7"
          title={buttonTexts[slide]}
          style={{width: '100%', bottom: 0, positon: 'absolute'}}
          activeButton={true}></SolidButton>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
