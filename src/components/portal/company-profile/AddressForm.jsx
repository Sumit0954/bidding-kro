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
  Box,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { modifiedData } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";

const AddressForm = ({ addresses }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);

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
    if (address_id) {
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
        if (error.status === 403) {
          setAlert({
            isVisible: true,
            message: error.response.data.detail,
            severity: "error",
          });
        }
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
    } else {
      remove(index);
      setFormCount(formCount - 1);
    }
  };

  return (
    <>
      <div className={styles["address-section"]}>
        <h4 className="mb-0">Addresses ({formCount})</h4>
        <div className={styles["btn-container"]}>
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
      </div>

      {fields.map((item, index) => (
        <IndividualAddressForm
          key={item._id}
          index={index}
          address={item}
          onDelete={handleDeleteAddress}
          defaultAddress={defaultAddress}
          setDefaultAddress={setDefaultAddress}
          fields={fields}
          formCount={formCount}
          setFormCount={setFormCount}
          append={append}
          remove={remove}
        />
      ))}
    </>
  );
};

export default AddressForm;

const IndividualAddressForm = ({
  address,
  index,
  onDelete,
  defaultAddress,
  setDefaultAddress,
  fields,
  formCount,
  setFormCount,
  append,
  remove,
}) => {
  const { control, handleSubmit, setError, watch } = useForm({
    defaultValues: {
      address: address,
    },
  });
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    index: null,
    address_id: null,
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
    const params = { country: 101, ordering: "name" };
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
  const isBillingAddressAvailable = fields.some((address) => {
    return address?.id && address?.is_billing_address;
  });

  const submitAddressForm = async (data, checked) => {
    try {
      let formData = new FormData();

      if (data) {
        formData.append("address", data.street);
        formData.append("state", data.state.lable);
        formData.append("city", data.city.lable);
        formData.append("pincode", data.pincode);
        formData.append("latitude", geoLocation.latitude);
        formData.append("longitude", geoLocation.longitude);
        formData.append("json_id", geoLocation.json_id);
        if (checked) formData.append("is_billing_address", true);

        try {
          const response = await _sendAPIRequest(
            "POST",
            PortalApiUrls.CREATE_ADDRESS,
            formData,
            true
          );
          if (response.status === 201) {
            append(response?.data);
            remove(index);
            setFormCount(formCount - 1);
            setLoading(false);
            setDefaultAddress(null);
          }
        } catch (error) {
          setLoading(false);
          const { data } = error.response;
          if (error.status === 403) {
            setAlert({
              isVisible: true,
              message: error.response.data.detail,
              severity: "error",
            });
          }
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
          setDefaultAddress(null);
        }
      }
    } catch (error) {}
  };

  const submitForm = async (data) => {
    setLoading(true);

    if (defaultAddress !== null) {
      if (isBillingAddressAvailable) {
        setAlert({
          isVisible: true,
          message: "You had already selected deafult address",
          severity: "error",
        });
        setLoading(false);
      } else {
        submitAddressForm(data, true);
      }
    } else {
      submitAddressForm(data);
    }
  };

  const handleDeleteAddress = (choice) => {
    if (choice) {
      onDelete(deleteDetails?.index, deleteDetails?.address_id);
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        index: null,
        address_id: null,
      });
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        index: null,
        address_id: null,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit((data) => submitForm(data, index))}>
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["address-accordion"]}`,
          }}
        >
          <AccordionSummary className={styles["custom-accordion-summary"]}>
            <div className={styles["accordion-header-container"]}>
              <Typography classes={{ root: "custom-accordion-heading" }}>
                Address
                {address?.is_billing_address && (
                  <Box component="span" sx={{ ml: 1 }}>
                    <Chip
                      label="Billing Address"
                      size="small"
                      className={styles["billing-badge"]}
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        height: "20px",
                        borderRadius: "10px",
                        padding: "0 6px",
                        color: "white",
                        bgcolor: "",
                      }}
                    />
                  </Box>
                )}
              </Typography>
              <IconButton
                className={styles["delete-btn"]}
                onClick={() =>
                  setDeleteDetails({
                    open: true,
                    title: "Delete Address Confirmation",
                    message: "Are you sure you want to delete this address",
                    index: index,
                    address_id: address.id,
                  })
                }
              >
                <Delete />
              </IconButton>
            </div>
          </AccordionSummary>

          {address.id && (
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
              {!isBillingAddressAvailable && (
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="defaultAddress"
                        value={defaultAddress}
                        id={`default-radio-${defaultAddress}`}
                        checked={defaultAddress === index}
                        onChange={() => setDefaultAddress(index)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`default-radio-${index}`}
                      >
                        Set as billing address
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mt-2">
                <div className="col text-center">
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
      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleDeleteAddress}
        />
      )}
    </>
  );
};
