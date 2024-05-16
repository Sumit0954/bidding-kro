import styles from "./RegistrationOTP.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";

const RegistrationOTP = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [initialCount, setInitialCount] = useState(0);
  const [showThankyou, setShowThankyou] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setInitialCount((lastTimerCount) => {
        lastTimerCount < 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialCount]);

  const resendOTP = () => {
    setInitialCount(45);
    setOtp(new Array(4).fill(""));
  };

  const submitForm = () => {
    console.log(otp.join(""))
    setShowThankyou(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-heading"])}>
              <h5 className="mb-0">
                Please enter the OTP sent to your mobile number{" "}
              </h5>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className={styles["number-container"]}>
                  <p className={cn("mb-0", styles["mobile-number"])}>
                    +91-9999999999
                  </p>
                  <NavLink to={-1}>
                    <div className="btn button">Edit</div>
                  </NavLink>
                </div>

                <div className={styles["otp-box"]}>
                  {otp.map((data, index) => {
                    return (
                      <input
                        className={styles["otp-field"]}
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        placeholder="?"
                      />
                    );
                  })}
                </div>

                <p className={styles["otp-message"]}>Enter 4-digit OTP</p>

                <div className={styles["btn-timer-box"]}>
                  {initialCount > 0 && (
                    <div className={styles["timer"]}>Wait {initialCount}s</div>
                  )}
                  <button
                    type="button"
                    className={cn(
                      "btn",
                      "button",
                      `${initialCount >= 0 && "disable"}`
                    )}
                    onClick={() => resendOTP()}
                    disabled={initialCount > 0 ? true : false}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className={cn("btn", "button", styles["otp-submit-btn"])}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showThankyou && (
        <ThankyouModal
          open={true}
          setShowThankyou={setShowThankyou}
          description={
            "Your registration has been successful. Please check your email to verify your account."
          }
        />
      )}
    </>
  );
};

export default RegistrationOTP;
