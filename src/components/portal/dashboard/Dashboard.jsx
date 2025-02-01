import React, { useContext, useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { RecentBids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { Best_company_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import {
  AttachMoney,
  CheckCircle,
  EmojiEvents,
  HourglassEmpty,
  PersonAdd,
  PlayCircle,
  SavingsTwoTone,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

function Dashboard() {
  const naviagte = useNavigate();

  const { noCompany } = useContext(UserDetailsContext);

  const [permissionStatus, setPermissionStatus] = useState(
    Notification.permission
  );

  useEffect(() => {
    console.log("Checking notification permission...");
    // Function to check notification permission status
    const checkPermission = () => {
      setPermissionStatus(Notification.permission);
    };

    // Listen for permission changes (if applicable)
    window.addEventListener("focus", checkPermission);

    return () => {
      window.removeEventListener("focus", checkPermission);
    };
  }, []);

  const requestPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        setPermissionStatus(permission);
        if (permission === "granted") {
          console.log("🔔 Notification permission granted!");
        } else {
          console.warn("⚠️ Notification permission denied!");
        }
      });
    }
  };

  console.log("Permission Status:", permissionStatus);

  return (
    <>
      {noCompany && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Company Creation Required
          </AlertTitle>
          Your account is registered, but you haven’t created a company yet.
          Please click the button below to create your company profile and
          proceed further:
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => naviagte("company-profile/create")}
            sx={{ marginTop: "8px" }}
            className={styles["create-comp-btn"]}
          >
            Create Company Profile
          </Button>
        </Alert>
      )}

      {permissionStatus === "default" && (
        <Alert severity="warning" className="my-3 d-flex">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Notifications Disabled
          </AlertTitle>
          You have not allowed notification permissions. To receive important
          updates, please enable notifications.
          <Button
            variant="contained"
            color="primary"
            onClick={() => requestPermission()}
            sx={{ marginLeft: "10px" }}
            className={styles["create-comp-btn"]}
          >
            Enable Notifications
          </Button>
        </Alert>
      )}

      {permissionStatus === "denied" && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Notifications Permissions Denied
          </AlertTitle>
          You have denied notification permissions. To receive important
          updates, please enable notifications.
          <br />
          <br />
        </Alert>
      )}

      <Box className={styles["filter-points"]}>
        {/* userName and Datepicker */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9fbfc",
            padding: "16px",
            borderRadius: "8px",
            flexWrap: "wrap", // Allow wrapping for smaller screens
          }}
        >
          {/* userName & userPhoto  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexBasis: { xs: "100%", sm: "auto" }, // Full width on extra small screens
              marginBottom: { xs: 2, sm: 0 }, // Add spacing for stacked items
            }}
          >
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              sx={{
                width: 48,
                height: 48,
                marginRight: "16px",
              }}
            >
              X
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for small screens
                }}
              >
                Hello, XYZ Industries
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size
                }}
              >
                Here's what's happening with your business today
              </Typography>
            </Box>
          </Box>
          {/* Date & time */}

          <Box
            sx={{
              flexBasis: { xs: "100%", sm: "auto" }, // Full width on extra small screens
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" }, // Center-align on small screens
            }}
          >
            <DatePicker
              sx={{
                minWidth: 200,
                backgroundColor: "#fff",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#062d72",
                  },
                },
              }}
            />
          </Box>
        </Box>
        {/* dashboard and Datepicker */}
        <Grid container spacing={2}>
          {/*  Total Spends */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Total Spends
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <AttachMoney sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/*  Total Saving */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Total Saving
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <SavingsTwoTone sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/*  Perspective Bids Available */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Perspective Bids Available
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <CheckCircle sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/* Bids Invites pending for acceptance */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Bids Invites pending for acceptance
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <HourglassEmpty sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/* Accepted bids pending for live */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Accepted bids pending for live
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <HourglassEmpty sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/* Participated bids pending for LOI */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Participated bids pending for LOI
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <HourglassEmpty sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/* Inactive Bids pending for action */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Inactive Bids pending for action
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <HourglassEmpty sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/*  Bids pending for sending the invites */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Bids pending for sending the invites
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <PersonAdd sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/*  Created bids pending for Live */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Created bids pending for Live
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <HourglassEmpty sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
          {/*  Closed Bids pending to be awarded */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Closed Bids pending to be awarded
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#055160" }}
                >
                  10
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <EmojiEvents sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <div className="container-fluid mt-5">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Recent Bids
        </Typography>
        <DataTable propsColumn={RecentBids_column} propsData={[]} />
      </div>

      <div className="container-fluid mt-5">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Best Companies
        </Typography>
        <DataTable propsColumn={Best_company_column} propsData={[]} />
      </div>
    </>
  );
}

export default Dashboard;
