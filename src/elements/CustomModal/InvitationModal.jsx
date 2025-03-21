import { Box, Modal, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../CustomLoader/Loader";
import { AlertContext } from "../../contexts/AlertProvider";
import { setActiveTab } from "../../store/tabSlice";
import { useDispatch } from "react-redux";

const InvitationModal = ({
  addInvitaion,
  setInvitation,
  bidDetails,
  companyDetail,
  listtype,
  onActionComplete,
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const dispatch = useDispatch();

  console.log(bidDetails, " : bidDetails");
  const handleClose = () => {
    setInvitation(false);
  };

  const sendInvite = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append(
        "company",
        listtype === "allcompanies"
          ? companyDetail?.id
          : companyDetail?.requestor?.id
      );

      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.SEND_INVITE + `${bidDetails?.id}/`,
        formData,
        true
      );
      if (response.status === 204) {
        setLoading(false);
        setInvitation(false);
        setAlert({
          isVisible: true,
          message: "Invitation successfully sent to the supplier.",
          severity: "success",
        });
        if (onActionComplete) {
          onActionComplete();
        }
        if (companyDetail?.id) {
          try {
            const response = await _sendAPIRequest(
              "DELETE",
              `${PortalApiUrls.DELETE_BID_REQUEST}${companyDetail?.id}/`,
              null,
              true
            );
            if (response?.status === 204) {
              dispatch(setActiveTab(2));

              if (onActionComplete) {
                onActionComplete();
              }

              // Optional: Trigger a refresh or redirect as needed
            }
          } catch (error) {
            if (error.status === 403) {
              setAlert({
                isVisible: true,
                message: error.response.data.detail,
                severity: "error",
              });
              setInvitation(false);
            }
            console.error("Error deleting bid", error);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data.error_code === 9999) {
        setAlert({
          isVisible: true,
          message: error.response.data.error,
          severity: "error",
        });
      }
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
        setInvitation(false);
      }
    }
  };

  return (
    <>
      <Modal
        open={addInvitaion}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <Box className={styles["modal-header"]}>
                <Typography
                  className={cn(styles["invite-modal-title"])}
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                >
                  Send Invitation For Bid
                </Typography>

                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <Tooltip
                    title={`Send invite to ${
                      listtype === "allcompanies"
                        ? companyDetail?.name
                        : companyDetail?.requestor.name
                    }`}
                  >
                    <button
                      type="button"
                      className="btn button"
                      onClick={sendInvite}
                    >
                      Send Invitation
                    </button>
                  </Tooltip>
                )}
              </Box>

              <Box className="row">
                <Box className={cn("col text-start", styles["title"])}>
                  Bid Details
                </Box>
              </Box>

              <Box className="row mb-2">
                <Tooltip title={bidDetails?.title}>
                  <Box
                    className="col-lg-4 text-start"
                    sx={{
                      borderRight: "2px solid var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    <strong>Title: </strong>{" "}
                    {truncateString(bidDetails?.title, 25)}
                  </Box>
                </Tooltip>
                <Tooltip title={bidDetails?.type}>
                  <Box
                    className="col-lg-4 text-start"
                    sx={{
                      borderRight: "2px solid var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    <strong>Type: </strong>
                    {bidDetails?.type}
                  </Box>
                </Tooltip>
                <Tooltip title={dateTimeFormatter(bidDetails?.bid_close_date)}>
                  <Box
                    className="col-lg-4 text-start"
                    sx={{ cursor: "pointer" }}
                  >
                    <strong>Closed on: </strong>
                    {bidDetails?.bid_close_date === null
                      ? "Still to be declare"
                      : dateTimeFormatter(bidDetails?.bid_close_date)}
                  </Box>
                </Tooltip>
              </Box>

              <Box className="row">
                <Box className="row">
                  <Box className={cn("col text-start", styles["title"])}>
                    Company Details
                  </Box>
                </Box>
              </Box>

              <Box className="row mb-2">
                <Tooltip
                  title={
                    listtype === "allcompanies"
                      ? companyDetail?.name
                      : companyDetail?.requestor.name
                  }
                >
                  <Box
                    className="col-lg-4 text-start"
                    sx={{
                      borderRight: "2px solid var(--primary-color)",
                      cursor: "pointer",
                    }}
                  >
                    <strong>Name: </strong>{" "}
                    {listtype === "allcompanies"
                      ? companyDetail?.name
                      : companyDetail?.requestor.name}
                  </Box>
                </Tooltip>
                <Tooltip
                  title={
                    listtype === "allcompanies"
                      ? companyDetail?.business_email
                      : companyDetail?.requestor.business_email
                  }
                >
                  <Box
                    className="col-lg-4 text-start"
                    sx={{
                      borderRight: "2px solid var(--primary-color)",
                      cursor: " pointer",
                    }}
                  >
                    <strong>Email: </strong>{" "}
                    {truncateString(
                      listtype === "allcompanies"
                        ? companyDetail?.business_email
                        : companyDetail?.requestor.business_email,
                      20
                    )}
                  </Box>
                </Tooltip>
                <Tooltip
                  title={
                    listtype === "allcompanies"
                      ? companyDetail?.business_mobile
                      : companyDetail?.requestor.business_mobile
                  }
                >
                  <Box
                    className="col-lg-4 text-start"
                    sx={{ cursor: "pointer" }}
                  >
                    <strong>Phone : </strong>{" "}
                    {listtype === "allcompanies"
                      ? companyDetail?.business_mobile
                      : companyDetail?.requestor.business_mobile}
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default InvitationModal;
