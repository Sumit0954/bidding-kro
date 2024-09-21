import { NavLink, useNavigate } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter, truncateString } from "../../helpers/formatter";
import { convertFileSize } from "../../helpers/common";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../helpers/api";

const onCloneBidClick = async (id, navigate) => {
  try {
    const response = await _sendAPIRequest(
      "POST",
      `${PortalApiUrls.CLONE_BID}${id}/`,
      null,
      true
    );
    if (response?.status === 201) {
      console.log(response);
      navigate(`/portal/bids/categories/${response.data.id}`);
    }
  } catch (error) {
    console.log("Error fetching product list", error);
  }
};

export const created_bids_column = [
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
    width: 200,
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
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 190,
    Cell: (data) => {
      // return dateTimeFormatter(data?.row?.original?.bid_open_date);
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
    width: 190,
    Cell: (data) => {
      return data?.row?.original?.bid_close_date
        ? `${dateTimeFormatter(data?.row?.original?.bid_close_date)}`
        : " - ";
    },
  },
  // {
  //   Header: "Reserve Price",
  //   accessor: "reserved_price",
  //   align: "right",
  //   disablePadding: false,
  //   Cell: (data) => {
  //     return `₹ ${data.row.original.reserved_price}`;
  //   },
  // },
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
  {
    Header: "Action",
    accessor: "clone_bid",
    align: "right",
    disablePadding: false,
    // width: 300,
    Cell: (data) => {
      const navigate = useNavigate();
      return (
        <p
          className={styles["table-link"]}
          onClick={() => onCloneBidClick(data?.row?.original?.id, navigate)}
          // to={`/portal/bids/update/${data?.row?.original?.id}`}
        >
          Clone Bid
        </p>
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
    Cell: (data) => {
      return data.row.original.bid.formatted_number;
    },
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
          to={`/portal/bids/details/${data?.row?.original?.bid?.id}/?type=invited`}
        >
          {truncateString(data?.row?.original?.bid?.title, 30)}
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
      return dateTimeFormatter(data?.row?.original?.bid?.bid_start_date);
    },
  },
  {
    Header: "Closing Date",
    accessor: "bid_end_date",
    align: "left",
    disablePadding: false,
    width: 180,
    Cell: (data) => {
      return dateTimeFormatter(data?.row?.original?.bid?.bid_end_date);
    },
  },
  {
    Header: "Reserve Price",
    accessor: "reserved_price",
    align: "right",
    disablePadding: false,
    Cell: (data) => {
      return `₹ ${data.row.original.bid.reserved_price}`;
    },
  },
  {
    Header: "Status",
    accessor: "status",
    align: "center",
    disablePadding: false,
    hideSortIcon: true,
    Cell: (data) => {
      return (
        <div className={`status-cloumn ${data?.row?.original?.bid?.status}`}>
          {data?.row?.original?.bid?.status}
        </div>
      );
    },
  },
];

export const related_bids_column = [
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
    width: 200,
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
    accessor: "bid_open_date",
    align: "left",
    disablePadding: false,
    width: 190,
    Cell: (data) => {
      // return dateTimeFormatter(data?.row?.original?.bid_open_date);
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
    width: 190,
    Cell: (data) => {
      return data?.row?.original?.bid_close_date
        ? `${dateTimeFormatter(data?.row?.original?.bid_close_date)}`
        : " - ";
    },
  },
  // {
  //   Header: "Reserve Price",
  //   accessor: "reserved_price",
  //   align: "right",
  //   disablePadding: false,
  //   Cell: (data) => {
  //     return `₹ ${data.row.original.reserved_price}`;
  //   },
  // },
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
  {
    Header: "Action",
    accessor: "clone_bid",
    align: "right",
    disablePadding: false,
    // width: 300,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/portal/bids/update/${data?.row?.original?.id}`}
        >
          Clone Bid
        </NavLink>
      );
    },
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
      return (
        <div className={styles["document-type"]}>
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
    Header: "Company Type",
    accessor: "company.organization_type",
    align: "left",
    disablePadding: false,
    width: 160,
    Cell: (data) => {
      return data?.row.original.company.organization_type || "--";
    },
  },
  {
    Header: "Status",
    accessor: "status",
    align: "center",
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
      console.log(data);
      return (
        <NavLink
          className={styles["table-link"]}
          onClick={() => {
            setSelectedProduct(data.row.original);
            setShowSpecification(true);
          }}
        >
          View Speciication
        </NavLink>
      );
    },
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
