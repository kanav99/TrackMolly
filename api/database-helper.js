import database from '@react-native-firebase/database';

const user_ref = database().ref('/users');

const addUser = (username, mobile) => {
    console.log('inside function');
    user_ref.push({
        name: username,
        mobile: mobile,
    })
    .then(() => console.log("Added user ", username));
}

export default addUser;