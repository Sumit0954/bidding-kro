import React from "react";
import breadcrumbStyles from "../../elements/CustomBreadCrumb/CustomBreadCrumb.module.scss";
import CustomBreadCrumb from "../../elements/CustomBreadCrumb/CustomBreadCrumb";
import CompanyDetail from "../../components/admin/companies/CompanyDetail";
import ApprovalRequestCard from "../../components/admin/companies/ApprovalRequestCard";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const CompanyDetailPage = () => {
  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/companies"
      className={breadcrumbStyles["custom-links"]}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      Bombay Dyeing and Manufacturing
    </Typography>,
  ];

  return (
    <>
      <CustomBreadCrumb breadcrumbs={breadcrumbs} />
      <ApprovalRequestCard />
      <CompanyDetail />
    </>
  );
};

export default CompanyDetailPage;
