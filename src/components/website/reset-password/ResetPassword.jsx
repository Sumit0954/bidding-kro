import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { passwordValidator } from "../../../helpers/validation";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setError } = useForm();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    setLoading(true);
    const { new_password, confirm_password } = data;

    if (new_password !== confirm_password) {
      setError("confirm_password", {
        type: "focus",
        message: "Passwords do not match.",
      });
    } else {
      try {
        const response = await _sendApiRequest(
          "POST",
          WebsiteApiUrls.RESET_PASSWORD,
          { new_password: new_password },
          true
        );
        if (response.status === 204) {
          setLoading(false);
          navigate("/portal");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-heading"])}>
              <h3>Reset Password</h3>
            </div>
            <div className={cn("row", styles["form-section"])}>
              <form>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Enter New Password"
                      name="new_password"
                      placeholder="Enter New Password"
                      inputType="password"
                      rules={{
                        required: "Enter new password is required.",
                        validate: async (value) =>
                          value &&
                          ((await passwordValidator(value)) !== true
                            ? await passwordValidator(value)
                            : true),
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Re-Enter Password"
                      name="confirm_password"
                      placeholder="Re-Enter Password"
                      inputType="password"
                      rules={{
                        required: "Confirm password is required.",
                        validate: async (value) =>
                          value &&
                          ((await passwordValidator(value)) !== true
                            ? await passwordValidator(value)
                            : true),
                      }}
                    />
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
    </>
  );
};

export default ResetPassword;
