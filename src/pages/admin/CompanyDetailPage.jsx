import React, { useEffect, useRef, useState } from "react";
import CompanyDetail from "../../components/admin/companies/CompanyDetail";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import _sendAPIRequest from "../../helpers/api";
import { AdminApiUrls } from "../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../elements/CustomScreeenLoader/ScreenLoader";
import { useReactToPrint } from "react-to-print";
import { Print } from "@mui/icons-material";
import cn from "classnames";
const CompanyDetailPage = () => {
  const [companyDetails, setCompanyDetails] = useState();
  const [screenLoader, setScreenLoader] = useState(true);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });
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
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <button className={cn("btn", "button")} onClick={handlePrint}>
          <Print />
        </button>
      </div>
      <CompanyDetail companyDetails={companyDetails} ref={contentRef} />
    </>
  );
};

export default CompanyDetailPage;
