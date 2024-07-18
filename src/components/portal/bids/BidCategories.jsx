import React, { useContext, useEffect, useState } from "react";
import styles from "./BidCategories.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import CategoriesSelect from "../../../elements/CustomSelect/CategoriesSelect";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
// import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
import { AlertContext } from "../../../contexts/AlertProvider";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { isArray } from "lodash";
import { getCategoryLevel } from "../../../helpers/common";
import QueryFormModal from "../../../elements/CustomModal/QueryFormModal";
import { Alert } from "@mui/material";

const BidCategories = () => {
  const { control, handleSubmit, watch, setError, reset } = useForm();
  const [categories, setCategories] = useState({ 0: [] });
  const [selectedCategories, setSelectedCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [bidStatus, setBidStatus] = useState("");
  // const { companyDetails } = useContext(CompanyDetailsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showQueryForm, setShowQueryForm] = useState(false);

  const getCategories = async (parent_categories, depth) => {
    const params = new URLSearchParams();
    parent_categories.forEach((value) => {
      if (value !== undefined) {
        params.append("parent_category", value);
      }
    });

    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CATEGORIES,
        params,
        true
      );
      if (response.status === 200) {
        setCategories((prevCategories) => ({
          ...prevCategories,
          [depth]: response.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories([], 0);
  }, []);

  useEffect(() => {
    Object.entries(selectedCategories)?.forEach(([depth, categories]) => {
      let parent_categories = [];
      if (parseInt(depth) === 0) {
        parent_categories = [categories?.id];
      } else {
        parent_categories = categories.map((category) => category.id);
      }
      if (depth && parent_categories.length > 0) {
        getCategories(parent_categories, parseInt(depth) + 1);
      }
    });
  }, [selectedCategories]);

  const handleCategoryChange = (depth, selectedCategory, fieldOnChange) => {
    setSelectedCategories((prevSelectedCategories) => {
      let newSelectedCategories = { ...prevSelectedCategories };

      if (parseInt(depth) === 0) {
        newSelectedCategories[depth] = selectedCategory;
      } else {
        newSelectedCategories[depth] = [
          ...(prevSelectedCategories[depth] || []),
          selectedCategory,
        ];
      }
      fieldOnChange(newSelectedCategories[depth]);
      return newSelectedCategories;
    });
  };

  const handleChange = (depth, newValue) => {
    setSelectedCategories((prevSelectedCategories) => {
      let newSelectedCategories = { ...prevSelectedCategories };
      console.log(newSelectedCategories);

      Object.keys(newSelectedCategories).forEach((key) => {
        if (parseInt(key) > parseInt(depth)) {
          delete newSelectedCategories[key];
        }
      });

      newSelectedCategories[depth] = newValue;
      return newSelectedCategories;
    });

    setCategories((prevCategories) => {
      let newCategories = { ...prevCategories };

      Object.keys(newCategories).forEach((key) => {
        if (parseInt(key) > parseInt(depth)) {
          delete newCategories[key];
        }
      });

      return newCategories;
    });
  };

  const submitForm = async (data) => {
    setLoading(true);

    /* Build FormData */
    let formData = [];
    if (data) {
      Object.entries(data).map((item) => {
        const [, value] = item;

        if (value !== undefined) {
          if (isArray(value)) {
            value?.map((category) =>
              formData.push({ category: category.id, depth: category.depth })
            );
          } else {
            formData.push({ category: value.id, depth: value.depth });
          }
        }

        return null;
      });
    }
    /* -- */

    try {
      const response = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.UPDATE_BID_CATEGORIES + `${id}/`,
        formData,
        true
      );
      if (response.status === 200) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "Category has been updated successfully.",
          severity: "success",
        });
        navigate(`/portal/bids/questions/${id}`);
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

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidStatus(response.data.status);
            if (response?.data?.category?.length > 0) {
              setSelectedCategories((prevSelectedCategories) => {
                let newSelectedCategories = { ...prevSelectedCategories };
                let resetOjb = {};

                response?.data?.category?.forEach((category) => {
                  let name = getCategoryLevel()[category.depth].name;

                  if (category.depth > 0) {
                    if (newSelectedCategories[category.depth]) {
                      newSelectedCategories[category.depth].push(category);
                    } else {
                      newSelectedCategories[category.depth] = [category];
                    }
                    resetOjb[name] = newSelectedCategories[category.depth];
                  } else {
                    newSelectedCategories[category.depth] = category;
                    resetOjb[name] = category;
                  }

                  reset(resetOjb);
                });

                return newSelectedCategories;
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, reset]);

  return (
    <>
      <div className="container">
        <div className="row">
          <Alert severity="info" className="my-3">
            If you find that your business related category is not in the list.
            Please{" "}
            <span
              className="query-form-button"
              onClick={() => setShowQueryForm(true)}
            >
              Click here
            </span>{" "}
            to send request to Admin.
          </Alert>

          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                {Object.keys(categories).map((depth) => {
                  const categoryDepth = parseInt(depth);
                  const propsData = getCategoryLevel();

                  if (categories[depth]?.length > 0) {
                    let availableOptions = [];
                    let selectedValues = [];

                    if (categoryDepth > 0) {
                      availableOptions = categories[depth].filter(
                        (category) =>
                          !(selectedCategories[depth] || []).some(
                            (selected) => selected.id === category.id
                          )
                      );

                      selectedValues = categories[depth].filter((category) =>
                        (selectedCategories[depth] || []).some(
                          (selected) => selected.id === category.id
                        )
                      );
                    } else {
                      availableOptions = categories[depth]?.filter(
                        (category) =>
                          category.id !== selectedCategories[depth]?.id
                      );

                      selectedValues =
                        categories[depth]?.find(
                          (category) =>
                            category.id ===
                            (selectedCategories[depth]?.id || null)
                        ) || null;
                    }

                    return (
                      <div className="row" key={parseInt(depth)}>
                        <div className="col-lg-12">
                          <CategoriesSelect
                            control={control}
                            name={propsData[depth].name}
                            label={propsData[depth].label}
                            placeholder={propsData[depth].placeholder}
                            options={availableOptions}
                            rules={
                              propsData[depth].rules && {
                                required: propsData[depth].rules,
                              }
                            }
                            multiple={parseInt(depth) === 0 ? false : true}
                            handleCategoryChange={handleCategoryChange}
                            selectedCategories={selectedValues}
                            handleChange={(newValue) => {
                              handleChange(depth, newValue);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="button"
                    className={cn("btn", "button", styles["custom-btn"])}
                    onClick={() => navigate(`/portal/bids/update/${id}`)}
                  >
                    Back
                  </button>

                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button
                      type="submit"
                      className={cn("btn", "button", styles["custom-btn"])}
                      disabled={bidStatus === "cancelled" ? true : false}
                    >
                      Update Categories
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showQueryForm && (
        <QueryFormModal
          showQueryForm={showQueryForm}
          setShowQueryForm={setShowQueryForm}
          formHeading="Category Suggestion Query"
        />
      )}
    </>
  );
};

export default BidCategories;
