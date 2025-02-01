import styles from "./Marquee.module.scss";
import { Gavel, LocalOffer, LocalShipping, Call } from "@mui/icons-material";

const Marquee = () => {
  return (
    <div className={styles["marquee-wrapper"]}>
      <div className={styles["marquee-content"]}>
        <span>
          <Gavel className={styles.icon} /> Live Bidding Open Now &nbsp; |
          &nbsp;
        </span>
        <span>
          <LocalOffer className={styles.icon} /> Get the Best Prices Instantly
          &nbsp; | &nbsp;
        </span>
        <span>
          <LocalShipping className={styles.icon} /> Fast & Secure Delivery
          &nbsp; | &nbsp;
        </span>
        <span>
          <Call className={styles.icon} /> Connect with Verified Suppliers!
        </span>
      </div>
    </div>
  );
};

export default Marquee;
