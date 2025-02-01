import React, { useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { companies_column } from "../../../elements/CustomDataTable/AdminColumnData";
import { TableCell } from "@mui/material";
import _sendApiRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import cn from "classnames";
import styles from "./CompanyList.module.scss";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);
  const { control } = useForm();
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  const getCompanyList = async () => {
    try {
      const response = await _sendApiRequest(
        "GET",
        AdminApiUrls.LIST_COMPANIES,
        "",
        true
      );
      if (response.status === 200) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.log(error);
      setScreenLoader(false);
    }
    setScreenLoader(false);
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div className={cn("row",styles["companyList-filters"])}>
        <div className="col-lg-3">
          <CustomSelect
            control={control}
            name="Industry"
            placeholder="Categories"
            multiple={false}
          />
        </div>
        <div className="col-lg-3">
          <CustomSelect
            control={control}
            name="Industry"
            placeholder="Sub Categories"
            multiple={false}
          />
        </div>
        <div className="col-lg-3">
          <CustomSelect
            control={control}
            name="Industry"
            placeholder="City"
            multiple={false}
          />
        </div>
        <div className="col-lg-3">
          <CustomSelect
            control={control}
            name="Industry"
            placeholder="Status"
            multiple={false}
          />
        </div>
      </div>
      <DataTable
        propsColumn={companies_column}
        propsData={companies}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default CompanyList;
