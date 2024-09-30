import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import _sendAPIRequest from "../../helpers/api";
import styles from "./CustomSelect.module.scss";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";

const SearchBar = ({
  control,
  name,
  label = "",
  showLabel = true,
  placeholder = "",
  customClassName = "",
  rules = {},
  rootCategory, // Root category ID
  value,
  ancestors,
  // handleChange,
  onAncestorsChange,
  disabled,
  multiple,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    setInputValue("");
  }, [rootCategory]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      console.log(rootCategory, "hyhyh");
      if (inputValue) {
        try {
          const params = {
            keyword: inputValue,
            root_category: rootCategory,
            ancestors: ancestors,
          };

          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.SEARCH_CATEGORIES,
            params,
            true
          );

          if (response.status === 200) {
            setSearchResults(response.data);
          }
        } catch (error) {
          console.error("Search error:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults();
    }, 500); // Delay of 500ms

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, rootCategory]);

  const formatLabelWithAncestors = (option) => {
    if (!option || !option.name || !option.ancestors) return "Unknown Option";

    const ancestorNames = option.ancestors.map((ancestor) => ancestor.name);
    const formattedLabel = ancestorNames.slice(0, -1).join(" > ");

    return `${option.name}`;
  };

  // const handleOptionChange = (option) => {
  //   if (option && onAncestorsChange) {
  //     onAncestorsChange(option.ancestors || []);
  //   }
  // };

  const handleOptionChange = (option) => {
    if (option && onAncestorsChange) {
      if (ancestors === false && Array.isArray(option)) {
        const ids = option.map((item) => item.id);
        console.log(ids, "option.ids");
        onAncestorsChange(ids);
      } else {
        onAncestorsChange(option.ancestors || []); // Pass ancestors when present
      }
    }
  };

  return (
    <Box className={styles["input-field-container"]}>
      {showLabel && (
        <label>
          {label} {rules?.required && <em className="em">*</em>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Box className={styles["form-control"]}>
            <Autocomplete
              {...field}
              freeSolo
              multiple={multiple}
              options={searchResults}
              inputValue={inputValue}
              value={value}
              disableClearable
              clearOnEscape={false}
              disabled={disabled}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                field.onChange(newValue);
                setInputValue("");
                handleOptionChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  disabled={disabled}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <>
                        {params.InputProps.endAdornment}
                        {/* Hide additional clear button */}
                      </>
                    ),
                  }}
                  classes={{ root: styles["search-input-field"] }}
                />
              )}
              // getOptionLabel={(option) => {
              //   if (typeof option === "string") return option;
              //   return formatLabelWithAncestors(option); // Fallback handles missing values
              // }}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                // Show only the name if ancestors is false
                return ancestors === false
                  ? option.name
                  : formatLabelWithAncestors(option);
              }}
              renderOption={(props, option) => {
                if (ancestors === false) {
                  return (
                    <Box component="li" {...props} style={{ display: "block" }}>
                      <Typography variant="body1">{option.name}</Typography>
                    </Box>
                  );
                }
                const ancestorNames = option.ancestors.map(
                  (ancestor) => ancestor.name
                );
                const formattedLabel = ancestorNames.slice(0, -1).join(" > ");

                return (
                  <Box component="li" {...props} style={{ display: "block" }}>
                    <Typography variant="body1" style={{ color: "#0dcaf0" }}>
                      {option.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formattedLabel}
                    </Typography>
                  </Box>
                );
              }}
            />
            {error && (
              <span className="error">{error.message || "Error"} </span>
            )}
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchBar;
