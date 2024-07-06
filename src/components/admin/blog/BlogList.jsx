// import styles from './BlogList.module.scss'
import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { blogs_column } from '../../../elements/CustomDataTable/AdminColumnData'

const BlogList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  return (
    <>
      <DataTable
        propsColumn={blogs_column}
        propsData={[]}
        action={addAction}
        customClassName="admin-data-table"
      />

    </>
  );
}

export default BlogList