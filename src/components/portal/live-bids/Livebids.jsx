import React, { useEffect, useState, useCallback } from "react";
import styles from "./Livebids.module.scss";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import NoliveBidImg from "../../../assets/images/portal/bids/no_live_bid.png";
import { truncateString } from "../../../helpers/formatter";

// CountdownTimer Component
const CountdownTimer = ({ endDate }) => {
  const calculateRemainingTime = useCallback(() => {
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
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateRemainingTime);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [calculateRemainingTime]);

  const { hours, minutes, seconds } = timeLeft;

  return (
    <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
      {[
        { label: "Hrs", value: hours },
        { label: "Min", value: minutes },
        { label: "Sec", value: seconds },
      ].map((time, index) => (
        <Box key={index} className={styles["countDown_timer"]}>
          <Typography className={styles["countDown_value"]}>
            {time.value}
          </Typography>
          <Typography className={styles["countDown_label"]}>
            {time.label}
          </Typography>
        </Box>
      ))}
    </Grid>
  );
};

// Main Component
const Livebids = ({ listType }) => {
  const [screenLoader, setScreenLoader] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [liveBids, setLiveBids] = useState([]);
  const navigate = useNavigate();

  // Fetching the API for the list of live bids
  useEffect(() => {
    const retrieveLiveBids = async () => {
      try {
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
        }
      } catch (error) {
        console.error("Error fetching live bids:", error);
      } finally {
        setScreenLoader(false);
      }
    };

    retrieveLiveBids();
  }, [listType]);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      {liveBids?.length > 0 ? (
        <Box sx={{ p: 2, bgcolor: "#f9fafc" }}>
          {liveBids.map((bid) => (
            <Card
              key={bid.id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s",
                ":hover": { transform: "scale(1.02)" },
              }}
              onClick={() =>
                listType === "Invited"
                  ? navigate(`/portal/liveBids/details/?id=${bid.id}`, {
                      state: { bid },
                    })
                  : navigate(
                      `/portal/liveBids/details/?type=created&id=${bid.id}`,
                      { state: { bid } }
                    )
              }
            >
              <CardContent>
                <Grid container spacing={2}>
                  {/* Bid Information */}
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      Bid ID: <strong>{bid?.formatted_number}</strong>
                      {listType === "Created" ? null : (
                        <>
                          | Place Bid Count:
                          <strong>{String("6").padStart(2, "0")}</strong>
                        </>
                      )}
                    </Typography>
                    <Tooltip title={bid?.title}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {truncateString(bid?.title, 40)}
                      </Typography>
                    </Tooltip>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#666",
                        mb: 1,
                        fontWeight: "medium",
                      }}
                    >
                      By <strong>{bid?.company?.name}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {bid?.description.replace(/<p>|<\/p>/g, "")}
                    </Typography>
                  </Grid>

                  {/* Countdown Timer and Button */}
                  <Grid
                    item
                    xs={12}
                    md={4}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ textAlign: "center" }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      Bid Ends In:
                    </Typography>
                    <CountdownTimer endDate={bid?.bid_close_date} />
                    {btnLoader ? (
                      <ButtonLoader size={60} />
                    ) : (
                      listType === "Invited" && (
                        <Button
                          variant="contained"
                          className={styles["place-bid-btn"]}
                          endIcon={<GavelIcon />}
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/portal/liveBids/details/?id=${bid.id}`, {
                              state: { bid },
                            });
                          }}
                        >
                          Place a Bid
                        </Button>
                      )
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
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
            sx={{ width: "400px", mb: 2 }}
          />
          <Typography variant="h5" color="textSecondary" fontWeight={"bolder"}>
            No Bid Available
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Livebids;
