import React, { useContext, useState } from "react";
import styles from "./SetNewPassword.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const SetNewPassword = () => {
  const { control, handleSubmit, setError } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const submitForm = async (data) => {
    setLoading(true);

    const { old_password, new_password, confirm_password } = data;

    if (new_password !== confirm_password) {
      setError("confirm_password", {
        type: "focus",
        message: "Passwords do not match.",
      });
    } else {
      try {
        const data = { old_password: old_password, new_password: new_password };
        const response = await _sendAPIRequest(
          "PUT",
          PortalApiUrls.CHANGE_PASSWORD,
          data,
          true
        );
        if (response.status === 204) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "Password changed successfully.",
            severity: "success",
          });
        }
      } catch (error) {
        setLoading(false);
        if (error.response.status === 400) {
          const { data } = error.response;
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
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
              <h3 className="mb-0">Set New Password</h3>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Old Password"
                      name="old_password"
                      placeholder="Old Password"
                      inputType="password"
                      rules={{
                        required: "Old Password is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="New Password"
                      name="new_password"
                      placeholder="New Password"
                      inputType="password"
                      rules={{
                        required: "New Password is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Confirm Password"
                      name="confirm_password"
                      placeholder="Confirm Password "
                      inputType="password"
                      rules={{
                        required: "Confirm Password is required.",
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
                        Reset Password
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

export default SetNewPassword;
