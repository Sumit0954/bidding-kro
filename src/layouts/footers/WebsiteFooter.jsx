import styles from "./WebsiteFooter.module.scss";
import FooterLogo from "../../assets/images/common/footer-logo.png";
import instagramicon from "../../assets/images/website/home/footer svg-icon/instagram (1).svg";
import facebookicon from "../../assets/images/website/home/footer svg-icon/facebook.svg";
import linkdinicon from "../../assets/images/website/home/footer svg-icon/linkedin.svg";
import Youtubeicon from "../../assets/images/website/home/footer svg-icon/youtube.svg";

const WebsiteFooter = () => {
  return (
    <div className="container-fluid mt-5">
      {/* Social Section */}
      <div className={`row ${styles["social-content"]}`}>
        <div className="col-lg-6">
          <p>Get Connected with us on social networks</p>
        </div>
        <div className={`col-lg-6 ${styles["social-icons-container"]}`}>
          <img
            src={instagramicon}
            alt="Instagram"
            className={styles["footer-icon"]}
          />
          <img
            src={facebookicon}
            alt="Facebook"
            className={styles["footer-icon"]}
          />
          <img
            src={linkdinicon}
            alt="LinkedIn"
            className={styles["footer-icon"]}
          />
          <img
            src={Youtubeicon}
            alt="YouTube"
            className={styles["footer-icon"]}
          />
        </div>
      </div>

      {/* Footer Content */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <img
              src={FooterLogo}
              alt="Footer Logo"
              className={styles["footer-logo"]}
            />
          </div>
          <div className="col-lg-3 col-sm-6">
            <h3 className={styles["footer-heading"]}>Company</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Awards</a>
              </li>
              <li>
                <a href="#">Our Gallery</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <h3 className={styles["footer-heading"]}>Resource Centre</h3>
            <ul>
              <li>
                <a href="#">Case Studies</a>
              </li>
              <li>
                <a href="#">Announcements</a>
              </li>
              <li>
                <a href="/blogs">Blog</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <h3 className={styles["footer-heading"]}>Contact</h3>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Address :</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row">
          <div className={styles["line"]}></div>
          <div className="col-lg-12">
            <p className={styles["footer-bottom"]}>
              Copyright © 2024 | All Rights Reserved. | Sitemap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooter;
