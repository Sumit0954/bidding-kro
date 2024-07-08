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
      return data?.row?.original?.bid?.title;
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
    Header: "Owner Name",
    accessor: "customer.first_name",
    align: "left",
    disablePadding: false,
    Cell: (data) => {
      return `${data?.row?.original?.customer?.first_name} ${data?.row?.original?.customer?.last_name}`;
    },
  },
  {
    Header: "Payment Status",
    accessor: "payment",
    align: "left",
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
