import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

var alertButton = require('./images/alertButton.png');

const iconMap = (label) => {
  switch (label) {
    case 'Map':
      return 'place';
    case 'Logs':
      return 'history';
    case 'Saviours':
      return 'people';
    case 'Settings':
      return 'settings';
    default:
      return '';
  }
};

export function TabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / (state.routes.length + 1);

  const [translateValue] = useState(new Animated.Value(0));

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          animateSlider(index);
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.bottomItemStyle}>
            <MaterialIcons
              name={iconMap(label)}
              size={32}
              style={{color: 'white'}}
            />
            <Text style={{color: '#ffffff'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={[{width: tabWidth}, style.alarmContainer]}>
        <TouchableOpacity>
          <Image source={alertButton} style={style.alarmButton} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          style.slider,
          {
            transform: [{translateX: translateValue}],
            width: tabWidth - 20,
          },
        ]}
      />
    </View>
  );
}

const style = StyleSheet.create({
  bottomItemStyle: {
    flex: 1,
    height: 70,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6739B7',
    paddingTop: 10,
    bottom: 0,
  },
  slider: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: '#03DAC5',
    borderRadius: 10,
    width: 90,
  },
  alarmContainer: {
    backgroundColor: '#6739B7',
    height: 70,
  },
  alarmButton: {
    top: -38,
  },
});
