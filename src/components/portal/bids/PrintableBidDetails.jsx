import React, { forwardRef } from "react";
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
import { dateTimeFormatter } from "../../../helpers/formatter";
import DOMPurify from "dompurify";
import { convertFileSize, getLableByValue } from "../../../helpers/common";
import cn from "classnames";
import { NavLink } from "react-router-dom";

const PrintableBidDetails = forwardRef((props, ref) => {
  return (
    <div className="container-fluid" ref={ref}>
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["printable-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid ID</h6>
              <p className={styles["col-data"]}>
                {props?.bidDetails?.formatted_number}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>{props?.bidDetails?.title}</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Reserve Bid Price</h6>
              <p className={styles["col-data"]}>
                ₹ {props?.bidDetails?.reserved_price}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>
                {props?.bidDetails?.type_meta?.name}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Product Quantity</h6>
              <p className={styles["col-data"]}>
                {parseInt(props?.bidDetails?.product_quantity)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Unit</h6>
              <p className={styles["col-data"]}>
                {getLableByValue(props?.bidDetails?.product_unit)}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(props?.bidDetails?.bid_start_date)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(props?.bidDetails?.bid_end_date)}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Delivery Timeline</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(props?.bidDetails?.delivery_date, false)}
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
                  __html: DOMPurify.sanitize(props?.bidDetails?.description),
                }}
              ></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {props?.bidDetails?.amendment?.length > 0 && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["printable-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Amendments
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              {props?.bidDetails?.amendment?.map((amendment) => {
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
          root: `custom-accordion ${styles["printable-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Delivery Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props?.bidDetails?.delivery_terms),
              }}
            ></p>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["printable-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Payment Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props?.bidDetails?.payment_terms),
              }}
            ></p>
          </div>
        </AccordionDetails>
      </Accordion>

      {props?.bidDetails?.eligiblity_criteria && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["printable-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Eligibility Criteria
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <p
                className={styles["col-data"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    props?.bidDetails?.eligiblity_criteria
                  ),
                }}
              ></p>
            </div>
          </AccordionDetails>
        </Accordion>
      )}

      {props?.bidDetails?.technical_specification && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["printable-accordion"]}`,
          }}
        >
          <AccordionSummary>
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
                    props?.bidDetails?.technical_specification
                  ),
                }}
              ></p>
            </div>
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["printable-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Categories ({props?.bidDetails?.category?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" gap="10px">
            {props?.bidDetails?.category?.map((category) => {
              return <Chip label={category?.name} />;
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {props?.bidDetails?.question?.length > 0 && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["printable-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Questions For Suppliers
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {props?.bidDetails?.question?.map((question, index) => {
              return (
                <div className="row">
                  <p className={styles["col-data"]}>
                    <span>{`Question ${index + 1} - `}</span>
                    {question.text}
                  </p>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      )}

      {props?.bidDetails?.document?.length > 0 && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["printable-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Documents
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {props?.bidDetails?.document?.map((document, index) => {
              return (
                <>
                  <div className="row">
                    <div className="col">
                      <h6 className={styles["col-heading"]}>Document Name</h6>
                      <p className={styles["col-data"]}>
                        <NavLink to={document.file}>{document.name}</NavLink>
                      </p>
                    </div>
                    <div className="col">
                      <h6 className={styles["col-heading"]}>Document Type</h6>
                      <p className={styles["col-data"]}>{document.type}</p>
                    </div>
                    <div className="col">
                      <h6 className={styles["col-heading"]}>Document Size</h6>
                      <p className={styles["col-data"]}>
                        {convertFileSize(document.size)}
                      </p>
                    </div>
                    <div className="col">
                      <h6 className={styles["col-heading"]}>
                        Document Upload Date
                      </h6>
                      <p className={styles["col-data"]}>
                        {dateTimeFormatter(document.created_at)}
                      </p>
                    </div>
                  </div>
                  {index < props?.bidDetails?.document?.length - 1 && (
                    <Divider classes={{ root: "custom-divider" }} />
                  )}
                </>
              );
            })}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
});

export default PrintableBidDetails;
