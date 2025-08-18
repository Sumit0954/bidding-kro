import { useContext, useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  created_bids_column,
  invited_bids_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import {
  CheckCircle,
  CurrencyRupee,
  HourglassEmpty,
  SavingsTwoTone,
} from "@mui/icons-material";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import CompanyDetailsProvider, {
  CompanyDetailsContext,
} from "../../../contexts/CompanyDetailsProvider";
import { AlertContext } from "../../../contexts/AlertProvider";
import fallback_user_img from "../../../assets/images/portal/company-profile/fallback-profile-img.jpg";
import { requestFirebaseNotificationPermission } from "../../../firebaseMessaging";
import { getMessaging, getToken } from "firebase/messaging";
import new_user_dashboard_img from "../../../assets/images/portal/dashboard/new_user_dashboard.png";
const Dashboard = () => {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("spends");
  const [cardData, setCardData] = useState("");
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);
  const { noCompany } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const { noCompanyCat } = useContext(CompanyDetailsContext);
  const userID = localStorage.getItem("loginUserID");
  const [screenLoader, setScreenLoader] = useState(true);
  const { setAlert } = useContext(AlertContext);
  const [permissionStatus, setPermissionStatus] = useState("default");

  const RegisterFCMToken = async (token) => {
    try {
      const formData = new FormData();
      formData.append("token", token);

      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.REGISTER_FCM_TOKEN}`,
        formData,
        true
      );
      if (response.status === 200) {
        console.log("Register FCM Token Sucessfully");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const isNotificationSupported = () => {
    return "Notification" in window && "serviceWorker" in navigator;
  };

  useEffect(() => {
    if (isNotificationSupported()) {
      const checkNotificationPermission = () => {
        setPermissionStatus(Notification.permission);
        const registerTokenIfAllowed = async () => {
          if (Notification.permission === "granted") {
            console.log("Auto-registering token after login...");

            const messaging = getMessaging();
            const token = await getToken(messaging, {
              vapidKey:
                "BHNz8PeJeBl7HKgF_URU_cYjxMgijGUFVPlDDOEAp0jO0qEGbzj80IBT8uOmSbY-xhfx94g8f9c4nK1yWO0cOJY",
            });

            if (token) {
              const oldToken = localStorage.getItem("FCMToken");
              if (token !== oldToken) {
                await RegisterFCMToken(token);
                localStorage.setItem("FCMToken", token);
              }
            }
          }
        };
        registerTokenIfAllowed();
      };

      checkNotificationPermission();
    }
  }, [userID]);

  const requestPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        requestFirebaseNotificationPermission()
          .then((token) => {
            if (token) {
              console.log("Firebase Token Reload:", token);
              const OldFCMToken = localStorage.getItem("FCMToken");
              if (token != OldFCMToken) {
                RegisterFCMToken(token);
                localStorage.setItem("FCMToken", token);
              }
            }
          })
          .catch((err) => console.log("Notification permission error:", err));
        setPermissionStatus(permission);
        if (permission === "granted") {
          console.log("🔔 Notification permission granted!");
        } else {
          console.warn("⚠️ Notification permission denied!");
        }
      });
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.PORTAL_DASHBOARD}`,
        "",
        true
      );
      if (response.status === 200) {
        setCardData(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Failed to fetch Dashboard Data. Please try again later.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    Object.keys(companyDetails).length > 0 && getDashboardData();
    getCreatedBidList();
    getInvitedBidList();
  }, [companyDetails]);

  const handleCardClick = (listType) => {
    setFilterBy(listType); // Update the filterBy state
    navigate("/portal/bids", { state: { listType: listType } });
  };

  const handleCard = (listType) => {
    setFilterBy(listType); // Update the filterBy state
  };

  const isSelected = (type) => filterBy === type;

  const getCreatedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.CREATED_LIST_BIDS,
        "",
        true
      );
      if (response.status === 200) {
        setCreatedBids(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getInvitedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.INVITED_BID_LIST,
        "",
        true
      );
      if (response.status === 200) {
        setInviteBids(response.data);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  const addCreatedAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  const addInvitedAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }

  console.log(createdBids, " : createdBids");
  console.log(inviteBids, " : inviteBids");

  return (
    <>
      {noCompany && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Company Creation Required
          </AlertTitle>
          Your account is registered, but you haven’t created a company yet.
          Please click the button below to create your company profile and
          proceed further.
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("company-profile/create")}
            sx={{ marginTop: "8px" }}
            className={styles["create-comp-btn"]}
          >
            Create Company Profile
          </Button>
        </Alert>
      )}

      {noCompanyCat && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Company Category Selection Required
          </AlertTitle>
          Your account is registered, but you haven’t selected a company
          category yet. Please click the button below to selected your company
          category and proceed further.
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`company-profile/category/${userID}`)}
            sx={{ marginTop: "8px" }}
            className={styles["create-comp-btn"]}
          >
            Select Company Category
          </Button>
        </Alert>
      )}

      {isNotificationSupported() && (
        <>
          {permissionStatus === "default" && (
            <Alert severity="warning" className="my-3 d-flex">
              <AlertTitle sx={{ fontWeight: "bold" }}>
                Warning: Notifications Disabled
              </AlertTitle>
              You have not allowed notification permissions. To receive
              important updates, please enable notifications.
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
              updates, please go to your browser settings and enable
              notifications.
              <br />
              <br />
            </Alert>
          )}
        </>
      )}
      {Object.keys(companyDetails).length > 0 ? (
        <>
          {/* userName & userPhoto  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              flexBasis: { xs: "100%", sm: "auto" },
              marginBottom: { xs: 2, sm: 0 },
            }}
          >
            <Box
              component="img"
              src={companyDetails?.logo || fallback_user_img}
              alt="Company Logo"
              sx={{
                width: {
                  xs: 80, // For small screens
                  sm: 68, // For tablets
                  md: 60, // For medium+ screens
                },
                height: {
                  xs: 70,
                  sm: 60,
                  md: 60,
                },
                objectFit: "contain",
                marginBottom: { xs: "10px", sm: 0 },
                marginRight: { sm: "16px" },
                borderRadius: " 50%",
              }}
            />

            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Hello, {companyDetails?.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                Here's what's happening with your business today
              </Typography>
            </Box>
          </Box>
          {/* dashboard and Datepicker */}
          <Grid container spacing={2} mt={3}>
            {/*  Total Spends */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: isSelected("spends") ? "#e0f7fa" : "white",
                  border: isSelected("spends") ? "2px solid #055160" : "none",
                }}
                onClick={() => handleCard("spends")}
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
                    {cardData?.spends}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: "10px" }}>
                  <CurrencyRupee sx={{ color: "#055160" }} />
                </Box>
              </Card>
            </Grid>
            {/*  Total Saving */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: isSelected("savings") ? "#e0f7fa" : "white",
                  border: isSelected("savings") ? "2px solid #055160" : "none",
                }}
                onClick={() => handleCard("savings")}
              >
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h6" component="div">
                    Total Savings
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "#055160" }}
                  >
                    {cardData?.savings}
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
                  backgroundColor: isSelected("related_bids")
                    ? "#e0f7fa"
                    : "white",
                  border: isSelected("related_bids")
                    ? "2px solid #055160"
                    : "none",
                }}
                onClick={() => handleCardClick(2)}
              >
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h6" component="div">
                    Related Bids
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "#055160" }}
                  >
                    {cardData?.related_bids}
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
                  backgroundColor: isSelected("pending_acceptance_bids")
                    ? "#e0f7fa"
                    : "white",
                  border: isSelected("pending_acceptance_bids")
                    ? "2px solid #055160"
                    : "none",
                }}
                onClick={() => handleCardClick(1)}
              >
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h6" component="div">
                    Invites pending
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "#055160" }}
                  >
                    {cardData?.pending_acceptance_bids}
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
                  backgroundColor: isSelected("upcoming_bids")
                    ? "#e0f7fa"
                    : "white",
                  border: isSelected("upcoming_bids")
                    ? "2px solid #055160"
                    : "none",
                }}
                onClick={() => handleCardClick(0)}
              >
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h6" component="div">
                    Upcoming bids
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "#055160" }}
                  >
                    {cardData?.upcoming_bids}
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
                  backgroundColor: isSelected("unawarded_bids")
                    ? "#e0f7fa"
                    : "white",
                  border: isSelected("unawarded_bids")
                    ? "2px solid #055160"
                    : "none",
                }}
                onClick={() => handleCardClick(0)}
              >
                <CardContent sx={{ flex: "1" }}>
                  <Typography variant="h6" component="div">
                    Unawarded Bids
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "#055160" }}
                  >
                    {cardData?.unawarded_bids}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: "10px" }}>
                  <HourglassEmpty sx={{ color: "#055160" }} />
                </Box>
              </Card>
            </Grid>
          </Grid>
          <br />
        </>
      ) : (
        <img src={new_user_dashboard_img} className={styles["image-blur"]} />
      )}

      {createdBids.length > 0 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Recent Created Bids
          </Typography>
          <DataTable
            propsColumn={created_bids_column(setScreenLoader)}
            propsData={createdBids}
            action={addCreatedAction}
            customClassName="portal-data-table"
            isSingleSelection={true}
            hideToolbar={true}
            hidePagination={true}
          />
        </>
      )}

      {inviteBids?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Recent participated Bids
          </Typography>
          <DataTable
            propsColumn={invited_bids_column}
            propsData={inviteBids}
            action={addInvitedAction}
            customClassName="portal-data-table"
            hideToolbar={true}
            hidePagination={true}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
