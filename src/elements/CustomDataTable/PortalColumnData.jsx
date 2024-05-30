import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";

export const bids_column = [
  {
    Header: "Company Name",
    accessor: "company_name",
    numeric: false,
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
    numeric: false,
    disablePadding: false,
  },
  {
    Header: "Email",
    accessor: "email",
    numeric: false,
    disablePadding: false,
  },
  {
    Header: "Category",
    accessor: "category",
    numeric: false,
    disablePadding: false,
  },
  {
    Header: "City",
    accessor: "city",
    numeric: false,
    disablePadding: false,
  },
];
