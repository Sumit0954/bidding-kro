import React from "react";
import styles from "./Dashboard.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";

function Dashboard() {
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
    </>
  );
}

export default Dashboard;
