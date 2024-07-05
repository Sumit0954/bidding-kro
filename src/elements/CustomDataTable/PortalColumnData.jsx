import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter } from "../../helpers/formatter";
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
