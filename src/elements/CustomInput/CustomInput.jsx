import React from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./CustomInput.module.scss";

const CustomInput = ({
  label = "",
  showLabel = "true",
  name = "",
  placeholder = "",
  inputType = "",
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
        render={({ field, fieldState: { error } }) => (
          <Box className={styles['form-control']}>
            <TextField
              {...field}
              {...textFieldProps}
              inputRef={field.ref}
              value={field.value || ""}
              onChange={(e) => {
                handleChange && handleChange(e);
                return field.onChange(e);
              }}
              error={error}
              size="small"
              className={styles['input-field']}
              type={inputType}
              inputProps={{
                type: inputType,
                "aria-label": "controlled",
                placeholder: placeholder,
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

export default CustomInput;
