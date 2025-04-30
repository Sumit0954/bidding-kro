import styles from "./PortalBidDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  IconButton,
  Stack,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { Download, ExpandMore } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  documents_column,
  ProductBid_column,
  products_Column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { useEffect, useState } from "react";
import { dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import ProductSpecificationModal from "../../../elements/CustomModal/ProductSpecificationModal";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import Documents from "../../portal/bids/tabs/Documents";

const PortalBidDetail = () => {
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState({});
  const [showSpecification, setShowSpecification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screenLoader, setScreenLoader] = useState(true);

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

  const productsColumns = products_Column({
    setShowSpecification,
    setSelectedProduct,
  });

  const handleDownloadDocument = (data) => {
    const { file, name } = data;

    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name); // Set the downloaded file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link); // Clean up after download
        window.URL.revokeObjectURL(url); // Release memory for the object URL
      })
      .catch((error) => {
        console.error("There was an error downloading the file:", error);
      });
  };

  // downloading document
  const addAction = (cell) => {
    if (cell.column.id === "action") {
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <IconButton className="p-0">
            <Download
              onClick={() => handleDownloadDocument(cell.row.original)}
            />
          </IconButton>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()} align={cell.column.align}>
          {" "}
          {cell.render("Cell")}{" "}
        </TableCell>
      );
    }
  };
  
  useEffect(() => {
    fetchbidDetail();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
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
            <p className={styles["col-data"]}>
              {bidDetails?.description.replace(/<\/?p>/g, "")}
            </p>
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
