import React, { useState } from "react";
import { Box, Typography, Popover } from "@mui/material";
import styles from "./CompaniesSlider.module.scss";

const logos = [
  { src: "/Tata.png", name: "Tata Group" },
  { src: "/appcodetec.png", name: "Appcodetec" },
  { src: "/adidaslogo.png", name: "Adidas" },
  { src: "/IMBlogo.png", name: "IBM" },
  { src: "/microsoftLogo.png", name: "Microsoft" },
];

const CompaniesSlider = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleMouseEnter = (event, logo) => {
    setAnchorEl(event.currentTarget);
    setSelectedLogo(logo);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setSelectedLogo(null);
  };

  return (
    <Box
      sx={{
        background: "#F5F5F5",
        padding: "30px 0",
        textAlign: "center",
        minHeight: { xs: "auto", sm: "50vh" },
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h5"
        fontWeight="bold"
        className={styles["heading-with-lines"]}
        sx={{ marginBottom: "3rem" }}
      >
        Trusted Companies on Bidding Karo
      </Typography>

      {/* Scrolling Logo Slider */}
      <Box className={styles["slider-container"]}>
        <Box className={styles["slider-content"]}>
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              className={styles["logo"]}
              onMouseEnter={(event) => handleMouseEnter(event, logo)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Box>
      </Box>

      {/* Popover (Dialog Box on Hover) */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ pointerEvents: "none" }} // Prevents accidental close due to mouse movement
      >
        {selectedLogo && (
          <Box sx={{ padding: "10px", textAlign: "center" }}>
            <Typography variant="body1" fontWeight="bold">
              {selectedLogo.name}
            </Typography>
            <img
              src={selectedLogo.src}
              alt={selectedLogo.name}
              style={{ width: "150px", height: "auto", marginTop: "8px" }}
            />
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default CompaniesSlider;
