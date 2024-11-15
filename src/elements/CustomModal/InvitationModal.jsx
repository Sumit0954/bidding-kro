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
  listtype,
}) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

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
      console.log("listtype : ", listtype);
      console.log("Company details : ", companyDetail);
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.SEND_INVITE + `${bidDetails?.id}/`,
        formData,
        true
      );
      if (response.status === 204) {
        setLoading(false);
        setInvitation(false);
        window.location.reload();
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
                  Send Invitation For Bid
                </Typography>

                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="button"
                    className="btn button"
                    onClick={sendInvite}
                  >
                    Send Invitation
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
                  {listtype === "allcompanies"
                    ? companyDetail?.name
                    : companyDetail?.requestor.name}
                </Box>
                <Box
                  className="col-lg-4 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {listtype === "allcompanies"
                    ? companyDetail?.business_email
                    : companyDetail?.requestor.business_email}
                </Box>
                <Box className="col-lg-4 text-start">
                  {listtype === "allcompanies"
                    ? companyDetail?.business_mobile
                    : companyDetail?.requestor.business_mobile}
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
