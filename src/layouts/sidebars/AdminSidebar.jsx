import React, { useEffect } from "react";
import styles from "./AdminSidebar.module.scss";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const AdminSidebar = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const groups = decoded.groups;

  // Always show dashboard, filter the rest
  const alwaysVisible = sidebarMenu.filter(
    (item) => item.accessor === "dashboard_management"
  );
  const filteredMenu = sidebarMenu.filter(
    (item) =>
      item.accessor !== "dashboard_management" && groups.includes(item.accessor)
  );

  const permissionSiderBar = [...alwaysVisible, ...filteredMenu];

  return (
    <div className={styles["sidebar-container"]}>
      <ul className={styles["sidebar-items"]}>
        {permissionSiderBar.map((item, index) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles["item-link"]} ${styles["active"]}`
                : styles["item-link"]
            }
            key={index}
          >
            <Tooltip title={item.title}>
              <li className={styles["sidebar-item"]}>
                <img
                  className={styles["item-icon"]}
                  src={item.icon}
                  alt={item.title}
                />
                <span className={styles["item-name"]}>{item.title}</span>
              </li>
            </Tooltip>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;

const sidebarMenu = [
  {
    icon: "/images/portal/layout/icons/dashboard-icon.svg",
    title: "Dashboard",
    path: "/admin/dashboard",
    accessor: "dashboard_management",
  },
  {
    icon: "/images/portal/layout/icons/reports.svg",
    title: "Reports",
    path: "/admin/reports",
    accessor: "report_management",
  },
  {
    icon: "/images/admin/layout/icons/building.svg",
    title: "Companies",
    path: "/admin/companies",
    accessor: "company_management",
  },
  {
    icon: "/images/admin/layout/icons/blogging.svg",
    title: "Blog Management",
    path: "/admin/blogs",
    accessor: "blog_management",
  },
  {
    icon: "/images/admin/layout/icons/Administrator3.svg",
    title: "Admin Management",
    path: "/admin/management",
    accessor: "admin_management",
  },
  {
    icon: "/images/admin/layout/icons/credit-card.svg",
    title: "Transactions",
    path: "/admin/transactions",
    accessor: "transaction_management",
  },
  {
    icon: "/images/admin/layout/icons/queries.svg",
    title: "Queries",
    path: "/admin/queries",
    accessor: "query_management",
  },
  {
    icon: "/images/portal/layout/icons/bid-list-icon.svg",
    title: "Portal Bids",
    path: "/admin/portal-bids",
    accessor: "bid_management",
  },
];
