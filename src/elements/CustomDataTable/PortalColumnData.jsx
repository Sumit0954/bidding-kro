import { NavLink, useNavigate } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { convertFileSize } from "../../helpers/common";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../helpers/api";
import classNames from "classnames";
import DeleteDialog from "../CustomDialog/DeleteDialog";
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/tabSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const patchBidStatus = async (id, formData) => {
  try {
    const response = await _sendAPIRequest(
      "PATCH",
      `${PortalApiUrls.BID_SAMPLE_ACTION}${id}/`,
      formData,
      true
    );

    if (response.status === 204) {
      // window.location.reload();
      // setAlert({
      //   isVisible: true,
      //   message: "Your Bid Status Updated sucessfully",
      //   severity: "success",
      // });
    }
  } catch (error) {
    // setAlert({
    //   isVisible: true,
    //   message: error?.response?.data?.error || "An unexpected error occurred.",
    //   severity: "error",
    // });
  }
};

const onCloneBidClick = async (id, navigate) => {
  try {
    const response = await _sendAPIRequest(
      "POST",
      `${PortalApiUrls.CLONE_BID}${id}/`,
      null,
      true
    );
    if (response?.status === 201) {
      navigate(`/portal/bids/categories/${response.data.id}`);
    }
  } catch (error) {
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
        // style={{ color: "#0d6efd" }}
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
      console.log("Bid deleted successfully");
      dispatch(setActiveTab(2));
      // window.location.reload();
      // Optional: Trigger a refresh or redirect as needed
    }
  } catch (error) {
    console.error("Error deleting bid", error);
  }
};

