import styles from "./Services.module.scss";
import ServiceImg from "../../../assets/images/website/home/strategy.png";
import ServiceImg2 from "../../../assets/images/website/home/analysis.png";
import ServiceImg3 from "../../../assets/images/website/home/risk.png";
import cn from "classnames";

const Services = () => {
  return (
    <>
      <div className="container mt-5">
        <div className={cn("row", styles["services-row"])}>
          <div className="col-lg-4 col-12">
            <div className={styles["card"]}>
              <div>
                <img
                  src={ServiceImg}
                  alt="ServiceCardImage"
                  className={styles["service-img"]}
                />
              </div>
              <div>
                <h3 className={styles["card-heading"]}>
                  Improves Your Strategic Edge
                </h3>
                <p>
                  Bids prevents Maverick buying & facilitates insightful
                  Decisions to build your competitive edge
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className={styles["card"]}>
              <div>
                <img
                  src={ServiceImg2}
                  alt="ServiceCardImage"
                  className={styles["service-img"]}
                />
              </div>
              <div>
                <h3 className={styles["card-heading"]}>
                  Bids Delivers Quick ROI
                </h3>
                <p>
                  Bids prevents Maverick buying & facilitates insightful
                  Decisions to build your competitive edge
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className={styles["card"]}>
              <div>
                <img
                  src={ServiceImg3}
                  alt="ServiceCardImage"
                  className={styles["service-img"]}
                />
              </div>
              <div>
                <h3 className={styles["card-heading"]}>
                  Mitigates risks of adoption
                </h3>
                <p>
                  MavenVista business model for VENDX implementation & use is
                  tightly linked to adoption of the
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
