import styles from './OurGallery.module.scss'
import cn from "classnames";
import GalleryImg from '../../../assets/images/website/home/gallery_iamge_One.png'
import GalleryImg2 from '../../../assets/images/website/home/gallery_iamge_two.png'
import GalleryImg3 from '../../../assets/images/website/home/our_gallery.png'

const OurGallery = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className={styles["gallery-heading"]}>
              <h2>Our Gallery</h2>
              <p>We are not a team because we work together.</p>
              <p>We are a team because we respect, trust and care for each other.</p>
              <button className={cn("btn", "button")}>View More</button>

            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles["img-card"]}>
              <img src={GalleryImg} alt="" srcset="" className={styles["card-img1"]} />
              <img src={GalleryImg2} alt="" srcset="" className={styles["card-img2"]} />
            </div>
            <div className="card-img2">
              <img src={GalleryImg3} alt="" srcset="" className={styles["card-img3"]} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurGallery