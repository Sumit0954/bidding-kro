import styles from "./BidForm.module.scss";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { useNavigate, useParams } from "react-router-dom";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { useLocation } from "react-router-dom";

const BidCreateDetails = () => {
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

  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [bidStatus, setBidStatus] = useState("");
  const { action, id } = useParams();
  const submitForm = () => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={styles["bid-form-section"]}>
              <h4>Create Details</h4>
            </div>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
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
                    <>
                      <button
                        type="button"
                        className={cn("btn", "button")}
                        disabled={bidStatus === "cancelled" ? true : false}
                        onClick={() => navigate(`/portal/bids/products`)}
                      >
                        Back
                      </button>

                      <button
                        // type="submit"
                        type="button"
                        className={cn("btn", "button")}
                        disabled={bidStatus === "cancelled" ? true : false}
                        onClick={() => navigate(`/portal/bids/documents/${id}`)}
                      >
                        {/* {id ? "Update Bid" : "Create Bid"} */}
                        Save & Next
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

export default BidCreateDetails;
