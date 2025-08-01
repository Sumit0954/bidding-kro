import styles from "./UserProfile.module.scss";
import UserImg from "../../../assets/images/portal/user-profile/user-profile-img.png";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { phoneValidator } from "../../../helpers/validation";
import { addCountryCode, numberFormatter } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    setError,
    formState: { errors, dirtyFields },
  } = useForm();
  const [profileImage, setProfileImage] = useState(UserImg);
  const { userDetails, getUserProfile } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

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

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();
    let excludeFields = ["email", "mobile_number"];

    // ✅ Handle WhatsApp number: Send empty string if user cleared it
    if (typeof data.whatsapp_number === "string") {
      const trimmed = data.whatsapp_number.trim();
      if (trimmed) {
        data.whatsapp_number = addCountryCode(trimmed);
      } else {
        data.whatsapp_number = ""; // Explicitly send empty string
      }
    }

    if (typeof data.profile_image !== "object") {
      excludeFields.push("profile_image");
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (!excludeFields.includes(key)) {
          if (typeof value === "object" && value?.length > 0) {
            updateFormData.append(key, value[0], value[0].name);
          } else {
            updateFormData.append(key, value ?? "");
          }
        }
      });
    }

    try {
      const response = await _sendAPIRequest(
        "PATCH",
        PortalApiUrls.UPDATE_USER_PROFILE,
        updateFormData,
        true
      );
      if (response.status === 200) {
        setAlert({
          isVisible: true,
          message: "Profile has been updated successfully.",
          severity: "success",
        });
        await getUserProfile();
        if (companyDetails) {
          navigate("/portal/company-profile/update");
        } else {
          navigate("/portal/company-profile/create");
        }
      }
    } catch (error) {
      const { data } = error.response;
      if (data?.profile_image) {
        setError("profile_image", {
          type: "focus",
          message: data.profile_image,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const { user, ...user_profile } = userDetails;
    const mobile_number = numberFormatter(user?.mobile_number);
    const whatsapp_number = numberFormatter(user_profile?.whatsapp_number);
    setProfileImage(user_profile?.profile_image || UserImg);
    reset({
      ...user,
      ...user_profile,
      mobile_number: mobile_number,
      whatsapp_number: whatsapp_number,
    });
  }, [reset, userDetails]);

  console.log(userDetails?.user?.first_name, " : userDetails");
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
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        "&:hover": {
                          backgroundColor: "var(--secondary-color)",
                        },
                      }}
                    >
                      Change Profile Image
                      <input
                        {...register("profile_image")}
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        className="visually-hidden-input"
                      />
                    </Button>

                    {errors.profile_image && (
                      <span className="error mb-0">
                        {errors.profile_image.message || "Error"}
                      </span>
                    )}
                    <p className={styles["img-suggestion"]}>
                      200KB max. JPEG, PNG, JPG format only. Suggested photo
                      width and height: 200*100px.
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6" style={{ cursor: "not-allowed" }}>
                    <CustomInput
                      control={control}
                      label="First Name"
                      name="first_name"
                      placeholder="First Name"
                      rules={{
                        required: "First name is required.",
                      }}
                      disableField={true}
                    />
                  </div>
                  <div className="col-lg-6" style={{ cursor: "not-allowed" }}>
                    <CustomInput
                      control={control}
                      label="Last Name"
                      name="last_name"
                      placeholder="Last Name"
                      rules={{
                        required: "Last name is required.",
                      }}
                      disableField={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6" style={{ cursor: "not-allowed" }}>
                    <CustomInput
                      control={control}
                      label="Email"
                      name="email"
                      placeholder="Email"
                      inputType="email"
                      rules={{
                        required: "Email address is required.",
                      }}
                      disableField={true}
                    />
                  </div>
                  <div className="col-lg-6" style={{ cursor: "not-allowed" }}>
                    <CustomInput
                      control={control}
                      label="Mobile"
                      name="mobile_number"
                      placeholder="Mobile"
                      inputType="tel"
                      rules={{
                        required: "Mobile number is required.",
                      }}
                      disableField={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="WhatsApp Number"
                      name="whatsapp_number"
                      placeholder="WhatsApp"
                      inputType="tel"
                      rules={{
                        required: "Mobile number is required.",
                        validate: (value) => {
                          const formatted = value.replace(/\D/g, ""); // Remove non-digits
                          return (
                            formatted.length === 10 ||
                            "Please enter a valid 10-digit number."
                          );
                        },
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
                    {loading ? (
                      <ButtonLoader size={60} />
                    ) : (
                      <button
                        type="submit"
                        className={cn("btn", "button")}
                        onClick={handleSubmit(submitForm)}
                      >
                        Update
                      </button>
                    )}
                    {!companyDetails && (
                      <NavLink
                        to={"/portal/company-profile/create"}
                        className={cn("btn", "button")}
                      >
                        Add Company
                      </NavLink>
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

export default UserProfile;
