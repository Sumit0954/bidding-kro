import React, { useEffect, useRef, useState } from "react";
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
import TermAndConditionModal from "../../../elements/CustomModal/TermAndConditionModal";
import { dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

function LivebidDetail() {
  const type = new URLSearchParams(useLocation().search).get("type");
  const bidId = new URLSearchParams(useLocation().search).get("id");
  const [bidProducts, setBidProduct] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);
  const [isTermandConfitionOpen, setIsTermandConfitionOpen] = useState(false);
  const location = useLocation();

  const [timeUpFlag, setTimeUpFlag] = useState(false);

  const [IsAgreed, setIsAgreed] = useState(
    JSON.parse(localStorage.getItem("isAgreed")) || false
  );

  const { bid } = location.state || {};

  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const closeTime = new Date(bid?.bid_close_date);
      const difference = closeTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Update DOM directly to avoid re-renders
        if (hoursRef.current)
          hoursRef.current.textContent = String(hours).padStart(2, "0");
        if (minutesRef.current)
          minutesRef.current.textContent = String(minutes).padStart(2, "0");
        if (secondsRef.current)
          secondsRef.current.textContent = String(seconds).padStart(2, "0");
      } else {
        // Bid is closed
        if (hoursRef.current) hoursRef.current.textContent = "00";
        if (minutesRef.current) minutesRef.current.textContent = "00";
        if (secondsRef.current) secondsRef.current.textContent = "00";

        setTimeUpFlag(true);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [bid?.bid_close_date]);

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

  const fetchLiveBidData = async () => {
    try {
      const url =
        type === "created"
          ? PortalApiUrls.LIVE_BID_PRODUCTS_BUYER
          : PortalApiUrls.LIVE_BID_PRODUCTS_SUPPLIER;
      const response = await _sendAPIRequest("GET", `${url}${bidId}`, "", true);
      if (response.status === 200) {
        setBidProduct(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.error("Error fetching live bid data:", error);
    }
  };

  // Fetch data on mount and every 15 seconds
  useEffect(() => {
    fetchLiveBidData(); // Initial fetch
    const interval = setInterval(fetchLiveBidData, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Callback to refresh data
  const handleDataUpdate = () => {
    fetchLiveBidData();
  };

  // useEffect(() => {
  //   try {
  //     const retrieveliveBidProducts = async () => {
  //       const url =
  //         type === "created"
  //           ? PortalApiUrls.LIVE_BID_PRODUCTS_BUYER
  //           : PortalApiUrls.LIVE_BID_PRODUCTS_SUPPLIER;
  //       const response = await _sendAPIRequest(
  //         "GET",
  //         `${url}${bidId}`,
  //         "",
  //         true
  //       );

  //       if (response.status === 200) {
  //         setBidProduct(response.data);
  //         setScreenLoader(false);
  //       }
  //     };
  //     retrieveliveBidProducts();
  //   } catch (error) {}
  // }, []);


  if (screenLoader) {
    return <ScreenLoader />;
  }

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
            {truncateString(bid?.title, 50)}
          </Typography>
          {/* Bid End Date Container */}
          <Box textAlign="center" className={styles["bidEndTime"]}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              fontWeight={"bold"}
            >
              Bid Ends
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              <span ref={hoursRef}>00</span> : <span ref={minutesRef}>00</span>{" "}
              : <span ref={secondsRef}>00</span>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Hours Minutes Seconds
            </Typography>
          </Box>
        </Grid>

        {/* Information Section */}
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Bid ID: <strong>EB240000{bid?.id}</strong> |{" "}
          {type !== "created" && `Buyer: ${bid?.company?.name} |`} Published:{" "}
          {dateTimeFormatter(bid?.created_at)}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {type !== "created" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={IsAgreed}
                onChange={handleCheckboxChange}
                disabled={IsAgreed}
              />
              <span>
                I agree to the{" "}
                <a
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any default link behavior
                    setIsTermandConfitionOpen(true);
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
            IsAgreed={IsAgreed}
            onUpdate={handleDataUpdate}
            timeUpFlag={timeUpFlag}
          />
        ))}

        {isTermandConfitionOpen && (
          <TermAndConditionModal
            isTermandConfitionOpen={isTermandConfitionOpen}
            setIsTermandConfitionOpen={setIsTermandConfitionOpen}
            setIsAgreed={setIsAgreed}
            IsAgreed={IsAgreed}
          />
        )}
      </Container>
    </>
  );
}

export default LivebidDetail;
