import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import RegistrationData from "../../components/admin/dashboard/RegistrationData";
import BidsData from "../../components/admin/dashboard/BidsData";
import LOIData from "../../components/admin/dashboard/LOIData";
import TransactionData from "../../components/admin/dashboard/TransactionData";

const DashboardPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="bid-list-tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "@media (max-width: 600px)": {
                width: "100%", // Tabs take full width only on mobile
                marginBottom: "1rem", // Adds spacing below tabs for mobile
              },
            }}
          >
            <Tab label="Registration" {...a11yProps(0)} />
            <Tab label="Bids" {...a11yProps(1)} />
            <Tab label="Letter Of Intent" {...a11yProps(2)} />
            <Tab label="Trsansaction" {...a11yProps(3)} />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <RegistrationData />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BidsData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LOIData />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TransactionData />
      </TabPanel>
    </>
  );
};

export default DashboardPage;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
