import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { Button, Chip, Popover, Rating, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import _sendAPIRequest from "../../helpers/api";
import { AdminApiUrls } from "../../helpers/api-urls/AdminApiUrls";

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
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 30)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid type",
    accessor: "type",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Opening Date",
    accessor: "opening_date",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <p
          style={{
            color: data?.row?.original?.bid_open_date === null && "#FFAA33",
          }}
        >
          {data?.row?.original?.bid_open_date !== null
            ? dateTimeFormatter(data?.row?.original?.bid_open_date)
            : "Declaration Pending"}
        </p>
      );
    },
  },
  {
    Header: "Closing Date",
    accessor: "closing_date",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <p
          style={{
            color: data?.row?.original?.bid_close_date === null && "#FFAA33",
          }}
        >
          {data?.row?.original?.bid_close_date !== null
            ? dateTimeFormatter(data?.row?.original?.bid_close_date)
            : "Declaration Pending"}
        </p>
      );
    },
  },
];
export const bid_products_column = [
  {
    Header: "Bid Id",
    accessor: "formatted_number",
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
    Header: "Bid type",
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
    Header: "Company ID",
    accessor: "id",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return <b>Company {data?.row?.original?.id}</b>;
    },
  },
  {
    Header: "Company Name",
    accessor: "name",
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
    Header: "GST IN",
    accessor: "gstin",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Incorporation Year",
    accessor: "incorporation_year",
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
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
];
export const unregistered_companies_column = [
  {
    Header: "First Name",
    accessor: (row) => row.user?.first_name,
  },
  {
    Header: "Last Name",
    accessor: (row) => row.user?.last_name,
  },
  {
    Header: "Email",
    accessor: (row) => row.user?.email,
    Cell: (data) => {
      return (
        <a href={`mailto:${data?.row?.original?.user?.email}`}>
          {data?.row?.original?.user?.email}
        </a>
      );
    },
  },
  {
    Header: "Phone",
    accessor: (row) => row.user?.mobile_number,
    Cell: (data) => {
      return (
        <a href={`tel:${data?.row?.original?.user?.mobile_number}`}>
          {data?.row?.original?.user?.mobile_number}
        </a>
      );
    },
  },
  {
    Header: "Created At",
    accessor: (row) => row.user?.created_at,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.user?.created_at);
    },
  },
];
export const completed_bids_column = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: (data) => {
      console.log(data?.row?.original, "bids");
      return data?.row?.original?.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      return data?.row?.original?.type;
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_open_date);
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_close_date);
    },
  },
  {
    Header: "Company Name",
    accessor: "company",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company?.id}`}
        >
          {data?.row?.original?.company?.name}
        </NavLink>
      );
    },
  },
];
export const non_LOI_L1_companies_column = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: ({ row }) => {
      return row?.original?.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: ({ row }) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(row?.original?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: ({ row }) => {
      return dateTimeFormatter(row?.original?.bid_open_date);
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: ({ row }) => {
      return dateTimeFormatter(row?.original?.bid_close_date);
    },
  },
  {
    Header: "Created By",
    accessor: "company",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: ({ row }) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${row?.original?.company?.id}`}
        >
          {row?.original?.company?.name}
        </NavLink>
      );
    },
  },
];
export const non_participation_companies_column = [
  {
    Header: "Company Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      console.log(data, " : particiapants");
      return <b>Company {data?.row?.original?.bid?.company?.id}</b>;
    },
  },
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.bid?.company?.id}`}
        >
          {data?.row?.original?.bid?.company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.bid?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.bid?.title, 30)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return data?.row?.original?.bid?.type;
    },
  },
];
export const pending_live_dates_column = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: (data) => {
      return data?.row?.original?.formatted_number;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 25)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return data?.row?.original?.type;
    },
  },
  {
    Header: "Created By",
    accessor: "company",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company?.id}`}
        >
          {data?.row?.original?.company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Created At",
    accessor: "created_at",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
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
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 20)}
        </NavLink>
      );
    },
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
    accessor: "bid_close_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_close_date);
    },
  },
];
export const activated_bids_column = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100,
    Cell: (data) => {
      return <b>{data?.row?.original?.formatted_number}</b>;
    },
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return data?.row?.original?.type;
    },
  },
  {
    Header: "Activated By",
    accessor: "company",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company?.id}`}
        >
          {data?.row?.original?.company?.name}
        </NavLink>
      );
    },
  },
];
export const revoked_companies_column = [
  {
    Header: "Company Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return <b>Company {data?.row?.original?.bid?.company?.id}</b>;
    },
  },
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.bid?.company?.id}`}
        >
          {data?.row?.original?.bid?.company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.bid?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.bid?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Type",
    accessor: "type",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return data?.row?.original?.bid?.type;
    },
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
    Cell: (data) => {
      return (
        <NavLink
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Created By",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company?.id}`}
        >
          {data?.row?.original?.company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Live At",
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_open_date);
    },
  },
];
export const pending_activation_column = [
  {
    Header: "Company ID",
    accessor: "id",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return <b>Company {data?.row?.original?.id}</b>;
    },
  },
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company?.id}`}
        >
          {data?.row?.original?.company?.name}
        </NavLink>
      );
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
          to={`/admin/portal-bids/${data?.row?.original?.id}`}
          className={styles["table-link"]}
        >
          {truncateString(data?.row?.original?.title, 20)}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid type",
    accessor: "type",
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
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
];
export const review_analysis_column = [
  {
    Header: "Ranting company",
    accessor: "rating_company",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.rating_company?.id}`}
        >
          {data?.row?.original?.rating_company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Rated company",
    accessor: "rated_company",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.rated_company?.id}`}
        >
          {data?.row?.original?.rated_company?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Rating",
    accessor: "rating",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: ({ row }) => {
      let rating = row?.original?.rating;

      const numericRating =
        typeof rating === "number" && rating >= 0 ? rating : 0;

      return (
        <Rating
          name="read-only-rating"
          value={numericRating}
          readOnly
          precision={0.5}
          size="small"
        />
      );
    },
  },
  {
    Header: "Comment",
    accessor: "comment",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
    Cell: (data) => {
      return data?.row?.original?.comment;
    },
  },
];
export const transaction_report_column = [
  {
    Header: "Transaction ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Order ID",
    accessor: "razorpay_order_id",
    align: "left",
    disablePadding: false,
    width: 120, // Change to uniform width
  },

  {
    Header: "Company Name",
    accessor: "company",
    align: "left",
    disablePadding: false,
    width: 150, // Change to uniform width
  },
  {
    Header: "Bid ID",
    accessor: "bid_formatted_number",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Bid Title",
    accessor: "bid_title",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
  {
    Header: "Status",
    accessor: "status",
    align: "left",
    disablePadding: false,
    width: 100, // Add a uniform width
  },
];

// ----------------REPORTS COLUMN------------------------------------------

// report download data columns
export const total_companies_data = [
  {
    Header: "Company Id",
    accessor: "id",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Company Name",
    accessor: "name",
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
    Header: "GST IN",
    accessor: "gstin",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Incorporation Year",
    accessor: "incorporation_year",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Average Annual Revenue",
    accessor: "avg_annual_revenue",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Business Mobile",
    accessor: "business_mobile",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Total Employees",
    accessor: "employee_count",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Company Categories",
    accessor: "category",
  },
  {
    Header: "Organization type",
    accessor: "organization_type",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Company Website",
    accessor: "website",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Created At",
    accessor: "created_at",
  },
];
export const unregistered_companies_data = [
  {
    Header: "First Name",
    accessor: (row) => row.user?.first_name,
  },
  {
    Header: "Last Name",
    accessor: (row) => row.user?.last_name,
  },
  {
    Header: "Email",
    accessor: (row) => row.user?.email,
  },
  {
    Header: "Phone",
    accessor: (row) => row.user?.mobile_number,
  },
  {
    Header: "Is Mobile Verified",
    accessor: (row) => row.user?.is_mobile_verified,
  },
  {
    Header: "Is Email Verified",
    accessor: (row) => row.user?.is_email_verified,
  },
  {
    Header: "Designation",
    accessor: (row) => row.designation,
  },
  {
    Header: "Whatsapp Number",
    accessor: (row) => row.whatsapp_number,
  },
  {
    Header: "Created At",
    accessor: (row) => row.user?.created_at,
  },
];
export const bids_report_data = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
  },
  {
    Header: "Bid Title",
    accessor: "title",
  },
  {
    Header: "Bid Type",
    accessor: "type",
  },
  {
    Header: "Opening Date",
    accessor: "bid_open_date",
  },
  {
    Header: "Closing Date",
    accessor: "bid_close_date",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Created At",
    accessor: "created_at",
  },
  {
    Header: "Categories",
    accessor: "category",
  },
  {
    Header: "Products",
    accessor: "product",
  },
  {
    Header: "Company",
    accessor: (row) => row?.company?.name,
  },
  {
    Header: "Total reserved price",
    accessor: "total_reserved_price",
  },
  {
    Header: "Total bid amount",
    accessor: "total_bid_amount",
  },
  {
    Header: "Total Saving",
    accessor: (row) => {
      const reserved = Number(row.total_reserved_price) || 0;
      const bidAmount = row.total_bid_amount;

      if (bidAmount === null || bidAmount === undefined) {
        return "N-A";
      }

      const bid = Number(bidAmount) || 0;
      return reserved - bid;
    },
  },
];
export const participation_report_data = [
  {
    Header: "Participant Remark",
    accessor: (row) => {
      return row?.remarks?.trim()
        ? row.remarks
        : "No remark provided by participant";
    },
  },
  {
    Header: "Participant status",
    accessor: "status",
  },
  {
    Header: "Participant company",
    accessor: (row) => {
      return row?.bid?.company?.name;
    },
  },
  {
    Header: "Bid id",
    accessor: (row) => {
      return row?.bid?.id;
    },
  },
  {
    Header: "Bid Formatted number",
    accessor: (row) => {
      return row?.bid?.formatted_number;
    },
  },
  {
    Header: "Bid title",
    accessor: (row) => {
      return row?.bid?.title;
    },
  },
  {
    Header: "Bid Type",
    accessor: (row) => {
      return row?.bid?.type;
    },
  },
  {
    Header: "Bid open date",
    accessor: (row) => {
      return row?.bid?.bid_open_date;
    },
  },
  {
    Header: "Bid close date",
    accessor: (row) => {
      return row?.bid?.bid_close_date;
    },
  },
  {
    Header: "Bid status",
    accessor: (row) => {
      return row?.bid?.status;
    },
  },
  {
    Header: "Created At",
    accessor: (row) => {
      return row?.bid?.created_at;
    },
  },
  {
    Header: "Products",
    accessor: (row) => {
      const products = row?.bid?.product;
      return Array.isArray(products) && products.length > 0
        ? products.map((pro) => pro.title).join(", ")
        : "N-A";
    },
  },
  {
    Header: "Categories",
    accessor: (row) => {
      const categories = row?.bid?.category;
      return Array.isArray(categories) && categories.length > 0
        ? categories.map((cat) => cat.name).join(", ")
        : "N-A";
    },
  },
  {
    Header: "Bid Company",
    accessor: (row) => {
      return row?.bid?.company?.name;
    },
  },
  {
    Header: "Bid reserved price",
    accessor: (row) => {
      return row?.bid?.total_reserved_price;
    },
  },
  {
    Header: "Total bid amount",
    accessor: (row) => {
      return row?.bid?.total_bid_amount !== null
        ? row?.bid?.total_bid_amount
        : "N-A";
    },
  },
  {
    Header: "Total Saving",
    accessor: (row) => {
      const reserved = Number(row?.bid?.total_reserved_price) || 0;
      const bidAmount = row?.bid?.total_bid_amount;

      if (bidAmount === null || bidAmount === undefined) {
        return "N-A";
      }

      const bid = Number(bidAmount) || 0;
      return reserved - bid;
    },
  },
];
export const rating_report_data = [
  {
    Header: "Rated by company's id",
    accessor: (row) => {
      return row?.rating_company?.id;
    },
  },
  {
    Header: "Rated by company's name",
    accessor: (row) => {
      return row?.rating_company?.name;
    },
  },
  {
    Header: "Rated to company's id",
    accessor: (row) => {
      return row?.rated_company?.id;
    },
  },
  {
    Header: "Rated to company's name",
    accessor: (row) => {
      return row?.rated_company?.name;
    },
  },
  {
    Header: "Rating",
    accessor: (row) => {
      return row?.rating;
    },
  },
  {
    Header: "Comment",
    accessor: (row) => {
      return row?.comment;
    },
  },
  {
    Header: "Created At",
    accessor: (row) => {
      return row?.created_at;
    },
  },
  {
    Header: "Bid title",
    accessor: (row) => {
      return row?.bid?.title;
    },
  },
  {
    Header: "Bid formatted id",
    accessor: (row) => {
      return row?.bid?.formatted_number;
    },
  },
  {
    Header: "Bid id",
    accessor: (row) => {
      return row?.bid?.id;
    },
  },
];
// report download data columns

// report column handler
const reportColumns = {
  "Total Companies": {
    name: "TotalCompanies",
    column: total_companies_column,
    api: AdminApiUrls?.FETCH_COMPANY_REPORT,
    downloadData: total_companies_data,
  },
  "Unregister Companies": {
    name: "UnregisteredCompanies",
    column: unregistered_companies_column,
    api: AdminApiUrls?.FETCH_CUSTOMER_REPORT,
    downloadData: unregistered_companies_data,
  },
  "Completed Bids": {
    name: "CompletedBids",
    column: completed_bids_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "completed",
  },
  "No LOI for L1": {
    name: "NoLOIforL1",
    column: non_LOI_L1_companies_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "non_l1_awarded",
  },
  "Non Participator Companies": {
    name: "NonParticipatorCompanies",
    column: non_participation_companies_column,
    api: AdminApiUrls?.FETCH_PARTICIAPATION_REPORTS,
    downloadData: participation_report_data,
    query_type: "not_participated",
  },
  "Pending Live dates": {
    name: "PendingLiveDates",
    column: pending_live_dates_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "undated",
  },
  "Closed Bids": {
    name: "ClosedBids",
    column: closed_bids_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "closed",
  },
  "Activated Bids": {
    name: "ActivatedBids",
    column: activated_bids_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "active",
  },
  "Revoked Companies": {
    name: "RevokedCompanies",
    column: revoked_companies_column,
    api: AdminApiUrls?.FETCH_PARTICIAPATION_REPORTS,
    downloadData: participation_report_data,
    query_type: "revoked",
  },
  "Live Bids": {
    name: "LiveBids",
    column: live_bids_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "live",
  },
  "Pending Activation": {
    name: "PendingActivation",
    column: pending_activation_column,
    api: AdminApiUrls?.FETCH_BIDS_REPORT,
    downloadData: bids_report_data,
    query_type: "pending",
  },
  "Rating analyses": {
    name: "RatingAnalysis",
    column: review_analysis_column,
    api: AdminApiUrls?.FETCH_FEEDBACK_REPORT,
    downloadData: rating_report_data,
  },
  Transaction: {
    name: "Transaction",
    column: transaction_report_column,
    api: null,
    downloadData: "",
  },
};

export const reportColumnHandler = (type) => {
  const selectedReport = reportColumns[type];
  return {
    ...selectedReport,
    query_type: selectedReport?.query_type || "", // Adding query_type
  };
};
// report column handler
