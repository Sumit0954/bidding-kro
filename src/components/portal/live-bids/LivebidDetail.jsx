import React, { useState } from "react";
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
function LivebidDetail() {
  const type = new URLSearchParams(useLocation().search).get("type");
  const [isGlobalTermsAccepted, setIsGlobalTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const products = [
    {
      name: "Cotton Denim Fabric",
      remainingTime: "13:50",
      quantity: "100 Ton (T)",
      reserveBid: 4500,
      currentBid: 4200,
      previousBid: 4200,
      isBestBid: true,
      supplierChancesTotal: 3,
      supplierChancesUsed: 1,
    },
    {
      name: "Cotton Yarn",
      remainingTime: "1:50",
      quantity: "100 Ton (T)",
      reserveBid: 4500,
      currentBid: 4400,
      previousBid: 4300,
      isBestBid: false,
      supplierChancesTotal: 3,
      supplierChancesUsed: 1,
    },
    {
      name: "Cotton Denim Fabric",
      remainingTime: "0:00",
      quantity: "100 Ton (T)",
      reserveBid: 3200,
      currentBid: 3200,
      previousBid: 2800,
      isBestBid: false,
      supplierChancesTotal: 3,
      supplierChancesUsed: 1,
    },
  ];

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={isGlobalTermsAccepted}
              onChange={(e) => setIsGlobalTermsAccepted(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <a
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default link behavior
                  console.log("Terms and Conditions Clicked");
                  onclick()
                }}
                className={styles["terms_and_conditions"]}
              >
                terms and conditions
              </a>{" "}
              for all bids
            </span>
          </Box>
        </Box>

        {/* Product Bid Cards */}
        {products.map((product, index) => (
          <LiveBidProducts key={index} product={product} type={type} />
        ))}
      </Container>
    </>
  );
}

export default LivebidDetail;
