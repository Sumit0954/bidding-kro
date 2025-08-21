import styles from "./CompanyList.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { TableCell, Typography } from "@mui/material";
import { companies_column } from "../../../elements/CustomDataTable/PortalColumnData";
import InvitationModal from "../../../elements/CustomModal/InvitationModal";
import { useContext, useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";

const CompanyList = ({ bidDetails, id, listtype }) => {
  const [addInvitaion, setInvitation] = useState(false);
  const [companyDetail, setCompanyDetail] = useState({});
  const [companies, setCompanies] = useState({});
  const [participants, setParticipants] = useState([]);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const handleInvite = (data) => {
    setInvitation(true);
    setCompanyDetail(data.row.original);
  };
  const getCompanyList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.COMPANY_LIST,
        "",
        true
      );
      if (response.status === 200) {
        setCompanies(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Object.keys(companyDetails).length > 0 && getCompanyList();
  }, []);

  useEffect(() => {
    if (id) {
      const getParticipants = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.PARTICIPANTS_LIST + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setParticipants(response.data.participants);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getParticipants();
    }
  }, [id, addInvitaion]);

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      const found = participants.some(
        (participant) => participant.company.id === cell.row.original.id
      );

      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={`${styles["invite-btn"]} ${
              !id || found ? styles["disable"] : styles["invite-btn"]
            }`}
            onClick={() => handleInvite(cell)}
            disabled={!id || (found && true)}
          >
            {found ? "Invited" : "Invite"}
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
      <div className="container">
        <div className={styles["supplier-section"]}>
          <Typography variant="h6" className={styles["section-title"]}>
            Existing Suppliers
          </Typography>
          <DataTable
            propsColumn={companies_column}
            propsData={companies?.existing_suppliers || []}
            action={addAction}
            customClassName="admin-data-table"
          />
        </div>
        {/* Other Suppliers Section */}
        <div className={styles["supplier-section"]}>
          <Typography variant="h6" className={styles["section-title"]}>
            Suggested Other Suppliers
          </Typography>
          <DataTable
            propsColumn={companies_column}
            propsData={companies?.other_suppliers || []}
            action={addAction}
            customClassName="admin-data-table"
          />
        </div>
      </div>

      {addInvitaion && (
        <InvitationModal
          addInvitaion={addInvitaion}
          setInvitation={setInvitation}
          bidDetails={bidDetails}
          companyDetail={companyDetail}
          listtype={listtype}
        />
      )}
    </>
  );
};

export default CompanyList;
