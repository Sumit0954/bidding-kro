import React from "react";
import styles from "./CategoriesSelect.module.scss";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

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
}) => {
  return (
    <>
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
                  id="tags-standard"
                  multiple={multiple}
                  open={false}
                  options={options}
                  getOptionLabel={(option) => option?.name || ""}
                  forcePopupIcon={false}
                  value={selectedCategories}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
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
                        handleCategoryChange(option?.depth, option, field.onChange)
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
