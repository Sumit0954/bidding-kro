import styles from "./CompanyList.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Box, Tab, TableCell, Tabs } from "@mui/material";
import { companies_column } from "../../../elements/CustomDataTable/PortalColumnData";
import InvitationModal from "../../../elements/CustomModal/InvitationModal";
import { useEffect, useState } from "react";
import cn from "classnames";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const CompanyList = ({ bidDetails, id }) => {
  const [addInvitaion, setInvitation] = useState(false);
  const [companyDetail, setCompanyDetail] = useState({});
  const [otherSuppliers, setOtherSuppliers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInvite = (data) => {
    setInvitation(true);
    setCompanyDetail(data.row.original);
  };

  useEffect(() => {
    const getCompanyList = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.COMPANY_LIST,
          "",
          true
        );
        if (response.status === 200) {
          setOtherSuppliers(response?.data?.other_suppliers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCompanyList();
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
  }, [id]);

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      const found = participants.some(
        (participant) => participant.company.id === cell.row.original.id
      );

      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={cn(
              styles["invite-btn"]
              // (!id || found) && styles["disable"]
            )}
            onClick={() => handleInvite(cell)}
            // disabled={id && !found ? true : false}
            disabled={!id && true}
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
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleInvite}
            aria-label="companies-list-tabs"
          >
            <Tab label="ALL COMPANIES" {...a11yProps(0)} />
            <Tab label="INVITE REQUESTS" {...a11yProps(1)} />
          </Tabs>
        </Box>      
      </Box>
      <DataTable
        propsColumn={companies_column}
        propsData={otherSuppliers}
        action={addAction}
        customClassName="admin-data-table"
      />

      {addInvitaion && (
        <InvitationModal
          addInvitaion={addInvitaion}
          setInvitation={setInvitation}
          bidDetails={bidDetails}
          companyDetail={companyDetail}
        />
      )}
    </>
  );
};

export default CompanyList;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
