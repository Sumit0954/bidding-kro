import styles from './LoginBanner.module.scss'
import LoginBannerImg from '../../../assets/images/home/login-banner.jpg'


const LoginBanner = () => {
  return (
    <>
      <div className="row">
        <div className={styles['banner']}>
          <img src={LoginBannerImg} alt="" className={styles['banner-img']} />
        </div>
      </div>
    </>
  )
}

export default LoginBanner