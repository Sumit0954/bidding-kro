import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from  "./LiveBidProducts.module.scss"
const LiveBidProducts = ({ product }) => {
  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            View Details
          </Typography>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: "gray" }} />
            <Typography variant="body2" color="textSecondary">
              Remaining Time: {product.remainingTime}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="textSecondary">
              Quantity
            </Typography>
            <Typography variant="h6">{product.quantity}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="textSecondary">
              Reserve Bid
            </Typography>
            <Typography variant="h6">₹{product.reserveBid}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="textSecondary">
              Current Bid
            </Typography>
            <Typography variant="h6">₹{product.currentBid}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="textSecondary">
              Previous Bid
            </Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              ₹{product.previousBid}
              {product.isBestBid && (
                <span
                  style={{
                    color: "gold",
                    fontSize: "1.2rem",
                    marginLeft: "5px",
                  }}
                >
                  ★
                </span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Enter your amount here..."
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="success" fullWidth className={styles["place-bid-btn"]}>
              PLACE BID
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default LiveBidProducts;
