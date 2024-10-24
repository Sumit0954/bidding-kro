import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import _sendAPIRequest, { setErrors } from "../../../../helpers/api";
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
  TableCell,
  Typography,
} from "@mui/material";
import { ExpandMore, Watch } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import CustomInput from "../../../../elements/CustomInput/CustomInput";

const InvitedSuppliers = ({ participant, bidDetails, onActionComplete }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { dirtyFields },
  } = useForm();
  const [createdAt, setCreatedAt] = useState("");
  const [revokesupplier, setRevokeSupplier] = useState(false);
  const [loading, setLoading] = useState(false);
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];

  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];

  const bidStartDate = watch("bid_start_date");
  const bidEndDate = watch("bid_end_date");

  const { setAlert } = useContext(AlertContext);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    alertmessage: "",
    id: null,
  });

  const filteredParticipants = participant?.participants.filter(
    (p) => p.sample?.approval_status === "approved"
  );

  const handleAction = async (id, alertmessage) => {
    try {
      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.REVOKE_PARTICIPANT}${id}/`,
        "",
        true
      );
      if (response.status === 204) {
        setAlert({
          isVisible: true,
          message: `${alertmessage} Successfully revoked`,
          severity: "success",
        });
        window.location.reload();
      }
    } catch (error) {
      const { data } = error.response;
      if (data) {
        setErrors(data, Watch, setErrors);
        if (data.error) {
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
          });
        }
      }
    }
  };

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleAction(deleteDetails.id, deleteDetails.alertmessage);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
    }
  };

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      // const found = participants.some(
      //   (participant) => participant.company.id === cell.row.original.id
      // );

      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={styles["table-link"]}
            onClick={() =>
              setDeleteDetails({
                open: true,
                title: `Revoke Supplier`,
                message: `Are you want to revoke ${cell.row.original.company.name}`,
                alertmessage: cell.row.original.company.name,
                id: cell.row.original.id,
              })
            }
          >
            Revoke
          </button>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()} align={cell.column.align}>
          {" "}
          {cell.render("Cell")}{" "}
        </TableCell>
      );
    }
  };

  const formData = new URLSearchParams();
  formData.append("bid_open_date", bidStartDate);
  formData.append("bid_close_date", bidEndDate);

  const submitdate = async () => {
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "PATCH",
        `${PortalApiUrls.UPDATE_BID}${bidDetails?.id}/`,
        formData,
        true
      );

      if (response.status === 200) {
        setLoading(false);
        window.location.reload();
        setAlert({
          isVisible: true,
          message: "Your Bid Dates have been submitted",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);

      // Set an error alert based on the response error
      setAlert({
        isVisible: true,
        message:
          error?.response?.data?.error || "An unexpected error occurred.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {bidDetails?.bid_open_date === null ? (
            <form onSubmit={handleSubmit(submitdate)}>
              <div className="row">
                <div className="col-lg-6">
                  <DateTimeRangePicker
                    control={control}
                    label="Opening Date & Time"
                    name="bid_start_date"
                    rules={{
                      required: "Opening Date & Time is required.",
                      validate: (value) =>
                        dateValidator(value, minDate, maxDate),
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
                      validate: (value) =>
                        dateValidator(value, minDate, maxDate),
                    }}
                    textFieldProps={{
                      min: `${minDate}T12:00`,
                      max: `${maxDate}T17:00`,
                    }}
                    clearErrors={clearErrors}
                  />
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-6">
                  <CustomInput
                    control={control}
                    label="Minimum bid Amount increment"
                    name= "Minimum_bid_Amount_increment"
                    placeholder="₹ 20,000"
                    // rules={{
                    //   required: "Minimum bid Amount increment is required.",
                    // }}
                  />
                </div>
              </div> */}
              <div className="row mt-3">
                <div className="col-12">
                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      className={styles["form-button"]}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <></>
          )}
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

          <Box
            display="flex"
            gap={2} // Reduce gap for smaller screens
            mb={2}
            justifyContent="center"
            flexWrap="wrap" // Make the buttons wrap to the next line on smaller screens
          >
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#6c757d",
                color: "#fff",
                "&:hover": { backgroundColor: "#5a6268" },

                marginBottom: "10px", // Add some space between rows on wrap
              }}
            >
              Invited : 0{participant.invited_count}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#007bff",
                color: "#fff",
                "&:hover": { backgroundColor: "#0069d9" },

                marginBottom: "10px", // Add some space between rows on wrap
              }}
            >
              Accepted : 0{participant.accepted_count}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": { backgroundColor: "#218838" },

                marginBottom: "10px", // Add some space between rows on wrap
              }}
            >
              Participated : 0{participant.participated_count}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "190px",
                backgroundColor: "#dc3545",
                color: "#fff",
                "&:hover": { backgroundColor: "#c82333" },

                marginBottom: "10px", // Add some space between rows on wrap
              }}
            >
              Declined : 0{participant.rejected_count}
            </Button>
          </Box>

          <AccordionDetails>
            <DataTable
              propsColumn={l1_participants_column}
              propsData={
                bidDetails?.type === "L1"
                  ? participant.participants
                  : filteredParticipants
              }
              action={addAction}
            />
          </AccordionDetails>
        </Accordion>
      </div>

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
