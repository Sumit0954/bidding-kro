import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { convertFileSize } from "../../helpers/common";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../helpers/api";
import DeleteDialog from "../CustomDialog/DeleteDialog";
import { useContext, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/tabSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertContext } from "../../contexts/AlertProvider";
import { Download } from "@mui/icons-material";

const patchBidStatus = async (id, formData, setAlert) => {
  try {
    const response = await _sendAPIRequest(
      "PATCH",
      `${PortalApiUrls.BID_SAMPLE_ACTION}${id}/`,
      formData,
      true
    );

    if (response.status === 204) {
    }
  } catch (error) {
    console.log(error, " : response");
    if (error.status === 403) {
      console.log(error.status, " :error");
      setAlert({
        isVisible: true,
        message: error.response.data.detail,
        severity: "error",
      });
    }
  }
};
const onCloneBidClick = async (id, navigate, setAlert, setScreenLoader) => {
  setScreenLoader(true);
  try {
    const response = await _sendAPIRequest(
      "POST",
      `${PortalApiUrls.CLONE_BID}${id}/`,
      null,
      true
    );
    if (response?.status === 201) {
      setScreenLoader(false);
      navigate(`/portal/bids/categories/${response.data.id}`);
    }
  } catch (error) {
    if (error.status === 403) {
      setScreenLoader(false);
      setAlert({
        isVisible: true,
        message: error.response.data.detail,
        severity: "error",
      });
    }

    console.log("Error cloning bid", error);
  }
};
const CloneConfirmation = ({ id, onCloneConfirm }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloneClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      await onCloneConfirm(id);
    }
  };

  return (
    <>
      <p
        className={styles["table-link"]}
        style={{
          color: "#0d6efd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Ensure vertical alignment
          height: "100%", // Make sure it fills the cell height
          padding: "8px", // Apply uniform padding
          marginBottom: "0",
        }}
        onClick={handleCloneClick}
      >
        Clone Bid
      </p>
      {openDialog && (
        <DeleteDialog
          title="Clone Bid"
          message="Are you sure you want to clone this bid?"
          handleClick={handleDialogClose}
        />
      )}
    </>
  );
};
const DeleteConfirmation = ({ id, onDeleteConfirm }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      await onDeleteConfirm(id);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
      {openDialog && (
        <DeleteDialog
          title="Delete Bid"
          message="Are you sure you want to delete this Request ? This action cannot be undone."
          handleClick={handleDialogClose}
        />
      )}
    </>
  );
};
const onDeleteBidClick = async (bid_requested_id, dispatch, navigate) => {
  try {
    const response = await _sendAPIRequest(
      "DELETE",
      `${PortalApiUrls.DELETE_BID_REQUEST}${bid_requested_id}/`,
      null,
      true
    );
    if (response?.status === 204) {
      dispatch(setActiveTab(2));
    }
  } catch (error) {
    if (error.status === 403) {
      setAlert({
        isVisible: true,
        message: error.response.data.detail,
        severity: "error",
      });
    }
    console.error("Error deleting bid", error);
  }
};
export const created_bids_column = (setScreenLoader) => [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      const bidId = data?.row?.original?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(0)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}`);
      };
      return (
        <Tooltip title={"Click here to see the BId Details"} arrow>
          <span
            onClick={handleViewRequestClick}
            style={{
              color: "#0d6efd",
              cursor: "pointer",
            }}
            className={styles["table-link"]}
          >
            {`${truncateString(data?.row?.original?.title, 30)}${
              data?.row?.original?.type === "L1" ? "" : " (QCBS)"
            }`}
          </span>
        </Tooltip>
      );
    },
  },
  {
    Header: "Pending Request",
    accessor: "has_bid_request",
    align: "center",
    width: 150,
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      const hasRequest = data?.row?.original?.has_bid_request;
      const bidId = data?.row?.original?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(2)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}`);
      };

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: hasRequest ? "#FFBF00" : "#ccc",
              animation: hasRequest ? "blink 1s infinite" : "none",
            }}
          ></div>

          <style>
            {`
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
          </style>
          <Tooltip title={"Click here to see Pending Requests"} arrow>
            <span
              onClick={handleViewRequestClick}
              style={{
                color: hasRequest ? "#FFBF00" : "#0d6efd",
                fontWeight: hasRequest ? "500" : "",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              View Requests
            </span>
          </Tooltip>
        </div>
      );
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return data?.row?.original?.bid_open_date
        ? `${dateTimeFormatter(data?.row?.original?.bid_open_date)}`
        : " - ";
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return data?.row?.original?.bid_close_date
        ? `${dateTimeFormatter(data?.row?.original?.bid_close_date)}`
        : " - ";
    },
  },
  {
    Header: "Status",
    accessor: "status",
    align: "center",
    width: 60, // Change to uniform width

    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      const bidId = data?.row?.original?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(0)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}`);
      };
      return (
        <Tooltip title={"Click here to See the Bid Status"} arrow>
          <div
            onClick={handleViewRequestClick}
            className={`status-cloumn ${data?.row?.original?.status}`}
            style={{
              color: `${
                data?.row?.original?.status === "active"
                  ? "#22bb33" // Green for active
                  : data?.row?.original?.status === "awarded"
                  ? "#B08D57" // Gold for awarded
                  : data?.row?.original?.status === "pending"
                  ? "#FFBF00" // Yellow for pending
                  : data?.row?.original?.status === "cancelled"
                  ? "red" // Red for canceled
                  : data?.row?.original?.status === "completed"
                  ? "#55a630"
                  : data?.row?.original?.status === "live"
                  ? "#003459"
                  : "#80b918"
              }`,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {data?.row?.original?.status}
          </div>
        </Tooltip>
      );
    },
  },
  {
    Header: "Action",
    accessor: "clone_bid",
    align: "center", // Center alignment to make it consistent
    width: 60,
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      const navigate = useNavigate();
      const { setAlert } = useContext(AlertContext);

      return (
        <CloneConfirmation
          id={data?.row?.original?.id}
          onCloneConfirm={(id) =>
            onCloneBidClick(id, navigate, setAlert, setScreenLoader)
          }
        />
      );
    },
  },
  {
    Header: "Invite",
    accessor: "reserved_price",
    align: "left",
    disablePadding: false,
    paddingLeft: "2rem",
    width: 60, // Change to uniform width
    Cell: (data) => {
      const isInviteDisabled =
        data?.row?.original?.status !== "active" ||
        (data?.row?.original?.type === "L1" &&
          data?.row?.original?.bid_close_date === null) ||
        (data?.row?.original?.type === "QCBS" &&
          (data?.row?.original?.sample_receive_start_date === null ||
            data?.row?.original?.sample_receive_end_date === null));

      return (
        <Tooltip title={"Click here to Invite the Suppliers on this bid"} arrow>
          <NavLink
            style={{ textAlign: "center", fontWeight: "bold" }}
            className={
              isInviteDisabled ? styles["disabled-link"] : styles["table-link"]
            }
            to={`/portal/companies/${data?.cell?.row?.original.id}`}
          >
            INVITE
          </NavLink>
        </Tooltip>
      );
    },
  },
];
export const invited_bids_column = [
  {
    Header: "Bid ID",
    accessor: "bid.formatted_number",
    align: "left",
    disablePadding: false,
    width: 95,
    Cell: (data) => {
      return data.row.original.bid.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 130,
    Cell: (data) => {
      const bidId = data?.row?.original?.bid?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(0)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}/?type=invited`);
      };

      return (
        <Tooltip title={"Click here to see the bid detail"} arrow>
          <span
            onClick={handleViewRequestClick}
            style={{
              color: "#0d6efd",
              cursor: "pointer",
            }}
            className={styles["table-link"]}
          >
            {truncateString(data?.row?.original?.bid?.title, 30)}
          </span>
        </Tooltip>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "bid.type",
    align: "left",
    disablePadding: false,
    width: 120,
    Cell: (data) => {
      return data.row.original.bid.type;
    },
  },
  {
    Header: "Comp.Name",
    accessor: "Company_Name",
    align: "left",
    disablePadding: false,
    width: 120,
    Cell: (data) => {
      return data?.row?.original?.bid?.company?.name;
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_start_date",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <>
          {data?.row?.original?.bid?.bid_open_date === null
            ? "-"
            : dateTimeFormatter(data?.row?.original?.bid?.bid_open_date)}
        </>
      );
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_end_date",
    align: "left",
    disablePadding: false,
    width: 140,
    Cell: (data) => {
      return (
        <>
          {data?.row?.original?.bid?.bid_close_date === null
            ? "-"
            : dateTimeFormatter(data?.row?.original?.bid?.bid_close_date)}
        </>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    width: 80,
    Cell: (data) => {
      const bidId = data?.row?.original?.bid?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(2)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}/?type=invited`);
      };

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {data?.row?.original?.bid?.status === "active" ? (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor:
                  data?.row?.original?.bid?.type === "L1"
                    ? data?.row?.original?.status === "pending"
                      ? "#FFBF00" // Yellow for pending
                      : data?.row?.original?.status === "accepted"
                      ? "#22bb33" // Green for accepted
                      : "#ccc" // Default gray
                    : data?.row?.original?.sample?.approval_status ===
                      "approved"
                    ? data?.row?.original?.status === "pending" &&
                      data?.row?.original?.bid?.bid_open_date !== null
                      ? "#FFBF00" // Yellow for pending
                      : data?.row?.original?.status === "accepted"
                      ? "#22bb33" // Green for accepted
                      : "#ccc" // Default gray
                    : data?.row?.original?.sample?.invite_status === "pending"
                    ? "#FFBF00" // Yellow for pending
                    : data?.row?.original?.sample?.invite_status === "accepted"
                    ? "#22bb33" // Green for accepted
                    : "#ccc", // Default gray
                animation:
                  (data?.row?.original?.bid?.type === "L1" &&
                    data?.row?.original?.status === "pending") ||
                  (data?.row?.original?.sample?.approval_status ===
                    "approved" &&
                    data?.row?.original?.status === "pending" &&
                    data?.row?.original?.bid?.bid_open_date !== null) ||
                  data?.row?.original?.sample?.invite_status === "pending"
                    ? "blink 1s infinite"
                    : "none",
              }}
            ></div>
          ) : (
            <></>
          )}

          <style>
            {`
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
          </style>
          <Tooltip
            title={"Click Here to see your acceptance status on this bid"}
          >
            <span
              onClick={handleViewRequestClick}
              className={`status-column ${data?.row?.original?.status}`}
              style={{
                color: `${
                  data?.row?.original?.bid?.status === "cancelled"
                    ? "red"
                    : data?.row?.original?.bid?.type === "L1"
                    ? data?.row?.original?.status === "accepted"
                      ? "#22bb33" // Green for accepted
                      : data?.row?.original?.status === "pending"
                      ? "#FFBF00" // Yellow for pending
                      : data?.row?.original?.status === "revoked" ||
                        data?.row?.original?.status === "declined"
                      ? "red" // Yellow for pending
                      : "green" // Default red for other status
                    : data?.row?.original?.sample?.approval_status ===
                      "approved"
                    ? data?.row?.original?.status === "accepted"
                      ? "#22bb33" // Green for accepted
                      : data?.row?.original?.status === "pending" &&
                        data?.row?.original?.bid?.bid_open_date !== null
                      ? "#FFBF00" // Yellow for pending
                      : data?.row?.original?.status === "pending" &&
                        data?.row?.original?.bid?.bid_open_date === null
                      ? "#22bb33"
                      : data?.row?.original?.status === "revoked"
                      ? "red"
                      : "green" // Default red for other status
                    : data?.row?.original?.sample?.invite_status === "accepted"
                    ? "#22bb33" // Green for accepted
                    : data?.row?.original?.sample?.invite_status === "pending"
                    ? "#FFBF00" // Yellow for pending
                    : "red" // Default red for other invite status
                }`,
                textDecoration: "none",
                fontWeight: `${
                  data?.row?.original?.bid?.status === "cancelled"
                    ? "bold"
                    : data?.row?.original?.bid?.type === "L1"
                    ? data?.row?.original?.status === "pending"
                      ? "bold"
                      : ""
                    : data?.row?.original?.sample?.approval_status ===
                      "approved"
                    ? data?.row?.original?.status === "pending" &&
                      data?.row?.original?.bid?.bid_open_date !== null
                      ? "bold"
                      : ""
                    : data?.row?.original?.sample?.invite_status === "pending"
                    ? "bold"
                    : ""
                }`,
                textTransform: "uppercase",
              }}
            >
              {data?.row?.original?.bid?.status === "cancelled"
                ? data?.row?.original?.bid?.status
                : data?.row?.original?.bid?.type === "L1"
                ? data?.row?.original?.status
                : data?.row?.original?.sample?.approval_status === "approved" &&
                  data?.row?.original?.bid?.bid_open_date !== null
                ? data?.row?.original?.status
                : data?.row?.original?.sample?.invite_status}
            </span>
          </Tooltip>
        </div>
      );
    },
  },
  {
    Header: "Sample Status",
    accessor: "Sample status",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    width: 100,
    Cell: (data) => {
      return (
        <div
          className={`status-column ${data?.row?.original?.sample?.approval_status}`}
          style={{
            color: `${
              data?.row?.original?.sample?.approval_status === "approved"
                ? "#22bb33" // Green for approved
                : data?.row?.original?.status === "pending"
                ? "#FFBF00" // Yellow for pending
                : "red" // Default red for other statuses
            }`,
            fontWeight: "",
            textTransform: "uppercase",
          }}
        >
          {(data?.row?.original?.sample?.invite_status === "pending" &&
            data?.row?.original?.sample?.approval_status === "pending") ||
          data?.row?.original?.sample?.invite_status === "declined" ||
          data?.row?.original?.status === "revoked"
            ? " - "
            : data?.row?.original?.sample?.approval_status}
        </div>
      );
    },
  },
];
export const related_bids_column = [
  {
    Header: "Bid ID",
    accessor: "bid.formatted_number",
    align: "left",
    disablePadding: false,

    Cell: (data) => {
      return data?.row?.original?.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = (e) => {
        e.preventDefault(); // Prevent default NavLink behavior
        dispatch(setActiveTab(0)); // Dispatch action to set the active tab
        navigate(
          `/portal/bids/details/${data?.row?.original?.id}/?type=related`
        ); // Programmatically navigate
      };
      return (
        <Tooltip title={"Click Here to see your acceptance status on this bid"}>
          <NavLink
            className={styles["table-link"]}
            to={`/portal/bids/details/${data?.row?.original?.id}/?type=related`}
            onClick={handleViewRequestClick}
          >
            {truncateString(data?.row?.original?.title, 30)}
          </NavLink>
        </Tooltip>
      );
    },
  },
  {
    Header: "Comp.Name",
    accessor: "Company_Name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return data?.row?.original?.company?.name;
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_start_date",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <>
          {data?.row?.original?.bid_open_date === null
            ? "-"
            : dateTimeFormatter(data?.row?.original?.bid_open_date)}
        </>
      );
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_end_date",
    align: "left",
    disablePadding: false,
    width: 145,
    Cell: (data) => {
      return (
        <>
          {data?.row?.original?.bid_close_date === null
            ? "-"
            : dateTimeFormatter(data?.row?.original?.bid_close_date)}
        </>
      );
    },
  },
  {
    Header: "Bid Status",
    accessor: "status",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    width: 140,
    Cell: (data) => {
      return (
        <div
          className={`status-column ${data?.row?.original?.status}`}
          style={{
            color: `${
              data?.row?.original?.status === "active"
                ? "#22bb33" // Green for accepted
                : data?.row?.original?.status === "pending"
                ? "#FFBF00" // Yellow for pending
                : "red" // Default red for other statuses
            }`,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {data?.row?.original?.status}
        </div>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    width: 150,
  },
];
export const documents_column = [
  {
    Header: "Document Name",
    accessor: "file_name",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return (
        <Tooltip title={data?.row?.original?.file_name}>
          {truncateString(data?.row?.original?.file_name, 20)}
        </Tooltip>
      );
    },
  },
  {
    Header: "Document Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 140,
    Cell: (data) => {
      return (
        <div className={styles["document-type"]}>
          <a
            href={data?.row?.original?.file}
            target="_blank"
            className={styles["preview-download"]}
          >
            {data?.row?.original?.type}
          </a>
        </div>
      );
    },
  },
  {
    Header: "Document Size",
    accessor: "size",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return convertFileSize(data?.row?.original?.size);
    },
  },
  {
    Header: "Document Date",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  {
    Header: "Action",
    accessor: "action",
    align: "left",
    disablePadding: false,
    width: 60,
    Cell: (data) => {
      return (
        <IconButton className="p-0">
          <a
            href={data?.row?.original?.file}
            target="_blank"
            className={styles["doc-download"]}
          >
            {" "}
            <Download />
          </a>
        </IconButton>
      );
    },
  },
];
export const companies_column = [
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      const { id } = useParams(); // Extract the id from useParams()

      return id ? ( // Check if id exists
        <span>{data?.row?.original?.name}</span> // Display plain text if id is absent
      ) : (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/companies/details/${data?.row?.original?.id}`}
        >
          {data?.row?.original?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Company Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Company Mobile",
    accessor: "business_mobile",
    align: "left",
    disablePadding: false,
    width: 180,
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
  },
];
export const Invite_request_column = [
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/companies/details/${data?.row?.original?.requestor?.id}`}
        >
          {data?.row?.original?.requestor?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Company Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data?.row?.original?.requestor?.business_email;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/bids/details/${data?.row?.original?.bid?.id}`}
        >
          {truncateString(data?.row?.original?.bid?.title, 30)}
        </NavLink>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
  },
];
export const l1_participants_column = [
  {
    Header: "Company Name",
    accessor: "company.name",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data.row.original.company.name;
    },
  },
  {
    Header: "Company Email",
    accessor: "company.business_email",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Company Mobile",
    accessor: "company.business_mobile",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Status",
    accessor: "status",
    align: "left",
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      return (
        <>
          <div
            className={`status-cloumn ${
              data?.row?.original?.status === "accepted"
                ? "success"
                : data?.row?.original?.status === "pending"
                ? "pending"
                : "cancelled"
            }`}
            style={{
              color:
                data?.row?.original?.status === "accepted" ||
                data?.row?.original?.status === "participated"
                  ? "green"
                  : data?.row?.original?.status === "pending"
                  ? "#FFBF00"
                  : "red",
            }}
          >
            {data?.row?.original?.status}
          </div>
        </>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
  },
];
export const PreviousBids_column = [
  {
    Header: "Bid Name",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 280,
    Cell: (data) => {
      return data?.row?.original?.title;
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 280,
    Cell: (data) => {
      return data?.row?.original?.type;
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_close_date);
    },
  },
  // {
  //   Header: "Buyer’s Rating",
  //   accessor: "buyer’s rating",
  //   align: "left",
  //   disablePadding: false,
  //   width: 100,
  //   hideSortIcon: true,
  //   Cell: (data) => {
  //     return data?.row?.original?.rating ? data?.row?.original?.rating : "-";
  //   },
  // },
];
export const Sample_Bid_Invitations_result_log = [
  {
    Header: "Company Name",
    accessor: "company.name",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data.row.original.company.name;
    },
  },
  {
    Header: "Company Email",
    accessor: "company.business_email",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Company Mobile",
    accessor: "company.business_mobile",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Status",
    accessor: "status",
    align: "left",
    width: 80, // Change to uniform width
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      return (
        <div
          className={`status-cloumn ${data?.row?.original?.sample?.invite_status}`}
          style={{
            color: `${
              data?.row?.original?.sample?.invite_status === "accepted"
                ? "#22bb33"
                : data?.row?.original?.sample?.invite_status === "declined"
                ? "red"
                : "darkyellow"
            }`,
          }}
        >
          {data?.row?.original?.sample?.invite_status}
        </div>
      );
    },
  },
];
export const ProductBid_column = [
  {
    Header: "Bid Position",
    accessor: "position",
    disablePadding: false,
  },
  {
    Header: "Company Name",
    accessor: "company.name",
    disablePadding: false,
  },
  {
    Header: "Bid Amount",
    accessor: "amount",
    disablePadding: false,
  },
];
export const Bid_pricing_column = [
  {
    Header: "Product Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 230,
    Cell: (data) => {
      return data?.row?.original?.product?.title;
    },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    align: "left",
    disablePadding: false,
    width: 190,
    Cell: (data) => {
      return data?.row?.original?.product?.quantity;
    },
  },
  {
    Header: "Reserve Price",
    accessor: "buyers_amount",
    align: "left",
    disablePadding: false,
    width: 200,
    Cell: (data) => {
      return data?.row?.original?.product?.reserved_price;
    },
  },
  {
    Header: "Supplier Bid Price",
    accessor: "amount",
    align: "left",
    disablePadding: false,
    width: 200,
    Cell: (data) => {
      return data?.row?.original?.amount;
    },
  },
  {
    Header: "Bid Rank",
    accessor: "rank",
    align: "left",
    disablePadding: false,
    width: 110,
    Cell: (data) => {
      return data?.row?.original?.position;
    },
  },
];
export const ProductBid_column2 = [
  {
    Header: "Product Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data?.row?.original?.product?.title;
    },
  },
  {
    Header: "Reserve Price",
    accessor: "price",
    align: "left",
    disablePadding: false,
    width: 220,
    Cell: (data) => {
      return data?.row?.original?.product?.reserved_price;
    },
  },
  {
    Header: "Bid Amount",
    accessor: "amount",
    align: "left",
    disablePadding: false,
    width: 210,
    Cell: (data) => {
      return data?.row?.original?.amount;
    },
  },
  {
    Header: "Bid Position",
    accessor: "position",
    align: "left",
    disablePadding: false,
    width: 110,
    Cell: (data) => {
      return data?.row?.original?.position;
    },
  },
  {
    Header: "Result",
    accessor: "result",
    align: "left",
    disablePadding: false,
    width: 110,
    Cell: (data) => {
      console.log(data, " : data");
      return (
        <strong
          style={{
            color: data?.row?.original?.is_awarded === true ? "green" : "red",
          }}
        >
          {data?.row?.original?.is_awarded === true
            ? "Awarded"
            : " Not Awarded"}
        </strong>
      );
    },
  },
];
export const getTeamListColumn = (onToggleStatus) => [
  {
    Header: "First Name",
    accessor: "first_name",
    align: "left",
    width: 160,
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    align: "left",
    width: 160,
  },
  {
    Header: "Email",
    accessor: "email",
    align: "left",
    width: 160,
  },
  {
    Header: "Mobile",
    accessor: "mobile_number",
    align: "left",
    width: 160,
  },
  {
    Header: "Role",
    accessor: "groups",
    align: "left",
    width: 160,
    Cell: ({ value }) => value?.join(", ") || "-",
  },
  {
    Header: "Action",
    accessor: "is_active",
    align: "left",
    width: 160,
    hideSortIcon: true,
    Cell: ({ row }) => {
      const [deleteDetails, setDeleteDetails] = useState({
        open: false,
        title: "",
        message: "",
        memberId: null,
      });

      const handleMemberDeactivationConfimation = (memberId) => {
        setDeleteDetails({
          open: true,
          title: "Confirm Deactivation",
          message: `Are you sure you want to deactivate ${row.original.first_name} ${row.original.last_name}`,
          memberId: memberId,
        });
      };

      const handleMemberDeactivation = (choice) => {
        if (choice) {
          onToggleStatus(deleteDetails?.memberId);
          setDeleteDetails({
            open: false,
            title: "",
            message: "",
            memberId: null,
          });
        }
        setDeleteDetails({
          open: false,
          title: "",
          message: "",
          memberId: null,
        });
      };
      return (
        <>
          <Tooltip
            title={
              row.original.is_active
                ? "Click here to Deactivate Member"
                : "Member is not Active"
            }
            arrow
          >
            <span
              onClick={() =>
                row.original.is_active &&
                handleMemberDeactivationConfimation(row.original.id)
              }
              style={{
                color: row.original.is_active ? "#52c41a" : "#ff4d4f",
                cursor: row.original.is_active ? "pointer" : "not-allowed",
              }}
            >
              {row.original.is_active ? "Active" : "InActive"}
            </span>
          </Tooltip>

          {deleteDetails?.open && (
            <DeleteDialog
              title={deleteDetails.title}
              message={deleteDetails.message}
              handleClick={handleMemberDeactivation}
            />
          )}
        </>
      );
    },
  },
];
export const products_Column = ({
  setShowSpecification,
  setSelectedProduct,
}) => [
  {
    Header: "Product Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data.row.original.title;
    },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    align: "left",
    disablePadding: true,
    width: 160,
  },
  {
    Header: "Reserve Price",
    accessor: "reserved_price",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Specification",
    accessor: "specification",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return (
        <p
          className={styles["table-link"]}
          onClick={() => {
            setSelectedProduct(data.row.original);
            setShowSpecification(true);
          }}
        >
          View Specification
        </p>
      );
    },
  },
];
export const Pending_request_column = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return [
    {
      Header: "Company Name",
      accessor: "name",
      align: "left",
      disablePadding: false,
      width: 160,
      Cell: (data) => {
        return (
          <NavLink
            className={styles["table-link"]}
            to={`/portal/companies/details/${data?.row?.original?.requestor?.id}`}
          >
            {data?.row?.original?.requestor?.name}
          </NavLink>
        );
      },
    },
    {
      Header: "Company Email",
      accessor: "business_email",
      align: "left",
      disablePadding: false,
      width: 160,
      Cell: (data) => {
        return data?.row?.original?.requestor?.business_email;
      },
    },
    {
      Header: "Mobile No.",
      accessor: "business_mobile",
      align: "left",
      disablePadding: false,
      width: 150,
      Cell: (data) => {
        return data?.row?.original?.requestor?.business_mobile;
      },
    },
    {
      Header: "Action",
      accessor: "action",
      align: "center",
      disablePadding: false,
      width: 100,
      hideSortIcon: true,
    },
    {
      Header: "",
      accessor: "delete",
      align: "center",
      disablePadding: false,
      width: 80,
      Cell: (data) => {
        return (
          <DeleteConfirmation
            id={data?.row?.original?.id} // Assuming `id` is the unique identifier for the row
            onDeleteConfirm={(id) => onDeleteBidClick(id, dispatch, navigate)} // Pass dispatch and navigate
          />
        );
      },
    },
  ];
};
const SampleStatusCell = ({ data, onActionComplete }) => {
  const [participant, setParticipant] = useState();
  const { setAlert } = useContext(AlertContext);
  const [status, setStatus] = useState(
    data.row.original.sample.approval_status === "rejected"
      ? "reject"
      : data.row.original.sample.approval_status === "pending"
      ? "pending"
      : "approve"
  );
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    formData: null,
    isSamplePending: null,
    supplierName: null,
  });
  const handleSampleApproved = (choice) => {
    setDeleteDetails({ open: false, title: "", message: "", formData: null });
    if (choice) {
      setStatus("approve");
      patchBidStatus(
        data.row.original.id,
        deleteDetails?.formData,
        setAlert,
        true,
        data.row.original.company.id
      );
    }
    if (onActionComplete) {
      onActionComplete();
    }
    setParticipant((prevDetails) => ({
      ...prevDetails,
      approval_status: newActionStatus,
    }));
  };
  const handleStatusChange = (event) => {
    console.log(data?.row?.original?.sample?.is_received, " supplier");
    const newActionStatus = event.target.value;
    const formData = {
      action: newActionStatus,
    };
    if (newActionStatus === "approve") {
      setDeleteDetails({
        open: true,
        title: "Sample Approve Confirmation",
        message: (
          <>
            Are you sure you want to approve the sample of{" "}
            <b>{data?.row?.original?.company?.name}</b>?
          </>
        ),
        formData: formData,
        isSamplePending:
          data?.row?.original?.sample?.is_received === false ? true : null,
        supplierName: data?.row?.original?.company?.name,
      });
    } else if (newActionStatus === "reject") {
      setStatus(newActionStatus);
      patchBidStatus(
        data.row.original.id,
        formData,
        setAlert,
        true,
        data.row.original.company.id
      );
    }

    setParticipant((prevDetails) => ({
      ...prevDetails,
      approval_status: newActionStatus,
    }));
  };
  return (
    <>
      <FormControl sx={{ minWidth: 120, maxWidth: 150 }} size="small">
        <Select
          disabled={status === "approve"}
          value={status}
          onChange={handleStatusChange}
          sx={{
            color:
              status === "pending"
                ? "#FFC72C"
                : status === "approve"
                ? "green"
                : "red",
            height: "35px",
            fontSize: "14px",
            "&.Mui-disabled": {
              color: status === "approve" ? "green" : "inherit",
            },
            "& .Mui-disabled": {
              WebkitTextFillColor: status === "approve" ? "green" : "inherit",
            },
          }}
        >
          {status === "pending" && (
            <MenuItem value="pending" disabled sx={{ color: "#FFC72C" }}>
              Pending
            </MenuItem>
          )}
          <MenuItem value="approve" sx={{ color: "green" }}>
            Approved
          </MenuItem>
          <MenuItem value="reject" sx={{ color: "red" }}>
            Not Approved
          </MenuItem>
        </Select>
      </FormControl>

      {deleteDetails?.open && (
        <DeleteDialog
          open={deleteDetails.open}
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleSampleApproved}
          supplierName={deleteDetails?.supplierName}
          isSamplePending={deleteDetails?.isSamplePending}
        />
      )}
    </>
  );
};
export const Sample_Bid_Invitations_column = ({
  id,
  onActionComplete,
  setIsSampleApproved,
}) => [
  {
    Header: "Company Name",
    accessor: "company_Name",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: (data) => {
      return `${data.row.original.company.name}`;
    },
  },
  {
    Header: "Sample Status",
    accessor: "company_email",
    align: "left",
    disablePadding: false,
    width: 100,
    Cell: (data) => {
      const [participant, setParticipant] = useState();

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

      const [status, setStatus] = useState(
        data.row.original.sample.is_received
      );

      const { setAlert } = useContext(AlertContext);

      const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        setParticipant((prevDetails) => ({
          ...prevDetails,
          is_received: newStatus,
        }));

        const formData = {
          is_received: newStatus,
        };
        patchBidStatus(data.row.original.id, formData, setAlert);
        if (onActionComplete) {
          onActionComplete();
        }
      };

      return (
        <FormControl sx={{ minWidth: 120, maxWidth: 150 }} size="small">
          <Select
            value={status}
            onChange={handleStatusChange}
            style={{
              color: status === true ? "green" : "red",
              height: "35px",
              fontSize: "14px", // Conditional color for the select box
            }}
          >
            <MenuItem value="true" style={{ color: "green" }}>
              Received
            </MenuItem>
            <MenuItem value="false" style={{ color: "red" }}>
              Not Received
            </MenuItem>
          </Select>
        </FormControl>
      );
    },
  },
  {
    Header: "Sample Approval Status",
    accessor: "mobile_number",
    align: "left",
    disablePadding: false,
    width: 100,
    Cell: (cellData) => (
      <SampleStatusCell data={cellData} onActionComplete={onActionComplete} />
    ),
  },
];
