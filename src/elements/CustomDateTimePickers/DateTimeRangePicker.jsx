import React from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./DateTimeRangePicker.module.scss";
import cn from "classnames";

const DateTimeRangePicker = ({
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
  type = "datetime-local",
  clearErrors
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
                  {...textFieldProps}
                  value={field.value || ""}
                  onChange={(e) => {
                    handleChange && handleChange(e);
                    clearErrors(name)
                    return field.onChange(e);
                  }}
                  size="small"
                  className={cn(
                    styles["input-field"],
                    `${disableField && "disable-input-field"}`
                  )}
                  type={type}
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

export default DateTimeRangePicker;
