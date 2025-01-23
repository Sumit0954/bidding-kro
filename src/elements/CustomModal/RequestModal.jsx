import { Box, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import { dateTimeFormatter } from "../../helpers/formatter";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../CustomLoader/Loader";
import { AlertContext } from "../../contexts/AlertProvider";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";

const RequestModal = ({ sendRequest, setSendRequest, bidDetails }) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  console.log("request : ", bidDetails?.title);

  const { control } = useForm();

  const handleClose = () => {
    setSendRequest(false);
  };

  const sendInviteRequest = async () => {
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.SEND_RELATED_REQUEST + `${bidDetails?.id}/`,
        " ",
        true
      );
      if (response.status === 204) {
        setLoading(false);
        setSendRequest(false);
        setAlert({
          isVisible: true,
          message: "Request successfully sent to the Buyer.",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
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
        open={sendRequest}
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
                  Request Participation
                </Typography>

                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="button"
                    className="btn button"
                    onClick={() => sendInviteRequest()}
                  >
                    Send Request
                  </button>
                )}
              </Box>

              <Box className="row">
                <CustomInput
                  control={control}
                  name="message"
                  placeholder="Message to buyer (Optional)"
                  inputType="message"
                />
                <Box className={cn("col text-start", styles["title"])}>
                  Bid Details
                </Box>
              </Box>

              <Box
                className="row mb-2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  className="col text-start"
                  sx={{
                    flex: 1,
                    borderRight: "2px solid var(--primary-color)",
                    paddingRight: "10px",
                  }}
                >
                  {bidDetails?.type}
                </Box>

                <Box
                  className="col-lg-4 text-start"
                  sx={{
                    flex: 2,
                    borderRight: "2px solid var(--primary-color)",
                    paddingRight: "10px",
                  }}
                >
                  {bidDetails?.title}
                </Box>

                <Box className="col-lg-3 text-start" sx={{ flex: 2 }}>
                  {bidDetails?.bid_open_date === null &&
                  bidDetails?.bid_close_date === null
                    ? "- -"
                    : `${dateTimeFormatter(
                        bidDetails?.bid_open_date
                      )} - ${dateTimeFormatter(bidDetails?.bid_close_date)}`}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RequestModal;
