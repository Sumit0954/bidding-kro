import React, { useState } from "react";
import styles from "./Bids.module.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
const Bids = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  return (
    <>
    <br/>
      <div className={styles["heading"]}>
        <Typography variant="h6">Company Name</Typography>
      </div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Arvind Limited</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Tabs for the three panels */}
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Questionnaire" />
            <Tab label="Bid Pricing" />
            <Tab label="Supplier Remarks" />
          </Tabs>

          {/* Tab Panels */}
          <Box hidden={tabIndex !== 0} sx={{ padding: "20px" }}>
            {/* Questionnaire Panel */}
            <Typography variant="h6" sx={{color : "#052c65"}}>
              Do you have the necessary resources and capacity to fulfill the
              requirements of this tender?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
            <Typography variant="h6" sx={{color : "#052c65"}}>
              How do you ensure the availability of resources throughout the
              project duration?
            </Typography>
            <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Box>

          <Box hidden={tabIndex !== 1} sx={{ padding: "20px" }}>
            {/* Bid Pricing Panel */}
            <table className={styles["loi-table"]}>
              <thead >
                <tr >
                  <th>Product title</th>
                  <th>Quantity</th>
                  <th>Reserve Price</th>
                  <th>Supplier Bid Price</th>
                  <th>Bid Rank</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cotton Denim Fabric</td>
                  <td>100 Ton (T)</td>
                  <td>₹ 5000 / unit</td>
                  <td>₹ 6000 / unit</td>
                  <td>L1</td>
                </tr>
                <tr>
                  <td>Cotton Denim Fabric</td>
                  <td>100 Ton (T)</td>
                  <td>₹ 5000 / unit</td>
                  <td>₹ 6000 / unit</td>
                  <td>L1</td>
                </tr>
                <tr>
                  <td>Cotton Denim Fabric</td>
                  <td>100 Ton (T)</td>
                  <td>₹ 5000 / unit</td>
                  <td>₹ 6000 / unit</td>
                  <td>L1</td>
                </tr>
                <tr>
                  <td>Cotton Denim Fabric</td>
                  <td>100 Ton (T)</td>
                  <td>₹ 5000 / unit</td>
                  <td>₹ 6000 / unit</td>
                  <td>L1</td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box hidden={tabIndex !== 2} sx={{ padding: "20px" }}>
            {/* Supplier Remarks Panel */}
            <Typography variant="body1">
              The supplier has been providing quality goods in a timely manner,
              adhering to the terms of the contract and ensuring consistent
              communication throughout the bidding process.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Bids;
