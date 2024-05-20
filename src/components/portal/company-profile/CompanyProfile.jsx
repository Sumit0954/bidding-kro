import React from 'react'
import styles from './CompanyProfile.module.scss'
import CustomInput from '../../../elements/CustomInput/CustomInput';
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, NavLink } from "react-router-dom";

const CompanyProfile = () => {
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
              <div className="col-lg-4">
                <p>Company Logo</p>
                <div className={styles['company-logo']}></div>
              </div>
              <div className="col-lg-4">
                <div className="col text-center">
                  <button
                    type="button"
                    className={cn("btn", "button")}

                  >
                    + Add Logo
                  </button>


                </div>
              </div>
              <div className="col-lg-4">
                <p>200KB max. JPEG, PNG, JPG format only. Suggested photo width and height: 200*100px.</p>
              </div>
            </div>


            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
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
                      rules={{
                        required: "Website url is required.",
                      }}
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
                      rules={{
                        required: "Year of Incorporation is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Organisation Type"
                      name="organisation-type"
                      placeholder="Organisation Type"
                      rules={{
                        required: "Organisation Type  is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label=" Business  Email"
                      name=" business-email"
                      placeholder=" Business  Email"
                      inputType="email"
                      rules={{
                        required: " Business  Email is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Business Mobile "
                      name="business-mobile"
                      placeholder="Business Mobile "
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
                      label="GST "
                      name="gst"
                      placeholder=" GST "
                      inputType="text"
                      rules={{
                        required: " GST is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="No. of Employees "
                      name="no.-of-employees"
                      placeholder="No. of Employees "
                      rules={{
                        required: "No. of Employees is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Categories"
                      name="categories"
                      placeholder="Categories "
                      inputType="tel"
                      rules={{
                        required: "Categories is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Company Description"
                      name="company-description"
                      placeholder="Company Description"
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-center">
                    <button
                      type="button"
                      className={cn("btn", "button", styles['custom-btn'])}

                    >
                      Update Business
                    </button>

                  </div>
                </div>

                {/* company profile address */}
                <div className="row">
                  <div className={cn("col-lg-12", styles['custom-address'])}>
                    <h4>Addresses(1)</h4>
                    <div className="col text-center">
                      <button
                        type="button"
                        className={cn("btn", "button", styles['custom-btn'])}
                      >
                        + Add Address
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Address"
                      name="address"
                      placeholder="Address"

                      rules={{
                        required: "Address  is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Country"
                      name="country"
                      placeholder="Country"

                      rules={{
                        required: "Country  is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="State"
                      name="state"
                      placeholder="State"

                      rules={{
                        required: "State  is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="City"
                      name="city"
                      placeholder="City"

                      rules={{
                        required: "City  is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Pincode"
                      name="pincode"
                      placeholder="Pincode"

                      rules={{
                        required: "Pincode  is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <button
                      type="button"
                      className={cn("btn", "button", styles['custom-btn'])}

                    >
                      Save
                    </button>

                  </div>
                </div>
                {/* Company Certifications (1) */}

                <div className="row">
                  <div className={cn("col-lg-12", styles['custom-address'])}>
                    <h3> Certifications (1)</h3>
                    <div className="col text-center">
                      <button
                        type="button"
                        className={cn("btn", "button", styles['custom-btn'])}
                      >
                        + Add Certifications
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Company Name "
                      name="company-name "
                      placeholder="Company Name "

                      rules={{
                        required: "Company Name   is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Certification Type "
                      name="certification-type "
                      placeholder="Certification Type "
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Certification Number "
                      name="certification-number "
                      placeholder="Certification Number "

                      rules={{
                        required: "Certification Number is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Expiry Date"
                      name="expiry-date"
                      placeholder="Expiry Date"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Issuing Authority "
                      name="issuing-authority "
                      placeholder="Issuing Authority "
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Renewal Status"
                      name="renewal-status"
                      placeholder="Renewal Status"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    <button
                      type="button"
                      className={cn("btn", "button", styles['custom-btn'])}

                    >
                      Save
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

export default CompanyProfile