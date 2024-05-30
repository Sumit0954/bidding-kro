import React, { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import DummyLogo from "../../../assets/images/portal/company-profile/dummy-img.jpg";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import AddressForm from "./AddressForm";
import CertificateForm from "./CertificateForm";

const CompanyProfile = () => {
  const { control, handleSubmit, register, getValues, watch } = useForm();
  const [companyLogo, setCompanyLogo] = useState(DummyLogo);
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);

  const company_logo = watch("company_logo");
  useEffect(() => {
    // Update previews on file change
    if (typeof company_logo === "object" && company_logo?.length > 0) {
      setCompanyLogo(URL.createObjectURL(company_logo[0]));
    }
  }, [company_logo]);

  useEffect(() => {
    // Update preview image state if input type="file" (image Blob) was set previously
    const value = getValues("company_logo");
    if (value) {
      if (typeof value === "object" && value?.length > 0) {
        setCompanyLogo(URL.createObjectURL(value[0]));
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
                        {...register("company_logo")}
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
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Company Name"
                      name="company-name"
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
                      name="website-url"
                      placeholder="Website Url"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Year of Incorporation "
                      name="year-of-incorporation "
                      placeholder="Year of Incorporation"
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Organisation Type"
                      name="organisation-type"
                      placeholder="Organisation Type"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Business Email"
                      name=" business-email"
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
                      name="business-mobile"
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
                      name="gst"
                      placeholder="GST"
                      inputType="text"
                      rules={{
                        required: " GST is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="No. of Employees"
                      name="no-of-employees"
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
                      name="company_desc"
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
