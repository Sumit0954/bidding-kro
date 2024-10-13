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

const Remark = () => {
  const { control, handleSubmit } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  //   const formSubmit = async (data) => {
  //     setLoading(true);
  //     let answers = Object.entries(data).map(([key, value]) => {
  //       const question = key.split("-")[1];
  //       return {
  //         question: parseInt(question, 10),
  //         text: value,
  //       };
  //     });

  //     try {
  //       const response = await _sendAPIRequest(
  //         "POST",
  //         PortalApiUrls.UPDATE_ANSWER + `${bidDetails.id}/`,
  //         answers,
  //         true
  //       );
  //       if (response.status === 204) {
  //         setLoading(false);
  //         setAlert({
  //           isVisible: true,
  //           message: "Answer Submited successfully.",
  //           severity: "success",
  //         });
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       setAlert({
  //         isVisible: true,
  //         message:
  //           "There was a problem submitting your answer. Please try again later.",
  //         severity: "error",
  //       });
  //     }
  //   };

  return (
    <>
      <Box classname="row" sx={{ marginTop: "2rem" }}>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant="body1">
              By clicking this you agree to{" "}
              <NavLink>bid's terms & conditions</NavLink> and{" "}
              <NavLink href="#">company's terms & conditions</NavLink>
            </Typography>
          }
        />
        <form>
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
                <button className="btn button" type="submit">
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
