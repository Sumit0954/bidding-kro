import React, { useContext, useState } from "react";
import { documents_column } from "../../../elements/CustomDataTable/PortalColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Box, IconButton, TableCell } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AlertContext } from "../../../contexts/AlertProvider";
import styles from "./Documents.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const Documents = ({ bidDetails, type }) => {
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (action) => {
    setLoadingAction(action);
    setLoading(true);
    try {
      const response = await _sendAPIRequest(
        "PUT",
        PortalApiUrls.INVITE_ACTION + `${bidDetails?.id}/`,
        { action: action },
        true
      );
      if (response.status === 204) {
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
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        if (error) {
          setAlert({
            isVisible: true,
            message: "Error while downloading file!",
            severity: "error",
          });
        }
      });
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
          {bidDetails?.participant?.status === "accepted" || "declined" ? (
            <button
              type="button"
              className={`btn button ${bidDetails?.participant?.status === "accepted" ? 'approve': 'reject'}`}
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
                  onClick={() => handleAction("decline")}
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
                  onClick={() => handleAction("accept")}
                >
                  Accept
                </button>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Documents;
