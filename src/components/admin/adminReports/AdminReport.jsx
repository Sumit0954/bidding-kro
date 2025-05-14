import {
  AccessTime,
  AssessmentTwoTone,
  AssuredWorkloadTwoTone,
  BusinessTwoTone,
  CalendarMonthTwoTone,
  DescriptionTwoTone,
  DoDisturbAlt,
  DomainDisabledTwoTone,
  Gavel,
  GavelTwoTone,
  HourglassEmptyTwoTone,
  MonetizationOnTwoTone,
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
import { reportColumnHandler } from "../../../elements/CustomDataTable/AdminColumnData";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css
import styles from "./AdminReport.module.scss";
import { useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { exportToExcel } from "../../../utils/exportToExcel";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { modifiedData } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { useForm } from "react-hook-form";
import SearchSelect from "../../../elements/CustomSelect/SearchSelect";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import AccessDenied from "../../../pages/error/AccessDenied";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
const AdminReport = () => {
  const [reportType, setReportType] = useState("Total Companies");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("threeMonths");
  const [states, setStates] = useState([]);
  const [stateValue, setStateValue] = useState(null);
  const [reportData, setReportData] = useState([]);
  const { control, setError } = useForm();
  const [cities, setCities] = useState([]);
  const [cityValue, setCityValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [accessDenied, setAccessDenied] = useState(null);
  const [screenLoader, setScreenLoader] = useState(true);
  const { setAlert } = useContext(AlertContext);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { name, column, api, downloadData, query_type } =
    reportColumnHandler(reportType);
  const { startDate, endDate } = dateRange[0];

  const getStatesList = async () => {
    const params = { country: 101, ordering: "name" };
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_STATES,
        params,
        true
      );
      if (response.status === 200) {
        const data = modifiedData(response.data);
        setStates(data);
      }
    } catch (error) {}
  };

  const handleCityInputChange = async (event, value) => {
    if (!stateValue?.value) {
      setError("state", {
        type: "focus",
        message: "Please select a state first.",
      });
    }

    if (value.length >= 3 && stateValue?.value) {
      const params = {
        state: stateValue.value,
        search: value,
        ordering: "name",
      };
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.GET_CITIES,
          params,
          true
        );
        if (response.status === 200) {
          const data = modifiedData(response.data);
          setCities(data);
        }
      } catch (error) {
        const { data } = error.response;
        if (data) {
          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }
  };

  const getCategories = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CATEGORIES,
        "",
        true
      );
      if (response?.status === 200) {
        console.log(response?.data, " options");
        setCategories(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption?.value);
  };

  const fetchAdminReports = async () => {
    if (!api) return;
    try {
      const start_date = startDate?.toISOString()?.split("T")[0];
      const end_date = endDate?.toISOString()?.split("T")[0];
      const params = new URLSearchParams();
      let API = "";
      if (name === "TotalCompanies") {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
        if (stateValue) params.append("state", stateValue.lable);
        if (cityValue) params.append("city", cityValue.lable);
        if (selectedCategory) params.append("category", selectedCategory);
        API = `${api}?${params}`;
      }

      if (
        name === "NoLOIforL1" ||
        name === "CompletedBids" ||
        name === "ClosedBids" ||
        name === "PendingActivation" ||
        name === "ActivatedBids" ||
        name === "LiveBids" ||
        name === "PendingLiveDates"
      ) {
        if (startDate) params.append("start_date", start_date);
        if (endDate) params.append("end_date", end_date);
        params.append("query_type", query_type);
        API = `${api}?${params}`;
      }

      if (name === "NonParticipatorCompanies" || name === "RevokedCompanies") {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
        params.append("query_type", query_type);
        API = `${api}?${params}`;
      }

      if (name === "RatingAnalysis" || name === "Transaction") {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
        API = `${api}?${params}`;
      }

      if (name === "UnregisteredCompanies") {
        API = api;
      }

      if (API) {
        const response = await _sendAPIRequest("GET", API, "", true);
        if (response.status === 200) {
          setReportData(response.data);
        }
      } else {
      }
    } catch (error) {
      console.log(error, " : error");
      if (error?.status === 403) {
        setAlert({
          isVisible: true,
          message: error?.response?.data?.detail,
          severity: "error",
        });
        setAccessDenied(error?.status);
      }
    }
    setScreenLoader(false);
  };

  const formattedCategories = categories.map((cat) => ({
    lable: cat.name,
    value: cat.id,
  }));

  useEffect(() => {
    const start = new Date();
    const end = new Date();
    start.setMonth(end.getMonth() - 3);
    // END DATE EXTENSION FOR 1 DAY
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() + 2);
    setDateRange([
      { startDate: start, endDate: adjustedEnd, key: "selection" },
    ]);
    getStatesList();
    getCategories();
  }, []);

  // Update when the parameters changed
  useEffect(() => {
    fetchAdminReports();
  }, [dateRange, column, stateValue, cityValue, selectedCategory]);

  if (accessDenied === 403) {
    return <AccessDenied />;
  }

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Alert severity="info" className="my-3">
        <p style={{ margin: 0 }}>
          <strong>Note:</strong> These Tiles shows List of the important portal
          fields you can view or download the list.
        </p>
      </Alert>
      <Box p={2} mb={5}>
        <Grid container spacing={2}>
          {reportTopics.map((report, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              key={index}
              onClick={() => setReportType(report.label)}
            >
              <Paper
                elevation={3}
                className={`${styles["report-box"]} ${
                  reportType === report.label ? styles["active"] : ""
                }`}
              >
                <Box mb={1}>{report.icon}</Box>
                <Typography variant="body1" fontWeight={500}>
                  {report.label}
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
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {reportType}
          </Typography>
        </Grid>
        {/* Right Side - Buttons */}
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Export Button */}
            <Button
              variant="contained"
              className={styles["export-btn"]}
              onClick={() =>
                exportToExcel(reportData, downloadData, `${name}.xlsx`)
              }
            >
              Export Data
            </Button>

            {name !== "LiveBids" && (
              <Button
                variant="outlined"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      {name === "TotalCompanies" && (
        <div className="row">
          <div className="col-lg-4">
            <SearchSelect
              control={control}
              options={states}
              name="state"
              placeholder="Search by state"
              setValue={setStateValue}
              value={stateValue}
            />
          </div>
          <div className="col-lg-4">
            <SearchSelect
              control={control}
              options={cities}
              name="city"
              placeholder="City"
              handleInputChange={handleCityInputChange}
              setValue={setCityValue}
              value={cityValue}
            />
          </div>
          <div className="col-lg-4">
            <CustomSelect
              control={control}
              name="type"
              placeholder="Search by category"
              options={formattedCategories}
              multiple={false}
              handleChange={handleCategoryChange}
            />
          </div>
        </div>
      )}
      <Popover
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
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
                checked={selectedOption === "threeMonths"}
                onChange={() => {
                  setSelectedOption("threeMonths");
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(end.getMonth() - 3);
                  // END DATE EXTENSION FOR 1 DAY
                  const adjustedEnd = new Date(end);
                  adjustedEnd.setDate(adjustedEnd.getDate() + 2);
                  setDateRange([
                    {
                      startDate: start,
                      endDate: adjustedEnd,
                      key: "selection",
                    },
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
                checked={selectedOption === "sixMonths"}
                onChange={() => {
                  setSelectedOption("sixMonths");
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(end.getMonth() - 6);
                  // END DATE EXTENSION FOR 1 DAY
                  const adjustedEnd = new Date(end);
                  adjustedEnd.setDate(adjustedEnd.getDate() + 2);
                  setDateRange([
                    {
                      startDate: start,
                      endDate: adjustedEnd,
                      key: "selection",
                    },
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
                checked={selectedOption === "oneYear"}
                onChange={() => {
                  setSelectedOption("oneYear");
                  const end = new Date();
                  const start = new Date();
                  start.setFullYear(end.getFullYear() - 1);
                  // END DATE EXTENSION FOR 1 DAY
                  const adjustedEnd = new Date(end);
                  adjustedEnd.setDate(adjustedEnd.getDate() + 2);
                  setDateRange([
                    {
                      startDate: start,
                      endDate: adjustedEnd,
                      key: "selection",
                    },
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
            onChange={(item) => {
              const selection = item.selection;
              const adjustedEndDate = new Date(selection.endDate);
              // END DATE EXTENSION FOR 1 DAY
              adjustedEndDate.setDate(adjustedEndDate.getDate() + 2);
              setDateRange([
                {
                  ...selection,
                  endDate: adjustedEndDate,
                },
              ]);
            }}
            moveRangeOnFirstSelection={false}
            editableDateInputs
          />
        </Box>
      </Popover>
      <DataTable propsColumn={column} propsData={reportData || []} />
    </>
  );
};

export default AdminReport;
const reportTopics = [
  {
    icon: <BusinessTwoTone fontSize="large" sx={{ color: "#062d72" }} />,
    label: "Total Companies",
  },
  {
    icon: <HourglassEmptyTwoTone fontSize="large" sx={{ color: "orange" }} />,
    label: "Unregistered Companies",
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
    label: "Accepted But Not Participated",
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
  {
    icon: <AssuredWorkloadTwoTone fontSize="large" sx={{ color: "green" }} />,
    label: "Transaction",
  },
];
