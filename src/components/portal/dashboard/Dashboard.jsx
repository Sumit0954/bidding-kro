import React, { useContext, useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import {
  created_bids_column,
  invited_bids_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import {
  AttachMoney,
  CheckCircle,
  CurrencyRupee,
  EmojiEvents,
  HourglassEmpty,
  PersonAdd,
  PlayCircle,
  SavingsTwoTone,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import CompanyDetailsProvider, {
  CompanyDetailsContext,
} from "../../../contexts/CompanyDetailsProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("spends");
  const [cardData, setCardData] = useState("");
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const { noCompany } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const { noCompanyCat } = useContext(CompanyDetailsContext);
  const userID = localStorage.getItem("loginUserID");
  const [screenLoader, setScreenLoader] = useState(true);

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

  // console.log("Permission Status:", permissionStatus);

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
    console.log(companyDetails, "companyDetailscompanyDetails");
    getDashboardData();
    getCreatedBidList();
    getInvitedBidList();
  }, []);

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
    } catch (error) {
      // console.log(error);
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f9fbfc",
          padding: "16px",
          borderRadius: "8px",
          flexWrap: "wrap",
        }}
      >
        {/* <Button
          variant="contained"
          color="error"
          onClick={() => {
            throw new Error("This is your first error!");
          }}
        >
          Break the world
        </Button> */}

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
          <Avatar
            alt="User Avatar"
            src={companyDetails?.logo}
            sx={{
              width: 48,
              height: 48,
              marginBottom: { xs: "10px", sm: 0 },
              marginRight: { sm: "16px" },
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
      </Box>

      <div className="container-fluid mt-5">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Recent Created Bids
        </Typography>
        <DataTable
          propsColumn={created_bids_column}
          propsData={createdBids}
          action={addCreatedAction}
          customClassName="portal-data-table"
          isSingleSelection={true}
          setSelectedRow={setSelectedRow}
          hideToolbar={true}
          hidePagination={true}
        />
      </div>

      <div className="container-fluid mt-5">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
      </div>
    </>
  );
};

export default Dashboard;
