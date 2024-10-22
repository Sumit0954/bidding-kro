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
  }, [id]);

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

  const handleCategorySelection = (selected) => {
    console.log(selected, "Selected category");
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
    console.log(ancestors, "ancestorsancestors");
    setSelectedCategory(ancestors);
  };

  useEffect(() => {}, [rootCategory]);

  return (
    <>
      <div className="container">
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
        {listtype === "allcompanies" && (
          <Alert
            severity="info"
            sx={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
            className={styles["alert-container"]}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p className={styles["amendment-info"]} style={{ margin: 0 }}>
                <span>
                  You can extend the sample submission dates if needed. Adjust
                  accordingly to meet requirements.
                </span>
              </p>
              <Button
                type="submit"
                variant="contained"
                className={styles["note-button"]}
              >
                Show All Companies
              </Button>
            </Box>
          </Alert>
        )}
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
                Other Suppliers
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
        />
      )}
    </>
  );
};

export default CompanyList;
