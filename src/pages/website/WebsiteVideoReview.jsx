import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./WebsiteVideoReview.module.scss";

const VideoReviewSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          backgroundImage: `url("https://img.freepik.com/premium-photo/business-people-meeting-conference-discussion-corporate-concept_34936-3085.jpg?w=1380")`,
          backgroundSize: "cover", // Ensures the image covers the entire area
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
          minHeight: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingY: 3,
        }}
      >
        {/* Heading Section */}
        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            className={styles["heading-with-lines"]}
          >
            About Bidding Karo
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "800px", mx: "auto", mt: 1 }}
          >
            Bidding Karo: Breaking the Limits of Traditional Buying and Selling.
            Where Buyers Can Become Sellers and Sellers Can Become Buyers.
          </Typography>
        </Box>

        {/* Video Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px", // Reduce height
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "500px", // Reduce width for better layout
            }}
          >
            {/* Thumbnail Image */}
            <Box
              component="img"
              src="/websiteVideo.PNG"
              alt="Bidding Karo Video"
              sx={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Reduce shadow intensity
              }}
            />

            {/* Play Button Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <PlayArrowIcon sx={{ color: "white", fontSize: "30px" }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Video Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", background: "black" }}>
          {/* Close Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 1,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          {/* Video Frame */}
          <Box
            sx={{
              width: "100%",
              minHeight: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Bidding Karo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default VideoReviewSection;
