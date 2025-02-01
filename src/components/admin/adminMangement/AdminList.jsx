import { Admin_list_column } from "../../../elements/CustomDataTable/AdminColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Button } from "@mui/material";
import styles from "./AdminList.module.scss"; // Import your external styles
import { PersonAdd, SupervisorAccount } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["admin-list-container"]}>
      {/* Header Section */}
      <div className={styles["admin-header"]}>
        <h2 className={styles["admin-title"]}>
          Admin List{" "}
          <SupervisorAccount
            style={{
              marginRight: "8px",
              verticalAlign: "middle",
              color: "#062d72",
            }}
          />{" "}
        </h2>
        <Button
          variant="contained"
          color="primary"
          className={styles["create-button"]}
          startIcon={<PersonAdd />}
          onClick={() => navigate("/admin/management/addmanagementform")}
        >
          Create
        </Button>
      </div>

      {/* Data Table Section */}
      <DataTable
        propsColumn={Admin_list_column}
        propsData={[]}
        customClassName="admin-data-table"
      />
    </div>
  );
};

export default AdminList;
