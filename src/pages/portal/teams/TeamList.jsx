import React, { useState, useEffect, useContext } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  getTeamListColumn,
  // Team_list_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups"; // Importing the team/group icon
import styles from "./TeamList.module.scss";
import { NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // You can choose any icon you like
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const TeamList = () => {
  const [teamList, setTeamList] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [screenLoader, setScreenLoader] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const getTeamList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_TEAM_LIST,
        "",
        true
      );
      if (response.status == 200) {
        console.log(response.data);
        setTeamList(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.error("error while getting Team List", error);
    }
  };

  const onToggleStatus = async (id) => {
    try {
      // Deactivate member (DELETE API)
      const response = await _sendAPIRequest(
        "DELETE",
        PortalApiUrls.DEACTIVATE_MEMBER + `${id}/`,
        "",
        true
      );

      if (response?.status === 204) {
        console.log(`Member with ID ${id} deactivated`);
        getTeamList(); // Refresh list after deactivation
      }
    } catch (error) {
      console.error("Error while updating status", error);
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      }
      if (error.status === 400) {
        setAlert({
          isVisible: true,
          message: error.response.data.error,
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    getTeamList();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header with title and icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          flexDirection: isMobile ? "column" : "row", // Stack in mobile view
          gap: isMobile ? 2 : 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">
            Team List <GroupsIcon sx={{ mr: 1, color: "#062d72" }} />
          </Typography>
        </Box>

        {/* Move button below the list in mobile view */}
        {!isMobile && (
          <NavLink to={"/portal/teams/addMember"}>
            <Button variant="contained" className={styles["addMember-btn"]}>
              <PersonAddIcon sx={{ mr: 1 }} /> Add Member
            </Button>
          </NavLink>
        )}
      </Box>

      {/* Full-width Add Member Button for Mobile */}
      {isMobile && (
        <NavLink to={"/portal/teams/addMember"} style={{ width: "100%" }}>
          <Button
            variant="contained"
            className={styles["addMember-btn"]}
            sx={{ width: "100%", marginTop: 2, mb: 2 }} // Full width & margin on top
          >
            <PersonAddIcon sx={{ mr: 1 }} /> Add Member
          </Button>
        </NavLink>
      )}
      {/* Data Table */}
      <DataTable
        propsColumn={getTeamListColumn(onToggleStatus)}
        propsData={teamList}
      />
    </Box>
  );
};

export default TeamList;
