import styles from './BidForm.module.scss'
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";


const BidForm = () => {
  const { control, handleSubmit, register, getValues, watch } = useForm();
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);


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
                  <div className="col-lg-12">
                    <h3>Create Bid</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Bid Title"
                      name="bid-title"
                      placeholder="Bid Title"
                      rules={{
                        required: "Bid Title is required.",
                      }}
                    />
                  </div>

                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Bid Type"
                      name="bid-type"
                      placeholder="Bid Type"
                      rules={{
                        required: "Bid Type is required.",
                      }}
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
                      className="business-group"
                      options={[]}
                      rules={{
                        required: "Choose atleast one category.",
                      }}
                    />
                  </div>
                </div>





                <div className="row">

                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Product Type"
                      name="product-type"
                      placeholder="Product Type"
                      inputType="tel"
                      rules={{
                        required: "Product Type is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
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
                      label="Product Quantity"
                      name="product-quantity"
                      placeholder="Product Quantity"
                      inputType="text"
                      rules={{
                        required: "Product Quantity is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Delivery Timeline"
                      name="delivery-timeline"
                      placeholder="Delivery Timeline"
                      inputType="text"
                      rules={{
                        required: "Product Quantity is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Opening Date"
                      name="opening-date"
                      placeholder="Opening Date"
                      rules={{
                        required: "Opening Date is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Closing Date"
                      name="closing-date"
                      placeholder="Closing Date"
                      rules={{
                        required: "Closing Date is required.",
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
                <div className="row">
                  <div className="col-lg-12">


                    <div className="col text-end">
                      <button
                        type="submit"
                        className={cn("btn", "button", styles["custom-btn"])}
                      >
                        +  Add Question
                      </button>
                    </div>

                    <CustomInput
                      control={control}
                      label="Questions for Suppliers"
                      name="questions-for-suppliers"
                      placeholder="Questions for Suppliers"
                      rules={{
                        required: "Questions for Suppliers is required.",
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
  )
}

export default BidForm