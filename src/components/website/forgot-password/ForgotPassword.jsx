import React, { useContext, useState } from "react";
import styles from "./ForgotPassword.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import CheckEmailModal from "../../../elements/CustomModal/CheckEmailModal";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { addCountryCode } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import _sendAPIRequest from "../../../helpers/api";
import { Pattern } from "@mui/icons-material";

const ForgotPassword = () => {
  const { control, handleSubmit, setError } = useForm();
  const [isPhoneReset, setIsPhoneReset] = useState(false);
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const handleResetMedium = () => {
    setIsPhoneReset(!isPhoneReset);
  };

  const submitForm = async (data) => {
    console.log(data.email.toLowerCase(), " : email");
    setLoading(true);
    if (isPhoneReset) {
      data.mobile_number = addCountryCode(data.mobile_number);
      try {
        const response = await _sendApiRequest(
          "POST",
          WebsiteApiUrls.FORGOT_SEND_OTP,
          data
        );
        if (response.status === 200) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "OTP is sent to Your Mobile Number.",
            severity: "success",
          });
          navigate("/login/forgot-password/otp", {
            state: { mobile_number: data.mobile_number },
          });
        }
      } catch (error) {
        setLoading(false);
        const { data, config } = error.response;
        if (data.error_code === 1004) {
          setError("mobile_number", {
            type: "focus",
            message: data.error_description,
          });
        } else if (data.error_code === 1002) {
          const parsedData = JSON.parse(config?.data);

          try {
            const response = await _sendApiRequest(
              "POST",
              WebsiteApiUrls.SEND_OTP,
              { mobile_number: addCountryCode(parsedData?.mobile_number) }
            );
            if (response.status === 204) {
              setLoading(false);
              setAlert({
                isVisible: true,
                message: "OTP is sent to Your Mobile Number.",
                severity: "success",
              });
              navigate("/login/forgot-password/otp", {
                state: { mobile_number: parsedData?.mobile_number },
              });
            }
          } catch (error) {
            const { data } = error.response;
            if (data.error_code === 1004) {
              setError("mobile_number", {
                type: "focus",
                message: data.error_description,
              });
            }
          }
        } else {
          setAlert({
            isVisible: true,
            message: data.error_description,
            severity: "error",
          });
        }
      }
    } else {
      try {
        const forgotEmail = {
          email: data.email.toLowerCase(),
        };
        console.log(forgotEmail, " : forgotEmail");
        const response = await _sendApiRequest(
          "POST",
          WebsiteApiUrls.FORGOT_PASSWORD_EMAIL,
          forgotEmail
        );
        if (response.status === 204) {
          setLoading(false);
          setCheckEmail(true);
        }
      } catch (error) {
        setLoading(false);
        const { data, config } = error.response;
        const parsedData = JSON.parse(config?.data);
        setEmail(parsedData.email);
        if (data.error_code === 1001) {
          setAlert({
            isVisible: true,
            message: data.error_description,
            severity: "error",
          });
          try {
            const formData = { email: parsedData.email };
            const response = await _sendAPIRequest(
              "POST",
              WebsiteApiUrls.RESEND_VERIFY_EMAIL,
              formData
            );
            if (response.status === 204) {
              setShowVerificationPopup(true);
              localStorage.setItem("showReset", true);
            }
          } catch (error) {
            if (error.response.data.error_code === 1003) {
              setAlert({
                isVisible: true,
                message: error.response.data.error_description,
                severity: "error",
              });
            }
          }
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
              <h3>Forgot Password</h3>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <div className={cn("row", styles["reset-info"])}>
                {isPhoneReset ? (
                  <p>
                    Enter the phone number associated with your account. We will
                    send you an OTP to reset your password.
                  </p>
                ) : (
                  <p>
                    Enter the email address associated with your account. We
                    will send you a link to reset your password.
                  </p>
                )}
              </div>

              <form>
                <div className="row">
                  <div className="col-lg-12">
                    {isPhoneReset ? (
                      <CustomInput
                        control={control}
                        label="Enter Phone Number"
                        name="mobile_number"
                        placeholder="Mobile Number"
                        inputType="tel"
                        rules={{
                          required: "Mobile number is required.",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Enter a valid 10-digit mobile number.",
                          },
                        }}
                      />
                    ) : (
                      <CustomInput
                        control={control}
                        label="Enter Email Address"
                        name="email"
                        placeholder="Email Address"
                        rules={{
                          required: "Email address is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address.",
                          },
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <NavLink to={-1} className={styles["back-btn"]}>
                      Back
                    </NavLink>
                  </div>
                  <div className="col-lg-6">
                    <p className={cn("mb-0", styles["switch-link"])}>
                      <span className="cursor" onClick={handleResetMedium}>
                        {isPhoneReset
                          ? "Reset Using Email"
                          : "Reset Using Phone Number"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-center">
                    {loading ? (
                      <ButtonLoader size={60} />
                    ) : (
                      <button
                        type="submit"
                        className={cn("btn", "button")}
                        onClick={handleSubmit(submitForm)}
                      >
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

      {!isPhoneReset && checkEmail && (
        <CheckEmailModal
          checkEmail={checkEmail}
          setCheckEmail={setCheckEmail}
          description={`We've sent a link to reset your password at ${email}`}
        />
      )}

      {showVerificationPopup && (
        <CheckEmailModal
          checkEmail={showVerificationPopup}
          setCheckEmail={setShowVerificationPopup}
          description={`Your email address is not verified yet. Please check your ${email} to verify your account.`}
        />
      )}
    </>
  );
};

export default ForgotPassword;
