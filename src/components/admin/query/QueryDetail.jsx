import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./QueryDetail.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { useParams } from "react-router-dom";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { dateTimeFormatter } from "../../../helpers/formatter";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const QueryDetail = () => {
  const { query_type, query_id } = useParams();
  const { setAlert } = useContext(AlertContext);
  const [queryDetails, setQueryDetails] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);

  const fetchUserQueryDetail = async () => {
    let API;
    if (query_type === "contact-us") {
      API = AdminApiUrls.RETRIEVE_CONTACT_US_QUERY_DETAIL;
    } else if (query_type === "get-in-touch") {
      API = AdminApiUrls.RETRIEVE_GET_IN_TOUCH_QUERY_DETAIL;
    } else if (query_type === "missing-data-query") {
      API = AdminApiUrls.RETRIEVE_MISSING_DATA_QUERY_DETAIL;
    } else if (query_type === "customer-support") {
      API = AdminApiUrls.RETRIEVE_CUSTOMER_SUPPORT_QUERY;
    }
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${API}${query_id}/`,
        "",
        true
      );
      if (response.status === 200) {
        setQueryDetails(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchUserQueryDetail();
  }, [query_type, query_id]);

  if (screenLoader) {
    return <ScreenLoader />;
  }
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
              <b className={styles["col-data"]}>Query {queryDetails?.id}</b>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Query Type</h6>
              <p className={styles["col-data"]}>
                {query_type === "contact-us"
                  ? "Contact Us Query"
                  : query_type === "get-in-touch"
                  ? "Demo Query"
                  : query_type === "missing-data-query"
                  ? `Missing Data Query`
                  : query_type === "customer-support"
                  ? `Customer support`
                  : "Unknown Query"}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Query raised Date</h6>
              <p className={styles["col-data"]}>
                {dateTimeFormatter(queryDetails?.created_at)}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Company Name</h6>
              <p className={styles["col-data"]}>
                {query_type === "contact-us"
                  ? queryDetails?.name
                  : query_type === "get-in-touch"
                  ? queryDetails?.company_name
                  : query_type === "missing-data-query" ||
                    query_type === "customer-support"
                  ? queryDetails?.company?.name
                  : ""}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>User Email</h6>
              <a
                className={styles["col-data"]}
                href={`mailto:${
                  query_type === "missing-data-query" ||
                  query_type === "customer-support"
                    ? queryDetails?.company?.business_email
                    : queryDetails?.email
                }`}
              >
                {query_type === "missing-data-query" ||
                query_type === "customer-support"
                  ? queryDetails?.company?.business_email
                  : queryDetails?.email}
              </a>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>
                {{
                  "contact-us": "Subject",
                  "get-in-touch": "Contact Person Name",
                  "missing-data-query": "Type",
                  "customer-support": "Subject",
                }[query_type] || ""}
              </h6>

              <p className={styles["col-data"]}>
                {query_type === "contact-us" ||
                query_type === "customer-support"
                  ? queryDetails?.subject
                  : query_type === "get-in-touch"
                  ? queryDetails?.contact_person_name
                  : query_type === "missing-data-query"
                  ? queryDetails?.type
                  : ""}
              </p>
            </div>
          </div>
          {query_type !== "get-in-touch" && (
            <>
              <Divider classes={{ root: "custom-divider" }} />

              <div className="row">
                <div className="col">
                  <h6 className={styles["col-heading"]}>Message</h6>
                  <p className={styles["col-data"]}>{queryDetails?.message}</p>
                </div>
              </div>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QueryDetail;
