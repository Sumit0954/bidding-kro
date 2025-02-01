import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCXC7eJmPlkbZbt8PM0i04BoosyGcVNYMA",
  authDomain: "bidding-karo-79dc4.firebaseapp.com",
  projectId: "bidding-karo-79dc4",
  storageBucket: "bidding-karo-79dc4.firebasestorage.app",
  messagingSenderId: "80516641045",
  appId: "1:80516641045:web:bacbed1ddaa294056df91c",
  measurementId: "G-BD6X2X09S6",
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

// Get Firebase Messaging Instance
const messaging = getMessaging();

// Handle Foreground Notifications
onMessage(messaging, (payload) => {
  console.log("Foreground Notification Received:", payload);

  // Show a browser notification manually
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/bidding-karo.ico", // Change to your app's icon
  });
});
