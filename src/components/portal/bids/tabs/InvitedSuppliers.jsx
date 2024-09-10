import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import DateTimeRangePicker from "../../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import { dateValidator } from "../../../../helpers/validation";
import cn from "classnames";
import styles from "./InvitedSuppliers.module.scss";
import { getMinMaxDate } from "../../../../helpers/common";
import {
  l1_participants_column,
  products_Column,
} from "../../../../elements/CustomDataTable/PortalColumnData";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";

const InvitedSuppliers = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { dirtyFields },
  } = useForm();
  const [createdAt, setCreatedAt] = useState("");
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];
  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    id: null,
  });

  const handleDeleteConfirmation = () => {

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <form>
            <div className="row">
              <div className="col-lg-6">
                <DateTimeRangePicker
                  control={control}
                  label="Opening Date & Time"
                  name="bid_start_date"
                  rules={{
                    required: "Opening Date & Time is required.",
                    validate: (value) => dateValidator(value, minDate, maxDate),
                  }}
                  textFieldProps={{
                    min: `${minDate}T12:00`,
                    max: `${maxDate}T17:00`,
                  }}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="col-lg-6">
                <DateTimeRangePicker
                  control={control}
                  label="Closing Date & Time"
                  name="bid_end_date"
                  rules={{
                    required: "Closing Date & Time is required.",
                    validate: (value) => dateValidator(value, minDate, maxDate),
                  }}
                  textFieldProps={{
                    min: `${minDate}T12:00`,
                    max: `${maxDate}T17:00`,
                  }}
                  clearErrors={clearErrors}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Button
                type="submit"
                  variant="contained"
                  className={styles["form-button"]}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Invited Suppliers
            </Typography>
          </AccordionSummary>
          <Box display="flex" gap={10} mb={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#6c757d",
                color: "#fff",
                "&:hover": { backgroundColor: "#5a6268" },
              }}
            >
              Invited : 20 {""}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#007bff",
                color: "#fff",
                "&:hover": { backgroundColor: "#0069d9" },
              }}
            >
              Accepted : 08 {""}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              Participated : 05 {""}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#dc3545",
                color: "#fff",
                "&:hover": { backgroundColor: "#c82333" },
              }}
            >
              Declined : 02 {""}
            </Button>
          </Box>

          <AccordionDetails>
            {/* <DataTable propsColumn={l1_participants_column} /> */}
          </AccordionDetails>
        </Accordion>
      </div>

      {/* <button onClick={() =>
              setDeleteDetails({
                open: true,
                title: "Revoke Participant",
                message: `Are you sure you want to revoke this`,
                // id: cell.row.original.company.id,
              })
            }>Revoke</button> */}

      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleDeleteConfirmation}
        />
      )}
    </>
  );
};

export default InvitedSuppliers;
