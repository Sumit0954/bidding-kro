import { Box, Modal, TableCell, Typography } from "@mui/material";
import styles from "./Modal.module.scss";
import React from "react";
import cn from "classnames";
import { companies_column } from "../CustomDataTable/PortalColumnData";
import DataTable from "../CustomDataTable/DataTable";

const CompanySearchModal = ({ showCompanySearch, setShowCompanySearch }) => {
  const handleClose = () => {
    setShowCompanySearch(false);
  };

  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
    );
  };

  return (
    <>
      <Modal
        open={showCompanySearch}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <Typography
                className={styles["search-company-head"]}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                Search Companies
              </Typography>

              <div className={cn('row', styles['search-company-table'])}>
                <DataTable
                  propsColumn={companies_column}
                  propsData={[]}
                  action={addAction}
                />
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CompanySearchModal;
