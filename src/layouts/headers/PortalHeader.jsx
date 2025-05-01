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

  const RegisterFCMToken = async (token) => {
    try {
      const formData = new FormData();
      formData.append("token", token);

      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.REGISTER_FCM_TOKEN}`,
        formData,
        true
      );
      if (response.status === 200) {
        console.log("Register FCM Token Sucessfully");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((token) => {
        if (token) {
          console.log("Firebase Token Reload:", token);
          const OldFCMToken = localStorage.getItem("FCMToken");
          if (token != OldFCMToken) {
            RegisterFCMToken(token);
            localStorage.setItem("FCMToken", token);
          }
        }
      })
      .catch((err) => console.log("Notification permission error:", err));

    // Listen for incoming messages
    // onMessageListener()
    //   .then((payload) => {
    //     console.log("New Notification:", payload);
    //   })
    // .catch((err) => console.log("Error receiving message:", err));
  }, []);

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
              {subscriberId && (
                <Inbox
                  // applicationIdentifier="W3fmktGqBpaY"
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
              )}{" "}
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
                    <img src={UserIcon} alt="NotificationIcon" />
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
        </div>
      </nav>
    </header>
  );
};

export default PortalHeader;
