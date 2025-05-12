import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Box, Tab, TableCell, Tabs } from "@mui/material";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import PropTypes from "prop-types";
import {
  contact_us_queries_column,
  customer_support_column,
  get_in_touch_queries_column,
  missing_data_queries_column,
} from "../../../elements/CustomDataTable/AdminColumnData";

const QueryList = () => {
  const [value, setValue] = useState(0);
  const { setAlert } = useContext(AlertContext);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserQueries = async (value) => {
    let API;

    switch (value) {
      case 0:
        API = AdminApiUrls.CONTACT_US_QUERY;
        setTableColumns(contact_us_queries_column);
        break;
      case 1:
        API = AdminApiUrls.GET_IN_TOUCH_QUERY;
        setTableColumns(get_in_touch_queries_column);
        break;
      case 2:
        API = AdminApiUrls.MISSING_DATA_QUERY;
        setTableColumns(missing_data_queries_column);
        break;
      case 3:
        API = AdminApiUrls.CUSTOMER_SUPPORT_QUERY;
        setTableColumns(customer_support_column);
        break;
      default:
        console.log("Invalid API value");
        return;
    }

    try {
      const response = await _sendAPIRequest("GET", API, "", true);
      if (response.status === 200) {
        setTableData(response.data);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchUserQueries(value);
  }, [value]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="query-list-tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "@media (max-width: 600px)": {
              width: "100%", // Tabs take full width only on mobile
              marginBottom: "1rem", // Adds spacing below tabs for mobile
            },
          }}
        >
          <Tab label="Contact Us" {...a11yProps(0)} />
          <Tab label="Book a Demo" {...a11yProps(1)} />
          <Tab label="Missing Data Query" {...a11yProps(2)} />
          <Tab label="Customer Support" {...a11yProps(3)} />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          <DataTable
            propsColumn={tableColumns}
            propsData={tableData}
            action={addAction}
            customClassName="admin-data-table"
          />
        </Box>
      </Box>
    </>
  );
};

export default QueryList;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
