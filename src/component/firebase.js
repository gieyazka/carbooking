// var firebase = require("firebase/app");
// require("firebase/messaging");

import firebase from 'firebase'
var config = {
    'messagingSenderId': '851373916828',
    'apiKey': 'AIzaSyCX9MgSHZd64fwVG7I7QriHcfyLzryob08',
    'projectId': 'car-booking-4433a',
    'appId': '1:851373916828:web:bdb3c4099248049c946359',
};
firebase.initializeApp(config);
export default firebase
// const messaging = firebase.messaging();
// messaging
//     .requestPermission()
//     .then(function () {
//         // MsgElem.innerHTML = "Notification permission granted."
//         console.log("Notification permission granted.");

//         // get the token in the form of promise
//         return messaging.getToken()
//     })
//     .then(function (token) {

//         console.log(token)
//     })
//     .catch(function (err) {

//         console.log("Unable to get permission to notify.", err);
//     });

// let enableForegroundNotification = true;
// messaging.onMessage(function (payload) {
//     // console.log("Message received. ", payload);
//     //  NotisElem.innerHTML + JSON.stringify(payload);

//     if (enableForegroundNotification) {
//         console.log("Message received. ", payload);

//         const { title, ...options } = JSON.parse(payload.data.notification);
//         console.log({ title, ...options })
//         navigator.serviceWorker.getRegistrations().then(registration => {
//             console.log(registration[0].showNotification)
//             registration[0].showNotification(title, options);
//         });
//     } else {
//         console.log('no notification')
//     }
// });