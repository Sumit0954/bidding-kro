import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../../contexts/AlertProvider";
import styles from "./FeedbackSupplier.module.scss";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../../../helpers/api";
const FeedbackSupplier = ({ bidDetails }) => {
  const { register, handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [compnayFeedback, setCompanyFeedback] = useState({});
  const { setAlert } = useContext(AlertContext);

  const givefeedBack = async (data) => {
    setLoading(true);
    const feedbackdata = { ...data, rated_company: bidDetails?.company?.id };

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls?.BID_FEEDBACK + `${bidDetails?.id}/`,
        feedbackdata,
        true
      );

      if (response.status === 201) {
        setAlert({
          isVisible: true,
          message: "Successfully submitted feedback",
          severity: "success",
        });
        setLoading(false);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Some error occurred while submitting the feedback",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const retriveFeedback = async () => {
    if (Object.entries(compnayFeedback).length === 0) {
      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.RETRIEVE_FEEDACK +
            `${bidDetails?.id}/?rated_company=${bidDetails?.company?.id}`,
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
  }, [loading]);

  console.log(compnayFeedback, " : compnayFeedback");

  return (
    <>
      <Box
        sx={{
          display: "flex", // Flexbox for layout
          justifyContent: "center", // Center horizontally
          alignItems: "flex-start", // Align at the top
          padding: 3, // Adjusted padding for smaller screens
          width: "100%", // Ensure full width for smaller screens
          boxSizing: "border-box",
        }}
      >
        <Box
          component="form" // Mark this box as a form
          onSubmit={handleSubmit(givefeedBack)}
          sx={{
            width: "100%",
            maxWidth: 1000, // Max width for larger screens
            backgroundColor: "#ffffff", // White background
            borderRadius: 2,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
            padding: 3, // Adjusted padding for mobile
          }}
        >
          {/* Feedback Header */}
          <Box
            sx={{
              textAlign: "center",
              marginBottom: 3, // Adjusted spacing for smaller screens
              backgroundColor: "#062d72", // Background color for the header
              padding: "16px", // Padding inside the header
              borderRadius: 2, // Rounded corners
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#ffffff", // Text color (white)
              }}
            >
              Feedback
            </Typography>
          </Box>

          {/* Rating Section */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {Object.entries(compnayFeedback).length === 0
                ? "Share Your Feedback"
                : "Your Feedback Has Been Submitted"}
            </Typography>
            <Typography variant="body2" sx={{ marginY: 1 }}>
              {Object.entries(compnayFeedback).length === 0
                ? "Rate Your Experience: How Well Did This Supplier Meet Your Expectations?"
                : "Thank you for providing your feedback for this supplier!"}
            </Typography>

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
                    {...field}
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
          </Box>

          {/* Comments Section */}
          <Box sx={{ marginBottom: 3 }}>
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
          </Box>

          {/* Submit Button */}
          {Object.entries(compnayFeedback).length === 0 ? (
            <>
              <Box sx={{ textAlign: "center" }}>
                {loading === true ? (
                  <ButtonLoader size={80} />
                ) : (
                  <Button
                    className={styles["feedback_submit"]} // Custom class for styling
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#062d72",
                      "&:hover": {
                        backgroundColor: "#041c4a",
                      },
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FeedbackSupplier;
