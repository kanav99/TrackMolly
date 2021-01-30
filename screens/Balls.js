import React from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import styled from 'styled-components';

const topRight = require('./images/toprightballs.png');
const bottomLeft = require('./images/bottomleftballs.png');

const Balls = () => {
  return (
    <Body>
      <TopRightGroup source={topRight} />
      {/* <Image source={bottomLeft} style={styles.bottomLeft}></Image> */}
    </Body>
  );
};

const Body = styled.View`
  flex: 1;
`;

const TopRightGroup = styled.Image`
  position: absolute;
  width: 154px;
  height: 181px;
  right: 0px;
  top: -27px;
`;

const styles = StyleSheet.create({
  bottomLeft: {
    position: 'absolute',
    justifyContent: 'flex-end',
    marginBottom: 36,
    flex: 1,
  },
});

const BottomLeft = styled.Image`
  position: absolute;
  width: 181px;
  height: 154px;
  left: -27px;
  bottom: 0px;
`;

export default Balls;
