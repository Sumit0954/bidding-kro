import styles from './Contact.module.scss'
import cn from "classnames";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../elements/CustomInput/CustomInput";


const Contact = () => {
  const { control, handleSubmit } = useForm();
  return (
    <>
      <div className={cn("container-fluid mt-5", styles["contact-banner"])}>
        <div className="row">
          <div className="col-lg-6">
            <div className={cn("form-container", styles['contact-form'])}>
              <div className={cn("row", styles["form-heading", "contact-heading"])}>
                <h3>Contact Us</h3>
              </div>
              <div className={cn("row", styles["form-section"])}>
                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="company-name"
                        placeholder="Company Name"

                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="contact-person"
                        placeholder="Contact Person"



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


                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <CustomInput
                        control={control}
                        name="business-email-id"
                        placeholder="Business Email ID"
                        inputType="email"


                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className={cn("btn", "button")}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles["contact-content"]}>
              <h2>Got A Question?</h2>
              <p className={styles['contact-subheading']}>We’d love to hear from you. Send us a message & we’ll <br /> respond as soon as possible </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contact