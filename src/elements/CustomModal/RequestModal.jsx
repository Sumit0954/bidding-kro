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

const RequestModal = ({ sendRequest, setSendRequest }) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const {control} = useForm()

  const handleClose = () => {
    setSendRequest(false);
  };

  //   const sendInvite = async () => {
  //     setLoading(true);
  //     try {
  //       let formData = new FormData();
  //       formData.append("company", companyDetail?.id);

  //       const response = await _sendAPIRequest(
  //         "POST",
  //         PortalApiUrls.SEND_INVITE + `${bidDetails?.id}/`,
  //         formData,
  //         true
  //       );
  //       if (response.status === 204) {
  //         setLoading(false);
  //         setInvitation(false);
  //         setAlert({
  //           isVisible: true,
  //           message: "Invitation successfully sent to the supplier.",
  //           severity: "success",
  //         });
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       if (error.response.data.error_code === 9999)
  //         setAlert({
  //           isVisible: true,
  //           message: error.response.data.error,
  //           severity: "error",
  //         });
  //     }
  //   };

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
                    // onClick={sendInvite}
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

              {/* <Box className="row mb-2">
                <Box className="col text-start">{bidDetails?.title}</Box>
              </Box> */}

              <Box className="row mb-2">
                <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {/* {bidDetails?.formatted_number} */}
                </Box>
                <Box
                  className="col-lg-4 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  {/* {bidDetails?.title}{" "} */}
                </Box>
                {/* <Box
                  className="col-lg-3 text-start"
                  sx={{ borderRight: "2px solid var(--primary-color)" }}
                >
                  ₹ {bidDetails?.reserved_price}
                </Box> */}
                {/* <Box className="col-lg-3 text-start"> 
                  {bidDetails?.bid_open_date === null &&
                  bidDetails?.bid_close_date === null
                    ? "- -"
                    : `${dateTimeFormatter(
                        bidDetails?.bid_start_date
                      )} - ${dateTimeFormatter(bidDetails?.bid_close_date)}`}
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RequestModal;
