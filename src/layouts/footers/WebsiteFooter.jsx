import styles from "./WebsiteFooter.module.scss";
import FooterLogo from "../../assets/images/common/footer-logo.png";
import instagramicon from "../../assets/images/website/home/footer svg-icon/instagram (1).svg";
import facebookicon from "../../assets/images/website/home/footer svg-icon/facebook.svg";
import linkdinicon from "../../assets/images/website/home/footer svg-icon/linkedin.svg";
import Youtubeicon from "../../assets/images/website/home/footer svg-icon/youtube.svg";
import { Tooltip } from "@mui/material";
import {
  AnnouncementTwoTone,
  Call,
  CallTwoTone,
  CasesTwoTone,
  Grade,
  GradeTwoTone,
  GroupOutlined,
  Info,
  LibraryBooksTwoTone,
  Mail,
  MailTwoTone,
  Photo,
  PhotoTwoTone,
  Policy,
  PolicyTwoTone,
  SpeakerGroupOutlined,
  Work,
  WorkTwoTone,
} from "@mui/icons-material";

const WebsiteFooter = () => {
  return (
    <div className="container-fluid mt-5">
      {/* Social Section */}
      <div className={`row ${styles["social-content"]}`}>
        <div className="col-lg-6">
          <p style={{ marginBottom: "0rem" }}>
            Get Connected with us on social networks
          </p>
        </div>
        <div className={`col-lg-6 ${styles["social-icons-container"]}`}>
          <Tooltip title="Follow us on Instagram">
            <img
              src={instagramicon}
              alt="Instagram"
              className={styles["footer-icon"]}
              style={{ backgroundColor: "#E1306C", borderRadius: "50%" }}
            />
          </Tooltip>

          <Tooltip title="Like us on Facebook">
            <img
              src={facebookicon}
              alt="Facebook"
              className={styles["footer-icon"]}
              style={{ backgroundColor: "#1877F2", borderRadius: "50%" }}
            />
          </Tooltip>

          <Tooltip title="Connect with us on LinkedIn">
            <img
              src={linkdinicon}
              alt="LinkedIn"
              className={styles["footer-icon"]}
              style={{ backgroundColor: "#0077B5", borderRadius: "50%" }}
            />
          </Tooltip>

          <Tooltip title="Subscribe to our YouTube">
            <img
              src={Youtubeicon}
              alt="YouTube"
              className={styles["footer-icon"]}
              style={{ backgroundColor: "red", borderRadius: "50%" }}
            />
          </Tooltip>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-12 text-center">
            <img
              src={FooterLogo}
              alt="Footer Logo"
              className={styles["footer-logo"]}
            />
          </div>
          <div className="col-lg-9 col-12">
            <div className="d-flex justify-content-between flex-wrap footer-links">
              <div className="footer-column">
                <h3 className={styles["footer-heading"]}>Company</h3>
                <ul>
                  <li>
                    <a href="tel:+919599712997">
                      <SpeakerGroupOutlined /> About Us
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919599712997">
                      <GradeTwoTone /> Awards
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@biddingkaro.in">
                      <PhotoTwoTone /> Our Gallery
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@biddingkaro.in">
                      <PolicyTwoTone /> Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@biddingkaro.in">
                      <WorkTwoTone /> Career
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className={styles["footer-heading"]}>Resource Centre</h3>
                <ul>
                  <li>
                    <a href="#">
                      {" "}
                      <CasesTwoTone /> Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <AnnouncementTwoTone /> Announcements
                    </a>
                  </li>
                  <li>
                    <a href="/blogs">
                      {" "}
                      <LibraryBooksTwoTone /> Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className={styles["footer-heading"]}>Contact</h3>
                <ul>
                  <li>
                    <a href="tel:+919599712997">
                      <CallTwoTone /> +91 9599712997
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@biddingkaro.in">
                      <MailTwoTone /> info@biddingkaro.in
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row">
          <div className={styles["line"]}></div>
          <div className="col-lg-12">
            <p className={styles["footer-bottom"]}>
              Copyright © 2024 | All Rights Reserved. | Sitemap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooter;
