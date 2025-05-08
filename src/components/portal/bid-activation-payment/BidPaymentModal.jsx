import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import styles from "./BidPaymentModal.module.scss";
import bid_payment from "../../../assets/images/portal/bids/bid-payment.jpg";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

export default function BidPaymentModal({
  activateBid,
  setActivateBid,
  bidAmount,
  setConfirmPaymentLoading,
  setShowThankyou,
  bidid,
  checkBidConfirmation,
}) {
  const intervalRef = useRef(null);
  const fetchOrderStatus = async () => {
    const bidFormData = new FormData();
    bidFormData.append("bid", bidid);
    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls?.BID_CREATE_ORDER,
        bidFormData,
        true
      );
      if (response?.status === 201) {
        const paymentLink = response?.data?.payment_link;
        window.open(paymentLink, "_blank");
        setActivateBid(false);
        setConfirmPaymentLoading(true);
        intervalRef.current = setInterval(() => {
          verifyBidPayment();
        }, 15000);
        setTimeout(() => setConfirmPaymentLoading(false), 900000);
      }
    } catch (error) {}
  };
  const verifyBidPayment = async () => {
    const bidFormData = new FormData();
    bidFormData.append("bid", bidid);
    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls?.BID_VERIFY_PAYMENT,
        bidFormData,
        true
      );
      if (response?.status === 200) {
        const payment_status = response?.data?.pg?.status;
        if (payment_status === "CHARGED") {
          setConfirmPaymentLoading(false);
          setShowThankyou(true);
          checkBidConfirmation(response?.data);
          clearInterval(intervalRef.current);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <Modal open={activateBid} onClick={() => setActivateBid(false)}>
      <Box className={styles.bidModalBox}>
        <Card>
          <CardMedia
            component="img"
            height="180"
            image={bid_payment}
            alt="bid_payment"
          />
          <CardContent>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Bid Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                {[
                  { label: "Bid ID", value: "EB25000248" },
                  {
                    label: "Bid Title",
                    value: "Bid for Acoustic Baffles, Acou...",
                  },
                  { label: "Type", value: "QCBS" },
                ].map((item, index) => (
                  <Grid item xs={12} key={index} className={styles.bidRow}>
                    <Typography variant="body2" className={styles.boldLabel}>
                      {item.label}:
                    </Typography>
                    <Typography variant="body2">{item.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <br />
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="subtitle1">₹ {bidAmount}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" color="text.secondary">
                  GST (18%)
                </Typography>
                <Typography variant="subtitle1">
                  ₹ {(bidAmount * 0.18).toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Payable
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ₹ {(bidAmount * 1.18).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="info"
              className={styles.payButton}
              onClick={() => fetchOrderStatus()}
            >
              Pay Now
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
