import { AirplayOutlined } from "@mui/icons-material";
import styles from "./Contact.module.scss";
import cn from "classnames";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const Contact = () => {
  const { control, handleSubmit, register, reset } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [buttonLoader, setButtonLoader] = useState(false);
  const submitForm = async (data) => {
    setButtonLoader(true);
    const getInTouchFormdata = new FormData();

    for (const key in data) {
      getInTouchFormdata.append(key, data[key]);
    }

    try {
      const response = await _sendAPIRequest(
        "POST",
        WebsiteApiUrls.GET_IN_TOUCH,
        getInTouchFormdata,
        true
      );
      if (response.status === 201) {
        setButtonLoader(false);
        setAlert({
          isVisible: true,
          message: "Details has been submitted successfully",
          severity: "success",
        });
        reset();
      }
    } catch (error) {
      setButtonLoader(false);
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
      reset();
    }
  };

  return (
    <>
      <section className={cn("mt-5", styles["contact-banner"])}>
        <div className="container">
          {/* Centered Heading */}
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className={styles["contact-heading"]}>Book A Demo</div>
            </div>
          </div>

          {/* Form aligned to the right */}
          <div className="row py-5 justify-content-end">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className={styles["form-section"]}>
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="text-start">Get in Touch</h3>
                    <div className={styles["underline"]}></div>
                    <p>
                      Have questions or need assistance? Our team is ready and
                      eager to support you.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(submitForm)}
                  className={styles["contact-form"]}
                >
                  {/* Company Name */}
                  <div className="row">
                    <div className="col-12 text-start">
                      <label className={styles["custom-label"]}>
                        Company Name
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        {...register("company_name")}
                        type="text"
                        placeholder="Enter Your Company Name"
                        className={styles["custom-input"]}
                      />
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="row">
                    <div className="col-12 text-start">
                      <label className={styles["custom-label"]}>
                        Contact Person
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        {...register("contact_person_name")}
                        type="text"
                        placeholder="Enter Your Contact Person"
                        className={styles["custom-input"]}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="row">
                    <div className="col-12 text-start">
                      <label className={styles["custom-label"]}>
                        Phone Number
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        {...register("phone")}
                        type="text"
                        placeholder="Enter Your Phone Number"
                        className={styles["custom-input"]}
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="row">
                    <div className="col-12 text-start">
                      <label className={styles["custom-label"]}>
                        Business Email
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        {...register("email")}
                        type="text"
                        placeholder="Enter Your Business Email"
                        className={styles["custom-input"]}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="row">
                    <div className="col-12 text-center">
                      {buttonLoader ? (
                        <ButtonLoader size={60} />
                      ) : (
                        <>
                          <button
                            type="submit"
                            className={cn("btn", styles["custom-btn"])}
                          >
                            Submit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
