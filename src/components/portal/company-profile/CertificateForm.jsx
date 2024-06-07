import React, { useEffect, useState } from "react";
import styles from "./CertificateForm.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";

const CertificateForm = () => {
  const [certificates, setCertificates] = useState([]);
  const [preview, setPreview] = useState(null);
  const { control, handleSubmit, register, watch } = useForm();

  const certificate = watch("certificate");
  useEffect(() => {
    // Update previews on file change
    if (typeof certificate === "object" && certificate?.length > 0) {
      setPreview(URL.createObjectURL(certificate[0]));
    }
  }, [certificate]);

  const removeImage = (index) => {
    console.log(index);
  };

  const submitForm = (data) => {
    console.log(data);
  };

  

  return (
    <>
      <div className={styles["certificate-section"]}>
        <h4>Certificates</h4>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="row d-flex align-items-center my-4">
          <div className="col-lg-6">
            <CustomSelect
              control={control}
              name="certificate-type"
              placeholder="Certificate Type"
              options={[]}
              label="Certificate Type"
              multiple={false}
              rules={{
                required: "Certificate type is required",
              }}
            />
          </div>
          <div className={cn("col-lg-4", styles["img-btn"])}>
            {preview ? (
              <div className={styles["img-box"]}>
                <img
                  src={preview}
                  className={styles["logo-img"]}
                  alt="certificate-preview"
                />
              </div>
            ) : (
              <label>
                <input
                  {...register("certificate")}
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  placeholder="logo"
                />
                <span>+ ADD Certificate</span>
              </label>
            )}
          </div>
          <div className="col-lg-2">
            <button className="btn button mt-4" type="submit">
              Upload
            </button>
          </div>
        </div>
      </form>

      <ImageList cols={5} gap={10} rowHeight={164} sx={{ overflowY: "unset" }}>
        {certificates.map((item, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${item.preview}?w=164&h=164&fit=contain&auto=format&dpr=2 2x`}
              src={item.preview}
              alt={`Certificate ${index + 1}`}
              loading="lazy"
            />
            <Button
              onClick={() => removeImage(index)}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Cancel sx={{ color: "var(--gray)" }} />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default CertificateForm;
