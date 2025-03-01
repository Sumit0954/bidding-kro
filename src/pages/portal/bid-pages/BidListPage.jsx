import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BidList from "../../../components/portal/bids/BidList";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import SearchBar from "../../../elements/CustomSelect/SearchBar";

const BidListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.state?.listType || 0);
  const [selectedRow, setSelectedRow] = useState({});
  // const [categories, setCategories] = useState({ 0: [] });
  // const [rootCategory, setRootCategory] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const { control } = useForm();

  // const handleCategorySelection = (selected) => {
  //   console.log(selected, "Selected category");
  //   if (selected && selected.value) {
  //     setRootCategory(selected.value);
  //   } else {
  //     setRootCategory(null);
  //   }
  // };

  // const getCategories = async (parent_categories, depth) => {
  //   const params = new URLSearchParams();
  //   parent_categories.forEach((value) => {
  //     if (value !== undefined) {
  //       params.append("parent_category", value);
  //     }
  //   });

  //   try {
  //     const response = await _sendAPIRequest(
  //       "GET",
  //       PortalApiUrls.GET_CATEGORIES,
  //       params,
  //       true
  //     );
  //     if (response.status === 200) {
  //       const mappedCategories = response.data.map((category) => ({
  //         lable: category.name, // 'label' is used by Autocomplete to display
  //         value: category.id, // 'value' is used for internal management
  //         depth: category.depth,
  //       }));
  //       setCategories((prevCategories) => ({
  //         ...prevCategories,
  //         [depth]: mappedCategories,
  //       }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCategories([], 0);
  // }, []);

  // useEffect(() => {
  //   setSelectedCategory(rootCategory);
  // }, [rootCategory]);

  // const handleOptionChange = (ancestors) => {
  //   console.log(ancestors, "ancestorsancestors");
  //   setSelectedCategory(ancestors);
  // };

  // useEffect(() => {
  //   console.log(rootCategory, "rootCategory updated");
  // }, [rootCategory]);

  // useEffect(() => {
  //   if (id) {
  //     let url = PortalApiUrls.RETRIEVE_CREATED_BID;
  //     const retrieveBid = async () => {
  //       try {
  //         const response = await _sendAPIRequest(
  //           "GET",
  //           url + `${id}/`,
  //           "",
  //           true
  //         );
  //         if (response.status === 200) {
  //           setBidDetails(response.data);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     retrieveBid();
  //   }
  // }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="bid-list-tabs"
            sx={{
              "@media (max-width: 600px)": {
                width: "100%", // Tabs take full width only on mobile
                marginBottom: "1rem", // Adds spacing below tabs for mobile
              },
            }}
          >
            <Tab label="Created Bids" {...a11yProps(0)} />
            <Tab label="Invited Bids" {...a11yProps(1)} />
            <Tab label="Related Bids" {...a11yProps(2)} />
          </Tabs>

          {value === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "@media (max-width: 600px)": {
                  width: "100%", // Button takes full width on mobile
                  justifyContent: "center", // Center-align for mobile
                  marginTop: "1rem", // Add spacing below tabs on mobile
                },
              }}
            >
              <NavLink
                to={"/portal/bids/categories"}
                className={cn("btn", "button")}
                style={{
                  padding: "10px",
                  backgroundColor: "#002f6c",
                  color: "#fff",
                  borderRadius: "4px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "inline-block",
                  "@media (max-width: 600px)": {
                    width: "100%",
                  },
                  width: "100%",
                }}
              >
                + Create Bid
              </NavLink>
            </Box>
          )}
        </Box>

        <TabPanel value={value} index={0}>
          <BidList listType={"created"} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BidList listType={"invited"} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BidList listType={"related"} />
        </TabPanel>
      </Box>
    </>
  );
};

export default BidListPage;

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
