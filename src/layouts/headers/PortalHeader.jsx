import React from "react";
import cn from "classnames";
import styles from "./PortalHeader.module.scss";
import { NavLink } from "react-router-dom";
import NotificationIcon from "../../assets/images/portal/layout/icons/notification-icon.svg";
import UserIcon from "../../assets/images/portal/layout/icons/user-icon.svg";

const PortalHeader = () => {
  return (
    <header>
      <nav
        className={cn(
          "navbar",
          "navbar-expand-lg",
          "navbar-light",
          "p-0",
          styles["custom-navbar"]
        )}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="logo" className={styles["logo-img"]} />
          </a>
          <button
            className={cn("navbar-toggler", styles["custom-toggle"])}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className={cn(["navbar-toggler-icon", styles["custom-icon"]])}
            ></span>
          </button>
          <div
            className={cn(
              "collapse",
              "navbar-collapse",
              styles["custom-navbar-collapse"]
            )}
            id="navbarTogglerDemo02"
          >
            <div className={styles["icon-container"]}>
              <NavLink to={""} className={styles["icons"]}>
                <img src={NotificationIcon} alt="NotificationIcon" />
              </NavLink>
              <NavLink to={""} className={styles["icons"]}>
                <img src={UserIcon} alt="NotificationIcon" />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PortalHeader;
