import React, { useEffect, useState } from "react";
import styles from "./TransactionDetails.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import cn from "classnames";

const TransactionDetails = () => {
  const { transaction_id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState();

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/transactions"
      style={{ textDecoration: "none" }}
    >
      Transactions
    </NavLink>,

    <Typography key="2" color="text.primary">
      {transactionDetails?.formatted_number}
    </Typography>,
  ];

  useEffect(() => {
    const getTransactionDetails = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          AdminApiUrls.TRANSACTION_DETAILS + `${transaction_id}/`,
          "",
          true
        );
        if (response.status === 200) {
          setTransactionDetails(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactionDetails();
  }, [transaction_id]);

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>

      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Bid Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Id</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.bid?.formatted_number}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.bid?.title}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Owner Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Owner Name</h6>
              <p className={styles["col-data"]}>
                {`${transactionDetails?.customer?.first_name} ${transactionDetails?.customer?.last_name}`}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.customer?.profile?.designation}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.customer?.mobile_number}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.customer?.email}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.customer?.profile?.whatsapp_number}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Transaction
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Transction Id</h6>
              <p className={styles["col-data"]}>
                {transactionDetails?.formatted_number}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Order Id</h6>
              <p className={styles["col-data"]}>
                <NavLink
                  to={`/admin/transactions/payments/${transactionDetails?.razorpay_order_id}`}
                >
                  {transactionDetails?.razorpay_order_id}
                </NavLink>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Amount</h6>
              <p className={styles["col-data"]}>
                Rs. {transactionDetails?.amount}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Status</h6>
              <p
                className={cn(
                  styles["col-data"],
                  "status-cloumn",
                  `${transactionDetails?.status}`
                )}
              >
                {transactionDetails?.status}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TransactionDetails;
