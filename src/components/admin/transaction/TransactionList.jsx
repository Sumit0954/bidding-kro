// import styles from "./TransactionList.module.scss";
import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { transactions_column } from "../../../elements/CustomDataTable/AdminColumnData";

const TransactionList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  return (
    <>
      <DataTable
        propsColumn={transactions_column}
        propsData={[]}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default TransactionList;
