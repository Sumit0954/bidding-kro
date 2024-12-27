import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  ButtonBase,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LiveBidProducts from "./LiveBidProducts";
import styles from "./LivebidDetail.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
function LivebidDetail() {
  const type = new URLSearchParams(useLocation().search).get("type");
  const bidId = new URLSearchParams(useLocation().search).get("id");
  const [isGlobalTermsAccepted, setIsGlobalTermsAccepted] = useState(false);
  const [bidProducts, setBidProduct] = useState([]);

  const [IsAgreed, setIsAgreed] = useState(
    JSON.parse(localStorage.getItem("isAgreed")) || false
  );

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    setIsAgreed(newValue);
    localStorage.setItem("isAgreed", JSON.stringify(newValue));
  };

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("isAgreed"));
    if (storedValue !== IsAgreed) {
      setIsAgreed(storedValue);
    }
  }, []);

  useEffect(() => {
    try {
      const retrieveliveBidProducts = async () => {
        const url =
          type === "created"
            ? PortalApiUrls.LIVE_BID_PRODUCTS_BUYER
            : PortalApiUrls.LIVE_BID_PRODUCTS_SUPPLIER;
        const response = await _sendAPIRequest(
          "GET",
          `${url}${bidId}`,
          "",
          true
        );

        if (response.status === 200) {
          console.log(response.data, " : reponse");
          setBidProduct(response.data);
        }
      };
      retrieveliveBidProducts();
    } catch (error) {}
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: -3 }}
        >
          <Typography variant="h5" fontWeight="bold">
            Supply of Cotton Material
          </Typography>
          {/* Bid End Date Container */}
          <Box
            textAlign="center"
            sx={{
              border: "2px dashed black",
              p: 1, // Adds padding around the box content, adjust as needed
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Bid Ends
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              05 : 58 : 27
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Hours Minutes Seconds
            </Typography>
          </Box>
        </Grid>

        {/* Information Section */}
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Bid ID: EB24000036 | Buyer: Arvind Limited | Published: 10 April, 2024
        </Typography>

        <Box sx={{ mb: 2 }}>
          {type === "invited" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox checked={IsAgreed} onChange={handleCheckboxChange} />
              <span>
                I agree to the{" "}
                <a
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any default link behavior
                    console.log("Terms and Conditions Clicked");
                    onclick();
                  }}
                  className={styles["terms_and_conditions"]}
                >
                  terms and conditions
                </a>{" "}
                for all bids
              </span>
            </Box>
          )}
        </Box>

        {/* Product Bid Cards */}
        {bidProducts.map((liveBidproduct, index) => (
          <LiveBidProducts
            key={index}
            liveBidproduct={liveBidproduct}
            type={type}
          />
        ))}
      </Container>
    </>
  );
}

export default LivebidDetail;
