import { Box, Modal, Typography } from '@mui/material';
import React from 'react'
import styles from "./ThankyouModal.module.scss";
import cn from "classnames";
import EmailIcon from '../../assets/images/common/email.png'

const CheckEmailModal = ({ open, setCheckEmail, description }) => {
  const handleClose = () => {
    setCheckEmail(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <img src={EmailIcon} alt="Check" />
              <Typography
                className={cn("my-3", styles["modal-title"])}
                id="modal-modal-title"
                variant="h3"
                component="h3"
              >
                Check your email
              </Typography>
              <Typography
                className={cn("my-3", styles["modal-desc"])}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default CheckEmailModal