importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
  // "carbooking/firebase-messaging.js",
  "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js"
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
  "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js"
);

firebase.initializeApp({
  messagingSenderId: "851373916828",
  apiKey: "AIzaSyCX9MgSHZd64fwVG7I7QriHcfyLzryob08",
  projectId: "car-booking-4433a",
  appId: "1:851373916828:web:bdb3c4099248049c946359",
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
    notificationOptions
  );
});
// const CACHE_NAME = "offline";
// const OFFLINE_URL = "offline.html";

// self.addEventListener("install", function (event) {
//   console.log("[ServiceWorker] Install");

//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       // Setting {cache: 'reload'} in the new request will ensure that the response
//       // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//       await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
//     })()
//   );

//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("[ServiceWorker] Activate");
//   event.waitUntil(
//     (async () => {
//       // Enable navigation preload if it's supported.
//       // See https://developers.google.com/web/updates/2017/02/navigation-preload
//       if ("navigationPreload" in self.registration) {
//         await self.registration.navigationPreload.enable();
//       }
//     })()
//   );

//   // Tell the active service worker to take control of the page immediately.
//   self.clients.claim();
// });

// self.addEventListener("fetch", function (event) {
//   // console.log('[Service Worker] Fetch', event.request.url);
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResponse = await event.preloadResponse;
//           if (preloadResponse) {
//             return preloadResponse;
//           }

//           const networkResponse = await fetch(event.request);
//           return networkResponse;
//         } catch (error) {
//           console.log(
//             "[Service Worker] Fetch failed; returning offline page instead.",
//             error
//           );

//           const cache = await caches.open(CACHE_NAME);
//           const cachedResponse = await cache.match(OFFLINE_URL);
//           return cachedResponse;
//         }
//       })()
//     );
//   }
// });

const initMessage = firebase.messaging();
