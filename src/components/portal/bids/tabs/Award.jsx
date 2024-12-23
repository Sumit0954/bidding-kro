import React, { useState } from "react";
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
const Analysis = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAwardSupplier = () => {
    if (selectedSupplier) {
      handleOpen();
    } else {
      alert("Please select a supplier before awarding.");
    }
  };

  const topBiders = [
    { name: "Arvind Limited", amount: "₹ 7000" },
    { name: "Raymond Limited", amount: "₹ 9000" },
    { name: "Alok Industries Limited", amount: "₹ 8000" },
  ];
  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Product Name</Typography>
      </div>
      <Accordion
        defaultExpanded
        sx={{
          margin: "16px 0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
        onChange={handleAccordionChange}
      >
        {/* */}
        <AccordionSummary
          expandIcon={!expanded && <ExpandMore sx={{ color: "#062d72" }} />}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.05rem", color: "#052c65" }}
            >
              Cotton Design Fabric
            </Typography>
            {expanded && (
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  // onClick={handleCancelProduct} // Define this function
                  className={cn("btn", "button", "reject")}
                >
                  Cancel Product
                </Button>
                {btnLoader ? (
                  <ButtonLoader size={60} />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAwardSupplier} // Define this function
                    className={styles["award-btn"]}
                  >
                    Award Supplier
                  </Button>
                )}
              </Box>
            )}
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
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", color: "#052c65" }}
                  >
                    BID AMOUNT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topBiders.map((supplier, index) => (
                  <TableRow
                    key={index}
                    sx={{ "& td": { padding: "12px 16px" } }}
                  >
                    <TableCell>
                      <Radio
                        checked={selectedSupplier === supplier.name}
                        onChange={handleChange}
                        value={supplier.name}
                        name="supplier"
                        inputProps={{ "aria-label": supplier.name }}
                        sx={{
                          "&.Mui-checked": { color: "#062d72" },
                        }}
                      />
                      {supplier.name}
                    </TableCell>
                    <TableCell align="right">{supplier.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <AwardPopUp open={open} handleClose={handleClose} />
    </>
  );
};

export default Analysis;
