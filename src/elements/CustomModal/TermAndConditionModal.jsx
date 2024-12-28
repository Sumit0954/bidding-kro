import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import styles from "./TermAndConditionModal.module.scss";
import CloseIcon from "@mui/icons-material/Close";

const TermAndConditionModal = ({
  isTermandConfitionOpen,
  setIsTermandConfitionOpen,
  setIsAgreed,
  IsAgreed,
}) => {
  const TermAndConditionAgreed = () => {
    setIsAgreed(true);
  };

  return (


    <Modal
    open={isTermandConfitionOpen}
    onClose={() => setIsTermandConfitionOpen(false)}
    aria-labelledby="disclaimer-title"
    aria-describedby="disclaimer-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 500, md: 800 }, // Adjust width responsively
        bgcolor: "background.paper",
        boxShadow: 24,
        p: { xs: 2, sm: 4 }, // Adjust padding for small devices
        borderRadius: 2,
        border: "none",
      }}
    >
      {/* Close Button */}
      <IconButton
        aria-label="close"
        onClick={() => setIsTermandConfitionOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          float: "right", // Align to top-right corner
        }}
      >
        <CloseIcon />
      </IconButton>
  
      <Typography
        id="disclaimer-title"
        variant="h6"
        component="h3"
        sx={{
          mb: 2,
          fontSize: { xs: "16px", sm: "18px" },
          fontWeight :"bold" // Responsive font size
        }}
      >
        Terms and Conditions:
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
        The use of this platform, "Bidding Kro," is subject to the following terms
        and conditions. By clicking on 'I AGREE', the user acknowledges that:
        <ol style={{ paddingLeft: "20px" }}>
          <li>
            The user wishes to access and use "Bidding Kro" for viewing, creating,
            and managing bids, and understands that this platform is solely for
            facilitating the bidding process.
          </li>
          <li>
            The information provided on this platform is made available to the
            user for informational purposes only, and any actions taken based on
            this information are at the user’s discretion and responsibility.
          </li>
          <li>
            "Bidding Kro" does not guarantee the accuracy, completeness, or
            reliability of any bids, listings, or content shared by buyers or
            suppliers on the platform.
          </li>
          <li>
            Use of the platform does not establish any legal, fiduciary, or
            client-supplier relationship between the platform, its operators, and
            the user.
          </li>
          <li>
            Any misuse of the platform, including providing false or misleading
            information, violating bid terms, or engaging in unethical practices,
            may lead to termination of the user’s access.
          </li>
        </ol>
        "Bidding Kro" is not liable for any financial or business decisions made
        by users based on the information shared or accessed through the
        platform. Users are strongly advised to conduct independent due diligence
        before proceeding with any bidding activity.
      </Typography>
  
      <Button
        variant="contained"
        color="primary"
        onClick={() => TermAndConditionAgreed()}
        sx={{
          width: "100%",
          fontWeight: "bold",
          backgroundColor: "#062d72",
          ":hover": {
            backgroundColor: "#05baee",
          },
        }}
        disabled={IsAgreed}
      >
        {IsAgreed === true ? "Agreed" : "I Agree"}
      </Button>
    </Box>
  </Modal>
  
  );
};

export default TermAndConditionModal;
