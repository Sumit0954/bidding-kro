import { useContext, useEffect } from "react";
import _sendAPIRequest from "../helpers/api";
import { PortalApiUrls } from "../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../contexts/AlertProvider";

const RazorpayPaymentHandler = ({ userData, setActivateBid, setShowThankyou, id }) => {
  const { first_name, last_name, email, mobile_number } = userData.user;
  const { setAlert } = useContext(AlertContext);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const handlePayment = async () => {
      setActivateBid(false);

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        setAlert({
          isVisible: true,
          message: "Razorpay SDK failed to load. Are you online?",
          severity: "error",
        });
        return;
      }

      // creating a new order
      const order = await _sendAPIRequest(
        "POST",
        PortalApiUrls.CREATE_ORDER,
        { bid: id },
        true
      );

      if (!order) {
        setAlert({
          isVisible: true,
          message: "Server error. Are you online?",
          severity: "error",
        });
        return;
      }

      // Getting the order details
      const { razorpay_order_id } = order.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        currency: "INR",
        name: "Bidding Karo",
        order_id: razorpay_order_id,
        handler: async function (response) {
          const data = {
            bid: id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await _sendAPIRequest(
            "POST",
            PortalApiUrls.VERIFY_PAYMENT,
            data,
            true
          );

          if(result.status === 204){
            setShowThankyou(true)
            window.location.reload();
          }
        },
        prefill: {
          name: `${first_name} ${last_name}`,
          email: email,
          contact: mobile_number,
        },
        theme: {
          color: "var(--primary-color)",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", (response) => {
        console.log("Error code: " + response.error.code);
        console.log("Error description: " + response.error.description);
        console.log("Error source: " + response.error.source);
        console.log("Error step: " + response.error.step);
        console.log("Error reason: " + response.error.reason);
        console.log("Error order_id: " + response.error.metadata.order_id);
        console.log("Error payment_id: " + response.error.metadata.payment_id);
      });

      rzp1.open();
    };
    handlePayment();
  }, [
    first_name,
    last_name,
    email,
    mobile_number,
    setActivateBid,
    setShowThankyou,
    id,
    setAlert,
  ]);

  return null;
};

export default RazorpayPaymentHandler;
