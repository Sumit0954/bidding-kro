import styles from './BlogList.module.scss'
import cn from "classnames";
import BlogImg1 from '../../../assets/images/blog/blog-image (1).png'
import BlogImg2 from '../../../assets/images/blog/blog-image (2).png'
import BlogImg3 from '../../../assets/images/blog/blog-img-3.jpg'
import BlogImg4 from '../../../assets/images/blog/blog-image (4).png'
import BlogImg5 from '../../../assets/images/blog/bolg-list-img.jpg'


const BlogList = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={BlogImg1} alt="" srcset="" className={styles['blog-img']} />
          </div>
          <div className="col-lg-6">
            <div className={styles["blog-content"]}>
              <h2>BidsMadeEasy: Simplifying the Art of Winning Contracts</h2>
              <p>Welcome to BidsMadeEasy, your go-to resource for navigating the world of bidding systems. Whether you're a seasoned procurement professional or new to the game, our blog is designed to provide you with valuable insights, tips, and strategies to master the art of winning contracts through bidding systems. Join us as we delve into the intricacies of bid management, explore emerging trends, and share expert advice to help you streamline your bidding process and secure lucrative opportunities. Let's embark on this journey together and unlock the secrets to bidding success!</p>
            </div>

            <a href="/blogs/bidsmadeeasy-simplifying-the-art-of-winning-contracts" className={cn("btn", "button")}>CONTINUE</a>
          </div>




        </div>


      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className={styles["blog-content"]}>
              <h2>BidWise Insights: Navigating the World of Bidding Systems</h2>
              <p>Welcome to BidWise Insights, your trusted companion in the realm of bidding systems. In this blog, we'll unravel the complexities of bid management and procurement processes, providing you with actionable strategies and expert advice to enhance your bidding prowess. Whether you're a procurement professional, an entrepreneur seeking contracts, or simply curious about the world of bids, our aim is to empower you with the knowledge and tools needed to thrive in competitive bidding environments. Stay tuned for valuable insights, case studies.</p>
            </div>
            <a href="/blogs/bidwise-insights-navigating-the-world-of-bidding-systems" className={cn("btn", "button")}>CONTINUE</a>
          </div>
          <div className="col-lg-6">
            <img src={BlogImg2} alt="" srcset="" className={styles['blog-img']} />
          </div>



        </div>


      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={BlogImg3} alt="" srcset="" className={styles['blog-img']} />
          </div>

          <div className="col-lg-6">
            <div className={styles["blog-content"]}>
              <h2>BidBoost: Your Ultimate Guide to Bidding Systems</h2>

              <p>Welcome to BidBoost, where we elevate your bidding game to new heights! In this blog, we're diving deep into the world of bidding systems to equip you with the knowledge and strategies you need to succeed. Whether you're a seasoned bidder or just starting out, our goal is to provide you with actionable insights, practical tips, and industry trends that will empower you to win more contracts and grow your business. So, buckle up and get ready to supercharge your bidding efforts with BidBoost!</p>
            </div>
            <a href="/blogs/bidboost-your-ultimate-guide-to-bidding-systems" className={cn("btn", "button")}>CONTINUE</a>
          </div>




        </div>


      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className={styles["blog-content"]}>
              <h2>AuctionPro: Your Guide to Success in the Auction World</h2>

              <p>Welcome to AuctionPro, your comprehensive resource for navigating the dynamic world of auctions! Whether you're an experienced auctioneer, a seasoned bidder, or just curious about the auction process, our blog is here to provide you with valuable insights, tips, and strategies to succeed. From understanding different auction formats to mastering bidding techniques, we've got you covered. Join us as we explore the ins and outs of the auction world and help you achieve success at every step of the way.</p>
            </div>
            <a href="/blogs/auctionpro-your-guide-to-success-in-the-auction-world" className={cn("btn", "button")}>CONTINUE</a>
          </div>
          <div className="col-lg-6">
            <img src={BlogImg4} alt="" srcset="" className={styles['blog-img']} />
          </div>



        </div>


      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={BlogImg5} alt="" srcset="" className={styles['blog-img']} />
          </div>

          <div className="col-lg-6">
            <div className={styles["blog-content"]}>
              <h2>Auction Avenue: Your Pathway to Auction Success</h2>

              <p>Welcome to Auction Avenue, your ultimate destination for all things auctions! Whether you're a seasoned auctioneer, a curious bidder, or someone looking to learn more about the auction process, you've come to the right place. In this blog, we'll guide you through the exciting world of auctions, offering valuable insights, expert tips, and insider knowledge to help you succeed. From understanding different types of auctions to mastering bidding strategies, we've got everything you need to thrive in the auction world</p>
            </div>
            <a href="/blogs/auction-avenue-your-pathway-to-auction-success" className={cn("btn", "button")}>CONTINUE</a>
          </div>




        </div>


      </div>
    </>
  )
}

export default BlogList