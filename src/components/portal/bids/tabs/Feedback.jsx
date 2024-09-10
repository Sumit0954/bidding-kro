import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import styles from "./Feedback.module.scss";
const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log("Rating:", rating);
    console.log("Comment:", comment);
  };
  return (
    <>
    <br/>
      <div className={styles["heading"]}>
        <Typography variant="h5">Feedback</Typography>
      </div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ height: "100vh", marginTop: "12px" }} // Ensures that the content is vertically centered in the viewport
      >
        <Typography
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
          Rate Our Experience: How Well Did We Meet Your Expectations?
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
    </>
  );
};

export default Feedback;
