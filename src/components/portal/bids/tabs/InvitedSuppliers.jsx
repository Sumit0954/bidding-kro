import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _sendAPIRequest, { setErrors } from "../../../../helpers/api";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import styles from "./InvitedSuppliers.module.scss";
import { l1_participants_column } from "../../../../elements/CustomDataTable/PortalColumnData";
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
import { ExpandMore, Watch } from "@mui/icons-material";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../store/tabSlice";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import classNames from "classnames";

const InvitedSuppliers = ({ onActionComplete, id, type }) => {
  const {
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = useForm();
  const dispatch = useDispatch();
  const [screenLoader, setScreenLoader] = useState(true);
  const [bidDetails, setBidDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    alertmessage: "",
    id: null,
  });
  const [participant, setParticipant] = useState();
  const [refresh, setRefresh] = useState(0);

  const [bidDate, setBidDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });

  const bidStartDate = watch("bid_start_date");
  const bidEndDate = watch("bid_end_date");

  const { setAlert } = useContext(AlertContext);

  const filteredParticipants = participant?.participants.filter(
    (p) => p.sample?.approval_status === "approved"
  );

  const handleRefresh = () => {
    setRefresh((prevKey) => prevKey + 1); // Increment the refresh key
  };

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
            setParticipant(response.data);
            setInterval(() => {
              setScreenLoader(false);
            }, 1000);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getParticipants();
    }
  }, [id, refresh]);

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
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, type, bidDetails?.bid_open_date]);

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
        setDeleteDetails({ open: false, title: "", message: "", action: "" });
        handleRefresh();
      }
    } catch (error) {
      const { data } = error.response;
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      }
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
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={styles["table-link"]}
            disabled={
              bidDetails.status === "completed" ||
              bidDetails.status === "closed" ||
              bidDetails.status === "live" ||
              cell.row.original.status === "declined"
            }
            onClick={() =>
              setDeleteDetails({
                open: true,
                title: `Revoke Supplier`,
                message: `Are you want to revoke ${cell.row.original.company.name} for this bid? This action cannot be undone.`,
                alertmessage: cell.row.original.company.name,
                id: cell.row.original.id,
              })
            }
          >
            {bidDetails.status === "completed" ||
            bidDetails.status === "closed" ||
            bidDetails.status === "live" ||
            cell.row.original.status === "declined"
              ? "-"
              : "Revoke"}
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
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, type, bidDetails?.bid_open_date]);

  const handleTimeChange = (field, value) => {
    setTimeRange((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
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
        "PATCH",
        `${PortalApiUrls.UPDATE_BID}${bidDetails.id}/`,
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
        dispatch(setActiveTab(3));
      }
    } catch (error) {
      setLoading(false);

      setAlert({
        isVisible: true,
        message: error.response?.data?.detail || "An error occurred.",
        severity: "error",
      });
    }
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {bidDetails?.type === "L1" && bidDetails?.bid_open_date === null ? (
            <>
              <Alert severity="warning" className="my-3">
                <p style={{ margin: 0 }}>
                  <strong>Warning:</strong>{" "}
                  <strong style={{ color: "red" }}>Please</strong> be careful
                  while filling in live bid dates, as they are non-editable once
                  set.
                </p>
              </Alert>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexWrap="wrap" gap={2} mt={2} width="100%">
                  <Box
                    sx={{
                      flexBasis: { xs: "100%", sm: "48%", md: "23%" },
                      flexGrow: 1,
                    }}
                  >
                    <DatePicker
                      label="Live Bid Date*"
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
                      onAccept={(value) =>
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
                        handleTimeChange("end", value?.format("HH:mm") || null)
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
                      type="submit"
                      disabled={loading}
                      sx={{
                        width: "100%",
                        height: "56px",
                        fontSize: "14px",
                        mt: { xs: 2, md: 0 },
                      }}
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
