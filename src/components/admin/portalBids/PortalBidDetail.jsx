import styles from "./PortalBidDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore, Print } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { products_Column } from "../../../elements/CustomDataTable/PortalColumnData";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { useEffect, useRef, useState } from "react";
import { convertHtmlToText, dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import ProductSpecificationModal from "../../../elements/CustomModal/ProductSpecificationModal";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import Documents from "../../portal/bids/tabs/Documents";
import { useReactToPrint } from "react-to-print";
import cn from "classnames";

const PortalBidDetail = () => {
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState({});
  const [showSpecification, setShowSpecification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screenLoader, setScreenLoader] = useState(true);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });
  const fetchbidDetail = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${AdminApiUrls?.FETCH_BID_DETAILS}${id}/`,
        "",
        true
      );
      if (response?.status === 200) {
        setBidDetails(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const breadcrumbs = [
    <NavLink
      to={"/admin/portal-bids"}
      style={{ textDecoration: "none" }}
      underline="hover"
      key="1"
      color="inherit"
    >
      Portal Bids
    </NavLink>,
    <Typography>{bidDetails?.formatted_number}</Typography>,
  ];
  const productsColumns = products_Column({
    setShowSpecification,
    setSelectedProduct,
  });

  useEffect(() => {
    fetchbidDetail();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <button className={cn("btn", "button")} onClick={handlePrint}>
          <Print />
        </button>
      </div>
      <div ref={contentRef}>
        {/* Summary */}
        <Accordion
          defaultExpanded
          square={true}
          classes={{ root: "custom-accordion" }}
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
              {
                <Tooltip title={bidDetails?.title}>
                  <div className="col">
                    <h6 className={styles["col-heading"]}>Bid Title</h6>
                    <p className={styles["col-data"]}>
                      {truncateString(bidDetails?.title, 30)}
                    </p>
                  </div>
                </Tooltip>
              }
              <div className="col">
                <h6 className={styles["col-heading"]}>Bid Type</h6>
                <p className={styles["col-data"]}>{bidDetails?.type} Bid</p>
              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
                <p
                  className={styles["col-data"]}
                  style={{
                    color: bidDetails?.bid_open_date === null && "#FFAA33",
                  }}
                >
                  {bidDetails?.bid_open_date !== null
                    ? dateTimeFormatter(bidDetails?.bid_open_date)
                    : "Not decalred yet"}
                </p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
                <p
                  className={styles["col-data"]}
                  style={{
                    color: bidDetails?.bid_close_date === null && "#FFAA33",
                  }}
                >
                  {bidDetails?.bid_close_date !== null
                    ? dateTimeFormatter(bidDetails?.bid_close_date)
                    : "Not decalred yet"}{" "}
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Description */}
        <Accordion defaultExpanded square={true}>
          <AccordionSummary>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <div
                className={styles["col-data"]}
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: convertHtmlToText(bidDetails?.description || ""),
                }}
              ></div>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Products */}
        <Accordion
          defaultExpanded
          square={true}
          classes={{ root: "custom-accordion" }}
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
        <Accordion
          defaultExpanded
          square={true}
          classes={{ root: "custom-accordion" }}
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
        <Accordion
          defaultExpanded
          square={true}
          classes={{ root: "custom-accordion" }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Documents
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Documents bidDetails={bidDetails} />
          </AccordionDetails>
        </Accordion>
      </div>
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

export default PortalBidDetail;
