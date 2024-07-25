import { Alert, Box, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import CustomCkEditor from "../CustomEditor/CustomCkEditor";
import _sendAPIRequest, { setErrors } from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../contexts/AlertProvider";
import { ButtonLoader } from "../CustomLoader/Loader";
import CustomSelect from "../CustomSelect/CustomSelect";
import { CloseFullscreen } from "@mui/icons-material";

const AmendmentModal = ({ addAmendment, setAddAmendment, id }) => {
  const handleClose = () => {
    setAddAmendment(false);
  };

  const { control, handleSubmit, watch, setError, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [bidDetails, setBidDetails] = useState({});

  const submitForm = async (data) => {
    setLoading(true);

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.CREATE_AMENDMENT + `${id}/`,
        { text: data.text, type: data.type },
        true
      );
      if (response.status === 201) {
        setLoading(false);
        setAddAmendment(false);
        setAlert({
          isVisible: true,
          message: "Amendment created successfully!",
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

  const handleFieldChange = (value) => {
    if (value) {
      const selectedTypeAmendments = bidDetails?.amendment.filter(
        (object) => object.type === value.value
      );
      if (selectedTypeAmendments.length > 0) {
        const latestAmendment = selectedTypeAmendments?.reduce(
          (prev, current) => (prev.id > current.id ? prev : current)
        );
        reset({
          text: latestAmendment.text,
          type: latestAmendment.type,
        });
      } else {
        reset({
          text: bidDetails[`${value.value}`],
          type: value.value,
        });
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
            setBidDetails(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id]);

  return (
    <>
      <Modal
        open={addAmendment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <Typography
                className={cn("my-3")}
                id="modal-modal-title"
                variant="h4"
                component="h4"
                sx={{ color: "var(--primary-color)" }}
              >
                Procurement System Amendments
              </Typography>
              <Alert severity="info" sx={{ marginBottom: "10px" }}>
                <p className={styles["amendment-info"]}>
                  <span> Note : </span>
                  Please be aware that you are allowed to make only{" "}
                  <strong>two</strong> amendments for a Single Bid.
                </p>
              </Alert>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12 text-start">
                    <CustomSelect
                      control={control}
                      showLabel={false}
                      name="type"
                      options={[
                        { lable: "Description", value: "description" },
                        { lable: "Delivery Terms", value: "delivery_terms" },
                        {
                          lable: "Eligiblity Criteria",
                          value: "eligiblity_criteria",
                        },
                        { lable: "Payment Terms", value: "payment_terms" },
                        {
                          lable: "Technical Specification",
                          value: "technical_specification",
                        },
                      ]}
                      placeholder="Select Field"
                      rules={{
                        required: "Field is required.",
                      }}
                      handleChange={handleFieldChange}
                    />
                  </div>

                  <div className="col-lg-12 text-start">
                    <CustomCkEditor
                      control={control}
                      name="text"
                      label="Amendment"
                      rules={{
                        required: "Amendment is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-end">
                    {loading ? (
                      <ButtonLoader size={60} />
                    ) : (
                      <button type="submit" className={cn("btn", "button")}>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AmendmentModal;
