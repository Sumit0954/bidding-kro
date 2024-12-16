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
  disableField = false,
  showPasswordMsg = true,
  multiline = false,
}) => {
  const text = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
                multiline={multiline}
                rows={multiline && 5}
                error={!!error}
                size="small"
                className={cn(
                  styles["input-field"],
                  `${disableField && "disable-input-field"}`
                )}
                type={inputType}
                inputProps={{
                  type: inputType,
                  "aria-label": "controlled",
                  placeholder: placeholder,
                }}
                disabled={disableField}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              {inputType === "password" &&
                (showPassword ? (
                  <Visibility
                    onClick={inputTypeChange}
                    className={cn("cursor", styles["password-icon"])}
                  />
                ) : (
                  <VisibilityOff
                    onClick={inputTypeChange}
                    className={cn("cursor", styles["password-icon"])}
                  />
                ))}
            </Box>
            {error && (
              <span className="error">{error.message || "Error"} </span>
            )}

            {inputType === "password" && isFocused && showPasswordMsg && (
              <div className={cn(styles["password-message"])}>
                <p>Requirements for choosing password :</p>
                <ul>
                  <li className="bullet-points">
                    Your password must be at least 8 characters long.
                  </li>
                  <li className="bullet-points">
                    Your password must have 1 uppercase character.
                  </li>
                  <li className="bullet-points">
                    Your password must have 1 special character.
                  </li>
                  <li className="bullet-points">
                    Your password must have 1 numeric character.
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CustomInput;
