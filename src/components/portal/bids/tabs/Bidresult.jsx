import ReactToPrint, { useReactToPrint } from "react-to-print";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import React, { useRef, useState } from "react";
import styles from "./LetterOfIntent.module.scss";
import cn from "classnames";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore, PrintOutlined } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { ProductBid_column2 } from "../../../../elements/CustomDataTable/PortalColumnData";
const Bidresult = ({ bidDetails }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: bidDetails?.formatted_number,
    removeAfterPrint: true,
  });
  return (
    <>
      <Box
        classname={cn("row", styles["result-box"])}
        sx={{ marginTop: "2rem", marginLeft: "8px" }}
      >
        <Typography>
          Dear <strong>Arvind Limited</strong>, <br />
          We are pleased to inform you that your company has been selected as
          the preferred supplier for the following products, following the
          conclusion of the live bidding process.Congratulations! You have
          emerged as the L1 bidder in this process, showcasing competitive
          pricing and value. We are pleased to inform you that you have been
          awarded the project. This marks the beginning of what we hope will be
          a successful collaboration. Please review the terms and prepare to
          commence as per the outlined schedule. We look forward to your
          commitment and quality delivery.
        </Typography>
      </Box>

      <br />
      <Accordion defaultExpanded>
        <AccordionSummary>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Buyer's Name</Typography>
            {/* Add the Feedback Button */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={styles["feedback-button"]}
            >
              Feedback
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {/* Wrap the content you want to print with the componentRef */}
          <div ref={componentRef}>
            <div className={styles["loi-content"]}>
              <div className={styles["bid-Letter"]}>
                <Typography
                  variant="h6"
                  className={styles["bid-letter-contnet"]}
                >
                  LETTER OF INTENT FOR BID AWARD
                </Typography>

                <Typography
                  variant="h6"
                  className={styles["bid-letter-contnet"]}
                ></Typography>
                <Tooltip title="Print The Page" arrow>
                  <IconButton
                    onClick={handlePrint}
                    sx={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                    }}
                  >
                    <PrintOutlined
                      style={{ fontSize: "28px", fontWeight: "bold" }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
              <Typography>Date: 28/09/2024</Typography>
              <Typography>Reference Number: LOI-8K-2024-00123</Typography>

              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Buyer Information
              </Typography>
              <table className={styles["loi-table"]}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sumit</td>
                    <td>Company's Name</td>
                    <td>Company's Address</td>
                    <td>0000000000</td>
                  </tr>
                </tbody>
              </table>

              <Typography variant="h6">Supplier Information</Typography>
              <table className={styles["loi-table"]}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alok Industries Limited</td>
                    <td>Supplier's Name</td>
                    <td>Supplier's Address</td>
                    <td>0000000000</td>
                  </tr>
                </tbody>
              </table>

              <Typography>
                Dear <strong>Arvind Limited</strong>, <br />
                We are pleased to inform you that your company has been selected
                as the preferred supplier for the following products, following
                the conclusion of the live bidding process.
              </Typography>

              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Products
              </Typography>
              <table className={styles["loi-table"]}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Reserved Price</th>
                    <th>Bid Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cotton Yarn</td>
                    <td>500 Units</td>
                    <td>₹ 5000/Unit</td>
                    <td>₹ 4000/Unit</td>
                  </tr>
                </tbody>
              </table>
              <Typography variant="h6">
                <strong>Intent Statement:</strong>
              </Typography>
              <Typography>
                This Letter of Intent serves to confirm our intent to proceed
                with the award of the contract to your company for the supply of
                the above-mentioned products, subject to the finalization of
                terms and conditions.
              </Typography>
              <br />
              <Typography variant="h6">
                <strong>Next Steps</strong>
              </Typography>
              <Typography>
                We request you to review the attached contract and provide your
                confirmation by the deadline. Once confirmed, the formal
                contract will be finalized and executed.
              </Typography>

              <Typography>
                For any modifications or queries, please contact [Contact
                Person] at [Email] or [Phone].
              </Typography>
              {/* New sections added */}
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                <strong>Delivery Term </strong>
              </Typography>
              <Typography>
                We request you to review the attached contract covering all
                awarded products and provide your confirmation by [Confirmation
                Deadline Date]. Once confirmed, the formal contract will be
                finalized and executed.
              </Typography>

              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                <strong>Payment Term</strong>
              </Typography>
              <Typography>
                We request you to review the attached contract covering all
                awarded products and provide your confirmation by [Confirmation
                Deadline Date]. Once confirmed, the formal contract will be
                finalized and executed.
              </Typography>

              {/* Other sections remain unchanged */}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <DataTable propsColumn={ProductBid_column2} propsData={[]} />
    </>
  );
};
export default Bidresult;
