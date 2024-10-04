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
import { ExpandMore } from "@mui/icons-material";
import styles from "./Award.module.scss";

const Award = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const handleChange = (event) => {
    setSelectedSupplier(event.target.value);
  };
  return (
    <>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" className={styles["award-button"]}>
          Award Selected
        </Button>
      </Box>

      <div className={styles["heading"]}>
        <Typography variant="h6">Product Name</Typography>
      </div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Cotton Design Fabric</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="suppliers table">
              <TableHead>
                <TableRow>
                  <TableCell>SUPPLIERS NAMES</TableCell>
                  <TableCell>BID AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Radio
                      checked={selectedSupplier === "Arvind Limited"}
                      onChange={handleChange}
                      value="Arvind Limited"
                      name="supplier"
                      inputProps={{ "aria-label": "Arvind Limited" }}
                    />
                    Arvind Limited
                  </TableCell>
                  <TableCell>₹ 7000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Radio
                      checked={selectedSupplier === "Raymond Limited"}
                      onChange={handleChange}
                      value="Raymond Limited"
                      name="supplier"
                      inputProps={{ "aria-label": "Raymond Limited" }}
                    />
                    Raymond Limited
                  </TableCell>
                  <TableCell>₹ 9000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Radio
                      checked={selectedSupplier === "Alok Industries Limited"}
                      onChange={handleChange}
                      value="Alok Industries Limited"
                      name="supplier"
                      inputProps={{ "aria-label": "Alok Industries Limited" }}
                    />
                    Alok Industries Limited
                  </TableCell>
                  <TableCell>₹ 8000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Award;
