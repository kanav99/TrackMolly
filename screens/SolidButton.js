import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class SolidButton extends React.Component {
  constructor(props) {
    super(props);
    var {onPress, title, color, activeButton} = props;
    this.state = {
      onPress,
      title,
      color,
      activeButton,
    };
  }

  render() {
    console.log('solid ' + this.state.activeButton);
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={this.state.onPress}
        accessibilityRole="button"
        style={[
          styles.appButtonContainer,
          {
            backgroundColor: this.state.color,
            opacity: this.state.activeButton ? 1.0 : 0.5,
          },
        ]}>
        <Text style={styles.appButtonText}>{this.state.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    margin: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 43,
    paddingLeft: 32.5,
    paddingRight: 32.5,
    paddingTop: 12,
    paddingBottom: 12,
  },
  appButtonText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontWeight: '600',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default SolidButton;
