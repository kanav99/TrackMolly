/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

PushNotification.configure({
    onNotification: function(notification) {
        const { data } = notification;
        console.log('push notif', data);
        if (data.type == 'safety-check'){
            // post request to server that user is safe
            Alert.alert('This is safety check notification');
        } else if (data.type == 'protectee-danger'){
            // navigate to relevant page
            Alert.alert('This is protectee in danger notification');
        }
    }
});

AppRegistry.registerComponent(appName, () => App);
