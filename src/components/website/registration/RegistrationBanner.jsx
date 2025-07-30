import RegistrationBannnerImg from "../../../assets/images/website/home/registration-banner.jpg";
import styles from "../contactus/Banner.module.scss";

const RegistrationBanner = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={RegistrationBannnerImg}
          alt="RegistrationBannner"
          className={styles["blog-banner-img"]}
        />
      </div>
    </>
  );
};

export default RegistrationBanner;
