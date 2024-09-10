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
}) => {
  const handleClose = () => {
    setShowSpecification(false);
  };

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
                  <Box className="col text-start">Product Name</Box>
                </Box>
              </span>

              <Box className="row">
                <Box className="row">
                  <Box className={cn("col text-start", styles["title"])}>
                    Specification :
                  </Box>
                  <List sx={{ pl: 4.5 }}>
                    <ListItem
                      disablePadding
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: "20px", // Indentation for list items
                      }}
                    >
                      <ListItemText
                        primary={
                          <span>
                            <strong>Objective :</strong> Procurement of cotton
                            material to meet manufacturing needs.
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: "20px",
                      }}
                    >
                      <ListItemText
                        primary={
                          <span>
                            <strong>Invitation :</strong> Seeking proposals from
                            qualified suppliers for premium-grade cotton fabric.
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: "20px",
                      }}
                    >
                      <ListItemText
                        primary={
                          <span>
                            <strong>Specifications :</strong> Suppliers must
                            adhere to predefined specifications and industry
                            standards.
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: "20px",
                      }}
                    >
                      <ListItemText
                        primary={
                          <span>
                            <strong>Partnership :</strong> Aim to establish a
                            mutually beneficial partnership with the selected
                            supplier.
                          </span>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductSpecificationModal;
