import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styles from "./QueryDetail.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { dateTimeFormatter } from "../../../helpers/formatter";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import classNames from "classnames";
import NoliveBidImg from "../../../assets/images/portal/bids/bid-closed-img.png";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
const QueryDetail = () => {
  const { query_type, query_id } = useParams();
  const { setAlert } = useContext(AlertContext);
  const [queryDetails, setQueryDetails] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    query_id: null,
  });
  useContext(alert);
  const navigate = useNavigate();

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

  const handleCloseQuery = async (type) => {
    console.log(type === "contact-us");
    let API;
    switch (type) {
      case "contact-us":
        API = AdminApiUrls.CLOSE_CONTACT_QUERY;
        break;
      case "get-in-touch":
        API = AdminApiUrls.CLOSE_BOOK_A_DEMO_QUERY;
        break;
      case "missing-data-query":
        API = AdminApiUrls.CLOSE_MISSING_DATA_QUERY_QUERY;
        break;
      case "customer-support":
        API = AdminApiUrls.CLOSE_SUPPORT_QUERY;
        break;
      default:
        console.log("Invalid Type");
        return;
    }
    try {
      const response = await _sendAPIRequest(
        "PATCH",
        `${API}${query_id}/`,
        {
          is_closed: true,
        },
        true
      );
      if (response?.status === 200) {
        setQueryDetails((prev) => ({ ...prev, ...response?.data }));
        setAlert({
          isVisible: true,
          message: "The query has been closed",
          severity: "success",
        });
      }
    } catch (error) {}
  };

  const handleComfirmation = (choice) => {
    if (choice) {
      handleCloseQuery(query_type);
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        query_id: null,
      });
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        query_id: null,
      });
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
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
            <div style={{ position: "relative" }}>
              {/* Watermark Image Inside Accordion */}
              {queryDetails?.is_closed && (
                <img
                  src={NoliveBidImg}
                  alt="Bid Closed"
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0.09,
                    zIndex: 0,
                    maxWidth: "60%",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="row">
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Query No.</h6>
                    <b className={styles["col-data"]}>
                      # {queryDetails?.id}
                    </b>
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
                  {
                    <div className="col">
                      <h6 className={styles["col-heading"]}>Phone</h6>
                      <p className={styles["col-data"]}>
                        {" "}
                        {query_type === "get-in-touch" ||
                        query_type === "contact-us"
                          ? queryDetails?.phone
                          : query_type === "missing-data-query" ||
                            query_type === "customer-support"
                          ? queryDetails?.company?.business_mobile
                          : "N/A"}
                      </p>
                    </div>
                  }
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
                        <p className={styles["col-data"]}>
                          {queryDetails?.message?.replace(/<[^>]+>/g, "")}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className={classNames("btn", "button")}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className={classNames("btn", "btn-danger")}
          onClick={() =>
            setDeleteDetails({
              open: true,
              title: "Close Query Confirmation",
              message: "Are you sure you want to close this query",
              query_id: query_id,
            })
          }
          disabled={queryDetails?.is_closed}
        >
          {queryDetails?.is_closed ? "CLOSED" : "Close Query"}
        </button>
      </div>

      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleComfirmation}
        />
      )}
    </>
  );
};

export default QueryDetail;
