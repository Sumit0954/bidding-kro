import React from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./Login.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const submitForm = (data) => {
    console.log(data);
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
                    <button
                      type="submit"
                      className={cn("btn", "button")}
                      onClick={handleSubmit(submitForm)}
                    >
                      Login
                    </button>
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
