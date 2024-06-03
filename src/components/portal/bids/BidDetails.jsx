import styles from './BidDetails.module.scss'
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Summary from './Summary'
import Award from './Award'
import Bids from './Bids'
import Documents from './Documents'
import cn from "classnames";


const BidDetails = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="bid-list-tabs"
      >
        <Tab label="Summary" {...a11yProps(0)} />
        <Tab label="Documents" {...a11yProps(1)} />
        <Tab label="Bids" {...a11yProps(2)} />
        <Tab label="Award" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Summary />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Documents />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Award />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Bids />
      </TabPanel>


    </>
  )
}

export default BidDetails;

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
