import React from "react";
import styles from "./Summary.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Summary = () => {
  return (
    <>
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid ID</h6>
              <p className={styles["col-data"]}>EB24000036</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>Supply of Cotton Material</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Reserve Bid Price</h6>
              <p className={styles["col-data"]}>₹ 3500</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>L1 Bid</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
              <p className={styles["col-data"]}>Apr 2, 2024 12:00 AM</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
              <p className={styles["col-data"]}>Apr 15, 2024 12:00 AM</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Product Quantity</h6>
              <p className={styles["col-data"]}>10</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Delivery Timeline</h6>
              <p className={styles["col-data"]}>May 18, 2024 2:00 AM</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Unit</h6>
              <p className={styles["col-data"]}>Meters</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Description</h6>
              <p className={styles["col-data"]}>
                <ul>
                  <li>
                    Objective: Procurement of cotton material to meet
                    manufacturing needs.
                  </li>
                  <li>
                    Invitation: Seeking proposals from qualified suppliers for
                    premium-grade cotton fabric.
                  </li>
                  <li>
                    Specifications: Suppliers must adhere to predefined
                    specifications and industry standards.
                  </li>
                  <li>
                    Partnership: Aim to establish a mutually beneficial
                    partnership with the selected supplier.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Amendments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p className={styles["col-data"]}>
              <h6 className={styles["col-heading"]}>May 18, 2024 2:00 AM</h6>
              <ul>
                <li>
                  Objective: Procurement of cotton material to meet
                  manufacturing needs.
                </li>
                <li>
                  Invitation: Seeking proposals from qualified suppliers for
                  premium-grade cotton fabric.
                </li>
              </ul>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Payment Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p className={styles["col-data"]}>
              <ul>
                <li>
                  Objective: Procurement of cotton material to meet
                  manufacturing needs.
                </li>
                <li>
                  Invitation: Seeking proposals from qualified suppliers for
                  premium-grade cotton fabric.
                </li>
                <li>
                  Specifications: Suppliers must adhere to predefined
                  specifications and industry standards.
                </li>
                <li>
                  Partnership: Aim to establish a mutually beneficial
                  partnership with the selected supplier.
                </li>
              </ul>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
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
              <p className={styles["col-data"]}>Arvind Kumar</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
              <p className={styles["col-data"]}>Owner</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}>
                <a href="tel:+91-9999999999">+91-9999999999</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}>
                <a href="mailto:arvind@gmail.com">info@arvind.in</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>+91-9999999999</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Categories (3)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>
            <Chip label="Men’s Apparel" />
            <Chip label="Child’s Apparel" />
            <Chip label="Women’s Apparel" />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Eligibility Criteria
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p className={styles["col-data"]}>
              <ul>
                <li>
                  Valid Business Registration: Suppliers must hold a current and
                  valid business registration.
                </li>
                <li>
                  Experience: Demonstrated experience in procuring and supplying
                  cotton material, with evidence of successful past contracts.
                </li>
                <li>
                  Financial Stability: Evidence of financial stability,
                  including solvency and capacity to handle the proposed
                  contract.
                </li>
                <li>
                  Compliance: Compliance with all relevant legal and regulatory
                  requirements.
                </li>
              </ul>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Technical Specification
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p className={styles["col-data"]}>
              <ol>
                <li>Material Composition: High-quality 100% cotton fabric.</li>
                <li>
                  Weight: Minimum weight of [insert weight] grams per square
                  meter (GSM).
                </li>
                <li>Weave: Plain weave, ensuring durability and comfort.</li>
                <li>Color: White or as per organization's requirements.</li>
                <li>Width: Standard width of [insert width] inches.</li>
              </ol>
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Summary;
