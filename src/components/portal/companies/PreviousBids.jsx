import styles from "./PreviousBids.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { PreviousBids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, Group } from "@mui/icons-material";
import _sendAPIRequest from "../../../helpers/api";
import { useEffect, useContext, useState, useCallback } from "react";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";

const PreviousBids = ({ companyDetail }) => {
  const { setAlert } = useContext(AlertContext);
  const [previousBidsData, setPreviousBidsData] = useState([]);
  const [filterBy, setFilterBy] = useState("spends");
  const [metaData, setMetaData] = useState({});

  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  const getPreviousBidsData = useCallback(async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.PREVIOUS_BID}${companyDetail?.id}/?filter_by=${filterBy}`,
        "",
        true
      );
      if (response.status === 200) {
        console.log("response.data", response.data.meta);
        setPreviousBidsData(response.data?.bid);
        setMetaData(response.data?.meta);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Failed to fetch previous bids. Please try again later.",
        severity: "error",
      });
    }
  }, [companyDetail, filterBy, setAlert]);

  useEffect(() => {
    getPreviousBidsData();
  }, [getPreviousBidsData]);

  const handleCardClick = (newFilter) => {
    setFilterBy(newFilter); // Update the filterBy state
  };

  const isSelected = (type) => filterBy === type;

  return (
    <>
      <Box className={styles["filter-points"]}>
        <Grid container spacing={2}>
          {/* Total Spends */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("spends") ? "#e0f7fa" : "white",
                border: isSelected("spends") ? "2px solid #055160" : "none",
              }}
              onClick={() => handleCardClick("spends")}
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
                  {metaData?.total_spends ? metaData.total_spends : "0"}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Successful Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("successful") ? "#e0f7fa" : "white",
                border: isSelected("successful") ? "2px solid #055160" : "none",
              }}
              onClick={() => handleCardClick("successful")}
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
                  {metaData?.successful_count ? metaData.successful_count : "0"}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Cancelled Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("cancelled") ? "#e0f7fa" : "white",
                border: isSelected("cancelled") ? "2px solid #055160" : "none",
              }}
              onClick={() => handleCardClick("cancelled")}
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
                  {metaData?.cancelled_count ? metaData.cancelled_count : "0"}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Invited Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("invited") ? "#e0f7fa" : "white",
                border: isSelected("invited") ? "2px solid #055160" : "none",
              }}
              onClick={() => handleCardClick("invited")}
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
                  {metaData?.invited_count ? metaData.invited_count : "0"}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Participated Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("participated")
                  ? "#e0f7fa"
                  : "white",
                border: isSelected("participated")
                  ? "2px solid #055160"
                  : "none",
              }}
              onClick={() => handleCardClick("participated")}
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
                  {metaData?.participated_count
                    ? metaData.participated_count
                    : "0"}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Awarded Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected("awarded") ? "#e0f7fa" : "white",
                border: isSelected("awarded") ? "2px solid #055160" : "none",
              }}
              onClick={() => handleCardClick("awarded")}
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
                  {metaData?.awarded_count ? metaData.awarded_count : "0"}
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
        <DataTable
          propsColumn={PreviousBids_column}
          // propsData={[]}
          propsData={previousBidsData}
          action={addAction}
          customClassName="admin-data-table"
        />
      </div>
    </>
  );
};

export default PreviousBids;
