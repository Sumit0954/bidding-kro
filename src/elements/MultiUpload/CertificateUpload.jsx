import React, { useEffect } from "react";
import styles from "./CertificateUpload.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, ImageList, ImageListItem, Input } from "@mui/material";
import { useDropzone } from "react-dropzone";
import cn from "classnames";
import UploadIcon from "../../assets/images/portal/company-profile/upload-icon.png";
import { Cancel } from "@mui/icons-material";

const CertificateUpload = () => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      certificates: [],
    },
  });

  const onDrop = (acceptedFiles) => {
    const existingFiles = getValues("certificates") || [];
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    // You can update the form field value here
    setValue("certificates", [...existingFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
    id: "certificates",
    type: "file",
  });

  useEffect(() => {
    return () => {
      const certificates = getValues("certificates");
      if (certificates) {
        certificates.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [getValues]);

  const removeImage = (index) => {
    const currentFiles = getValues("certificates");
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setValue("certificates", updatedFiles);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Here, you can send the images to your backend or handle them as needed
  };

  return (
    <>
      <div className={styles["certificate-section"]}>
        <h4>Certificates</h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="certificates"
          render={({ field, fieldState: { error } }) => (
            <>
              <Box>
                <Box
                  className={cn("cursor", styles["img-drop-section"])}
                  {...getRootProps()}
                >
                  <label
                    htmlFor="certificates"
                    className={cn("cursor", styles["img-drop-content"])}
                  >
                    <Input
                      {...getInputProps()}
                      sx={{
                        display: "none",
                      }}
                      onChange={(e) => {
                        const existingFiles = field.value || [];
                        const newFiles = Array.from(e.target.files).map(
                          (file) =>
                            Object.assign(file, {
                              preview: URL.createObjectURL(file),
                            })
                        );
                        field.onChange([...existingFiles, ...newFiles]);
                      }}
                    />
                    <img
                      className={styles["upload-icon"]}
                      src={UploadIcon}
                      alt="UploadIcon"
                    />
                    <p>
                      Drag 'n' drop some images here, or click to select images
                    </p>
                    <button className="btn button" type="button">
                      Click To Browse
                    </button>
                  </label>
                </Box>
                {error && (
                  <span className="error">{error.message || "Error"} </span>
                )}
              </Box>

              <ImageList
                cols={5}
                gap={10}
                rowHeight={164}
                sx={{ marginTop: "20px", overflowY: "unset" }}
              >
                {field?.value?.map((item, index) => (
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
          )}
        />

        <button
          className={cn("btn", "button", styles["custom-upload-btn"])}
          type="submit"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default CertificateUpload;
