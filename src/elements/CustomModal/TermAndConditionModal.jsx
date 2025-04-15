import {
  Modal,
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const TermAndConditionModal = ({
  isTermandConfitionOpen,
  setIsTermandConfitionOpen,
  setIsAgreed,
  IsAgreed,
}) => {
  const [isChecked, setIsChecked] = useState(IsAgreed);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  };

  const handleAgree = () => {
    if (isChecked) {
      setIsAgreed(true);
      localStorage.setItem("isAgreed", JSON.stringify(true));
      setIsTermandConfitionOpen(false);
    }
  };

  return (
    <Modal
      open={isTermandConfitionOpen}
      onClose={() => setIsTermandConfitionOpen(false)}
      aria-labelledby="terms-modal-title"
      aria-describedby="terms-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500, md: 800 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setIsTermandConfitionOpen(false)}
          sx={{ float: "right" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="terms-modal-title"
          variant="h6"
          component="h3"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Terms and Conditions
        </Typography>

        <Typography
          id="disclaimer-description"
          variant="body2"
          sx={{
            marginBottom: 3,
            lineHeight: 1.6,
            fontSize: { xs: "12px", sm: "14px" }, // Smaller font size for mobile
          }}
        >
          The use of this platform, "Bidding Karo," is subject to the following
          terms and conditions. By clicking on 'I AGREE', the user acknowledges
          that:
          <Box sx={{ p: 3 }}>
            <Typography variant="body5" paragraph sx={{ textAlign: "justify" }}>
              <strong>1. Enrolment Eligibility:</strong> To use the Platform,
              you must complete the registration process for one or more of the
              Services offered. Use of the Services is restricted to parties
              that can lawfully enter into contracts under applicable law. As
              part of the registration process, you must provide us with your
              legal name, address, phone number, email address, applicable tax
              registration details, and any other information we may require.
              Any personal data you provide to us will be handled in accordance
              with the Bidding Genie Privacy Policy.
            </Typography>
            <Typography variant="body5" paragraph sx={{ textAlign: "justify" }}>
              • Bidding Karo reserves the right to terminate or remove your
              registration and/or deny you access to the Platform if we become
              aware that you are not seriously participating in bid whether you
              are Buyer or Supplier or if you violate any of the Terms of Use .
              If you register on behalf of a business entity, you represent and
              warrant that you are authorized by the business entity to accept
              the Terms of Use on its behalf and that you have the authority to
              bind the business entity to the Terms of Use.
            </Typography>
          </Box>
        </Typography>
        {/* "Read More" Link */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            variant="body2"
            component="a"
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#062d72",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { color: "#05baee" },
            }}
          >
            Read full Terms and Conditions
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={3}>
          <Checkbox
            checked={isChecked}
            disabled={IsAgreed}
            onChange={handleCheckboxChange}
          />
          <Typography variant="body2">
            I agree to the terms and conditions
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAgree}
          disabled={!isChecked || IsAgreed}
          sx={{
            width: "100%",
            fontWeight: "bold",
            backgroundColor: "#062d72",
            ":hover": { backgroundColor: "#05baee" },
          }}
        >
          Agree
        </Button>
      </Box>
    </Modal>
  );
};

export default TermAndConditionModal;
