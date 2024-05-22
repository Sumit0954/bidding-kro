import React from "react";
import styles from "./CompanyDetail.module.scss";
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

const CompanyDetail = () => {
  return (
    <>
      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Company Name</h6>
              <p className={styles["col-data"]}>Arvind Limitied</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Website url</h6>
              <p className={styles["col-data"]}>
                <a href="https://www.arvind.com">https://www.arvind.com</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Organisation Type</h6>
              <p className={styles["col-data"]}>Private Company (LTD.)</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Year of Incorporation</h6>
              <p className={styles["col-data"]}>1931</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>No. of Employess</h6>
              <p className={styles["col-data"]}>50-150</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>GST</h6>
              <p className={styles["col-data"]}>7TAZLY4056Q0Z5</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>
                Average Annual Reveue (last 3 years)
              </h6>
              <p className={styles["col-data"]}>4,85,633.00</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Business Email</h6>
              <p className={styles["col-data"]}>
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Business Mobile</h6>
              <p className={styles["col-data"]}>
                <a href="tel:+91-9999999999">+91-9999999999</a>
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Description</h6>
              <p className={styles["col-data"]}>
                Objective: Procurement of cotton material to meet manufacturing
                needs. Invitation: Seeking proposals from qualified suppliers
                for premium-grade cotton fabric. Specifications: Suppliers must
                adhere to predefined specifications and industry standards.
                Partnership: Aim to establish a mutually beneficial partnership
                with the selected supplier.
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
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
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
        classes={{ root: "custom-accordion" }}
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
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Contacts (2)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Contact Person Name</h6>
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
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>+91-9999999999</p>
            </div>
          </div>

          <Divider classes={{ root: "custom-divider" }} />

          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Contact Person Name</h6>
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
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
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
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Addresses (2)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Address Line 1</h6>
              <p className={styles["col-data"]}>Naroda Road, Near Chamunda Bridge, Ahmedabad – 380 025, Gujarat, India.</p>
            </div>
          </div>

          <Divider classes={{ root: "custom-divider" }} />

          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Address Line 2</h6>
              <p className={styles["col-data"]}>Santej Road, Near Khatraj, Taluka: Kalol Gujarat, India - Gandhinagar - 382721</p>
            </div>
            
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CompanyDetail;
