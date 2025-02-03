import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
// import DateTimeRangePicker from "../../../../elements/CustomDateTimePickers/DateTimeRangePicker";
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
// import DatePicker from "../../../../elements/CustomDateTimePickers/DatePicker";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import { useLocation, useParams } from "react-router-dom";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../store/tabSlice";

const SampleReceiving = ({ participant, onActionComplete }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { dirtyFields },
    setValue,
    formState: { errors },
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
  const dispatch = useDispatch();

  // const [status, setStatus] = useState("Not Approved"); // Default value set to "Not Received"

  const [liveOpeningDate, setLiveOpeningDate] = useState("");
  const [sampleOpeningDate, setSampleOpeningDate] = useState("");
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

  const [bidDate, setBidDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });

  const bidStartDate = watch("bid_start_date");
  const bidEndDate = watch("bid_end_date");

  // const handleTimeChange = (field, value) => {
  //   setTimeRange((prev) => ({ ...prev, [field]: value }));
  // };

  const handleTimeChange = (type, value) => {
    if (type === "start") {
      setTimeRange((prev) => ({
        ...prev,
        start: value,
        end:
          prev.end &&
          dayjs(`${bidDate}T${prev.end}`).isBefore(dayjs(`${bidDate}T${value}`))
            ? null // Reset end time if it becomes invalid
            : prev.end,
      }));
    } else if (type === "end") {
      if (
        timeRange.start &&
        dayjs(`${bidDate}T${value}`).isBefore(
          dayjs(`${bidDate}T${timeRange.start}`)
        )
      ) {
        alert("End Time cannot be earlier than Start Time.");
        return;
      }
      setTimeRange((prev) => ({
        ...prev,
        end: value,
      }));
    }
  };

  const submitliveBidDates = async () => {
    if (!bidDate || !timeRange.start || !timeRange.end) {
      setAlert({
        isVisible: true,
        message: "Please select a valid date and time range.",
        severity: "error",
      });
      return;
    }

    const bidOpenDate = dayjs(`${bidDate}T${timeRange.start}`).toISOString();
    const bidCloseDate = dayjs(`${bidDate}T${timeRange.end}`).toISOString();

    const formData = new URLSearchParams();
    formData.append("bid_open_date", bidOpenDate);
    formData.append("bid_close_date", bidCloseDate);

    try {
      setLoading(true);
      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls.BID_SET_DATE}${bidDetails.id}/`,
        formData,
        true
      );
      setLoading(false);
      if (response.status === 200) {
        setAlert({
          isVisible: true,
          message: "Bid dates updated successfully.",
          severity: "success",
        });
        setBidDetails((prevDetails) => ({
          ...prevDetails,
          bid_open_date: bidStartDate,
          bid_close_date: bidEndDate,
        }));
        if (onActionComplete) {
          onActionComplete();
        }
        dispatch(setActiveTab(4));
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        isVisible: true,
        message: error.response?.data?.error || "An error occurred.",
        severity: "error",
      });
    }
  };

  // --------------------- SUBMIT LIVE DATES ---------------------

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

        <br />
        <div className="row">
          <form>
            <div className="row" style={{ width: "100%" }}>
              <div className="col-lg-4">
                <Controller
                  name="sample_receive_start_date"
                  control={control}
                  defaultValue={bidDetails?.sample_receive_start_date || null}
                  rules={{
                    required: !bidDetails?.sample_receive_start_date
                      ? "Opening Date is required."
                      : false,
                    validate: (value) => {
                      if (!bidDetails?.sample_receive_start_date) {
                        const date = dayjs(value);
                        return date.isValid() || "Invalid date range";
                      }
                      return true; // Skip validation if the field is disabled
                    },
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Sample Receiving Opening Date"
                      value={
                        field.value
                          ? dayjs(field.value)
                          : bidDetails?.sample_receive_start_date
                          ? dayjs(bidDetails.sample_receive_start_date)
                          : null
                      }
                      minDate={dayjs()}
                      onChange={(value) => {
                        if (!bidDetails?.sample_receive_start_date) {
                          const formattedValue = value
                            ? value.format("YYYY-MM-DD")
                            : null;
                          field.onChange(formattedValue);
                          setValue("sample_receive_start_date", formattedValue);
                          setSampleOpeningDate(formattedValue);
                          clearErrors("sample_receive_start_date");
                        }
                      }}
                      disabled={bidDetails?.sample_receive_start_date !== null}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          style: {
                            height: "40px",
                            fontSize: "14px",
                          },
                          error: !!errors.sample_receive_start_date,
                          helperText: errors.sample_receive_start_date?.message,
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-lg-4">
                <Controller
                  name="sample_receive_end_date"
                  control={control}
                  rules={{
                    required: "Closing Date is required.",
                    validate: (value) => {
                      const date = dayjs(value);
                      return date.isValid() || "Invalid date range";
                    },
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Sample Receiving Closing Date"
                      value={
                        field.value // Use field.value if it's set
                          ? dayjs(field.value)
                          : bidDetails?.sample_receive_end_date // Otherwise use the bidDetails value
                          ? dayjs(bidDetails.sample_receive_end_date)
                          : null
                      }
                      minDate={
                        bidDetails?.sample_receive_start_date
                          ? dayjs(bidDetails?.sample_receive_start_date)
                          : dayjs(sampleOpeningDate)
                      }
                      onChange={(value) => {
                        const formattedValue = value
                          ? value.format("YYYY-MM-DD")
                          : null;
                        setValue("sample_receive_end_date", formattedValue);
                        clearErrors("sample_receive_end_date");
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          style: {
                            height: "40px",
                            fontSize: "14px",
                          },
                          error: !!errors.sample_receive_end_date,
                          helperText: errors.sample_receive_end_date?.message,
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-lg-4">
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "56px" }}
                  // className={styles["form-button"]}
                  onClick={handleSubmit(submitSampledates)}
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

        <div className="row">
          {bidDetails?.bid_close_date === null ? (
            <>
              {isApproved ? (
                <>
                  <br />
                  <Alert severity="info">
                    <p className={styles["alert-message"]}>
                      <span> Note : </span>
                      Please submit the Live Bid Date & time to invite the
                      Approved Suppliers.
                    </p>
                  </Alert>
                  <br />

                  <form
                  // onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <Box
                        display="flex"
                        flexDirection="row"
                        gap={2}
                        width="100%"
                      >
                        <Box flex="1" style={{ maxWidth: "25%" }}>
                          <DatePicker
                            label="Live Bid Date *"
                            value={bidDate ? dayjs(bidDate) : null}
                            minDate={dayjs()}
                            format="DD/MM/YYYY"
                            onChange={(value) =>
                              setBidDate(value?.format("YYYY-MM-DD") || null)
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                required: true,
                                style: {
                                  height: "40px",
                                  fontSize: "14px",
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box flex="1" style={{ maxWidth: "25%" }}>
                          <TimePicker
                            label="Start Time"
                            value={
                              timeRange.start
                                ? dayjs(`${bidDate}T${timeRange.start}`)
                                : null
                            }
                            minutesStep={15}
                            onChange={(value) =>
                              handleTimeChange(
                                "start",
                                value?.format("HH:mm") || null
                              )
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                style: {
                                  height: "40px",
                                  fontSize: "14px",
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box flex="1" style={{ maxWidth: "25%" }}>
                          <TimePicker
                            label="End Time"
                            value={
                              timeRange.end
                                ? dayjs(`${bidDate}T${timeRange.end}`)
                                : null
                            }
                            minutesStep={15}
                            onChange={(value) =>
                              handleTimeChange(
                                "end",
                                value?.format("HH:mm") || null
                              )
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                style: {
                                  height: "40px",
                                  fontSize: "14px",
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box flex="1" style={{ maxWidth: "25%" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            // type="submit"
                            disabled={loading}
                            style={{
                              width: "100%",
                              height: "56px",
                              fontSize: "14px",
                            }}
                            className={styles["form-button"]}
                            onClick={submitliveBidDates}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </Button>
                        </Box>
                      </Box>
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
        {isApproved ? (
          <div
            className={styles["btn-container"]}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // gap: "10px",
              marginTop: "50px",
            }}
          >
            <button
              type="button"
              className={cn("btn", "button")}
              onClick={() => dispatch(setActiveTab(3))}
            >
              Invited Suppliers for Live Bid
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SampleReceiving;
