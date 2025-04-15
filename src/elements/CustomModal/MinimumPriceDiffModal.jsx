import { Close, MonetizationOn } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  Fade,
  Backdrop,
  Divider,
  Button,
} from "@mui/material";

const MinimumPriceDiffModal = ({
  showPriceDiffModal,
  setShowPriceDiffModal,
}) => {
  const handleClose = () => setShowPriceDiffModal(false);

  return (
    <Modal
      open={showPriceDiffModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={showPriceDiffModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
            background: "white",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MonetizationOn sx={{ color: "#0d47a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#062d72" }}
              >
                Minimum Price Difference
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <Close sx={{ color: "#333" }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Body */}
          <Typography
            sx={{
              color: "#444",
              fontSize: "16px",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            <strong style={{ color: "#1976d2" }}>
              Minimum Price Difference
            </strong>{" "}
            refers to the least amount by which a new bid must undercut the
            current lowest bid. This ensures competitive fairness and
            discourages minimal undercutting.
          </Typography>

          {/* Footer */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#062d72",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                "&:hover": {
                  backgroundColor: "#0a3a94",
                },
              }}
              onClick={handleClose}
            >
              Got it
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MinimumPriceDiffModal;
