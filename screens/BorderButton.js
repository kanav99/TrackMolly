import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const BorderButton = ({onPress, title, color}) => (
  <TouchableOpacity
    activeOpacity={0.4}
    onPress={onPress}
    accessibilityRole="button"
    style={[styles.appButtonContainer, {borderColor: color}]}>
    <Text style={[styles.appButtonText, {color: color}]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    margin: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 6,
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
    color: 'black',
    fontWeight: '600',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default BorderButton;
