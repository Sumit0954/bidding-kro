import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import styles from "./AccountSettingMenu.module.scss";
import {
  AccountCircleRounded,
  Logout,
  Settings,
  StoreRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { logout } from "../../utils/AxiosInterceptors";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { getMessaging, getToken } from "firebase/messaging";

const AccountSettingMenu = ({
  open,
  anchorEl,
  setAnchorEl,
  from,
  userDetails,
  companyDetails,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DeleteFCMToken = async (OldFCMToken) => {
    try {
      const formData = new FormData();
      formData.append("token", OldFCMToken);

      const response = await _sendAPIRequest(
        "DELETE",
        `${PortalApiUrls.DELETE_FCM_TOKEN}`,
        formData,
        true
      );
      if (response.status === 204) {
        console.log("Delete FCM Token Sucessfully");
        logout({
          redirectPath: `${from === "Admin" ? "/admin" : "/login"}`,
        });
      } else {
        logout({
          redirectPath: `${from === "Admin" ? "/admin" : "/login"}`,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
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
        {from === "Portal" && userDetails && (
          <MenuItem>
            <Avatar
              src={companyDetails?.logo}
              alt="ProfileImg"
              variant="square" // Make Avatar square (better for logos)
              sx={{
                width: 68, // or your needed size
                height: 60,
                objectFit: "contain", // Important to prevent image from stretching
                backgroundColor: "transparent", // Optional: white background for better logo visibility
                padding: "1px", // Optional: small padding inside avatar
                border: "1px solid gray", // Optional: soft border
                borderRadius: "50%",
              }}
            />

            {`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
          </MenuItem>
        )}

        {from === "Portal" && (
          <div>
            <Divider className={styles["divider"]} />

            <NavLink
              to={"/portal/user-profile"}
              className={styles["menu-links"]}
            >
              <MenuItem>
                <ListItemIcon>
                  {userDetails ? (
                    <Avatar
                      src={userDetails?.profile_image}
                      alt="user_proflie"
                      variant="square" // Make Avatar square (better for logos)
                      sx={{
                        width: 68, // or your needed size
                        height: 60,
                        objectFit: "contain", // Important to prevent image from stretching
                        backgroundColor: "transparent", // Optional: white background for better logo visibility
                        padding: "2px", // Optional: small padding inside avatar
                        border: "1px solid gray", // Optional: soft border
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <AccountCircleRounded fontSize="medium" />
                  )}
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
          </div>
        )}
        <MenuItem
          // onClick={() =>
          //   // logout({
          //   //   redirectPath: `${from === "Admin" ? "/admin" : "/login"}`,
          //   // })
          //   requestNotificationPermission()
          // }

          onClick={() => {
            const OldFCMToken = localStorage.getItem("FCMToken");
            if (OldFCMToken) {
              // requestNotificationPermission();
              DeleteFCMToken(OldFCMToken);
            } else {
              logout({
                redirectPath: `${from === "Admin" ? "/admin" : "/login"}`,
              });
            }
          }}
        >
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
