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

const Summary = ({ bidDetails }) => {
  return (
    <>
      {/* Summury */}
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
              <h6 className={styles["col-heading"]}>Product Quantity</h6>
              <p className={styles["col-data"]}>
                {parseInt(bidDetails?.product_quantity)}
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
            <div className="col">
              <h6 className={styles["col-heading"]}>Delivery Timeline</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(bidDetails?.delivery_date, false)}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Description */}
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.type === "description") {
                  return (
                    <Accordion
                      defaultExpanded
                      square={true}
                      classes={{
                        root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          classes={{ root: "custom-accordion-heading" }}
                        >
                          Amendment ({dateTimeFormatter(amendment?.created_at)})
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="row">
                          <p
                            className={styles["col-data"]}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(amendment.text),
                            }}
                          ></p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}

          <div className="row">
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bidDetails?.description),
              }}
            ></p>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Delivery Term  */}
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
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.type === "delivery_terms") {
                  return (
                    <Accordion
                      defaultExpanded
                      square={true}
                      classes={{
                        root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          classes={{ root: "custom-accordion-heading" }}
                        >
                          Amendment ({dateTimeFormatter(amendment?.created_at)})
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="row">
                          <p
                            className={styles["col-data"]}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                bidDetails?.delivery_terms
                              ),
                            }}
                          ></p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}

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

      {/* Payment Term */}
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
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.type === "payment_terms") {
                  return (
                    <Accordion
                      defaultExpanded
                      square={true}
                      classes={{
                        root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          classes={{ root: "custom-accordion-heading" }}
                        >
                          Amendment ({dateTimeFormatter(amendment?.created_at)})
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="row">
                          <p
                            className={styles["col-data"]}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                bidDetails?.payment_terms
                              ),
                            }}
                          ></p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}
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

      {/* Categories */}
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
          <Stack direction="row" flexWrap="wrap" gap="10px">
            {bidDetails?.category?.map((category) => {
              return <Chip label={category?.name} />;
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Eligibility Criteria */}
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
            {bidDetails?.amendment?.length > 0 &&
              bidDetails?.amendment
                ?.sort((latest, previous) => previous.id - latest.id)
                .map((amendment) => {
                  if (amendment.type === "eligiblity_criteria ") {
                    return (
                      <Accordion
                        defaultExpanded
                        square={true}
                        classes={{
                          root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography
                            classes={{ root: "custom-accordion-heading" }}
                          >
                            Amendment (
                            {dateTimeFormatter(amendment?.created_at)})
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="row">
                            <p
                              className={styles["col-data"]}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  bidDetails?.eligiblity_criteria
                                ),
                              }}
                            ></p>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })}
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

      {/* Technical Specification */}
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
            {bidDetails?.amendment?.length > 0 &&
              bidDetails?.amendment
                ?.sort((latest, previous) => previous.id - latest.id)
                .map((amendment) => {
                  if (amendment.type === "technical_specification") {
                    return (
                      <Accordion
                        defaultExpanded
                        square={true}
                        classes={{
                          root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography
                            classes={{ root: "custom-accordion-heading" }}
                          >
                            Amendment (
                            {dateTimeFormatter(amendment?.created_at)})
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
                    );
                  }
                })}

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
