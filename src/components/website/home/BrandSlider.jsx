import styles from './BrandSlider.module.scss'
import Slider from "react-slick";
import sliderImg from '../../../assets/images/website/home/slider-img.png'
import sliderLogo from '../../../assets/images/website/home/slider-img.png'
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
      <div className="container m-5">
        <h2>Customers Success Stories</h2>

        <Slider {...settings}>
          <div className={styles['slider-sec']}>
            <div className="content">
              <h3>Intas Pharmaceuticals Ltd</h3>
              <p>‘’We are happy to mention that MavenVista has successfully integrated its comprehensive e-sourcing solution, VENDX with SAP version ECC 6.0 @Intas Pharmaceuticals Ltd.’’</p>
            </div>
            <div className={styles["slider-img"]}>
              <img src={sliderLogo} alt="" srcset="" />
            </div>

          </div>

          {/* <div >
            <img src={sliderImg} alt="" className={styles['slider-img']} />
          </div>

          <div >
            <img src={sliderImg} alt="" className={styles['slider-img']} />
          </div> */}

        </Slider>
      </div>
    </>
  )
}

export default BrandSlider