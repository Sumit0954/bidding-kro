import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  created_bids_column,
  invited_bids_column,
  related_bids_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import { TableCell } from "@mui/material";
import styles from  "./BidList.module.scss"
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import SearchBar from "../../../elements/CustomSelect/SearchBar";
import RequestModal from "../../../elements/CustomModal/RequestModal";

const BidList = ({ listType }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);
  const [categories, setCategories] = useState({ 0: [] });
  const [rootCategory, setRootCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});


  const getCreatedBidList = async () => {
    // console.log(
    //   selectedCategory,
    //   "selectedCategoryselectedCategoryselectedCategory"
    // );
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
      // console.log(error);
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

  const { control } = useForm();

  const handleCategorySelection = (selected) => {
    // console.log(selected, "Selected category");
    if (selected && selected.value) {
      setRootCategory(selected.value);
    } else {
      setRootCategory(null);
    }
  };

  const getCategories = async (parent_categories, depth) => {
    const params = new URLSearchParams();
    parent_categories.forEach((value) => {
      if (value !== undefined) {
        params.append("parent_category", value);
      }
    });

    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CATEGORIES,
        params,
        true
      );
      if (response.status === 200) {
        const mappedCategories = response.data.map((category) => ({
          lable: category.name, // 'label' is used by Autocomplete to display
          value: category.id, // 'value' is used for internal management
          depth: category.depth,
        }));
        setCategories((prevCategories) => ({
          ...prevCategories,
          [depth]: mappedCategories,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories([], 0);
  }, []);

  useEffect(() => {
    setSelectedCategory(rootCategory);
  }, [rootCategory]);

  const handleOptionChange = (ancestors) => {
    // console.log(ancestors, "ancestorsancestors");
    setSelectedCategory(ancestors);
  };

  useEffect(() => {
    // console.log(rootCategory, "rootCategory updated");
  }, [rootCategory]);

  const handlerequest = (data) => {
    setSendRequest(true);
  };

  const requestAction = (cell) => {
    if (cell.column.id === "action") {
      // const found = participants.some(
      //   (participant) => participant.company.id === cell.row.original.id
      // );

      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button 
          className={`${styles["request-btn"]}`}
          onClick={handlerequest}>invite request</button>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()} align={cell.column.align}>
          {" "}
          {cell.render("Cell")}{" "}
        </TableCell>
      );
    }
  };

  return (
    <>
      {listType === "created" && (
        <div className="row">
          <div className="col-lg-3">
            <CustomSelect
              control={control}
              name="Industry"
              placeholder="Industry"
              options={categories[0]}
              handleChange={handleCategorySelection}
              multiple={false}
            />
          </div>
          <div className="col-lg-9">
            <SearchBar
              name="product_search"
              placeholder="Search Your Category"
              control={control}
              rootCategory={rootCategory}
              value={undefined}
              ancestors={false}
              onAncestorsChange={handleOptionChange}
              disabled={!rootCategory}
              multiple={true}
            />
          </div>
        </div>
      )}

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
            propsColumn={invited_bids_column}
            propsData={inviteBids}
            action={requestAction}
            customClassName="portal-data-table"
          />
        )
      )}

      {sendRequest && (
        <RequestModal
          setSendRequest={setSendRequest}
          sendRequest={sendRequest}
        />
      )}
    </>
  );
};

export default BidList;
