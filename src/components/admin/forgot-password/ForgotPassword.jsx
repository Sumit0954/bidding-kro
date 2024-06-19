import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import cn from "classnames";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import CheckEmailModal from "../../../elements/CustomModal/CheckEmailModal";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();
  const [checkEmail, setCheckEmail] = useState(false);

  const submitForm = (data) => {
    console.log(data);
    setCheckEmail(true);
  };

  return (
    <>
      <>
        <div className="container">
          <div className="row">
            <div className={styles["form-container"]}>
              <div className={cn("row", styles["form-heading"])}>
                <h3>Forgot Password</h3>
              </div>

              <div className={cn("row", styles["form-section"])}>
                <div className={cn("row", styles["reset-info"])}>
                  <p>
                    Enter the email address associated with your account. We
                    will send you a link to reset your password.
                  </p>
                </div>

                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        label="Email Address"
                        name="email"
                        placeholder="Email Address"
                        inputType="email"
                        rules={{
                          required: "Email address is required.",
                        }}
                      />
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

        {checkEmail && (
          <CheckEmailModal
            checkEmail={checkEmail}
            setCheckEmail={setCheckEmail}
            description={
              "We've sent a link to reset your password at example@gmail.com"
            }
          />
        )}
      </>
    </>
  );
};

export default ForgotPassword;
