import styles from './ProcurementManagement.module.scss'
import ProcurementImg from '../../../assets/images/website/home/procurement-process.png'

const ProcurementManagement = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 ">
          <img src={ProcurementImg} alt="" srcset="" className={styles["procurement-img"]} />
        </div>
        <div className="col-lg-6 pt-5">
          <h2>Procurement Management Software</h2>
          <p>The procurement function has become complex than ever. To achieve cost and time saving, more and more organizations are automating their procurement process. Apart from cost and time saving, it is also vital to keep the spending under control and achieve a positive and strong supplier relationship. But, if your business is still relying on paper-based and manual procurement processes, you are missing out on the most vital benefits of procurement management software. </p>
          <p>The procurement function has become complex than ever. To achieve cost and time saving, more and more organizations are automating their procurement process. Apart from cost and time saving, it is also vital to keep the spending under control and achieve a positive and strong supplier relationship. But, if your business is still relying on paper-based and manual procurement processes, you are missing out on the most vital benefits of procurement management software. </p>
        </div>
      </div>
    </div>
  )
}

export default ProcurementManagement