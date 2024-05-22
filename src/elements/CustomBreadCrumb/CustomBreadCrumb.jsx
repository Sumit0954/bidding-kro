import { Breadcrumbs } from "@mui/material";
import React from "react";

const CustomBreadCrumb = ({ breadcrumbs }) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
    </div>
  );
};

export default CustomBreadCrumb;
