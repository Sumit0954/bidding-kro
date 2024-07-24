import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { bids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { TableCell } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const BidList = ({ listType, setSelectedRow }) => {
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);

  // To Created Bid List
  const getCreatedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.CREATED_LIST_BIDS,
        "",
        true
      );
      if (response.status === 200) {
        setCreatedBids(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // To Invited Bid List
  const getInvitedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.INVITED_BID_LIST,
        "",
        true
      );
      if (response.status === 200) {
        setInviteBids(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCreatedBidList();
    getInvitedBidList()
  }, []);

  const addCreatedAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  const addInvitedAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };
  return (
    <>
      {listType === "created" ? (
        <DataTable
          propsColumn={bids_column}
          propsData={createdBids}
          action={addCreatedAction}
          customClassName="portal-data-table"
          isSingleSelection={true}
          setSelectedRow={setSelectedRow}
        />
      ) : (
        listType === "invited" && (
          <DataTable
            propsColumn={bids_column}
            propsData={inviteBids}
            action={addInvitedAction}
            customClassName="portal-data-table"
          />
        )
      )}
    </>
  );
};

export default BidList;
