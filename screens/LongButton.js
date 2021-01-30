import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const LongButton = ({onPress, title}) => (
  <TouchableOpacity
    activeOpacity={0.9}
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
    backgroundColor: '#6739B7',
    borderRadius: 6,
    width: 312,
    height: 38,
  },
  appButtonText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default LongButton;
