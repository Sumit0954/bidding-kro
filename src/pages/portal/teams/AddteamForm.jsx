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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      {/* Email and Mobile fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          name="first_name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "50%" }, // 100% width on small screens, 50% on larger screens
          }}
        />
        <TextField
          label="last Name"
          variant="outlined"
          name="last_name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className={styles["addMember-fields"]}
          sx={{
            width: { xs: "100%", sm: "50%" }, // 100% width on small screens, 50% on larger screens
          }}
        />
      </Box>

      {/* Email and Mobile fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
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
          value={formData.mobile}
          onChange={handleInputChange}
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
            value={formData.role}
            onChange={handleInputChange}
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
