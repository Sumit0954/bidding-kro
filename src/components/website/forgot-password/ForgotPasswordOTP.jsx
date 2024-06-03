import React from "react";
import cn from "classnames";
import styles from "./ForgotPasswordOTP.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { login } from "../../../utils/AxiosInterceptors";

const ForgotPasswordOTP = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [initialCount, setInitialCount] = useState(0);
  const location = useLocation();
  const { mobile_number } = location.state;
  const navigate = useNavigate();

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

  const resendOTP = async () => {
    try {
      const response = await _sendAPIRequest(
        { mobile_number: mobile_number },
        WebsiteApiUrls.FORGOT_SEND_OTP,
        "POST"
      );
      if (response.status === 204) {
        setInitialCount(45);
        setOtp(new Array(4).fill(""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    let formData = new FormData();
    formData.append("mobile_number", mobile_number);
    formData.append("otp", otp.join(""));

    try {
      const response = await _sendAPIRequest(
        formData,
        WebsiteApiUrls.FORGOT_VERIFY_OTP,
        "POST"
      );
      if (response.status === 200) {
        await login(response.data);
        navigate("/reset-password");
      }
    } catch (error) {}
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
                    {mobile_number}
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
    </>
  );
};

export default ForgotPasswordOTP;
