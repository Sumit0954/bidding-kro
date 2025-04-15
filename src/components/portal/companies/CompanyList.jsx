import styles from "./CompanyList.module.scss";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  Alert,
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  companies_column,
  Invite_request_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import InvitationModal from "../../../elements/CustomModal/InvitationModal";
import { useEffect, useState } from "react";
import cn from "classnames";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import SearchBar from "../../../elements/CustomSelect/SearchBar";
import { useForm } from "react-hook-form";

const CompanyList = ({ bidDetails, id, tab, listtype }) => {
  const [addInvitaion, setInvitation] = useState(false);
  const [companyDetail, setCompanyDetail] = useState({});
  const [companies, setCompanies] = useState({});
  const [participants, setParticipants] = useState([]);
  const [categories, setCategories] = useState({ 0: [] });
  const [rootCategory, setRootCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [requestBids, setRequestBids] = useState([]);

  const { control } = useForm();

  const handleInvite = (data) => {
    setInvitation(true);
    setCompanyDetail(data.row.original);
  };

  console.log(companies, " : companies");

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
          setCompanies(response?.data);
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
  }, [id, addInvitaion]);

  useEffect(() => {
    const getRequestList = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.BID_INVITED_REQUESTS,
          "",
          true
        );

        if (response.status === 200) {
          setRequestBids(response?.data);
        }
      } catch (error) {}
    };
    getRequestList();
  }, []);

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      const found = participants.some(
        (participant) => participant.company.id === cell.row.original.id
      );

      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={`${styles["invite-btn"]} ${
              listtype === "InviteRequest"
                ? found
                  ? styles["disable"]
                  : styles["invite-btn"]
                : !id || found
                ? styles["disable"]
                : styles["invite-btn"]
            }`}
            onClick={() => handleInvite(cell)}
            disabled={
              listtype === "InviteRequest"
                ? found && true
                : !id || (found && true)
            }
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

  useEffect(() => {}, [rootCategory]);

  return (
    <>
      <div className="container">
        {listtype === "allcompanies" ? (
          <>
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
          </>
        ) : (
          <>
            <DataTable
              propsColumn={Invite_request_column}
              propsData={requestBids || []}
              action={addAction}
              customClassName="admin-data-table"
            />
          </>
        )}
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
