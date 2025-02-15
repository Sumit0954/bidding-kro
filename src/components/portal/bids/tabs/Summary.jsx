import React, { useContext, useEffect, useState } from "react";
// import company_log from ""
import styles from "./Summary.module.scss";
import cn from "classnames";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  StepConnector,
  TableCell,
  Typography,
} from "@mui/material";
import { ExpandMore, HourglassEmpty } from "@mui/icons-material";
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
import { useLocation, useNavigate } from "react-router-dom";
import ProductSpecification from "../../../../elements/CustomModal/ProductSpecificationModal";
import ProductSpecificationModal from "../../../../elements/CustomModal/ProductSpecificationModal";
import {
  CheckCircleOutline,
  CancelOutlined,
  GroupAdd,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../store/tabSlice";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";

const Summary = ({ bidDetails }) => {
  const [participantDetail, setParticipantDetail] = useState({});
  const { setAlert } = useContext(AlertContext);
  const [showSpecification, setShowSpecification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screenLoader, setScreenLoader] = useState(true);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    id: null,
  });
  const type = new URLSearchParams(useLocation().search).get("type");
  const navigate = useNavigate();
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
  }, [bidDetails, bidDetails?.participant?.status]);
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

  const truncatelength = (title, maxlength) => {
    return title?.length > maxlength
      ? title.substring(0, maxlength) + "..."
      : title;
  };

  const dispatch = useDispatch();

  const handleViewRequestClick = (tabvalue) => {
    dispatch(setActiveTab(tabvalue)); // Set the active tab
  };

  let steps = [];
  if (bidDetails.type === "L1") {
    steps = [
      {
        label: "Commercial Bid Invite",
        icon: (
          <GroupAdd
            style={{
              color: `${
                bidDetails?.participant?.status === "accepted" ||
                bidDetails?.participant?.status === "declined" ||
                bidDetails?.participant?.status === "revoked" ||
                bidDetails?.participant?.status === "pending" ||
                bidDetails?.participant?.status === "participated" ||
                bidDetails?.participant?.status === "awarded"
                  ? "green"
                  : "#FFC107"
              }`,
            }}
          />
        ),
        status: "complete",
      },
      {
        label: `${
          bidDetails?.participant?.status === "accepted" ||
          bidDetails?.participant?.status === "participated" ||
          bidDetails?.participant?.status === "awarded"
            ? "Accepted"
            : bidDetails?.participant?.status === "declined"
            ? "Declined"
            : bidDetails?.participant?.status === "revoked"
            ? "Accepted"
            : "Pending"
        }`,
        icon:
          bidDetails?.participant?.status === "accepted" ||
          bidDetails?.participant?.status === "participated" ||
          bidDetails?.participant?.status === "awarded" ? (
            <CheckCircleOutline style={{ color: "green" }} />
          ) : bidDetails?.participant?.status === "declined" ? (
            <CancelOutlined style={{ color: "red" }} />
          ) : bidDetails?.participant?.status === "revoked" ? (
            <CheckCircleOutline style={{ color: "green" }} />
          ) : (
            <HourglassEmpty style={{ color: "#FFC107" }} />
          ),
        status: "complete",
      },
      ...(bidDetails?.participant?.status === "revoked"
        ? [
            {
              label: "Revoked",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
      ...(bidDetails?.status === "cancelled"
        ? [
            {
              label: "Cancelled",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status === "participated" ||
      bidDetails?.participant?.status === "awarded"
        ? [
            {
              label: "Participated",
              icon: <CheckCircleOutline style={{ color: "green" }} />,
              status: "success",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status === "awarded"
        ? [
            {
              label: "Awarded",
              icon: <CheckCircleOutline style={{ color: "green" }} />,
              status: "success",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status !== "awarded" &&
      bidDetails?.status === "completed"
        ? [
            {
              label: "Not Awarded",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
    ];
  } else {
    steps = [
      {
        label: "Sample Bid Invited",
        icon: (
          <GroupAdd
            style={{
              color: `${
                bidDetails?.participant?.status === "accepted" ||
                bidDetails?.participant?.status === "declined" ||
                bidDetails?.participant?.status === "revoked" ||
                bidDetails?.participant?.status === "pending" ||
                bidDetails?.participant?.status === "participated" ||
                bidDetails?.participant?.status === "awarded"
                  ? "green"
                  : "grey"
              }`,
            }}
          />
        ),
        status: "complete",
      },
      {
        label: `${
          bidDetails?.participant?.sample?.invite_status === "accepted"
            ? "Accepted"
            : bidDetails?.participant?.sample?.invite_status === "declined"
            ? "Declined"
            : bidDetails?.participant?.status === "revoked"
            ? "Accepted"
            : "Pending"
        }`,
        icon:
          bidDetails?.participant?.sample?.invite_status === "accepted" ? (
            <CheckCircleOutline style={{ color: "green" }} />
          ) : bidDetails?.participant?.sample?.invite_status === "declined" ? (
            <CancelOutlined style={{ color: "red" }} />
          ) : bidDetails?.participant?.status === "revoked" ? (
            <CheckCircleOutline style={{ color: "green" }} />
          ) : (
            <HourglassEmpty style={{ color: "#FFC107" }} />
          ),
        status: "complete",
      },
      ...(bidDetails?.participant?.sample?.invite_status === "declined"
        ? []
        : [
            {
              label: `${
                bidDetails?.participant?.sample?.approval_status === "approved"
                  ? "Sample Approved"
                  : bidDetails?.participant?.sample?.approval_status ===
                    "rejected"
                  ? "Sample Rejected"
                  : "Sample Pending"
              }`,
              icon:
                bidDetails?.participant?.sample?.approval_status ===
                "approved" ? (
                  <CheckCircleOutline style={{ color: "green" }} />
                ) : bidDetails?.participant?.sample?.approval_status ===
                  "rejected" ? (
                  <CancelOutlined style={{ color: "red" }} />
                ) : (
                  <HourglassEmpty style={{ color: "#FFC107" }} />
                ),
              status: "complete",
            },
            {
              label: "Commercial Bid Invite",
              icon:
                bidDetails?.participant?.sample?.approval_status ===
                  "approved" && bidDetails?.bid_open_date !== null ? (
                  <GroupAdd style={{ color: "green" }} />
                ) : (
                  <HourglassEmpty style={{ color: "#FFC107" }} />
                ),
              status: "complete",
            },
            {
              label:
                bidDetails?.participant?.status === "pending"
                  ? "Pending"
                  : bidDetails?.participant?.status === "accepted" ||
                    bidDetails?.participant?.status === "revoked" ||
                    bidDetails?.participant?.status === "participated" ||
                    bidDetails?.participant?.status === "awarded"
                  ? "Accepted"
                  : bidDetails?.participant?.status === "declined"
                  ? "Declined"
                  : "Pending",
              icon:
                bidDetails?.participant?.status === "pending" ? (
                  <HourglassEmpty style={{ color: "#FFBF00" }} />
                ) : bidDetails?.participant?.status === "accepted" ||
                  bidDetails?.participant?.status === "revoked" ||
                  bidDetails?.participant?.status === "participated" ||
                  bidDetails?.participant?.status === "awarded" ? (
                  <CheckCircleOutline style={{ color: "green" }} />
                ) : bidDetails?.participant?.status === "declined" ? (
                  <CancelOutlined style={{ color: "red" }} />
                ) : (
                  <HourglassEmpty style={{ color: "#FFBF00" }} />
                ),
              status: "complete",
            },
          ]),
      ...(bidDetails?.participant?.status === "revoked"
        ? [
            {
              label: "Revoked",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
      ...(bidDetails?.status === "cancelled"
        ? [
            {
              label: "Cancelled",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status === "participated" ||
      bidDetails?.participant?.status === "awarded"
        ? [
            {
              label: "Participated",
              icon: <CheckCircleOutline style={{ color: "green" }} />,
              status: "success",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status === "awarded"
        ? [
            {
              label: "Awarded",
              icon: <CheckCircleOutline style={{ color: "green" }} />,
              status: "success",
            },
          ]
        : []),
      ...(bidDetails?.participant?.status !== "awarded" &&
      bidDetails?.status === "completed"
        ? [
            {
              label: "Not Awarded",
              icon: <CancelOutlined style={{ color: "red" }} />,
              status: "error",
            },
          ]
        : []),
    ];
  }

  const chatWithBuyer = async () => {
    try {
      const response = await _sendAPIRequest(
        "POST",
        `${PortalApiUrls.START_CHAT_WITH_BUYER}${bidDetails?.company?.id}/get_or_create/`,
        "",
        true
      );
      if (response?.status === 200) {
        navigate("/portal/messages", { state: { chatId: response.data.id } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {type === "invited" ? (
        <Box
          key="3"
          sx={{
            width: "100%",
            fontSize: "0.8rem",
            lineHeight: 1.2,
          }}
        >
          <Stepper
            alternativeLabel
            activeStep={2} // Set active step index
            sx={{ padding: "0.5rem" }}
          >
            {steps.map((step, index) => {
              const iconColor = step.icon.props.style.color;

              return (
                <Step key={index}>
                  <StepLabel
                    icon={step.icon}
                    StepIconProps={{
                      sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          color: iconColor, // Match text color with icon
                          fontSize: "0.8rem",
                          marginLeft: "8px",
                        }}
                      >
                        {step.label}
                      </span>
                    </Box>
                  </StepLabel>
                  <StepConnector
                    sx={{
                      "& .MuiStepConnector-line": {
                        borderColor:
                          steps[index]?.icon?.props?.style?.color || "#d3d3d3", // Apply current step color
                        width: "100%", // Ensure it stretches properly
                      },
                      "&:first-of-type .MuiStepConnector-line": {
                        display: "none", // Hide the connector before the first step
                      },
                    }}
                  />
                </Step>
              );
            })}
          </Stepper>
          ;
        </Box>
      ) : null}
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
              <p className={styles["col-data"]}>
                {" "}
                {truncatelength(bidDetails?.title, 61)}
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

      {/* Buyer */}

      {type === "invited" && (
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Buyer
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles["accordion-details"]}>
            <Box display="flex" alignItems="center">
              <Avatar
                className={styles["buyer-avatar"]}
                alt="Buyer Image"
                src={
                  bidDetails?.company?.logo === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4VAsurdDdyaWQ3h_FwC1MpAytWmY8_q0Ig&s"
                    : bidDetails?.company?.logo
                }
              />
              <Typography
                component="a"
                href="#"
                className={styles["company-name"]}
              >
                {bidDetails?.company?.name}
              </Typography>
            </Box>
            <Button
              variant="contained"
              className={styles["chat-button"]}
              onClick={chatWithBuyer}
            >
              Chat with Buyer
            </Button>
          </AccordionDetails>
        </Accordion>
      )}

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

      {type === "invited" ? (
        <>
          <div className="container-fluid">
            <div className={styles["blue-container"]}>
              <div className={styles["note-header"]}>
                Note: Navigating Supplier Dashboard
              </div>
              <div className={styles["note-description"]}>
                As a supplier on Bidding Kro, you have access to a range of
                tools to help manage your interactions and track the status of
                your bids. Here's an overview of each panel:
              </div>
              <div className={cn("mt-3", styles["note-list"])}>
                <ul>
                  <li>
                    <strong
                      onClick={() => handleViewRequestClick(1)}
                      className={styles["navigator"]}
                    >
                      Documents Panel:
                    </strong>{" "}
                    View and download all documents uploaded by the buyer. This
                    panel keeps you informed of all bid-related documentation
                    you need for reference and compliance.
                  </li>
                  <li>
                    <strong
                      onClick={() => handleViewRequestClick(2)}
                      className={styles["navigator"]}
                    >
                      Acceptance Status:
                    </strong>{" "}
                    Monitor the status of your bid acceptance from the
                    supplier’s end. This panel shows whether your bid has been
                    accepted, rejected, or is still pending with the buyer.
                  </li>
                  <li>
                    <strong
                      onClick={() => handleViewRequestClick(3)}
                      className={styles["navigator"]}
                    >
                      Questions:
                    </strong>{" "}
                    Find questions from the buyer directed to you, the supplier.
                    Here, you can view and respond to buyer inquiries to ensure
                    clarity and enhance bid collaboration.
                  </li>
                  <li>
                    <strong
                      onClick={() => handleViewRequestClick(4)}
                      className={styles["navigator"]}
                    >
                      Remarks:
                    </strong>{" "}
                    Leave your remarks or feedback for the buyer regarding the
                    bid. This feature allows you to communicate any
                    observations, requests, or comments directly.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid">
          <div className={styles["blue-container"]}>
            <div className={styles["note-header"]}>
              Note: Flexibility at Your Fingertips
            </div>
            <div className={styles["note-description"]}>
              At Bidding Kro, we understand that circumstances can change.
              That's why we've made it easy for you to manage your bids with
              complete flexibility:
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
                  <strong>Make Amendments:</strong> Once the initial 24-hour
                  edit period is over, you can still make amendments for another
                  24 hours. This allows you to fine-tune your bid even further
                  before it becomes final.
                </li>
                <li>
                  <strong>Cancel Bids:</strong> If you need to withdraw your
                  bid, you can cancel it anytime before it goes live. You have
                  up to 24 hours to cancel the bid, giving you the flexibility
                  to reconsider your decisions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

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
