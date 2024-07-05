import { useContext, useEffect, useState } from "react";
import styles from "./BidDocuments.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../../assets/images/portal/bids/upload-icon.png";
import { Box, IconButton, Input, TableCell } from "@mui/material";
import cn from "classnames";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { documents_column } from "../../../elements/CustomDataTable/PortalColumnData";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { extractFileExtension } from "../../../helpers/common";

const BidDocuments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [documents, setDocuments] = useState([]);

  const { control, handleSubmit, setValue, watch, setError } = useForm({
    defaultValues: {
      document: null,
    },
  });

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileWithPreview = Object.assign(newFile, {
          preview: reader.result,
        });
        setFile(fileWithPreview);
        setValue("document", fileWithPreview);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    id: "document",
    type: "file",
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const { name, size } = data.document;

    let formData = new FormData();
    if (data) {
      formData.append("name", name);
      formData.append("type", extractFileExtension(name));
      formData.append("size", size);
      formData.append("file", data.document, name);

      try {
        const response = await _sendAPIRequest(
          "POST",
          PortalApiUrls.UPLOAD_DOCUMENT + `${id}/`,
          formData,
          true
        );
        if (response.status === 201) {
          window.location.reload();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
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
    }
  };

  const handleDeleteDocument = async (data) => {
    const { id, name } = data;
    if (id) {
      try {
        const response = await _sendAPIRequest(
          "DELETE",
          PortalApiUrls.DELETE_DOCUMENT + `${id}/`,
          "",
          true
        );
        if (response.status === 204) {
          setAlert({
            isVisible: true,
            message: `Document ${name} has been deleted.`,
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
    }
  };

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <IconButton className={styles["delete-btn"]}>
            <Delete onClick={() => handleDeleteDocument(cell.row.original)} />
          </IconButton>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
      );
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
            setDocuments(response.data.document);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <div className={styles["documents-section"]}>
                <h4>Upload Documents</h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="document"
                  rules={{ required: "Please select a image or document." }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Box>
                        <Box
                          className={cn("cursor", styles["img-drop-section"])}
                          {...getRootProps()}
                        >
                          <label
                            htmlFor="document"
                            className={cn("cursor", styles["img-drop-content"])}
                          >
                            <Input
                              {...getInputProps()}
                              sx={{
                                display: "none",
                              }}
                              onChange={(e) => {
                                const newFile = e.target.files[0];
                                if (newFile) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const fileWithPreview = Object.assign(
                                      newFile,
                                      {
                                        preview: reader.result,
                                      }
                                    );
                                    setFile(fileWithPreview);
                                    field.onChange(fileWithPreview);
                                  };
                                  reader.readAsDataURL(newFile);
                                }
                              }}
                            />
                            <img
                              className={styles["upload-icon"]}
                              src={UploadIcon}
                              alt="UploadIcon"
                            />
                            <p>
                              Drag 'n' drop image/document here, or click to
                              select image/document
                            </p>
                            <button className="btn button" type="button">
                              Click To Browse
                            </button>
                          </label>
                        </Box>
                        {error && (
                          <span className="error">
                            {error.message || "Error"}{" "}
                          </span>
                        )}
                      </Box>
                    </>
                  )}
                />

                {file && <FilePreview file={file} />}

                <div className={cn("my-3", styles["btn-container"])}>
                  <button
                    className={cn("btn", "button")}
                    type="button"
                    onClick={() => navigate(`/portal/bids/questions/${id}`)}
                  >
                    Back To Questions
                  </button>

                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button className={cn("btn", "button")} type="submit">
                      Upload
                    </button>
                  )}
                </div>
              </form>

              <DataTable
                propsColumn={documents_column}
                propsData={documents}
                action={addAction}
                customClassName="portal-data-table"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidDocuments;

const FilePreview = ({ file }) => {
  const renderPreview = () => {
    if (!file) return null;
    const fileType = file.type;

    if (fileType.includes("image")) {
      // Preview for image files
      return (
        <>
          <div className={styles["image-preview"]}>
            <img src={file.preview} alt={file.name} />
          </div>
        </>
      );
    } else if (fileType === "application/pdf") {
      // Preview for PDF files
      return (
        <embed
          src={file.preview}
          type="application/pdf"
          width="100%"
          height="500px"
          title={file.name}
        />
      );
    } else {
      // Default fallback for unsupported file types
      return <p>{file.name}</p>;
    }
  };

  return <div>{renderPreview()}</div>;
};
