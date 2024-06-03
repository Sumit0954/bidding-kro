import React, { useContext, useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import _sendApiRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import styles from "./RegistrationEmailVerify.module.scss";
import { Box, Typography } from "@mui/material";
import EmailIcon from "../../../assets/images/common/email.png";
import cn from "classnames";
import { RegisterDataContext } from "../../../contexts/RegisterDataProvider";
import { login } from "../../../utils/AxiosInterceptors";

const RegistrationEmailVerify = () => {
  const [registerData] = useContext(RegisterDataContext);
  const [success, setSuccess] = useState(false);
  let [queryParams] = useSearchParams();

  let formData = new FormData();
  formData.append("token", queryParams.get("token"));
  formData.append("salt", queryParams.get("salt"));

  const submitForm = async () => {
    try {
      const response = await _sendApiRequest(
        formData,
        WebsiteApiUrls.VERIFY_EMAIL,
        "POST"
      );
      if (response.status === 200) {
        setSuccess(true);
        await login(response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setSuccess(false);
      }
    }
  };

  useEffect(() => {
    submitForm();
  }, []);

  const resendEmail = async () => {
    try {
      await _sendApiRequest(
        { email: registerData.email },
        WebsiteApiUrls.RESEND_VERIFY_EMAIL,
        "POST"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className={cn("container", styles["modal-container"])}>
        <Box className="row">
          <Box className={styles["modal-section"]}>
            <img src={EmailIcon} alt="EmailIcon" />
            <Typography
              className={cn("my-3", styles["modal-title"])}
              id="modal-modal-title"
              variant="h3"
              component="h3"
            >
              {success
                ? "Email Verification Successfull"
                : "Email Verification Failed"}
            </Typography>
            <Typography
              className={cn("my-3", styles["modal-desc"])}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Your email has been successfully verified.
            </Typography>

            {success ? (
              <NavLink to={"/portal"} className="btn button">
                Continue to Dashboard
              </NavLink>
            ) : (
              <button
                type="button"
                onClick={resendEmail}
                className="btn button"
              >
                Resend Email
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RegistrationEmailVerify;
