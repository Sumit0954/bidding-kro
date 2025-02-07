import CompanyList from "../../../components/portal/companies/CompanyList";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { Box, Tab, Tabs } from "@mui/material";
import Livebids from "../../../components/portal/live-bids/Livebids";

const LiveBids = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const urlliveTab = Number(urlParams.get("liveTab"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    urlParams.set("liveTab", newValue);
    navigate({ search: urlParams.toString() }, { replace: true });
  };

  useEffect(() => {
    console.log(urlliveTab, "urlliveTab");
    if (urlliveTab) {
      setValue(urlliveTab);
    }
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Live-bids-list-tabs"
          >
            <Tab label="Created Bids" {...a11yProps(0)} />
            <Tab label="Invited Bids" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Livebids listType="Created" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Livebids listType="Invited" />
        </TabPanel>
      </Box>
    </>
  );
};

export default LiveBids;
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
