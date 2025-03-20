import React, { useContext } from "react";
import styles from "./WebsiteHeader.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { UserDetailsContext } from "../../contexts/UserDetailsProvider";
import { Avatar } from "@mui/material";
import {
  GroupOutlined,
  Info,
  LibraryBooks,
  Login,
  PermPhoneMsg,
  PersonAdd,
  TryOutlined,
} from "@mui/icons-material";

const WebsiteHeader = () => {
  const { userDetails } = useContext(UserDetailsContext);
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    cn([
                      "nav-link",
                      "px-3",
                      styles["custom-navlink"],
                      { [styles["active-link"]]: isActive },
                    ])
                  }
                  to="/about"
                >
                  About <GroupOutlined sx={{ fontSize: "20px" }} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    cn([
                      "nav-link",
                      "px-3",
                      styles["custom-navlink"],
                      { [styles["active-link"]]: isActive },
                    ])
                  }
                  to="/contact"
                >
                  Contact <PermPhoneMsg sx={{ fontSize: "20px" }} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    cn([
                      "nav-link",
                      "px-3",
                      styles["custom-navlink"],
                      { [styles["active-link"]]: isActive },
                    ])
                  }
                  to="/blogs"
                >
                  Blogs <LibraryBooks sx={{ fontSize: "20px" }} />
                </NavLink>
              </li>
            </ul>

            {userDetails?.user ? (
              <NavLink
                to={"/portal"}
                className={cn(styles["loggedin-profile"])}
              >
                <Avatar src={userDetails?.profile_image} alt="ProfileImg" />
                {`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
              </NavLink>
            ) : (
              <div className={styles["btn-container"]}>
                {/* New "Pricing" Link */}
                <NavLink
                  to={"/pricing"}
                  className={cn("btn", "mx-2", styles["header-btn"])}
                >
                  Book a Demo &nbsp; <TryOutlined sx={{ fontSize: "20px" }} />
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={cn("btn", "mx-2", styles["header-btn"])}
                >
                  Register &nbsp;
                  <PersonAdd sx={{ fontSize: "20px" }} />
                </NavLink>
                <NavLink
                  to={"/login"}
                  className={cn("btn", "mx-2", styles["header-btn"])}
                >
                  Login &nbsp;
                  <Login sx={{ fontSize: "20px" }} />
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebsiteHeader;
