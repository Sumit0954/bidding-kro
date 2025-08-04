import React, { useContext, useEffect, useState } from "react";
import styles from "./CompanyProfile.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import DummyLogo from "../../../assets/images/portal/company-profile/dummy-img.jpg";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import {
  addCountryCode,
  formatUrl,
  modifiedData,
  numberFormatter,
} from "../../../helpers/formatter";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
import { AlertContext } from "../../../contexts/AlertProvider";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";

const CompanyProfile = () => {
  const {
    control,
    handleSubmit,
    register,
    getValues,
    watch,
    reset,
    setError,
    formState: { errors, dirtyFields },
  } = useForm();
  const [companyLogo, setCompanyLogo] = useState(DummyLogo);
  const { userDetails, setNoCompany } = useContext(UserDetailsContext);
  const { companyDetails, setCompanyDetails } = useContext(
    CompanyDetailsContext
  );
  const { setAlert } = useContext(AlertContext);
  const [organizationTypes, setOrganizationType] = useState([]);
  const [loading, setLoading] = useState(false);
  const { action } = useParams();

  const navigate = useNavigate();
  const [gstRegistered, setGstRegistered] = useState("No");

  const logo = watch("logo");
  useEffect(() => {
    // Update previews on file change
    if (typeof logo === "object" && logo?.length > 0) {
      setCompanyLogo(URL.createObjectURL(logo[0]));
    }
  }, [logo]);

  useEffect(() => {
    // Update preview image state if input type="file" (image Blob) was set previously
    const value = getValues("logo");
    if (value) {
      if (typeof value === "object" && value?.length > 0) {
        setCompanyLogo(URL.createObjectURL(value[0]));
      }
    }
  }, [getValues]);

  const getOrganizationType = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_ORGANIZATION_TYPE,
        "",
        true
      );
      if (response.status === 200) {
        const data = modifiedData(response.data);
        setOrganizationType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizationType();
  }, []);

  useEffect(() => {
    if (action === "create") {
      reset({
        business_mobile: numberFormatter(userDetails?.user?.mobile_number),
        business_email: userDetails?.user?.email,
      });
    }

    if (action === "update") {
      if (companyDetails?.gstin) setGstRegistered("Yes");
      setCompanyLogo(companyDetails?.logo || DummyLogo);
      reset({
        ...companyDetails,
        organization_type: companyDetails?.organization_type,
        business_mobile: numberFormatter(companyDetails?.business_mobile),
        business_email: companyDetails?.business_email,
        category: companyDetails?.category_meta?.id,
      });
    }
  }, [action, reset, companyDetails, userDetails]);

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();
    let createFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;
        if (action === "create") {
          if (
            key === "logo" &&
            typeof value === "object" &&
            value?.length > 0
          ) {
            createFormData.append(key, value[0], value[0].name);
          } else if (key === "business_mobile") {
            const mobile_number = addCountryCode(value);
            createFormData.append(key, mobile_number);
          } else if (key === "website") {
            if (value && value.trim() !== "") {
              createFormData.append(key, formatUrl(value));
            } else {
              createFormData.append(key, "");
            }
          } else if (key === "organization_type") {
            createFormData.append(key, value);
          } else if (
            value !== undefined &&
            value !== null &&
            value[0] !== undefined &&
            value[0] !== null
          ) {
            createFormData.append(key, value);
          }
        }

        if (action === "update") {
          Object.entries(dirtyFields).forEach(async (k) => {
            let changedKey = k[0];
            if (key === changedKey) {
              if (
                key === "logo" &&
                typeof value === "object" &&
                value?.length > 0
              ) {
                updateFormData.append(key, value[0], value[0].name);
              } else if (key === "business_mobile") {
                const mobile_number = addCountryCode(value);
                updateFormData.append(key, mobile_number);
              } else if (key === "website") {
                if (value && value.trim() !== "") {
                  updateFormData.append(key, formatUrl(value));
                } else {
                  updateFormData.append(key, "");
                }
              } else {
                updateFormData.append(key, value ? value : "");
              }
            }
          });
        }
        return null;
      });
    }

    if (action === "create") {
      try {
        const response = await _sendAPIRequest(
          "POST",
          PortalApiUrls.CREATE_COMPANY,
          createFormData,
          true
        );
        if (response.status === 201) {
          setLoading(false);
          setCompanyDetails(response.data);
          setAlert({
            isVisible: true,
            message: "Company has been created successfully.",
            severity: "success",
          });
          setNoCompany(false);
          navigate(`/portal/company-profile/category/${response.data.id}`);
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
        if (error.status === 403) {
          setAlert({
            isVisible: true,
            message: error.response.data.detail,
            severity: "error",
          });
        }
        if (data) {
          setErrors(data, watch, setError);

          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }

    if (action === "update") {
      try {
        const response = await _sendAPIRequest(
          "PATCH",
          PortalApiUrls.UPDATE_COMPANY,
          updateFormData,
          true
        );
        if (response.status === 200) {
          setLoading(false);
          setCompanyDetails(response.data);
          setAlert({
            isVisible: true,
            message: "Company has been updated successfully.",
            severity: "success",
          });
          navigate(`/portal/company-profile/category/${response.data.id}`);
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
        if (error.status === 403) {
          setAlert({
            isVisible: true,
            message: error.response.data.detail,
            severity: "error",
          });
        }
        if (data) {
          setErrors(data, watch, setError);

          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  {companyDetails?.formatted_number && (
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div></div> {/* Placeholder for spacing */}
                      <div
                        style={{
                          backgroundColor: "#e6f2ff",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: "#003366",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        Company ID:{" "}
                        <span style={{ color: "#0052cc" }}>
                          {companyDetails?.formatted_number}
                        </span>
                      </div>
                    </div>
                  )}

                  <label>Company Logo</label>
                  <div className={styles["img-container"]}>
                    <div className={styles["img-box"]}>
                      <img
                        src={companyLogo}
                        className={styles["logo-img"]}
                        alt="company-logo"
                      />
                    </div>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                      className={styles["upload-logo-btn"]}
                      sx={{
                        width: "15rem",
                        backgroundColor: "var(--primary-color)",
                        "&:hover": {
                          backgroundColor: "var(--secondary-color)",
                        },
                      }}
                    >
                      Upload Logo
                      <input
                        {...register("logo")}
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        className="visually-hidden-input"
                      />
                    </Button>

                    <p className={styles["img-suggestion"]}>
                      200KB max. JPEG, PNG, JPG format only. Suggested photo
                      width and height: 200*100px.
                    </p>
                  </div>
                  {errors.logo && (
                    <span className="error">
                      {errors?.logo?.message || "Error"}
                    </span>
                  )}
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Company Name"
                      name="name"
                      placeholder="Company Name"
                      rules={{
                        required: "Company name is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Avg. Annual Turnover (Cr.)"
                      name="avg_annual_revenue"
                      placeholder="Ex. 200"
                      inputType="number"
                      inputProps={{
                        step: "any",
                        min: 0,
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Website Url"
                      name="website"
                      placeholder="www.example.com"
                      inputType="text"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Year of Incorporation "
                      name="incorporation_year"
                      placeholder="Year of Incorporation"
                      inputType="number"
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomSelect
                      control={control}
                      name="organization_type"
                      placeholder="Organization Type"
                      options={organizationTypes}
                      label="Organization Type"
                      multiple={false}
                      rules={{
                        required: "Organization Type is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Business Email"
                      name="business_email"
                      placeholder="Business Email"
                      inputType="email"
                      rules={{
                        required: " Business Email is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Business Mobile"
                      name="business_mobile"
                      placeholder="Business Mobile"
                      inputType="tel"
                      rules={{
                        required: "Business Mobile is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="GST"
                      name="gstin"
                      placeholder="GST"
                      inputType="text"
                      rules={{
                        required: "GST is required.",
                        validate: (gstNumber) => {
                          const gstRegex =
                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

                          if (!gstNumber || typeof gstNumber !== "string")
                            return false;

                          if (!gstRegex.test(gstNumber.toUpperCase())) {
                            return "GST number is not valid. Check and re-enter.";
                          }
                          return true;
                        },
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="No. of Employees"
                      name="employee_count"
                      placeholder="No. of Employees"
                      inputType="number"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Company Description"
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-end">
                    {loading ? (
                      <ButtonLoader size={60} />
                    ) : (
                      <button
                        type="submit"
                        className={cn("btn", "button", styles["custom-btn"])}
                      >
                        {action === "create" ? "Create" : "Update"} Business
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

export default CompanyProfile;
