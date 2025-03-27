import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./Login.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { NavLink } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { login } from "../../../utils/AxiosInterceptors";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const submitForm = async (data) => {
    setLoading(true);
    try {
      const formData = {
        email: data.email,
        password: data.password,
      };
      const response = await _sendAPIRequest(
        "POST",
        AdminApiUrls.ADMIN_LOGIN,
        formData
      );
      if (response.status === 200) {
        setLoading(false);
        login(response.data, "ADMIN");
        window.location.href = "/admin/dashboard";
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
                    <CustomInput
                      control={control}
                      label="Email"
                      name="email"
                      placeholder="Email"
                      rules={{
                        required: "Email is required.",
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
                      }}
                      showPasswordMsg={false}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col text-end">
                    <p className={cn("mb-0", styles["frogetpassword-link"])}>
                      <NavLink to={"/admin/forgot-password"}>
                        Forgot your Password?
                      </NavLink>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
