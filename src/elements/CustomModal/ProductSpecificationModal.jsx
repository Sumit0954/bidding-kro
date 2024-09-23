import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";

const ProductSpecificationModal = ({
  showSpecification,
  setShowSpecification,
  selectedProduct,
}) => {
  const handleClose = () => {
    setShowSpecification(false);
  };
  console.log(selectedProduct);
  return (
    <>
      <Modal
        open={showSpecification}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box className={cn("container", styles["modal-container"])}>
          <Box className="row">
            <Box className={styles["modal-section"]}>
              <Box className={styles["modal-header"]}>
                <Typography
                  className={cn(styles["invite-modal-title"])}
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                >
                  Product Specification
                </Typography>
              </Box>
              <Box className="row">
                <Box className={cn("col text-start ", styles["title"])}>
                  Product :
                </Box>
              </Box>
              <span>
                <Box className="row mb-2">
                  <Box className="col text-start">{selectedProduct.title}</Box>
                </Box>
              </span>
              <Box className="row">
                <Box className={cn("col text-start ", styles["title"])}>
                  Specification :
                </Box>
              </Box>
              <span>
                <Box className="row mb-2">
                  <Box className="col text-start">
                    {selectedProduct.specification.replace(/<\/?p>/g, "")}
                  </Box>
                </Box>
              </span>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductSpecificationModal;
