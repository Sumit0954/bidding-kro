import React from 'react'
import styles from './SetNewPassword.module.scss'
import CustomInput from '../../../elements/CustomInput/CustomInput';
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, NavLink } from "react-router-dom";

const SetNewPassword = () => {
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
              <h3 className="mb-0" >Set New Password</h3>
            </div>

            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Old Password"
                      name="old-password"
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
                      label="New Password "
                      name="new-password"
                      placeholder="New Password "
                      inputType="password"
                      rules={{
                        required: "New Password is required.",
                      }}
                    />
                  </div>

                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Confirm Password "
                      name="confirm-password "
                      placeholder="Confirm Password "
                      inputType="password"
                      rules={{
                        required: "Confirm Password  is required.",
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
                      Reset Password
                    </button>
                  </div>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetNewPassword