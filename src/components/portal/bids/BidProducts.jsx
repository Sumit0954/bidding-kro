import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useFieldArray, useForm } from "react-hook-form";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import DateTimeRangePicker from "../../../elements/CustomDateTimePickers/DateTimeRangePicker";
import { getMinMaxDate, getProductUnits } from "../../../helpers/common";
import { useNavigate, useParams } from "react-router-dom";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import {
  dateFormatter,
  modifiedData,
  retrieveDateFormat,
} from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import SearchSelect from "../../../elements/CustomSelect/SearchSelect";
import { dateValidator } from "../../../helpers/validation";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const BidProducts = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    setValue,
    clearErrors,
    formState: { dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { action, id } = useParams();
  const [bidType, setBidType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [searchedBids, setSearchedBids] = useState([]);
  const [titleValue, setTitleValue] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [bidStatus, setBidStatus] = useState("");
  const MAX_ADDRESS_COUNT = 5;

  const [products, setProducts] = useState([
    { title: "", quantity: "", unit: "", bid_price: "", specification: "" },
  ]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const [formCount, setFormCount] = useState(fields.length);
  const minDate = getMinMaxDate(2, 10, createdAt)[0]
    .toISOString()
    .split("T")[0];
  const maxDate = getMinMaxDate(1, 10, createdAt)[1]
    .toISOString()
    .split("T")[0];
  const { formData } = location.state || {};
  const [expanded, setExpanded] = useState("Summary");

  const handleAddProduct = () => {
    if (formCount < MAX_ADDRESS_COUNT) {
      append({
        title: "",
        quantity: "",
        unit: "",
        bid_Price: "",
        specification: "",
      });
      setFormCount(formCount + 1);
    }
  };

  const handleClose = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitForm = (data, index) => {
    setLoading(true);

    console.log("Form Data for Product", index + 1, data);

    let formData = new FormData();
    if (data) {
      formData.append("title", data.product_title);
      formData.append("quantity", data.product_quantity.label);
      formData.append("unit", data.product_unit.label);
      formData.append("bid_price", data.reserved_price.label);
      formData.append("specification", data.Product_specification.label);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={styles["bid-form-section"]}>
              <h4>Products ({formCount})</h4>
              <button
                type="button"
                className={cn(
                  "btn",
                  "button",
                  `${formCount >= MAX_ADDRESS_COUNT ? "disable" : ""}`
                )}
                disabled={bidStatus === "cancelled" ? true : false}
                style={{ marginBottom: "5px" }}
                onClick={handleAddProduct}
              >
                + Add Products
              </button>
            </div>
            <div className={cn("row", styles["form-section"])}>
              {fields.map((item, index) => {
                return (
                  <form
                    onSubmit={handleSubmit((data) => submitForm(data, index))}
                  >
                    <Accordion
                      expanded={expanded === "Summary"}
                      onChange={handleClose("Summary")}
                      square={true}
                      classes={{ root: "custom-accordion" }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          classes={{ root: "custom-accordion-heading" }}
                        >
                          Product {item.id && ""} {index + 1}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="row">
                          <div className="col-lg-12">
                            <CustomInput
                              control={control}
                              label="Product title"
                              name="product_title"
                              placeholder="Product Title"
                              inputType="text"
                              rules={{
                                required: "Product Title is required.",
                              }}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <CustomInput
                              control={control}
                              label="Product Quantity"
                              name="product_quantity"
                              placeholder="Product Quantity"
                              inputType="text"
                              rules={{
                                required: "Product Quantity is required.",
                              }}
                            />
                          </div>
                          <div className="col-lg-4">
                            <CustomSelect
                              control={control}
                              label="Unit"
                              name="product_unit"
                              options={getProductUnits()}
                              placeholder="Unit"
                              rules={{
                                required: "Unit is required.",
                              }}
                            />
                          </div>
                          <div className="col-lg-4">
                            <CustomInput
                              control={control}
                              label="Reserve Bid Price"
                              name="reserved_price"
                              placeholder="Reserve Bid Price"
                              rules={{
                                required: "ReserveBid Price is required.",
                              }}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <CustomCkEditor
                              control={control}
                              name="Product_specification"
                              label="Product Specification"
                            />
                          </div>
                        </div>

                        <div className={cn("my-3", styles["btn-container"])}>
                          {loading ? (
                            <ButtonLoader size={60} />
                          ) : (
                            <button
                              type="button"
                              className={cn("btn", "button")}
                              onClick={handleSubmit((data) =>
                                submitForm(data, index)
                              )}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </form>
                );
              })}

              <div className={cn("my-3", styles["btn-container"])}>
                {submitLoader ? (
                  <ButtonLoader size={60} />
                ) : (
                  <>
                    <button
                      type="button"
                      className={cn("btn", "button")}
                      disabled={bidStatus === "cancelled" ? true : false}
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className={cn("btn", "button")}
                      disabled={bidStatus === "cancelled" ? true : false}
                      onClick={() => navigate(`/portal/bids/questions/${id}`)}
                    >
                      {/* {id ? "Update Bid" : "Create Bid"} */}
                      Save & Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidProducts;
