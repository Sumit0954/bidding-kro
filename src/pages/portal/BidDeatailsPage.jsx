import { Box, Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import Summary from "../../components/portal/bids/Summary";
import Documents from "../../components/portal/bids/Documents";
import Award from "../../components/portal/bids/Award";
import Bids from "../../components/portal/bids/Bids";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import AmendmentModal from "../../elements/CustomModal/AmendmentModal";

const BidDeatailsPage = () => {
  const [value, setValue] = useState(0);
  const [addAmendment, setAddAmendment] = useState(false);

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
      Bids
    </NavLink>,
    <Typography key="2" color="text.primary">
      Supply of Cotton Material
    </Typography>,
  ];
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <button
            className={cn("btn", "button")}
            type="button"
            onClick={() => setAddAmendment(true)}
          >
            Amendments
          </button>
          <button type="submit" className={cn("btn", "button")}>
            Edit Bid
          </button>
          <button type="submit" className={cn("btn", "button", "reject")}>
            Cancel Bid
          </button>
        </div>
      </div>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Documents" {...a11yProps(1)} />
          <Tab label="Bids" {...a11yProps(2)} />
          <Tab label="Award" {...a11yProps(3)} />
        </Tabs>
      </Box>

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

      {addAmendment && (
        <AmendmentModal
          addAmendment={addAmendment}
          setAddAmendment={setAddAmendment}
        />
      )}
    </>
  );
};

export default BidDeatailsPage;

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
