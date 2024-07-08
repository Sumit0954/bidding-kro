import React, { useContext, useEffect, useState } from "react";
import styles from "./BidPriceForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const BidPriceForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const submitForm = async (data) => {
    setLoading(true);

    try {
      const response = await _sendAPIRequest(
        "PUT",
        AdminApiUrls.UPDATE_BID_PRICE,
        { amount: data.amount },
        true
      );
      if (response.status === 200) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "Bid price updated successfully!",
          severity: "success",
        });
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

  useEffect(() => {
    const getPaymentAmount = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          AdminApiUrls.GET_PAYMENT_AMOUNT,
          "",
          true
        );
        if (response.status === 200) {
          reset({
            amount: response.data.amount,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPaymentAmount();
  }, [reset]);

  return (
    <>
      <form
        className={styles["bid-price-form"]}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="row align-items-center">
          <div className="col-lg-9">
            <CustomInput
              control={control}
              showLabel={false}
              name="amount"
              inputType="number"
              placeholder="Update per bid price"
              rules={{
                required: "Amount is required.",
              }}
            />
          </div>
          <div className="col-lg-3">
            {loading ? (
              <ButtonLoader size={60} />
            ) : (
              <button
                type="submit"
                className={cn(
                  "btn",
                  "button",
                  errors?.amount && styles["custom-btn"]
                )}
              >
                Update Bid Amount
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default BidPriceForm;
