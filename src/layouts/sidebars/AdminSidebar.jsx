import React from "react";
import styles from "./AdminSidebar.module.scss";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className={styles["sidebar-container"]}>
        <ul className={styles["sidebar-items"]}>
          {sidebarMenu.map((item, index) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles["item-link"]} ${styles['active']}` : styles["item-link"]
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

export default AdminSidebar;

const sidebarMenu = [
  {
    icon: "/images/admin/layout/icons/companies.svg",
    title: "Companies",
    path: "/admin/companies",
  },

  {
    icon: "/images/admin/layout/icons/blogging-icon.png",
    title: "Blog Management",
    path: "/admin/blogs",
  },
];
