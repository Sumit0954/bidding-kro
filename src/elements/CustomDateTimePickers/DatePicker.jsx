import React from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./DateTimeRangePicker.module.scss";
import cn from "classnames";

const DatePicker = ({
  label = "",
  showLabel = true,
  name = "",
  placeholder = "",
  customClassName = "",
  rules = {},
  textFieldProps = {},
  control,
  handleChange,
  disableField = false,
  type = "date", // Set the default type to 'date'
  clearErrors,
  value,
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
            <>
              <Box
                className={cn(
                  styles["form-control"],
                  `${error && styles["remove-mb"]}`
                )}
              >
                <TextField
                  {...field}
                  value={value}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    handleChange && handleChange(selectedDate); // Optional: trigger external handler if provided
                    clearErrors(name); // Clear validation errors
                    return field.onChange(selectedDate); // Update the form state with the new date
                  }}
                  size="small"
                  className={cn(
                    styles["input-field"],
                    `${disableField && "disable-input-field"}`
                  )}
                  type={type} // 'date' type input
                  inputProps={{
                    "aria-label": "controlled",
                    placeholder: placeholder,
                    ...textFieldProps,
                  }}
                  disabled={disableField}
                />
              </Box>
              {error && (
                <span className="error">{error.message || "Error"} </span>
              )}
            </>
          );
        }}
      />
    </Box>
  );
};

export default DatePicker;
