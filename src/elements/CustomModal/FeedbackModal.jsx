import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import styles from "./FeedbackModal.module.scss"; // Replace with your CSS/SCSS module path

const FeedbackModal = ({addInvitaion}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Feedback Modal */}
      <Modal
        open={addInvitaion}
        onClose={handleClose} 
        aria-labelledby="feedback-modal-title"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            width: "90%",
            maxWidth: "500px",
            margin: "auto",
            marginTop: "10vh",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 24,
          }}
        >
          <Typography
            id="feedback-modal-title"
            variant="h4"
            gutterBottom
            className={styles["feedback-heading"]}
          >
            Share Your Feedback
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            className={styles["feedback-subheading"]}
          >
            Rate Your Experience: How Well Did We Meet Your Expectations?
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mb: 2, fontSize: "3.5rem" }}
          />
          <TextField
            label="Your Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2, width: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={styles["form-button"]}
            sx={{ width: "100%" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
