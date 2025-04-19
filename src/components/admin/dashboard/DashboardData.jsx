import { AccessTimeOutlined, CheckCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { AlertContext } from "../../../contexts/AlertProvider";

const DashboardData = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const { setAlert } = useContext(AlertContext);
  const stats = [
    {
      title: "Companies Registered",
      count: dashboardData?.registered_companies,
      description: `${dashboardData?.registered_companies} users have successfully registered their companies in Bidding Kro.`,
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
    {
      title: "Unregistered Companies",
      count: dashboardData?.unregistered_companies,
      description: `${dashboardData?.unregistered_companies} users didn't register their companies in Bidding Kro.`,
      icon: <AccessTimeOutlined style={{ color: "orange" }} />,
    },
    {
      title: "Completed Bids",
      count: dashboardData?.completed_bids,
      description: `${dashboardData?.completed_bids} bids have been successfully completed by registered companies.`,
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
    {
      title: "Live Bids",
      count: dashboardData?.live_bids,
      description: `${dashboardData?.live_bids} bids are currently live on the platform for participation.`,
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
    {
      title: "Pending Bids",
      count: dashboardData?.pending_bids,
      description: `Currently, ${dashboardData?.pending_bids}  bids are pending on the platform for review.`,
      icon: <AccessTimeOutlined style={{ color: "orange" }} />,
    },
    {
      title: "Closed Bids",
      count: dashboardData?.closed_bids,
      description: `${dashboardData?.closed_bids} bids have been successfully closed on platform.`,
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
  ];

  const fetchAdminDashboardData = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls.GET_ADMIN_DASHBOARD_DATA,
        "",
        true
      );

      if (response.status === 200) {
        setDashboardData(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Box sx={{ textAlign: { xs: "center", sm: "left" }, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "4px",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Hello Admin
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          Here's a quick snapshot of updated activities on the portal
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 10 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Tooltip title={`Click here to see ${stat.title} report`}>
              <Card
                elevation={3}
                
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {stat.title}
                  </Typography>
                  <div style={{ position: "absolute", top: 10, right: 15 }}>
                    {stat.icon}
                  </div>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                    {stat.count}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardData;
