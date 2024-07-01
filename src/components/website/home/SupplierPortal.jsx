import styles from './SupplierPortal.module.scss'
import SupplierImg from '../../../assets/images/website/home/supplier-portal-01.png'

const SupplierPortal = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={SupplierImg} alt="SupplierPortalImage" className={styles["supplier-portal-img"]} />

          </div>
          <div className="col-lg-6">
            <div className={styles["supplier-content"]}>
              <h2>VENDX Supplier Portal</h2>
              <h5>Comprehensive Supplier Directory</h5>
              <p className={styles["pragrapg-content"]}>VENDX Supplier Portal is the state of art Supplier Information Management platform to determine capabilities & risks pertaining to each of the suppliers of the organization & also invite new suppliers specific to a category with relevant desired capabilities.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupplierPortal