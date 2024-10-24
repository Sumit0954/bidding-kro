import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const AcceptanceStatus = ({ bidDetails, type }) => {
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

  console.log("bidDetails :", bidDetails);
  // formdata for the invite action
  const formData = new URLSearchParams();
  formData.append("action", deleteDetails.action);
  formData.append(
    "is_sample_invite",
    `${bidDetails?.type === "L1" ? false : true}`
  );

  // invite action :  accepted / decline
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
          severity:
            bidDetails?.participant?.status === "accepted"
              ? "success"
              : "error",
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

  // invite action confirmation
  const handleInvitation = (choice) => {
    if (choice) {
      handleAction(deleteDetails.action);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
    }
  };


  return (
    <>
      <Box
        classname={cn("row", styles["acceptance-box"])}
        sx={{ marginTop: "2rem", marginLeft: "8px" }}
      >
        {bidDetails?.type === "L1" ? (
          bidDetails?.participant?.status === "pending" ? (
            // PENDING CONTENT
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                {/* Heading */}
                <Typography variant="h4" gutterBottom>
                  You are invited {bidDetails?.title}
                </Typography>

                {/* Paragraph 2 */}
                <Box mb={2}>
                  <Typography variant="body1">
                    We are excited to inform you that you’ve been invited to
                    participate in an upcoming bid on the Bidding Kro platform.
                    Your participation is crucial, and we encourage you to
                    review the bid details and key dates outlined below:
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Opening Date : {bidDetails?.bid_open_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Closing Date : {bidDetails?.bid_close_date}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Your sample will be reviewed by the buyer. Once it is
                    approved, you will be notified and can proceed with the
                    bidding process.
                  </Typography>
                </Box>

                {/* Paragraph 3 */}
                <Box>
                  <Typography variant="body1">
                    To make the most of this opportunity, we recommend staying
                    updated by regularly checking your account for any further
                    instructions or updates. Should you have any questions
                    regarding the bid or the process, feel free to contact us
                    through the platform for assistance.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : bidDetails?.participant?.status === "accepted" ? (
            // ACCEPTED CONTENT
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                {/* Heading */}
                <Typography variant="h4" gutterBottom>
                  Thank you for accepting the bid invitation! We’re excited to
                  have you onboard for the bidding process.
                </Typography>

                {/* Paragraph 2 */}
                <Box mb={2}>
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed. Please ensure you carefully follow the
                    guidelines provided in the email.
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Opening Date : {bidDetails?.bid_open_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Closing Date : {bidDetails?.bid_close_date}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Your sample will be reviewed by the buyer. Once it is
                    approved, you will be notified and can proceed with the
                    bidding process.
                  </Typography>
                </Box>

                {/* Paragraph 3 */}
                <Box>
                  <Typography variant="body1">
                    Once your sample is submitted, it will be reviewed by the
                    buyer. You will be notified when your sample is approved,
                    after which you can proceed with the bidding process.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : bidDetails?.participant?.status === "declined" ? (
            // DECLINED CONTENT
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                {/* Heading */}
                <Typography variant="h4" gutterBottom>
                  Acknowledgment of Bid Decline
                </Typography>

                {/* Paragraph 2 */}
                <Box mb={2}>
                  <Typography variant="body1">
                    Thank you for informing us about your decision regarding the
                    recent bid invitation on the Bidding Kro platform. We
                    understand that circumstances may vary, and we appreciate
                    your prompt response.
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="body1">
                    If you have any feedback or insights regarding the bid or
                    your decision, we would love to hear from you. Your input is
                    valuable to us and can help improve our future
                    collaborations.
                  </Typography>
                </Box>

                {/* Paragraph 3 */}
                <Box>
                  <Typography variant="body1">
                    Should your availability change or if you are interested in
                    future bids, please do not hesitate to reach out. We look
                    forward to potential opportunities to work together down the
                    line.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : // REVOKED CONTENT
          bidDetails?.participant?.status === "revoked" ? (
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                {/* Heading */}
                <Typography variant="h4" gutterBottom>
                  Notification of Bid Participation Revocation.
                </Typography>

                {/* Paragraph 2 */}
                <Box mb={2}>
                  <Typography variant="body1">
                    We hope this message finds you well. We would like to inform
                    you that, following your acceptance of the bid invitation,
                    your participation in the commercial bid has been revoked by
                    the buyer.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body1">
                    This decision is part of the ongoing evaluation process, and
                    we understand that this news may be unexpected. We encourage
                    you to remain positive, as there will be future
                    opportunities to participate in other bids on the Bidding
                    Kro platform.
                  </Typography>
                </Box>

                {/* Paragraph 3 */}
                <Box>
                  <Typography variant="body1">
                    Thank you for your understanding, and we look forward to
                    your continued engagement with Bidding Kro.
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            // DEFAULT CONTENT
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                {/* Heading */}
                <Typography variant="h4" gutterBottom>
                  You are invited {bidDetails?.title}
                </Typography>

                {/* Paragraph 2 */}
                <Box mb={2}>
                  <Typography variant="body1">
                    We are excited to inform you that you’ve been invited to
                    participate in an upcoming bid on the Bidding Kro platform.
                    Your participation is crucial, and we encourage you to
                    review the bid details and key dates outlined below:
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Opening Date : {bidDetails?.bid_open_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Bid Closing Date : {bidDetails?.bid_close_date}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Your sample will be reviewed by the buyer. Once it is
                    approved, you will be notified and can proceed with the
                    bidding process.
                  </Typography>
                </Box>

                {/* Paragraph 3 */}
                <Box>
                  <Typography variant="body1">
                    To make the most of this opportunity, we recommend staying
                    updated by regularly checking your account for any further
                    instructions or updates. Should you have any questions
                    regarding the bid or the process, feel free to contact us
                    through the platform for assistance.
                  </Typography>
                </Box>
              </Box>
            </>
          )
        ) : bidDetails?.participant?.sample?.invite_status === "pending" ? (
          // SAMPLE INVITE PENDING CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.invite_status === "accepted" ? (
          // SAMPLE INVITE ACCEPTED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.invite_status === "declined" ? (
          // SAMPLE INVITE DECLINED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.approval_status === "rejected" ? (
          // SAMPLE APPROVAL REJECTED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.approval_status === "approved" &&
          bidDetails?.participant?.status === "pending" ? (
          // SAMPLE APPROVAL APPROVAL WITH COMMERCIAL BID INVITE PENDING CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.approval_status === "approved" &&
          bidDetails?.participant?.status === "accepted" ? (
          // SAMPLE APPROVAL APPROVAL WITH COMMERCIAL BID INVITE ACCEPTED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : bidDetails?.participant?.sample?.approval_status === "approved" &&
          bidDetails?.participant?.status === "declined" ? (
          // SAMPLE APPROVAL APPROVAL WITH COMMERCIAL BID INVITE DECLINED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        ) : (
          // DEFAULT CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                {bidDetails?.type === "L1" ? (
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to proceed with the bidding process. Please ensure you
                    follow the guidelines provided in the email.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1">
                      You will receive an email shortly with instructions on how
                      to send a sample of your product to the buyer. Please
                      ensure you follow the guidelines provided in the email.
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Opening date :{" "}
                        {bidDetails?.sample_receive_start_date}
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            style={{ fontSize: "small" }}
                          />
                        </ListItemIcon>
                        Sample Receiving Closing date :{" "}
                        {bidDetails?.sample_receive_end_date}
                      </ListItem>
                    </List>
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
          </>
        )}

        {/* {type === "invited" && (
        <Box className={styles["btn-contanier"]}>
          {bidDetails?.participant?.status === "accepted" ||
          bidDetails?.participant?.status === "revoked" ||
          (bidDetails?.type === "QCBS" &&
            (bidDetails.participant.sample.invite_status === "accepted" ||
              bidDetails.participant.sample.invite_status === "declined")) ? (
            <button
              type="button"
              className={`btn button ${
                bidDetails?.participant?.status === "accepted" ||
                (bidDetails?.type === "QCBS" &&
                  bidDetails.participant.sample.invite_status === "accepted")
                  ? "approve"
                  : "reject"
              }`}
              disabled={true}
            >
              {bidDetails?.type === "L1"
                ? bidDetails?.participant?.status
                : bidDetails.participant.sample.invite_status}
            </button>
          ) : (
            <>
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
            </>
          )}

          {deleteDetails?.open && (
            <DeleteDialog
              title={deleteDetails.title}
              message={deleteDetails.message}
              handleClick={handleDeleteConfirmation}
            />
          )}
        </Box>
      )} */}

        {type === "invited" && (
          <Box className={styles["btn-contanier"]}>
            {bidDetails?.participant?.status === "accepted" ||
            bidDetails?.participant?.status === "revoked" ||
            bidDetails?.participant?.status === "declined" ||
            (bidDetails?.type === "QCBS" &&
              (bidDetails.participant.sample.invite_status === "accepted" ||
                bidDetails.participant.sample.invite_status === "declined")) ? (
              <button
                type="button"
                className={`btn button ${
                  bidDetails?.participant?.status === "accepted" ||
                  (bidDetails?.type === "QCBS" &&
                    bidDetails.participant.sample.invite_status === "accepted")
                    ? "approve"
                    : "reject"
                }`}
                disabled={true}
              >
                {bidDetails?.type === "L1"
                  ? bidDetails?.participant?.status
                  : bidDetails?.participant?.sample?.invite_status}
              </button>
            ) : (
              <>
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
              </>
            )}

            {deleteDetails?.open && (
              <DeleteDialog
                title={deleteDetails.title}
                message={deleteDetails.message}
                handleClick={handleInvitation}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AcceptanceStatus;
