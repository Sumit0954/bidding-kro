import styles from "./CompanyList.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { companies_column } from "../../../elements/CustomDataTable/PortalColumnData";
import cn from "classnames";

const CompanyList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  return (
    <>
      <DataTable
        propsColumn={companies_column}
        propsData={[]}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default CompanyList;
