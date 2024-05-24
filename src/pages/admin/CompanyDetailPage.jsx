import React from "react";
import CompanyDetail from "../../components/admin/companies/CompanyDetail";
import ApprovalRequestCard from "../../components/admin/companies/ApprovalRequestCard";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const CompanyDetailPage = () => {
  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/companies"
      style={{textDecoration: "none"}}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      Bombay Dyeing and Manufacturing
    </Typography>,
  ];

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>
      <ApprovalRequestCard />
      <CompanyDetail />
    </>
  );
};

export default CompanyDetailPage;
