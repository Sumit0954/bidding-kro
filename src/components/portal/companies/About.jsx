import styles from './About.module.scss'
import React from "react";
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
import { dateTimeFormatter } from "../../../helpers/formatter";
import DOMPurify from "dompurify";
import { getLableByValue } from "../../../helpers/common";
import cn from "classnames";


const About = () => {



  return (

    <>
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
                <h6 className={styles["col-heading"]}>Company Name</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Website Url</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Organisation Type</h6>

              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Year of incorporation</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>No. of Employess</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>GST</h6>

              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Average Annual Revenue (last 3 years)</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Business Email</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Business Mobile</h6>

              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Description</h6>

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
              Owner info
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

              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Email</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>WhatsApp</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>GST</h6>

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
              Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={1}>
              {About?.category?.map((category) => {
                return <Chip label={category?.name} />;
              })}
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
              Contact(2)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Contact Person Name</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Designation</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Mobile</h6>

              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Email</h6>

              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>WhatsApp</h6>

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

              Address
            </Typography>
          </AccordionSummary>
          <AccordionDetails>


          </AccordionDetails>
        </Accordion>

      </>
    </>

  )
}

export default About