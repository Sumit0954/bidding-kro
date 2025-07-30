import LoginBannerImg from "../../../assets/images/website/home/login-banner.jpg";
import styles from "../contactus/Banner.module.scss";
const LoginBanner = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={LoginBannerImg}
          alt="LoginBanner"
          className={styles["blog-banner-img"]}
        />
      </div>
    </>
  );
};

export default LoginBanner;
