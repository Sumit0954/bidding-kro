import React, { useContext, useState } from "react";
import styles from "./Dashboard.module.scss";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
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
import { Group, TrendingUp } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function Dashboard() {
  const naviagte = useNavigate();
  const { noCompany } = useContext(UserDetailsContext);
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

      {/* <Box className={styles["filter-points"]}>
        <Grid container spacing={2}>
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
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Successful Bids
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
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Cancelled Bids
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
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Invited Bids
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
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Participated Bids
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
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Awarded Bids
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
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <div className="container-fluid mt-5">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Recent Bids
        </Typography>
        <DataTable propsColumn={RecentBids_column} propsData={[]} />
      </div>
      <div className="container-fluid mt-5">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Best Companies
        </Typography>
        <DataTable propsColumn={Best_company_column} propsData={[]} />
      </div> */}
    </>
  );
}

export default Dashboard;
