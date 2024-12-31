import React, { useState, useContext, useEffect, useRef } from "react";
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
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { ProductBid_column } from "../../../elements/CustomDataTable/PortalColumnData";
import ProductSpecificationModal from "../../../elements/CustomModal/ProductSpecificationModal";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import dayjs from "dayjs";
import { getStarColor } from "../../../helpers/common";

const LiveBidProducts = ({ liveBidproduct, type, onUpdate, timeUpFlag }) => {
  console.log(liveBidproduct, "liveBidproduct");

  const [showSpecification, setShowSpecification] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const { setAlert } = useContext(AlertContext);
  const [remainingTime, setRemainingTime] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const isTimeUpRef = useRef(false);

  const totalChances = 3;

  const sorted_participant = Array.isArray(liveBidproduct?.participant)
    ? [...liveBidproduct.participant].sort((a, b) => a.position - b.position)
    : [];

  useEffect(() => {
    if (timeUpFlag) {
      setIsTimeUp(true); // Disable the input if time is up
    }
  }, [timeUpFlag]);

  useEffect(() => {
    // Parse the updated_at value and calculate the end time
    const endTime = dayjs(liveBidproduct.updated_at).add(5, "minute").toDate();

    const updateRemainingTime = () => {
      const now = new Date();
      const diff = endTime - now;

      if (diff <= 0) {
        setRemainingTime("00:00"); // Stop timer when time runs out
        setIsTimeUp(true);

        // Trigger `onUpdate` only once
        if (!isTimeUpRef.current) {
          isTimeUpRef.current = true; // Mark as triggered
          onUpdate(); // Call the `onUpdate` function
        }

        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`
      );
    };

    // Set interval to update remaining time every second
    const timerInterval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime(); // Initial call to set time

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [liveBidproduct.updated_at]);

  const handlePlaceBid = async () => {
    console.log("Button clicked!");
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      setAlert({
        isVisible: true,
        message: "Please enter a valid bid amount.",
        severity: "error",
      });
      return;
    }

    const formData = {
      amount: bidAmount,
    };

    try {
      setBtnLoader(true);

      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.PLACE_A_BID}${liveBidproduct.id}/`,
        formData,
        true
      );

      setBtnLoader(false);
      if (response.status === 200) {
        setAlert({
          isVisible: true,
          message: "Bid placed successfully!",
          severity: "success",
        });
        onUpdate();
        // Optionally, refresh or update data here
      }
    } catch (error) {
      setBtnLoader(false);
      setAlert({
        isVisible: true,
        message:
          error.response?.data?.error ||
          "Failed to place bid. Please try again.",
        severity: "error",
      });
    }
  };

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
                    {Number(liveBidproduct?.product?.quantity)?.toFixed(0)}{" "}
                    {liveBidproduct?.product?.unit}
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
                  <Typography variant="subtitle2">
                    Reserve Bid / Unit
                  </Typography>
                  <Typography
                    variant="h6"
                    color="green"
                    className={styles["reserve-Bid"]}
                  >
                    ₹{" "}
                    {Number(liveBidproduct?.product?.reserved_price)?.toFixed(
                      0
                    )}
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
              propsData={sorted_participant}
              customClassName="portal-data-table"
              hideToolbar={true}
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
            sx={{ cursor: "pointer", textTransform: "uppercase" }}
            onClick={() => setShowSpecification(true)}
          >
            View Details
          </Typography>
        </Grid>
        <Typography
          variant="body2"
          // color="textSecondary"
          sx={{
            mb: 1,
            textAlign: "right",
            fontStyle: "italic",
            color: liveBidproduct?.participant?.count === 3 ? "red" : "green",
          }}
        >
          Chances Left: {totalChances - liveBidproduct?.participant?.count || 0}{" "}
          / 3
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          {/* Remaining Time Section */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                color: remainingTime === "00:00" ? "red" : "green",
              }}
            >
              <AccessTimeIcon
                fontSize="small"
                sx={{
                  mr: 0.5,
                  color: remainingTime === "00:00" ? "red" : "green",
                }}
              />
              Remaining Time : {remainingTime}
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
                {Number(liveBidproduct?.product?.quantity)?.toFixed(0)}{" "}
                {liveBidproduct?.product?.unit}
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
                Reserve Bid / Unit
              </Typography>
              <Typography variant="h6">
                ₹ {Number(liveBidproduct?.product?.reserved_price)?.toFixed(0)}
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
                {liveBidproduct?.participant?.position && (
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      marginLeft: "6px",
                      width: "30px",
                      height: "30px",
                      backgroundColor: getStarColor(
                        liveBidproduct?.participant?.position
                      ),
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      textAlign: "center",
                      lineHeight: "30px",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {liveBidproduct.participant.position}
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
              value={bidAmount}
              // onChange={(e) => setBidAmount(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  // Allows only numbers and one decimal point
                  setBidAmount(value);
                }
              }}
              disabled={isTimeUp}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {btnLoader ? (
              <ButtonLoader size={60} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "#062d72",
                  ":hover": { backgroundColor: "#05baee" },
                }}
                onClick={handlePlaceBid}
                disabled={isTimeUp}
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
