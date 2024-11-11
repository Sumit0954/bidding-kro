import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  ButtonBase
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LiveBidProducts from "./LiveBidProducts";
import styles from "./LivebidDetail.module.scss"
import { useLocation } from "react-router-dom";
function LivebidDetail() {
  
  const type = new URLSearchParams(useLocation().search).get("type")
  const products = [
    {
      name: "Cotton Denim Fabric",
      remainingTime: "13:50",
      quantity: "100 Ton (T)",
      reserveBid: 4500,
      currentBid: 4200,
      previousBid: 4200,
      isBestBid: true,
    },
    {
      name: "Cotton Yarn",
      remainingTime: "1:50",
      quantity: "100 Ton (T)",
      reserveBid: 4500,
      currentBid: 4200,
      previousBid: 4300,
      isBestBid: false,
    },
    {
      name: "Cotton Denim Fabric",
      remainingTime: "0:00",
      quantity: "100 Ton (T)",
      reserveBid: 3200,
      currentBid: 3000,
      previousBid: 3200,
      isBestBid: true,
    },
  ];

  return (
    <>
      <Container maxWidth="lg" >
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

        {/* Product Bid Cards */}
        {products.map((product, index) => (
          <LiveBidProducts key={index} product={product} type={type}/>
        ))}
      </Container>
    </>
  );
}

export default LivebidDetail;
