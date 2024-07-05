import React from "react";
import styles from "./Layout.module.scss";
import AdminSidebar from "../../../layouts/sidebars/AdminSidebar";

const Layout = ({ Component }) => {
  return (
    <>
      <div className={styles["layout-container"]}>
        <div className={styles["left-section"]}>
          <AdminSidebar />

        </div>
        <div className={styles["right-section"]}>
          <Component />
        </div>
      </div>
    </>
  );
};

export default Layout;
