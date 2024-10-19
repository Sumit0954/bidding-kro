import About from "../../../components/portal/companies/About"
import PreviousBids from "../../../components/portal/companies/PreviousBids";
import Chat from "../../../components/portal/companies/Chat";
import { Box, Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";


const CompanyDetailPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/portal/bids"
      style={{ textDecoration: "none" }}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">

    </Typography>,
  ];


  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Previous Bids" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <About About={About} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PreviousBids PreviousBids={PreviousBids} />
      </TabPanel>
    </>
  )
}

export default CompanyDetailPage

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