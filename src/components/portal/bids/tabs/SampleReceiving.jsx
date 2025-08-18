import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import cn from "classnames";
import styles from "./SampleReceiving.module.scss";
import {
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
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { useLocation, useParams } from "react-router-dom";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../store/tabSlice";
import classNames from "classnames";

const SampleReceiving = ({ participant, onActionComplete }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [bidDate, setBidDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });
  const { setAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const [sampleOpeningDate, setSampleOpeningDate] = useState("");
  const [screenLoader, setScreenLoader] = useState(true);
  const type = new URLSearchParams(useLocation().search).get("type");

  const found = participant?.participants.some(
    (participant) => participant.sample.invite_status === "accepted"
  );

  const filteredParticipants = participant?.participants.filter(
    (p) => p.sample?.invite_status === "accepted"
  );

  const isApproved =
    Array.isArray(filteredParticipants) &&
    filteredParticipants.some((p) => p.sample?.approval_status === "approved");
  const SampleBidInvitationscolumn = Sample_Bid_Invitations_column({
    id,
    onActionComplete,
  });

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

  const bidStartDate = watch("bid_start_date");
  const bidEndDate = watch("bid_end_date");

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
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      }
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
        <Alert severity="info" sx={{ mb: "2rem", mt: "2rem" }}>
          <p className={styles["alert-message"]}>
            <span> Note : </span>
            You can extend the sample submission dates if needed. Adjust
            accordingly to meet requirements.
          </p>
        </Alert>

        <form>
          <div className="row g-3">
            <Tooltip
              title={
                bidDetails?.sample_receive_start_date &&
                "You can't change the opening date"
              }
            >
              <div
                className="col-12 col-md-4 mb-3"
                style={{
                  cursor: bidDetails?.sample_receive_start_date
                    ? "not-allowed"
                    : "default",
                }}
              >
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
                      return true;
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
                            pointerEvents: bidDetails?.sample_receive_start_date
                              ? "none"
                              : "auto",
                          },
                          error: !!errors.sample_receive_start_date,
                          helperText: errors.sample_receive_start_date?.message,
                        },
                      }}
                    />
                  )}
                />
              </div>
            </Tooltip>

            <Tooltip
              title={
                bidDetails?.sample_receive_end_date !== null &&
                "Extend closing date accordingly"
              }
            >
              <div className="col-12 col-md-4 mb-3 ">
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
                        field.value
                          ? dayjs(field.value)
                          : bidDetails?.sample_receive_end_date
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
            </Tooltip>

            <div className="col-12 col-md-4">
              <Button
                variant="contained"
                className={styles["form-btn"]}
                style={{ width: "100%", height: "56px" }}
                onClick={handleSubmit(submitSampledates)}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>

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

        {bidDetails?.bid_close_date === null ? (
          <>
            {isApproved ? (
              <>
                <Alert severity="info" sx={{ mb: "2rem" }}>
                  <p className={styles["alert-message"]}>
                    <span> Note : </span>
                    Please submit the Live Bid Date & time to invite the
                    Approved Suppliers.
                  </p>
                </Alert>

                <form>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    mt={2}
                    width="100%"
                  >
                    <Box
                      sx={{
                        flexBasis: { xs: "100%", sm: "48%", md: "23%" },
                        flexGrow: 1,
                      }}
                    >
                      <DatePicker
                        label="Live Bid Date"
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

                    <Box
                      sx={{
                        flexBasis: { xs: "100%", sm: "48%", md: "23%" },
                        flexGrow: 1,
                        mt: { xs: 2, md: 0 },
                      }}
                    >
                      <TimePicker
                        label="Start Time"
                        value={
                          timeRange.start
                            ? dayjs(`${bidDate}T${timeRange.start}`)
                            : null
                        }
                        minutesStep={15}
                        disabled={!bidDate}
                        onChange={(value) =>
                          handleTimeChange(
                            "start",
                            value?.format("HH:mm") || null
                          )
                        }
                        closeOnSelect={false}
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

                    <Box
                      sx={{
                        flexBasis: { xs: "100%", sm: "48%", md: "23%" },
                        flexGrow: 1,
                        mt: { xs: 2, md: 0 },
                      }}
                    >
                      <TimePicker
                        label="End Time"
                        value={
                          timeRange.end
                            ? dayjs(`${bidDate}T${timeRange.end}`)
                            : null
                        }
                        minutesStep={15}
                        closeOnSelect={false}
                        onAccept={(value) =>
                          handleTimeChange(
                            "end",
                            value?.format("HH:mm") || null
                          )
                        }
                        minTime={
                          timeRange.start
                            ? dayjs(`${bidDate}T${timeRange.start}`).add(
                                1,
                                "minute"
                              )
                            : undefined
                        }
                        disabled={!timeRange.start}
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

                    <Box
                      sx={{
                        flexBasis: { xs: "100%", sm: "48%", md: "23%" },
                        flexGrow: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{
                          width: "100%",
                          height: "56px",
                          fontSize: "14px",
                          mt: { xs: 2, md: 0 },
                        }}
                        onClick={submitliveBidDates}
                        className={classNames("btn", "button")}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {isApproved ? (
          <button
            className={cn("btn", "button")}
            onClick={() => dispatch(setActiveTab(3))}
            style={{ float: "right", marginTop: "2rem" }}
          >
            Invited Suppliers for Live Bid
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SampleReceiving;
