import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./EmailVerification.module.scss";
import EmailIcon from "../../../assets/images/common/email.png";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../../utils/AxiosInterceptors";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import _sendAPIRequest from "../../../helpers/api";
import { Close } from "@mui/icons-material";

const EmailVerification = () => {
  const [success, setSuccess] = useState(false);
  const [isfalied, setIsfalied] = useState(false);
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
          console.log(response.status, " : status");
          login(response.data, "PORTAL");
          if (type === "reset") {
            window.location.href = "/reset-password";
          } else {
            const showReset = localStorage.getItem("showReset");
            window.location.href = showReset ? "/reset-password" : "/portal";
          }
        }
      } catch (error) {
        console.log(error, " : error 2");
        if (error.response.status === 400) {
          setSuccess(true);
          setIsfalied(true);
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
              {success && isfalied
                ? "Email Verification Failed "
                : "Email Verification Successfull"}
            </Typography>
            <Typography
              className={cn("my-3", styles["modal-desc"])}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {!isfalied
                ? "Your email has been successfully verified."
                : "Your email verification has been Failed."}
            </Typography>

            {type === "verify" && success && !isfalied && (
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
