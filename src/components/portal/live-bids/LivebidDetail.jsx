import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertTitle,
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
  const location = useLocation();

  const [bidProducts, setBidProduct] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);
  const [isTermandConfitionOpen, setIsTermandConfitionOpen] = useState(false);
  const [timeUpFlag, setTimeUpFlag] = useState(false);
  const [isAgreed, setIsAgreed] = useState(
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

        if (hoursRef.current)
          hoursRef.current.textContent = String(hours).padStart(2, "0");
        if (minutesRef.current)
          minutesRef.current.textContent = String(minutes).padStart(2, "0");
        if (secondsRef.current)
          secondsRef.current.textContent = String(seconds).padStart(2, "0");
      } else {
        if (hoursRef.current) hoursRef.current.textContent = "00";
        if (minutesRef.current) minutesRef.current.textContent = "00";
        if (secondsRef.current) hoursRef.current.textContent = "00";

        setTimeUpFlag(true);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [bid?.bid_close_date]);

  // const handleCheckboxChange = (e) => {
  //   const newValue = e.target.checked;
  //   setIsAgreed(newValue);
  //   localStorage.setItem("isAgreed", JSON.stringify(newValue));
  // };

  const fetchLiveBidData = async () => {
    try {
      const url =
        type === "created"
          ? PortalApiUrls.LIVE_BID_PRODUCTS_BUYER
          : PortalApiUrls.LIVE_BID_PRODUCTS_SUPPLIER;
      const response = await _sendAPIRequest(
        "GET",
        `${url}${bidId}/`,
        "",
        true
      );
      if (response.status === 200) {
        setBidProduct(response.data);
        const hasParticipant = response.data.some(
          (product) => product.participant !== null
        );
        if (hasParticipant) {
          setIsAgreed(true);
          localStorage.setItem("isAgreed", JSON.stringify(true));
        }
        setScreenLoader(false);
      }
    } catch (error) {
      console.error("Error fetching live bid data:", error);
    }
  };

  useEffect(() => {
    fetchLiveBidData();
    const interval = setInterval(fetchLiveBidData, 10000);
    return () => clearInterval(interval);
  }, []);

  //Callback to refresh data
  const handleDataUpdate = () => {
    fetchLiveBidData();
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "1rem", // small screen (e.g., phones)
              sm: "1.25rem", // tablets
              md: "1.5rem", // desktops
            },
            marginBottom: {
              xs: "10px",
            },
            textAlign: {
              xs: "center",
            },
          }}
        >
          {truncateString(bid?.title, 50)}
        </Typography>

        <Box textAlign="center" className={styles["bidEndTime"]} >
          <Typography variant="subtitle2" fontWeight="bold">
            Bid Ends in
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="primary">
            <span ref={hoursRef}>00</span>:<span ref={minutesRef}>00</span>:
            <span ref={secondsRef}>00</span>
          </Typography>
          <Typography variant="caption">Hours Minutes Seconds</Typography>
        </Box>
      </Grid>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: {
            xs: "1rem", // small screen (e.g., phones)
            sm: "1.25rem", // tablets
            md: "1.3rem", // desktops
          },
          marginBottom: {
            xs: "10px",
          },
          marginTop: {
            xs: "10px",
          },
          textAlign: {
            xs: "center",
            sm : "left",
            md : "left"
          },
        }}
      >
        Bid ID: <strong>EB240000{bid?.id}</strong> |{" "}
        {type !== "created" && `Buyer: ${bid?.company?.name} |`} Published:{" "}
        {dateTimeFormatter(bid?.created_at)}
      </Typography>

      {timeUpFlag && type !== "created" && (
        <Alert severity="info">
          <AlertTitle>Note: Bid Ended</AlertTitle>
          Results will be shared on your mail shortly.
        </Alert>
      )}

      <Box>
        {type !== "created" && (
          <Box
            display="flex"
            alignItems="center"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <span>
              Please Agree to our{" "}
              <a
                style={{ color: "blue", cursor: "pointer" }} // Ensure it's styled correctly
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Terms and conditions link clicked");
                  setIsTermandConfitionOpen(true);
                }}
              >
                terms and conditions
              </a>
            </span>
          </Box>
        )}
      </Box>

      {bidProducts.map((liveBidProduct, index) => (
        <LiveBidProducts
          key={index}
          liveBidproduct={liveBidProduct}
          type={type}
          onUpdate={handleDataUpdate}
          timeUpFlag={timeUpFlag}
          bidCloseTime={bid?.bid_close_date}
          screenLoader={screenLoader}
        />
      ))}

      {isTermandConfitionOpen && (
        <TermAndConditionModal
          isTermandConfitionOpen={isTermandConfitionOpen}
          setIsTermandConfitionOpen={setIsTermandConfitionOpen}
          setIsAgreed={setIsAgreed}
          IsAgreed={isAgreed}
        />
      )}
    </Container>
  );
}

export default LivebidDetail;