export const created_bids_column = [
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
    width: 150, // Change to uniform width
    Cell: (data) => {
      const hasRequest = data?.row?.original?.has_bid_request;
      const bidId = data?.row?.original?.id;

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleViewRequestClick = () => {
        dispatch(setActiveTab(0)); // Set the active tab
        navigate(`/portal/bids/details/${bidId}`);
      };
      return (
        // <NavLink
        //   className={styles["table-link"]}
        //   to={`/portal/bids/details/${data?.row?.original?.id}`}
        // >
        //   {`${truncateString(data?.row?.original?.title, 30)}${
        //     data?.row?.original?.type === "L1" ? "" : " (QCBS)"
        //   }`}
        // </NavLink>
        <Tooltip title={"Click here to see the BId Details"} arrow>
          <span
            onClick={handleViewRequestClick}
            style={{
              color: "#0d6efd",
              // fontWeight: "bold",
              // textDecoration: "underline",
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
    width: 120, // Change to uniform width
    Cell: (data) => {
      // console.log(data?.row?.original, "data?.row?.original");
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
    width: 100, // Change to uniform width
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
                  : "black" // Default
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

      return (
        <CloneConfirmation
          id={data?.row?.original?.id}
          onCloneConfirm={(id) => onCloneBidClick(id, navigate)}
        />

        // <p
        //   className={styles["table-link"]}
        //   style={{ color: "#0d6efd" }}
        //   onClick={() => onCloneBidClick(data?.row?.original?.id, navigate)}
        // >
        //   Clone Bid
        // </p>
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
    width: 100,
    Cell: (data) => {
      return data.row.original.bid.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 150,
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
              // fontWeight: "bold",
              // textDecoration: "underline",
              cursor: "pointer",
            }}
            className={styles["table-link"]}
          >
            {truncateString(data?.row?.original?.bid?.title, 30)}
          </span>
        </Tooltip>
        // <NavLink
        //   className={styles["table-link"]}
        //   to={`/portal/bids/details/${data?.row?.original?.bid?.id}/?type=invited`}
        // >
        //   {truncateString(data?.row?.original?.bid?.title, 30)}
        // </NavLink>
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
    width: 150,
    Cell: (data) => {
      return data?.row?.original?.bid?.company?.name;
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_start_date",
    align: "left",
    disablePadding: false,
    width: 120,
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
    width: 120,
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
    width: 100,
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
          {/* <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                data?.row?.original?.bid?.type === "L1"
                  ? data?.row?.original?.status === "pending"
                    ? "#22bb33"
                    : "#ccc"
                  : data?.row?.original?.sample?.invite_status === "pending"
                  ? "#22bb33"
                  : "#ccc",
            }}
          ></div> */}

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
                      : "red" // Default red for other status
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
                      : "red" // Default red for other status
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
              {/* {data?.row?.original?.status} */}
            </span>
          </Tooltip>
        </div>

        // <NavLink
        //   className={`status-column ${data?.row?.original?.status}`}
        //   to={`/portal/bids/details/${data?.row?.original?.bid?.id}/?type=invited`}
        //   style={{
        //     color: `${
        //       data?.row?.original?.status === "accepted"
        //         ? "#22bb33" // Green for accepted
        //         : data?.row?.original?.status === "pending"
        //         ? "#FFBF00" // Yellow for pending
        //         : "red" // Default red for other status
        //     }`,
        //     textDecoration: "none",
        //     fontWeight: "bold",
        //     textTransform: "uppercase",
        //   }}
        // >
        //   {data?.row?.original?.status}
        // </NavLink>
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
      console.log("status : ", data?.row?.original);
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
    width: 150,
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
    width: 150,
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
  },
  {
    Header: "Document Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      const handlePreviewDocument = (data) => {
        const { file } = data; // File URL
        const link = document.createElement("a");
        link.href = file;
        link.target = "_blank"; // Opens in new tab
        link.rel = "noopener noreferrer"; // Security enhancement
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      };
      return (
        <div
          className={styles["document-type"]}
          onClick={() => handlePreviewDocument(data.row.original)}
        >
          {data?.row?.original?.type}
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
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
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
      return (
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

// export const Pending_request_column = [
//   {
//     Header: "Company Name",
//     accessor: "name",
//     align: "left",
//     disablePadding: false,
//     width: 160,
//     Cell: (data) => {
//       return (
//         <NavLink
//           className={styles["table-link"]}
//           to={`/portal/companies/details/${data?.row?.original?.requestor?.id}`}
//         >
//           {data?.row?.original?.requestor?.name}
//         </NavLink>
//       );
//     },
//   },
//   {
//     Header: "Company Email",
//     accessor: "business_email",
//     align: "left",
//     disablePadding: false,
//     width: 160,
//     Cell: (data) => {
//       return data?.row?.original?.requestor?.business_email;
//     },
//   },
//   {
//     Header: "Mobile No.",
//     accessor: "business_mobile",
//     align: "left",
//     disablePadding: false,
//     width: 150,
//     Cell: (data) => {
//       console.log(data?.row?.original.id, "yoyo");
//       return data?.row?.original?.requestor?.business_mobile;
//     },
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//     align: "center",
//     disablePadding: false,
//     width: 100,
//     hideSortIcon: true,
//   },
//   {
//     Header: "",
//     accessor: "delete",
//     align: "center",
//     disablePadding: false,
//     width: 80,
//     Cell: (data) => {
//       console.log(data?.row?.original.id, "jojo");
//       return (
//         <DeleteConfirmation
//           id={data?.row?.original?.id} // Assuming `id` is the unique identifier for the row
//           onDeleteConfirm={onDeleteBidClick}
//         />
//       );
//     },
//   },
// ];

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
        <NavLink
          className={styles["table-link"]}
          onClick={() => {
            setSelectedProduct(data.row.original);
            setShowSpecification(true);
          }}
        >
          View Specification
        </NavLink>
      );
    },
  },
];

export const PreviousBids_column = [
  {
    Header: "Bid Name",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data?.row?.original?.title;
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 160,
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
      // console.log("data?.row?.original", data?.row?.original);
      return dateTimeFormatter(data?.row?.original?.bid_close_date);
    },
  },
  {
    Header: "Buyer’s Rating",
    accessor: "buyer’s rating",
    align: "left",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
    Cell: (data) => {
      // console.log("data?.row?.original", data?.row?.original);
      return data?.row?.original?.rating ? data?.row?.original?.rating : "-";
    },
  },
];

export const Sample_Bid_Invitations_column = ({ id, onActionComplete }) => [
  {
    Header: "Company Name",
    accessor: "company_Name",
    align: "left",
    disablePadding: false,
    width: 150, // Add a uniform width
    Cell: (data) => {
      return `${data.row.original.company.name}`;
    },
  },
  {
    Header: "Sample Status",
    accessor: "company_email",
    align: "left",
    disablePadding: false,
    width: 150,
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
                // const participants = response.data.participants;
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
        patchBidStatus(data.row.original.id, formData);
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
    width: 150, // Add a uniform width
    Cell: (data) => {
      const [participant, setParticipant] = useState();
      const [status, setStatus] = useState(
        data.row.original.sample.approval_status === "rejected"
          ? "reject"
          : data.row.original.sample.approval_status === "pending"
          ? "pending"
          : "approve"
      );

      const handleStatusChange = (event) => {
        const newActionStatus = event.target.value;
        setStatus(newActionStatus);

        const formData = {
          action: newActionStatus,
        };
        patchBidStatus(
          data.row.original.id,
          formData,
          true,
          data.row.original.company.id
        );

        if (onActionComplete) {
          onActionComplete();
        }

        setParticipant((prevDetails) => ({
          ...prevDetails,
          approval_status: newActionStatus,
        }));
      };

      return (
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
              height: "35px", // Adjust the height of the dropdown
              fontSize: "14px", // Adjust the font size inside the dropdown
              "&.Mui-disabled": {
                color: status === "approve" ? "green" : "inherit", // Keep green when disabled for 'approve'
              },

              "& .Mui-disabled": {
                WebkitTextFillColor: status === "approve" ? "green" : "inherit", // For the selected text
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
      );
    },
  },
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
    width: 150, // Change to uniform width
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
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Company Name",
    accessor: "Company_Name",
    align: "center",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Bid Amount",
    accessor: "amount",
    align: "right",
    disablePadding: false,
    width: 160,
  },
];

export const Bid_pricing_column = [
  {
    Header: "Product Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 230,

  },
  {
    Header: "Quantity",
    accessor: "quantity",
    align: "left",
    disablePadding: false,
    width: 190,
  },
  {
    Header: "Reserve Price",
    accessor: "buyers_amount",
    align: "left",
    disablePadding: false,
    width: 200,
  },
  {
    Header: "Supplier Bid Price",
    accessor: "supplier_amount",
    align: "left",
    disablePadding: false,
    width: 200,
  },
  {
    Header: "Bid Rank",
    accessor: "rank",
    align: "left",
    disablePadding: false,
    width: 110,
  },
];

export const ProductBid_column2 = [
  {
    Header: "Bid Position",
    accessor: "position",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Company Name",
    accessor: "Company_Name",
    align: "center",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Bid Amount",
    accessor: "amount",
    align: "right",
    disablePadding: false,
    width: 160,
  },
];


// export const Bid_pricing_column = [
//   {
//     Header: "Product Title",
//     accessor: "title",
//     align: "left", // Text, so left-aligned
//     disablePadding: false,
//     width: 160,
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//     align: "right", // Numeric, so right-aligned
//     disablePadding: false,
//     width: 160,
//   },
//   {
//     Header: "Reserve Price",
//     accessor: "buyers_amount",
//     align: "right", // Numeric, so right-aligned
//     disablePadding: false,
//     width: 160,
//   },
//   {
//     Header: "Supplier Bid Price",
//     accessor: "supplier_amount",
//     align: "right", // Numeric, so right-aligned
//     disablePadding: false,
//     width: 160,
//   },
//   {
//     Header: "Bid Rank",
//     accessor: "rank",
//     align: "center", // Ranks look better centered
//     disablePadding: false,
//     width: 160,
//   }
// ];
