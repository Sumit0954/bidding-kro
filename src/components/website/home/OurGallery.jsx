import styles from "./OurGallery.module.scss";
import cn from "classnames";
import GalleryImg from "../../../assets/images/website/home/gallery_iamge_One.png";
import GalleryImg2 from "../../../assets/images/website/home/gallery_iamge_two.png";
import GalleryImg3 from "../../../assets/images/website/home/our_gallery.png";

const OurGallery = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className={cn("col-lg-6", styles["content-column"])}>
            <div>
              <h2>Our Gallery</h2>
              <p>We are not a team because we work together.</p>
              <p>
                We are a team because we respect, trust and care for each other.
              </p>
              <button className="btn, button">View More</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles["image-section"]}>
              <div className={styles["upper-image"]}>
                <div className={styles["gallery-image"]}>
                  <img src={GalleryImg} alt="" />
                </div>
                <div className={styles["gallery-image"]}>
                  <img src={GalleryImg2} alt="" />
                </div>
              </div>
              <div className={styles["lower-image"]}>
                <img src={GalleryImg3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurGallery;
