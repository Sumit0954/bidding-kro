import React, { useState, useContext, useEffect, useRef } from "react";
import {
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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./LiveBidProducts.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { ProductBid_column } from "../../../elements/CustomDataTable/PortalColumnData";
import ProductSpecificationModal from "../../../elements/CustomModal/ProductSpecificationModal";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import dayjs from "dayjs";
import { getStarColor } from "../../../helpers/common";
import NoliveBidImg from "../../../assets/images/portal/bids/bid-closed-img.png";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const calculateEndTime = (bidCloseTime, liveBidproduct, timeInSec) => {
  const now = new Date();
  const closeTime = new Date(bidCloseTime);
  const updatedAt = new Date(liveBidproduct.updated_at);

  // Calculate the difference in milliseconds
  const difference = closeTime - now;

  if (difference > 5 * 60 * 1000) {
    // If the difference is greater than 5 minutes
    return dayjs(liveBidproduct.updated_at).add(5, "minute").toDate();
  } else {
    // If the difference is less than or equal to 5 minutes
    // return dayjs(liveBidproduct.updated_at)
    //   .add(difference / 1000, "second") // Add the exact difference in seconds
    //   .toDate();
    return dayjs(liveBidproduct.updated_at)
      .add(closeTime - updatedAt, "millisecond") // Add the exact difference in seconds
      .toDate();
  }
};

const LiveBidProducts = ({
  liveBidproduct,
  type,
  onUpdate,
  timeUpFlag,
  bidCloseTime,
  screenLoader,
}) => {
  console.log(liveBidproduct, "liveBidproduct");

  const [showSpecification, setShowSpecification] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const { setAlert } = useContext(AlertContext);
  const [remainingTime, setRemainingTime] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const isTimeUpRef = useRef(false);
  const [lastUpdated, setlastUpdated] = useState();
  const [endTime, setEndTime] = useState(null);
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
    if (remainingTime == "00:00") {
    }
  }, [remainingTime]);

  // Calculate and store `endTime`
  useEffect(() => {
    const calculatedEndTime = calculateEndTime(bidCloseTime, liveBidproduct);
    setEndTime(calculatedEndTime);
    console.log(remainingTime, "remainingTimeremainingTime");
  }, [liveBidproduct.updated_at]);

  // Update Remaining Time
  useEffect(() => {
    if (!endTime) return;

    const updateRemainingTime = () => {
      const now = new Date();
      const diff = endTime - now;

      if (diff <= 0) {
        setRemainingTime("00:00");
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

    const timerInterval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime(); // Call immediately on mount

    return () => clearInterval(timerInterval); // Cleanup timer
  }, [endTime, onUpdate]);

  // Update Last Updated Time
  useEffect(() => {
    const lastUpdateTime = () => {
      const now = new Date();
      const updatedAt = new Date(liveBidproduct.updated_at);

      // Calculate the difference in seconds and round to the nearest 10 seconds
      const secondsAgo = Math.floor((now - updatedAt) / 1000);
      const roundedSeconds = Math.floor(secondsAgo / 10) * 10;

      // Format minutes and seconds
      const minutes = Math.floor(roundedSeconds / 60);
      const seconds = roundedSeconds % 60;

      const formattedTime =
        minutes > 0
          ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
              2,
              "0"
            )} ago`
          : `${roundedSeconds} seconds ago`;

      setlastUpdated(formattedTime);
    };

    const lastUpdateInterval = setInterval(lastUpdateTime, 10000);
    lastUpdateTime(); // Call immediately on mount

    return () => clearInterval(lastUpdateInterval); // Cleanup timer
  }, [liveBidproduct?.updated_at]);

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
        setBidAmount("");
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

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return type === "created" ? (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        {/* Top Information Box */}
        <Card variant="outlined" sx={{ marginBottom: 2, position: "relative" }}>
          {isTimeUp && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none", // allows clicking through the overlay
              }}
            >
              <img
                src={NoliveBidImg}
                alt="Bidding Closed"
                style={{
                  width: "50%", // increased from 200px
                  opacity: 0.3,
                }}
              />
            </Box>
          )}
          <CardContent>
            {/* View Details Button */}
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Grid item>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={"#062d72"}
                  sx={{
                    textAlign: {
                      xs: "center",
                      md: "left",
                    },
                  }}
                >
                  {liveBidproduct?.product?.title}
                </Typography>
                {isTimeUp ? (
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontStyle: "italic",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ mr: 0.5, color: "red" }}
                    />
                    Bidding Closed
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontStyle: "italic",
                      color: "green",
                      mt: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ mr: 0.5, color: "green" }}
                    />
                    Remaining Time: {remainingTime}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: "italic",
                    color: "green",
                    mt: 0.5,
                  }}
                >
                  Minimum Price Difference: ₹{" "}
                  {liveBidproduct?.product?.min_decrement_amount}
                </Typography>
              </Grid>
              <Grid item sx={{ textAlign: "right" }}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textAlign: {
                      xs: "center",
                      md: "right",
                    },
                    marginTop: {
                      xs: "5px",
                    },
                  }}
                  onClick={() => setShowSpecification(true)}
                >
                  View Details
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: "italic",
                    color: "gray",
                    mt: 1,
                  }}
                >
                  Last Bid placed: {lastUpdated || "No updates yet"}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {/* Quantity Section */}
              <Grid item xs={12} md={4}>
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
                  <Typography variant="h6" className={styles["headTitle"]}>
                    {Number(liveBidproduct?.product?.quantity) % 1 === 0
                      ? Number(liveBidproduct?.product?.quantity).toFixed(0) // Show as integer if no decimals
                      : liveBidproduct?.product?.quantity}{" "}
                    {/* {Number(liveBidproduct?.product?.quantity)?.toFixed(0)}{" "} */}
                    {liveBidproduct?.product?.unit}
                  </Typography>
                </Box>
              </Grid>

              {/* Reserve Bid Section */}
              <Grid item xs={12} md={4}>
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
                  <Typography variant="h6" className={styles["headTitle"]}>
                    ₹{" "}
                    {Number(liveBidproduct?.product?.reserved_price)?.toFixed(
                      0
                    )}
                  </Typography>
                </Box>
              </Grid>

              {/* Your Bid Price Section */}
              <Grid item xs={12} md={4}>
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
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={styles["headTitle"]}
                  >
                    ₹ {liveBidproduct?.lowest_bid_amount}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Accordion for Current Bidders */}
        <Accordion sx={{ marginTop: -3 }}>
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
          position: "relative", // Add this
          overflow: "hidden", // Optional: prevents any overflow visually
        }}
      >
        {/* Title Section */}

        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Grid item>
            <Typography variant="h6" fontWeight="bold" color={"#062d72"}>
              {liveBidproduct?.product?.title}
            </Typography>
            {isTimeUp ? (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontStyle: "italic",
                  color: "red",
                  mt: 0.5,
                }}
              >
                <AccessTimeIcon
                  fontSize="small"
                  sx={{ mr: 0.5, color: "red" }}
                />
                Bidding Closed
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontStyle: "italic",
                  color: "green",
                  mt: 0.5,
                }}
              >
                <AccessTimeIcon
                  fontSize="small"
                  sx={{ mr: 0.5, color: "green" }}
                />
                Remaining Time: {remainingTime}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "green",
                mt: 0.5,
              }}
            >
              Minimum Price Difference: ₹{" "}
              {liveBidproduct?.product?.min_decrement_amount}
            </Typography>
          </Grid>
          <Grid item sx={{ textAlign: "right" }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", textTransform: "uppercase" }}
              onClick={() => setShowSpecification(true)}
            >
              View Details
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color:
                  liveBidproduct?.participant?.count === 3 ? "red" : "green",
                mt: 1,
              }}
            >
              Chances Left:{" "}
              {totalChances - liveBidproduct?.participant?.count || 0} /{" "}
              {totalChances}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "gray",
                mt: 0.5,
              }}
            >
              Last Bid placed: {lastUpdated || "No updates yet"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
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
              <Typography variant="h6" className={styles["headTitle"]}>
                {Number(liveBidproduct?.product?.quantity) % 1 === 0
                  ? Number(liveBidproduct?.product?.quantity).toFixed(0) // Show as integer if no decimals
                  : liveBidproduct?.product?.quantity}{" "}
                {/* {Number(liveBidproduct?.product?.quantity)?.toFixed(0)}{" "} */}
                {liveBidproduct?.product?.unit}
              </Typography>
            </Box>
          </Grid>
          {isTimeUp && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none", // allows clicking through the overlay
              }}
            >
              <img
                src={NoliveBidImg}
                alt="Bidding Closed"
                style={{
                  width: "60%", // Adjust as needed
                  opacity: 0.2, // Subtle overlay
                  objectFit: "contain",
                }}
              />
            </Box>
          )}

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
              <Typography variant="h6" className={styles["headTitle"]}>
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
              <Typography variant="h6" className={styles["headTitle"]}>
                ₹ {Number(liveBidproduct?.lowest_bid_amount)?.toFixed(0)}
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
                // backgroundColor: "#f0f8ff",
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
                className={styles["headTitle"]}
              >
                {liveBidproduct?.participant === null
                  ? "-"
                  : `₹ ${Number(liveBidproduct?.participant?.amount)?.toFixed(
                      0
                    )}`}

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

          {isTimeUp ? (
            <>
              <Grid item xs={12}>
                {btnLoader ? (
                  <ButtonLoader size={60} />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled
                    fullWidth
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      height: "100%",
                      backgroundColor: "#062d72",
                      ":hover": { backgroundColor: "#05baee" },
                    }}
                    // onClick={handlePlaceBid}
                    // disabled={isTimeUp}
                  >
                    Bid Closed
                  </Button>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={10}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Enter your amount here..."
                  value={bidAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
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
            </>
          )}
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
