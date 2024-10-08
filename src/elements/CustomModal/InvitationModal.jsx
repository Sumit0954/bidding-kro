import { Box, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import { dateTimeFormatter } from "../../helpers/formatter";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../CustomLoader/Loader";
import { AlertContext } from "../../contexts/AlertProvider";

const InvitationModal = ({
  addInvitaion,
  setInvitation,
  bidDetails,
  companyDetail,
}) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  console.log("InvitationModal", bidDetails);

  const handleClose = () => {
    setInvitation(false);
  };

  const sendInvite = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("company", companyDetail?.id);

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
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data.error_code === 9999)
        setAlert({
          isVisible: true,
          message: error.response.data.error,
          severity: "error",
        });
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
                  Invitation
                </Typography>

                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="button"
                    className="btn button"
                    onClick={sendInvite}
                  >
                    Send Message
                  </button>
                )}
              </Box>

              <Box className="row">
                <Box className={cn("col text-start", styles["title"])}>
                  Bid Details
                </Box>
              </Box>

              {/* <Box className="row mb-2">
                <Box className="col text-start">{bidDetails?.title}</Box>
              </Box> */}

              <Box className="row mb-2">
                <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {bidDetails?.formatted_number}
                </Box>
                <Box
                  className="col-lg-4 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {bidDetails?.title}{" "}
                </Box>
                {/* <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  ₹ {bidDetails?.reserved_price}
                </Box> */}
                <Box className="col-lg-3 text-start"> 
                  {bidDetails?.bid_open_date === null &&
                  bidDetails?.bid_close_date === null
                    ? "- -"
                    : `${dateTimeFormatter(
                        bidDetails?.bid_open_date
                      )} - ${dateTimeFormatter(bidDetails?.bid_close_date)}`}
                </Box>
              </Box>

              <Box className="row">
                <Box className="row">
                  <Box className={cn("col text-start", styles["title"])}>
                    Company Details
                  </Box>
                </Box>
              </Box>

              <Box className="row mb-2">
                <Box
                  className="col-lg-4 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {companyDetail?.name}
                </Box>
                <Box
                  className="col-lg-4 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {companyDetail?.business_email}
                </Box>
                <Box className="col-lg-4 text-start">
                  {companyDetail?.business_mobile}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default InvitationModal;
