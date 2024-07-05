import { useEffect } from "react";

const RazorpayPaymentHandler = ({ userData, setActivateBid }) => {
  const { first_name, last_name, email, mobile_number } = userData.user;

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
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        currency: "INR",
        name: "Bidding Karo",
        prefill: {
          name: `${first_name} ${last_name}`,
          email: email,
          contact: mobile_number,
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
  }, [first_name, last_name, email, mobile_number, setActivateBid]);

  return null;
};

export default RazorpayPaymentHandler;
