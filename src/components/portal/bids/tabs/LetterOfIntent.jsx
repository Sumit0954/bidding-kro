import React, { useRef } from "react";
import styles from "./LetterOfIntent.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { ExpandMore, PrintOutlined } from "@mui/icons-material";
// import ReactToPrint from "react-to-print";

const LetterOfIntent = ({ bidDetails }) => {
  const componentRef = useRef(null);

  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Company Name</Typography>
      </div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Arvind Limited</Typography>
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
                {/* <ReactToPrint
                  content={() => componentRef.current}
                  documentTitle={bidDetails?.formatted_number}
                  trigger={() => (
                    <IconButton className={styles["no-print"]}>
                      <PrintOutlined />
                    </IconButton>
                  )}
                  removeAfterPrint
                /> */}
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
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default LetterOfIntent;
