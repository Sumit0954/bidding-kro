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
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { Bid_pricing_column } from "../../../../elements/CustomDataTable/PortalColumnData";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
const Bids = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const [screenLoader , setScreenLoader] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const Bid_pricing_data = [
    {
      title: "Cotton Fabric",
      quantity: 100,
      buyers_amount: "₹ 50,000",
      supplier_amount: "₹ 48,000",
      rank: "L1",
    },
    {
      title: "Silk Fabric",
      quantity: 50,
      buyers_amount: "₹ 1,20,000",
      supplier_amount: "₹ 1,15,000",
      rank: "L2",
    },
    {
      title: "Woolen Fabric",
      quantity: 200,
      buyers_amount: "₹ 80,000",
      supplier_amount: "₹ 75,000",
      rank: "L3",
    },
    {
      title: "Denim Fabric",
      quantity: 150,
      buyers_amount: "₹ 70,000",
      supplier_amount: "₹ 65,000",
      rank: "L4",
    },
    {
      title: "Linen Fabric",
      quantity: 120,
      buyers_amount: "₹ 60,000",
      supplier_amount: "₹ 58,000",
      rank: "L5",
    },
  ];

  if(screenLoader){
    return <ScreenLoader />
  }
 
  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Company Name</Typography>
      </div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: "bolder" }}>Arvind Limited</Typography>
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
          <Box
            hidden={tabIndex !== 0}
            sx={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h6"
                sx={{ color: "#052c65", marginBottom: "8px" }}
              >
                1. Do you have the necessary resources and capacity to fulfill
                the requirements of this tender?
              </Typography>
              <Typography
                variant="body1"
                sx={{ paddingLeft: "16px", color: "#4a4a4a" }}
              >
                • Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. It has survived not only five centuries
                but also the leap into electronic typesetting.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#052c65", marginBottom: "8px" }}
              >
                2. How do you ensure the availability of resources throughout
                the project duration?
              </Typography>
              <Typography
                variant="body1"
                sx={{ paddingLeft: "16px", color: "#4a4a4a" }}
              >
                • Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. It is a long-established fact that a
                reader will be distracted by the readable content of a page.
              </Typography>
            </Box>
          </Box>

          <Box hidden={tabIndex !== 1} sx={{ padding: "20px" }}>
            {/* Bid Pricing Panel */}
            <DataTable
              propsColumn={Bid_pricing_column}
              propsData={Bid_pricing_data}
            />
          </Box>

          <Box
            hidden={tabIndex !== 2}
            sx={{
              padding: "20px",
              backgroundColor: "#f5faff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #cfe0fc",
            }}
          >
            {/* Bid Suppliers Remark */}
            <Typography
              variant="h6"
              sx={{
                color: "#052c65",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Raymond Limited
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#4a4a4a", lineHeight: 1.6 }}
            >
              - The supplier has been providing quality goods in a timely
              manner, adhering to the terms of the contract, and ensuring
              consistent communication throughout the bidding process.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Bids;
