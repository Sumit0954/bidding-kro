import React, { useContext, useEffect, useState } from "react";
import styles from "./RegistrationForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, NavLink } from "react-router-dom";
import { RegisterDataContext } from "../../../contexts/RegisterDataProvider";
import { AlertContext } from "../../../contexts/AlertProvider";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
} from "../../../helpers/validation";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { addCountryCode } from "../../../helpers/formatter";

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useContext(RegisterDataContext);
  const { setAlert } = useContext(AlertContext);

  const submitForm = async (data) => {
    setLoading(true);
    setRegisterData(data);
    const mobile_number = addCountryCode(data.mobile_number);

    try {
      const response = await _sendApiRequest("POST", WebsiteApiUrls.SEND_OTP, {
        mobile_number: mobile_number,
      });
      if (response.status === 200) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "OTP is sent to Your Mobile Number.",
          severity: "success",
        });
        navigate("/register/otp");
      }
    } catch (error) {
      setLoading(false);
      const message = error?.response?.data?.error;

      if (message) {
        setAlert({
          isVisible: true,
          message,
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    reset(registerData);
  }, [reset, registerData]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-heading"])}>
              <h3 className="mb-0">Sign Up</h3>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="First Name"
                      name="first_name"
                      placeholder="First Name"
                      rules={{
                        required: "First name is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Last Name"
                      name="last_name"
                      placeholder="Last Name"
                      rules={{
                        required: "Last name is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Email"
                      name="email"
                      placeholder="Email"
                      inputType="email"
                      rules={{
                        required: "Email address is required.",
                        pattern: emailValidator,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Phone Number"
                      name="mobile_number"
                      placeholder="Phone Number"
                      inputType="tel"
                      rules={{
                        required: "Mobile number is required.",
                        pattern: phoneValidator,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Password"
                      name="password"
                      placeholder="Password"
                      inputType="password"
                      rules={{
                        required: "Password is required.",
                        validate: async (value) =>
                          value &&
                          ((await passwordValidator(value)) !== true
                            ? await passwordValidator(value)
                            : true),
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className={cn("col-lg-12", styles["checkbox-field"])}>
                    <input
                      {...register("checkbox", {
                        required: "checkbox is required",
                      })}
                      type="checkbox"
                      name="checkbox"
                      className="cursor"
                    />
                    <p className={cn("mb-0", styles["tnc-note"])}>
                      By continuing, you agree to our{" "}
                      <NavLink to={"/terms-and-conditions"}>
                        Terms and Conditions
                      </NavLink>{" "}
                      and{" "}
                      <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
                    </p>
                  </div>
                  {errors.checkbox && (
                    <span className="error">
                      {errors.checkbox.message || "Error"}
                    </span>
                  )}
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
                        Register
                      </button>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <p className={styles["login-link"]}>
                      Already have account with Bidding Karo?{" "}
                      <NavLink to={"/login"}>Login Now</NavLink>
                    </p>
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

export default RegistrationForm;
