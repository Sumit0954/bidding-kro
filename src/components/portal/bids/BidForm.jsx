import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import DateTimeRangePicker from "../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import {
  getMinMaxDate,
  getProductUnits,
  bidType,
  getBidTypes,
} from "../../../helpers/common";
import { useNavigate, useParams } from "react-router-dom";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import {
  dateFormatter,
  modifiedData,
  retrieveDateFormat,
} from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import SearchSelect from "../../../elements/CustomSelect/SearchSelect";
import { dateValidator } from "../../../helpers/validation";
import { useLocation } from "react-router-dom";

const BidForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    setValue,
    clearErrors,
    formState: { dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { action, id } = useParams();
  const [bidType, setBidType] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [searchedBids, setSearchedBids] = useState([]);
  const [titleValue, setTitleValue] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [bidStatus, setBidStatus] = useState("");
  // const [bidId, setBidId] = useState("");
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];
  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];
  const { formData } = location.state || {};
  console.log(formData, "formdata");

  // const getBidType = async () => {
  //   try {
  //     const response = await _sendAPIRequest(
  //       "GET",
  //       PortalApiUrls.GET_BID_TYPE,
  //       "",
  //       true
  //     );
  //     if (response.status === 200) {
  //       const data = modifiedData(response.data);
  //       setBidType(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Fetch Dropdown's List Data
  // useEffect(() => {
  //   getBidType();
  // }, []);

  const updateBidCategories = async (id) => {
    console.log(id, formData, "bidid");
    const categoryIds = formData.map((item) => item.category);
    setLoading(true);
    try {
      const response1 = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.UPDATE_BID_CATEGORIES + `${id}/`,
        categoryIds,
        true
      );
      if (response1.status === 200) {
        console.log(response1, "res11");
        setLoading(false);
        navigate(`/portal/bids/products/${id}`);
        // setAlert({
        //   isVisible: true,
        //   message: "Category has been updated successfully.",
        //   severity: "success",
        // });
      }
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      if (data) {
        setErrors(data, watch, setError);

        if (data.error) {
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
          });
        }
      }
    }
  };

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();
    let createFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;

        if (action === "create") {
          // formData.forEach((categoryItem, index) => {
          //   createFormData.append(`category[${index}][category]`, categoryItem.category);
          //   createFormData.append(`category[${index}][depth]`, categoryItem.depth);
          // });

          if (key === "type") {
            createFormData.append(key, value);
          } else if (key === "delivery_date") {
            createFormData.append(key, dateFormatter(value));
          } else if (key === "status") {
            createFormData.append(key, "pending");
          } else {
            createFormData.append(key, value);
          }
        }

        if (action === "update") {
          if (key === "title") {
            updateFormData.append(key, value);
          }

          Object.entries(dirtyFields).forEach((k) => {
            let changedKey = k[0];
            if (key === changedKey) {
              if (key === "type") {
                updateFormData.append(key, value);
              } else if (key === "delivery_date") {
                updateFormData.append(key, dateFormatter(value));
              } else {
                updateFormData.append(key, value ? value : "");
              }
            }
          });
        }

        return null;
      });

      // if (action === "create" && formData && formData.length > 0) {
      //   const categoryArray = formData.map((categoryItem) => ({
      //     id: categoryItem.category,
      //     depth: categoryItem.depth,
      //   }));

      //   // Convert the array to a JSON string and append it to the form data
      //   createFormData.append("category", JSON.stringify(categoryArray));
      // }
    }
    /* -- */

    if (action === "create") {
      try {
        const response = await _sendAPIRequest(
          "POST",
          PortalApiUrls.CREATE_BID,
          createFormData,
          true
        );
        if (response.status === 201) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "Bid has been created successfully.",
            severity: "success",
          });
          console.log(response);
          // setBidId(response.data.id);
          updateBidCategories(response.data.id);
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
        if (data) {
          setErrors(data, watch, setError);

          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }

    if (action === "update") {
      try {
        const response = await _sendAPIRequest(
          "PATCH",
          PortalApiUrls.UPDATE_BID + `${id}/`,
          updateFormData,
          true
        );
        if (response.status === 200) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "Bid has been updated successfully.",
            severity: "success",
          });
          updateBidCategories(id);
          // navigate(`/portal/bids/products/${id}`);
        }
      } catch (error) {
        setLoading(false);
        const { data } = error.response;
        if (data) {
          setErrors(data, watch, setError);

          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setCreatedAt(response.data.created_at);
            setTitleValue(response.data.title);
            setBidStatus(response.data.status);
            reset({
              ...response.data,
              type: response.data.type_meta.id,
              bid_start_date: retrieveDateFormat(response.data.bid_start_date),
              bid_end_date: retrieveDateFormat(response.data.bid_end_date),
              delivery_date: retrieveDateFormat(
                response.data.delivery_date,
                false
              ),
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, reset]);

  const handleTitleInputChange = async (event, value) => {
    if (value.length >= 4) {
      setValue("title", value);
      const params = { title: value };
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.SEARCH_BIDS,
          params,
          true
        );
        if (response.status === 200) {
          setSearchedBids(response.data);
        }
      } catch (error) {
        setError(
          "title",
          { message: "There is no bid related to this keyword." },
          { shouldFocus: true }
        );
      }
    } else {
      setSearchedBids([]);
    }
  };

  useEffect(() => {
    if (titleValue) handleTitleInputChange("", titleValue);
  }, [titleValue]);

  const handleTitleChange = async (event, value) => {
    if (value.id) {
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.RETRIEVE_CREATED_BID + `${value.id}/`,
          "",
          true
        );
        if (response.status === 200) {
          setTitleValue(response.data.title);
          setValue(
            "bid_start_date",
            retrieveDateFormat(response.data.bid_start_date),
            { shouldValidate: true }
          );
          setValue(
            "bid_end_date",
            retrieveDateFormat(response.data.bid_end_date),
            { shouldValidate: true }
          );
          setValue(
            "delivery_date",
            retrieveDateFormat(response.data.delivery_date, false),
            { shouldValidate: true }
          );
          reset({
            ...response.data,
            type: response.data.type_meta.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
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
                    <CustomSelect
                      control={control}
                      label="Bid Type"
                      options={getBidTypes()}
                      name="type"
                      placeholder="Bid Type"
                      rules={{
                        required: "Bid Type is required.",
                      }}
                    />
                  </div>
                  {/* <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Reserve Bid Price"
                      name="reserved_price"
                      placeholder="Reserve Bid Price"
                      rules={{
                        required: "ReserveBid Price is required.",
                      }}
                    />
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    {/* <SearchSelect
                      control={control}
                      options={searchedBids}
                      label="Bid Title"
                      name="title"
                      placeholder="Bid Title"
                      rules={{
                        required: "Bid Title is required.",
                      }}
                      handleInputChange={handleTitleInputChange}
                      handleChange={handleTitleChange}
                      setValue={setTitleValue}
                      value={titleValue}
                    /> */}
                    <CustomInput
                      control={control}
                      label="Bid Title"
                      name="title"
                      placeholder="Bid Title"
                      rules={{
                        required: "Bid Title is required.",
                      }}
                      inputType="text"
                    />
                  </div>
                </div>
                {/* <div className="row">
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
                      name="product_unit"
                      options={getProductUnits()}
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
                      name="bid_start_date"
                      rules={{
                        required: "Opening Date & Time is required.",
                        validate: (value) =>
                          dateValidator(value, minDate, maxDate),
                      }}
                      textFieldProps={{
                        min: `${minDate}T12:00`,
                        max: `${maxDate}T17:00`,
                      }}
                      clearErrors={clearErrors}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Closing Date & Time"
                      name="bid_end_date"
                      rules={{
                        required: "Closing Date & Time is required.",
                        validate: (value) =>
                          dateValidator(value, minDate, maxDate),
                      }}
                      textFieldProps={{
                        min: `${minDate}T12:00`,
                        max: `${maxDate}T17:00`,
                      }}
                      clearErrors={clearErrors}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Delivery Timeline"
                      name="delivery_date"
                      type="date"
                      rules={{
                        required: "Delivery Timeline is required.",
                        validate: (value) =>
                          dateValidator(value, minDate, maxDate),
                      }}
                      textFieldProps={{
                        min: minDate,
                        max: maxDate,
                      }}
                      clearErrors={clearErrors}
                    />
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Bid Description"
                      rules={{
                        required: "Description is required.",
                      }}
                    />
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="delivery_terms"
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
                      name="payment_terms"
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
                </div> */}

                <div className={cn("my-3", styles["btn-container"])}>
                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <>
                      <button
                        type="button"
                        className={cn("btn", "button")}
                        disabled={bidStatus === "cancelled" ? true : false}
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className={cn("btn", "button")}
                        disabled={bidStatus === "cancelled" ? true : false}
                        // onClick={submitForm}
                      >
                        {id ? "Update Bid" : "Create Bid"}
                        {/* Save & Next */}
                      </button>
                    </>
                  )}
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
