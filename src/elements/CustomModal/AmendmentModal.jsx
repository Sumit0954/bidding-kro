import { Alert, Box, IconButton, Modal, Typography } from "@mui/material";
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
import { Close } from "@mui/icons-material";
import { convertHtmlToText } from "../../helpers/formatter";

const AmendmentModal = ({
  addAmendment,
  setAddAmendment,
  bidDetails,
  setBidDetails,
  id,
}) => {
  const { control, handleSubmit, watch, setError, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const handleClose = () => {
    setAddAmendment(false);
  };
  const submitForm = async (data) => {
    setLoading(true);
    if (convertHtmlToText(data?.text).length > 255) {
      setAlert({
        isVisible: true,
        message: "Ensure this field has no more than 255 characters.",
        severity: "error",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.CREATE_AMENDMENT + `${id}/`,
        { text: data.text, field_name: data.type },
        true
      );
      if (response.status === 201) {
        setLoading(false);
        setAddAmendment(false);
        setBidDetails((prev) => ({
          ...prev,
          amendment: [...(prev.amendment || []), response?.data],
        }));
        setAlert({
          isVisible: true,
          message: "Amendment created successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error, " : error");

      const { data } = error?.response;

      if (error) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      }

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

  return (
    <>
      <Modal
        open={addAmendment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box
              className={styles["modal-section"]}
              sx={{ position: "relative" }}
            >
              {/* Close Icon Button */}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
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
                  <strong>Three</strong> amendments for a Single Bid.
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
