import React, { useContext } from "react";
import styles from "./Dashboard.module.scss";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";

function Dashboard() {
  const naviagte = useNavigate();
  const { noCompany } = useContext(UserDetailsContext);
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className={styles["dashboard-container"]}>
            <div className="row">
              <p>Welcome, Nitish</p>
              <h3>Your application is being reviewed</h3>
              <p>
                Thank you for signing up with EBID. We are reviewing your
                application and will notify you once the review is complete. In
                the meantime you can update your profile and company profile
                details.
              </p>
              <div className="col-lg-12">
                <NavLink 
                  to={'/portal/user-profile'}
                  className={cn("btn", "button", styles["custom-btn"])}
                >
                  Update Profile
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {noCompany && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Company Creation Required
          </AlertTitle>
          Your account is registered, but you haven’t created a company yet.
          Please click the button below to create your company profile and
          proceed further:
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => naviagte("company-profile/create")}
            sx={{ marginTop: "8px" }}
            className={styles["create-comp-btn"]}
          >
            Create Company Profile
          </Button>
        </Alert>
      )}
    </>
  );
}

export default Dashboard;
