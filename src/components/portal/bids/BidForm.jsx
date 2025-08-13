import styles from "./BidForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { getBidTypes } from "../../../helpers/common";
import { useNavigate, useParams } from "react-router-dom";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { dateFormatter, retrieveDateFormat } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const BidForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    setValue,

    formState: { dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [screenLoader, setScreenLoader] = useState(true);
  const [bidStatus, setBidStatus] = useState("");
  const formData = JSON.parse(localStorage.getItem("formData"));
  const productData = JSON.parse(localStorage.getItem("productData"));

  useEffect(() => {
    if (!id && productData && productData.length > 0) {
      // If there's no `id`, concatenate all product names into a single string
      const concatenatedProductNames =
        "Bid for " + productData.map((product) => product.name).join(", ");

      // Set the 'title' field with the concatenated product names
      setValue("title", concatenatedProductNames);
      setScreenLoader(false);
    }
  }, [id, productData, setValue]);

  const updateBidCategories = async (id) => {
    const categoryIds = formData.map((item) => item.category);
    setLoading(true);
    try {
      const response1 = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.UPDATE_BID_CATEGORIES + `${id}/`,
        categoryIds,
        true
      );
      if (response1.status === 200) {
        setLoading(false);

        navigate(`/portal/bids/products/${id}`, { state: { productData } });
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
    }
  };

  const submitForm = async (data) => {
    setLoading(true);
    let updateFormData = new FormData();
    let createFormData = new FormData();

    /* Build FormData */
    if (data) {
      Object.entries(data).map((item) => {
        const [key, value] = item;

        if (action === "create") {
          if (key === "type") {
            createFormData.append(key, value);
          } else if (key === "delivery_date") {
            createFormData.append(key, dateFormatter(value));
          } else if (key === "status") {
            createFormData.append(key, "pending");
          } else {
            createFormData.append(key, value);
          }
        }

        if (action === "update") {
          if (key === "title") {
            updateFormData.append(key, value);
          }

          Object.entries(dirtyFields).forEach((k) => {
            let changedKey = k[0];
            if (key === changedKey) {
              if (key === "type") {
                updateFormData.append(key, value);
              } else if (key === "delivery_date") {
                updateFormData.append(key, dateFormatter(value));
              } else {
                updateFormData.append(key, value ? value : "");
              }
            }
          });
        }

        return null;
      });

      // if (action === "create" && formData && formData.length > 0) {
      //   const categoryArray = formData.map((categoryItem) => ({
      //     id: categoryItem.category,
      //     depth: categoryItem.depth,
      //   }));

      //   // Convert the array to a JSON string and append it to the form data
      //   createFormData.append("category", JSON.stringify(categoryArray));
      // }
    }
    /* -- */

    if (action === "create") {
      try {
        const response = await _sendAPIRequest(
          "POST",
          PortalApiUrls.CREATE_BID,
          createFormData,
          true
        );
        if (response.status === 201) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "Bid has been created successfully.",
            severity: "success",
          });

          // setBidId(response.data.id);
          updateBidCategories(response.data.id);
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
      }
    }

    if (action === "update") {
      try {
        const response = await _sendAPIRequest(
          "PATCH",
          PortalApiUrls.UPDATE_BID + `${id}/`,
          updateFormData,
          true
        );
        if (response.status === 200) {
          setLoading(false);
          setAlert({
            isVisible: true,
            message: "Bid has been updated successfully.",
            severity: "success",
          });
          updateBidCategories(id);
          // navigate(`/portal/bids/products/${id}`);
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
      }
    }
  };

  const handleFormdata = async (id) => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
        "",
        true
      );

      if (response.status === 200) {
        reset({
          type: response.data.type || "",
          title: response.data.title || "",
          description: response.data.description || "",
        });
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      handleFormdata(id);
    }
  }, [id]);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={styles["bid-form-section"]}>
              <h4>{action === "create" ? "Create" : "Update"} Bid</h4>
            </div>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomSelect
                      control={control}
                      label="Bid Type"
                      options={getBidTypes()}
                      name="type"
                      placeholder="Bid Type"
                      rules={{
                        required: "Bid Type is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Bid Title"
                      name="title"
                      placeholder="Bid Title"
                      rules={{
                        required: "Bid Title is required.",
                      }}
                      inputType="text"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Bid Description"
                      rules={{
                        required: "Description is required.",
                      }}
                    />
                  </div>
                </div>

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="button"
                    className={cn("btn", "button")}
                    disabled={bidStatus === "cancelled" ? true : false}
                    onClick={() => {
                      id
                        ? navigate(`/portal/bids/categories/${id}`)
                        : navigate(`/portal/bids/categories`);
                    }}
                  >
                    Back
                  </button>

                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button
                      type="submit"
                      className={cn("btn", "button")}
                      disabled={bidStatus === "cancelled" ? true : false}
                      // onClick={submitForm}
                    >
                      {id ? "Update Bid" : "Create Bid"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidForm;
