import styles from "./RegistrationOTP.module.scss";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";
import { RegisterDataContext } from "../../../contexts/RegisterDataProvider";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const RegistrationOTP = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [initialCount, setInitialCount] = useState(0);
  const [showThankyou, setShowThankyou] = useState(false);
  const [registerData] = useContext(RegisterDataContext);
  const [loading, setLoading] = useState(false);
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
    const mobile_number = "+91" + registerData.mobile_number;

    try {
      const response = await _sendApiRequest(
        { mobile_number: mobile_number },
        WebsiteApiUrls.SEND_OTP,
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
    setLoading(true);
    registerData.mobile_number = "+91" + registerData.mobile_number;
    registerData.otp = otp.join("");

    try {
      const response = await _sendApiRequest(
        registerData,
        WebsiteApiUrls.REGISTER,
        "POST"
      );
      if (response.status === 201) {
        setLoading(false);
        setShowThankyou(true);
      }
    } catch (error) {
      console.log(error.response.data)
      setLoading(false);
    }
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
                  <div>
                    <p className={cn("mb-0", styles["mobile-number"])}>
                      {registerData.mobile_number}
                    </p>
                    <p className={cn("mb-0", styles["mobile-number"])}>
                      {registerData.email}
                    </p>
                  </div>

                  <NavLink to="/register">
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

                {loading ? (
                  <div className="text-center mt-2">
                    <ButtonLoader size={60} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={cn("btn", "button", styles["otp-submit-btn"])}
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {showThankyou && (
        <ThankyouModal
          open={true}
          setShowThankyou={setShowThankyou}
          description={`Your registration has been successful. Please check your ${registerData.email} to verify your account.`}
        />
      )}
    </>
  );
};

export default RegistrationOTP;
