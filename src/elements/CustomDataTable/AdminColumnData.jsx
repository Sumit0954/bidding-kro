import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { Button, Chip, Popover, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import _sendAPIRequest from "../../helpers/api";

export const companies_column = [
  {
    Header: "Company Id",
    accessor: "comp_Id",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return <b>Company {data?.row?.original?.id}</b>;
    },
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.id}`}
        >
          {data?.row?.original?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <a href={`mailto:${data?.row?.original?.business_email}`}>
          {data?.row?.original?.business_email}
        </a>
      );
    },
  },
  {
    Header: "Created At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  // {
  //   Header: "Category",
  //   accessor: "category",
  //   align: "left",
  //   disablePadding: false,
  //   width: 150,
  // },
  // {
  //   Header: "City",
  //   accessor: "city",
  //   align: "left",
  //   disablePadding: false,
  //   width: 150,
  // },
  // {
  //   Header: "Status",
  //   accessor: "status",
  //   align: "left",
  //   disablePadding: false,
  //   width: 100,
  // },
];

export const transactions_column = [
  {
    Header: "Transction Id",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/transactions/${data?.row?.original?.id}`}
        >
          {data?.row?.original?.formatted_number}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Title",
    accessor: "bid.title",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <Tooltip title={data?.row?.original?.bid?.title}>
          {truncateString(data?.row?.original?.bid?.title, 30)}
        </Tooltip>
      );
    },
  },
  {
    Header: "Bid Id",
    accessor: "bid.formatted_number",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.bid?.formatted_number;
    },
  },
  {
    Header: "Company Name",
    accessor: "customer.first_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.company?.name;
    },
  },
  {
    Header: "Transaction Date",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  {
    Header: "Payment Status",
    accessor: "payment",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      return (
        <div className={`status-cloumn ${data?.row?.original?.status}`}>
          {data?.row?.original?.status}
        </div>
      );
    },
  },
];

export const queries_column = [
  {
    Header: "Query No.",
    accessor: "query_id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "User Name",
    accessor: "user_name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Query Type",
    accessor: "query_type",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Query Date",
    accessor: "query_date",
    align: "left",
    disablePadding: false,
  },
];

