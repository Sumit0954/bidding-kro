import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import PortalRoutes from "./routes/PortalRoutes";
import AdminRoutes from "./routes/AdminRoutes";
// import {
//   requestFirebaseNotificationPermission,
//   onMessageListener,
// } from "./firebaseMessaging";
import { getMessaging, getToken } from "firebase/messaging";
import _sendAPIRequest from "./helpers/api";
import { PortalApiUrls } from "./helpers/api-urls/PortalApiUrls";
import * as Sentry from "@sentry/react";

const requestNotificationPermission = async () => {
  console.log("chck token");
  try {
    const messaging = getMessaging();
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BHNz8PeJeBl7HKgF_URU_cYjxMgijGUFVPlDDOEAp0jO0qEGbzj80IBT8uOmSbY-xhfx94g8f9c4nK1yWO0cOJY",
      });
      console.log("FCM Token:", token);
      localStorage.setItem("FCMToken", token);
      RegisterFCMToken(token);
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

const RegisterFCMToken = async (token) => {
  try {
    const formData = new FormData();
    formData.append("token", token);

    const response = await _sendAPIRequest(
      "PUT",
      `${PortalApiUrls.REGISTER_FCM_TOKEN}`,
      formData,
      true
    );
    if (response.status === 200) {
      console.log("Register FCM Token Sucessfully");
    }
  } catch (error) {
    console.log(error.response);
  }
};

function App() {
  // useEffect(() => {
  //   requestFirebaseNotificationPermission()
  //     .then((token) => {
  //       if (token) {
  //         console.log("Firebase Token Received:", token);
  //       }
  //     })
  //     .catch((err) => console.log("Notification permission error:", err));

  //   // Listen for incoming messages
  //   onMessageListener()
  //     .then((payload) => {
  //       console.log("New Notification:", payload);
  //     })
  //     .catch((err) => console.log("Error receiving message:", err));
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    // Function to check localStorage changes
    const checkLoginStatus = () => {
      // console.log("chck login");
      const token = localStorage.getItem("accessToken");
      if (token && !isLoggedIn) {
        setIsLoggedIn(true);
        requestNotificationPermission(); // Request permission on login
      }
    };

    // Listen for localStorage changes (login/logout)
    window.addEventListener("storage", checkLoginStatus);

    // Fallback: Poll every 1 sec in case login happens on the same tab
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const messaging = getMessaging();

  //   // Request permission from the user
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");

  //       // Get the Firebase Cloud Messaging token
  //       getToken(messaging, {
  //         vapidKey:
  //           "BHNz8PeJeBl7HKgF_URU_cYjxMgijGUFVPlDDOEAp0jO0qEGbzj80IBT8uOmSbY-xhfx94g8f9c4nK1yWO0cOJY",
  //       })
  //         .then((token) => {
  //           console.log("FCM Token:", token);
  //         })
  //         .catch((error) => {
  //           console.error("Error getting FCM token:", error);
  //         });
  //     }
  //   });
  // }, []);

  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="portal/*" element={<PortalRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
      </Routes>
    </Sentry.ErrorBoundary>
  );
}

export default App;
