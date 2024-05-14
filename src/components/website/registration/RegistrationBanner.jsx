import RegistrationBannnerImg from '../../../assets/images/home/registration-banner.png'
import styles from './RegistrationBanner.module.scss'

const RegistrationBanner = () => {
  return (
    <>
      <div className='row'>
        <div className={styles['banner']}>
          <img src={RegistrationBannnerImg} alt="RegistrationBannner" className={styles['banner-img']} />
        </div>
      </div>
    </>
  )
}

export default RegistrationBanner