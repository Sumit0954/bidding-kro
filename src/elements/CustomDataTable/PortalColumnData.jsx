import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { convertFileSize } from "../../helpers/common";

export const bids_column = [
  {
    Header: "Bid ID",
    accessor: "formatted_number",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Bid Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
    width: 300,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/bids/details/${data?.row?.original?.id}`}
        >
          {truncateString(data?.row?.original?.title, 30)}
        </NavLink>
      );
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_start_date",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_start_date);
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_end_date",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_end_date);
    },
  },
  {
    Header: "Reserve Price",
    accessor: "reserved_price",
    align: "right",
    disablePadding: false,
  },
  {
    Header: "Status",
    accessor: "status",
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

export const documents_column = [
  {
    Header: "Document Name",
    accessor: "name",
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
    Cell : (data) => {
      return (
        <div className={styles['document-type']}>
          {data?.row?.original?.type}
        </div>
      )
    }
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
  },
  {
    Header: "Owner Name",
    accessor: "owner name",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Email",
    accessor: "email",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return convertFileSize(data?.row?.original?.size);
    },
  },
  {
    Header: "Mobile",
    accessor: "mobile",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  {
    Header: "City",
    accessor: "city",
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
  },
];

export const PreviousBids_column = [
  {
    Header: "Product Name",
    accessor: "product name",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Unit",
    accessor: "unit",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return convertFileSize(data?.row?.original?.size);
    },
  },
  {
    Header: "Closing Date",
    accessor: "closing date",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.created_at);
    },
  },
  {
    Header: "Buyer’s Rating",
    accessor: "buyer’s rating",
    align: "center",
    disablePadding: false,
    width: 100,
    hideSortIcon: true,
  },
];