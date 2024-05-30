import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./CustomSelect.module.scss";
import { Controller } from "react-hook-form";

const CustomSelect = ({
  options = [],
  label = "",
  showLabel = true,
  name = "",
  placeholder = "",
  multiple,
  customClassName = "",
  rules = {},
  textFieldProps = {},
  control,
  handleChange,
}) => {
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
                multiple={multiple}
                disableCloseOnSelect={multiple}
                {...field}
                id="tags-standard"
                options={options}
                getOptionLabel={(option) => option.lable || ""}
                onChange={(event, newValue) => {
                  handleChange && handleChange(newValue);
                  field.onChange(newValue);
                }}
                value={field.value}
                renderOption={(props, option) => (
                  <Box {...props}>
                    <Typography>
                      <span>{option.lable}</span>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    classes={{ root: styles["input-field"] }}
                  />
                )}
                error={!!error}
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

export default CustomSelect;
