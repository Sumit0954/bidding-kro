import styles from "./PortalBidDetail.module.scss";
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
import { NavLink } from "react-router-dom";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  documents_column,
  ProductBid_column,
} from "../../../elements/CustomDataTable/PortalColumnData";

const PortalBidDetail = () => {
  return (
    <>
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
              <p className={styles["col-data"]}>EB000091</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Title</h6>
              <p className={styles["col-data"]}>
                <NavLink target="_blank">Bid of pet food</NavLink>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Bid Type</h6>
              <p className={styles["col-data"]}>L1 Bid</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Opening Date and Time</h6>
              <p className={styles["col-data"]}>15, April 2025</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Closing Date and Time</h6>
              <p className={styles["col-data"]}>16, April 2025 </p>
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
              Objective: Procurement of cotton material to meet manufacturing
              needs. Invitation: Seeking proposals from qualified suppliers for
              premium-grade cotton fabric. Specifications: Suppliers must adhere
              to predefined specifications and industry standards. Partnership:
              Aim to establish a mutually beneficial partnership with the
              selected supplier
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
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
          <DataTable propsColumn={ProductBid_column} propsData={[]} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Categories 2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" gap="10px">
            <Chip label="Check" />
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
          <DataTable propsColumn={documents_column} propsData={[]} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PortalBidDetail;
