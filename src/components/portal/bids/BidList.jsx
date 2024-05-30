import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { bids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { companiesRowData } from "../../../elements/CustomDataTable/TableRowData";
import { TableCell } from "@mui/material";

const BidList = ({ listType }) => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  return (
    <>
      {listType === "created" ? (
        <DataTable
          propsColumn={bids_column}
          propsData={companiesRowData}
          action={addAction}
        />
      ) : (
        listType === "invited" && (
          <DataTable propsColumn={[]} propsData={[]} action={addAction} />
        )
      )}
    </>
  );
};

export default BidList;
