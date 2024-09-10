import React, { useState, useEffect } from "react";
import styles from "./CategoriesSelect.module.scss";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import _sendAPIRequest, { setErrors } from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
// import SearchSelect from "./SearchSelect";
import SearchBar from "./SearchBar";

const CategoriesSelect = ({
  control,
  name,
  label = "",
  options = [],
  showLabel = true,
  rules = {},
  placeholder = "",
  selectedCategories,
  handleCategoryChange,
  handleChange,
  multiple = true,
  handleOptionChange,
  searchEnabled = false, // Added default prop for searchEnabled
  // searchApiUrl = "", // Added default prop for searchApiUrl
  rootCategory = "", // Added default prop for rootCategory
  // searchResults = [], // Added default prop for searchResults
  // handleSearchChange, // Added handler for search input changes
}) => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  console.log(rootCategory, "rt1");
  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     if (searchQuery && rootCategory) {
  //       try {
  //         const params = new URLSearchParams();
  //         params.append("keyword", searchQuery);
  //         params.append("root_category", rootCategory);
  //         const response = await _sendAPIRequest("GET", searchApiUrl, params);
  //         if (response.status === 200) {
  //           const formattedResults = response.data.map((item) => ({
  //             id: item.id,
  //             name: item.name,
  //             path: item.ancestors.map((ancestor) => ancestor.name).join(" > "),
  //           }));
  //           setSearchResults(formattedResults);
  //         }
  //       } catch (error) {
  //         console.error("Search error:", error);
  //       }
  //     } else {
  //       setSearchResults([]);
  //     }
  //   };

  //   fetchSearchResults();
  // }, [searchQuery, rootCategory, searchApiUrl]);

  // const handleSearchChange = (event, newValue) => {
  //   setSearchQuery(newValue);
  // };

  // const handleSearchChange = async (event) => {
  //   setSearchQuery(event.target.value);
  //   if (event.target.value) {
  //     try {
  //       const params = new URLSearchParams();
  //       params.append("query", event.target.value);
  //       const response = await _sendAPIRequest("GET", searchApiUrl, params);
  //       if (response.status === 200) {
  //         setSearchResults(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Search error:", error);
  //     }
  //   } else {
  //     setSearchResults([]);
  //   }
  // };
  return (
    <>
      <Box className={styles["input-field-container"]}>
        {searchEnabled && (
          <SearchBar
            name="product_search"
            placeholder="Search Your Product"
            control={control}
            rootCategory={rootCategory}
            value={undefined}
            onAncestorsChange={handleOptionChange}
          />
        )}
        {showLabel && (
          <label>
            {label} {rules?.required && <em className="em">*</em>}
          </label>
        )}
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field, fieldState: { error } }) => {
            return (
              <Box className={styles["form-control"]}>
                <Autocomplete
                  {...field}
                  id="tags-standard"
                  multiple={multiple}
                  open={false}
                  options={options}
                  getOptionLabel={(option) => option?.name || ""}
                  forcePopupIcon={false}
                  value={selectedCategories}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                    handleChange && handleChange(newValue);
                  }}
                  disableCloseOnSelect={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder={placeholder}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      return (
                        <Chip
                          key={index}
                          label={option.name}
                          {...getTagProps({ index })}
                          sx={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--white)",
                            "& .MuiChip-deleteIcon": {
                              color: "var(--white)",
                            },
                          }}
                        />
                      );
                    })
                  }
                />
                {error && (
                  <span className="error">{error.message || "Error"} </span>
                )}
                <div style={{ marginTop: "16px" }}>
                  {options?.map((option) => (
                    <Chip
                      key={option?.id}
                      label={option?.name}
                      onClick={() =>
                        handleCategoryChange(
                          option?.depth,
                          option,
                          field.onChange
                        )
                      }
                      deleteIcon={<AddIcon />}
                      onDelete={() => {}}
                      style={{ margin: "5px", marginLeft: "0px" }}
                    />
                  ))}
                </div>
              </Box>
            );
          }}
        />
      </Box>
    </>
  );
};

export default CategoriesSelect;
