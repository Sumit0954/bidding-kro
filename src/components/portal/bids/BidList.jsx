import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  created_bids_column,
  invited_bids_column,
  related_bids_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import { TableCell } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const BidList = ({ listType, setSelectedRow, selectedCategory }) => {
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);

  const getCreatedBidList = async () => {
    console.log(
      selectedCategory,
      "selectedCategoryselectedCategoryselectedCategory"
    );
    const categoryArray = Array.isArray(selectedCategory)
      ? selectedCategory
      : [selectedCategory];

    // Create URLSearchParams instance
    const params = new URLSearchParams();

    // // Append each category value to the params object
    // categoryArray.forEach((category) => {
    //   if (category !== undefined) {
    //     params.append("category", category); // This will format as category=7553&category=8262
    //   }
    // });
    categoryArray.forEach((category) => {
      if (category !== undefined) {
        params.append("category", category); // This will append without the []
      }
    });
    try {
      // const params = {
      //   category: selectedCategory,
      // };
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.CREATED_LIST_BIDS,
        params,
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
        setInviteBids(response.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCreatedBidList();
  }, [selectedCategory]);

  useEffect(() => {
    getCreatedBidList();
    getInvitedBidList();
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
          propsColumn={created_bids_column}
          propsData={createdBids}
          action={addCreatedAction}
          customClassName="portal-data-table"
          isSingleSelection={true}
          setSelectedRow={setSelectedRow}
        />
      ) : listType === "invited" ? (
        <DataTable
          propsColumn={invited_bids_column}
          propsData={inviteBids}
          action={addInvitedAction}
          customClassName="portal-data-table"
        />
      ) : (
        listType === "related" && (
          <DataTable
            propsColumn={related_bids_column}
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
