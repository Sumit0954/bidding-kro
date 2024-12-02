import React, { useContext, useEffect, useState } from "react";
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
  TableCell,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import DatePicker from "../../../../elements/CustomDateTimePickers/DatePicker";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import { useLocation, useParams } from "react-router-dom";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";

const SampleReceiving = ({ participant, onActionComplete }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { dirtyFields },
  } = useForm();
  const [createdAt, setCreatedAt] = useState("");
  const { id } = useParams();
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];
  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];
  const [loading, setLoading] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  // const [status, setStatus] = useState("Not Approved"); // Default value set to "Not Received"

  const [sampleClosingDate, setSampleClosingDate] = useState();
  const [screenLoader, setScreenLoader] = useState(true);
  const type = new URLSearchParams(useLocation().search).get("type");

  const found = participant?.participants.some(
    (participant) => participant.sample.invite_status === "accepted"
  );

  const filteredParticipants = participant?.participants.filter(
    (p) => p.sample?.invite_status === "accepted"
  );

  const isApproved = filteredParticipants.some(
    (p) => p.sample?.approval_status === "approved"
  );

  const { setAlert } = useContext(AlertContext);

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    id: null,
  });

  const SampleBidInvitationscolumn = Sample_Bid_Invitations_column({
    id,
    onActionComplete,
  });

  console.log(" from prop : ", participant);

  useEffect(() => {
    if (id) {
      const getParticipants = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.PARTICIPANTS_LIST + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            // const participants = response.data.participants;
            // setParticipant(response.data);
            console.log("data :", response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getParticipants();
    }
  }, [
    id,
    participant?.sample?.is_received,
    participant?.sample?.approval_status,
  ]);

  // ---------- SUBMIT SAMPLE DATES --------------

  const sampleStartDate = watch("sample_receive_start_date");
  const sampleEndDate = watch("sample_receive_end_date");

  const formData = new URLSearchParams();
  formData.append("sample_receive_start_date", sampleStartDate);
  formData.append("sample_receive_end_date", sampleEndDate);

  const editformData = new URLSearchParams();
  editformData.append("sample_receive_end_date", sampleEndDate);

  useEffect(() => {
    if (id) {
      let url =
        type === "invited"
          ? PortalApiUrls.RETRIEVE_INVITED_BID
          : PortalApiUrls.RETRIEVE_CREATED_BID;

      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            url + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidDetails(response?.data);
            setScreenLoader(false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [
    id,
    type,
    bidDetails?.sample_receive_end_date,
    bidDetails?.sample_receive_start_date,
    bidDetails?.bid_open_date,
    bidDetails?.bid_close_date,
  ]);

  const submitSampledates = async () => {
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("sample_receive_start_date", sampleStartDate);
    formData.append("sample_receive_end_date", sampleEndDate);

    const editformData = new URLSearchParams();
    editformData.append("sample_receive_end_date", sampleEndDate);

    try {
      const response = await _sendAPIRequest(
        "PATCH",
        `${PortalApiUrls.UPDATE_BID}${bidDetails?.id}/`,
        bidDetails.sample_receive_end_date === null &&
          bidDetails.sample_receive_start_date === null
          ? formData
          : editformData,
        true
      );

      if (response.status === 200) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "Your Bid Dates have been submitted",
          severity: "success",
        });

        // Update the bidDetails state immediately after submission
        setBidDetails(
          (prevDetails) => (
            console.log("prevDetails : ", prevDetails),
            {
              ...prevDetails,
              sample_receive_start_date: sampleStartDate,
              sample_receive_end_date: sampleEndDate,
            }
          )
        );

        if (onActionComplete) {
          onActionComplete(); // Trigger the callback
        }
      }
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

  // ---------- SUBMIT SAMPLE DATES -------------

  // ------------------ SUBMIT LIVE DATES ----------------

  const live_Bid_Opening_Dates = watch("bid_open_date");
  const live_Bid_Closing_Dates = watch("bid_close_date");

  const liveBidsFormdata = new URLSearchParams();
  liveBidsFormdata.append("bid_open_date", live_Bid_Opening_Dates);
  liveBidsFormdata.append("bid_close_date", live_Bid_Closing_Dates);

  const submitliveBidDates = async () => {
    console.log("Dates");
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.SET_LIVE_DATES}${bidDetails?.id}/`,
        liveBidsFormdata,
        true
      );
      if (response.status === 200) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "Live Bid Dates have been submitted",
          severity: "success",
        });

        setBidDetails((prevDetails) => ({
          ...prevDetails,
          bid_open_date: live_Bid_Opening_Dates,
          bid_close_date: live_Bid_Closing_Dates,
        }));

        if (onActionComplete) {
          onActionComplete(); // Trigger the callback
        }
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        isVisible: true,
        message: error.message,
        severity: "er",
      });
    }
  };

  // ------------------ SUBMIT LIVE DATES ---------------------

  // console.log("participant :", participant);

  // const addSampleRecivedAction = (cell) => {
  //   if (cell.column.id === "action") {
  //     return (
  //       <>
  //         <TableCell {...cell.getCellProps()} align="center" padding="none">
  //           <select value={status} onChange={handleStatusChange}>
  //             <option value="Received">Received</option>
  //             <option value="Not Received">Not Received</option>
  //           </select>
  //         </TableCell>
  //       </>
  //     );
  //   }
  // };
  // const addSampleApproveAction = (cell) => {
  //   console.log( "cell" , cell)
  //   if (cell.column.id === "action") {
  //     return (
  //       <>
  //         <TableCell {...cell.getCellProps()} align="center" padding="none">
  //           <select value={status} onChange={handleStatusChange}>
  //             <option value="Received">Approved</option>
  //             <option value="Rejected">Rejected</option>
  //           </select>
  //         </TableCell>
  //       </>
  //     );
  //   }
  // };

  if (screenLoader) {
    return <ScreenLoader />;
  }

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

        {/* <Alert
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
                Click to set the live bidding dates once you're satisfied with
                the samples, even before sample receving closing dates.
              </span>
            </p>
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
        </Alert> */}
        <br />
        <div className="row">
          <form
          // onSubmit={handleSubmit(submitSampledates)}
          >
            <div className="row">
              <div className="col-lg-6">
                <DatePicker
                  disableField={
                    bidDetails?.sample_receive_start_date !== null
                      ? true
                      : false
                  }
                  control={control}
                  label="Sample Receiving Opening Date"
                  name="sample_receive_start_date"
                  rules={
                    sampleEndDate === null
                      ? {
                          required: "Opening Date is required.",
                          validate: (value) =>
                            dateValidator(value, minDate, maxDate),
                        }
                      : null
                  }
                  textFieldProps={{
                    min: `${minDate}T12:00`,
                    max: `${maxDate}T17:00`,
                  }}
                  clearErrors={clearErrors}
                  value={bidDetails?.sample_receive_start_date} // Bind value to selected date
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
                  value={bidDetails?.sample_receive_end_date}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Button
                  // type="submit"
                  variant="contained"
                  className={styles["form-button"]}
                  onClick={submitSampledates}
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
              Sample Bid Invitations
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <DataTable
              propsColumn={Sample_Bid_Invitations_result_log}
              propsData={participant.participants || []}
            />
          </AccordionDetails>
        </Accordion>
        <div className="row">
          {bidDetails?.bid_close_date === null ? (
            <>
              {isApproved ? (
                <>
                  <br />
                  <Alert severity="info" sx={{ marginBottom: "10px" }}>
                    <p className={styles["alert-message"]}>
                      <span> Note : </span>
                      Please submit the Live Bid Date & time to invite the
                      Approved Suppliers.
                    </p>
                  </Alert>
                  <br />
                  <form
                  // onSubmit={handleSubmit(submitliveBidDates)}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <DateTimeRangePicker
                          control={control}
                          label="Opening Date & Time"
                          name="bid_open_date"
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
                          name={"bid_close_date"}
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
                    <div className="row mt-3">
                      <div className="col-12">
                        {loading ? (
                          <ButtonLoader size={60} />
                        ) : (
                          <Button
                            // type="submit"
                            variant="contained"
                            className={styles["form-button"]}
                            onClick={submitliveBidDates}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        {found && (
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
                propsColumn={SampleBidInvitationscolumn}
                propsData={filteredParticipants || []}
                // action={addSampleRecivedAction}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </>
  );
};

export default SampleReceiving;
