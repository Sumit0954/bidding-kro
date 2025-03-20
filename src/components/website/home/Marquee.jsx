import styles from "./Marquee.module.scss";
import { Gavel, LocalOffer, LocalShipping, Call } from "@mui/icons-material";

const BiddingKaroTagLines = () => {
  return (
    <div className={styles["marquee-wrapper"]}>
      <div className={styles["marquee-content"]}>
        <span>
          <Gavel className={styles.icon} />
          Digitalising Industrial Procurement- A smarter transparent approach
          &nbsp; | &nbsp;
        </span>
        <span>
          <LocalOffer className={styles.icon} />
          Automating Procurement process thereby saving time and costs. &nbsp; |
          &nbsp;
        </span>
      </div>
    </div>
  );
};

export default BiddingKaroTagLines;
