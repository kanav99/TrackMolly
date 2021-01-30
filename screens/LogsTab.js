import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import OrangeButton from './OrangeButton';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const LogItem = ({place, time, status, selected, onDelete}) => {
  return (
    <View
      style={{
        height: selected ? 127 : 42,
        marginBottom: 16,
        paddingTop: selected ? 0 : 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: selected ? '#FAFAFA' : '#FFFFFF',
      }}>
      <MaterialIcons
        name="place"
        size={32}
        style={{color: 'rgba(0, 0, 0, 0.31);'}}
      />
      <View
        style={{
          paddingLeft: 10,
        }}>
        <Text
          style={{
            color: '#6739B7',
            fontWeight: '600',
            fontFamily: 'Open Sans',
          }}>
          {place}
        </Text>
        <Text
          style={{color: 'rgba(103, 57, 183, 0.87)', fontFamily: 'Open Sans'}}>
          {time} | Status: {status ? 'Active' : 'Inactive'}
        </Text>
        {selected ? (
          <View
            style={{
              height: 53,
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#6739B7',
                }}>
                Rate current area
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={2}
                starSize={18}
                emptyStarColor="#6739B7"
                fullStarColor="#6739B7"
                starStyle={{marginRight: 5}}
                selectedStar={(rating) => {}}
              />
            </View>
            <OrangeButton
              title="Delete Log"
              color="#FF6D0A"
              onPress={onDelete}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

class LogsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      logs: [
        {
          place: 'Hinckley & District Museum area 1',
          time: '4:22 PM',
          status: true,
        },
        {
          place: 'Hinckley & District Museum area 2',
          time: '4:22 PM',
          status: false,
        },
      ],
    };
    // TODO: Populate from firebase
    this.deleteLog = this.deleteLog.bind(this);
  }

  deleteLog = (i) => {
    var updatedLogs = this.state.logs;
    updatedLogs.splice(i, 1);
    this.setState({
      logs: updatedLogs,
      selected: -1,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Text style={styles.logsHeader1}>My location logs</Text>
        <Text style={styles.logsHeader2}>
          Press and hold any row for more options
        </Text>
        <ScrollView>
          {this.state.logs.map((x, i) => {
            if (i == this.state.selected) {
              return (
                <LogItem
                  key={'log-' + i}
                  place={x.place}
                  time={x.time}
                  status={x.status}
                  selected={true}
                  onDelete={() => {
                    console.log('hue ' + i);
                    this.deleteLog(i);
                  }}
                />
              );
            }
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  this.setState({selected: i});
                }}>
                <LogItem
                  key={'log-' + i}
                  place={x.place}
                  time={x.time}
                  status={x.status}
                  selected={i == this.state.selected}
                />
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    width: '100%',
    height: 74,
    top: 0,
    left: 0,
    backgroundColor: '#6739B7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationSummary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    top: 16,
    left: 16,
  },
  locationText: {
    left: 15,
    top: 0,
  },
  text1: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    color: 'white',
  },
  text2: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: 'white',
    top: 5,
  },
  logsHeader1: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#6739B7',
  },
  logsHeader2: {
    padding: 16,
    fontFamily: 'OpenSans-Italic',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'rgba(103, 57, 183, 0.6)',
  },
});

export default LogsTab;
