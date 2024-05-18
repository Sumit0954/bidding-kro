import RegistrationBannnerImg from "../../../assets/images/website/home/registration-banner.png";
import styles from "./RegistrationBanner.module.scss";

const RegistrationBanner = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={RegistrationBannnerImg}
          alt="RegistrationBannner"
          className={styles["banner-img"]}
        />
      </div>
    </>
  );
};

export default RegistrationBanner;
