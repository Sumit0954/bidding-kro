import React, { useState } from "react";
import styles from "./AddressForm.module.scss";
import cn from "classnames";
import { useForm, useFieldArray } from "react-hook-form";
import SearchSelect from "../../../elements/CustomSelect/SearchSelect";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const AddressForm = ({ addresses }) => {
  const { control } = useForm({
    defaultValues: {
      addresses: addresses,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const [formCount, setFormCount] = useState(fields.length);
  const MAX_ADDRESS_COUNT = 3;

  const handleAddAddress = () => {
    if (formCount < MAX_ADDRESS_COUNT) {
      append({ street: "", city: "", state: "", pincode: "" });
      setFormCount(formCount + 1);
    }
  };

  const handleDeleteAddress = (index) => {
    remove(index);
    setFormCount(formCount - 1);
  };

  return (
    <>
      <div className={styles["address-section"]}>
        <h4>Addresses ({formCount})</h4>
        <button
          type="button"
          className={cn(
            "btn",
            "button",
            `${formCount >= MAX_ADDRESS_COUNT ? "disable" : ""}`
          )}
          onClick={handleAddAddress}
          disabled={formCount >= MAX_ADDRESS_COUNT ? true : false}
        >
          + Add Address
        </button>
      </div>

      {fields.map((item, index) => (
        <IndividualAddressForm
          key={item.id}
          index={index}
          address={item}
          onDelete={handleDeleteAddress}
        />
      ))}
    </>
  );
};

export default AddressForm;

const IndividualAddressForm = ({ address, index, onDelete }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      address: address,
    },
  });

  const submitForm = (data, index) => {
    console.log(data, index);
  };

  return (
    <form onSubmit={handleSubmit((data) => submitForm(data, index))}>
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["address-accordion"]}`,
        }}
      >
        <AccordionSummary className={styles["custom-accordion-summary"]}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Address {index + 1}
          </Typography>
          <IconButton className={styles["delete-btn"]}>
            <Delete onClick={() => onDelete(index)} />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col-lg-12">
              <CustomInput
                control={control}
                label="Street Address"
                name="street"
                placeholder="Street Address"
                rules={{
                  required: "Street Address is required.",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SearchSelect
                control={control}
                options={[
                  {
                    lable: "India",
                    value: 101,
                  },
                  {
                    lable: "Delhi",
                    value: 102,
                  },
                  {
                    lable: "New delhi",
                    value: 103,
                  },
                  {
                    lable: "United States",
                    value: 233,
                  },
                  {
                    lable: "United Kingdom",
                    value: 232,
                  },
                  {
                    lable: "Australia",
                    value: 14,
                  },
                ]}
                label="City"
                name="city"
                placeholder="City"
                rules={{
                  required: "City  is required.",
                }}
              />
            </div>
            <div className="col-lg-4">
              <SearchSelect
                control={control}
                options={[
                  {
                    lable: "India",
                    value: 101,
                  },
                  {
                    lable: "Delhi",
                    value: 102,
                  },
                  {
                    lable: "New delhi",
                    value: 103,
                  },
                  {
                    lable: "United States",
                    value: 233,
                  },
                  {
                    lable: "United Kingdom",
                    value: 232,
                  },
                  {
                    lable: "Australia",
                    value: 14,
                  },
                ]}
                label="State"
                name="state"
                placeholder="State"
                rules={{
                  required: "State  is required.",
                }}
              />
            </div>
            <div className="col-lg-4">
              <CustomInput
                control={control}
                label="Pincode"
                name="pincode"
                placeholder="Pincode"
                rules={{
                  required: "Pincode  is required.",
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col text-end">
              <button
                type="submit"
                className={cn("btn", "button", styles["custom-btn"])}
                onClick={handleSubmit((data) => submitForm(data, index))}
              >
                Save Address
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};
