import { Box, Modal, Typography } from "@mui/material";
import styles from "./Modal.module.scss";
import cn from "classnames";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ButtonLoader } from "../CustomLoader/Loader";

const QueryFormModal = ({ showQueryForm, setShowQueryForm, formHeading }) => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowQueryForm(false);
  };

  const submitForm = (data) => {
    console.log(data);
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
            <Box className={styles["modal-section"]}>
              <Typography
                className={cn("my-3")}
                id="modal-modal-title"
                variant="h4"
                component="h4"
                sx={{ color: "var(--primary-color)" }}
              >
                {formHeading}
              </Typography>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12 text-start">
                    <CustomInput
                      control={control}
                      name="text"
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
