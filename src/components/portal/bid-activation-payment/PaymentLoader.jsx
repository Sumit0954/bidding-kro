import React from "react";
import Alert from "@mui/material/Alert";
import styles from "./PaymentLoader.module.scss";

const PaymentLoader = () => {
  return (
    <div className={styles["loader-wrapper"]}>
      <div className={styles["loader"]}></div>
      <p className={styles["loader-text"]}>
        Confirming your payment, please wait...
      </p>

      <Alert severity="warning" className={styles["alert-box"]}>
        Payment is under process. <strong>Do not reload</strong> or{" "}
        <strong>switch</strong> the page — it may affect your data.
      </Alert>
    </div>
  );
};

export default PaymentLoader;
