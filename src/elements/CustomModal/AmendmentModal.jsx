import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import cn from "classnames";
import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import CustomCkEditor from "../CustomEditor/CustomCkEditor";

const AmendmentModal = ({ addAmendment, setAddAmendment }) => {
  const handleClose = () => {
    setAddAmendment(false);
  };

  const { control, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
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

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12 text-start">
                    <CustomCkEditor
                      control={control}
                      name="amendment"
                      label="Amendment"
                      rules={{
                        required: "Amendment is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col text-end">
                    <button type="submit" className={cn("btn", "button")}>
                      Submit
                    </button>
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
