import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import styles from "./FeedbackModal.module.scss"; // Replace with your CSS/SCSS module path
import _sendAPIRequest from "../../helpers/api";
import { PortalApiUrls } from "../../helpers/api-urls/PortalApiUrls";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertProvider";
import { ButtonLoader } from "../CustomLoader/Loader";

const FeedbackModal = ({ feedback, setfeedback, bidId, rated_company }) => {
  const { register, handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [compnayFeedback, setCompanyFeedback] = useState({});
  const { setAlert } = useContext(AlertContext);

  const givefeedBack = async (data) => {
    setLoading(true);
    const feedbackdata = { ...data, rated_company: rated_company };
    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls?.BID_FEEDBACK + `${bidId}/`,
        feedbackdata,
        true
      );

      if (response.status === 201) {
        setLoading(false);
        setfeedback(false);
        setAlert({
          isVisible: true,
          message: "Successfully submitted feedback",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      setfeedback(false);
      setAlert({
        isVisible: true,
        message:
          error.status === 403
            ? error.response.data.detail
            : "Some error occurred while submitting the feedback",
        severity: "error",
      });
    }
  };

  console.log(compnayFeedback);
  const retriveFeedback = async () => {
    if (Object.entries(compnayFeedback).length === 0) {
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.RETRIEVE_FEEDACK +
            `${bidId}/?rated_company=${rated_company}`,
          "",
          true
        );
        if (response?.status === 200) {
          setCompanyFeedback(response?.data);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    retriveFeedback();
  }, []);

  return (
    <div>
      <Modal
        open={feedback}
        aria-labelledby="feedback-modal-title"
        onClose={() => setfeedback(false)}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={styles["feedback"]}
          sx={{
            position: "relative", // Ensures the close button is positioned correctly
          }}
        >
          {/* Header Section */}
          <Box className={styles["feedback-heading"]}>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
              Feedback
            </Typography>
          </Box>

          {/* Feedback Content */}
          <Box
            component="form"
            onSubmit={handleSubmit(givefeedBack)}
            sx={{
              width: "100%",
              textAlign: "center",
              padding: "20px 10px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#062d72",
                marginBottom: "10px",
              }}
            >
              {Object.entries(compnayFeedback).length === 0
                ? "Share Your Feedback"
                : "Your Feedback Has Been Submitted"}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "#333", marginBottom: "20px" }}
            >
              {Object.entries(compnayFeedback).length === 0
                ? "Rate Your Experience: How Well Did This Supplier Meet Your Expectations?"
                : "Thank you for providing your feedback for this supplier!"}
            </Typography>

            {/* Controlled Rating */}
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              rules={{
                validate: (value) => value > 0 || "Rating is required", // Validation to check value > 0
              }}
              render={({ field, fieldState: { error } }) => (
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Rating
                    disabled={
                      Object.entries(compnayFeedback).length === 0
                        ? false
                        : true
                    }
                    {...field}
                    value={
                      Object.entries(compnayFeedback).length === 0
                        ? field.value
                        : compnayFeedback.rating
                    }
                    onChange={(event, newValue) => field.onChange(newValue)}
                    sx={{
                      fontSize: "3rem",
                      color: "#FFD700",
                    }}
                  />
                  {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )}
            />

            <TextField
              label={`${
                Object.entries(compnayFeedback).length === 0
                  ? "Provide your comment"
                  : ""
              }`}
              name="comment"
              required={Object.entries(compnayFeedback).length === 0}
              {...register("comment")}
              multiline
              rows={4}
              variant="outlined"
              defaultValue={
                Object.entries(compnayFeedback).length === 0
                  ? "" // compnayFeedback Empty if no feedback
                  : compnayFeedback.comment // Pre-fill if feedback exists
              }
              disabled={Object.entries(compnayFeedback).length !== 0} // Disable if feedback exists
              sx={{
                mb: 2,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            {Object.entries(compnayFeedback).length !== 0 && <></>}
            {Object.entries(compnayFeedback).length === 0 ? (
              <>
                {loading === true ? (
                  <ButtonLoader size={80} />
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    className={styles["feedback_submit"]}
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      backgroundColor: "#062d72",
                    }}
                  >
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
