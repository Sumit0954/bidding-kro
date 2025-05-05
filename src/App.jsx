import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
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
import SenrtErrorDash from "./pages/sentry-error-page";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import NotFound from "./pages/error/NotFound";
import TwakChatbot from "./components/website/twak-chatbot/TwakChatbot";
import PaymentLoader from "./components/portal/bid-activation-payment/PaymentLoader";

function App() {
  const location = useLocation();

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
        // requestNotificationPermission(); // Request permission on login
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

  const isPublicRoute =
    location.pathname.startsWith("/portal") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/sentry");
  return (
    <>
      {!isPublicRoute && <TwakChatbot />}

      <Sentry.ErrorBoundary fallback={<NotFound />}>
        <Routes>
          <Route path="/paymentconfirmation" element={<PaymentLoader />} />
          <Route path="/*" element={<WebsiteRoutes />} />
          <Route path="portal/*" element={<PortalRoutes />} />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="sentry/" element={<SenrtErrorDash />} />
        </Routes>
      </Sentry.ErrorBoundary>
    </>
  );
}

export default App;
