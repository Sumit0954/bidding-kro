import React, { useEffect, useState } from "react";
import styles from "./TransactionDetails.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import cn from "classnames";
import { dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const TransactionDetails = () => {
  const { transaction_id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

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
          setScreenLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactionDetails();
  }, [transaction_id]);

  if (screenLoader) {
    return <ScreenLoader />;
  }
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
                <Tooltip title={transactionDetails?.bid?.title}>
                  {truncateString(transactionDetails?.bid?.title, 30)}
                </Tooltip>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Company Name</h6>
              <p className={styles["col-data"]}>
                <NavLink
                  to={`/admin/companies/${transactionDetails?.company?.id}`}
                >
                  {truncateString(transactionDetails?.company?.name, 30)}
                </NavLink>
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
              <h6 className={styles["col-heading"]}>Transaction Date</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(transactionDetails?.created_at)}
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
