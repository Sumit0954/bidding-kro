import { NavLink } from "react-router-dom";
import styles from "./DataTable.module.scss";
import { dateTimeFormatter } from "../../helpers/formatter";

export const companies_column = [
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
    Header: "Buyer Name",
    accessor: "customer_profile.user.first_name",
    align: "left",
    disablePadding: false,
    width: 150,
    Cell: (data) => {
      return `${data?.row?.original?.customer_profile?.user?.first_name} ${data?.row?.original?.customer_profile?.user?.last_name}`;
    },
  },
  {
    Header: "Email",
    accessor: "business_email",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Category",
    accessor: "category",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "City",
    accessor: "city",
    align: "left",
    disablePadding: false,
    width: 150,
  },
  {
    Header: "Status",
    accessor: "status",
    align: "left",
    disablePadding: false,
    width: 100,
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

export const Admin_list_column = [
  {
    Header: "Admin Id",
    accessor: "Id",
    align: "left",
    disablePadding: false,
  },
  {
    Header: "Admin Name",
    accessor: "name",
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
    Header: "Actions",
    accessor: "action",
    align: "right",
    disablePadding: false,
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
