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
    Header: "Email",
    accessor: "business_email",
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