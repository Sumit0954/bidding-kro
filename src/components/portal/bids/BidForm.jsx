import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import DateTimeRangePicker from "../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import { getMinMaxDate, getProductUnits } from "../../../helpers/common";
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

const BidForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [bidType, setBidType] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const minDate = getMinMaxDate(2, 10)[0].toISOString().split("T")[0];
  const maxDate = getMinMaxDate(1, 10)[1].toISOString().split("T")[0];

  const getBidType = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_BID_TYPE,
        "",
        true
      );
      if (response.status === 200) {
        const data = modifiedData(response.data);
        setBidType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Dropdown's List Data
  useEffect(() => {
    getBidType();
  }, []);

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();
    let createFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;

        if (action === "create") {
          if (key === "type") {
            createFormData.append(key, value);
          } else if (key === "delivery_date") {
            createFormData.append(key, dateFormatter(value));
          } else if (
            value !== undefined &&
            value !== null &&
            value[0] !== undefined &&
            value[0] !== null
          ) {
            createFormData.append(key, value);
          }
        }

        if (action === "update") {
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
          navigate(`/portal/bids/categories/${response.data.id}`);
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
          navigate(`/portal/bids/categories/${id}`);
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
            PortalApiUrls.RETRIEVE_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            reset({
              ...response.data,
              type: response.data.type_meta.id,
              bid_start_date: retrieveDateFormat(response.data.bid_start_date),
              bid_end_date: retrieveDateFormat(response.data.bid_end_date),
              delivery_date: retrieveDateFormat(response.data.delivery_date),
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, reset]);

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
                      name="title"
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
                      options={bidType}
                      name="type"
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
                      name="reserved_price"
                      placeholder="Reserve Bid Price"
                      rules={{
                        required: "ReserveBid Price is required.",
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
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DateTimeRangePicker
                      control={control}
                      label="Closing Date & Time"
                      name="bid_end_date"
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
                      name="delivery_date"
                      type="date"
                      rules={{
                        required: "Delivery Timeline is required.",
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
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
                </div>

                <div className={cn("my-3", styles["btn-container"])}>
                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button type="submit" className={cn("btn", "button")}>
                      {id ? 'Update Bid' : 'Create Bid'}
                    </button>
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
