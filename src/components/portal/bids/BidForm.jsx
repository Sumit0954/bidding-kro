import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import DateTimeRangePicker from "../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import { getMinMaxDate } from "../../../helpers/common";
import { useNavigate, useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const BidForm = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { action } = useParams();
  const [categories, setCategories] = useState([]);

  const minDate = getMinMaxDate(1, 10)[0].toISOString().split("T")[0];
  const maxDate = getMinMaxDate(1, 10)[1].toISOString().split("T")[0];

  const getCategories = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CATEGORIES,
        "",
        true
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Dropdown's List Data
  useEffect(() => {
    getCategories();
  }, []);

  const submitForm = (data) => {
    console.log(data);
    navigate("/portal/bids/update");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={styles["bid-form-section"]}>
              <h4>{action === "create" ? "Create" : "Update"} Bid</h4>
            </div>
            <div className={cn("row", styles["form-section"])}>
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
                      options={[{ lable: "Test", value: 1 }]}
                      name="bid_type"
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
                      options={categories}
                      rules={{
                        required: "Choose atleast one category.",
                      }}
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
                      options={categories}
                      rules={{
                        required: "Choose atleast one product.",
                      }}
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
                      options={[{ lable: "Test", value: 1 }]}
                      placeholder="Unit"
                      rules={{
                        required: "Unit is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Opening Date & Time"
                      name="opening_date_time"
                      rules={{
                        required: "Opening Date & Time is required.",
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Closing Date & Time"
                      name="closing_date_time"
                      rules={{
                        required: "Closing Date & Time is required.",
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Delivery Timeline"
                      name="delivery_timeline"
                      inputType="datetime-local"
                      rules={{
                        required: "Delivery Timeline is required.",
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
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="delivery_term"
                      label="Delivery Term"
                      rules={{
                        required: "Delivery Term is required.",
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
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="eligiblity_criteria"
                      label="Eligiblity Criteria"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="technical_specification"
                      label="Technical Specification"
                    />
                  </div>
                </div>

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="submit"
                    className={cn("btn", "button", styles["custom-btn"])}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "btn",
                      "button",
                      styles["custom-btn"],
                      action === "create" && "disable"
                    )}
                    onClick={() => navigate(`/portal/bids/questions`)}
                    disabled={action === "create" ? true : false}
                  >
                    Add Questions
                  </button>
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