export const blogs_column = [
  {
    Header: "Blog Id",
    accessor: "blog id",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.id;
    },
  },
  {
    Header: "Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      const blog_id = data?.row?.original?.id;
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/blogs/update/${blog_id}`}
        >
          {data?.row?.original?.title}
        </NavLink>
      );
    },
  },
  {
    Header: "Created At",
    accessor: "created_date",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  {
    Header: "Updated At",
    accessor: "updated_date",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.updated_at);
    },
  },
  {
    Header: "Blog Slug",
    accessor: "blog_slug",
    align: "left",

    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.slug;
    },
  },
  {
    Header: "Actions",
    accessor: "action",
    align: "left",
    disablePadding: false,
    width: 100,
  },
];

export const Admin_list_column = [
  {
    Header: "Admin Id",
    accessor: "Id",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return <b>ADMIN {data.row.original.id}</b>;
    },
  },
  {
    Header: "Admin Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          to={`addmanagementform/update/${data.row.original.id}`}
          style={{ textDecoration: "none" }}
        >
          {data.row.original.first_name}
        </NavLink>
      );
    },
  },
  {
    Header: "Email",
    accessor: "email",
    disablePadding: false,
    align: "left",
  },
  {
    Header: "Active",
    accessor: "is_active",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Permissions",
    accessor: "permissions",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [selectedPermissions, setSelectedPermissions] = useState([]);
      const handleClick = (event, permissions) => {
        setAnchorEl(event.currentTarget);
        setSelectedPermissions(permissions);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <>
          <Button
            variant="outlined"
            onClick={(e) => handleClick(e, data.row.original.groups)}
            className=""
          >
            See Permissions
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Stack direction="row" spacing={1} sx={{ p: 2, flexWrap: "wrap" }}>
              {selectedPermissions.map((permission, index) => {
                const formattedPermission = permission
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <Chip
                    key={index}
                    label={formattedPermission}
                    icon={<CheckCircle />}
                    variant="filled"
                    size="small"
                    sx={{
                      backgroundColor: "#E3F2FD",
                      color: "#0D47A1",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      padding: "5px",
                      boxShadow: "1px 1px 5px rgba(0,0,0,0.2)",
                    }}
                  />
                );
              })}
            </Stack>
          </Popover>
        </>
      );
    },
  },
];

export const registrationStats = [
  {
    Header: "Company Name",
    accessor: "company_Name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Buyer Name",
    accessor: "buyer_Name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Email",
    accessor: "email",
    align: "center",
    disablePadding: false,
  },
  {
    Header: "Category",
    accessor: "category",
    align: "right",
    disablePadding: false,
  },
  {
    Header: "City",
    accessor: "city",
    align: "right",
    disablePadding: false,
  },
  {
    Header: "Status",
    accessor: "Status",
    align: "right",
    disablePadding: false,
  },
];

export const bidDataStats = [
  {
    Header: "Bid Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Owner Name",
    accessor: "name",
    align: "center",
    disablePadding: false,
  },

  {
    Header: "Payment",
    accessor: "payment",
    align: "right",
    disablePadding: false,
  },
];

export const lOIDataStats = [
  {
    Header: "Bid Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Owner Name",
    accessor: "name",
    align: "center",
    disablePadding: false,
  },

  {
    Header: "LOI Status",
    accessor: "Status",
    align: "right",
    disablePadding: false,
  },
];

export const transactionDataStats = [
  {
    Header: "Transction Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Owner Name",
    accessor: "name",
    align: "center",
    disablePadding: false,
  },

  {
    Header: "Payment",
    accessor: "payment",
    align: "right",
    disablePadding: false,
  },
];

export const contact_us_queries_column = [
  {
    Header: "Sender Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Subject",
    accessor: "subject",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/queries/contact-us/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {data?.row?.original?.subject}
        </NavLink>
      );
    },
  },
  {
    Header: "Sender Email",
    accessor: "email",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <a href={`mailto:${data?.row?.original?.email}`}>
          {data?.row?.original?.email}
        </a>
      );
    },
  },
  {
    Header: "Is Read",
    accessor: "is_read",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {!data?.row?.original?.is_read && (
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FEBE10",
                animation: "blinker 1s infinite",
              }}
            ></span>
          )}

          <b style={{ color: "green" }}>Read</b>

          {/* Blinker animation style */}
          <style>
            {`
              @keyframes blinker {
                50% { opacity: 0; }
              }
            `}
          </style>
        </span>
      );
    },
  },
  {
    Header: "Sended At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
];

export const get_in_touch_queries_column = [
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/queries/get-in-touch/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {data?.row?.original?.company_name}
        </NavLink>
      );
    },
  },
  {
    Header: "Contact Person",
    accessor: "contact_person_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.contact_person_name;
    },
  },
  {
    Header: "Email",
    accessor: "email",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <a href={`mailto:${data?.row?.original?.email}`}>
          {data?.row?.original?.email}
        </a>
      );
    },
  },
  {
    Header: "Is Read",
    accessor: "is_read",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {!data?.row?.original?.is_read && (
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FEBE10",
                animation: "blinker 1s infinite",
              }}
            ></span>
          )}

          <b style={{ color: "green" }}>Read</b>

          {/* Blinker animation style */}
          <style>
            {`
              @keyframes blinker {
                50% { opacity: 0; }
              }
            `}
          </style>
        </span>
      );
    },
  },
  {
    Header: "Sended At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
];

export const missing_data_queries_column = [
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return data?.row?.original?.company?.name;
    },
  },
  {
    Header: "Query Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/queries/missing-data-query/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {data?.row?.original?.type}
        </NavLink>
      );
    },
  },
  {
    Header: "Is Read",
    accessor: "is_read",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {!data?.row?.original?.is_read && (
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FEBE10",
                animation: "blinker 1s infinite",
              }}
            ></span>
          )}

          <b style={{ color: "green" }}>Read</b>

          {/* Blinker animation style */}
          <style>
            {`
              @keyframes blinker {
                50% { opacity: 0; }
              }
            `}
          </style>
        </span>
      );
    },
  },
  {
    Header: "Sended At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
];
export const portal_bids_column = [
  {
    Header: "Bid Id",
    accessor: "Id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "type",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Opening Date",
    accessor: "opening_date",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Closing Date",
    accessor: "closing_date",
    align: "left",
    disablePadding: false,
  },
];

// ----------------REPORTS COLUMN------------------------------------------

export const total_companies_column = [
  {
    Header: "Company Id",
    accessor: "comp_Id",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Created At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    width: 150,
  },
];
export const unregistered_companies_column = [
  {
    Header: "User Id",
    accessor: "user_Id",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "User Name",
    accessor: "user_name",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Phone",
    accessor: "phone_no.",
    align: "left",
    disablePadding: false,
    width: 150,
  },
];
export const completed_bids_column = [
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
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const non_LOI_L1_companies_column = [
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
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const non_participation_companies_column = [
  {
    Header: "Company Id",
    accessor: "comp_Id",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Bid",
    accessor: "bid",
    align: "left",
    disablePadding: false,
    width: 150,
  },
];
export const pending_live_dates_column = [
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
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Created At",
    accessor: "createed_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const closed_bids_column = [
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
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Ended At",
    accessor: "ended_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const activated_bids_column = [
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
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "activated At",
    accessor: "createed_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const revoked_bids_column = [
  {
    Header: "Company ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
  },
  {
    Header: "Revoked for",
    accessor: "bid_title",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "revoked At",
    accessor: "revoked_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const live_bids_column = [
  {
    Header: "Bid Id",
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
  },
  {
    Header: "Created By",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Live At",
    accessor: "live_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
];
export const pending_activation_column = [
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
  },

  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Created By",
    accessor: "creatded_by",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
];
export const review_analysis_column = [
  {
    Header: "companay ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
  },

  {
    Header: "Reviewed By",
    accessor: "review_name",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Review",
    accessor: "review",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Comment",
    accessor: "comment",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
];

const reportColumns = {
  "Total Companies": {
    name: "TotalCompanies",
    column: total_companies_column,
  },
  "Unregister Companies": {
    name: "UnregisteredCompanies",
    column: unregistered_companies_column,
  },
  "Completed Bids": {
    name: "CompletedBids",
    column: completed_bids_column,
  },
  "No LOI for L1": {
    name: "NoLOIforL1",
    column: non_LOI_L1_companies_column,
  },
  "Non Participator Companies": {
    name: "NonParticipatorCompanies",
    column: non_participation_companies_column,
  },
  "Pending Live dates": {
    name: "PendingLiveDates",
    column: pending_live_dates_column,
  },
  "Closed Bids": {
    name: "ClosedBids",
    column: closed_bids_column,
  },
  "Activated Bids": {
    name: "ActivatedBids",
    column: activated_bids_column,
  },
  "Revoked Companies": {
    name: "RevokedCompanies",
    column: revoked_bids_column,
  },
  "Live Bids": {
    name: "LiveBids",
    column: live_bids_column,
  },
  "Pending Activation": {
    name: "PendingActivation",
    column: pending_activation_column,
  },
  "Rating analyses": {
    name: "RatingAnalysis",
    column: review_analysis_column,
  },
};

export const reportColumnHandler = (type) => {
  return reportColumns[type] || { name: "", column: [] };
};
