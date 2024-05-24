import styles from './Banner.module.scss'
import HomeBanner from '../../../assets/images/website/home/home-banner.jpg'

const Banner = () => {
  return (
    <>
     <div className={styles["banner"]}>
        <img
          src={HomeBanner}
          alt="HomeBanner"
          className={styles["banner-img"]}
        />
      </div>
    </>
  )
}

export default Banner