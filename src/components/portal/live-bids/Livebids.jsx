import React, { useState } from "react";
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
const Livebids = ({ listType }) => {
  const [btnLoader, setBtnLoader] = useState(false);

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
      <Box sx={{ p: 2, bgcolor: "#f0f4f8" }}>
        {bids.map((bid) => (
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
                        {String(bid.hours).padStart(2, "0")}
                      </Typography>
                      <Typography
                        variant="caption"
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
                        {String(bid.minutes).padStart(2, "0")}
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
                        {String(bid.seconds).padStart(2, "0")}
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
        ))}
      </Box>
    </>
  );
};

export default Livebids;
