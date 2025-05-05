import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./PortalHeader.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

import NotificationIcon from "../../assets/images/portal/layout/icons/notification-icon.svg";
import UserIcon from "../../assets/images/portal/layout/icons/user-icon.svg";
import AccountSettingMenu from "../../elements/DropdownMenu/AccountSettingMenu";
import { Avatar, Badge, Box, Modal, Tooltip } from "@mui/material";
import { UserDetailsContext } from "../../contexts/UserDetailsProvider";
import { CompanyDetailsContext } from "../../contexts/CompanyDetailsProvider";
import { Inbox, Preferences } from "@novu/react";
import {
  // onMessageListener,
  requestFirebaseNotificationPermission,
} from "../../firebaseMessaging";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { useNotifications } from "@novu/notification-center";

const PortalHeader = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const [isActive, setIsActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subscriberId, setSubscriberId] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const open = Boolean(anchorEl);
  const novuAppID = import.meta.env.VITE_NOVU_APPLICATION_IDENTIFIER;
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails?.novu_subscriber_id) {
      setSubscriberId(userDetails.novu_subscriber_id);
    }
  }, [userDetails?.novu_subscriber_id]);

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
          <a className="navbar-brand" href="/portal">
            <img src="/logo.png" alt="logo" className={styles["logo-img"]} />
          </a>

          {/* Directly show icons instead of hiding inside collapse */}
          <div className={styles["icon-container"]}>
            {subscriberId && (
              <Inbox
                applicationIdentifier={novuAppID}
                subscriberId={subscriberId}
                subscriberHash={userDetails?.novu_subscriber_hash}
                backendUrl="https://eu.api.novu.co"
                socketUrl="https://eu.ws.novu.co"
                localization={{
                  "inbox.filters.labels.default": "Notifications",
                }}
                onNotificationClick={(notification) => {
                  const redirectUrl = notification.redirect.url;
                  navigate(redirectUrl);
                }}
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
                    <Tooltip title={"Notification"}>
                      <img
                        src={NotificationIcon}
                        alt="Notification Icon"
                        width={32}
                        height={32}
                      />
                    </Tooltip>
                  </Badge>
                )}
              />
            )}
            <Tooltip title={companyDetails?.name}>
              {companyDetails?.logo ? (
                <Box
                  onClick={handleClick}
                  component="img"
                  className={cn("cursor", styles["company-logo"])}
                  src={companyDetails?.logo}
                  alt="Company Logo"
                />
              ) : (
                <Box className={cn("cursor")} onClick={handleClick}>
                  <img src={UserIcon} alt="User Icon" />
                </Box>
              )}
            </Tooltip>
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
      </nav>
    </header>
  );
};

export default PortalHeader;
