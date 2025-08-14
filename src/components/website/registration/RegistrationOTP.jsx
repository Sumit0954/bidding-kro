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
import { AlertContext } from "../../../contexts/AlertProvider";
import { addCountryCode } from "../../../helpers/formatter";

const RegistrationOTP = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [initialCount, setInitialCount] = useState(0);
  const [showThankyou, setShowThankyou] = useState(false);
  const [registerData] = useContext(RegisterDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

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
    const mobile_number = registerData.mobile_number;
    try {
      const response = await _sendApiRequest(
        "POST",
        WebsiteApiUrls.RESEND_OTP,
        {
          mobile_number: mobile_number,
        }
      );
      if (response.status === 200) {
        setInitialCount(45);
        setAlert({
          isVisible: true,
          message: "OTP has been send to your phone number ",
          severity: "success",
        });

        setOtp(new Array(4).fill(""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    setLoading(true);

    registerData.otp = otp.join("");

    if (registerData.otp === 0) {
      setAlert({
        isVisible: true,
        message: "Please enter the OTP",
        severity: "warning",
      });
      setLoading(false);
      return;
    }
    console.log(registerData.otp);
    try {
      const response = await _sendApiRequest(
        "POST",
        WebsiteApiUrls.REGISTER,
        registerData
      );
      if (response.status === 201) {
        setLoading(false);
        setShowThankyou(true);
      }
    } catch (error) {
      setLoading(false);
      const { data } = error.response;

      if (data) {
        const { email, mobile_number, error } = data;

        setAlert({
          isVisible: true,
          message: error,
          severity: "error",
        });

        if (email || mobile_number) {
          setAlert({
            isVisible: true,
            message: email || mobile_number,
            severity: "error",
          });
          navigate("/register");
        }
      }
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

                <div className={cn("row", styles["btn-container"])}>
                  <div className="col">
                    {initialCount > 0 ? (
                      <button
                        className={cn(
                          "btn",
                          "button",
                          `${initialCount >= 0 && "disable"}`
                        )}
                        disabled={initialCount > 0 ? true : false}
                      >
                        Wait {initialCount}s
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={cn("btn", "button")}
                        onClick={() => resendOTP()}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <div className="col">
                    {loading ? (
                      <div className="text-center mt-2">
                        <ButtonLoader size={60} />
                      </div>
                    ) : (
                      <button type="submit" className={cn("btn", "button")}>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showThankyou && (
        <ThankyouModal
          showThankyou={showThankyou}
          setShowThankyou={setShowThankyou}
          heading={"Thank You!"}
          description={`Your registration has been successful. Please check your mail to verify your account.`}
        />
      )}
    </>
  );
};

export default RegistrationOTP;
