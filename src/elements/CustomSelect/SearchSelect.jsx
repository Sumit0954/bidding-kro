import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { Controller } from "react-hook-form";

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
}) => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
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
                  inputValue.length > 2
                    ? options.map((option) => option.lable)
                    : []
                }
                inputValue={inputValue}
                value={value}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                  setValue(newValue);
                  setInputValue("");
                }}
                filterOptions={(options) => {
                  return options.filter((option) =>
                    option.toLowerCase().includes(inputValue?.toLowerCase())
                  );
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
