import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { companies_column } from "../../../elements/CustomDataTable/AdminColumnData";
import { companiesRowData } from "../../../elements/CustomDataTable/TableRowData";
import { TableCell } from "@mui/material";

const CompanyList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  return (
    <>
      <DataTable
        propsColumn={companies_column}
        propsData={companiesRowData}
        action={addAction}
      />
    </>
  );
};

export default CompanyList;
