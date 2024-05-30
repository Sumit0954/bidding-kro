import styles from "./UserProfile.module.scss";
import UserImg from "../../../assets/images/portal/user-profile/user-profile-img.png";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { control, handleSubmit, register, watch, getValues } = useForm();
  const [profileImage, setProfileImage] = useState(UserImg);

  const profile_image = watch("profile_image");
  useEffect(() => {
    // Update previews on file change
    if (typeof profile_image === "object" && profile_image?.length > 0) {
      setProfileImage(URL.createObjectURL(profile_image[0]));
    }
  }, [profile_image]);

  useEffect(() => {
    // Update preview image state if input type="file" (image Blob) was set previously
    const value = getValues("profile_image");
    if (value) {
      if (typeof value === "object" && value?.length > 0) {
        setProfileImage(URL.createObjectURL(value[0]));
      }
    }
  }, [getValues]);

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
                    <img
                      src={profileImage}
                      alt="profile-img"
                      className={styles["logo-img"]}
                    />
                    <label htmlFor="profile-image">
                      <input
                        {...register("profile_image")}
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        id="profile-image"
                      />
                      <span
                        className={cn("btn", "button", styles["upload-btn"])}
                      >
                        Change Profile Image
                      </span>
                    </label>
                    <p className={styles["img-suggestion"]}>
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
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Designation"
                      name="designation"
                      placeholder="Designation "
                      inputType="text"
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
                    <NavLink
                      to={"/portal/company-profile"}
                      className={cn("btn", "button")}
                    >
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
