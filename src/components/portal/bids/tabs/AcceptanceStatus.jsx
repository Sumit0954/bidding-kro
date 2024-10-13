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
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";

const AcceptanceStatus = ({ bidDetails }) => {
  const { control, handleSubmit } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loadingAction, setLoadingAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    action: "",
  });

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

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleAction(deleteDetails.action);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
    }
  };

  const formData = new URLSearchParams();
  formData.append("action", deleteDetails.action);
  formData.append("is_sample_invite", false);

  const handleAction = async (action) => {
    setLoadingAction(action);
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.INVITE_ACTION + `${bidDetails?.id}/`,
        formData,
        true
      );
      if (response.status === 204) {
        window.location.reload();
        setLoading(false);

        setAlert({
          isVisible: true,
          message:
            bidDetails?.participant?.status === "accepted"
              ? "Your bid invitation has been successfully accepted."
              : "Bid invitation has been declined.",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        isVisible: true,
        message:
          error?.response?.data?.error || "An unexpected error occurred.",
        severity: "error",
      });
    }
  };
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
            {bidDetails.participant.status === "pending" ? (
              <Box className={styles["btn-contanier"]}>
                {loading && loadingAction === "decline" ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="button"
                    className="btn button reject"
                    onClick={() =>
                      setDeleteDetails({
                        open: true,
                        title: "Decline Bid Invite",
                        message: `Are you sure you want to decline this invite bid? This action cannot be undone.`,
                        action: "decline",
                      })
                    }
                  >
                    Decline
                  </button>
                )}

                {loading && loadingAction === "accept" ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="button"
                    className="btn button approve"
                    onClick={() =>
                      setDeleteDetails({
                        open: true,
                        title: "Accept Bid Invite",
                        message: `Are you sure you want to accept this invite bid?`,
                        action: "accept",
                      })
                    }
                  >
                    Accept
                  </button>
                )}
                {deleteDetails?.open && (
                  <DeleteDialog
                    title={deleteDetails.title}
                    message={deleteDetails.message}
                    handleClick={handleDeleteConfirmation}
                  />
                )}
              </Box>
            ) : (
              <>
                <button
                  type="button"
                  className={`btn button ${
                    bidDetails?.participant?.status === "accepted"
                      ? "approve"
                      : "reject"
                  }`}
                  disabled={true}
                >
                  {bidDetails?.participant?.status}
                </button>
              </>
            )}
          </>
        ) : null}
      </Box>
    </>
  );
};

export default AcceptanceStatus;
