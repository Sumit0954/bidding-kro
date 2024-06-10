import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { bids_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { TableCell } from "@mui/material";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import { useForm } from "react-hook-form";

const BidList = ({ listType }) => {
  const { control } = useForm();

  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-3">
            <CustomSelect
              control={control}
              showLabel={false}
              placeholder="Category"
              multiple={true}
              options={[]}
              name="category"
            />
          </div>
          <div className="col-lg-3">
            <CustomSelect
              control={control}
              showLabel={false}
              placeholder="Sub Category"
              multiple={true}
              options={[]}
              name="sub-category"
            />
          </div>
          <div className="col-lg-3">
            <CustomSelect
              control={control}
              showLabel={false}
              placeholder="City"
              multiple={true}
              options={[]}
              name="city"
            />
          </div>
          <div className="col-lg-3">
            <CustomSelect
              control={control}
              showLabel={false}
              placeholder="State"
              multiple={true}
              options={[]}
              name="state"
            />
          </div>
        </div>
      </form>

      {listType === "created" ? (
        <DataTable
          propsColumn={bids_column}
          propsData={[]}
          action={addAction}
          customClassName="portal-data-table"
        />
      ) : (
        listType === "invited" && (
          <DataTable
            propsColumn={bids_column}
            propsData={[]}
            action={addAction}
            customClassName="portal-data-table"
          />
        )
      )}
    </>
  );
};

export default BidList;
