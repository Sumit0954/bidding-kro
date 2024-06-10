import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./EmailVerification.module.scss";
import EmailIcon from "../../../assets/images/common/email.png";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../../utils/AxiosInterceptors";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import _sendAPIRequest from "../../../helpers/api";

const EmailVerification = () => {
  const [success, setSuccess] = useState(false);
  let [queryParams] = useSearchParams();
  const type = queryParams.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    let formData = new FormData();
    formData.append("token", queryParams.get("token"));
    formData.append("salt", queryParams.get("salt"));

    const submitForm = async () => {
      try {
        const response = await _sendAPIRequest(
          "POST",
          WebsiteApiUrls.VERIFY_EMAIL,
          formData
        );
        if (response.status === 200) {
          setSuccess(true);
          login(response.data, 'PORTAL');
          if (type === "reset") {
            window.location.href = "/reset-password";
          } else {
            window.location.href = "/portal";
          }
        }
      } catch (error) {
        if (error.response.status === 400) {
          setSuccess(false);
        }
      }
    };

    submitForm();
  }, [queryParams, navigate, type]);

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

            {type === "verify" && success && (
              <NavLink to={"/portal"} className="btn button">
                Continue to Dashboard
              </NavLink>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmailVerification;
