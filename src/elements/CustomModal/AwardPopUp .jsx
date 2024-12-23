import React, { useState } from "react";
import { Box, Typography, Dialog, DialogContent } from "@mui/material";

const AwardPopUp = ({ open , handleClose}) => {
  const [textVisible, setTextVisible] = useState(false);

  const handleVideoEnd = () => {
    setTextVisible(true); // Show text when video ends
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
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          style={{
            height: "300px", // Fixed height prevents scrollbars
            overflow: "hidden", // Ensures no scrollbars appear
          }}
        >
          {/* Video Element */}
          <video
            src={"/images/portal/layout/icons/bidAwarded.mp4"}
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd} // Handle video end
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
            }}
          />

          {/* Text Content */}
          <Typography
            variant="h3"
            fontWeight="500"
            className={textVisible ? "animate-text" : "hidden-text"}
            style={{
              position: "absolute", // Position absolutely to avoid layout shift
              bottom: "20px", // Initial position outside the visible area
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Supplier is Awarded
          </Typography>
        </Box>
      </DialogContent>

      {/* CSS for Animation */}
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
