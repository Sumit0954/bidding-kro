// import styles from "./TransactionList.module.scss";
import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { transactions_column } from "../../../elements/CustomDataTable/AdminColumnData";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          AdminApiUrls.GET_TRANSACTIONS,
          "",
          true
        );
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, []);

  return (
    <>
      <DataTable
        propsColumn={transactions_column}
        propsData={transactions}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default TransactionList;
