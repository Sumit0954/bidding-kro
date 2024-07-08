import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./TransactionPayments.module.scss";
import { useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import cn from "classnames";

const TransactionPayments = () => {
  const { order_id } = useParams();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (order_id) {
      const getPayments = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            AdminApiUrls.GET_PAYMENTS + `${order_id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setPayments(response.data.items);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getPayments();
    }
  }, [order_id]);

  const dateConverter = (date) => {
    const newDate = new Date(date * 1000);
    return newDate.toLocaleDateString();
  };

  return (
    <>
      {payments?.length > 0 &&
        payments?.map((payment) => {
          return (
            <Accordion
              defaultExpanded
              square={true}
              classes={{ root: "custom-accordion" }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography classes={{ root: "custom-accordion-heading" }}>
                  {payment.id}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row">
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Razorpay Order Id</h6>
                    <p className={styles["col-data"]}>{payment.order_id}</p>
                  </div>
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Payment Method</h6>
                    <p
                      className={cn(
                        styles["col-data"],
                        styles["capitalize-data"]
                      )}
                    >
                      {payment.method}
                    </p>
                  </div>
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Payment Status</h6>
                    <p
                      className={cn(
                        styles["col-data"],
                        styles["capitalize-data"]
                      )}
                    >
                      {payment.status}
                    </p>
                  </div>
                </div>
                <Divider classes={{ root: "custom-divider" }} />
                <div className="row">
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Email</h6>
                    <p className={styles["col-data"]}>{payment.email}</p>
                  </div>
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Payment Date</h6>
                    <p className={styles["col-data"]}>
                      {dateConverter(payment.created_at)}
                    </p>
                  </div>
                  <div className="col">
                    <h6 className={styles["col-heading"]}>
                      Virtual Payment Address
                    </h6>
                    <p className={styles["col-data"]}>{payment.vpa}</p>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};

export default TransactionPayments;
