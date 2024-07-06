import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";

export const companies_column = [
  {
    Header: "Company Name",
    accessor: "name",
    align: "left",
    disablePadding: false,
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
    Header: "Owner",
    accessor: "customer_profile.user.first_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return `${data?.row?.original?.customer_profile?.user?.first_name} ${data?.row?.original?.customer_profile?.user?.last_name}`;
    },
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
  },
];

export const transactions_column = [
  {
    Header: "Transction Id",
    accessor: "transction_id",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/transactions/${data?.row?.original?.transction_id}`}
        >
          {data?.row?.original?.transction_id}
        </NavLink>
      );
    },
  },
  {
    Header: "Bid Title",
    accessor: "bid title",
    align: "left",
    disablePadding: false,
  },

  {
    Header: "Owner Name",
    accessor: "owner name",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Payment Status",
    accessor: "payment",
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
      return (
        <NavLink
          className={styles["table-link"]}
          to={`/admin/blogs/${data?.row?.original?.id}`}
        >
          {data?.row?.original?.name}
        </NavLink>
      );
    },
  },
  {
    Header: "Title",
    accessor: "title",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Actions",
    accessor: "action",
    align: "left",
    disablePadding: false,
  },
];
