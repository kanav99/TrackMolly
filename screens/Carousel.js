import React from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

export const Stat = (props) => {
  const {label, value} = props;

  return (
    <View style={styles.stat}>
      <Text style={{...styles.statText}}>{value}</Text>
      <View style={styles.statHold}>
        <Text style={{...styles.statLabel}}>{label}</Text>
      </View>
    </View>
  );
};

export const Slide = (props) => {
  const {title, image} = props;

  return (
    <View style={styles.slide}>
      {image == 1 && <Image source={require('./images/slide1.png')}></Image>}
      {image == 2 && <Image source={require('./images/slide2.png')}></Image>}
      {image == 3 && <Image source={require('./images/slide3.png')}></Image>}
    </View>
  );
};

export const Carousel = (props) => {
  const {items, style} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 1.0 : 0.25,
        }}>
        &bull;
      </Text>,
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {items.map((item, index) => {
          switch (style) {
            case 'stats':
              return <Stat key={index} label={item.label} value={item.value} />;
            default:
              return (
                <Slide key={index} title={item.title} image={item.image} />
              );
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 200,
  },
  slideText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
  stat: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '33%',
    flex: 1,
    maxWidth: '33%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  statText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
  statHold: {
    width: '100%',
    marginBottom: 8,
  },
  statLabel: {
    width: '100%',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 5,
  },
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    // borderColor: '#ebebeb',
    // borderWidth: 1,
    // borderRadius: 8,
    // shadowColor: '#fcfcfc',
    // shadowOpacity: 1,
    marginTop: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    color: '#A488D4',
    fontSize: 30,
  },
});

export default Carousel;
