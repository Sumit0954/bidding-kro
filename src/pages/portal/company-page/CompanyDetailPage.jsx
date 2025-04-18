import About from "../../../components/portal/companies/About";
import PreviousBids from "../../../components/portal/companies/PreviousBids";
import { Box, Breadcrumbs, Button, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import Reviews from "../../../components/portal/companies/Reviews";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [companyDetail, setCompanyDetail] = useState({});
   const [screenLoader, setScreenLoader] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const truncatelength = (title, maxlength) => {
    return title?.length > maxlength
      ? title.substring(0, maxlength) + "..."
      : title;
  };

  useEffect(() => {
    if (id) {
      const getCompanyDetails = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_COMPANY_DETAILS + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setCompanyDetail(response.data);
            setScreenLoader(false)
          }
        } catch (error) {
          console.log(error);
          setScreenLoader
        }
      };
      getCompanyDetails();
    }
  }, [id]);

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/portal/companies"
      style={{ textDecoration: "none" }}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      {truncatelength(companyDetail.name, 40)}
    </Typography>,
  ];

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Previous Bids" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <About About={About} companyDetail={companyDetail} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PreviousBids
          PreviousBids={PreviousBids}
          companyDetail={companyDetail}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Reviews id={id} companyDetail={companyDetail} />
      </TabPanel>
    </>
  );
};

export default CompanyDetailPage;

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
