import React, { useEffect, useState } from "react";
import styles from "./BlogCreateUpdate.module.scss";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import DummyLogo from "../../../assets/images/portal/company-profile/dummy-img.jpg";
import { useForm } from "react-hook-form";
import cn from "classnames";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { Breadcrumbs, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const BlogCreateUpdate = () => {
  const { control, handleSubmit } = useForm();
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
      Blog Management
    </Typography>,
  ];

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const [coverImage, setCoverImage] = useState(DummyLogo);
  const [bannerImage, setBannerImage] = useState(DummyLogo);

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
  }, [getValues]);

  const submitForm = (data) => {
    console.log(data);
  };

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
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label="Blog Name"
                      name="blog_name"
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
                      name="blog_slug"
                      placeholder="Blog Slug"
                      rules={{
                        required: "Blog Slug is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className={cn("col-lg-6", styles["image-section"])}>
                    <label>Cover Image</label>
                    <div className={styles["img-container"]}>
                      <div className={styles["img-box"]}>
                        <img
                          src={coverImage}
                          className={styles["logo-img"]}
                          alt="cover-img"
                        />
                      </div>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        sx={{
                          width: "12.5rem",
                          marginLeft: "10px",
                          backgroundColor: "var(--primary-color)",
                          "&:hover": {
                            backgroundColor: "var(--secondary-color)",
                          },
                        }}
                      >
                        Browse
                        <input
                          {...register("cover_image")}
                          type="file"
                          accept=".jpeg, .jpg, .png"
                          className="visually-hidden-input"
                        />
                      </Button>
                      {errors.Logo && (
                        <span className="error">
                          {errors?.Logo?.message || "Error"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={cn("col-lg-6", styles["image-section"])}>
                    <label>Banner Image</label>
                    <div className={styles["img-container"]}>
                      <div className={styles["img-box"]}>
                        <img
                          src={bannerImage}
                          className={styles["logo-img"]}
                          alt="banner-img"
                        />
                      </div>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        sx={{
                          width: "12.5rem",
                          marginLeft: "10px",
                          backgroundColor: "var(--primary-color)",
                          "&:hover": {
                            backgroundColor: "var(--secondary-color)",
                          },
                        }}
                      >
                        Browse
                        <input
                          {...register("banner_image")}
                          type="file"
                          accept=".jpeg, .jpg, .png"
                          className="visually-hidden-input"
                        />
                      </Button>
                      {errors.Logo && (
                        <span className="error">
                          {errors?.Logo?.message || "Error"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomCkEditor
                      control={control}
                      name="description"
                      label="Description"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Meta Title"
                      name="meta-title"
                      rules={{
                        required: "Meta Title is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Meta Kyeword"
                      name="meta-kyeword"
                      rules={{
                        required: "Meta Kyeword is required.",
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label="Meta Description"
                      name="meta-description"
                      rules={{
                        required: "Meta Description is required.",
                      }}
                    />
                  </div>
                </div>

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    type="submit"
                    className={cn("btn", "button", styles["custom-btn"])}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCreateUpdate;
