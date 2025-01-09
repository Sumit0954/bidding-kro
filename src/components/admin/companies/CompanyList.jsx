import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { companies_column } from "../../../elements/CustomDataTable/AdminColumnData";
import { TableCell } from "@mui/material";
import _sendApiRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [screenLoader , setScreenLoader] = useState(true)
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
        setScreenLoader(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  if(screenLoader){
    return <ScreenLoader />
  }
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
