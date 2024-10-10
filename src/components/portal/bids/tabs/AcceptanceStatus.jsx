import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./AcceptanceStatus.module.scss";
import cn from "classnames";
import CustomInput from "../../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import { NavLink } from "react-router-dom";

const AcceptanceStatus = ({ bidDetails }) => {
  const { control, handleSubmit } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  console.log("bidDetails : ", bidDetails);

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
      <Box
        classname={cn("row", styles["acceptance-box"])}
        sx={{ marginTop: "2rem", marginLeft: "8px" }}
      >
        <Box sx={{ marginBottom: "2rem" }}>
          {/* Heading */}
          <Typography variant="h4" gutterBottom>
            Thank You for Accepting the Bid Invitation!
          </Typography>

          {/* Paragraph 2 */}
          <Box mb={2}>
            {bidDetails?.type === "L1" ? (
              <Typography variant="body1">
                You will receive an email shortly with instructions on how to
                proceed with the bidding process. Please ensure you follow the
                guidelines provided in the email.
              </Typography>
            ) : (
              <>
                <Typography variant="body1">
                  You will receive an email shortly with instructions on how to
                  send a sample of your product to the buyer. Please ensure you
                  follow the guidelines provided in the email.
                </Typography>
                <Typography variant="body1">
                  Your sample will be reviewed by the buyer. Once it is
                  approved, you will be notified and can proceed with the
                  bidding process.
                </Typography>
              </>
            )}
          </Box>

          {/* Paragraph 3 */}
          <Box>
            <Typography variant="body1">
              We appreciate your patience and cooperation.
            </Typography>
          </Box>
        </Box>
        {bidDetails?.type === "QCBS" &&
        bidDetails.participant.sample.approval_status === "approved" ? (
          <>
            <Box className={styles["btn-contanier"]}>
              {loading ? (
                <ButtonLoader size={60} />
              ) : (
                <button className="btn button reject" type="submit">
                  Reject
                </button>
              )}

              {loading ? (
                <ButtonLoader size={60} />
              ) : (
                <button className="btn button approve" type="submit">
                  Accept
                </button>
              )}
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default AcceptanceStatus;
