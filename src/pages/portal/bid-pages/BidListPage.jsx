import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import BidList from "../../../components/portal/bids/BidList";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";

const BidListPage = () => {
  const [value, setValue] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});
  const navigate = useNavigate();

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
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="bid-list-tabs"
          >
            <Tab label="Created Bids" {...a11yProps(0)} />
            <Tab label="Invited Bids" {...a11yProps(1)} />
          </Tabs>

          {value === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                className={cn("btn", "button")}
                disabled={selectedRow?.original?.id ? false : true}
                onClick={() =>
                  navigate(
                    `/portal/companies/?bid=${selectedRow?.original?.id}`
                  )
                }
              >
                + Invite Company
              </button>
              <NavLink
                to={"/portal/bids/create"}
                className={cn("btn", "button")}
              >
                + Create Bid
              </NavLink>
            </Box>
          )}
        </Box>

        <TabPanel value={value} index={0}>
          <BidList listType={"created"} setSelectedRow={setSelectedRow} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BidList listType={"invited"} />
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
