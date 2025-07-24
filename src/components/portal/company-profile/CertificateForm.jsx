import React, { useContext, useEffect, useState } from "react";
import styles from "./CertificateForm.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { Alert, Button, ImageList, ImageListItem } from "@mui/material";
import { Cancel, CloudUpload } from "@mui/icons-material";
import CustomSelect from "../../../elements/CustomSelect/CustomSelect";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { modifiedData } from "../../../helpers/formatter";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import QueryFormModal from "../../../elements/CustomModal/QueryFormModal";

const CertificateForm = ({ certificates, setCertificates }) => {
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
  const [showQueryForm, setShowQueryForm] = useState(false);

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
        setCertificates((prevcertificates) =>
          prevcertificates.filter(
            (certificate) => certificate?.id !== certificate_id
          )
        );
      }
    } catch (error) {
      const { data } = error.response;
      if (error.status === 403) {
        setAlert({
          isVisible: true,
          message: error.response.data.detail,
          severity: "error",
        });
      }
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
        // console.log(response, " : response");
        setCertificates((prevCertificate) => [
          ...prevCertificate,
          response?.data,
        ]);
        setLoading(false);
        setPreview(null);
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
      setPreview(null);
    }
  };

  return (
    <>
      <div className={styles["certificate-section"]}>
        <h4 className="mb-0">Certificates</h4>
      </div>

      <Alert severity="info" className="my-3">
        If you find that your business related certificate type is not in the
        list. Please{" "}
        <span
          className="query-form-button"
          onClick={() => setShowQueryForm(true)}
        >
          Click here
        </span>{" "}
        to send request to Admin.
      </Alert>

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
            />
          </div>
          {/* Flex container for the buttons */}
          <div className="col-lg-6 d-flex justify-content-end align-items-start gap-2 mt-4">
            {/* Upload Certificate button */}
            {preview ? (
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
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                className={"updload-certificate-btn"}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "15rem",
                  },
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                  },
                  padding: {
                    xs: "0.5rem 1rem",
                    sm: "0.75rem 1.5rem",
                  },
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                  },
                  textAlign: "center",
                }}
              >
                Choose Certificate
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

            {preview && (
              <>
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
              </>
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

      {showQueryForm && (
        <QueryFormModal
          showQueryForm={showQueryForm}
          setShowQueryForm={setShowQueryForm}
          formHeading="Write the missing certificate type below"
          type="certificate"
        />
      )}
    </>
  );
};

export default CertificateForm;
