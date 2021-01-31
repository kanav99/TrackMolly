/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
//import PushNotification from 'react-native-push-notification';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('Notification caused app to open from background state:',
    remoteMessage.notification,);
    Alert.alert('hello');
});
// PushNotification.configure({
//     onNotification: function(notification) {
//         const { data } = notification;
//         console.log('push notif', data);
//     }
// });

AppRegistry.registerComponent(appName, () => App);
