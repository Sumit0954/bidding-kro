import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";

export const bids_column = [
  {
    Header: "Company Name",
    accessor: "company_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/companies/${data?.row?.original?.company_id}`}
        >
          {data?.row?.original?.company_name}
        </NavLink>
      );
    },
  },
  {
    Header: "Buyer Name",
    accessor: "buyer_name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Email",
    accessor: "email",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Category",
    accessor: "category",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "City",
    accessor: "city",
    align: "left",
    disablePadding: false,
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
    hideSortIcon: true
  },
];
