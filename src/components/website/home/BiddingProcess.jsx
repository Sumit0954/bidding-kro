import styles from './BiddingProcess.module.scss'
import BiddingProcessImg from '../../../assets/images/website/home/Bidding Process1.png'
import BiddingProcessImg2 from '../../../assets/images/website/home/Bidding Process2.png'
import BiddingProcessImg3 from '../../../assets/images/website/home/Bidding Process3.png'
import BiddingProcessImg4 from '../../../assets/images/website/home/Bidding Process4.png'
import BiddingProcessImg5 from '../../../assets/images/website/home/Bidding Process5.png'


const BiddingProcess = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className={styles["box"]}>
              <div className="box-img">
                <img src={BiddingProcessImg} alt="" srcset="" className={styles["bidding-process-img"]} />
              </div>
              <div className={styles["box-head"]}>
                <p className={styles["step"]}>Step1</p>
              </div>
              <div className="box-body">
                <p className={styles["content"]}>Gathering Pre-requisites for conducting the Auction.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={styles["box"]}>
              <div className="box-img">
                <img src={BiddingProcessImg2} alt="" srcset="" className={styles["bidding-process-img"]} />
              </div>
              <div className={styles["box-head"]}>
                <p className={styles["step2"]}>Step2</p>
              </div>
              <div className="box-body">
                <p className={styles["content"]}>Design of strategy for a highly competitive bidding environment by ‘Auction Experts’ (AE).</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={styles["box"]}>
              <div className="box-img">
                <img src={BiddingProcessImg3} alt="" srcset="" className={styles["bidding-process-img"]} />
              </div>
              <div className={styles["box-head"]}>
                <p className={styles["step3"]}>Step3</p>
              </div>
              <div className="box-body">
                <p className={styles["content"]}>High supplier participation through well-structured training by ‘professional trainers’ (PT).</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={styles["box"]}>
              <div className="box-img">
                <img src={BiddingProcessImg4} alt="" srcset="" className={styles["bidding-process-img"]} />
              </div>
              <div className={styles["box-head"]}>
                <p className={styles["step4"]}>step4</p>
              </div>
              <div className="box-body">
                <p className={styles["content"]}>Conducting Live Auctions through synchronized efforts of ‘AE’ and ‘PT’.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={styles["box"]}>
              <div className="box-img">
                <img src={BiddingProcessImg5} alt="" srcset="" className={styles["bidding-process-img"]} />
              </div>
              <div className={styles["box-head"]}>
                <p className={styles["step5"]}>Step5</p>
              </div>
              <div className="box-body">
                <p className={styles["content"]}>Reports and Analysis for Future Strategy and Audit Compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BiddingProcess