import React from "react";
import styles from "./ApprovalRequestCard.module.scss";
import cn from "classnames";
import stampIcon from "../../../assets/images/admin/companies/stamp.svg";

const ApprovalRequestCard = () => {
  return (
    <>
      <div className={styles["request-container"]}>
        <div className={cn("row", styles["request-head"])}>
          <img
            className={styles["stamp-icon"]}
            src={stampIcon}
            alt="stamp-icon"
          />
          <div className={cn("col", styles["name-section"])}>
            <p>Approval Request</p>
            <div className={styles["name-box"]}>
              <h4>Bombay Dyeing and Manufacturing</h4>
              <p
                className={cn(
                  "btn",
                  "button",
                  "pending",
                  styles["pending-btn"]
                )}
              >
                Pending
              </p>
            </div>
          </div>

          <div className={cn("col-4", styles["btn-container"])}>
            <button
              className={cn("btn", "button", "approve", styles["custom-btn"])}
            >
              Approve
            </button>
            <button
              className={cn("btn", "button", "reject", styles["custom-btn"])}
            >
              Reject
            </button>
          </div>
        </div>
        <div className={cn("row", styles["request-body"])}>
          <div className="col">
            <h6>Submitter</h6>
            <p>Arvind Kumar</p>
          </div>
          <div className="col">
            <h6>Date Submitted</h6>
            <p>Apr 9, 2024</p>
          </div>
          <div className="col">
            <h6>Approver</h6>
            <p>Virender Kumar</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalRequestCard;
