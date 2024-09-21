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
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedAncestors, setSelectedAncestors] = useState([]);
  const [currentDepth, setCurrentDepth] = useState(0);

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
    if (depth === 0) {
      setSelectedIndustry(selectedCategory.id);
      setSelectedCategories({});

      setCategories((prevCategories) => {
        let newCategories = { 0: prevCategories[0] };
        return newCategories;
      });
    }

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
    console.log(data, "gogo");

    let formData = [];
    let productData = [];

    if (data) {
      // Use a Set to track unique category entries
      const uniqueCategories = new Set();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (isArray(value)) {
            value.forEach((category) => {
              // Create a unique key for each category based on id and depth
              const uniqueKey = `${category.id}-${category.depth}`;

              if (!uniqueCategories.has(uniqueKey)) {
                uniqueCategories.add(uniqueKey);
                formData.push({ category: category.id, depth: category.depth });
              }
            });
          } else {
            const uniqueKey = `${value.id}-${value.depth}`;

            if (!uniqueCategories.has(uniqueKey)) {
              uniqueCategories.add(uniqueKey);
              formData.push({ category: value.id, depth: value.depth });
            }
          }
        }
      });

      if (isArray(data.product)) {
        productData = data.product.map((product) => ({
          id: product.id,
          name: product.name,
          depth: product.depth,
        }));
      }

      // Now that we have filtered duplicates, log and proceed
      setLoading(false);
      setAlert({
        isVisible: true,
        message: `Category has been ${
          id ? "updated" : "submitted"
        } successfully.`,
        severity: "success",
      });

      if (id) {
        navigate(`/portal/bids/update/${id}`, {
          state: { formData, productData },
        });
      } else {
        navigate("/portal/bids/create", { state: { formData, productData } });
      }
    }
  };

  // const submitForm = async (data) => {
  //   setLoading(true);
  //   console.log(data, "gogo");
  //   /* Build FormData */
  //   let formData = [];
  //   if (data) {

  //     const uniqueCategories = new Set();

  //     Object.entries(data).map((item) => {
  //       const [, value] = item;

  //       if (value !== undefined) {
  //         if (isArray(value)) {
  //           value?.map((category) =>
  //             formData.push({ category: category.id, depth: category.depth })
  //           );
  //         } else {
  //           formData.push({ category: value.id, depth: value.depth });
  //         }

  //         setLoading(false);
  //         setAlert({
  //           isVisible: true,
  //           message: "Category has been updated successfully.",
  //           severity: "success",
  //         });
  //         console.log(formData, "formDataformData");
  //         // navigate(`/portal/bids/create`);
  //         navigate("/portal/bids/create", { state: { formData } });
  //         //////
  //       }

  //       return null;
  //     });
  //   }
  //   /* -- */

  //   // try {
  //   //   const response = await _sendAPIRequest(
  //   //     "PUT",
  //   //     PortalApiUrls.UPDATE_BID_CATEGORIES + `${id}/`,
  //   //     formData,
  //   //     true
  //   //   );
  //   //   if (response.status === 200) {
  //   //     setLoading(false);
  //   //     setAlert({
  //   //       isVisible: true,
  //   //       message: "Category has been updated successfully.",
  //   //       severity: "success",
  //   //     });
  //   //     navigate(`/portal/bids/questions/${id}`);
  //   //   }
  //   // } catch (error) {
  //   //   setLoading(false);
  //   //   const { data } = error.response;
  //   //   if (data) {
  //   //     setErrors(data, watch, setError);

  //   //     if (data.error) {
  //   //       setAlert({
  //   //         isVisible: true,
  //   //         message: data.error,
  //   //         severity: "error",
  //   //       });
  //   //     }
  //   //   }
  //   // }
  // };

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
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

  const handleOptionChange = (ancestors) => {
    console.log(ancestors, "ancestorsancestors");
    setSelectedAncestors(ancestors);
    setCurrentDepth(0);
  };

  useEffect(() => {
    if (
      selectedAncestors.length > 0 &&
      currentDepth < selectedAncestors.length
    ) {
      setSelectedCategories((prevSelectedCategories) => {
        let newSelectedCategories = { ...prevSelectedCategories };
        let resetOjb = {};

        // Iterate over selectedAncestors and match each with the category at the same depth level
        selectedAncestors.forEach((ancestor) => {
          let matchingCategory = categories[ancestor.depth]?.find(
            (category) => category.name === ancestor.name
          );

          // If a matching category is found, update selectedCategories
          if (matchingCategory) {
            let name = getCategoryLevel()[ancestor.depth].name;
            setCurrentDepth(ancestor.depth);
            if (ancestor.depth > 0) {
              if (newSelectedCategories[ancestor.depth]) {
                newSelectedCategories[ancestor.depth].push({
                  name: matchingCategory.name,
                  depth: matchingCategory.depth,
                  id: matchingCategory.id,
                });
              } else {
                newSelectedCategories[ancestor.depth] = [
                  {
                    name: matchingCategory.name,
                    depth: matchingCategory.depth,
                    id: matchingCategory.id,
                  },
                ];
              }
              resetOjb[name] = newSelectedCategories[ancestor.depth];
            } else {
              newSelectedCategories[ancestor.depth] = {
                name: matchingCategory.name,
                depth: matchingCategory.depth,
                id: matchingCategory.id,
              };
              resetOjb[name] = newSelectedCategories[ancestor.depth];
            }

            reset(resetOjb); // Update the form state
            setCurrentDepth((prevDepth) => prevDepth + 1);
          } else {
            console.warn(
              `No matching category found for: ${ancestor.name} at depth ${ancestor.depth}`
            );
          }
        });

        return newSelectedCategories;
      });
    }
  }, [selectedAncestors, categories]);

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

                    const commonProps = {
                      control,
                      name: propsData[depth].name,
                      label: propsData[depth].label,
                      placeholder: propsData[depth].placeholder,
                      options: availableOptions,
                      rules: propsData[depth].rules && {
                        required: propsData[depth].rules,
                      },
                      multiple: parseInt(depth) === 0 ? false : true,
                      handleCategoryChange,
                      selectedCategories: selectedValues,
                      handleChange: (newValue) => {
                        handleChange(depth, newValue);
                      },
                    };

                    const searchProps =
                      categoryDepth === 1
                        ? {
                            searchEnabled: true,
                            rootCategory: selectedIndustry,
                          }
                        : {};

                    return (
                      <div className="row" key={parseInt(depth)}>
                        <div className="col-lg-12">
                          {/* <CategoriesSelect
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
                          /> */}
                          <CategoriesSelect
                            {...commonProps}
                            {...searchProps}
                            handleOptionChange={handleOptionChange}
                            categories={categories}
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
                      {id ? "Update" : "Submit"} Categories
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
