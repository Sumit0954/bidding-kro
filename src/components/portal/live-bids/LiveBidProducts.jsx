import React, { useState } from "react";
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
import DataTable from "../../../elements/CustomDataTable/DataTable";

import { ProductBid_column } from "../../../elements/CustomDataTable/PortalColumnData";
import ProductSpecificationModal from "../../../elements/CustomModal/ProductSpecificationModal";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
const LiveBidProducts = ({ product, type }) => {
  const [showSpecification, setShowSpecification] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  return type === "created" ? (
    <>
      <Box sx={{ maxWidth: "100%", margin: "auto", padding: 2 }}>
        {/* Top Information Box */}
        <Card variant="outlined" sx={{ marginBottom: 2, position: "relative" }}>
          <CardContent>
            {/* View Details Button */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <Button
                variant="text"
                color="primary"
                onClick={() => setShowSpecification(true)}
              >
                View Details
              </Button>
            </Box>

            {/* Content */}
            <Typography
              variant="h6"
              color="green"
              className={styles["product-name"]}
            >
              Cotton Yarn
            </Typography>

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
            <DataTable
              propsColumn={ProductBid_column}
              propsData={[]}
              customClassName="portal-data-table"
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      {showSpecification && (
        <ProductSpecificationModal
          showSpecification={showSpecification}
          setShowSpecification={setShowSpecification}
          // selectedProduct={selectedProduct}
        />
      )}
    </>
  ) : (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor:
            product.remainingTime === "0:00" ? "lightgray" : "white", // Disable Paper background
          opacity: product.remainingTime === "0:00" ? 0.5 : 1, // Dim the Paper when disabled
          pointerEvents: product.remainingTime === "0:00" ? "none" : "auto", // Disable interactions
        }}
      >
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
            onClick={() => setShowSpecification(true)}
          >
            View Details
          </Typography>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          {/* Chances Left Section */}
          <Grid item xs={12} md={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 1, textAlign: "right", fontStyle: "italic" }}
            >
              Chances Left:{" "}
              {product.supplierChancesTotal - product.supplierChancesUsed} /{" "}
              {product.supplierChancesTotal}
            </Typography>
          </Grid>

          {/* Existing UI */}
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
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                padding: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Quantity
              </Typography>
              <Typography variant="h6">{product.quantity}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                padding: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Reserve Bid
              </Typography>
              <Typography variant="h6">₹{product.reserveBid}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                padding: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Current Bid Price
              </Typography>
              <Typography variant="h6">₹{product.currentBid}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Ensures vertical centering
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Your Bid Price
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ₹{product.previousBid}
                {product.isBestBid && (
                  <span
                    className={styles["best-bid"]}
                    aria-label="Best Bid Star"
                  >
                    ★
                  </span>
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={10}>
            {product.remainingTime === "0:00" ? (
              <></>
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Enter your amount here..."
              />
            )}
          </Grid>

          <Grid item xs={12} md={2}>
            {btnLoader ? (
              <ButtonLoader size={60} />
            ) : (
              <Button
                variant="contained"
                color="success"
                fullWidth={true}
                className={styles["place-bid-btn"]}
              >
                {product.remainingTime === "0:00" ? "Bid closed" : "PLACE BID"}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {showSpecification && (
        <ProductSpecificationModal
          showSpecification={showSpecification}
          setShowSpecification={setShowSpecification}
          // selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default LiveBidProducts;
