import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Cancel, CheckCircle, Group } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // You can choose any icon you like
import styles from "./AddteamForm.jsx.module.scss";
const AddteamForm = () => {
  const roles = ["Owner", "Manager", "Executive", "QA"];

  const permissions = [
    { action: "View Dashboard", roles: [true, true, true, true] },
    { action: "Viewing Bids", roles: [true, true, true, false] },
    { action: "Bidder Name", roles: [true, true, true, true] },
    { action: "Add Manager", roles: [true, false, false, false] },
    { action: "Add Executive", roles: [true, true, false, false] },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h5"
        gutterBottom
        className={styles["heading-with-lines"]}
        sx={{
          textAlign: "center", // Center the heading on all screen sizes
        }}
      >
        INVITE TEAM MEMBER
      </Typography>
      {/* First and Last Name fields */}
      <Box className={styles["first_last_name_fields"]}>
        <TextField
          label="First Name"
          variant="outlined"
          name="first_name"
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "24%" },
          }}
        />
        <TextField
          label="last Name"
          variant="outlined"
          name="last_name"
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "24%" },
          }}
        />
      </Box>

      {/* Email , Mobile & role fields  */}
      <Box className={styles["email_mobile_role_fields"]}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "50%" }, // 100% width on small screens, 50% on larger screens
          }}
        />
        <TextField
          label="Mobile"
          variant="outlined"
          name="mobile"
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "50%" }, // 100% width on small screens, 50% on larger screens
          }}
        />
        <FormControl
          fullWidth
          required
          sx={{ width: { xs: "100%", sm: "50%" } }}
        >
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            label="Role"
            className={styles["addMember-fields"]}
          >
            {roles.map((role) => (
              <MenuItem value={role} key={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Permissions Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              {roles.map((role) => (
                <TableCell key={role} align="center">
                  {role}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.action}>
                <TableCell>{permission.action}</TableCell>
                {permission.roles.map((allowed, index) => (
                  <TableCell key={index} align="center">
                    {allowed ? (
                      <CheckCircle color="success" /> // Green icon for allowed
                    ) : (
                      <Cancel color="error" /> // Red icon for not allowed
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", float: "right" }}
        className={styles["addMember-btn"]}
        startIcon={<PersonAddIcon />}
      >
        Add Member
      </Button>
    </div>
  );
};

export default AddteamForm;
