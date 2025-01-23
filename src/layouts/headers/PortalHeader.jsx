import React, { useContext, useState } from "react";
import cn from "classnames";
import styles from "./PortalHeader.module.scss";
import { NavLink } from "react-router-dom";
import NotificationIcon from "../../assets/images/portal/layout/icons/notification-icon.svg";
import UserIcon from "../../assets/images/portal/layout/icons/user-icon.svg";
import AccountSettingMenu from "../../elements/DropdownMenu/AccountSettingMenu";
import { Badge, Box } from "@mui/material";
import { UserDetailsContext } from "../../contexts/UserDetailsProvider";
import { CompanyDetailsContext } from "../../contexts/CompanyDetailsProvider";

const PortalHeader = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const [isActive, setIsActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setIsActive(!isActive);
    setAnchorEl(event.currentTarget);
  };

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
              <NavLink to={"/portal/notifications"} className={styles["icons"]}>
                <Badge
                  badgeContent={4} // This is the content of the badge, e.g., the number of notifications
                  color="error" // Badge color
                  overlap="circular" // Ensure the badge overlaps correctly with the icon
                  anchorOrigin={{
                    vertical: "top", // Position the badge at the top
                    horizontal: "right", // Position it at the right
                  }}
                >
                  <img src={NotificationIcon} alt="NotificationIcon" />
                </Badge>
              </NavLink>

              <Box className={cn("cursor")} onClick={handleClick}>
                <img src={UserIcon} alt="NotificationIcon" />
              </Box>
              <AccountSettingMenu
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                from={"Portal"}
                userDetails={userDetails}
                companyDetails={companyDetails}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PortalHeader;
