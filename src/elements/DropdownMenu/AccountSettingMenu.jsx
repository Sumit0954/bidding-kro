import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import styles from "./AccountSettingMenu.module.scss";
import {
  AccountCircleRounded,
  Logout,
  Settings,
  StoreRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { UserDetailsContext } from "../../contexts/UserDetailsProvider";
import { CompanyDetailsContext } from "../../contexts/CompanyDetailsProvider";
import { logout } from "../../utils/AxiosInterceptors";

const AccountSettingMenu = ({ open, anchorEl, setAnchorEl }) => {
  const { userDetails } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className={styles["account-setting-menu"]}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          {userDetails && (
            <>
              <Avatar src={userDetails?.profile_image} alt="ProfileImg" />
              {`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
            </>
          )}
        </MenuItem>

        <Divider className={styles["divider"]} />

        <NavLink to={"/portal/user-profile"} className={styles["menu-links"]}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleRounded fontSize="medium" />
            </ListItemIcon>
            User Profile
          </MenuItem>
        </NavLink>

        <NavLink
          to={
            companyDetails
              ? "/portal/company-profile/update"
              : "/portal/company-profile/create"
          }
          className={styles["menu-links"]}
        >
          <MenuItem>
            <ListItemIcon>
              <StoreRounded fontSize="medium" />
            </ListItemIcon>
            Company Profile
          </MenuItem>
        </NavLink>

        <NavLink to={"/portal/settings"} className={styles["menu-links"]}>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="medium" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>

        <Divider className={cn("my-2", styles["divider"])} />

        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountSettingMenu;
