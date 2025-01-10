import React, { useEffect, useRef, useState } from "react";
import styles from "./LetterOfIntent.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  ExpandMore,
  ExpandMoreRounded,
  PrintOutlined,
} from "@mui/icons-material";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { dateTimeFormatter } from "../../../../helpers/formatter";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
// import ReactToPrint from "react-to-print";

const LetterOfIntent = ({ bidDetails }) => {
  const componentRef = useRef(null);
  const [expanded, setExpanded] = useState(true);
  const [screenLoader, setScreenLoader] = useState(true);
  const [addInvitaion, setInvitation] = useState(false);
  const [letterOfIntent, setLetterOfIntent] = useState([]);

  const fetchLetterofIntent = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.LIVE_BID_LETTER_OF_INTENT_FOR_BUYER +
          `${bidDetails?.id}/`,
        "",
        true
      );
      if (response.status === 200) {
        setLetterOfIntent(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error);
      setScreenLoader(false);
    }
  };

  useEffect(() => {
    fetchLetterofIntent();
  }, []);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Company Name</Typography>
      </div>
      {letterOfIntent.map((letter) => {
        return (
          <>
            <Accordion onChange={handleAccordionChange}>
              <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{letter?.supplier?.name}</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div ref={componentRef}>
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
                      Date: {dateTimeFormatter(letter?.created_at)}
                    </Typography>
                    <Typography>
                      Bid Number:{" "}
                      <strong>{letter?.bid?.formatted_number}</strong>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{letter?.buyer?.name}</td>
                          <td>{letter?.buyer?.business_email}</td>
                          <td>{letter?.buyer?.business_mobile}</td>
                        </tr>
                      </tbody>
                    </table>

                    {letter?.buyer?.address?.length > 0 && (
                      <>
                        <Typography
                          variant="h6"
                          sx={{ marginTop: "20px", mb: 2, fontSize: "large" }}
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
                          <td>{letter?.supplier?.name}</td>
                          <td>{letter?.supplier?.business_email}</td>
                          <td>{letter?.supplier?.business_mobile}</td>
                          <td>{letter?.supplier?.gstin}</td>
                        </tr>
                      </tbody>
                    </table>

                    <Typography
                      variant="h6"
                      sx={{ marginTop: "20px", mb: 2, fontSize: "large" , fontWeight : "bold" }}
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
                        {letter?.supplier?.address?.map((address) => {
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

                    <Typography>
                      Dear <strong>{letter?.supplier?.name}</strong>, <br />
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
                        {letter?.bid_pricing?.map((bidProduct) => (
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
                      {letter?.buyer?.business_email} or
                      {letter?.buyer?.business_mobile}.
                    </Typography>
                    {/* New sections added */}
                    <Typography variant="h6" sx={{ marginTop: "20px" }}>
                      <strong>Delivery Term </strong>
                    </Typography>
                    <Typography>
                      {letter?.bid?.delivery_terms.replace(/<p>|<\/p>/g, "")}
                    </Typography>

                    <Typography variant="h6" sx={{ marginTop: "20px" }}>
                      <strong>Payment Term</strong>
                    </Typography>
                    <Typography>
                      {letter?.bid?.payment_terms.replace(/<p>|<\/p>/g, "")}
                    </Typography>

                    {/* Other sections remain unchanged */}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}

      {/* {addInvitaion && <FeedbackModal addInvitaion={addInvitaion} />} */}
    </>
  );
};

export default LetterOfIntent;
