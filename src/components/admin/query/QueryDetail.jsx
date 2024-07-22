import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./QueryDetail.module.scss";

const QueryDetail = () => {
  return (
    <>
      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Query Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Query No.</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Query Type</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Query Date</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>User Name</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>User Email</h6>
              <p className={styles["col-data"]}></p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>User Mobile</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />

          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Message</h6>
              <p className={styles["col-data"]}></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QueryDetail;
