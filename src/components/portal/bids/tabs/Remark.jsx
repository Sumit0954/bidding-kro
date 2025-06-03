import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Remark.module.scss";
import CustomInput from "../../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import { NavLink } from "react-router-dom";

const Remark = ({ bidDetails }) => {
  const { control, handleSubmit, reset } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const formSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("remarks", data.remark);

    try {
      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.REMARK}${bidDetails?.id}/`,
        formData,
        true
      );

      if (response.status === 200 || response.status === 204) {
        setAlert({
          isVisible: true,
          message: "Remark submitted successfully.",
          severity: "success",
        });
        reset(); // Reset form after successful submission
      }
    } catch (error) {
      // Handle error
      setAlert({
        isVisible: true,
        message: "Failed to submit remark. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box classname="row" sx={{ marginTop: "2rem" }}>
        <FormControlLabel
          control={
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          }
          label={
            <Typography variant="body1">
              By clicking this you agree to{" "}
              <a href="/terms-and-conditions">terms & conditions</a> and{" "}
              <a href="/privacy-policy">Privacy & policy</a>
            </Typography>
          }
        />
        <form onSubmit={handleSubmit(formSubmit)}>
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              <CustomInput
                control={control}
                name="remark"
                multiline={true}
                showLabel={false}
                inputType="textarea"
                placeholder="Write Your Remark..."
              />
            </Box>
            <Box className={styles["btn-contanier"]}>
              {loading ? (
                <ButtonLoader size={60} />
              ) : (
                <button
                  className="btn button"
                  type="submit"
                  disabled={!isChecked}
                >
                  Submit
                </button>
              )}
            </Box>
          </>
        </form>
      </Box>
    </>
  );
};

export default Remark;
