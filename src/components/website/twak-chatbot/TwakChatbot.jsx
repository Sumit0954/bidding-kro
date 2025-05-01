import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TwakChatbot = () => {
  const location = useLocation();
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);

  // Called when Tawk.to widget is fully loaded
  const handleTawkLoad = () => {
    setIsTawkLoaded(true);
  };

  useEffect(() => {
    const isPublicRoute =
      location.pathname.startsWith("/portal") ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/sentry");

    if (isTawkLoaded && window.Tawk_API) {
      if (isPublicRoute) {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.showWidget();
        window.Tawk_API.minimize(function (error) {
          if (error) console.log("Tawk error:", error);
        });
      }
    }
  }, [location.pathname, isTawkLoaded]);

  return (
    <TawkMessengerReact
      propertyId={import.meta.env.VITE_TAWK_PROPERTY_ID}
      widgetId={import.meta.env.VITE_TAWK_WIDGET_ID}
      onLoad={handleTawkLoad}
    />
  );
};

export default TwakChatbot;
