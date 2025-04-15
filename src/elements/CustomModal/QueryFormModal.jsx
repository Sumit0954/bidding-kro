import { Box, Modal, Typography, IconButton } from "@mui/material";
import { CloseTwoTone } from "@mui/icons-material";
import styles from "./Modal.module.scss";
import cn from "classnames";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ButtonLoader } from "../CustomLoader/Loader";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../contexts/AlertProvider";

const QueryFormModal = ({
  showQueryForm,
  setShowQueryForm,
  formHeading,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const handleClose = () => {
    setShowQueryForm(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    const queryformdata = new FormData();

    for (const keys in data) {
      queryformdata.append("type", type);
      queryformdata.append(keys, data[keys]);
    }

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.MISSING_DATA_REQUEST,
        queryformdata,
        true
      );

      if (response.status === 201) {
        setLoading(false);
        handleClose();
        setAlert({
          isVisible: true,
          message: "Query request submitted successfully",
          severity: "success",
        });
        reset();
      }
    } catch (error) {
      setLoading(false);
      handleClose();
      setAlert({
        isVisible: true,
        message: "Something went wrong please try again later",
        severity: "error",
      });
      reset();
    }
  };

  return (
    <>
      <Modal
        open={showQueryForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box
              className={styles["modal-section"]}
              sx={{ position: "relative" }}
            >
              {/* Close Icon Top Right */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <CloseTwoTone />
              </IconButton>

              {/* Centered Heading */}
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h4"
                sx={{
                  color: "var(--primary-color)",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {formHeading}
              </Typography>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12 text-start">
                    <CustomInput
                      control={control}
                      name="message"
                      multiline={true}
                      showLabel={false}
                      inputType="textarea"
                      rules={{
                        required: "Field is required.",
                      }}
                      placeholder="write your query here..."
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

export default QueryFormModal;
