import React from "react";
import AdminDataTable from "../../../elements/CustomDataTable/AdminDataTable";
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
      <AdminDataTable
        headCells={companies_column}
        headCellData={companiesRowData}
        action={addAction}
      />
    </>
  );
};

export default CompanyList;
