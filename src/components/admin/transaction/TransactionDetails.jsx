import React, { useState } from "react";
import styles from "./TransactionDetails.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

const TransactionDetails = () => {
  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/blogs"
      style={{ textDecoration: "none" }}
    >
      Transactions
    </NavLink>,

    <Typography key="2" color="text.primary">
      EB24000036
    </Typography>,
  ];

  const [expanded, setExpanded] = useState("Summary");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>

      <Accordion
        expanded={expanded === "Bid Details"}
        onChange={handleChange("Bid Details")}
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
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "Owner Info"}
        onChange={handleChange("Owner Info")}
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
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "Payment"}
        onChange={handleChange("Payment")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Payment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Transction Id</h6>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Order Id</h6>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Amount</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Status</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TransactionDetails;
