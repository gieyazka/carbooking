importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    // "carbooking/firebase-messaging.js",
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",

);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

firebase.initializeApp({
    'messagingSenderId': '851373916828',
    'apiKey': 'AIzaSyCX9MgSHZd64fwVG7I7QriHcfyLzryob08',
    'projectId': 'car-booking-4433a',
    'appId': '1:851373916828:web:bdb3c4099248049c946359',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    const notificationTitle = "Car Booking System";
    const notificationOptions = {
        body: "มีการเพิ่มงานให้คุณ.",
        icon: "/logo.png",
    };
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
const initMessage = firebase.messaging()