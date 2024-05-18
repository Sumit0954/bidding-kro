import React from "react";
import styles from "./Layout.module.scss";
import PortalSidebar from "../../../layouts/sidebars/PortalSidebar";

const Layout = ({ Component }) => {
  return (
    <>
      <div className={styles["layout-container"]}>
        <div className={styles["left-section"]}>
          <PortalSidebar />
        </div>
        <div className={styles["right-section"]}>
          <Component />
        </div>
      </div>
    </>
  );
};

export default Layout;
