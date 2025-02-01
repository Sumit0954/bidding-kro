import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./AdminManagementForm.module.scss";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
const AdminManagementForm = () => {
  const { control } = useForm();

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/companies"
      style={{ textDecoration: "none" }}
    >
      Companies
    </NavLink>,
    <Typography key="2" color="text.primary">
      ABC company
    </Typography>,
  ];
  return (
    <>
      <div className={styles["breadcrumb-container"]}>
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>
      <div className={cn("row", styles["adminInfo"])}>
        {/* First Name*/}
        <div className="col-lg-4">
          <CustomInput
            control={control}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            rules={{
              required: "First Name is required.",
            }}
            inputType="text"
          />
        </div>

        {/* Last Name */}
        <div className="col-lg-4">
          <CustomInput
            control={control}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            rules={{
              required: "Last Name is required.",
            }}
            inputType="text"
          />
        </div>

        {/* Email */}
        <div className="col-lg-4">
          <CustomInput
            control={control}
            label="Email"
            name="email"
            placeholder="@emample.com"
            rules={{
              required: "Email is required.",
            }}
            inputType="text"
          />
        </div>
      </div>

      <form style={{ width: "300px", margin: "0", textAlign: "left" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Permissions
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="companies"
                sx={{
                  color: "#062d72", // Unchecked color
                  "&.Mui-checked": {
                    color: "#062d72", // Checked color
                  },
                }}
              />
            }
            label="Companies"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="blogManagement"
                sx={{
                  color: "#062d72", // Unchecked color
                  "&.Mui-checked": {
                    color: "#062d72", // Checked color
                  },
                }}
              />
            }
            label="Blog Management"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="template"
                sx={{
                  color: "#062d72", // Unchecked color
                  "&.Mui-checked": {
                    color: "#062d72", // Checked color
                  },
                }}
              />
            }
            label="Template"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="adminManagement"
                sx={{
                  color: "#062d72", // Unchecked color
                  "&.Mui-checked": {
                    color: "#062d72", // Checked color
                  },
                }}
              />
            }
            label="Admin Management"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="success"
          type="submit"
          style={{ marginTop: "16px" }}
          className={styles["form-btn"]}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
export default AdminManagementForm;
