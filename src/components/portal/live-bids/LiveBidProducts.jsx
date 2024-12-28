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
const LiveBidProducts = ({ liveBidproduct, type }) => {
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
              {liveBidproduct?.product?.title}
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
                    {liveBidproduct?.product?.quantity} Ton (T)
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
                    ₹ {liveBidproduct?.product?.reserved_price}
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
                    ₹ {liveBidproduct?.lowest_bid_amount}
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
          selectedProduct={liveBidproduct?.product}
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
        }}
      >
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight="bold" color={"#062d72"}>
            {liveBidproduct?.product?.title}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" , textTransform : "uppercase" }}
            onClick={() => setShowSpecification(true)}
          >
            View Details
          </Typography>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1, textAlign: "right", fontStyle: "italic" }}
        >
          Chances Left: 0
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          {/* Remaining Time Section */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <AccessTimeIcon
                fontSize="small"
                sx={{ mr: 0.5, color: "gray" }}
              />
              Remaining Time: 4 min
            </Typography>
          </Grid>

          {/* Quantity Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Quantity
              </Typography>
              <Typography variant="h6">
                {liveBidproduct?.product?.quantity}
              </Typography>
            </Box>
          </Grid>

          {/* Reserve Bid Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Reserve Bid
              </Typography>
              <Typography variant="h6">
                ₹ {liveBidproduct?.product?.reserved_price}
              </Typography>
            </Box>
          </Grid>

          {/* Current Bid Price Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Current Bid Price
              </Typography>
              <Typography variant="h6">
                ₹ {liveBidproduct?.lowest_bid_amount}
              </Typography>
            </Box>
          </Grid>

          {/* Your Bid Price Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                textAlign: "center",
                border: "1px dashed gray",
                p: 1.5,
                borderRadius: "8px",
                backgroundColor: "#f0f8ff",
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
                  color:
                    liveBidproduct?.participant?.position === 1 ? "062d72" : "",
                }}
              >
                {liveBidproduct?.participant === null
                  ? "-"
                  : `₹ ${liveBidproduct?.participant?.amount}`}
                {liveBidproduct?.participant?.position === 1 && (
                  <span
                    style={{
                      color: "gold",
                      marginLeft: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    ★
                  </span>
                )}
              </Typography>
            </Box>
          </Grid>

          {/* Text Input and Button */}
          <Grid item xs={12} md={10}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Enter your amount here..."
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {btnLoader ? (
              <ButtonLoader size={60} />
            ) : (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "#062d72",
                  ":hover": { backgroundColor: "#05baee" },
                }}
              >
                Place bid
              </Button>
            )}
          </Grid>
        </Grid>
        {showSpecification && (
          <ProductSpecificationModal
            showSpecification={showSpecification}
            setShowSpecification={setShowSpecification}
            selectedProduct={liveBidproduct?.product}
          />
        )}
      </Paper>
    </>
  );
};

export default LiveBidProducts;
