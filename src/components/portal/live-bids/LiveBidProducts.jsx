import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonBase,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./LiveBidProducts.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
const LiveBidProducts = ({ product, type }) => {
  console.log("type : ", type);
  return type === "supplier" ? (
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
            <Button
              variant="contained"
              color="success"
              fullWidth
              className={styles["place-bid-btn"]}
            >
              PLACE BID
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  ) : (
    <>
      <Box sx={{ maxWidth: "100%", margin: "auto", padding: 2 }}>
        {/* Top Information Box */}

        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              color="green"
              className={styles["product-name"]}
            >
              Cotton Yarn
            </Typography>
            <Typography color="red">Remaining Time: 1:15</Typography>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px dashed gray",
                    padding: 1,
                  }}
                >
                  <Typography variant="subtitle2">Quantity</Typography>
                  <Typography
                    variant="h6"
                    color="green"
                    className={styles["quantity"]}
                  >
                    100 Ton (T)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px dashed gray",
                    padding: 1,
                  }}
                >
                  <Typography variant="subtitle2">Reserve Bid</Typography>
                  <Typography
                    variant="h6"
                    color="green"
                    className={styles["reserve-Bid"]}
                  >
                    ₹4,500
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    border: "1px dashed gray",
                    padding: 1,
                  }}
                >
                  <Typography variant="subtitle2">Current Bid</Typography>
                  <Typography
                    variant="h6"
                    color="green"
                    className={styles["current-Bid"]}
                  >
                    ₹4,200
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "right", marginTop: 1 }}>
              <Button variant="text" color="primary">
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Accordion for Current Bidders */}
        <Accordion sx={{ position: "relative", bottom: "15px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Current Bidders
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Bid Position
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Company Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Bid Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      position: "L1",
                      company: "Arvind Limited",
                      amount: "₹5000",
                    },
                    {
                      position: "L2",
                      company: "Raymond Limited",
                      amount: "₹4000",
                    },
                    {
                      position: "L3",
                      company: "Alok Industries Limited",
                      amount: "₹1500",
                    },
                    {
                      position: "L4",
                      company: "Bombay Dyeing and Manufact...",
                      amount: "₹4300",
                    },
                    { position: "L5", company: "Loyal Group", amount: "₹3800" },
                  ].map((bidder, index) => (
                    <TableRow key={index} sx={{ mb: 2 }}>
                      <TableCell>{bidder.position}</TableCell>
                      <TableCell>
                        <Button variant="text" color="primary">
                          {bidder.company}
                        </Button>
                      </TableCell>
                      <TableCell>{bidder.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default LiveBidProducts;
