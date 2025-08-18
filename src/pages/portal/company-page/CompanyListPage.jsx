import CompanyList from "../../../components/portal/companies/CompanyList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { Box, Tab, Tabs } from "@mui/material";

const CompanyListPage = () => {
  const [bidDetails, setBidDetails] = useState({});
  const [value, setValue] = useState(0);
  const { id } = useParams();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidDetails(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id]);

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
            aria-label="companies-list-tabs"
          >
            <Tab label="ALL COMPANIES" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CompanyList
            bidDetails={bidDetails}
            id={id}
            listtype={"allcompanies"}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default CompanyListPage;
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
