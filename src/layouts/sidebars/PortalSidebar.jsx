import React from "react";
import styles from "./PortalSidebar.module.scss";
import { NavLink } from "react-router-dom";

const PortalSidebar = () => {
  const current_url = window.location.pathname;

  return (
    <>
      <div className={styles["sidebar-container"]}>
        <ul className={styles["sidebar-items"]}>
          {sidebarMenu.map((item, index) => (
            <NavLink
              to={item.path}
              className={
                current_url.includes(item.title.toLowerCase()) ||
                  current_url === item.path
                  ? `${styles["item-link"]} ${styles["active"]}`
                  : styles["item-link"]
              }
              key={index}
            >
              <li className={styles["sidebar-item"]}>
                <img
                  className={styles["item-icon"]}
                  src={item.icon}
                  alt={item.title}
                />
                <span className={styles["item-name"]}>{item.title}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PortalSidebar;

const sidebarMenu = [
  {
    icon: "/images/portal/layout/icons/dashboard-icon.svg",
    title: "Dashboard",
    path: "/portal",
  },
  {
    icon: "/images/portal/layout/icons/bid-list-icon.svg",
    title: "Bids",
    path: "/portal/bids",
  },
  {
    icon: "/images/portal/layout/icons/bid-list-icon.svg",
    title: "Live Bids",
    path: "/portal/liveBids",
  },
  {
    icon: "/images/portal/layout/icons/building.svg",
    title: "Companies",
    path: "/portal/companies",
  },
];
