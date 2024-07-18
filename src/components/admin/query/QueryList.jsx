import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { queries_column } from "../../../elements/CustomDataTable/AdminColumnData";
import { TableCell } from "@mui/material";

const QueryList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  return (
    <>
      <DataTable
        propsColumn={queries_column}
        propsData={[]}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default QueryList;
