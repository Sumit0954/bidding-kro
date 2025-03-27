import styles from "./Contact.module.scss";
import cn from "classnames";
import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { control, handleSubmit, register } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className={cn("mt-5", styles["contact-banner"])}>
        <div className="container">
          {/* Centered Heading */}
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className={styles["contact-heading"]}>
                Need any Help? Contact Us
              </div>
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
                  {[
                    "Company Name",
                    "Contact Person",
                    "Phone Number",
                    "Business Email",
                  ].map((label, index) => (
                    <div className="row" key={index}>
                      <div className="col-12 text-start">
                        <label className={styles["custom-label"]}>
                          {label}
                        </label>
                      </div>
                      <div className="col-12">
                        <input
                          {...register(label.toLowerCase().replace(/\s/g, "-"))}
                          type="text"
                          placeholder={`Enter Your ${label}`}
                          className={styles["custom-input"]}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="row">
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className={cn("btn", styles["custom-btn"])}
                      >
                        Submit
                      </button>
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
