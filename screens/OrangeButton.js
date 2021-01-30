import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const OrangeButton = ({onPress, title}) => (
  <TouchableOpacity
    activeOpacity={0.4}
    onPress={onPress}
    style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#FF6D0A',
    borderWidth: 2,
    height: 43,
    paddingLeft: 32.5,
    paddingRight: 32.5,
    paddingTop: 12,
    paddingBottom: 12,
  },
  appButtonText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#FF6D0A',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default OrangeButton;
