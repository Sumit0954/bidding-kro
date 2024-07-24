import styles from "./CompanyList.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell } from "@mui/material";
import { companies_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { company_data } from "../../../elements/CustomDataTable/TableRowData";
import InvitationModal from "../../../elements/CustomModal/InvitationModal";
import { useState } from "react";
import cn from 'classnames'

const CompanyList = ({ bidDetails, id }) => {
  const [addInvitaion, setInvitation] = useState(false);
  const [comapnyDetail, setCompanyDetail] = useState([]);

  const handleInvite = (data) => {
    setInvitation(true);
    setCompanyDetail(data.row.original);
  };

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={cn(styles["invite-btn"], !id && styles['disable'])}
            onClick={() => handleInvite(cell)}
            disabled={id ? false : true}
          >
            Invite
          </button>
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
      <DataTable
        propsColumn={companies_column}
        propsData={company_data}
        action={addAction}
        customClassName="admin-data-table"
      />

      {addInvitaion && (
        <InvitationModal
          addInvitaion={addInvitaion}
          setInvitation={setInvitation}
          bidDetails={bidDetails}
          comapnyDetail={comapnyDetail}
        />
      )}
    </>
  );
};

export default CompanyList;
