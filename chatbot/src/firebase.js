// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyDqOmdqmsGNhDOrjy_xEIjZ-JnKq7gMBlE",
    authDomain: "my-noob-7739a.firebaseapp.com",
    databaseURL: "https://my-noob-7739a-default-rtdb.firebaseio.com",
    projectId: "my-noob-7739a",
    storageBucket: "my-noob-7739a.appspot.com",
    messagingSenderId: "829264938526",
    appId: "1:829264938526:web:86fa140189c90fcfcbd00f",
    measurementId: "G-SLHR6BV766"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BOTCBlAA7vkwGn93Oi17NSRjCGkjkzeDkHYnyqb6xuU6aIIiFA25bI8HCYs7iRJAv7o7YvxO0Q2rUYFj6ARIpSo` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};



// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  