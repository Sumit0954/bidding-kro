import styles from "./PreviousBids.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { PreviousBids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, Group } from "@mui/icons-material";
import _sendAPIRequest from "../../../helpers/api";

const PreviousBids = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };


const getPreviousBidsData = async () =>{
  try {
    const response = _sendAPIRequest(

    )
  } catch (error) {
    
  }
}



  return (
    <>
      <Box className={styles["filter-points"]} >
        <Grid container spacing={2}>
          {/* Total Spends */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Total Spends
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
                  20
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Successful Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Successful Bids
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
                  12
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Cancelled Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Cancelled Bids
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
                  8
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Invited Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Invited Bids
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
                  35
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <TrendingUp sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Participated Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Participated Bids
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
                  25
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                <Group sx={{ color: "#055160" }} />
              </Box>
            </Card>
          </Grid>

          {/* Awarded Bids */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6" component="div">
                  Awarded Bids
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: "#055160" }}>
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
        <DataTable
          propsColumn={PreviousBids_column}
          propsData={[]}
          action={addAction}
          customClassName="admin-data-table"
        />
      </div>
    </>
  );
};

export default PreviousBids;
