import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
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
import styles from "./Award.module.scss";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import AwardPopUp from "../../../../elements/CustomModal/AwardPopUp ";
import cn from "classnames";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
const Analysis = ({ bidDetails }) => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [screenLoader, setScreenLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bidders, setBidders] = useState([]);
  const [supplierName, setSupplierName] = useState();
  const [awardStatus, setAwardStatus] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    alertmessage: "",
    id: null,
    handleAction: "",
  });

  const handleChange = (event, id) => {
    setSupplierName(event.target.value);
    setSelectedSupplier(id);
  };

  const handleAccordionChange = (index, event) => {
    if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
      return;
    }
    setIsExpanded(!isExpanded);
    setExpandedIndex((prevIndex) => (prevIndex === index ? false : index));
  };

  const handleCencelProduct = (choice) => {
    if (choice) {
      cencelProduct(deleteDetails?.id, deleteDetails.alertmessage);
      setExpandedIndex(false);
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        alertmessage: "",
        id: null,
      });
    }
  };

  const handleProductAward = (choice) => {
    if (choice) {
      awardSupplier();
      setExpandedIndex(false);
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        alertmessage: "",
        id: null,
      });
    }
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
        console.log(response.data, " : awarded");
        setBidders(response.data);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  const awardSupplier = async () => {
    if (selectedSupplier) {
      try {
        const response = await _sendAPIRequest(
          "PUT",
          PortalApiUrls.LIVE_BID_AWARD_BUYER + `${selectedSupplier}/`,
          "",
          true
        );

        if (response) {
          setDeleteDetails({ open: false });
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
        setDeleteDetails({ open: false });
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
  }, [awardStatus, deleteDetails.open]);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  const isNonL1 = bidders.some((bidder) => {
    if (!bidder?.participant?.length) return false;
    const supplier = bidder.participant.find((s) => s.company === supplierName);
    if (!supplier) return false;
    return supplier.position !== 1;
  });

  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Product Name</Typography>
      </div>

      {bidders.map((awardBidder, index) => {
        return (
          <Accordion
            key={index}
            expanded={true} // ✅ sab hamesha open
            sx={{
              margin: "16px 0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {/* 3) SUMMARY pe click => is accordian ko active banao */}
            <AccordionSummary onClick={() => setActiveIndex(index)}>
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
                  {awardBidder.award_status === "pending" &&
                  activeIndex === index ? (
                    <>
                      <Button
                        variant="outlined"
                        disabled={awardBidder?.award_status === "cancelled"}
                        color="secondary"
                        onClick={(event) => {
                          event.stopPropagation(); // summary click ko cancel karo
                          setDeleteDetails({
                            open: true,
                            title: "Cancel Product Confirmation",
                            message: `Are you sure you want to cancel ${awardBidder?.product} Product?`,
                            alertmessage: `${awardBidder?.product} Cancelled Successfully`,
                            id: awardBidder?.id,
                            handleAction: "cancelProduct", // ✨ typo fixed
                          });
                        }}
                        className={cn("btn", "button", "reject")}
                      >
                        {awardBidder?.award_status === "cancelled"
                          ? "Cancelled"
                          : "Cancel Product"}
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeleteDetails({
                            open: !!selectedSupplier,
                            title: "Award Supplier",
                            message: `Are you sure you want to award this supplier?`,
                            alertmessage: "Product awarded Successfully",
                            id: awardBidder?.id,
                            handleAction: "awardSupplier",
                          });
                        }}
                        className={styles["award-btn"]}
                      >
                        Award Supplier
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={awardBidder?.award_status === "cancelled"}
                      sx={{
                        backgroundColor:
                          awardBidder?.award_status === "pending"
                            ? "#FFC107"
                            : awardBidder?.award_status === "cancelled"
                            ? "red"
                            : "#22bb33",
                        color: "white",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor:
                            awardBidder?.award_status === "cancelled"
                              ? "red"
                              : undefined,
                        },
                        "&.Mui-disabled": {
                          backgroundColor:
                            awardBidder?.award_status === "cancelled"
                              ? "red"
                              : undefined,
                          color: "white",
                        },
                      }}
                    >
                      {awardBidder?.award_status}
                    </Button>
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
                      <TableCell sx={{ fontWeight: "bold", color: "#052c65" }}>
                        SUPPLIERS NAMES
                      </TableCell>
                      {/* ✨ small fix: centers -> center */}
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", color: "#052c65" }}
                      >
                        BID AMOUNT
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", color: "#052c65" }}
                      >
                        BID POSITION
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {awardBidder?.participant
                      ?.sort((a, b) => a.amount - b.amount)
                      .map((supplier, i) => (
                        <TableRow
                          key={i}
                          sx={{ "& td": { padding: "12px 16px" } }}
                        >
                          <TableCell>
                            <Radio
                              checked={
                                selectedSupplier === supplier?.id ||
                                supplier?.is_awarded
                              }
                              disabled={
                                awardBidder?.award_status === "cancelled" ||
                                awardBidder?.award_status === "awarded"
                              }
                              onChange={(event) =>
                                handleChange(event, supplier.id)
                              }
                              value={supplier?.company}
                              name="supplier"
                              inputProps={{ "aria-label": supplier?.company }}
                              sx={{ "&.Mui-checked": { color: "#062d72" } }}
                            />
                            {supplier?.company}
                          </TableCell>
                          <TableCell align="left">
                            ₹ {supplier?.amount}
                          </TableCell>
                          <TableCell align="right">
                            {supplier?.position}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <AwardPopUp open={open} handleClose={handleClose} />

      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={
            deleteDetails.handleAction === "cencelProduct"
              ? handleCencelProduct
              : handleProductAward
          }
          supplierName={supplierName}
          isNonL1={isNonL1}
        />
      )}
    </>
  );
};

export default Analysis;
