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
import React, { useContext, useEffect, useState } from "react";
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
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import { dateTimeFormatter } from "../../../../helpers/formatter";

const AcceptanceStatus = ({ bidDetails, type, onActionComplete }) => {
  const { setAlert } = useContext(AlertContext);
  const [loadingAction, setLoadingAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    action: "",
  });

  // formdata for the invite action
  const formData = new URLSearchParams();
  formData.append("action", deleteDetails.action);
  formData.append(
    "is_sample_invite",
    `${
      bidDetails?.type === "L1" ||
      bidDetails?.participant?.sample?.approval_status === "approved"
        ? false
        : true
    }`
  );

  // invite action :  accepted / decline

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          `${PortalApiUrls.RETRIEVE_INVITED_BID}${bidDetails?.id}/`,
          "",
          true
        );
        if (response.data.participant) {
          setParticipant(response.data.participant);
          setScreenLoader(false);
        }
      } catch (error) {}
    };
    fetchParticipants();
  }, [bidDetails?.id, deleteDetails.action]);

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
        setLoading(false);
        // setDeleteDetails({ open: false, title: "", message: "", action: "" });
        setAlert({
          isVisible: true,
          message:
            action === "accept"
              ? // participant?.status === "accepted" ||
                // (bidDetails?.type === "QCBS" &&
                //   participant?.sample?.invite_status === "accepted")
                "Your bid invitation has been successfully accepted."
              : "Bid invitation has been declined.",
          severity:
            action === "accept"
              ? // participant?.status === "accepted" ||
                // participant?.sample?.invite_status === "accepted"
                "success"
              : "error",
        });
        setDeleteDetails({ open: false, title: "", message: "", action: "" });
        if (onActionComplete) {
          onActionComplete();
        }
      }
    } catch (error) {
      setLoading(false);
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
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
    console.log(deleteDetails.action, "deleteDetails.action");
    if (choice) {
      handleAction(deleteDetails.action);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
    }
  };

  if (screenLoader) {
    return <ScreenLoader component={"AcceptanceStatus"} />;
  }

  return (
    <>
      <Box
        classname={cn("row", styles["acceptance-box"])}
        sx={{ marginTop: "2rem", marginLeft: "8px" }}
      >
        {bidDetails?.status === "cancelled" ? (
          <Box sx={{ marginBottom: "2rem" }}>
            {/* Heading */}
            <Typography variant="h4" gutterBottom>
              Bid Cancellation Notice
            </Typography>

            {/* Paragraph 2 */}
            <Box mb={2}>
              <Typography variant="body1">
                We regret to inform you that the bid has been canceled by the
                bid owner. As a result, all activities related to this bid,
                including the submission of product samples and the bidding
                process, have been halted. We understand this may be
                disappointing news, and we sincerely apologize for any
                inconvenience caused. If you have any questions or require
                further assistance, please do not hesitate to contact our
                support team. We appreciate your patience and understanding.
              </Typography>
            </Box>
          </Box>
        ) : bidDetails?.type === "L1" ? (
          participant.status === "pending" ? (
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
          ) : participant.status === "accepted" ? (
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
                </Box>
              </Box>
            </>
          ) : participant.status === "declined" ? (
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
          participant.status === "revoked" ? (
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
        ) : participant?.sample?.invite_status === "pending" ? (
          // SAMPLE INVITE PENDING CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Invitation for Quality-Based Selection Bid
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                <Typography variant="body1">
                  We are excited to invite you to participate in a Quality-Based
                  Selection bid on our platform, Bidding Kro. This process
                  requires suppliers to submit samples for evaluation, which
                  will determine your eligibility to proceed with live bidding.
                </Typography>

                <>
                  <Typography variant="body1">
                    ease take a moment to review the bid details and submit your
                    materials for the quality check. If you need any assistance,
                    feel free to reach out to our support team.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Sample Receiving Opening date :{" "}
                      {bidDetails?.sample_receive_start_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
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
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  We appreciate your patience and cooperation.
                </Typography>
              </Box>
            </Box>
          </>
        ) : participant?.sample?.invite_status === "accepted" &&
          !participant?.sample?.approval_status === "approved" ? (
          // SAMPLE INVITE ACCEPTED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Acceptance Confirmation for Quality-Based Selection Bid
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                <Typography variant="body1">
                  Thank you for accepting the invitation to participate in the
                  Quality-Based Selection bid on our platform, Bidding Kro. We
                  are pleased to have you on board for this important process.
                </Typography>

                <>
                  <Typography variant="body1">
                    As a reminder, please ensure that your samples are submitted
                    within the following timeline:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Sample Receiving Opening date :{" "}
                      {bidDetails?.sample_receive_start_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Sample Receiving Closing date :{" "}
                      {bidDetails?.sample_receive_end_date}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Once we receive your samples, our evaluation team will
                    assess them based on the specified criteria. Should you have
                    any questions or require further assistance during this
                    process, do not hesitate to contact us.
                  </Typography>
                </>
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  We appreciate your patience and cooperation.
                </Typography>
              </Box>
            </Box>
          </>
        ) : participant?.sample?.invite_status === "declined" ? (
          // SAMPLE INVITE DECLINED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Bid Invitation Declined
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                <Typography variant="body1">
                  We have received your decision to decline the bid invitation.
                  As you have opted out of this bidding opportunity, no further
                  action is required on your part.
                </Typography>

                <>
                  <Typography variant="body1">
                    hank you for considering this bid, and we respect your
                    decision. We look forward to collaborating on future
                    opportunities.
                  </Typography>
                </>
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  We appreciate your patience and cooperation.
                </Typography>
              </Box>
            </Box>
          </>
        ) : participant?.sample?.approval_status === "approved" &&
          participant?.status === "pending" &&
          bidDetails?.bid_open_date !== null ? (
          // SAMPLE APPROVAL APPROVAL WITH COMMERCIAL BID INVITE PENDING CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Congratulations! Your Sample is Approved – Live Bid Invitation
                Awaits
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                <Typography variant="body1">
                  We are pleased to inform you that your sample submitted for
                  the Quality-Based Selection bid has been reviewed and approved
                  by the buyer. Congratulations on this achievement!
                </Typography>

                <>
                  <Typography variant="body1">
                    As a result, you are now invited to participate in the live
                    bidding process. Here are the details for the live bid:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Live Bid Opening date :{" "}
                      {dateTimeFormatter(bidDetails?.bid_open_date)}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Live Bid Closing date :{" "}
                      {dateTimeFormatter(bidDetails?.bid_close_date)}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Please make sure to prepare for the live bid and have any
                    necessary documentation ready for submission. If you have
                    any questions or need further assistance, feel free to reach
                    out to us.
                  </Typography>
                </>
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  We look forward to your participation in the live bid and wish
                  you the best of luck!
                </Typography>
              </Box>
            </Box>
          </>
        ) : participant.sample?.approval_status === "approved" &&
          participant.status === "accepted" ? (
          // SAMPLE APPROVAL APPROVAL WITH COMMERCIAL BID INVITE ACCEPTED CONTENT
          <>
            <Box sx={{ marginBottom: "2rem" }}>
              {/* Heading */}
              <Typography variant="h4" gutterBottom>
                Thank You for Accepting the Bid Invitation!
              </Typography>

              {/* Paragraph 2 */}
              <Box mb={2}>
                <Typography variant="body1">
                  You will receive an email shortly with instructions on how to
                  proceed with the bidding process. Please ensure you follow the
                  guidelines provided in the email.
                </Typography>

                <>
                  <Typography variant="body1">
                    You will receive an email shortly with instructions on how
                    to send a sample of your product to the buyer. Please ensure
                    you follow the guidelines provided in the email.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Live Bid Opening date :{" "}
                      {bidDetails?.sample_receive_start_date}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                      </ListItemIcon>
                      Live Bid Closing date :{" "}
                      {bidDetails?.sample_receive_end_date}
                    </ListItem>
                  </List>
                  <Typography variant="body1">
                    Your sample will be reviewed by the buyer. Once it is
                    approved, you will be notified and can proceed with the
                    bidding process.
                  </Typography>
                </>
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  We appreciate your patience and cooperation.
                </Typography>
              </Box>
            </Box>
          </>
        ) : participant?.sample?.approval_status === "approved" &&
          participant?.status === "declined" ? (
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
        ) : participant?.sample?.approval_status === "approved" &&
          participant?.status === "revoked" ? (
          // SAMPLE APPROVED BUT REVOKED FROM THE LIVE BID CONTENT
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
                  you to remain positive, as there will be future opportunities
                  to participate in other bids on the Bidding Kro platform.
                </Typography>
              </Box>

              {/* Paragraph 3 */}
              <Box>
                <Typography variant="body1">
                  Thank you for your understanding, and we look forward to your
                  continued engagement with Bidding Kro.
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

        {bidDetails?.status !== "cancelled" && type === "invited" && (
          <Box className={styles["btn-contanier"]}>
            {participant?.status === "accepted" ||
            // participant?.status === "revoked" ||
            participant?.status === "declined" ||
            (bidDetails?.type === "QCBS" &&
              ((participant?.sample?.invite_status === "accepted" &&
                participant?.sample?.approval_status === "pending") ||
                // (participant?.sample?.approval_status === "approved" &&
                //   bidDetails?.bid_open_date !== null && participant?.status === "accepted") ||
                participant?.sample?.invite_status === "declined")) ? (
              <button
                type="button"
                className={`btn button ${
                  participant?.status === "accepted"
                    ? "approve"
                    : participant?.status === "revoked"
                    ? "reject"
                    : bidDetails.type === "QCBS" &&
                      participant?.sample?.invite_status === "accepted"
                    ? "approve"
                    : "reject"
                }`}
                disabled={true}
              >
                {bidDetails?.type === "L1"
                  ? participant?.status
                  : bidDetails?.type === "QCBS" &&
                    participant?.sample.approval_status === "approved" &&
                    bidDetails?.bid_open_date !== null
                  ? participant.status
                  : bidDetails?.type === "QCBS"
                  ? participant?.sample?.invite_status
                  : participant?.status}
              </button>
            ) : (bidDetails?.type === "L1" &&
                participant?.status === "pending") ||
              (bidDetails?.type === "QCBS" &&
                participant?.sample?.invite_status === "pending") ||
              (bidDetails?.type === "QCBS" &&
                participant?.sample?.approval_status === "approved" &&
                bidDetails?.bid_open_date !== null &&
                participant?.status === "pending") ? (
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
            ) : null}

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
