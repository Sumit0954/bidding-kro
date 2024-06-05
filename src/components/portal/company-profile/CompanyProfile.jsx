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
import { modifiedData, numberFormatter } from "../../../helpers/formatter";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { websiteValidator } from "../../../helpers/validation";

const CompanyProfile = () => {
  const {
    control,
    handleSubmit,
    register,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [companyLogo, setCompanyLogo] = useState(DummyLogo);
  const { userDetails } = useContext(UserDetailsContext);
  const [organizationTypes, setOrganizationType] = useState([]);
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);

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

  // Fetch Dropdown's List Data
  useEffect(() => {
    getOrganizationType();
  }, []);

  const submitForm = async (data) => {
    console.log(data);
    let updateFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;

        if (typeof value === "object" && value?.length > 0) {
          updateFormData.append(key, value[0], value[0].name);
        } else {
          updateFormData.append(key, value ? value : "");
        }
      });
    }
    /* -- */

    try {
      const response = await _sendAPIRequest('POST', PortalApiUrls.CREATE_COMPANY, updateFormData, true)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const business_mobile = numberFormatter(userDetails?.user?.mobile_number);
    const business_email = userDetails?.user?.email;

    reset({
      business_mobile: business_mobile,
      business_email: business_email,
    });
  }, [reset, userDetails]);

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
                    <label>
                      <input
                        {...register("logo")}
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        placeholder="logo"
                      />
                      <span>+ ADD Logo</span>
                    </label>
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
                  <div className="col-lg-6">
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
                      name="categories"
                      label="Categories"
                      className="business-group"
                      options={[]}
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
                    <button
                      type="submit"
                      className={cn("btn", "button", styles["custom-btn"])}
                    >
                      Update Business
                    </button>
                  </div>
                </div>
              </form>

              <AddressForm addresses={addresses} />

              <CertificateForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
