import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./AdminManagementForm.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import React, { useContext, useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
const AdminManagementForm = () => {
  const { control, setValue, handleSubmit, watch } = useForm();
  const [adminDetail, setAdminDetail] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const { id, action } = useParams();
  const [roles, setRoles] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [buttonLoader, setButtonLoader] = useState(false);

  const setPreFilledDetails = (data) => {
    setValue("first_name", data?.first_name);
    setValue("last_name", data?.last_name);
    setValue("email", data?.email);
  };

  const fetchAdminDetails = async () => {
    if (id) {
      try {
        const response = await _sendAPIRequest(
          "GET",
          `${AdminApiUrls.ADMIN_DETAILS}${id}/`,
          "",
          true
        );

        if (response.status === 200) {
          setPreFilledDetails(response.data);
          setAdminDetail(response.data);
          setScreenLoader(false);
          setRoles(response.data.groups);
        }
      } catch (error) {
        console.log(error, " : error");
      }
    } else {
      setScreenLoader(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, [setValue]);

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/companies"
      style={{ textDecoration: "none" }}
    >
      Admin List
    </NavLink>,
    <Typography key="2" color="text.primary">
      ABC company
    </Typography>,
  ];

  if (screenLoader) {
    return <ScreenLoader />;
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setRoles((prevRoles) =>
      checked ? [...prevRoles, name] : prevRoles.filter((role) => role !== name)
    );
  };

  const onSubmit = async (data) => {
    setButtonLoader(true);
    const formData = {
      ...data,
      roles,
    };
    if (action === "create") {
      try {
        const response = await _sendAPIRequest(
          "POST",
          AdminApiUrls.CREATE_ADMIN,
          formData,
          true
        );

        if (response.status === 201) {
          console.log(response, " : response");
          setButtonLoader(false);
          setAlert({
            isVisible: true,
            message: "Admin has been created successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setButtonLoader(false);
        console.log(error, " : error");
        setAlert({
          isVisible: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
    }
    if (action === "update") {
      try {
        const response = await _sendAPIRequest(
          "PATCH",
          `${AdminApiUrls.UPDATE_ADMIN_DETAILS}${id}/`,
          formData,
          true
        );

        if (response) {
          setButtonLoader(false);
          setAlert({
            isVisible: true,
            message: "Admin Details Updated Successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setButtonLoader(false);
        console.log(error, " : error");
        setAlert({
          isVisible: true,
          message:  "Something went wrong",
          severity: "error",
        });
      }
    }
  };
  return (
    <>
      <div className={styles["breadcrumb-container"]}>
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>

      <div className={cn("row", styles["adminInfo"])}>
        {/* First Name */}
        <div className="col-lg-3">
          <CustomInput
            control={control}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            rules={{ required: "First Name is required." }}
            inputType="text"
          />
        </div>

        {/* Last Name */}
        <div className="col-lg-3">
          <CustomInput
            control={control}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            rules={{ required: "Last Name is required." }}
            inputType="text"
          />
        </div>

        {/* Email */}
        <div className="col-lg-3">
          <CustomInput
            control={control}
            label="Email"
            name="email"
            placeholder="@example.com"
            rules={{ required: "Email is required." }}
            inputType="text"
          />
        </div>

        {/* Password */}
        <div className="col-lg-3">
          <CustomInput
            control={control}
            label="Password"
            name="password"
            disableField={action === "update"}
            placeholder={
              action === "update" ? "Not Updatable" : "Provide password"
            }
            rules={action === "create" && { required: "Password is required." }}
            inputType="password"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "300px", margin: "0", textAlign: "left" }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Roles
        </Typography>

        {/* Roles Selection */}
        <FormGroup>
          {[
            "admin_management",
            "blog_management",
            "company_management",
            "query_management",
            "report_management",
            "transaction_management",
          ].map((permission, key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  name={permission}
                  defaultChecked={
                    action === "update" && roles.includes(permission)
                  }
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "#062d72",
                    "&.Mui-checked": { color: "#062d72" },
                  }}
                />
              }
              label={permission
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            />
          ))}
        </FormGroup>
        {buttonLoader ? (
          <ButtonLoader size={60} />
        ) : (
          <Button
            variant="contained"
            color="success"
            type="submit"
            style={{ marginTop: "16px" }}
            className={styles["form-btn"]}
          >
            Submit
          </Button>
        )}
      </form>
    </>
  );
};
export default AdminManagementForm;
