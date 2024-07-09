import styles from './CreateTemplate.module.scss'
import React, { useEffect, useState } from "react";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";


const CreateTemplate = () => {
  const { control, handleSubmit } = useForm();
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit()}>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Template Name"
                      name="template name"
                      rules={{
                        required: "Template Name is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Template Type"
                      name="template type"
                      rules={{
                        required: "Template Type is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="Template"
                      label="Template"
                    />
                  </div>
                </div>

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="submit"
                    className={cn("btn", "button", styles["custom-btn"])}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTemplate