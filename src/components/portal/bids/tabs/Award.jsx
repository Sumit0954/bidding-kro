import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import {
  Expand,
  ExpandCircleDown,
  ExpandMore,
  ExpandMoreRounded,
} from "@mui/icons-material";
import styles from "./Award.module.scss";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import AwardPopUp from "../../../../elements/CustomModal/AwardPopUp ";
import cn from "classnames";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
const Analysis = ({ bidDetails }) => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bidders, setBidders] = useState([]);
  const [participantId, setParticipantId] = useState();
  const [awardStatus, setAwardStatus] = useState();

  const { setAlert } = useContext(AlertContext);

  const handleChange = (event, id) => {
    setSelectedSupplier(id);
    setParticipantId(id);
  };

  const handleAccordionChange = (index) => {
    setIsExpanded(!isExpanded);
    setExpandedIndex((prevIndex) => (prevIndex === index ? false : index));
  };

  const handleClose = () => setOpen(false);

  const fetchSupplierForAward = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.LIVE_BID_PRODUCT_FOR_AWARD + `${bidDetails?.id}/`,
        "",
        true
      );
      if (response.status === 200) {
        setBidders(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error);
      setScreenLoader(false);
    }
  };

  const awardSupplier = async () => {
    if (participantId) {
      try {
        const response = await _sendAPIRequest(
          "PUT",
          PortalApiUrls.LIVE_BID_AWARD_BUYER + `${participantId}/`,
          "",
          true
        );

        if (response) {
          setOpen(true);
          setAwardStatus(response.status);
        }
      } catch (error) {}
    } else {
      setAlert({
        isVisible: true,
        message: `Please Select Product`,
        severity: "error",
      });
    }
  };

  const cencelProduct = async (productId) => {
    try {
      const response = await _sendAPIRequest(
        "DELETE",
        PortalApiUrls.LIVE_BID_CENCEL_PRODUCT + `${productId}/`,
        "",
        true
      );
      if (response.status === 204) {
        setAlert({
          isVisible: true,
          message: `Product Cencelled`,
          severity: "success",
        });
        setAwardStatus(response.status);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: `${error.message}`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchSupplierForAward();
  }, [awardStatus]);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  console.log("re-render");
  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Product Name</Typography>
      </div>
      {bidders.map((awardBidder, index) => {
        return (
          <>
            <Accordion
              // disabled={awardBidder?.award_status === "cancelled"}
              expanded={expandedIndex === index}
              onChange={() => handleAccordionChange(index)}
              key={index}
              defaultExpanded={false}
              sx={{
                margin: "16px 0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.05rem",
                      color: "#052c65",
                    }}
                  >
                    {awardBidder?.product}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={2}>
                    {isExpanded === false &&
                    expandedIndex === index &&
                    awardBidder.award_status === "pending" ? (
                      <>
                        <Button
                          variant="contained"
                          disabled={awardBidder?.award_status === "cancelled"}
                          sx={{
                            backgroundColor: `${
                              awardBidder?.award_status === "pending"
                                ? "#FFC107"
                                : awardBidder?.award_status === "cancelled"
                                ? "red"
                                : "#22bb33"
                            }`, // Retain background color
                            color: "white", // Keep text color consistent
                            boxShadow: "none", // Remove box shadow for disabled state
                            pointerEvents: `${
                              awardBidder?.award_status === "cancelled"
                                ? "none"
                                : "auto"
                            }`, // Disable pointer events for disabled button
                            "&:hover": {
                              backgroundColor: `${
                                awardBidder?.award_status === "cancelled"
                                  ? "red" // Retain background on hover for disabled
                                  : undefined
                              }`,
                            },
                            "&.Mui-disabled": {
                              backgroundColor: `${
                                awardBidder?.award_status === "cancelled"
                                  ? "red"
                                  : undefined
                              }`, // Keep disabled background same as active
                              color: "white", // Ensure text remains visible
                            },
                          }}
                        >
                          {awardBidder?.award_status}
                        </Button>
                      </>
                    ) : isExpanded === true &&
                      expandedIndex === index &&
                      awardBidder.award_status === "pending" ? (
                      <>
                        <Button
                          variant="outlined"
                          disabled={awardBidder?.award_status === "cancelled"}
                          color="secondary"
                          onClick={() => {
                            cencelProduct(awardBidder?.id);
                          }}
                          className={cn("btn", "button", "reject")}
                        >
                          {awardBidder?.award_status === "cancelled"
                            ? "Cencelled"
                            : "Cancel Product"}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            awardSupplier();
                          }}
                          className={styles["award-btn"]}
                        >
                          Award Supplier
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          disabled={awardBidder?.award_status === "cancelled"}
                          sx={{
                            backgroundColor: `${
                              awardBidder?.award_status === "pending"
                                ? "#FFC107"
                                : awardBidder?.award_status === "cancelled"
                                ? "red"
                                : "#22bb33"
                            }`, // Retain background color
                            color: "white", // Keep text color consistent
                            boxShadow: "none", // Remove box shadow for disabled state
                            pointerEvents: `${
                              awardBidder?.award_status === "cancelled"
                                ? "none"
                                : "auto"
                            }`, // Disable pointer events for disabled button
                            "&:hover": {
                              backgroundColor: `${
                                awardBidder?.award_status === "cancelled"
                                  ? "red" // Retain background on hover for disabled
                                  : undefined
                              }`,
                            },
                            "&.Mui-disabled": {
                              backgroundColor: `${
                                awardBidder?.award_status === "cancelled"
                                  ? "red"
                                  : undefined
                              }`, // Keep disabled background same as active
                              color: "white", // Ensure text remains visible
                            },
                          }}
                        >
                          {awardBidder?.award_status}
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <Table aria-label="suppliers table">
                    <TableHead sx={{ backgroundColor: "#9ec0fa" }}>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "#052c65" }}
                        >
                          SUPPLIERS NAMES
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: "bold", color: "#052c65" }}
                        >
                          BID AMOUNT
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {awardBidder?.participant.map((supplier, index) => (
                        <TableRow
                          key={index}
                          sx={{ "& td": { padding: "12px 16px" } }}
                        >
                          <TableCell>
                            <Radio
                              checked={selectedSupplier === supplier?.id}
                              disabled={
                                awardBidder?.award_status === "cancelled"
                              }
                              onChange={(event) =>
                                handleChange(event, supplier.id)
                              }
                              value={supplier?.company}
                              name="supplier"
                              inputProps={{ "aria-label": supplier?.company }}
                              sx={{
                                "&.Mui-checked": { color: "#062d72" },
                              }}
                            />
                            {supplier?.company}
                          </TableCell>
                          <TableCell align="right">
                            ₹ {supplier?.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}

      <AwardPopUp open={open} handleClose={handleClose} />
    </>
  );
};

export default Analysis;
