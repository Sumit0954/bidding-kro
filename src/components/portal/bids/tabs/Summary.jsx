import React, { useContext, useEffect, useState } from "react";
import styles from "./Summary.module.scss";
import cn from "classnames";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { dateTimeFormatter } from "../../../../helpers/formatter";
import DOMPurify from "dompurify";
import { getLableByValue } from "../../../../helpers/common";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import {
  l1_participants_column,
  products_Column,
} from "../../../../elements/CustomDataTable/PortalColumnData";
import { AlertContext } from "../../../../contexts/AlertProvider";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
import { useLocation } from "react-router-dom";
import ProductSpecification from "../../../../elements/CustomModal/ProductSpecificationModal";
import ProductSpecificationModal from "../../../../elements/CustomModal/ProductSpecificationModal";

const Summary = ({ bidDetails }) => {
  const [participantDetail, setParticipantDetail] = useState({});
  const { setAlert } = useContext(AlertContext);
  const [showSpecification, setShowSpecification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    id: null,
  });
  const type = new URLSearchParams(useLocation().search).get("type");

  useEffect(() => {
    if (bidDetails?.id) {
      const getParticipants = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.PARTICIPANTS_LIST + `${bidDetails?.id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setParticipantDetail(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getParticipants();
    }
  }, [bidDetails]);
  const revokeParticipant = async (company_id) => {
    try {
      const response = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.REVOKE_PARTICIPANT + `${bidDetails?.id}/`,
        { company: company_id },
        true
      );
      if (response.status === 204) {
        setAlert({
          isVisible: true,
          message: "Participants Revoked Successfully",
          severity: "success",
        });
        setDeleteDetails({ open: false, title: "", message: "", id: null });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      revokeParticipant(deleteDetails.id);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", id: null });
    }
  };

  const productsColumns = products_Column({
    setShowSpecification,
    setSelectedProduct,
  });

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
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>{bidDetails?.type}</p>
            </div>
          </div>
          {/* <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>
                {bidDetails?.type}
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
          </div> */}
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
              <p className={styles["col-data"]}>
                {bidDetails?.bid_close_date
                  ? dateTimeFormatter(bidDetails?.bid_open_date)
                  : "-"}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
              <p className={styles["col-data"]}>
                {bidDetails?.bid_close_date
                  ? dateTimeFormatter(bidDetails?.bid_close_date)
                  : "-"}
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
                if (amendment.field_name === "delivery_terms") {
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
                if (amendment.field_name === "payment_terms") {
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
            <p
              className={styles["col-data"]}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bidDetails?.payment_terms),
              }}
            ></p>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Products list */}

      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["bids-detail-accordion"]}`,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
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
                  if (amendment.field_name === "eligiblity_criteria ") {
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
                  if (amendment.field_name === "technical_specification") {
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

      {/* Note Tagsline for user started */}
      <div className="container-fluid">
        <div className={styles["blue-container"]}>
          <div className={styles["note-header"]}>
            Note: Flexibility at Your Fingertips
          </div>
          <div className={styles["note-description"]}>
            At Bidding Kro, we understand that circumstances can change. That's
            why we've made it easy for you to manage your bids with complete
            flexibility:
          </div>
          <div className={cn("mt-3", styles["note-list"])}>
            <ul>
              <li>
                <strong>Edit Bids:</strong> After creating a bid, you have a
                24-hour window to make any necessary edits. Whether it's
                adjusting the amount or changing the terms, ensure your bid is
                just right within this time frame.
              </li>
              <li>
                <strong>Make Amendments:</strong> Once the initial 24-hour edit
                period is over, you can still make amendments for another 24
                hours. This allows you to fine-tune your bid even further before
                it becomes final.
              </li>
              <li>
                <strong>Cancel Bids:</strong> If you need to withdraw your bid,
                you can cancel it anytime before it goes live. You have up to 24
                hours to cancel the bid, giving you the flexibility to
                reconsider your decisions.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Note Tagsline for user ended */}

      {/* {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleDeleteConfirmation}
          action={addAction}
        />
      )} */}

      {showSpecification && (
        <ProductSpecificationModal
          showSpecification={showSpecification}
          setShowSpecification={setShowSpecification}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default Summary;
