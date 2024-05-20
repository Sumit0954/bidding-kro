import styles from "./UserProfile.module.scss";
import UserImg from "../../../assets/images/portal/user-profile/user-profile-img.png";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { control, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className={cn("col-lg-12", styles["image-section"])}>
                    <img src={UserImg} alt="" className={styles["logo-img"]} />
                    <button type="button" className={cn("btn", "button")}>
                      Change Profile Image
                    </button>
                    <p className={styles['img-suggestion']}>
                      200KB max. JPEG, PNG, JPG format only. Suggested photo
                      width and height: 200*100px.
                    </p>
                  </div>
                </div>

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
                <div className={cn("row", "my-3")}>
                  <div className={styles["btn-section"]}>
                    <button
                      type="submit"
                      className={cn("btn", "button")}
                      onClick={handleSubmit(submitForm)}
                    >
                      Update
                    </button>
                    <NavLink to={'/portal/company-profile'} className={cn("btn", "button")}>
                      Add Company
                    </NavLink>
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

export default UserProfile;
