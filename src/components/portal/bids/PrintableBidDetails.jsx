import { forwardRef, useState } from "react";
import styles from "./tabs/Summary.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { products_Column } from "../../../elements/CustomDataTable/PortalColumnData";
import { ExpandMore } from "@mui/icons-material";
import DOMPurify from "../../../utils/DomPurifier";
const PrintableBidDetails = forwardRef(({ bidDetails }, ref) => {
  const [showSpecification, setShowSpecification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsColumns = products_Column({
    setShowSpecification,
    setSelectedProduct,
  });
  return (
    <div className="container-fluid" ref={ref}>
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
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
                {bidDetails?.formatted_number}
              </p>
            </div>

            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>
                {" "}
                {truncateString(bidDetails?.title, 30)}
              </p>
            </div>

            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>
                {bidDetails?.type}
                {bidDetails?.type === "L1"
                  ? " ( Commercial Bid )"
                  : " ( Quality & Cost Based Selection )"}
              </p>{" "}
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>
                Bid Opening Date and Time
              </h6>
              <p className={styles["col-data"]}>
                {bidDetails?.bid_close_date
                  ? dateTimeFormatter(bidDetails?.bid_open_date)
                  : "-"}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>
                Bid Closing Date and Time
              </h6>
              <p className={styles["col-data"]}>
                {bidDetails?.bid_close_date
                  ? dateTimeFormatter(bidDetails?.bid_close_date)
                  : "-"}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>
                Bid Created Date and Time
              </h6>
              <p className={styles["col-data"]}>
                {`${dateTimeFormatter(bidDetails?.created_at)}`}
              </p>
            </div>
          </div>
          {bidDetails.type === "QCBS" && (
            // type === "invited" &&
            // bidDetails?.participant?.sample?.invite_status === "accepted" &&
            <>
              <Divider classes={{ root: "custom-divider" }} />
              <div className="row">
                <div className="col">
                  <h6 className={styles["col-heading"]}>
                    Sample Receiving Opening Date
                  </h6>
                  <p className={styles["col-data"]}>
                    {bidDetails?.sample_receive_start_date
                      ? dateTimeFormatter(bidDetails?.sample_receive_start_date)
                      : "-"}
                  </p>
                </div>
                <div className="col">
                  <h6 className={styles["col-heading"]}>
                    Sample Receiving Closing Date
                  </h6>
                  <p className={styles["col-data"]}>
                    {bidDetails?.sample_receive_end_date
                      ? dateTimeFormatter(bidDetails?.sample_receive_end_date)
                      : "-"}
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </>
          )}
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Total reserved price</h6>
              <p className={styles["col-data"]}>
                ₹ {bidDetails?.total_reserved_price}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Total Bid amount</h6>
              <p className={styles["col-data"]}>
                ₹{" "}
                {bidDetails?.total_bid_amount !== null
                  ? bidDetails?.total_bid_amount
                  : "-"}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Total Saving</h6>
              <p className={styles["col-data"]}>
                {" "}
                ₹
                {bidDetails?.total_bid_amount !== null
                  ? bidDetails?.total_reserved_price -
                    bidDetails?.total_bid_amount
                  : " -"}
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
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.field_name === "description") {
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

                return null;
              })}

          <div className="row">
            <div
              className={styles["col-data"]}
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bidDetails?.description),
              }}
            ></div>
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
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Delivery Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.field_name === "delivery_terms") {
                  return (
                    <Accordion
                      defaultExpanded
                      square={true}
                      classes={{
                        root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                      }}
                    >
                      <AccordionSummary>
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

                return null;
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

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Payment Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {bidDetails?.amendment?.length > 0 &&
            bidDetails?.amendment
              ?.sort((latest, previous) => previous.id - latest.id)
              .map((amendment) => {
                if (amendment.field_name === "payment_terms") {
                  return (
                    <Accordion
                      defaultExpanded
                      square={true}
                      classes={{
                        root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                      }}
                    >
                      <AccordionSummary>
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

                return null;
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

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Products
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable
            propsColumn={productsColumns}
            propsData={bidDetails?.product || []}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary>
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

      {bidDetails?.eligiblity_criteria && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Eligibility Criteria
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bidDetails?.amendment?.length > 0 &&
              bidDetails?.amendment
                ?.sort((latest, previous) => previous.id - latest.id)
                .map((amendment) => {
                  if (amendment.field_name === "eligiblity_criteria ") {
                    return (
                      <Accordion
                        defaultExpanded
                        square={true}
                        classes={{
                          root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                        }}
                      >
                        <AccordionSummary>
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
                                __html: DOMPurify.sanitize(amendment?.text),
                              }}
                            ></p>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }

                  return null;
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

      {bidDetails?.technical_specification && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Technical Specification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bidDetails?.amendment?.length > 0 &&
              bidDetails?.amendment
                ?.sort((latest, previous) => previous.id - latest.id)
                .map((amendment) => {
                  if (amendment.field_name === "technical_specification") {
                    return (
                      <Accordion
                        defaultExpanded
                        square={true}
                        classes={{
                          root: `custom-accordion ${styles["bids-detail-accordion"]} ${styles["nested-accordion-heading"]}`,
                        }}
                      >
                        <AccordionSummary>
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
                                __html: DOMPurify.sanitize(amendment?.text),
                              }}
                            ></p>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }

                  return null;
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
    </div>
  );
});

export default PrintableBidDetails;
