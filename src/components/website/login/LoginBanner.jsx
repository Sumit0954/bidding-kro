import styles from "./LoginBanner.module.scss";
import LoginBannerImg from "../../../assets/images/home/login-banner.jpg";

const LoginBanner = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={LoginBannerImg}
          alt="LoginBanner"
          className={styles["banner-img"]}
        />
      </div>
    </>
  );
};

export default LoginBanner;
