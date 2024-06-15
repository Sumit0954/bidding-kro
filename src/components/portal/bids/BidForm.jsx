import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";

const BidForm = () => {
  const { control, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <div className="row border-bottom border-secondary mb-4">
                <div className="col-lg-12">
                  <h3>Create Bid</h3>
                </div>
              </div>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Bid Title"
                      name="bid_title"
                      placeholder="Bid Title"
                      rules={{
                        required: "Bid Title is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomSelect
                      control={control}
                      label="Bid Type"
                      options={[]}
                      name="bid_type"
                      placeholder="Bid Type"
                      // rules={{
                      //   required: "Bid Type is required.",
                      // }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Reserve Bid Price"
                      name="reserve-bid-price"
                      placeholder="Reserve Bid Price"
                      rules={{
                        required: "ReserveBid Price is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CategoriesSelect
                      control={control}
                      name="categories"
                      label="Categories"
                      options={[]}
                      // rules={{
                      //   required: "Choose atleast one category.",
                      // }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CategoriesSelect
                      control={control}
                      name="product_type"
                      label="Product Type"
                      placeholder="Select Products"
                      options={[]}
                      // rules={{
                      //   required: "Choose atleast one product.",
                      // }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Product Quantity"
                      name="product_quantity"
                      placeholder="Product Quantity"
                      inputType="text"
                      rules={{
                        required: "Product Quantity is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomSelect
                      control={control}
                      label="Unit"
                      name="unit"
                      placeholder="Unit"
                      inputType="text"
                      rules={{
                        required: "Unit is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Delivery Timeline"
                      name="delivery_timeline"
                      placeholder="Delivery Timeline"
                      inputType="datetime-local"
                      rules={{
                        required: "Delivery Timeline is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Bidding Date & Time"
                      name="bidding_date_time"
                      placeholder="Bidding Date & Time"
                      inputType="datetime-local"
                      rules={{
                        required: "Bidding Date & Time is required.",
                      }}
                    />
                  </div>
                </div>


                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="payment_term"
                      label="Payment Term"
                      rules={{
                        required: "Payment Term is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Description"
                      rules={{
                        required: "Description is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="eligiblity_criteria"
                      label="Eligiblity Criteria"
                      rules={{
                        required: "Eligiblity Criteria is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="technical_specification"
                      label="Technical Specification"
                      rules={{
                        required: "Technical Specification is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-end">
                    <button
                      type="submit"
                      className={cn("btn", "button", styles["custom-btn"])}
                    >
                      Save & Next
                    </button>
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

export default BidForm;
