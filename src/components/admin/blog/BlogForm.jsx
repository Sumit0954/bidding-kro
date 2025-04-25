import React, { useContext, useEffect, useState } from "react";
import styles from "./BlogForm.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import DummyLogo from "../../../assets/images/portal/company-profile/dummy-img.jpg";
import { useForm } from "react-hook-form";
import cn from "classnames";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { Breadcrumbs, Dialog, Typography } from "@mui/material";
import { CloudUpload, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const BlogForm = () => {
  const {
    register,
    watch,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [blogDetail, setBlogDetail] = useState({});
  const [coverImage, setCoverImage] = useState(DummyLogo);
  const [bannerImage, setBannerImage] = useState(DummyLogo);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const { blog_id, action } = useParams();
  const { setAlert } = useContext(AlertContext);
  const [screenLoader, setScreenLoader] = useState(true);
  const all = watch();
  const { cover_image, banner_image } = all;

  useEffect(() => {
    // Update previews on file change
    if (typeof cover_image === "object" && cover_image?.length > 0) {
      setCoverImage(URL.createObjectURL(cover_image[0]));
    } else if (typeof banner_image === "object" && banner_image?.length > 0) {
      setBannerImage(URL.createObjectURL(banner_image[0]));
    }
  }, [cover_image, banner_image]);

  const fetchBlogDetails = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${AdminApiUrls.RETRIEVE_BLOG}${blog_id}/`,
        "",
        true
      );
      if (response.status === 200) {
        const blogData = response.data;
        setBlogDetail(blogData); // Set the fetched blog details

        // Prefill form data once the details are fetched
        setValue("title", blogData.title);
        setValue("slug", blogData.slug);
        setValue("description", blogData.description);
        setValue("meta_title", blogData.meta_title);
        setValue("meta_keywords", blogData.meta_keywords);
        setValue("meta_description", blogData.meta_description);

        setCoverImage(blogData.cover_image || DummyLogo);
        setBannerImage(blogData.banner_image || DummyLogo);
        setScreenLoader(false);
      }
    } catch (error) {
      set;
    }
  };

  useEffect(() => {
    if (blog_id) {
      fetchBlogDetails();
    } else {
      setScreenLoader(false);
    }
  }, [blog_id]);

  useEffect(() => {
    // Update preview image state if input type="file" (image Blob) was set previously
    const cover_image = getValues("cover_image");
    if (cover_image) {
      if (typeof cover_image === "object" && cover_image?.length > 0) {
        setCoverImage(URL.createObjectURL(cover_image[0]));
      }
    }

    const banner_image = getValues("banner_image");
    if (banner_image) {
      if (typeof value === "object" && banner_image?.length > 0) {
        setBannerImage(URL.createObjectURL(banner_image[0]));
      }
    }
  }, [getValues, setValue]);

  const submitForm = async (data) => {
    setButtonLoader(true);

    if (action === "create") {
      const createBlogData = new FormData();

      createBlogData.append("title", data.title);
      createBlogData.append("slug", data.slug);
      if (data.banner_image && data.banner_image[0]) {
        createBlogData.append("banner_image", data.banner_image[0]);
      }
      if (data.cover_image && data.cover_image[0]) {
        createBlogData.append("cover_image", data.cover_image[0]);
      }
      createBlogData.append(
        "description",
        data.description.replace(/<p>|<\/p>/g, "")
      );
      createBlogData.append("meta_title", data.meta_title || "");
      createBlogData.append("meta_keywords", data.meta_keywords || "");
      createBlogData.append("meta_description", data.meta_description || "");

      try {
        const response = await _sendAPIRequest(
          "POST",
          AdminApiUrls.CREATE_BLOG,
          createBlogData,
          true
        );

        if (response.status === 201) {
          setButtonLoader(false);
          setAlert({
            isVisible: true,
            message: "Blog has been Uploaded successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setAlert({
          isVisible: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
    }
    if (action === "update") {
      const updateBlogData = new FormData();

      updateBlogData.append("title", data.title);
      updateBlogData.append("slug", data.slug);
      if (data.banner_image && data.banner_image[0]) {
        updateBlogData.append(
          "banner_image",
          data.banner_image[0] || bannerImage
        );
      }
      if (data.cover_image && data.cover_image[0]) {
        updateBlogData.append("cover_image", data.cover_image[0] || coverImage);
      }
      updateBlogData.append(
        "description",
        data.description.replace(/<p>|<\/p>/g, "")
      );
      updateBlogData.append("meta_title", data.meta_title || "");
      updateBlogData.append("meta_keywords", data.meta_keywords || "");
      updateBlogData.append("meta_description", data.meta_description || "");

      try {
        const response = await _sendAPIRequest(
          "PATCH",
          `${AdminApiUrls.UPDATE_BLOG}${blog_id}/`,
          updateBlogData,
          true
        );

        if (response) {
          setButtonLoader(false);
          setAlert({
            isVisible: true,
            message: "Blog has been updated successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setAlert({
          isVisible: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/admin/blogs"
      style={{ textDecoration: "none" }}
    >
      Home
    </NavLink>,

    <Typography key="2" color="text.primary">
      {blogDetail?.title}
    </Typography>,
  ];

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row mb-5">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Blog Name"
                      name="title"
                      placeholder="Blog Name"
                      rules={{
                        required: "Blog Name is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Blog Slug"
                      name="slug"
                      placeholder="Blog Slug"
                      rules={{
                        required: "Blog Slug is required.",
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-5">
                  <div
                    className={cn("col-lg-12", styles["image-section"])}
                    style={{ width: "100%" }}
                  >
                    {/* Label aligned to left */}
                    <label className="text-start w-100">Banner Image</label>

                    {/* Image Container */}
                    <div className={styles["img-container"]}>
                      <div className={styles["img-box"]}>
                        <img
                          src={bannerImage}
                          className={styles["banner-img"]}
                          name="banner_image"
                          alt="banner-img"
                          onClick={() => handleImageClick(bannerImage)}
                        />
                      </div>

                      {/* Button aligned to bottom right */}
                      <div
                        className="d-flex justify-content-start mt-3"
                        style={{ width: "100%" }}
                      >
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                          sx={{
                            width: "15rem",
                            backgroundColor: "var(--primary-color)",
                            "&:hover": {
                              backgroundColor: "var(--secondary-color)",
                            },
                          }}
                        >
                          Choose Banner Image
                          <input
                            {...register("banner_image", {
                              required: "Banner image is required",
                              validate: (files) =>
                                files.length > 0 || "Please select an image",
                            })}
                            type="file"
                            accept=".jpeg, .jpg, .png"
                            className="visually-hidden-input"
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Error Message */}
                    {errors.banner_image && (
                      <span className="error">
                        {errors?.banner_image?.message || "Error"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 d-flex flex-column">
                    <label className="mb-2 ">Cover Image</label>
                    <img
                      src={coverImage}
                      alt="Cover Image"
                      className={cn("w-100", styles["cover-image"])}
                      onClick={() => handleImageClick(coverImage)}
                    />
                  </div>
                </div>
                <div className="row mb-5">
                  {/* Button aligned to bottom right */}
                  <div
                    className="d-flex justify-content-start mt-3"
                    style={{ width: "100%" }}
                  >
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                      sx={{
                        width: "15rem",
                        backgroundColor: "var(--primary-color)",
                        "&:hover": {
                          backgroundColor: "var(--secondary-color)",
                        },
                      }}
                    >
                      Choose Cover Image
                      <input
                        {...register("cover_image", {
                          required: "Cover image is required",
                        })}
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        className="visually-hidden-input"
                      />
                    </Button>
                  </div>
                </div>
                {/* Blog Description in a new row with full width */}
                <div className="row mt-3">
                  <div className="col-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Blog Description"
                      rules={{
                        required: "Blog description is required",
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-4">
                    <CustomInput
                      control={control}
                      label="Meta Title"
                      name="meta_title"
                      rules={{
                        required: "Meta Title is required.",
                      }}
                    />
                  </div>
                  <div className="col-lg-8">
                    <CustomInput
                      control={control}
                      label="Meta Keyword"
                      name="meta_keywords"
                      rules={{
                        required: "Meta Keyword is required.",
                      }}
                    />
                  </div>
                </div>

                {/* Meta Description in a new row with full width */}
                <div className="row">
                  <div className="col-12">
                    <CustomInput
                      control={control}
                      label="Meta Description"
                      name="meta_description"
                      rules={{
                        required: "Meta Description is required.",
                      }}
                    />
                  </div>
                </div>
                {/* Button aligned to the right */}
                <div className="col-lg-4 offset-lg-8 mt-2">
                  {buttonLoader ? (
                    <>
                      <ButtonLoader size={60} />
                    </>
                  ) : (
                    <>
                      <button
                        className={cn(
                          "btn btn-primary w-100",
                          styles["blog-btn"]
                        )}
                      >
                        <Upload className={styles["uploadIcon"]} /> UPLOAD
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Image Preview Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth={selectedImage === bannerImage ? "lg" : "md"} // You can also use "lg" or "xl" for larger sizes
        fullWidth
      >
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Dialog>
    </>
  );
};

export default BlogForm;
