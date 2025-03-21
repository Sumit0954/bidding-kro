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
import { Cancel, CheckCircle } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./AddteamForm.jsx.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const AddteamForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    role: "",
  });

  const roles = ["owner", "manager", "executive", "qa"];

  const permissions = [
    { action: "Company Profile Creation", roles: [true, false, false, false] },
    { action: "Company Profile Edit", roles: [true, true, true, false] },
    { action: "Bid Creation", roles: [true, true, true, false] },
    { action: "Bid Edit", roles: [true, true, true, false] },
    { action: "Bid Clone", roles: [true, true, true, false] },
    { action: "Amend Bid ", roles: [true, true, true, false] },
    { action: "Cancel Bid ", roles: [true, true, false, false] },
    { action: "Invite Suppliers for Bid ", roles: [true, true, true, false] },
    { action: "Revoke Bid Supplier ", roles: [true, false, false, false] },
    {
      action: "Send invite for Related Bid ",
      roles: [true, true, true, false],
    },
    { action: "Accept Bid Invitation ", roles: [true, true, true, false] },
    { action: "Response to Bid question ", roles: [true, true, true, false] },
    { action: "Rating & Feedback ", roles: [true, true, false, false] },
    { action: "Bid Sample Approval ", roles: [true, true, false, true] },
    {
      action: "See Company Name in Live Bid ",
      roles: [true, false, false, false],
    },
    { action: "Add Team Members ", roles: [true, false, false, false] },
  ];

  // ✅ Handle change for controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleAddMember = async () => {
    try {
      const payload = new FormData();
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);
      payload.append("mobile_number", `+91${formData.mobile_number}`);
      payload.append("role", formData.role);

      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.ADD_TEAM_MEMBER,
        payload,
        true
      );

      console.log("Member added successfully:", response.data);
      alert("Member added successfully!");

      // ✅ Clear form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        role: "",
      });
    } catch (error) {
      console.error(
        "Failed to add member:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add member.");
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      } else if (error.status == 400) {
        setAlert({
          isVisible: true,
          message: error.response.data.error,
          severity: "error",
        });
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Title */}
      <Typography
        variant="h5"
        gutterBottom
        className={styles["heading-with-lines"]}
        sx={{ textAlign: "center" }}
      >
        ADD TEAM MEMBER
      </Typography>

      {/* ✅ First and Last Name */}
      <Box className={styles["first_last_name_fields"]}>
        <TextField
          label="First Name"
          variant="outlined"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className={styles["addMember-fields"]}
          sx={{ width: { xs: "100%", sm: "24%" } }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className={styles["addMember-fields"]}
          sx={{ width: { xs: "100%", sm: "24%" } }}
        />
      </Box>

      {/* ✅ Email, Mobile & Role */}
      <Box className={styles["email_mobile_role_fields"]}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles["addMember-fields"]}
          sx={{ width: { xs: "100%", sm: "50%" } }}
        />
        <TextField
          label="Mobile"
          variant="outlined"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
          className={styles["addMember-fields"]}
          sx={{ width: { xs: "100%", sm: "50%" } }}
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
            onChange={handleChange}
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

      {/* ✅ Permissions Table */}
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
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Submit Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", float: "right" }}
        className={styles["addMember-btn"]}
        startIcon={<PersonAddIcon />}
        onClick={handleAddMember}
        disabled={
          !formData.first_name ||
          !formData.last_name ||
          !formData.email ||
          !formData.mobile_number ||
          !formData.role
        }
      >
        Add Member
      </Button>
    </div>
  );
};

export default AddteamForm;
