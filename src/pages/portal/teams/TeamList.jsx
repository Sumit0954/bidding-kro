import React from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Team_list_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { Box, Button, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups"; // Importing the team/group icon
import styles from "./TeamList.module.scss";
import { NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // You can choose any icon you like

const TeamList = () => {
  const handleAddMember = () => {
    console.log("Add Member button clicked!");
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header with title, icon, and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* Title and Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">
            Team List <GroupsIcon sx={{ mr: 1, color: "#062d72" }} />
          </Typography>
        </Box>

        {/* Add Member Button */}
        <NavLink to={"/portal/teams/addMember"}>
          <Button variant="contained" className={styles["addMember-btn"]}>
            <PersonAddIcon sx={{ mr: 1 }} /> Add Member
          </Button>
        </NavLink>
      </Box>

      {/* Data Table */}
      <DataTable propsColumn={Team_list_column} propsData={[]} />
    </Box>
  );
};

export default TeamList;
