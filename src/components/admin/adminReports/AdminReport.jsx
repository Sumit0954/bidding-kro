import {
  AccessTime,
  AssessmentTwoTone,
  BusinessTwoTone,
  CalendarMonthTwoTone,
  DescriptionTwoTone,
  DoDisturbAlt,
  DomainDisabledTwoTone,
  Gavel,
  GavelTwoTone,
  HourglassEmptyTwoTone,
  ToggleOnTwoTone,
  WifiTetheringTwoTone,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { total_companies_column } from "../../../elements/CustomDataTable/AdminColumnData";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css
import styles from "./AdminReport.module.scss";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";

const AdminReport = () => {
  const reportTopics = [
    {
      icon: <BusinessTwoTone fontSize="large" sx={{ color: "#062d72" }} />,
      label: "Total Companies",
    },
    {
      icon: <HourglassEmptyTwoTone fontSize="large" sx={{ color: "orange" }} />,
      label: "Unregister Companies",
    },
    {
      icon: <GavelTwoTone fontSize="large" sx={{ color: "#4CAF50" }} />,
      label: "Completed Bids",
    },
    {
      icon: <DescriptionTwoTone fontSize="large" sx={{ color: "red" }} />,
      label: "No LOI for L1",
    },
    {
      icon: <DoDisturbAlt fontSize="large" sx={{ color: "red" }} />,
      label: "Non Participator Companies",
    },
    {
      icon: <CalendarMonthTwoTone fontSize="large" sx={{ color: "orange" }} />,
      label: "Pending Live dates",
    },
    {
      icon: <Gavel fontSize="large" sx={{ color: "#00c87d" }} />,
      label: "Closed Bids",
    },
    {
      icon: <ToggleOnTwoTone fontSize="large" sx={{ color: "#00c87d" }} />,
      label: "Activated Bids",
    },
    {
      icon: <DomainDisabledTwoTone fontSize="large" sx={{ color: "red" }} />,
      label: "Revoked Companies",
    },
    {
      icon: <WifiTetheringTwoTone fontSize="large" sx={{ color: "#00c87d" }} />,
      label: "Live Bids",
    },
    {
      icon: <AccessTime fontSize="large" sx={{ color: "orange" }} />,
      label: "Pending Activation",
    },
    {
      icon: <AssessmentTwoTone fontSize="large" sx={{ color: "#4CAF50" }} />,
      label: "Rating analyses",
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateClick = (e) => setAnchorEl(e.currentTarget);
  const closePopover = () => setAnchorEl(null);
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    const { startDate, endDate } = dateRange[0];
    console.log("Selected Date Range:", {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    });
  }, [dateRange]);

  return (
    <>
      <Alert severity="info" className="my-3">
        <p style={{ margin: 0 }}>
          <strong>Note:</strong> These Tiles shows List of the important portal
          fields you can view or donwload the list.
        </p>
      </Alert>
      <Box p={2} mb={5}>
        <Grid container spacing={2}>
          {reportTopics.map((item, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#e0e0e0",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensures content is spaced evenly
                  height: "110px", // Fixed height to make all boxes same size
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#d5d5d5",
                  },
                }}
              >
                <Box mb={1}>{item.icon}</Box>
                <Typography variant="body1" fontWeight={500}>
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        className="mb-3"
      >
        {/* Left Side - Heading */}
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            Recent Created Bids
          </Typography>
        </Grid>

        {/* Right Side - Buttons */}
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Export Button */}
            <Button variant="contained" className={styles["export-btn"]}>
              Export Data
            </Button>

            {/* Date Picker Button */}
            <Button
              variant="outlined"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2}>
          {/* Predefined Date Range */}
          <div
            className={styles["radio-checkbox"]}
            style={{ marginBottom: "10px" }}
          >
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="rangeOptions"
                id="threeMonths"
                onChange={() => {
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(end.getMonth() - 3);
                  setDateRange([
                    { startDate: start, endDate: end, key: "selection" },
                  ]);
                }}
              />
              <label className="form-check-label" htmlFor="threeMonths">
                3 Months
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="rangeOptions"
                id="sixMonths"
                onChange={() => {
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(end.getMonth() - 6);
                  setDateRange([
                    { startDate: start, endDate: end, key: "selection" },
                  ]);
                }}
              />
              <label className="form-check-label" htmlFor="sixMonths">
                6 Months
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="rangeOptions"
                id="oneYear"
                onChange={() => {
                  const end = new Date();
                  const start = new Date();
                  start.setFullYear(end.getFullYear() - 1);
                  setDateRange([
                    { startDate: start, endDate: end, key: "selection" },
                  ]);
                }}
              />
              <label className="form-check-label" htmlFor="oneYear">
                1 Year
              </label>
            </div>
          </div>

          {/* Date Picker */}
          <DateRange
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            editableDateInputs
          />
        </Box>
      </Popover>

      <DataTable propsColumn={total_companies_column} propsData={[]} />
    </>
  );
};

export default AdminReport;
