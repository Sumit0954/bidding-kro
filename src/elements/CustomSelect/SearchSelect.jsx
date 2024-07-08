import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { Controller } from "react-hook-form";
import { dateTimeFormatter } from "../../helpers/formatter";

const SearchSelect = ({
  options = [],
  label = "",
  showLabel = true,
  name = "",
  placeholder = "",
  customClassName = "",
  rules = {},
  control,
  handleChange,
  handleInputChange,
  setValue,
  value,
}) => {
  const [inputValue, setInputValue] = useState("");
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
        render={({ field, fieldState: { error } }) => {
          return (
            <Box className={styles["form-control"]}>
              <Autocomplete
                {...field}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={
                  inputValue.length || value >= 3
                    ? options.map((option) => option)
                    : []
                }
                getOptionLabel={(option) =>
                  name === "title" ? option.title || option : option.lable || ""
                }
                inputValue={inputValue}
                value={value}
                onInputChange={(event, newInputValue) => {
                  return (
                    handleInputChange &&
                      handleInputChange(event, newInputValue),
                    setInputValue(newInputValue)
                  );
                }}
                onChange={(event, newValue) => {
                  handleChange && handleChange(event, newValue);
                  field.onChange(newValue);
                  name !== "title" && setValue(newValue);
                  setInputValue("");
                }}
                filterOptions={(options) => {
                  if (name === "title") {
                    return options;
                  } else {
                    return options.filter((option) =>
                      option.lable
                        .toLowerCase()
                        .includes(inputValue?.toLowerCase())
                    );
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    classes={{ root: styles["search-input-field"] }}
                  />
                )}
                renderOption={(props, option) => {
                  if (name !== "title") {
                    return (
                      <Box component="li" {...props}>
                        {option.lable}
                      </Box>
                    );
                  } else {
                    return (
                      <Box component="li" {...props}>
                        <Typography
                          variant="body1"
                          component="div"
                          flexDirection="column"
                          width="100%"
                        >
                          <span>{option.title}</span>

                          <Typography variant="body2" color="text.secondary">
                            <div className={styles["sub-details"]}>
                              <span>{option.formatted_number}</span>
                              <span>Rs. {option.reserved_price}</span>
                              <span>
                                {dateTimeFormatter(option.bid_start_date)}
                              </span>
                              <span>
                                {dateTimeFormatter(option.bid_end_date)}
                              </span>
                              <span
                                className={`status-cloumn ${option.status}`}
                              >
                                {option.status}
                              </span>
                            </div>
                          </Typography>
                        </Typography>
                      </Box>
                    );
                  }
                }}
              />

              {error && (
                <span className="error">{error.message || "Error"} </span>
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default SearchSelect;
