import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebaseConfig";

const messaging = getMessaging(firebaseApp);

export const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BHNz8PeJeBl7HKgF_URU_cYjxMgijGUFVPlDDOEAp0jO0qEGbzj80IBT8uOmSbY-xhfx94g8f9c4nK1yWO0cOJY",
    });
    console.log("Firebase Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("New FCM Message:", payload);
      resolve(payload);
    });
  });
