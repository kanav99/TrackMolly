import database from '@react-native-firebase/database';

const user_ref = database().ref('/users');
const ratings_ref = database().ref('/ratings');

const addUser = async (uid, username, mobile, fcmtoken) => {
  console.log('inside function');
  await user_ref
    .push({
      uid: uid,
      name: username,
      mobile: mobile,
      fcmtoken: fcmtoken,
    })
    .then(() => console.log('Added user ', username));
};

const addSaviour = (uid, s_name, s_mobile) => {
  user_ref.once('value').then(async (snapshot) => {
    var value = snapshot.val();
    console.log(value);
    for (var key in value) {
      console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        await user_ref
          .child(key + '/saviours')
          .push({
            name: s_name,
            mobile: s_mobile,
          })
          .then(() => console.log('added saviour'));
      }
    }
  });
};

const addProtectee = (uid, protectee_id, p_name, p_mobile) => {
  user_ref.once('value').then(async (snapshot) => {
    var value = snapshot.val();
    console.log(value);
    for (var key in value) {
      console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        await user_ref
          .child(key + '/protectees')
          .push({
            id: protectee_id,
            name: p_name,
            mobile: p_mobile,
          })
          .then(() => console.log('added protectee'));
      }
    }
  });
};

const removeSaviour = (uid, saviour_id) => {
  user_ref.once('value').then((snapshot) => {
    var value = snapshot.val();
    for (var key in value) {
      //   console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        user_ref
          .child(key + '/saviours/' + saviour_id)
          .remove()
          .then(() => console.log('removed saviour'));
        //   .once('value')
        //   .then((snapshot_saviour) => {
        //     var saviours = snapshot_saviour.val();
        //     console.log(saviours);
        //     for (var s_key in saviours) {
        //       if (saviours[s_key]['id'] == saviour_id) {
        //         await user_ref
        //           .child(key + '/saviours/' + s_key)
        //           .remove()
        //           .then(() => console.log('removed saviour'));
        //       }
        //     }
        //   });
      }
    }
  });
};

const removeProtectee = (uid, protectee_id) => {
  user_ref.once('value').then(async (snapshot) => {
    var value = snapshot.val();
    console.log(value);
    for (var key in value) {
      console.log(value[key]['name']);
      if (value[key]['uid'] === uid) {
        console.log(uid, value[key]['uid']);
        await user_ref
          .child(key + '/protectees')
          .once('value')
          .then(async (snapshot_protectee) => {
            var protectees = snapshot_protectee.val();
            console.log(protectees);
            for (var p_key in protectees) {
              if (protectees[p_key]['id'] == protectee_id) {
                console.log('inside if', user_ref, key, p_key);
                await user_ref
                  .child(key + '/protectees/' + p_key)
                  .remove()
                  .then(() => console.log('removed protectee'));
              }
            }
          });
      }
    }
  });
};

const addLocation = (uid, location, time) => {
  user_ref.once('value').then((snapshot) => {
    var value = snapshot.val();
    console.log(location + 'RECEIVEDDDDDDDDDDDDDDDDDDDDD');
    for (var key in value) {
      // console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        user_ref
          .child(key + '/logs')
          .push({
            location: location,
            time: time,
          })
          .then(() => console.log('added location'));
      }
    }
  });
};

const getRating = (x, y, cb) => {
  var id = `loc${Math.floor(x * 1000)}|${Math.floor(y * 1000)}`;
  console.log(id);
  ratings_ref
    .child(id)
    .once('value')
    .then((snapshot) => {
      var value = snapshot.val();
      var n = 0;
      var sum = 0.0;
      for (var key in value) {
        sum += value[key];
        n += 1;
      }
      cb(sum / n);
    });
};

const addRating = (uid, x, y, rating) => {
  var id = `loc${Math.floor(x * 1000)}|${Math.floor(y * 1000)}`;
  console.log(id);
  ratings_ref.child(id).child(uid).set(rating);
};

const getLogs = (uid, cb) => {
  user_ref.once('value').then((snapshot) => {
    var value = snapshot.val();
    for (var key in value) {
      if (value[key]['uid'] == uid) {
        user_ref
          .child(key + '/logs')
          .once('value')
          .then((snapshot_logs) => {
            var logs = snapshot_logs.val();
            cb(logs);
          });
      }
    }
  });
};

const getSaviours = (uid, cb) => {
  user_ref.once('value').then((snapshot) => {
    var value = snapshot.val();
    // console.log(value);
    for (var key in value) {
      //   console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        user_ref
          .child(key + '/saviours')
          .once('value')
          .then((snapshot_saviour) => {
            var saviours = snapshot_saviour.val();
            // console.log(saviours);
            cb(saviours);
          });
      }
    }
  });
};

const getProtectees = (uid, cb) => {
  user_ref.once('value').then((snapshot) => {
    var value = snapshot.val();
    // console.log(value);
    for (var key in value) {
      //   console.log(value[key]['name']);
      if (value[key]['uid'] == uid) {
        user_ref
          .child(key + '/protectees')
          .once('value')
          .then((snapshot_saviour) => {
            var protectees = snapshot_saviour.val();
            // console.log(protectees);
            cb(protectees);
          });
      }
    }
  });
};

const testFunction = () => {
  addUser('test-user-1', 'user-1', '+919358232476');
  addUser('test-user-2', 'user-2', '+919580683998');
  addSaviour('test-user-1', 'test-user-2', 'user-2', '+919580683998');
  addProtectee('test-user-2', 'test-user-1', 'user-1', '+919358232476');
  addLocation('test-user-1', 'Roorkee, India', '8:59 PM');
  getSaviours('test-user-1');
  getProtectees('test-user-2');
  removeSaviour('test-user-1', 'test-user-2');
  removeProtectee('test-user-2', 'test-user-1');
};

export {
  addUser,
  addSaviour,
  addProtectee,
  removeProtectee,
  removeSaviour,
  addLocation,
  getProtectees,
  getSaviours,
  getLogs,
  testFunction,
  getRating,
};
