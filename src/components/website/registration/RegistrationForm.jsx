import React from "react";
import styles from "./RegistrationForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, NavLink } from "react-router-dom";

const RegistrationForm = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitForm = (data) => {
    return (
      navigate('/register/otp')
    )
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-heading"])}>
              <h3 className="mb-0" >Sign Up</h3>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="First Name"
                      name="first-name"
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
                      name="last-name"
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
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Mobile"
                      name="mobile"
                      placeholder="Mobile"
                      inputType="tel"
                      rules={{
                        required: "Mobile number is required.",
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

                <div className="row mt-1">
                  <div className="col-lg-12">
                    <p className={cn("mb-0", styles["tnc-note"])}>
                      By continuing, you agree to our{" "}
                      <NavLink to={"/terms-and-conditions"}>Terms and Conditions</NavLink>{" "}and{" "}
                      <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
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
                      Register
                    </button>
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
