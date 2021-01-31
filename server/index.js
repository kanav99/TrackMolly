var firebase = require("firebase");
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());

server.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

server.post("/alert", function (req, res) {
  var uid = req.body.uid;
  var name = req.body.name;
  sendAlert(uid, name);
  console.log(uid, name);
  res.send("POST request");
});

server.post("/safety-check", function (req, res) {
  var uid = req.body.uid;
  var name = req.body.name;
  console.log(uid, name);
  res.send("POST request");
});

server.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});

var firebaseConfig = {
  apiKey: "AIzaSyDobS0UTp5M2x_c15cXxc9lX05JP-B10W8",
  authDomain: "hackvoilet.firebaseapp.com",
  databaseURL: "https://hackvoilet-default-rtdb.firebaseio.com",
  projectId: "hackvoilet",
  storageBucket: "hackvoilet.appspot.com",
  messagingSenderId: "678054540245",
  appId: "1:678054540245:web:41e6fdbbd36257b665c35c",
  measurementId: "G-MRJFJCJ6JF",
};

var app = firebase.initializeApp(firebaseConfig);

// Firebase push notification

function notify(token, data, title, body) {
  var message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    token: token,
  };
  firebase
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

// Firebase database

var db = app.database();
const user_ref = db.ref("/users");

function getSaviours(uid, cb) {
  user_ref.once("value").then((snapshot) => {
    var value = snapshot.val();
    for (var key in value) {
      if (value[key]["uid"] == uid) {
        user_ref
          .child(key + "/saviours")
          .once("value")
          .then((snapshot_saviour) => {
            var saviours = snapshot_saviour.val();
            console.log(saviours);
            cb(saviours);
          });
      }
    }
  });
}

getFCMToken = (uid, cb) => {
  user_ref.once("value").then((snapshot) => {
    var value = snapshot.val();
    for (var key in value) {
      if (value[key]["uid"] == uid) {
        user_ref
          .child(key + "/fcmtoken")
          .once("value")
          .then((snapshot_saviour) => {
            var token = snapshot_saviour.val();
            console.log(token);
            cb(token);
          });
      }
    }
  });
};

function getLastLocation(uid, cb) {
  user_ref.once("value").then((snapshot) => {
    var value = snapshot.val();
    for (var key in value) {
      if (value[key]["uid"] == uid) {
        user_ref
          .child(key + "/logs")
          .once("value")
          .then((snapshot_location) => {
            var latestLocation = snapshot_location.val();
            if (latestLocation) {
              var maxt = 0;
              var maxlog = {};
              for (var l_key in latestLocation) {
                if (latestLocation[l_key].time > maxt) {
                  maxt = latestLocation[l_key].time;
                  maxlog = latestLocation[l_key];
                }
              }
              cb(maxlog);
            } else {
              cb(null);
            }
          });
      }
    }
  });
}

// Twilio
var accountSid = "AC9607a01188e9ea40161051a3679cf566";
var authToken = "8815f4dec383c641b70ce8f85fa9cd82";
var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

async function call(to) {
  await client.calls
    .create({
      url: "http://IP_ADDRESS/voice.xml",
      to: to,
      from: "+12062028257",
    })
    .then((call) => console.log(call.sid));
}

call("+919599346343");

async function sendSms(body, to) {
  await client.messages
    .create({
      body: body,
      from: "+12062028257",
      to: to,
    })
    .then((message) => console.log(message.sid));
}

sendSms("Hi there! Last location of Kanav Gupta is Rithala Sector 9, Delhi (Google maps link http://www.google.com/maps/place/28.7041,77.102)", "+919599346343");

// Send alert to all saviours
function sendAlert(uid, name) {
  getSaviours(uid, (saviours) => {
    getLastLocation(uid, (lastLocation) => {
      for (var key in saviours) {
        sendSms(
          "Hi there! Last location of " +
            name +
            " is " +
            lastLocation.name +
            ` (Google maps link http://www.google.com/maps/place/${lastLocation.latitude},${lastLocation.longitude})`,
          saviours[key]["mobile"]
        );
        call(saviours[key]["mobile"]);
      }
    });
  });
}

function hotline() {
  user_ref
    .once("value")
    .then((snapshot) => {
      var users = snapshot.val();
      for (key in users) {
        var user = users[key];
        console.log(user["name"]);
        getLastLocation(user["uid"], (location) => {
          //   console.log(location.time);
          console.log(location);
          if (location && location.time < Date.now() - 6 * 3600000) {
            // no logs since 6 hours
            console.log("no log");
            // sendAlert(user["id"], user["name"]);
          }
        });
      }
    })
    .catch((err) => console.log(err));
}

hotline();
setInterval(hotline, 3600000); // 1 hour
