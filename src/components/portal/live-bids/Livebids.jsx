import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Livebids.module.scss";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  ButtonBase,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import NoliveBidImg from "../../../assets/images/portal/bids/no_live_bid.png";
const Livebids = ({ listType }) => {
  const [screenLoader, setScreenLoader] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [liveBids, setLiveBids] = useState([]);
  const [timerTick, setTimerTick] = useState(0); // State to force re-render on each second
  const remainingTimeRef = useRef({});
  const navigate = useNavigate();

  // fetching the api for the list of live bids
  useEffect(() => {
    try {
      const retrieveLiveBids = async () => {
        const response = await _sendAPIRequest(
          "GET",
          listType === "Created"
            ? PortalApiUrls.LIVE_BID_LIST_FOR_BUYER
            : PortalApiUrls.LIVE_BID_LIST_FOR_SUPPLIER,
          "",
          true
        );
        if (response.status === 200) {
          setLiveBids(response?.data);
          console.log(response?.data);
          setScreenLoader(false);
        }
      };

      retrieveLiveBids();
    } catch (error) {}
  }, []);

  // Function to calculate remaining time
  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const targetDate = new Date(endDate);
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(timeDiff / 1000 / 60 / 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return { hours, minutes, seconds };
  };

  // Update remaining time in the ref
  const updateRemainingTime = () => {
    const updatedTime = liveBids.reduce((acc, bid) => {
      acc[bid.id] = calculateRemainingTime(bid?.bid_close_date);
      return acc;
    }, {});
    remainingTimeRef.current = updatedTime;
  };

  // Effect to update remaining time every second
  useEffect(() => {
    updateRemainingTime(); // Initial calculation
    const interval = setInterval(() => {
      updateRemainingTime();
      setTimerTick((prev) => prev + 1); // Force re-render by updating state
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [liveBids]);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      {liveBids?.length > 0 ? (
        <>
          <Box sx={{ p: 2, bgcolor: "#f0f4f8" }}>
            {liveBids.map((bid) => {
              const { hours, minutes, seconds } = calculateRemainingTime(
                bid?.bid_close_date
              );
              return (
                <Card
                  key={bid.id}
                  sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}
                  onClick={() =>
                    listType === "Invited"
                      ? navigate(`/portal/liveBids/details`)
                      : navigate("/portal/liveBids/details/?type=created")
                  }
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      {/* Bid Information */}
                      <Grid item xs={8}>
                        <Typography variant="body2" color="textSecondary">
                          Bid ID: <strong>{bid?.formatted_number}</strong> |
                          Placed Bid Count#:{" "}
                          {/* <strong>{String(bid.bidCount).padStart(2, "0")}</strong> */}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{ fontWeight: "bold", mt: 1 }}
                        >
                          {bid?.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          By <strong>{bid?.company?.name}</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }}
                        >
                          {bid?.description.replace(/<p>|<\/p>/g, "")}
                        </Typography>
                      </Grid>

                      {/* Countdown Timer and Button */}
                      <Grid
                        item
                        xs={4}
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          sx={{ mb: 1, fontWeight: "bold" }}
                        >
                          Bid Ends In:
                        </Typography>
                        <Grid
                          container
                          spacing={2}
                          justifyContent="center"
                          sx={{ mb: 2 }}
                        >
                          {/* Hours */}
                          <Box
                            sx={{
                              textAlign: "center",
                              p: 2,
                              width: "100px",
                              height: "86px",
                              backgroundColor: "#ffffff",
                              border: "1px solid #57c2a0",
                              clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="text.primary"
                              sx={{ fontWeight: "bolder" }}
                            >
                              {hours}
                            </Typography>
                            <Typography
                              variant=" "
                              sx={{ fontWeight: "bolder" }}
                            >
                              Hours
                            </Typography>
                          </Box>

                          {/* Minutes */}
                          <Box
                            sx={{
                              textAlign: "center",
                              p: 2,
                              width: "100px",
                              height: "86px",
                              backgroundColor: "#ffffff",
                              border: "1px solid #57c2a0",
                              clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="text.primary"
                              sx={{ fontWeight: "bolder" }}
                            >
                              {minutes}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: "bolder" }}
                            >
                              Minutes
                            </Typography>
                          </Box>

                          {/* Seconds */}
                          <Box
                            sx={{
                              textAlign: "center",
                              p: 2,
                              width: "100px",
                              height: "86px",
                              backgroundColor: "#ffffff",
                              border: "1px solid #57c2a0",
                              clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="text.primary"
                              sx={{ fontWeight: "bolder" }}
                            >
                              {seconds}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: "bolder" }}
                            >
                              Seconds
                            </Typography>
                          </Box>
                        </Grid>
                        {btnLoader ? (
                          <ButtonLoader size={60} />
                        ) : (
                          <>
                            {listType === "Invited" && (
                              <Button
                                variant="contained"
                                color="success"
                                className={styles["place-bid-btn"]}
                                endIcon={<GavelIcon />}
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent the parent onClick from firing
                                  navigate(`/portal/liveBids/details`);
                                }}
                              >
                                Place a Bid
                              </Button>
                            )}
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "#f0f4f8",
              p: 2,
              backgroundColor: "none",
            }}
          >
            <Box
              component="img"
              src={NoliveBidImg}
              alt="No Bid Available"
              sx={{ width: "400px", mb: 2 }} // Adjusted size here
            />
            <Typography
              variant="h5"
              color="textSecondary"
              fontWeight={"bolder"}
            >
              No Bid Available
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Livebids;
