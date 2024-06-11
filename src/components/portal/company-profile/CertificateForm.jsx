import React, { useContext, useEffect, useState } from "react";
import styles from "./CertificateForm.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { Cancel, CloudUpload } from "@mui/icons-material";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { modifiedData } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const CertificateForm = ({ certificates }) => {
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [preview, setPreview] = useState(null);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const certificate = watch("file");
  useEffect(() => {
    // Update previews on file change
    if (typeof certificate === "object" && certificate?.length > 0) {
      setPreview(URL.createObjectURL(certificate[0]));
    }
  }, [certificate]);

  const getCertificateTypes = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CERTIFICATE_TYPE,
        "",
        true
      );
      if (response.status === 200) {
        const data = modifiedData(response.data);
        setCertificateTypes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCertificateTypes();
  }, []);

  const handleDeleteCertificate = async (certificate_id) => {
    try {
      const data = { certificate_id: certificate_id };
      const response = await _sendAPIRequest(
        "DELETE",
        PortalApiUrls.DELETE_CERTIFICATE,
        data,
        true
      );
      if (response.status === 204) {
        setAlert({
          isVisible: true,
          message: `Certificate has been deleted.`,
          severity: "success",
        });
        window.location.reload();
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
  };

  const submitForm = async (data) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file", data.file[0], data.file[0].name);
    formData.append("type", data.type);

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.CREATE_CERTIFICATE,
        formData,
        true
      );
      if (response.status === 201) {
        window.location.reload();
        setLoading(false);
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
              name="type"
              placeholder="Certificate Type"
              options={certificateTypes}
              label="Certificate Type"
              multiple={false}
              rules={{
                required: "Certificate type is required.",
              }}
            />
          </div>
          <div className={cn("col-lg-4", styles["img-btn"])}>
            {preview ? (
              <>
                <div className={styles["img-box"]}>
                  <img
                    src={preview}
                    className={styles["logo-img"]}
                    alt="certificate-preview"
                  />
                  <Button
                    onClick={() => setPreview(null)}
                    sx={{
                      position: "absolute",
                      right: 300,
                      zIndex: 1,
                    }}
                  >
                    <Cancel sx={{ color: "var(--gray)" }} />
                  </Button>
                </div>
              </>
            ) : (
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
                className="mt-4"
              >
                Upload Certificate
                <input
                  {...register("file", {
                    required: "Certificate file is required.",
                  })}
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  className="visually-hidden-input"
                />
              </Button>
            )}
            {errors.file && (
              <span className="error d-flex justify-content-center mt-1">
                {errors?.file?.message || "Error"}
              </span>
            )}
          </div>

          <div className="col-lg-2">
            {loading ? (
              <ButtonLoader size={60} />
            ) : (
              <button
                className={`btn button ${!errors.file ? "mt-4" : "mb-2"}`}
                type="submit"
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </form>

      <ImageList cols={5} gap={10} sx={{ overflowY: "unset" }}>
        {certificates?.map((item, index) => (
          <>
            <ImageListItem key={index}>
              <img
                srcSet={`${item.file}?w=164&h=164&fit=contain&auto=format&dpr=2 2x`}
                src={item.file}
                alt={`Certificate ${index + 1}`}
                loading="lazy"
              />
              <Button
                onClick={() => handleDeleteCertificate(item.id)}
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
          </>
        ))}
      </ImageList>
    </>
  );
};

export default CertificateForm;
