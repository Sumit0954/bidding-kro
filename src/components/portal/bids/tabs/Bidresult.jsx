import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import React, { useEffect, useRef, useState } from "react";
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
import { PrintOutlined } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { ProductBid_column2 } from "../../../../elements/CustomDataTable/PortalColumnData";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { dateTimeFormatter } from "../../../../helpers/formatter";
const Bidresult = ({ bidDetails }) => {
  const [bidletter, setBidletter] = useState({});
  const [bidresult, setBidresult] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);
  const fetchLOIforSupplier = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.LIVE_BID_LETTER_OF_INTENT_FOR_SUPPLIER +
          `${bidDetails?.id}`,
        "",
        true
      );
      if (response.status === 200) {
        setBidletter(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log("error");
      setScreenLoader(false);
    }
  };

  const fetchBidResult = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.LIVE_BID_RESULT_FOR_SUPPLIER + `${bidDetails?.id}`,
        "",
        true
      );
      if (response.status === 200) {
        setBidresult(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error);
      setScreenLoader(false);
    }
  };

  useEffect(() => {
    fetchLOIforSupplier();
    fetchBidResult();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Box
        classname={cn("row", styles["result-box"])}
        sx={{ marginTop: "2rem", marginLeft: "8px" }}
      >
        {Object.keys(bidletter).length !== 0 ? (
          <>
            <Typography>
              Dear <strong>{bidletter?.supplier?.name}</strong>, <br />
              We are pleased to inform you that your company has been selected
              as the preferred supplier for the following products, following
              the conclusion of the live bidding process.Congratulations! You
              have emerged as the L1 bidder in this process, showcasing
              competitive pricing and value. We are pleased to inform you that
              you have been awarded the project. This marks the beginning of
              what we hope will be a successful collaboration. Please review the
              terms and prepare to commence as per the outlined schedule. We
              look forward to your commitment and quality delivery.
            </Typography>
          </>
        ) : (
          <>
            <Typography>
              Thank you for participating in the live bid. Your final position
              in the bidding process is , reflecting your competitive effort.
              While the project has been awarded to another supplier, we
              sincerely value your involvement and encourage you to participate
              in future opportunities. Your dedication and effort are greatly
              appreciated, and we look forward to seeing you in upcoming bids.
            </Typography>
          </>
        )}
      </Box>
      {Object.keys(bidletter).length !== 0 && (
        <>
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
                <Typography>{bidletter?.buyer?.name}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {/* Wrap the content you want to print with the componentRef */}
              <div>
                <div className={styles["loi-content"]}>
                  <div className={styles["bid-Letter"]}>
                    <Typography
                      variant="h6"
                      className={styles["bid-letter-contnet"]}
                    >
                      LETTER OF INTENT FOR BID AWARD
                    </Typography>
                  </div>
                  <br />
                  <Typography>
                    Date: {dateTimeFormatter(bidletter?.created_at)}
                  </Typography>
                  <Typography>
                    Bid Number: <strong>{bidletter?.formatted_number}</strong>
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ marginTop: "20px", mb: 2, fontWeight: "bold" }}
                  >
                    Buyer Information
                  </Typography>
                  <table className={styles["loi-table"]}>
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Company Email</th>
                        <th>Contact</th>
                        <th>GST No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{bidletter?.buyer?.name}</td>
                        <td>{bidletter?.buyer?.business_email}</td>
                        <td>{bidletter?.buyer?.business_mobile}</td>
                        <td>{bidletter?.buyer?.gstin}</td>
                      </tr>
                    </tbody>
                  </table>

                  {bidletter?.buyer?.address?.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: "20px",
                          mb: 2,
                          fontSize: "large",
                          fontWeight: "bold",
                        }}
                      >
                        Buyer Addresses
                      </Typography>
                      <table className={styles["loi-table"]}>
                        <thead>
                          <tr>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Pincode</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          {letter?.buyer?.address?.map((address) => {
                            return (
                              <tr>
                                <td>{address?.address}</td>
                                <td>{address?.city}</td>
                                <td>{address?.country}</td>
                                <td>{address?.pincode}</td>
                                <td>{address?.state}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}

                  <Typography
                    variant="h6"
                    sx={{ marginTop: "20px", mb: 2, fontWeight: "bold" }}
                  >
                    Supplier Information
                  </Typography>
                  <table className={styles["loi-table"]}>
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Company Email</th>
                        <th>Contact</th>
                        <th>GST No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{bidletter?.supplier?.name}</td>
                        <td>{bidletter?.supplier?.business_email}</td>
                        <td>{bidletter?.supplier?.business_mobile}</td>
                        <td>{bidletter?.supplier?.gstin}</td>
                      </tr>
                    </tbody>
                  </table>

                  {bidletter?.supplier?.address?.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: "20px",
                          mb: 2,
                          fontSize: "large",
                          fontWeight: "bold",
                        }}
                      >
                        Supplier Addresses
                      </Typography>

                      <table className={styles["loi-table"]}>
                        <thead>
                          <tr>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Pincode</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bidletter?.supplier?.address?.map((address) => {
                            return (
                              <tr>
                                <td>{address?.address}</td>
                                <td>{address?.city}</td>
                                <td>{address?.country}</td>
                                <td>{address?.pincode}</td>
                                <td>{address?.state}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}

                  <Typography>
                    Dear <strong>{bidletter?.supplier?.name}</strong>, <br />
                    We are pleased to inform you that your company has been
                    selected as the preferred supplier for the following
                    products, following the conclusion of the live bidding
                    process.
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ marginTop: "20px", mb: 2, fontWeight: "bold" }}
                  >
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
                      {bidletter?.bid_pricing?.map((bidProduct) => (
                        <tr>
                          <td>{bidProduct.product?.title}</td>
                          <td>{bidProduct.product?.quantity}</td>
                          <td>₹ {bidProduct.product?.reserved_price}</td>
                          <td>₹ {bidProduct?.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Typography variant="h6">
                    <strong>Intent Statement:</strong>
                  </Typography>
                  <Typography>
                    This Letter of Intent serves to confirm our intent to
                    proceed with the award of the contract to your company for
                    the supply of the above-mentioned products, subject to the
                    finalization of terms and conditions.
                  </Typography>
                  <br />
                  <Typography variant="h6">
                    <strong>Next Steps</strong>
                  </Typography>
                  <Typography>
                    We request you to review the attached contract and provide
                    your confirmation by the deadline. Once confirmed, the
                    formal contract will be finalized and executed.
                  </Typography>

                  <Typography>
                    For any modifications or queries, please contact at{" "}
                    {bidletter?.buyer?.business_email} or
                    {bidletter?.buyer?.business_mobile}.
                  </Typography>
                  {/* New sections added */}
                  <Typography variant="h6" sx={{ marginTop: "20px" }}>
                    <strong>Delivery Term </strong>
                  </Typography>
                  <Typography>
                    {bidletter?.bid?.delivery_terms.replace(/<p>|<\/p>/g, "")}
                  </Typography>

                  <Typography variant="h6" sx={{ marginTop: "20px" }}>
                    <strong>Payment Term</strong>
                  </Typography>
                  <Typography>
                    {bidletter?.bid?.payment_terms.replace(/<p>|<\/p>/g, "")}
                  </Typography>

                  {/* Other sections remain unchanged */}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      )}
      <br />
      {bidresult.length > 0 && (
        <DataTable
          propsColumn={ProductBid_column2}
          propsData={bidresult || []}
        />
      )}
    </>
  );
};
export default Bidresult;
