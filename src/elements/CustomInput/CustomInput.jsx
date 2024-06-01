import React, { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./CustomInput.module.scss";
import cn from "classnames";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInput = ({
  label = "",
  showLabel = true,
  name = "",
  placeholder = "",
  inputType = "text",
  customClassName = "",
  rules = {},
  textFieldProps = {},
  control,
  handleChange,
}) => {
  const text = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const inputTypeChange = () => {
    showPassword
      ? (text.current.type = "password")
      : (text.current.type = "text");
    setShowPassword(!showPassword);
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
                inputRef={inputType === "password" ? text : field.ref}
                value={field.value || ""}
                onChange={(e) => {
                  handleChange && handleChange(e);
                  return field.onChange(e);
                }}
                error={!!error}
                size="small"
                className={styles["input-field"]}
                type={inputType}
                inputProps={{
                  type: inputType,
                  "aria-label": "controlled",
                  placeholder: placeholder,
                }}
              />

              {inputType === "password" &&
                (showPassword ? (
                  <Visibility
                    onClick={inputTypeChange}
                    className={cn('cursor', styles["password-icon"])}
                  />
                ) : (
                  <VisibilityOff
                    onClick={inputTypeChange}
                    className={cn('cursor', styles["password-icon"])}
                  />
                ))}
            </Box>
            {error && (
              <span className="error">{error.message || "Error"} </span>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CustomInput;
