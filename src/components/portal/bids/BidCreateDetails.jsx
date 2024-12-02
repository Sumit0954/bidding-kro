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
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

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
  const [screenLoader, setScreenLoader] = useState(true);
  const { action, id } = useParams();

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;

        updateFormData.append(key, value);

        return null;
      });

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
            message: "Bid Details has been created successfully.",
            severity: "success",
          });

          navigate(`/portal/bids/create/questions/${id}`);
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

  const handleFormdata = async (id) => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
        "",
        true
      );

      if (response.status === 200) {
        reset({
          eligiblity_criteria: response.data.eligiblity_criteria || "",
          delivery_terms: response.data.delivery_terms || "",
          payment_terms: response.data.payment_terms || "",
        });
        setScreenLoader(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFormdata(id);
  }, [id]);

  if (screenLoader) {
    return <ScreenLoader  />;
  }

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
                {/* <div className="row">
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
                </div> */}
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

                {/* <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="technical_specification"
                      label="Technical Specification"
                    />
                  </div>
                </div> */}

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="button"
                    className={cn("btn", "button")}
                    disabled={bidStatus === "cancelled" ? true : false}
                    onClick={() => {
                      navigate(`/portal/bids/products/${id}`);
                    }}
                  >
                    Back
                  </button>

                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button
                      // type="submit"
                      type="submit"
                      className={cn("btn", "button")}
                      disabled={bidStatus === "cancelled" ? true : false}
                      // onClick={() => navigate(`/portal/bids/create/questions/${id}`)}
                    >
                      Save & Next
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

export default BidCreateDetails;
