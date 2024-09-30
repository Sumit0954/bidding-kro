import styles from "./BidProduct.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { getProductUnits } from "../../../helpers/common";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";

const BidProducts = () => {
  const { control, handleSubmit, setError, setValue, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // id is bid_id
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const MAX_PRODUCTS = 5;
  const location = useLocation();
  console.log(location.state, "location.state");
  const [addFormOpen, setAddFormOpen] = useState(false); // To track if add product form is open
  const [productList, setProductList] = useState([]); // For fetched products
  const [expanded, setExpanded] = useState(null); // Track which form is open

  const { productData } = location.state || {};
  console.log(productData, "productData");
  // Fetch products list on component load

  useEffect(() => {
    fetchProductList();
  }, []);

  // Function to fetch product list
  const fetchProductList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.BID_PRODUCTS_LIST}${id}/`,
        null,
        true
      );
      if (response?.status === 200) {
        setProductList(response.data);
        response.data.forEach((product, index) => prefillForm(product, index));
      }
    } catch (error) {
      console.log("Error fetching product list", error);
    }
  };

  const prefillForm = (product, index) => {
    setValue(`product_title${index}`, product.title);
    setValue(`product_quantity${index}`, product.quantity);
    setValue(`product_unit${index}`, product.unit);
    setValue(`reserved_price${index}`, product.reserved_price);
    setValue(`Product_specification${index}`, product.specification);
  };

  // Handle form submission for adding a product
  const submitForm = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.product_title);
    formData.append("quantity", data.product_quantity);
    formData.append("unit", data.product_unit);
    formData.append("reserved_price", data.reserved_price);
    formData.append(
      "specification",
      data.Product_specification || "No specification provided."
    );

    try {
      const response = await _sendAPIRequest(
        "POST",
        `${PortalApiUrls.BID_ADD_PRODUCT}${id}/`,
        formData,
        true
      );

      if (response?.status === 200 || response?.status === 201) {
        // Successfully added product, now fetch the updated list
        fetchProductList();
        reset(); // Reset form after submission
        setAddFormOpen(false); // Close the form after submission
      }
    } catch (error) {
      const { data } = error.response;
      if (data) {
        setErrors(data, setValue, setError);
        setAlert({
          isVisible: true,
          message: data.error || "Failed to add product.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle editing product
  const editProduct = async (data, product_id, index) => {
    setLoading(true);
    console.log("Form Data : ", data);
    console.log("index : ", index);

    const formData = new FormData();
    formData.append("title", data[`product_title${index}`]);
    formData.append("quantity", data[`product_quantity${index}`]);
    formData.append("unit", data[`product_unit${index}`]);
    formData.append("reserved_price", data[`reserved_price${index}`]);
    formData.append("specification", data[`Product_specification${index}`]);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await _sendAPIRequest(
        "PATCH",
        `${PortalApiUrls.BID_EDIT_PRODUCT}${product_id}/${id}/`,
        formData,
        true
      );
      if (response?.status === 200) {
        fetchProductList(); // Refetch list after edit
        console.log("product Updated successfully");
      }
    } catch (error) {
      console.log("Error editing product", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting product
  const deleteProduct = async (product_id) => {
    try {
      const response = await _sendAPIRequest(
        "DELETE",
        `${PortalApiUrls.BID_DELETE_PRODUCT}${product_id}/${id}/`,
        null,
        true
      );
      if (response?.status === 204) {
        fetchProductList(); // Refetch list after delete
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    productId: null,
  });

  const handleDeleteConfirmation = async (choice) => {
    if (choice && deleteDetails.productId) {
      // If the user confirms, call the delete function with the stored productId
      await deleteProduct(deleteDetails.productId);
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        productId: null,
      });
    } else {
      // If the user cancels, just close the dialog
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        productId: null,
      });
    }
  };

  const openDeleteDialog = (productId) => {
    setDeleteDetails({
      open: true,
      title: "Delete Product",
      message:
        "Are you sure you want to delete this product? This action cannot be undone.",
      productId, // Store the productId in state
    });
  };

  const transformedProductData = productData.map((product) => ({
    lable: product.name, // use 'lable' instead of 'label'
    value: product.name, // keep 'value' as expected
  }));

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={styles["bid-form-section"]}>
              <h4>Products ({productList.length})</h4>
              <button
                type="button"
                style={{ marginBottom: "5px" }}
                className={cn(
                  "btn",
                  "button",
                  productList.length >= MAX_PRODUCTS ? "disable" : ""
                )}
                onClick={() => setAddFormOpen(true)}
                disabled={productList.length >= MAX_PRODUCTS}
              >
                + Add Product
              </button>
            </div>

            {/* List of existing products */}
            {productList.length > 0 && (
              <div>
                <h5>Existing Products</h5>
                {productList.map((item, index) => (
                  <Accordion
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Form with pre-filled data */}
                      <form
                        onSubmit={handleSubmit((data) =>
                          editProduct(data, item.id, index)
                        )}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <CustomSelect
                              control={control}
                              label="Product Title"
                              options={transformedProductData}
                              name={`product_title${index}`}
                              placeholder="Product Title"
                              rules={{
                                required: "Product Title is required.",
                              }}
                            />
                            {/* <CustomInput
                              control={control}
                              label="Product Title"
                              name={`product_title${index}`}
                              placeholder="Product Title"
                              rules={{ required: "Product Title is required." }}
                            /> */}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <CustomInput
                              control={control}
                              label="Product Quantity"
                              name={`product_quantity${index}`}
                              placeholder="Product Quantity"
                              rules={{
                                required: "Product Quantity is required.",
                              }}
                            />
                          </div>
                          <div className="col-lg-4">
                            <CustomSelect
                              control={control}
                              label="Unit"
                              name={`product_unit${index}`}
                              options={getProductUnits()}
                              placeholder="Unit"
                              rules={{ required: "Unit is required." }}
                            />
                          </div>
                          <div className="col-lg-4">
                            <CustomInput
                              control={control}
                              label="Reserve Bid Price"
                              name={`reserved_price${index}`}
                              placeholder="₹ 20,000"
                              rules={{
                                required: "Reserve Bid Price is required.",
                              }}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <CustomCkEditor
                              control={control}
                              name={`Product_specification${index}`}
                              label="Product Specification"
                            />
                          </div>
                        </div>

                        <div className="my-3">
                          {loading ? (
                            <ButtonLoader size={60} />
                          ) : (
                            <>
                              <button
                                type="submit"
                                className="btn btn-primary me-2"
                              >
                                Save Changes
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                // onClick={() => deleteProduct(item.id)}
                                onClick={() => openDeleteDialog(item.id)}
                              >
                                Delete Product
                              </button>
                            </>
                          )}
                        </div>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                ))}

                {deleteDetails?.open && (
                  <DeleteDialog
                    title={deleteDetails.title}
                    message={deleteDetails.message}
                    handleClick={handleDeleteConfirmation}
                  />
                )}
              </div>
            )}

            <Divider />

            {/* Add Product Form */}
            {addFormOpen && (
              <Accordion expanded={addFormOpen}>
                <AccordionSummary>
                  <Typography>Add New Product</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <CustomSelect
                          control={control}
                          label="Product Title"
                          options={transformedProductData}
                          name="product_title"
                          placeholder="Product Title"
                          rules={{
                            required: "Product Title is required.",
                          }}
                        />
                        {/* <CustomInput
                          control={control}
                          label="Product title"
                          name="product_title"
                          placeholder="Product Title"
                          inputType="text"
                          rules={{ required: "Product Title is required." }}
                        /> */}
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
                          rules={{ required: "Product Quantity is required." }}
                        />
                      </div>
                      <div className="col-lg-4">
                        <CustomSelect
                          control={control}
                          label="Unit"
                          name="product_unit"
                          options={getProductUnits()}
                          placeholder="Unit"
                          rules={{ required: "Unit is required." }}
                        />
                      </div>
                      <div className="col-lg-4">
                        <CustomInput
                          control={control}
                          label="Reserve Bid Price"
                          name="reserved_price"
                          placeholder="₹ 20,000"
                          rules={{
                            required: "Reserve Bid Price is required.",
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
                        <button type="submit" className={cn("btn", "button")}>
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                </AccordionDetails>
              </Accordion>
            )}

            <div className={cn("my-3", styles["btn-container"])}>
              <button
                type="button"
                className={cn("btn", "button")}
                // disabled={bidStatus === "cancelled" ? true : false}
                onClick={() => navigate(`/portal/bids/:action/${id}`)}
              >
                Back
              </button>
              {submitLoader ? (
                <ButtonLoader size={60} />
              ) : (
                <button
                  type="submit"
                  className={cn("btn", "button")}
                  // disabled={bidStatus === "cancelled" ? true : false}
                  onClick={() => {
                    setSubmitLoader(true);
                    navigate(`/portal/bids/create/deatils/${id}`);
                  }}
                >
                  {/* {id ? "Update Bid" : "Create Bid"} */}
                  Save & Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BidProducts;
