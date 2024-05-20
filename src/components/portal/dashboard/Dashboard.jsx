import React from 'react'
import styles from './Dashboard.module.scss'
import cn from "classnames";

function Dashboard() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["dashboard-container"]}>
            <div className="row">
              <div className="col-lg-12">
                <p>Welcome, Nitish</p>
              </div>
              <div className="col-lg-12">
                <h3>Your application is being reviewed</h3>
              </div>
              <div className={cn("col-lg-12", styles['contentbox'])}>
                <p>Thank you for signing up with EBID. We are reviewing your application and will notify you once the review is complete. In the meantime you can update your profile and company profile details.</p>
              </div>
              <div className="col-lg-12">
                <button
                  type="button"
                  className={cn("btn", "button", styles['custom-btn'])}

                >
                  Update Business
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard