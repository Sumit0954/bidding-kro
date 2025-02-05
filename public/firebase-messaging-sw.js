importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCXC7eJmPlkbZbt8PM0i04BoosyGcVNYMA",
  authDomain: "bidding-karo-79dc4.firebaseapp.com",
  projectId: "bidding-karo-79dc4",
  storageBucket: "bidding-karo-79dc4.firebasestorage.app",
  messagingSenderId: "80516641045",
  appId: "1:80516641045:web:bacbed1ddaa294056df91c",
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification Received:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png", // Make sure the icon is correct or update
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Listen for push events
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);
  if (event.data) {
    const payload = event.data.json();
    console.log("Push Payload:", payload);

    // Ensure the payload structure has the notification data
    if (payload.notification) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/bidding-karo.ico", // Update this to your app's icon
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    } else {
      console.log("No notification in payload");
    }
  } else {
    console.log("No data in push event");
  }
});

// Handle notification clicks (optional, can be customized)
self.addEventListener("notificationclick", function (event) {
  console.log("Notification Clicked!", event);
  event.notification.close();
  const clickActionUrl = event.notification?.data?.url
    ? event.notification?.data?.url
    : "http://localhost:3000/portal/";
  // Open the app when clicked
  event.waitUntil(clients.openWindow(clickActionUrl));
});
