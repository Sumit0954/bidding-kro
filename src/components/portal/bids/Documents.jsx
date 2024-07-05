import React, { useContext } from "react";
import { documents_column } from "../../../elements/CustomDataTable/PortalColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { IconButton, TableCell } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AlertContext } from "../../../contexts/AlertProvider";

const Documents = ({ bidDetails }) => {
  const { setAlert } = useContext(AlertContext);

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
        <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
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
    </>
  );
};

export default Documents;
