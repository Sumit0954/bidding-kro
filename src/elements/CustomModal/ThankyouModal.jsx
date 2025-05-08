import React from "react";
import {
  Typography,
  Modal,
  Box,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import styles from "./Modal.module.scss";
import Check from "../../assets/images/common/check.svg";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { dateTimeFormatter } from "../../helpers/formatter";
import paymentSuccess from "../../assets/images/portal/bids/success.png";

const ThankyouModal = ({
  showThankyou,
  setShowThankyou,
  heading,
  description,
  showLogin = true,
  paymentDetails,
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
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 180,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
              <img
                src={paymentSuccess}
                alt="Check"
                style={{ width: "145px", height: "118px", marginBottom: "16px" }}
              />
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
              {/* Transaction Details Table */}
              <Table sx={{ mt: 2 }}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Amount:</strong>
                    </TableCell>
                    <TableCell align="right">
                      {paymentDetails?.amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Order ID:</strong>
                    </TableCell>
                    <TableCell align="right">
                      {paymentDetails?.order_id}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Transaction Date:</strong>
                    </TableCell>
                    <TableCell align="right">
                      {dateTimeFormatter(paymentDetails?.pg?.last_updated)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Mode:</strong>
                    </TableCell>
                    <TableCell align="right">
                      {paymentDetails?.pg?.payment_method_type}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Transaction ID:</strong>
                    </TableCell>
                    <TableCell align="right">
                      {paymentDetails?.pg?.txn_id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

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
