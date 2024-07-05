import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter } from "../../helpers/formatter";

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
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/bids/details/${data?.row?.original?.id}`}
        >
          {data?.row?.original?.title}
        </NavLink>
      );
    },
  },
  {
    Header: "Opening Date",
    accessor: "bid_start_date",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid_start_date);
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_end_date",
    align: "left",
    disablePadding: false,
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
    accessor: "document_name",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Document Type",
    accessor: "document_type",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Document Size",
    accessor: "document_size",
    align: "left",
    disablePadding: false,
    width: 160,
  },
  {
    Header: "Document Date",
    accessor: "document_date",
    align: "left",
    disablePadding: false,
    width: 160,
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
