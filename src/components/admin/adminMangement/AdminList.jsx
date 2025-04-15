import { Admin_list_column } from "../../../elements/CustomDataTable/AdminColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Button, TableCell, Tooltip } from "@mui/material";
import styles from "./AdminList.module.scss"; // Import your external styles
import { AdminPanelSettings, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { useContext, useEffect, useState } from "react";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
import { AlertContext } from "../../../contexts/AlertProvider";

const AdminList = () => {
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    data: null,
    adminId: null,
  });

  const fetchAdminList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls.ADMIN_LIST,
        "",
        true
      );
      if (response?.status === 200) {
        setAdminList(response.data);
      }
    } catch (error) {
      console.log(error, " :error");
    }
  };

  const inActiveAdmin = async (data, adminId) => {
    try {
      const response = await _sendAPIRequest(
        "PATCH",
        `${AdminApiUrls.UPDATE_ADMIN_DETAILS}${adminId}/`,
        { ...data, is_active: false },
        true
      );

      if (response?.status === 200) {
        setAdminList((prevList) =>
          prevList.map((admin) =>
            admin.id === adminId ? { ...admin, is_active: false } : admin
          )
        );

        setAlert({
          isVisible: true,
          message: "Admin Deactivated successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleAdminDeactivation = (choice) => {
    if (choice) {
      inActiveAdmin(deleteDetails?.data, deleteDetails?.adminId);
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        data: null,
        adminId: null,
      });
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        data: null,
        adminId: null,
      });
    }
  };

  const handleAdminDeactivationConfimation = (adminName, data, adminId) => {
    setDeleteDetails({
      open: true,
      title: "Admin Deactivation Confirmation",
      message: `Are you sure you want to deactivate ${adminName}`,
      data: data,
      adminId: adminId,
    });
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  const addAction = (cell) => {
    if (cell?.column?.id === "is_active") {
      return (
        <TableCell
          {...cell.getCellProps()}
          align="left"
          padding="none"
          style={{ paddingLeft: "12px" }}
        >
          <Tooltip
            title={
              cell?.row?.original?.is_active === true
                ? `Click here to deactivate ${cell?.row?.original?.first_name} ${cell?.row?.original?.last_name} account`
                : `${cell?.row?.original?.first_name} ${cell?.row?.original?.last_name} account is now deactivated`
            }
          >
            <b
              onClick={() => {
                if (cell?.row?.original?.is_active) {
                  handleAdminDeactivationConfimation(
                    `${cell?.row?.original?.first_name} ${cell?.row?.original?.last_name}`,
                    cell?.row?.original,
                    cell?.row?.original?.id
                  );
                }
              }}
              style={{
                color:
                  cell?.row?.original?.is_active === true ? "green" : "red",
                cursor:
                  cell?.row?.original?.is_active === true
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              {" "}
              {cell?.row?.original?.is_active === true ? "Active" : "Inactive"}
            </b>
          </Tooltip>
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
  console.log(adminList, " : adminList");
  return (
    <div className={styles["admin-list-container"]}>
      {/* Header Section */}
      <div className={styles["admin-header"]}>
        <h2 className={styles["admin-title"]}>
          Admin List
          <AdminPanelSettings
            style={{
              marginRight: "8px",
              verticalAlign: "middle",
              color: "#062d72",
            }}
          />
        </h2>
        <Button
          variant="contained"
          color="primary"
          className={styles["create-button"]}
          startIcon={<PersonAdd />}
          onClick={() => navigate("addmanagementform/create")}
        >
          Add Admin
        </Button>
      </div>

      {/* Data Table Section */}
      <div style={{ overflowX: "auto" }}>
        <DataTable
          propsColumn={Admin_list_column}
          propsData={adminList || []}
          customClassName="admin-data-table"
          action={addAction}
        />
      </div>
      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleAdminDeactivation}
        />
      )}
    </div>
  );
};

export default AdminList;
