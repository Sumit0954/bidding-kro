import styles from './UserProfile.module.scss'
import UserImg from '../../../assets/images/portal/layout/icons/user-profile-img.png'
import CustomInput from '../../../elements/CustomInput/CustomInput';
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, NavLink } from "react-router-dom";

const UserProfile = () => {
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
              <div className="col-lg-12">
                <img src={UserImg} alt="" srcset="" className={styles['logo-img']} />
              </div>
              <div className={cn("col-lg-12", styles['custom-text'])}>
                <div className="col text-center">
                  <button
                    type="button"
                    className={cn("btn", "button")}
                    onClick={handleSubmit(submitForm)}
                  >
                    Change Profile Image
                  </button>


                </div>
                <br />
                <p>200KB max. JPEG, PNG, JPG format only. Suggested photo width and height: 200*100px.</p>
              </div>
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
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="WhatsApp"
                      name="whatsapp"
                      placeholder="WhatsApp"
                      inputType="tel"
                      rules={{
                        required: "Whatsapp is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Designation"
                      name="designation"
                      placeholder="Designation "
                      inputType="text"
                      rules={{
                        required: "Designation is required.",
                      }}
                    />
                  </div>
                </div>



                <div className="row my-3">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className={cn("btn", "button", styles['custom-update'])}
                    // onClick={handleSubmit(submitForm)}
                    >
                      Update
                    </button>

                  </div>
                  <div className="col text-center">
                    <button
                      type="button"
                      className={cn("btn", "button", styles['custom-btn'])}
                    >
                      Add Company
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

export default UserProfile