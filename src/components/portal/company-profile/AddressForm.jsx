import React, { useContext, useEffect, useState } from "react";
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
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { modifiedData } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const AddressForm = ({ addresses, action }) => {
  const { control, reset } = useForm({
    defaultValues: {
      addresses: addresses,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
    keyName: "_id",
  });

  const { setAlert } = useContext(AlertContext);
  const [formCount, setFormCount] = useState(fields.length);
  const MAX_ADDRESS_COUNT = 3;

  useEffect(() => {
    reset({ addresses });
    setFormCount(addresses?.length);
  }, [addresses, reset]);

  const handleAddAddress = () => {
    if (formCount < MAX_ADDRESS_COUNT) {
      append({ street: "", city: "", state: "", pincode: "" });
      setFormCount(formCount + 1);
    }
  };

  const handleDeleteAddress = async (index, address_id) => {
    try {
      const data = { address_id: address_id };
      const response = await _sendAPIRequest(
        "DELETE",
        PortalApiUrls.DELETE_ADDRESS,
        data,
        true
      );
      if (response.status === 204) {
        remove(index);
        setFormCount(formCount - 1);
        setAlert({
          isVisible: true,
          message: `Address line ${index + 1} has been deleted.`,
          severity: "success",
        });
      }
    } catch (error) {
      const { data } = error.response;
      if (data) {
        if (data.error) {
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
          });
        }
      }
    }
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
          key={item._id}
          index={index}
          address={item}
          action={action}
          onDelete={handleDeleteAddress}
        />
      ))}
    </>
  );
};

export default AddressForm;

const IndividualAddressForm = ({ address, index, action, onDelete }) => {
  const { control, handleSubmit, setError, watch } = useForm({
    defaultValues: {
      address: address,
    },
  });
  const { setAlert } = useContext(AlertContext);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateValue, setStateValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({
    latitude: "",
    longitude: "",
    json_id: "",
  });

  const getStatesList = async () => {
    const params = { country: 102, ordering: "name" };
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_STATES,
        params,
        true
      );
      if (response.status === 200) {
        const data = modifiedData(response.data);
        setStates(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatesList();
  }, []);

  const getCityDetail = async () => {
    if (!cityValue?.value) return;
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.RETRIEVE_CITY + `${cityValue?.value}`,
        "",
        true
      );
      if (response.status === 200) {
        const { latitude, longitude, json_id } = response.data;
        setGeoLocation({
          latitude: latitude,
          longitude: longitude,
          json_id: json_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityInputChange = async (event, value) => {
    if (!stateValue?.value) {
      setError("state", {
        type: "focus",
        message: "Please select a state first.",
      });
    }

    if (value.length >= 3 && stateValue?.value) {
      const params = {
        state: stateValue.value,
        search: value,
        ordering: "name",
      };
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.GET_CITIES,
          params,
          true
        );
        if (response.status === 200) {
          const data = modifiedData(response.data);
          setCities(data);
          getCityDetail();
        }
      } catch (error) {
        const { data } = error.response;
        if (data) {
          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }
  };

  const submitForm = async (data, index) => {
    setLoading(true);

    let formData = new FormData();
    if (data) {
      formData.append("address", data.street);
      formData.append("state", data.state.lable);
      formData.append("city", data.city.lable);
      formData.append("pincode", data.pincode);
      formData.append("latitude", geoLocation.latitude);
      formData.append("longitude", geoLocation.longitude);
      formData.append("json_id", geoLocation.json_id);
    }

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.CREATE_ADDRESS,
        formData,
        true
      );
      if (response.status === 201) {
        window.location.reload();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      if (data) {
        setErrors(data, watch, setError);

        if (data.error) {
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
          });
        }
      }
    }
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
            Address {address.id && "Line"} {index + 1}
          </Typography>
          <IconButton className={styles["delete-btn"]}>
            <Delete onClick={() => onDelete(index, address.id)} />
          </IconButton>
        </AccordionSummary>
        {action === "update" && address.id && (
          <AccordionDetails>{`${address.address}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}</AccordionDetails>
        )}

        {!address.id && (
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
                  options={states}
                  label="State"
                  name="state"
                  placeholder="State"
                  rules={{
                    required: "State  is required.",
                  }}
                  setValue={setStateValue}
                  value={stateValue}
                />
              </div>
              <div className="col-lg-4">
                <SearchSelect
                  control={control}
                  options={cities}
                  label="City"
                  name="city"
                  placeholder="City"
                  rules={{
                    required: "City  is required.",
                  }}
                  handleInputChange={handleCityInputChange}
                  setValue={setCityValue}
                  value={cityValue}
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
                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="submit"
                    className={cn("btn", "button", styles["custom-btn"])}
                    onClick={handleSubmit((data) => submitForm(data, index))}
                  >
                    Save Address
                  </button>
                )}
              </div>
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </form>
  );
};
