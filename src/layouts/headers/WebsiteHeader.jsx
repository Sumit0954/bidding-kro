import React, { useContext } from "react";
import styles from "./WebsiteHeader.module.scss";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../../contexts/UserDetailsProvider";
import { Avatar, Tooltip } from "@mui/material";
import {
  AirplayOutlined,
  GroupOutlined,
  Info,
  LibraryBooks,
  LibraryBooksTwoTone,
  Login,
  PermPhoneMsg,
  PermPhoneMsgTwoTone,
  PersonAdd,
  PersonAddTwoTone,
  TryOutlined,
} from "@mui/icons-material";

const WebsiteHeader = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const navigate = useNavigate();

  const handleBookADemmoClick = () => {
    navigate("/");
    setTimeout(() => {
      const targetElement = document.getElementById("contact-us");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
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
                  About <GroupOutlined sx={{ fontSize: 20, ml: 1 }} />
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
                  to={"/contactUs"}
                >
                  Contact Us{" "}
                  <PermPhoneMsgTwoTone sx={{ fontSize: 20, ml: 1 }} />
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
                  Blogs <LibraryBooksTwoTone sx={{ fontSize: 20, ml: 1 }} />
                </NavLink>
              </li>
            </ul>

            {userDetails?.user ? (
              <a href={"/portal"} className={cn(styles["loggedin-profile"])}>
                <Tooltip
                  title={`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
                >
                  <Avatar src={userDetails?.profile_image} alt="ProfileImg" />
                </Tooltip>
              </a>
            ) : (
              <div className={styles["btn-container"]}>
                {/* New "Pricing" Link */}
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                      to={"/register"}
                    >
                      Register <PersonAddTwoTone sx={{ fontSize: 20, ml: 1 }} />
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
                      to={"/login"}
                    >
                      Login <Login sx={{ fontSize: 20, ml: 1 }} />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className={cn(
                        "nav-link",
                        "px-3",
                        styles["custom-navlink"]
                      )}
                      onClick={handleBookADemmoClick}
                    >
                      Book A Demo{" "}
                      <AirplayOutlined sx={{ fontSize: 20, ml: 1 }} />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebsiteHeader;
