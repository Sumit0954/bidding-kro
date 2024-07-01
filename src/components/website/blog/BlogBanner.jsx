import styles from './BlogBanner.module.scss'
import BannerImg from '../../../assets/images/blog/blog-banner.jpg'

const Blog = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={BannerImg}
          alt="BlogBanner"
          className={styles["blog-banner-img"]}
        />
      </div>
    </>
  )
}

export default Blog