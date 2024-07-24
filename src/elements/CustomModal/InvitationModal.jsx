import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import { dateTimeFormatter } from "../../helpers/formatter";

const InvitationModal = ({
  addInvitaion,
  setInvitation,
  bidDetails,
  comapnyDetail,
}) => {
    
  const handleClose = () => {
    setInvitation(false);
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
                <button className="btn button">Send Message</button>
              </Box>

              <Box className="row">
                <Box className={cn("col text-start", styles["title"])}>
                  Bid Details
                </Box>
              </Box>

              <Box className="row mb-2">
                <Box className="col text-start">{bidDetails?.title}</Box>
              </Box>

              <Box className="row mb-2">
                <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {bidDetails?.formatted_number}
                </Box>
                <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {bidDetails?.product_quantity} {bidDetails?.product_unit}{" "}
                </Box>
                <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  ₹ {bidDetails?.reserved_price}
                </Box>
                <Box className="col-lg-3 text-start">
                  {dateTimeFormatter(bidDetails?.bid_start_date)}
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
                  className="col-lg-6 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {comapnyDetail?.name}
                </Box>
                <Box className="col-lg-6 text-start">
                  {comapnyDetail?.owner_name}
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
