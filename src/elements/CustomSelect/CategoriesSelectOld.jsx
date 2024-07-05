import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./CategoriesSelect.module.scss";

const CategoriesSelectOld = ({
  control,
  name,
  label = "",
  customClassName = "",
  options = [],
  showRootCategories = false,
  showLabel = true,
  rules = {},
  placeholder = "Select Categories",
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
          const maxAllowedCategoriesCnt = 10;

          // Fetch & merge unique root categories
          let mergedOptions = options;
          if (showRootCategories) {
            const rootCategories = getUniqueParents(options);
            mergedOptions = [...rootCategories, ...options];
          }

          // Fetch existing selections
          const getSelectedValues = mergedOptions?.filter(
            (option) =>
              field.value?.some((newValue) => newValue.id === option.id) ||
              field.value?.includes(option.id)
          );

          return (
            <Box className={styles["form-control"]}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={mergedOptions}
                value={getSelectedValues}
                disableCloseOnSelect={true}
                getOptionDisabled={(_) =>
                  field?.value?.length >= maxAllowedCategoriesCnt
                }
                onChange={(_, items) => {
                  // update react hook form value
                  const categoryIds = items.map((val) => val.id);
                  field.onChange(categoryIds);
                }}
                getOptionLabel={(option) => option.name}
                filterOptions={(options, state) => {
                  // Search both child and parent category
                  const input = state.inputValue.toLowerCase();
                  return options.filter(
                    (option) =>
                      option.name.toLowerCase().includes(input) ||
                      option.parent?.name?.toLowerCase().includes(input)
                  );
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Typography
                      variant="body1"
                      component="div"
                      flexDirection="column"
                    >
                      <span>{option.name}</span>

                      {option.parent && (
                        <Typography variant="body2" color="text.secondary">
                          in {option.parent.name}
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    helperText={
                      field?.value?.length >= maxAllowedCategoriesCnt
                        ? "Note: Maximum number of selections reached."
                        : ""
                    }
                    classes={{ root: styles["input-field"] }}
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

export default CategoriesSelectOld;

const getUniqueParents = (data) =>
  Array.from(
    new Map(
      data
        .filter((item) => item.parent && item.parent.parent === null)
        .map((item) => [item.parent.id, item.parent])
    ).values()
  );
