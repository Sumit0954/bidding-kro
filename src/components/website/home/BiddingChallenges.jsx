import styles from './BiddingChallenges.module.scss'
import BiddingImg from '../../../assets/images/website/home/auction-challanges-1.png'

const BiddingChallenges = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h2 className={styles['main-heading']}>Challenges Organizations Face About Bidding Process</h2>
            <p>Challenge in building Auctioning Strategy skills and retaining the same</p>
            <p>Risk of complacency in the design of Auction strategy as it becomes a routine process</p>
            <p>Lack of access to different auctioning strategies adopted across different industries</p>
            <p>Absence of structured training and support process for suppliers</p>
            <p>Non-availability of benchmark data for designing most appropriate auctioning strategy</p>
          </div>
          <div className="col-lg-6">
            <img src={BiddingImg} alt="" className={styles["bidding-img"]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BiddingChallenges