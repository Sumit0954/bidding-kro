import React, { useState } from "react";
import styles from "./AddressForm.module.scss";
import cn from "classnames";
import { useForm, useFieldArray } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const AddressForm = ({ addresses }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      addresses: addresses,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const [formCount, setFormCount] = useState(fields.length);

  const handleAddAddress = () => {
    if (formCount < 5) {
      append({ street: "", city: "", state: "", pincode: "" });
      setFormCount(formCount + 1);
    }
  };

  const handleDeleteAddress = (index) => {
    remove(index);
    setFormCount(formCount - 1);
  };

  const onSubmit = (data) => {
    console.log("Submitted Addresses:", data.addresses);
    // Add your submission logic here
  };

  return (
    <>
      <div className={styles["address-section"]}>
        <h4>Addresses ({formCount})</h4>
        <button
          type="button"
          className={cn("btn", "button", `${formCount >= 5 ? "disable" : ""}`)}
          onClick={handleAddAddress}
          disabled={formCount >= 5 ? true : false}
        >
          + Add Address
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id}>
            <Accordion
              defaultExpanded
              square={true}
              classes={{ root: "custom-accordion" }}
            >
              <AccordionSummary className={styles["custom-accordion-summary"]}>
                <Typography classes={{ root: "custom-accordion-heading" }}>
                  Address Line {index + 1}
                </Typography>
                <IconButton>
                  <Delete onClick={() => handleDeleteAddress(index)} />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Street Address"
                      name={`addresses[${index}].street`}
                      placeholder="Street Address"
                      rules={{
                        required: "Street Address is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <CustomInput
                      control={control}
                      label="City"
                      name={`addresses[${index}].city`}
                      placeholder="City"
                      rules={{
                        required: "City  is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <CustomInput
                      control={control}
                      label="State"
                      name={`addresses[${index}].state`}
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
                      name={`addresses[${index}].pincode`}
                      placeholder="Pincode"
                      rules={{
                        required: "Pincode  is required.",
                      }}
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

        <div className="row my-3">
          <div className="col text-end">
            <button
              type="submit"
              className={cn("btn", "button", styles["custom-btn"])}
            >
              Save Address
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
