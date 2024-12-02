import { useContext, useEffect, useRef, useState } from "react";
import styles from "./BidDocuments.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../../assets/images/portal/bids/upload-icon.png";
import { Alert, Box, IconButton, Input, TableCell } from "@mui/material";
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
import RazorpayPaymentHandler from "../../../utils/RazorpayPaymentHandler";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const BidDocuments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState("");
  const [activateBid, setActivateBid] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const [screenLoader, setScreenLoader] = useState(true);
  const { userDetails } = useContext(UserDetailsContext);

  const { control, handleSubmit, setValue, watch, setError } = useForm({
    defaultValues: {
      document: null,
    },
  });

  const inputRef = useRef(null);
  console.log("documents : ", documents);
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
    setErrors(false);

    const { name, size } = data.document;

    let formData = new FormData();
    if (data) {
      formData.append("file_name", name);
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

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    document: null,
    message: "",
  });

  const handleDeleteDocument = (data) => {
    setDeleteDetails({
      open: true,
      document: data,
      message: `Are you sure you want to delete the document? This action cannot be undone.`,
    });
  };

  const handleBrowseClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const confirmDeleteDocument = async () => {
    const { id, name } = deleteDetails.document;
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
          window.location.reload(); // Reload after successful deletion
          setScreenLoader(false);
        }
      } catch (error) {
        const { data } = error.response;
        if (data && data.error) {
          setAlert({
            isVisible: true,
            message: data.error,
            severity: "error",
          });
        }
      }
    }
    setDeleteDetails({ open: false, document: null, message: "" }); // Close the popup after delete
  };

  // const handleDeleteDocument = async (data) => {
  //   const { id, name } = data;
  //   if (id) {
  //     try {
  //       const response = await _sendAPIRequest(
  //         "DELETE",
  //         PortalApiUrls.DELETE_DOCUMENT + `${id}/`,
  //         "",
  //         true
  //       );
  //       if (response.status === 204) {
  //         setAlert({
  //           isVisible: true,
  //           message: `Document ${name} has been deleted.`,
  //           severity: "success",
  //         });
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       const { data } = error.response;
  //       if (data) {
  //         if (data.error) {
  //           setAlert({
  //             isVisible: true,
  //             message: data.error,
  //             severity: "error",
  //           });
  //         }
  //       }
  //     }
  //   }
  // };

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
        <TableCell {...cell.getCellProps()} align={cell.column.align}>
          {" "}
          {cell.render("Cell")}{" "}
        </TableCell>
      );
    }
  };

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
            setStatus(response.data.status);
            setDocuments(response.data.document);
            setScreenLoader(false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
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
            <div className={cn("row", styles["form-section"])}>
              <div className={styles["documents-section"]}>
                <h4>Upload Documents</h4>

                {status === "active" ? (
                  <button
                    className={cn("btn", "button", "approve")}
                    type="button"
                    disabled
                  >
                    Active
                  </button>
                ) : (
                  <button
                    className={cn("btn", "button")}
                    type="button"
                    onClick={() => setActivateBid(true)}
                    disabled={status === "cancelled" ? true : false}
                  >
                    Activate Bid
                  </button>
                )}
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
                            <input
                              {...getInputProps()}
                              ref={inputRef}
                              style={{ display: "none" }}
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
                            <p>
                              Please note: You can upload files up to a maximum
                              size of 2MB.
                            </p>
                            <button
                              className="btn button"
                              type="button"
                              onClick={handleBrowseClick}
                              disabled={status === "cancelled" ? true : false}
                            >
                              Click To Upload
                            </button>
                          </label>
                        </Box>
                        {error && (
                          <span className="error">
                            {error.message || "Error"}
                          </span>
                        )}
                      </Box>
                    </>
                  )}
                />

                {file && (
                  <div>
                    <h5>
                      File selected! Now, click the "Upload" button to upload
                      your file {file.name}
                    </h5>
                  </div>
                )}

                <div className={cn("my-3", styles["btn-container"])}>
                  {loading ? (
                    <ButtonLoader size={60} />
                  ) : (
                    <button
                      className={cn("btn", "button")}
                      type="submit"
                      disabled={status === "cancelled" ? true : false}
                    >
                      Upload
                    </button>
                  )}
                  {/* <button
                    className={cn("btn", "button")}
                    type="submit"
                    disabled={status === "cancelled" ? true : false}
                    onClick={() => navigate(`/portal/bids/details/${id}`)}
                  >
                    Procced further
                  </button> */}
                </div>
              </form>
              <Alert severity="info" sx={{ marginBottom: "15px" }}>
                <p className={styles["alert-message"]}>
                  <span> Note : </span>
                  Uploaded documents will be automatically deleted from the
                  platform after 6 months.
                </p>
              </Alert>
              <DataTable
                propsColumn={documents_column}
                propsData={documents}
                action={addAction}
                customClassName="portal-data-table"
              />
            </div>

            <div
              className={cn("my-3", styles["btn-container"])}
              style={{ display: "flex", justifyContent: "end", gap: "1rem" }}
            >
              <button
                className={cn("btn", "button")}
                type="button"
                onClick={() => navigate(`/portal/bids/create/questions/${id}`)}
              >
                Back
              </button>
              <button
                className={cn("btn", "button")}
                type="submit"
                disabled={status === "cancelled"}
                onClick={() => navigate(`/portal/bids/details/${id}`)}
              >
                {documents?.length > 0 ? "proceed further" : "Skip"}
              </button>
            </div>

            {deleteDetails.open && (
              <DeleteDialog
                title="Delete Document"
                message={deleteDetails.message}
                handleClick={(confirmed) => {
                  if (confirmed) {
                    confirmDeleteDocument(); // Perform delete if confirmed
                  } else {
                    setDeleteDetails({
                      open: false,
                      document: null,
                      message: "",
                    }); // Close without deleting
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {activateBid && (
        <RazorpayPaymentHandler
          userData={userDetails}
          setActivateBid={setActivateBid}
          setShowThankyou={setShowThankyou}
          id={id}
        />
      )}

      {showThankyou && (
        <ThankyouModal
          showThankyou={showThankyou}
          setShowThankyou={setShowThankyou}
          heading={"Payment Successful!"}
          description={`Your bid has been activated successfully!`}
          showLogin={false}
        />
      )}
    </>
  );
};

export default BidDocuments;
