import React, { useContext, useState } from "react";
import { documents_column } from "../../../../elements/CustomDataTable/PortalColumnData";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { Box, IconButton, TableCell } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AlertContext } from "../../../../contexts/AlertProvider";
import styles from "./Documents.module.scss";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import DeleteDialog from "../../../../elements/CustomDialog/DeleteDialog";

const Documents = ({ bidDetails, type }) => {
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    action: "",
  });

  const handleAction = async (action) => {
    setLoadingAction(action);
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.INVITE_ACTION + `${bidDetails?.id}/`,
        { 
          action: "accept",
          is_sample_invite: false
         },
        true
      );
      if (response.status === 204) {
        window.location.reload();
        setLoading(false);

        setAlert({
          isVisible: true,
          message:
            loadingAction === "accept"
              ? "Your bid invitation has been successfully accepted."
              : "Bid invitation has been declined.",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        isVisible: true,
        message: error?.response?.data?.error,
        severity: "error",
      });
    }
  };
  const handleDownloadDocument = (data) => {
    const { file, name } = data;
  
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name); // Set the downloaded file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link); // Clean up after download
        window.URL.revokeObjectURL(url); // Release memory for the object URL
      })
      .catch((error) => {
      
        console.error("There was an error downloading the file:", error);
      });
  };
  

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleAction(deleteDetails.action);
    } else {
      setDeleteDetails({ open: false, title: "", message: "", action: "" });
    }
  };

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <IconButton className="p-0">
            <Download
              onClick={() => handleDownloadDocument(cell.row.original)}
            />
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

  return (
    <>
      <DataTable
        propsColumn={documents_column}
        propsData={bidDetails?.document}
        action={addAction}
        customClassName="portal-data-table"
      />

      {type === "invited" && (
        <Box className={styles["btn-contanier"]}>
          {bidDetails?.participant?.status === "accepted" ||
          bidDetails?.participant?.status === "declined" ? (
            <button
              type="button"
              className={`btn button ${
                bidDetails?.participant?.status === "accepted"
                  ? "approve"
                  : "reject"
              }`}
              disabled={true}
            >
              {bidDetails?.participant?.status}
            </button>
          ) : (
            <>
              {loading && loadingAction === "decline" ? (
                <ButtonLoader size={60} />
              ) : (
                <button
                  type="button"
                  className="btn button reject"
                  onClick={() =>
                    setDeleteDetails({
                      open: true,
                      title: "Decline Bid Invite",
                      message: `Are you sure you want to decline this invite bid ? This action cannot be undone.`,
                      action: "decline",
                    })
                  }
                >
                  Decline
                </button>
              )}

              {loading && loadingAction === "accept" ? (
                <ButtonLoader size={60} />
              ) : (
                <button
                  type="button"
                  className="btn button approve"
                  onClick={() =>
                    setDeleteDetails({
                      open: true,
                      title: "Accept Bid Invite",
                      message: `Are you sure you want to accept this invite bid ?.`,
                      action: "accept",
                    })
                  }
                >
                  Accept
                </button>
              )}
            </>
          )}

          {deleteDetails?.open && (
            <DeleteDialog
              title={deleteDetails.title}
              message={deleteDetails.message}
              handleClick={handleDeleteConfirmation}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Documents;
