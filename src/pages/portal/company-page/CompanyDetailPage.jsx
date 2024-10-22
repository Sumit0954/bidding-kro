import About from "../../../components/portal/companies/About";
import PreviousBids from "../../../components/portal/companies/PreviousBids";
import Chat from "../../../components/portal/companies/Chat";
import { Box, Breadcrumbs, Button, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [companyDetail, setCompanyDetail] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const truncatelength = (title, maxlength) => {
    return title?.length > maxlength
      ? title.substring(0, maxlength) + "..."
      : title;
  };

  console.log("companyDetail : ", companyDetail);

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
          }
        } catch (error) {
          console.log(error);
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
      to="/portal/bids"
      style={{ textDecoration: "none" }}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      {truncatelength(companyDetail.name, 40)}
    </Typography>,
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <Button
            sx={{
              color:"white",
              backgroundColor: "var(--primary-color)",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
          >
            Invite Company
          </Button>
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
