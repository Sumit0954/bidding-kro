import styles from './PreviousBids.module.scss'
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { PreviousBids_column } from "../../../elements/CustomDataTable/PortalColumnData";

const PreviousBids = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <DataTable
          propsColumn={PreviousBids_column}
          propsData={[]}
          action={addAction}
          customClassName="admin-data-table"
        />
      </div>
    </>
  )
}

export default PreviousBids