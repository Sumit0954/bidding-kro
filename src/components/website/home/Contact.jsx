import styles from "./Contact.module.scss";
import cn from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../elements/CustomInput/CustomInput";

const Contact = () => {
  const { control, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className={cn("mt-5", styles["contact-banner"])}>
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-6">
              <div className={styles["form-section"]}>
                <div className={cn("row")}>
                  <h3>Contact Us</h3>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className={styles['contact-form']}>
                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="company-name"
                        placeholder="Company Name"
                        label="Company Name"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="contact-person"
                        placeholder="Contact Person"
                        label="Contact Person"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="phone-number"
                        placeholder="Phone Number"
                        inputType="tel"
                        label="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="business-email-id"
                        placeholder="Email"
                        inputType="email"
                        label="Business Email"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className={cn("btn", "button", styles["custom-btn"])}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles["contact-content"]}>
                <h2>Got A Question?</h2>
                <p className={styles["contact-subheading"]}>
                  We’d love to hear from you. Send us a message & we’ll <br />{" "}
                  respond as soon as possible 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
