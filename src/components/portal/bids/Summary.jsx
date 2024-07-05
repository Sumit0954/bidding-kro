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
import { dateTimeFormatter } from "../../../helpers/formatter";
import DOMPurify from "dompurify";
import { getLableByValue } from "../../../helpers/common";
import cn from "classnames";

const Summary = ({ bidDetails }) => {
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
              <p className={styles["col-data"]}>
                {bidDetails?.formatted_number}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>{bidDetails?.title}</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Reserve Bid Price</h6>
              <p className={styles["col-data"]}>
                ₹ {bidDetails?.reserved_price}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>
                {bidDetails?.type_meta?.name}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(bidDetails?.bid_start_date)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(bidDetails?.bid_end_date)}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Product Quantity</h6>
              <p className={styles["col-data"]}>
                {parseInt(bidDetails?.product_quantity)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Delivery Timeline</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(bidDetails?.delivery_date, false)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Unit</h6>
              <p className={styles["col-data"]}>
                {getLableByValue(bidDetails?.product_unit)}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Description</h6>
              <p
                className={styles["col-data"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bidDetails?.description),
                }}
              ></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {bidDetails?.amendment?.length > 0 && (
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
              {bidDetails?.amendment?.map((amendment) => {
                return (
                  <>
                    <h6 className={styles["col-heading"]}>
                      {dateTimeFormatter(amendment?.created_at)}
                    </h6>
                    <p
                      className={cn(
                        styles["col-data"],
                        styles["amendment-data"]
                      )}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(amendment?.text),
                      }}
                    ></p>
                  </>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Delivery Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bidDetails?.delivery_terms),
              }}
            ></p>
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
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bidDetails?.payment_terms),
              }}
            ></p>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
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
      </Accordion> */}

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Categories ({bidDetails?.category?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>
            {bidDetails?.category?.map((category) => {
              return <Chip label={category?.name} />;
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {bidDetails?.eligiblity_criteria && (
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
              <p
                className={styles["col-data"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bidDetails?.eligiblity_criteria),
                }}
              ></p>
            </div>
          </AccordionDetails>
        </Accordion>
      )}

      {bidDetails?.technical_specification && (
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
              <p
                className={styles["col-data"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    bidDetails?.technical_specification
                  ),
                }}
              ></p>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default Summary;
