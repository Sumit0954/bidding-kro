import {
  Box,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";

const ProductSpecificationModal = ({
  showSpecification,
  setShowSpecification,
  selectedProduct,
}) => {
  const handleClose = () => {
    setShowSpecification(false);
  };
  console.log(selectedProduct?.min_decrement_amount);
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
              {/* Modal Header */}
              <Box
                className={styles["modal-header"]}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  className={cn(styles["invite-modal-title"])}
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                >
                  Product Specification
                </Typography>
                {/* Close Button */}

                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    float: "right", // Align to top-right corner
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Product Details */}
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
              <Box className="row">
                <Box className={cn("col text-start ", styles["title"])}>
                  Minimum Increment:
                </Box>
              </Box>
              <span>
                <Box className="row mb-2">
                  <Box className="col text-start">
                    ₹ {selectedProduct?.min_decrement_amount}
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
