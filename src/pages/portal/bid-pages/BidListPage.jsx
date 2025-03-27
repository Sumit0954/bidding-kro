import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BidList from "../../../components/portal/bids/BidList";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import SearchBar from "../../../elements/CustomSelect/SearchBar";

const BidListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.state?.listType || 0);
  const [selectedRow, setSelectedRow] = useState({});

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
            <Tab label="Created Bids" {...a11yProps(0)} />
            <Tab label="Invited Bids" {...a11yProps(1)} />
            <Tab label="Related Bids" {...a11yProps(2)} />
          </Tabs>

          {value === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "@media (max-width: 600px)": {
                  width: "100%", // Button takes full width on mobile
                  justifyContent: "center", // Center-align for mobile
                  marginTop: "1rem", // Add spacing below tabs on mobile
                },
              }}
            >
              <NavLink
                to={"/portal/bids/categories"}
                className={cn("btn", "button")}
                style={{
                  padding: "10px",
                  backgroundColor: "#002f6c",
                  color: "#fff",
                  borderRadius: "4px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "inline-block",
                  "@media (max-width: 600px)": {
                    width: "100%",
                  },
                  width: "100%",
                }}
              >
                + Create Bid
              </NavLink>
            </Box>
          )}
        </Box>

        <TabPanel value={value} index={0}>
          <BidList listType={"created"} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BidList listType={"invited"} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BidList listType={"related"} />
        </TabPanel>
      </Box>
    </>
  );
};

export default BidListPage;

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
