import React, { useContext, useState } from "react";
import styles from "./LoginForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { login } from "../../../utils/AxiosInterceptors";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { addCountryCode } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate()

  const handleLoginMedium = () => {
    setIsPhoneLogin(!isPhoneLogin);
  };

  const submitForm = async (data) => {
    setLoading(true);
    const url = isPhoneLogin
      ? WebsiteApiUrls.LOGIN_MOBILE
      : WebsiteApiUrls.LOGIN_EMAIL;

    if (isPhoneLogin) {
      data.mobile_number = addCountryCode(data.mobile_number);
    }

    try {
      const response = await _sendAPIRequest("POST", url, data);
      if (response.status === 200) {
        setLoading(false);
        login(response.data, 'PORTAL');
        navigate('/portal')
      }
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      if (data) {
        setAlert({
          isVisible: true,
          message: data.error,
          severity: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-heading"])}>
              <h3>Sign In</h3>
            </div>
            <div className={cn("row", styles["form-section"])}>
              <form>
                <div className="row">
                  <div className="col-lg-12">
                    {isPhoneLogin ? (
                      <CustomInput
                        control={control}
                        label="Login with Mobile"
                        name="mobile_number"
                        inputType="tel"
                        placeholder="Login with Mobile"
                        rules={{
                          required: "Mobile number is required.",
                        }}
                      />
                    ) : (
                      <CustomInput
                        control={control}
                        label="Login with Email"
                        name="email"
                        placeholder="Login with Email"
                        rules={{
                          required: "Email is required.",
                        }}
                      />
                    )}
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
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <p className={cn("mb-0", styles["frogetpassword-link"])}>
                      <NavLink to={"/login/forgot-password"}>
                        Forgot your Password?
                      </NavLink>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className={cn("mb-0", styles["switch-link"])}>
                      <span className="cursor" onClick={handleLoginMedium}>
                        {isPhoneLogin
                          ? "Login With Email"
                          : "Login With Mobile"}
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
                        Login
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-lg-12">
                    <p className={cn("mb-0", styles["tnc-note"])}>
                      By continuing, you agree to our{" "}
                      <NavLink to={"/terms-and-conditions"}>
                        Terms and Conditions
                      </NavLink>{" "}
                      and{" "}
                      <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <p className={styles["register-link"]}>
                      New to Bidding Karo?{" "}
                      <NavLink to={"/register"}>Register Now</NavLink>
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

export default LoginForm;
