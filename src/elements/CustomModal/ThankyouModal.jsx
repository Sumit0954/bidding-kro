import React from "react";
import { Typography, Modal, Box } from "@mui/material";
import styles from "./Modal.module.scss";
import Check from "../../assets/images/common/check.svg";
import cn from "classnames";
import { NavLink } from "react-router-dom";

const ThankyouModal = ({
  showThankyou,
  setShowThankyou,
  heading,
  description,
  showLogin = true,
}) => {
  const handleClose = () => {
    setShowThankyou(false);
  };

  return (
    <>
      <Modal
        open={showThankyou}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <img src={Check} alt="Check" />
              <Typography
                className={cn("my-3", styles["modal-title"])}
                id="modal-modal-title"
                variant="h3"
                component="h3"
              >
                {heading}
              </Typography>
              <Typography
                className={cn("my-3", styles["modal-desc"])}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {description}
              </Typography>
              {showLogin && (
                <NavLink to={"/login"} className={cn("btn", "button")}>
                  Login
                </NavLink>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ThankyouModal;
