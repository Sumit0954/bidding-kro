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
import { Inbox, Preferences } from "@novu/react";

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
              <Inbox
                applicationIdentifier="W3fmktGqBpaY"
                subscriberId="f67be7819f447a4f816fdebfe9046063"
                preferencesFilter={{ tags: ["general", "admin", "security"] }}
                renderBell={(unreadCount) => (
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <img src={NotificationIcon} alt="NotificationIcon" />
                  </Badge>
                )}
              />

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
