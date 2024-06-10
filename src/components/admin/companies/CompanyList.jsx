import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { companies_column } from "../../../elements/CustomDataTable/AdminColumnData";
import { TableCell } from "@mui/material";
import _sendApiRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  const getCompanyList = async () => {
    try {
      const response = await _sendApiRequest(
        "GET",
        AdminApiUrls.LIST_COMPANIES,
        "",
        true
      );
      if (response.status === 200){
        setCompanies(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <>
      <DataTable
        propsColumn={companies_column}
        propsData={companies}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default CompanyList;
