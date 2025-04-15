import styles from "./Banner.module.scss";
import BannerImg from "../../../assets/images/website/home/contact-us-banner.jpg";

const Banner = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={BannerImg}
          alt="BlogBanner"
          className={styles["blog-banner-img"]}
        />
      </div>
    </>
  );
};

export default Banner;
