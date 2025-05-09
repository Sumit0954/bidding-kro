import React, { useEffect, useState } from "react";
import CompanyDetail from "../../components/admin/companies/CompanyDetail";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import _sendAPIRequest from "../../helpers/api";
import { AdminApiUrls } from "../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../elements/CustomScreeenLoader/ScreenLoader";

const CompanyDetailPage = () => {
  const [companyDetails, setCompanyDetails] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

  const { company_id } = useParams();

  const getCompanyDetails = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls.GET_COMPANY + company_id,
        "",
        true
      );
      if (response.status === 200) {
        setCompanyDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setScreenLoader(false);
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/companies"
      style={{ textDecoration: "none" }}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      {companyDetails?.name}
    </Typography>,
  ];

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>
      <CompanyDetail companyDetails={companyDetails} />
    </>
  );
};

export default CompanyDetailPage;
