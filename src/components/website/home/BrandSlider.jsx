import styles from './BrandSlider.module.scss'
import Slider from "react-slick";
import sliderLogo from '../../../assets/images/website/home/slider-logo.png'
import sliderLogo2 from '../../../assets/images/website/home/slider-logo2.png'
import sliderLogo3 from '../../../assets/images/website/home/slider-logo3.png'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const BrandSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className={styles['slider-heading']}>Customers Success Stories</h2>

        <Slider {...settings}>
          <div className={styles['slider-sec']}>
            <div className={styles['content']}>
              <h3 className={styles['heading']}>Intas Pharmaceuticals Ltd</h3>
              <p className={styles['sub-heading']}>‘’We are happy to mention that MavenVista has successfully <br />  integrated its comprehensive e-sourcing solution, VENDX with  SAP version ECC 6.0 @Intas Pharmaceuticals Ltd.’’</p>
              <div className="bottom-content">
                <h6 class="name">Ms. Christina Naidu</h6>
                <span>Head – Procurement &amp; CSR</span>
              </div>
            </div>
            <div >
              <img src={sliderLogo} alt="" srcset="" className={styles["slider-img"]} />
            </div>



          </div>


          <div className={styles['slider-sec']}>
            <div className={styles['content']}>
              <h3 className={styles['heading']}>Danone</h3>
              <p className={styles['sub-heading']}>‘’Our experience with MavenVista team &amp; VENDX Auction platform has been very satisfying in all aspects. This has resulted into superior price discovery leading to cost reduction’’</p>
              <div className="bottom-content">
                <h6 class="name">Mr. Sanjay Jumani</h6>
                <span>Sr Manager Purchase</span>
              </div>
            </div>
            <div >
              <img src={sliderLogo2} alt="" srcset="" className={styles["slider-img"]} />
            </div>



          </div>


          <div className={styles['slider-sec']}>
            <div className={styles['content']}>
              <h3 className={styles['heading']}>Granules India Limited</h3>
              <p className={styles['sub-heading']}>‘’Hereby, Granules India Limited have reviewed the features and functions for the PR to DA and agree that they are appropriate to our business area and attest that Granules India Limited was able to perform all the expected job function tasks and activities normally.’’</p>
              <div className="bottom-content">
                <h6 class="name">Mr. K.B Ravi</h6>
                <span>General Manager</span>
              </div>
            </div>
            <div >
              <img src={sliderLogo3} alt="" srcset="" className={styles["slider-img"]} />
            </div>



          </div>


        </Slider>
      </div>
    </>
  )
}

export default BrandSlider