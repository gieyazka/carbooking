importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    // "carbooking/firebase-messaging.js",
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",

);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '851373916828',
    'apiKey': 'AIzaSyCX9MgSHZd64fwVG7I7QriHcfyLzryob08',
    'projectId': 'car-booking-4433a',
    'appId': '1:851373916828:web:bdb3c4099248049c946359',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
console.log(messaging);
messaging.setBackgroundMessageHandler(function (payload) {
    // console.log(
    //     "[firebase-messaging-sw.js] Received background message ",
    //     payload,
    // );

    // Customize notification here
    const notificationTitle = "Car Booking System";
    const notificationOptions = {
        body: "มีการเพิ่มงานให้คุณ.",
        icon: "/logo.png",
    };
    console.log(self.registration);
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
const initMessage = firebase.messaging()