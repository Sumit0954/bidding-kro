import { useState } from "react";
import styles from "./AdminHeader.module.scss";
import cn from "classnames";
import UserIcon from "../../assets/images/portal/layout/icons/user-icon.svg";
import AccountSettingMenu from "../../elements/DropdownMenu/AccountSettingMenu";
import { Box } from "@mui/material";

const AdminHeader = () => {
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
              <Box className={cn("cursor")} onClick={handleClick}>
                <img src={UserIcon} alt="NotificationIcon" />
              </Box>
              <AccountSettingMenu
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                from={"Admin"}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
