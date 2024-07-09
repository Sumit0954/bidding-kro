// import styles from './TemplateList.module.scss'
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { templateList_column } from '../../../elements/CustomDataTable/AdminColumnData'

const TemplateList = () => {
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  return (
    <>
      <DataTable
        propsColumn={templateList_column}
        propsData={[]}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  )
}

export default TemplateList