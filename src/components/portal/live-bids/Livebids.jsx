import React from "react";
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Livebids = ({ listType }) => {
  const navigate = useNavigate();
  const bids = [
    {
      id: "EB24000036",
      title: "Supply of Cotton Material",
      company: "Arvind Limited",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specim...",
      bidCount: 6,
      hours: 5,
      minutes: 58,
      seconds: 27,
    },
    {
      id: "EB24000038",
      title: "FashionForward Fabrics",
      company: "Raymond Limited",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specim...",
      bidCount: 8,
      hours: 8,
      minutes: 51,
      seconds: 25,
    },
  ];
  return (
    <>
      <Box
        sx={{ p: 2, bgcolor: "#f0f4f8" }}
        onClick={() => navigate("/portal/liveBids/details")}
      >
        {bids.map((bid) => (
          <Card key={bid.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Bid Information */}
                <Grid item xs={8}>
                  <Typography variant="body2" color="textSecondary">
                    Bid ID: <strong>{bid.id}</strong> | Placed Bid Count#:{" "}
                    <strong>{String(bid.bidCount).padStart(2, "0")}</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {bid.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    By {bid.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    {bid.description}
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
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        width: "70px",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {String(bid.hours).padStart(2, "0")}
                      </Typography>
                      <Typography variant="caption">Hours</Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        width: "70px",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {String(bid.minutes).padStart(2, "0")}
                      </Typography>
                      <Typography variant="caption">Minutes</Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        width: "70px",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {String(bid.seconds).padStart(2, "0")}
                      </Typography>
                      <Typography variant="caption">Seconds</Typography>
                    </Box>
                  </Grid>
                  {listType === "Invited" && (
                    <Button
                      variant="contained"
                      color="success"
                      className={styles["place-bid-btn"]}
                      endIcon={<AccessTimeIcon />}
                      onClick={() => navigate("/portal/liveBids/details/?type=supplier")}
                    >
                      Place a Bid
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Livebids;
