import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const AwardPopUp = ({ open, handleClose }) => {
  const [textVisible, setTextVisible] = useState(false);

  const handleVideoEnd = () => {
    setTextVisible(true);
  };
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: "16px",
          overflow: "hidden",
          textAlign: "center",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
          color: "#555",
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          style={{
            height: "300px",
            overflow: "hidden",
          }}
        >
          <video
            src={"/images/portal/layout/icons/bidAwarded.mp4"}
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
            }}
          />

          <Typography
            variant="h3"
            fontWeight="500"
            className={textVisible ? "animate-text" : "hidden-text"}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Supplier is Awarded
          </Typography>
        </Box>
      </DialogContent>

      <style>
        {`
      .hidden-text {
        opacity: 0;
        transform: translateY(20px) translateX(-50%);
        transition: all 0.5s ease;
      }

      .animate-text {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
        transition: all 0.5s ease;
      }
    `}
      </style>
    </Dialog>
  );
};

export default AwardPopUp;
