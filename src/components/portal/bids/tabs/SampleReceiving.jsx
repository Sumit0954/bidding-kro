import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import DateTimeRangePicker from "../../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import { dateValidator } from "../../../../helpers/validation";
import cn from "classnames";
import styles from "./SampleReceiving.module.scss";
import { getMinMaxDate } from "../../../../helpers/common";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  l1_participants_column,
  products_Column,
  Sample_Bid_Invitations_column,
  Sample_Bid_Invitations_result_log,
} from "../../../../elements/CustomDataTable/PortalColumnData";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import DatePicker from "../../../../elements/CustomDateTimePickers/DatePicker";

const SampleReceiving = ({ bidDetails }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { dirtyFields },
  } = useForm();
  const [createdAt, setCreatedAt] = useState("");
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];
  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];
  const [loading, setLoading] = useState(false);

  const { setAlert } = useContext(AlertContext);

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    id: null,
  });

  const sampleStartDate = watch("sample_receive_start_date");
  const sampleEndDate = watch("sample_receive_end_date");

  const handleDeleteConfirmation = () => {};

  const formData = new URLSearchParams();
  formData.append("sample_receive_start_date", sampleStartDate);
  formData.append("sample_receive_end_date", sampleEndDate);

  const submitSampledates = async () => {
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
        setAlert({
          isVisible: true,
          message: "Your Bid Dates have been submitted",
          severity: "success",
        });
      }
      window.location.reload();
    } catch (error) {
      setLoading(false);
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
        <Alert severity="info" sx={{ marginBottom: "10px" }}>
          <p className={styles["alert-message"]}>
            <span> Note : </span>
            You can extend the sample submission dates if needed. Adjust
            accordingly to meet requirements.
          </p>
        </Alert>
        <br />

        <Alert
          severity="info"
          sx={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
          className={styles["alert-container"]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p className={styles["amendment-info"]} style={{ margin: 0 }}>
              <span>
                You can extend the sample submission dates if needed. Adjust
                accordingly to meet requirements.
              </span>
            </p>
            {/*  */}
            <Button
              disabled={
                bidDetails?.sample_receive_end_date === null ? true : false
              }
              type="submit"
              variant="contained"
              className={
                bidDetails?.sample_receive_end_date === null
                  ? styles["disable"]
                  : styles["note-button"]
              }
              startIcon={<PriorityHighIcon />}
            >
              Set Live Bid
            </Button>
          </Box>
        </Alert>
        <br />
        <div className="row">
          <form onSubmit={handleSubmit(submitSampledates)}>
            <div className="row">
              <div className="col-lg-6">
                <DatePicker
                  disableField={
                    bidDetails?.sample_receive_start_date === null
                      ? false
                      : true
                  }
                  control={control}
                  label="Sample Receiving Opening Date"
                  name="sample_receive_start_date"
                  rules={{
                    required: "Opening Date is required.",
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
                <DatePicker
                  control={control}
                  label="Sample Receiving Closing Date"
                  name="sample_receive_end_date"
                  rules={{
                    required: "Closing Date is required.",
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
        <br />
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

          <AccordionDetails>
            <DataTable
              propsColumn={Sample_Bid_Invitations_column}
              propsData={[]}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Sample Bid Invitations
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <DataTable
              propsColumn={Sample_Bid_Invitations_result_log}
              propsData={[]}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default SampleReceiving;
