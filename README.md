# TrackMolly

![](https://i.imgur.com/xd7UWQ4.png)

Privacy-preserving tracking for social safety - made for women and everyone.

## Inspiration

Women have fought a long battle for their freedom from bounds set by a patriarchal society like restrictions on their clothing, on their movement, jobs, etc. But there is still one thing that restricts their freedom - safety. Crimes against women have significantly restricted their freedom - they are still hesitant to work in night shifts or travel to unknown cities. While this concern of safety can be partly solved by tracking location using applications like Google Maps and WhatsApp and sending them to known ones, this again puts them in the question - are they really free when they can be constantly spied by someone? TrackMolly is an application that aims to solve this issue of safety and privacy.

## What it does

TrackMolly is a smart real-time location logger that uses its powerful algorithm to ensure safety for women without compromising their security and privacy. TrackMolly logs the location of the user every 5 minutes and stores it in a secure remote database (not shared with anyone). It tries to detect if there is an emergency situation by a smart algorithm - if the device is connected to the internet, it sees if there is any movement. While slight movement can hint that the user is working while seated, no movement at all can be a case of emergency. If they are not connected to the internet for a very long time, it assumes that there is a situation of emergency (this 'very long time' is subject to the safety rating of the last logged location, this rating is determined by the notoriety of the place using the reviews by existing users).

When it is an emergency situation, it sends an emergency alert to all of the "saviors" listed by the user and sends the location logs of the last day to them. This alert can also be triggered manually on the app. This way, the location is not always sent to the user's saviors, but only when our algorithm detects distress. Application is also protected by PIN, so their logs are not visible to anyone but them.

We also have a provision when the user is forcefully made to stop the tracking from the app by a malicious entity - the user needs to enter the application PIN in reverse order - this way, the application knows that the user is in a distress and triggers an emergency alert while acting as if nothing happened on the frontend.

## How we built it

The application is built in React Native - this way we can easily port it into iOS (currently not supported). The design of the application was done on Figma. We used Firebase Realtime Database as a storage provider and Firebase Authentication for building the phone-based authentication. We also have a Node.js server that does all the distress detection and messaging and calling to the saviours using Twilio. We used a plethora of open source React Native packages to achieve the overall functionality.

## Challenges we ran into

Even though the open-source packages were of huge help, they had many limitations - especially in the location and motion tracking is a bit rudimentary. It sometimes does and sometimes doesn't logs the location and sometimes it pushes in a burst - this affects the algorithm to fail. Hence, the algorithm is not so dependable as of now. Time was a limitation for us. 

## Accomplishments that we are proud of

We are very proud of the impact this application makes. And to pull it off in a short span of time of a single day is a very massive feat for us. No matter how rudimentary the algorithm might be, it works really well and the complete pipeline of location logging to alerts just fits! We are also proud of the fact that we were able to both design and develop the app, we worked smartly as a team in a way that we were not blocked by our design requirements and developed as a great team!

## What I learned

We all were already well versed with React Native and making mobile applications, but had never worked on an application that tracks the locations and never realized that it can be a very tough thing to do given the state of existing packages. We were used to Expo applications, but location services cannot be run on Expo, so we had to set up all the emulator and run it natively.

## What's next for TrackMolly

The application is far from being a polished application. It is rough around the edges. The server uses the trial account of Twilio, and hence we can only make calls to manually verified numbers. We need to shift to pushbullet API to level it up. We need better distress detection to be deployed and published.
