import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import CheckEmailModal from "../../../elements/CustomModal/CheckEmailModal";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";

const ForgotPassword = () => {
  const { control, handleSubmit, setError } = useForm();
  const [isPhoneReset, setIsPhoneReset] = useState(false);
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetMedium = () => {
    setIsPhoneReset(!isPhoneReset);
  };

  const submitForm = async (data) => {
    if (isPhoneReset) {
      data.mobile_number = "+91" + data.mobile_number;
      try {
        const response = await _sendApiRequest(
          "POST",
          WebsiteApiUrls.FORGOT_SEND_OTP,
          data,
        );
        if (response.status === 204) {
          navigate("/login/forgot-password/otp", {
            state: { mobile_number: data.mobile_number },
          });
        }
      } catch (error) {
        const { data } = error.response;
        if (data.error) {
          setError("mobile_number", {
            type: "focus",
            message: data.error,
          });
        }
      }
    } else {
      try {
        const response = await _sendApiRequest(
          "POST",
          WebsiteApiUrls.FORGOT_PASSWORD_EMAIL,
          data,
        );
        if (response.status === 204) {
          setEmail(data.email);
          setCheckEmail(true);
        }
      } catch (error) {
        const { data } = error.response;
        if (data.error) {
          setError("email", {
            type: "focus",
            message: data.error,
          });
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
                        label="Mobile Number"
                        name="mobile_number"
                        placeholder="Mobile Number"
                        inputType="tel"
                        rules={{
                          required: "Mobile number is required.",
                        }}
                      />
                    ) : (
                      <CustomInput
                        control={control}
                        label="Email Address"
                        name="email"
                        placeholder="Email Address"
                        inputType="tel"
                        rules={{
                          required: "Email address is required.",
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
                          ? "Use Email Instead"
                          : "Use Mobile Instead"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className={cn("btn", "button")}
                      onClick={handleSubmit(submitForm)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {!isPhoneReset && checkEmail && (
        <CheckEmailModal
          open={true}
          setCheckEmail={setCheckEmail}
          description={`We've sent a link to reset your password at ${email}`}
        />
      )}
    </>
  );
};

export default ForgotPassword;
