import React, { useContext, useEffect, useState } from "react";
import styles from "./CompanyProfile.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import DummyLogo from "../../../assets/images/portal/company-profile/dummy-img.jpg";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import AddressForm from "./AddressForm";
import CertificateForm from "./CertificateForm";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import {
  addCountryCode,
  modifiedData,
  numberFormatter,
} from "../../../helpers/formatter";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { websiteValidator } from "../../../helpers/validation";
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
  const { userDetails } = useContext(UserDetailsContext);
  const { companyDetails, setCompanyDetails } = useContext(
    CompanyDetailsContext
  );
  const { setAlert } = useContext(AlertContext);
  const [organizationTypes, setOrganizationType] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { action } = useParams();
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

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

  const getCategories = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CATEGORIES,
        "",
        true
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {}
  };

  // Fetch Dropdown's List Data
  useEffect(() => {
    getOrganizationType();
    getCategories();
  }, []);

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
          } else if (key === "category") {
            value?.map((item) => createFormData.append(key, item));
          } else {
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
              } else if (key === "category") {
                console.log(value);
                value?.map((item) => updateFormData.append(key, item));
              } else {
                updateFormData.append(key, value ? value : "");
              }
            }
          });
        }
      });
    }
    /* -- */

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
          navigate("/portal/company-profile/update");
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
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
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
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

  useEffect(() => {
    if (action === "create") {
      reset({
        business_mobile: numberFormatter(userDetails?.user?.mobile_number),
        business_email: userDetails?.user?.email,
      });
    }

    if (action === "update") {
      setAddresses(companyDetails?.address);
      setCertificates(companyDetails?.certificate);
      setCompanyLogo(companyDetails?.logo);
      reset({
        ...companyDetails,
        organization_type: companyDetails?.organization_type,
        business_mobile: numberFormatter(companyDetails?.business_mobile),
        business_email: companyDetails?.business_email,
        category: companyDetails?.categories,
      });
    }
  }, [action, reset, companyDetails, userDetails]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
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
                      label="Avg. Annual Revenue"
                      name="avg_annual_revenue"
                      placeholder="Ex. 500000"
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Website Url"
                      name="website"
                      placeholder="Website Url"
                      rules={{
                        pattern: websiteValidator,
                      }}
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
                        required: "Business Mobile  is required.",
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
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="No. of Employees"
                      name="employee_count"
                      placeholder="No. of Employees"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CategoriesSelect
                      control={control}
                      name="category"
                      label="Categories"
                      className="business-group"
                      options={categories}
                      showRootCategories={true}
                      rules={{
                        required: "Choose atleast one category.",
                      }}
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

              {action === "update" && (
                <AddressForm addresses={addresses} action={action} />
              )}

              {action === "update" && (
                <CertificateForm certificates={certificates} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
